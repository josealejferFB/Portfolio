// Genera public/og.png (1200×630) con la misma tipografía y paleta del sitio.
import { chromium } from 'playwright';
import { resolve } from 'node:path';

const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const font = `file://${resolve('public/fonts/montserrat-latin-wght.woff2')}`;

await page.setContent(`<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
@font-face{font-family:"Montserrat Variable";src:url("${font}") format("woff2-variations");font-weight:100 900;font-display:block}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1200px;height:630px;background:#fff;font-family:"Montserrat Variable",sans-serif;color:#141414;overflow:hidden;position:relative}
.panel{position:absolute;left:0;top:34px;width:468px;height:596px;border-radius:0 120px 0 0;background:#215C50}
.rim{position:absolute;left:0;top:18px;width:468px;height:596px;border-radius:0 120px 0 0;background:#FF6D4D}
.circle{position:absolute;right:-70px;top:-80px;width:290px;height:290px;border-radius:50%;background:#FF6D4D}
.circle.green{right:-20px;top:-40px;width:210px;height:210px;background:#215C50}
.copy{position:absolute;left:520px;top:92px;width:620px}
.kicker{font-size:12px;font-weight:700;letter-spacing:.24em;color:#CC3F1C;text-transform:uppercase}
.name{margin-top:28px;font-size:88px;font-weight:800;line-height:.88;letter-spacing:-.045em;text-transform:uppercase;color:#215C50}
.name em{display:block;font-style:normal;color:#CC3F1C}
.role{margin-top:26px;font-size:12px;font-weight:700;letter-spacing:.18em;color:#17453B;text-transform:uppercase;line-height:1.5}
.lead{margin-top:26px;font-size:21px;line-height:1.35;color:#215C50;font-weight:500;max-width:23ch}
.base{position:absolute;left:520px;bottom:64px;font-size:12px;letter-spacing:.08em;color:#5C5C57;text-transform:uppercase;font-family:ui-monospace,Menlo,monospace}
.tesis{position:absolute;left:52px;bottom:56px;width:340px;color:#fff;font-size:19px;font-weight:500;line-height:1.4}
.tag{position:absolute;left:52px;bottom:140px;font-size:11px;letter-spacing:.24em;color:#fff;opacity:.72;text-transform:uppercase;font-weight:700}
</style></head><body>
<div class="rim"></div><div class="panel"></div>
<div class="circle"></div><div class="circle green"></div>
<div class="copy">
  <p class="kicker">PORTAFOLIO — 2026</p>
  <h1 class="name">JOSÉ<em>FERNANDEZ</em></h1>
  <p class="role">Ingeniero de sistemas · Desarrollador móvil<br>Diseñador UI/UX &amp; gráfico</p>
  <p class="lead">Diseño la experiencia. Escribo el código que la sostiene.</p>
</div>
<p class="base">San Juan de los Morros, VE · UTC−4</p>
<p class="tag">Tesis</p>
<p class="tesis">Mantengo un equilibrio entre la lógica y la experiencia de usuario.</p>
</body></html>`, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(250);
await page.screenshot({ path: 'public/og.png' });
await browser.close();
console.log('public/og.png listo');
