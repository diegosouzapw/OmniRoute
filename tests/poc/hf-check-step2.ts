import { launch } from "cloakbrowser";
import { setTimeout as sleep } from "node:timers/promises";
import { randomUUID } from "node:crypto";

async function run() {
  const browser = await launch({ headless: true, humanize: true });
  const page = await browser.newPage();

  const email = `poc-${randomUUID().slice(0, 8)}@test.com`;
  const password = `X9k!${randomUUID().slice(0, 16)}mZ2`;
  const username = `poc${randomUUID().slice(0, 8)}`;

  await page.goto("https://huggingface.co/join", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.waitForTimeout(1000);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  // Step 2 - check all form elements
  const html = await page.content();
  const inputs = html.match(/<input[^>]*>/gi) || [];
  console.log("All inputs:");
  inputs.forEach((i: string) => console.log("  ", i.slice(0, 200)));

  const hiddenInputs = await page.locator('input[type="hidden"]').all();
  for (const input of hiddenInputs) {
    const name = await input.getAttribute("name");
    const value = await input.getAttribute("value");
    console.log("Hidden:", name, "=", value?.slice(0, 50));
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
