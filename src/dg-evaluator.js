/* dg-evaluator.js — evaluación segura con ä/ö/ü/ß y tolerante donde es pedagógicamente seguro.
 *
 * Veredictos: 'correct' | 'almost' | 'wrong'.
 *   - 'almost' NO da crédito ni penaliza: la UI deja reintentar una vez (errata o diéresis perdida).
 *
 * Escalera de tolerancia (el primer peldaño que coincide fija la nota):
 *   L0 igualdad exacta (NFC)            L1 mayúsculas/espacios («case»)
 *   L2 sin puntuación final             L3 sin puntuación («punctuation»; coma/punto)
 *   L4 equivalencia de teclado ae/oe/ue/ss ↔ ä/ö/ü/ß («translit»)
 * Sólo ítems de clase 'typo' (frases transform/order) pueden dar 'almost', y SÓLO por una errata real:
 * tokenizando, mismo nº de palabras, como mucho 1 palabra distinta, de ≥5 letras, OSA ≤1, que no sea
 * una diéresis perdida y que ninguna de las dos formas esté en CLOSED (artículos/determinantes, pronombres,
 * das/dass, wenn/wen…). Las formas cerradas (den/dem, fährt/fahrt, mit/bei, terminaciones) y los plurales de
 * sustantivos son 'none': jamás se perdona una letra, porque esa letra ES lo que se practica.
 * Diéresis perdida = wrong en todas las clases (ae/oe/ue/ss sigue siendo correct, por teclado).
 *
 * Sinónimos = lo que el dato lista en accept[]. Se respeta accept[] y multi_ok (todas valen igual).
 */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});
  if (typeof require === 'function' && typeof module === 'object') require('./dg-text.js');
  var T = DG.text;

  function toleranceOf(item) {
    if (item.type === 'transform' || item.type === 'order') return 'typo';
    return 'none';
  }

  // Lista cerrada: palabras funcionales cuya «errata» es en realidad OTRA palabra (otro caso, otra función).
  var CLOSED = (function () {
    var w = Object.create(null);
    function add(list) { list.split(/\s+/).forEach(function (x) { if (x) w[x] = true; }); }
    // artículos y determinantes declinados
    add('der die das den dem des ein eine einen einem einer eines kein keine keinen keinem keiner keines');
    add('dieser diese dieses diesen diesem jener jene jenes jenen jenem jeder jede jedes jeden jedem welcher welche welches welchen welchem');
    add('alle allen aller alles manche manchen mancher manches einige einigen einiger viele vielen vieler mehrere mehreren');
    // pronombres personales y reflexivo, todos los casos
    add('ich mich mir du dich dir er ihn ihm es sie ihr ihnen wir uns euch sich man');
    // posesivos en todos los casos (mein-, dein-, sein-, ihr-, unser-, euer-/eur-)
    ['mein', 'dein', 'sein', 'ihr', 'unser', 'eur'].forEach(function (st) {
      w[st] = true; ['e', 'en', 'em', 'er', 'es'].forEach(function (e) { w[st + e] = true; });
    });
    w.euer = true;
    // parejas que sólo se distinguen por una letra y son palabras distintas
    add('das dass wenn wen wann denn den dann als ob also oder weil weit wieder wider seit seid');
    return w;
  })();

  function letterCount(s) { return (s.match(/\p{L}/gu) || []).length; }

  // ¿Las dos frases (ya normalizadas: minúsculas, sin puntuación) difieren en UNA sola palabra por una errata real?
  function wordTypo(an, rn) {
    var aw = an.split(' '), rw = rn.split(' ');
    if (aw.length !== rw.length) return false;
    var idx = -1;
    for (var i = 0; i < aw.length; i++) if (aw[i] !== rw[i]) { if (idx >= 0) return false; idx = i; }
    if (idx < 0) return false;
    var ew = aw[idx], x = rw[idx];
    if (letterCount(ew) < 5) return false;
    if (CLOSED[ew] || CLOSED[x]) return false;
    if (T.dropUmlaut(ew) === T.dropUmlaut(x)) return false;   // diéresis perdida (o añadida) = error
    return T.osa(ew, x) <= 1;
  }

  // Distractores conocidos: las options y, en plurales de sustantivos, el lema (singular).
  function distractorsOf(item) {
    var d = item.options.slice();
    if (item.module === 'artikel' && item.skill === 'plural' && item.lemma) d.push(item.lemma);
    return d;
  }

  function collapse(s) { return T.nfc(s).replace(/\s+/g, ' ').trim(); }
  function canonSentence(s) { return T.stripPunct(T.translit(s)); }

  // Texto contra una lista de formas aceptadas. Devuelve {verdict, matched, notes}.
  function evalText(accepts, resp, tol, opts, distractors) {
    var notes = [], i, a;
    var r = collapse(resp);
    if (!r) return { verdict: 'wrong', matched: null, notes: ['empty'] };
    var strict = !!opts.strictCase, sd = !!opts.strictDiacritics, sp = !!opts.strictPunct;

    // L0
    for (i = 0; i < accepts.length; i++) if (collapse(accepts[i]) === r) return { verdict: 'correct', matched: accepts[i], notes: [] };
    // L1
    for (i = 0; i < accepts.length; i++) {
      a = accepts[i];
      if (T.fold(a) === T.fold(r)) {
        if (strict) return { verdict: 'almost', matched: a, notes: ['case'] };
        return { verdict: 'correct', matched: a, notes: ['case'] };
      }
    }
    // L2
    for (i = 0; i < accepts.length; i++) {
      a = accepts[i];
      if (T.stripTerminal(T.fold(a)) === T.stripTerminal(T.fold(r))) {
        var capDiff = collapse(T.stripTerminal(a)) !== collapse(T.stripTerminal(r));
        if (capDiff && strict) return { verdict: 'almost', matched: a, notes: ['case'] };
        return { verdict: 'correct', matched: a, notes: capDiff ? ['case'] : [] };
      }
    }
    // L3
    for (i = 0; i < accepts.length; i++) {
      a = accepts[i];
      if (T.normSentence(a) === T.normSentence(r)) {
        if (sp) return { verdict: 'almost', matched: a, notes: ['punctuation'] };
        return { verdict: 'correct', matched: a, notes: ['punctuation'] };
      }
    }
    // L4 (teclado sin ä/ö/ü/ß)
    for (i = 0; i < accepts.length; i++) {
      a = accepts[i];
      if (canonSentence(a) === canonSentence(r)) {
        var pn = T.normSentence(T.translit(a)) !== T.normSentence(T.translit(r)); // sólo puntuación distinta además
        var nn = ['translit'];
        if (T.stripTerminal(T.fold(T.translit(a))) !== T.stripTerminal(T.fold(T.translit(r)))) nn.push('punctuation');
        if (sd || (sp && pn)) return { verdict: 'almost', matched: a, notes: nn };
        return { verdict: 'correct', matched: a, notes: nn };
      }
    }
    // ¿es un distractor conocido? Entonces es un error real, no una errata.
    var rf = T.fold(r);
    var hitDistractor = null;
    if (distractors) for (i = 0; i < distractors.length; i++) if (T.fold(distractors[i]) === rf) { hitDistractor = distractors[i]; break; }
    if (hitDistractor) return { verdict: 'wrong', matched: null, notes: ['distractor'], distractor: hitDistractor };

    if (tol === 'typo') {
      var rn = T.normSentence(r);
      for (i = 0; i < accepts.length; i++) {
        a = accepts[i];
        if (wordTypo(T.normSentence(a), rn)) return { verdict: 'almost', matched: a, notes: ['typo'] };
      }
    }
    return { verdict: 'wrong', matched: null, notes: [] };
  }

  function finish(item, base, response) {
    var ans = item.answer;
    base.correct = base.verdict === 'correct';
    base.expected = ans;
    base.accepted = item.accept.slice();
    base.alt = !!(base.matched && ans && T.fold(base.matched) !== T.fold(ans));
    base.response = response;
    base.tolerance = toleranceOf(item);
    return base;
  }

  // Posiciones de fichas que no coinciden con la solución (para resaltar en la UI).
  function tileDiff(item, tiles) {
    if (!Array.isArray(tiles) || !item.tiles.length) return null;
    var sol = item.tiles;
    if (T.normSentence(T.joinTiles(sol)) !== T.normSentence(item.answer || '')) return null;
    return tiles.map(function (t, i) { return t === sol[i]; });
  }

  /* evaluate(item, response, opts)
   *   opts.mode: 'write' (por defecto) | 'touch'
   *   response: string | string[] (fichas) | {wo, wohin} (par mínimo) */
  function evaluate(item, response, opts) {
    opts = opts || {};
    var mode = opts.mode || 'write';

    if (item.type === 'minimal-pair') {
      var rsp = response && typeof response === 'object' ? response : {};
      var parts = {}, kinds = [];
      ['wo', 'wohin'].forEach(function (k) {
        var p = item[k];
        var res = mode === 'touch'
          ? (p.accept.indexOf(T.nfc(rsp[k] == null ? '' : rsp[k]).trim()) >= 0
            ? { verdict: 'correct', matched: T.nfc(rsp[k]).trim(), notes: [] } : { verdict: 'wrong', matched: null, notes: [] })
          : evalText(p.accept, rsp[k] == null ? '' : String(rsp[k]), 'none', opts, null);
        parts[k] = { verdict: res.verdict, correct: res.verdict === 'correct', expected: p.answer, matched: res.matched, notes: res.notes };
        kinds.push(res.verdict);
      });
      var v = kinds.indexOf('wrong') >= 0 ? 'wrong' : (kinds.indexOf('almost') >= 0 ? 'almost' : 'correct');
      return { verdict: v, correct: v === 'correct', expected: null, accepted: [], matched: null, notes: [], alt: false,
        parts: parts, response: rsp, tolerance: 'none' };
    }

    // Fichas de orden: se unen con espacios (la puntuación se pega). Letras sueltas (input 'letters'): sin espacios.
    var text = Array.isArray(response) ? (item.type === 'order' ? T.joinTiles(response) : response.map(String).join('')) : (response == null ? '' : String(response));
    var tol = toleranceOf(item);
    var accepts = item.accept.length ? item.accept : [item.answer];

    if (mode === 'touch') {
      var out;
      if (item.type === 'order') {
        // En fichas la puntuación es una ficha: se compara con la solución tal cual (sin perdonar comas).
        var ok = accepts.some(function (a) { return T.fold(a) === T.fold(text); });
        var m = ok ? accepts.filter(function (a) { return T.fold(a) === T.fold(text); })[0] : null;
        out = { verdict: ok ? 'correct' : 'wrong', matched: m, notes: [] };
      } else {
        var nn = T.nfc(text).trim();
        var hit = accepts.filter(function (a) { return T.nfc(a) === nn; })[0];
        out = { verdict: hit !== undefined ? 'correct' : 'wrong', matched: hit !== undefined ? hit : null, notes: [] };
        if (hit === undefined) {
          var dn = distractorsOf(item).filter(function (o) { return T.fold(o) === T.fold(nn); })[0];
          if (dn !== undefined) { out.notes.push('distractor'); out.distractor = dn; }
        }
      }
      var res = finish(item, out, response);
      if (Array.isArray(response)) res.tileDiff = tileDiff(item, response);
      return res;
    }

    var r = evalText(accepts, text, tol, opts, distractorsOf(item));
    var fin = finish(item, r, response);
    if (Array.isArray(response)) fin.tileDiff = tileDiff(item, response);
    return fin;
  }

  DG.evaluator = { evaluate: evaluate, toleranceOf: toleranceOf };
  if (typeof module === 'object' && module.exports) module.exports = DG.evaluator;
})(typeof globalThis !== 'undefined' ? globalThis : this);
