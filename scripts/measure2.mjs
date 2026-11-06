import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
for (const w of [320, 390, 1440, 1920]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(700);
  const d = await page.evaluate(() => {
    const word = document.querySelector('[data-contact-word]');
    if (!word) return null;
    const r = document.createRange();
    r.selectNodeContents(word);
    const box = r.getBoundingClientRect();
    const cs = getComputedStyle(word);
    return { textW: +box.width.toFixed(1), textX: +box.x.toFixed(1), textRight: +box.right.toFixed(1), font: cs.fontSize, container: +word.closest('.contact__head').getBoundingClientRect().width.toFixed(1), ratio: +(box.width / parseFloat(cs.fontSize)).toFixed(3) };
  });
  console.log(w, d);
  await page.close();
}
await browser.close();
