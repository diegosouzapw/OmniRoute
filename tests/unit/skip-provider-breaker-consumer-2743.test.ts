import test from "node:test";
import assert from "node:assert/strict";

/**
 * #2743 — gap d (deferred test debt): CONSUMER-side coverage for `skipProviderBreaker`.
 *
 * The PRODUCER is already covered (tests/unit/account-fallback-service.test.ts, the
 * "G-02" block): `checkFallbackError` returns `skipProviderBreaker: true` for a 503 +
 * `X-Omni-Fallback-Hint: connection_cooldown` (an embedded-service supervisor outage,
 * NOT an upstream AI-provider failure).
 *
 * What was UNVERIFIED is the CONSUMER gate in `open-sse/services/combo.ts` (~line 4350):
 * the decision that, when `skipProviderBreaker` is set, the whole-provider circuit
 * breaker must NOT be tripped (`recordProviderFailure` is skipped) — it is a
 * connection-level cooldown, not a provider-level failure. The producer test's final
 * "breaker stays CLOSED" assertion is trivially true there because nothing ever calls
 * `recordProviderFailure`, so it does not prove the consumer gate works.
 *
 * This test drives the consumer end of the flow:
 *   1. the pure decision predicate (`shouldRecordProviderBreakerFailure`), and
 *   2. its real effect — wiring the producer result THROUGH the predicate into
 *      `recordProviderFailure` against a real circuit breaker, asserting the breaker
 *      stays CLOSED for the skip-hint path and OPENS for the negative-control path.
 */

const combo = await import("../../open-sse/services/combo.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const circuitBreaker = await import("../../src/shared/utils/circuitBreaker.ts");

const { shouldRecordProviderBreakerFailure } = combo;
const {
  checkFallbackError,
  recordProviderFailure,
  isProviderInCooldown,
  getProviderBreakerState,
  clearProviderFailure,
} = accountFallback;
const { resetAllCircuitBreakers } = circuitBreaker;

// Profile override that makes the provider breaker open on the FIRST recorded
// failure, so the negative control is deterministic regardless of env-tuned
// default thresholds (apikey defaults to 12).
const OPEN_ON_FIRST = { failureThreshold: 1, resetTimeoutMs: 60_000 } as const;

test.beforeEach(() => {
  resetAllCircuitBreakers();
});

test.after(() => {
  resetAllCircuitBreakers();
});

// ─── 1. Pure decision predicate ──────────────────────────────────────────────
// Mirrors the four-way gate in combo.ts: only a provider-level failure code, on a
// target NOT followed by a same-provider target, that is NOT a stream-readiness
// failure and NOT flagged skipProviderBreaker, records a provider-breaker failure.

test("predicate: plain 503 (no skip hint) DOES record a provider-breaker failure", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 503,
      sameProviderNext: false,
      skipProviderBreaker: false,
    }),
    true
  );
});

test("predicate: skipProviderBreaker:true suppresses the provider-breaker failure", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 503,
      sameProviderNext: false,
      skipProviderBreaker: true,
    }),
    false
  );
});

test("predicate: skipProviderBreaker undefined behaves like false (records)", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 503,
      sameProviderNext: false,
      // skipProviderBreaker omitted on purpose
    }),
    true
  );
});

test("predicate: stream-readiness failure never records (even on a 5xx)", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: true,
      status: 503,
      sameProviderNext: false,
      skipProviderBreaker: false,
    }),
    false
  );
});

test("predicate: same-provider-next suppresses (a different model may still succeed)", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 503,
      sameProviderNext: true,
      skipProviderBreaker: false,
    }),
    false
  );
});

test("predicate: a non-provider-failure code (e.g. 404) never records", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 404,
      sameProviderNext: false,
      skipProviderBreaker: false,
    }),
    false
  );
});

// ─── 2. End-to-end consumer effect (producer → predicate → breaker) ───────────
// Replays the exact combo.ts consumer wiring against a REAL circuit breaker.

/**
 * Mirror of the combo.ts consumer site: feed a real `checkFallbackError` result
 * through the extracted predicate and into `recordProviderFailure` exactly as the
 * combo router does. Returns whether the breaker failure was recorded.
 */
function runConsumerGate(opts: {
  provider: string;
  status: number;
  errorText: string;
  headers: Headers | Record<string, string> | null;
  sameProviderNext?: boolean;
  isStreamReadinessFailure?: boolean;
}): boolean {
  const fallbackResult = checkFallbackError(
    opts.status,
    opts.errorText,
    0,
    null,
    opts.provider,
    opts.headers ?? null
  );
  const shouldRecord = shouldRecordProviderBreakerFailure({
    isStreamReadinessFailure: opts.isStreamReadinessFailure ?? false,
    status: opts.status,
    sameProviderNext: opts.sameProviderNext ?? false,
    skipProviderBreaker: fallbackResult.skipProviderBreaker,
  });
  if (shouldRecord) {
    // Force the breaker to open on the first failure so the assertion is deterministic.
    recordProviderFailure(opts.provider, undefined, null, OPEN_ON_FIRST);
  }
  return shouldRecord;
}

test("consumer (positive skip): 503 + connection_cooldown hint → breaker stays CLOSED", () => {
  const provider = "test-9router-skip-2743";
  // Sanity: clean start.
  assert.equal(isProviderInCooldown(provider), false);

  const recorded = runConsumerGate({
    provider,
    status: 503,
    errorText: "9router is not running (state: stopped)",
    headers: new Headers({ "X-Omni-Fallback-Hint": "connection_cooldown" }),
  });

  // The producer set skipProviderBreaker:true, so the consumer must NOT record a failure.
  assert.equal(recorded, false, "recordProviderFailure must be skipped for the cooldown hint");
  assert.equal(
    isProviderInCooldown(provider),
    false,
    "provider circuit breaker must remain CLOSED for a supervisor cooldown signal"
  );
  const state = getProviderBreakerState(provider);
  assert.equal(state?.failureCount ?? 0, 0, "breaker failure count must not be incremented");
});

test("consumer (positive skip): five consecutive cooldown-hint 503s keep the breaker CLOSED", () => {
  const provider = "test-9router-skip-loop-2743";
  for (let i = 0; i < 5; i++) {
    const recorded = runConsumerGate({
      provider,
      status: 503,
      errorText: "9router is not running (state: stopped)",
      headers: new Headers({ "X-Omni-Fallback-Hint": "connection_cooldown" }),
    });
    assert.equal(recorded, false, `call ${i + 1} must skip recordProviderFailure`);
  }
  assert.equal(
    isProviderInCooldown(provider),
    false,
    "repeated supervisor cooldown signals must never trip the whole-provider breaker"
  );
});

test("consumer (negative control): plain 503 WITHOUT the hint trips the breaker", () => {
  const provider = "test-openai-noskip-2743";
  assert.equal(isProviderInCooldown(provider), false);

  const recorded = runConsumerGate({
    provider,
    status: 503,
    errorText: "service unavailable",
    headers: null,
  });

  // No skip flag → the consumer records the failure → breaker opens (threshold = 1).
  assert.equal(recorded, true, "a real upstream 503 must record a provider-breaker failure");
  assert.equal(
    isProviderInCooldown(provider),
    true,
    "provider circuit breaker must OPEN for a real upstream outage"
  );
  const state = getProviderBreakerState(provider);
  assert.ok((state?.failureCount ?? 0) >= 1, "breaker failure count must be incremented");

  clearProviderFailure(provider);
});

test("consumer (negative control): same-provider-next still suppresses recording", () => {
  // A real upstream 503 (no skip hint) but the next combo target is the same provider:
  // the gate must NOT trip the breaker so a different model can still be tried.
  const provider = "test-openai-sameprovider-2743";
  const recorded = runConsumerGate({
    provider,
    status: 503,
    errorText: "service unavailable",
    headers: null,
    sameProviderNext: true,
  });
  assert.equal(recorded, false, "same-provider-next must suppress the provider-breaker failure");
  assert.equal(
    isProviderInCooldown(provider),
    false,
    "breaker must stay CLOSED for same-provider-next"
  );
});
