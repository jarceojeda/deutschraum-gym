// Arma UN solo HTML autocontenido (CSS + motor + JS de la UI + datos de los 7 módulos + concepts + reglas/tablas/sufijos) y la PWA:
//   dist/deutschraum-gym.html  (para abrir como archivo)  y  dist/index.html  (mismos bytes: es la página de la PWA)
//   dist/manifest.webmanifest, dist/sw.js (caché versionada por el hash del HTML) y dist/icons/ (PNG versionados; ver tools/gen-icons.js).
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const root = path.join(__dirname, '..');
const UI_ORDER = ['dgui-util', 'dgui-fmt', 'dgui-rules', 'dgui-retention', 'dgui-tablas', 'dgui-sufijos', 'dgui-voice', 'dgui-variants', 'dgui-inputs', 'dgui-pwa', 'dgui-app', 'dgui-boot'];
const MODULES = ['verben', 'artikel', 'deklination', 'praepositionen', 'konnektoren', 'wortschatz', 'satzbau'];
const rd = f => fs.readFileSync(path.join(root, f), 'utf8');
// Dentro de <script> no puede aparecer «</script» ni «<!--»: se escapan con < (JSON y JS siguen siendo válidos).
const safe = s => s.replace(/<(\/script|!--)/gi, '\\u003c$1');
function build() {
  require('./bundle.js');          // el HTML siempre lleva el motor al día
  const data = [].concat(...MODULES.concat(['gramatica']).map(m => JSON.parse(rd('data/' + m + '.json'))));
  const concepts = JSON.parse(rd('data/concepts.json'));
  const ui = 'window.DGUI = window.DGUI || {};\n' + UI_ORDER.map(n => '/* ===== ' + n + '.js ===== */\n' + rd('ui/' + n + '.js')).join('\n');
  const html = rd('ui/index.html')
    .replace('/*__CSS__*/', () => rd('ui/style.css'))
    .replace('/*__DATA__*/', () => safe(JSON.stringify(data)))
    .replace('/*__CONCEPTS__*/', () => safe(JSON.stringify(concepts)))
    .replace('/*__REGLAS__*/', () => safe(JSON.stringify(JSON.parse(rd('ui/reglas.json')))))
    .replace('/*__TABLAS__*/', () => safe(JSON.stringify(JSON.parse(rd('ui/tablas.json')))))
    .replace('/*__SUFIJOS__*/', () => safe(JSON.stringify(JSON.parse(rd('ui/sufijos.json')))))
    .replace('/*__ENGINE__*/', () => safe(rd('dist/dg-engine.bundle.js')))
    .replace('/*__UI__*/', () => safe(ui));
  const out = path.join(root, 'dist', 'deutschraum-gym.html');
  fs.writeFileSync(out, html);
  // PWA: mismo HTML como index.html (git lo guarda una sola vez), manifest y service worker con caché versionada
  fs.writeFileSync(path.join(root, 'dist', 'index.html'), html);
  fs.copyFileSync(path.join(root, 'ui', 'manifest.webmanifest'), path.join(root, 'dist', 'manifest.webmanifest'));
  const version = crypto.createHash('sha256').update(html).digest('hex').slice(0, 10);
  const assets = ['./', './index.html', './manifest.webmanifest', './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png'];
  fs.writeFileSync(path.join(root, 'dist', 'sw.js'), rd('ui/sw.template.js').replace('__CACHE__', 'dg-' + version).replace('__ASSETS__', JSON.stringify(assets)));
  console.log('build:', out, fs.statSync(out).size, 'bytes,', data.length, 'ítems · PWA: dist/index.html, sw.js (dg-' + version + '), manifest, icons');
  return out;
}
if (require.main === module) build();
module.exports = { build };
