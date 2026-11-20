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
