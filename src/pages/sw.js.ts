import type { APIRoute } from 'astro';

/**
 * Service worker, generated so the cache name carries a build stamp — a new
 * deploy always invalidates the old cache instead of stranding visitors on
 * stale HTML.
 *
 * Strategy:
 * - HTML: network first, cache as fallback. Content updates always win.
 * - Hashed build output, fonts and OG images: cache first. They are immutable.
 * - Everything else: straight to the network.
 */
export const GET: APIRoute = () => {
	const version = `v${Date.now().toString(36)}`;

	const body = `const CACHE = 'nishants-dev-${version}';
const PRECACHE = ['/', '/about', '/projects', '/blog', '/contact', '/404'];
const IMMUTABLE = [/^\\/_astro\\//, /^\\/assets\\/fonts\\//, /^\\/og\\//];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(PRECACHE))
			.catch(() => undefined)
			.then(() => self.skipWaiting()),
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
			)
			.then(() => self.clients.claim()),
	);
});

self.addEventListener('fetch', (event) => {
	const request = event.request;
	if (request.method !== 'GET') return;

	const url = new URL(request.url);
	if (url.origin !== self.location.origin) return;

	if (IMMUTABLE.some((pattern) => pattern.test(url.pathname))) {
		event.respondWith(
			caches.match(request).then(
				(hit) =>
					hit ||
					fetch(request).then((response) => {
						const copy = response.clone();
						caches.open(CACHE).then((cache) => cache.put(request, copy));
						return response;
					}),
			),
		);
		return;
	}

	if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
		event.respondWith(
			fetch(request)
				.then((response) => {
					const copy = response.clone();
					caches.open(CACHE).then((cache) => cache.put(request, copy));
					return response;
				})
				.catch(() => caches.match(request).then((hit) => hit || caches.match('/'))),
		);
	}
});
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/javascript; charset=utf-8',
			'Cache-Control': 'no-cache',
			'Service-Worker-Allowed': '/',
		},
	});
};
