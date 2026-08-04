/**
 * #7907/#7908 follow-up: two breaker-trip call sites bypass `isFailure`/
 * `shouldSkipConnDisable` and were purely status-code gated, so a client-side
 * abort (status defaults to 502, error='request_signal_aborted', no errorCode)
 * still tripped the whole-provider circuit breaker — the highest blast-radius
 * of the 3 resilience mechanisms — even though PR #7908 already fixed the
 * connection-cooldown half of the same bug via `shouldSkipConnDisable()`.
 *
 * This test exercises the two REAL predicates directly (not just the isolated
 * `isLocalStreamLifecycleError()` helper):
 *  - `shouldTripProviderBreakerForResult()` — single-model non-combo path,
 *    src/sse/handlers/chat.ts.
 *  - `shouldRecordProviderBreakerFailure()` — combo path,
 *    open-sse/services/combo/comboPredicates.ts (handleComboChat's executeTarget).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldTripProviderBreakerForResult } from "../../src/sse/handlers/chat.ts";
import { shouldRecordProviderBreakerFailure } from "../../open-sse/services/combo/comboPredicates.ts";

// The exact abort shape described in the PR body / issue #7907: no upstream
// status arrives, so it defaults to 502, and the error surfaces as the bare
// `request_signal_aborted` reason with no errorCode/errorType.
const ABORT_RESULT = {
  status: 502,
  error: "request_signal_aborted",
} as const;

test("chat.ts single-model path: breaker stays CLOSED on a client abort (502 default, no errorCode)", () => {
  assert.equal(shouldTripProviderBreakerForResult(ABORT_RESULT, false, false), false);
});

test("chat.ts single-model path: genuine upstream 502s still trip the breaker", () => {
  assert.equal(
    shouldTripProviderBreakerForResult({ status: 502, error: "Bad Gateway" }, false, false),
    true
  );
});

test("chat.ts single-model path: combo/forceLiveComboTest requests are still excluded regardless of error shape", () => {
  assert.equal(shouldTripProviderBreakerForResult({ status: 502 }, true, false), false);
  assert.equal(shouldTripProviderBreakerForResult({ status: 502 }, false, true), false);
});

test("combo.ts handleComboChat path: breaker stays CLOSED on a client abort (502 default, message-based)", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 502,
      sameProviderNext: false,
      error: "request_signal_aborted",
    }),
    false
  );
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 502,
      sameProviderNext: false,
      error: "Client disconnected: request_signal_aborted",
    }),
    false
  );
});

test("combo.ts handleComboChat path: genuine upstream failures still trip the breaker", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 502,
      sameProviderNext: false,
      error: "upstream 502 Bad Gateway",
    }),
    true
  );
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 503,
      sameProviderNext: false,
    }),
    true
  );
});
