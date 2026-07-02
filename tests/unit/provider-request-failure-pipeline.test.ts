// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provreq-fail-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { invalidateCacheControlSettingsCache } =
  await import("../../src/lib/cacheControlSettings.ts");
const { clearCache } = await import("../../src/lib/semanticCache.ts");
const { clearIdempotency } = await import("../../src/lib/idempotencyLayer.ts");
const { getPendingRequests, clearPendingRequests } =
  await import("../../src/lib/usage/usageHistory.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const { resetAll: resetAccountSemaphores } =
  await import("../../open-sse/services/accountSemaphore.ts");
const { clearModelLock } = await import("../../open-sse/services/accountFallback.ts");
const { getCallLogs, getCallLogById } = await import("../../src/lib/usage/callLogs.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { resetPayloadRulesConfigForTests } = await import("../../open-sse/services/payloadRules.ts");
const { CLAUDE_CODE_COMPATIBLE_REDACT_THINKING_BETA, CONTEXT_1M_BETA_HEADER } =
  await import("../../open-sse/services/claudeCodeCompatible.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

async function waitFor(fn, timeoutMs = 1500) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const result = await fn();
    if (result) return result;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

async function waitForAsyncSideEffects() {
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setTimeout(resolve, 10));
}

async function getLatestCallLog() {
  const rows = await getCallLogs({ limit: 5 });
  if (!Array.isArray(rows) || rows.length === 0) return null;
  return getCallLogById(rows[0].id);
}

async function resetStorage() {
  resetPayloadRulesConfigForTests();
  invalidateCacheControlSettingsCache();
  clearCache();
  clearIdempotency();
  clearInflight();
  clearModelLock();
  core.resetDbInstance();
  // A full reset must also drop the settings read-cache. Otherwise the cached
  // value (e.g. call_log_pipeline_enabled=true seeded earlier) survives the DB
  // wipe and silently masks the fact that the fresh DB has the default. In CI
  // under load this cache is evicted at unpredictable times, so tests that rely
  // on the stale cache flake. Make the reset honest and deterministic here.
  invalidateDbCache("settings");
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// Re-seed per test, NOT once: every `afterEach` runs resetStorage(), which wipes
// the DB and drops the settings cache. A run-once `before` only guaranteed the
// flag for the first test; later tests depended on a stale cache surviving the
// wipe, which flakes under CI load. beforeEach re-establishes it deterministically.
test.beforeEach(async () => {
  await resetStorage();
  await settingsDb.updateSettings({ call_log_pipeline_enabled: true });
});

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  clearPendingRequests();
  resetAccountSemaphores();
  await waitForAsyncSideEffects();
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  clearPendingRequests();
  resetAccountSemaphores();
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("network failure persisted call log includes providerRequest in pipeline payloads", async () => {
  const body = {
    model: "gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: "hello" }],
  };

  globalThis.fetch = async () => {
    throw new Error("Connection refused");
  };

  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
  } as any);

  assert.equal(result.success, false);
  assert.equal(result.status, 502);

  await waitForAsyncSideEffects();

  const detail = await waitFor(getLatestCallLog);
  assert.ok(detail, "expected a call log to be persisted");

  assert.ok(
    detail.pipelinePayloads,
    "expected pipeline payloads when call_log_pipeline_enabled is true"
  );
  assert.ok(
    detail.pipelinePayloads.providerRequest,
    "providerRequest must be present in pipeline payloads even on network failure"
  );
  const providerReqBody =
    detail.pipelinePayloads.providerRequest.body ?? detail.pipelinePayloads.providerRequest;
  assert.equal(
    providerReqBody.model,
    "gpt-4o-mini",
    "providerRequest should contain the translated model"
  );
  const messages =
    providerReqBody.messages ?? (Array.isArray(providerReqBody) ? providerReqBody : null);
  if (messages) {
    assert.equal(messages[0]?.content, "hello");
  }
  assert.equal(
    detail.pipelinePayloads.providerResponse ?? null,
    null,
    "providerResponse should be null/absent on network failure (no response received)"
  );
  assert.ok(detail.pipelinePayloads.error, "pipeline payloads should include the error details");
});

test("network timeout persisted call log includes providerRequest in pipeline payloads", async () => {
  const { getExecutor } = await import("../../open-sse/executors/index.ts");
  const executor = getExecutor("openai");
  const originalGetTimeoutMs = executor.getTimeoutMs?.bind(executor);
  executor.getTimeoutMs = () => 200;

  const body = {
    model: "gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: "timeout test" }],
  };

  globalThis.fetch = async () => {
    return new Promise(() => {}); // never resolve
  };

  try {
    const invocation = handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: structuredClone(body),
        headers: new Headers({ accept: "application/json" }),
      },
      userAgent: "unit-test",
    } as any);

    const result = await invocation;
    await waitForAsyncSideEffects();

    assert.equal(result.success, false);
    assert.ok(result.status === 504, `expected 504 timeout, got ${result.status}`);

    const detail = await waitFor(getLatestCallLog);
    assert.ok(detail, "expected a call log to be persisted");
    assert.ok(detail.pipelinePayloads, "expected pipeline payloads");

    assert.ok(
      detail.pipelinePayloads?.providerRequest,
      "providerRequest must be present in pipeline payloads on timeout"
    );
    const providerReqBody =
      detail.pipelinePayloads?.providerRequest?.body ?? detail.pipelinePayloads?.providerRequest;
    assert.equal(providerReqBody?.model, "gpt-4o-mini");
  } finally {
    if (originalGetTimeoutMs) executor.getTimeoutMs = originalGetTimeoutMs;
  }
});

test("provider error response (HTTP 502) includes both providerRequest and providerResponse in pipeline", async () => {
  const body = {
    model: "gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: "trigger 502" }],
  };

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        error: { message: "Upstream provider error", type: "server_error" },
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
  } as any);

  assert.equal(result.success, false);
  assert.equal(result.status, 502);

  await waitForAsyncSideEffects();

  const detail = await waitFor(getLatestCallLog);
  assert.ok(detail, "expected a call log to be persisted");

  assert.ok(detail.pipelinePayloads, "expected pipeline payloads");
  assert.ok(
    detail.pipelinePayloads.providerRequest,
    "providerRequest must be present on HTTP error response"
  );
  assert.ok(
    detail.pipelinePayloads.providerResponse,
    "providerResponse must be present on HTTP error response (upstream responded)"
  );
  assert.equal(
    detail.pipelinePayloads.providerResponse.status,
    502,
    "providerResponse status should reflect the upstream error"
  );
});

test("successful response includes both providerRequest and providerResponse in pipeline", async () => {
  const body = {
    model: "gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: "hello" }],
  };

  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        id: "chatcmpl-ok",
        object: "chat.completion",
        model: "gpt-4o-mini",
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "world" },
            finish_reason: "stop",
          },
        ],
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "cf-ray": "response-ray",
          server: "cloudflare",
        },
      }
    );
  };

  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
  } as any);

  assert.equal(result.success, true);

  await waitForAsyncSideEffects();

  const detail = await waitFor(getLatestCallLog);
  assert.ok(detail, "expected a call log to be persisted");

  assert.ok(detail.pipelinePayloads, "expected pipeline payloads");
  assert.ok(detail.pipelinePayloads.providerRequest, "providerRequest must be present on success");
  assert.ok(
    detail.pipelinePayloads.providerResponse,
    "providerResponse must be present on success"
  );
  assert.equal(
    detail.pipelinePayloads.providerRequest.headers["cf-ray"],
    undefined,
    "providerRequest headers must not be overwritten with upstream response headers"
  );
  assert.equal(
    detail.pipelinePayloads.providerRequest.headers.server,
    undefined,
    "providerRequest headers must not include upstream response server header"
  );
  assert.equal(detail.pipelinePayloads.providerRequest.headers.Accept, "application/json");
  assert.equal(detail.pipelinePayloads.providerRequest.headers["Content-Type"], "application/json");
  assert.equal(detail.pipelinePayloads.providerRequest.headers.Authorization, "[REDACTED]");
});

test("streaming response preserves request headers in providerRequest pipeline payload", async () => {
  const body = {
    model: "gpt-4o-mini",
    stream: true,
    messages: [{ role: "user", content: "hello" }],
  };

  const upstreamPayload = [
    `data: ${JSON.stringify({
      id: "chatcmpl-stream",
      object: "chat.completion.chunk",
      model: "gpt-4o-mini",
      choices: [{ index: 0, delta: { role: "assistant", content: "world" } }],
    })}`,
    "",
    `data: ${JSON.stringify({
      id: "chatcmpl-stream",
      object: "chat.completion.chunk",
      model: "gpt-4o-mini",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    })}`,
    "",
    "data: [DONE]",
    "",
  ].join("\n");

  globalThis.fetch = async () => {
    return new Response(upstreamPayload, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "cf-ray": "stream-response-ray",
        server: "cloudflare",
      },
    });
  };

  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test", providerSpecificData: {} },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "text/event-stream" }),
    },
    userAgent: "unit-test",
  } as any);

  assert.equal(result.success, true);
  await result.response.text();
  await waitForAsyncSideEffects();

  const detail = await waitFor(getLatestCallLog);
  assert.ok(detail, "expected a call log to be persisted");
  assert.ok(detail.pipelinePayloads, "expected pipeline payloads");

  const providerRequest = detail.pipelinePayloads.providerRequest;
  assert.ok(providerRequest, "providerRequest must be present on streaming success");
  assert.equal(
    providerRequest.headers["cf-ray"],
    undefined,
    "streaming providerRequest headers must not be response headers"
  );
  assert.equal(providerRequest.headers.server, undefined);
  assert.equal(providerRequest.headers.Accept, "text/event-stream");
  assert.equal(providerRequest.headers["Content-Type"], "application/json");
  assert.equal(providerRequest.headers.Authorization, "[REDACTED]");
});

test("CC-compatible providerRequest log keeps request beta headers and summarized thinking body", async () => {
  const body = {
    model: "claude-opus-4-6",
    messages: [{ role: "user", content: "hello" }],
    stream: false,
  };

  const upstreamPayload = [
    "event: message_start",
    'data: {"type":"message_start","message":{"id":"msg_1","type":"message","role":"assistant","model":"claude-opus-4-6","usage":{"input_tokens":7,"output_tokens":0}}}',
    "",
    "event: content_block_start",
    'data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}',
    "",
    "event: content_block_delta",
    'data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"ok"}}',
    "",
    "event: message_delta",
    'data: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":1}}',
    "",
    "event: message_stop",
    'data: {"type":"message_stop"}',
    "",
  ].join("\n");

  globalThis.fetch = async () => {
    return new Response(upstreamPayload, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "cf-ray": "cc-response-ray",
        server: "cloudflare",
      },
    });
  };

  const result = await handleChatCore({
    body: structuredClone(body),
    modelInfo: {
      provider: "anthropic-compatible-cc-test",
      model: "claude-opus-4-6",
      extendedContext: false,
    },
    credentials: {
      apiKey: "sk-test",
      providerSpecificData: {
        baseUrl: "https://proxy.example.com",
        requestDefaults: {
          context1m: true,
          redactThinking: true,
          summarizeThinking: true,
        },
      },
    },
    log: noopLog(),
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body: structuredClone(body),
      headers: new Headers({ accept: "application/json" }),
    },
    userAgent: "unit-test",
  } as any);

  assert.equal(result.success, true);
  await result.response.json();
  await waitForAsyncSideEffects();

  const detail = await waitFor(getLatestCallLog);
  assert.ok(detail, "expected a call log to be persisted");
  assert.ok(detail.pipelinePayloads, "expected pipeline payloads");

  const providerRequest = detail.pipelinePayloads.providerRequest;
  assert.ok(providerRequest, "providerRequest must be present on CC-compatible success");
  assert.equal(providerRequest.headers["cf-ray"], undefined);
  assert.equal(providerRequest.headers.server, undefined);
  assert.equal(providerRequest.headers.Accept, "application/json");
  assert.match(providerRequest.headers["anthropic-beta"], new RegExp(CONTEXT_1M_BETA_HEADER));
  assert.match(
    providerRequest.headers["anthropic-beta"],
    new RegExp(CLAUDE_CODE_COMPATIBLE_REDACT_THINKING_BETA)
  );
  assert.equal(providerRequest.body.thinking.display, "summarized");
});
