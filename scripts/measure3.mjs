import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector('#trabajo').scrollIntoView());
await page.waitForTimeout(1500);
const d = await page.evaluate(() => {
  const pick = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return { h: +r.height.toFixed(1), w: +r.width.toFixed(1), top: +r.top.toFixed(1), bottom: +r.bottom.toFixed(1), pos: cs.position, ar: cs.aspectRatio, transform: cs.transform, clip: cs.clipPath, flex: cs.flex, align: cs.alignSelf, margin: cs.margin }; };
  return [...document.querySelectorAll('.case')].slice(0,2).map((c) => ({
    case: pick(c),
    coverWrap: pick(c.querySelector('.case__cover')),
    cover: pick(c.querySelector('.cover')),
    before: (() => { const cs = getComputedStyle(c.querySelector('.case__cover'), '::before'); return { content: cs.content, inset: cs.inset, transform: cs.transform, bg: cs.backgroundColor, height: cs.height }; })(),
    body: pick(c.querySelector('.case__body')),
  }));
});
console.log(JSON.stringify(d, null, 2));
await browser.close();
