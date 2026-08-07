import { test } from "node:test";
import assert from "node:assert/strict";
import {
  shouldRecordProviderBreakerFailure,
  isStreamEarlyEofErrorBody,
  isStreamReadinessFailureErrorBody,
} from "../../open-sse/services/combo/comboPredicates.ts";

// A STREAM_EARLY_EOF means the upstream returned HTTP 200, opened the SSE stream, then
// closed it without emitting a single non-ping event. It was being classified together
// with STREAM_READINESS_TIMEOUT (a pre-flight liveness probe), and the readiness exemption
// in shouldRecordProviderBreakerFailure meant the whole-provider circuit breaker never saw
// it. During a provider-wide outage that made the breaker blind: every request kept being
// dispatched to the failing provider instead of shedding to the next combo target.
//
// The two codes still share the transient-retry and semaphore-cooldown paths in combo.ts.
// Only the breaker needs to tell them apart.

const earlyEofBody = {
  error: {
    message: "Stream ended before producing a non-ping SSE event",
    type: "stream_early_eof",
    code: "STREAM_EARLY_EOF",
  },
};

const readinessBody = {
  error: {
    message: "Stream readiness timeout",
    type: "stream_timeout",
    code: "STREAM_READINESS_TIMEOUT",
  },
};

test("an early EOF trips the provider breaker", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: true,
      isStreamEarlyEof: true,
      status: 502,
      sameProviderNext: false,
      skipProviderBreaker: false,
      requestScopedFailure: false,
      error: "Stream ended before producing a non-ping SSE event",
    }),
    true
  );
});

test("a readiness-probe timeout still does not trip the breaker", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: true,
      isStreamEarlyEof: false,
      status: 502,
      sameProviderNext: false,
      skipProviderBreaker: false,
      requestScopedFailure: false,
      error: "Stream readiness timeout",
    }),
    false
  );
});

test("regression: before the fix both codes shared one flag, so the early EOF was exempted", () => {
  // isStreamEarlyEof omitted entirely == the old call shape.
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: true,
      status: 502,
      sameProviderNext: false,
      skipProviderBreaker: false,
      requestScopedFailure: false,
      error: "Stream ended before producing a non-ping SSE event",
    }),
    false
  );
});

// The override is additive: it lifts the readiness exemption and nothing else. Every other
// AND-term in the gate must still be able to veto the trip.

test("a client abort still does not trip, even on an early EOF", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: true,
      isStreamEarlyEof: true,
      status: 502,
      sameProviderNext: false,
      skipProviderBreaker: false,
      requestScopedFailure: false,
      error: "Client disconnected: request_signal_aborted",
    }),
    false
  );
});

test("skipProviderBreaker still wins over an early EOF", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: true,
      isStreamEarlyEof: true,
      status: 502,
      sameProviderNext: false,
      skipProviderBreaker: true,
      requestScopedFailure: false,
      error: "Stream ended before producing a non-ping SSE event",
    }),
    false
  );
});

test("a request-scoped failure still does not trip on an early EOF", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: true,
      isStreamEarlyEof: true,
      status: 502,
      sameProviderNext: false,
      skipProviderBreaker: false,
      requestScopedFailure: true,
      error: "Stream ended before producing a non-ping SSE event",
    }),
    false
  );
});

test("sameProviderNext still defers the trip on an early EOF", () => {
  // Another model on the same provider may still succeed, so the existing policy holds.
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: true,
      isStreamEarlyEof: true,
      status: 502,
      sameProviderNext: true,
      skipProviderBreaker: false,
      requestScopedFailure: false,
      error: "Stream ended before producing a non-ping SSE event",
    }),
    false
  );
});

test("429 is still excluded from the whole-provider breaker", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: true,
      isStreamEarlyEof: true,
      status: 429,
      sameProviderNext: false,
      skipProviderBreaker: false,
      requestScopedFailure: false,
      error: "rate limit",
    }),
    false
  );
});

// Body classification: the new predicate must be strictly narrower than the existing one.

test("isStreamEarlyEofErrorBody matches only the early-EOF code", () => {
  assert.equal(isStreamEarlyEofErrorBody(earlyEofBody), true);
  assert.equal(isStreamEarlyEofErrorBody(readinessBody), false);
});

test("isStreamReadinessFailureErrorBody keeps matching both codes", () => {
  // The transient-retry and semaphore paths depend on this staying unchanged.
  assert.equal(isStreamReadinessFailureErrorBody(earlyEofBody), true);
  assert.equal(isStreamReadinessFailureErrorBody(readinessBody), true);
});

test("malformed bodies are not classified as an early EOF", () => {
  for (const body of [null, undefined, "STREAM_EARLY_EOF", {}, { error: null }, { error: {} }]) {
    assert.equal(isStreamEarlyEofErrorBody(body), false);
  }
});
