var CACHE_VERSION = 'restaurant-reviews';
var CACHE_FILES = [
	'/',
	'/index.html',
	'/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
	'/js/main.js',
	'/data/restaurants.json',
	'/js/restaurant_info.js',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'
];

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_VERSION).then(function (cache) {
			return cache.addAll(CACHE_FILES);
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(caches.match(event.request).then(function (response) {
		if (response !== undefined) {
			return response;
		} else {
			return fetch(event.request).then(function (response) {
				var responseClone = response.clone();
				caches.open(CACHE_VERSION).then(function (cache) {
					cache.put(event.request, responseClone);
				});
				return response;
			});
		}
	}));
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }));
        })
    );
});
