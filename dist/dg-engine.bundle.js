/* ===== dg-rng.js ===== */
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

/* ===== dg-text.js ===== */
/* dg-text.js — comparación de texto segura para alemán.
 * REGLA: nunca se usa NFD ni se eliminan diacríticos con regex de rango combinante.
 * ä/ö/ü/ß se conservan; solo se usa NFC + minúsculas + mapas explícitos. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});

  function nfc(s) { return String(s == null ? '' : s).normalize('NFC'); }

  // Comillas/apóstrofos tipográficos → ASCII; espacios raros → espacio normal.
  function unifyChars(s) {
    return s
      .replace(/[‘’‛′´`]/g, "'")
      .replace(/[“”„‟«»]/g, '"')
      .replace(/[–—]/g, '-')
      .replace(/[  -   　\t\r\n]+/g, ' ')
      .replace(/[​-‍﻿]/g, '');
  }

  // Minúsculas: 'ß' se queda 'ß' y 'ẞ' (U+1E9E) pasa a 'ß'. Nunca toUpperCase (ß→SS).
  function fold(s) {
    return unifyChars(nfc(s)).toLowerCase().replace(/\s+/g, ' ').trim();
  }

  var TRANSLIT = { 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' };
  // Equivalencia de teclado sin ä/ö/ü/ß (ae/oe/ue/ss). Sólo se usa para ACEPTAR con nota.
  function translit(s) {
    return fold(s).replace(/[äöüß]/g, function (m) { return TRANSLIT[m]; });
  }

  var DROP = { 'ä': 'a', 'ö': 'o', 'ü': 'u', 'Ä': 'A', 'Ö': 'O', 'Ü': 'U' };
  // Quita la diéresis con un mapa explícito (NO NFD). Sólo sirve para detectar «casi».
  function dropUmlaut(s) { return fold(s).replace(/[äöü]/g, function (m) { return DROP[m]; }); }

  function stripTerminal(s) { return s.replace(/[\s.!?;:]+$/g, '').trim(); }
  function stripPunct(s) { return s.replace(/[.,!?;:"'()…]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function normSentence(s) { return stripPunct(fold(s)); }

  // Distancia de Damerau-Levenshtein (variante OSA): inserción, borrado, sustitución, transposición.
  function osa(a, b) {
    var al = a.length, bl = b.length;
    if (al === 0) return bl;
    if (bl === 0) return al;
    var d = [], i, j;
    for (i = 0; i <= al; i++) { d[i] = new Array(bl + 1); d[i][0] = i; }
    for (j = 0; j <= bl; j++) d[0][j] = j;
    for (i = 1; i <= al; i++) {
      for (j = 1; j <= bl; j++) {
        var c = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
        if (i > 1 && j > 1 && a.charCodeAt(i - 1) === b.charCodeAt(j - 2) && a.charCodeAt(i - 2) === b.charCodeAt(j - 1)) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }
    return d[al][bl];
  }

  // Une fichas de «ordena la frase»: espacio entre palabras, signos pegados a la anterior.
  function joinTiles(tiles) {
    var out = '';
    for (var i = 0; i < tiles.length; i++) {
      var t = String(tiles[i]);
      if (i > 0 && !/^[,.;:!?)…]$/.test(t)) out += ' ';
      out += t;
    }
    return out;
  }

  DG.text = {
    nfc: nfc, fold: fold, translit: translit, dropUmlaut: dropUmlaut,
    stripTerminal: stripTerminal, stripPunct: stripPunct, normSentence: normSentence,
    osa: osa, joinTiles: joinTiles, unifyChars: unifyChars
  };
  if (typeof module === 'object' && module.exports) module.exports = DG.text;
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== dg-sampler.js ===== */
/* dg-sampler.js — muestreo ponderado SIN reemplazo y reparto de cuotas.
 * No se ordena por «puntaje + ruido»: cada extracción es una ruleta con los pesos vigentes y el
 * elegido se retira (peso 0) antes de la siguiente extracción. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});

  // Una extracción proporcional a los pesos. Devuelve índice o -1 si no queda masa.
  function drawIndex(weights, rng) {
    var total = 0, i, w;
    for (i = 0; i < weights.length; i++) { w = weights[i]; if (w > 0 && isFinite(w)) total += w; }
    if (!(total > 0)) return -1;
    var r = rng.next() * total, acc = 0, last = -1;
    for (i = 0; i < weights.length; i++) {
      w = weights[i];
      if (!(w > 0) || !isFinite(w)) continue;
      last = i; acc += w;
      if (r < acc) return i;
    }
    return last; // por redondeo de coma flotante
  }

  // k índices distintos, ponderados, sin reemplazo.
  function sampleWithoutReplacement(weights, k, rng) {
    var w = weights.slice(), out = [];
    for (var j = 0; j < k; j++) {
      var i = drawIndex(w, rng);
      if (i < 0) break;
      out.push(i); w[i] = 0;
    }
    return out;
  }

  // Reparto entero por mayor resto. caps opcional (máximo por casilla); rng desempata.
  function largestRemainder(total, weights, rng, caps) {
    var n = weights.length, res = new Array(n).fill(0), cap = caps || new Array(n).fill(Infinity);
    var active = [], i;
    for (i = 0; i < n; i++) if (weights[i] > 0 && cap[i] > 0) active.push(i);
    var left = total, guard = 0;
    while (left > 0 && active.length && guard++ < 50) {
      var sw = 0; active.forEach(function (k) { sw += weights[k]; });
      var base = {}, used = 0, rem = [];
      active.forEach(function (k) {
        var exact = left * weights[k] / sw;
        var fl = Math.min(Math.floor(exact), cap[k] - res[k]);
        base[k] = fl; used += fl;
        rem.push({ k: k, f: exact - Math.floor(exact), t: rng ? rng.next() : 0 });
      });
      active.forEach(function (k) { res[k] += base[k]; });
      left -= used;
      rem.sort(function (a, b) { return (b.f - a.f) || (b.t - a.t); });
      for (var r = 0; r < rem.length && left > 0; r++) {
        var kk = rem[r].k;
        if (res[kk] < cap[kk]) { res[kk]++; left--; }
      }
      active = active.filter(function (k) { return res[k] < cap[k]; });
    }
    return res;
  }

  // Reparto con «difusión de error»: el resto fraccional de cada casilla pasa a la siguiente sesión,
  // así la mezcla a largo plazo converge a las proporciones aunque cada sesión sea chica.
  // shares: {nombre: proporción}; carry: {nombre: resto previo}. Devuelve {counts, carry}.
  function allocateWithCarry(total, shares, carry) {
    var names = Object.keys(shares), counts = {}, newCarry = {}, used = 0, i;
    var fr = [];
    names.forEach(function (n) {
      var x = total * shares[n] + ((carry && carry[n]) || 0);
      var f = Math.max(0, Math.floor(x + 1e-9));
      counts[n] = f; used += f; fr.push({ n: n, rest: x - f });
    });
    // Si nos pasamos (restos negativos acumulados), quitar a los más sobrados.
    while (used > total) {
      fr.sort(function (a, b) { return a.rest - b.rest; });
      var hit = fr.filter(function (e) { return counts[e.n] > 0; })[0];
      if (!hit) break;
      counts[hit.n]--; hit.rest += 1; used--;
    }
    fr.sort(function (a, b) { return b.rest - a.rest; });
    for (i = 0; used < total && i < fr.length; i++) { counts[fr[i].n]++; fr[i].rest -= 1; used++; }
    fr.forEach(function (e) { newCarry[e.n] = Math.max(-1, Math.min(1, e.rest)); });
    return { counts: counts, carry: newCarry };
  }

  DG.sampler = {
    drawIndex: drawIndex,
    sampleWithoutReplacement: sampleWithoutReplacement,
    largestRemainder: largestRemainder,
    allocateWithCarry: allocateWithCarry
  };
  if (typeof module === 'object' && module.exports) module.exports = DG.sampler;
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== dg-items.js ===== */
/* dg-items.js — modelo de ítems/habilidades, almacén indexado, validación de datos y vista para la UI.
 *
 * Vocabulario:
 *   skill   = habilidad fina del JSON (p. ej. «praeteritum», «genitiv-noun»).
 *   pool    = agrupación para el TAMAÑO MÍNIMO (≥12). Nunca se usa skill para eso.
 *   skillId = «módulo:skill»  → celda de cuota y de dominio (mapa de errores, cobertura).
 *   unit    = unidad de repaso espaciado. Para verben/artikel es «módulo|lemma[(sentido)]|skill»
 *             (fahren·presente, fahren·Partizip, fahren·Präteritum son unidades distintas);
 *             para el resto cada ítem es su propia unidad.
 */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});
  if (typeof require === 'function' && typeof module === 'object') require('./dg-text.js');
  var T = DG.text;

  var LEVELS = ['A1', 'A2', 'B1'];
  var MODULES = ['verben', 'artikel', 'deklination', 'praepositionen', 'konnektoren', 'wortschatz', 'satzbau'];
  var TYPES = ['cloze', 'transform', 'order', 'minimal-pair'];
  var MIN_POOL = 12;
  var PERSONS = ['ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'];
  var PERSON_MAP = { 'ich': 'ich', 'du': 'du', 'er / sie / es': 'er_sie_es', 'wir': 'wir', 'ihr': 'ihr', 'sie / Sie': 'sie_Sie' };

  function levelRank(l) { return LEVELS.indexOf(l); }

  function parseVerbPrompt(prompt) {
    // «lemma (sentido) · praesens · ich»
    var parts = String(prompt).split(' · ');
    var m = /^([^(]+?)\s*\(([^)]+)\)\s*$/.exec(parts[0]);
    return {
      sense: m ? m[2] : '',
      person: parts.length >= 3 ? (PERSON_MAP[parts[parts.length - 1].trim()] || null) : null
    };
  }

  /* ---- verbos: ¿alguna forma du/er se aparta de la regular? (cambio de vocal, irregular) ----
   * Se compara la forma finita (1.ª palabra de la respuesta; el prefijo separable queda al final) con la que
   * saldría de añadir las terminaciones regulares a la raíz del infinitivo. */
  function verbFormInfo(lemma, answer) {
    var base = String(lemma).replace(/^sich\s+/, '').trim().toLowerCase();
    var words = String(answer == null ? '' : answer).trim().toLowerCase().split(/\s+/), particle = '';
    if (words.length > 1) { var last = words[words.length - 1]; if (base.indexOf(last) === 0 && base.length > last.length) particle = last; }
    var inf = particle ? base.slice(particle.length) : base;
    return { finite: words[0], inf: inf, stem: /en$/.test(inf) ? inf.slice(0, -2) : (/n$/.test(inf) ? inf.slice(0, -1) : inf) };
  }
  function regularForms(skill, person, stem) {
    if (skill === 'praesens') return person === 'du' ? [stem + 'st', stem + 'est', stem + 't'] : [stem + 't', stem + 'et'];
    return person === 'du' ? [stem + 'test', stem + 'etest'] : [stem + 'te', stem + 'ete'];
  }
  // arr: ítems de UNA unidad praesens/praeteritum. → {hard, infIds}
  function verbUnitInfo(arr) {
    var hard = false, infIds = Object.create(null);
    arr.forEach(function (it) {
      var f = verbFormInfo(it.lemma || '', it.answer);
      if (it.person === 'du' || it.person === 'er_sie_es') { if (regularForms(it.skill, it.person === 'du' ? 'du' : 'er', f.stem).indexOf(f.finite) < 0) hard = true; }
      if (f.finite === f.inf) infIds[it.id] = true;
    });
    return { hard: hard, infIds: infIds };
  }

  function toArray(x) { return Array.isArray(x) ? x.slice() : []; }

  function normalizeItem(raw) {
    // Todo texto del contenido se normaliza a NFC (nunca NFD); si algo cambió se anota para que el validador avise.
    var fixed = false;
    function nf(s) { if (typeof s !== 'string') return s; var t = T.nfc(s); if (t !== s) fixed = true; return t; }
    function nfa(a) { return toArray(a).map(nf); }
    function nfp(p) { return p && typeof p === 'object' ? Object.assign({}, p, { prompt: nf(p.prompt), question: nf(p.question), answer: nf(p.answer), accept: nfa(p.accept) }) : p; }
    var it = {
      id: raw.id, module: raw.module, level: raw.level, lrank: levelRank(raw.level),
      type: raw.type, skill: raw.skill, pool: raw.pool,
      poolId: raw.module + ':' + raw.pool,
      skillId: raw.module + ':' + raw.skill,
      prompt: nf(raw.prompt), hint: nf(raw.hint || ''), translation: nf(raw.translation || ''), explanation: nf(raw.explanation || ''),
      answer: raw.answer == null ? null : nf(raw.answer),
      accept: nfa(raw.accept), options: nfa(raw.options), tiles: nfa(raw.tiles),
      lemma: raw.lemma ? nf(raw.lemma) : null, errorTag: raw.errorTag || null,
      conceptIds: toArray(raw.conceptIds),
      multiOk: !!raw.multi_ok, impersonal: !!raw.impersonal, needsTranslation: !!raw.needs_translation,
      pairId: raw.pairId || null, source: raw.source || null,
      sense: '', person: null
    };
    if (raw.type === 'minimal-pair') {
      it.wo = nfp(raw.wo); it.wohin = nfp(raw.wohin); it.prep = raw.prep ? nf(raw.prep) : null;
      it.answer = null; it.accept = [];
    }
    if (raw.module === 'verben') {
      var p = parseVerbPrompt(raw.prompt);
      it.sense = p.sense; it.person = p.person;
    }
    // Familia: un par mínimo y sus dos casos sueltos comparten familia.
    it.family = raw.type === 'minimal-pair' ? raw.id : (raw.pairId || null);
    it.nfcFixed = fixed;
    // Unidad de repaso.
    if ((raw.module === 'verben' || raw.module === 'artikel') && raw.lemma) {
      it.unit = raw.module + '|' + raw.lemma + (it.sense ? '(' + it.sense + ')' : '') + '|' + raw.skill;
    } else {
      it.unit = raw.id;
    }
    return Object.freeze(it);
  }

  /* ---------- almacén ---------- */
  function createStore(rawList) {
    var all = [], byId = Object.create(null), byModule = Object.create(null), byPool = Object.create(null);
    var bySkillId = Object.create(null), units = Object.create(null);
    rawList.forEach(function (raw) {
      var it = normalizeItem(raw);
      all.push(it);
      byId[it.id] = it;
      (byModule[it.module] = byModule[it.module] || []).push(it);
      (byPool[it.poolId] = byPool[it.poolId] || []).push(it);
      (bySkillId[it.skillId] = bySkillId[it.skillId] || []).push(it);
      (units[it.unit] = units[it.unit] || []).push(it);
    });
    var unitInfo = Object.create(null);
    Object.keys(units).forEach(function (u) {
      var arr = units[u];
      unitInfo[u] = { unit: u, module: arr[0].module, skillId: arr[0].skillId, level: arr[0].level, lrank: arr[0].lrank,
        lemma: arr[0].lemma, family: arr[0].family, items: arr, hard: false, infIds: {} };
      // verbos con cambio de vocal / irregulares: du y er_sie_es pesan más y hay que acertarlos para «dominar» la unidad
      if (arr[0].module === 'verben' && (arr[0].skill === 'praesens' || arr[0].skill === 'praeteritum')) {
        var vi = verbUnitInfo(arr); unitInfo[u].hard = vi.hard; unitInfo[u].infIds = vi.infIds;
      }
    });
    // Unidades por módulo / skillId.
    var unitsByModule = Object.create(null), unitsBySkillId = Object.create(null);
    Object.keys(unitInfo).forEach(function (u) {
      var ui = unitInfo[u];
      (unitsByModule[ui.module] = unitsByModule[ui.module] || []).push(ui);
      (unitsBySkillId[ui.skillId] = unitsBySkillId[ui.skillId] || []).push(ui);
    });
    return {
      all: all, byId: byId, byModule: byModule, byPool: byPool, bySkillId: bySkillId,
      units: units, unitInfo: unitInfo, unitsByModule: unitsByModule, unitsBySkillId: unitsBySkillId,
      modules: function () { return Object.keys(byModule); },
      get: function (id) { return byId[id] || null; },
      levelsOf: function (module) {
        var s = {}; (byModule[module] || []).forEach(function (i) { s[i.level] = true; });
        return LEVELS.filter(function (l) { return s[l]; });
      },
      unitCount: function (module, level) {
        return (unitsByModule[module] || []).filter(function (u) { return !level || u.level === level; }).length;
      }
    };
  }

  /* ---------- validación ---------- */
  function validate(store, opts) {
    opts = opts || {};
    var errors = [], warnings = [];
    function E(code, id, msg) { errors.push({ code: code, id: id, msg: msg }); }
    function W(code, id, msg) { warnings.push({ code: code, id: id, msg: msg }); }
    var seen = Object.create(null);
    var conceptSet = null;
    if (opts.concepts) {
      conceptSet = Object.create(null);
      opts.concepts.forEach(function (c) { conceptSet[c.id] = true; });
    }
    var unresolved = {};

    store.all.forEach(function (it) {
      if (seen[it.id]) E('dup-id', it.id, 'id duplicado');
      seen[it.id] = true;
      if (!it.id || !it.module || !it.skill || !it.pool) E('missing-field', it.id, 'falta id/module/skill/pool');
      if (it.lrank < 0) E('bad-level', it.id, 'nivel inválido: ' + it.level);
      if (TYPES.indexOf(it.type) < 0) E('bad-type', it.id, 'tipo desconocido: ' + it.type);
      if (MODULES.indexOf(it.module) < 0) E('bad-module', it.id, 'módulo desconocido: ' + it.module);
      if (it.type === 'minimal-pair') {
        ['wo', 'wohin'].forEach(function (k) {
          var p = it[k];
          if (!p || !p.answer || !Array.isArray(p.accept) || !p.accept.length || !p.prompt) E('pair-part', it.id, 'par mínimo sin ' + k + ' completo');
          else if (p.accept.indexOf(p.answer) < 0) E('pair-accept', it.id, k + '.accept no contiene answer');
        });
      } else {
        if (!it.answer) E('no-answer', it.id, 'sin answer');
        else if (it.accept.indexOf(it.answer) < 0) E('accept-lacks-answer', it.id, 'accept no contiene answer');
        // regla (a): en táctil options trae UNA sola forma válida (salvo multi_ok)
        if (it.type === 'cloze' && it.options.length) {
          var valid = it.options.filter(function (o) { return it.accept.indexOf(o) >= 0; });
          if (valid.length < 1) E('options-no-valid', it.id, 'options no contiene ninguna forma válida');
          if (valid.length > 1 && !it.multiOk) E('options-multi-valid', it.id, 'options trae >1 forma válida sin multi_ok: ' + valid.join('|'));
        }
      }
      if (it.type === 'order') {
        if (!it.tiles.length) E('order-tiles', it.id, 'order sin tiles');
        else {
          var j = T.normSentence(T.joinTiles(it.tiles));
          var ok = it.accept.some(function (a) { return T.normSentence(a) === j; });
          if (!ok) E('order-tiles-mismatch', it.id, 'las fichas no forman ninguna respuesta aceptada');
        }
      }
      if (it.nfcFixed) W('not-nfc', it.id, 'el texto no estaba en NFC (se normalizó al cargar)');
      if (it.needsTranslation && !it.translation) E('needs-translation', it.id, 'needs_translation sin translation');
      if (conceptSet) {
        it.conceptIds.forEach(function (c) { if (!conceptSet[c]) unresolved[c] = (unresolved[c] || 0) + 1; });
      }
    });

    // Tamaño mínimo por POOL (no por skill).
    Object.keys(store.byPool).forEach(function (pid) {
      var n = store.byPool[pid].length;
      if (n < MIN_POOL) E('pool-too-small', pid, 'pool con ' + n + ' ítems (< ' + MIN_POOL + ')');
    });

    // Tarjetas de verbos: 6 personas completas, salvo impersonal.
    Object.keys(store.units).forEach(function (u) {
      var arr = store.units[u];
      if (arr[0].module !== 'verben') return;
      if (arr[0].skill !== 'praesens' && arr[0].skill !== 'praeteritum') return;
      var persons = arr.map(function (i) { return i.person; });
      if (persons.indexOf(null) >= 0) { E('verb-person', u, 'persona no reconocida en prompt'); return; }
      var uniq = {}; persons.forEach(function (p) { uniq[p] = true; });
      if (Object.keys(uniq).length !== persons.length) E('verb-person-dup', u, 'persona repetida');
      if (arr[0].impersonal) {
        persons.forEach(function (p) { if (p !== 'er_sie_es' && p !== 'sie_Sie') E('impersonal-person', u, 'impersonal con persona ' + p); });
      } else if (persons.length !== PERSONS.length) {
        E('verb-incomplete', u, 'tarjeta con ' + persons.length + ' de 6 personas');
      }
    });

    var nUn = Object.keys(unresolved).length;
    if (nUn) W('concept-unresolved', null, nUn + ' conceptIds sin entrada en concepts.json (p. ej. ' + Object.keys(unresolved).slice(0, 5).join(', ') + ')');

    // Resumen por nivel/módulo para el informe.
    var summary = { items: store.all.length, units: Object.keys(store.units).length, pools: Object.keys(store.byPool).length,
      minPool: Math.min.apply(null, Object.keys(store.byPool).map(function (k) { return store.byPool[k].length; })) };
    return { ok: errors.length === 0, errors: errors, warnings: warnings, summary: summary, unresolvedConcepts: unresolved };
  }

  /* ---------- vista para la UI (sin filtrar la respuesta) ---------- */
  // mode: 'touch' | 'write'.
  function view(item, mode, rng) {
    var v = {
      id: item.id, module: item.module, skill: item.skill, level: item.level, type: item.type,
      prompt: item.prompt, hint: item.hint || '', errorTag: item.errorTag,
      showTranslation: item.needsTranslation, translation: item.needsTranslation ? item.translation : '',
      multiOk: item.multiOk, impersonal: item.impersonal, input: 'text', options: [], tiles: [], parts: null
    };
    var shuffle = rng ? function (a) { return rng.shuffle(a); } : function (a) { return a.slice(); };
    if (item.type === 'order') {
      v.input = mode === 'touch' ? 'tiles' : 'text';
      var key = T.joinTiles(item.tiles), t = shuffle(item.tiles), tries = 0;
      // Que las fichas nunca lleguen ya en orden correcto.
      while (rng && item.tiles.length > 1 && tries++ < 20 && item.accept.some(function (a) { return T.normSentence(a) === T.normSentence(T.joinTiles(t)); })) t = shuffle(item.tiles);
      v.tiles = t;
    } else if (item.type === 'minimal-pair') {
      v.input = 'pair';
      var choices = shuffle([item.wo.answer, item.wohin.answer]);
      v.parts = [
        { key: 'wo', prompt: item.wo.prompt, question: item.wo.question || 'Wo?', choices: choices },
        { key: 'wohin', prompt: item.wohin.prompt, question: item.wohin.question || 'Wohin?', choices: choices }
      ];
      v.prompt = item.prompt;
    } else if (mode === 'touch') {
      if (item.options.length) { v.input = 'choice'; v.options = shuffle(item.options); }
      else v.input = 'letters'; // sin distractores en los datos: la UI usa banco de letras / terminación (etapa 3)
    }
    return v;
  }

  DG.items = {
    LEVELS: LEVELS, MODULES: MODULES, TYPES: TYPES, MIN_POOL: MIN_POOL, PERSONS: PERSONS,
    levelRank: levelRank, verbUnitInfo: verbUnitInfo, normalizeItem: normalizeItem, createStore: createStore, validate: validate, view: view
  };
  if (typeof module === 'object' && module.exports) module.exports = DG.items;
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== dg-evaluator.js ===== */
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

/* ===== dg-srs.js ===== */
/* dg-srs.js — repaso espaciado por UNIDAD de habilidad (no por palabra).
 * Una unidad es «fahren · presente», «fahren · Partizip II», «fahren · Präteritum»… (ver dg-items.js).
 * Variante de SM-2 con pasos de aprendizaje, tope de intervalo (examen en meses) y fuzz.
 *
 * Estado de unidad: { r reps, l lapses, e ease, i intervalo (días), d vence (ms), t último (ms),
 *                     s 'l' aprendiendo | 'r' repaso | 'x' reaprendiendo, n intentos, f fallos }
 * Calificación: 0 otra vez · 1 difícil · 2 bien · 3 fácil. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});

  var DAY = 86400000;
  var CFG = {
    learnStepMs: 3600000,       // tras un fallo, la unidad vuelve a estar disponible en 1 h
    easeStart: 2.3, easeMin: 1.3, easeMax: 3.0,
    hardFactor: 1.2, easyBonus: 1.3, lapseFactor: 0.25,
    firstGood: 1, firstEasy: 3, firstHard: 0.5,
    maxInterval: 120, fuzz: 0.05,
    wNew: 1.0, wLearning: 6, wLearningWait: 1.5, wDueBase: 4, wDueSpan: 4, wFutureMin: 0.1
  };

  function fresh(cfg) {
    cfg = cfg || CFG;
    return { r: 0, l: 0, e: cfg.easeStart, i: 0, d: 0, t: 0, s: 'l', n: 0, f: 0 };
  }

  // Del resultado del ítem a calificación.
  //  first: veredicto del primer intento ('correct' | 'wrong'); usedAlmost: hubo un «casi» antes de acertar.
  function gradeFor(first, usedAlmost, fast) {
    if (first !== 'correct') return 0;
    if (usedAlmost) return 1;
    return fast ? 3 : 2;
  }

  function update(st, grade, now, rng, cfg) {
    cfg = cfg || CFG;
    var s = st ? Object.assign({}, st) : fresh(cfg);
    s.n++; s.t = now;
    if (grade === 0) {
      s.f++;
      if (s.s === 'r' || s.s === 'x') {
        s.l++; s.e = Math.max(cfg.easeMin, s.e - 0.2);
        s.i = Math.max(1, Math.round(s.i * cfg.lapseFactor));
        s.s = 'x';
      } else { s.s = 'l'; s.i = 0; }
      s.d = now + cfg.learnStepMs;
      return s;
    }
    if (s.s === 'l') {
      s.r = 1; s.s = 'r';
      s.i = grade === 3 ? cfg.firstEasy : (grade === 1 ? cfg.firstHard : cfg.firstGood);
    } else if (s.s === 'x') {
      s.s = 'r'; s.r++;
      s.i = Math.max(1, s.i * (grade === 3 ? 1.5 : 1));
    } else {
      s.r++;
      if (grade === 1) { s.i = Math.max(1, Math.round(s.i * cfg.hardFactor)); s.e = Math.max(cfg.easeMin, s.e - 0.15); }
      else if (grade === 2) { s.i = Math.max(s.i + 1, Math.round(s.i * s.e)); }
      else { s.i = Math.max(s.i + 1, Math.round(s.i * s.e * cfg.easyBonus)); s.e = Math.min(cfg.easeMax, s.e + 0.15); }
    }
    if (s.i >= 3 && rng) s.i = s.i * (1 + (rng.next() * 2 - 1) * cfg.fuzz);
    s.i = Math.min(s.i, cfg.maxInterval);
    s.d = now + s.i * DAY;
    return s;
  }

  // 'new' | 'learning' | 'due' | 'future'
  function classify(st, now) {
    if (!st) return 'new';
    if (st.s === 'l' || st.s === 'x') return now >= st.d ? 'due' : 'learning';
    return now >= st.d ? 'due' : 'future';
  }

  function overdueRatio(st, now) {
    if (!st || now < st.d) return 0;
    return (now - st.d) / Math.max(DAY * 0.5, (st.i || 1) * DAY);
  }

  // Peso de muestreo según estado SRS (sin penalizaciones de memoria/cuotas).
  function weight(st, now, cfg) {
    cfg = cfg || CFG;
    var c = classify(st, now);
    if (c === 'new') return cfg.wNew;
    if (c === 'learning') return cfg.wLearningWait;
    if (c === 'due') {
      if (st.s === 'l' || st.s === 'x') return cfg.wLearning;
      return cfg.wDueBase + cfg.wDueSpan * Math.min(2, overdueRatio(st, now)) / 2;
    }
    var span = Math.max(1, st.d - st.t), p = Math.min(1, Math.max(0, (now - st.t) / span));
    return cfg.wFutureMin + (1 - cfg.wFutureMin) * p * p * 0.5;
  }

  DG.srs = { CFG: CFG, DAY: DAY, fresh: fresh, gradeFor: gradeFor, update: update, classify: classify,
    overdueRatio: overdueRatio, weight: weight };
  if (typeof module === 'object' && module.exports) module.exports = DG.srs;
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== dg-ramp.js ===== */
/* dg-ramp.js — rampa de nivel A1→B1 por dominio (módulo), tope ajustable y mezcla 70/20/10.
 *
 *  - 70 % nivel actual · 20 % repaso más fácil (niveles inferiores) · 10 % reto un nivel arriba.
 *  - El nivel sube por DOMINIO, no por calendario: precisión móvil ≥ objetivo (85 %) con evidencia
 *    suficiente y cobertura mínima del nivel; baja si la precisión cae por debajo del suelo.
 *  - El filtro de nivel es UNO solo (allowed/levelsAllowed) y lo usan scheduler, cola de errores y reintentos. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});
  if (typeof require === 'function' && typeof module === 'object') { require('./dg-items.js'); require('./dg-sampler.js'); }
  var LEVELS = DG.items.LEVELS;

  var CFG = {
    mix: { current: 0.7, easier: 0.2, up: 0.1 },
    target: 0.85,            // objetivo de aciertos
    window: 30,              // intentos recordados por módulo y nivel
    minAttempts: 20,         // promoción: ≥20 intentos sobre ítems YA vistos (retención)
    promoteAcc: 0.85,
    demoteAcc: 0.55, demoteMinAttempts: 25,
    masteryFrac: 0.5, masteryMaxUnits: 30,     // unidades «dominadas» necesarias: min(50 % del nivel, 30)
    masteryReps: 2,          // dominada = graduada y repasada con éxito ≥2 veces, sin estar en reaprendizaje (y, en verbos con cambio de vocal/irregulares, con ≥1 acierto en du o er_sie_es)
    minUnitsStart: 12,       // un nivel «existe» para un módulo si tiene ≥12 unidades
    minDwell: 5              // sesiones mínimas entre cambios de nivel (histéresis)
  };

  function rank(l) { return LEVELS.indexOf(l); }

  // Tope efectivo del módulo (el más estricto entre el global y el del módulo).
  function capFor(settings, module) {
    var g1 = rank((settings && settings.levelCap) || 'B1'); if (g1 < 0) g1 = 2;
    var m = settings && settings.capByModule && settings.capByModule[module];
    var m1 = m ? rank(m) : 2; if (m1 < 0) m1 = 2;
    return LEVELS[Math.min(g1, m1)];
  }
  // EL filtro de nivel. Todo el motor pregunta aquí.
  function allowed(settings, module, level) { return rank(level) <= rank(capFor(settings, module)); }
  function levelsAllowed(settings, module) { var c = rank(capFor(settings, module)); return LEVELS.slice(0, c + 1); }

  function populatedLevels(store, module, cfg) {
    cfg = cfg || CFG;
    return LEVELS.filter(function (l) { return store.unitCount(module, l) >= cfg.minUnitsStart; });
  }
  function startLevel(store, module, cfg) {
    var p = populatedLevels(store, module, cfg);
    if (p.length) return p[0];
    var any = store.levelsOf(module);
    return any.length ? any[0] : 'A1';
  }

  function moduleRamp(state, module) { return (state.ramp[module] = state.ramp[module] || { lv: null, win: {}, rev: {}, since: 0, carry: {} }); }

  // Nivel actual efectivo (respeta tope y niveles realmente poblados). Si bajo el tope sólo hay niveles
  // «finos» (<12 unidades), se usan igualmente y el scheduler avisa (LEVEL_THIN).
  function currentLevel(state, store, module, cfg) {
    cfg = cfg || CFG;
    var cap = capFor(state.settings, module), capR = rank(cap);
    var pop = populatedLevels(store, module, cfg).filter(function (l) { return rank(l) <= capR; });
    if (!pop.length) pop = store.levelsOf(module).filter(function (l) { return rank(l) <= capR; });
    if (!pop.length) return null;
    var r = state.ramp[module], lv = (r && r.lv) || pop[0];
    if (rank(lv) > capR) lv = cap;
    if (pop.indexOf(lv) >= 0) return lv;
    var up = pop.filter(function (l) { return rank(l) >= rank(lv); })[0];
    return up || pop[pop.length - 1];
  }

  // Estructura de cubos del módulo: qué niveles entran en cada cubo. Sólo niveles con ≥12 unidades
  // forman cubo propio (un nivel «fino» no se usa como repaso/reto: se repetiría sin parar).
  function buckets(state, store, module, cfg) {
    cfg = cfg || CFG;
    var cur = currentLevel(state, store, module, cfg);
    if (!cur) return null;
    var pop = populatedLevels(store, module, cfg);
    var cap = rank(capFor(state.settings, module));
    var easier = pop.filter(function (l) { return rank(l) < rank(cur); });
    var upL = pop.filter(function (l) { return rank(l) > rank(cur) && rank(l) <= cap; })[0] || null;
    return { current: cur, easier: easier, up: upL ? [upL] : [] };
  }

  // Proporciones efectivas (si falta cubo, su parte pasa al nivel actual).
  function shares(b, cfg) {
    cfg = cfg || CFG;
    var s = { current: cfg.mix.current, easier: cfg.mix.easier, up: cfg.mix.up };
    if (!b.easier.length) { s.current += s.easier; s.easier = 0; }
    if (!b.up.length) { s.current += s.up; s.up = 0; }
    return s;
  }

  // win = todos los intentos del nivel; rev = sólo intentos sobre unidades YA vistas (retención).
  // La promoción y la degradación usan rev: fallar contenido recién introducido no baja de nivel.
  function record(state, module, level, correct, seenBefore, cfg) {
    cfg = cfg || CFG;
    var r = moduleRamp(state, module); r.rev = r.rev || {};
    var w = (r.win[level] = r.win[level] || []);
    w.push(correct ? 1 : 0); if (w.length > cfg.window) w.splice(0, w.length - cfg.window);
    if (seenBefore) {
      var v = (r.rev[level] = r.rev[level] || []);
      v.push(correct ? 1 : 0); if (v.length > cfg.window) v.splice(0, v.length - cfg.window);
    }
  }

  function accuracy(w) { if (!w || !w.length) return null; var s = 0; w.forEach(function (x) { s += x; }); return s / w.length; }

  function seenUnits(state, store, module, level) {
    var n = 0;
    (store.unitsByModule[module] || []).forEach(function (u) { if (u.level === level && state.units[u.unit] && state.units[u.unit].n > 0) n++; });
    return n;
  }
  function masteredUnits(state, store, module, level, cfg) {
    cfg = cfg || CFG; var n = 0;
    (store.unitsByModule[module] || []).forEach(function (u) {
      if (u.level !== level) return;
      var s = state.units[u.unit];
      // verbos con cambio de vocal / irregulares: además ≥1 acierto en du o er_sie_es (hp)
      if (s && s.s === 'r' && s.r >= cfg.masteryReps && (!u.hard || s.hp)) n++;
    });
    return n;
  }

  // Evalúa promoción/degradación del módulo. Devuelve {change:'promote'|'demote'|null, from, to, acc, n}.
  function evaluate(state, store, module, sessionNo, cfg) {
    cfg = cfg || CFG;
    var r = moduleRamp(state, module); r.rev = r.rev || {};
    var cur = currentLevel(state, store, module, cfg);
    if (!cur) return { change: null };
    if (!r.lv) r.lv = cur;
    var w = r.rev[cur] || [], acc = accuracy(w), n = w.length;
    var out = { change: null, from: cur, to: cur, acc: acc, n: n, mastered: masteredUnits(state, store, module, cur, cfg) };
    if (sessionNo - (r.since || 0) < cfg.minDwell) return out;
    var pop = populatedLevels(store, module, cfg); if (!pop.length) pop = store.levelsOf(module);
    var cap = rank(capFor(state.settings, module));
    var idx = pop.indexOf(cur);
    if (n >= cfg.minAttempts && acc >= cfg.promoteAcc) {
      var nxt = pop[idx + 1];
      if (nxt && rank(nxt) <= cap) {
        var total = store.unitCount(module, cur), need = Math.min(Math.ceil(cfg.masteryFrac * total), cfg.masteryMaxUnits);
        if (out.mastered >= need) { r.lv = nxt; r.since = sessionNo; r.win[cur] = []; r.rev[cur] = []; r.rev[nxt] = []; out.change = 'promote'; out.to = nxt; }
      }
    } else if (n >= cfg.demoteMinAttempts && acc < cfg.demoteAcc && idx > 0) {
      r.lv = pop[idx - 1]; r.since = sessionNo; r.win[cur] = []; r.rev[cur] = []; out.change = 'demote'; out.to = r.lv;
    }
    return out;
  }

  DG.ramp = { CFG: CFG, LEVELS: LEVELS, capFor: capFor, allowed: allowed, levelsAllowed: levelsAllowed,
    populatedLevels: populatedLevels, startLevel: startLevel, currentLevel: currentLevel, buckets: buckets,
    shares: shares, record: record, evaluate: evaluate, moduleRamp: moduleRamp, accuracy: accuracy, seenUnits: seenUnits, masteredUnits: masteredUnits };
  if (typeof module === 'object' && module.exports) module.exports = DG.ramp;
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== dg-progress.js ===== */
/* dg-progress.js — progreso versionado, migraciones, persistencia (localStorage inyectable) y copia de seguridad.
 * Nunca lanza por datos corruptos: guarda copia «.bak» y arranca limpio. Importar es atómico (todo o nada). */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});

  var APP = 'deutschraum-gym';
  var VERSION = 2;
  var KEY = 'dg.progress';
  var HISTORY_MAX = 12;

  function defaults() {
    return {
      app: APP, version: VERSION, createdAt: 0, updatedAt: 0,
      settings: { levelCap: 'B1', capByModule: {}, memorySessions: 5, errorShare: 0.25, mode: 'touch' },
      sessionCounter: 0,
      history: [],      // [{n, ts, kind, modules, ids}]  últimas sesiones (memoria del randomizador)
      units: {},        // unidad → estado SRS
      items: {},        // id → {a intentos, f fallos, ls última sesión, lr último resultado 0/1}
      skills: {},       // skillId → {n, acc (EWMA), ls (última sesión en que salió)}
      tags: {},         // errorTag → {n, f, ls}
      errors: {},       // id → {s sesión del 1.er fallo, ls último fallo, f fallos, ts}
      ramp: {},         // módulo → {lv, win/rev:{A1:[0/1..]}, since, carry:{easier, up}}
      recent: [],       // últimos 60 primeros intentos (0/1): controla el ritmo de contenido nuevo
      stats: { sessions: 0, answered: 0, correct: 0, rescued: 0, learned: 0 }
    };
  }

  /* ---------- migraciones: cada una sube UNA versión ---------- */
  var MIGRATIONS = {
    // v0 (prototipo): { seen: {id: veces}, wrong: [ids] } sin versión.
    0: function (s) {
      var d = defaults();
      d.createdAt = s.createdAt || 0; d.updatedAt = s.updatedAt || 0;
      var seen = s.seen || {};
      Object.keys(seen).forEach(function (id) { d.items[id] = { a: seen[id] | 0, f: 0, ls: 0, lr: 1 }; });
      (s.wrong || []).forEach(function (id) {
        d.errors[id] = { s: 0, ls: 0, f: 1, ts: 0 };
        d.items[id] = d.items[id] || { a: 1, f: 1, ls: 0, lr: 0 };
        d.items[id].f = Math.max(1, d.items[id].f);
      });
      d.version = 1;
      return d;
    },
    // v1 → v2: unidades de repaso por habilidad (antes por id de ítem) y ramp/carry; se añade skills.ls.
    1: function (s) {
      s.units = s.units || {};
      s.ramp = s.ramp || {};
      Object.keys(s.skills || {}).forEach(function (k) { if (s.skills[k].ls == null) s.skills[k].ls = 0; });
      s.tags = s.tags || {};
      s.settings = Object.assign({ levelCap: 'B1', capByModule: {}, memorySessions: 5, errorShare: 0.25, mode: 'touch' }, s.settings || {});
      s.version = 2;
      return s;
    }
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function migrate(raw) {
    if (!raw || typeof raw !== 'object') throw new Error('estado inválido');
    var s = clone(raw), v = s.version | 0;
    if (v > VERSION) { var e = new Error('versión futura: ' + v); e.code = 'FUTURE_VERSION'; throw e; }
    while (v < VERSION) {
      if (!MIGRATIONS[v]) throw new Error('sin migración desde v' + v);
      s = MIGRATIONS[v](s); v = s.version | 0;
    }
    // Completar claves faltantes sin pisar datos.
    var d = defaults();
    Object.keys(d).forEach(function (k) { if (s[k] == null) s[k] = d[k]; });
    s.settings = Object.assign({}, d.settings, s.settings);
    s.stats = Object.assign({}, d.stats, s.stats);
    return s;
  }

  // Suma de comprobación (FNV-1a 32) sobre JSON canónico del estado, para detectar copias corruptas.
  function checksum(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
    return ('00000000' + h.toString(16)).slice(-8);
  }

  function create(opts) {
    opts = opts || {};
    var storage = opts.storage || null, key = opts.key || KEY;
    var clock = opts.clock || { now: function () { return Date.now(); } };
    var self = { state: null, loadInfo: { fresh: true, migratedFrom: null, recovered: false }, lastError: null };

    function nowTs() { return clock.now(); }

    self.load = function () {
      var raw = null;
      try { raw = storage ? storage.getItem(key) : null; } catch (e) { self.lastError = e; }
      if (!raw) { self.state = defaults(); self.state.createdAt = nowTs(); self.loadInfo = { fresh: true, migratedFrom: null, recovered: false }; return self.state; }
      try {
        var parsed = JSON.parse(raw), from = parsed.version | 0;
        self.state = migrate(parsed);
        self.loadInfo = { fresh: false, migratedFrom: from < VERSION ? from : null, recovered: false };
      } catch (e) {
        self.lastError = e;
        try { if (storage) storage.setItem(key + '.bak', raw); } catch (e2) { /* nada */ }
        self.state = defaults(); self.state.createdAt = nowTs();
        self.loadInfo = { fresh: true, migratedFrom: null, recovered: true, code: e.code || 'CORRUPT' };
      }
      return self.state;
    };

    self.save = function () {
      if (!self.state) return { ok: false, error: 'sin estado' };
      self.state.updatedAt = nowTs();
      try { if (storage) storage.setItem(key, JSON.stringify(self.state)); return { ok: true }; }
      catch (e) { self.lastError = e; return { ok: false, error: String(e && e.name || e) }; }
    };

    self.reset = function () { self.state = defaults(); self.state.createdAt = nowTs(); return self.save(); };

    self.exportJSON = function () {
      var body = JSON.stringify(self.state);
      return JSON.stringify({ app: APP, version: VERSION, exportedAt: nowTs(), checksum: checksum(body), state: self.state });
    };

    // Atómico: valida y migra en una copia; sólo si todo sale bien reemplaza el estado.
    self.importJSON = function (text) {
      var pkg, st;
      try { pkg = JSON.parse(text); } catch (e) { return { ok: false, code: 'NOT_JSON' }; }
      if (!pkg || pkg.app !== APP || !pkg.state) return { ok: false, code: 'NOT_BACKUP' };
      if (pkg.checksum && pkg.checksum !== checksum(JSON.stringify(pkg.state))) return { ok: false, code: 'CHECKSUM' };
      try { st = migrate(pkg.state); } catch (e) { return { ok: false, code: e.code || 'MIGRATION', error: String(e.message) }; }
      self.state = st;
      var r = self.save();
      return r.ok ? { ok: true, version: pkg.version | 0 } : { ok: false, code: 'SAVE', error: r.error };
    };

    // Quita referencias a ítems/unidades que ya no existen (tras actualizar el contenido).
    self.reconcile = function (store) {
      var st = self.state, removed = { items: 0, errors: 0, units: 0, history: 0 };
      Object.keys(st.items).forEach(function (id) { if (!store.byId[id]) { delete st.items[id]; removed.items++; } });
      Object.keys(st.errors).forEach(function (id) { if (!store.byId[id]) { delete st.errors[id]; removed.errors++; } });
      Object.keys(st.units).forEach(function (u) { if (!store.units[u]) { delete st.units[u]; removed.units++; } });
      st.history.forEach(function (h) {
        var n = h.ids.length; h.ids = h.ids.filter(function (id) { return !!store.byId[id]; }); removed.history += n - h.ids.length;
      });
      return removed;
    };

    return self;
  }

  DG.progress = { APP: APP, VERSION: VERSION, KEY: KEY, HISTORY_MAX: HISTORY_MAX, defaults: defaults, migrate: migrate,
    checksum: checksum, create: create };
  if (typeof module === 'object' && module.exports) module.exports = DG.progress;
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== dg-scheduler.js ===== */
/* dg-scheduler.js — construcción de sesiones: randomizador ponderado sin reemplazo, memoria de sesiones
 * previas, cuotas (módulo / habilidad / tipo / clase SRS), repaso espaciado por unidad y rampa 70/20/10.
 *
 * buildSession(ctx, req) es PURO respecto al estado: devuelve el plan y los restos de la rampa;
 * dg-engine.js lo «confirma». Semilla: la del ctx.rng (en producción NO depende de la fecha).
 *
 * Orden de decisiones:
 *   1. cola de errores (siempre entra; hasta errorShare de la sesión, más si hay atraso)
 *   2. cuotas por CLASE SRS de los huecos restantes: vencidas / nuevas / relleno.
 *      El cupo de nuevas sigue la precisión reciente (objetivo ≈85 %) y se frena con atraso (errores + vencidas).
 *   3. reparto por módulo (pesos: debilidad, antigüedad sin practicar, disponibilidad)
 *   4. por módulo: cubos de la rampa (actual/fácil/reto) con difusión de resto entre sesiones
 *   5. por hueco: clase (según cuota restante) → casilla (skillId: cuota máx., tamaño, antigüedad, debilidad)
 *      → unidad (peso SRS × memoria de sesiones × penalizaciones) → variante (fallos del ítem × memoria)
 *   6. ordenar: bloques para habilidades nuevas, intercalado después. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});
  if (typeof require === 'function' && typeof module === 'object') {
    ['dg-items.js', 'dg-sampler.js', 'dg-srs.js', 'dg-ramp.js'].forEach(function (f) { require('./' + f); });
  }
  var S = DG.sampler, SRS = DG.srs, R = DG.ramp;

  var CFG = {
    size: 12,
    // cuotas por clase SRS
    dueShareMax: 0.6,
    newShareBase: 0.35, newShareGain: 1.5, newShareMin: 0.1, newShareMax: 0.5, accTarget: 0.85, accMinSamples: 20,
    loadFree: 2, loadSpan: 4, pressureMin: 0.2,        // atraso (errores + vencidas) en «sesiones»: libre hasta 2, mínimo a 6
    classPrior: { due: 3, future: 1, new: 1 },
    futureGap: 3,                                      // relleno (clase future): excluye lo visto en las últimas 3 sesiones (≤ memorySessions)         // si las cuotas se agotan antes de tiempo
    // cuotas por casilla y por tipo
    maxCellShare: 0.5,
    typeCaps: { 'order': 0.3, 'transform': 0.25, 'minimal-pair': 0.25 },
    // penalizaciones suaves
    lemmaPenalty: 0.1, familyPenalty: 0.3,
    newSkillN: 5,
    cellAgeSpan: 8, cellAgeMax: 12, weaknessGain: 1.5,
    cellCountExp: 0.2,                                 // peso del módulo ∝ (nº de casillas alcanzables)^0.2 → cobertura (calibrado con simulación)
    moduleAgeSpan: 6, moduleAgeMax: 2, priorAcc: 0.7, priorMinN: 10,
    hardPersonBoost: 3, infPersonDamp: 0.5,
    starveSessions: 10, guardMinF: 6,            // verbos con cambio de vocal / irregulares (du, er_sie_es ×3; = infinitivo ×0,5)
    errorBacklogFactor: 1.6, errorWeightFails: 0.5, errorAgeSpan: 8, errorAgeMax: 3
  };
  var CLASSES = ['due', 'new', 'future'];

  // d = sesiones de distancia a la última aparición (1 = la sesión anterior). N = ventana de memoria.
  function recencyFactor(d, N) {
    if (d == null || d > N || d < 1) return 1;
    var x = d / (N + 1);
    return x * x;
  }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function sampleOne(weights, rng) { return S.drawIndex(weights, rng); }
  // `learning` (paso de aprendizaje sin cumplir) NO es una clase elegible: ni cuota, ni atraso D, ni sorteo hasta que venza.
  function classOfState(st, now) { return SRS.classify(st, now); }

  function buildSession(ctx, req) {
    var store = ctx.store, st = ctx.state, rng = ctx.rng, now = ctx.now;
    var cfg = Object.assign({}, CFG, ctx.cfg || {});
    var settings = st.settings;
    var sessionNo = st.sessionCounter + 1;
    var kind = req.kind || 'mix';
    var size = Math.max(1, req.size || cfg.size);
    var N = settings.memorySessions;
    var warnings = [], notes = [];

    var modules = (req.modules && req.modules.length ? req.modules : store.modules()).filter(function (m) { return !!store.byModule[m]; });
    if (!modules.length) return { sessionNo: sessionNo, kind: kind, size: size, items: [], warnings: [{ code: 'NO_MODULES' }], notes: [], carry: {}, composition: {}, modulePlan: {} };

    /* ---- memoria de sesiones previas ---- */
    var itemDist = Object.create(null), unitDist = Object.create(null);
    st.history.forEach(function (h) {
      var d = sessionNo - h.n;
      if (d < 1 || d > N) return;
      h.ids.forEach(function (id) {
        if (!(id in itemDist) || d < itemDist[id]) itemDist[id] = d;
        var it = store.byId[id];
        if (it && (!(it.unit in unitDist) || d < unitDist[it.unit])) unitDist[it.unit] = d;
      });
    });

    var used = { unit: Object.create(null), item: Object.create(null), lemma: Object.create(null), family: Object.create(null) };
    var typeCount = Object.create(null), cellUsed = Object.create(null);
    var entries = [];

    function levelOK(it) { return R.allowed(settings, it.module, it.level); }   // único filtro de nivel

    function take(it, bucket, cls) {
      used.unit[it.unit] = true; used.item[it.id] = true;
      if (it.lemma) used.lemma[it.lemma] = (used.lemma[it.lemma] || 0) + 1;
      if (it.family) used.family[it.family] = true;
      typeCount[it.type] = (typeCount[it.type] || 0) + 1;
      cellUsed[it.skillId] = (cellUsed[it.skillId] || 0) + 1;   // los errores obligatorios también ocupan cuota
      entries.push({ id: it.id, unit: it.unit, module: it.module, skillId: it.skillId, level: it.level, type: it.type, bucket: bucket, cls: cls });
    }

    /* ---- 1. cola de errores ---- */
    var errList = [];
    Object.keys(st.errors).forEach(function (id) {
      var it = store.byId[id];
      if (!it || modules.indexOf(it.module) < 0 || !levelOK(it)) return;
      errList.push({ it: it, e: st.errors[id] });
    });
    var errCap;
    if (kind === 'errors') errCap = Math.min(size, errList.length);
    else {
      var share = settings.errorShare * (errList.length > 2 * size ? cfg.errorBacklogFactor : 1);
      errCap = Math.min(errList.length, Math.ceil(size * share));
    }
    var ew = errList.map(function (x) {
      if (now - (x.e.ts || 0) < SRS.CFG.learnStepMs) return 0;   // recién fallado: aún en el paso de aprendizaje
      return 1 + cfg.errorWeightFails * Math.min(4, x.e.f || 1) + Math.min(cfg.errorAgeMax, (sessionNo - (x.e.ls || 0)) / cfg.errorAgeSpan);
    });
    var errChosen = 0;
    while (errChosen < errCap) {
      var ei = sampleOne(ew, rng);
      if (ei < 0) break;
      var ex = errList[ei]; ew[ei] = 0;
      if (kind !== 'errors' && used.unit[ex.it.unit]) continue;   // una sola unidad por sesión (salvo repaso de errores: ahí cada error cuenta)
      take(ex.it, 'error', 'error'); errChosen++;
    }
    if (kind === 'errors' && !errList.length) warnings.push({ code: 'NO_ERRORS', msg: 'No hay errores pendientes en el nivel permitido.' });
    else if (kind === 'errors' && !errChosen) warnings.push({ code: 'ERRORS_NOT_READY', msg: 'Los errores son de hace menos de 1 h: vuelve más tarde.' });

    var F = kind === 'errors' ? 0 : size - errChosen;

    /* ---- índices por módulo/casilla ---- */
    var cellsByModule = Object.create(null);
    modules.forEach(function (m) {
      var cells = Object.create(null);
      (store.unitsByModule[m] || []).forEach(function (u) { (cells[u.skillId] = cells[u.skillId] || []).push(u); });
      cellsByModule[m] = Object.keys(cells).map(function (k) { return { skillId: k, units: cells[k] }; });
    });
    function unitType(u) { return u.items[0].type; }
    var typeCap = {};
    Object.keys(cfg.typeCaps).forEach(function (t) { typeCap[t] = Math.max(1, Math.ceil(cfg.typeCaps[t] * size)); });

    var clsCache = Object.create(null);
    function clsOf(u) { var c = clsCache[u.unit]; if (!c) c = clsCache[u.unit] = classOfState(st.units[u.unit], now); return c; }

    function unitEligible(u, levels, relaxType) {
      if (used.unit[u.unit]) return false;
      if (levels && levels.indexOf(u.level) < 0) return false;
      if (!R.allowed(settings, u.module, u.level)) return false;
      if (!relaxType) { var t = unitType(u); if (typeCap[t] && (typeCount[t] || 0) >= typeCap[t]) return false; }
      return true;
    }

    var futureGap = Math.min(cfg.futureGap, N);
    function futureOK(u) { return !(u.unit in unitDist) || unitDist[u.unit] > futureGap; }

    function allowedUnitsCount(m) {
      var n = 0; (store.unitsByModule[m] || []).forEach(function (u) { if (unitEligible(u, null, true)) n++; }); return n;
    }

    /* ---- avisos de tamaño mínimo de pool bajo el tope ---- */
    var poolSeen = {};
    modules.forEach(function (m) {
      (store.byModule[m] || []).forEach(function (it) { if (!poolSeen[it.poolId]) poolSeen[it.poolId] = 0; if (levelOK(it)) poolSeen[it.poolId]++; });
    });
    Object.keys(poolSeen).forEach(function (pid) {
      var n = poolSeen[pid];
      if (n > 0 && n < DG.items.MIN_POOL) warnings.push({ code: 'POOL_UNDER_MIN', pool: pid, available: n, min: DG.items.MIN_POOL });
    });

    /* ---- 2. cuotas por clase SRS ---- */
    var D = 0;                                             // unidades vencidas elegibles en el ámbito
    modules.forEach(function (m) { (store.unitsByModule[m] || []).forEach(function (u) { if (unitEligible(u, null, true) && clsOf(u) === 'due') D++; }); });
    var rec = st.recent || [], accNow = rec.length >= cfg.accMinSamples ? rec.reduce(function (a, b) { return a + b; }, 0) / rec.length : cfg.accTarget;
    var load = errList.length + D;                         // atraso total en huecos
    var pressure = load <= cfg.loadFree * size ? 1 : Math.max(cfg.pressureMin, 1 - (load - cfg.loadFree * size) / (cfg.loadSpan * size));
    var newShare = clamp(cfg.newShareBase + cfg.newShareGain * (accNow - cfg.accTarget), cfg.newShareMin, cfg.newShareMax) * pressure;
    if (pressure < 1) notes.push({ code: 'BACKPRESSURE', factor: +pressure.toFixed(2), errors: errList.length, due: D });
    var quota = { due: Math.min(D, Math.ceil(F * cfg.dueShareMax)), new: 0, future: 0 };
    quota.new = Math.min(Math.ceil(F * newShare), F - quota.due);
    quota.future = F - quota.due - quota.new;

    /* ---- pesos de módulo ---- */
    function skillsOf(m) { return Object.keys(st.skills).filter(function (k) { return k.indexOf(m + ':') === 0; }); }
    function moduleAcc(m) {
      var sn = 0, sa = 0;
      skillsOf(m).forEach(function (k) { var s = st.skills[k]; sn += s.n; sa += s.acc * s.n; });
      return sn >= cfg.priorMinN ? sa / sn : cfg.priorAcc;
    }
    function moduleAge(m) {
      var last = -1; skillsOf(m).forEach(function (k) { if ((st.skills[k].ls || 0) > last) last = st.skills[k].ls; });
      return last < 0 ? 10 : sessionNo - last;
    }
    var mAvail = modules.map(allowedUnitsCount);
    function reachableCells(m) {
      var cur = R.currentLevel(st, store, m); if (!cur) return 1;
      var cr = DG.items.levelRank(cur), n = 0;
      cellsByModule[m].forEach(function (c) { if (c.units.some(function (u) { return DG.items.levelRank(u.level) <= cr && unitEligible(u, null, true); })) n++; });
      return Math.max(1, n);
    }
    var mWeights = modules.map(function (m, i) {
      if (!mAvail[i]) return 0;
      var weak = Math.max(0, 1 - moduleAcc(m));
      var age = 1 + Math.min(cfg.moduleAgeMax, moduleAge(m) / cfg.moduleAgeSpan);
      return (1 + cfg.weaknessGain * weak) * age * Math.pow(reachableCells(m), cfg.cellCountExp);
    });
    modules.forEach(function (m, i) { if (!mAvail[i]) warnings.push({ code: 'MODULE_EMPTY_UNDER_CAP', module: m }); });
    var mAlloc = F > 0 ? S.largestRemainder(F, mWeights, rng, mAvail) : modules.map(function () { return 0; });

    /* ---- 4. cubos de la rampa por módulo ---- */
    var slots = [], carryOut = {}, modulePlan = {};
    modules.forEach(function (m, i) {
      var n = mAlloc[i]; if (!n) return;
      var b = R.buckets(st, store, m);
      if (!b) return;
      var thin = store.unitCount(m, b.current) < R.CFG.minUnitsStart;
      if (thin) warnings.push({ code: 'LEVEL_THIN', module: m, level: b.current, units: store.unitCount(m, b.current) });
      var sh = R.shares(b);
      modulePlan[m] = { n: n, current: b.current, hasEasier: b.easier.length > 0, hasUp: b.up.length > 0 };
      var alloc = S.allocateWithCarry(n, sh, (st.ramp[m] && st.ramp[m].carry) || {});
      carryOut[m] = alloc.carry;
      ['up', 'easier', 'current'].forEach(function (name) {
        for (var k = 0; k < alloc.counts[name]; k++) {
          slots.push({ module: m, bucket: name, levels: name === 'current' ? [b.current] : b[name], current: b.current });
        }
      });
    });

    /* ---- 5. clase → casilla → unidad → variante ---- */
    var cellCapOf = {};
    modules.forEach(function (m, i) { cellCapOf[m] = cellsByModule[m].length > 1 ? Math.max(2, Math.ceil(cfg.maxCellShare * mAlloc[i])) : Infinity; });

    function unitWeight(u) {
      var w = SRS.weight(st.units[u.unit], now);
      // La memoria de sesiones sólo frena lo NUEVO y el relleno; una unidad vencida (p. ej. intervalo 1 d, vista ayer) debe volver ya.
      if (clsOf(u) !== 'due') w *= recencyFactor(unitDist[u.unit], N);
      if (u.lemma && used.lemma[u.lemma]) w *= cfg.lemmaPenalty;
      if (u.family && used.family[u.family]) w *= cfg.familyPenalty;
      return w;
    }

    function cellBase(cell, levels, cls, relax, strict) {
      var n = 0;
      for (var i = 0; i < cell.units.length; i++) {
        var u = cell.units[i];
        if (clsOf(u) !== cls || !unitEligible(u, levels, relax >= 1)) continue;
        if (strict && !futureOK(u)) continue;
        n++;
      }
      if (!n) return 0;
      var sk = st.skills[cell.skillId];
      var age = sk && sk.ls != null ? sessionNo - sk.ls : 10;
      var ageF = 1 + Math.min(cfg.cellAgeMax, Math.pow(age / cfg.cellAgeSpan, 2));   // cuadrático: las casillas pequeñas no se quedan sin turno
      var weakF = sk && sk.n >= 5 ? 1 + cfg.weaknessGain * Math.max(0, 1 - sk.acc) : 1;
      return Math.sqrt(n) * ageF * weakF;
    }

    function chooseVariant(u) {
      var items = u.items, w = items.map(function (it) {
        if (used.item[it.id] || !levelOK(it)) return 0;
        var s = st.items[it.id], fr = s && s.a ? s.f / s.a : 0;
        var pw = 1;
        // Verbos con cambio de vocal / irregulares: las personas que delatan el cambio (du, er/sie/es) pesan ×3 y las
        // formas iguales al infinitivo ×0,5, para que la unidad no se «domine» viendo sólo wir/sie_Sie.
        if (u.hard) pw = (it.person === 'du' || it.person === 'er_sie_es') ? cfg.hardPersonBoost : (u.infIds[it.id] ? cfg.infPersonDamp : 1);
        return pw * (1 + 2 * fr) * recencyFactor(itemDist[it.id], N);
      });
      var i = sampleOne(w, rng);
      return i < 0 ? null : items[i];
    }

    function fill(spec, relax) {
      // relax 0: cubo y cuotas · 1: sin cuotas de casilla/tipo · 2: cualquier nivel permitido del módulo
      var cells = [];
      spec.modules.forEach(function (m) { cellsByModule[m].forEach(function (c) { cells.push({ m: m, cell: c }); }); });
      var levels = relax >= 2 ? null : spec.levels;
      var open = cells.filter(function (x) { return relax >= 1 || (cellUsed[x.cell.skillId] || 0) < cellCapOf[x.m]; });
      // disponibilidad por clase en el ámbito del hueco
      var avail = { due: 0, new: 0, future: 0 };
      open.forEach(function (x) {
        x.cell.units.forEach(function (u) { if (unitEligible(u, levels, relax >= 1)) avail[clsOf(u)]++; });
      });
      var cw = CLASSES.map(function (c) { return avail[c] > 0 ? Math.max(0, quota[c]) : 0; });
      var ci = sampleOne(cw, rng);
      if (ci < 0) { cw = CLASSES.map(function (c) { return avail[c] > 0 ? cfg.classPrior[c] : 0; }); ci = sampleOne(cw, rng); }
      if (ci < 0) return null;
      // probar la clase elegida y, si sus casillas no rinden, las demás (por si el tope de tipo las vació)
      // El relleno (future) no tiene motivo didáctico para repetir lo recién visto: primero se prueba en modo estricto
      // (excluye las últimas futureGap sesiones) y sólo como último recurso se permite repetir.
      var tryOrder = [{ c: CLASSES[ci], strict: true }].concat(CLASSES.filter(function (c, j) { return j !== ci && avail[c] > 0; }).map(function (c) { return { c: c, strict: true }; }));
      if (avail.future > 0) tryOrder.push({ c: 'future', strict: false });
      for (var oi = 0; oi < tryOrder.length; oi++) {
        var cls = tryOrder[oi].c, strict = tryOrder[oi].strict && cls === 'future';
        var cwt = open.map(function (x) { return cellBase(x.cell, levels, cls, relax, strict); });
        while (true) {
          var k = sampleOne(cwt, rng);
          if (k < 0) break;
          var cell = open[k].cell;
          var cands = cell.units.filter(function (u) { return clsOf(u) === cls && unitEligible(u, levels, relax >= 1) && (!strict || futureOK(u)); });
          if (!cands.length) { cwt[k] = 0; continue; }
          var ui = sampleOne(cands.map(unitWeight), rng);
          if (ui < 0) { cwt[k] = 0; continue; }
          var u = cands[ui], it = chooseVariant(u);
          if (!it) { cwt[k] = 0; continue; }
          if (quota[cls] > 0) quota[cls]--;
          take(it, relax >= 1 ? 'fallback' : spec.bucket, SRS.classify(st.units[u.unit], now));
          return it;
        }
      }
      return null;
    }

    /* ---- guarda anti-inanición: 1 hueco por sesión (si F ≥ guardMinF) para la casilla alcanzable que más sesiones lleva sin salir ---- */
    if (kind !== 'errors' && F >= cfg.guardMinF) {
      var worst = null;
      modules.forEach(function (m) {
        var cur = R.currentLevel(st, store, m); if (!cur) return;
        var cr = DG.items.levelRank(cur);
        cellsByModule[m].forEach(function (c) {
          var sk = st.skills[c.skillId], age = sessionNo - (sk && sk.ls != null ? sk.ls : 0);
          if (age <= cfg.starveSessions || (worst && age <= worst.age)) return;
          var cands = c.units.filter(function (u) { return DG.items.levelRank(u.level) <= cr && unitEligible(u, null, true); });
          if (cands.length) worst = { age: age, cell: c, m: m, cands: cands };
        });
      });
      if (worst) {
        // «mejor» unidad de la casilla sea cual sea su clase: la de mayor peso SRS/recencia que tenga alguna variante servible
        var ranked = worst.cands.map(function (u) { return { u: u, w: unitWeight(u) }; }).sort(function (a, b) { return b.w - a.w; });
        for (var gi = 0; gi < ranked.length; gi++) {
          var gu = ranked[gi].u, git = chooseVariant(gu);
          if (!git) continue;
          var si = -1;
          for (var q = 0; q < slots.length; q++) if (slots[q].module === worst.m && (si < 0 || slots[q].bucket === 'current')) si = q;
          if (si < 0) si = 0;
          if (slots.length) slots.splice(si, 1);
          var gcls = clsOf(gu); if (quota[gcls] > 0) quota[gcls]--;
          take(git, 'current', gcls);
          entries[entries.length - 1].guard = true;
          notes.push({ code: 'STARVATION_GUARD', skillId: worst.cell.skillId, sessions: worst.age });
          break;
        }
      }
    }

    var missing = [];
    rng.shuffle(slots).forEach(function (sl) {
      var ok = fill({ modules: [sl.module], levels: sl.levels, bucket: sl.bucket }, 0);
      if (!ok && sl.bucket !== 'current') ok = fill({ modules: [sl.module], levels: [sl.current], bucket: 'current' }, 0);
      if (!ok) missing.push(sl);
    });
    // Relleno por relajación progresiva (nunca viola el filtro de nivel ni repite unidades).
    var guard = 0;
    while (entries.length - errChosen < F && guard++ < size * 4) {
      var miss = missing.shift();
      var spec = miss ? { modules: [miss.module], levels: [miss.current], bucket: 'fallback' } : { modules: modules, levels: null, bucket: 'fallback' };
      var done = fill(spec, 1) || fill({ modules: spec.modules, levels: null, bucket: 'fallback' }, 2) || fill({ modules: modules, levels: null, bucket: 'fallback' }, 2);
      if (!done) break;
    }
    var fallbackN = entries.filter(function (e) { return e.bucket === 'fallback'; }).length;
    if (fallbackN) notes.push({ code: 'RELAXED', count: fallbackN });
    var expected = kind === 'errors' ? errChosen : size;
    if (entries.length < expected) warnings.push({ code: 'SHORTFALL', requested: size, delivered: entries.length });

    /* ---- 6. orden: bloques para habilidades nuevas, intercalado después ---- */
    var ordered = arrange(entries, st, rng, cfg, kind);

    var comp = { error: 0, current: 0, easier: 0, up: 0, fallback: 0, cls: { new: 0, due: 0, learning: 0, future: 0, error: 0 } };
    entries.forEach(function (e) { comp[e.bucket]++; comp.cls[e.cls]++; });
    comp.control = { newShare: +newShare.toFixed(3), pressure: +pressure.toFixed(3), accRecent: +accNow.toFixed(3), dueAvail: D, errorBacklog: errList.length };

    return { sessionNo: sessionNo, kind: kind, size: size, items: ordered, warnings: warnings, notes: notes, carry: carryOut, composition: comp, modulePlan: modulePlan };
  }

  function arrange(entries, st, rng, cfg, kind) {
    if (kind === 'errors') return rng.shuffle(entries);
    var errs = entries.filter(function (e) { return e.bucket === 'error'; });
    var rest = rng.shuffle(entries.filter(function (e) { return e.bucket !== 'error'; }));
    // chunks: bloques de habilidades nuevas (≥2 ítems de la misma skill aún poco vista) o ítems sueltos
    var groups = Object.create(null);
    rest.forEach(function (e) {
      var sk = st.skills[e.skillId];
      if (!sk || sk.n < cfg.newSkillN) (groups[e.skillId] = groups[e.skillId] || []).push(e);
    });
    var chunks = [], placed = new Set();
    rest.forEach(function (e) {
      if (placed.has(e)) return;
      var gk = groups[e.skillId];
      if (gk && gk.length > 1) { gk.forEach(function (x) { placed.add(x); }); chunks.push({ skillId: e.skillId, items: gk.slice() }); }
      else { placed.add(e); chunks.push({ skillId: e.skillId, items: [e] }); }
    });
    // intercalar: evitar la misma habilidad en chunks contiguos cuando hay alternativa
    for (var i = 1; i < chunks.length; i++) {
      if (chunks[i].skillId === chunks[i - 1].skillId) {
        for (var j = i + 1; j < chunks.length; j++) {
          if (chunks[j].skillId !== chunks[i - 1].skillId) { var t = chunks[i]; chunks[i] = chunks[j]; chunks[j] = t; break; }
        }
      }
    }
    var flat = []; chunks.forEach(function (c) { c.items.forEach(function (e) { flat.push(e); }); });
    // errores repartidos a intervalos regulares
    var out = flat.slice(), total = flat.length + errs.length;
    errs = rng.shuffle(errs);
    errs.forEach(function (e, k) {
      var pos = Math.min(out.length, Math.round(((k + 0.5) * total) / errs.length));
      out.splice(pos, 0, e);
    });
    return out;
  }

  DG.scheduler = { CFG: CFG, recencyFactor: recencyFactor, buildSession: buildSession };
  if (typeof module === 'object' && module.exports) module.exports = DG.scheduler;
})(typeof globalThis !== 'undefined' ? globalThis : this);

/* ===== dg-engine.js ===== */
/* dg-engine.js — fachada del motor: sesiones, evaluación, repaso espaciado, cola de errores y progreso.
 * Sin interfaz. La UI (etapa 3) sólo llama a: createEngine → startSession → session.view/answer/finish. */
(function (g) {
  'use strict';
  var DG = (g.DG = g.DG || {});
  if (typeof require === 'function' && typeof module === 'object') {
    ['dg-rng.js', 'dg-text.js', 'dg-sampler.js', 'dg-items.js', 'dg-evaluator.js', 'dg-srs.js', 'dg-ramp.js', 'dg-progress.js', 'dg-scheduler.js']
      .forEach(function (f) { require('./' + f); });
  }
  var Items = DG.items, Ev = DG.evaluator, SRS = DG.srs, R = DG.ramp, P = DG.progress, Sch = DG.scheduler;

  var CFG = { maxRetries: 2, retryGap: 3, retryMinBehind: 2, almostAllowance: 1, ewmaAlpha: 0.1,
    rescueMinMs: 16 * 3600000 };   // un error sólo se rescata si han pasado ≥16 h desde el último fallo

  function createEngine(opts) {
    opts = opts || {};
    var cfg = Object.assign({}, CFG, opts.config || {});
    var clock = opts.clock || { now: function () { return Date.now(); } };
    var rng = opts.rng || DG.rng.create();
    var store = Items.createStore(opts.data || []);
    var progress = P.create({ storage: opts.storage || null, key: opts.key, clock: clock });
    progress.load();
    var reconciled = progress.reconcile(store);

    var engine = { store: store, progress: progress, rng: rng, clock: clock, cfg: cfg, reconciled: reconciled };
    function state() { return progress.state; }
    engine.state = state;

    engine.validate = function () { return Items.validate(store, { concepts: opts.concepts }); };

    engine.setLevelCap = function (level, module) {
      if (Items.LEVELS.indexOf(level) < 0) throw new Error('nivel inválido: ' + level);
      if (module) state().settings.capByModule[module] = level; else state().settings.levelCap = level;
      return progress.save();
    };

    /* ---------- sesiones ---------- */
    engine.startSession = function (req) {
      req = req || {};
      var st = state();
      var plan = Sch.buildSession({ store: store, state: st, rng: rng, now: clock.now(), cfg: opts.schedulerConfig }, req);
      // Abrir NO escribe nada: contador, restos de rampa e historial se confirman en la 1.ª respuesta (o giveUp).
      // Así una sesión abierta y cerrada sin responder no deja rastro ni degrada la memoria de sesiones.
      return makeSession(plan, req);
    };

    function makeSession(plan, req) {
      var st = state();
      var mode = req.mode || st.settings.mode || 'touch';
      var queue = plan.items.map(function (e) { return Object.assign({ retry: 0, almostUsed: 0 }, e); });
      var index = 0, finished = false, committed = false, sessionNo = plan.sessionNo, saveError = null, viewCache = null;
      var log = [];            // un registro por PRIMER intento
      var rescued = [], newUnits = {}, modulesTouched = {};
      var S = { id: sessionNo, kind: plan.kind, plan: plan, warnings: plan.warnings, notes: plan.notes, composition: plan.composition };

      S.length = function () { return queue.length; };
      S.position = function () { return index; };
      S.done = function () { return index >= queue.length; };
      S.currentEntry = function () { return index < queue.length ? queue[index] : null; };
      S.currentItem = function () { var e = S.currentEntry(); return e ? store.byId[e.id] : null; };
      // La vista se cachea por posición de cola (y modo): llamar dos veces no vuelve a barajar fichas/opciones.
      S.view = function (m) {
        var it = S.currentItem(); if (!it) return null;
        var md = m || mode;
        if (viewCache && viewCache.index === index && viewCache.mode === md) return viewCache.v;
        var v = Items.view(it, md, rng);
        var e = S.currentEntry(); v.retry = e.retry; v.bucket = e.bucket; v.cls = e.cls;
        viewCache = { index: index, mode: md, v: v };
        return v;
      };
      function save() { var r = progress.save(); if (!r || !r.ok) saveError = (r && r.error) || 'save'; else saveError = null; return saveError; }
      // Reintento en sesión sólo si queda margen: con <retryMinBehind ítems por detrás se vería enseguida (no es repaso).
      function canRetry(e, it) { return e.retry < cfg.maxRetries && R.allowed(st.settings, it.module, it.level) && queue.length - index - 1 >= cfg.retryMinBehind; }

      // Confirmación diferida: contador, restos de rampa y entrada de historial (los ids se añaden al contestar).
      // Si otra sesión abierta después ya confirmó (contador ≥ nuestro número), se toma el siguiente libre.
      function commit() {
        if (committed) return;
        committed = true;
        sessionNo = Math.max(plan.sessionNo, st.sessionCounter + 1); S.id = sessionNo;
        st.sessionCounter = sessionNo;
        Object.keys(plan.carry).forEach(function (m) { R.moduleRamp(st, m).carry = plan.carry[m]; });
        st.history.push({ n: sessionNo, ts: clock.now(), kind: plan.kind, modules: Array.from(new Set(plan.items.map(function (e) { return e.module; }))), ids: [] });
        if (st.history.length > P.HISTORY_MAX) st.history.splice(0, st.history.length - P.HISTORY_MAX);
      }

      function recordFirst(it, e, correct, usedAlmost) {
        var now = clock.now();
        // historial (memoria del randomizador)
        var h = st.history[st.history.length - 1];
        if (h && h.n === sessionNo) h.ids.push(it.id);
        // ítem
        var is = st.items[it.id] || (st.items[it.id] = { a: 0, f: 0, ls: 0, lr: 1 });
        is.a++; if (!correct) is.f++; is.ls = sessionNo; is.lr = correct ? 1 : 0;
        // unidad SRS (calificación SOLO del primer intento)
        var before = st.units[it.unit];
        st.units[it.unit] = SRS.update(before, SRS.gradeFor(correct ? 'correct' : 'wrong', usedAlmost, false), now, rng);
        if (correct && (!before || before.s === 'l')) { newUnits[it.unit] = true; st.stats.learned++; }
        // verbos con cambio de vocal / irregulares: marca por unidad de que ya se acertó una persona difícil (du / er_sie_es)
        var ui = store.unitInfo[it.unit];
        if (correct && ui && ui.hard && (it.person === 'du' || it.person === 'er_sie_es')) st.units[it.unit].hp = true;
        // habilidad (EWMA; media simple mientras hay pocos datos)
        var sk = st.skills[it.skillId] || (st.skills[it.skillId] = { n: 0, acc: 0, ls: 0 });
        var x = correct ? 1 : 0, a = Math.max(cfg.ewmaAlpha, 1 / (sk.n + 1));
        sk.acc = sk.n === 0 ? x : sk.acc + a * (x - sk.acc); sk.n++; sk.ls = sessionNo;
        // mapa de errores por etiqueta
        if (it.errorTag) {
          var tg = st.tags[it.errorTag] || (st.tags[it.errorTag] = { n: 0, f: 0, ls: 0 });
          tg.n++; if (!correct) tg.f++; tg.ls = sessionNo;
        }
        // cola de errores: todo fallo entra; sale al acertar cuando han pasado ≥ rescueMinMs (16 h) desde el último fallo.
        // Un acierto anterior cuenta para el SRS pero el error sigue en la cola (se actualiza ls, no f ni ts).
        var res = { rescued: false };
        if (!correct) {
          var prev = st.errors[it.id];
          st.errors[it.id] = { s: prev ? prev.s : sessionNo, ls: sessionNo, f: (prev ? prev.f : 0) + 1, ts: now };
        } else if (st.errors[it.id]) {
          var er = st.errors[it.id];
          if (now - (er.ts || 0) >= cfg.rescueMinMs) {
            res.rescued = true; res.fails = er.f;
            delete st.errors[it.id]; st.stats.rescued++; rescued.push(it.id);
          } else er.ls = sessionNo;
        }
        // rampa: registro por módulo y nivel
        R.record(st, it.module, it.level, correct, !!before && before.n > 0);
        st.recent.push(correct ? 1 : 0); if (st.recent.length > 60) st.recent.splice(0, st.recent.length - 60);
        modulesTouched[it.module] = true;
        st.stats.answered++; if (correct) st.stats.correct++;
        log.push({ id: it.id, unit: it.unit, module: it.module, skillId: it.skillId, errorTag: it.errorTag, level: it.level, correct: correct, rescued: res.rescued, bucket: e.bucket });
        return res;
      }

      /* answer(response, {mode}) → {evaluation, almost, advance, retryScheduled, rescued, finished} */
      S.answer = function (response, aopts) {
        if (finished) throw new Error('sesión terminada');
        var e = S.currentEntry(); if (!e) throw new Error('sin ítem actual');
        var it = store.byId[e.id];
        var ev = Ev.evaluate(it, response, Object.assign({ mode: mode }, aopts || {}));
        var out = { evaluation: ev, almost: false, advance: true, retryScheduled: false, rescued: false, finished: false };
        if (ev.verdict === 'almost') {
          if (e.almostUsed < cfg.almostAllowance) { e.almostUsed++; out.almost = true; out.advance = false; return out; }
          ev.verdict = 'wrong'; ev.correct = false; ev.notes = (ev.notes || []).concat('almost-exhausted');
        }
        var correct = ev.verdict === 'correct';
        commit();
        if (e.retry === 0) {
          var r = recordFirst(it, e, correct, e.almostUsed > 0);
          out.rescued = r.rescued; out.fails = r.fails;
        }
        if (!correct && canRetry(e, it)) {
          // reintento del MISMO error dentro de la sesión, unos ítems más adelante
          var pos = Math.min(queue.length, index + 1 + cfg.retryGap);
          queue.splice(pos, 0, Object.assign({}, e, { retry: e.retry + 1, almostUsed: 0, bucket: 'retry', cls: 'retry' }));
          out.retryScheduled = true;
        }
        index++;
        if (save()) out.saveError = saveError;
        if (S.done()) { out.finished = true; }
        return out;
      };

      // Rendirse/ver respuesta: cuenta como fallo del primer intento.
      S.giveUp = function () {
        var e = S.currentEntry(); if (!e) throw new Error('sin ítem actual');
        var it = store.byId[e.id];
        commit();
        if (e.retry === 0) recordFirst(it, e, false, false);
        if (canRetry(e, it)) {
          queue.splice(Math.min(queue.length, index + 1 + cfg.retryGap), 0, Object.assign({}, e, { retry: e.retry + 1, almostUsed: 0, bucket: 'retry', cls: 'retry' }));
        }
        index++;
        var out = { finished: S.done() };
        if (save()) out.saveError = saveError;
        return out;
      };

      /* finish(): evalúa la rampa por módulo y cierra la sesión (idempotente). */
      S.finish = function () {
        if (finished) return S.summary();
        finished = true;
        if (!committed) { S._levelChanges = []; return S.summary(); }    // abierta y cerrada sin responder: no deja rastro
        var changes = [];
        Object.keys(modulesTouched).forEach(function (m) {
          var r = R.evaluate(st, store, m, sessionNo);
          if (r.change) changes.push({ module: m, change: r.change, from: r.from, to: r.to, acc: r.acc });
        });
        st.stats.sessions++;
        S._levelChanges = changes;
        save();
        return S.summary();
      };

      S.summary = function () {
        var n = log.length, ok = log.filter(function (l) { return l.correct; }).length, byTag = {};
        log.forEach(function (l) { if (!l.correct && l.errorTag) byTag[l.errorTag] = (byTag[l.errorTag] || 0) + 1; });
        var sm = {
          sessionNo: sessionNo, answered: n, correct: ok, accuracy: n ? ok / n : null,
          newUnits: Object.keys(newUnits).length,         // «hoy aprendiste X que ayer no sabías»
          rescued: rescued.slice(),                       // «rescataste una palabra que fallabas»
          failed: log.filter(function (l) { return !l.correct; }).map(function (l) { return l.id; }),
          errorsByTag: byTag, levelChanges: S._levelChanges || [], log: log.slice()
        };
        if (saveError) sm.saveError = saveError;
        return sm;
      };
      return S;
    }

    /* ---------- consultas ---------- */
    engine.errorQueue = function () {
      var st = state();
      return Object.keys(st.errors).filter(function (id) { var it = store.byId[id]; return it && R.allowed(st.settings, it.module, it.level); })
        .map(function (id) { return Object.assign({ id: id }, st.errors[id]); });
    };
    engine.errorMap = function () {
      var st = state();
      return Object.keys(st.tags).map(function (t) { return { tag: t, n: st.tags[t].n, f: st.tags[t].f, rate: st.tags[t].n ? st.tags[t].f / st.tags[t].n : 0 }; })
        .filter(function (x) { return x.f > 0; }).sort(function (a, b) { return b.f - a.f; });
    };
    engine.levelOf = function (module) { return R.currentLevel(state(), store, module); };
    engine.exportJSON = function () { return progress.exportJSON(); };
    engine.importJSON = function (t) { return progress.importJSON(t); };
    return engine;
  }

  DG.engine = { CFG: CFG, createEngine: createEngine };
  if (typeof module === 'object' && module.exports) module.exports = DG.engine;
})(typeof globalThis !== 'undefined' ? globalThis : this);
