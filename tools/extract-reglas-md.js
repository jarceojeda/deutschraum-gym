// Añade «errores típicos» (viñetas «⚠️ Atención» de la sección 5 de cada clase) a las cápsulas de ui/reglas.json.
// Fuente: docs/fuentes/aleman-markups/NNN-*.md. Sólo copia esas viñetas cortas (explicaciones de error); NO copia ejemplos de las clases ni las tarjetas Q&A.
// Para conceptos que ya tienen cápsula (de las hojas de referencia) añade `errores`; para los que no, crea una entrada con título y errores.
// Uso: node tools/extract-reglas-md.js   (idempotente; ejecutar después de tools/extract-reglas.js)
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const dir = path.join(root, 'docs', 'fuentes', 'aleman-markups');
const nfc = s => String(s || '').normalize('NFC');

// concepto → clases (números). Mapeo por tema; sólo asociaciones claras.
const MAP = {
  // conceptos sin cápsula hasta ahora
  'md:verben-praesens': [7], 'md:verben-praeteritum': [8], 'md:verben-partizip': [30], 'md:verben-plusquamperfekt': [31], 'md:verben-futur': [32], 'md:verben-imperativ': [29], 'md:verben-konjunktiv2': [49], 'md:satzbau-v2': [10], 'md:satzbau-fragen': [22, 24],
  'md:indefinitpronomen': [39], 'b1:genitiv-praepositionen': [12], 'a24:accprep': [4], 'dm:s8-3': [14], 'md:konnektoren-doppel': [47],
  // conceptos con cápsula de las hojas: se enriquecen con errores típicos
  'cs:t1': [10], 'cs:t2': [22, 24], 'cs:t3': [7], 'cs:t8': [33], 'cs:t11': [29], 'cs:t14': [3], 'cs:t15': [4], 'cs:t19': [6], 'cs:t20': [23],
  'cs:t23': [16], 'cs:t24': [16], 'cs:t30': [30], 'dm:s4-1': [17], 'dm:s4-2': [17], 'dm:s4-3': [17], 'dm:s5-2': [12], 'dm:s5-3': [14]
};

// Conceptos de Präpositionen y Konnektoren (decididos por el contenido de cada clase). `re` filtra las viñetas relevantes (si ninguna coincide, queda el hueco).
const MAP2 = {
  'a2:wechselpraepositionen': { n: [16] },
  'cs:t26': { n: [11, 16], re: /zum|zur|beim|vom|\bim\b|\bam\b|\bins\b|\bans\b|contracci/i },
  'a2:praeposition-dat': { n: [11], re: /preposici|\bmit\b|\baus\b|\bbei\b|\bnach\b|\bvon\b|\bseit\b/i },
  'a2:praeposition-acc': { n: [4, 5], re: /preposici|\bf[üu]r\b|\bohne\b|\bdurch\b|\bum\b|\bgegen\b/i },
  'a2:praeposition-gen': { n: [12], re: /preposici|wegen|trotz|w[äa]hrend|statt/i },
  'a2:verben-mit-praepositionen': { n: [5, 34], re: /preposici|\bwarten\b|\bdenken\b|\bfreuen\b|\bauf\b|\b[üu]ber\b|\bsich\b/i },
  'b1:verben-mit-praepositionen': { n: [5, 34], re: /preposici|\bwarten\b|\bdenken\b|\bfreuen\b|\bauf\b|\b[üu]ber\b|\bsich\b/i },
  'a2:konnektoren': { n: [19, 47] },
  'a2:nebensaetze': { n: [40, 44] },
  'b1:konnektoren': { n: [43, 44, 47] },
  'b1:indirekte-fragen': { n: [45, 46] }
  // modalpartikeln / gradpartikeln (md:partikeln, a2:partikeln, b1:partikeln, md:gradpartikeln): ninguna clase las trata → sin cápsula (hueco declarado)
};
function readNote(n) {
  const f = fs.readdirSync(dir).filter(x => x.startsWith(String(n).padStart(3, '0') + '-'))[0];
  if (!f) return null;
  const s = nfc(fs.readFileSync(path.join(dir, f), 'utf8'));
  const title = (/^title:\s*"([^"]*)"/m.exec(s) || [])[1] || f;
  const sec = (s.split(/^## 5\./m)[1] || '').split(/^## 6\./m)[0];
  const bullets = sec.split('\n').filter(l => /^- ⚠️/.test(l)).map(l => l.replace(/^- ⚠️\s*/, '')
    .replace(/^\*\*(Atención|Atencion):\*\*\s*/i, '')        // «Atención:» es sólo una etiqueta
    .replace(/`([^`]+)`/g, '$1').replace(/\s+/g, ' ').trim()).filter(b => b.length >= 25 && b.length <= 200);
  return { n, title: title.replace(/^(El|La|Los|Las)\s+/i, m => m), bullets };
}

// títulos propios cuando una cápsula junta varias clases o el de la clase no describe el concepto
const TITLES = { 'a2:wechselpraepositionen': 'Wechselpräpositionen: Wo? / Wohin?', 'cs:t26': 'Contracciones: zum, zur, im, am…', 'a2:praeposition-dat': 'Preposiciones con Dativ', 'a2:praeposition-acc': 'Preposiciones con Akkusativ', 'a2:praeposition-gen': 'Preposiciones con Genitiv', 'a2:verben-mit-praepositionen': 'Verbos con preposición', 'b1:verben-mit-praepositionen': 'Verbos con preposición', 'a2:konnektoren': 'Conectores: aber, denn, und, sondern, oder', 'a2:nebensaetze': 'Nebensätze: el verbo va al final', 'b1:konnektoren': 'Conectores B1: deshalb, trotzdem, damit…', 'b1:indirekte-fragen': 'Preguntas indirectas: ob y W-Wort', 'md:satzbau-fragen': 'Preguntas: cerradas y abiertas', 'md:verben-partizip': 'Perfekt y Partizip II', 'md:verben-praeteritum': 'Präteritum', 'md:verben-praesens': 'Präsens', 'md:verben-plusquamperfekt': 'Plusquamperfekt', 'md:verben-futur': 'Futur I', 'md:verben-imperativ': 'Imperativ', 'md:verben-konjunktiv2': 'Konjunktiv II' };
const file = path.join(root, 'ui', 'reglas.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
let added = 0, created = 0, enriched = 0;
Object.keys(MAP).forEach(cid => {
  const notes = MAP[cid].map(readNote).filter(Boolean); if (!notes.length) return;
  const errores = [];
  for (let round = 0; errores.length < 3 && round < 3; round++) notes.forEach(nt => { if (errores.length < 3 && nt.bullets[round]) errores.push(nt.bullets[round]); });
  if (!errores.length) return;
  if (data.reglas[cid]) { data.reglas[cid].errores = errores; enriched++; }
  else { data.reglas[cid] = { titulo: TITLES[cid] || notes[0].title, errores }; created++; }
  added += errores.length;
});
// conceptos de la forma {n, re}
Object.keys(MAP2).forEach(cid => {
  const { n, re } = MAP2[cid], notes = n.map(readNote).filter(Boolean), errores = [];
  const pool = []; for (let round = 0; round < 6; round++) notes.forEach(nt => { if (nt.bullets[round]) pool.push(nt.bullets[round]); });
  (re ? pool.filter(b => re.test(b)) : pool).forEach(b => { if (errores.length < 3 && !errores.includes(b)) errores.push(b); });
  if (!errores.length) { console.log('  (sin viñetas relevantes para ' + cid + ': hueco)'); return; }
  if (data.reglas[cid]) { data.reglas[cid].errores = errores; enriched++; } else { data.reglas[cid] = { titulo: TITLES[cid] || notes[0].title, errores }; created++; }
  added += errores.length;
});
// fórmulas propias (texto original) de las habilidades de Gramática B1: se suman a la cápsula con los errores típicos
const PROPIAS = {
  'md:verben-plusquamperfekt': { formula: 'hatte / war (Präteritum) + PARTIZIP II', regla: '**Pasado del pasado.** Mismo auxiliar que en el Perfekt (haben o sein), pero en Präteritum: hatte, hattest… / war, warst…', ejemplo: { antes: 'ich habe gegessen', despues: 'ich **hatte** gegessen' } },
  'md:verben-futur': { formula: 'werden (Präsens) + INFINITIVO al final', regla: '**werden** se conjuga: werde · wirst · wird · werden · werdet · werden. El verbo principal va en infinitivo, al final.', ejemplo: { antes: 'ich lerne', despues: 'ich **werde** lernen' } },
  'md:verben-imperativ': { formula: 'du: raíz · ihr: forma de ihr · Sie: infinitivo + Sie', regla: '**du** pierde -st (komm!), los verbos con e→i(e) cambian la raíz (nimm!, lies!) y no llevan umlaut (fahr!). **ihr** = su forma de presente. **Sie** = infinitivo + Sie.', ejemplo: { antes: 'du kommst', despues: '**komm!**' } },
  'md:verben-konjunktiv2': { formula: 'würde + INFINITIVO al final', regla: '**würde**: würde · würdest · würde · würden · würdet · würden. Sein, haben y los modales tienen forma propia (wäre, hätte, könnte, müsste…).', ejemplo: { antes: 'ich gehe', despues: 'ich **würde** gehen' } }
};
Object.keys(PROPIAS).forEach(cid => { if (data.reglas[cid]) Object.assign(data.reglas[cid], PROPIAS[cid]); });
// alias: los conceptos de un solo ítem (a24:prep-NNN) apuntan a la cápsula de su tipo (por la etiqueta del ítem)
const CASE = { acc: ['für', 'fur', 'ohne', 'durch', 'um', 'gegen', 'bis', 'entlang'], dat: ['mit', 'aus', 'nach', 'bei', 'seit', 'von', 'zu', 'gegenüber', 'ab', 'außer'], gen: ['statt', 'wegen', 'trotz', 'während'] };
let alias = 0;
JSON.parse(fs.readFileSync(path.join(root, 'data', 'praepositionen.json'), 'utf8')).forEach(it => (it.conceptIds || []).filter(c => /^a24:prep-/.test(c)).forEach(c => {
  const m = /^(preposition|wechsel|contraction):(.+)$/.exec(it.errorTag || ''); if (!m) return;
  let target = null;
  if (/^wechsel/.test(it.skill) || m[1] === 'wechsel') target = 'a2:wechselpraepositionen';
  else if (it.skill === 'kontraktion' || m[1] === 'contraction') target = 'cs:t26';
  else { const w = m[2]; target = CASE.acc.includes(w) ? 'a2:praeposition-acc' : CASE.dat.includes(w) ? 'a2:praeposition-dat' : CASE.gen.includes(w) ? 'a2:praeposition-gen' : null; }
  if (target && data.reglas[target]) { data.reglas[c] = { alias: target }; alias++; }
}));
console.log('alias a24:prep-*:', alias);
data.fuentes = Array.from(new Set((data.fuentes || []).concat(['docs/fuentes/aleman-markups/NNN-*.md (§5 errores comunes)'])));
fs.writeFileSync(file, JSON.stringify(data, null, 1) + '\n');
console.log('conceptos con errores típicos:', enriched + created, '(nuevas cápsulas ' + created + ', enriquecidas ' + enriched + ') · viñetas copiadas:', added);
