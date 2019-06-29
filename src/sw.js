/**
 * By default the home route is cached
 */
const routes = `[
	'/',
	'icons/icon-72x72.png',
	'icons/icon-96x96.png',
	'icons/icon-128x128.png',
	'icons/icon-144x144.png',
	'icons/icon-152x152.png',
	'icons/icon-192x192.png',
	'icons/icon-384x384.png',
	'icons/icon-512x512.png',
	'launch-screens/launch-screen-1125x2436.png',
	'launch-screens/launch-screen-1136x640.png',
	'launch-screens/launch-screen-1242x2208.png',
	'launch-screens/launch-screen-1242x2688.png',
	'launch-screens/launch-screen-1334x750.png',
	'launch-screens/launch-screen-1536x2048.png',
	'launch-screens/launch-screen-1668x2224.png',
	'launch-screens/launch-screen-1668x2388.png',
	'launch-screens/launch-screen-1792x828.png',
	'launch-screens/launch-screen-2048x1536.png',
	'launch-screens/launch-screen-2048x2732.png',
	'launch-screens/launch-screen-2208x1242.png',
	'launch-screens/launch-screen-2224x1668.png',
	'launch-screens/launch-screen-2388x1668.png',
	'launch-screens/launch-screen-2436x1125.png',
	'launch-screens/launch-screen-2688x1242.png',
	'launch-screens/launch-screen-2732x2048.png',
	'launch-screens/launch-screen-640x1136.png',
	'launch-screens/launch-screen-750x1334.png',
	'launch-screens/launch-screen-828x1792.png'
]`;

/**
 * Generate a service-worker.js file
 */
module.exports = function(name) {
	return `const CACHE_NAME = '${name}-cache';
const urlsToCache = ${routes};

self.addEventListener('install', event => {
	self.skipWaiting();

	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			if (response) {
				return response;
			}

			const fetchRequest = event.request.clone();

			return fetch(fetchRequest).then(response => {
				if (
					!response ||
					response.status !== 200 ||
					response.type !== 'basic'
				) {
					return response;
				}

				const responseToCache = response.clone();

				event.waitUntil(
					caches.open(CACHE_NAME).then(cache => {
						cache.put(event.request, responseToCache);
					})
				);

				return response;
			});
		})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches
			.keys()
			.then(cacheNames =>
				Promise.all(
					cacheNames
						.filter(cacheName => cacheName !== CACHE_NAME)
						.map(cacheName => caches.delete(cacheName))
				)
			)
	);
});
`;
};
