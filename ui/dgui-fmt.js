/* dgui-fmt.js — color + forma para género (der ● die ◆ das ⬢, plural ▲) y caso (N/A/D/G con letra).
 * Nunca solo color: cada insignia lleva forma o letra y la palabra escrita. El caso sólo se pinta cuando ya se conoce
 * (tras responder) para no filtrar la respuesta. Nota: der/die/das se pintan por su género nominativo; en otros casos
 * (p. ej. «der» dativo femenino) el color sigue siendo el de la palabra, no el del caso. */
(function (g) {
  'use strict';
  var U = g.DGUI.util, h = U.h, F = {};
  F.GENDER = { der: { cls: 'g-der', shape: '●', label: 'masculino' }, die: { cls: 'g-die', shape: '◆', label: 'femenino' }, das: { cls: 'g-das', shape: '⬢', label: 'neutro' } };
  F.PLURAL = { cls: 'g-pl', shape: '▲', label: 'plural' };
  F.CASE = {
    nominative: { cls: 'c-nom', letter: 'N', label: 'nominativo' }, accusative: { cls: 'c-acc', letter: 'A', label: 'acusativo' },
    dative: { cls: 'c-dat', letter: 'D', label: 'dativo' }, genitive: { cls: 'c-gen', letter: 'G', label: 'genitivo' }
  };
  var CASE_FORMS = /^(den|dem|des|einen|einem|einer|eines|keinen|keinem|keiner|keines|meinen|meinem|meiner|meines|deinen|deinem|seinen|seinem|ihren|ihrem|unseren|unserem|euren|eurem|ihn|ihm|ihnen|mich|mir|dich|dir|uns|euch)$/i;
  F.caseOf = function (item) { var m = /^case:(nominative|accusative|dative|genitive)/.exec(item && item.errorTag || ''); return m ? m[1] : null; };
  F.genderBadge = function (word, showText) {
    var gdr = F.GENDER[String(word).toLowerCase()]; if (!gdr) return null;
    return h('span.art.' + gdr.cls, { title: gdr.label }, h('span.shape', { 'aria-hidden': 'true' }, gdr.shape), showText === false ? null : h('span.word', word));
  };
  F.genderClass = function (word) { var x = F.GENDER[String(word).toLowerCase()]; return x ? x.cls : ''; };
  F.pluralBadge = function (text) { return h('span.art.' + F.PLURAL.cls, h('span.shape', { 'aria-hidden': 'true' }, F.PLURAL.shape), h('span.word', text || 'Plural')); };
  F.caseBadge = function (caseKey, withLabel) {
    var c = F.CASE[caseKey]; if (!c) return null;
    return h('span.cbadge.' + c.cls, h('span.cl', { 'aria-hidden': 'true' }, c.letter), withLabel === false ? null : h('span.ct', c.label));
  };
  // Texto → nodos: der/die/das con insignia de género; con {case}, formas marcadas (den, dem, einen…) con color de caso.
  F.rich = function (text, o) {
    o = o || {}; var out = [], toks = String(text == null ? '' : text).split(/(\s+)/), marked = false;
    toks.forEach(function (t) {
      var m = /^([^\wäöüÄÖÜß]*)([\wäöüÄÖÜß]+)([^\wäöüÄÖÜß]*)$/.exec(t);
      if (!m) { out.push(t); return; }
      var core = m[2], b = F.GENDER[core.toLowerCase()] ? F.genderBadge(core) : null;
      if (o.case && CASE_FORMS.test(core)) { b = h('span.ctok.' + F.CASE[o.case].cls, core, h('sup', { 'aria-hidden': 'true' }, F.CASE[o.case].letter)); marked = true; }
      if (b) out.push(m[1], b, m[3]); else out.push(t);
    });
    var words = toks.filter(function (t) { return t.trim(); });
    if (o.case && !marked && words.length === 1 && F.CASE[o.case] && !F.GENDER[words[0].toLowerCase()]) {
      return [h('span.ctok.' + F.CASE[o.case].cls, words[0], h('sup', { 'aria-hidden': 'true' }, F.CASE[o.case].letter))];
    }
    return out;
  };
  // **negrita** → <strong>; nada más (el texto viene de ui/reglas.json, nunca se inserta como HTML).
  F.md = function (text) {
    return String(text == null ? '' : text).split('**').map(function (seg, i) { return i % 2 ? h('strong', seg) : seg; });
  };
  g.DGUI.fmt = F;
})(typeof globalThis !== 'undefined' ? globalThis : this);
