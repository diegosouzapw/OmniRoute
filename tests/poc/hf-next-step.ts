import { launch } from "cloakbrowser";
import { setTimeout as sleep } from "node:timers/promises";
import { randomUUID } from "node:crypto";

async function run() {
  const browser = await launch({ headless: true, humanize: true });
  const page = await browser.newPage();

  const email = `poc-${randomUUID().slice(0, 8)}@test.com`;
  const password = `X9k!${randomUUID().slice(0, 16)}mZ2`;

  console.log("Email:", email);

  await page.goto("https://huggingface.co/join", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.waitForTimeout(1000);

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  console.log("URL after Next:", page.url());

  const pageText = await page.evaluate(() => document.body.innerText.slice(0, 1000));
  console.log("Page text:", pageText.slice(0, 500));

  const inputs = await page.locator("input").all();
  for (const input of inputs) {
    const name = await input.getAttribute("name");
    const type = await input.getAttribute("type");
    const placeholder = await input.getAttribute("placeholder");
    if (name) console.log("Input:", name, "type:", type, "placeholder:", placeholder);
  }

  const iframes = await page.locator("iframe").all();
  for (const iframe of iframes) {
    const src = await iframe.getAttribute("src");
    if (src?.includes("captcha") || src?.includes("hcaptcha")) {
      console.log("CAPTCHA iframe:", src.slice(0, 100));
    }
  }

  await browser.close();
}

run().catch(console.error);
