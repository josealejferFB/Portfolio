// Auditoría de ejecución: presupuesto, LCP/CLS, foco, reduced motion y no-JS.
import { chromium } from 'playwright';
import { gzipSync } from 'node:zlib';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const URL = 'http://localhost:4321';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });

/* --- Presupuesto de archivos ------------------------------------------- */
const gz = (p) => gzipSync(readFileSync(p)).length;
const assets = readdirSync('dist/_astro').map((f) => join('dist/_astro', f));
const js = assets.filter((f) => f.endsWith('.js')).reduce((n, f) => n + gz(f), 0);
const css = assets.filter((f) => f.endsWith('.css')).reduce((n, f) => n + gz(f), 0);
const fonts = readdirSync('public/fonts').map((f) => join('public/fonts', f));
const fontBytes = fonts.reduce((n, f) => n + statSync(f).size, 0);
const html = gz('dist/index.html');
console.log(JSON.stringify({ budget: { jsGzipKB: +(js / 1024).toFixed(1), cssGzipKB: +(css / 1024).toFixed(1), fonts: fonts.length, fontKB: +(fontBytes / 1024).toFixed(1), htmlGzipKB: +(html / 1024).toFixed(1) } }));

/* --- LCP / CLS / long tasks con 4G + CPU x4 ---------------------------- */
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const errors = [];
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push(String(err)));
page.on('requestfailed', (req) => errors.push('failed: ' + req.url()));
await page.addInitScript(() => {
  window.__metrics = { lcp: 0, cls: 0, long: [] };
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) window.__metrics.lcp = entry.startTime;
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__metrics.cls += entry.value;
  }).observe({ type: 'layout-shift', buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) window.__metrics.long.push(+entry.duration.toFixed(1));
  }).observe({ type: 'longtask', buffered: true });
});
const cdp = await context.newCDPSession(page);
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', {
  offline: false, latency: 150, downloadThroughput: 200_000, uploadThroughput: 93_750,
});
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
const started = Date.now();
await page.goto(URL, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(3200);
const metrics = await page.evaluate(() => ({
  ...window.__metrics,
  lcpElement: (() => { const e = performance.getEntriesByType('largest-contentful-paint').at(-1); return e ? { tag: e.element?.tagName, id: e.element?.id, cls: e.element?.className, size: e.size } : null; })(),
  nav: performance.getEntriesByType('navigation')[0] ? {
    ttfb: +performance.getEntriesByType('navigation')[0].responseStart.toFixed(0),
    domContentLoaded: +performance.getEntriesByType('navigation')[0].domContentLoadedEventEnd.toFixed(0),
    load: +performance.getEntriesByType('navigation')[0].loadEventEnd.toFixed(0),
  } : null,
}));
console.log(JSON.stringify({ runtime: { ms: Date.now() - started, ...metrics, errors } }, null, 1));

/* --- Scroll: long tasks + fps ------------------------------------------ */
const frameData = await page.evaluate(async () => {
  window.__metrics.long.length = 0;
  const frames = [];
  let last = performance.now();
  let running = true;
  const tick = (t) => { frames.push(t - last); last = t; if (running) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
  const height = document.body.scrollHeight;
  for (let y = 0; y < height; y += 500) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 45));
  }
  running = false;
  await new Promise((r) => setTimeout(r, 200));
  const sorted = frames.slice(2).sort((a, b) => a - b);
  return {
    frames: frames.length,
    p50: +sorted[Math.floor(sorted.length * 0.5)]?.toFixed(1),
    p95: +sorted[Math.floor(sorted.length * 0.95)]?.toFixed(1),
    max: +sorted.at(-1)?.toFixed(1),
    long: window.__metrics.long.slice(),
  };
});
console.log(JSON.stringify({ scroll: frameData }));

/* --- Foco por teclado --------------------------------------------------- */
await page.goto(URL, { waitUntil: 'networkidle' });
await page.keyboard.press('Tab');
const skip = await page.evaluate(() => {
  const el = document.activeElement;
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  return { tag: el.tagName, text: el.textContent?.trim(), top: +r.top.toFixed(0), outline: cs.outlineWidth + ' ' + cs.outlineColor };
});
await page.keyboard.press('Enter');
await page.waitForTimeout(400);
const skipTarget = await page.evaluate(() => ({ active: document.activeElement?.tagName, id: document.activeElement?.id }));
const focusables = [];
for (let i = 0; i < 45; i++) {
  await page.keyboard.press('Tab');
  const item = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return { tag: el.tagName, cls: typeof el.className === 'string' ? el.className : '', text: (el.textContent || '').trim().slice(0, 28), visible: r.width > 0 && r.height > 0, outline: cs.outlineWidth + ' ' + cs.outlineStyle + ' ' + cs.outlineColor };
  });
  if (!item) break;
  if (!focusables.some((f) => f.text === item.text && f.cls === item.cls)) focusables.push(item);
}
console.log(JSON.stringify({ skip, skipTarget, focusables, noOutline: focusables.filter((f) => f.outline.startsWith('0px')) }, null, 1));

/* --- Copiar email, marquesina, anclas ----------------------------------- */
await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: URL });
await page.evaluate(() => document.querySelector('[data-copy-email]')?.scrollIntoView());
await page.waitForTimeout(800);
await page.locator('[data-copy-email]').click();
await page.waitForTimeout(150);
const copy = await page.evaluate(() => ({ status: document.querySelector('[data-copy-status]')?.textContent, clip: document.querySelector('[data-copy-email]')?.style.transform }));
await page.evaluate(() => document.querySelector('#craft')?.scrollIntoView());
await page.waitForTimeout(800);
await page.goto(URL, { waitUntil: 'networkidle' });
await page.locator('a[href="#trabajo"]').first().click();
await page.waitForTimeout(1400);
const anchor = await page.evaluate(() => ({ y: Math.round(window.scrollY), target: Math.round(document.getElementById('trabajo').offsetTop) }));
console.log(JSON.stringify({ interactions: { copy, anchor } }, null, 1));

/* --- Reduced motion ----------------------------------------------------- */
const reduceContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const reducePage = await reduceContext.newPage();
await reducePage.goto(URL, { waitUntil: 'networkidle' });
await reducePage.evaluate(() => document.fonts.ready);
await reducePage.waitForTimeout(700);
const reduced = await reducePage.evaluate(() => {
  const word = document.querySelector('[data-contact-word]');
  const name = document.querySelector('.hero__name .line__inner');
  const progress = document.querySelector('[data-timeline-progress]');
  const revealsHidden = [...document.querySelectorAll('[data-reveal]')].filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.99).length;
  return { wordClip: getComputedStyle(word).clipPath, nameAnim: getComputedStyle(name).animationName, progressTransform: getComputedStyle(progress).transform, revealsHidden, htmlMotion: document.documentElement.classList.contains('motion') };
});
console.log(JSON.stringify({ reduced }, null, 1));

/* --- Sin JavaScript ----------------------------------------------------- */
const noJsContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
const noJs = await noJsContext.newPage();
await noJs.goto(URL, { waitUntil: 'networkidle' });
await noJs.waitForTimeout(500);
const noJsData = await noJs.evaluate(() => ({
  text: document.body.innerText.length,
  hasName: document.body.innerText.includes('FERNANDEZ'),
  hasContact: document.body.innerText.includes('HABLEMOS'),
  hasExperience: document.body.innerText.includes('Desarrollador móvil y diseñador UI/UX'),
  copyHref: document.querySelector('[data-copy-fallback]')?.getAttribute('href'),
  wordVisible: getComputedStyle(document.querySelector('[data-contact-word]')).clipPath,
}));
console.log(JSON.stringify({ noJs: noJsData }, null, 1));

await browser.close();
