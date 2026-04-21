const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
  await page.goto('http://localhost:20128/dashboard/providers/codex', { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForTimeout(3000); // wait 3s for React to render
  const errorText = await page.evaluate(() => document.body.innerText);
  console.log('INNERTEXT:', errorText.substring(0, 1000));
  await browser.close();
})();
