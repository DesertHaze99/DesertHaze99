var CACHE_NAME = 'latihan-pwa-cache-v1';

var urlToCache = [
    '/',
    '/js/main.js',
    '/js/jquery.min.js',
    '/css/main.css',
    '/manifest.json',
    '/fallback.json',
    '/images/15083098352901077999132.jpg'
];

// install cache on browser

self.addEventListener('install', function(event){
    // do install
    event.waitUntil(
        caches.open(CACHE_NAME).then(
            function(cache){
                // cek apakah CACHE sudah terinstall
                console.log("service worker do install...");
                return cache.addAll(urlToCache);
            }
        )
    )
    self.skipWaiting();
});

//aktifasi SW
self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys().then(function(cacheNames){
            return Promise.all(
                // jika sudah ada cache dengan versi beda maka dihapus
                cacheNames.filter(function(cacheName){
                    return cacheName !== CACHE_NAME;
                }).map(function(cacheName){
                    return caches.delete(cacheName);
                })
            );
        })
    );
    if(self.clients && clients.claim){
        clients.claim();
    }
});

//fetch cache
self.addEventListener('fetch', function(event){
    var request = event.request;
    var url = new URL(request.url);

    /*
    * menggunakan git
    */
    if(url.origin=== location.origin){
        event.respondWith(
            caches.match(request).then(function(response){
                // jika ada di data maka ditampilkan data cache, jika tidak maka patch request
                return response || fetch(request);
            })
        )
    } else {
        // Internet API
        event.respondWith(
            caches.open('mahasiswa-cache-v1').then(function(cache){
                return fetch(request).then(function(liveRequest){
                    cache.put(request, liveRequest.clone());
                    // save caches to mahasiswa-cache-v1
                    return liveRequest;
                }).catch(function(){
                    return caches.match(request).then(function(response){
                        if(response) return response;
                        return caches.match('/fallback.json');
                    })
                })
            })
        )
    }



    // event.respondWith(
    //     caches.match(event.request).then(function(response){
    //         console.log(response);
    //         if(response){
    //             return response;
    //         }
    //         return fetch(event.request);
    //     })
    // )
});

self.addEventListener('notificationclose', function(n){
    var notification = n.notification;
    var primaryKey = notification.data.primaryKey;

    console.log('Closed Notification : ' + primaryKey);
});

self.addEventListener('notificationclick', function(n){
    var notification = n.notification;
    var primaryKey = notification.data.primaryKey;
    var action = n.action;

    console.log('Notification : ', primaryKey);
    if(action==='close'){
        notification.close();
    } else {
<<<<<<< HEAD
        clients.openWindow('https://deserthaze99.github.io//');
=======
        clients.openWindow('https://deserthaze99.github.io');
>>>>>>> 0c5cec41bc1622a7514505228b1293920072aa13
        notification.close();
    }
});

    self.addEventListener('sync', function(event){
        console.log('firing sync');
        if(event.tag === 'image-fetch'){
            console.log('sync event fired');
            event.waitUntil(fetchImage());
        }
    })

    function fetchImage(){
        console.log('firing fetchImage()');
        fetch('/images/15083098352901077999132.jpg').then(function(response){
            return response;
        }).then(function(text){
            console.log('Request success', text);
        }).catch(function(err){
            console.log('Request failed', err)
        })
    }
    
<<<<<<< HEAD
=======
});
>>>>>>> 0c5cec41bc1622a7514505228b1293920072aa13
