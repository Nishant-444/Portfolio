/**
 * Build-time Open Graph card generator.
 *
 * Renders a terminal window as SVG and rasterises it with resvg, using the
 * real JetBrains Mono glyphs rather than whatever fonts the build box happens
 * to have. Runs once per page during `astro build`; nothing here ships to the
 * browser.
 */

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Resvg } from '@resvg/resvg-js';
import wawoff2 from 'wawoff2';

import { SITE, PERSON } from '../config/site';

const WIDTH = 1200;
const HEIGHT = 630;

/** JetBrains Mono advances every glyph by exactly 0.6em. */
const ADVANCE = 0.6;

const PALETTE = {
	page: '#01111d',
	window: '#011627',
	chrome: '#01223a',
	border: '#0b2942',
	fg: '#d6deeb',
	cyan: '#7fdbca',
	green: '#addb67',
	yellow: '#ffcb8b',
	comment: '#8fa6ad',
	purple: '#c792ea',
};

const FONT_FILES = [
	'JetBrainsMono-Regular.woff2',
	'JetBrainsMono-Medium.woff2',
	'JetBrainsMono-Bold.woff2',
] as const;

let fontCache: Buffer[] | null = null;

async function loadFonts(): Promise<Buffer[]> {
	if (fontCache) return fontCache;
	const buffers: Buffer[] = [];
	for (const file of FONT_FILES) {
		// Resolved from the project root: this module is bundled into
		// dist/.prerender during build, so import.meta.url points at the wrong
		// place by then.
		const path = join(process.cwd(), 'src/assets/fonts', file);
		const woff2 = await readFile(path);
		const ttf = await wawoff2.decompress(woff2);
		buffers.push(Buffer.from(ttf));
	}
	fontCache = buffers;
	return buffers;
}

function escapeXml(value: string): string {
	return value.replace(/[<>&'"]/g, (c) => {
		switch (c) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case "'":
				return '&apos;';
			default:
				return '&quot;';
		}
	});
}

/** Greedy wrap on a fixed-advance font, with a hard ellipsis after maxLines. */
function wrap(
	text: string,
	fontSize: number,
	maxWidth: number,
	maxLines: number,
): string[] {
	const perLine = Math.max(8, Math.floor(maxWidth / (fontSize * ADVANCE)));
	const lines: string[] = [];
	let current = '';

	for (const word of text.split(/\s+/).filter(Boolean)) {
		const candidate = current ? `${current} ${word}` : word;
		if (candidate.length <= perLine) {
			current = candidate;
			continue;
		}
		if (current) lines.push(current);
		// A single word longer than the line gets hard-split.
		let rest = word;
		while (rest.length > perLine) {
			lines.push(rest.slice(0, perLine));
			rest = rest.slice(perLine);
		}
		current = rest;
	}
	if (current) lines.push(current);

	if (lines.length <= maxLines) return lines;
	const clipped = lines.slice(0, maxLines);
	const last = clipped[maxLines - 1]!;
	clipped[maxLines - 1] =
		last.length > perLine - 1 ? `${last.slice(0, perLine - 1)}…` : `${last}…`;
	return clipped;
}

export interface OgOptions {
	/** The command that would produce this page in the terminal, e.g. `about`. */
	command: string;
	title: string;
	subtitle?: string;
	/** Small label bottom-right, e.g. a publication date. */
	badge?: string;
	/** Overrides the name/role byline — used where the title already is the name. */
	footerText?: string;
}

function buildSvg({
	command,
	title,
	subtitle,
	badge,
	footerText,
}: OgOptions): string {
	const pad = 56;
	const winX = pad;
	const winY = pad;
	const winW = WIDTH - pad * 2;
	const winH = HEIGHT - pad * 2;
	const chromeH = 56;
	const innerX = winX + 44;
	const contentW = winW - 88;

	const titleSize = title.length > 46 ? 50 : 62;
	const titleLines = wrap(title, titleSize, contentW, 3);

	// Keep the block clear of the footer: a taller title leaves fewer lines
	// for the subtitle.
	const subtitleMax = titleLines.length >= 3 ? 1 : titleLines.length === 2 ? 2 : 3;
	const subtitleSize = 22;
	const subtitleLines = subtitle
		? wrap(subtitle, subtitleSize, contentW, subtitleMax)
		: [];

	let y = winY + chromeH + 76;

	const promptSize = 26;
	const promptText = `${SITE.user}@${SITE.host}:~$`;
	const promptFits = Math.floor(contentW / (promptSize * ADVANCE));
	const commandRoom = promptFits - promptText.length - 1;
	const shownCommand =
		command.length > commandRoom
			? `${command.slice(0, Math.max(1, commandRoom - 1))}…`
			: command;

	const parts: string[] = [];

	parts.push(`
    <text x="${innerX}" y="${y}" font-family="JetBrains Mono" font-size="${promptSize}" font-weight="500" fill="${PALETTE.green}">${escapeXml(promptText)}<tspan fill="${PALETTE.yellow}" xml:space="preserve"> ${escapeXml(shownCommand)}</tspan></text>`);

	y += 74;

	for (const line of titleLines) {
		parts.push(`
    <text x="${innerX}" y="${y}" font-family="JetBrains Mono" font-size="${titleSize}" font-weight="700" fill="${PALETTE.cyan}">${escapeXml(line)}</text>`);
		y += titleSize * 1.22;
	}

	if (subtitleLines.length) {
		y += 20;
		for (const line of subtitleLines) {
			parts.push(`
    <text x="${innerX}" y="${y}" font-family="JetBrains Mono" font-size="${subtitleSize}" fill="${PALETTE.comment}">${escapeXml(line)}</text>`);
			y += 34;
		}
	}

	const footY = winY + winH - 44;
	const byline = footerText
		? `<text x="${innerX}" y="${footY}" font-family="JetBrains Mono" font-size="24" fill="${PALETTE.comment}">${escapeXml(footerText)}</text>`
		: `<text x="${innerX}" y="${footY}" font-family="JetBrains Mono" font-size="24" font-weight="500" fill="${PALETTE.purple}">${escapeXml(PERSON.name)}<tspan fill="${PALETTE.comment}" xml:space="preserve">  ·  ${escapeXml(PERSON.jobTitle)}</tspan></text>`;
	parts.push(`
    ${byline}`);

	if (badge) {
		const right = winX + winW - 44;
		parts.push(`
    <text x="${right}" y="${footY}" text-anchor="end" font-family="JetBrains Mono" font-size="24" fill="${PALETTE.cyan}">${escapeXml(badge)}</text>`);
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${PALETTE.page}"/>
  <rect x="${winX}" y="${winY}" width="${winW}" height="${winH}" rx="18" fill="${PALETTE.window}" stroke="${PALETTE.border}" stroke-width="2"/>
  <path d="M${winX} ${winY + 18}a18 18 0 0 1 18-18h${winW - 36}a18 18 0 0 1 18 18v${chromeH - 18}H${winX}z" fill="${PALETTE.chrome}"/>
  <circle cx="${winX + 30}" cy="${winY + chromeH / 2}" r="7" fill="#ff5f56"/>
  <circle cx="${winX + 54}" cy="${winY + chromeH / 2}" r="7" fill="#ffbd2e"/>
  <circle cx="${winX + 78}" cy="${winY + chromeH / 2}" r="7" fill="#27c93f"/>
  <text x="${winX + winW / 2}" y="${winY + chromeH / 2 + 8}" text-anchor="middle" font-family="JetBrains Mono" font-size="22" fill="${PALETTE.comment}">${escapeXml(SITE.url.replace('https://', ''))}</text>
  ${parts.join('')}
</svg>`;
}

export async function renderOgImage(options: OgOptions): Promise<Buffer> {
	const fontBuffers = await loadFonts();
	const resvg = new Resvg(buildSvg(options), {
		fitTo: { mode: 'width', value: WIDTH },
		font: {
			// resvg-js supports fontBuffers at runtime but omits it from its
			// published types, so the whole object is widened here.
			fontBuffers,
			defaultFontFamily: 'JetBrains Mono',
			loadSystemFonts: false,
		} as unknown as { loadSystemFonts: boolean },
	});
	return Buffer.from(resvg.render().asPng());
}

export const OG_SIZE = { width: WIDTH, height: HEIGHT } as const;
