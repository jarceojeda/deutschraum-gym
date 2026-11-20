// Auditoría automática del CONTENIDO (data/*.json). Uso: node tools/audit-contenido.js   → informe en consola; sale con 1 si hay hallazgos graves.
const fs = require('fs'), path = require('path');
require('../src/dg-engine.js'); const DG = globalThis.DG;
const dir = path.join(__dirname, '..', 'data');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'concepts.json' && f !== 'wortschatz-beyond.json');
const all = []; files.forEach(f => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).forEach(i => all.push(Object.assign({ _f: f }, i))));
const beyond = JSON.parse(fs.readFileSync(path.join(dir, 'wortschatz-beyond.json'), 'utf8')).map(i => Object.assign({ _f: 'wortschatz-beyond.json' }, i));
const concepts = JSON.parse(fs.readFileSync(path.join(dir, 'concepts.json'), 'utf8'));
const F = [], note = (sev, code, id, msg) => F.push({ sev, code, id, msg });
// 1) validación del motor con TODO junto
const rep = DG.items.validate(DG.items.createStore(all.concat(beyond)), { concepts });
rep.errors.forEach(e => note('grave', 'motor:' + e.code, e.id, e.msg));
// 2) texto: NFC, caracteres rotos, espacios
all.concat(beyond).forEach(i => {
  const t = JSON.stringify(i); if (t !== t.normalize('NFC')) note('grave', 'nfc', i.id, 'no está en NFC');
  if (/[̀-̮̰-ͯ]/.test(t)) note('grave', 'nfd', i.id, 'diacríticos combinados (NFD; el IPA U+032F de Pronunciación es legítimo)');
  if (/[�]|Ã|â€|\?\?/.test(t)) note('grave', 'mojibake', i.id, 'caracteres rotos');
  [i.prompt, i.answer, ...(i.options || [])].forEach(x => { if (typeof x === 'string' && (/^\s|\s$|\s{2,}/.test(x))) note('medio', 'espacios', i.id, JSON.stringify(x)); });
});
// 3) ambigüedad y fugas
all.concat(beyond).forEach(i => {
  if (i.type !== 'cloze' || !i.options || !i.options.length) return;
  if (new Set(i.options).size !== i.options.length) note('grave', 'opciones-duplicadas', i.id, i.options.join('|'));
  if (!i.options.includes(i.answer)) note('grave', 'sin-respuesta-en-opciones', i.id, i.answer);
  if (i.options.length < 3 && !/^(hilfsverb|indefinido|trampa)$/.test(i.skill)) note('medio', 'pocas-opciones', i.id, String(i.options.length));
  if (i.module === 'wortschatz' && i.skill === 'contexto' && i.prompt && i.prompt.toLowerCase().includes(String(i.answer).toLowerCase().replace(/^(der|die|das) /, '')) && !/___/.test(i.prompt)) note('medio', 'fuga', i.id, 'la respuesta aparece en el enunciado');
});
// 4) sesgo de posición y de longitud de la respuesta
const pos = {}, longest = { n: 0, t: 0 };
all.concat(beyond).filter(i => i.type === 'cloze' && i.options && i.options.length === 4).forEach(i => { const k = i.options.indexOf(i.answer); pos[k] = (pos[k] || 0) + 1; longest.t++; if (i.answer.length >= Math.max(...i.options.map(o => o.length))) longest.n++; });
console.log('posición de la respuesta (0-3):', JSON.stringify(pos), '· la más larga:', (100 * longest.n / longest.t).toFixed(0) + ' %');
// 5) duplicados de enunciado+respuesta (mismo ejercicio dos veces)
const seen = {}; all.concat(beyond).forEach(i => { const k = i.module + '|' + i.skill + '|' + i.prompt + '|' + i.answer; if (seen[k]) note('medio', 'duplicado', i.id, 'igual que ' + seen[k]); else seen[k] = i.id; });
// 6) por módulo y nivel
const mat = {}; all.concat(beyond).forEach(i => { const k = i.module + ' ' + i.level; mat[k] = (mat[k] || 0) + 1; });
console.log('ítems por módulo/nivel:', JSON.stringify(mat));
const bySev = {}; F.forEach(f => { bySev[f.sev + ' · ' + f.code] = (bySev[f.sev + ' · ' + f.code] || 0) + 1; });
console.log('hallazgos:', F.length, JSON.stringify(bySev));
F.slice(0, 25).forEach(f => console.log('  ', f.sev, f.code, f.id, String(f.msg).slice(0, 100)));
process.exit(F.some(f => f.sev === 'grave') ? 1 : 0);
