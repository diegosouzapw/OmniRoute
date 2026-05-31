import { launch } from "cloakbrowser";
import { setTimeout as sleep } from "node:timers/promises";
import { randomUUID } from "node:crypto";

async function run() {
  const browser = await launch({ headless: true, humanize: true });
  const page = await browser.newPage();

  const domainsResp = await fetch("https://api.mail.tm/domains");
  const domains = await domainsResp.json();
  const domain = domains["hydra:member"][0].domain;
  const email = `poc-${randomUUID().slice(0, 8)}@${domain}`;
  const password = `X9k!${randomUUID().slice(0, 16)}mZ2`;
  const username = `pocuser${randomUUID().slice(0, 6)}`;

  await fetch("https://api.mail.tm/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: email, password }),
  });

  const tokenResp = await fetch("https://api.mail.tm/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: email, password }),
  });
  const { token } = await tokenResp.json();
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

  console.log("Step 2 URL:", page.url());

  // Step 2
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="fullname"]', "Test User");
  await page.waitForTimeout(500);

  // Check checkbox
  const checkbox = page.locator('input[type="checkbox"]');
  if (await checkbox.isVisible()) {
    await checkbox.click();
    await page.waitForTimeout(500);
    console.log("Checkbox checked:", await checkbox.isChecked());
  }

  // Click Create Account
  console.log("Clicking Create Account...");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(8000);

  console.log("URL after click:", page.url());

  // Check for errors
  const errors = await page.locator(".error, [class*=error], [role=alert]").all();
  for (const e of errors) {
    const text = await e.innerText();
    if (text.trim()) console.log("Error:", text);
  }

  // Check page text
  const pageText = await page.evaluate(() => document.body.innerText.slice(0, 500));
  console.log("Page text:", pageText.slice(0, 300));

  // Wait for verification email
  console.log("Waiting for verification email...");
  for (let i = 0; i < 20; i++) {
    await sleep(3000);
    const msgsResp = await fetch("https://api.mail.tm/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const msgs = await msgsResp.json();
    if (msgs["hydra:member"]?.length > 0) {
      console.log("✅ GOT EMAIL:", msgs["hydra:member"][0].subject || "No subject");
      break;
    }
    if (i % 5 === 0) console.log(`Waiting... (${(i + 1) * 3}s)`);
  }

  await browser.close();
}

run().catch(console.error);
