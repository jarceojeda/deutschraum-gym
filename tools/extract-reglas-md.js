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
  'md:verben-praesens': [7], 'md:verben-praeteritum': [8], 'md:verben-partizip': [30], 'md:satzbau-v2': [10], 'md:satzbau-fragen': [22, 24],
  'md:indefinitpronomen': [39], 'b1:genitiv-praepositionen': [12], 'a24:accprep': [4], 'dm:s8-3': [14], 'md:konnektoren-doppel': [47],
  // conceptos con cápsula de las hojas: se enriquecen con errores típicos
  'cs:t1': [10], 'cs:t2': [22, 24], 'cs:t3': [7], 'cs:t8': [33], 'cs:t11': [29], 'cs:t14': [3], 'cs:t15': [4], 'cs:t19': [6], 'cs:t20': [23],
  'cs:t23': [16], 'cs:t24': [16], 'cs:t30': [30], 'dm:s4-1': [17], 'dm:s4-2': [17], 'dm:s4-3': [17], 'dm:s5-2': [12], 'dm:s5-3': [14]
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
const TITLES = { 'md:satzbau-fragen': 'Preguntas: cerradas y abiertas', 'md:verben-partizip': 'Perfekt y Partizip II', 'md:verben-praeteritum': 'Präteritum', 'md:verben-praesens': 'Präsens' };
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
data.fuentes = Array.from(new Set((data.fuentes || []).concat(['docs/fuentes/aleman-markups/NNN-*.md (§5 errores comunes)'])));
fs.writeFileSync(file, JSON.stringify(data, null, 1) + '\n');
console.log('conceptos con errores típicos:', enriched + created, '(nuevas cápsulas ' + created + ', enriquecidas ' + enriched + ') · viñetas copiadas:', added);
