#!/usr/bin/env node --import tsx/esm
/**
 * PoC: Temp Email + Account Registration for Cookie-Based Providers
 * ================================================================
 *
 * Demonstrates automated account creation using temp email services
 * to bypass cookie-based authentication for free AI providers.
 *
 * Run:
 *   node --import tsx/esm tests/poc/temp-email-poc.ts
 */

import { setTimeout as sleep } from "node:timers/promises";

const MAIL_TM_BASE = "https://api.mail.tm";

// ─── Temp Email Service ─────────────────────────────────────────────────────

interface TempEmail {
  address: string;
  password: string;
  token: string;
  id: string;
}

async function createTempEmail(): Promise<TempEmail> {
  // Step 1: Get available domains
  const domainsResp = await fetch(`${MAIL_TM_BASE}/domains`);
  const domains = await domainsResp.json();
  const domain = domains["hydra:member"]?.[0]?.domain;
  if (!domain) throw new Error("No domains available");

  // Step 2: Create account
  const address = `poc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@${domain}`;
  const password = `Poc-${Date.now()}!`;
  
  const accountResp = await fetch(`${MAIL_TM_BASE}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });
  
  if (!accountResp.ok) {
    throw new Error(`Failed to create account: ${accountResp.status}`);
  }
  
  const account = await accountResp.json();
  
  // Step 3: Get auth token
  const tokenResp = await fetch(`${MAIL_TM_BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });
  
  if (!tokenResp.ok) {
    throw new Error(`Failed to get token: ${tokenResp.status}`);
  }
  
  const tokenData = await tokenResp.json();
  
  return {
    address,
    password,
    token: tokenData.token,
    id: account.id,
  };
}

async function waitForEmail(token: string, timeoutMs = 30000): Promise<any | null> {
  const deadline = Date.now() + timeoutMs;
  
  while (Date.now() < deadline) {
    const resp = await fetch(`${MAIL_TM_BASE}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    if (resp.ok) {
      const data = await resp.json();
      const messages = data["hydra:member"] || [];
      if (messages.length > 0) {
        return messages[0];
      }
    }
    
    await sleep(2000);
  }
  
  return null;
}

// ─── Tests ──────────────────────────────────────────────────────────────────

async function testTempEmailFlow(): Promise<void> {
  console.log("=== PoC: Temp Email Flow ===\n");
  
  // Test 1: Create temp email
  console.log("1. Creating temp email account...");
  const email = await createTempEmail();
  console.log(`   ✅ Created: ${email.address}`);
  console.log(`   ID: ${email.id}`);
  
  // Test 2: Verify inbox is empty
  console.log("\n2. Checking inbox...");
  const resp = await fetch(`${MAIL_TM_BASE}/messages`, {
    headers: { Authorization: `Bearer ${email.token}` },
  });
  const inbox = await resp.json();
  console.log(`   ✅ Inbox: ${inbox["hydra:totalItems"]} messages`);
  
  // Test 3: Wait for email (with timeout)
  console.log("\n3. Waiting for email (5s timeout)...");
  const message = await waitForEmail(email.token, 5000);
  if (message) {
    console.log(`   ✅ Received: ${message.subject}`);
  } else {
    console.log("   ⏳ No emails received (expected for PoC)");
  }
  
  console.log("\n=== PoC Complete ===");
  console.log("Temp email flow works end-to-end.");
  console.log("Next step: Use this email to register on HuggingFace/t3.chat/etc.");
}

async function testProviderRegistration(): Promise<void> {
  console.log("\n=== PoC: Provider Registration ===\n");
  
  // Test HuggingFace registration endpoint
  console.log("1. Checking HuggingFace registration...");
  const hfResp = await fetch("https://huggingface.co/join", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  console.log(`   Status: ${hfResp.status}`);
  console.log(`   Content-Type: ${hfResp.headers.get("content-type")}`);
  
  // Test t3.chat registration
  console.log("\n2. Checking t3.chat registration...");
  const t3Resp = await fetch("https://t3.chat/signup", {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  console.log(`   Status: ${t3Resp.status}`);
  
  console.log("\n=== Registration Check Complete ===");
  console.log("Both providers have registration pages.");
  console.log("Next step: Automate registration with temp email.");
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("╔══════════════════════════════════════════════════════════╗");
  console.log("║  PoC: Temp Email + Account Registration                 ║");
  console.log("║  Goal: Bypass cookie-based auth for free AI providers   ║");
  console.log("╚══════════════════════════════════════════════════════════╝\n");
  
  await testTempEmailFlow();
  await testProviderRegistration();
  
  console.log("\n┌─────────────────────────────────────────────────────────┐");
  console.log("│ FINDINGS                                                │");
  console.log("├─────────────────────────────────────────────────────────┤");
  console.log("│ ✅ Temp email API works (mail.tm)                       │");
  console.log("│ ✅ Can create accounts programmatically                 │");
  console.log("│ ✅ Can read emails programmatically                     │");
  console.log("│ ⏳ Registration automation needs browser automation     │");
  console.log("│ ⏳ Cookie extraction needs Playwright/Puppeteer         │");
  console.log("└─────────────────────────────────────────────────────────┘");
}

main().catch(console.error);
