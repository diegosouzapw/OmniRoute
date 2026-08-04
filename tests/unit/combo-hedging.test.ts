/**
 * tests/unit/combo-hedging.test.ts
 *
 * Previously a placeholder (two `assert.ok(true)`). Now exercises the two
 * zero-latency features it claims to cover:
 *   1. Predictive-TTFT circuit-breaker DECISION (shouldSkipForPredictedTtft).
 *   2. Hedging / zero-latency CONFIG resolution (defaults + per-combo override),
 *      i.e. the knobs the combo engine reads before racing/skip-ahead.
 *
 * The full hedging DISPATCH (Promise.race + loser abort) is covered end-to-end
 * in combo-routing-engine.test.ts; here we pin the decision logic + config
 * plumbing that gate it (both opt-in / off by default).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { shouldSkipForPredictedTtft } from "../../open-sse/services/combo.ts";
import { getDefaultComboConfig, resolveComboConfig } from "../../open-sse/services/comboConfig.ts";

// ── Predictive-TTFT circuit breaker (decision) ────────────────────────────────
test("predictive-TTFT — skips a model whose avg latency exceeds the ceiling (enough samples)", () => {
  assert.equal(shouldSkipForPredictedTtft({ requests: 10, avgLatencyMs: 5000 }, 2000), true);
});

test("predictive-TTFT — does NOT skip with too few samples (< 5)", () => {
  assert.equal(shouldSkipForPredictedTtft({ requests: 4, avgLatencyMs: 9000 }, 2000), false);
});

test("predictive-TTFT — does NOT skip when avg latency is within the ceiling", () => {
  assert.equal(shouldSkipForPredictedTtft({ requests: 50, avgLatencyMs: 1200 }, 2000), false);
});

test("predictive-TTFT — disabled (ceiling <= 0) never skips", () => {
  assert.equal(shouldSkipForPredictedTtft({ requests: 50, avgLatencyMs: 9000 }, 0), false);
});

test("predictive-TTFT — null/missing metric never skips", () => {
  assert.equal(shouldSkipForPredictedTtft(null, 2000), false);
  assert.equal(shouldSkipForPredictedTtft(undefined, 2000), false);
});

// ── Hedging / zero-latency config resolution ──────────────────────────────────
test("hedging — defaults are opt-in (off) so normal combos never race", () => {
  const d = getDefaultComboConfig();
  assert.equal(d.hedging, false);
  assert.equal(d.hedgeDelayMs, 500);
  assert.equal(d.predictiveTtftMs, 0);
  assert.equal(d.zeroLatencyOptimizationsEnabled, false);
});

test("hedging — per-combo config overrides the zero-latency defaults", () => {
  const resolved = resolveComboConfig(
    {
      config: {
        hedging: true,
        hedgeDelayMs: 200,
        zeroLatencyOptimizationsEnabled: true,
        predictiveTtftMs: 3000,
      },
    },
    null
  );
  assert.equal(resolved.hedging, true);
  assert.equal(resolved.hedgeDelayMs, 200);
  assert.equal(resolved.zeroLatencyOptimizationsEnabled, true);
  assert.equal(resolved.predictiveTtftMs, 3000);
});
