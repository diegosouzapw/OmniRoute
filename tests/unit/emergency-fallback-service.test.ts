import test from "node:test";
import assert from "node:assert/strict";

const { EMERGENCY_FALLBACK_CONFIG, shouldUseFallback, isFallbackDecision } =
  await import("../../open-sse/services/emergencyFallback.ts");

test("shouldUseFallback returns disabled when the feature flag is off", () => {
  const result = shouldUseFallback(402, "payment required", false, {
    ...EMERGENCY_FALLBACK_CONFIG,
    enabled: false,
  });

  assert.deepEqual(result, {
    shouldFallback: false,
    reason: "emergency fallback disabled",
  });
  assert.equal(isFallbackDecision(result), false);
});

test("shouldUseFallback skips tool requests when configured", () => {
  const result = shouldUseFallback(402, "payment required", true);

  assert.deepEqual(result, {
    shouldFallback: false,
    reason: "skipped: request has tools",
  });
});

test("shouldUseFallback triggers on HTTP 402", () => {
  const result = shouldUseFallback(402, "", false);

  assert.equal(result.shouldFallback, true);
  assert.equal(result.provider, EMERGENCY_FALLBACK_CONFIG.provider);
  assert.equal(result.model, EMERGENCY_FALLBACK_CONFIG.model);
  assert.equal(result.maxOutputTokens, EMERGENCY_FALLBACK_CONFIG.maxOutputTokens);
  assert.equal(isFallbackDecision(result), true);
});

test("shouldUseFallback matches budget keywords case-insensitively", () => {
  const result = shouldUseFallback(500, "Billing hard stop: OUT OF CREDITS", false);

  assert.equal(result.shouldFallback, true);
  assert.match(result.reason, /budget error detected/i);
  assert.match(result.reason, /(billing|out of credits)/i);
});

test("shouldUseFallback ignores keywords when keyword matching is disabled", () => {
  const result = shouldUseFallback(500, "quota_exceeded", false, {
    ...EMERGENCY_FALLBACK_CONFIG,
    triggerOnBudgetKeywords: false,
  });

  assert.deepEqual(result, {
    shouldFallback: false,
    reason: "no budget error detected",
  });
});

test("shouldUseFallback ignores HTTP 402 when status-trigger fallback is disabled", () => {
  const result = shouldUseFallback(402, "", false, {
    ...EMERGENCY_FALLBACK_CONFIG,
    triggerOn402: false,
  });

  assert.deepEqual(result, {
    shouldFallback: false,
    reason: "no budget error detected",
  });
});

test("shouldUseFallback returns no fallback for unrelated errors", () => {
  const result = shouldUseFallback(500, "temporary upstream timeout", false);

  assert.deepEqual(result, {
    shouldFallback: false,
    reason: "no budget error detected",
  });
  assert.equal(isFallbackDecision(result), false);
});
