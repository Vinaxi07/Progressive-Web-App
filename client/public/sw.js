let cacheData = 'AppV1'
this.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll([
                '/index.html',
                '/',
            ])
        })
    )
})

this.addEventListener('fetch',(event)=>{
    event.respondWith((async () => {
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
      
        const response = await fetch(event.request);
      
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
      
        return response;
    
      })());
})
