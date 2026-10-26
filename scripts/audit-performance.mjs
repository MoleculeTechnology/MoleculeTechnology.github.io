import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { resolve, relative, extname, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';

const options = {
  label: 'current', site: '.preview/performance-site', output: '.preview/performance',
  runs: '3', forms: 'mobile', routes: '/,/work/,/about/,/work/paper-ghost/', port: '4173',
  chrome: process.env.CHROME_PATH,
};
let build = true;
for (let i = 2; i < process.argv.length; i++) {
  const name = process.argv[i].replace(/^--/, '');
  if (name === 'no-build') { build = false; continue; }
  if (!(name in options) || !process.argv[i + 1]) throw new Error(`Unknown or incomplete option: ${process.argv[i]}`);
  options[name] = process.argv[++i];
}
if (!/^[a-z0-9][a-z0-9-]*$/i.test(options.label)) throw new Error('Use a simple name for --label');
const runs = Number(options.runs);
if (!Number.isInteger(runs) || runs < 1) throw new Error('--runs must be a positive integer');
const forms = options.forms.split(',');
if (forms.some(form => !['mobile', 'desktop'].includes(form))) throw new Error('--forms accepts mobile,desktop');
const routes = options.routes.split(',');
if (routes.some(route => !route.startsWith('/'))) throw new Error('Routes must begin with /');
const root = resolve(options.site);
const origin = `http://127.0.0.1:${Number(options.port)}`;
const destination = resolve(options.output, options.label);
await mkdir(destination, { recursive: true });
if (build) {
  const hugo = resolve('.tools/hugo/0.115.4', process.platform === 'win32' ? 'hugo.exe' : 'hugo');
  execFileSync(hugo, ['--destination', root, '--baseURL', `${origin}/`, '--cleanDestinationDir'], { stdio: 'inherit' });
}

const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.mp4': 'video/mp4',
};
// Serve the production build with text compression, without the Hugo live-reload client.
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, origin).pathname);
    let file = resolve(root, `.${pathname}`);
    const inside = relative(root, file);
    if (inside.startsWith(`..${sep}`) || inside === '..') { response.writeHead(403).end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    let body = await readFile(file);
    const type = mime[extname(file)] || 'application/octet-stream';
    const headers = { 'Content-Type': type, 'Cache-Control': 'public, max-age=600' };
    if (/^(text\/|application\/json|image\/svg)/.test(type) && /\bgzip\b/.test(request.headers['accept-encoding'] || '')) {
      body = gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
      headers.Vary = 'Accept-Encoding';
    }
    headers['Content-Length'] = body.length;
    response.writeHead(200, headers).end(request.method === 'HEAD' ? undefined : body);
  } catch { response.writeHead(404).end('Not found'); }
});
await new Promise((accept, reject) => { server.once('error', reject); server.listen(Number(options.port), '127.0.0.1', accept); });
let chrome;
const measurements = [];
const metadata = {
  created: new Date().toISOString(), label: options.label,
  commit: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  dirty: Boolean(execFileSync('git', ['status', '--porcelain'], { encoding: 'utf8' }).trim()),
  node: process.version, runs, origin, routes, forms,
  note: 'Local production build, gzip text, fresh Lighthouse browser cache, standard simulated throttling. Public-host latency and real-device behavior require separate checks.',
};
const median = values => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
};
try {
  chrome = await chromeLauncher.launch({
    chromePath: options.chrome,
    chromeFlags: ['--headless=new', '--no-first-run', '--no-default-browser-check'],
    logLevel: 'silent',
  });
  for (const form of forms) for (const route of routes) {
    const slug = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replaceAll('/', '-');
    for (let run = 1; run <= runs; run++) {
      console.log(`${options.label}: ${form} ${route} ${run}/${runs}`);
      const result = await lighthouse(`${origin}${route}`, {
        port: chrome.port, output: ['html', 'json'], logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      }, form === 'desktop' ? desktopConfig : undefined);
      if (!result || result.lhr.runtimeError) throw new Error(JSON.stringify(result?.lhr.runtimeError || 'No Lighthouse result'));
      const report = result.lhr;
      const prefix = `${slug}.${form}.${run}`;
      await writeFile(resolve(destination, `${prefix}.html`), result.report[0]);
      await writeFile(resolve(destination, `${prefix}.json`), result.report[1]);
      const value = id => report.audits[id]?.numericValue ?? null;
      const requests = report.audits['network-requests']?.details?.items || [];
      const measurement = {
        route, form, run, report: `${prefix}.html`, lighthouse: report.lighthouseVersion,
        browser: report.environment.hostUserAgent,
        settings: {
          throttling: report.configSettings.throttling, throttlingMethod: report.configSettings.throttlingMethod,
          screenEmulation: report.configSettings.screenEmulation,
        },
        scores: Object.fromEntries(Object.entries(report.categories).map(([key, item]) => [key, Math.round(item.score * 100)])),
        fcpMs: value('first-contentful-paint'), lcpMs: value('largest-contentful-paint'),
        speedIndexMs: value('speed-index'), tbtMs: value('total-blocking-time'), cls: value('cumulative-layout-shift'),
        observedLoadMs: report.audits.metrics?.details?.items?.[0]?.observedLoad ?? null,
        transferBytes: requests.reduce((total, item) => total + (item.transferSize || 0), 0),
        requests: requests.length, warnings: report.runWarnings,
        failedAudits: Object.entries(report.audits).filter(([, audit]) => audit.score !== null && audit.score < 1)
          .map(([id, audit]) => ({ id, title: audit.title, score: audit.score, value: audit.displayValue })),
      };
      measurements.push(measurement);
      await writeFile(resolve(destination, 'runs.json'), JSON.stringify({ ...metadata, measurements }, null, 2) + '\n');
      console.log(`  performance ${measurement.scores.performance}, LCP ${(measurement.lcpMs / 1000).toFixed(2)}s, ${(measurement.transferBytes / 1024).toFixed(0)} KiB`);
    }
  }
  const summaries = forms.flatMap(form => routes.map(route => {
    const items = measurements.filter(item => item.form === form && item.route === route);
    const metrics = ['fcpMs', 'lcpMs', 'speedIndexMs', 'tbtMs', 'cls', 'observedLoadMs', 'transferBytes', 'requests'];
    return {
      route, form, runs: items.length,
      scores: Object.fromEntries(Object.keys(items[0].scores).map(key => [key, median(items.map(item => item.scores[key]))])),
      ...Object.fromEntries(metrics.map(key => [key, median(items.map(item => item[key]))])),
      lcpRangeMs: [Math.min(...items.map(item => item.lcpMs)), Math.max(...items.map(item => item.lcpMs))],
      representativeReport: [...items].sort((a, b) => a.lcpMs - b.lcpMs)[Math.floor(items.length / 2)].report,
    };
  }));
  await writeFile(resolve(destination, 'summary.json'), JSON.stringify({ ...metadata, summaries }, null, 2) + '\n');
  console.log(JSON.stringify(summaries, null, 2));
} finally {
  await chrome?.kill();
  await new Promise(accept => server.close(accept));
}
