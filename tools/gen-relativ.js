// Relativpronomen (B1, módulo deklination): elige der/die/das/den/dem/dessen/deren/denen según género/número del antecedente y caso en la subordinada.
// Frases originales generadas combinando sustantivos y marcos propios. Salida: data/relativ.json. Uso: node tools/gen-relativ.js
const fs = require('fs'), path = require('path');
const FORM = { M: ['der', 'den', 'dem', 'dessen'], F: ['die', 'die', 'der', 'deren'], N: ['das', 'das', 'dem', 'dessen'], PL: ['die', 'die', 'denen', 'deren'] };
const CASES = ['nominative', 'accusative', 'dative', 'genitive'], CASE_ES = ['sujeto → Nominativ', 'objeto directo → Akkusativ', 'objeto indirecto/preposición con Dativ → Dativ', 'posesión → Genitiv'];
const GEN = { M: 'masculino', F: 'femenino', N: 'neutro', PL: 'plural' };
// persona: animada; cosa: inanimada; loc: admite «in ___ ich wohne»
const N = [
  ['M', 'Mann', 'p'], ['M', 'Freund', 'p'], ['M', 'Lehrer', 'p'], ['M', 'Nachbar', 'p'], ['M', 'Film', 'c'], ['M', 'Garten', 'c'],
  ['F', 'Frau', 'p'], ['F', 'Freundin', 'p'], ['F', 'Lehrerin', 'p'], ['F', 'Nachbarin', 'p'], ['F', 'Stadt', 'l'], ['F', 'Wohnung', 'l'], ['F', 'Tasche', 'c'],
  ['N', 'Kind', 'p'], ['N', 'Mädchen', 'p'], ['N', 'Haus', 'l'], ['N', 'Buch', 'c'], ['N', 'Auto', 'c'],
  ['PL', 'Leute', 'p'], ['PL', 'Kinder', 'p'], ['PL', 'Freunde', 'p'], ['PL', 'Häuser', 'l'], ['PL', 'Bücher', 'c'], ['PL', 'Filme', 'c']
];
const ART = { M: 'Der', F: 'Die', N: 'Das', PL: 'Die' };
const items = []; let n = 0;
function seeded(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507)) >>> 0) / 4294967296; }
function frames(g, noun, kind) {   // [caso, resto de la subordinada con ___, tipo de adjetivo]
  const pl = g === 'PL', vb = (a, b) => (pl ? b : a), adj = kind === 'p' ? (pl ? 'nett' : 'nett') : (pl ? 'schön' : 'schön'), cop = pl ? 'sind' : 'ist';
  const f = [[0, kind === 'p' ? '___ ' + vb('dort wohnt', 'dort wohnen') : '___ ' + vb('dort liegt', 'dort liegen')],
    [1, '___ ich gestern gesehen habe'], [3, '___ Name ich vergessen habe']];
  if (kind === 'p') { f.push([2, '___ ich gestern geholfen habe']); f.push([2, 'mit ___ ich gestern gesprochen habe']); }
  if (kind === 'l') f.push([2, 'in ___ ich wohne']);
  return f.map(x => ({ c: x[0], rest: x[1], cop, adj, prep: /^(mit|in) /.test(x[1]) }));
}
N.forEach(([g, noun, kind]) => frames(g, noun, kind).forEach(fr => {
  const ans = FORM[g][fr.c === 0 ? 0 : fr.c], idx = fr.c;   // FORM[g] = [Nom, Akk, Dat, Gen]
  const answer = FORM[g][idx], r = seeded(noun + fr.rest);
  const allForms = Array.from(new Set([].concat(...Object.values(FORM).map(a => a)))).filter(x => x !== answer);
  const sameGender = FORM[g].filter(x => x !== answer), otherCaseSameForm = [];
  const pool = Array.from(new Set(sameGender.concat(allForms))).filter(x => x !== answer);
  const traps = pool.sort(() => r() - 0.5).slice(0, 3), options = [answer].concat(traps).sort(() => r() - 0.5);
  const sentence = ART[g] + ' ' + noun + ', ' + fr.rest.replace(/^___ /, '___ ').replace('___', '___') + ', ' + fr.cop + ' ' + fr.adj + '.';
  const prompt = fr.prep ? ART[g] + ' ' + noun + ', ' + fr.rest + ', ' + fr.cop + ' ' + fr.adj + '.' : sentence;
  const why = noun + ' es ' + GEN[g] + (g === 'PL' ? '' : ' singular') + '; en la subordinada: ' + CASE_ES[idx] + ' → ' + answer + '.';
  items.push({ id: 'rp-' + String(++n).padStart(3, '0'), module: 'deklination', level: 'B1', type: 'cloze', skill: 'relativpronomen', pool: 'relativpronomen', prompt, hint: '', translation: '',
    answer, accept: [answer], options, explanation: why, case: CASES[idx], errorTag: 'case:' + CASES[idx] + ':relative', conceptIds: ['md:relativpronomen'], source: 'gen-relativ' });
}));
// «Cap»: no hace falta tope; 100+ ítems. Un mismo (sustantivo, marco) no se repite.
fs.writeFileSync(path.join(__dirname, '..', 'data', 'relativ.json'), JSON.stringify(items, null, 1) + '\n');
console.log('relativ.json:', items.length);
if (process.argv.includes('--muestra')) items.filter((_, i) => i % 11 === 0).forEach(i => console.log(i.prompt, '→', i.answer, '|', i.options.join('/')));
