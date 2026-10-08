import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("breaker-combo-sse-probe");
const {
  BaseExecutor,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
} = harness;
const { getCircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.maxAttempts = 1;
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});
test.afterEach(async () => {
  await resetStorage();
});
test.after(async () => {
  await harness.cleanup();
});

test("streaming combo probe survives response wrappers and credits provider once", async () => {
  await settingsDb.updateSettings({
    requestRetry: 0,
    resilienceSettings: {
      providerBreaker: {
        apikey: {
          failureThreshold: 1,
          degradationThreshold: 1,
          resetTimeoutMs: 10,
        },
      },
    },
  });
  await seedConnection("openai", { apiKey: "sk-test-breaker-stream" });
  await combosDb.createCombo({
    name: "breaker-stream-combo",
    strategy: "priority",
    config: { maxRetries: 0 },
    models: ["openai/gpt-4o-mini"],
  });
  globalThis.fetch = async () =>
    new Response(
      'data: {"id":"chunk1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"ok"},"finish_reason":null}]}\n\n' +
        'data: {"id":"chunk2","object":"chat.completion.chunk","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n' +
        "data: [DONE]\n\n",
      { status: 200, headers: { "content-type": "text/event-stream" } }
    );

  const breaker = getCircuitBreaker("openai", { failureThreshold: 1, resetTimeout: 10 });
  breaker._onFailure();
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(breaker.canExecute(), true);
  const onSuccess = breaker._onSuccess.bind(breaker);
  let successCredits = 0;
  breaker._onSuccess = () => {
    successCredits++;
    onSuccess();
  };
  try {
    const response = await handleChat(
      buildRequest({
        body: {
          model: "breaker-stream-combo",
          stream: true,
          messages: [{ role: "user", content: "hi" }],
        },
      })
    );
    const text = await response.text();
    assert.equal(response.status, 200, text);
    assert.match(text, /"content":"ok"/);
    assert.doesNotMatch(text, /"error"/);
    assert.equal(breaker.state, "CLOSED");
    assert.equal(successCredits, 1);
  } finally {
    breaker._onSuccess = onSuccess;
  }
});
