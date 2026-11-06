import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
const shots = [
  { w: 1440, h: 900, name: '1440' },
  { w: 390, h: 844, name: '390' },
];
for (const { w, h, name } of shots) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `shots/peek-${name}-hero.png` });
  for (const id of ['criterio', 'trayectoria', 'craft', 'trabajo', 'contacto']) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) window.scrollTo(0, el.offsetTop - 20);
    }, id);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `shots/peek-${name}-${id}.png` });
  }
  // Estado final de las capas de 01: escena centrada.
  await page.evaluate(() => {
    const el = document.getElementById('criterio');
    if (el) window.scrollTo(0, el.offsetTop + 320);
  });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `shots/peek-${name}-criterio-stage.png` });
  await page.close();
}
await browser.close();
console.log('ok');
