// Capturas 390×844 de los bloques D, E y F. Uso: NODE_PATH=$(npm root -g) node tools/screenshots-def.js D|E|F [carpeta]
const path = require('path');
const block = (process.argv[2] || 'D').toUpperCase();
const out = process.argv[3] || path.join(__dirname, '..', 'docs', 'capturas', block);
const { chromium } = require('playwright');
const reglas = require('../ui/reglas.json').reglas;
(async () => {
  const b = await chromium.launch();
  const file = 'file://' + path.join(__dirname, '..', 'dist', 'deutschraum-gym.html');
  async function page(scheme, prefs, init) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: scheme, hasTouch: true, isMobile: true });
    const p = await ctx.newPage();
    await p.addInitScript(v => { try { localStorage.setItem('dg.ui', JSON.stringify(v)); } catch (e) {} }, prefs || { auto: false, size: 30 });
    if (init) await p.addInitScript(init);
    await p.goto(file); return { p, ctx };
  }
  const shot = async (p, n) => { await p.waitForTimeout(350); return p.screenshot({ path: path.join(out, n + '.png') }); };
  const cur = p => p.evaluate(() => ({ item: DGUI.app.state.cur.item, spec: DGUI.app.state.cur.spec }));
  async function solve(p, ok) {
    const { item, spec } = await cur(p), check = () => p.locator('.dock .btn.primary').click();
    if (!ok) return p.locator('.dock .btn.ghost', { hasText: 'No sé' }).click();
    if (spec.kind === 'choice') return p.locator('.options .opt[data-opt="' + item.answer.replace(/"/g, '\\"') + '"]').click();
    if (spec.kind === 'match') { for (const r of spec.rows) { await p.locator('[data-row="' + r.key + '"]').click(); await p.locator('.bank .tile:not([disabled])', { hasText: new RegExp('^' + r.expected + '$') }).first().click(); } return check(); }
    if (spec.kind === 'blocks') {
      const rec = (rem, used) => { if (!rem) return []; for (const bl of spec.blocks) { if (used.has(bl.id)) continue; const hit = spec.joiner ? (rem === bl.t || rem.startsWith(bl.t + ' ')) : rem.startsWith(bl.t); if (!hit) continue; const r = rec(spec.joiner ? rem.slice(bl.t.length + (rem === bl.t ? 0 : 1)) : rem.slice(bl.t.length), new Set(used).add(bl.id)); if (r) return [bl].concat(r); } return null; };
      for (const bl of rec(item.answer, new Set())) await p.locator('.bank .tile:not([disabled])[data-block="' + bl.t + '"]').first().click(); return check();
    }
    for (const c of Array.from(item.answer)) await p.locator('.bank .tile:not([disabled])', { hasText: c === ' ' ? '␣' : c }).first().click(); return check();
  }
  const screen = p => p.evaluate(() => DGUI.app.state.screen);
  async function until(p, test, max = 80) {
    for (let i = 0; i < max; i++) { if ((await screen(p)) !== 'session') return false; const c = await cur(p); if (test(c)) return true; await solve(p, true); await p.click('#next'); }
    return false;
  }
  const hasRule = c => (c.item.conceptIds || []).some(id => reglas[id]);
  const home = async p => { if ((await screen(p)) === 'session') await p.click('[aria-label="Terminar sesión"]'); if ((await screen(p)) === 'summary') await p.click('.dock .btn.secondary'); };

  if (block === 'D') {
    let { p, ctx } = await page('light');
    await p.click('.card[data-module="deklination"]');
    if (await until(p, hasRule)) { await shot(p, '01-regla-visible-al-principio'); await solve(p, false); await shot(p, '02-capsula-tras-fallar'); await p.click('#rule'); await shot(p, '03-ver-regla-panel'); await p.keyboard.press('Escape'); }
    await ctx.close();
    ({ p, ctx } = await page('light', { auto: false, size: 30, ruleFirst: false }));
    await p.click('.card[data-module="deklination"]');
    if (await until(p, hasRule)) { await shot(p, '04-por-que-cerrado'); await p.click('#why'); await shot(p, '05-por-que-abierto'); }
    await ctx.close();
    ({ p, ctx } = await page('dark', { auto: false, size: 30 }));
    await p.click('.card[data-module="verben"]');
    if (await until(p, hasRule)) { await solve(p, false); await shot(p, '06-oscuro-capsula-verbo'); }
    await ctx.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
