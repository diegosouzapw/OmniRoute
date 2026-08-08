import test from "node:test";
import assert from "node:assert/strict";

const rlm = await import("../../open-sse/services/rateLimitManager.ts");
const { enableRateLimitProtection, withRateLimit, __resetRateLimitManagerForTests } = rlm;

test.beforeEach(async () => {
  await __resetRateLimitManagerForTests();
});

test("withRateLimit works without abort signal (backward compat)", async () => {
  enableRateLimitProtection("test-queue-1");
  const result = await withRateLimit("openai", "test-queue-1", "gpt-4", async () => "ok");
  assert.equal(result, "ok");
});

test("withRateLimit works with AbortSignal", async () => {
  enableRateLimitProtection("test-queue-2");
  const ac = new AbortController();
  const result = await withRateLimit(
    "openai",
    "test-queue-2",
    "gpt-4",
    async () => "ok",
    ac.signal
  );
  assert.equal(result, "ok");
  ac.abort();
});

test("multiple sequential withRateLimit calls work", async () => {
  enableRateLimitProtection("test-queue-3");
  const results = await Promise.all([
    withRateLimit("openai", "test-queue-3", "gpt-4", async () => "a"),
    withRateLimit("openai", "test-queue-3", "gpt-4", async () => "b"),
  ]);
  assert.deepEqual(results.sort(), ["a", "b"]);
});
