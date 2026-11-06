import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
for (const [w, h, zoom] of [[720, 900, 0], [390, 844, 1], [1440, 900, 1]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  if (zoom) await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await page.waitForTimeout(500);
  const data = await page.evaluate(() => {
    const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const clipped = [...document.querySelectorAll('h1,h2,h3,p,a,button,li')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.left < -1 || r.right > document.documentElement.clientWidth + 1);
    }).map((el) => ({ tag: el.tagName, cls: typeof el.className === 'string' ? el.className : '', text: (el.textContent || '').trim().slice(0, 30), right: Math.round(el.getBoundingClientRect().right) }));
    return { overflow, clipped: clipped.slice(0, 12), clippedCount: clipped.length };
  });
  console.log(w, zoom ? 'text-zoom-200' : 'viewport-720', JSON.stringify(data));
  await page.screenshot({ path: `shots/zoom-${w}${zoom ? '-text200' : ''}.png`, fullPage: false });
  await page.close();
}
await browser.close();
