// Extrae las tablas de referencia (§11 de aleman_declination_master) → ui/tablas.json. Sólo copia celdas de la hoja.
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const root = path.join(__dirname, '..');
const d = new JSDOM(fs.readFileSync(path.join(root, 'docs', 'referencia', 'aleman_declination_master_mobile_v1_1.html'), 'utf8')).window.document;
const clean = s => String(s || '').normalize('NFC').replace(/\s+/g, ' ').trim();
const tablas = {};
['s11-1', 's11-2', 's11-3', 's11-4', 's11-5'].forEach(id => {
  const a = d.getElementById(id), t = a && a.querySelector('table'); if (!t) return;
  const cols = Array.from(t.querySelectorAll('thead th')).slice(1).map(x => clean(x.textContent).replace('*', ''));
  const rows = Array.from(t.querySelectorAll('tbody tr')).map(tr => { const c = Array.from(tr.querySelectorAll('td')).map(x => clean(x.textContent)); return { caso: c[0], celdas: c.slice(1) }; });
  const nota = a.querySelector('p small') ? clean(a.querySelector('p small').textContent) : undefined;
  tablas[id] = { titulo: clean((a.querySelector('h3') || {}).textContent).replace(/^\d+\.\d+\s*·\s*/, ''), cols, rows, nota };
  if (!nota) delete tablas[id].nota;
});
// tabla propia (texto original): pronombre relativo por género/número y caso
tablas['s11-6'] = { titulo: 'Pronombre relativo', cols: ['M', 'F', 'N', 'PL'], rows: [{ caso: 'Nom', celdas: ['der', 'die', 'das', 'die'] }, { caso: 'Akk', celdas: ['den', 'die', 'das', 'die'] }, { caso: 'Dat', celdas: ['dem', 'der', 'dem', 'denen'] }, { caso: 'Gen', celdas: ['dessen', 'deren', 'dessen', 'deren'] }], nota: 'El género y el número vienen del antecedente; el caso, de la función dentro de la subordinada.' };
fs.writeFileSync(path.join(root, 'ui', 'tablas.json'), JSON.stringify({ version: 1, fuente: 'aleman_declination_master_mobile_v1_1.html §11', tablas }, null, 1) + '\n');
console.log('tablas:', Object.keys(tablas).join(', '));
