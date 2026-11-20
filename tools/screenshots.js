// Capturas del HTML final en viewport de teléfono (390×844). Uso: node tools/screenshots.js [carpeta]  (requiere playwright instalado en el sistema)
const path = require('path');
const out = process.argv[2] || path.join(__dirname, '..', 'docs', 'capturas');
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const file = 'file://' + path.join(__dirname, '..', 'dist', 'deutschraum-gym.html');
  async function page(scheme) {
    const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: scheme, hasTouch: true, isMobile: true });
    const p = await ctx.newPage(); await p.goto(file); return { p, ctx };
  }
  const shot = async (p, n) => { await p.waitForTimeout(350); return p.screenshot({ path: path.join(out, n + '.png') }); };
  // Responde usando la interfaz (la API de estado de la UI sólo sirve para saber cuál es la respuesta).
  const ans = async (p, ok) => {
    const { item, view } = await p.evaluate(() => ({ item: DGUI.app.state.cur.item, view: DGUI.app.state.cur.view }));
    if (view.input === 'choice') {
      for (const e of await p.$$('.options .opt')) if (((await e.getAttribute('data-opt')) === item.answer) === ok) { await e.click(); return; }
    } else if (ok) {
      for (const c of Array.from(item.answer)) await p.locator('.bank .tile:not([disabled])', { hasText: c === ' ' ? '␣' : c }).first().click();
      await p.locator('.dock .btn.primary').click();
    } else {
      await p.locator('.bank .tile:not([disabled])').first().click();
      await p.locator('.dock .btn.primary').click();
    }
  };
  const toGenero = async p => {
    for (let i = 0; i < 25; i++) {
      if ((await p.evaluate(() => DGUI.app.state.cur.view.skill)) === 'genero') return;
      await ans(p, true); await p.click('#next');
    }
  };
  let { p, ctx } = await page('light');
  await shot(p, '01-inicio');
  await p.evaluate(() => { document.querySelector('.main').scrollTop = 99999; }); await shot(p, '01b-inicio-modulos');
  await p.evaluate(() => { document.querySelector('.main').scrollTop = 0; });
  await p.click('[data-size="30"]'); await p.click('[data-level="A1"]'); await p.click('#mix'); await shot(p, '01c-viaje-combinado');
  await p.click('[aria-label="Terminar sesión"]'); await p.click('[data-level="B1"]');
  for (const m of ['verben', 'artikel', 'deklination']) {
    await p.click('[data-size="30"]'); await p.click('.card[data-module="' + m + '"]');
    if (m === 'artikel') await toGenero(p);
    await shot(p, '02-sesion-' + m);
    await ans(p, false); await shot(p, '03-error-' + m);
    if (m === 'verben') { await p.click('#rule'); await shot(p, '04-regla-verben'); await p.keyboard.press('Escape'); }
    await p.click('#next'); await p.click('[aria-label="Terminar sesión"]'); await p.click('.dock .btn.secondary');
  }
  await p.click('[data-size="10"]'); await p.click('.card[data-module="verben"]');
  for (let i = 0; (await p.evaluate(() => DGUI.app.state.screen)) === 'session' && i < 60; i++) { await ans(p, i % 3 !== 0); await p.click('#next'); }
  await shot(p, '05-resumen'); await ctx.close();
  ({ p, ctx } = await page('dark'));
  await p.click('[data-size="30"]'); await p.click('.card[data-module="artikel"]');
  await toGenero(p);
  await shot(p, '06-oscuro-artikel'); await ans(p, false); await shot(p, '07-oscuro-error');
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, minBtn: Math.min(...Array.from(document.querySelectorAll('.dock .btn')).map(x => x.getBoundingClientRect().height)) }));
  console.log('desborde horizontal:', r.sw > r.cw, r);
  await b.close();
})();
