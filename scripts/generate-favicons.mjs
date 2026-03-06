#!/usr/bin/env node
/**
 * Генерирует favicon.ico, favicon-96x96.png, apple-touch-icon.png из public/favicon.svg
 * Запуск: npm run favicons
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const svgPath = join(publicDir, 'favicon.svg');

async function main() {
  let sharp, toIco;
  try {
    sharp = (await import('sharp')).default;
    toIco = (await import('to-ico')).default;
  } catch (e) {
    console.error('Установи зависимости: npm install -D sharp to-ico');
    process.exit(1);
  }

  const svg = readFileSync(svgPath);
  const base = sharp(svg);

  // favicon.ico: 16, 32, 48 (to-ico принимает PNG буферы)
  const icoSizes = [16, 32, 48];
  const icoBuffers = await Promise.all(
    icoSizes.map((size) => base.clone().resize(size, size).png().toBuffer())
  );
  const ico = await toIco(icoBuffers);
  writeFileSync(join(publicDir, 'favicon.ico'), ico);
  console.log('Written public/favicon.ico');

  const png96 = await base.clone().resize(96, 96).png().toBuffer();
  writeFileSync(join(publicDir, 'favicon-96x96.png'), png96);
  console.log('Written public/favicon-96x96.png');

  const apple180 = await base.clone().resize(180, 180).png().toBuffer();
  writeFileSync(join(publicDir, 'apple-touch-icon.png'), apple180);
  console.log('Written public/apple-touch-icon.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
