import type { APIRoute } from 'astro';

import { SITE, absolute } from '../config/site';

/**
 * Generated so the sitemap URL can never drift from the configured domain —
 * the previous hand-written file pointed at a host the site no longer used.
 */
export const GET: APIRoute = () => {
	// /og/ is deliberately left crawlable: Facebook, LinkedIn and X all honour
	// robots.txt before fetching og:image, so disallowing it would break every
	// link preview.
	const body = [
		'User-agent: *',
		'Allow: /',
		'',
		`Sitemap: ${absolute('/sitemap-index.xml')}`,
		`Host: ${SITE.url.replace('https://', '')}`,
		'',
	].join('\n');

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};
