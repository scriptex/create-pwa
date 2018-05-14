const routes = `[
	'/'
]`;

module.exports = function(name) {
	return `
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('${name}-cache').then(function(cache) {
			return cache.addAll(${routes});
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				return response;
			}

			return fetch(event.request);
		})
	);
});
`;
};
