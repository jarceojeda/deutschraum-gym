// Genera data/wortschatz.json y data/satzbau.json (PRIMERA VERSIÓN, solo A1) a partir de docs/referencia/Deutschraum-A1-2.4.4.html.
// Los datos definitivos de la etapa 1 (wortschatz 1.139 y satzbau 216 ítems) NO están en el repo; cuando lleguen sustituyen estos archivos
// (mismo esquema). Esta versión solo reutiliza contenido de la referencia: vocabulario (de/es/categoría/ejemplo), frases de ejemplo y las
// transformaciones de frase. NO inventa vocabulario ni traducciones. Determinista (semilla fija). Uso: node tools/gen-wortschatz-satzbau.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
require(path.join(root, 'src', 'dg-engine.js'));
const DG = globalThis.DG;

function loadContent() {
  const h = fs.readFileSync(path.join(root, 'docs', 'referencia', 'Deutschraum-A1-2.4.4.html'), 'utf8');
  const i = h.indexOf('id="content-data"'), a = h.indexOf('>', i) + 1, b = h.indexOf('</script>', a);
  return JSON.parse(h.slice(a, b));
}
const nfc = s => String(s == null ? '' : s).normalize('NFC').replace(/\s+/g, ' ').trim();
function rng(seedStr) { let h = 1779033703 ^ seedStr.length; for (let k = 0; k < seedStr.length; k++) { h = Math.imul(h ^ seedStr.charCodeAt(k), 3432918353); h = h << 13 | h >>> 19; } let t = h >>> 0; return () => { t += 0x6D2B79F5; let x = Math.imul(t ^ t >>> 15, 1 | t); x ^= x + Math.imul(x ^ x >>> 7, 61 | x); return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
const shuffle = (arr, r) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const uniq = a => Array.from(new Set(a));
const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// «ser / estar / ser, estar» → «ser / estar»
function cleanEs(es) {
  const parts = nfc(es).split(' / ').filter(Boolean);
  return parts.filter(p => !(p.includes(', ') && p.split(', ').every(x => parts.includes(x)))).filter((p, i, a) => a.indexOf(p) === i).join(' / ');
}
const catLabel = c => /^\d+-/.test(nfc(c)) ? nfc(c).replace(/^\d+-/, '').replace(/-/g, ' ') : '';   // sólo categorías numeradas (en español); las demás vienen en inglés

const content = loadContent();
// (se descartan las frases con marcadores de plantilla {{profile.*}})
const vocab = content.vocab.filter(v => v.es && nfc(v.es) && !['letter', 'number'].includes(v.kind) && v.de && !/\{\{/.test(v.de + v.es)).map(v => ({ id: v.id, de: nfc(v.de), word: nfc(v.word), es: cleanEs(v.es), kind: v.kind, cat: v.category, example: v.example && !/{{/.test(v.example) ? nfc(v.example) : null, article: v.article }));

// ---------------- Wortschatz ----------------
const items = [];
const byKind = {}; vocab.forEach(v => { (byKind[v.kind] = byKind[v.kind] || []).push(v); });
const esGroups = {}; vocab.forEach(v => { (esGroups[v.kind + '|' + v.es] = esGroups[v.kind + '|' + v.es] || []).push(v); });
const deGroups = {}; vocab.forEach(v => { (deGroups[v.kind + '|' + v.de] = deGroups[v.kind + '|' + v.de] || []).push(v); });

function pickDistractors(v, field, n, r, sameCat, exclude) {
  const pool = (byKind[v.kind] || []).filter(x => x.id !== v.id && !exclude.has(x[field]) && (sameCat ? x.cat === v.cat : x.cat !== v.cat));
  const out = []; for (const x of shuffle(pool, r)) { if (!out.includes(x[field]) && !exclude.has(x[field])) out.push(x[field]); if (out.length === n) break; }
  return out;
}
function mk(v, skill, extra) {
  return Object.assign({ id: 'wz-' + v.id + '-' + skill, module: 'wortschatz', level: 'A1', type: 'cloze', skill, pool: skill, errorTag: 'vocab:' + skill, conceptIds: [], source: 'a1-2.4.4', lemma: v.word }, extra);
}
vocab.forEach(v => {
  const r = rng(v.id);
  // ES → DE (reconocer la palabra alemana; los sustantivos siempre con artículo)
  const syn = (esGroups[v.kind + '|' + v.es] || []).map(x => x.de), exclude = new Set(syn);
  let d = pickDistractors(v, 'de', 3, r, true, exclude); if (d.length < 3) d = d.concat(pickDistractors(v, 'de', 3 - d.length, r, false, new Set(syn.concat(d))));
  if (d.length === 3) items.push(mk(v, 'es-de', { prompt: v.es, hint: '', answer: v.de, accept: uniq([v.de].concat(syn)), options: shuffle([v.de].concat(d), r) }));
  // DE → ES (reconocer el significado)
  const homs = (deGroups[v.kind + '|' + v.de] || []).map(x => x.es), exEs = new Set(homs);
  let e = pickDistractors(v, 'es', 3, r, true, exEs); if (e.length < 3) e = e.concat(pickDistractors(v, 'es', 3 - e.length, r, false, new Set(homs.concat(e))));
  if (e.length === 3) items.push(mk(v, 'de-es', { prompt: v.de, hint: catLabel(v.cat), answer: v.es, accept: uniq([v.es].concat(homs)), options: shuffle([v.es].concat(e), r) }));
  // Producción: ES → DE sin opciones (letras en Modo Tren, teclado en «Escribir»)
  if (v.kind !== 'phrase' && v.de.length <= 18) items.push(mk(v, 'produccion', { prompt: v.es, hint: '', answer: v.de, accept: uniq([v.de].concat(syn)), options: [] }));
  // En contexto: la frase de ejemplo con la palabra en blanco (sólo palabras que aparecen tal cual; distractores de OTRAS categorías)
  if (v.example && ['noun', 'adjective', 'adverb', 'preposition', 'connector', 'pronoun'].includes(v.kind)) {
    const m = new RegExp('(^|[^\\p{L}])(' + escRe(v.word) + ')(?![\\p{L}])', 'iu').exec(v.example);
    if (m) {
      const surf = m[2], prompt = v.example.slice(0, m.index + m[1].length) + '___' + v.example.slice(m.index + m[1].length + surf.length);
      const cap = /^\p{Lu}/u.test(surf) && v.kind !== 'noun';
      const fit = w => (v.kind === 'noun' ? w : cap ? w.charAt(0).toUpperCase() + w.slice(1) : w.charAt(0).toLowerCase() + w.slice(1));
      const ex = new Set([surf.toLowerCase(), v.word.toLowerCase()]);
      const pool = (byKind[v.kind] || []).filter(x => x.id !== v.id && x.cat !== v.cat && !ex.has(x.word.toLowerCase()) && x.word.length > 1);
      const ds = []; for (const x of shuffle(pool, r)) { const w = fit(x.word); if (!ds.includes(w)) ds.push(w); if (ds.length === 3) break; }
      if (ds.length === 3) items.push(mk(v, 'contexto', { prompt, hint: v.es, answer: surf, accept: [surf], options: shuffle([surf].concat(ds), r) }));
    }
  }
});

// ---------------- Satzbau ----------------
const tok = s => nfc(s).replace(/([.,?!;:])/g, ' $1 ').split(/\s+/).filter(Boolean);
const W = /^(wie|was|wo|woher|wohin|wer|wen|wem|wann|warum|welche[rsmn]?|wieviel|wessen|womit|wof[üu]r)$/i;
const sentences = uniq(content.vocab.map(v => v.example).filter(e => e && !/{{/.test(e)).map(nfc)).filter(e => { const n = tok(e).filter(t => !/^[.,?!;:]$/.test(t)).length; return n >= 3 && n <= 10; });
const sat = [];
const SK = { 'w-frage': { pool: 'frage', hint: 'Pregunta con palabra interrogativa (W-Frage)' }, 'ja-nein-frage': { pool: 'frage', hint: 'Pregunta de sí / no' }, aussagesatz: { pool: 'satz', hint: '' } };
sentences.forEach((e, i) => {
  const t = tok(e), first = t[0], skill = /\?$/.test(e) ? (W.test(first) ? 'w-frage' : 'ja-nein-frage') : 'aussagesatz';
  sat.push({ id: 'sb-' + String(i + 1).padStart(3, '0'), module: 'satzbau', level: 'A1', type: 'order', skill, pool: SK[skill].pool, prompt: 'Ordena la frase', hint: SK[skill].hint, translation: '', answer: e, accept: [e], tiles: t,
    errorTag: 'satzbau:' + skill, conceptIds: [skill === 'aussagesatz' ? 'cs:t1' : 'cs:t2'], source: 'a1-2.4.4' });
});
// transformaciones de frase completa (antes → después)
let ti = 0;
(content.transforms || []).forEach(t => {
  const b = nfc(t.before), a = nfc(t.after);
  if (!/[.?!]$/.test(b) || !/[.?!]$/.test(a) || b.split(' ').length < 3) return;
  ti++; sat.push({ id: 'sb-t' + String(ti).padStart(2, '0'), module: 'satzbau', level: 'A1', type: 'order', skill: 'umformen', pool: 'satz', prompt: nfc(t.instruction) + ' · ' + b, hint: '', translation: '', answer: a, accept: [a], tiles: tok(a),
    errorTag: 'satzbau:umformen', conceptIds: (t.conceptIds || []).slice(0, 2), source: 'a1-2.4.4' });
});

fs.writeFileSync(path.join(root, 'data', 'wortschatz.json'), JSON.stringify(items, null, 1) + '\n');
fs.writeFileSync(path.join(root, 'data', 'satzbau.json'), JSON.stringify(sat, null, 1) + '\n');

// Validación con el motor (0 errores obligatorio)
const concepts = JSON.parse(fs.readFileSync(path.join(root, 'data', 'concepts.json'), 'utf8'));
const store = DG.items.createStore(items.concat(sat)), rep = DG.items.validate(store, { concepts });
const cnt = {}; items.forEach(i => { cnt[i.skill] = (cnt[i.skill] || 0) + 1; }); const cs = {}; sat.forEach(i => { cs[i.skill] = (cs[i.skill] || 0) + 1; });
console.log('wortschatz', items.length, JSON.stringify(cnt)); console.log('satzbau', sat.length, JSON.stringify(cs));
console.log('validación: errores', rep.errors.length, 'avisos', rep.warnings.length);
rep.errors.slice(0, 8).forEach(e => console.log('  ERROR', e.code, e.id, e.msg));
if (rep.errors.length) process.exit(1);
