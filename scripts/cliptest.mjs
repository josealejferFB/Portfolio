import { chromium } from 'playwright';
import { resolve } from 'node:path';
const exe = process.env.HOME + '/.cache/ms-playwright/chromium_headless_shell-1252/chrome-headless-shell-linux64/chrome-headless-shell';
const b = await chromium.launch({ executablePath: exe });
const p = await b.newPage({ viewport: { width: 800, height: 2000 } });
await p.goto('file://' + resolve('.debug/cliptest.html'));
await p.screenshot({ path: 'shots/debug-cliptest.png', fullPage: true });
await b.close();
