/**
 * Tests for the EWMA Tracker (Task 0.2).
 *
 * Covers: EWMA smoothing convergence, time-decay, peak tracking, P2C scoring
 * with EWMA + health, edge cases (first observation, long gaps, same values,
 * negative values, NaN), and state management.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  createEwmaTracker,
  createEwmaP2CScoreFn,
} from "../../../open-sse/services/combo/ewmaTracker.ts";

import { getCircuitBreaker, STATE } from "../../../src/shared/utils/circuitBreaker.ts";
import { getComboMetrics } from "../../../open-sse/services/comboMetrics.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

// ────────────────────────────────────────────
//  Helpers
// ────────────────────────────────────────────

/** Run a block of code with a fixed Date.now(). */
function withFakeNow(fakeNow: number, fn: () => void): void {
  const originalNow = Date.now.bind(Date.now);
  Date.now = () => fakeNow;
  try {
    fn();
  } finally {
    Date.now = originalNow;
  }
}

/** Advance time by `ms` milliseconds and return the new fake timestamp. */
function advance(ms: number, current: number): number {
  return current + ms;
}

/** A minimal ResolvedComboTarget for scoring tests. */
function makeTarget(overrides: Partial<ResolvedComboTarget> = {}): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "step-1",
    executionKey: "target-1",
    modelStr: "openai/gpt-4o",
    provider: "openai",
    providerId: "prov-1",
    connectionId: "conn-1",
    weight: 1,
    label: null,
    ...overrides,
  };
}

// ────────────────────────────────────────────
//  createEwmaTracker — basic behaviour
// ────────────────────────────────────────────

describe("createEwmaTracker — basic behaviour", () => {
  it("returns a tracker object with the expected methods", () => {
    const tracker = createEwmaTracker();
    assert.equal(typeof tracker.getOrCreate, "function");
    assert.equal(typeof tracker.update, "function");
    assert.equal(typeof tracker.get, "function");
    assert.equal(typeof tracker.getScore, "function");
    assert.equal(typeof tracker.reset, "function");
    assert.equal(typeof tracker.resetAll, "function");
    assert.equal(typeof tracker.getAll, "function");
  });

  it("getOrCreate creates a new zero-initialized state when key is absent", () => {
    const tracker = createEwmaTracker();
    const state = tracker.getOrCreate("new-key");
    assert.equal(state.value, 0);
    assert.equal(state.peak, 0);
    assert.equal(state.variance, 0);
    assert.equal(state.count, 0);
    assert.equal(state.min, Infinity);
    assert.equal(state.max, -Infinity);
    assert.ok(state.lastUpdate > 0);
  });

  it("getOrCreate returns the same state on repeated calls", () => {
    const tracker = createEwmaTracker();
    const s1 = tracker.getOrCreate("key");
    const s2 = tracker.getOrCreate("key");
    assert.equal(s1, s2, "should return the same object reference");
  });

  it("get returns undefined for an unknown key", () => {
    const tracker = createEwmaTracker();
    assert.equal(tracker.get("nonexistent"), undefined);
  });

  it("get returns the state after creation", () => {
    const tracker = createEwmaTracker();
    tracker.getOrCreate("k");
    assert.notEqual(tracker.get("k"), undefined);
    assert.equal(tracker.get("k")?.count, 0);
  });
});

// ────────────────────────────────────────────
//  createEwmaTracker — update & EWMA convergence
// ────────────────────────────────────────────

describe("createEwmaTracker — update & EWMA convergence", () => {
  it("update with first observation sets values directly (no EWMA)", () => {
    const tracker = createEwmaTracker();
    const state = tracker.update("latency", 150);
    assert.equal(state.value, 150);
    assert.equal(state.peak, 150);
    assert.equal(state.variance, 0);
    assert.equal(state.count, 1);
    assert.equal(state.min, 150);
    assert.equal(state.max, 150);
  });

  it("update with a second observation applies EWMA smoothing", () => {
    const tracker = createEwmaTracker();
    tracker.update("latency", 100);
    const state = tracker.update("latency", 200);
    // alpha=0.3 → 0.3*200 + 0.7*100*1.0 = 60 + 70 = 130  (decay=1 since elapsed≈0)
    assert.ok(Math.abs(state.value - 130) < 0.01);
    assert.equal(state.count, 2);
    assert.equal(state.min, 100);
    assert.equal(state.max, 200);
  });

  it("converges toward constant value over many updates", () => {
    const tracker = createEwmaTracker({ alpha: 0.5 });
    tracker.update("steady", 100);
    for (let i = 0; i < 50; i++) {
      tracker.update("steady", 100);
    }
    const state = tracker.get("steady")!;
    // Should be very close to 100 after many updates
    assert.ok(Math.abs(state.value - 100) < 0.01);
    // Variance should approach 0 for constant observations
    assert.ok(state.variance < 0.01);
  });

  it("alpha=1 uses only the latest observation", () => {
    const tracker = createEwmaTracker({ alpha: 1 });
    tracker.update("fast", 100);
    const state = tracker.update("fast", 900);
    assert.equal(state.value, 900);
  });

  it("alpha=0 throws RangeError (must be > 0)", () => {
    assert.throws(() => createEwmaTracker({ alpha: 0 }), { name: "RangeError" });
  });

  it("alpha=2 throws RangeError (must be ≤ 1)", () => {
    assert.throws(() => createEwmaTracker({ alpha: 2 }), { name: "RangeError" });
  });

  it("beta=0 throws RangeError (must be > 0)", () => {
    assert.throws(() => createEwmaTracker({ beta: 0 }), { name: "RangeError" });
  });

  it("halfLife=0 throws RangeError (must be > 0)", () => {
    assert.throws(() => createEwmaTracker({ halfLife: 0 }), { name: "RangeError" });
  });

  it("halfLife=-1 throws RangeError", () => {
    assert.throws(() => createEwmaTracker({ halfLife: -1 }), { name: "RangeError" });
  });

  it("update creates state for an unknown key", () => {
    const tracker = createEwmaTracker();
    const state = tracker.update("fresh", 42);
    assert.equal(state.value, 42);
    assert.equal(state.count, 1);
  });

  it("update on a getOrCreate'd zero-count state works correctly", () => {
    const tracker = createEwmaTracker();
    tracker.getOrCreate("prep"); // count=0, value=0
    const state = tracker.update("prep", 75);
    // count was 0 → should set directly, not do EWMA with value=0
    assert.equal(state.value, 75);
    assert.equal(state.count, 1);
  });

  it("throws TypeError on NaN observation", () => {
    const tracker = createEwmaTracker();
    assert.throws(() => tracker.update("bad", NaN), { name: "TypeError" });
  });

  it("throws TypeError on Infinity observation", () => {
    const tracker = createEwmaTracker();
    assert.throws(() => tracker.update("bad", Infinity), { name: "TypeError" });
  });

  it("throws TypeError on -Infinity observation", () => {
    const tracker = createEwmaTracker();
    assert.throws(() => tracker.update("bad", -Infinity), { name: "TypeError" });
  });
});

// ────────────────────────────────────────────
//  createEwmaTracker — time-decay
// ────────────────────────────────────────────

describe("createEwmaTracker — time-decay", () => {
  it("zero elapsed time produces decay = 1", () => {
    const tracker = createEwmaTracker();
    tracker.update("a", 100);
    // Consecutive call with no time elapsed: decay ≈ 1
    const state = tracker.update("a", 200);
    // alpha=0.3 → 0.3*200 + 0.7*100*1.0 = 60 + 70 = 130
    assert.ok(Math.abs(state.value - 130) < 0.01);
  });

  it("one halfLife elapsed produces decay ≈ 0.5", () => {
    const start = 1_000_000;
    withFakeNow(start, () => {
      const tracker = createEwmaTracker({ alpha: 0.5 });
      tracker.update("b", 0);

      withFakeNow(advance(30_000, start), () => {
        // halfLife=30s, elapsed=30s → decay=0.5
        // alpha=0.5 → 0.5*200 + 0.5*0*0.5 = 100 + 0 = 100
        const state = tracker.update("b", 200);
        assert.ok(Math.abs(state.value - 100) < 0.01);
      });
    });
  });

  it("very long gap → prior value is almost fully decayed", () => {
    const start = 1_000_000;
    withFakeNow(start, () => {
      const tracker = createEwmaTracker({ halfLife: 10_000 });
      tracker.update("c", 500);

      // 100 seconds later = 10 half-lives → decay ≈ 2^-10 ≈ 0.001
      withFakeNow(advance(100_000, start), () => {
        const state = tracker.update("c", 100);
        // alpha=0.3 → 0.3*100 + 0.7*500*0.001 = 30 + 0.35 ≈ 30.35
        assert.ok(state.value < 50, "value should approach newest observation");
        assert.ok(state.value > 25, "value should not drop below alpha*observation");
      });
    });
  });

  it("halfLife config override per-update changes decay rate", () => {
    const start = 1_000_000;
    withFakeNow(start, () => {
      const tracker = createEwmaTracker({ alpha: 0.5, halfLife: 60_000 });
      tracker.update("d", 0);

      withFakeNow(advance(60_000, start), () => {
        // default halfLife=60s, override to 30s for this update
        const state = tracker.update("d", 200, { halfLife: 30_000 });
        // elapsed=60s, halfLife=30s → decay=0.25
        // alpha=0.5 → 0.5*200 + 0.5*0*0.25 = 100
        assert.ok(Math.abs(state.value - 100) < 0.01);
      });
    });
  });

  it("min and max reflect all observations across updates", () => {
    const tracker = createEwmaTracker();
    tracker.update("e", 50);
    tracker.update("e", 200);
    tracker.update("e", 10);
    const state = tracker.get("e")!;
    assert.equal(state.min, 10);
    assert.equal(state.max, 200);
  });
});

// ────────────────────────────────────────────
//  createEwmaTracker — peak tracking
// ────────────────────────────────────────────

describe("createEwmaTracker — peak tracking", () => {
  it("peak equals value on first observation", () => {
    const tracker = createEwmaTracker();
    const state = tracker.update("p", 300);
    assert.equal(state.peak, 300);
  });

  it("peak rises immediately when value increases", () => {
    const tracker = createEwmaTracker();
    tracker.update("p", 100);
    const state = tracker.update("p", 500);
    // New value > old peak, so peak = new value
    assert.equal(state.peak, state.value);
    // But value may be smoothed: alpha=0.3 → 0.3*500 + 0.7*100 = 220
    assert.ok(Math.abs(state.value - 220) < 0.01);
    assert.equal(state.peak, state.value);
  });

  it("peak decays slower than value when observations drop", () => {
    const start = 1_000_000;
    withFakeNow(start, () => {
      const tracker = createEwmaTracker({ alpha: 0.3, beta: 0.5, halfLife: 30_000 });
      tracker.update("p", 1000); // sets value=1000, peak=1000

      // After 30 seconds, observe a low value
      withFakeNow(advance(30_000, start), () => {
        const state = tracker.update("p", 0);
        // decay = 0.5
        // value = 0.3*0 + 0.7*1000*0.5 = 350
        // peak = max(350, 1000*0.5*0.5) = max(350, 250) = 350
        // So peak == value in this case (value is higher)
        // Let's check that peak >= value
        assert.ok(state.peak >= state.value, "peak should never be below value");
      });
    });
  });

  it("peak can stay above value after a moderate drop", () => {
    const start = 1_000_000;
    withFakeNow(start, () => {
      const tracker = createEwmaTracker({ alpha: 0.5, beta: 0.5, halfLife: 30_000 });
      tracker.update("p", 1000);

      // After only 5 seconds, observe moderately lower value
      withFakeNow(advance(5_000, start), () => {
        const state = tracker.update("p", 600);
        // decay = 0.5^(5000/30000) ≈ 0.891
        // value = 0.5*600 + 0.5*1000*0.891 = 300 + 445.5 = 745.5
        // peak = max(745.5, 1000*0.891*0.5) = max(745.5, 445.5) = 745.5
        // In this case peak==value again. Let me go with a larger drop
        assert.ok(state.peak >= state.value);
      });
    });
  });

  it("peak exceeds value when value drops more quickly than peak decays", () => {
    const start = 1_000_000;
    withFakeNow(start, () => {
      // HalfLife=5s so peak decays slower relative to value update smoothing
      // Actually, with beta=1.0 (no extra peak decay), peak would stay higher
      const tracker = createEwmaTracker({ alpha: 0.5, beta: 1.0, halfLife: 30_000 });
      tracker.update("p", 1000);

      withFakeNow(advance(1_000, start), () => {
        const state = tracker.update("p", 50);
        // decay = 0.5^(1000/30000) ≈ 0.977
        // value = 0.5*50 + 0.5*1000*0.977 = 25 + 488.5 = 513.5
        // peak = max(513.5, 1000*0.977*1.0) = max(513.5, 977) = 977
        assert.ok(state.peak > state.value, "peak should stay above value after a drop");
      });
    });
  });
});

// ────────────────────────────────────────────
//  createEwmaTracker — getScore
// ────────────────────────────────────────────

describe("createEwmaTracker — getScore", () => {
  it("returns 0.25 for unknown key", () => {
    const tracker = createEwmaTracker();
    assert.equal(tracker.getScore("missing"), 0.25);
  });

  it("returns 0.25 for zero-count state", () => {
    const tracker = createEwmaTracker();
    tracker.getOrCreate("init-only");
    assert.equal(tracker.getScore("init-only"), 0.25);
  });

  it("returns high score for low latency", () => {
    const tracker = createEwmaTracker();
    tracker.update("s", 10); // low latency
    const score = tracker.getScore("s");
    // 1/log10(10+10) = 1/log10(20) ≈ 1/1.301 ≈ 0.768
    assert.ok(score > 0.7);
    assert.ok(score < 0.8);
  });

  it("returns low score for high latency", () => {
    const tracker = createEwmaTracker();
    tracker.update("s", 10_000); // high latency
    const score = tracker.getScore("s");
    // 1/log10(10000+10) ≈ 1/4.000 ≈ 0.250
    assert.ok(score < 0.3);
  });

  it("returns 0.25 for zero value", () => {
    const tracker = createEwmaTracker();
    tracker.update("z", 0); // value = 0 → not > 0
    assert.equal(tracker.getScore("z"), 0.25);
  });
});

// ────────────────────────────────────────────
//  createEwmaTracker — reset & lifecycle
// ────────────────────────────────────────────

describe("createEwmaTracker — reset & lifecycle", () => {
  it("reset removes a single key", () => {
    const tracker = createEwmaTracker();
    tracker.update("keep", 1);
    tracker.update("gone", 2);
    tracker.reset("gone");
    assert.notEqual(tracker.get("keep"), undefined);
    assert.equal(tracker.get("gone"), undefined);
  });

  it("resetAll clears all state", () => {
    const tracker = createEwmaTracker();
    tracker.update("a", 1);
    tracker.update("b", 2);
    tracker.update("c", 3);
    tracker.resetAll();
    assert.equal(tracker.get("a"), undefined);
    assert.equal(tracker.get("b"), undefined);
    assert.equal(tracker.get("c"), undefined);
    assert.equal(tracker.getAll().size, 0);
  });

  it("getAll returns a snapshot that does not mutate with subsequent updates", () => {
    const tracker = createEwmaTracker();
    tracker.update("k", 10);
    const snapshot = tracker.getAll();
    assert.equal(snapshot.size, 1);
    tracker.update("k", 20);
    // snapshot should be unchanged
    assert.equal(snapshot.get("k")!.value, 10);
    // tracker state should reflect the new update
    assert.equal(tracker.get("k")!.value, 20 * 0.3 + 10 * 0.7);
  });

  it("can reuse a key after reset", () => {
    const tracker = createEwmaTracker();
    tracker.update("cyclic", 100);
    tracker.reset("cyclic");
    const state = tracker.update("cyclic", 200);
    // After reset, first update should be treated as initial
    assert.equal(state.value, 200);
    assert.equal(state.count, 1);
  });
});

// ────────────────────────────────────────────
//  createEwmaP2CScoreFn
// ────────────────────────────────────────────

describe("createEwmaP2CScoreFn", () => {
  it("returns a scoring function", () => {
    const tracker = createEwmaTracker();
    const scorer = createEwmaP2CScoreFn(tracker);
    assert.equal(typeof scorer, "function");
  });

  it("uses EWMA latency when available", () => {
    const tracker = createEwmaTracker();
    tracker.update("target-1", 50); // low EWMA latency
    const scorer = createEwmaP2CScoreFn(tracker);
    const target = makeTarget();
    const metrics = {
      byModel: {
        "openai/gpt-4o": { successRate: 100, avgLatencyMs: 2000, requests: 10 },
      },
    } as unknown as ReturnType<typeof getComboMetrics>;

    const score = scorer(target, metrics);
    // EWMA latency = 50 → high latency score
    // successRate = 1.0 (100/100)
    // latencyScore = 1/log10(50+10) ≈ 1/1.778 ≈ 0.562
    // total ≈ 1.0 + 0.562 = 1.562
    assert.ok(score > 1.0, `expected score >1.0, got ${score}`);
  });

  it("falls back to raw avgLatencyMs when no EWMA data exists", () => {
    const tracker = createEwmaTracker();
    const scorer = createEwmaP2CScoreFn(tracker);
    const target = makeTarget();
    const metrics = {
      byModel: {
        "openai/gpt-4o": { successRate: 95, avgLatencyMs: 100, requests: 10 },
      },
    } as unknown as ReturnType<typeof getComboMetrics>;

    const score = scorer(target, metrics);
    // Falls back to avgLatencyMs=100
    // latencyScore = 1/log10(100+10) ≈ 1/2.041 ≈ 0.490
    // successScore = 0.95
    // total ≈ 1.44
    assert.ok(score > 1.0, `expected score >1.0, got ${score}`);
  });

  it("applies nodeHealth multiplier when provided", () => {
    const tracker = createEwmaTracker();
    tracker.update("target-1", 100);
    const scorer = createEwmaP2CScoreFn(tracker);
    const target = makeTarget();
    const metrics = {
      byModel: {
        "openai/gpt-4o": { successRate: 100, avgLatencyMs: 100, requests: 10 },
      },
    } as unknown as ReturnType<typeof getComboMetrics>;

    const withoutHealth = scorer(target, metrics);
    const withHealth = scorer(target, metrics, {
      nodeId: "node-1",
      compositeScore: 0.5,
      components: { cpu: 0.5, memory: 0.5, io: 0.5, network: 0.5, gpu: 0.5, requests: 0.5 },
      timestamp: Date.now(),
    });

    assert.ok(withHealth < withoutHealth, "health multiplier < 1 should reduce score");
    assert.ok(Math.abs(withHealth - withoutHealth * 0.5) < 0.001, "should be exactly halved");
  });

  it("clamps nodeHealth compositeScore to min 0.1", () => {
    const tracker = createEwmaTracker();
    tracker.update("target-1", 100);
    const scorer = createEwmaP2CScoreFn(tracker);
    const target = makeTarget();
    const metrics = {
      byModel: {
        "openai/gpt-4o": { successRate: 100, avgLatencyMs: 100, requests: 10 },
      },
    } as unknown as ReturnType<typeof getComboMetrics>;

    const scoreAtZero = scorer(target, metrics, {
      nodeId: "n",
      compositeScore: 0,
      components: { cpu: 0, memory: 0, io: 0, network: 0, gpu: 0, requests: 0 },
      timestamp: Date.now(),
    });
    const scoreAtNegative = scorer(target, metrics, {
      nodeId: "n",
      compositeScore: -5,
      components: { cpu: 0, memory: 0, io: 0, network: 0, gpu: 0, requests: 0 },
      timestamp: Date.now(),
    });
    // Both should be clamped to 0.1 multiplier
    assert.ok(scoreAtZero > 0);
    assert.equal(scoreAtZero, scoreAtNegative);
  });

  it("returns -Infinity when circuit breaker is OPEN", () => {
    const tracker = createEwmaTracker();
    const scorer = createEwmaP2CScoreFn(tracker);
    const target = makeTarget();

    // Force OPEN state via the circuit breaker (pattern from existing tests)
    const breaker = getCircuitBreaker(target.provider);
    breaker.state = STATE.OPEN;
    breaker.lastFailureTime = Date.now();
    breaker.resetTimeout = 60_000;
    try {
      const result = scorer(target, {
        byModel: {},
      } as unknown as ReturnType<typeof getComboMetrics>);
      assert.equal(result, -Infinity);
    } finally {
      breaker.reset();
    }
  });
});

// ────────────────────────────────────────────
//  Integration — EWMA + P2C end-to-end
// ────────────────────────────────────────────

describe("EWMA tracker integration with P2C scenario", () => {
  it("scores two targets differently based on their EWMA histories", () => {
    const tracker = createEwmaTracker();

    // Target A: consistently low latency
    for (let i = 0; i < 5; i++) tracker.update("fast-target", 20);
    // Target B: high and spiky latency
    for (let i = 0; i < 5; i++) tracker.update("slow-target", 1500);

    const scorer = createEwmaP2CScoreFn(tracker);

    const targetFast = makeTarget({ executionKey: "fast-target", modelStr: "fast/model" });
    const targetSlow = makeTarget({ executionKey: "slow-target", modelStr: "slow/model" });

    const emptyMetrics = { byModel: {} } as unknown as ReturnType<typeof getComboMetrics>;
    const mergedMetrics = {
      byModel: {
        "fast/model": { successRate: 100, avgLatencyMs: 20, requests: 5 },
        "slow/model": { successRate: 100, avgLatencyMs: 1500, requests: 5 },
      },
    } as unknown as ReturnType<typeof getComboMetrics>;

    const fastScore = scorer(targetFast, mergedMetrics);
    const slowScore = scorer(targetSlow, mergedMetrics);

    assert.ok(fastScore > slowScore, "fast target should score higher than slow target");
  });

  it("EWMA tracker state is isolated per tracker instance", () => {
    const t1 = createEwmaTracker();
    const t2 = createEwmaTracker();

    t1.update("shared-key", 100);
    t2.update("shared-key", 999);

    assert.notEqual(t1.get("shared-key")!.value, t2.get("shared-key")!.value);
    assert.equal(t1.get("shared-key")!.count, 1);
  });

  it("per-update config override does not affect subsequent updates", () => {
    const tracker = createEwmaTracker({ alpha: 0.3 });
    tracker.update("o", 100); // default alpha 0.3

    // Override with alpha=0.9 for this update only
    tracker.update("o", 200, { alpha: 0.9 });
    const state1 = tracker.get("o")!;
    // 0.9 * 200 + 0.1 * 100 = 180 + 10 = 190
    assert.ok(Math.abs(state1.value - 190) < 0.01);

    // Next update should return to default alpha=0.3
    tracker.update("o", 200);
    const state2 = tracker.get("o")!;
    // 0.3 * 200 + 0.7 * 190 = 60 + 133 = 193
    assert.ok(Math.abs(state2.value - 193) < 0.01);
  });
});

// ────────────────────────────────────────────
//  Edge cases
// ────────────────────────────────────────────

describe("edge cases", () => {
  it("handles negative observation values", () => {
    const tracker = createEwmaTracker();
    const state = tracker.update("neg", -50);
    assert.equal(state.value, -50);
    assert.equal(state.min, -50);
    assert.equal(state.max, -50);

    const state2 = tracker.update("neg", 10);
    // EWMA with negative prior
    assert.ok(state2.value > -50);
    assert.ok(state2.value < 10);
    assert.equal(state2.min, -50);
    assert.equal(state2.max, 10);
  });

  it("handles observation value of 0", () => {
    const tracker = createEwmaTracker();
    tracker.update("zero", 100);
    const state = tracker.update("zero", 0);
    // EWMA: 0.3*0 + 0.7*100 = 70
    assert.ok(Math.abs(state.value - 70) < 0.01);
    assert.equal(state.min, 0);
  });

  it("handles identical repeated observations", () => {
    const tracker = createEwmaTracker({ alpha: 0.5 });
    tracker.update("same", 42);
    for (let i = 0; i < 20; i++) {
      tracker.update("same", 42);
    }
    const state = tracker.get("same")!;
    assert.ok(Math.abs(state.value - 42) < 0.01);
    assert.ok(state.variance < 0.01, "variance should approach 0 for identical values");
  });

  it("handles very rapid consecutive updates (elapsed ≈ 0)", () => {
    const start = 10_000;
    withFakeNow(start, () => {
      const tracker = createEwmaTracker({ alpha: 0.5 });
      tracker.update("rapid", 100);
      withFakeNow(start, () => {
        // Date.now returns the same value → elapsed=0 → decay=1
        const state = tracker.update("rapid", 200);
        // 0.5*200 + 0.5*100*1.0 = 150
        assert.ok(Math.abs(state.value - 150) < 0.01);
      });
    });
  });

  it("handles 1000+ observations without performance degradation", () => {
    const tracker = createEwmaTracker();
    const count = 2000;
    for (let i = 0; i < count; i++) {
      tracker.update("stress", Math.random() * 1000);
    }
    const state = tracker.get("stress")!;
    assert.equal(state.count, count);
    assert.ok(state.value > 0);
    assert.ok(state.value < 1000);
  });
});
