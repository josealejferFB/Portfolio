// node scripts/shots.mjs — capturas de verificación visual
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const URL = process.env.URL ?? 'http://localhost:4321';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
await mkdir('shots', { recursive: true });

const browser = await chromium.launch({ executablePath: exe });
const viewports = [320, 390, 768, 1024, 1440, 1920];

for (const width of viewports) {
  const page = await browser.newPage({
    viewport: { width, height: width < 768 ? 844 : 900 },
    deviceScaleFactor: 1,
  });
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // Las capturas de página completa muestran el diseño en reposo: se fija el
  // estado final de la capa de movimiento para que el archivo sea determinista.
  await page.addStyleTag({
    content: `
      [data-reveal] { opacity: 1 !important; transform: none !important; }
      .cover { clip-path: none !important; }
      [data-contact-word] { clip-path: none !important; }
      .panel--hero .panel__fill, .panel--hero .panel__rim { transform: none !important; }
      [data-layer-coral] { transform: translate(0, -6px) !important; }
      [data-layer-green] { transform: none !important; }
      [data-timeline-progress] { transform: scaleY(1) !important; }
      .motion .marquee__track { animation: none !important; transform: none !important; }
    `,
  });
  await page.waitForTimeout(350);
  await page.screenshot({ path: `shots/${width}.png`, fullPage: true });
  await page.close();
}

const reduced = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: 'reduce',
});
await reduced.goto(URL, { waitUntil: 'networkidle' });
await reduced.evaluate(() => document.fonts.ready);
await reduced.waitForTimeout(500);
await reduced.screenshot({ path: 'shots/reduced-motion.png', fullPage: true });
await reduced.close();

// Un acto por sección a 1440, con el scroll ya asentado.
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(URL, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1300);
for (const id of ['criterio', 'trayectoria', 'craft', 'trabajo', 'contacto']) {
  await page.evaluate((id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo(0, el.offsetTop - 24);
  }, id);
  await page.waitForTimeout(1800);
  const index = ['criterio', 'trayectoria', 'craft', 'trabajo', 'contacto'].indexOf(id) + 1;
  await page.screenshot({ path: `shots/act-0${index}.png` });
}
await page.close();

// Sin JavaScript: el contenido completo debe seguir ahí.
const noJs = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  javaScriptEnabled: false,
});
await noJs.goto(URL, { waitUntil: 'networkidle' });
await noJs.waitForTimeout(600);
await noJs.screenshot({ path: 'shots/no-js.png', fullPage: true });
await noJs.close();

await browser.close();
console.log('Capturas listas en shots/');
