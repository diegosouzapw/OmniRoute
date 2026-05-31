import { launch } from "cloakbrowser";
import { setTimeout as sleep } from "node:timers/promises";
import { randomUUID } from "node:crypto";

async function run() {
  const browser = await launch({ headless: true, humanize: true });
  const page = await browser.newPage();

  const email = `poc-${randomUUID().slice(0, 8)}@test.com`;
  const password = `X9k!${randomUUID().slice(0, 16)}mZ2`;
  const username = `pocuser${randomUUID().slice(0, 6)}`;

  console.log("Email:", email);
  console.log("Username:", username);

  await page.goto("https://huggingface.co/join", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  // Step 1
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.waitForTimeout(1000);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  // Step 2
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="fullname"]', "Test User");
  await page.waitForTimeout(500);

  const checkbox = page.locator('input[type="checkbox"]');
  if (await checkbox.isVisible()) {
    await checkbox.click();
    await page.waitForTimeout(500);
  }

  // Monitor network
  const requests: string[] = [];
  page.on("request", (req) => {
    if (req.method() === "POST") {
      requests.push(req.url());
    }
  });

  // Click Create Account
  console.log("Clicking Create Account...");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(8000);

  console.log("POST requests:", requests.length);
  for (const url of requests) {
    console.log("  -", url);
  }

  console.log("URL:", page.url());

  // Check for validation errors
  const validationErrors = await page.locator(":invalid").all();
  for (const el of validationErrors) {
    const name = await el.getAttribute("name");
    const validationMessage = await el.evaluate((el: HTMLInputElement) => el.validationMessage);
    if (name && validationMessage) {
      console.log(`Validation error on ${name}:`, validationMessage);
    }
  }

  await browser.close();
}

run().catch(console.error);
