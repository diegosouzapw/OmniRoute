/**
 * Regression guard: a provider that permanently moved its API base_url
 * (e.g. freeaiapikey's "This API endpoint has moved... the old endpoint on
 * freeaiapikey.com no longer works.") or an account suspended for a billing
 * reason that doesn't match ACCOUNT_DEACTIVATED_SIGNALS's fixed wording (e.g.
 * Fireworks 412 "Account hummern is suspended, possibly due to reaching the
 * monthly spending limit or failure to pay past invoices.") must get a long,
 * fixed lockout instead of falling through to the generic transient-error
 * branch's short backoff.
 *
 * Without this classification, combo/auto-routing kept re-selecting the dead
 * endpoint/suspended account roughly every cooldown window (a few minutes) —
 * observed retried every ~1 minute for a full hour in production logs —
 * sending guaranteed-to-fail requests to the provider. Same bug class as the
 * Gemini deprecated-model lockout gap, on different providers/status codes.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { checkFallbackError, isEndpointPermanentlyMoved, isAccountSuspendedForBilling } =
  await import("../../open-sse/services/accountFallback.ts");

const FREEAIAPIKEY_ENDPOINT_MOVED_410 =
  "[410]: This API endpoint has moved. Please update your base_url to " +
  "https://api.freeaiapikey.com/v1 — the old endpoint on freeaiapikey.com no longer works.";

const FIREWORKS_ACCOUNT_SUSPENDED_412 =
  "[412]: Account hummern is suspended, possibly due to reaching the monthly spending limit " +
  "or failure to pay past invoices. Please go to https://fireworks.ai/account/billing for more information.";

test("isEndpointPermanentlyMoved matches freeaiapikey's moved-endpoint phrasing", () => {
  assert.equal(isEndpointPermanentlyMoved(FREEAIAPIKEY_ENDPOINT_MOVED_410), true);
});

test("isEndpointPermanentlyMoved does not match an ordinary 410", () => {
  assert.equal(isEndpointPermanentlyMoved("[410]: Gone"), false);
});

test("isAccountSuspendedForBilling matches Fireworks's billing-suspension phrasing", () => {
  assert.equal(isAccountSuspendedForBilling(FIREWORKS_ACCOUNT_SUSPENDED_412), true);
});

test("isAccountSuspendedForBilling does not match an unrelated suspension message", () => {
  assert.equal(isAccountSuspendedForBilling("Your access has been suspended for review."), false);
});

test("checkFallbackError locks a permanently moved endpoint for 24h, not a short backoff", () => {
  const result = checkFallbackError(
    410,
    FREEAIAPIKEY_ENDPOINT_MOVED_410,
    0,
    "anthropic/claude-sonnet-4.6",
    "freeaiapikey"
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.reason, "not_found");
  assert.equal(result.cooldownMs, 24 * 60 * 60 * 1000);
  // Feeds combo.ts's per-request model-lockout as an upstream-verified reset,
  // so it bypasses the normal ~20min model-lockout ceiling.
  assert.equal(result.quotaResetHintMs, 24 * 60 * 60 * 1000);
});

test("checkFallbackError treats a billing-suspended account (412) as credits-exhausted", () => {
  const result = checkFallbackError(
    412,
    FIREWORKS_ACCOUNT_SUSPENDED_412,
    0,
    "deepseek-v4-pro",
    "fireworks"
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.creditsExhausted, true);
  assert.ok(result.cooldownMs > 0, "cooldownMs should be positive");
});

test("a generic 412 (no billing-suspension phrasing) still falls through to the short transient cooldown", () => {
  const result = checkFallbackError(
    412,
    "[412]: Precondition Failed",
    0,
    "some-model",
    "some-provider"
  );

  assert.notEqual(result.creditsExhausted, true);
  assert.notEqual(result.cooldownMs, 24 * 60 * 60 * 1000);
});
