import test from "node:test";
import assert from "node:assert/strict";

// #4976 — A 400 response whose body carries rate-limit semantics (e.g. MiMoCode's
// "Detected high-frequency non-compliant requests from you.") was misclassified as a
// non-fallbackable generic 400, so MiMo-auto combo never failed over and the raw
// failure surfaced to Cline as `[502]: fetch failed`. checkFallbackError must now
// detect rate-limit text on a 400 and treat it as fallback-worthy
// (RATE_LIMIT_EXCEEDED, connection-cooldown scope) WITHOUT regressing the #2101
// malformed-400 infinite-loop guard.

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");

test("#4976 400 with rate-limit text (MiMoCode) → fallback with RATE_LIMIT_EXCEEDED", () => {
  const res = checkFallbackError(
    400,
    "Detected high-frequency non-compliant requests from you.",
    0,
    null,
    "mimocode"
  );
  assert.equal(res.shouldFallback, true);
  assert.equal(res.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("#4976 400 with Chinese rate-limit text → fallback with RATE_LIMIT_EXCEEDED", () => {
  const res = checkFallbackError(400, "检测到您的请求频率过高，请稍后再试", 0, null, "mimocode");
  assert.equal(res.shouldFallback, true);
  assert.equal(res.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

test("#4976 regression: a generic non-rate-limit 400 still does NOT fall over (#2101 guard)", () => {
  const res = checkFallbackError(400, "Invalid JSON: unexpected token at position 12");
  assert.equal(res.shouldFallback, false);
});

test("#4976 regression: a malformed 400 stays MODEL_CAPACITY, not reclassified as rate-limit", () => {
  // Malformed-request detection must win over the new rate-limit text check so the
  // #2101 infinite-loop guard (zero-cooldown MODEL_CAPACITY) is preserved.
  const res = checkFallbackError(400, "messages must alternate between user and assistant");
  assert.equal(res.shouldFallback, true);
  assert.equal(res.reason, RateLimitReason.MODEL_CAPACITY);
});
