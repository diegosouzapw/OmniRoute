import test from "node:test";
import assert from "node:assert/strict";

const { maybeThrottle } = await import("../../open-sse/services/batchProcessor.ts");

function makeHeaders(entries: Record<string, string>): Headers {
  return new Headers(entries);
}

test("maybeThrottle - no rate-limit headers", () => {
  const headers = makeHeaders({ "content-type": "application/json" });
  const result = maybeThrottle(headers);
  assert.strictEqual(result, null);
});

test("maybeThrottle - missing request limit (no denominator)", () => {
  const headers = makeHeaders({
    "x-ratelimit-remaining-req-minute": "50",
  });
  const result = maybeThrottle(headers);
  assert.strictEqual(result, null);
});

test("maybeThrottle - missing remaining tokens (no numerator for token pressure)", () => {
  const headers = makeHeaders({
    "x-ratelimit-limit-req-minute": "100",
    "x-ratelimit-remaining-req-minute": "50",
  });
  const result = maybeThrottle(headers);
  assert.ok(result === null || (result >= 20_000 && result <= 32_000));
});

test("maybeThrottle - high request pressure (remaining below 5%)", () => {
  const headers = makeHeaders({
    "x-ratelimit-remaining-req-minute": "2",
    "x-ratelimit-limit-req-minute": "100",
    "x-ratelimit-remaining-tokens-minute": "50000",
    "x-ratelimit-tokens-query-cost": "50",
  });
  const result = maybeThrottle(headers);
  assert.ok(result !== null, "Should return a delay under high pressure");
  assert.ok(result >= 20_000 && result <= 32_000, `Delay should be 20-32s, got ${result}`);
});

test("maybeThrottle - moderate request pressure (5-15%)", () => {
  const headers = makeHeaders({
    "x-ratelimit-remaining-req-minute": "10",
    "x-ratelimit-limit-req-minute": "100",
    "x-ratelimit-remaining-tokens-minute": "50000",
    "x-ratelimit-tokens-query-cost": "50",
  });
  const result = maybeThrottle(headers);
  assert.ok(result !== null, "Should return a delay under moderate pressure");
  assert.ok(result >= 7_000 && result <= 10_000, `Delay should be 7-10s, got ${result}`);
});

test("maybeThrottle - low request pressure (above 15%) - no throttling", () => {
  const headers = makeHeaders({
    "x-ratelimit-remaining-req-minute": "50",
    "x-ratelimit-limit-req-minute": "100",
    "x-ratelimit-remaining-tokens-minute": "50000",
    "x-ratelimit-tokens-query-cost": "50",
  });
  const result = maybeThrottle(headers);
  assert.strictEqual(result, null, "Should not throttle under low pressure");
});

test("maybeThrottle - high token pressure (remaining near zero)", () => {
  const headers = makeHeaders({
    "x-ratelimit-remaining-req-minute": "100",
    "x-ratelimit-limit-req-minute": "100",
    "x-ratelimit-remaining-tokens-minute": "10",
    "x-ratelimit-tokens-query-cost": "500",
  });
  const result = maybeThrottle(headers);
  assert.ok(result !== null, "Should return a delay under high token pressure");
  assert.ok(result >= 20_000 && result <= 32_000, `Delay should be 20-32s, got ${result}`);
});

test("maybeThrottle - zero remaining requests (edge case)", () => {
  const headers = makeHeaders({
    "x-ratelimit-remaining-req-minute": "0",
    "x-ratelimit-limit-req-minute": "100",
    "x-ratelimit-remaining-tokens-minute": "50000",
    "x-ratelimit-tokens-query-cost": "50",
  });
  const result = maybeThrottle(headers);
  assert.ok(result !== null, "Should throttle when remaining is 0");
  assert.ok(result >= 25_000 && result <= 35_000, `Delay should be 25-35s, got ${result}`);
});

test("maybeThrottle - zero limit (edge case - avoid division by zero)", () => {
  const headers = makeHeaders({
    "x-ratelimit-remaining-req-minute": "0",
    "x-ratelimit-limit-req-minute": "0",
  });
  const result = maybeThrottle(headers);
  assert.strictEqual(result, null);
});

test("maybeThrottle - token pressure when remaining + cost is zero", () => {
  const headers = makeHeaders({
    "x-ratelimit-remaining-req-minute": "50",
    "x-ratelimit-limit-req-minute": "100",
    "x-ratelimit-remaining-tokens-minute": "0",
    "x-ratelimit-tokens-query-cost": "0",
  });
  const result = maybeThrottle(headers);
  assert.strictEqual(result, null);
});

test("maybeThrottle - both pressures, token pressure is tighter", () => {
  const headers = makeHeaders({
    "x-ratelimit-remaining-req-minute": "50",
    "x-ratelimit-limit-req-minute": "100",
    "x-ratelimit-remaining-tokens-minute": "100",
    "x-ratelimit-tokens-query-cost": "10000",
  });
  const result = maybeThrottle(headers);
  assert.ok(result !== null, "Should use the tighter of the two pressures");
  assert.ok(
    result >= 20_000 && result <= 32_000,
    `Delay should be 20-32s (high pressure from tokens), got ${result}`
  );
});

test("maybeThrottle - malformed header values (NaN)", () => {
  const headers = makeHeaders({
    "x-ratelimit-remaining-req-minute": "abc",
    "x-ratelimit-limit-req-minute": "100",
  });
  const result = maybeThrottle(headers);
  assert.ok(result === null || (result >= 20_000 && result <= 32_000));
});
