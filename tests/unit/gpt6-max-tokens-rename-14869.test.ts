// @ts-nocheck
// #14869: GPT-6 rejects `max_tokens` and wants `max_completion_tokens` (Chat
// Completions) or `max_output_tokens` (Responses). The rename in chatCore is
// gated by supportsMaxTokens(), whose blocklist only named gpt-5.4 and
// gpt-5.5, so gpt-6-astra left the client's max_tokens on the wire and the
// upstream answered 400.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-14869-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { clearCache } = await import("../../src/lib/semanticCache.ts");
const { clearIdempotency } = await import("../../src/lib/idempotencyLayer.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAll: resetAccountSemaphores } =
  await import("../../open-sse/services/accountSemaphore.ts");
const { handleChatCore, clearUpstreamProxyConfigCache } =
  await import("../../open-sse/handlers/chatCore.ts");
const { resetPayloadRulesConfigForTests } = await import("../../open-sse/services/payloadRules.ts");
const { supportsMaxTokens } = await import("../../src/lib/modelCapabilities.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

function buildResponse() {
  return new Response(
    JSON.stringify({
      id: "resp_1",
      object: "response",
      output: [{ type: "message", content: [{ type: "output_text", text: "ok" }] }],
      usage: { input_tokens: 4, output_tokens: 2, total_tokens: 6 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

async function invoke({ provider, model }) {
  let captured = null;
  globalThis.fetch = async (_url, init = {}) => {
    captured = init.body ? JSON.parse(String(init.body)) : null;
    return buildResponse();
  };
  try {
    await handleChatCore({
      body: {
        model,
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 2048,
        stream: false,
      },
      modelInfo: { provider, model, extendedContext: false },
      credentials: { ["api" + "Key"]: "test-key", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: { model, messages: [{ role: "user", content: "hi" }], max_tokens: 2048 },
        headers: new Headers({ accept: "application/json" }),
      },
      connectionId: null,
      apiKeyInfo: null,
      userAgent: "unit-test",
      isCombo: false,
      comboStrategy: null,
      onCredentialsRefreshed: null,
      onRequestSuccess: null,
    });
    return captured;
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function resetStorage() {
  clearUpstreamProxyConfigCache();
  resetPayloadRulesConfigForTests();
  clearCache();
  clearIdempotency();
  clearInflight();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  resetAccountSemaphores();
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14869 gpt-6-astra is not treated as a max_tokens model", () => {
  assert.equal(supportsMaxTokens({ provider: "openai", model: "gpt-6-astra" }), false);
  assert.equal(supportsMaxTokens({ provider: "openai", model: "gpt-5.5" }), false);
  assert.equal(supportsMaxTokens({ provider: "openai", model: "gpt-4o" }), true);
});

test("#14869 a custom gpt-6 model leaves no max_tokens on the openai body", async () => {
  // gpt-6-luna is not in the openai registry. A user-added model has no
  // targetFormat override, so it stays on Chat Completions and must be renamed
  // by the default executor rather than the Responses translator.
  const body = await invoke({ provider: "openai", model: "gpt-6-luna" });
  assert.ok(body, "upstream request was captured");
  assert.equal(body.max_tokens, undefined, "gpt-6 rejects max_tokens");
  assert.equal(body.max_completion_tokens, 2048);
});
