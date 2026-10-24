// Eco Survey service worker: app shell offline; map tiles always from the network.
const V='eco-survey-2.2.0';
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request,u=new URL(req.url);if(req.method!=='GET')return;
  if(u.hostname.endsWith('tile.openstreetmap.org')||u.hostname==='api.vworld.kr')return;
  if(req.mode==='navigate'){e.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put('index.html',c));return r}).catch(()=>caches.match('index.html')));return}
  if(u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com'||u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.match(req).then(m=>m||fetch(req).then(r=>{if(r.ok||r.type==='opaque'){const c=r.clone();caches.open(V).then(x=>x.put(req,c))}return r})));
  }
});
