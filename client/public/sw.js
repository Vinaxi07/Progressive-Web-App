let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/static/css/main.chunk.css',
                '/index.html',
                'http://localhost:3001/static/media/iphone.b4e26663.png',
                'http://localhost:3001/static/media/headphone.5f7898c5.jpeg',
                'http://localhost:3001/static/media/smart-watch.25079951.png',
                'http://localhost:3001/static/media/sim-card.077a171f.png',
                'http://localhost:3001/static/media/macBook.b8f47b44.png',
                '/'
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {

        if (event.request.url === "http://localhost:3001/manifest.json") {
            event.waitUntil(
                this.registration.showNotification("Internet", {
                    body: "internet not working",
                })
            )
        }
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
}) 

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'send_notification') {

    event.waitUntil(
        this.registration.showNotification("Cart", {
            body: event.data.notification,
        })
    )
    }
  });