function insertImages(){
  const images = [];
  for(let i=1; i<11; i++){
    images.push(`./webp/${i}.webp`);
  }
  return images;
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cached-content').then(function(cache) {
      return cache.addAll(
        [
          '/',
          '/manifest.json',
          '/index.html',
          '/restaurant.html',
          '/js/dbhelper.js',
          '/js/restaurant_info.js',
          '/js/main.js',
          '/js/idb.js',
          '/js/focusfix.js',
          '/css/styles.css',
          '/data/restaurants.json'/*,
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
          '/img/6.jpg',
          '/img/7.jpg',
          '/img/8.jpg',
          '/img/9.jpg',
          '/img/10.jpg'*/
        ].concat(insertImages())
      );
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
      caches.keys().then(keyList => {
          return Promise.all(keyList.map(key => {
              if(key !== 'cached-content') {
                console.log('Old Cache Removed', key);
                return caches.delete(key);
                }
            }));
        })
    );
});

/* On Network Response Approach */

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('cached-content').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
