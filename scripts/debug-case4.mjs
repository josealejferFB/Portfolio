import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector('#trabajo').scrollIntoView());
await page.waitForTimeout(2600);
await page.locator('.case--01').screenshot({ path: 'shots/debug-case-clear.png' });
console.log(await page.evaluate(() => {
  const art = document.querySelector('.case--01 .cover');
  return { inlineClip: art.style.clipPath, computedClip: getComputedStyle(art).clipPath };
}));
await browser.close();
