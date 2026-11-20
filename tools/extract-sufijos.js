// Extrae las terminaciones de género de docs/fuentes/aleman-markups/reglas-articulos-aleman-der-die-das.md → ui/sufijos.json
// (tablas «Terminación | Ejemplos | Comentario» de 9.5 der, 10.4 die y 11.4 das, más -chen/-lein de 11.1). Sólo copia lo que dice la fuente.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(root, 'docs', 'fuentes', 'aleman-markups', 'reglas-articulos-aleman-der-die-das.md'), 'utf8').normalize('NFC');
const clean = s => s.replace(/\*\*/g, '').replace(/`/g, '').replace(/\s+/g, ' ').trim();
const section = (start, end) => { const a = src.indexOf(start); const b = src.indexOf(end, a + 1); return a < 0 ? '' : src.slice(a, b < 0 ? undefined : b); };
const sufijos = [];
function tabla(sec, art) {
  sec.split('\n').filter(l => /^\|/.test(l) && !/^\|\s*:?-/.test(l) && !/^\|\s*Terminaci/.test(l)).forEach(l => {
    const c = l.split('|').slice(1, -1).map(clean); if (c.length < 3 || !/^-[a-zäöüß]+$/i.test(c[0])) return;
    sufijos.push({ fin: c[0], art, ejemplos: c[1], nota: c[2] });
  });
}
tabla(section('### 9.5 Terminaciones típicamente masculinas', '\n## 10.'), 'der');
tabla(section('### 10.4 Terminaciones muy fiables para femenino', '### 10.5'), 'die');
tabla(section('### 11.4 Sustantivos de origen extranjero', '### 11.5'), 'das');
// -chen / -lein: la fuente (11.1) dice que son siempre neutros; los ejemplos son los de su tabla
const s111 = section('### 11.1 Terminaciones -chen y -lein', '### 11.2');
if (/siempre neutros/.test(s111)) {
  const ex = Array.from(s111.matchAll(/^\|\s*(das [^|]+?)\s*\|/gm)).map(m => m[1]);
  ['-chen', '-lein'].forEach(f => { const e = ex.filter(x => x.endsWith(f.slice(1))).slice(0, 3).join(', ') || ex.slice(0, 2).join(', '); sufijos.push({ fin: f, art: 'das', ejemplos: e, nota: 'Los diminutivos son siempre neutros (ganan sobre el significado: das Mädchen).' }); });
}
fs.writeFileSync(path.join(root, 'ui', 'sufijos.json'), JSON.stringify({ version: 1, fuente: 'reglas-articulos-aleman-der-die-das.md', sufijos }, null, 1) + '\n');
console.log('sufijos:', sufijos.length, JSON.stringify(sufijos.reduce((a, s) => { a[s.art] = (a[s.art] || 0) + 1; return a; }, {})));
