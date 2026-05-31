import { launch } from "cloakbrowser";
import { setTimeout as sleep } from "node:timers/promises";

async function run() {
  const browser = await launch({ headless: true, humanize: true });
  const page = await browser.newPage();
  await page.goto("https://huggingface.co/join", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  const htmlBefore = await page.content();
  console.log("hCaptcha before fill:", htmlBefore.includes("hcaptcha"));

  await page.fill('input[name="email"]', "test@example.com");
  await page.fill('input[name="password"]', "X9k!Abcdefgh1234mZ2");
  await page.waitForTimeout(1000);

  const htmlAfter = await page.content();
  console.log("hCaptcha after fill:", htmlAfter.includes("hcaptcha"));

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);

  const htmlClick = await page.content();
  console.log("hCaptcha after click:", htmlClick.includes("hcaptcha"));

  const iframes = await page.locator("iframe").all();
  for (const iframe of iframes) {
    const src = await iframe.getAttribute("src");
    if (src?.includes("captcha") || src?.includes("hcaptcha")) {
      console.log("CAPTCHA iframe:", src.slice(0, 100));
    }
  }

  // Check for error messages
  const errors = await page.locator(".error, [class*=error], [role=alert]").all();
  for (const e of errors) {
    const text = await e.innerText();
    if (text.trim()) console.log("Error:", text);
  }

  await browser.close();
}

run().catch(console.error);
