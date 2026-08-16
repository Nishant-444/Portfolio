import { defineConfig } from 'astro/config';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';

import { SITE } from './src/config/site';

// https://astro.build/config
export default defineConfig({
	site: SITE.url,
	trailingSlash: 'never',
	build: {
		// Emit `/about.html` rather than `/about/index.html` so the URLs the
		// canonical tags advertise are exactly what the host serves.
		format: 'file',
		inlineStylesheets: 'always',
	},
	markdown: {
		// Matches the site palette — Shiki's default github-dark ships a grey
		// background that fights the Night Owl blues everywhere else.
		shikiConfig: { theme: 'night-owl', wrap: false },
	},
	integrations: [
		sitemap({
			// OG image endpoints are assets, not pages.
			filter: (page) => !page.includes('/og/'),
			serialize(item) {
				const path = item.url.replace(SITE.url, '').replace(/\/$/, '');
				if (path === '') {
					item.priority = 1.0;
					item.changefreq = ChangeFreqEnum.WEEKLY;
				} else if (path.startsWith('/blog/')) {
					item.priority = 0.7;
					item.changefreq = ChangeFreqEnum.MONTHLY;
				} else {
					item.priority = 0.8;
					item.changefreq = ChangeFreqEnum.MONTHLY;
				}
				return item;
			},
		}),
	],
	vite: {
		build: {
			cssMinify: 'lightningcss',
		},
	},
});
