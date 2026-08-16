/**
 * Post-build SEO and integrity checks.
 *
 * These exist because the failures they catch are silent: a canonical tag that
 * points at `/about.html`, an og:image that 404s, two pages sharing a
 * description, an internal link to a page that no longer builds. Nothing about
 * the site looks broken when any of those happen — it just quietly loses
 * ranking or link previews.
 */

import { readFile, readdir, access } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const failures = [];
const warnings = [];

function fail(message) {
	failures.push(message);
}

function warn(message) {
	warnings.push(message);
}

async function exists(path) {
	try {
		await access(path);
		return true;
	} catch {
		return false;
	}
}

async function* htmlFiles(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) yield* htmlFiles(full);
		else if (entry.name.endsWith('.html')) yield full;
	}
}

function attr(html, re) {
	const match = html.match(re);
	return match ? match[1] : null;
}

function countTag(html, tag) {
	return (html.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
}

/** `dist/about.html` -> `/about`, `dist/index.html` -> `/` */
function servedPath(file) {
	const rel = `/${relative(dist, file).replace(/\\/g, '/')}`;
	return rel.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '') || '/';
}

const pages = [];
for await (const file of htmlFiles(dist)) pages.push(file);
pages.sort();

if (pages.length === 0) fail('No HTML pages were built.');

const titles = new Map();
const descriptions = new Map();
const internalLinks = new Set();

for (const file of pages) {
	const html = await readFile(file, 'utf8');
	const path = servedPath(file);
	const where = `${path}`;

	// --- Headings -----------------------------------------------------------
	const h1s = countTag(html, 'h1');
	if (h1s !== 1) fail(`${where}: expected exactly 1 <h1>, found ${h1s}`);

	// --- Core meta ----------------------------------------------------------
	const title = attr(html, /<title>([^<]*)<\/title>/);
	const description = attr(html, /<meta name="description" content="([^"]*)"/);
	const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
	const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
	const ogType = attr(html, /<meta property="og:type" content="([^"]*)"/);
	const twitterCard = attr(html, /<meta name="twitter:card" content="([^"]*)"/);

	if (!title) fail(`${where}: missing <title>`);
	if (!description) fail(`${where}: missing meta description`);
	if (!canonical) fail(`${where}: missing canonical link`);
	if (!ogImage) fail(`${where}: missing og:image`);
	if (!ogType) fail(`${where}: missing og:type`);
	if (!twitterCard) fail(`${where}: missing twitter:card`);

	if (canonical?.includes('.html')) {
		fail(`${where}: canonical leaks a .html extension — ${canonical}`);
	}
	if (canonical && new URL(canonical).pathname.replace(/\/$/, '') !== (path === '/' ? '' : path)) {
		fail(`${where}: canonical points at ${new URL(canonical).pathname}`);
	}

	const noindex = /content="noindex/.test(html);

	// Length only matters for pages that can appear in results.
	if (!noindex) {
		if (title && title.length > 65) {
			warn(`${where}: title is ${title.length} chars, likely truncated in results`);
		}
		if (description && (description.length < 70 || description.length > 165)) {
			warn(`${where}: description is ${description.length} chars (aim for 70–165)`);
		}
	}

	if (!noindex) {
		if (title && titles.has(title)) {
			fail(`${where}: duplicate <title> shared with ${titles.get(title)}`);
		} else if (title) {
			titles.set(title, where);
		}

		if (description && descriptions.has(description)) {
			fail(`${where}: duplicate description shared with ${descriptions.get(description)}`);
		} else if (description) {
			descriptions.set(description, where);
		}
	}

	// --- OG image must actually exist ---------------------------------------
	if (ogImage) {
		const imagePath = join(dist, new URL(ogImage).pathname);
		if (!(await exists(imagePath))) fail(`${where}: og:image 404s — ${ogImage}`);
	}

	// --- Structured data ------------------------------------------------------
	const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
	if (!ld) {
		fail(`${where}: missing JSON-LD`);
	} else {
		try {
			const parsed = JSON.parse(ld[1]);
			if (!parsed['@graph']?.length) fail(`${where}: JSON-LD @graph is empty`);
		} catch (error) {
			fail(`${where}: JSON-LD does not parse — ${error.message}`);
		}
	}

	// --- Language -------------------------------------------------------------
	if (!/<html lang="[a-z]{2}"/.test(html)) fail(`${where}: <html> is missing lang`);

	// --- Collect internal links ----------------------------------------------
	for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
		internalLinks.add(match[1]);
	}
}

// --- Internal links must resolve ---------------------------------------------
for (const link of internalLinks) {
	const clean = link.replace(/\/$/, '');
	const candidates = [
		join(dist, clean || 'index.html'),
		join(dist, `${clean}.html`),
		join(dist, clean, 'index.html'),
	];
	const found = await Promise.all(candidates.map(exists));
	if (!found.some(Boolean)) fail(`Broken internal link: ${link}`);
}

// --- Sitemap and robots -------------------------------------------------------
if (!(await exists(join(dist, 'sitemap-index.xml')))) fail('sitemap-index.xml was not generated');

const robotsPath = join(dist, 'robots.txt');
if (!(await exists(robotsPath))) {
	fail('robots.txt was not generated');
} else {
	const robots = await readFile(robotsPath, 'utf8');
	if (!robots.includes('Sitemap:')) fail('robots.txt does not point at the sitemap');
	if (/Disallow:\s*\/og\//.test(robots)) {
		fail('robots.txt blocks /og/ — social crawlers would refuse to fetch link previews');
	}
}

const sitemap = await readFile(join(dist, 'sitemap-0.xml'), 'utf8').catch(() => '');
for (const file of pages) {
	const path = servedPath(file);
	if (path === '/404') continue;
	const url = path === '/' ? '' : path;
	if (sitemap && !sitemap.includes(`<loc>https://nishants.dev${url}</loc>`)) {
		fail(`${path} is missing from the sitemap`);
	}
}

// --- Report -------------------------------------------------------------------
console.log(`Checked ${pages.length} pages, ${internalLinks.size} internal links.`);

for (const message of warnings) console.log(`  warn  ${message}`);
for (const message of failures) console.error(`  FAIL  ${message}`);

if (failures.length) {
	console.error(`\n${failures.length} check(s) failed.`);
	process.exit(1);
}
console.log(`All checks passed${warnings.length ? ` (${warnings.length} warning(s))` : ''}.`);
