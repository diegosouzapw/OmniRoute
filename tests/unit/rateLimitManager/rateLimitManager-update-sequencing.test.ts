import test from "node:test";
import assert from "node:assert/strict";

const rlm = await import("../../../open-sse/services/rateLimitManager.ts");
const {
  enableRateLimitProtection,
  withRateLimit,
  updateFromHeaders,
  updateFromResponseBody,
  __resetRateLimitManagerForTests,
} = rlm;

test.beforeEach(async () => {
  await __resetRateLimitManagerForTests();
});

test("updateFromResponseBody overwrites updateFromHeaders retry-after", async () => {
  enableRateLimitProtection("test-seq-1");
  await withRateLimit("openai", "test-seq-1", "gpt-4", async () => "ok");
  const headers = new Headers({ "retry-after": "5" });
  updateFromHeaders("openai", "test-seq-1", headers, 429, "gpt-4");
  updateFromResponseBody("openai", "test-seq-1", JSON.stringify({ retry_after: 10 }), 429, "gpt-4");
});

test("no retry-after in either source leaves limiter state unchanged", async () => {
  enableRateLimitProtection("test-seq-2");
  await withRateLimit("openai", "test-seq-2", "gpt-4", async () => "ok");
  const headers = new Headers({});
  updateFromHeaders("openai", "test-seq-2", headers, 200, "gpt-4");
  updateFromResponseBody("openai", "test-seq-2", "{}", 200, "gpt-4");
});

test("response body retry-after is parsed correctly", async () => {
  enableRateLimitProtection("test-seq-3");
  await withRateLimit("openai", "test-seq-3", "gpt-4", async () => "ok");
  updateFromResponseBody(
    "openai",
    "test-seq-3",
    JSON.stringify({ data: { retry_after: 30 } }),
    429,
    "gpt-4"
  );
});
