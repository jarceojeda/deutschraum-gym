/* dgui-util.js — utilidades de la interfaz: creación de nodos, NFC, tema, vibración. Sin dependencias. */
(function (g) {
  'use strict';
  var U = {};
  // h('div.clase#id', {atributos}, hijos...) — texto siempre como nodo de texto (nunca innerHTML).
  U.h = function (sel, attrs) {
    var m = /^([a-z0-9]*)((?:[.#][\w-]+)*)$/i.exec(sel), tag = m[1] || 'div', doc = U.doc || g.document;
    var el = doc.createElement(tag);
    (m[2].match(/[.#][\w-]+/g) || []).forEach(function (p) { if (p[0] === '.') el.classList.add(p.slice(1)); else el.id = p.slice(1); });
    var rest = Array.prototype.slice.call(arguments, 1);
    if (rest[0] && typeof rest[0] === 'object' && !rest[0].nodeType && !Array.isArray(rest[0])) {
      var a = rest.shift();
      Object.keys(a).forEach(function (k) {
        var v = a[k]; if (v == null || v === false) return;
        if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
        else if (k === 'class') v.split(' ').forEach(function (c) { if (c) el.classList.add(c); });
        else if (k === 'disabled') el.disabled = !!v;
        else el.setAttribute(k, v === true ? '' : v);
      });
    }
    (function add(list) {
      list.forEach(function (c) {
        if (c == null || c === false) return;
        if (Array.isArray(c)) return add(c);
        el.appendChild(c.nodeType ? c : doc.createTextNode(String(c)));
      });
    })(rest);
    return el;
  };
  U.nfc = function (s) { return String(s == null ? '' : s).normalize('NFC'); };
  U.clear = function (el) { while (el.firstChild) el.removeChild(el.firstChild); return el; };
  U.shuffle = function (arr, rnd) {
    var a = arr.slice(), r = rnd || Math.random;
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  };
  // Preferencias de la UI (clave aparte del progreso del motor).
  U.prefs = function (storage) {
    var KEY = 'dg.ui', cur = { theme: 'auto', vibrate: true, auto: true, entry: 'touch', level: 'auto', ruleFirst: true, voice: 'off', tables: true };
    try { var raw = storage && storage.getItem(KEY); if (raw) cur = Object.assign(cur, JSON.parse(raw)); } catch (e) { /* ignora */ }
    return {
      get: function (k) { return cur[k]; },
      set: function (k, v) { cur[k] = v; try { storage && storage.setItem(KEY, JSON.stringify(cur)); } catch (e) { /* sin guardar: sigue funcionando */ } }
    };
  };
  U.applyTheme = function (doc, theme) {
    if (theme === 'light' || theme === 'dark') doc.documentElement.setAttribute('data-theme', theme);
    else doc.documentElement.removeAttribute('data-theme');
  };
  U.buzz = function (win, prefs, ms) {
    try {
      if (!prefs.get('vibrate') || !win.navigator.vibrate) return;
      if (win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      win.navigator.vibrate(ms);
    } catch (e) { /* ignora */ }
  };
  g.DGUI = g.DGUI || {}; g.DGUI.util = U;
})(typeof globalThis !== 'undefined' ? globalThis : this);
