/**
 * #12254: `handleChatCore()` reports most upstream failures by RESOLVING with
 * `{ success: false, status: 5xx }` rather than throwing. `CircuitBreaker.execute()`
 * used to treat every resolved promise as a success, so a provider could return 5xx
 * indefinitely while its breaker stayed CLOSED — the spurious `_onSuccess()` decayed
 * the counter by one and cancelled the very next call-site `_onFailure()` for the same
 * attempt, pinning `failureCount` at 1.
 *
 * The first test drives the real single-model pipeline
 * (chat.ts → executeChatWithBreaker → breaker.execute) against an upstream that always
 * answers 503. The remaining tests pin the `execute()` result-classification contract.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("circuit-breaker-resolved-5xx-12254");
const { BaseExecutor, buildRequest, handleChat, resetStorage, seedConnection, settingsDb } =
  harness;
const { CircuitBreaker, getCircuitBreaker, STATE } =
  await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;
const originalRetryConfig = {
  maxAttempts: BaseExecutor.RETRY_CONFIG.maxAttempts,
  delayMs: BaseExecutor.RETRY_CONFIG.delayMs,
};

const uniqueName = (s: string) => `cb-12254-${s}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.maxAttempts = 1;
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  BaseExecutor.RETRY_CONFIG.maxAttempts = originalRetryConfig.maxAttempts;
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryConfig.delayMs;
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("#12254: consecutive resolved 503s open the provider breaker on the single-model path", async () => {
  const failureThreshold = 3;
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
    resilienceSettings: {
      providerBreaker: {
        apikey: { failureThreshold, degradationThreshold: 2, resetTimeoutMs: 60_000 },
      },
    },
  });

  let upstreamCalls = 0;
  globalThis.fetch = async () => {
    upstreamCalls += 1;
    return new Response(JSON.stringify({ error: { message: "Service temporarily overloaded" } }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  };

  const breaker = getCircuitBreaker("openai");
  const trace: string[] = [];
  for (let i = 0; i < failureThreshold; i++) {
    // A 503 puts the dispatched connection into cooldown; seed a fresh active one so
    // every request really reaches the upstream and flows through breaker.execute().
    await seedConnection("openai", { apiKey: `sk-openai-resolved-503-${i}` });
    const upstreamCallsBefore = upstreamCalls;
    const response = await handleChat(
      buildRequest({
        body: {
          model: "openai/o3-mini",
          stream: false,
          messages: [{ role: "user", content: `resolved 503 attempt ${i}` }],
        },
      })
    );
    trace.push(
      `req${i}: http=${response.status} upstreamCalls=${upstreamCalls} failureCount=${breaker.failureCount} state=${breaker.state}`
    );
    assert.equal(response.status, 503, trace.join("\n"));
    assert.ok(upstreamCalls > upstreamCallsBefore, `request ${i} must reach the upstream`);
    assert.equal(
      breaker.failureCount,
      i + 1,
      `each resolved 503 must count exactly once\n${trace.join("\n")}`
    );
  }

  assert.equal(breaker.state, STATE.OPEN, trace.join("\n"));

  // The breaker now protects the chat path: the next request is short-circuited
  // before any upstream dispatch.
  await seedConnection("openai", { apiKey: "sk-openai-resolved-503-after-open" });
  const upstreamCallsBeforeOpen = upstreamCalls;
  const rejected = await handleChat(
    buildRequest({
      body: {
        model: "openai/o3-mini",
        stream: false,
        messages: [{ role: "user", content: "breaker is open" }],
      },
    })
  );
  assert.equal(rejected.status, 503);
  assert.equal(upstreamCalls, upstreamCallsBeforeOpen, "an OPEN breaker must not dispatch");
  assert.match(await rejected.text(), /circuit breaker/i);
});

test("#12254: execute() counts a resolved failure payload when the classifier says so", async () => {
  const cb = new CircuitBreaker(uniqueName("resolved-failure"), {
    failureThreshold: 3,
    resetTimeout: 30_000,
  });
  const chatFn = async () => ({ success: false, status: 503, error: "overloaded" });
  const classifyResult = (result: { success: boolean }) =>
    result.success ? ("success" as const) : ("failure" as const);

  for (let i = 0; i < 3; i++) {
    await cb.execute(chatFn, { classifyResult });
  }

  assert.equal(cb.failureCount, 3);
  assert.equal(cb.state, STATE.OPEN);
  cb.reset();
});

test("#12254: execute() leaves accounting to the caller when the classifier returns ignore", async () => {
  const cb = new CircuitBreaker(uniqueName("ignore"), {
    failureThreshold: 3,
    resetTimeout: 30_000,
  });
  cb._onFailure();
  cb._onFailure();
  assert.equal(cb.failureCount, 2);
  const stateBefore = cb.state;

  // Neither a resolved failure nor a resolved success may move the counter or the
  // state: the caller records the outcome exactly once itself.
  await cb.execute(async () => ({ success: false, status: 503 }), {
    classifyResult: () => "ignore",
  });
  await cb.execute(async () => ({ success: true, status: 200 }), {
    classifyResult: () => "ignore",
  });

  assert.equal(cb.failureCount, 2);
  assert.equal(cb.state, stateBefore);
  cb.reset();
});

test("#12254: execute() without a classifier keeps the resolved-is-success contract", async () => {
  const cb = new CircuitBreaker(uniqueName("default"), {
    failureThreshold: 3,
    resetTimeout: 30_000,
  });
  cb._onFailure();
  assert.equal(cb.failureCount, 1);

  await cb.execute(async () => ({ success: false, status: 503 }));

  // Gradual recovery on success: the legacy behaviour every throw-based caller relies on.
  assert.equal(cb.failureCount, 0);
  assert.equal(cb.state, STATE.CLOSED);
  cb.reset();
});

test("#12254: a throwing classifier never wedges the breaker", async () => {
  const cb = new CircuitBreaker(uniqueName("throwing"), {
    failureThreshold: 3,
    resetTimeout: 30_000,
  });

  const result = await cb.execute(async () => "ok", {
    classifyResult: () => {
      throw new Error("classifier bug");
    },
  });

  assert.equal(result, "ok");
  assert.equal(cb.state, STATE.CLOSED);
  assert.equal(cb.failureCount, 0);
  cb.reset();
});
