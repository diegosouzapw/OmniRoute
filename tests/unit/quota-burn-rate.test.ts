/**
 * tests/unit/quota-burn-rate.test.ts
 *
 * Coverage for src/lib/quota/burnRate.ts:
 *   - Empty history returns zeros
 *   - Linear-rate sequence approximates correctly
 *   - timeToExhaustionMs computed when remaining provided
 *   - Zero-rate (no consumption) → null exhaustion
 */

import test from "node:test";
import assert from "node:assert/strict";

const { computeBurnRate } = await import("../../src/lib/quota/burnRate.ts");

// ---------------------------------------------------------------------------
// Edge cases
// ---------------------------------------------------------------------------

test("computeBurnRate: empty history → zeros", () => {
  const result = computeBurnRate([]);
  assert.equal(result.tokensPerSecond, 0);
  assert.equal(result.timeToExhaustionMs, null);
});

test("computeBurnRate: single sample → zeros", () => {
  const result = computeBurnRate([{ ts: 1000, consumed: 100 }]);
  assert.equal(result.tokensPerSecond, 0);
  assert.equal(result.timeToExhaustionMs, null);
});

// ---------------------------------------------------------------------------
// Linear consumption rate
// ---------------------------------------------------------------------------

test("computeBurnRate: constant 10 t/s over 5 samples → tokensPerSecond ≈ 10", () => {
  // Each sample adds 10 tokens per second over 1 second intervals
  const base = Date.now();
  const history = [
    { ts: base, consumed: 0 },
    { ts: base + 1000, consumed: 10 },
    { ts: base + 2000, consumed: 20 },
    { ts: base + 3000, consumed: 30 },
    { ts: base + 4000, consumed: 40 },
  ];
  const result = computeBurnRate(history);
  // EMA converges but with alpha=0.3 over 4 deltas (all 10 t/s), the result
  // should be very close to 10.
  assert.ok(result.tokensPerSecond > 9, `Expected rate > 9, got ${result.tokensPerSecond}`);
  assert.ok(result.tokensPerSecond < 11, `Expected rate < 11, got ${result.tokensPerSecond}`);
});

test("computeBurnRate: remaining=100, rate=10 → timeToExhaustionMs ≈ 10000", () => {
  const base = Date.now();
  const history = [
    { ts: base, consumed: 0 },
    { ts: base + 1000, consumed: 10 },
    { ts: base + 2000, consumed: 20 },
    { ts: base + 3000, consumed: 30 },
    { ts: base + 4000, consumed: 40 },
  ];
  const result = computeBurnRate(history, 100);
  assert.notEqual(result.timeToExhaustionMs, null);
  // Should be close to 10000ms (10s), allow ±10% tolerance
  assert.ok(
    result.timeToExhaustionMs! > 9000,
    `Expected >9000ms, got ${result.timeToExhaustionMs}`
  );
  assert.ok(
    result.timeToExhaustionMs! < 11000,
    `Expected <11000ms, got ${result.timeToExhaustionMs}`
  );
});

// ---------------------------------------------------------------------------
// Zero rate
// ---------------------------------------------------------------------------

test("computeBurnRate: no consumption → tokensPerSecond=0, timeToExhaustionMs=null", () => {
  const base = Date.now();
  const history = [
    { ts: base, consumed: 100 },
    { ts: base + 1000, consumed: 100 }, // no change
    { ts: base + 2000, consumed: 100 },
  ];
  const result = computeBurnRate(history, 500);
  assert.equal(result.tokensPerSecond, 0);
  assert.equal(result.timeToExhaustionMs, null);
});

test("computeBurnRate: no remaining provided → timeToExhaustionMs=null even with non-zero rate", () => {
  const base = Date.now();
  const history = [
    { ts: base, consumed: 0 },
    { ts: base + 1000, consumed: 10 },
  ];
  const result = computeBurnRate(history);
  // Rate should be positive but no remaining given
  assert.ok(result.tokensPerSecond > 0);
  assert.equal(result.timeToExhaustionMs, null);
});

test("computeBurnRate: duplicate timestamps are skipped gracefully", () => {
  const base = Date.now();
  const history = [
    { ts: base, consumed: 0 },
    { ts: base, consumed: 10 }, // same ts — should be skipped
    { ts: base + 1000, consumed: 20 },
  ];
  // Should not throw and should compute valid rate for the one valid delta
  const result = computeBurnRate(history);
  assert.ok(result.tokensPerSecond >= 0);
});
