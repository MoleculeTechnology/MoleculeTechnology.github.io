import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const require = createRequire(new URL('../.tools/social-icons/package.json', import.meta.url));
const { optimize } = require('svgo');
const { Resvg } = require('@resvg/resvg-js');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const destination = path.join(root, 'assets/icons/social');
const measurements = [];

function rasterize(svg, size) {
  return new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    background: '#050707',
    font: { loadSystemFonts: false },
  }).render().pixels;
}

function pixelError(reference, candidate, size) {
  const before = rasterize(reference, size);
  const after = rasterize(candidate, size);
  if (before.length !== after.length) throw new Error('Icon dimensions changed.');
  let absoluteError = 0;
  for (let index = 0; index < before.length; index += 4) {
    for (let channel = 0; channel < 3; channel++) {
      absoluteError += Math.abs(before[index + channel] - after[index + channel]);
    }
  }
  return absoluteError / (before.length / 4 * 3);
}

await fs.mkdir(destination, { recursive: true });
for (const service of ['linkedin', 'github', 'youtube']) {
  const sourcePath = path.join(root, 'themes/blowfish/assets/icons', service + '.svg');
  const sourceFile = await fs.readFile(sourcePath, 'utf8');
  const source = sourceFile.trim();
  const [, width, height] = source.match(/viewBox="0 0 (\d+) (\d+)"/).map(Number);
  const scale = 24 / Math.max(width, height);
  const left = (24 - width * scale) / 2;
  const top = (24 - height * scale) / 2;
  let content = source.replace(/^<svg[^>]*>|<\/svg>$/g, '');
  const color = { linkedin: '#0a66c2', github: '#fff', youtube: '#ff0033' }[service];
  content = content.replaceAll('currentColor', color);
  if (service === 'linkedin') content = '<path fill="#fff" d="M32 64h384v384H32z"/>' + content;
  if (service === 'youtube') content = '<path fill="#fff" d="M200 150h210v210H200z"/>' + content;
  const reference = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g transform="translate(${left} ${top}) scale(${scale})">${content}</g></svg>`;
  const normalized = optimize(reference, { multipass: true, floatPrecision: 5 }).data;
  const candidates = [0, 1, 2, 3].map(precision => {
    const data = optimize(normalized, { multipass: true, floatPrecision: precision }).data;
    return { precision, data, errors: [18, 36, 54].map(size => pixelError(reference, data, size)) };
  });
  const acceptable = candidates.filter(candidate => candidate.errors.every(error => error <= 0.5));
  acceptable.sort((first, second) => Buffer.byteLength(first.data) - Buffer.byteLength(second.data));
  if (!acceptable.length) throw new Error('No acceptable optimization for ' + service);
  const selected = acceptable[0];
  await fs.writeFile(path.join(destination, service + '.svg'), selected.data);
  measurements.push({
    service,
    originalMonochromeBytes: Buffer.byteLength(sourceFile),
    unoptimizedColorBytes: Buffer.byteLength(reference),
    optimizedColorBytes: Buffer.byteLength(selected.data),
    optimizedGzipBytes: gzipSync(selected.data, { level: 9 }).length,
    precision: selected.precision,
    meanChannelErrorAt18px: Number(selected.errors[0].toFixed(4)),
    meanChannelErrorAt36px: Number(selected.errors[1].toFixed(4)),
    meanChannelErrorAt54px: Number(selected.errors[2].toFixed(4)),
    candidates: candidates.map(candidate => ({ precision: candidate.precision, bytes: Buffer.byteLength(candidate.data), meanChannelErrors: candidate.errors.map(error => Number(error.toFixed(4))) })),
  });
}
const report = {
  optimizer: 'SVGO 4.0.0',
  renderer: '@resvg/resvg-js 2.6.2',
  maxMeanChannelError: 0.5,
  measurements,
};
await fs.writeFile(path.join(root, 'docs/portfolio/assets/social-icon-optimization.json'), JSON.stringify(report, null, 2) + '\n');
console.table(measurements.map(({ service, originalMonochromeBytes, optimizedColorBytes, optimizedGzipBytes, precision }) => ({ service, originalMonochromeBytes, optimizedColorBytes, optimizedGzipBytes, precision })));
