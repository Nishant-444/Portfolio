import { SITE } from '../config/site';

/**
 * The site builds with `format: 'file'`, so during rendering `Astro.url`
 * carries the on-disk name (`/about.html`, `/index.html`) rather than the URL
 * the host actually serves. Everything user-facing — canonical tags, OG URLs,
 * JSON-LD @id values — has to use the served form or search engines will index
 * a second copy of every page.
 */
export function canonicalPath(url: URL): string {
	let path = url.pathname;
	path = path.replace(/index\.html$/, '');
	path = path.replace(/\.html$/, '');
	path = path.replace(/\/+$/, '');
	return path === '' ? '/' : path;
}

export function canonicalUrl(url: URL): string {
	return new URL(canonicalPath(url), SITE.url).href.replace(/\/$/, '') || SITE.url;
}
