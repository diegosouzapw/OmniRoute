import { launch } from "cloakbrowser";
import { setTimeout as sleep } from "node:timers/promises";

async function run() {
  const browser = await launch({ headless: true, humanize: true });
  const page = await browser.newPage();

  console.log("=== DuckDuckGo AI Chat Test ===\n");

  // Navigate to Duck.ai
  await page.goto("https://duck.ai", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(3000);

  console.log("URL:", page.url());

  // Find the chat input
  const textarea = page.locator("textarea, [contenteditable=true]");
  if (await textarea.isVisible()) {
    console.log("Chat input found");

    // Type a message
    await textarea.fill("Say ok and nothing else");
    await page.waitForTimeout(500);

    // Find and click send button
    const sendBtn = page.locator('button[type="submit"], button:has-text("Send"), button[aria-label*="send"]');
    if (await sendBtn.isVisible()) {
      console.log("Clicking send...");
      await sendBtn.click();
      await page.waitForTimeout(10000);

      // Check for response
      const responseText = await page.evaluate(() => {
        const messages = document.querySelectorAll('[class*="message"], [class*="response"], [class*="answer"]');
        return Array.from(messages).map(m => m.textContent?.trim()).filter(Boolean).join("\n");
      });

      if (responseText) {
        console.log("Response:", responseText.slice(0, 200));
      } else {
        console.log("No response found");
      }
    } else {
      console.log("Send button not found");
    }
  } else {
    console.log("Chat input not found");
  }

  // Also test the API directly
  console.log("\n=== Direct API Test ===");
  const statusResp = await fetch("https://duckduckgo.com/duckchat/v1/status", {
    headers: {
      "Accept": "text/event-stream",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
  });
  console.log("Status:", statusResp.status);
  console.log("VQD header:", statusResp.headers.get("x-vqd-hash-1")?.slice(0, 30));

  await browser.close();
}

run().catch(console.error);
