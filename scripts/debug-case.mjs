import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector('#trabajo').scrollIntoView());
await page.waitForTimeout(2500);
await page.locator('.case--01').screenshot({ path: 'shots/debug-case.png' });
console.log(await page.evaluate(() => {
  const card = document.querySelector('.case--01');
  const coverWrap = card.querySelector('.case__cover');
  const body = card.querySelector('.case__body');
  const cw = coverWrap.getBoundingClientRect();
  const bb = body.getBoundingClientRect();
  return {
    coverWrap: { top: cw.top, bottom: cw.bottom, h: cw.height },
    body: { top: bb.top, bottom: bb.bottom, h: bb.height },
    gapPx: bb.top - cw.bottom,
    cardBg: getComputedStyle(card).backgroundColor,
    coverWrapBg: getComputedStyle(coverWrap).backgroundColor,
    bodyBg: getComputedStyle(body).backgroundColor,
    wrapAfterInset: getComputedStyle(coverWrap, '::after').inset,
    wrapAfterContent: getComputedStyle(coverWrap, '::after').content,
    wrapAfterBg: getComputedStyle(coverWrap, '::after').backgroundColor,
    wrapBeforeTransform: getComputedStyle(coverWrap, '::before').transform,
    wrapBeforeBottom: getComputedStyle(coverWrap, '::before').bottom,
    coverTransform: getComputedStyle(coverWrap.querySelector('.cover')).transform,
    coverClip: getComputedStyle(coverWrap.querySelector('.cover')).clipPath,
  };
}));
await browser.close();
