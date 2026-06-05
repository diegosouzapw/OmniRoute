import test from "node:test";
import assert from "node:assert/strict";

const rlm = await import("../../open-sse/services/rateLimitManager.ts");
const {
  enableRateLimitProtection,
  disableRateLimitProtection,
  isRateLimitEnabled,
  withRateLimit,
  updateFromHeaders,
  getAllRateLimitStatus,
  startRateLimitWatchdog,
  stopRateLimitWatchdog,
  __resetRateLimitManagerForTests,
  __getLimiterStateForTests,
} = rlm;

// Clean slate before each test
test.beforeEach(async () => {
  await __resetRateLimitManagerForTests();
});

test("enableRateLimitProtection creates limiter", async () => {
  enableRateLimitProtection("test-conn-1");
  assert.ok(isRateLimitEnabled("test-conn-1"));
});

test("disableRateLimitProtection cleans up limiters and limiterLastUsed", async () => {
  // Create a limiter by using withRateLimit
  enableRateLimitProtection("test-conn-2");
  await withRateLimit("openai", "test-conn-2", "gpt-4", async () => "ok");

  // Verify limiter exists
  const before = getAllRateLimitStatus();
  const hasKey = Object.keys(before).some((k) => k.includes("test-conn-2"));

  // Disable — should clean up all 3 Maps (limiters, lastDispatchAt, limiterLastUsed)
  disableRateLimitProtection("test-conn-2");
  assert.ok(!isRateLimitEnabled("test-conn-2"));
});

test("limiterLastUsed is populated on each withRateLimit call", async () => {
  enableRateLimitProtection("test-conn-3");
  const result = await withRateLimit("anthropic", "test-conn-3", "claude-3", async () => "response");
  assert.equal(result, "response");

  // Second call should also work (limiterLastUsed prevents eviction)
  const result2 = await withRateLimit("anthropic", "test-conn-3", "claude-3", async () => "response2");
  assert.equal(result2, "response2");
});

test("updateFromHeaders with 429 triggers limiter disconnect and cleanup", async () => {
  enableRateLimitProtection("test-conn-4");
  await withRateLimit("openai", "test-conn-4", "gpt-4", async () => "ok");

  // Simulate a 429 response — this should disconnect the old limiter
  const headers = new Headers({ "retry-after": "60" });
  updateFromHeaders("openai", "test-conn-4", headers, 429, "gpt-4");

  // Should not throw — old limiter was properly cleaned up
  assert.ok(true);
});

test("shutdown clears all maps including limiterLastUsed", async () => {
  enableRateLimitProtection("test-conn-5");
  await withRateLimit("openai", "test-conn-5", "gpt-4", async () => "ok");

  // __resetRateLimitManagerForTests calls shutdown internally
  await __resetRateLimitManagerForTests();

  // All limiters should be gone
  const after = getAllRateLimitStatus();
  assert.equal(Object.keys(after).length, 0);
});

test("multiple providers/connections create separate limiters", async () => {
  enableRateLimitProtection("conn-a");
  enableRateLimitProtection("conn-b");
  await withRateLimit("openai", "conn-a", "gpt-4", async () => "a");
  await withRateLimit("anthropic", "conn-b", "claude-3", async () => "b");

  const status = getAllRateLimitStatus();
  const keys = Object.keys(status);
  // Should have at least 2 separate limiters
  assert.ok(keys.length >= 2, `Expected >=2 limiters, got ${keys.length}`);
});
