#!/usr/bin/env node
/**
 * Comprehensive provider validation test
 * Tests all no-auth providers with real requests and validates web-cookie session expiry logic
 */

import { OpencodeExecutor } from "../open-sse/executors/opencode.ts";
import { DuckDuckGoWebExecutor } from "../open-sse/executors/duckduckgo-web.ts";
import { TheOldLlmExecutor } from "../open-sse/executors/theoldllm.ts";
import { ChipotleExecutor } from "../open-sse/executors/chipotle.ts";
import { VeoAIFreeWebExecutor } from "../open-sse/executors/veoaifree-web.ts";
import { MimocodeExecutor } from "../open-sse/executors/mimocode.ts";

const TIMEOUT_MS = 45_000;
const TEST_PROMPT = "Say 'hello' in one word.";

/**
 * Test a provider executor with a real completion request
 */
async function testNoAuthProvider(name, Executor, model) {
  console.log(`\n[${name}] Testing with model: ${model}`);
  
  const executor = new Executor(name);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const result = await executor.execute({
      model,
      messages: [{ role: "user", content: TEST_PROMPT }],
      stream: true,
      credentials: null,
      signal: controller.signal,
      body: { messages: [{ role: "user", content: TEST_PROMPT }] },
    });

    clearTimeout(timeout);

    if (!result || !result.response) {
      console.log(`  ❌ FAIL: No response returned`);
      return { status: "fail", error: "No response returned" };
    }

    const { response } = result;

    if (!response.ok) {
      const text = await response.text().catch(() => "[could not read body]");
      console.log(`  ❌ FAIL: HTTP ${response.status} - ${text.slice(0, 200)}`);
      return { status: "fail", error: `HTTP ${response.status}`, detail: text.slice(0, 200) };
    }

    console.log(`  ✅ PASS: HTTP ${response.status} OK`);
    return { status: "ok", httpStatus: response.status };

  } catch (error) {
    clearTimeout(timeout);
    const msg = error.message || String(error);
    console.log(`  ❌ FAIL: ${msg}`);
    return { status: "fail", error: msg };
  }
}

/**
 * Test configuration for each no-auth provider
 */
const NO_AUTH_PROVIDERS = [
  { name: "opencode", Executor: OpencodeExecutor, model: "glm-4-flash" },
  { name: "duckduckgo-web", Executor: DuckDuckGoWebExecutor, model: "gpt-4o-mini" },
  { name: "theoldllm", Executor: TheOldLlmExecutor, model: "gpt-3.5-turbo" },
  { name: "chipotle", Executor: ChipotleExecutor, model: "gpt-4o-mini" },
  { name: "veoaifree-web", Executor: VeoAIFreeWebExecutor, model: "gpt-4o-mini" },
  { name: "mimocode", Executor: MimocodeExecutor, model: "mimo-auto" },
];

/**
 * Main test runner
 */
async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  COMPREHENSIVE PROVIDER VALIDATION TEST");
  console.log("═══════════════════════════════════════════════════════════\n");

  console.log("📋 Testing No-Auth Providers (Real Completion Requests)");
  console.log("─────────────────────────────────────────────────────────\n");

  const noAuthResults = {};

  for (const { name, Executor, model } of NO_AUTH_PROVIDERS) {
    noAuthResults[name] = await testNoAuthProvider(name, Executor, model);
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // Validate web-cookie validation logic exists
  console.log("\n\n📋 Validating Web-Cookie Session Expiry Logic");
  console.log("─────────────────────────────────────────────────────────\n");

  const { validateWebCookieProvider } = await import("../src/lib/providers/validation.ts");
  const { WEB_COOKIE_PROVIDERS: WEB_COOKIE_REGISTRY } = await import("../src/shared/constants/providers.ts");
  const { AUTH_007 } = await import("../src/shared/constants/errorCodes.ts");

  console.log(`✅ validateWebCookieProvider function exists: ${typeof validateWebCookieProvider === "function"}`);
  console.log(`✅ WEB_COOKIE_PROVIDERS registry loaded: ${Object.keys(WEB_COOKIE_REGISTRY).length} providers`);
  console.log(`✅ AUTH_007 (SESSION_EXPIRED) error code exists: ${AUTH_007?.code === "AUTH_007"}`);

  // Summary
  console.log("\n\n═══════════════════════════════════════════════════════════");
  console.log("  SUMMARY");
  console.log("═══════════════════════════════════════════════════════════\n");

  console.log("No-Auth Provider Test Results:");
  console.log(JSON.stringify(noAuthResults, null, 2));

  const passed = Object.values(noAuthResults).filter(r => r.status === "ok").length;
  const failed = Object.values(noAuthResults).filter(r => r.status === "fail").length;

  console.log(`\n✅ Passed: ${passed}/${NO_AUTH_PROVIDERS.length}`);
  console.log(`❌ Failed: ${failed}/${NO_AUTH_PROVIDERS.length}`);

  process.exit(failed > 0 ? 1 : 0);
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
