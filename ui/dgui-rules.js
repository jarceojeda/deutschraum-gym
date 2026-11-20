/* dgui-rules.js — explicación de una línea y contenido del panel «ver regla».
 * IMPORTANTE: data/concepts.json sólo trae TÍTULOS de concepto (sin texto de regla). El panel se arma con lo que hay:
 * títulos, `explanation` del ítem (sólo Deklination la trae), tabla de la unidad (verbos) y ejemplos del mismo concepto. */
(function (g) {
  'use strict';
  var R = {};
  var PERSON = { ich: 'ich', du: 'du', er_sie_es: 'er/sie/es', wir: 'wir', ihr: 'ihr', sie_Sie: 'sie/Sie' };
  var PERSON_ORDER = ['ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'];
  var SKILL = { praesens: 'Präsens', praeteritum: 'Präteritum', 'partizip-ii': 'Partizip II', hilfsverb: 'haben / sein', plusquamperfekt: 'Plusquamperfekt', futur: 'Futur I', imperativ: 'Imperativ', konjunktiv2: 'Konjunktiv II', passiv: 'Passiv (Präsens)', 'passiv-praeteritum': 'Passiv (Präteritum)', genero: 'Género', plural: 'Plural', indefinido: 'Artículo indefinido' };
  var TAG = { 'verb:praesens': 'Präsens', 'verb:praeteritum': 'Präteritum', 'verb:partizip': 'Partizip II', 'verb:aux': 'haben / sein', 'artikel:genero': 'Género (der/die/das)', 'artikel:plural': 'Plural', 'artikel:indefinido': 'Artículo indefinido' };
  var CASE = { nominative: 'Nominativ', accusative: 'Akkusativ', dative: 'Dativ', genitive: 'Genitiv' };
  var SUB = { possessive_article: 'posesivo', possessive_pronoun: 'posesivo', predicate_noun: 'predicado', two_way_preposition: 'Wechselpräposition', article: 'artículo', adjective: 'adjetivo',
    personal_pronoun: 'pronombre', dative_plural: 'plural', preposition: 'preposición', noun: 'sustantivo', mixed: 'mixto' };
  R.tagLabel = function (tag) {
    if (TAG[tag]) return TAG[tag];
    var p = String(tag || '').split(':');
    if (p[0] === 'case') return (CASE[p[1]] || p[1]) + (p[2] ? ' · ' + (SUB[p[2]] || p[2].replace(/_/g, ' ')) : '');
    if (p[0] === 'transform') return 'Transformación de caso';
    if (p[0] === 'vocab') return 'Vocabulario · ' + (SKILL_WS[p[1]] || p[1]);
    if (p[0] === 'satzbau') return 'Orden de frase · ' + (SKILL_WS[p[1]] || p[1]);
    if (p[0] === 'preposition') return 'Preposición · ' + p[1];
    if (p[0] === 'wechsel') return 'Wechselpräposition · ' + p[1];
    if (p[0] === 'contraction') return 'Contracción · ' + p[1];
    if (p[0] === 'verb-prep') return 'Verbo + preposición · ' + p[1];
    if (p[0] === 'konnektor') return 'Conector · ' + String(p[1]).replace(/-/g, ' ');
    if (p[0] === 'particle') return 'Partícula · ' + p[1];
    if (p[0] === 'adverb') return 'Adverbio · ' + p[1];
    return String(tag || '').replace(/[:_-]/g, ' ');
  };
  var SKILL_PK = { 'praep-wahl': 'Preposición correcta', 'wechsel-wo': 'Wo? · Dativ', 'wechsel-wohin': 'Wohin? · Akkusativ', kontraktion: 'Contracción', 'wechsel-pair': 'Wo? ↔ Wohin?',
    'praep-artikel': 'Preposición + artículo', 'praep-zeit': 'Preposición de tiempo', 'verb-praeposition': 'Verbo + preposición', 'verb-praeposition-artikel': 'Verbo + prep. + artículo',
    'konnektor-wahl': 'Elige el conector', 'weil-vorn': 'weil al inicio', 'wenn-vorn': 'wenn al inicio', 'obwohl-vorn': 'obwohl al inicio', 'transform-weil': 'Une con weil', 'transform-deshalb': 'Une con deshalb',
    'als-wenn-ob': 'als / wenn / ob', 'aber-sondern': 'aber / sondern', 'adverb-konnektor': 'Adverbio conector', doppelkonnektor: 'Conector doble', 'nebensatz-b1': 'Nebensatz', partikel: 'Partícula modal', 'adverb-gradpartikel': 'Partícula de grado' };
  var SKILL_WS = { 'nebensatz-weil': 'Nebensatz · weil', 'nebensatz-wenn': 'Nebensatz · wenn', 'nebensatz-obwohl': 'Nebensatz · obwohl', 'nebensatz-damit': 'Nebensatz · damit', 'nebensatz-nachdem': 'Nebensatz · nachdem', perfekt: 'Perfekt', modal: 'Modalverb', trennbar: 'Verbo separable', objekte: 'Dativ y Akkusativ', zuinf: 'Infinitiv con zu', indfrage: 'Pregunta indirecta', relativ: 'Relativsatz', passiv: 'Passiv', konj2: 'Konjunktiv II', vergleich: 'Comparación', 'mis-frases': 'Mi frase', pronunciacion: 'Pronunciación', 'es-de': 'ES → DE', 'de-es': 'DE → ES', contexto: 'En contexto', produccion: 'Escribir la palabra',
    aussagesatz: 'Frase afirmativa', 'w-frage': 'W-Frage', 'ja-nein-frage': 'Pregunta sí / no', umformen: 'Transformar la frase', tekamolo: 'TeKaMoLo', trampa: '¿Cuál es correcta?' };
  var SKILL_DEK = { relativpronomen: 'Pronombre relativo', komparativ: 'Komparativ', superlativ: 'Superlativ', 'kasus-article': 'Artículo y caso', 'kasus-possessive_article': 'Posesivo', 'kasus-possessive_pronoun': 'Posesivo', 'kasus-adjective': 'Adjetivo', 'kasus-personal_pronoun': 'Pronombre personal',
    'kasus-predicate_noun': 'Nominativ', 'kasus-dative_plural': 'Dativ plural', 'kasus-two_way_preposition': 'Wechselpräposition', 'dativ-plural': 'Dativ plural', 'genitiv-noun': 'Genitiv',
    'genitiv-article': 'Genitiv', 'genitiv-prep': 'Genitiv + Präp.', 'adjektivendung-weak': 'Adjektivendung', 'adjektivendung-mixed': 'Adjektivendung', 'adjektivendung-strong': 'Adjektivendung',
    'n-deklination': 'N-Deklination', transform: 'Transformación', indefinitpronomen: 'Pronombre indefinido', personalpronomen: 'Pronombre personal' };
  R.skillLabel = function (s) { return SKILL[s] || SKILL_DEK[s] || SKILL_PK[s] || SKILL_WS[s] || String(s || '').replace(/[-_]+/g, ' ').replace(/^./, function (c) { return c.toUpperCase(); }); };

  // Cápsula que corresponde a un ítem. En VERBOS sólo vale la regla de SU tiempo (nunca la del Präsens en un Präteritum): sin ella, hueco.
  var VERB_PREF = { praesens: ['cs:t3', 'md:verben-praesens'], praeteritum: ['md:verben-praeteritum'], 'partizip-ii': ['md:verben-partizip'], hilfsverb: ['cs:t5', 'md:verben-partizip'], plusquamperfekt: ['md:verben-plusquamperfekt'], futur: ['md:verben-futur'], imperativ: ['md:verben-imperativ'], konjunktiv2: ['md:verben-konjunktiv2'], passiv: ['md:verben-passiv'], 'passiv-praeteritum': ['md:verben-passiv-praeteritum'] };
  R.pickCapsule = function (item, reglas) {
    var ids = item.conceptIds || [], i;
    if (item.module === 'verben') {
      var pref = VERB_PREF[item.skill] || [];
      for (i = 0; i < pref.length; i++) if (ids.indexOf(pref[i]) >= 0 && reglas[pref[i]]) return Object.assign({ id: pref[i] }, reglas[pref[i]]);
      return null;
    }
    for (i = 0; i < ids.length; i++) {
      var e = reglas[ids[i]], id = ids[i];
      if (e && e.alias) { id = e.alias; e = reglas[id]; }          // concepto de un solo ítem → cápsula de su tipo
      if (e) return Object.assign({ id: id }, e);
    }
    return null;
  };

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
      if (item.type === 'minimal-pair') return 'Wo? → ' + item.wo.case + ': ' + item.wo.answer + ' · Wohin? → ' + item.wohin.case + ': ' + item.wohin.answer;
      if ((item.module === 'praepositionen' || item.module === 'konnektoren') && item.translation) return '«' + item.translation + '»';
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
    function capsule(item) { return R.pickCapsule(item, reglas); }
    return { oneLine: oneLine, panel: panel, titles: titles, capsule: capsule };
  };
  g.DGUI = g.DGUI || {}; g.DGUI.rules = R;
})(typeof globalThis !== 'undefined' ? globalThis : this);
