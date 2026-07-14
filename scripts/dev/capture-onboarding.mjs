#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const url = process.env.ONBOARDING_URL || "http://localhost:20129/dashboard/onboarding";
const port = new URL(url).port || "20129";
const out = `C:/Users/JK/AppData/Local/Temp/onboarding-${port}-verify.png`;
const locale = process.env.ONBOARDING_LOCALE || "en";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(url, {
  waitUntil: "domcontentloaded",
  timeout: 60000,
  extraHTTPHeaders: { "Accept-Language": locale },
});
await page.waitForSelector(".grid.grid-cols-3", { timeout: 60000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: out, fullPage: false });

const html = await page
  .locator(".grid.grid-cols-3")
  .first()
  .evaluate((el) => el.outerHTML);
const cards = page.locator(".grid.grid-cols-3 > div");
const count = await cards.count();
const metrics = [];

for (let i = 0; i < count; i++) {
  const card = cards.nth(i);
  const icon = card.locator(".material-symbols-outlined");
  const label = card.locator("span.text-xs");
  metrics.push({
    i,
    text: await label.innerText(),
    card: await card.boundingBox(),
    icon: await icon.boundingBox(),
    label: await label.boundingBox(),
  });
}

await browser.close();

const report = { screenshot: out, url, html, metrics };
fs.mkdirSync(path.join(repoRoot, ".tmp"), { recursive: true });
fs.writeFileSync(
  path.join(repoRoot, ".tmp", "onboarding-verify.json"),
  JSON.stringify(report, null, 2)
);
console.log(JSON.stringify(report, null, 2));
