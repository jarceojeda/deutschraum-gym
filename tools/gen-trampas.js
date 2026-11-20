// «Trampas»: elige la frase/forma correcta entre la correcta y errores típicos de hispanohablantes. Contenido ORIGINAL (frases propias,
// no copiadas de clases ni libros). Salida: data/trampas.json (módulo satzbau, habilidad «trampa»). Uso: node tools/gen-trampas.js
// Cada fila: [nivel, correcta, errónea, errónea2|'', porqué (una línea)]
const fs = require('fs'), path = require('path');
const T = [
  ['A1', 'Heute gehe ich ins Kino.', 'Heute ich gehe ins Kino.', '', 'El verbo conjugado va siempre en 2.ª posición: si empiezas con «Heute», sigue el verbo.'],
  ['A1', 'Morgen lerne ich Deutsch.', 'Morgen ich lerne Deutsch.', '', 'Verbo en posición 2: tras «Morgen» viene «lerne».'],
  ['A1', 'Ihr seid müde.', 'Ihr sind müde.', 'Ihr seit müde.', 'Con «ihr», sein es «seid».'],
  ['A1', 'Er hat keinen Hund.', 'Er hat nicht Hund.', 'Er hat kein Hund.', 'Con sustantivos se niega con «kein-», y en Akkusativ masculino es «keinen».'],
  ['A1', 'Ich habe keine Zeit.', 'Ich habe nicht Zeit.', '', 'Negar un sustantivo sin artículo o con indefinido: «kein-», no «nicht».'],
  ['A1', 'Ich esse nie Fleisch.', 'Ich esse nicht nie Fleisch.', '', '«nie» ya niega: no se añade «nicht».'],
  ['A1', 'Das ist mein Bruder.', 'Das ist meine Bruder.', '', 'El posesivo concuerda con el género del sustantivo: Bruder es masculino → mein.'],
  ['A1', 'Ich komme aus Mexiko.', 'Ich komme von Mexiko.', '', 'Procedencia con país: «aus», no «von».'],
  ['A1', 'Sie heißt Anna.', 'Sie heißen Anna.', '', 'Con «sie» (ella) el verbo termina en -t: heißt.'],
  ['A1', 'Wir wohnen in Berlin.', 'Wir wohnt in Berlin.', '', 'Con «wir» el verbo va en infinitivo: wohnen.'],
  ['A1', 'Ich habe Hunger.', 'Ich bin Hunger.', '', 'Hunger haben (no sein), como «tener hambre».'],
  ['A1', 'Ich bin 25 Jahre alt.', 'Ich habe 25 Jahre.', '', 'La edad se dice con sein + alt, no con haben.'],
  ['A1', 'Ich möchte einen Kaffee.', 'Ich möchte ein Kaffee.', '', 'Akkusativ masculino: einen.'],
  ['A1', 'Der Tisch ist groß.', 'Die Tisch ist groß.', '', 'Tisch es masculino: der.'],
  ['A1', 'Die Kinder spielen im Garten.', 'Die Kinder spielt im Garten.', '', 'Sujeto plural: spielen.'],
  ['A1', 'Ich fahre mit dem Bus.', 'Ich fahre mit den Bus.', 'Ich fahre mit der Bus.', '«mit» siempre lleva Dativ: dem Bus.'],
  ['A1', 'Er liest ein Buch.', 'Er lesst ein Buch.', '', 'lesen cambia e→ie con er/sie/es: liest.'],
  ['A1', 'Du fährst nach Hause.', 'Du fahrst nach Hause.', '', 'fahren lleva umlaut con du/er: fährst.'],
  ['A1', 'Ich nehme den Zug.', 'Ich nimme den Zug.', '', 'nehmen: ich nehme (el cambio de raíz sólo es con du/er).'],
  ['A2', 'Ich habe Deutsch gelernt.', 'Ich habe gelernt Deutsch.', '', 'En el Perfekt el participio va al final.'],
  ['A2', 'Er hat das Auto gekauft.', 'Er hat gekauft das Auto.', '', 'Participio II al final de la oración.'],
  ['A2', 'Ich habe das Buch gelesen.', 'Ich habe das Buch gelest.', '', 'lesen es irregular: gelesen (no gelest).'],
  ['A2', 'Sie hat Medizin studiert.', 'Sie hat Medizin gestudiert.', '', 'Los verbos en -ieren no llevan ge-.'],
  ['A2', 'Ich habe die Prüfung verstanden.', 'Ich habe die Prüfung geverstanden.', '', 'Prefijo inseparable (ver-): sin ge-.'],
  ['A2', 'Er ist früh aufgestanden.', 'Er ist früh geaufstanden.', '', 'Con prefijo separable, ge- va entre prefijo y verbo: auf-ge-standen.'],
  ['A2', 'Ich bin nach Berlin gefahren.', 'Ich habe nach Berlin gefahren.', '', 'Verbos de movimiento a un destino usan sein.'],
  ['A2', 'Wir sind gestern zu Hause geblieben.', 'Wir haben gestern zu Hause geblieben.', '', 'bleiben forma el Perfekt con sein.'],
  ['A2', 'Ich putze mir die Zähne.', 'Ich putze mich die Zähne.', '', 'Con complemento directo (die Zähne) el reflexivo va en Dativ: mir.'],
  ['A2', 'Ich freue mich auf das Wochenende.', 'Ich freue mich über das Wochenende.', '', 'Ilusión por algo futuro: «sich freuen auf»; «über» es por algo presente o ya ocurrido.'],
  ['A2', 'Ich warte auf den Bus.', 'Ich warte für den Bus.', 'Ich warte an den Bus.', 'warten + auf + Akkusativ.'],
  ['A2', 'Ich interessiere mich für Musik.', 'Ich interessiere mich an Musik.', '', 'sich interessieren + für.'],
  ['A2', 'Das Buch liegt auf dem Tisch.', 'Das Buch liegt auf den Tisch.', '', 'Wo? (posición) → Dativ.'],
  ['A2', 'Ich lege das Buch auf den Tisch.', 'Ich lege das Buch auf dem Tisch.', '', 'Wohin? (movimiento) → Akkusativ.'],
  ['A2', 'Ich bleibe zu Hause, weil ich krank bin.', 'Ich bleibe zu Hause, weil ich bin krank.', '', 'Tras «weil» el verbo conjugado va al final.'],
  ['A2', 'Ich bleibe zu Hause, denn ich bin krank.', 'Ich bleibe zu Hause, denn ich krank bin.', '', 'Tras «denn» el orden no cambia (verbo en 2.ª posición).'],
  ['A2', 'Wenn es regnet, bleibe ich zu Hause.', 'Wenn es regnet, ich bleibe zu Hause.', '', 'Si empieza la subordinada, el verbo de la principal va justo después de la coma.'],
  ['A2', 'Die Frau, die dort steht, ist meine Lehrerin.', 'Die Frau, der dort steht, ist meine Lehrerin.', '', 'El relativo toma el género de su antecedente: Frau → die.'],
  ['A2', 'Er schenkt seiner Mutter Blumen.', 'Er schenkt seine Mutter Blumen.', '', 'La persona que recibe va en Dativ: seiner Mutter.'],
  ['A2', 'Das Kleid gefällt mir.', 'Das Kleid gefällt mich.', '', 'gefallen se usa con Dativ.'],
  ['A2', 'Er hilft dem Kind.', 'Er hilft das Kind.', '', 'helfen exige Dativ.'],
  ['A2', 'Der Student kommt aus Spanien.', 'Der Studente kommt aus Spanien.', '', 'Es «Student» (masculino débil).'],
  ['A2', 'Ich gebe dem Studenten das Buch.', 'Ich gebe dem Student das Buch.', '', 'Los masculinos débiles añaden -en fuera del Nominativ.'],
  ['B1', 'Als ich ein Kind war, spielte ich viel draußen.', 'Wenn ich ein Kind war, spielte ich viel draußen.', '', 'Un hecho pasado único o un periodo concreto: «als», no «wenn».'],
  ['B1', 'Nachdem ich gegessen hatte, ging ich spazieren.', 'Nachdem ich gegessen hatte, ich ging spazieren.', '', 'Tras la subordinada, la principal empieza con el verbo.'],
  ['B1', 'Sie war schon gegangen, als ich ankam.', 'Sie hatte schon gegangen, als ich ankam.', '', 'gehen es de movimiento: Plusquamperfekt con war.'],
  ['B1', 'Ich hätte gern einen Tee.', 'Ich würde gern einen Tee haben.', '', 'Con haben y sein se usa la forma propia: hätte, wäre (no würde + haben).'],
  ['B1', 'Wenn ich Zeit hätte, würde ich reisen.', 'Wenn ich Zeit habe, würde ich reisen.', '', 'Condición irreal: Konjunktiv II en las dos partes.'],
  ['B1', 'Das Haus wurde 1950 gebaut.', 'Das Haus war 1950 gebaut.', '', 'Passiv de proceso: werden (Präteritum: wurde) + Partizip II.'],
  ['B1', 'Ich habe arbeiten müssen.', 'Ich habe arbeiten gemusst.', '', 'Con otro infinitivo, el modal va en infinitivo (doble infinitivo).'],
  ['B1', 'Er sagte, dass er müde sei.', 'Er sagte, dass er ist müde.', '', 'Tras «dass» el verbo va al final.'],
  ['B1', 'Ich frage mich, ob er kommt.', 'Ich frage mich, ob kommt er.', '', 'Pregunta indirecta con «ob»: verbo al final.'],
  ['B1', 'Trotzdem gehe ich hin.', 'Trotzdem ich gehe hin.', '', '«trotzdem» ocupa la posición 1: el verbo sigue en 2.ª.'],
  ['B1', 'Der Mann, dem ich geholfen habe, ist nett.', 'Der Mann, der ich geholfen habe, ist nett.', 'Der Mann, den ich geholfen habe, ist nett.', 'helfen pide Dativ: el relativo masculino es «dem».']
];
const out = T.map((r, i) => {
  const [level, ok, bad, bad2, why] = r, opts = [ok, bad].concat(bad2 ? [bad2] : []);
  const k = (i * 7) % opts.length; opts.splice(k, 0, opts.splice(0, 1)[0]);   // la correcta no siempre primera
  const id = 'tr-' + String(i + 1).padStart(3, '0');
  return { id, module: 'satzbau', level, type: 'cloze', skill: 'trampa', pool: 'trampa', prompt: '¿Cuál es correcta?', hint: '', translation: '', answer: ok, accept: [ok], options: Array.from(new Set(opts)),
    explanation: why, errorTag: 'satzbau:trampa', conceptIds: [], source: 'gen-trampas' };
});
out.forEach(it => { if (!it.options.includes(it.answer)) throw new Error(it.id); });
fs.writeFileSync(path.join(__dirname, '..', 'data', 'trampas.json'), JSON.stringify(out, null, 1) + '\n');
console.log('trampas.json:', out.length);
