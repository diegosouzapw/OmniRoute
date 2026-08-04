import { test } from "node:test";
import assert from "node:assert/strict";
import { shouldTripProviderBreakerForResult } from "../../src/sse/handlers/chatPredicates.ts";

// Network-layer errors and OmniRoute's own queue timeouts must NOT trip the
// provider circuit breaker. These are not provider failures.

test("proxy_unreachable errorCode does NOT trip provider breaker", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 502, errorCode: "proxy_unreachable", errorType: null, error: "ECONNREFUSED" },
    false,
    false
  );
  assert.equal(result, false);
});

test("RATE_LIMIT_QUEUE_TIMEOUT errorCode does NOT trip provider breaker", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 503, errorCode: "RATE_LIMIT_QUEUE_TIMEOUT", errorType: null, error: "queue expired" },
    false,
    false
  );
  assert.equal(result, false);
});

test("RATE_LIMIT_QUEUE_WEDGED errorCode does NOT trip provider breaker", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 503, errorCode: "RATE_LIMIT_QUEUE_WEDGED", errorType: null, error: "limiter wedged" },
    false,
    false
  );
  assert.equal(result, false);
});

test("genuine 502 without proxy_unreachable DOES trip provider breaker", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 502, errorCode: null, errorType: null, error: "upstream error" },
    false,
    false
  );
  assert.equal(result, true);
});

test("genuine 503 without queue timeout DOES trip provider breaker", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 503, errorCode: null, errorType: null, error: "service unavailable" },
    false,
    false
  );
  assert.equal(result, true);
});

test("isCombo=true prevents breaker trip regardless of error", () => {
  const result = shouldTripProviderBreakerForResult(
    { status: 502, errorCode: null, errorType: null, error: "upstream error" },
    true,
    false
  );
  assert.equal(result, false);
});

test("hasFallback=true prevents breaker trip (combo fallback path)", () => {
  // forceLiveComboTest maps to the third parameter in the function signature.
  // When true, the breaker trip is suppressed (combo will try next model).
  const result = shouldTripProviderBreakerForResult(
    { status: 502, errorCode: null, errorType: null, error: "upstream error" },
    false,
    true
  );
  assert.equal(result, false);
});
