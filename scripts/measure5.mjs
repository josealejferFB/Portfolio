import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
for (const w of [1024, 1920]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1800);
  const d = await page.evaluate(() => {
    const el = document.querySelector('.hero__circles');
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const back = el.querySelector('.circles__back');
    const front = el.querySelector('.circles__front');
    return { rect: { x: r.x, y: r.y, w: r.width, h: r.height, right: r.right, bottom: r.bottom }, display: cs.display, pos: cs.position, opacity: cs.opacity, z: cs.zIndex, back: back ? getComputedStyle(back).backgroundColor : null, front: front ? getComputedStyle(front).backgroundColor : null, viewport: [innerWidth, innerHeight] };
  });
  console.log(w, JSON.stringify(d));
  await page.screenshot({ path: `shots/hero-${w}.png` });
  await page.close();
}
await browser.close();
