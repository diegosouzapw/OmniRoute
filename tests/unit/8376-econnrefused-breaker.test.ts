import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldRecordProviderBreakerFailure } from "../../open-sse/services/combo/comboPredicates.ts";

// #8376 — an unreachable upstream proxy (ECONNREFUSED) is a NETWORK-layer error:
// we never reached the provider, so the provider itself may be healthy. These
// errors must NOT trip the provider-level circuit breaker (which blocks ALL
// accounts for the entire provider). Per-model lockout (handled separately by
// recordModelLockoutFailure) is the correct resilience response.

test("#8376: proxy-unreachable failure does NOT trip the provider breaker (network error, not provider error)", () => {
  // sameProviderNext=false so the test actually validates the isProxyUnreachable guard.
  // With sameProviderNext=true, !args.sameProviderNext would be false and the function
  // returns false regardless of isProxyUnreachable — a false positive.
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: false,
    status: 502,
    sameProviderNext: false,
    skipProviderBreaker: false,
    requestScopedFailure: false,
    error: "connect ECONNREFUSED 127.0.0.1:8787",
    isProxyUnreachable: true,
  });
  assert.equal(result, false);
});

test("#8376 control: without the override, the SAME same-provider failure still does not trip (proves the override is additive, not a blanket bypass)", () => {
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: false,
    status: 502,
    sameProviderNext: true,
    skipProviderBreaker: false,
    requestScopedFailure: false,
    error: "connect ECONNREFUSED 127.0.0.1:8787",
    isProxyUnreachable: false,
  });
  assert.equal(result, false);
});

test("#8376: the override never bypasses the other AND-terms — a stream-readiness failure still does not trip even when isProxyUnreachable is true", () => {
  // sameProviderNext=false so the test validates isStreamReadinessFailure guard.
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: true,
    status: 502,
    sameProviderNext: false,
    skipProviderBreaker: false,
    requestScopedFailure: false,
    error: "connect ECONNREFUSED 127.0.0.1:8787",
    isProxyUnreachable: true,
  });
  assert.equal(result, false);
});

test("#8376: the override never bypasses skipProviderBreaker (embedded-service connection-cooldown-only hint) even when isProxyUnreachable is true", () => {
  // sameProviderNext=false so the test validates skipProviderBreaker guard.
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: false,
    status: 502,
    sameProviderNext: false,
    skipProviderBreaker: true,
    requestScopedFailure: false,
    error: "connect ECONNREFUSED 127.0.0.1:8787",
    isProxyUnreachable: true,
  });
  assert.equal(result, false);
});

test("#8376: a genuine same-provider 5xx (not proxy-unreachable) still does NOT trip the breaker — no over-widening", () => {
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: false,
    status: 502,
    sameProviderNext: true,
    skipProviderBreaker: false,
    requestScopedFailure: false,
    error: "upstream returned 502",
  });
  assert.equal(result, false);
});

test("#8376: a normal 200-derived non-breaker-status failure is unaffected by isProxyUnreachable being true (status gate still applies)", () => {
  // sameProviderNext=false so the test validates the status gate.
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: false,
    status: 200,
    sameProviderNext: false,
    skipProviderBreaker: false,
    requestScopedFailure: false,
    isProxyUnreachable: true,
  });
  assert.equal(result, false);
});

test("#8376: a normal 429 (rate limit) is unaffected by isProxyUnreachable being true (429 intentionally excluded from breaker statuses)", () => {
  // sameProviderNext=false so the test validates the status gate.
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: false,
    status: 429,
    sameProviderNext: false,
    skipProviderBreaker: false,
    requestScopedFailure: false,
    isProxyUnreachable: true,
  });
  assert.equal(result, false);
});
