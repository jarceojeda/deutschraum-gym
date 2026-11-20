// TeKaMoLo (B1, módulo satzbau): ordenar los complementos en el orden neutro Temporal – Kausal – Modal – Lokal. Frases propias generadas combinando
// sujeto+verbo con complementos; la acción es siempre «ordena por bloques». Salida: data/tekamolo.json. Uso: node tools/gen-tekamolo.js [--muestra]
const fs = require('fs'), path = require('path');
const V = {
  fahren:  { f: { ich: 'fahre', wir: 'fahren', er: 'fährt' }, lo: ['nach Berlin', 'nach München', 'zur Arbeit', 'in die Stadt'], mo: ['mit dem Zug', 'mit dem Bus', 'langsam', 'allein'] },
  arbeiten:{ f: { ich: 'arbeite', wir: 'arbeiten', er: 'arbeitet' }, lo: ['im Büro', 'zu Hause', 'in der Bibliothek'], mo: ['konzentriert', 'gern', 'allein', 'schnell'] },
  lernen:  { f: { ich: 'lerne', wir: 'lernen', er: 'lernt' }, lo: ['in der Bibliothek', 'zu Hause', 'im Café'], mo: ['fleißig', 'allein', 'mit einer Freundin'] },
  bleiben: { f: { ich: 'bleibe', wir: 'bleiben', er: 'bleibt' }, lo: ['zu Hause', 'im Bett', 'im Hotel'], mo: ['ruhig', 'gemütlich', 'allein'] },
  gehen:   { f: { ich: 'gehe', wir: 'gehen', er: 'geht' }, lo: ['ins Kino', 'zum Arzt', 'in die Schule', 'ins Museum'], mo: ['gern', 'zu Fuß', 'allein'] },
  wohnen:  { f: { ich: 'wohne', wir: 'wohnen', er: 'wohnt' }, lo: ['in Wien', 'in einer kleinen Wohnung', 'in der Nähe vom Bahnhof'], mo: ['gern', 'ruhig', 'billig'] },
  warten:  { f: { ich: 'warte', wir: 'warten', er: 'wartet' }, lo: ['vor dem Bahnhof', 'am Eingang', 'im Auto'], mo: ['geduldig', 'ruhig', 'mit einem Buch'] },
  spielen: { f: { ich: 'spiele', wir: 'spielen', er: 'spielt' }, lo: ['im Garten', 'im Park', 'auf dem Hof'], mo: ['laut', 'gern', 'mit den Kindern'] }
};
const TE = ['heute', 'morgen', 'am Montag', 'jeden Tag', 'nach der Arbeit', 'am Wochenende', 'im Sommer'];
const KA = ['wegen des Wetters', 'wegen der Prüfung', 'wegen des Projekts', 'aus Neugier', 'aus Erschöpfung'];
const SUBJ = ['ich', 'wir', 'er'], SUBJ_TXT = { ich: 'Ich', wir: 'Wir', er: 'Er' };
const items = []; let n = 0;
const rnd = s => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507)) >>> 0) / 4294967296; };
Object.entries(V).forEach(([verb, d]) => {
  for (let k = 0; k < 12; k++) {
    const r = rnd(verb + k), pick = a => a[Math.floor(r() * a.length)];
    const sj = SUBJ[k % 3], parts = { te: null, ka: null, mo: null, lo: pick(d.lo) };
    // siempre Lo; al menos dos más; Te/Ka/Mo con probabilidad. k fuerza variedad: patrón de qué categorías entran
    const pat = [['te', 'mo'], ['te', 'ka'], ['ka', 'mo'], ['te', 'ka', 'mo'], ['te', 'mo'], ['te', 'ka', 'mo']][k % 6];
    pat.forEach(c => { parts[c] = c === 'te' ? pick(TE) : c === 'ka' ? pick(KA) : pick(d.mo); });
    const chunks = [SUBJ_TXT[sj], d.f[sj]].concat(['te', 'ka', 'mo', 'lo'].map(c => parts[c]).filter(Boolean));
    const answer = chunks.join(' ') + '.', tiles = [].concat(...chunks.map(c => c.split(' '))).concat(['.']);
    const used = ['te', 'ka', 'mo', 'lo'].filter(c => parts[c]).map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' – ');
    items.push({ id: 'tk-' + String(++n).padStart(3, '0'), module: 'satzbau', level: 'B1', type: 'order', skill: 'tekamolo', pool: 'tekamolo', prompt: 'Ordena la frase (orden neutro: Wann? Warum? Wie? Wo/Wohin?)', hint: '', translation: '',
      answer, accept: [answer], tiles,   // en el orden correcto: la UI las mezcla explanation: 'Orden neutro: Temporal (¿cuándo?) – Kausal (¿por qué?) – Modal (¿cómo?) – Lokal (¿dónde/adónde?); los que faltan se saltan. Aquí: ' + used + '.',
      errorTag: 'satzbau:tekamolo', conceptIds: ['md:tekamolo'], source: 'gen-tekamolo' });
  }
});
fs.writeFileSync(path.join(__dirname, '..', 'data', 'tekamolo.json'), JSON.stringify(items, null, 1) + '\n');
console.log('tekamolo.json:', items.length);
if (process.argv.includes('--muestra')) items.filter((_, i) => i % 9 === 0).forEach(i => console.log(i.answer, '|', i.tiles.join(' / '), '|', i.explanation));
