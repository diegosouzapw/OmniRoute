import test from "node:test";
import assert from "node:assert/strict";

const {
  ERROR_TYPES,
  DEFAULT_ERROR_MESSAGES,
  BACKOFF_CONFIG,
  COOLDOWN_MS,
  calculateBackoffCooldown,
  findMatchingErrorRule,
  getDefaultErrorMessage,
  getErrorInfo,
  matchErrorRuleByStatus,
  matchErrorRuleByText,
} = await import("../../open-sse/config/errorConfig.ts");

test("errorConfig exposes centralized client-facing status metadata", () => {
  assert.deepEqual(ERROR_TYPES[402], {
    type: "billing_error",
    code: "payment_required",
  });
  assert.equal(DEFAULT_ERROR_MESSAGES[406], "Model not supported");
  assert.equal(getDefaultErrorMessage(999), "An error occurred");
  assert.deepEqual(getErrorInfo(504), {
    type: "server_error",
    code: "gateway_timeout",
  });
});

test("errorConfig resolves text rules before status rules", () => {
  const textRule = matchErrorRuleByText("Rate limit reached");
  assert.equal(textRule?.id, "rate_limit");
  assert.equal(textRule?.backoff, true);

  const statusRule = matchErrorRuleByStatus(404);
  assert.equal(statusRule?.id, "status_404");
  assert.equal(statusRule?.cooldownMs, COOLDOWN_MS.notFound);

  const combinedRule = findMatchingErrorRule(429, "Request not allowed by upstream");
  assert.equal(combinedRule?.id, "request_not_allowed");
  assert.equal(combinedRule?.cooldownMs, COOLDOWN_MS.requestNotAllowed);
});

test("errorConfig preserves the existing exponential backoff policy", () => {
  assert.equal(calculateBackoffCooldown(0), BACKOFF_CONFIG.base);
  assert.equal(calculateBackoffCooldown(3), BACKOFF_CONFIG.base * 8);
  assert.equal(calculateBackoffCooldown(BACKOFF_CONFIG.maxLevel + 20), BACKOFF_CONFIG.max);
});
