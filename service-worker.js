let cacheName = 'blackjack-cache';
let cacheFiles = [
    './',
    'index.html',
    'css/app.css',
    'js/app.js',
    'https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap'
]

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then((x) => {
        return x.addAll(cacheFiles);
    })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((y) => {
            return Promise.all(
                y.filter(y => y !== cacheName).map(y => caches.delete(y))
            )
        })
    )
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
  
        return fetch(event.request).then(
        function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
            }
            var responseToCache = response.clone();

            caches.open(cacheName)
            .then(function(cache) {
                cache.put(event.request, responseToCache);
            });

            return response;
        }
        );
    })
    );
});