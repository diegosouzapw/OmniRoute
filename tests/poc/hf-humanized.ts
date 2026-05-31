import { launch } from "cloakbrowser";
import { setTimeout as sleep } from "node:timers/promises";
import { randomUUID } from "node:crypto";

async function run() {
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

  const browser = await launch({ headless: true, humanize: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto("https://huggingface.co/join", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  await page.click('input[name="email"]');
  await page.waitForTimeout(500);
  await page.type('input[name="email"]', email, { delay: 100 });
  await page.waitForTimeout(1000);

  await page.click('input[name="password"]');
  await page.waitForTimeout(500);
  await page.type('input[name="password"]', password, { delay: 100 });
  await page.waitForTimeout(1000);

  await page.click('button[type="submit"]');
  await page.waitForTimeout(8000);

  console.log("URL:", page.url());

  if (!page.url().includes("/join")) {
    console.log("✅ PAST REGISTRATION!");
    const cookies = await page.context().cookies();
    console.log("Cookies:", cookies.map((c) => c.name).join(", "));
  } else {
    const iframes = await page.locator("iframe[src*=hcaptcha]").all();
    console.log("hCaptcha iframes:", iframes.length);

    // Check if there's a checkbox-style CAPTCHA
    const checkboxes = await page.locator('[class*=captcha], [id*=captcha]').all();
    console.log("CAPTCHA elements:", checkboxes.length);

    // Try to find and click the hCaptcha checkbox
    const hcaptchaFrame = page.frameLocator("iframe[src*=hcaptcha]");
    try {
      const checkbox = hcaptchaFrame.locator("#checkbox");
      if (await checkbox.isVisible({ timeout: 2000 })) {
        console.log("hCaptcha checkbox found, clicking...");
        await checkbox.click();
        await page.waitForTimeout(5000);
        console.log("After click URL:", page.url());
      }
    } catch {
      console.log("No hCaptcha checkbox found");
    }
  }

  await browser.close();
}

run().catch(console.error);
