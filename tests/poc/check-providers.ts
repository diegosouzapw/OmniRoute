import { launch } from "cloakbrowser";
import { setTimeout as sleep } from "node:timers/promises";

async function run() {
  const browser = await launch({ headless: true, humanize: true });

  // Test t3.chat
  console.log("=== t3.chat ===");
  const page1 = await browser.newPage();
  await page1.goto("https://t3.chat/signup", { waitUntil: "domcontentloaded" });
  await page1.waitForTimeout(3000);

  const html1 = await page1.content();
  const hasCaptcha1 = html1.includes("captcha") || html1.includes("hcaptcha") || html1.includes("turnstile");
  console.log("CAPTCHA:", hasCaptcha1);

  const inputs1 = await page1.locator("input").all();
  for (const input of inputs1) {
    const name = await input.getAttribute("name");
    const type = await input.getAttribute("type");
    const placeholder = await input.getAttribute("placeholder");
    if (name) console.log("Input:", name, "type:", type, "placeholder:", placeholder);
  }

  const buttons1 = await page1.locator("button").all();
  for (const b of buttons1) {
    const text = await b.innerText();
    if (text.trim()) console.log("Button:", text);
  }

  console.log("URL:", page1.url());
  await page1.close();

  // Test Qwen
  console.log("\n=== Qwen Web ===");
  const page2 = await browser.newPage();
  await page2.goto("https://chat.qwen.ai", { waitUntil: "domcontentloaded" });
  await page2.waitForTimeout(3000);

  const html2 = await page2.content();
  const hasCaptcha2 = html2.includes("captcha") || html2.includes("hcaptcha") || html2.includes("turnstile");
  console.log("CAPTCHA:", hasCaptcha2);

  const inputs2 = await page2.locator("input").all();
  for (const input of inputs2) {
    const name = await input.getAttribute("name");
    const type = await input.getAttribute("type");
    const placeholder = await input.getAttribute("placeholder");
    if (name) console.log("Input:", name, "type:", type, "placeholder:", placeholder);
  }

  console.log("URL:", page2.url());
  await page2.close();

  // Test Phind
  console.log("\n=== Phind ===");
  const page3 = await browser.newPage();
  await page3.goto("https://www.phind.com", { waitUntil: "domcontentloaded" });
  await page3.waitForTimeout(3000);

  const html3 = await page3.content();
  const hasCaptcha3 = html3.includes("captcha") || html3.includes("hcaptcha") || html3.includes("turnstile");
  console.log("CAPTCHA:", hasCaptcha3);

  console.log("URL:", page3.url());
  await page3.close();

  await browser.close();
}

run().catch(console.error);
