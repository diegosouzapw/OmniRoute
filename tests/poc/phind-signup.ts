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

  // Check Phind signup
  console.log("\n=== Phind Signup ===");
  await page.goto("https://www.phind.com/signup", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  console.log("URL:", page.url());

  const html = await page.content();
  const hasCaptcha = html.includes("captcha") || html.includes("hcaptcha") || html.includes("turnstile");
  console.log("CAPTCHA:", hasCaptcha);

  const inputs = await page.locator("input").all();
  for (const input of inputs) {
    const name = await input.getAttribute("name");
    const type = await input.getAttribute("type");
    const placeholder = await input.getAttribute("placeholder");
    if (name) console.log("Input:", name, "type:", type, "placeholder:", placeholder);
  }

  const buttons = await page.locator("button").all();
  for (const b of buttons) {
    const text = await b.innerText();
    if (text.trim()) console.log("Button:", text);
  }

  // Try to fill form if exists
  const emailInput = page.locator('input[name="email"], input[type="email"]');
  if (await emailInput.isVisible()) {
    console.log("\nFilling form...");
    await emailInput.fill(email);
    await page.waitForTimeout(500);

    const passwordInput = page.locator('input[name="password"], input[type="password"]');
    if (await passwordInput.isVisible()) {
      await passwordInput.fill(password);
      await page.waitForTimeout(500);
    }

    // Click signup
    const submitBtn = page.locator('button[type="submit"]');
    if (await submitBtn.isVisible()) {
      console.log("Clicking signup...");
      await submitBtn.click();
      await page.waitForTimeout(5000);

      console.log("URL after signup:", page.url());

      // Check for errors
      const errors = await page.locator(".error, [class*=error], [role=alert]").all();
      for (const e of errors) {
        const text = await e.innerText();
        if (text.trim()) console.log("Error:", text);
      }

      // Wait for verification email
      console.log("Waiting for verification email...");
      for (let i = 0; i < 10; i++) {
        await sleep(3000);
        const msgsResp = await fetch("https://api.mail.tm/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const msgs = await msgsResp.json();
        if (msgs["hydra:member"]?.length > 0) {
          console.log("✅ GOT EMAIL:", msgs["hydra:member"][0].subject || "No subject");
          break;
        }
        if (i % 3 === 0) console.log(`Waiting... (${(i + 1) * 3}s)`);
      }
    }
  }

  await browser.close();
}

run().catch(console.error);
