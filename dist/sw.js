/* sw.js — service worker de Deutschraum Gym (generado por tools/build.js; NO editar dist/sw.js a mano).
 * Estrategia: precache del «app shell» (un solo HTML autocontenido + manifest + iconos) y caché primero.
 * Los DATOS del usuario viven en localStorage: este worker nunca los toca. Cada versión tiene su caché (hash del HTML);
 * al activarse borra las cachés antiguas. Sin red, las navegaciones se sirven desde caché. */
'use strict';
var CACHE = 'dg-5ffaea683d';
var ASSETS = ["./","./index.html","./manifest.webmanifest","./icons/icon.svg","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./icons/apple-touch-icon.png"];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf('dg-') === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;                       // sólo lo propio
  if (req.mode === 'navigate') {
    // la app es un único HTML: cualquier navegación dentro del alcance recibe el shell (con o sin red)
    e.respondWith(caches.match('./index.html', { cacheName: CACHE }).then(function (hit) { return hit || fetch(req); }));
    return;
  }
  e.respondWith(caches.match(req, { cacheName: CACHE }).then(function (hit) {
    return hit || fetch(req).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return res;
    });
  }));
});
