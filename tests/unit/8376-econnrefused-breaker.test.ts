import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldRecordProviderBreakerFailure } from "../../open-sse/services/combo/comboPredicates.ts";

// #8376 — an unreachable upstream proxy (ECONNREFUSED) on a homogeneous same-provider
// combo pool must still trip the whole-provider circuit breaker so combo routing fails
// over to a different provider, instead of burning MAX_GLOBAL_ATTEMPTS against the same
// dead proxy and returning 503 "Maximum combo retry limit".

test("#8376: proxy-unreachable failure on a homogeneous same-provider combo trips the breaker via isProxyUnreachable override", () => {
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: false,
    status: 502,
    sameProviderNext: true,
    skipProviderBreaker: false,
    requestScopedFailure: false,
    error: "connect ECONNREFUSED 127.0.0.1:8787",
    isProxyUnreachable: true,
  });
  assert.equal(result, true);
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
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: true,
    status: 502,
    sameProviderNext: true,
    skipProviderBreaker: false,
    requestScopedFailure: false,
    error: "connect ECONNREFUSED 127.0.0.1:8787",
    isProxyUnreachable: true,
  });
  assert.equal(result, false);
});

test("#8376: the override never bypasses skipProviderBreaker (embedded-service connection-cooldown-only hint) even when isProxyUnreachable is true", () => {
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: false,
    status: 502,
    sameProviderNext: true,
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
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: false,
    status: 200,
    sameProviderNext: true,
    skipProviderBreaker: false,
    requestScopedFailure: false,
    isProxyUnreachable: true,
  });
  assert.equal(result, false);
});

test("#8376: a normal 429 (rate limit) is unaffected by isProxyUnreachable being true (429 intentionally excluded from breaker statuses)", () => {
  const result = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: false,
    status: 429,
    sameProviderNext: true,
    skipProviderBreaker: false,
    requestScopedFailure: false,
    isProxyUnreachable: true,
  });
  assert.equal(result, false);
});
