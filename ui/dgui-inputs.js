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
    chars.forEach(function (c) { if (c === ' ') bank.push(' '); });   // una ficha de espacio por cada espacio de la respuesta
    return U.shuffle(bank, rnd).map(function (c, k) { return { id: k, ch: c }; });
  };

  function btn(cls, label, fn, extra) { return h('button.btn.' + cls, Object.assign({ type: 'button', onclick: fn }, extra || {}), label); }
  function tap(win) { try { if (win && win.navigator && win.navigator.vibrate) win.navigator.vibrate(8); } catch (e) { /* ignora */ } }

  // spec (dgui-variants) + item → { answerEl, dockEl }. cb: {onSubmit(resp, extra), onGiveUp(), rnd, tap()}
  I.mount = function (spec, item, cb) {
    switch (spec.kind) {
      case 'choice': return choice(spec, cb);
      case 'blocks': return blocks(spec, cb);
      case 'match': return match(spec, cb);
      case 'tiles': return tiles(spec, cb);
      case 'pair': return pair(spec, cb);
      case 'text': return text(spec, item, cb);
      default: return letters(spec, item, cb);
    }
  };
  function tapFx(cb) { if (cb.tap) cb.tap(); }

  function choice(spec, cb) {
    var done = false, n = spec.options.length;
    var grid = h('div.options' + (n > 4 ? '.cols2' : n === 3 && spec.options.every(function (o) { return F.GENDER[String(o).toLowerCase()]; }) ? '.cols1' : n === 3 && spec.options.every(function (o) { return String(o).length <= 7; }) ? '.cols3' : n === 2 ? '.row2' : '.cols2'), { role: 'group', 'aria-label': 'Opciones' });
    spec.options.forEach(function (o) {
      var badge = F.genderBadge(o, false);
      grid.appendChild(h('button.btn.opt' + (badge ? '.' + F.genderClass(o) : ''), { type: 'button', 'data-opt': o, onclick: function () { if (done) return; done = true; tapFx(cb); cb.onSubmit(o); } }, badge, h('span.lbl', o)));
    });
    var skip = btn('ghost', 'No sé', function () { if (done) return; done = true; cb.onGiveUp(); });
    return { answerEl: null, dockEl: h('div.dock-in', grid, skip) };
  }

  // Bloques tocables: se arma la respuesta tocando (tocar un bloque colocado lo devuelve).
  function blocks(spec, cb) {
    var picked = [], done = false;
    var line = h('div.slots.tiles-line', { 'aria-live': 'polite', 'aria-label': 'Tu respuesta' }), bankEl = h('div.bank', { role: 'group', 'aria-label': 'Bloques' });
    var check = btn('primary', 'Comprobar', function () { if (done || !picked.length) return; done = true; cb.onSubmit(picked.map(function (id) { return byId(id).t; }).join(spec.joiner)); }, { disabled: true });
    var skip = btn('ghost', 'No sé', function () { cb.onGiveUp(); });
    function byId(id) { return spec.blocks.filter(function (b) { return b.id === id; })[0]; }
    function draw() {
      U.clear(line); U.clear(bankEl);
      if (!picked.length) line.appendChild(h('span.placeholder', 'Toca los bloques en orden'));
      picked.forEach(function (id) { line.appendChild(h('button.btn.tile.wide.placed', { type: 'button', disabled: done, 'aria-label': byId(id).t + ' (quitar)', onclick: function () { if (done) return; tapFx(cb); picked.splice(picked.indexOf(id), 1); draw(); } }, byId(id).t, h('span.chip-x', { 'aria-hidden': 'true' }, '×'))); });
      spec.blocks.forEach(function (b) { bankEl.appendChild(h('button.btn.tile.wide' + (picked.indexOf(b.id) >= 0 ? '.is-used' : ''), { type: 'button', 'data-block': b.t, disabled: picked.indexOf(b.id) >= 0 || done, onclick: function () { tapFx(cb); picked.push(b.id); draw(); } }, b.t)); });
      check.disabled = !picked.length || done;
    }
    draw();
    return { answerEl: line, dockEl: h('div.dock-in', bankEl, h('div.row', skip, check)) };
  }

  // Emparejado rápido: filas (persona → forma) + banco de formas. Toca una forma: va a la fila activa.
  function match(spec, cb) {
    var vals = {}, chipOf = {}, active = firstEmpty(), done = false;     // vals: key → texto; chipOf: key → id de ficha
    var rowsEl = h('div.paradigm', { role: 'group', 'aria-label': 'Formas por persona' }), bankEl = h('div.bank', { role: 'group', 'aria-label': 'Formas' });
    var check = btn('primary', 'Comprobar', function () { submit(); }, { disabled: true });
    var skip = btn('ghost', 'No sé', function () { cb.onGiveUp(); });
    function firstEmpty() { for (var i = 0; i < spec.rows.length; i++) if (vals[spec.rows[i].key] == null) return spec.rows[i].key; return null; }
    function usedIds() { return Object.keys(chipOf).map(function (k) { return chipOf[k]; }); }
    function submit() {
      if (done || firstEmpty() !== null) return; done = true;
      var gr = g.DGUI.variants.gradeMatch(spec, vals); draw(); cb.onSubmit(gr.response, { rows: gr.rows });
    }
    function draw() {
      U.clear(rowsEl); U.clear(bankEl);
      spec.rows.forEach(function (r) {
        var filled = vals[r.key] != null, isAct = active === r.key;
        rowsEl.appendChild(h('div.prow' + (isAct ? '.active' : '') + (r.target ? '.target' : ''),
          h('span.plabel', r.label, r.target ? h('span.star', { 'aria-label': 'esta fila cuenta' }, ' ★') : null),
          h('button.btn.slotbtn' + (filled ? '.filled' : ''), { type: 'button', 'data-row': r.key, disabled: done, onclick: function () {
            if (done) return; tapFx(cb);
            if (filled) { delete vals[r.key]; delete chipOf[r.key]; }
            active = r.key; draw();
          } }, filled ? vals[r.key] : '—')));
      });
      var used = usedIds();
      spec.bank.forEach(function (b) {
        bankEl.appendChild(h('button.btn.tile.wide' + (used.indexOf(b.id) >= 0 ? '.is-used' : ''), { type: 'button', 'data-chip': b.t, disabled: used.indexOf(b.id) >= 0 || done || active == null, onclick: function () {
          if (done || active == null) return; tapFx(cb);
          vals[active] = b.t; chipOf[active] = b.id; active = firstEmpty(); draw();
        } }, b.t));
      });
      check.disabled = done || firstEmpty() !== null;
      var act = rowsEl.querySelector('.prow.active'); if (act && act.scrollIntoView) { try { act.scrollIntoView({ block: 'nearest' }); } catch (e) { /* ignora */ } }
    }
    draw();
    var note = h('p.hint.center', '★ marca la fila que cuenta para tu progreso; las demás son práctica.');
    return { answerEl: h('div.paradigm-wrap', rowsEl, note), dockEl: h('div.dock-in', bankEl, h('div.row', skip, check)) };
  }

  function letters(spec, item, cb) {
    var bank = I.letterBank(item.answer, cb.rnd), picked = [], spaced = /\s/.test(item.answer), done = false;
    var slots = h('div.slots', { 'aria-live': 'polite', 'aria-label': 'Tu respuesta' }), bankEl = h('div.bank', { role: 'group', 'aria-label': 'Letras' });
    var check = btn('primary', 'Comprobar', function () { submit(); }, { disabled: true });
    var back = btn('ghost.icon', '⌫', function () { tapFx(cb); picked.pop(); draw(); }, { 'aria-label': 'Borrar última letra', disabled: true });
    var skip = btn('ghost', 'No sé', function () { cb.onGiveUp(); });
    function chOf(id) { return bank.filter(function (b) { return b.id === id; })[0].ch; }
    function submit() { if (done || !picked.length) return; done = true; var arr = picked.map(chOf); cb.onSubmit(spaced ? arr.join('') : arr); }
    function draw() {
      U.clear(slots); U.clear(bankEl);
      if (!picked.length) slots.appendChild(h('span.placeholder', 'Toca las letras'));
      picked.forEach(function (id) { var c = chOf(id); slots.appendChild(h('span.slot', c === ' ' ? '␣' : c)); });
      bank.forEach(function (b) {
        var used = picked.indexOf(b.id) >= 0;
        bankEl.appendChild(h('button.btn.tile', { type: 'button', disabled: used || done, 'aria-label': b.ch === ' ' ? 'espacio' : b.ch, onclick: function () { tapFx(cb); picked.push(b.id); draw(); } }, b.ch === ' ' ? '␣' : b.ch));
      });
      check.disabled = !picked.length || done; back.disabled = !picked.length || done;
    }
    draw();
    return { answerEl: slots, dockEl: h('div.dock-in', bankEl, h('div.row', skip, back, check)) };
  }

  function tiles(spec, cb) {
    var src = spec.tiles.map(function (t, i) { return { id: i, t: t }; }), picked = [], done = false;
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
  function pair(spec, cb) {
    var sel = {}, wrap = h('div.dock-in');
    var check = btn('primary', 'Comprobar', function () { cb.onSubmit(sel); }, { disabled: true });
    spec.parts.forEach(function (p) {
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

  // Modo opcional «Escribir»: campo de texto + fila ä ö ü ß (toques de >=48 px).
  function text(spec, item, cb) {
    var input = h('input.field', { type: 'text', id: 'answer', autocomplete: 'off', autocapitalize: 'none', autocorrect: 'off', spellcheck: 'false', lang: 'de', enterkeyhint: 'done', 'aria-label': 'Tu respuesta', value: spec.prefill || '' });
    var done = false;
    function submit() { var v = U.nfc(input.value).trim(); if (done || !v) return; done = true; cb.onSubmit(v); }
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); submit(); } });
    var keys = h('div.umlauts', ['ä', 'ö', 'ü', 'ß'].map(function (c) {
      return h('button.btn.key', { type: 'button', 'data-key': c, 'aria-label': 'Insertar ' + c, onclick: function () {
        var st = input.selectionStart == null ? input.value.length : input.selectionStart, en = input.selectionEnd == null ? st : input.selectionEnd;
        input.value = input.value.slice(0, st) + c + input.value.slice(en); try { input.setSelectionRange(st + 1, st + 1); } catch (e) { /* ignora */ } input.focus();
      } }, c);
    }));
    return { answerEl: h('div.write', input), dockEl: h('div.dock-in', keys, h('div.row', btn('ghost', 'No sé', function () { cb.onGiveUp(); }), btn('primary', 'Comprobar', submit))) };
  }
  I.tap = tap;
  g.DGUI.inputs = I;
})(typeof globalThis !== 'undefined' ? globalThis : this);
