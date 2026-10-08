const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { chromium } = require("@playwright/test");
const postcss = require("postcss");
const tailwind = require("@tailwindcss/postcss");
(async () => {
  const { css } = await postcss([tailwind()]).process(
    `@import "tailwindcss" source(none); @source "${resolve("src/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded.tsx")}";`,
    { from: resolve("src/layout-test.css") }
  );
  const font = readFileSync(
    resolve("node_modules/material-symbols/material-symbols-outlined.woff2")
  ).toString("base64");
  const fontCss = `@font-face{font-family:Symbols;src:url(data:font/woff2;base64,${font})}.material-symbols-outlined{font-family:Symbols;font-weight:normal;font-style:normal;line-height:1;white-space:nowrap;word-wrap:normal;font-feature-settings:'liga'}`;
  const fixture = readFileSync(process.argv[2], "utf8");
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
  });
  try {
    const page = await browser.newPage({ viewport: { width: 650, height: 600 } });
    for (const locale of ["en", "de"])
      for (const width of [230, 280, 320, 380]) {
        const messages = JSON.parse(
          readFileSync(resolve(`src/i18n/messages/${locale}.json`), "utf8")
        ).usage;
        const html = fixture.replace(/translated:(\w+)/g, (_match, key) =>
          String(messages[key] || key)
        );
        await page.setContent(
          `<style>${css}\n${fontCss}</style><div id="card" style="width:${width}px;overflow:hidden">${html}</div>`
        );
        await page.evaluate(() => document.fonts.ready);
        const buttons = page.locator("#card button");
        assert.equal(await buttons.count(), 4);
        for (const button of await buttons.all()) {
          const fits = await button.evaluate((element) => {
            const b = element.getBoundingClientRect(),
              card = document.querySelector("#card").getBoundingClientRect();
            return (
              b.left >= card.left &&
              b.right <= card.right &&
              element.scrollWidth <= element.clientWidth + 1 &&
              [b.left + 2, b.right - 2].every((x) =>
                element.contains(document.elementFromPoint(x, b.top + b.height / 2))
              )
            );
          });
          assert.ok(fits, `${locale}, width ${width}: ${await button.textContent()} clipped`);
          await button.click({ timeout: 2000 });
        }
        if (width === 320) await page.screenshot({ path: `/tmp/quota-actions-${locale}.png` });
      }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
