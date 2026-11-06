import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
for (const w of [320, 390, 768, 1024, 1440, 1920]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const data = await page.evaluate(() => {
    const rect = (sel) => { const el = document.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(); return { x: +r.x.toFixed(1), y: +r.y.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
    const scroller = document.documentElement;
    const head = document.querySelector('#criterio .shead');
    const kicker = head?.querySelector('.shead__kicker');
    const title = head?.querySelector('.shead__title');
    const disc = head?.querySelector('.disc');
    const word = document.querySelector('[data-contact-word]');
    const name = document.querySelector('.hero__name');
    const panel = document.querySelector('.hero__panel');
    return {
      overflow: scroller.scrollWidth - scroller.clientWidth,
      docH: document.body.scrollHeight,
      name: rect('.hero__name'),
      nameFont: name ? getComputedStyle(name).fontSize : null,
      panel: rect('.hero__panel'),
      kicker: kicker?.getBoundingClientRect().x.toFixed(1),
      title: title?.getBoundingClientRect().x.toFixed(1),
      disc: rect('#criterio .disc'),
      word: word ? { w: +word.getBoundingClientRect().width.toFixed(1), right: +word.getBoundingClientRect().right.toFixed(1), font: getComputedStyle(word).fontSize } : null,
      contactHead: rect('.contact__head'),
      rail: getComputedStyle(document.querySelector('.rail')).display,
      h2Sizes: [...document.querySelectorAll('.shead__title')].map(e => getComputedStyle(e).fontSize),
    };
  });
  console.log(w, JSON.stringify(data));
  await page.close();
}
await browser.close();
