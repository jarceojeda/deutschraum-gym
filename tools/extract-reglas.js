// Extrae las cápsulas de regla de las hojas de referencia → ui/reglas.json (indexado por concept id).
// Fuentes: docs/referencia/aleman_declination_master_mobile_v1_1.html (topics sX-Y → «dm:sX-Y») y
//          docs/referencia/telc_a1_cheatsheet_v4_3.html (topics tN → «cs:tN»; sólo gramática, nunca TELC).
// Sólo COPIA texto de esas hojas (fórmula, «memory-strip», un ejemplo antes→después); si un tema no lo tiene, queda el hueco.
// Uso: node tools/extract-reglas.js   (el resultado se versiona; el build no depende de las hojas)
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const root = path.join(__dirname, '..');

const nfc = s => String(s || '').normalize('NFC');
const clean = s => nfc(s).replace(/\s+/g, ' ').trim();
// <strong>/<b> → **negrita** (la UI la pinta); <del> se descarta.
function mark(el) {
  let out = '';
  el.childNodes.forEach(n => {
    if (n.nodeType === 3) out += n.textContent;
    else if (n.nodeName === 'STRONG' || n.nodeName === 'B') out += '**' + mark(n) + '**';
    else if (n.nodeName === 'DEL' || n.nodeName === 'SCRIPT') out += '';
    else if (/^(DIV|P|LI|BR|TR|H4)$/.test(n.nodeName)) out += ' ' + mark(n) + ' ';   // bloques contiguos: separar con espacio
    else out += mark(n);
  });
  return out;
}
const text = el => clean(mark(el)).replace(/\*\*\s*\*\*/g, '');
const plain = s => s.replace(/\*\*/g, '');

function fromTopic(a) {
  const r = { titulo: clean((a.querySelector('h3') || {}).textContent) };
  // fórmula: «human-formula» (fichas den + PLURAL + …) o el panel de fórmula
  const hf = a.querySelector('.human-formula');
  if (hf) r.formula = clean(Array.from(hf.querySelectorAll('.slot')).map(x => x.textContent).join(' + '));
  else { const fp = a.querySelector('.formula-panel'); if (fp) r.formula = clean(fp.textContent); }
  // regla: memory-strip; si no hay, el primer párrafo sin etiquetas raras
  const ms = a.querySelector('.memory-strip');
  if (ms) r.regla = text(ms);
  else { const p = Array.from(a.querySelectorAll('p')).find(x => clean(x.textContent).length > 20 && !x.closest('.example-box')); if (p) r.regla = text(p); }
  // ejemplo antes → después: tarjetas de transformación o primera línea con flecha del cuadro de ejemplos
  const tc = a.querySelectorAll('.transform .t-card b');
  if (tc.length >= 2) r.ejemplo = { antes: text(tc[0]), despues: text(tc[1]) };
  else {
    const line = Array.from(a.querySelectorAll('.example-box p, .box.example, .example')).map(x => text(x)).find(t => t.includes('→'));
    if (line) { const parts = line.split('→').map(x => x.trim()); r.ejemplo = { antes: parts[0], despues: parts.length > 2 ? parts[1].split(' · ')[0] : parts[1] }; }
  }
  if (r.regla && r.regla.length > 260) r.regla = r.regla.slice(0, 257).replace(/\s+\S*$/, '') + '…';
  Object.keys(r).forEach(k => { if (!r[k]) delete r[k]; });
  return (r.regla || r.formula || r.ejemplo) ? r : null;
}

const reglas = {}, cov = { dm: 0, cs: 0 };
function leer(file, prefix, idRe, mapId) {
  const d = new JSDOM(fs.readFileSync(path.join(root, 'docs', 'referencia', file), 'utf8')).window.document;
  d.querySelectorAll('article.topic').forEach(a => {
    if (!idRe.test(a.id)) return;
    const r = fromTopic(a); if (!r) return;
    reglas[mapId(a.id)] = r; cov[prefix]++;
  });
}
leer('aleman_declination_master_mobile_v1_1.html', 'dm', /^s\d+-\d+$/, id => 'dm:' + id);
leer('telc_a1_cheatsheet_v4_3.html', 'cs', /^t\d+$/, id => 'cs:' + id);

const out = { version: 1, fuentes: ['aleman_declination_master_mobile_v1_1.html', 'telc_a1_cheatsheet_v4_3.html (solo gramática)'], reglas };
fs.writeFileSync(path.join(root, 'ui', 'reglas.json'), JSON.stringify(out, null, 1) + '\n');

// Cobertura sobre los conceptos que usan los 3 módulos de la UI
const concepts = JSON.parse(fs.readFileSync(path.join(root, 'data', 'concepts.json'), 'utf8')), cm = {};
concepts.forEach(c => { cm[c.id] = c.title; });
const used = {};
['verben', 'artikel', 'deklination'].forEach(m => JSON.parse(fs.readFileSync(path.join(root, 'data', m + '.json'), 'utf8')).forEach(i => (i.conceptIds || []).forEach(c => { used[c] = (used[c] || 0) + 1; })));
const cubiertos = Object.keys(used).filter(c => reglas[c]), huecos = Object.keys(used).filter(c => !reglas[c]);
console.log('reglas extraídas:', Object.keys(reglas).length, JSON.stringify(cov));
console.log('conceptos usados por verben/artikel/deklination:', Object.keys(used).length, '| con regla:', cubiertos.length, '| huecos:', huecos.length);
console.log('huecos:', huecos.map(c => c + ' (' + used[c] + ' ítems)').join(', '));
