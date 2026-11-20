// Pronunciación (A1–A2, módulo wortschatz, habilidad «pronunciacion»): reglas de sonido grafía ↔ sonido. Contenido propio (preguntas y explicaciones originales).
// Tras responder, el botón 🔊 (voz alemana) pronuncia la forma correcta. Salida: data/pronunciacion.json. Uso: node tools/gen-pronunciacion.js
const fs = require('fs'), path = require('path');
// [nivel, pregunta, correcta, [incorrectas ×3], explicación]
const Q = [
  ['A1', '¿Cómo suena «ei» en «bei»?', '/aɪ̯/ (como «ai» en «baile»)', ['/eɪ̯/ (como «ei» en «rey»)', '/iː/ (una «i» larga)', '/ɔʏ̯/ (como «oi» en «hoy»)'], '«ei» y «ai» suenan /aɪ̯/: bei, Datei.'],
  ['A1', '¿Cómo suena «eu» en «Euro»?', '/ɔʏ̯/ (como «oi» en «hoy»)', ['/aɪ̯/ (como «ai» en «baile»)', '/eu̯/ (como «eu» en «Europa»)', '/oː/ (una «o» larga)'], '«eu» y «äu» suenan /ɔʏ̯/: Euro, Häuser.'],
  ['A1', '¿Cómo suena «ie» en «protestieren»?', '/iː/ (una «i» larga)', ['/ɪə/ (como «ia» en «tía»)', '/aɪ̯/ (como «ai» en «baile»)', '/eː/ (una «e» larga)'], '«ie» es una «i» larga: lieben, protestieren.'],
  ['A1', '¿Cuál es el sonido de «ü» en «Übung»?', '/yː/ (labios en «u», lengua en «i»)', ['/uː/ (como la «u» española)', '/iː/ (como la «i» española)', '/oː/ (como la «o» española)'], '«ü» se dice con los labios de «u» y la lengua de «i».'],
  ['A1', '¿Cuál es el sonido de «ö» en «Brötchen»?', '/øː/ o /œ/ (labios en «o», lengua en «e»)', ['/oː/ (como la «o» española)', '/eː/ (como la «e» española)', '/uː/ (como la «u» española)'], '«ö» se dice con los labios de «o» y la lengua de «e».'],
  ['A1', '¿Cuál es el sonido de «ä» en «Äpfel»?', '/ɛ/ (como una «e» abierta)', ['/aː/ (como la «a» española)', '/uː/ (como la «u» española)', '/øː/ (como «ö»)'], '«ä» suena como «e» abierta: Äpfel, Männer.'],
  ['A1', '¿Cómo suena la «b» final de «Urlaub»?', '/p/', ['/b/', '/v/', '/f/'], 'Al final de sílaba, b/d/g se ensordecen: b → p.'],
  ['A1', '¿Cómo suena la «d» final de «Mund»?', '/t/', ['/d/', '/ð/', '/θ/'], 'Al final de sílaba, d → t.'],
  ['A1', '¿Cómo suena la «g» final de «Ausflug»?', '/k/', ['/g/', '/x/', '/ʃ/'], 'Al final de sílaba, g → k.'],
  ['A1', '¿Cómo suena «-ung» en «Wohnung»?', '/ʊŋ/ (la «g» no se oye aparte)', ['/ʊŋg/ (se oye la «g»)', '/ʊnk/', '/ʊnx/'], '«ng» es una sola «n» nasal /ŋ/.'],
  ['A1', '¿Qué hace la «h» de «Ahnung»?', 'Alarga la vocal y no se pronuncia', ['Se pronuncia fuerte como «j»', 'Acorta la vocal', 'Se pronuncia como «g»'], 'La «h» después de vocal es muda y alarga: sehen, Ahnung.'],
  ['A1', '¿Cómo suena «sch» en «Schiff»?', '/ʃ/ (como «ch» en «chico» suave, sin «t»)', ['/s/ + /k/', '/tʃ/ (como «ch» en «chico»)', '/x/ (como «j»)'], '«sch» = /ʃ/ (es el sonido de «shh»).'],
  ['A1', '¿Cómo suena «ph» en «Delphin»?', '/f/', ['/p/', '/pf/', '/ʃ/'], '«ph» suena como «f».'],
  ['A1', '¿Qué indica «ss» en «Fluss»?', 'Que la vocal anterior es corta', ['Que la vocal anterior es larga', 'Que se pronuncia /ʃ/', 'Que la «s» es sonora'], '«ss» tras vocal corta; «ß» tras vocal larga o diptongo.'],
  ['A1', '¿Qué indica «ß» en «Fuß»?', 'Que la vocal anterior es larga', ['Que la vocal anterior es corta', 'Que se pronuncia /ʃ/', 'Que se pronuncia /ts/'], '«ß» (sorda) aparece tras vocal larga o diptongo: Fuß, groß, heißen.'],
  ['A1', '¿Cómo suena el sufijo «-chen» en «Brötchen»?', '/çən/ (aire entre lengua y paladar)', ['/tʃən/ (como «ch» en «chico»)', '/kən/ (como «k»)', '/ʃən/ (como «sh»)'], '«ch» tras e/i/ö/ü… suena /ç/ (suave); tras a/o/u/au suena /x/ (como «j»).'],
  ['A1', '¿Cómo suena «ch» en «Buch»?', '/x/ (como la «j» española, más suave)', ['/ç/ (suave, como en «ich»)', '/tʃ/ (como «ch» en «chico»)', '/k/'], 'Tras a, o, u, au → /x/; tras e, i, ä, ö, ü, ei, eu → /ç/.'],
  ['A1', '¿Cómo suena «ch» en «ich»?', '/ç/ (suave, aire por la lengua)', ['/x/ (como la «j» española)', '/tʃ/ (como «ch» en «chico»)', '/k/'], 'Tras i, e, ä, ö, ü, ei, eu → /ç/.'],
  ['A1', '¿Cómo suena «s» al principio de «Sonne»?', '/z/ (sonora, como «z» inglesa)', ['/s/ (sorda, como la «s» española)', '/ʃ/', '/ts/'], '«s» antes de vocal es sonora /z/; «ß» y «ss» son sordas.'],
  ['A1', '¿Cómo suena «z» en «Zeit»?', '/ts/', ['/z/', '/θ/ (como la «z» de España)', '/s/'], '«z» siempre es /ts/: Zeit, zehn, Herz.'],
  ['A1', '¿Cómo suena «v» en «Vater»?', '/f/', ['/b/', '/v/ (como la «v» inglesa)', '/w/'], 'En palabras alemanas «v» suena /f/: Vater, vier, viel.'],
  ['A1', '¿Cómo suena «w» en «Wasser»?', '/v/ (como la «v» inglesa)', ['/w/ (como «u» en «huevo»)', '/b/', '/f/'], '«w» suena /v/: Wasser, wohnen.'],
  ['A1', '¿Cómo suena «j» en «ja»?', '/j/ (como «y» en «yo»)', ['/x/ (como la «j» española)', '/ʒ/', '/dʒ/'], '«j» suena como «y»: ja, Jahr.'],
  ['A1', '¿Cómo suena «qu» en «Quelle»?', '/kv/', ['/k/ (como en «que»)', '/kw/ (como «cu» en «cuadro»)', '/ɡ/'], '«qu» = /kv/: Quelle, bequem.'],
  ['A1', '¿Cómo suena «sp» al principio de «sprechen»?', '/ʃp/', ['/sp/', '/zp/', '/ʃb/'], 'Al principio de sílaba, «sp» y «st» suenan /ʃp/ /ʃt/: sprechen, Straße, verstehen.'],
  ['A1', '¿Cómo suena «st» al principio de «Straße»?', '/ʃt/', ['/st/', '/ts/', '/zt/'], 'Al principio de palabra o raíz, «st» = /ʃt/.'],
  ['A1', '¿Dónde va el acento en «Museum»?', 'En la segunda sílaba: Mu-SE-um', ['En la primera: MU-se-um', 'En la última: Mu-se-UM', 'Todas por igual'], 'Muchas palabras de origen latino acentúan la penúltima: Museum, Student.'],
  ['A1', '¿Dónde va el acento en «besuchen»?', 'En la raíz: be-SU-chen', ['En el prefijo: BE-su-chen', 'En la última: be-su-CHEN', 'No hay acento'], 'Los prefijos inseparables (be-, ge-, ver-, zer-, ent-, er-) no llevan el acento.'],
  ['A1', '¿Dónde va el acento en «aufstehen»?', 'En el prefijo separable: AUF-ste-hen', ['En la raíz: auf-STE-hen', 'En la última: auf-ste-HEN', 'No hay acento'], 'El prefijo separable lleva el acento: AUF-stehen, AN-rufen.'],
  ['A2', '¿Qué palabra suena /ʃøːn/?', 'schön', ['schon', 'Schon', 'scheon'], '/ʃøːn/ = «schön» (bonito); «schon» (ya) suena /ʃoːn/.'],
  ['A2', '¿Qué palabra suena /ʃoːn/?', 'schon', ['schön', 'schoen', 'schonn'], '/ʃoːn/ = «schon» (ya).'],
  ['A2', '¿Cuál suena con vocal LARGA?', 'Staat', ['Stadt', 'Stand', 'Stamm'], '«aa» alarga: Staat /ʃtaːt/; «Stadt» tiene vocal corta /ʃtat/.'],
  ['A2', '¿Cuál suena con vocal CORTA?', 'Bett', ['Beet', 'Boot', 'Tee'], '«tt» tras vocal: corta. «ee», «oo» y «h» alargan.'],
  ['A2', '¿Qué grafía tiene el sonido /yː/ largo?', 'Übung', ['Unfall', 'Uhr', 'Ufer'], '«ü» + «h»/consonante simple suele ser largo: Übung, Tür.'],
  ['A2', '¿En qué palabra el «ie» NO es /iː/?', 'Familie', ['Liebe', 'Spiel', 'Brief'], 'En palabras como Familie, Studie… «ie» final suena /jə/. En el resto «ie» = /iː/.'],
  ['A2', '¿Cuál de estas palabras lleva /ʏ/ corto?', 'fünf', ['Tür', 'Übung', 'früh'], '«ü» ante dos consonantes suele ser corta: fünf, Hütte.'],
  ['A2', '¿Cómo se pronuncia «r» al final de «Lehrer»?', 'Como una «a» suave /ɐ/', ['Como «rr» fuerte española', 'Como la «r» simple española', 'No se pronuncia nada'], 'La «r» final tras vocal se vocaliza: Lehrer /ˈleːʁɐ/, Vater.'],
  ['A2', '¿Cuál es la pronunciación aproximada de «Tisch»?', '/tɪʃ/', ['/tɪs/', '/tɪtʃ/', '/tɪx/'], '«sch» = /ʃ/: Tisch, Fisch.']
];
// palabra alemana que se pronuncia con 🔊 tras responder (mismo orden que Q)
const SPEAK = ['bei', 'Euro', 'protestieren', 'Übung', 'Brötchen', 'Äpfel', 'Urlaub', 'Mund', 'Ausflug', 'Wohnung', 'Ahnung', 'Schiff', 'Delphin', 'Fluss', 'Fuß', 'Brötchen', 'Buch', 'ich', 'Sonne', 'Zeit', 'Vater', 'Wasser', 'ja', 'Quelle', 'sprechen', 'Straße', 'Museum', 'besuchen', 'aufstehen',
  'schön', 'schon', 'Staat', 'Bett', 'Übung', 'Familie', 'fünf', 'Lehrer', 'Tisch'];
if (SPEAK.length !== Q.length) throw new Error('SPEAK/Q: ' + SPEAK.length + '/' + Q.length);
// «lemma» = palabra alemana de ejemplo (el motor sólo conserva campos conocidos; «lemma» llega a la UI)
const out = Q.map(([level, prompt, ans, bad, why], i) => {
  const r = (() => { let h = 2166136261 ^ i; return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507)) >>> 0) / 4294967296; })();
  const options = [ans].concat(bad).map(x => [r(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
  return { id: 'pr-' + String(i + 1).padStart(3, '0'), module: 'wortschatz', level, type: 'cloze', skill: 'pronunciacion', pool: 'pronunciacion', lemma: SPEAK[i], prompt, hint: '', translation: '',
    answer: ans, accept: [ans], options, explanation: why, errorTag: 'pronunciacion:' + (level === 'A1' ? 'regla' : 'palabra'), conceptIds: ['md:pronunciacion'], source: 'gen-pronunciacion' };
});
fs.writeFileSync(path.join(__dirname, '..', 'data', 'pronunciacion.json'), JSON.stringify(out, null, 1) + '\n');
console.log('pronunciacion.json:', out.length);
