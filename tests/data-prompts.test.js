/* Guardia común: ningún ítem de ningún archivo de data/ pierde su enunciado (el validador del motor no lo exige; la UI sí lo necesita). */
const test = require('node:test'), assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const dir = path.join(__dirname, '..', 'data');
test('todos los ítems de data/*.json (salvo pares mínimos y artikel, que usa el lema) tienen prompt de texto y respuesta', () => {
  fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'concepts.json').forEach(f => {
    JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')).forEach(i => {
      if (i.module === 'artikel') { assert.ok(i.lemma && i.answer, f + ' ' + i.id); return; }   // artikel se enuncia con el lema
      if (i.type === 'minimal-pair') { assert.ok(i.wo && i.wohin, f + ' ' + i.id); return; }
      assert.ok(typeof i.prompt === 'string' && i.prompt.length >= 1, f + ' ' + i.id + ' sin prompt');
      assert.ok(typeof i.answer === 'string' && i.answer.length > 0, f + ' ' + i.id + ' sin answer');
    });
  });
});
