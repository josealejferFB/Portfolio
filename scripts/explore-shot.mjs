// Usage: node scripts/explore-shot.mjs explorations/a
import { chromium } from 'playwright';
import { resolve } from 'node:path';
import { access } from 'node:fs/promises';

const dir = process.argv[2];
if (!dir) {
  console.error('Uso: node scripts/explore-shot.mjs explorations/a');
  process.exit(1);
}
await access(resolve(dir, 'index.html'));

const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({
  executablePath: exe,
  args: ['--allow-file-access-from-files'],
});
const url = 'file://' + resolve(dir, 'index.html');
for (const [w, h] of [[390, 844], [1440, 900]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 0) console.log(`AVISO ${w}px: desborde horizontal de ${overflow}px`);
  await page.screenshot({ path: `${dir}/shot-${w}.png`, fullPage: true });
  await page.close();
}
await browser.close();
console.log('Capturas en', dir);
