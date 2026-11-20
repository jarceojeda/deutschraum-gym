// Komparativ / Superlativ (A2, módulo deklination): formas propias comprobadas a mano + marcos de frase originales. Salida: data/steigerung.json.
// Uso: node tools/gen-steigerung.js [--muestra]
const fs = require('fs'), path = require('path');
// [adjetivo, komparativ, superlativ (sin «am»; la terminación -sten), marco comparativo, marco superlativo, nivel]
const P = 'Mein Bruder ist ___ als ich.', S = 'Mein Bruder ist am ___.';
const A = [
  ['schnell', 'schneller', 'schnellsten'], ['langsam', 'langsamer', 'langsamsten'], ['schön', 'schöner', 'schönsten'], ['billig', 'billiger', 'billigsten'],
  ['interessant', 'interessanter', 'interessantesten'], ['wichtig', 'wichtiger', 'wichtigsten'], ['nett', 'netter', 'nettesten'], ['freundlich', 'freundlicher', 'freundlichsten'],
  ['lustig', 'lustiger', 'lustigsten'], ['müde', 'müder', 'müdesten'], ['laut', 'lauter', 'lautesten'], ['leise', 'leiser', 'leisesten'], ['breit', 'breiter', 'breitesten'],
  ['dünn', 'dünner', 'dünnsten'], ['leicht', 'leichter', 'leichtesten'], ['schwer', 'schwerer', 'schwersten'], ['schwach', 'schwächer', 'schwächsten'],
  ['groß', 'größer', 'größten'], ['alt', 'älter', 'ältesten'], ['jung', 'jünger', 'jüngsten'], ['lang', 'länger', 'längsten'], ['kurz', 'kürzer', 'kürzesten'],
  ['kalt', 'kälter', 'kältesten'], ['warm', 'wärmer', 'wärmsten'], ['stark', 'stärker', 'stärksten'], ['arm', 'ärmer', 'ärmsten'], ['klug', 'klüger', 'klügsten'], ['dumm', 'dümmer', 'dümmsten'],
  ['süß', 'süßer', 'süßesten'], ['heiß', 'heißer', 'heißesten'], ['gesund', 'gesünder', 'gesündesten'], ['teuer', 'teurer', 'teuersten'], ['dunkel', 'dunkler', 'dunkelsten'], ['hell', 'heller', 'hellsten'],
  ['neu', 'neuer', 'neuesten'], ['klein', 'kleiner', 'kleinsten'], ['frisch', 'frischer', 'frischesten'], ['ruhig', 'ruhiger', 'ruhigsten'], ['sauber', 'sauberer', 'saubersten'],
  ['gut', 'besser', 'besten', 'Mein Bruder spricht ___ Deutsch als ich.', 'Mein Bruder spricht am ___ Deutsch.'],
  ['viel', 'mehr', 'meisten', 'Mein Bruder isst ___ als ich.', 'Mein Bruder isst am ___.'],
  ['gern', 'lieber', 'liebsten', 'Mein Bruder schwimmt ___ als ich.', 'Mein Bruder schwimmt am ___.'],
  ['hoch', 'höher', 'höchsten', 'Der Berg ist ___ als das Haus.', 'Der Berg ist am ___.'],
  ['nah', 'näher', 'nächsten', 'Die Schule ist ___ als der Bahnhof.', 'Die Schule ist am ___.'],
  ['früh', 'früher', 'frühesten', 'Mein Bruder steht ___ auf als ich.', 'Mein Bruder steht am ___ auf.']
];
const A1 = new Set(['groß', 'klein', 'alt', 'jung', 'neu', 'schnell', 'langsam', 'lang', 'kurz', 'warm', 'kalt', 'gut', 'viel', 'gern', 'schön', 'nett']);
const items = [], seed = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507)) >>> 0) / 4294967296; };
const sh = (a, r) => a.map(x => [r(), x]).sort((x, y) => x[0] - y[0]).map(x => x[1]);
const stripUml = s => s.replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u');
A.forEach(([adj, comp, sup, fc, fs_]) => {
  const reg = adj + 'er', regS = adj + (/[dtszßx]$|sch$/.test(adj) ? 'esten' : 'sten');
  const compTraps = [reg, stripUml(comp), adj, sup, sup.replace(/en$/, 'e'), comp + 'e', adj + 'e'], supTraps = [regS, stripUml(sup), adj, comp, sup.replace(/en$/, 'e'), sup.replace(/en$/, 'er'), adj + 'e'];
  [['komparativ', comp, compTraps, fc || P, 'A2'], ['superlativ', sup, supTraps, fs_ || S, 'A2']].forEach(([sk, ans, traps, frame, lv]) => {
    const r = seed(adj + sk), bad = Array.from(new Set(traps)).filter(t => t && t !== ans && !t.includes(' ') && !(adj === 'hoch' && /^hoche$/.test(t))), opts = sh([ans].concat(sh(bad, r).slice(0, 3)), r);
    if (opts.length < 4) throw new Error('pocas trampas: ' + adj + ' ' + sk);
    const exp = sk === 'komparativ' ? adj + ' → ' + comp + ' (als…)' : adj + ' → am ' + sup;
    items.push({ id: 'st-' + sk.slice(0, 4) + '-' + adj, module: 'deklination', level: A1.has(adj) ? 'A2' : 'A2', type: 'cloze', skill: sk, pool: sk, prompt: frame, hint: adj, translation: '', answer: ans, accept: [ans], options: opts,
      explanation: exp + (comp !== adj + 'er' ? '. Forma irregular o con cambio de vocal.' : '.'), errorTag: 'steigerung:' + sk, conceptIds: ['md:steigerung'], source: 'gen-steigerung' });
  });
});
fs.writeFileSync(path.join(__dirname, '..', 'data', 'steigerung.json'), JSON.stringify(items, null, 1) + '\n');
console.log('steigerung.json:', items.length);
if (process.argv.includes('--muestra')) items.filter((_, i) => i % 7 === 0).forEach(i => console.log(i.prompt, '(' + i.hint + ')', '→', i.answer, '|', i.options.join('/')));
