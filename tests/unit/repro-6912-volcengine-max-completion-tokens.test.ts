// @ts-nocheck
// Regression test for #6912: OmniRoute never renamed a client-sent
// `max_completion_tokens` back to `max_tokens` for providers/models whose
// registry entry only documents the legacy field (Volcengine Ark / DeepSeek).
// chatCore.ts already renamed the OTHER direction (max_tokens ->
// max_completion_tokens for o1/o3/o4/gpt-5.4/5.5, #1961) but had no symmetric
// case, so `max_completion_tokens` was forwarded byte-for-byte to Volcengine,
// which silently ignores the unrecognized field and returns an unbounded
// completion.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-repro-6912-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { clearCache } = await import("../../src/lib/semanticCache.ts");
const { clearIdempotency } = await import("../../src/lib/idempotencyLayer.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAll: resetAccountSemaphores } = await import(
  "../../open-sse/services/accountSemaphore.ts"
);
const { handleChatCore, clearUpstreamProxyConfigCache } = await import(
  "../../open-sse/handlers/chatCore.ts"
);
const { resetPayloadRulesConfigForTests } = await import("../../open-sse/services/payloadRules.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
}

function toPlainHeaders(headers) {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
}

function buildOpenAIResponse(text = "ok") {
  return new Response(
    JSON.stringify({
      id: "chatcmpl-json",
      object: "chat.completion",
      model: "DeepSeek-V4-Flash",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: text },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 4, completion_tokens: 2, total_tokens: 6 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

async function invokeChatCore({ body, provider, model, endpoint = "/v1/chat/completions" }) {
  const calls: Array<{ url: string; headers: Record<string, string>; parsedBody: unknown }> = [];

  globalThis.fetch = async (url, init = {}) => {
    const headers = toPlainHeaders(init.headers);
    const captured = {
      url: String(url),
      method: init.method || "GET",
      headers,
      body: init.body ? JSON.parse(String(init.body)) : null,
    };
    calls.push(captured);
    return buildOpenAIResponse();
  };

  try {
    const requestBody = structuredClone(body);
    const result = await handleChatCore({
      body: requestBody,
      modelInfo: { provider, model, extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint,
        body: structuredClone(body),
        headers: new Headers({ accept: "application/json" }),
      },
      connectionId: null,
      apiKeyInfo: null,
      userAgent: "unit-test",
      isCombo: false,
      comboStrategy: null,
      onCredentialsRefreshed: null,
      onRequestSuccess: null,
    } as unknown as Parameters<typeof handleChatCore>[0]);

    return { result, calls, call: calls.at(-1) };
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  resetAccountSemaphores();
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#6912: chatCore renames max_completion_tokens to max_tokens for volcengine/DeepSeek-V4-Flash", async () => {
  const { call } = await invokeChatCore({
    provider: "volcengine",
    model: "DeepSeek-V4-Flash",
    body: {
      model: "DeepSeek-V4-Flash",
      messages: [{ role: "user", content: "hi" }],
      max_completion_tokens: 30,
      stream: false,
    },
  });

  assert.equal(call.body.max_tokens, 30, "expected max_completion_tokens to be normalized to max_tokens for volcengine");
  assert.equal(call.body.max_completion_tokens, undefined);
});

test("#6912: chatCore does not clobber an already-present max_tokens", async () => {
  const { call } = await invokeChatCore({
    provider: "volcengine",
    model: "DeepSeek-V4-Flash",
    body: {
      model: "DeepSeek-V4-Flash",
      messages: [{ role: "user", content: "hi" }],
      max_tokens: 500,
      max_completion_tokens: 30,
      stream: false,
    },
  });

  assert.equal(call.body.max_tokens, 500, "existing max_tokens must win over max_completion_tokens");
  assert.equal(call.body.max_completion_tokens, undefined);
});

test("#6912: chatCore keeps the pre-existing max_tokens->max_completion_tokens direction for o3 (#1961)", async () => {
  const { call } = await invokeChatCore({
    provider: "openai",
    model: "o3",
    body: {
      model: "o3",
      messages: [{ role: "user", content: "hi" }],
      max_tokens: 99999,
      stream: false,
    },
  });

  // Existing provider-side token-limit clamping (unrelated to #6912) caps the
  // renamed value; this test only asserts the rename direction is preserved.
  assert.equal(call.body.max_tokens, undefined);
  assert.equal(call.body.max_completion_tokens, 16384);
});
