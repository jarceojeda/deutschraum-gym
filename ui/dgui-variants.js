/* dgui-variants.js — decide CÓMO se responde cada ejercicio por toques (sin DOM, probado en Node).
 * Parte siempre de item (motor) + view() (motor) y del almacén; no toca el SRS: el resultado sigue entrando por
 * session.answer(). Tipos de spec:
 *   choice  {options}                      → respuesta = texto de la opción
 *   blocks  {blocks:[{id,t}], joiner}      → respuesta = bloques tocados, unidos con joiner
 *   match   {rows, bank, targetKey}        → paradigma de formas; SOLO la fila de targetKey se envía al motor
 *   letters / tiles / pair / text          → banco de letras, fichas de orden, par mínimo y escritura (modo «Escribir»)
 * Las distractoras nunca incluyen una forma aceptada (item.accept). */
(function (g) {
  'use strict';
  var V = {};
  var PERSONS = ['ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'];
  var PLABEL = { ich: 'ich', du: 'du', er_sie_es: 'er / sie / es', wir: 'wir', ihr: 'ihr', sie_Sie: 'sie / Sie' };
  var END_PRES = { ich: ['e'], du: ['est', 'st'], er_sie_es: ['et', 't'], wir: ['en', 'n'], ihr: ['et', 't'], sie_Sie: ['en', 'n'] };
  var END_PRET = { ich: ['ete', 'te'], du: ['etest', 'test', 'est', 'st'], er_sie_es: ['ete', 'te'], wir: ['eten', 'ten', 'en'], ihr: ['etet', 'tet', 'et', 't'], sie_Sie: ['eten', 'ten', 'en'] };
  var ALL_END_PRES = ['e', 'st', 'est', 't', 'et', 'en', 'n'], ALL_END_PRET = ['te', 'test', 'ten', 'tet', 'ete', 'st', 'en', 't'];
  var CONNECTORS = ['weil', 'denn', 'dass', 'wenn', 'obwohl', 'deshalb', 'trotzdem', 'damit', 'aber', 'sondern', 'ob', 'als'];
  var ARTICLES = ['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen', 'einem', 'einer', 'eines'];

  function rnd(ctx) { return ctx && ctx.rnd ? ctx.rnd : Math.random; }
  function shuffle(arr, r) { var a = arr.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function uniq(arr) { var seen = {}; return arr.filter(function (x) { if (!x || seen[x]) return false; seen[x] = 1; return true; }); }
  function pickN(arr, n, r) { return shuffle(arr, r).slice(0, n); }
  function weighted(list, r) { var tot = list.reduce(function (a, x) { return a + x[1]; }, 0), t = r() * tot; for (var i = 0; i < list.length; i++) { t -= list[i][1]; if (t < 0) return list[i][0]; } return list[list.length - 1][0]; }
  function notAccepted(item) { var acc = {}; (item.accept || [item.answer]).forEach(function (a) { acc[a] = 1; }); acc[item.answer] = 1; return function (x) { return !acc[x]; }; }
  function mkBlocks(texts, r) { return shuffle(texts, r).map(function (t, i) { return { id: i, t: t }; }); }
  function stemOf(lemma) { return String(lemma || '').replace(/(en|n)$/, ''); }

  // ---- Verben ----
  function siblings(item, store) { return (store.units[item.unit] || []).filter(function (x) { return x.person; }); }
  function verbChoice(item, store, r) {
    var ok = notAccepted(item), forms = uniq(siblings(item, store).filter(function (x) { return x.person !== item.person; }).map(function (x) { return x.answer; })).filter(ok);
    var traps = forms.length >= 3 ? [] : [item.lemma].filter(ok);
    var pool = uniq(forms.concat(traps));
    if (pool.length < 1) return null;
    return { kind: 'choice', label: 'Elige la forma correcta', options: shuffle([item.answer].concat(pickN(pool, 3, r)), r) };
  }
  function splitFinite(item) {
    var table = item.skill === 'praeteritum' ? END_PRET : END_PRES, ends = table[item.person] || [], a = item.answer;
    for (var i = 0; i < ends.length; i++) {
      if (a.length - ends[i].length >= 2 && a.slice(a.length - ends[i].length) === ends[i]) return { stem: a.slice(0, a.length - ends[i].length), end: ends[i], all: item.skill === 'praeteritum' ? ALL_END_PRET : ALL_END_PRES };
    }
    return null;
  }
  function splitPii(item) {
    var m = /^((?:[a-zäöüß]+?)?ge)([a-zäöüß]+?)(en|t|et)$/.exec(item.answer);
    return m ? { pre: m[1], stem: m[2], end: m[3], all: ['t', 'en', 'et'] } : null;
  }
  function verbBlocks(item, store, r) {
    var p = item.skill === 'partizip-ii' ? splitPii(item) : splitFinite(item);
    if (!p) return null;
    var chunks = p.pre ? [p.pre, p.stem, p.end] : [p.stem, p.end];
    var dis = pickN(p.all.filter(function (e) { return e !== p.end; }), 2, r);
    var inf = stemOf(item.lemma);
    if (p.pre) { var pre0 = p.pre.slice(0, -2); if (pre0 && item.lemma.indexOf(pre0) === 0) inf = stemOf(item.lemma.slice(pre0.length)); }
    if (inf && inf !== p.stem && inf.length >= 2) dis.push(inf);
    else if (p.pre && p.pre !== 'ge') dis.push('ge');          // separable: tentar sin prefijo
    return { kind: 'blocks', label: 'Arma la forma con bloques', blocks: mkBlocks(chunks.concat(dis.filter(function (d) { return chunks.indexOf(d) < 0; })), r), joiner: '', parts: chunks.length };
  }
  function piiChoice(item, store, r) {
    var a = item.answer, ok = notAccepted(item), stem = stemOf(item.lemma), c = [];
    var p = splitPii(item);
    if (p) { ['t', 'en', 'et'].forEach(function (e) { if (e !== p.end) c.push(p.pre + p.stem + e); }); c.push(p.pre.slice(0, -2) + p.stem + p.end, p.pre + stem + p.end, item.lemma); }
    else { if (/t$/.test(a)) c.push(a.replace(/t$/, 'en'), 'ge' + a, a.replace(/t$/, 'et')); else c.push(a.replace(/en$/, 't'), 'ge' + a, a.replace(/en$/, 'et')); c.push(item.lemma); }
    var pool = uniq(c.filter(ok)); if (pool.length < 2) return null;
    return { kind: 'choice', label: 'Elige el Partizip II', options: shuffle([a].concat(pickN(pool, 3, r)), r) };
  }
  function verbMatch(item, store, r) {
    var sib = siblings(item, store), by = {};
    sib.forEach(function (x) { by[x.person] = x; });
    var persons = PERSONS.filter(function (p) { return by[p]; });
    if (persons.length < 6) return null;                               // impersonales: sin paradigma completo
    var rows = persons.map(function (p) { return { key: p, label: PLABEL[p], expected: by[p].answer, target: p === item.person }; });
    var piiUnit = item.unit.replace(/\|[^|]+$/, '|partizip-ii'), pii = (store.units[piiUnit] || [])[0];
    if (pii && item.skill === 'praesens') rows.push({ key: 'pii', label: 'Partizip II', expected: pii.answer, target: false });
    var other = item.unit.replace(/\|[^|]+$/, '|' + (item.skill === 'praesens' ? 'praeteritum' : 'praesens')), have = rows.map(function (x) { return x.expected; });
    var traps = pickN(uniq((store.units[other] || []).map(function (x) { return x.answer; }).filter(function (x) { return have.indexOf(x) < 0; })), 2, r);
    return { kind: 'match', label: 'Empareja las formas', rows: rows, targetKey: item.person, bank: mkBlocks(have.concat(traps), r) };
  }

  // ---- Artikel: plural ----
  function umlaut(w) {
    var m = /^(.*)(au)([^aou]*)$/i.exec(w); if (m) return m[1] + 'äu' + m[3];
    m = /^(.*)([aou])([^aou]*)$/i.exec(w); if (!m) return w;
    return m[1] + ({ a: 'ä', o: 'ö', u: 'ü', A: 'Ä', O: 'Ö', U: 'Ü' })[m[2]] + m[3];
  }
  function pluralChoice(item, r) {
    var w = item.lemma; if (!w) return null;
    var ok = notAccepted(item), u = umlaut(w), c = [w, w + 'e', w + 'en', w + 'n', w + 'er', w + 's', w + 'nen'];
    if (u !== w) c.push(u, u + 'e', u + 'er', u + 'n');
    var pool = uniq(c.filter(ok)); if (pool.length < 2) return null;
    return { kind: 'choice', label: 'Elige el plural', options: shuffle([item.answer].concat(pickN(pool, 3, r)), r) };
  }

  // ---- Deklination: transformaciones por palabras ----
  function wordBlocks(item, r) {
    var words = item.answer.split(/\s+/).filter(Boolean); if (words.length < 2) return null;
    var dis = [];
    if (words.length >= 5) {   // frase completa (Konnektoren): distractores = otros conectores
      var low = words.map(function (w) { return w.toLowerCase().replace(/[.,;!?]/g, ''); });
      return { kind: 'blocks', label: 'Ordena las palabras', blocks: mkBlocks(words.concat(pickN(CONNECTORS.filter(function (c) { return low.indexOf(c) < 0; }), 2, r)), r), joiner: ' ', parts: words.length };
    }
    words.forEach(function (w) { if (ARTICLES.indexOf(w.toLowerCase()) >= 0) pickN(ARTICLES.filter(function (x) { return x !== w.toLowerCase() && words.indexOf(x) < 0; }), 1, r).forEach(function (x) { dis.push(x); }); });
    var noun = words[words.length - 1];
    dis.push(/n$/.test(noun) ? noun.slice(0, -1) : noun + 'n');
    dis = uniq(dis).filter(function (d) { return words.indexOf(d) < 0; }).slice(0, 3);
    return { kind: 'blocks', label: 'Ordena las palabras', blocks: mkBlocks(words.concat(dis), r), joiner: ' ', parts: words.length };
  }

  // spec para el ejercicio actual. ctx: {store, rnd, mode:'touch'|'write', last:{kind}}
  V.pick = function (item, view, ctx) {
    var r = rnd(ctx), store = ctx.store, last = ctx.last && ctx.last.kind, spec = null;
    if (ctx.mode === 'write') return { kind: 'text', label: 'Escribe la respuesta' };
    if (view.input === 'tiles') return { kind: 'tiles', label: 'Ordena las fichas', tiles: view.tiles };
    if (view.input === 'pair') return { kind: 'pair', label: 'Wo? / Wohin?', parts: view.parts };
    if (item.module === 'verben' && item.person && (item.skill === 'praesens' || item.skill === 'praeteritum')) {
      var gens = { choice: verbChoice, blocks: verbBlocks, match: verbMatch }, avail = {};
      Object.keys(gens).forEach(function (k) { avail[k] = gens[k](item, store, r); });
      var list = [['choice', 3], ['blocks', 2.5], ['match', 2]].filter(function (x) { return avail[x[0]] && x[0] !== last; });
      if (!list.length) list = [['choice', 1], ['blocks', 1], ['match', 1]].filter(function (x) { return avail[x[0]]; });
      spec = list.length ? avail[weighted(list, r)] : null;
    } else if (item.module === 'verben' && item.skill === 'partizip-ii') {
      var b = verbBlocks(item, store, r), c = piiChoice(item, store, r);
      spec = b && c ? (last === 'blocks' || r() < 0.5 ? c : b) : (b || c);
    } else if (view.input === 'choice') {
      var opts = view.options;
      if (opts.length > 6) opts = shuffle([item.answer].concat(pickN(opts.filter(function (o) { return o !== item.answer; }), 5, r)), r);   // máximo 6 para una mano
      spec = { kind: 'choice', label: item.skill === 'genero' ? '¿der, die o das?' : 'Elige la opción', options: opts };
    } else if (item.module === 'artikel' && item.skill === 'plural') {
      spec = pluralChoice(item, r);
    } else if (item.type === 'transform') {
      spec = wordBlocks(item, r);
    }
    return spec || { kind: 'letters', label: 'Arma la respuesta con letras' };
  };
  // Respuesta que se manda al motor, y detalle extra (sólo match) para pintar en pantalla.
  V.gradeMatch = function (spec, values) {
    var rows = spec.rows.map(function (x) { return { key: x.key, label: x.label, expected: x.expected, given: values[x.key], ok: values[x.key] === x.expected, target: x.target }; });
    return { response: values[spec.targetKey], rows: rows };
  };
  V.PLABEL = PLABEL; V.PERSONS = PERSONS; V.umlaut = umlaut; V.splitFinite = splitFinite; V.splitPii = splitPii;
  g.DGUI = g.DGUI || {}; g.DGUI.variants = V;
  if (typeof module === 'object' && module.exports) module.exports = V;
})(typeof globalThis !== 'undefined' ? globalThis : this);
