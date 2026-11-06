import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: 'shots/probe-1440.png' });
console.log(await p.evaluate(() => ({
  font: getComputedStyle(document.body).fontFamily,
  loaded: document.fonts.check('800 100px "Montserrat Variable"'),
  css: [...document.styleSheets].map(s => s.href || 'inline').filter(Boolean),
})));
await b.close();
