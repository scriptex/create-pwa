/**
 * Internal dependencies
 */
const { iconFiles, launchScreenFiles, appleTouchIconFiles, faviconFiles, msTileFiles } = require('./helpers');

/**
 * Convert a list of file to human readable list
 * @param {File[]} files
 */
const filesToString = files => files.map(file => `'${file}'`).join(',\n\t');

/**
 * Cache all routes and files
 */
const routes = `[
	'/',
	${filesToString(iconFiles)},
	${filesToString(launchScreenFiles)},
	${filesToString(appleTouchIconFiles)},
	${filesToString(faviconFiles)},
	${filesToString(msTileFiles)},
	'favicons/favicon.ico'
]`;

/**
 * Generate a service-worker.js file
 */
module.exports = name => `const CACHE_NAME = '${name}-cache';
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
