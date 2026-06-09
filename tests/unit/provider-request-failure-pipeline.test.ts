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
const { invalidateCacheControlSettingsCache } =
  await import("../../src/lib/cacheControlSettings.ts");
const { clearCache } = await import("../../src/lib/semanticCache.ts");
const { clearIdempotency } = await import("../../src/lib/idempotencyLayer.ts");
const { getPendingRequests, clearPendingRequests } =
  await import("../../src/lib/usage/usageHistory.ts");
const { clearInflight } = await import("../../open-sse/services/requestDedup.ts");
const {
  resetAll: resetAccountSemaphores,
} = await import("../../open-sse/services/accountSemaphore.ts");
const { clearModelLock } = await import("../../open-sse/services/accountFallback.ts");
const { getCallLogs, getCallLogById } = await import("../../src/lib/usage/callLogs.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { resetPayloadRulesConfigForTests } =
  await import("../../open-sse/services/payloadRules.ts");

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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.before(async () => {
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

  assert.ok(detail.pipelinePayloads, "expected pipeline payloads when call_log_pipeline_enabled is true");
  assert.ok(
    detail.pipelinePayloads.providerRequest,
    "providerRequest must be present in pipeline payloads even on network failure"
  );
  const providerReqBody =
    detail.pipelinePayloads.providerRequest.body ??
    detail.pipelinePayloads.providerRequest;
  assert.equal(
    providerReqBody.model,
    "gpt-4o-mini",
    "providerRequest should contain the translated model"
  );
  const messages =
    providerReqBody.messages ??
    (Array.isArray(providerReqBody) ? providerReqBody : null);
  if (messages) {
    assert.equal(messages[0]?.content, "hello");
  }
  assert.equal(
    detail.pipelinePayloads.providerResponse ?? null,
    null,
    "providerResponse should be null/absent on network failure (no response received)"
  );
  assert.ok(
    detail.pipelinePayloads.error,
    "pipeline payloads should include the error details"
  );
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
    assert.ok(
      result.status === 504,
      `expected 504 timeout, got ${result.status}`
    );

    const detail = await waitFor(getLatestCallLog);
    assert.ok(detail, "expected a call log to be persisted");
    assert.ok(detail.pipelinePayloads, "expected pipeline payloads");

    assert.ok(
      detail.pipelinePayloads?.providerRequest,
      "providerRequest must be present in pipeline payloads on timeout"
    );
    const providerReqBody =
      detail.pipelinePayloads?.providerRequest?.body ??
      detail.pipelinePayloads?.providerRequest;
    assert.equal(
      providerReqBody?.model,
      "gpt-4o-mini"
    );
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

  assert.equal(result.success, true);

  await waitForAsyncSideEffects();

  const detail = await waitFor(getLatestCallLog);
  assert.ok(detail, "expected a call log to be persisted");

  assert.ok(detail.pipelinePayloads, "expected pipeline payloads");
  assert.ok(
    detail.pipelinePayloads.providerRequest,
    "providerRequest must be present on success"
  );
  assert.ok(
    detail.pipelinePayloads.providerResponse,
    "providerResponse must be present on success"
  );
});
