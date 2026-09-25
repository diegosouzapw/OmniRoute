import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createResourcePressureTracker,
  hasKernelThrottleProof,
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
    cgroup: { currentBytes: null, maxBytes: null, highBytes: null, fileBytes: null, events: null },
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

// High mark 3 GiB, total charge 3.5 GiB, tiny working set: the raw total is
// above high while the kernel shows no throttling signal.
function overHighWithoutProof(): ResourceSignals {
  return baseSignals({
    cgroup: {
      currentBytes: 3_758_096_384,
      maxBytes: 5 * 1024 ** 3,
      highBytes: 3 * 1024 ** 3,
      fileBytes: 3_221_225_472,
      events: { low: 0, high: 0, max: 0, oom: 0, oom_kill: 0 },
    },
    psi: {
      someAvg10: 0,
      someAvg60: 0,
      someAvg300: 0,
      fullAvg10: 0,
      fullAvg60: 0,
      fullAvg300: 0,
      psiSource: "cgroup",
    },
  });
}

describe("cgroup_high throttle proof", () => {
  it("stays informative on cache load without kernel throttling", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    tracker.observe(overHighWithoutProof());
    const state = tracker.observe(overHighWithoutProof());
    assert.equal(state.severity, "high");
    assert.equal(state.reason, "cgroup_high");
  });

  it("reaches critical on a memory.events high increase across the window", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const first = overHighWithoutProof();
    const proof = overHighWithoutProof();
    proof.cgroup = {
      ...proof.cgroup,
      events: { low: 0, high: 3, max: 0, oom: 0, oom_kill: 0 },
    };
    const proofMore = overHighWithoutProof();
    proofMore.cgroup = {
      ...proofMore.cgroup,
      events: { low: 0, high: 5, max: 0, oom: 0, oom_kill: 0 },
    };
    // H,H arms the informative high with a stable zero baseline. The proof is
    // a delta across the window, so it takes two rising samples (proof, then
    // proof-more) before the sustained critical pair lands: the extra samples
    // after the ratio trip are inherent to observing a counter increase.
    tracker.observe(first);
    tracker.observe(first);
    tracker.observe(proof);
    const state = tracker.observe(proofMore);
    assert.equal(state.severity, "critical");
    assert.equal(state.reason, "cgroup_high");
  });

  it("reaches critical on cgroup PSI above zero when events are silent", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const mk = (psiValue: number): ResourceSignals => {
      const signals = overHighWithoutProof();
      signals.psi = {
        someAvg10: psiValue,
        someAvg60: psiValue,
        someAvg300: psiValue,
        fullAvg10: 0,
        fullAvg60: 0,
        fullAvg300: 0,
        psiSource: "cgroup",
      };
      return signals;
    };
    tracker.observe(mk(2.5));
    const state = tracker.observe(mk(2.5));
    assert.equal(state.severity, "critical");
    assert.equal(state.reason, "cgroup_high");
  });

  it("stays informative on host PSI alone while events stay silent", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const mk = (): ResourceSignals => {
      const signals = overHighWithoutProof();
      signals.psi = {
        someAvg10: 5,
        someAvg60: 5,
        someAvg300: 5,
        fullAvg10: 0,
        fullAvg60: 0,
        fullAvg300: 0,
        psiSource: "host",
      };
      return signals;
    };
    tracker.observe(mk());
    const state = tracker.observe(mk());
    assert.equal(state.severity, "high");
    assert.equal(state.reason, "cgroup_high");
  });

  it("keeps the raw ratio on hosts without memory.events", () => {
    // No events and no PSI at all: no signal either way, keep the raw ratio.
    const tracker = createResourcePressureTracker(fastThresholds);
    const mk = (): ResourceSignals => {
      const signals = overHighWithoutProof();
      signals.cgroup = { ...signals.cgroup, events: null };
      signals.psi = null;
      return signals;
    };
    tracker.observe(mk());
    const state = tracker.observe(mk());
    assert.equal(state.severity, "critical");
    assert.equal(state.reason, "cgroup_high");
  });

  it("stays informative on hosts without memory.events but zero PSI", () => {
    // Events unavailable but PSI readable and zero: the kernel shows no
    // throttling, so the raw total above high caps at high.
    const tracker = createResourcePressureTracker(fastThresholds);
    const mk = (): ResourceSignals => {
      const signals = overHighWithoutProof();
      signals.cgroup = { ...signals.cgroup, events: null };
      return signals;
    };
    tracker.observe(mk());
    const state = tracker.observe(mk());
    assert.equal(state.severity, "high");
    assert.equal(state.reason, "cgroup_high");
  });

  it("proves nothing on a rewound throttle counter this cycle", () => {
    assert.equal(hasKernelThrottleProof(overHighWithoutProof(), { high: 9, max: 0 }), false);
    const tracker = createResourcePressureTracker(fastThresholds);
    const wound = overHighWithoutProof();
    wound.cgroup = {
      ...wound.cgroup,
      events: { low: 0, high: 2, max: 0, oom: 0, oom_kill: 0 },
    };
    tracker.observe(wound);
    const rewound = overHighWithoutProof();
    rewound.cgroup = {
      ...rewound.cgroup,
      events: { low: 0, high: 1, max: 0, oom: 0, oom_kill: 0 },
    };
    const state = tracker.observe(rewound);
    assert.notEqual(state.severity, "critical");
  });

  it("disables the PSI safety net when the operator ignores PSI pressure", () => {
    const previous = process.env.OMNIROUTE_PRESSURE_PSI_DISABLED;
    try {
      process.env.OMNIROUTE_PRESSURE_PSI_DISABLED = "1";
      const signals = overHighWithoutProof();
      signals.psi = {
        someAvg10: 5,
        someAvg60: 5,
        someAvg300: 5,
        fullAvg10: 0,
        fullAvg60: 0,
        fullAvg300: 0,
        psiSource: "cgroup",
      };
      assert.equal(hasKernelThrottleProof(signals, { high: 0, max: 0 }), false);
    } finally {
      if (previous === undefined) delete process.env.OMNIROUTE_PRESSURE_PSI_DISABLED;
      else process.env.OMNIROUTE_PRESSURE_PSI_DISABLED = previous;
    }
  });
});
