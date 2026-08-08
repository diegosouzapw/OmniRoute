import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createResourcePressureTracker,
  resolveResourcePressureThresholds,
  type PressureReason,
  type PressureSeverity,
  type ResourcePressureState,
  type ResourcePressureThresholds,
  type ResourceSignals,
} from "../../open-sse/utils/resourcePressurePolicy.ts";

const MiB = 1024 ** 2;

function baseSignals(overrides: Partial<ResourceSignals> = {}): ResourceSignals {
  return {
    observedAtMs: 1_000,
    v8: { heapUsedBytes: 100 * MiB, heapLimitBytes: 1_000 * MiB },
    process: {
      rssBytes: 200 * MiB,
      externalBytes: 10 * MiB,
      arrayBuffersBytes: MiB,
      availableBytes: null,
      constrainedBytes: null,
    },
    cgroup: { currentBytes: null, maxBytes: null, highBytes: null, events: null },
    psi: null,
    ...overrides,
  };
}

const fastThresholds: Partial<ResourcePressureThresholds> = {
  highRatio: 0.8,
  criticalRatio: 0.9,
  recoveryRatio: 0.7,
  highPsiAvg10: 20,
  criticalPsiAvg10: 40,
  recoveryPsiAvg10: 10,
  sustainedSamplesHigh: 2,
  sustainedSamplesCritical: 2,
  sustainedSamplesRecovery: 2,
  heapAbsoluteThresholdMb: null,
};

describe("resource pressure threshold validation", () => {
  it("accepts every valid boundary", () => {
    const thresholds = resolveResourcePressureThresholds({
      recoveryRatio: 0,
      highRatio: 0.5,
      criticalRatio: 1,
      recoveryPsiAvg10: 0,
      highPsiAvg10: 50,
      criticalPsiAvg10: 100,
      sustainedSamplesHigh: 1,
      sustainedSamplesCritical: 1,
      sustainedSamplesRecovery: 10_000,
      heapAbsoluteThresholdMb: null,
    });
    assert.equal(thresholds.recoveryRatio, 0);
    assert.equal(thresholds.criticalRatio, 1);
    assert.equal(thresholds.criticalPsiAvg10, 100);
    assert.equal(thresholds.sustainedSamplesRecovery, 10_000);
    assert.equal(thresholds.heapAbsoluteThresholdMb, null);
  });

  it("throws deterministically for invalid partial overrides", () => {
    const invalid: Array<Partial<ResourcePressureThresholds>> = [
      { recoveryRatio: -0.01 },
      { criticalRatio: 1.01 },
      { highRatio: Number.NaN },
      { recoveryRatio: 0.8, highRatio: 0.8 },
      { highRatio: 0.95, criticalRatio: 0.9 },
      { recoveryPsiAvg10: -1 },
      { criticalPsiAvg10: 101 },
      { highPsiAvg10: Number.POSITIVE_INFINITY },
      { recoveryPsiAvg10: 20, highPsiAvg10: 20 },
      { highPsiAvg10: 50, criticalPsiAvg10: 40 },
      { sustainedSamplesHigh: 0 },
      { sustainedSamplesCritical: 1.5 },
      { sustainedSamplesRecovery: 10_001 },
      { heapAbsoluteThresholdMb: 0 },
      { heapAbsoluteThresholdMb: Number.POSITIVE_INFINITY },
    ];
    for (const partial of invalid) {
      assert.throws(() => resolveResourcePressureThresholds(partial), RangeError);
    }
  });
});

describe("resource pressure policy", () => {
  it("does not let high then critical count as two critical samples", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const high = baseSignals({
      v8: { heapUsedBytes: 850 * MiB, heapLimitBytes: 1_000 * MiB },
    });
    const critical = baseSignals({
      v8: { heapUsedBytes: 950 * MiB, heapLimitBytes: 1_000 * MiB },
    });

    assert.equal(tracker.observe(high).severity, "normal");
    assert.equal(tracker.observe(critical).severity, "normal");
    assert.equal(tracker.observe(critical).severity, "critical");
  });

  it("resets pending streak when severity or reason alternates", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const heapCritical = baseSignals({
      v8: { heapUsedBytes: 950 * MiB, heapLimitBytes: 1_000 * MiB },
    });
    const psiCritical = baseSignals({
      psi: {
        someAvg10: 50,
        someAvg60: null,
        someAvg300: null,
        fullAvg10: null,
        fullAvg60: null,
        fullAvg300: null,
      },
    });

    assert.equal(tracker.observe(heapCritical).severity, "normal");
    assert.equal(tracker.observe(psiCritical).severity, "normal");
    assert.equal(tracker.observe(psiCritical).severity, "critical");
    assert.equal(tracker.getState().reason, "psi_some");
  });

  it("baselines cumulative OOM counters and only treats increases as events", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const oomCounters = (oom: number, oom_kill: number, observedAtMs: number) =>
      baseSignals({
        observedAtMs,
        cgroup: {
          currentBytes: null,
          maxBytes: null,
          highBytes: null,
          events: { low: 0, high: 0, max: 0, oom, oom_kill },
        },
      });

    assert.equal(tracker.observe(oomCounters(7, 3, 1)).severity, "normal", "history baselines");
    assert.equal(tracker.observe(oomCounters(7, 3, 2)).severity, "normal", "unchanged history");

    const event = tracker.observe(oomCounters(8, 3, 3));
    assert.equal(event.severity, "critical", "a new OOM event is immediately critical");
    assert.equal(event.reason, "oom_event");

    assert.equal(tracker.observe(oomCounters(8, 3, 4)).severity, "critical");
    assert.equal(
      tracker.observe(oomCounters(8, 3, 5)).severity,
      "normal",
      "unchanged allows recovery"
    );
  });

  it("re-baselines when OOM counters reset or the cgroup event source is replaced", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const events = (oom: number, oom_kill: number) =>
      baseSignals({
        cgroup: {
          currentBytes: null,
          maxBytes: null,
          highBytes: null,
          events: { low: 0, high: 0, max: 0, oom, oom_kill },
        },
      });

    assert.equal(tracker.observe(events(10, 4)).severity, "normal");
    assert.equal(tracker.observe(events(1, 0)).severity, "normal", "counter reset re-baselines");
    assert.equal(
      tracker.observe({ ...events(1, 0), cgroup: { ...events(1, 0).cgroup, events: null } })
        .severity,
      "normal"
    );
    assert.equal(tracker.observe(events(9, 3)).severity, "normal", "replacement re-baselines");
  });

  it("keeps snapshot state fields and bounded-cardinality values", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const state: ResourcePressureState = tracker.observe(baseSignals());
    const severities = new Set<PressureSeverity>(["normal", "high", "critical"]);
    const reasons = new Set<PressureReason>([
      "none",
      "v8_heap_ratio",
      "v8_heap_absolute",
      "cgroup_ratio",
      "cgroup_high",
      "psi_some",
      "psi_full",
      "oom_event",
    ]);
    assert.ok(severities.has(state.severity));
    assert.ok(reasons.has(state.reason));
    assert.deepEqual(Object.keys(state).sort(), [
      "elevatedStreak",
      "lastTransitionAtMs",
      "observedAtMs",
      "reason",
      "recoveryStreak",
      "severity",
    ]);
  });
});
