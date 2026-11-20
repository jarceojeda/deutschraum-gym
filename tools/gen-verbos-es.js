// Significado en español de cada verbo (ui/verbos-es.json) para mostrarlo en Verben: «lernen → aprender».
// Fuente 1: el Wortschatz generado (referencia + clases). Fuente 2: tabla propia MANUAL para los verbos que ahí no están. Uso: node tools/gen-verbos-es.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), rd = f => JSON.parse(fs.readFileSync(path.join(root, 'data', f), 'utf8'));
const lem = [...new Set(rd('verben.json').concat(rd('gramatica.json')).map(i => i.lemma))].sort();
const map = {};
rd('wortschatz.json').forEach(i => { if (i.skill === 'es-de' && lem.includes(i.answer)) map[i.answer] = map[i.answer] || i.prompt; if (i.skill === 'de-es' && lem.includes(i.prompt)) map[i.prompt] = map[i.prompt] || i.answer; });
const MANUAL = {
  bekommen: 'recibir, conseguir', entscheiden: 'decidir', entstehen: 'surgir, originarse', erfahren: 'enterarse, experimentar', erhalten: 'recibir, obtener', vermeiden: 'evitar',
  verbieten: 'prohibir', verbringen: 'pasar (tiempo)', vergleichen: 'comparar', verschieben: 'aplazar, mover', verschwinden: 'desaparecer', überweisen: 'transferir (dinero)',
  bewerben: 'postularse (sich bewerben)', widersprechen: 'contradecir', behalten: 'quedarse con, conservar', bestehen: 'aprobar; existir', unterhalten: 'entretener; mantener', einhalten: 'cumplir, respetar',
  schmecken: 'saber (a), gustar (comida)', wiederholen: 'repetir', zusagen: 'confirmar (asistencia)', reklamieren: 'reclamar', ausfallen: 'cancelarse, no tener lugar', übernachten: 'pasar la noche',
  'sich verletzen': 'herirse, lastimarse', 'sich eincremen': 'ponerse crema', fehlen: 'faltar', 'sich verirren': 'perderse, extraviarse', 'sich bedanken': 'dar las gracias',
  einziehen: 'mudarse (entrar a vivir)', abholen: 'recoger (a alguien / algo)', 'sich ärgern': 'enojarse', 'sich freuen': 'alegrarse', 'sich interessieren': 'interesarse', 'sich erinnern': 'acordarse, recordar',
  vereinbaren: 'acordar, concertar', legen: 'poner (acostado), colocar', stellen: 'poner (de pie), colocar', setzen: 'sentar, poner', stecken: 'meter, estar metido', erleben: 'vivir (una experiencia)',
  erreichen: 'alcanzar, lograr', versuchen: 'intentar', vermieten: 'alquilar (como dueño)', weinen: 'llorar', ändern: 'cambiar, modificar', sparen: 'ahorrar', nutzen: 'usar, aprovechar',
  schützen: 'proteger', teilen: 'compartir, dividir', respektieren: 'respetar', erledigen: 'hacer, resolver (un asunto)', erkunden: 'explorar', trennen: 'separar', achten: 'prestar atención, respetar',
  'sich konzentrieren': 'concentrarse', erstatten: 'reembolsar', umtauschen: 'cambiar (un producto)', unterstützen: 'apoyar', vertrauen: 'confiar', ablehnen: 'rechazar', zustimmen: 'estar de acuerdo',
  diskutieren: 'discutir, debatir', kritisieren: 'criticar', überzeugen: 'convencer', 'sich einigen': 'ponerse de acuerdo', teilnehmen: 'participar', anbieten: 'ofrecer', abgeben: 'entregar, dejar',
  ausgeben: 'gastar (dinero)', zurückgeben: 'devolver', annehmen: 'aceptar; suponer', zunehmen: 'aumentar, engordar', anziehen: 'ponerse (ropa); atraer', aussteigen: 'bajarse (de un vehículo)',
  einsteigen: 'subirse (a un vehículo)', vorbeikommen: 'pasar por (visitar)', ausgehen: 'salir (a divertirse)', abhängen: 'depender', beschreiben: 'describir'
};
Object.keys(MANUAL).forEach(k => { map[k] = map[k] || MANUAL[k]; });
// correcciones sobre lo que sale del Wortschatz (duplicados o respuestas que no son el significado)
Object.assign(map, { hängen: 'colgar (algo)', lernen: 'aprender', dürfen: 'poder, tener permiso', verlassen: 'dejar, abandonar', können: 'poder, saber hacer' });
const miss = lem.filter(l => !map[l]);
if (miss.length) { console.error('SIN SIGNIFICADO:', miss.join(' ')); process.exit(1); }
const out = {}; lem.forEach(l => { out[l] = String(map[l]).normalize('NFC'); });
fs.writeFileSync(path.join(root, 'ui', 'verbos-es.json'), JSON.stringify({ version: 1, verbos: out }, null, 1) + '\n');
console.log('verbos-es.json:', lem.length);
