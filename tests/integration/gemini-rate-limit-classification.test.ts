/**
 * Gemini rate-limit classification integration tests.
 *
 * Tests the full integration between geminiRateLimitTracker (in-memory
 * daily/minute counters) and accountFallback.checkFallbackError (429
 * classification). No live Gemini API key needed — the tracker counters
 * are incremented directly and a synthetic 429 error is passed to
 * checkFallbackError.
 *
 * This validates that the whole pipeline works:
 *   incrementRequestCount → isRpdExhausted / isRpmExhausted → checkFallbackError
 *
 * Covers three classification outcomes:
 *   - RPM exhausted → RATE_LIMIT_EXCEEDED (exponential backoff)
 *   - RPD exhausted → QUOTA_EXHAUSTED (midnight lockout)
 *   - Neither exhausted → falls through to generic 429 (RATE_LIMIT_EXCEEDED)
 */

import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { RateLimitReason } = await import("../../open-sse/config/constants.ts");
const {
  incrementRequestCount,
  incrementTokenUsage,
  getDailyRequestCount,
  getMinuteRequestCount,
  getMinuteTokenCount,
  isRpdExhausted,
  isRpmExhausted,
  isTpmExhausted,
  classifyGeminiQuotaMetricFromText,
  resetCounters,
} = await import("../../open-sse/services/geminiRateLimitTracker.ts");

const PROFILE = {
  baseCooldownMs: 125,
  useUpstreamRetryHints: false,
  maxBackoffSteps: 3,
  failureThreshold: 60,
  degradationThreshold: 40,
  resetTimeoutMs: 5000,
  transientCooldown: 125,
  rateLimitCooldown: 125,
  maxBackoffLevel: 3,
  circuitBreakerThreshold: 60,
  circuitBreakerReset: 5000,
  providerFailureThreshold: 5,
  providerFailureWindowMs: 300000,
  providerCooldownMs: 60000,
};

const GEMINI_429_BODY = "Resource has been exhausted (e.g. check quota).";

test.beforeEach(() => {
  resetCounters();
});

// ── Scenario 1: RPM exhausted, RPD not exhausted → RATE_LIMIT_EXCEEDED ────────

test("Gemini 2.5 Flash 5 RPM hit: 429 classifies as RATE_LIMIT_EXCEEDED (not QUOTA_EXHAUSTED)", () => {
  // gemini-2.5-flash: RPM=5, RPD=20
  for (let i = 0; i < 5; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpmExhausted("gemini-2.5-flash"), true);
  assert.equal(isRpdExhausted("gemini-2.5-flash"), false);

  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini-2.5-flash",
    "gemini",
    null,
    PROFILE
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
  assert.ok(result.cooldownMs > 0, "cooldownMs should be positive");
});

// ── Scenario 2: RPD exhausted → QUOTA_EXHAUSTED ───────────────────────────────

test("Gemini 2.5 Flash 20 RPD hit: 429 classifies as QUOTA_EXHAUSTED", () => {
  for (let i = 0; i < 20; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpdExhausted("gemini-2.5-flash"), true);

  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini-2.5-flash",
    "gemini",
    null,
    PROFILE
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
  assert.ok(result.cooldownMs > 0, "cooldownMs should be positive");
});

// ── Scenario 3: Neither RPM nor RPD exhausted → falls through to generic 429 ──

test("Gemini 2.5 Flash 3 requests (below both): 429 falls through to generic RATE_LIMIT_EXCEEDED", () => {
  for (let i = 0; i < 3; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpmExhausted("gemini-2.5-flash"), false);
  assert.equal(isRpdExhausted("gemini-2.5-flash"), false);

  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini-2.5-flash",
    "gemini",
    null,
    PROFILE
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
  assert.ok(result.cooldownMs > 0, "cooldownMs should be positive");
});

// ── Scenario 4: Both limits exhausted → RPD takes priority → QUOTA_EXHAUSTED ──

test("Gemini 2.5 Flash both RPM and RPD hit: RPD check runs first → QUOTA_EXHAUSTED", () => {
  for (let i = 0; i < 25; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpmExhausted("gemini-2.5-flash"), true);
  assert.equal(isRpdExhausted("gemini-2.5-flash"), true);

  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini-2.5-flash",
    "gemini",
    null,
    PROFILE
  );

  // RPD check is first in the if-chain, so it takes priority
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
});

// ── Scenario 5: 16 RPM hit (RPD=500 untouched) → RATE_LIMIT_EXCEEDED ─────────

test("16 RPM hit (RPD<500 untouched): 429 classifies as RATE_LIMIT_EXCEEDED", () => {
  // gemini-3.1-flash-lite: RPM=15, RPD=500
  for (let i = 0; i < 16; i++) incrementRequestCount("gemini-3.1-flash-lite");
  assert.equal(isRpmExhausted("gemini-3.1-flash-lite"), true);
  assert.equal(isRpdExhausted("gemini-3.1-flash-lite"), false);

  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini-3.1-flash-lite",
    "gemini",
    null,
    PROFILE
  );

  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

// ── Scenario 6: Non-Gemini provider bypasses the Gemini-specific check ─────────

test("Non-Gemini provider: tracker state is irrelevant, 429 goes through generic path", () => {
  for (let i = 0; i < 30; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpdExhausted("gemini-2.5-flash"), true);

  // Provider is "openai" — Gemini-specific check is skipped
  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini-2.5-flash",
    "openai",
    null,
    PROFILE
  );

  // Falls through to generic 429 handling → RATE_LIMIT_EXCEEDED
  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

// ── Scenario 7: Reset clears state → no longer exhausted ──────────────────────

test("resetCounters clears both RPM and RPD exhaustion", () => {
  for (let i = 0; i < 20; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpmExhausted("gemini-2.5-flash"), true);
  assert.equal(isRpdExhausted("gemini-2.5-flash"), true);

  resetCounters();

  assert.equal(getDailyRequestCount("gemini-2.5-flash"), 0);
  assert.equal(getMinuteRequestCount("gemini-2.5-flash"), 0);
  assert.equal(isRpmExhausted("gemini-2.5-flash"), false);
  assert.equal(isRpdExhausted("gemini-2.5-flash"), false);

  // Generic 429 path (no model-specific early return)
  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini-2.5-flash",
    "gemini",
    null,
    PROFILE
  );

  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

// ── Scenario 8: RPD exhaustion overrides RPM classification ───────────────────

test("RPD exhaustion overrides RPM classification (RPD checked first)", () => {
  // gemini-2.5-flash: RPM=5, RPD=20 — 25 requests exhausts both
  for (let i = 0; i < 25; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpdExhausted("gemini-2.5-flash"), true);
  assert.equal(isRpmExhausted("gemini-2.5-flash"), true);

  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini-2.5-flash",
    "gemini",
    null,
    PROFILE
  );

  // RPD check runs first in the if-chain
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
});

// ── Scenario 9: Unknown model (no RPM/RPD in JSON) → generic 429 path ─────────

test("Unknown Gemini model without published limits falls through to generic 429", () => {
  incrementRequestCount("gemini/unknown-model");
  assert.equal(isRpmExhausted("gemini/unknown-model"), false);
  assert.equal(isRpdExhausted("gemini/unknown-model"), false);

  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini/unknown-model",
    "gemini",
    null,
    PROFILE
  );

  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

// ── Scenario 10: TPM exhausted, RPD not exhausted → RATE_LIMIT_EXCEEDED ──────

test("Gemini 3.1 Flash Lite 250001 tokens (TPM threshold): 429 classifies as RATE_LIMIT_EXCEEDED", () => {
  // gemini-3.1-flash-lite: TPM=250000, RPD=500
  incrementTokenUsage("gemini-3.1-flash-lite", 250001);
  assert.equal(isTpmExhausted("gemini-3.1-flash-lite"), true);
  assert.equal(isRpdExhausted("gemini-3.1-flash-lite"), false);

  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini-3.1-flash-lite",
    "gemini",
    null,
    PROFILE
  );

  assert.equal(result.reason, RateLimitReason.RATE_LIMIT_EXCEEDED);
});

// ── Scenario 11: TPM + RPD both exhausted → RPD first → QUOTA_EXHAUSTED ───────

test("Gemini 2.5 Flash TPM and RPD both hit: RPD takes priority → QUOTA_EXHAUSTED", () => {
  // gemini-2.5-flash: TPM=250000, RPD=20
  for (let i = 0; i < 25; i++) incrementRequestCount("gemini-2.5-flash");
  incrementTokenUsage("gemini-2.5-flash", 250001);
  assert.equal(isTpmExhausted("gemini-2.5-flash"), true);
  assert.equal(isRpdExhausted("gemini-2.5-flash"), true);

  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini-2.5-flash",
    "gemini",
    null,
    PROFILE
  );

  // RPD check runs first → QUOTA_EXHAUSTED
  assert.equal(result.reason, RateLimitReason.QUOTA_EXHAUSTED);
});

// ── Scenario 11b: real upstream TPM 429 with ZERO local counter state (#7360) ─
//
// Reproduces the live bug: a request rejected by Google before it ever
// completes never calls incrementTokenUsage, so isTpmExhausted() reads false
// at classification time even though Google's own error explicitly names the
// per-minute input-token metric. The text-based classifier must catch this
// when the local counters are blind.

const REAL_GEMINI_TPM_429_BODY =
  "You exceeded your current quota, please check your plan and billing details. " +
  "For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. " +
  "To monitor your current usage, head to: https://ai.dev/rate-limit.\n" +
  "* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_input_token_count, " +
  "limit: 16000, model: gemma-4-31b\n" +
  "Please retry in 57.992793655s.";

test("classifyGeminiQuotaMetricFromText: real TPM error text → 'tpm'", () => {
  assert.equal(classifyGeminiQuotaMetricFromText(REAL_GEMINI_TPM_429_BODY), "tpm");
});

test("classifyGeminiQuotaMetricFromText: RPD-style metric text → 'rpd'", () => {
  const body =
    "Quota exceeded for metric: generativelanguage.googleapis.com/" +
    "generate_content_free_tier_requests_per_day, limit: 20";
  assert.equal(classifyGeminiQuotaMetricFromText(body), "rpd");
});

test("classifyGeminiQuotaMetricFromText: RPM-style metric text → 'rpm'", () => {
  const body =
    "Quota exceeded for metric: generativelanguage.googleapis.com/" +
    "generate_content_free_tier_requests, limit: 5";
  assert.equal(classifyGeminiQuotaMetricFromText(body), "rpm");
});

test("classifyGeminiQuotaMetricFromText: no recognizable metric → null", () => {
  assert.equal(classifyGeminiQuotaMetricFromText(GEMINI_429_BODY), null);
  assert.equal(classifyGeminiQuotaMetricFromText(null), null);
  assert.equal(classifyGeminiQuotaMetricFromText(""), null);
});

test("Real Gemma-4 TPM 429 body with ZERO local counter state → RATE_LIMIT_EXCEEDED, not QUOTA_EXHAUSTED", () => {
  // No incrementTokenUsage/incrementRequestCount calls — this reproduces a
  // request rejected before it could ever contribute to the local counters.
  assert.equal(
    isTpmExhausted("gemma-4-31b-it"),
    false,
    "local counter is blind, as in the live bug"
  );
  assert.equal(isRpdExhausted("gemma-4-31b-it"), false);

  const result = checkFallbackError(
    429,
    REAL_GEMINI_TPM_429_BODY,
    0,
    "gemma-4-31b-it",
    "gemini",
    null,
    PROFILE
  );

  assert.equal(
    result.reason,
    RateLimitReason.RATE_LIMIT_EXCEEDED,
    "the error text's own metric name must override the blind local counter"
  );
  assert.equal(result.shouldFallback, true);
});

// ── Scenario 12: TPM tracking and query ───────────────────────────────────────

test("incrementTokenUsage tracks per-minute token consumption correctly", () => {
  incrementTokenUsage("gemini-2.5-flash", 50000);
  incrementTokenUsage("gemini-2.5-flash", 75000);
  assert.equal(getMinuteTokenCount("gemini-2.5-flash"), 125000);

  // Distinct model counters are independent
  incrementTokenUsage("gemini-2.5-flash-lite", 200000);
  assert.equal(getMinuteTokenCount("gemini-2.5-flash-lite"), 200000);
  assert.equal(getMinuteTokenCount("gemini-2.5-flash"), 125000);
});

// ── Scenario 13: resetCounters clears TPM state too ───────────────────────────

test("resetCounters clears token counters", () => {
  incrementTokenUsage("gemini-2.5-flash", 250001);
  assert.equal(isTpmExhausted("gemini-2.5-flash"), true);
  resetCounters();
  assert.equal(isTpmExhausted("gemini-2.5-flash"), false);
});
