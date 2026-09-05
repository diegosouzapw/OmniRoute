// tests/unit/combo-recovery-quota-10966.test.ts
// #10966: a combo that exhausts because every observed failure was a durable
// quota/balance error (HTTP 403 `insufficient_quota` / `AUTHZ_INSUFFICIENT_BALANCE`,
// or the more common 402/429 quota signals) must NOT ship `recovery.action = "retry"`.
//
// Root cause chain (both pieces exercised here against the REAL exported functions,
// not re-implemented logic):
//
//  1. open-sse/services/combo/quotaExhaustion.ts::isQuotaExhaustionResponse only
//     classified status 402/429 as quota-exhaustion; a 403 insufficient_quota /
//     AUTHZ_INSUFFICIENT_BALANCE response (the issue's exact repro) fell straight
//     through to `false`, so combo.ts's `allObservedFailuresQuota` accumulator
//     never went (and stayed) true for this class of failure.
//  2. open-sse/services/combo/pinRecovery.ts::buildRecoveryHint had no case for a
//     stable "quota_exhausted" terminalReason, so even a caller that DID resolve
//     the reason correctly fell through to the `default` "retry" / "failed
//     transiently" branch — actively wrong advice for a durable wallet exhaustion.

import test from "node:test";
import assert from "node:assert/strict";
import { buildRecoveryHint } from "../../../open-sse/services/combo/pinRecovery.ts";
import { isQuotaExhaustionResponse } from "../../../open-sse/services/combo/quotaExhaustion.ts";

test("buildRecoveryHint: quota_exhausted terminalReason maps to switch-combo, not retry", () => {
  const hint = buildRecoveryHint("quota_exhausted");
  assert.equal(hint.action, "switch-combo");
  assert.notEqual(hint.action, "retry");
  assert.match(hint.next_step, /quota|balance/i);
  assert.doesNotMatch(hint.next_step, /failed transiently/i);
});

test("buildRecoveryHint: the raw upstream message (pre-fix behavior) still falls through to retry — proves the default branch is the bug surface, not a strawman", () => {
  // This is the literal bug from the issue: combo.ts used to pass `lastError` (the
  // raw upstream string) straight into buildComboDiag/buildRecoveryHint instead of
  // a stable code — this assertion documents that the raw-string path is still
  // (correctly) unmapped, which is exactly why combo.ts must stamp "quota_exhausted"
  // instead of forwarding the raw message.
  const hint = buildRecoveryHint("Insufficient account balance. Top up your account at …");
  assert.equal(hint.action, "retry");
});

test("isQuotaExhaustionResponse: HTTP 403 insufficient_quota code is classified as quota exhaustion (#10966 repro)", async () => {
  const response = new Response(
    JSON.stringify({ error: { code: "insufficient_quota", message: "Insufficient account balance." } }),
    { status: 403 }
  );
  const exhausted = await isQuotaExhaustionResponse(response, "some-provider", "some-model", null);
  assert.equal(exhausted, true);
});

test("isQuotaExhaustionResponse: HTTP 403 AUTHZ_INSUFFICIENT_BALANCE type is classified as quota exhaustion (#10966 repro)", async () => {
  const response = new Response(
    JSON.stringify({
      error: {
        type: "AUTHZ_INSUFFICIENT_BALANCE",
        message: "Insufficient account balance. Top up your account at https://example.invalid/billing",
      },
    }),
    { status: 403 }
  );
  const exhausted = await isQuotaExhaustionResponse(response, "some-provider", "some-model", null);
  assert.equal(exhausted, true);
});

test("isQuotaExhaustionResponse: a generic 403 with no quota signal stays false (no over-widening)", async () => {
  const response = new Response(
    JSON.stringify({ error: { code: "invalid_api_key", message: "Invalid API key provided." } }),
    { status: 403 }
  );
  const exhausted = await isQuotaExhaustionResponse(response, "some-provider", "some-model", null);
  assert.equal(exhausted, false);
});

test("isQuotaExhaustionResponse: 402 payment-required still classified as quota exhaustion (pre-existing behavior preserved)", async () => {
  const response = new Response(
    JSON.stringify({ error: { code: "insufficient_quota", message: "Payment required." } }),
    { status: 402 }
  );
  const exhausted = await isQuotaExhaustionResponse(response, "some-provider", "some-model", null);
  assert.equal(exhausted, true);
});
