/**
 * #15690: when every account of a provider is cooling (self-inflicted cooldown,
 * e.g. after stream_content_stall -> markAccountUnavailable with lastErrorCode 502),
 * requests rejected locally with "all N active accounts rate limited" must NOT count as
 * provider-breaker failures. chat.ts calls breaker._onFailure() for that no-credentials
 * outcome whenever the cooled connection's lastErrorCode is in {408,500,502,503,504}.
 * Net effect: no upstream call is made, yet the breaker opens (and re-opens on every
 * HALF_OPEN probe).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("repro-15690");
const { BaseExecutor, buildRequest, handleChat, resetStorage, settingsDb } = harness;
const providersDb = await import("../../src/lib/db/providers.ts");
const { getCircuitBreaker, STATE } = await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.maxAttempts = 1;
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});
test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});
test.after(async () => {
  await harness.cleanup();
});

test("#15690: local all-accounts-cooling rejections must not open the provider breaker", async () => {
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
    return new Response(JSON.stringify({ error: { message: "should not be called" } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  // The only account is cooling after a stream content stall (502).
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-cooling",
    apiKey: "sk-openai-cooling-15690",
    isActive: true,
    testStatus: "unavailable",
    errorCode: 502,
    lastError: "stream content stall: no model output within 30000ms",
    rateLimitedUntil: new Date(Date.now() + 5 * 60_000).toISOString(),
  });

  const breaker = getCircuitBreaker("openai");
  const trace: string[] = [];
  for (let i = 0; i < failureThreshold + 1; i++) {
    const response = await handleChat(
      buildRequest({
        body: {
          model: "openai/o3-mini",
          stream: false,
          messages: [{ role: "user", content: `cooling attempt ${i}` }],
        },
      })
    );
    trace.push(
      `req${i}: http=${response.status} upstream=${upstreamCalls} failureCount=${breaker.failureCount} state=${breaker.state}`
    );
  }

  assert.equal(upstreamCalls, 0, "no request may reach the upstream while all accounts cool");
  assert.notEqual(
    breaker.state,
    STATE.OPEN,
    `provider breaker opened purely from local cooldown rejections\n${trace.join("\n")}`
  );
  assert.equal(breaker.failureCount, 0, `\n${trace.join("\n")}`);
});
