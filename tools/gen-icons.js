// Genera los iconos PNG de la PWA desde ui/icon.svg y ui/icon-maskable.svg (necesita Playwright del sistema; los PNG se versionan).
// Uso: NODE_PATH=$(npm root -g) node tools/gen-icons.js
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const root = path.join(__dirname, '..'), out = path.join(root, 'dist', 'icons');
fs.mkdirSync(out, { recursive: true });
const JOBS = [['icon.svg', 'icon-192.png', 192], ['icon.svg', 'icon-512.png', 512], ['icon-maskable.svg', 'maskable-512.png', 512], ['icon.svg', 'apple-touch-icon.png', 180]];
(async () => {
  const b = await chromium.launch();
  for (const [svg, png, n] of JOBS) {
    const p = await b.newPage({ viewport: { width: n, height: n }, deviceScaleFactor: 1 });
    const text = fs.readFileSync(path.join(root, 'ui', svg), 'utf8');
    await p.setContent('<style>html,body{margin:0;background:transparent}svg{display:block;width:' + n + 'px;height:' + n + 'px}</style>' + text);
    await p.screenshot({ path: path.join(out, png), omitBackground: true, clip: { x: 0, y: 0, width: n, height: n } });
    await p.close(); console.log(png, n + '×' + n);
  }
  fs.copyFileSync(path.join(root, 'ui', 'icon.svg'), path.join(out, 'icon.svg'));
  await b.close();
})();
