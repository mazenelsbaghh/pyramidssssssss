const CACHE_NAME = 'pyramids-cache-v1';
const urlsToCache = [
    '/',
    '/logo.png',
    '/ultras1.mp3',
    '/tifo1.png',
    '/tifo2.jpeg',
    '/tifo3.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
}); 