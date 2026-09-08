import { chromium } from 'playwright';
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
await pg.goto('file:///F:/miniwanob/portfolio/index.html', { waitUntil: 'networkidle' });
await pg.evaluate(async () => {
  document.documentElement.style.scrollBehavior = 'auto';
  for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
  scrollTo(0, 0);
});
await pg.waitForTimeout(600);
const info = await pg.evaluate(() => ({
  revealOn: document.querySelectorAll('.reveal.on').length,
  revealTotal: document.querySelectorAll('.reveal').length,
}));
console.log(JSON.stringify(info));
await b.close();
