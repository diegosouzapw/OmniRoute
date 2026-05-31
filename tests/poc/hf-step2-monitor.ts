import { launch } from "cloakbrowser";
import { setTimeout as sleep } from "node:timers/promises";
import { randomUUID } from "node:crypto";

async function run() {
  const browser = await launch({ headless: true, humanize: true });
  const page = await browser.newPage();

  const email = `poc-${randomUUID().slice(0, 8)}@test.com`;
  const password = `X9k!${randomUUID().slice(0, 16)}mZ2`;
  const username = `poc${randomUUID().slice(0, 8)}`;

  console.log("Email:", email);
  console.log("Username:", username);

  await page.goto("https://huggingface.co/join", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.waitForTimeout(1000);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  await page.fill('input[name="username"]', username);
  await page.fill('input[name="fullname"]', "Test User");
  await page.waitForTimeout(1000);

  const requests: string[] = [];
  page.on("request", (req) => {
    if (req.method() === "POST") {
      requests.push(req.url());
    }
  });

  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000);

  console.log("POST requests:", requests.length);
  for (const url of requests) {
    console.log("  -", url);
  }

  const errors = await page.locator(".error, [class*=error], [role=alert]").all();
  for (const e of errors) {
    const text = await e.innerText();
    if (text.trim()) console.log("Error:", text);
  }

  const pageText = await page.evaluate(() => document.body.innerText.slice(0, 500));
  if (pageText.includes("captcha") || pageText.includes("CAPTCHA")) {
    console.log("CAPTCHA text found on page");
  }

  console.log("Page text:", pageText.slice(0, 300));

  await browser.close();
}

run().catch(console.error);
