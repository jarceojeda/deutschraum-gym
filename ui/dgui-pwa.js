/* dgui-pwa.js — PWA: registro del service worker (sólo http/https), aviso de nueva versión, botón «Instalar» y almacenamiento persistente.
 * Sin dependencias; todo con try/catch: en un archivo local (file://) o sin soporte, la app funciona igual. */
(function (g) {
  'use strict';
  var P = {}, st = { offline: false, installable: false, installed: false, persisted: null, updated: false }, listeners = [], deferred = null;
  function emit() { listeners.forEach(function (f) { try { f(st); } catch (e) { /* ignora */ } }); }
  P.state = function () { return st; };
  P.onChange = function (f) { listeners.push(f); };

  P.init = function (win) {
    var nav = win.navigator, doc = win.document;
    try { st.installed = !!(win.matchMedia && win.matchMedia('(display-mode: standalone)').matches) || nav.standalone === true; } catch (e) { /* ignora */ }
    // instalación: Chrome/Android lanza beforeinstallprompt cuando cumple los criterios
    win.addEventListener('beforeinstallprompt', function (ev) { try { ev.preventDefault(); } catch (e) { /* ignora */ } deferred = ev; st.installable = true; emit(); });
    win.addEventListener('appinstalled', function () { deferred = null; st.installable = false; st.installed = true; emit(); });
    // service worker
    try {
      if (nav.serviceWorker && /^https?:$/.test(win.location.protocol)) {
        var had = !!nav.serviceWorker.controller;
        nav.serviceWorker.register('sw.js').then(function () { return nav.serviceWorker.ready; }).then(function () { st.offline = true; emit(); }).catch(function () { /* sin SW: sigue online */ });
        nav.serviceWorker.addEventListener('controllerchange', function () { if (had) { st.updated = true; emit(); } had = true; });
      }
    } catch (e) { /* ignora */ }
    // almacenamiento persistente: evita que el navegador borre el progreso al limpiar espacio
    try {
      if (nav.storage && nav.storage.persisted) nav.storage.persisted().then(function (p) { st.persisted = !!p; emit(); if (!p && nav.storage.persist) return nav.storage.persist().then(function (ok) { st.persisted = !!ok; emit(); }); });
    } catch (e) { /* ignora */ }
  };
  // → Promise<'accepted'|'dismissed'|'unavailable'>
  P.install = function () {
    if (!deferred) return Promise.resolve('unavailable');
    var d = deferred; deferred = null; st.installable = false; emit();
    try { d.prompt(); return Promise.resolve(d.userChoice).then(function (c) { return c && c.outcome ? c.outcome : 'dismissed'; }); } catch (e) { return Promise.resolve('unavailable'); }
  };
  g.DGUI = g.DGUI || {}; g.DGUI.pwa = P;
})(typeof globalThis !== 'undefined' ? globalThis : this);
