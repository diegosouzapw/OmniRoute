/**
 * PoC: CloakBrowser + Temp Email for Automated Registration
 * ==========================================================
 *
 * Uses CloakBrowser (stealth Chromium) + mail.tm for automated
 * account creation on cookie-based free AI providers.
 *
 * Run:
 *   node --import tsx/esm tests/poc/cloakbrowser-poc.ts
 */

import { setTimeout as sleep } from "node:timers/promises";

// ─── Temp Email (mail.tm) ───────────────────────────────────────────────────

const MAIL_TM_BASE = "https://api.mail.tm";

async function createTempEmail(): Promise<{ email: string; token: string }> {
  const password = `Poc-${Date.now()}!`;
  const domainsResp = await fetch(`${MAIL_TM_BASE}/domains`);
  const domains = await domainsResp.json();
  const domain = domains["hydra:member"][0].domain;
  const email = `poc-${Date.now()}@${domain}`;

  await fetch(`${MAIL_TM_BASE}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: email, password }),
  });

  const tokenResp = await fetch(`${MAIL_TM_BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: email, password }),
  });
  const { token } = await tokenResp.json();
  return { email, token };
}

async function waitForEmail(token: string, timeoutMs = 60000): Promise<any | null> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const resp = await fetch(`${MAIL_TM_BASE}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    const messages = data["hydra:member"] || [];
    if (messages.length > 0) {
      return messages[0];
    }
    await sleep(3000);
  }
  return null;
}

// ─── CloakBrowser Registration ──────────────────────────────────────────────

async function registerHuggingFace(email: string): Promise<{ success: boolean; cookies?: string; error?: string }> {
  const { launch } = await import("cloakbrowser");
  const password = `Poc-${Date.now()}!Aa1`;

  console.log(`  Launching CloakBrowser...`);
  const browser = await launch({
    headless: true,
    humanize: true,
  });

  try {
    const page = await browser.newPage();
    console.log(`  Navigating to registration page...`);
    await page.goto("https://huggingface.co/join", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);

    // Fill form (only email + password, no username field)
    console.log(`  Filling registration form...`);
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);

    // Submit
    console.log(`  Submitting registration...`);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(5000);

    // Get cookies
    const cookies = await page.context().cookies();
    const cookieStr = cookies.map(c => `${c.name}=${c.value}`).join("; ");

    console.log(`  Cookies: ${cookieStr.slice(0, 80)}...`);
    return { success: true, cookies: cookieStr };
  } catch (err: any) {
    console.log(`  Error: ${err.message}`);
    return { success: false, error: err.message };
  } finally {
    await browser.close();
  }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║  PoC: CloakBrowser + Temp Email Registration            ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  // Step 1: Create temp email
  console.log("1. Creating temp email...");
  const { email, token } = await createTempEmail();
  console.log(`   Email: ${email}`);

  // Step 2: Register with CloakBrowser
  console.log("\n2. Registering on HuggingFace...");
  const result = await registerHuggingFace(email);

  if (result.success) {
    console.log(`\n   ✅ Registration successful!`);

    // Step 3: Wait for verification email
    console.log("\n3. Waiting for verification email...");
    const verificationEmail = await waitForEmail(token, 30000);

    if (verificationEmail) {
      console.log(`   ✅ Received: ${verificationEmail.subject || "No subject"}`);
    } else {
      console.log("   ⏳ No verification email (may need manual verification)");
    }
  } else {
    console.log(`\n   ❌ Registration failed: ${result.error}`);
  }

  console.log("\n┌─────────────────────────────────────────────────────────┐");
  console.log("│ NEXT STEPS                                              │");
  console.log("├─────────────────────────────────────────────────────────┤");
  console.log("│ 1. If registration succeeded, extract cookies           │");
  console.log("│ 2. Use cookies for HuggingChat API access               │");
  console.log("│ 3. Repeat for other providers (t3.chat, Qwen, etc.)     │");
  console.log("│ 4. Store cookies in session pool for rotation           │");
  console.log("└─────────────────────────────────────────────────────────┘");
}

main().catch(console.error);
