import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("provider-breaker-unreached-15588");
const { buildRequest, handleChat, resetStorage, seedConnection, settingsDb } = harness;
const { getCircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
let fetchCalls = 0;

test.beforeEach(async () => {
  await resetStorage();
  await settingsDb.updateSettings({ requestRetry: 0 });
  fetchCalls = 0;
});
test.afterEach(async () => {
  await resetStorage();
});
test.after(async () => {
  await harness.cleanup();
});

test("stored 503 on a cooling account never becomes a new provider failure", async () => {
  const connection = await seedConnection("openai", { apiKey: "sk-test-cooling-account" });
  await providersDb.updateProviderConnection(connection.id, {
    testStatus: "unavailable",
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    lastError: "upstream reset before headers",
    errorCode: 503,
  });
  globalThis.fetch = async () => {
    fetchCalls++;
    throw new Error("upstream must not be called");
  };

  for (let i = 0; i < 3; i++) {
    const response = await handleChat(
      buildRequest({
        body: {
          model: "openai/gpt-4.1",
          stream: false,
          messages: [{ role: "user", content: "hi" }],
        },
      })
    );
    assert.equal(response.status, 503);
  }
  assert.equal(fetchCalls, 0);
  assert.equal(getCircuitBreaker("openai").failureCount, 0);
});

test("a real upstream 503 still counts after the no-credentials guard", async () => {
  await seedConnection("openai", { apiKey: "sk-test-real-503" });
  globalThis.fetch = async () => {
    fetchCalls++;
    return new Response(JSON.stringify({ error: { message: "upstream unavailable" } }), {
      status: 503,
      headers: { "content-type": "application/json" },
    });
  };
  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );
  assert.equal(response.status, 503);
  assert.ok(fetchCalls > 0);
  assert.ok(getCircuitBreaker("openai").failureCount > 0);
});
