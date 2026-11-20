// Concatena los módulos IIFE en un único archivo (lo que la etapa 3 incrustará en el HTML).
const fs = require('fs'), path = require('path');
const ORDER = ['dg-rng', 'dg-text', 'dg-sampler', 'dg-items', 'dg-evaluator', 'dg-srs', 'dg-ramp', 'dg-progress', 'dg-scheduler', 'dg-engine'];
const src = path.join(__dirname, '..', 'src'), out = path.join(__dirname, '..', 'dist', 'dg-engine.bundle.js');
const parts = ORDER.map(n => '/* ===== ' + n + '.js ===== */\n' + fs.readFileSync(path.join(src, n + '.js'), 'utf8'));
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, parts.join('\n'));
console.log('bundle:', out, fs.statSync(out).size, 'bytes');
