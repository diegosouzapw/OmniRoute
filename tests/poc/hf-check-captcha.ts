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

  // Step 2
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="fullname"]', "Test User");
  await page.waitForTimeout(1000);

  // Check for CAPTCHA token
  const html = await page.content();
  const captchaMatch = html.match(/h-captcha-response|captcha.*token|g-recaptcha/i);
  if (captchaMatch) {
    console.log("CAPTCHA token found:", captchaMatch[0]);
  }

  // Check for h-captcha-response textarea
  const textarea = await page.locator('textarea[name="h-captcha-response"]').all();
  console.log("h-captcha-response textareas:", textarea.length);

  // Check for any hidden CAPTCHA elements
  const captchaElements = await page.locator("[id*=captcha], [class*=captcha], [data-captcha]").all();
  console.log("CAPTCHA elements:", captchaElements.length);

  // Try to find the actual submit button
  const buttons = await page.locator("button").all();
  for (const b of buttons) {
    const text = await b.innerText();
    const type = await b.getAttribute("type");
    const disabled = await b.getAttribute("disabled");
    console.log("Button:", JSON.stringify(text), "type:", type, "disabled:", disabled);
  }

  await browser.close();
}

run().catch(console.error);
