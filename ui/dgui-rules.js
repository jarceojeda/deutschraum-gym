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
  R.skillLabel = function (s) { return SKILL[s] || s; };

  R.create = function (store, concepts) {
    var cmap = Object.create(null); (concepts || []).forEach(function (c) { cmap[c.id] = c; });
    var byConcept = null;
    function conceptIndex() {            // concepto → ítems del mismo módulo (perezoso: sólo si se abre un panel)
      if (byConcept) return byConcept; byConcept = Object.create(null);
      store.all.forEach(function (it) { (it.conceptIds || []).forEach(function (c) { var k = it.module + '|' + c; (byConcept[k] = byConcept[k] || []).push(it); }); });
      return byConcept;
    }
    function titles(item) { return (item.conceptIds || []).map(function (id) { return cmap[id] && cmap[id].title; }).filter(Boolean); }

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
    return { oneLine: oneLine, panel: panel, titles: titles };
  };
  g.DGUI = g.DGUI || {}; g.DGUI.rules = R;
})(typeof globalThis !== 'undefined' ? globalThis : this);
