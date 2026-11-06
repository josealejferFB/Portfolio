import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.keyboard.press('Tab');
await page.waitForTimeout(400);
const skip = await page.evaluate(() => {
  const el = document.activeElement; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
  return { text: el.textContent.trim(), top: Math.round(r.top), transform: cs.transform, outline: cs.outlineWidth + ' ' + cs.outlineColor, bg: cs.backgroundColor };
});
await page.keyboard.press('Tab');
await page.waitForTimeout(300);
const rail = await page.evaluate(() => {
  const el = document.activeElement; const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
  const label = el.querySelector('.rail__label');
  return { text: el.textContent.trim(), href: el.getAttribute('href'), rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], outline: cs.outlineWidth + ' ' + cs.outlineColor, labelOpacity: label ? getComputedStyle(label).opacity : null, labelText: label ? label.textContent : null };
});
console.log(JSON.stringify({ skip, rail }, null, 1));
await page.close();

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await mobile.waitForTimeout(800);
await mobile.keyboard.press('Tab');
await mobile.waitForTimeout(400);
console.log(JSON.stringify({ mobileSkip: await mobile.evaluate(() => { const el = document.activeElement; const r = el.getBoundingClientRect(); return { text: el.textContent.trim(), top: Math.round(r.top) }; }) }));
await mobile.close();
await browser.close();
