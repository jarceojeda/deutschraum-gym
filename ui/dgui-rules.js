/* dgui-rules.js — explicación de una línea y contenido del panel «ver regla».
 * IMPORTANTE: data/concepts.json sólo trae TÍTULOS de concepto (sin texto de regla). El panel se arma con lo que hay:
 * títulos, `explanation` del ítem (sólo Deklination la trae), tabla de la unidad (verbos) y ejemplos del mismo concepto. */
(function (g) {
  'use strict';
  var R = {};
  var PERSON = { ich: 'ich', du: 'du', er_sie_es: 'er/sie/es', wir: 'wir', ihr: 'ihr', sie_Sie: 'sie/Sie' };
  var PERSON_ORDER = ['ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'];
  var SKILL = { praesens: 'Präsens', praeteritum: 'Präteritum', 'partizip-ii': 'Partizip II', hilfsverb: 'haben / sein', genero: 'Género', plural: 'Plural', indefinido: 'Artículo indefinido' };
  var TAG = { 'verb:praesens': 'Präsens', 'verb:praeteritum': 'Präteritum', 'verb:partizip': 'Partizip II', 'verb:aux': 'haben / sein', 'artikel:genero': 'Género (der/die/das)', 'artikel:plural': 'Plural', 'artikel:indefinido': 'Artículo indefinido' };
  var CASE = { nominative: 'Nominativ', accusative: 'Akkusativ', dative: 'Dativ', genitive: 'Genitiv' };
  R.tagLabel = function (tag) {
    if (TAG[tag]) return TAG[tag];
    var p = String(tag || '').split(':');
    if (p[0] === 'case') return (CASE[p[1]] || p[1]) + (p[2] ? ' · ' + p[2].replace(/_/g, ' ') : '');
    if (p[0] === 'transform') return 'Transformación de caso';
    return String(tag || '').replace(/[:_-]/g, ' ');
  };
  var SKILL_DEK = { 'kasus-article': 'Artículo y caso', 'kasus-possessive_article': 'Posesivo', 'kasus-possessive_pronoun': 'Posesivo', 'kasus-adjective': 'Adjetivo', 'kasus-personal_pronoun': 'Pronombre personal',
    'kasus-predicate_noun': 'Nominativ', 'kasus-dative_plural': 'Dativ plural', 'kasus-two_way_preposition': 'Wechselpräposition', 'dativ-plural': 'Dativ plural', 'genitiv-noun': 'Genitiv',
    'genitiv-article': 'Genitiv', 'genitiv-prep': 'Genitiv + Präp.', 'adjektivendung-weak': 'Adjektivendung', 'adjektivendung-mixed': 'Adjektivendung', 'adjektivendung-strong': 'Adjektivendung',
    'n-deklination': 'N-Deklination', transform: 'Transformación', indefinitpronomen: 'Pronombre indefinido', personalpronomen: 'Pronombre personal' };
  R.skillLabel = function (s) { return SKILL[s] || SKILL_DEK[s] || String(s || '').replace(/[-_]+/g, ' ').replace(/^./, function (c) { return c.toUpperCase(); }); };

  R.create = function (store, concepts, reglas) {
    reglas = reglas || {};
    var cmap = Object.create(null); (concepts || []).forEach(function (c) { cmap[c.id] = c; });
    var byConcept = null;
    function conceptIndex() {            // concepto → ítems del mismo módulo (perezoso: sólo si se abre un panel)
      if (byConcept) return byConcept; byConcept = Object.create(null);
      store.all.forEach(function (it) { (it.conceptIds || []).forEach(function (c) { var k = it.module + '|' + c; (byConcept[k] = byConcept[k] || []).push(it); }); });
      return byConcept;
    }
    // Algunos títulos de concepts.json son códigos internos («a1 v5»): no se muestran.
    function goodTitle(t) { return !!t && t.length >= 8 && /[a-zäöüß]{4,}/i.test(t) && !/^[a-z]\d+(\s+[a-z]?\d+)*$/i.test(t.trim()); }
    function titles(item) { return (item.conceptIds || []).map(function (id) { return cmap[id] && cmap[id].title; }).filter(goodTitle); }

    // Una línea: `explanation` del dato; si no hay (Verben/Artikel), una línea derivada de lo que sí tiene el ítem.
    function oneLine(item) {
      if (item.explanation) return item.explanation;
      var t = titles(item)[0];
      if (item.module === 'verben') {
        var who = item.person ? PERSON[item.person] + ' · ' : '';
        return (t ? t + '. ' : '') + who + item.lemma + ' → ' + item.answer;
      }
      if (item.module === 'artikel') return (item.hint ? item.hint + ': ' : '') + (item.skill === 'plural' ? 'Plural: die ' : '') + item.answer + (t ? '. ' + t : '');
      return t || '';
    }

    function panel(item) {
      var out = { title: R.skillLabel(item.skill) || 'Regla', concepts: titles(item), explanation: item.explanation || '', table: null, examples: [], derived: !item.explanation };
      if (item.module === 'verben' && item.person) {
        var sib = (store.units[item.unit] || []).filter(function (x) { return x.person; });
        out.table = { caption: item.lemma + ' · ' + R.skillLabel(item.skill), rows: PERSON_ORDER.map(function (p) { var m = sib.filter(function (x) { return x.person === p; })[0]; return m ? { k: PERSON[p], v: m.answer, hit: m.id === item.id } : null; }).filter(Boolean) };
      }
      var first = (item.conceptIds || [])[0];
      if (first) {
        var same = function (x) { return x.id !== item.id && x.skill === item.skill; };
        var pool = (conceptIndex()[item.module + '|' + first] || []).filter(same);
        if (!pool.length) pool = (store.bySkillId[item.skillId] || []).filter(same);   // concepto sin otros ítems: misma habilidad
        var step = Math.max(1, Math.floor(pool.length / 4)), ex = [];
        for (var i = 0; i < pool.length && ex.length < 4; i += step) ex.push({ prompt: pool[i].prompt, answer: pool[i].answer });
        out.examples = ex;
      }
      return out;
    }
    // Cápsula de regla (ui/reglas.json, por concept id). Sin entrada → null: el hueco queda vacío, no se inventa.
    function capsule(item) {
      var ids = item.conceptIds || [];
      for (var i = 0; i < ids.length; i++) if (reglas[ids[i]]) return Object.assign({ id: ids[i] }, reglas[ids[i]]);
      return null;
    }
    return { oneLine: oneLine, panel: panel, titles: titles, capsule: capsule };
  };
  g.DGUI = g.DGUI || {}; g.DGUI.rules = R;
})(typeof globalThis !== 'undefined' ? globalThis : this);
