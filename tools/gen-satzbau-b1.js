// Satzbau A2/B1 (módulo satzbau, ordenar por fichas): oraciones propias (no copiadas de clases ni libros), con la estructura como pista.
// Subordinadas con conjunción (weil, wenn, obwohl, damit, nachdem) se generan en las dos órdenes (principal primero / subordinada primero).
// Salida: data/satzbau-b1.json. Uso: node tools/gen-satzbau-b1.js [--muestra]
const fs = require('fs'), path = require('path');
const tok = s => s.match(/[^\s.,;:!?]+|[.,;:!?]/g) || [];
const items = []; let n = 0;
const POOL = { perfekt: 'satz-a2', modal: 'satz-a2', trennbar: 'satz-a2', objekte: 'satz-a2', vergleich: 'satz-a2', zuinf: 'satz-b1', indfrage: 'satz-b1', relativ: 'satz-b1', passiv: 'satz-b1', konj2: 'satz-b1' };   // pools ≥12
function add(skill, level, answer, hint, es) {
  const tiles = tok(answer);
  items.push({ id: 'sb2-' + String(++n).padStart(3, '0'), module: 'satzbau', level, type: 'order', skill, pool: POOL[skill] || skill, prompt: 'Ordena la frase', hint, translation: es || '', answer, accept: [answer], tiles,
    errorTag: 'satzbau:' + skill, conceptIds: [], source: 'gen-satzbau-b1' });
}
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
// principal {s sujeto, v verbo conjugado, r resto} + subordinada completa (con su conjunción y el verbo al final)
const SUB = {
  weil: { level: 'A2', hint: 'Nebensatz con «weil»: el verbo conjugado va al final', rows: [
    ['ich', 'bleibe', 'heute zu Hause', 'weil ich krank bin', 'Hoy me quedo en casa porque estoy enfermo.'], ['wir', 'nehmen', 'den Bus', 'weil das Auto kaputt ist', 'Tomamos el bus porque el coche está descompuesto.'],
    ['sie', 'lernt', 'jeden Tag Deutsch', 'weil sie in Wien arbeiten möchte', 'Estudia alemán cada día porque quiere trabajar en Viena.'], ['er', 'geht', 'früh ins Bett', 'weil er morgen früh aufstehen muss', 'Se acuesta temprano porque mañana debe levantarse temprano.'],
    ['ich', 'trinke', 'viel Wasser', 'weil es heute so heiß ist', 'Bebo mucha agua porque hoy hace mucho calor.'], ['wir', 'essen', 'zu Hause', 'weil das Restaurant geschlossen hat', 'Comemos en casa porque el restaurante cerró.'],
    ['du', 'kommst', 'zu spät', 'weil der Zug Verspätung hatte', 'Llegas tarde porque el tren se retrasó.'], ['sie', 'kaufen', 'ein neues Sofa', 'weil das alte zu klein ist', 'Compran un sofá nuevo porque el viejo es muy pequeño.'],
    ['ich', 'rufe', 'dich später an', 'weil ich jetzt keine Zeit habe', 'Te llamo más tarde porque ahora no tengo tiempo.'], ['er', 'bleibt', 'im Bett', 'weil er sich nicht gut fühlt', 'Se queda en la cama porque no se siente bien.'] ] },
  wenn: { level: 'A2', hint: 'Nebensatz con «wenn»: el verbo conjugado va al final', rows: [
    ['ich', 'bleibe', 'zu Hause', 'wenn es regnet', 'Me quedo en casa cuando llueve.'], ['wir', 'gehen', 'spazieren', 'wenn die Sonne scheint', 'Salimos a pasear cuando brilla el sol.'],
    ['ich', 'rufe', 'dich an', 'wenn ich zu Hause bin', 'Te llamo cuando estoy en casa.'], ['sie', 'trinkt', 'einen Tee', 'wenn sie müde ist', 'Toma un té cuando está cansada.'],
    ['er', 'fährt', 'mit dem Fahrrad', 'wenn das Wetter schön ist', 'Va en bicicleta cuando hace buen tiempo.'], ['wir', 'kochen', 'zusammen', 'wenn Freunde zu Besuch kommen', 'Cocinamos juntos cuando vienen amigos de visita.'],
    ['ich', 'nehme', 'einen Regenschirm mit', 'wenn der Himmel grau aussieht', 'Llevo un paraguas cuando el cielo se ve gris.'], ['du', 'kannst', 'mich besuchen', 'wenn du Lust hast', 'Puedes visitarme si tienes ganas.'] ] },
  obwohl: { level: 'B1', hint: 'Nebensatz con «obwohl»: concesión, verbo conjugado al final', rows: [
    ['ich', 'gehe', 'zur Arbeit', 'obwohl ich Fieber habe', 'Voy al trabajo aunque tengo fiebre.'], ['wir', 'spielen', 'draußen', 'obwohl es kalt ist', 'Jugamos afuera aunque hace frío.'],
    ['er', 'kauft', 'das Auto', 'obwohl es sehr teuer ist', 'Compra el coche aunque es muy caro.'], ['sie', 'lernt', 'weiter', 'obwohl sie schon müde ist', 'Sigue estudiando aunque ya está cansada.'],
    ['ich', 'esse', 'noch ein Stück Kuchen', 'obwohl ich keinen Hunger mehr habe', 'Como otro trozo de pastel aunque ya no tengo hambre.'], ['wir', 'fahren', 'in den Urlaub', 'obwohl wir wenig Geld haben', 'Nos vamos de vacaciones aunque tenemos poco dinero.'],
    ['er', 'kommt', 'zur Party', 'obwohl er niemanden kennt', 'Viene a la fiesta aunque no conoce a nadie.'], ['du', 'lächelst', 'immer', 'obwohl du viel Stress hast', 'Siempre sonríes aunque tienes mucho estrés.'] ] },
  damit: { level: 'B1', hint: 'Nebensatz con «damit»: finalidad, verbo conjugado al final', rows: [
    ['ich', 'erkläre', 'es noch einmal', 'damit du es verstehst', 'Lo explico otra vez para que lo entiendas.'], ['wir', 'sprechen', 'langsam', 'damit uns alle verstehen', 'Hablamos despacio para que todos nos entiendan.'],
    ['sie', 'schreibt', 'alles auf', 'damit sie nichts vergisst', 'Lo anota todo para no olvidar nada.'], ['er', 'stellt', 'den Wecker', 'damit er pünktlich aufsteht', 'Pone el despertador para levantarse puntual.'],
    ['ich', 'schicke', 'dir den Plan', 'damit du alles weißt', 'Te mando el plan para que sepas todo.'], ['wir', 'kaufen', 'Brot und Milch', 'damit die Kinder frühstücken können', 'Compramos pan y leche para que los niños puedan desayunar.'] ] },
  nachdem: { level: 'B1', hint: 'Nebensatz con «nachdem»: Plusquamperfekt en la subordinada (hatte/war + Partizip II al final)', rows: [
    ['ich', 'ging', 'spazieren', 'nachdem ich gegessen hatte', 'Salí a pasear después de haber comido.'], ['wir', 'gingen', 'nach Hause', 'nachdem der Film zu Ende gewesen war', 'Nos fuimos a casa después de que terminó la película.'],
    ['sie', 'rief', 'ihre Mutter an', 'nachdem sie angekommen war', 'Llamó a su madre después de haber llegado.'], ['er', 'schlief', 'sofort ein', 'nachdem er das Buch gelesen hatte', 'Se durmió enseguida después de haber leído el libro.'],
    ['ich', 'duschte', 'kurz', 'nachdem ich Sport gemacht hatte', 'Me duché rápido después de haber hecho deporte.'], ['wir', 'tranken', 'einen Kaffee', 'nachdem wir eingekauft hatten', 'Tomamos un café después de haber hecho las compras.'] ] }
};
Object.keys(SUB).forEach(k => SUB[k].rows.forEach(([s, v, r, sub, es]) => {
  const S = cap(s), main = S + ' ' + v + ' ' + r;
  add('nebensatz-' + k, SUB[k].level, main + ', ' + sub + '.', SUB[k].hint, es);
  add('nebensatz-' + k, SUB[k].level, cap(sub) + ', ' + v + ' ' + s + ' ' + r + '.', SUB[k].hint + ' · empieza por la subordinada: el verbo de la principal va justo después de la coma', es);
}));
// oraciones sueltas por estructura: [nivel, alemán, español]
const FIX = {
  perfekt: ['A2', 'Perfekt: haben/sein en 2.ª posición y Partizip II al final', [
    ['Ich habe gestern einen Film gesehen.', 'Ayer vi una película.'], ['Wir sind am Wochenende nach Hamburg gefahren.', 'El fin de semana viajamos a Hamburgo.'], ['Sie hat ihrer Freundin ein Buch geschenkt.', 'Le regaló un libro a su amiga.'],
    ['Er ist heute früh aufgestanden.', 'Hoy se levantó temprano.'], ['Hast du schon das Abendessen gekocht?', '¿Ya cocinaste la cena?'], ['Ich habe meine Schlüssel zu Hause vergessen.', 'Olvidé mis llaves en casa.'],
    ['Wir haben lange auf den Bus gewartet.', 'Esperamos mucho el bus.'], ['Die Kinder sind im Park gelaufen.', 'Los niños corrieron en el parque.'], ['Ich habe den ganzen Tag gearbeitet.', 'Trabajé todo el día.'], ['Er hat mir sehr geholfen.', 'Me ayudó mucho.']]],
  modal: ['A2', 'Modalverb en 2.ª posición e infinitivo al final', [
    ['Ich muss heute früh aufstehen.', 'Hoy debo levantarme temprano.'], ['Kannst du mir bitte helfen?', '¿Puedes ayudarme, por favor?'], ['Wir wollen im Sommer nach Italien reisen.', 'Queremos viajar a Italia en verano.'],
    ['Du darfst hier nicht parken.', 'Aquí no puedes estacionar.'], ['Sie soll morgen zum Arzt gehen.', 'Ella debe ir mañana al médico.'], ['Ich möchte einen Tisch für zwei Personen reservieren.', 'Quisiera reservar una mesa para dos personas.'],
    ['Er kann sehr gut Gitarre spielen.', 'Sabe tocar muy bien la guitarra.'], ['Wir müssen noch Milch kaufen.', 'Todavía tenemos que comprar leche.'], ['Darf ich das Fenster öffnen?', '¿Puedo abrir la ventana?'], ['Ihr sollt leise sein.', 'Deben estar callados.']]],
  trennbar: ['A2', 'Verbo separable: el prefijo va al final', [
    ['Ich rufe meine Mutter jeden Sonntag an.', 'Llamo a mi madre cada domingo.'], ['Der Zug kommt um acht Uhr an.', 'El tren llega a las ocho.'], ['Er steht immer sehr früh auf.', 'Siempre se levanta muy temprano.'],
    ['Wir kaufen am Samstag im Supermarkt ein.', 'Hacemos las compras el sábado en el supermercado.'], ['Sie macht das Licht aus.', 'Ella apaga la luz.'], ['Ich räume jetzt mein Zimmer auf.', 'Ahora ordeno mi cuarto.'],
    ['Der Bus fährt gleich ab.', 'El bus sale enseguida.'], ['Kommst du morgen mit?', '¿Vienes mañana con nosotros?'], ['Ich sehe abends gern fern.', 'Por la noche me gusta ver televisión.'], ['Wir laden unsere Nachbarn zum Essen ein.', 'Invitamos a nuestros vecinos a comer.']]],
  objekte: ['A2', 'Dativ antes que Akkusativ si ambos son sustantivos; el pronombre va antes', [
    ['Ich gebe meiner Schwester das Buch.', 'Le doy el libro a mi hermana.'], ['Er zeigt dem Gast sein Zimmer.', 'Le muestra su habitación al huésped.'], ['Wir schenken unserer Oma Blumen.', 'Le regalamos flores a nuestra abuela.'],
    ['Sie schickt ihrem Chef eine E-Mail.', 'Le manda un correo a su jefe.'], ['Ich gebe es ihr morgen.', 'Se lo doy mañana.'], ['Der Kellner bringt den Gästen die Speisekarte.', 'El mesero le trae la carta a los huéspedes.']]],
  zuinf: ['B1', 'Infinitiv con «zu»: va al final, antes del verbo (con separables: «auf-zu-stehen»)', [
    ['Ich habe keine Lust, heute zu kochen.', 'No tengo ganas de cocinar hoy.'], ['Es ist wichtig, jeden Tag zu üben.', 'Es importante practicar cada día.'], ['Er hat vergessen, die Tür abzuschließen.', 'Olvidó cerrar la puerta con llave.'],
    ['Ich versuche, früher aufzustehen.', 'Intento levantarme más temprano.'], ['Sie hat angefangen, Spanisch zu lernen.', 'Empezó a aprender español.'], ['Wir freuen uns, Sie kennenzulernen.', 'Nos alegra conocerle.'],
    ['Es ist schön, mit Freunden zu reisen.', 'Es lindo viajar con amigos.'], ['Ich habe vor, nächstes Jahr umzuziehen.', 'Pienso mudarme el próximo año.']]],
  indfrage: ['B1', 'Pregunta indirecta: «ob» o palabra W, y el verbo al final', [
    ['Ich weiß nicht, ob er heute kommt.', 'No sé si viene hoy.'], ['Kannst du mir sagen, wo der Bahnhof ist?', '¿Puedes decirme dónde está la estación?'], ['Ich frage mich, warum sie so früh gegangen ist.', 'Me pregunto por qué se fue tan temprano.'],
    ['Wissen Sie, wann der nächste Zug fährt?', '¿Sabe cuándo sale el próximo tren?'], ['Er möchte wissen, ob wir Zeit haben.', 'Quiere saber si tenemos tiempo.'], ['Sag mir bitte, wie du heißt.', 'Dime, por favor, cómo te llamas.'],
    ['Ich habe keine Ahnung, wer das gemacht hat.', 'No tengo idea de quién lo hizo.'], ['Sie fragt, was das kostet.', 'Pregunta cuánto cuesta eso.']]],
  relativ: ['B1', 'Relativsatz entre comas: el relativo concuerda con su antecedente y el verbo va al final', [
    ['Der Mann, der dort wohnt, ist mein Lehrer.', 'El hombre que vive allí es mi profesor.'], ['Die Frau, die neben mir sitzt, kommt aus Chile.', 'La mujer que está sentada a mi lado es de Chile.'], ['Das Buch, das ich gelesen habe, war spannend.', 'El libro que leí fue emocionante.'],
    ['Der Film, den wir gestern gesehen haben, war lustig.', 'La película que vimos ayer fue divertida.'], ['Die Kinder, denen ich geholfen habe, sagen danke.', 'Los niños a los que ayudé dan las gracias.'], ['Das ist die Stadt, in der ich geboren bin.', 'Esta es la ciudad en la que nací.'],
    ['Der Nachbar, dessen Hund bellt, ist nett.', 'El vecino cuyo perro ladra es amable.'], ['Die Tasche, die ich gekauft habe, ist zu klein.', 'La bolsa que compré es muy pequeña.']]],
  passiv: ['B1', 'Passiv: werden + Partizip II al final', [
    ['Das Haus wird gerade gebaut.', 'La casa se está construyendo ahora.'], ['Die Tür wurde von dem Hausmeister repariert.', 'La puerta fue reparada por el conserje.'], ['Der Kuchen wird im Ofen gebacken.', 'El pastel se hornea en el horno.'],
    ['Hier wird nicht geraucht.', 'Aquí no se fuma.'], ['Die Briefe wurden gestern geschickt.', 'Las cartas fueron enviadas ayer.'], ['Das Fenster wird jeden Morgen geöffnet.', 'La ventana se abre cada mañana.'],
    ['Wir werden zur Party eingeladen.', 'Nos invitan a la fiesta.'], ['Die Rechnung wurde schon bezahlt.', 'La cuenta ya fue pagada.']]],
  konj2: ['B1', 'Konjunktiv II: würde + infinitivo al final, o la forma propia (hätte, wäre)', [
    ['Wenn ich Zeit hätte, würde ich mehr reisen.', 'Si tuviera tiempo, viajaría más.'], ['Ich würde gern ein Eis essen.', 'Me gustaría comer un helado.'], ['Wenn er hier wäre, würden wir zusammen kochen.', 'Si él estuviera aquí, cocinaríamos juntos.'],
    ['Könntest du mir bitte helfen?', '¿Podrías ayudarme, por favor?'], ['An deiner Stelle würde ich früher losgehen.', 'En tu lugar yo saldría más temprano.'], ['Ich hätte gern eine Tasse Kaffee.', 'Quisiera una taza de café.'],
    ['Wenn wir mehr Geld hätten, würden wir ein Haus kaufen.', 'Si tuviéramos más dinero, compraríamos una casa.'], ['Es wäre schön, wenn du kommen könntest.', 'Sería lindo que pudieras venir.']]],
  vergleich: ['A2', 'Comparación: Komparativ + «als» · Superlativ con «am»', [
    ['Mein Bruder ist größer als ich.', 'Mi hermano es más alto que yo.'], ['Dieses Buch ist interessanter als das andere.', 'Este libro es más interesante que el otro.'], ['Im Sommer ist es wärmer als im Frühling.', 'En verano hace más calor que en primavera.'],
    ['Sie läuft am schnellsten von allen.', 'Ella corre más rápido de todos.'], ['Ich schwimme lieber als ich laufe.', 'Prefiero nadar a correr.'], ['Das ist der beste Kuchen der Welt.', 'Es el mejor pastel del mundo.']]]
};
Object.keys(FIX).forEach(k => FIX[k][2].forEach(([de, es]) => add(k, FIX[k][0], de, FIX[k][1], es)));
fs.writeFileSync(path.join(__dirname, '..', 'data', 'satzbau-b1.json'), JSON.stringify(items, null, 1) + '\n');
const c = {}; items.forEach(i => { c[i.skill] = (c[i.skill] || 0) + 1; });
console.log('satzbau-b1.json:', items.length, JSON.stringify(c));
if (process.argv.includes('--muestra')) items.filter((_, i) => i % 13 === 0).forEach(i => console.log(i.level, i.answer, '|', i.translation));
