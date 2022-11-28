let cacheData = 'AppV1'
this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      try {
        cache.addAll([
          '/static/js/main.chunk.js',
          '/static/js/0.chunk.js',
          '/static/js/bundle.js',
          '/index.html',
          '/',
        ])
      } catch (error) {
        console.log({ error });
      }
    })
  )
})
this.addEventListener('fetch', (event) => {
  // check if online or offline
  if (!navigator.onLine) {
    event.respondWith((async () => {
      try {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }

        const response = await fetch(event.request);

        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        return response;
      } catch (error) {
        return {}
      }
    })());
  }
})