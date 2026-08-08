/**
 * Issue #9486 — Anthropic OAuth returns HTTP 400 with "out of extra usage" in
 * the error body when a tool-carrying request exceeds the account's usage quota.
 * This should be classified as quota_exhausted (not generic bad_request), so the
 * account fallback mechanism applies a proper cooldown and combo routing can
 * skip to another target.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { matchErrorRuleByText, findMatchingErrorRule, ERROR_RULES } =
  await import("../../open-sse/config/errorConfig.ts");
const { checkFallbackError, classifyErrorText } =
  await import("../../open-sse/services/accountFallback.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");

test("#9486 ERROR_RULES has a text rule for 'out of extra usage' → quota_exhausted", () => {
  const rule = ERROR_RULES.find((r) => r.text === "out of extra usage");
  assert.ok(rule, "expected a rule for 'out of extra usage'");
  assert.equal(rule!.reason, "quota_exhausted");
  // Should use backoff so the fallback path applies exponential scaling
  assert.equal(rule!.backoff, true);
});

test("#9486 matchErrorRuleByText finds 'out of extra usage' rule", () => {
  const rule = matchErrorRuleByText("out of extra usage");
  assert.ok(rule, "expected a matching rule");
  assert.equal(rule!.reason, "quota_exhausted");
});

test("#9486 matchErrorRuleByText finds rule in a longer error message", () => {
  const rule = matchErrorRuleByText(
    "Error: 400 - out of extra usage. You have exceeded your usage quota for this billing period."
  );
  assert.ok(rule, "expected a matching rule from longer message");
  assert.equal(rule!.reason, "quota_exhausted");
});

test("#9486 findMatchingErrorRule with 400 + 'out of extra usage' returns quota_exhausted", () => {
  const rule = findMatchingErrorRule(400, "out of extra usage");
  assert.ok(rule, "expected a matching rule");
  assert.equal(rule!.reason, "quota_exhausted");
});

test("#9486 checkFallbackError returns quota_exhausted for 400 + 'out of extra usage'", () => {
  const out = checkFallbackError(400, "out of extra usage", 0, null, "claude");
  assert.equal(out.shouldFallback, true);
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
  // Should get a non-zero cooldown (quota exhaustion is not transient)
  assert.ok(out.cooldownMs > 0, `expected positive cooldown, got ${out.cooldownMs}ms`);
});

test("#9486 checkFallbackError handles 'Extra usage required' (same class)", () => {
  // Anthropic sometimes returns "Extra usage required" instead of "out of extra usage"
  const out = checkFallbackError(400, "Extra usage required", 0, null, "claude");
  assert.equal(out.shouldFallback, true);
  assert.equal(out.reason, RateLimitReason.QUOTA_EXHAUSTED);
});

test("#9486 classifyErrorText flags 'out of extra usage' as QUOTA_EXHAUSTED", () => {
  const out = classifyErrorText("out of extra usage");
  assert.equal(out, RateLimitReason.QUOTA_EXHAUSTED);
});

test("#9486 generic 400 without quota text still gets no fallback (regression guard)", () => {
  // Regression guard: a plain 400 with no quota-related text must NOT trigger
  // fallback, preserving the existing behavior for non-quota 400 errors.
  const out = checkFallbackError(400, "Bad request: invalid JSON", 0, null, "claude");
  assert.equal(out.shouldFallback, false);
  assert.equal(out.reason, RateLimitReason.UNKNOWN);
});