import test from "node:test";
import assert from "node:assert/strict";

const {
  classifyModelScope429,
  getModelScopeRetryDelayMs,
  isModelScopeProvider,
  parseModelScopeRateLimitHeaders,
} = await import("../../open-sse/services/modelscopePolicy.ts");

test("ModelScope policy detects provider ids and ModelScope host markers", () => {
  assert.equal(isModelScopeProvider("modelscope"), true);
  assert.equal(
    isModelScopeProvider("openai-compatible-custom", {
      baseUrl: "https://api-inference.modelscope.cn/v1",
    }),
    true
  );
  assert.equal(isModelScopeProvider("openai", { baseUrl: "https://api.openai.com/v1" }), false);
});

test("ModelScope policy parses per-model and total rate-limit headers", () => {
  const snapshot = parseModelScopeRateLimitHeaders(
    new Headers({
      "modelscope-ratelimit-model-requests-remaining": "0",
      "modelscope-ratelimit-model-requests-limit": "10",
      "modelscope-ratelimit-requests-remaining": "17",
      "modelscope-ratelimit-requests-limit": "20",
    })
  );

  assert.deepEqual(snapshot, {
    modelRemaining: 0,
    modelLimit: 10,
    totalRemaining: 17,
    totalLimit: 20,
  });
});

test("ModelScope policy keeps temporary 429 headers retryable", () => {
  const decision = classifyModelScope429(
    "Throttling: current batch requests reached the limit",
    new Headers({
      "modelscope-ratelimit-model-requests-remaining": "0",
      "modelscope-ratelimit-model-requests-limit": "10",
    })
  );

  assert.equal(decision.kind, "rate_limited");
  assert.equal(decision.retryable, true);
  assert.equal(decision.snapshot.modelRemaining, 0);
});

test("ModelScope policy treats explicit free quota exhaustion as terminal", () => {
  const decision = classifyModelScope429("Free allocated quota exceeded", new Headers());

  assert.equal(decision.kind, "quota_exhausted");
  assert.equal(decision.retryable, false);
});

test("ModelScope retry delay respects Retry-After seconds before backoff fallback", () => {
  assert.equal(getModelScopeRetryDelayMs(new Headers({ "retry-after": "2.5" }), 0), 2500);
  assert.equal(getModelScopeRetryDelayMs(new Headers(), 1), 6000);
});
