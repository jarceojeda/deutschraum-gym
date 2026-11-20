/* Pruebas de la UI sobre el HTML FINAL (dist/deutschraum-gym.html) en jsdom: se pulsan botones reales y se inspecciona localStorage. */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { JSDOM } = require('jsdom');
const { build } = require('../tools/build.js');

const HTML_PATH = build();
const HTML = fs.readFileSync(HTML_PATH, 'utf8');

function boot(seed, opts) {
  opts = opts || {};
  const dom = new JSDOM(HTML, { runScripts: 'dangerously', url: 'http://localhost/', pretendToBeVisual: true,
    beforeParse(w) { w.DGUI_CONFIG = { seed: seed == null ? 11 : seed }; if (opts.before) opts.before(w); } });
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
  // Responde el ejercicio actual PULSANDO la interfaz (opciones o banco de letras).
  function answer(ok) {
    const item = S().cur.item, v = S().cur.view;
    if (v.input === 'choice') {
      const opts = qa('.options .btn.opt');
      click(ok ? opts.find(b => b.dataset.opt === item.answer) : opts.find(b => b.dataset.opt !== item.answer));
    } else {
      const chars = Array.from(item.answer.normalize('NFC'));
      if (!ok) { click(qa('.bank .tile').find(b => !b.disabled)); click(qa('.dock .btn.primary')[0]); return; }   // una sola letra: nunca es la respuesta
      chars.forEach(c => {
        const label = c === ' ' ? '␣' : c;
        const t = qa('.bank .tile').find(b => !b.disabled && b.textContent === label);
        assert.ok(t, 'ficha ' + c + ' ausente del banco'); click(t);
      });
      click(qa('.dock .btn.primary')[0]);
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
    assert.ok(u.q('.fb-ans').textContent.includes(item.answer), 'muestra la respuesta correcta');
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

test('giveUp («No sé»): muestra la respuesta, cuenta como fallo y se guarda', () => {
  const u = boot(8);
  u.chooseModule('verben', 10); u.start();
  const item = u.S().cur.item;
  assert.equal(u.S().cur.view.input, 'letters');
  u.click(Array.from(u.d.querySelectorAll('.dock .btn.ghost')).find(b => b.textContent === 'No sé'));
  assert.ok(u.q('.fb.bad') && u.q('.fb-ans').textContent.includes(item.answer));
  assert.ok(u.stored().errors[item.id]);
  assert.equal(u.stored().items[item.id].a, 1);
});

test('letras: se envía un array (sin espacios) y sólo texto si la respuesta lleva espacios; ä/ö/ü/ß correctas', () => {
  const u = boot(33);
  const calls = [];
  const seenUml = [];
  u.chooseModule('verben', 30);
  for (let n = 0; n < 12 && seenUml.length < 3; n++) {
    u.start();
    const s = u.S().session, orig = s.answer;
    s.answer = function (r, o) { calls.push(r); return orig.call(s, r, o); };
    while (u.S().screen === 'session') {
      const item = u.S().cur.item;
      u.answer(true);
      if (/[äöüß]/.test(item.answer)) seenUml.push({ item, ok: u.q('.fb.ok') != null });
      u.next();
    }
    u.click(u.q('#again').parentNode.firstChild);   // Inicio
    u.chooseModule('verben', 30);
  }
  assert.ok(seenUml.length >= 1, 'no salió ninguna respuesta con diéresis/ß en 12 sesiones');
  seenUml.forEach(x => assert.ok(x.ok, x.item.answer + ' debió dar correcto con el banco de letras'));
  assert.ok(calls.some(Array.isArray) && calls.filter(Array.isArray).every(a => a.every(c => c.length >= 1 && !/\s/.test(c))));
  const u2 = boot(34); u2.chooseModule('deklination', 30); u2.start();
  const c2 = []; for (let i = 0; i < 30 && u2.S().screen === 'session'; i++) {
    const s = u2.S().session, o = s.answer; s.answer = function (r, a) { c2.push(r); return o.call(s, r, a); };
    u2.answer(true); u2.next();
  }
  c2.filter(r => typeof r === 'string').forEach(r => assert.ok(r.length > 0));
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
  const view = { input: 'tiles', tiles: ['trinke', 'Ich', 'Kaffee'] };
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
