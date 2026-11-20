/* PWA: salida del build (manifest, iconos, sw.js con caché versionada, rutas relativas para GitHub Pages) y comportamiento del
 * service worker simulado (instalación, activación, caché primero, sin red). La prueba real en Chromium es tools/check-pwa.js. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path'), vm = require('vm'), crypto = require('crypto');
const { build } = require('../tools/build.js');
build();
const root = path.join(__dirname, '..'), dist = path.join(root, 'dist');
const R = f => fs.readFileSync(path.join(dist, f));

test('build PWA: index.html = deutschraum-gym.html (mismos bytes), con manifest, iconos y rutas RELATIVAS (GitHub Pages sirve en subruta)', () => {
  assert.ok(R('index.html').equals(R('deutschraum-gym.html')));
  const html = R('index.html').toString('utf8');
  assert.match(html, /<link rel="manifest" href="manifest\.webmanifest">/); assert.match(html, /rel="apple-touch-icon" href="icons\/apple-touch-icon\.png"/); assert.match(html, /name="theme-color"/);
  assert.ok(!/(href|src)="\/[^\/]/.test(html), 'rutas absolutas rompen la subruta /deutschraum-gym/');
  assert.ok(!/<script[^>]+src=|<link[^>]+href="https?:/.test(html), 'sin recursos externos');
  assert.match(html, /serviceWorker/); assert.match(html, /register\('sw\.js'\)/);
});

test('manifest: instalable (standalone, nombre, iconos 192/512/maskable, start_url y scope relativos, colores)', () => {
  const m = JSON.parse(R('manifest.webmanifest').toString('utf8'));
  assert.equal(m.display, 'standalone'); assert.equal(m.start_url, './'); assert.equal(m.scope, './'); assert.equal(m.lang, 'es');
  assert.ok(m.name && m.short_name.length <= 12, m.short_name); assert.match(m.theme_color, /^#[0-9a-f]{6}$/i); assert.match(m.background_color, /^#[0-9a-f]{6}$/i);
  const sizes = m.icons.map(i => i.sizes + ':' + i.purpose).sort(); assert.deepEqual(sizes, ['192x192:any', '512x512:any', '512x512:maskable']);
  m.icons.forEach(i => { assert.ok(!i.src.startsWith('/'), 'icono relativo'); assert.ok(fs.existsSync(path.join(dist, i.src)), i.src); });
});

test('iconos PNG: dimensiones reales (cabecera IHDR) y firma PNG', () => {
  const dim = f => { const b = R('icons/' + f); assert.equal(b.slice(0, 8).toString('hex'), '89504e470d0a1a0a', f); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
  assert.deepEqual(dim('icon-192.png'), [192, 192]); assert.deepEqual(dim('icon-512.png'), [512, 512]); assert.deepEqual(dim('maskable-512.png'), [512, 512]); assert.deepEqual(dim('apple-touch-icon.png'), [180, 180]);
  assert.ok(R('icons/icon.svg').toString().includes('<svg'));
});

test('sw.js: caché versionada por el hash del HTML, todos los archivos precacheados existen y la sintaxis es válida', () => {
  const sw = R('sw.js').toString('utf8'), hash = crypto.createHash('sha256').update(R('index.html')).digest('hex').slice(0, 10);
  assert.match(sw, new RegExp("var CACHE = 'dg-" + hash + "'"));
  new vm.Script(sw);
  const assets = JSON.parse(/var ASSETS = (\[.*?\]);/s.exec(sw)[1]);
  assets.forEach(a => { if (a === './') return; assert.ok(fs.existsSync(path.join(dist, a)), a + ' no existe'); });
  assert.ok(assets.includes('./index.html') && assets.includes('./manifest.webmanifest'));
  assert.ok(!/localStorage\s*[.\[]|indexedDB|sessionStorage/.test(sw), 'el service worker nunca toca los datos del usuario');   // (el comentario sí nombra localStorage)
});

// ---- el service worker, simulado ----
function loadSW(opts) {
  opts = opts || {};
  const store = opts.caches || new Map(), listeners = {}, log = { fetched: [], addAll: null, claimed: false, skipped: false };
  const mkCache = name => { if (!store.has(name)) store.set(name, new Map()); const m = store.get(name); return {
    addAll: async urls => { log.addAll = urls; urls.forEach(u => m.set(new URL(u, 'https://x.test/app/').href, { url: u, body: 'cached:' + u, ok: true, clone() { return this; } })); },
    put: async (req, res) => { m.set(req.url, res); }, match: async req => m.get(typeof req === 'string' ? new URL(req, 'https://x.test/app/').href : req.url) }; };
  const cachesMock = { open: async n => mkCache(n), keys: async () => Array.from(store.keys()), delete: async k => store.delete(k),
    match: async (req, o) => { const m = store.get(o.cacheName); if (!m) return undefined; return m.get(typeof req === 'string' ? new URL(req, 'https://x.test/app/').href : req.url); } };
  const self = { location: { origin: 'https://x.test' }, addEventListener: (t, f) => { listeners[t] = f; }, skipWaiting: () => { log.skipped = true; return Promise.resolve(); }, clients: { claim: () => { log.claimed = true; return Promise.resolve(); } } };
  const fetchMock = async req => { log.fetched.push(req.url); if (opts.offline) throw new Error('offline'); return { ok: true, url: req.url, body: 'net:' + req.url, clone() { return this; } }; };
  const sandbox = { self, caches: cachesMock, fetch: fetchMock, URL, Promise };
  vm.runInNewContext(R('sw.js').toString('utf8'), sandbox);
  const fire = (type, ev) => { let p; ev.waitUntil = x => { p = x; }; ev.respondWith = x => { p = x; ev.responded = true; }; listeners[type](ev); return p; };
  return { store, log, fire, CACHE: sandbox.CACHE };
}

test('sw: install precachea el app shell y activa de inmediato; activate borra SÓLO las cachés dg- antiguas', async () => {
  const old = new Map([['dg-vieja', new Map()], ['otra-app', new Map()]]); const sw = loadSW({ caches: old });
  await sw.fire('install', {}); assert.ok(sw.log.addAll.includes('./index.html') && sw.log.skipped);
  await sw.fire('activate', {}); assert.deepEqual(Array.from(sw.store.keys()).sort(), [sw.CACHE, 'otra-app'].sort()); assert.ok(sw.log.claimed);
});

test('sw: SIN RED una navegación recibe el shell cacheado; un recurso cacheado sale de la caché y no toca la red', async () => {
  const sw = loadSW({ offline: true }); await sw.fire('install', {});
  const nav = await sw.fire('fetch', { request: { method: 'GET', mode: 'navigate', url: 'https://x.test/app/?x=1' } });
  assert.equal(nav.body, 'cached:./index.html', 'navegación → shell');
  const asset = await sw.fire('fetch', { request: { method: 'GET', mode: 'no-cors', url: 'https://x.test/app/icons/icon-192.png' } });
  assert.equal(asset.body, 'cached:./icons/icon-192.png'); assert.deepEqual(sw.log.fetched, [], 'no se usó la red');
});

test('sw: no interfiere con POST ni con otros orígenes; un recurso nuevo se pide a la red y se guarda', async () => {
  const sw = loadSW(); await sw.fire('install', {});
  assert.equal(sw.fire('fetch', { request: { method: 'POST', mode: 'cors', url: 'https://x.test/app/x' } }), undefined);
  assert.equal(sw.fire('fetch', { request: { method: 'GET', mode: 'cors', url: 'https://otro.test/lib.js' } }), undefined);
  const res = await sw.fire('fetch', { request: { method: 'GET', mode: 'no-cors', url: 'https://x.test/app/nuevo.json' } });
  assert.equal(res.body, 'net:https://x.test/app/nuevo.json'); assert.deepEqual(sw.log.fetched, ['https://x.test/app/nuevo.json']);
  await new Promise(r => setTimeout(r, 10)); assert.ok(sw.store.get(sw.CACHE).has('https://x.test/app/nuevo.json'), 'quedó en la caché');
});

test('publicación: .nojekyll, index.html de la raíz redirige a dist/ y el workflow es manual; PUBLICAR.md existe', () => {
  assert.ok(fs.existsSync(path.join(root, '.nojekyll')));
  const idx = fs.readFileSync(path.join(root, 'index.html'), 'utf8'); assert.match(idx, /url=dist\//); assert.match(idx, /location\.replace\('dist\/'/);
  const wf = fs.readFileSync(path.join(root, '.github', 'workflows', 'pages.yml'), 'utf8'); assert.match(wf, /workflow_dispatch/); assert.ok(!/^\s*push:/m.test(wf), 'manual: sin disparo en push'); assert.match(wf, /path: dist/);
  assert.match(fs.readFileSync(path.join(root, 'docs', 'PUBLICAR.md'), 'utf8'), /Instalar app/);
});
