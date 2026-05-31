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
  await page.goto("https://huggingface.co/join", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.waitForTimeout(1000);

  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000);

  console.log("URL:", page.url());

  const errors = await page.locator(".error, [class*=error], [role=alert]").all();
  for (const e of errors) {
    const text = await e.innerText();
    if (text.trim()) console.log("Error:", text);
  }

  if (!page.url().includes("/join")) {
    console.log("✅ MOVED PAST REGISTRATION!");
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
    if (msgs["hydra:member"]?.length > 0) {
      console.log("✅ GOT EMAIL:", msgs["hydra:member"][0].subject || "No subject");

      const msgResp = await fetch(`https://api.mail.tm/messages/${msgs["hydra:member"][0].id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const msg = await msgResp.json();
      const body = msg.text || "";
      const linkMatch = body.match(/(https:\/\/huggingface\.co[^\s"']+)/);
      if (linkMatch) {
        console.log("Verification link:", linkMatch[1]);

        console.log("Visiting verification link...");
        await page.goto(linkMatch[1], { waitUntil: "networkidle" });
        await page.waitForTimeout(3000);
        console.log("After verification URL:", page.url());

        const cookies = await page.context().cookies();
        const hfChat = cookies.find((c) => c.name === "hf-chat");
        console.log("hf-chat cookie:", hfChat ? "FOUND" : "NOT FOUND");

        if (hfChat) {
          console.log("Cookie value:", hfChat.value.slice(0, 50) + "...");
        }
      }
      break;
    }
    if (i % 5 === 0) console.log(`Waiting... (${(i + 1) * 3}s)`);
  }

  await browser.close();
}

run().catch(console.error);
