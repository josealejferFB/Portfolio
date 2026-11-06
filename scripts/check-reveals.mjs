import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);
const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < height; y += 350) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(140);
}
await page.waitForTimeout(1600);
const d = await page.evaluate(() => {
  const reveals = [...document.querySelectorAll('[data-reveal]')];
  const hidden = reveals.filter((el) => parseFloat(getComputedStyle(el).opacity) < 0.99).map((el) => ({ tag: el.tagName, cls: el.className, op: getComputedStyle(el).opacity, y: el.getBoundingClientRect().top + window.scrollY }));
  const covers = [...document.querySelectorAll('.cover')].filter((el) => getComputedStyle(el).clipPath !== 'none').map((el) => ({ cls: el.className, clip: getComputedStyle(el).clipPath }));
  const word = document.querySelector('[data-contact-word]');
  return { totalReveals: reveals.length, hidden, covers, wordClip: word ? getComputedStyle(word).clipPath : null, scrollY: window.scrollY };
});
console.log(JSON.stringify(d, null, 2));
await browser.close();
