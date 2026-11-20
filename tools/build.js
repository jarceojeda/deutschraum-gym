// Arma UN solo HTML autocontenido: CSS + motor (dist/dg-engine.bundle.js) + JS de la UI + datos de verben/artikel/deklination + concepts.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const UI_ORDER = ['dgui-util', 'dgui-fmt', 'dgui-rules', 'dgui-retention', 'dgui-voice', 'dgui-variants', 'dgui-inputs', 'dgui-app', 'dgui-boot'];
const MODULES = ['verben', 'artikel', 'deklination'];
const rd = f => fs.readFileSync(path.join(root, f), 'utf8');
// Dentro de <script> no puede aparecer «</script» ni «<!--»: se escapan con < (JSON y JS siguen siendo válidos).
const safe = s => s.replace(/<(\/script|!--)/gi, '\\u003c$1');
function build() {
  require('./bundle.js');          // el HTML siempre lleva el motor al día
  const data = [].concat(...MODULES.map(m => JSON.parse(rd('data/' + m + '.json'))));
  const concepts = JSON.parse(rd('data/concepts.json'));
  const ui = 'window.DGUI = window.DGUI || {};\n' + UI_ORDER.map(n => '/* ===== ' + n + '.js ===== */\n' + rd('ui/' + n + '.js')).join('\n');
  const html = rd('ui/index.html')
    .replace('/*__CSS__*/', () => rd('ui/style.css'))
    .replace('/*__DATA__*/', () => safe(JSON.stringify(data)))
    .replace('/*__CONCEPTS__*/', () => safe(JSON.stringify(concepts)))
    .replace('/*__REGLAS__*/', () => safe(JSON.stringify(JSON.parse(rd('ui/reglas.json')))))
    .replace('/*__ENGINE__*/', () => safe(rd('dist/dg-engine.bundle.js')))
    .replace('/*__UI__*/', () => safe(ui));
  const out = path.join(root, 'dist', 'deutschraum-gym.html');
  fs.writeFileSync(out, html);
  console.log('build:', out, fs.statSync(out).size, 'bytes,', data.length, 'ítems');
  return out;
}
if (require.main === module) build();
module.exports = { build };
