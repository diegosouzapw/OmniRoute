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
  getDailyRequestCount,
  getMinuteRequestCount,
  isRpdExhausted,
  isRpmExhausted,
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

// ── Scenario 5: Gemma 4 — 15 RPM hit, 1500 RPD not hit → RATE_LIMIT_EXCEEDED ─

test("Gemma 4 15 RPM hit (RPD=1500 untouched): 429 classifies as RATE_LIMIT_EXCEEDED", () => {
  for (let i = 0; i < 15; i++) incrementRequestCount("gemini/gemma-4-31b-it");
  assert.equal(isRpmExhausted("gemini/gemma-4-31b-it"), true);
  assert.equal(isRpdExhausted("gemini/gemma-4-31b-it"), false);

  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini/gemma-4-31b-it",
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

// ── Scenario 8: RPD exhaustion with Gemma 4 (high RPD, never hit with 15 RPM) ─

test("Gemma 4 1500 RPD exhaustion overrides RPM classification", () => {
  // Pump 1500 daily requests to exhaust RPD
  for (let i = 0; i < 1500; i++) incrementRequestCount("gemini/gemma-4-31b-it");
  assert.equal(isRpdExhausted("gemini/gemma-4-31b-it"), true);
  assert.equal(isRpmExhausted("gemini/gemma-4-31b-it"), true); // 1500 >> 15 RPM

  const result = checkFallbackError(
    429,
    GEMINI_429_BODY,
    0,
    "gemini/gemma-4-31b-it",
    "gemini",
    null,
    PROFILE
  );

  // RPD check runs first
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
