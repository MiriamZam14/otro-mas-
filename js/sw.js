;
const CACHE_NAME='v1_cache_Isic_page',
urlsToCache=[
  './',
  'https://fonts.googleapis.com/css?family=Varela+Round',
  'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i',
  './vendor/bootstrap/css/bootstrap.min.css',
  './vendor/fontawesome-free/css/all.min.css',
  './css/grayscale.min.css',
  './css/grayscale.css',
  './js/script.js',
  './js/particulas.js',
  './js/particles.js'
]
self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{
      return cache.addAll(urlsToCache)
      .then(() =>self.skipWaiting())
    })
    .cath(err=>console.log("fallo resgistro de cache",err))
  )
})
self.addEventListener('activate',e=>{
  const cacheWhiteList=[CACHE_NAME]

  e.waitUntil(
    caches.keys()
    .then(cachesNames=>{
      cacheNames.map(cacheName=>{
        if(cacheWhiteList.indexOf(cacheName)===-1){
          return caches.delete(cacheName)
        }
      })
    })
    .then(()=>self.clients.claim())
  )
})
self.addEventListener('fetch',e=>{
  e.respondWith(caches.math(e.request)
  .then(res=>{
    if(res){
      return res
    }
    return fetch(e.request)
  })
)
})
