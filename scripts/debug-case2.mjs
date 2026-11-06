import { chromium } from 'playwright';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.evaluate(() => document.querySelector('#trabajo').scrollIntoView());
await page.waitForTimeout(2500);
console.log(await page.evaluate(() => {
  const wrap = document.querySelector('.case--01 .case__cover');
  const cover = wrap.querySelector('.cover');
  const cr = cover.getBoundingClientRect();
  const wr = wrap.getBoundingClientRect();
  return { cover: { top: cr.top, bottom: cr.bottom, h: cr.height }, wrap: { top: wr.top, bottom: wr.bottom, h: wr.height }, coverStyle: { h: getComputedStyle(cover).height, bg: getComputedStyle(cover).backgroundColor, ar: getComputedStyle(cover).aspectRatio, clip: getComputedStyle(cover).clipPath, z: getComputedStyle(cover).zIndex }, wrapStyle: { h: getComputedStyle(wrap).height } };
}));
await page.locator('.case--01').screenshot({ path: 'shots/debug-case-before.png' });
await page.evaluate(() => {
  const wrap = document.querySelector('.case--01 .case__cover');
  wrap.style.setProperty('--debug', '1');
  const style = document.createElement('style');
  style.textContent = '.case--01 .case__cover::before{display:none!important} .case--01 .cover{outline:2px solid magenta}';
  document.head.appendChild(style);
});
await page.waitForTimeout(300);
await page.locator('.case--01').screenshot({ path: 'shots/debug-case-nobefore.png' });
await browser.close();
