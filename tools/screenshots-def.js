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
    if (spec.kind === 'ending') { const right = item.answer.slice(spec.stem.length) || '(vacío)'; await p.locator('.options [data-end="' + right + '"]').click(); return; }
    if (spec.kind === 'pair') { await p.locator('[data-pair="wo"][data-opt="' + item.wo.answer + '"]').click(); await p.locator('[data-pair="wohin"][data-opt="' + item.wohin.answer + '"]').click(); return check(); }
    if (spec.kind === 'tiles') {
      const T = item.tiles.slice(), rec = (rem, used) => { if (rem === '') return []; for (let i = 0; i < T.length; i++) { if (used.has(i) || !rem.startsWith(T[i])) continue; const r = rec(rem.slice(T[i].length).replace(/^ /, ''), new Set(used).add(i)); if (r) return [T[i]].concat(r); } return null; };
      for (const t of rec(item.accept[0], new Set())) await p.locator('.bank .tile:not([disabled])', { hasText: new RegExp('^' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$') }).first().click(); return check();
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
  if (block === 'E') {
    const ayer = (() => { const d = new Date(Date.now() - 864e5), q = n => (n < 10 ? '0' : '') + n; return d.getFullYear() + '-' + q(d.getMonth() + 1) + '-' + q(d.getDate()); })();
    let { p, ctx } = await page('light', { auto: false, size: 10, ret: { streak: 2, best: 2, last: ayer, perdon: null, badges: { primera: ayer } } });
    await p.click('.card[data-module="deklination"]');
    for (let i = 0; (await screen(p)) === 'session' && i < 60; i++) { await solve(p, i % 3 !== 0); await p.click('#next'); }
    await shot(p, '01-resumen-racha-logro');
    await p.evaluate(() => { document.querySelector('.main').scrollTop = 520; }); await shot(p, '02-resumen-que-fallo-y-por-que');
    await p.locator('[data-rule]').first().click(); await shot(p, '03-resumen-ver-regla'); await p.keyboard.press('Escape');
    await p.click('.dock .btn.secondary'); await shot(p, '04-inicio-chip-racha');
    await p.click('#emap'); await shot(p, '05-mapa-de-errores');
    await p.locator('.erow').first().click(); await shot(p, '06-mapa-hoja-del-tipo'); await p.keyboard.press('Escape');
    await p.click('[aria-label="Volver"]'); await p.click('[aria-label="Ajustes"]'); await p.evaluate(() => { document.querySelector('.main').scrollTop = 400; }); await shot(p, '07-ajustes-logros');
    await ctx.close();
    ({ p, ctx } = await page('dark', { auto: false, size: 10 }));
    await p.click('.card[data-module="artikel"]');
    for (let i = 0; (await screen(p)) === 'session' && i < 60; i++) { await solve(p, i % 4 !== 0); await p.click('#next'); }
    await shot(p, '08-oscuro-resumen');
    await ctx.close();
  }
  if (block === 'F') {
    const voz = () => { window.SpeechSynthesisUtterance = function (t) { this.text = t; }; Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: { cancel() {}, speak() {}, getVoices() { return [{ lang: 'de-DE', name: 'Deutsch (Deutschland)' }]; } } }); };
    let { p, ctx } = await page('light', { auto: true, size: 10 }, voz);
    await p.click('[aria-label="Ajustes"]'); await shot(p, '01-ajustes-arriba');
    await p.evaluate(() => { document.querySelector('.main').scrollTop = 700; }); await shot(p, '02-ajustes-voz-tema');
    await p.evaluate(() => { document.querySelector('.main').scrollTop = 99999; }); await shot(p, '03-ajustes-logros');
    await p.click('[aria-label="Volver"]'); await p.click('.card[data-module="artikel"]');
    for (let i = 0; i < 30; i++) { const c = await cur(p); if (c.item.skill === 'genero') break; await solve(p, true); await p.click('#next'); }
    await solve(p, false); await shot(p, '04-boton-escuchar-tras-fallar');
    await ctx.close();
    ({ p, ctx } = await page('dark', { auto: false, size: 10 }));
    await p.click('[aria-label="Ajustes"]'); await p.evaluate(() => { document.querySelector('.main').scrollTop = 700; }); await shot(p, '05-oscuro-ajustes-sin-voz');
    await ctx.close();
  }
  if (block === 'G') {
    let { p, ctx } = await page('light', { auto: false, size: 30 });
    await shot(p, '01-inicio-5-modulos');
    await p.click('.card[data-module="praepositionen"]');
    if (await until(p, c => c.spec.kind === 'pair')) { await shot(p, '02-praepositionen-par-minimo'); await solve(p, false); await shot(p, '03-praepositionen-fallo'); }
    await home(p); await p.click('.card[data-module="konnektoren"]');
    if (await until(p, c => c.spec.kind === 'tiles')) { await shot(p, '04-konnektoren-fichas'); await p.locator('.bank .tile:not([disabled])').first().click(); await shot(p, '05-konnektoren-ficha-tocada'); }
    await home(p); await p.evaluate(() => { document.querySelector('.main').scrollTop = 99999; }); await p.click('#consulta'); await shot(p, '06-consulta');
    await p.locator('.erow').nth(3).click(); await shot(p, '07-consulta-regla'); await p.keyboard.press('Escape');
    await p.click('[aria-label="Volver"]'); await p.click('[aria-label="Ajustes"]'); await p.evaluate(() => { document.querySelector('.main').scrollTop = 900; }); await shot(p, '08-ajustes-copia-de-seguridad');
    await ctx.close();
  }
  if (block === 'H') {
    const setTags = (p, st) => p.evaluate(v => { DGUI.engine.store.all.filter(i => i.module === 'deklination').forEach(i => { DGUI.engine.state().tags[i.errorTag] = Object.assign({}, v); }); }, st);
    const hasT = c => c.item.module === 'deklination' && ['kasus-article', 'adjektivendung-weak', 'adjektivendung-strong', 'kasus-possessive_article'].includes(c.item.skill);
    for (const [name, st, scheme] of [['01-completa', { n: 0, f: 0 }, 'light'], ['02-media-tabla', { n: 4, f: 1 }, 'light'], ['03-sin-tabla-dominado', { n: 10, f: 0 }, 'dark']]) {
      const { p, ctx } = await page(scheme, { auto: false, size: 30 });
      await setTags(p, st); await p.click('.card[data-module="deklination"]');
      if (await until(p, hasT)) {
        await shot(p, name);
        if (name.startsWith('03')) { await solve(p, false); await shot(p, '04-fallo-cadena-y-casilla'); await p.evaluate(() => { document.querySelector('.main').scrollTop = 420; }); await shot(p, '05-fallo-tabla-marcada'); }
      }
      await ctx.close();
    }
  }
  if (block === 'I') {
    const setTagsM = (p, mod, st) => p.evaluate(a => { DGUI.engine.store.all.filter(i => i.module === a.mod).forEach(i => { DGUI.engine.state().tags[i.errorTag] = Object.assign({}, a.st); }); }, { mod, st });
    for (const [name, mod, st, kind, scheme] of [['01-ayuda-opciones-verbo', 'verben', { n: 0, f: 0 }, 'choice', 'light'], ['02-media-terminacion-plural', 'artikel', { n: 8, f: 1 }, 'ending', 'light'], ['03-media-terminacion-verbo', 'verben', { n: 8, f: 1 }, 'ending', 'dark'], ['04-dominado-letras-verbo', 'verben', { n: 30, f: 0 }, 'letters', 'light']]) {
      const { p, ctx } = await page(scheme, { auto: false, size: 30 });
      await setTagsM(p, mod, st); await p.click('.card[data-module="' + mod + '"]');
      if (await until(p, c => c.spec.kind === kind && (kind !== 'choice' || c.item.skill === 'praesens') && (mod !== 'artikel' || c.item.skill === 'plural'))) {
        await shot(p, name);
        if (kind === 'ending') { await solve(p, false); await shot(p, name.replace(/^0(\d)/, '0$1b')); }
      }
      await ctx.close();
    }
    const { p, ctx } = await page('light', { auto: false, size: 10 });
    await p.click('[aria-label="Ajustes"]'); await p.evaluate(() => { document.querySelector('.main').scrollTop = 520; }); await shot(p, '05-ajustes-ayuda-que-se-retira'); await ctx.close();
  }
  await b.close();
})().catch(e => { console.error(e); process.exit(1); });
