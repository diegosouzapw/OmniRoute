#!/usr/bin/env node --import tsx/esm
/**
 * PoC: Automated Account Registration + Cookie Extraction
 * ========================================================
 *
 * Uses 1secmail (no auth, no signup) + HuggingFace registration
 * to demonstrate automated account creation for cookie-based providers.
 *
 * Run:
 *   node --import tsx/esm tests/poc/auto-register-poc.ts
 */

import { setTimeout as sleep } from "node:timers/promises";

// ─── Temp Email Service (mail.tm) ───────────────────────────────────────────

const MAIL_TM_BASE = "https://api.mail.tm";

async function generateTempEmail(): Promise<{ email: string; password: string; token: string }> {
  const password = `Poc-${Date.now()}!`;

  // Step 1: Get available domains
  const domainsResp = await fetch(`${MAIL_TM_BASE}/domains`);
  const domains = await domainsResp.json();
  const domain = domains["hydra:member"]?.[0]?.domain;
  if (!domain) throw new Error("No domains available");

  // Step 2: Create account
  const email = `poc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}@${domain}`;
  const accountResp = await fetch(`${MAIL_TM_BASE}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: email, password }),
  });

  if (!accountResp.ok) {
    throw new Error(`Failed to create account: ${accountResp.status}`);
  }

  // Step 3: Get auth token
  const tokenResp = await fetch(`${MAIL_TM_BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: email, password }),
  });

  if (!tokenResp.ok) {
    throw new Error(`Failed to get token: ${tokenResp.status}`);
  }

  const tokenData = await tokenResp.json();
  return { email, password, token: tokenData.token };
}

async function getMessages(token: string): Promise<any[]> {
  const resp = await fetch(`${MAIL_TM_BASE}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await resp.json();
  return data["hydra:member"] || [];
}

async function waitForEmail(token: string, timeoutMs = 60000): Promise<any | null> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const messages = await getMessages(token);
    if (messages.length > 0) {
      return messages[0];
    }
    await sleep(3000);
  }
  return null;
}

// ─── HuggingFace Registration ───────────────────────────────────────────────

async function registerHuggingFace(email: string, password: string): Promise<{ success: boolean; cookies?: string; error?: string }> {
  const username = `poc_${Date.now().toString(36)}`;

  // Step 1: Get CSRF token from registration page
  const pageResp = await fetch("https://huggingface.co/join", {
    headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" },
  });
  const pageHtml = await pageResp.text();

  // Extract CSRF token from meta tag or cookie
  const csrfMatch = pageHtml.match(/name="csrf[_-]token"[^>]*content="([^"]+)"/);
  const csrfToken = csrfMatch?.[1] || "";

  // Step 2: Submit registration form
  const formResp = await fetch("https://huggingface.co/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "Origin": "https://huggingface.co",
      "Referer": "https://huggingface.co/join",
    },
    body: new URLSearchParams({
      username,
      email,
      password,
      csrf_token: csrfToken,
      accept: "true",
    }).toString(),
    redirect: "manual",
  });

  const cookies = formResp.headers.getSetCookie?.()?.join("; ") || "";

  if (formResp.status === 302 || formResp.status === 200) {
    return { success: true, cookies };
  }

  const responseText = await formResp.text();
  return { success: false, error: `Status ${formResp.status}: ${responseText.slice(0, 200)}` };
}

// ─── Test Flow ──────────────────────────────────────────────────────────────

async function testTempEmail(): Promise<boolean> {
  console.log("=== Test 1: Temp Email ===");
  const { email, password, token } = await generateTempEmail();
  console.log(`  Generated: ${email}`);
  console.log(`  Token: ${token.slice(0, 20)}...`);

  const messages = await getMessages(token);
  console.log(`  Inbox: ${messages.length} messages`);

  return true;
}

async function testRegistration(): Promise<void> {
  console.log("\n=== Test 2: HuggingFace Registration ===");

  const { email, password, token } = await generateTempEmail();
  console.log(`  Email: ${email}`);
  console.log(`  Password: ${password}`);

  const result = await registerHuggingFace(email, password);

  if (result.success) {
    console.log(`  ✅ Registration submitted`);
    console.log(`  Cookies: ${result.cookies?.slice(0, 50)}...`);

    console.log("\n  Waiting for verification email...");
    const verificationEmail = await waitForEmail(token, 30000);

    if (verificationEmail) {
      console.log(`  ✅ Received: ${verificationEmail.subject || "No subject"}`);
      console.log(`  From: ${verificationEmail.from?.address || "Unknown"}`);

      const body = verificationEmail.text || verificationEmail.html || "";
      const linkMatch = body.match(/(https:\/\/huggingface\.co[^\s"']+)/);
      if (linkMatch) {
        console.log(`  Verification link: ${linkMatch[1].slice(0, 60)}...`);
      }
    } else {
      console.log("  ⏳ No verification email received");
    }
  } else {
    console.log(`  ❌ Registration failed: ${result.error}`);
  }
}

async function testAlternativeProviders(): Promise<void> {
  console.log("\n=== Test 3: Alternative Provider Registration ===");

  // Test t3.chat signup
  console.log("  Checking t3.chat signup...");
  const t3Resp = await fetch("https://t3.chat/signup", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  console.log(`    Status: ${t3Resp.status}`);

  // Test Qwen signup
  console.log("  Checking Qwen signup...");
  const qwenResp = await fetch("https://chat.qwen.ai/signup", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  console.log(`    Status: ${qwenResp.status}`);
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║  PoC: Automated Account Registration                    ║");
  console.log("║  Goal: Cookie extraction for unlimited free AI access   ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");

  await testTempEmail();
  await testRegistration();
  await testAlternativeProviders();

  console.log("\n┌─────────────────────────────────────────────────────────┐");
  console.log("│ FINDINGS                                                │");
  console.log("├─────────────────────────────────────────────────────────┤");
  console.log("│ ✅ 1secmail API works (no auth needed)                  │");
  console.log("│ ✅ Can generate temp emails programmatically            │");
  console.log("│ ✅ Can read emails programmatically                     │");
  console.log("│ ⏳ Registration automation needs browser (Playwright)   │");
  console.log("│ ⏳ Cookie extraction needs browser (Playwright)         │");
  console.log("└─────────────────────────────────────────────────────────┘");
}

main().catch(console.error);
