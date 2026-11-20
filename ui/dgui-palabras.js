/* dgui-palabras.js — «Mis palabras»: palabras propias del alumno (alemán + español) que entran al Wortschatz con ES→DE, DE→ES y escribir.
 * Sin DOM; se prueba en Node. Las palabras se guardan aparte del progreso (clave dg.words) y el motor las recibe como ítems (engine.addItems).
 * Los distractores salen del Wortschatz ya cargado (mismo tipo: con artículo si la palabra es un sustantivo). */
(function (g) {
  'use strict';
  var P = {}, KEY = 'dg.words', MAXW = 300, SKILLS = ['es-de', 'de-es', 'produccion'];
  var ART = /^(der|die|das)\s+\S/i;
  function nfc(s) { return String(s == null ? '' : s).normalize('NFC').replace(/\s+/g, ' ').trim(); }
  function seeded(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return function () { h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0; return h / 4294967296; }; }
  function shuffle(a, r) { return a.map(function (x) { return [r(), x]; }).sort(function (x, y) { return x[0] - y[0]; }).map(function (x) { return x[1]; }); }
  P.isNoun = function (de) { return ART.test(de); };
  P.lemma = function (de) { return de.replace(/^(der|die|das)\s+/i, ''); };
  // Valida y normaliza lo que escribió el alumno. Devuelve {ok, word} o {ok:false, error}.
  P.parse = function (de, es, existing) {
    de = nfc(de); es = nfc(es);
    if (!de || !es) return { ok: false, error: 'Escribe la palabra en alemán y su significado.' };
    if (de.length > 40 || es.length > 60) return { ok: false, error: 'Es demasiado largo: usa una palabra o una expresión corta.' };
    if (/[<>{}]/.test(de + es)) return { ok: false, error: 'Hay caracteres no permitidos.' };
    de = de.replace(/^(Der|Die|Das)\s+/, function (m) { return m.toLowerCase(); });
    if (/^(der|die|das)$/i.test(de)) return { ok: false, error: 'Falta la palabra después del artículo.' };
    var k = de.toLowerCase();
    if ((existing || []).some(function (w) { return w.de.toLowerCase() === k; })) return { ok: false, error: 'Esa palabra ya está en tu lista.' };
    if ((existing || []).length >= MAXW) return { ok: false, error: 'Tu lista llegó al máximo de ' + MAXW + ' palabras.' };
    return { ok: true, word: { de: de, es: es } };
  };
  P.newId = function (existing, now) { var n = (now || Date.now()).toString(36), i = 0, id; do { id = n + (i ? '-' + i : ''); i++; } while ((existing || []).some(function (w) { return w.id === id; })); return id; };
  P.itemIds = function (word) { return SKILLS.map(function (s) { return 'mw-' + word.id + '-' + s; }); };
  // Distractores: respuestas de ítems del Wortschatz (es-de → alemán, de-es → español) de la misma forma (con/sin artículo).
  function pool(data, skill, wantArt) {
    var art = skill === 'es-de' ? function (x) { return ART.test(x); } : function (x) { return /^(el|la|los|las|un|una)\s/i.test(x); }, out = {};
    data.forEach(function (it) { if (it.module === 'wortschatz' && it.skill === skill && it.answer && art(it.answer) === wantArt) out[it.answer] = true; });
    return Object.keys(out);
  }
  P.make = function (word, data, others) {
    var noun = P.isNoun(word.de), lemma = P.lemma(word.de), items = [], own = (others || []);
    var esArt = /^(el|la|los|las|un|una)\s/i.test(word.es);
    function mk(skill, prompt, answer, options) {
      return { id: 'mw-' + word.id + '-' + skill, module: 'wortschatz', level: 'A1', type: 'cloze', skill: skill, pool: skill, prompt: prompt, hint: '', translation: '', answer: answer, accept: [answer],
        options: options, errorTag: 'vocab:' + skill, conceptIds: [], source: 'mis-palabras', lemma: lemma };
    }
    function opts(skill, answer, wantArt, ownVals) {
      var r = seeded(word.id + skill), cand = shuffle(ownVals.concat(pool(data, skill, wantArt)), r).filter(function (x, i, a) { return x !== answer && a.indexOf(x) === i; });
      return cand.length >= 3 ? shuffle([answer].concat(cand.slice(0, 3)), r) : null;
    }
    var o1 = opts('es-de', word.de, noun, own.filter(function (w) { return P.isNoun(w.de) === noun; }).map(function (w) { return w.de; }));
    var o2 = opts('de-es', word.es, esArt, own.filter(function (w) { return /^(el|la|los|las|un|una)\s/i.test(w.es) === esArt; }).map(function (w) { return w.es; }));
    if (o1) items.push(mk('es-de', word.es, word.de, o1));
    if (o2) items.push(mk('de-es', word.de, word.es, o2));
    if (word.de.length <= 24) items.push(mk('produccion', word.es, word.de, []));
    return items;
  };
  P.makeAll = function (words, data) { var out = []; words.forEach(function (w) { P.make(w, data, words.filter(function (x) { return x.id !== w.id; })).forEach(function (i) { out.push(i); }); }); return out; };
  P.load = function (storage) {
    try { var raw = storage && storage.getItem(KEY); if (!raw) return []; var j = JSON.parse(raw); var a = j && Array.isArray(j.words) ? j.words : [];
      return a.filter(function (w) { return w && typeof w.id === 'string' && typeof w.de === 'string' && typeof w.es === 'string'; }).map(function (w) { return { id: w.id, de: nfc(w.de), es: nfc(w.es) }; }); } catch (e) { return []; }
  };
  P.save = function (storage, words) { try { storage.setItem(KEY, JSON.stringify({ v: 1, words: words })); return true; } catch (e) { return false; } };
  P.KEY = KEY; P.MAX = MAXW;
  g.DGUI = g.DGUI || {}; g.DGUI.palabras = P;
  if (typeof module === 'object' && module.exports) module.exports = P;
})(typeof globalThis !== 'undefined' ? globalThis : this);
