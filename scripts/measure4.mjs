import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector('#trabajo').scrollIntoView());
await page.waitForTimeout(1600);
const card = page.locator('.case--01 .case__cover');
await card.screenshot({ path: 'shots/debug-cover.png' });
console.log(await page.evaluate(() => {
  const wrap = document.querySelector('.case--01 .case__cover');
  const cover = wrap.querySelector('.cover');
  const r = wrap.getBoundingClientRect();
  const points = [r.top + 5, r.top + r.height * 0.5, r.bottom - 30, r.bottom - 10, r.bottom - 2, r.bottom + 10];
  return points.map((y) => {
    const el = document.elementFromPoint(r.left + r.width / 2, y);
    return { y: +y.toFixed(1), el: el ? `${el.tagName}.${el.className}` : null };
  });
}));
await browser.close();
