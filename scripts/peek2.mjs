import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1200);
for (const [id, offset, name] of [
  ['trabajo', 0, 'trabajo-head'],
  ['trabajo', 900, 'trabajo-cases2'],
  ['craft', 620, 'craft-bottom'],
  ['criterio', 0, 'criterio-head'],
  ['trayectoria', 400, 'trayectoria-mid'],
]) {
  await page.evaluate(([id, offset]) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo(0, el.offsetTop + offset);
  }, [id, offset]);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `shots/x-${name}.png` });
}
await browser.close();
console.log('ok');
