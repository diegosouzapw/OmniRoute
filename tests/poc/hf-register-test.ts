import { launch } from "cloakbrowser";
import { setTimeout as sleep } from "node:timers/promises";
import { randomUUID } from "node:crypto";

async function testRegistration() {
  const domainsResp = await fetch("https://api.mail.tm/domains");
  const domains = await domainsResp.json();
  const domain = domains["hydra:member"][0].domain;
  const email = `poc-${Date.now()}@${domain}`;
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
  console.log("Password:", password);

  const browser = await launch({ headless: true, humanize: true });
  const page = await browser.newPage();

  await page.goto("https://huggingface.co/join", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);

  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000);

  console.log("Current URL:", page.url());

  const errors = await page.locator(".error, .alert, [class*=error], [class*=alert]").all();
  for (const error of errors) {
    const text = await error.innerText();
    console.log("Error:", text);
  }

  // Check if we moved past the join page
  if (!page.url().includes("/join")) {
    console.log("✅ Registration page passed!");
    const cookies = await page.context().cookies();
    console.log("Cookies:", cookies.map((c) => c.name).join(", "));
  }

  console.log("Waiting for verification email...");
  for (let i = 0; i < 20; i++) {
    await sleep(3000);
    const msgsResp = await fetch("https://api.mail.tm/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const msgs = await msgsResp.json();
    const messages = msgs["hydra:member"] || [];

    if (messages.length > 0) {
      console.log("✅ Got email:", messages[0].subject || "No subject");
      console.log("From:", messages[0].from?.address);

      const msgResp = await fetch(`https://api.mail.tm/messages/${messages[0].id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const msg = await msgResp.json();
      const body = msg.text || msg.html || "";
      const linkMatch = body.match(/(https:\/\/huggingface\.co[^\s"']+)/);
      if (linkMatch) {
        console.log("Verification link:", linkMatch[1]);

        // Visit verification link
        console.log("Visiting verification link...");
        await page.goto(linkMatch[1], { waitUntil: "networkidle" });
        await page.waitForTimeout(3000);
        console.log("After verification URL:", page.url());

        // Now check if we're logged in
        const cookies = await page.context().cookies();
        const hfChat = cookies.find((c) => c.name === "hf-chat");
        console.log("hf-chat cookie:", hfChat ? "FOUND" : "NOT FOUND");

        // Try HuggingChat API
        console.log("Testing HuggingChat API...");
        const chatResp = await page.evaluate(async () => {
          const r = await fetch("/chat/conversation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model: "meta-llama/Llama-3.1-8B-Instruct", inputs: "Say ok" }),
          });
          return { status: r.status, type: r.headers.get("content-type") };
        });
        console.log("Chat API:", chatResp.status, chatResp.type);
      }
      break;
    }

    if (i % 5 === 0) console.log("Still waiting... (" + (i + 1) * 3 + "s)");
  }

  await browser.close();
}

testRegistration().catch(console.error);
