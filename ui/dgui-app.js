/* dgui-app.js — pantallas y flujo: inicio, sesión, resumen, ajustes y panel «ver regla».
 * mount(root, {win, engine, concepts, storageOk, prefs, rnd}) → controlador (go, state) para pruebas. */
(function (g) {
  'use strict';
  var D = g.DGUI, U = D.util, h = U.h, I = D.inputs, F = D.fmt;
  var MODULES = [
    { id: 'verben', icon: 'V', name: 'Verben', desc: 'Conjugar con toques: Präsens, Präteritum, Partizip II, haben/sein' },
    { id: 'artikel', icon: 'A', name: 'Artikel', desc: 'Género con color y forma, plural, artículo indefinido' },
    { id: 'deklination', icon: 'D', name: 'Deklination', desc: 'Caso, artículo y terminaciones: Akk, Dat, Gen, N-Deklination' }
  ];
  var SIZES = [{ n: 10, label: '10' }, { n: 20, label: '20' }, { n: 30, label: '30' }];
  var SOON = [
    { id: 'praepositionen', icon: 'P', name: 'Präpositionen', desc: 'Wo? / Wohin?, contracciones, verbos con preposición' },
    { id: 'konnektoren', icon: 'K', name: 'Konnektoren', desc: 'weil, dass, wenn… y partículas modales' },
    { id: 'wortschatz', icon: 'W', name: 'Wortschatz', desc: 'Vocabulario por situaciones y «Mis palabras»' },
    { id: 'satzbau', icon: 'S', name: 'Satzbau', desc: 'Ordenar frases: V₂, TeKaMoLo, verbo final' }
  ];
  var LEVELS = [['B1', 'Auto'], ['A1', 'A1'], ['A2', 'A2']];   // Auto = rampa ascendente del motor hasta B1; A1/A2 = tope
  var WARN = {
    NO_ERRORS: 'No hay errores pendientes que repasar.', ERRORS_NOT_READY: 'Tus errores aún no están listos para repasar (hace falta esperar unas horas).',
    NO_MODULES: 'No hay módulo elegido.', POOL_UNDER_MIN: 'Hay pocos ejercicios disponibles en este módulo con tu tope de nivel.',
    MODULE_EMPTY_UNDER_CAP: 'Este módulo no tiene ejercicios con tu tope de nivel actual (cámbialo en Ajustes).',
    LEVEL_THIN: 'Hay pocos ejercicios en algún nivel; la sesión puede repetir más.', SHORTFALL: 'La sesión es más corta de lo pedido: no hay ejercicios suficientes.'
  };

  function mount(root, ctx) {
    var win = ctx.win, doc = win.document, eng = ctx.engine, prefs = ctx.prefs, rules = D.rules.create(eng.store, ctx.concepts);
    U.doc = doc;
    var S = { screen: 'home', module: prefs.get('module') || 'verben', size: prefs.get('size') || 10, session: null, cur: null, saveError: null, warnings: [] };
    var api = { state: S };

    function reducedMotion() { try { return win.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
    function buzz(ms) { U.buzz(win, prefs, ms); }
    function saveBanner() {
      return S.saveError ? h('div.notice.warn', { role: 'status' }, 'No se pudo guardar tu progreso (almacenamiento lleno o bloqueado). Puedes seguir practicando, pero esta sesión podría perderse si cierras la pestaña.') : null;
    }
    function storageBanner() { return ctx.storageOk ? null : h('div.notice.warn', { role: 'status' }, 'Este navegador no deja guardar datos: tu progreso no se conservará al cerrar.'); }
    function shell(title, left, right, mainChildren, dockChildren, cls, module) {
      U.clear(root);
      root.className = 'app ' + (cls || '');
      var bar = h('header.appbar' + (module ? '.sess' : ''), module ? { 'data-module': module } : null, left, right);
      var main = h('main.main', { id: 'main', tabindex: '-1' }, mainChildren);
      root.appendChild(bar); root.appendChild(main);
      var dock = null;
      if (dockChildren && dockChildren.length) { dock = h('footer.dock', dockChildren); root.appendChild(dock); }
      return { main: main, dock: dock, bar: bar };
    }
    function brand(title, sub) { return h('div.brand', h('span.brand-mark', { 'aria-hidden': 'true' }, 'D'), h('div.brand-t', h('strong', title), sub ? h('small', sub) : null)); }
    function iconBtn(label, glyph, fn) { return h('button.btn.ghost.icon', { type: 'button', 'aria-label': label, onclick: fn }, glyph); }

    /* ---------- inicio ---------- */
    function chipRow(label, opts, cur, fn, attr) {
      return h('div.chips', { role: 'radiogroup', 'aria-label': label }, opts.map(function (o) {
        var a = { type: 'button', role: 'radio', 'aria-checked': String(cur) === String(o[0]) ? 'true' : 'false', onclick: function () { fn(o[0]); } };
        a['data-' + attr] = o[0];
        return h('button.chip' + (String(cur) === String(o[0]) ? '.on' : ''), a, o[1]);
      }));
    }
    function setCap(v) { eng.setLevelCap(v); eng.progress.save(); }
    function home() {
      S.screen = 'home'; S.session = null; S.cur = null;
      var list = h('div.cards'), cap = eng.state().settings.levelCap;
      MODULES.forEach(function (m) {
        list.appendChild(h('button.card', { type: 'button', 'data-module': m.id, onclick: function () { S.module = m.id; prefs.set('module', m.id); start({ kind: 'module' }); } },
          h('span.mi', { 'aria-hidden': 'true' }, m.icon), h('span.mt', h('strong', m.name), h('span', m.desc)), h('span.badge', 'Nivel ' + eng.levelOf(m.id)), h('span.go', { 'aria-hidden': 'true' }, '›')));
      });
      var soonList = h('div.cards');
      SOON.forEach(function (m) {
        soonList.appendChild(h('button.card.soon', { type: 'button', disabled: true, 'aria-disabled': 'true', 'data-soon': m.id },
          h('span.mi', { 'aria-hidden': 'true' }, m.icon), h('span.mt', h('strong', m.name), h('span', m.desc)), h('span.badge', 'Próximamente')));
      });
      var nerr = eng.errorQueue().length;
      var errCard = h('button.card.errs', { type: 'button', id: 'errors', disabled: !nerr, 'data-errors': nerr, onclick: function () { start({ kind: 'errors' }); } },
        h('span.mi', { 'aria-hidden': 'true' }, '↺'), h('span.mt', h('strong', 'Mis errores'), h('span', nerr ? 'Rehacer lo que fallaste: ' + nerr + ' pendientes' : 'Aún no hay errores que rehacer')), nerr ? h('span.badge', String(nerr)) : null);
      shell('Deutschraum Gym', brand('Deutschraum Gym', 'Modo Tren'), iconBtn('Ajustes', '⚙', settings),
        [storageBanner(),
          h('section.hero', h('p.eyebrow', 'Modo Tren'), h('h1', 'Practica unos minutos'), h('p', 'Toques, una mano. Elige un módulo o mezcla todo.'),
            h('div.group', h('p.glabel', 'Ejercicios por sesión'), chipRow('Tamaño de sesión', SIZES.map(function (z) { return [z.n, z.label]; }), S.size, function (v) { S.size = v; prefs.set('size', v); home(); }, 'size')),
            h('div.group', h('p.glabel', 'Nivel · Auto sube solo de A1 a B1'), chipRow('Nivel', LEVELS, cap, function (v) { setCap(v); home(); }, 'level')),
            h('div.group', h('p.glabel', 'Cómo respondes'), chipRow('Entrada', [['touch', 'Toques'], ['write', 'Escribir']], prefs.get('entry'), function (v) { prefs.set('entry', v); home(); }, 'entry')),
            h('button.btn.big.cta', { type: 'button', id: 'mix', onclick: function () { start({ kind: 'mix' }); } }, 'Viaje combinado ›')),
          h('h2.sec-h', 'Un módulo'), list, h('h2.sec-h', 'Repaso'), errCard, h('h2.sec-h', 'Próximamente'), soonList], null);
    }

    /* ---------- sesión ---------- */
    function start(o) {
      o = o || {}; var kind = o.kind || S.kind || 'module';
      var s, req = { kind: kind, size: S.size, mode: prefs.get('entry') === 'write' ? 'write' : 'touch' };
      S.mode = req.mode; S.lastSpec = null;
      if (kind === 'module') req.modules = [S.module];
      if (kind === 'mix') req.modules = MODULES.map(function (m) { return m.id; });
      try { s = eng.startSession(req); } catch (e) { S.warnings = [{ code: 'ERROR', msg: String(e && e.message || e) }]; }
      if (!s || !s.length()) { toast('No hay ejercicios para esta sesión. ' + (s && s.warnings && s.warnings.length ? WARN[s.warnings[0].code] || '' : 'Revisa el nivel en Ajustes.')); return; }
      S.kind = kind; S.session = s; S.saveError = null; S.answeredAny = false;
      S.warnings = (s.warnings || []).map(function (w) { return { code: w.code, msg: WARN[w.code] || w.code }; });
      question();
    }
    function modName(id) { return MODULES.filter(function (m) { return m.id === id; })[0].name; }
    function toast(msg) {
      var t = h('div.toast', { role: 'status' }, msg); root.appendChild(t);
      win.setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 4000);
    }
    function promptNode(v, item) {
      var box = h('div.qbody');
      var parts = String(v.prompt).split(' · ');
      if (v.module === 'verben' && parts.length === 3) {
        box.appendChild(h('div.p-big', parts[0]));
        box.appendChild(h('div.p-sub', D.rules.skillLabel(parts[1]) + ' · ' + parts[2].replace('er_sie_es', 'er/sie/es').replace('sie_Sie', 'sie/Sie')));
      } else if (v.module === 'artikel' && v.skill === 'genero') {
        box.appendChild(h('div.p-big', h('span.blank', '___'), ' ', v.prompt));
      } else if (v.module === 'artikel') {
        var m = /^(der|die|das)\s+(.*)$/i.exec(v.prompt);
        box.appendChild(h('div.p-big', m ? [F.genderBadge(m[1]), ' ', m[2]] : v.prompt));
      } else {
        var segs = String(v.prompt).split(/_{2,}/);
        box.appendChild(h('div.p-big.p-sent', segs.reduce(function (acc, sg, i) { if (i) acc.push(h('span.blank', '___')); acc.push(F.rich(sg)); return acc; }, [])));
      }
      if (v.showTranslation && v.translation) box.appendChild(h('div.p-tr', '“' + v.translation + '”'));
      if (v.hint) box.appendChild(h('div.p-hint', v.hint));
      return box;
    }
    function sessionFrame(mainChildren, dockNode) {
      var s = S.session, pos = Math.min(s.position() + (S.cur && S.cur.fb ? 1 : 0), s.length());
      var bar = h('div.progress', { role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(s.length()), 'aria-valuenow': String(pos) }, h('div.progress-fill', { style: 'width:' + Math.round(100 * pos / s.length()) + '%' }));
      var auto = h('button.auto-chip', { type: 'button', id: 'auto', 'aria-pressed': prefs.get('auto') ? 'true' : 'false', 'aria-label': 'Avance automático al acertar', onclick: function () { prefs.set('auto', !prefs.get('auto')); this.setAttribute('aria-pressed', prefs.get('auto') ? 'true' : 'false'); } }, 'Auto');
      return shell('', iconBtn('Terminar sesión', '✕', endEarly), [bar, h('span.count', pos + '/' + s.length()), auto],
        [saveBanner(), S.warnings.length && s.position() === 0 && !S.answeredAny ? h('div.notice', { role: 'status' }, S.warnings.map(function (w) { return h('div', w.msg); })) : null].concat(mainChildren), [dockNode], 'in-session', S.cur && S.cur.item ? S.cur.item.module : S.module);
    }
    function question(note, again) {
      var s = S.session; S.screen = 'session'; cancelAuto();
      if (s.done()) return summary();
      var v = s.view(), item = s.currentItem();
      // «Casi»: se vuelve a pintar el MISMO ejercicio y la misma variante (sin barajar otra vez), con lo escrito.
      var spec = again ? again.spec : D.variants.pick(item, v, { store: eng.store, rnd: ctx.rnd, mode: S.mode, last: S.lastSpec });
      if (again && again.prefill != null) spec = Object.assign({}, spec, { prefill: again.prefill });
      S.lastSpec = spec;
      S.cur = { view: v, item: item, spec: spec, fb: null };
      var inp = I.mount(spec, item, { rnd: ctx.rnd, tap: function () { buzz(8); }, onSubmit: function (resp, extra) { submit(resp, extra); }, onGiveUp: giveUp });
      var tags = h('div.tags', S.kind === 'module' ? null : h('span.tag.mod', modName(v.module)), h('span.tag', D.rules.skillLabel(v.skill)), h('span.tag', v.level), v.retry ? h('span.tag.retry', 'Otra vez') : null);
      sessionFrame([h('div.qcard', tags, h('p.qkind', spec.label || ''), promptNode(v, item)), inp.answerEl, note ? h('div.notice', { role: 'status' }, note) : null], inp.dockEl);
    }
    function submit(resp, extra) {
      var s = S.session, item = S.cur.item, v = S.cur.view, spec = S.cur.spec;
      var out;
      try { out = s.answer(resp, { mode: S.mode }); } catch (e) { toast('Error: ' + e.message); return; }
      S.answeredAny = true;
      if (out.saveError) S.saveError = out.saveError; else if (S.saveError) S.saveError = null;
      if (out.almost) { buzz([10, 30, 10]); return question('Casi. Revisa una letra e inténtalo otra vez.', { spec: spec, prefill: typeof resp === 'string' ? resp : '' }); }
      var ok = out.evaluation.verdict === 'correct';
      buzz(ok ? 12 : [30, 40, 30]);
      feedback({ ok: ok, out: out, item: item, view: v, resp: resp, gaveUp: false, extra: extra, spec: spec });
    }
    function giveUp() {
      var s = S.session, item = S.cur.item, v = S.cur.view, out;
      try { out = s.giveUp(); } catch (e) { toast('Error: ' + e.message); return; }
      S.answeredAny = true;
      if (out.saveError) S.saveError = out.saveError; else if (S.saveError) S.saveError = null;
      feedback({ ok: false, out: out, item: item, view: v, resp: null, gaveUp: true, spec: S.cur.spec });
    }
    function expectedText(item) {
      if (item.type === 'minimal-pair') return item.wo.answer + ' / ' + item.wohin.answer;
      return item.answer;
    }
    function cancelAuto() { if (S.timer) { win.clearTimeout(S.timer); S.timer = 0; } }
    function paradigmNode(rows) {
      return h('div.paradigm.result', { 'aria-label': 'Resultado por persona' }, rows.map(function (r) {
        return h('div.prow.' + (r.ok ? 'ok' : 'bad') + (r.target ? '.target' : ''), h('span.plabel', r.label, r.target ? ' ★' : ''),
          h('span.pres', h('strong', r.ok ? r.expected : r.expected), r.ok ? null : h('s', r.given == null ? '—' : r.given), h('span.mark', { 'aria-hidden': 'true' }, r.ok ? '✓' : '✗')));
      }));
    }
    function feedback(f) {
      var s = S.session, item = f.item;
      S.cur.fb = f; cancelAuto();
      var body = [];
      var ck = F.caseOf(item), ansNodes = F.rich(expectedText(item), { case: ck }), cb = ck ? F.caseBadge(ck) : null;
      var autoOn = f.ok && prefs.get('auto') && !(f.out.finished || s.done()), ms = ctx.autoMs == null ? 1400 : ctx.autoMs;
      var par = f.extra && f.extra.rows ? paradigmNode(f.extra.rows) : null;
      if (f.ok) {
        body.push(h('div.fb.ok', { role: 'status' }, h('div.fb-h', h('span.fb-ico', { 'aria-hidden': 'true' }, '✓'), h('strong', '¡Correcto!'), f.out.rescued ? h('span.badge.rescue', 'Rescatada: la fallabas antes') : null),
          par ? null : h('div.fb-ans', ansNodes), cb, par, autoOn ? h('div.autobar', { style: '--auto-ms:' + ms + 'ms' }, h('i')) : null));
      } else {
        body.push(h('div.fb.bad', { role: 'status' },
          h('div.fb-h', h('span.fb-ico', { 'aria-hidden': 'true' }, '✗'), h('strong', f.gaveUp ? 'Respuesta' : 'No era esa')),
          par ? null : h('div.fb-ans', ansNodes), cb, par,
          !f.gaveUp && f.resp ? h('div.fb-yours', 'Tu respuesta: ' + (Array.isArray(f.resp) ? f.resp.join(item.type === 'order' ? ' ' : '') : typeof f.resp === 'object' ? JSON.stringify(f.resp) : f.resp)) : null,
          h('div.fb-line', rules.oneLine(item)),
          f.out.retryScheduled ? h('div.fb-retry', 'Volverá a salir en unos ejercicios.') : null));
      }
      var go = function () { cancelAuto(); if (f.out.finished || s.done()) summary(); else question(); };
      var next = h('button.btn.primary.big', { type: 'button', id: 'next', onclick: go }, f.out.finished || s.done() ? 'Ver resumen' : 'Siguiente');
      var pause = autoOn ? h('button.btn.secondary', { type: 'button', id: 'pause', onclick: function () { cancelAuto(); var bar = root.querySelector('.autobar'); if (bar) bar.parentNode.removeChild(bar); this.parentNode.removeChild(this); } }, '⏸ Pausar') : null;
      var dock = h('div.dock-in', h('div.row', f.ok ? pause : h('button.btn.secondary', { type: 'button', id: 'rule', onclick: function () { openRule(item); } }, 'Ver regla'), next));
      var q = h('div.qcard.still', promptNode(f.view, item));
      sessionFrame([q].concat(body), dock);
      var nb = root.querySelector('#next'); if (nb && nb.focus) nb.focus({ preventScroll: true });
      if (autoOn) S.timer = win.setTimeout(go, ms);
    }
    function endEarly() {
      cancelAuto();
      if (S.session && S.answeredAny) summary(); else { if (S.session) S.session.finish(); home(); }
    }

    /* ---------- panel «ver regla» ---------- */
    function openRule(item) {
      var p = rules.panel(item), opener = doc.activeElement;
      var back = h('div.sheet-back', { onclick: function (e) { if (e.target === back) close(); } });
      function close() { if (back.parentNode) back.parentNode.removeChild(back); doc.removeEventListener('keydown', onKey); if (opener && opener.focus) opener.focus(); }
      function onKey(e) { if (e.key === 'Escape') close(); }
      var content = [];
      if (p.concepts.length) content.push(h('div.r-concepts', p.concepts.map(function (c) { return h('div.r-concept', c); })));
      if (p.explanation) content.push(h('p.r-expl', p.explanation));
      if (p.table) content.push(h('table.r-table', h('caption', p.table.caption), h('tbody', p.table.rows.map(function (r) { return h('tr' + (r.hit ? '.hit' : ''), h('th', r.k), h('td', r.v)); }))));
      if (p.examples.length) content.push(h('div.r-ex', h('h3', 'Más ejemplos de este tema'), h('ul', p.examples.map(function (e) { return h('li', h('span', e.prompt), ' → ', h('strong', e.answer)); }))));
      if (!p.explanation) content.push(h('p.r-note', 'Esta versión aún no trae el texto completo de la regla: se muestran el tema, la forma correcta y ejemplos del mismo tema.'));
      var sheet = h('div.sheet', { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Regla: ' + p.title },
        h('div.sheet-h', h('h2', p.title), h('button.btn.ghost.icon', { type: 'button', 'aria-label': 'Cerrar', onclick: close }, '✕')),
        h('div.sheet-b', content), h('div.sheet-f', h('button.btn.primary.big', { type: 'button', onclick: close }, 'Entendido')));
      back.appendChild(sheet); root.appendChild(back); doc.addEventListener('keydown', onKey);
      var cb = sheet.querySelector('.sheet-f button'); if (cb) cb.focus();
    }
    api.openRule = openRule;

    /* ---------- resumen ---------- */
    function summary() {
      cancelAuto();
      var s = S.session, sm = s.finish();
      S.screen = 'summary'; S.summary = sm;
      if (sm.saveError) S.saveError = sm.saveError;
      var pct = sm.answered ? Math.round(100 * sm.correct / sm.answered) : 0, blocks = [];
      blocks.push(h('div.sum-score', h('div.sum-big', sm.correct + '/' + sm.answered), h('div.sum-sub', sm.answered ? pct + ' % de aciertos al primer intento' : 'Sin respuestas esta vez')));
      if (sm.newUnits > 0) blocks.push(h('div.sum-card.learn', h('strong', 'Hoy aprendiste ' + sm.newUnits + (sm.newUnits === 1 ? ' cosa' : ' cosas') + ' que ayer no sabías.')));
      if (sm.rescued && sm.rescued.length) {
        blocks.push(h('div.sum-card.rescue', h('strong', 'Rescataste ' + sm.rescued.length + (sm.rescued.length === 1 ? ' ejercicio' : ' ejercicios') + ' que fallabas.'),
          h('ul', sm.rescued.slice(0, 6).map(function (id) { var it = eng.store.byId[id]; return h('li', it ? it.prompt + ' → ' + expectedText(it) : id); }))));
      }
      var tags = Object.keys(sm.errorsByTag || {}).sort(function (a, b) { return sm.errorsByTag[b] - sm.errorsByTag[a]; });
      if (tags.length) blocks.push(h('div.sum-card', h('strong', 'Errores por tipo'), h('ul.tagl', tags.map(function (t) { return h('li', h('span', D.rules.tagLabel(t)), h('span.n', String(sm.errorsByTag[t]))); }))));
      else if (sm.answered) blocks.push(h('div.sum-card', h('strong', 'Sin errores. Muy bien.')));
      (sm.levelChanges || []).forEach(function (c) { blocks.push(h('div.sum-card', h('strong', (c.change === 'promote' || c.to > c.from ? 'Subiste de nivel' : 'Cambio de nivel') + ': ' + c.module + ' ' + c.from + ' → ' + c.to))); });
      shell('Resumen', brand('Resumen', 'Sesión terminada'), null, [saveBanner(), blocks], [h('div.dock-in', h('div.row', h('button.btn.secondary', { type: 'button', onclick: home }, 'Inicio'), h('button.btn.primary.big', { type: 'button', id: 'again', onclick: function () { start({}); } }, 'Otra sesión')))], 'summary');
    }

    /* ---------- ajustes ---------- */
    function settings() {
      S.screen = 'settings';
      var st = eng.state().settings, theme = prefs.get('theme');
      function seg(name, opts, cur, fn) {
        return h('div.seg', { role: 'radiogroup', 'aria-label': name }, opts.map(function (o) {
          return h('button.chip' + (cur === o[0] ? '.on' : ''), { type: 'button', role: 'radio', 'aria-checked': cur === o[0] ? 'true' : 'false', 'data-v': o[0], onclick: function () { fn(o[0]); settings(); } }, o[1]);
        }));
      }
      shell('Ajustes', [iconBtn('Volver', '←', home), brand('Ajustes')], null, [
        h('section.set', h('h2', 'Nivel'), h('p.hint', 'Auto: empiezas en A1 y el motor sube solo hasta B1. A1 o A2 ponen un tope.'),
          seg('Nivel', LEVELS, st.levelCap, setCap)),
        h('section.set', h('h2', 'Entrada'), seg('Entrada', [['touch', 'Toques'], ['write', 'Escribir']], prefs.get('entry'), function (v) { prefs.set('entry', v); })),
        h('section.set', h('h2', 'Tema'), seg('Tema', [['auto', 'Sistema'], ['light', 'Claro'], ['dark', 'Oscuro']], theme, function (v) { prefs.set('theme', v); U.applyTheme(doc, v); })),
        h('section.set', h('h2', 'Vibración suave'), seg('Vibración', [['1', 'Sí'], ['0', 'No']], prefs.get('vibrate') ? '1' : '0', function (v) { prefs.set('vibrate', v === '1'); })),
        h('p.hint', 'El movimiento reducido del sistema se respeta automáticamente' + (reducedMotion() ? ' (activo ahora).' : '.'))
      ], [h('div.dock-in', h('button.btn.primary.big', { type: 'button', onclick: home }, 'Listo'))]);
    }

    api.go = function (name) { ({ home: home, settings: settings }[name] || home)(); };
    U.applyTheme(doc, prefs.get('theme'));
    home();
    return api;
  }
  D.mount = mount; D.MODULES = MODULES;
})(typeof globalThis !== 'undefined' ? globalThis : this);
