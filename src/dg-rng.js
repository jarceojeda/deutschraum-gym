/* dg-rng.js — generador pseudoaleatorio.
 * La semilla NO depende de la fecha: por defecto sale de crypto.getRandomValues
 * (o Math.random como último recurso). Una semilla fija solo se usa en tests/simulaciones. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});

  function mulberry32(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function entropySeed() {
    try {
      if (g.crypto && typeof g.crypto.getRandomValues === 'function') {
        var b = new Uint32Array(1);
        g.crypto.getRandomValues(b);
        return b[0] >>> 0;
      }
    } catch (e) { /* cae al respaldo */ }
    return Math.floor(Math.random() * 4294967296) >>> 0;
  }

  function create(seed) {
    var s = seed === undefined || seed === null ? entropySeed() : seed >>> 0;
    var f = mulberry32(s);
    var rng = {
      seed: s,
      deterministic: !(seed === undefined || seed === null),
      next: f,
      int: function (n) { return Math.floor(f() * n); },
      pick: function (arr) { return arr[Math.floor(f() * arr.length)]; },
      shuffle: function (arr) {
        var a = arr.slice();
        for (var i = a.length - 1; i > 0; i--) {
          var j = Math.floor(f() * (i + 1));
          var t = a[i]; a[i] = a[j]; a[j] = t;
        }
        return a;
      }
    };
    return rng;
  }

  DG.rng = { create: create, mulberry32: mulberry32, entropySeed: entropySeed };
  if (typeof module === 'object' && module.exports) module.exports = DG.rng;
})(typeof globalThis !== 'undefined' ? globalThis : this);
