import assert from "node:assert/strict";
import test from "node:test";

/**
 * Combo path must NOT trip the whole-provider circuit breaker on a plain rate-limit 429.
 *
 * Documented policy (docs/architecture/RESILIENCE_GUIDE.md + CLAUDE.md): only
 * 408/500/502/503/504 trip the whole-provider breaker. A plain 429 is connection-cooldown
 * / model-lockout scope, never a whole-provider outage. The single-model path already
 * excludes 429 via `PROVIDER_BREAKER_FAILURE_STATUSES` (src/sse/handlers/chat.ts:206). This
 * asserts the combo predicate `shouldRecordProviderBreakerFailure` is aligned — it must NOT
 * gate on `isProviderFailureCode` (accountFallback.ts), which INCLUDES 429 for the separate
 * connection-cooldown scope.
 */

const { shouldRecordProviderBreakerFailure } =
  await import("../../open-sse/services/combo/comboPredicates.ts");

const OTHER_ARGS = {
  isStreamReadinessFailure: false,
  sameProviderNext: false,
  skipProviderBreaker: false,
} as const;

test("429 (plain rate limit) does NOT record a whole-provider breaker failure", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({ ...OTHER_ARGS, status: 429 }),
    false,
    "a plain 429 must not open the whole-provider breaker (cooldown/lockout scope)"
  );
});

for (const status of [408, 500, 502, 503, 504]) {
  test(`whole-provider failure status ${status} DOES record a breaker failure`, () => {
    assert.equal(
      shouldRecordProviderBreakerFailure({ ...OTHER_ARGS, status }),
      true,
      `status ${status} must trip the whole-provider breaker`
    );
  });
}

test("sameProviderNext:true suppresses recording regardless of status", () => {
  for (const status of [408, 429, 500, 502, 503, 504]) {
    assert.equal(
      shouldRecordProviderBreakerFailure({
        ...OTHER_ARGS,
        sameProviderNext: true,
        status,
      }),
      false,
      `sameProviderNext must suppress recording for status ${status}`
    );
  }
});

test("skipProviderBreaker:true suppresses recording regardless of status", () => {
  for (const status of [408, 429, 500, 502, 503, 504]) {
    assert.equal(
      shouldRecordProviderBreakerFailure({
        ...OTHER_ARGS,
        skipProviderBreaker: true,
        status,
      }),
      false,
      `skipProviderBreaker must suppress recording for status ${status}`
    );
  }
});

test("request-scoped synthetic 502 does NOT record a whole-provider breaker failure", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      ...OTHER_ARGS,
      status: 502,
      requestScopedFailure: true,
    }),
    false
  );
});
