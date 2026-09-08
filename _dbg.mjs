import { chromium } from 'playwright';
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
pg.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
pg.on('console', (m) => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
await pg.goto('file:///F:/miniwanob/portfolio/index.html', { waitUntil: 'networkidle' });
await pg.waitForTimeout(1200);
const info = await pg.evaluate(() => {
  const cards = [...document.querySelectorAll('.bcard')];
  return {
    htmlClass: document.documentElement.className,
    revealTotal: document.querySelectorAll('.reveal').length,
    revealOn: document.querySelectorAll('.reveal.on').length,
    bcardClasses: cards.map((c) => c.className).slice(0, 2),
    firstCardRect: cards[0] ? cards[0].getBoundingClientRect().top : null,
    bodyH: document.body.scrollHeight,
  };
});
console.log(JSON.stringify(info, null, 1));
console.log('errors:', errors);
await b.close();
