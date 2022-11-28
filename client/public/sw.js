let cacheData = 'AppV1'
this.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            try{cache.addAll([
                '/index.html',
                '/',
            ])}catch(error){
              console.log({error});
            }
        })
    )
})

this.addEventListener('fetch',(event)=>{
    event.respondWith((async () => {
        try{const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          return cachedResponse;
        }
      
        const response = await fetch(event.request);
      
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
      
        return response;}catch(error){
          return {}
        }
      })());
})
