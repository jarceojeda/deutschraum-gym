// Capturas del bloque C (variantes por toque) a 390×844. Uso: NODE_PATH=$(npm root -g) node tools/screenshots-c.js [carpeta]
const path = require('path');
const out = process.argv[2] || path.join(__dirname, '..', 'docs', 'capturas', 'C');
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const file = 'file://' + path.join(__dirname, '..', 'dist', 'deutschraum-gym.html');
  async function page(scheme, prefs) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: scheme, hasTouch: true, isMobile: true });
    const p = await ctx.newPage();
    await p.addInitScript(v => { try { localStorage.setItem('dg.ui', JSON.stringify(v)); } catch (e) {} }, prefs || { auto: false, size: 30 });
    await p.goto(file); return { p, ctx };
  }
  const shot = async (p, n) => { await p.waitForTimeout(350); return p.screenshot({ path: path.join(out, n + '.png') }); };
  const cur = p => p.evaluate(() => ({ item: DGUI.app.state.cur.item, spec: DGUI.app.state.cur.spec, view: DGUI.app.state.cur.view }));
  async function solve(p, ok) {
    const { item, spec } = await cur(p);
    const check = () => p.locator('.dock .btn.primary').click();
    if (!ok) return p.locator('.dock .btn.ghost', { hasText: 'No sé' }).click();
    if (spec.kind === 'choice') return p.locator('.options .opt[data-opt="' + item.answer.replace(/"/g, '\\"') + '"]').click();
    if (spec.kind === 'match') { for (const r of spec.rows) { await p.locator('[data-row="' + r.key + '"]').click(); await p.locator('.bank .tile:not([disabled])', { hasText: new RegExp('^' + r.expected + '$') }).first().click(); } return check(); }
    if (spec.kind === 'blocks') {
      const rec = (rem, used) => { if (!rem) return []; for (const bl of spec.blocks) { if (used.has(bl.id)) continue; const hit = spec.joiner ? (rem === bl.t || rem.startsWith(bl.t + ' ')) : rem.startsWith(bl.t); if (!hit) continue; const r = rec(spec.joiner ? rem.slice(bl.t.length + (rem === bl.t ? 0 : 1)) : rem.slice(bl.t.length), new Set(used).add(bl.id)); if (r) return [bl].concat(r); } return null; };
      for (const bl of rec(item.answer, new Set())) await p.locator('.bank .tile:not([disabled])[data-block="' + bl.t + '"]').first().click(); return check();
    }
    if (spec.kind === 'text') { await p.fill('#answer', item.answer); return check(); }
    for (const c of Array.from(item.answer)) await p.locator('.bank .tile:not([disabled])', { hasText: c === ' ' ? '␣' : c }).first().click(); return check();
  }
  async function until(p, test, max = 80) {
    for (let i = 0; i < max; i++) { if ((await p.evaluate(() => DGUI.app.state.screen)) !== 'session') return false; const c = await cur(p); if (test(c)) return true; await solve(p, true); await p.click('#next'); }
    return false;
  }
  const home = async p => {
    if ((await p.evaluate(() => DGUI.app.state.screen)) === 'session') await p.click('[aria-label="Terminar sesión"]');
    if ((await p.evaluate(() => DGUI.app.state.screen)) === 'summary') await p.click('.dock .btn.secondary');
  };
  let { p, ctx } = await page('light');
  await p.click('.card[data-module="verben"]');
  for (const k of ['choice', 'blocks', 'match']) {
    if (await until(p, c => c.spec.kind === k && c.item.skill === 'praesens')) {
      await shot(p, '01-verben-' + k);
      if (k === 'blocks') { await p.locator('.bank .tile:not([disabled])').first().click(); await shot(p, '01-verben-blocks-tocado'); }
      if (k === 'match') {
        const { spec } = await cur(p);
        for (const r of spec.rows.slice(0, 3)) { await p.locator('[data-row="' + r.key + '"]').click(); await p.locator('.bank .tile:not([disabled])', { hasText: new RegExp('^' + r.expected + '$') }).first().click(); }
        await shot(p, '01-verben-match-a-medias');
        await p.locator('.dock .btn.ghost', { hasText: 'No sé' }).click(); await shot(p, '02-match-resultado');
        await p.click('#next');
      } else { await solve(p, true); await shot(p, '02-acierto-' + k); await p.click('#next'); }
    }
  }
  if (await until(p, c => c.item.skill === 'partizip-ii', 200)) await shot(p, '03-partizip-ii');
  await home(p);
  await p.click('.card[data-module="artikel"]');
  if (await until(p, c => c.item.skill === 'plural')) await shot(p, '04-artikel-plural');
  if (await until(p, c => c.item.skill === 'genero')) await shot(p, '05-artikel-genero');
  await home(p);
  await p.click('.card[data-module="deklination"]');
  if (await until(p, c => c.item.type === 'transform')) await shot(p, '06-deklination-transform');
  await solve(p, true); await shot(p, '07-deklination-acierto-caso');
  await ctx.close();
  ({ p, ctx } = await page('light', { auto: true, size: 10, entry: 'write' }));
  await p.click('.card[data-module="verben"]'); await shot(p, '08-escribir');
  await p.click('[data-key="ä"]'); await shot(p, '08b-escribir-umlaut');
  await ctx.close();
  ({ p, ctx } = await page('dark', { auto: true, size: 10 }));
  await p.click('.card[data-module="verben"]');
  await solve(p, true); await shot(p, '09-oscuro-avance-automatico');
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, btns: Array.from(document.querySelectorAll('button:not([disabled])')).map(x => x.getBoundingClientRect()).filter(x => x.height > 0).map(x => Math.min(x.height, 999)).sort((a, b) => a - b).slice(0, 3) }));
  console.log('desborde horizontal:', r.sw > r.cw, 'botones más bajos (px):', r.btns.join(', '));
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
