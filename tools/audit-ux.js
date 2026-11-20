// Auditoría de UX/accesibilidad en Chromium real a 390×844 (claro y oscuro): desborde horizontal, objetivos táctiles, nombres accesibles, etiquetas de campos,
// contraste de texto (WCAG AA 4,5:1) y capturas. Uso: NODE_PATH=$(npm root -g) node tools/audit-ux.js [carpeta de capturas]
const path = require('path'), { chromium } = require('playwright');
const out = process.argv[2] || path.join(__dirname, '..', 'docs', 'capturas', 'audit');
const file = 'file://' + path.join(__dirname, '..', 'dist', 'deutschraum-gym.html');
const findings = [];
const lum = c => { const [r, g, b] = c.map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
async function inspect(p, name, scheme) {
  const r = await p.evaluate(() => {
    const parse = s => { const m = /rgba?\(([^)]+)\)/.exec(s); if (!m) return null; const v = m[1].split(',').map(x => parseFloat(x)); return { rgb: v.slice(0, 3), a: v.length > 3 ? v[3] : 1 }; };
    const bgOf = el => { let e = el; while (e) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c.a > 0.9) return c.rgb; e = e.parentElement; } return [255, 255, 255]; };
    const vis = el => { const b = el.getBoundingClientRect(), cs = getComputedStyle(el); return b.width > 0 && b.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none'; };
    const small = [], noname = [], contrast = [], nolabel = [];
    document.querySelectorAll('button, a[href], [role=button], input, select, textarea, summary').forEach(el => {
      if (!vis(el) || el.disabled) return; const b = el.getBoundingClientRect();
      if (el.tagName !== 'INPUT' || el.type !== 'file') { if (b.height < 44 || b.width < 44) small.push((el.id ? '#' + el.id : el.className || el.tagName).toString().slice(0, 40) + ' ' + Math.round(b.width) + '×' + Math.round(b.height) + ' «' + (el.textContent || '').trim().slice(0, 20) + '»'); }
      const nm = (el.getAttribute('aria-label') || el.textContent || el.getAttribute('title') || '').trim();
      if (!nm && !(el.labels && el.labels.length)) noname.push((el.id || el.className || el.tagName).toString().slice(0, 40));
      if (el.tagName === 'INPUT' && el.type !== 'file' && !(el.getAttribute('aria-label') || (el.labels && el.labels.length))) nolabel.push(el.id);
    });
    const seen = new Set();
    document.querySelectorAll('p, span, div, strong, li, label, button, summary, h1, h2, h3').forEach(el => {
      if (!vis(el) || !el.childNodes.length || ![...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) return;
      const cs = getComputedStyle(el), fg = parse(cs.color); if (!fg) return; const bg = bgOf(el), key = cs.color + bg + cs.fontSize + (el.className || '');
      if (seen.has(key)) return; seen.add(key); contrast.push({ cls: (el.className || el.tagName).toString().slice(0, 30), txt: el.textContent.trim().slice(0, 24), fg: fg.rgb, bg, size: parseFloat(cs.fontSize), bold: parseInt(cs.fontWeight) >= 700 });
    });
    return { overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth, small, noname, nolabel, contrast, tiny: [...document.querySelectorAll('body *')].filter(e => vis(e) && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 12).map(e => (e.className || e.tagName).toString().slice(0, 30) + ' ' + getComputedStyle(e).fontSize).slice(0, 6) };
  });
  if (r.overflow) findings.push([name + ' ' + scheme, 'DESBORDE horizontal']);
  r.small.forEach(s => findings.push([name + ' ' + scheme, 'objetivo táctil <44px: ' + s]));
  r.noname.forEach(s => findings.push([name + ' ' + scheme, 'sin nombre accesible: ' + s]));
  r.nolabel.forEach(s => findings.push([name + ' ' + scheme, 'campo sin etiqueta: #' + s]));
  r.tiny.forEach(s => findings.push([name + ' ' + scheme, 'texto <12px: ' + s]));
  r.contrast.forEach(c => { const k = ratio(c.fg, c.bg), need = (c.size >= 24 || (c.size >= 18.66 && c.bold)) ? 3 : 4.5; if (k < need) findings.push([name + ' ' + scheme, 'contraste ' + k.toFixed(2) + ' < ' + need + ' · ' + c.cls + ' «' + c.txt + '» ' + c.size + 'px']); });
}
(async () => {
  const b = await chromium.launch();
  for (const scheme of ['light', 'dark']) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: scheme, hasTouch: true, isMobile: true });
    const p = await ctx.newPage(); await p.addInitScript(() => { try { localStorage.setItem('dg.ui', JSON.stringify({ auto: false, sprechen: true })); } catch (e) {} });
    const errs = []; p.on('pageerror', e => errs.push(String(e)));
    await p.goto(file); await p.waitForSelector('.hero');
    const step = async (name, fn) => { if (fn) await fn(); await p.waitForTimeout(250); await inspect(p, name, scheme); await p.screenshot({ path: path.join(out, scheme + '-' + name + '.png') }); };
    await step('01-inicio');
    await p.evaluate(() => { document.querySelector('.main').scrollTop = 99999; }); await step('02-inicio-abajo');
    await p.evaluate(() => { document.querySelector('.main').scrollTop = 0; });
    await p.click('[data-level="B1"]'); await step('03-nivel-b1');
    await p.click('.card[data-module="verben"]'); await step('04-verben');
    await p.locator('.dock .btn.ghost', { hasText: 'No sé' }).click(); await step('05-verben-fallo');
    await p.click('#next'); await p.click('[aria-label="Terminar sesión"]'); await step('06-resumen'); await p.click('.dock .btn.secondary');
    await p.click('#palabras'); await step('07-mis-palabras');
    await p.fill('#mw-de', 'der Hund'); await p.fill('#mw-es', 'el perro'); await p.click('#mw-add'); await step('08-mis-palabras-con-una');
    await p.click('[aria-label="Volver"]'); await p.click('#frases'); await step('09-mis-frases'); await p.click('[aria-label="Volver"]');
    await p.click('#consulta'); await step('10-consulta'); await p.click('[data-group="cl"]'); await step('11-biblioteca'); await p.click('[aria-label="Volver"]');
    await p.click('[aria-label="Ajustes"]'); await step('12-ajustes'); await p.evaluate(() => { document.querySelector('.main').scrollTop = 99999; }); await step('13-ajustes-abajo');
    if (errs.length) findings.push([scheme, 'ERRORES DE PÁGINA: ' + errs.join('; ')]);
    await ctx.close();
  }
  await b.close();
  const uniq = new Map(); findings.forEach(f => { const k = f[1]; if (!uniq.has(k)) uniq.set(k, f); });
  console.log('hallazgos únicos:', uniq.size); [...uniq.values()].forEach(f => console.log(' -', f[0] + ': ' + f[1]));
})().catch(e => { console.error(e); process.exit(1); });
