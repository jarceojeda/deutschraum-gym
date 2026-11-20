// Comprobación REAL de la PWA en Chromium: sirve dist/ por http en localhost (con y sin subruta, como GitHub Pages), registra el service worker,
// verifica caché, instalabilidad (manifest) y que la app arranca y guarda progreso SIN RED.
// Uso: NODE_PATH=$(npm root -g) node tools/check-pwa.js     (herramienta de desarrollo; no forma parte de npm test)
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const dist = path.join(__dirname, '..', 'dist');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.svg': 'image/svg+xml' };
function serve(prefix) {
  return new Promise(res => {
    const srv = http.createServer((req, rs) => {
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (!p.startsWith(prefix)) { rs.writeHead(404); return rs.end('no'); }
      p = p.slice(prefix.length); if (p === '' || p.endsWith('/')) p += 'index.html';
      const f = path.join(dist, p);
      if (!f.startsWith(dist) || !fs.existsSync(f)) { rs.writeHead(404); return rs.end('no'); }
      rs.writeHead(200, { 'content-type': MIME[path.extname(f)] || 'application/octet-stream', 'cache-control': 'no-cache' }); fs.createReadStream(f).pipe(rs);
    }).listen(0, '127.0.0.1', () => res({ srv, port: srv.address().port }));
  });
}
let fails = 0; const ok = (c, m) => { console.log((c ? '  ✔ ' : '  ✖ ') + m); if (!c) fails++; };

(async () => {
  const b = await chromium.launch();
  for (const prefix of ['/', '/deutschraum-gym/dist/']) {
    console.log('\n== servido en ' + prefix);
    const { srv, port } = await serve(prefix), base = 'http://127.0.0.1:' + port + prefix;
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, serviceWorkers: 'allow' });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e)));
    await p.goto(base); await p.waitForSelector('.hero');
    const swState = await p.evaluate(async () => { const r = await navigator.serviceWorker.ready; return { scope: r.scope, active: !!r.active, ctl: !!navigator.serviceWorker.controller }; });
    ok(swState.active && swState.scope === base, 'service worker activo con el alcance ' + swState.scope);
    const cached = await p.evaluate(async () => { const ks = await caches.keys(); const c = await caches.open(ks[0]); const reqs = await c.keys(); return { ks, urls: reqs.map(r => new URL(r.url).pathname) }; });
    ok(cached.ks.length === 1 && /^dg-/.test(cached.ks[0]), 'una caché versionada: ' + cached.ks.join());
    ok(['index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png'].every(f => cached.urls.some(u => u.endsWith('/' + f))), 'app shell precacheado (' + cached.urls.length + ' archivos)');
    const man = await p.evaluate(async () => { const r = await fetch(document.querySelector('link[rel=manifest]').href); return r.json(); });
    ok(man.display === 'standalone' && man.icons.length === 3 && man.start_url === './', 'manifest válido (standalone, 3 iconos, start_url relativo)');
    const cdp = await ctx.newCDPSession(p); const inst = await cdp.send('Page.getInstallabilityErrors').catch(() => ({ installabilityErrors: ['no disponible'] }));
    ok(inst.installabilityErrors.length === 0, 'instalable según Chromium: ' + (inst.installabilityErrors.map(e => e.errorId || e).join() || 'sin errores'));
    // progreso sin red
    await p.reload(); await p.waitForSelector('.hero');
    await p.click('.card[data-module="artikel"]'); await p.waitForSelector('.qcard');
    const key = await p.evaluate(() => { const it = DGUI.app.state.cur.item; return it.id; });
    await p.locator('.dock .btn.ghost', { hasText: 'No sé' }).click(); await p.waitForSelector('.fb.bad');
    const antes = await p.evaluate(() => JSON.parse(localStorage.getItem('dg.progress')).sessionCounter);
    await ctx.setOffline(true);
    await p.reload(); await p.waitForSelector('.hero');
    ok(true, 'recarga SIN RED: la app arranca desde la caché');
    const despues = await p.evaluate(() => { const j = JSON.parse(localStorage.getItem('dg.progress')); return { n: j.sessionCounter, err: Object.keys(j.errors).length }; });
    ok(despues.n === antes && despues.err >= 1, 'el progreso guardado sigue ahí (sesiones ' + despues.n + ', errores ' + despues.err + ')');
    await p.click('.card[data-module="verben"]'); await p.waitForSelector('.qcard');
    ok(true, 'se puede empezar una sesión sin red');
    await p.screenshot({ path: path.join(__dirname, '..', 'docs', 'capturas', 'pwa-sin-red.png') });
    ok(errs.length === 0, 'sin errores de página' + (errs.length ? ': ' + errs[0] : ''));
    await ctx.close(); srv.close();
  }
  await b.close();
  console.log(fails ? '\n' + fails + ' comprobaciones fallidas' : '\nPWA OK');
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
