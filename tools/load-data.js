// Carga los JSON de contenido (etapa 1 bis) desde ./data. Sólo para tests/simulación (Node).
const fs = require('fs'), path = require('path');
const MODS = ['verben', 'artikel', 'deklination', 'praepositionen', 'konnektoren'];
function loadAll(dir) {
  dir = dir || process.env.DG_DATA || path.join(__dirname, '..', 'data');
  const data = [];
  MODS.forEach(m => { JSON.parse(fs.readFileSync(path.join(dir, m + '.json'), 'utf8')).forEach(x => data.push(x)); });
  const concepts = JSON.parse(fs.readFileSync(path.join(dir, 'concepts.json'), 'utf8'));
  return { data, concepts };
}
module.exports = { loadAll, MODS };
