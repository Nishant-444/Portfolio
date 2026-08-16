/**
 * Pre-build asset pipeline.
 *
 * 1. Subsets JetBrains Mono down to the glyphs this site actually renders.
 *    The full family ships ~93 KB per weight; four weights is 376 KB of font
 *    for a page made of maybe 200 distinct characters.
 * 2. Optimises the logo SVG.
 *
 * Both outputs land in `public/` and are gitignored — `src/assets/` holds the
 * originals. Runs automatically before `dev` and `build`, so adding a new
 * character to any source file can never produce tofu.
 */

import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import subsetFont from 'subset-font';
import { optimize } from 'svgo';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const FONT_SRC = join(root, 'src/assets/fonts');
const FONT_OUT = join(root, 'public/assets/fonts');

/**
 * Directories scanned for characters that need glyph coverage. Anything the
 * site can render must be reachable from one of these.
 */
const TEXT_SOURCES = ['src'];
const TEXT_EXTENSIONS = new Set([
	'.astro',
	'.ts',
	'.js',
	'.mjs',
	'.md',
	'.json',
	'.css',
]);

/** Always included regardless of current content, so small edits stay safe. */
const BASELINE_CHARS = [
	// Printable ASCII.
	...Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)),
	// Punctuation and symbols the terminal aesthetic leans on.
	'—–…‘’“”•·×÷°±≈≠≤≥→←↑↓⇒',
	// Box drawing and blocks used by the ASCII banner and separators.
	'─━│┃┌┐└┘├┤┬┴┼╱╲╳█▓▒░▪▸►',
	'═║╔╗╚╝╠╣╦╩╬▀▄',
	// Currency and accented Latin, in case a project name needs them.
	'€£¥₹§¶†‡',
	'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëìíîïñòóôõöøùúûüýÿ',
].join('');

async function* walk(dir) {
	let entries;
	try {
		entries = await readdir(dir, { withFileTypes: true });
	} catch {
		return;
	}
	for (const entry of entries) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			if (entry.name === 'node_modules' || entry.name === 'fonts') continue;
			yield* walk(full);
		} else if (entry.isFile()) {
			yield full;
		}
	}
}

async function collectCharacters() {
	const chars = new Set(BASELINE_CHARS);
	for (const source of TEXT_SOURCES) {
		for await (const file of walk(join(root, source))) {
			const ext = file.slice(file.lastIndexOf('.'));
			if (!TEXT_EXTENSIONS.has(ext)) continue;
			const contents = await readFile(file, 'utf8');
			for (const ch of contents) chars.add(ch);
		}
	}
	// Control characters have no glyphs and confuse the subsetter.
	for (const ch of [...chars]) {
		if (ch.codePointAt(0) < 32) chars.delete(ch);
	}
	return [...chars].join('');
}

async function subsetFonts(text) {
	await mkdir(FONT_OUT, { recursive: true });
	const files = (await readdir(FONT_SRC)).filter((f) => f.endsWith('.woff2'));

	let before = 0;
	let after = 0;

	for (const file of files) {
		const input = join(FONT_SRC, file);
		const output = join(FONT_OUT, file);
		const buffer = await readFile(input);
		const subset = await subsetFont(buffer, text, { targetFormat: 'woff2' });
		await writeFile(output, subset);

		before += (await stat(input)).size;
		after += subset.length;
		console.log(
			`  ${file.padEnd(30)} ${kb(buffer.length)} → ${kb(subset.length)}`,
		);
	}

	console.log(
		`  ${'total'.padEnd(30)} ${kb(before)} → ${kb(after)} (${Math.round(
			(1 - after / before) * 100,
		)}% smaller)`,
	);
}

async function optimizeSvg() {
	const input = join(root, 'src/assets/nslogo.svg');
	const output = join(root, 'public/nslogo.svg');
	let raw;
	try {
		raw = await readFile(input, 'utf8');
	} catch {
		console.log('  no source logo found, skipping');
		return;
	}
	const result = optimize(raw, {
		path: input,
		multipass: true,
		floatPrecision: 2,
		plugins: ['preset-default'],
	});
	await mkdir(dirname(output), { recursive: true });
	await writeFile(output, result.data);
	console.log(
		`  ${relative(root, output).padEnd(30)} ${kb(
			Buffer.byteLength(raw),
		)} → ${kb(Buffer.byteLength(result.data))}`,
	);
}

function kb(bytes) {
	return `${(bytes / 1024).toFixed(1)} KB`.padStart(9);
}

console.log('Subsetting fonts…');
const text = await collectCharacters();
console.log(`  charset: ${[...new Set(text)].length} unique glyphs`);
await subsetFonts(text);

console.log('Optimising SVG…');
await optimizeSvg();
