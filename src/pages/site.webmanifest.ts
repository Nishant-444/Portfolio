import type { APIRoute } from 'astro';

import { SITE, PERSON } from '../config/site';

export const GET: APIRoute = () => {
	const manifest = {
		name: `${PERSON.name} — ${PERSON.jobTitle}`,
		short_name: SITE.shortName,
		description: SITE.tagline,
		start_url: '/',
		scope: '/',
		id: '/',
		display: 'standalone',
		orientation: 'any',
		background_color: SITE.themeColor,
		theme_color: SITE.themeColor,
		lang: SITE.lang,
		categories: ['portfolio', 'productivity', 'developer'],
		icons: [
			{
				src: '/icon-192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'any',
			},
			{
				src: '/icon-192.png',
				sizes: '192x192',
				type: 'image/png',
				purpose: 'maskable',
			},
			{
				src: '/apple-touch-icon.png',
				sizes: '180x180',
				type: 'image/png',
			},
			{
				src: '/favicon-32x32.png',
				sizes: '32x32',
				type: 'image/png',
			},
		],
		shortcuts: [
			{ name: 'Projects', url: '/projects' },
			{ name: 'Blog', url: '/blog' },
			{ name: 'Contact', url: '/contact' },
		],
	};

	return new Response(JSON.stringify(manifest, null, '\t'), {
		headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
	});
};
