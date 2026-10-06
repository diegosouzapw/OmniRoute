/**
 * Regression guard: a permanently retired model (Gemini's deprecated-model 404,
 * "This model models/gemini-2.5-flash is no longer available to new users...",
 * or a Fireworks/etc. end-of-life 410) must get a long, fixed lockout instead of
 * falling through to the generic transient-error branch's short backoff.
 *
 * Without this classification, combo/auto-routing kept re-selecting the dead
 * model roughly every cooldown window (a few minutes, escalating to ~20min max)
 * for as long as the model stayed in the registry — all day, every day — sending
 * guaranteed-to-fail requests to the provider. At volume this looks like abusive
 * traffic and was implicated in a Gemini free-tier API key getting banned.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError, isModelPermanentlyUnavailable } =
  await import("../../open-sse/services/accountFallback.ts");

const GEMINI_DEPRECATED_404 =
  "[404]: This model models/gemini-2.5-flash is no longer available to new users. " +
  "Please update your code to use models/gemini-3.6-flash for the latest features and improvements.";

const END_OF_LIFE_410 =
  '[410]: {"type":"about:blank","title":"Gone","status":410,"detail":"The model ' +
  "'minimaxai/minimax-m2.7' has reached its end of life on 2026-07-27T00:00:00Z and is no longer available.\"}\n";

test("isModelPermanentlyUnavailable matches Gemini's deprecated-model phrasing", () => {
  assert.equal(isModelPermanentlyUnavailable(GEMINI_DEPRECATED_404), true);
});

test("isModelPermanentlyUnavailable matches end-of-life phrasing", () => {
  assert.equal(isModelPermanentlyUnavailable(END_OF_LIFE_410), true);
});

test("isModelPermanentlyUnavailable does not match an ordinary 404", () => {
  assert.equal(
    isModelPermanentlyUnavailable("[404]: Model not found, inaccessible, and/or not deployed"),
    false
  );
});

test("checkFallbackError locks a deprecated Gemini model for 24h, not a short backoff", () => {
  const result = checkFallbackError(404, GEMINI_DEPRECATED_404, 0, "gemini-2.5-flash", "gemini");

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "not_found");
  assert.equal(result.cooldownMs, 24 * 60 * 60 * 1000);
  // Feeds combo.ts's per-request model-lockout as an upstream-verified reset,
  // so it bypasses the normal ~20min model-lockout ceiling.
  assert.equal(result.quotaResetHintMs, 24 * 60 * 60 * 1000);
});

test("checkFallbackError locks an end-of-life model (410) for 24h too", () => {
  const result = checkFallbackError(410, END_OF_LIFE_410, 0, "minimaxai/minimax-m2.7", "nvidia");

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "not_found");
  assert.equal(result.cooldownMs, 24 * 60 * 60 * 1000);
});

test("a generic 404 (not a deprecation message) still falls through to the short transient cooldown", () => {
  const result = checkFallbackError(
    404,
    "[404]: Model not found, inaccessible, and/or not deployed",
    0,
    "some-model",
    "openrouter"
  );

  assert.equal(result.reason, "unknown");
  assert.notEqual(result.cooldownMs, 24 * 60 * 60 * 1000);
});
