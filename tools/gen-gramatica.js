// Genera data/gramatica.json (módulo «verben», habilidades nuevas) a partir de data/verben.json y reglas gramaticales. Ejercicios ORIGINALES:
// ninguna frase ni ejercicio se copia de las clases ni de un libro; las formas se derivan de los datos de verbos y de reglas.
// Lote 1: plusquamperfekt (B1), futur I (A2), imperativ (A2), konjunktiv II (B1). Determinista (semilla fija). Uso: node tools/gen-gramatica.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
require(path.join(root, 'src', 'dg-engine.js'));
const DG = globalThis.DG;

const nfc = s => String(s).normalize('NFC');
function rng(seed) { let h = 1779033703 ^ seed.length; for (let k = 0; k < seed.length; k++) { h = Math.imul(h ^ seed.charCodeAt(k), 3432918353); h = h << 13 | h >>> 19; } let t = h >>> 0; return () => { t += 0x6D2B79F5; let x = Math.imul(t ^ t >>> 15, 1 | t); x ^= x + Math.imul(x ^ x >>> 7, 61 | x); return ((x ^ x >>> 14) >>> 0) / 4294967296; }; }
const shuffle = (a, r) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const uniq = a => Array.from(new Set(a));

const PERSONS = ['ich', 'du', 'er / sie / es', 'wir', 'ihr', 'sie / Sie'], SLUG = { 'ich': 'ich', 'du': 'du', 'er / sie / es': 'er', 'wir': 'wir', 'ihr': 'ihr', 'sie / Sie': 'sie' };
const HABEN_PRET = ['hatte', 'hattest', 'hatte', 'hatten', 'hattet', 'hatten'], SEIN_PRET = ['war', 'warst', 'war', 'waren', 'wart', 'waren'];
const HABEN_PRES = ['habe', 'hast', 'hat', 'haben', 'habt', 'haben'], SEIN_PRES = ['bin', 'bist', 'ist', 'sind', 'seid', 'sind'];
const WERDEN = ['werde', 'wirst', 'wird', 'werden', 'werdet', 'werden'], WUERDE = ['würde', 'würdest', 'würde', 'würden', 'würdet', 'würden'];

// ---- datos de verbos ----
const verben = JSON.parse(fs.readFileSync(path.join(root, 'data', 'verben.json'), 'utf8'));
const L = {};
verben.forEach(i => {
  const o = (L[i.lemma] = L[i.lemma] || { lemma: i.lemma, level: i.level, pres: {} });
  const parts = i.prompt.split(' · ');
  if (i.skill === 'praesens') o.pres[parts[2]] = i.answer;
  else if (i.skill === 'partizip-ii') o.pii = i.answer;
  else if (i.skill === 'hilfsverb') { o.aux = i.answer; o.auxBoth = (i.accept || []).length > 1; }
});
const MODALS = ['können', 'müssen', 'dürfen', 'sollen', 'wollen', 'mögen'];
const usable = Object.values(L).filter(v => !/^sich /.test(v.lemma) && v.pii && v.aux && PERSONS.every(p => v.pres[p]) && !MODALS.includes(v.lemma) && !['sein', 'haben', 'werden', 'wissen'].includes(v.lemma));
// selección estable: primero A1 y luego A2 (los verbos más básicos), 60 por habilidad; los de aux ambiguo (haben/sein) se excluyen de plusquamperfekt
const ESTATIVOS = ['kosten', 'kennen', 'heißen', 'nennen', 'gefallen', 'bekommen', 'gehören', 'besitzen', 'enthalten', 'bedeuten'];   // verbos de estado: raros en imperativo/futuro/Konjunktiv
const activos = usable.filter(v => !ESTATIVOS.includes(v.lemma));
const pick = (arr, n) => arr.filter(v => v.level === 'A1').concat(arr.filter(v => v.level === 'A2')).slice(0, n);

const items = [];
function add(v, skill, level, person, answer, options, extra) {
  const id = 'gr-verb-' + v.lemma.replace(/\s+/g, '_') + '-' + skill + '-' + SLUG[person];
  items.push(Object.assign({ id, module: 'verben', level, type: 'cloze', lemma: v.lemma, skill, pool: skill, prompt: v.lemma + ' · ' + skill + ' · ' + person,
    answer: nfc(answer), accept: [nfc(answer)].concat((extra && extra.accept) || []).map(nfc), options: options.map(nfc), errorTag: 'verb:' + skill,
    conceptIds: ['md:verben-' + skill], source: 'gen-gramatica' }, extra && extra.more));
}
function opts(answer, accept, traps, r) {      // exactamente UNA opción válida; 4 opciones
  const bad = uniq(traps.map(nfc)).filter(t => t !== answer && !accept.includes(t));
  return shuffle([answer].concat(shuffle(bad, r).slice(0, 3)), r);
}

// ---- 1) Plusquamperfekt (B1): hatte/war + Partizip II ----
pick(usable.filter(v => !v.auxBoth), 60).forEach(v => {
  const sein = v.aux === 'sein', pret = sein ? SEIN_PRET : HABEN_PRET, wrongPret = sein ? HABEN_PRET : SEIN_PRET, pres = sein ? SEIN_PRES : HABEN_PRES;
  PERSONS.forEach((p, k) => {
    const ans = pret[k] + ' ' + v.pii, r = rng(v.lemma + 'pq' + k);
    add(v, 'plusquamperfekt', 'B1', p, ans, opts(ans, [ans], [wrongPret[k] + ' ' + v.pii, pres[k] + ' ' + v.pii, pret[k] + ' ' + v.lemma, pret[(k + 3) % 6] + ' ' + v.pii].filter(x => x), r));
  });
});

// ---- 2) Futur I (A2): werden + infinitivo ----
pick(activos, 60).forEach(v => {
  PERSONS.forEach((p, k) => {
    const ans = WERDEN[k] + ' ' + v.lemma, r = rng(v.lemma + 'fu' + k);
    add(v, 'futur', 'A2', p, ans, opts(ans, [ans], [WERDEN[k] + ' ' + v.pii, WUERDE[k] + ' ' + v.lemma, WERDEN[(k + 3) % 6] + ' ' + v.lemma, WERDEN[(k + 1) % 6] + ' ' + v.lemma], r));
  });
});

// ---- 3) Imperativ (A2): du / ihr / Sie ----
function imperativDu(v) {
  const full = v.pres['du'], sp = full.split(' '), form = sp[0], part = sp.slice(1).join(' ');
  const stem = v.lemma.replace(/(en|n)$/, ''), sib = /[sßxz]$/.test(stem);          // raíces en -s/-ß/-x/-z: du liest, isst, heißt (la terminación es sólo -t)
  let base = sib ? form.replace(/t$/, '') : form.replace(/st$/, '');
  if (/[äö]/.test(base) && !/[äö]/.test(stem)) base = base.replace('äu', 'au').replace('ä', 'a').replace('ö', 'o');   // fährst→fahr, läufst→lauf (el umlaut no pasa al imperativo)
  const vowelChange = base !== stem && base !== stem + 'e';
  const needsE = /[dt]$/.test(stem) || /(ch|[bdfgkpstvwz])[mn]$/.test(stem);        // arbeite, warte, öffne, atme, rechne: la -e es obligatoria
  return { base, part, vowelChange, needsE, stem };
}
pick(activos.filter(v => !/(eln|ern)$/.test(v.lemma)), 60).forEach(v => {
  const d = imperativDu(v), ihr = v.pres['ihr'], wirInf = v.pres['wir'].split(' '), siePart = wirInf.slice(1).join(' ');
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1), withPart = f => (d.part ? f + ' ' + d.part : f);
  // du: con cambio e→i(e): raíz cambiada (nimm, lies); regulares: sin -e (lern) y se acepta con -e (lerne); si la -e es obligatoria, sólo con -e
  let duAns, duAcc = [];
  if (d.vowelChange) duAns = withPart(d.base);
  else if (d.needsE) duAns = withPart(d.stem + 'e');
  else { duAns = withPart(d.stem); duAcc = [withPart(d.stem + 'e')]; }
  const ok = [duAns].concat(duAcc), sieAns = cap(wirInf[0]) + ' Sie' + (siePart ? ' ' + siePart : '');
  const sieTail = siePart ? ' ' + siePart : '';
  add(v, 'imperativ', 'A2', 'du', duAns, opts(duAns, ok, [withPart(v.pres['du']), withPart(v.pres['ich']), v.pres['wir'], withPart(d.stem + 'st'), ihr, withPart(d.stem + 't'), withPart(d.vowelChange ? v.lemma.replace(/(en|n)$/, '') : d.stem + 'en')], rng(v.lemma + 'im')), { accept: duAcc });
  add(v, 'imperativ', 'A2', 'ihr', ihr, opts(ihr, [ihr], [withPart(v.pres['du']), v.pres['wir'], withPart(v.pres['ich']), withPart(d.stem + 'en'), sieAns], rng(v.lemma + 'im2')));
  add(v, 'imperativ', 'A2', 'sie / Sie', sieAns, opts(sieAns, [sieAns], [cap(ihr.split(' ')[0]) + ' Sie' + sieTail, 'Sie ' + v.pres['sie / Sie'], cap(wirInf[0]) + ' wir' + sieTail, cap(withPart(d.base).split(' ')[0]) + ' Sie' + sieTail], rng(v.lemma + 'im3')));
});
// imperativo de sein / haben / werden (irregulares; hechos de gramática)
[['sein', 'sei', 'seid', 'Seien Sie'], ['haben', 'hab', 'habt', 'Haben Sie'], ['werden', 'werde', 'werdet', 'Werden Sie']].forEach(([l, du, ihr, sie]) => {
  const v = { lemma: l };
  add(v, 'imperativ', 'A2', 'du', du, opts(du, [du, l === 'haben' ? 'habe' : du], l === 'sein' ? ['bist', 'sein', 'sey', 'ist'] : l === 'haben' ? ['hast', 'haben', 'hat', 'habst'] : ['wirst', 'werden', 'wird', 'werdst'], rng(l + 'd')), { accept: l === 'haben' ? ['habe'] : [] });
  add(v, 'imperativ', 'A2', 'ihr', ihr, opts(ihr, [ihr], l === 'sein' ? ['seit', 'seid', 'sind', 'sein'].filter(x => x !== ihr) : l === 'haben' ? ['habet', 'hat', 'haben', 'hast'] : ['werdet'].filter(x => x !== ihr).concat(['wird', 'werden', 'werde']), rng(l + 'i')));
  add(v, 'imperativ', 'A2', 'sie / Sie', sie, opts(sie, [sie], l === 'sein' ? ['Sind Sie', 'Sei Sie', 'Seid Sie', 'Sein Sie'] : l === 'haben' ? ['Habt Sie', 'Hab Sie', 'Hat Sie', 'Habe Sie'] : ['Werdet Sie', 'Werde Sie', 'Wird Sie', 'Wirst Sie'], rng(l + 's')));
});

// ---- 4) Konjunktiv II (B1): würde + infinitivo, y formas propias de los verbos frecuentes ----
pick(activos, 60).forEach(v => {
  PERSONS.forEach((p, k) => {
    const ans = WUERDE[k] + ' ' + v.lemma;
    add(v, 'konjunktiv2', 'B1', p, ans, opts(ans, [ans], [WERDEN[k] + ' ' + v.lemma, WUERDE[k] + ' ' + v.pii, WUERDE[(k + 3) % 6] + ' ' + v.lemma, WUERDE[(k + 1) % 6] + ' ' + v.lemma, WUERDE[(k + 4) % 6] + ' ' + v.lemma], rng(v.lemma + 'k2' + k)));
  });
});
const KII = {
  sein: { f: ['wäre', 'wärst', 'wäre', 'wären', 'wärt', 'wären'], pret: SEIN_PRET }, haben: { f: ['hätte', 'hättest', 'hätte', 'hätten', 'hättet', 'hätten'], pret: HABEN_PRET },
  werden: { f: WUERDE, pret: ['wurde', 'wurdest', 'wurde', 'wurden', 'wurdet', 'wurden'] }, können: { f: ['könnte', 'könntest', 'könnte', 'könnten', 'könntet', 'könnten'], pret: ['konnte', 'konntest', 'konnte', 'konnten', 'konntet', 'konnten'] },
  müssen: { f: ['müsste', 'müsstest', 'müsste', 'müssten', 'müsstet', 'müssten'], pret: ['musste', 'musstest', 'musste', 'mussten', 'musstet', 'mussten'] },
  dürfen: { f: ['dürfte', 'dürftest', 'dürfte', 'dürften', 'dürftet', 'dürften'], pret: ['durfte', 'durftest', 'durfte', 'durften', 'durftet', 'durften'] },
  sollen: { f: ['sollte', 'solltest', 'sollte', 'sollten', 'solltet', 'sollten'], pret: ['sollte', 'solltest', 'sollte', 'sollten', 'solltet', 'sollten'], same: true },
  wollen: { f: ['wollte', 'wolltest', 'wollte', 'wollten', 'wolltet', 'wollten'], pret: ['wollte', 'wolltest', 'wollte', 'wollten', 'wolltet', 'wollten'], same: true },
  wissen: { f: ['wüsste', 'wüsstest', 'wüsste', 'wüssten', 'wüsstet', 'wüssten'], pret: ['wusste', 'wusstest', 'wusste', 'wussten', 'wusstet', 'wussten'] }
};
Object.keys(KII).forEach(l => {
  const k2 = KII[l], v = { lemma: l };
  PERSONS.forEach((p, k) => {
    const ans = k2.f[k];
    // sollen/wollen: Konjunktiv II = Präteritum (misma forma): el distractor «Präteritum» no se usa porque sería también correcto
    const traps = [k2.same ? null : k2.pret[k], k2.f[(k + 3) % 6], k2.f[(k + 1) % 6], l === 'sein' ? SEIN_PRES[k] : l === 'haben' ? HABEN_PRES[k] : l === 'werden' ? WERDEN[k] : l.replace(/en$/, 'en')].filter(Boolean);
    const extraTraps = ['würde ' + l, ans.replace(/ä/g, 'e').replace(/ü/g, 'u'), ans.replace(/e$/, '')];
    add(v, 'konjunktiv2', 'B1', p, ans, opts(ans, [ans], traps.concat(extraTraps), rng(l + 'kk' + k)));
  });
});

fs.writeFileSync(path.join(root, 'data', 'gramatica.json'), JSON.stringify(items, null, 1) + '\n');
const concepts = JSON.parse(fs.readFileSync(path.join(root, 'data', 'concepts.json'), 'utf8'));
const store = DG.items.createStore(verben.concat(items)), rep = DG.items.validate(store, { concepts });
const c = {}; items.forEach(i => { c[i.skill] = (c[i.skill] || 0) + 1; });
console.log('gramatica.json:', items.length, JSON.stringify(c));
console.log('validación (con verben): errores', rep.errors.length, 'avisos', rep.warnings.length, '(conceptos sin resolver esperados: md:verben-<skill> hasta añadir cápsula)');
rep.errors.slice(0, 8).forEach(e => console.log('  ERROR', e.code, e.id, e.msg));
if (process.argv.includes('--muestra')) ['plusquamperfekt', 'futur', 'imperativ', 'konjunktiv2'].forEach(s => { items.filter(i => i.skill === s).filter((_, n) => n % 53 === 0).slice(0, 6).forEach(i => console.log(s.padEnd(16), i.prompt.padEnd(44), '→', i.answer.padEnd(18), '|', i.options.join(' / '))); });
if (rep.errors.length) process.exit(1);
