#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = path.join(__dirname, '..');
const itemsDir = path.join(root, 'items');
const outDir = path.join(root, 'types', 'generated');
const typesDir = path.join(root, 'types');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function toVarName(id) {
  return id.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()).replace(/^(\d)/, '_$1');
}

const files = fs.readdirSync(itemsDir).filter(f => f.endsWith('.json'));

const generated = [];

for (const file of files) {
  const full = path.join(itemsDir, file);
  try {
    const raw = fs.readFileSync(full, 'utf8');
    const obj = JSON.parse(raw);
    const id = obj.id || path.basename(file, '.json');
    const varName = toVarName(id);
    const outFile = path.join(outDir, `${id}.ts`);
    const content = `// AUTO-GENERATED from items/${file} — do not edit\nimport type { Item } from '../common';\n\nexport const ${varName}: Item = ${JSON.stringify(obj, null, 2)};\n\nexport default ${varName};\n`;
    fs.writeFileSync(outFile, content, 'utf8');
    generated.push({ id, varName });
    console.log('wrote', outFile);
  } catch (err) {
    console.error('error parsing', file, err.message);
  }
}

// Write index.ts
const indexLines = [];
indexLines.push("export * from './common';\n");
for (const g of generated) {
  indexLines.push(`export { default as ${g.varName} } from './generated/${g.id}';`);
}

const indexPath = path.join(typesDir, 'index.ts');
fs.writeFileSync(indexPath, indexLines.join('\n') + '\n', 'utf8');
console.log('wrote', indexPath);

console.log('done');

