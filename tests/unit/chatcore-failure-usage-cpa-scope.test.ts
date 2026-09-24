// @ts-nocheck
// Regression guard for #14544: `persistFailureUsage` read `providerResponse`, a `let` that lives
// inside handleChatCore's big `try { … } finally { … }` body, while the closure itself is declared
// before that `try`. The name was therefore out of scope (TS2304 under open-sse typecheck, which
// typecheck:core does not cover) and every failure path that records usage threw
// `ReferenceError: providerResponse is not defined`. There is no `catch` on that `try`, so the
// error escaped handleChatCore instead of returning the upstream error response.
//
// This drives a real failure path end to end: the upstream answers with a non-OK status, so
// handleChatCore must return that failure — not reject.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cpa-failure-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return { debug() {}, info() {}, warn() {}, error() {} };
}

async function flushAsyncSideEffects() {
  for (let i = 0; i < 5; i++) await new Promise((resolve) => setImmediate(resolve));
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await flushAsyncSideEffects();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#14544 regression: an upstream failure is returned, not thrown as a ReferenceError", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({ error: { message: "bad request", type: "invalid_request_error" } }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );

  const body = {
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: "hi" }],
    max_tokens: 8,
    stream: false,
  };

  let result;
  await assert.doesNotReject(async () => {
    result = await handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
      credentials: { apiKey: "sk-test-not-real", providerSpecificData: {} },
      log: noopLog(),
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: structuredClone(body),
        headers: new Headers({ accept: "application/json" }),
      },
      userAgent: "test-client/1.0",
    });
  }, "handleChatCore must not throw on an upstream failure (persistFailureUsage scope)");

  assert.equal(result.success, false, "an upstream 400 is a failed request");
  assert.equal(result.status, 400, "the upstream status is surfaced, not replaced");
});
