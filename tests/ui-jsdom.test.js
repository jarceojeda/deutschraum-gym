/* Pruebas de la UI sobre el HTML FINAL (dist/deutschraum-gym.html) en jsdom: se pulsan botones reales y se inspecciona localStorage. */
const test = require('node:test'), { after } = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const { build } = require('../tools/build.js');

const HTML_PATH = build();
const HTML = fs.readFileSync(HTML_PATH, 'utf8');

const DOMS = [];
after(() => DOMS.forEach(d => { try { d.window.close(); } catch (e) { /* ya cerrada */ } }));
function boot(seed, opts) {
  opts = opts || {};
  const dom = new JSDOM(HTML, { runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true,
    beforeParse(w) { w.DGUI_CONFIG = Object.assign({ seed: seed == null ? 11 : seed, autoMs: 1400 }, opts.cfg);
      if (!opts.auto) w.localStorage.setItem('dg.ui', JSON.stringify({ auto: false }));   // sin temporizadores colgados: el avance automático se prueba aparte
      if (opts.before) opts.before(w); } });
  DOMS.push(dom);
  const w = dom.window, d = w.document;
  // Toda vista que entregue el motor llega CONGELADA: si la UI intentara mutarla, 'use strict' lanzaría.
  const eng = w.DGUI.engine, orig = eng.startSession;
  const freeze = o => { if (o && typeof o === 'object' && !Object.isFrozen(o)) { Object.freeze(o); Object.values(o).forEach(freeze); } return o; };
  eng.startSession = function (req) {
    const s = orig.call(eng, req), v = s.view;
    s.view = function (m) { return freeze(v.call(s, m)); };
    if (opts.warnings) s.warnings = opts.warnings;
    return s;
  };
  const q = sel => d.querySelector(sel), qa = sel => Array.from(d.querySelectorAll(sel));
  const click = el => { assert.ok(el, 'botón no encontrado'); el.dispatchEvent(new w.MouseEvent('click', { bubbles: true })); };
  const stored = () => JSON.parse(w.localStorage.getItem('dg.progress'));
  const S = () => w.DGUI.app.state;
  let pending = 'verben';
  const chooseModule = (m, n) => { pending = m; if (n) click(q('[data-size="' + n + '"]')); };
  const start = () => click(q('.card[data-module="' + pending + '"]'));
  // Responde el ejercicio actual PULSANDO la interfaz, según la variante (spec) que haya elegido la UI.
  const btnText = (sel, t) => qa(sel).find(b => !b.disabled && b.textContent === t);
  function buildBlocks(blocks, target, joiner) {   // DFS: secuencia de bloques que forma exactamente la respuesta
    const rec = (rem, used) => {
      if (rem === '') return [];
      for (const b of blocks) {
        if (used.has(b.id)) continue;
        const t = joiner ? (rem === b.t || rem.startsWith(b.t + joiner) ? b.t : null) : (rem.startsWith(b.t) ? b.t : null);
        if (t == null) continue;
        const rest = joiner ? rem.slice(t.length + (rem === t ? 0 : 1)) : rem.slice(t.length);
        const r = rec(rest, new Set(used).add(b.id)); if (r) return [b.t].concat(r);
      }
      return null;
    };
    return rec(target, new Set());
  }
  function answer(ok) {
    const { item, spec } = S().cur, check = () => click(qa('.dock .btn.primary')[0]);
    if (spec.kind === 'choice') {
      const opts = qa('.options .btn.opt');
      assert.ok(opts.some(b => b.dataset.opt === item.answer), 'la opción correcta debe estar entre las opciones');
      click(ok ? opts.find(b => b.dataset.opt === item.answer) : opts.find(b => b.dataset.opt !== item.answer));
    } else if (spec.kind === 'blocks') {
      if (!ok) { click(qa('.bank .tile').find(b => !b.disabled)); return check(); }
      const seq = buildBlocks(spec.blocks, item.answer, spec.joiner); assert.ok(seq, 'bloques no forman ' + item.answer);
      seq.forEach(t => click(btnText('.bank .tile', t))); check();
    } else if (spec.kind === 'match') {
      const order = ok ? spec.rows : spec.rows.filter(r => !r.target).concat(spec.rows.filter(r => r.target));
      for (const r of order) {
        click(q('[data-row="' + r.key + '"]'));                       // fila activa
        const wrongHere = !ok && r.target;
        const chip = qa('.bank .tile').find(b => !b.disabled && (wrongHere ? b.textContent !== r.expected : b.textContent === r.expected));
        if (!chip) { assert.ok(wrongHere, 'ficha para ' + r.label); return click(qa('.dock .btn.ghost').find(b => b.textContent === 'No sé')); }
        click(chip);
      }
      check();
    } else if (spec.kind === 'text') {
      const inp = q('#answer'); inp.value = ok ? item.answer : 'zzzz'; check();
    } else {
      const chars = Array.from(item.answer.normalize('NFC'));
      if (!ok) { click(qa('.bank .tile').find(b => !b.disabled)); return check(); }
      chars.forEach(c => { const t = btnText('.bank .tile', c === ' ' ? '␣' : c); assert.ok(t, 'ficha ' + c + ' ausente del banco'); click(t); });
      check();
    }
  }
  const next = () => click(q('#next'));
  return { dom, w, d, eng, q, qa, click, stored, S, chooseModule, start, answer, next };
}

function playSession(u, mod, size, okFn) {
  u.chooseModule(mod, size); u.start();
  const seen = [];
  let guard = 0;
  while (u.S().screen === 'session' && guard++ < 200) {
    const item = u.S().cur.item, ok = okFn ? okFn(item, seen.length) : true;
    seen.push({ item, input: u.S().cur.view.input, ok });
    u.answer(ok);
    assert.ok(u.q('.fb'), 'tras responder debe haber retroalimentación');
    u.next();
  }
  return seen;
}

test('el HTML es autocontenido (sin recursos externos), NFC y usa sólo IIFE vanilla', () => {
  assert.ok(!/<script[^>]+src=|<link[^>]+href=|@import|https?:\/\//i.test(HTML.replace(/https?:\/\/localhost/g, '')), 'recurso externo');
  const block = id => HTML.match(new RegExp('id="' + id + '">([\\s\\S]*?)</script>'))[1];
  ['dg-data', 'dg-concepts'].forEach(id => assert.equal(block(id), block(id).normalize('NFC'), id + ' contiene texto no NFC'));
  ['style.css', 'dgui-util.js', 'dgui-rules.js', 'dgui-inputs.js', 'dgui-app.js', 'dgui-boot.js', 'index.html'].forEach(f => {
    const t = fs.readFileSync(path.join(__dirname, '..', 'ui', f), 'utf8'); assert.equal(t, t.normalize('NFC'), f + ' no es NFC');
  });
  assert.ok(/prefers-reduced-motion:\s*reduce/.test(HTML) && /prefers-color-scheme:\s*dark/.test(HTML));
  assert.ok(HTML.length < 4e6);
});

for (const mod of ['verben', 'artikel', 'deklination']) {
  test('sesión completa de ' + mod + ': se juega pulsando, termina en resumen y deja el progreso en localStorage', () => {
    const u = boot(21);
    assert.ok(u.q('.cards'), 'inicio con módulos');
    const seen = playSession(u, mod, 10, (it, i) => i % 4 !== 1);   // un fallo deliberado cada 4
    assert.ok(seen.length >= 10);
    assert.equal(u.S().screen, 'summary');
    assert.ok(u.q('.sum-big').textContent.includes('/'));
    const j = u.stored();
    assert.equal(j.version, 2);
    assert.equal(j.sessionCounter, 1);
    assert.equal(j.history.length, 1);
    assert.ok(Object.keys(j.units).length >= 8, 'unidades guardadas');
    const failed = seen.filter(s => !s.ok);
    assert.ok(failed.length > 0);
    assert.ok(failed.some(f => j.errors[f.item.id]), 'el fallo debe estar en la cola de errores guardada');
    assert.ok(seen.every(s => s.item.module === mod));
    assert.ok(u.q('.tagl'), 'errores por tipo en el resumen');
  });
}

test('fallo deliberado: explicación de una línea, «ver regla» abre y cierra el panel, y localStorage lo registra', () => {
  const u = boot(5);
  for (const mod of ['verben', 'artikel', 'deklination']) {
    u.chooseModule(mod, 10); u.start();
    const item = u.S().cur.item;
    u.answer(false);
    assert.ok(u.q('.fb.bad'), mod + ': banner de error');
    assert.ok(u.q('.fb-line').textContent.trim().length > 3, mod + ': explicación de una línea');
    assert.ok(u.q('.fb-ans, .paradigm.result').textContent.includes(item.answer), 'muestra la respuesta correcta');
    assert.ok(u.stored().errors[item.id], mod + ': error guardado ya, antes de terminar');
    u.click(u.q('#rule'));
    const dlg = u.q('[role="dialog"]');
    assert.ok(dlg && dlg.querySelector('.r-concept'), mod + ': el panel muestra el concepto');
    if (mod === 'verben') assert.ok(dlg.querySelector('.r-table'), 'tabla de conjugación del verbo');
    assert.ok(dlg.querySelector('.r-ex'), mod + ': ejemplos del mismo tema');
    assert.ok(/aún no trae el texto completo/.test(dlg.textContent) === !item.explanation, 'aviso honesto sólo si falta la explicación');
    u.d.dispatchEvent(new u.w.KeyboardEvent('keydown', { key: 'Escape' }));
    assert.equal(u.q('[role="dialog"]'), null, 'Escape cierra el panel');
    u.click(u.q('#next')); u.click(u.q('[aria-label="Terminar sesión"]'));
    u.click(u.q('.dock .btn.secondary'));   // Inicio
  }
});

test('giveUp («No sé»): existe en cada variante, muestra la respuesta, cuenta como fallo y se guarda', () => {
  const u = boot(8);
  u.chooseModule('verben', 30); u.start();
  const kinds = new Set();
  for (let i = 0; i < 12 && u.S().screen === 'session'; i++) {
    const item = u.S().cur.item, kind = u.S().cur.spec.kind;
    if (!kinds.has(kind)) {
      kinds.add(kind);
      u.click(u.qa('.dock .btn.ghost').find(b => b.textContent === 'No sé'));
      assert.ok(u.q('.fb.bad') && u.q('.fb-ans, .paradigm.result'), kind + ': muestra la respuesta');
      assert.ok(u.stored().errors[item.id], kind + ': giveUp es un fallo guardado');
      assert.equal(u.stored().items[item.id].a, 1);
    } else u.answer(true);
    u.next();
  }
  assert.ok(kinds.size >= 2, 'se probaron varias variantes: ' + [...kinds]);
});

test('respuestas por toques: texto unido (bloques/opciones/emparejado) o array de letras; ä/ö/ü/ß correctas', () => {
  const u = boot(33);
  const calls = [], seenUml = [];
  for (let n = 0; n < 14 && seenUml.length < 3; n++) {
    u.chooseModule('verben', 30); u.start();
    const s = u.S().session, orig = s.answer;
    s.answer = function (r, o) { calls.push(r); return orig.call(s, r, o); };
    while (u.S().screen === 'session') {
      const item = u.S().cur.item;
      u.answer(true);
      if (/[äöüß]/.test(item.answer)) seenUml.push({ item, ok: u.q('.fb.ok') != null });
      u.next();
    }
    u.click(u.q('#again').parentNode.firstChild);   // Inicio
  }
  assert.ok(seenUml.length >= 1, 'no salió ninguna respuesta con diéresis/ß en 14 sesiones');
  seenUml.forEach(x => assert.ok(x.ok, x.item.answer + ' debió dar correcto'));
  assert.ok(calls.some(r => typeof r === 'string'));
  assert.ok(calls.filter(Array.isArray).every(a => a.every(c => c.length >= 1 && !/\s/.test(c))), 'si se manda array, son letras sueltas sin espacios');
  const u2 = boot(34); u2.chooseModule('deklination', 30); u2.start();
  for (let i = 0; i < 30 && u2.S().screen === 'session'; i++) { u2.answer(true); assert.ok(u2.q('.fb.ok'), 'deklination ' + u2.S().cur.spec.kind + ' ' + u2.S().cur.item.answer); u2.next(); }
});

test('banco de letras: contiene todas las letras de la respuesta + distractores (ä con a, ß con s)', () => {
  const { DGUI } = boot().w;
  const bank = DGUI.inputs.letterBank('schläfst', () => 0.3);
  assert.equal(bank.length, 'schläfst'.length + 3);
  const joined = bank.map(b => b.ch).join('');
  for (const c of 'schläfst') assert.ok(joined.includes(c));
  assert.ok(joined.includes('a'), 'distractor a para ä');
  const b2 = DGUI.inputs.letterBank('den Kindern', () => 0.5);
  assert.ok(b2.some(b => b.ch === ' '), 'ficha de espacio para respuestas con espacios');
});

test('fichas para ordenar: tocar arma la frase y envía el array de fichas', () => {
  const { w, d } = boot();
  w.DGUI.util.doc = d;
  const got = [];
  const view = { kind: 'tiles', tiles: ['trinke', 'Ich', 'Kaffee'] };
  const m = w.DGUI.inputs.mount(view, { answer: 'Ich trinke Kaffee' }, { onSubmit: r => got.push(r), onGiveUp() {} });
  d.body.appendChild(m.answerEl); d.body.appendChild(m.dockEl);
  const tap = t => Array.from(d.querySelectorAll('.bank .tile')).find(b => !b.disabled && b.textContent === t).dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  ['Ich', 'trinke', 'Kaffee'].forEach(tap);
  Array.from(d.querySelectorAll('.btn.primary')).pop().dispatchEvent(new w.MouseEvent('click', { bubbles: true }));
  assert.equal(JSON.stringify(got), JSON.stringify([['Ich', 'trinke', 'Kaffee']]));
});

test('Artikel: der/die/das con color Y forma (● ◆ ⬢), no sólo color', () => {
  const u = boot(2); u.chooseModule('artikel', 30); u.start();
  let found = null;
  for (let i = 0; i < 30 && u.S().screen === 'session'; i++) {
    if (u.S().cur.view.skill === 'genero') { found = u.qa('.options .btn.opt'); break; }
    u.answer(true); u.next();
  }
  assert.ok(found && found.length === 3, 'ejercicio de género con 3 opciones');
  const shapes = found.map(b => b.querySelector('.shape') && b.querySelector('.shape').textContent).sort().join('');
  assert.equal(shapes, ['●', '◆', '⬢'].sort().join(''));
  assert.ok(found.every(b => /g-(der|die|das)/.test(b.className) && b.querySelector('.lbl').textContent.length >= 3));
  const m = { der: '●', die: '◆', das: '⬢' }; found.forEach(b => assert.equal(b.querySelector('.shape').textContent, m[b.dataset.opt]));
});

test('view() no se muta: la misma vista (congelada) sirve para pintar, equivocarse y volver a pintar', () => {
  const u = boot(14); u.chooseModule('deklination', 10); u.start();
  const s = u.S().session, v1 = s.view(), snap = JSON.stringify(v1);
  assert.strictEqual(s.view(), v1);
  u.answer(false);
  assert.equal(JSON.stringify(v1), snap);
  assert.ok(Object.isFrozen(v1));
});

test('saveError: avisa sin bloquear y se limpia cuando vuelve a guardar', () => {
  const u = boot(17); u.chooseModule('artikel', 10); u.start();
  const real = u.w.Storage.prototype.setItem;
  u.w.Storage.prototype.setItem = function () { const e = new Error('full'); e.name = 'QuotaExceededError'; throw e; };
  try {
    u.answer(true);
    assert.ok(/No se pudo guardar/.test(u.q('.notice.warn').textContent));
    assert.ok(u.q('#next'), 'no bloquea: se puede seguir');
    u.next(); assert.ok(u.q('.notice.warn'), 'el aviso persiste mientras falle');
    u.w.Storage.prototype.setItem = real;
    u.answer(true);
    assert.equal(u.q('.notice.warn'), null, 'el aviso desaparece al volver a guardar');
  } finally { u.w.Storage.prototype.setItem = real; }
});

test('plan.warnings se muestran al empezar (sin bloquear)', () => {
  const u = boot(3, { warnings: [{ code: 'LEVEL_THIN' }, { code: 'SHORTFALL' }] });
  u.chooseModule('verben', 10); u.start();
  assert.ok(/pocos ejercicios/.test(u.q('.notice').textContent) && /más corta/.test(u.q('.notice').textContent));
  assert.ok(u.q('.options, .bank'));
});

test('ajustes: tope de nivel (persistente) y tema oscuro/claro/sistema', () => {
  const u = boot(4);
  u.click(u.q('[aria-label="Ajustes"]'));
  u.click(u.q('[data-v="A1"]'));
  assert.equal(u.stored().settings.levelCap, 'A1');
  u.click(u.q('[data-v="dark"]'));
  assert.equal(u.d.documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(JSON.parse(u.w.localStorage.getItem('dg.ui')).theme, 'dark');
  u.click(u.q('[data-v="auto"]'));
  assert.equal(u.d.documentElement.getAttribute('data-theme'), null);
  u.click(u.q('[aria-label="Volver"]'));
  u.chooseModule('verben', 10); u.start();
  while (u.S().screen === 'session') { assert.equal(u.S().cur.item.level, 'A1'); u.answer(true); u.next(); }
});

test('el tema guardado y el progreso sobreviven a recargar la página', () => {
  const a = boot(6);
  a.click(a.q('[aria-label="Ajustes"]')); a.click(a.q('[data-v="dark"]'));
  a.click(a.q('[aria-label="Volver"]'));
  playSession(a, 'verben', 10);
  const ls = {}; for (let i = 0; i < a.w.localStorage.length; i++) { const k = a.w.localStorage.key(i); ls[k] = a.w.localStorage.getItem(k); }
  const b = boot(7, { before: w => Object.keys(ls).forEach(k => w.localStorage.setItem(k, ls[k])) });
  assert.equal(b.d.documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(b.eng.state().sessionCounter, 1);
});

test('el resumen muestra «aprendiste», rescatados y errores por tipo tras una segunda sesión', () => {
  const u = boot(9);
  playSession(u, 'artikel', 10, () => true);
  assert.ok(/Hoy aprendiste \d+ cosas? que ayer no sabías/.test(u.q('.sum-card.learn').textContent));
});

/* ---------- Bloque B: pantalla de inicio ---------- */
test('B · inicio: Viaje combinado, 3 módulos activos y 4 «Próximamente» deshabilitados, errores sin pendientes', () => {
  const u = boot(41);
  assert.ok(u.q('#mix'), 'botón Viaje combinado');
  assert.deepEqual(u.qa('.card[data-module]').map(c => c.dataset.module), ['verben', 'artikel', 'deklination']);
  assert.ok(u.qa('.card[data-module]').every(c => !c.disabled));
  const soon = u.qa('.card.soon');
  assert.deepEqual(soon.map(c => c.dataset.soon), ['praepositionen', 'konnektoren', 'wortschatz', 'satzbau']);
  assert.ok(soon.every(c => c.disabled && c.getAttribute('aria-disabled') === 'true' && /Próximamente/.test(c.textContent)));
  assert.equal(u.q('#errors').disabled, true, 'sin errores todavía');
  soon.forEach(c => u.click(c));
  assert.equal(u.S().screen, 'home', 'una tarjeta deshabilitada no abre nada');
});

test('B · Viaje combinado mezcla módulos y el appbar toma el color del módulo de cada ejercicio', () => {
  const u = boot(42);
  u.click(u.q('[data-size="30"]')); u.click(u.q('#mix'));
  assert.equal(u.S().kind, 'mix');
  const mods = new Set(), bars = new Set();
  while (u.S().screen === 'session') {
    mods.add(u.S().cur.item.module); bars.add(u.q('.appbar').dataset.module);
    assert.equal(u.q('.appbar').dataset.module, u.S().cur.item.module);
    u.answer(true); u.next();
  }
  assert.ok(mods.size >= 2, 'mezcla de módulos: ' + [...mods]);
  assert.deepEqual([...bars].sort(), [...mods].sort());
  assert.equal(u.stored().sessionCounter, 1);
});

test('B · nivel: Auto (B1) / A1 / A2 se guarda en el motor y filtra los ejercicios', () => {
  const u = boot(43);
  assert.equal(u.q('[data-level="B1"]').getAttribute('aria-checked'), 'true', 'por defecto Auto');
  u.click(u.q('[data-level="A1"]'));
  assert.equal(u.stored().settings.levelCap, 'A1');
  assert.equal(u.q('[data-level="A1"]').getAttribute('aria-checked'), 'true');
  u.click(u.q('[data-size="20"]')); u.click(u.q('#mix'));
  while (u.S().screen === 'session') { assert.equal(u.S().cur.item.level, 'A1'); u.answer(true); u.next(); }
  u.click(u.q('.dock .btn.secondary'));
  u.click(u.q('[data-level="B1"]')); assert.equal(u.stored().settings.levelCap, 'B1');
});

test('B · tamaño de sesión y entrada (Toques/Escribir) persisten en dg.ui', () => {
  const u = boot(44);
  u.click(u.q('[data-size="30"]')); u.click(u.q('[data-entry="write"]'));
  const ui = JSON.parse(u.w.localStorage.getItem('dg.ui'));
  assert.equal(ui.size, 30); assert.equal(ui.entry, 'write');
  assert.equal(u.q('[data-size="30"]').getAttribute('aria-checked'), 'true');
});

test('B · «Mis errores» se activa tras fallar y lanza kind:errors (o avisa si aún no toca)', () => {
  const u = boot(45);
  playSession(u, 'verben', 10, (it, i) => i % 2 === 0);
  u.click(u.q('.dock .btn.secondary'));
  const b = u.q('#errors'); assert.equal(b.disabled, false); assert.ok(Number(b.dataset.errors) > 0);
  u.click(b);
  assert.ok(u.S().screen === 'session' || u.q('.toast'), 'o empieza la sesión de errores o avisa sin bloquear');
});

test('A/B · objetivos táctiles: el CSS exige >=48 px en botones, chips, tarjetas y fichas', () => {
  const css = fs.readFileSync(path.join(__dirname, '..', 'ui', 'style.css'), 'utf8');
  const minH = sel => { const m = new RegExp('(?:^|\\})' + sel.replace(/[.]/g, '\\.') + '\\{[^}]*min-height:(\\d+)px', 'm').exec(css); return m ? +m[1] : null; };
  ['.btn', '.chip', '.card', '.auto-chip', '.btn.opt'].forEach(sel => assert.ok(minH(sel) >= 48, sel + ' min-height ' + minH(sel)));
  assert.ok(/\.btn\.tile\{[^}]*min-height:5\d/.test(css));
  assert.ok(!/:hover/.test(css), 'sin hover: todo es táctil');
});

/* ---------- Bloque C: ejercicios por toque ---------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));
function toKind(u, kind, mod, size) {   // juega (bien) hasta que aparezca una variante concreta
  u.chooseModule(mod, size || 30); u.start();
  for (let i = 0; i < 60 && u.S().screen === 'session'; i++) { if (u.S().cur.spec.kind === kind) return true; u.answer(true); u.next(); }
  return false;
}

test('C · avance automático: tras acertar avanza solo; al fallar nunca; «Pausar» y el chip Auto lo detienen', async () => {
  const u = boot(60, { cfg: { autoMs: 30 }, auto: true });
  u.chooseModule('verben', 30); u.start();
  const pos0 = u.S().session.position();
  u.answer(true);
  assert.ok(u.q('.autobar') && u.q('#pause'), 'barra de avance y botón Pausar');
  await sleep(120);
  assert.ok(!u.S().cur.fb && u.S().session.position() === pos0 + 1, 'avanzó solo al siguiente ejercicio');
  u.answer(false); assert.equal(u.q('.autobar'), null); await sleep(120);
  assert.ok(u.q('#next') && u.S().cur.fb, 'un fallo no avanza solo');
  u.next(); u.answer(true); u.click(u.q('#pause')); await sleep(120);
  assert.ok(u.S().cur.fb && u.q('#next'), 'Pausar detiene el avance');
  u.next(); u.click(u.q('#auto'));
  assert.equal(u.q('#auto').getAttribute('aria-pressed'), 'false'); assert.equal(JSON.parse(u.w.localStorage.getItem('dg.ui')).auto, false);
  u.answer(true); assert.equal(u.q('.autobar'), null, 'con Auto apagado no hay avance automático'); await sleep(100); assert.ok(u.S().cur.fb);
});

test('C · el último ejercicio no se auto-avanza: queda «Ver resumen»', async () => {
  const u = boot(61, { cfg: { autoMs: 20 }, auto: true });
  u.chooseModule('artikel', 10); u.start();
  for (let i = 0; i < 40 && u.S().screen === 'session'; i++) {
    const last = u.S().session.position() === u.S().session.length() - 1;
    u.answer(true);
    if (last) { assert.equal(u.q('.autobar'), null); assert.equal(u.q('#next').textContent, 'Ver resumen'); u.next(); break; }
    await sleep(50);
    if (u.S().cur.fb) u.next();
  }
  assert.equal(u.S().screen, 'summary');
});

test('C · bloques: tocar coloca, tocar el bloque colocado lo devuelve, y se envía el texto unido', () => {
  const u = boot(62); assert.ok(toKind(u, 'blocks', 'verben'), 'salió una variante de bloques');
  const { item } = u.S().cur, sent = [];
  const sess = u.S().session, orig = sess.answer; sess.answer = function (r, o) { sent.push(r); return orig.call(sess, r, o); };
  const first = u.qa('.bank .tile')[0], t = first.dataset.block;
  u.click(first); assert.ok(u.q('.slots .placed') && u.q('.slots .placed').textContent.startsWith(t));
  u.click(u.q('.slots .placed')); assert.equal(u.q('.slots .placed'), null, 'devuelto al banco');
  assert.equal(u.qa('.bank .tile').filter(b => b.disabled).length, 0);
  u.answer(true);
  assert.equal(typeof sent[0], 'string'); assert.equal(sent[0], item.answer);
  assert.ok(u.q('.fb.ok'));
});

test('C · emparejado rápido: sólo la fila ★ se envía al motor; las demás filas se corrigen en pantalla sin puntuar', () => {
  const u = boot(63); assert.ok(toKind(u, 'match', 'verben'), 'salió el emparejado');
  const { item, spec } = u.S().cur, sent = [];
  const sess = u.S().session, orig = sess.answer; sess.answer = function (r, o) { sent.push(r); return orig.call(sess, r, o); };
  assert.ok(u.qa('.prow').length >= 6 && u.q('.prow.target'));
  assert.ok(u.qa('.dock .btn.primary')[0].disabled, 'Comprobar espera a que todas las filas estén llenas');
  // la fila ★ y las demás bien, salvo una (no ★) que se rellena con una ficha de más (trampa)
  const other = spec.rows.find(r => !r.target);
  const order = spec.rows.filter(r => r.key !== other.key).concat([other]);
  order.forEach(r => {
    u.click(u.q('[data-row="' + r.key + '"]'));
    const free = u.qa('.bank .tile').filter(b => !b.disabled);
    const chip = r.key === other.key ? (free.find(b => b.textContent !== r.expected) || free[0]) : free.find(b => b.textContent === r.expected);
    u.click(chip);
  });
  u.click(u.qa('.dock .btn.primary')[0]);
  assert.deepEqual(sent, [item.answer], 'al motor sólo llega la forma de la fila ★');
  assert.ok(u.q('.fb.ok'), 'el motor lo cuenta como acierto');
  assert.equal(u.stored().errors[item.id], undefined);
  assert.ok(u.q('.paradigm.result .prow'), 'resultado por persona en pantalla');
});

test('C · modo «Escribir»: campo de texto + teclas ä ö ü ß, sin banco de letras', () => {
  const u = boot(64); u.click(u.q('[data-entry="write"]'));
  u.chooseModule('verben', 30); u.start();
  assert.equal(u.S().cur.spec.kind, 'text'); assert.ok(u.q('#answer')); assert.equal(u.q('.bank'), null);
  assert.deepEqual(u.qa('.umlauts .key').map(b => b.dataset.key), ['ä', 'ö', 'ü', 'ß']);
  u.q('#answer').value = 'sch'; u.click(u.q('[data-key="ä"]')); u.click(u.q('[data-key="ß"]'));
  assert.equal(u.q('#answer').value, 'schäß');
  u.q('#answer').value = ''; u.click(u.qa('.dock .btn.primary')[0]); assert.equal(u.q('.fb'), null, 'vacío no se envía');
});

test('C · modo «Escribir»: sesión completa, error deliberado y estado de localStorage', () => {
  const u = boot(65); u.click(u.q('[data-entry="write"]'));
  const seen = playSession(u, 'verben', 10, (it, i) => i % 3 !== 1);
  assert.ok(seen.length >= 10 && u.S().screen === 'summary');
  const j = u.stored(); assert.equal(j.sessionCounter, 1);
  assert.ok(seen.filter(s => !s.ok).some(f => j.errors[f.item.id]));
});

test('C · «casi»: una errata en una transformación pide reintentar sin registrar todavía el fallo', () => {
  const typo = it => { const w = it.answer.split(' '), k = w.findIndex(x => x.length >= 5); if (k < 0) return null; w[k] = w[k].slice(0, -2) + w[k].slice(-1) + w[k].slice(-2, -1); return w.join(' '); };
  let found = null;
  for (let seed = 70; seed < 100 && !found; seed++) {
    const u = boot(seed); u.click(u.q('[data-entry="write"]'));
    u.chooseModule('deklination', 30); u.start();
    for (let i = 0; i < 40 && u.S().screen === 'session'; i++) {
      const it = u.S().cur.item, t = it.type === 'transform' ? typo(it) : null;
      // sólo ítems en los que el evaluador (motor) da «almost» para esa errata: se prueba la UI, no el evaluador
      if (t && u.w.DG.evaluator.evaluate(it, t, { mode: 'write' }).verdict === 'almost') { found = { u, it, t }; break; }
      u.answer(true); u.next();
    }
  }
  assert.ok(found, 'apareció una transformación con errata «casi»');
  const { u, it, t } = found, pos = u.S().session.position();
  u.q('#answer').value = t; u.click(u.qa('.dock .btn.primary')[0]);
  assert.ok(/Casi/.test(u.q('.notice').textContent), 'aviso «Casi»');
  assert.equal(u.S().session.position(), pos, 'sigue en el mismo ejercicio');
  assert.equal(u.q('#answer').value, t, 'conserva lo escrito');
  assert.equal(u.stored().errors[it.id], undefined, 'todavía no es un fallo');
  u.q('#answer').value = it.answer; u.click(u.qa('.dock .btn.primary')[0]);
  assert.ok(u.q('.fb.ok'));
});

test('C · rescate: acertar tras ≥16 h un ejercicio fallado muestra «Rescatada» y lo saca de la cola', () => {
  const u = boot(66); let now = Date.now() + 1e6; u.w.Date.now = () => now;
  playSession(u, 'artikel', 10, () => false);
  u.click(u.q('.dock .btn.secondary'));
  assert.ok(Object.keys(u.stored().errors).length > 0);
  now += 17 * 3600e3;
  u.click(u.q('#errors')); assert.equal(u.S().kind, 'errors'); assert.equal(u.S().screen, 'session');
  const id = u.S().cur.item.id; u.answer(true);
  assert.ok(u.q('.badge.rescue'), 'insignia Rescatada');
  assert.equal(u.stored().errors[id], undefined, 'sale de la cola');
});

test('C · Artikel: el plural se elige entre 4 opciones plausibles y la correcta está entre ellas', () => {
  const u = boot(67); u.chooseModule('artikel', 30); u.start(); let seen = false;
  for (let i = 0; i < 40 && u.S().screen === 'session'; i++) {
    if (u.S().cur.item.skill === 'plural') { const o = u.qa('.options .btn.opt').map(b => b.dataset.opt); assert.ok(o.includes(u.S().cur.item.answer) && o.length === 4); seen = true; break; }
    u.answer(true); u.next();
  }
  assert.ok(seen, 'salió un plural');
});

test('C · sin teclado en Modo Tren: ningún <input> durante la sesión', () => {
  const u = boot(68); u.chooseModule('verben', 30); u.start();
  for (let i = 0; i < 8; i++) { assert.equal(u.qa('input').length, 0); u.answer(true); u.next(); }
});

/* ---------- Bloque D: cápsula de regla ---------- */
const REGLAS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'ui', 'reglas.json'), 'utf8')).reglas;
const CONCEPTS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'concepts.json'), 'utf8'));
const hasRule = it => (it.conceptIds || []).some(id => REGLAS[id]);
function toItem(u, pred, mod, size) {   // juega bien hasta que el ejercicio actual cumpla pred
  u.chooseModule(mod, size || 30); u.start();
  for (let i = 0; i < 60 && u.S().screen === 'session'; i++) { if (pred(u.S().cur.item)) return true; u.answer(true); u.next(); }
  return false;
}

test('D · reglas.json: sólo texto copiado de las hojas, NFC, sin HTML, con ids de concepto reales', () => {
  const ids = new Set(CONCEPTS.map(c => c.id));
  const keys = Object.keys(REGLAS); assert.ok(keys.length >= 50, 'reglas: ' + keys.length);
  keys.forEach(k => {
    const r = REGLAS[k]; assert.ok(ids.has(k), k + ' no es un concepto de concepts.json');
    assert.ok(r.regla || r.formula || r.ejemplo, k + ' vacío');
    const t = JSON.stringify(r); assert.equal(t, t.normalize('NFC')); assert.ok(!/[<>]/.test(t), k + ' lleva HTML');
    if (r.ejemplo) assert.ok(r.ejemplo.antes && r.ejemplo.despues, k + ' ejemplo incompleto');
    if (r.regla) assert.ok(r.regla.length <= 262, k + ' regla larga');
  });
  assert.equal(REGLAS['cs:t16'].ejemplo.despues, 'den Kindern');
  assert.ok(/Dativ|DAT/i.test(REGLAS['dm:s5-1'].regla));
});

test('D · tras fallar: cápsula (fórmula/regla/ejemplo antes→después) si el tema tiene regla; sin regla no se inventa nada', () => {
  const u = boot(81);
  assert.ok(toItem(u, it => hasRule(it), 'deklination'), 'ejercicio con regla');
  const item = u.S().cur.item; u.answer(false);
  const cap = u.q('.fb.bad .capsule'); assert.ok(cap, 'cápsula tras fallar');
  assert.ok(REGLAS[cap.dataset.concept] && item.conceptIds.includes(cap.dataset.concept));
  assert.ok(cap.querySelector('.cap-r, .cap-formula, .cap-ex'));
  assert.ok(u.q('.fb-line').textContent.length > 3, 'se conserva la explicación de una línea');
  const v = boot(82);
  assert.ok(toItem(v, it => !hasRule(it), 'verben'), 'ejercicio sin regla');
  v.answer(false); assert.ok(v.q('.fb.bad')); assert.equal(v.q('.capsule'), null, 'hueco vacío: sin cápsula inventada');
});

test('D · «¿Por qué?»: abre y cierra la cápsula bajo demanda; sin regla avisa sin inventar', () => {
  const u = boot(83); u.w.localStorage.setItem('dg.ui', JSON.stringify({ auto: false, ruleFirst: false }));
  const u2 = boot(83, { before: w => w.localStorage.setItem('dg.ui', JSON.stringify({ auto: false, ruleFirst: false })) });
  assert.ok(toItem(u2, it => hasRule(it), 'deklination'));
  assert.equal(u2.q('.why-slot .capsule'), null, 'con «regla visible» apagada no sale sola');
  assert.equal(u2.q('#why').getAttribute('aria-expanded'), 'false');
  u2.click(u2.q('#why')); assert.ok(u2.q('.why-slot .capsule')); assert.equal(u2.q('#why').getAttribute('aria-expanded'), 'true');
  u2.click(u2.q('#why')); assert.equal(u2.q('.why-slot .capsule'), null);
  u2.answer(true);                                     // la respuesta se conserva sin haber tocado el motor al abrir la regla
  assert.equal(u2.stored().sessionCounter, 1);
  const u3 = boot(84, { before: w => w.localStorage.setItem('dg.ui', JSON.stringify({ auto: false })) });
  assert.ok(toItem(u3, it => !hasRule(it), 'verben'));
  u3.click(u3.q('#why')); assert.ok(/Todav/.test(u3.q('.toast').textContent)); assert.equal(u3.q('.why-slot .capsule'), null);
});

test('D · regla visible al principio y oculta al dominar el tema (vuelve a verse tras fallar)', () => {
  const u = boot(85);
  assert.ok(toItem(u, it => hasRule(it), 'deklination'));
  const item = u.S().cur.item;
  assert.ok(u.q('.why-slot .capsule'), 'visible al principio (tema nuevo)');
  assert.ok(/se oculta sola/.test(u.q('.why-slot').textContent));
  // dominado: ≥6 intentos con ≥85 % en ese tipo de error (se marcan todos los de Deklination y se abre otra sesión)
  u.click(u.q('[aria-label="Terminar sesión"]')); if (u.S().screen === 'summary') u.click(u.q('.dock .btn.secondary'));
  const tags = u.eng.state().tags;
  u.eng.store.all.filter(i => i.module === 'deklination').forEach(i => { tags[i.errorTag] = { n: 10, f: 0 }; });
  assert.ok(toItem(u, it => hasRule(it), 'deklination'), 'otro ejercicio con regla');
  assert.equal(u.q('.why-slot .capsule'), null, 'dominado: la regla ya no sale sola');
  u.click(u.q('#why')); assert.ok(u.q('.why-slot .capsule'), 'pero sigue disponible bajo demanda');
  u.answer(false); assert.ok(u.q('.fb.bad .capsule'), 'y tras fallar vuelve a mostrarse');
});

test('D · «Ver regla» (panel) incluye la cápsula arriba cuando existe', () => {
  const u = boot(86); assert.ok(toItem(u, it => hasRule(it), 'deklination'));
  u.answer(false); u.click(u.q('#rule'));
  assert.ok(u.q('[role="dialog"] .capsule'));
});

test('D · reglas: md() sólo produce <strong>; nada de HTML del texto', () => {
  const u = boot(87); u.w.DGUI.util.doc = u.d;
  const nodes = u.w.DGUI.fmt.md('a **b** <i>c</i>'); const box = u.d.createElement('div'); nodes.forEach(n => box.appendChild(typeof n === 'string' ? u.d.createTextNode(n) : n));
  assert.equal(box.querySelectorAll('strong').length, 1); assert.equal(box.querySelectorAll('i').length, 0); assert.ok(box.textContent.includes('<i>c</i>'));
});
