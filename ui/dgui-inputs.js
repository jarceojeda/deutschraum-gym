/* dgui-inputs.js — entradas por toques (Modo Tren): opciones con distractores, banco de letras, fichas para ordenar.
 * mount(view, item, cb) → { answerEl, dockEl }. cb.onSubmit(respuesta) recibe: string (opción), array de letras o array de fichas.
 * La opción se envía tal cual la da view() (NFC); las letras se envían como array (el motor las une sin espacios)
 * salvo que la respuesta tenga espacios (transform): entonces como texto, con la ficha «␣». */
(function (g) {
  'use strict';
  var U = g.DGUI.util, h = U.h, I = {};
  var F = g.DGUI.fmt;

  var CONFUSE = { 'ä': 'a', 'ö': 'o', 'ü': 'u', 'ß': 's', 'a': 'ä', 'o': 'ö', 'u': 'ü', 's': 'ß' };
  var FILL = 'enrtsmdlhg'.split('');
  // Banco: letras de la respuesta + 3 distractores (confusiones típicas ä/a, ß/s… y letras frecuentes). Cada ficha es única por índice.
  I.letterBank = function (answer, rnd) {
    var chars = Array.from(U.nfc(answer)), bank = chars.filter(function (c) { return c !== ' '; }), extra = [], i = 0;
    var low = chars.map(function (c) { return c.toLowerCase(); });
    chars.forEach(function (c) { var f = CONFUSE[c.toLowerCase()]; if (f && extra.length < 2 && low.indexOf(f) < 0) extra.push(f); });
    var pool = U.shuffle(FILL, rnd);
    while (extra.length < 3 && i < pool.length) { if (low.indexOf(pool[i]) < 0) extra.push(pool[i]); i++; }
    for (i = 0; extra.length < 3; i++) extra.push(pool[i % pool.length]);
    bank = bank.concat(extra.slice(0, 3));
    if (chars.indexOf(' ') >= 0) bank.push(' ');
    return U.shuffle(bank, rnd).map(function (c, k) { return { id: k, ch: c }; });
  };

  function btn(cls, label, fn, extra) { return h('button.btn.' + cls, Object.assign({ type: 'button', onclick: fn }, extra || {}), label); }

  I.mount = function (view, item, cb) {
    var rnd = cb.rnd;
    if (view.input === 'choice') return choice(view, cb);
    if (view.input === 'tiles') return tiles(view, cb);
    if (view.input === 'pair') return pair(view, cb);
    return letters(view, item, cb, rnd);
  };

  function choice(view, cb) {
    var done = false;
    var grid = h('div.options' + (view.options.length > 4 ? '.cols2' : view.options.length === 2 ? '.row2' : '.cols1'), { role: 'group', 'aria-label': 'Opciones' });
    view.options.forEach(function (o) {
      var badge = F.genderBadge(o, false);
      grid.appendChild(h('button.btn.opt' + (badge ? '.' + F.genderClass(o) : ''), { type: 'button', 'data-opt': o, onclick: function () { if (done) return; done = true; cb.onSubmit(o); } }, badge, h('span.lbl', o)));
    });
    return { answerEl: null, dockEl: grid };
  }

  function letters(view, item, cb, rnd) {
    var bank = I.letterBank(item.answer, rnd), picked = [];     // picked: ids de ficha en orden
    var spaced = /\s/.test(item.answer);
    var slots = h('div.slots', { 'aria-live': 'polite', 'aria-label': 'Tu respuesta' });
    var bankEl = h('div.bank', { role: 'group', 'aria-label': 'Letras' });
    var check = btn('primary', 'Comprobar', function () { submit(); }, { disabled: true });
    var back = btn('ghost.icon', '⌫', function () { picked.pop(); draw(); }, { 'aria-label': 'Borrar última letra', disabled: true });
    var skip = btn('ghost', 'No sé', function () { cb.onGiveUp(); });
    var done = false;
    function chOf(id) { return bank.filter(function (b) { return b.id === id; })[0].ch; }
    function submit() {
      if (done || !picked.length) return; done = true;
      var arr = picked.map(chOf);
      cb.onSubmit(spaced ? arr.join('') : arr);
    }
    function draw() {
      U.clear(slots); U.clear(bankEl);
      if (!picked.length) slots.appendChild(h('span.placeholder', 'Toca las letras'));
      picked.forEach(function (id) { var c = chOf(id); slots.appendChild(h('span.slot', c === ' ' ? '␣' : c)); });
      bank.forEach(function (b) {
        var used = picked.indexOf(b.id) >= 0;
        bankEl.appendChild(h('button.btn.tile', { type: 'button', disabled: used || done, 'aria-label': b.ch === ' ' ? 'espacio' : b.ch, onclick: function () { picked.push(b.id); draw(); } }, b.ch === ' ' ? '␣' : b.ch));
      });
      check.disabled = !picked.length || done; back.disabled = !picked.length || done;
    }
    draw();
    return { answerEl: slots, dockEl: h('div.dock-in', bankEl, h('div.row', skip, back, check)) };
  }

  function tiles(view, cb) {
    var src = view.tiles.map(function (t, i) { return { id: i, t: t }; }), picked = [], done = false;
    var line = h('div.slots.tiles-line', { 'aria-live': 'polite', 'aria-label': 'Tu frase' }), bankEl = h('div.bank');
    var check = btn('primary', 'Comprobar', function () { if (done || !picked.length) return; done = true; cb.onSubmit(picked.map(function (id) { return src[id].t; })); }, { disabled: true });
    var skip = btn('ghost', 'No sé', function () { cb.onGiveUp(); });
    function draw() {
      U.clear(line); U.clear(bankEl);
      if (!picked.length) line.appendChild(h('span.placeholder', 'Toca las fichas en orden'));
      picked.forEach(function (id) { line.appendChild(h('button.btn.tile.wide', { type: 'button', 'aria-label': src[id].t + ' (quitar)', onclick: function () { if (done) return; picked.splice(picked.indexOf(id), 1); draw(); } }, src[id].t)); });
      src.forEach(function (s) { bankEl.appendChild(h('button.btn.tile.wide', { type: 'button', disabled: picked.indexOf(s.id) >= 0 || done, onclick: function () { picked.push(s.id); draw(); } }, s.t)); });
      check.disabled = !picked.length || done;
    }
    draw();
    return { answerEl: line, dockEl: h('div.dock-in', bankEl, h('div.row', skip, check)) };
  }

  // Par mínimo (Präpositionen, etapa 4): dos preguntas, una elección por pregunta.
  function pair(view, cb) {
    var sel = {}, wrap = h('div.dock-in');
    var check = btn('primary', 'Comprobar', function () { cb.onSubmit(sel); }, { disabled: true });
    view.parts.forEach(function (p) {
      var row = h('div.options.row2', { role: 'group', 'aria-label': p.question });
      p.choices.forEach(function (c) {
        var b = h('button.btn.opt', { type: 'button', onclick: function () { sel[p.key] = c; Array.prototype.forEach.call(row.children, function (x) { x.classList.toggle('on', x === b); }); check.disabled = !(sel.wo && sel.wohin); } }, c);
        row.appendChild(b);
      });
      wrap.appendChild(h('div.q', p.question + ' ' + p.prompt)); wrap.appendChild(row);
    });
    wrap.appendChild(h('div.row', btn('ghost', 'No sé', function () { cb.onGiveUp(); }), check));
    return { answerEl: null, dockEl: wrap };
  }
  g.DGUI.inputs = I;
})(typeof globalThis !== 'undefined' ? globalThis : this);
