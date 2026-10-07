import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createResourcePressureRuntime } from "../../open-sse/utils/resourcePressure.ts";
import type { ResourceSignals } from "../../open-sse/utils/resourcePressurePolicy.ts";

const MiB = 1024 ** 2;

function criticalSignals(observedAtMs: number): ResourceSignals {
  return {
    observedAtMs,
    v8: { heapUsedBytes: 100 * MiB, heapLimitBytes: 1_000 * MiB },
    process: {
      rssBytes: 200 * MiB,
      externalBytes: 10 * MiB,
      arrayBuffersBytes: MiB,
      availableBytes: null,
      constrainedBytes: null,
    },
    cgroup: {
      currentBytes: 950 * MiB,
      maxBytes: 1_000 * MiB,
      highBytes: null,
      fileBytes: 0,
      events: null,
    },
    psi: null,
  };
}

function normalSignals(observedAtMs: number): ResourceSignals {
  const signals = criticalSignals(observedAtMs);
  return {
    ...signals,
    cgroup: { ...signals.cgroup, currentBytes: 100 * MiB },
  };
}

const fastThresholds = {
  highRatio: 0.8,
  criticalRatio: 0.9,
  recoveryRatio: 0.7,
  highPsiAvg10: 20,
  criticalPsiAvg10: 40,
  recoveryPsiAvg10: 10,
  sustainedSamplesHigh: 2,
  sustainedSamplesCritical: 2,
  sustainedSamplesRecovery: 1,
};

describe("resource pressure background recovery driver", () => {
  it("samples recovery in the background when selfRestart is disabled, without incoming requests", async () => {
    let currentSignals = criticalSignals;
    const runtime = createResourcePressureRuntime({
      thresholds: fastThresholds,
      immediateHeapUsedMb: () => 0,
      staleAfterMs: 500,
      maxStaleMs: 60_000,
      sample: async () => currentSignals(Date.now()),
      selfRestart: { enabled: false },
    });

    try {
      // Prime the runtime into critical state via two samples.
      runtime.check();
      await runtime.whenRefreshSettled();
      await new Promise((resolve) => setTimeout(resolve, 600));
      runtime.check();
      await runtime.whenRefreshSettled();

      assert.equal(
        runtime.getObservation().state.severity,
        "critical",
        "runtime must be in critical state"
      );

      // Underlying pressure clears.
      currentSignals = normalSignals;

      // DO NOT call runtime.check() — simulate clients backing off completely during the outage.
      // The background driver must detect recovery on its own.
      const deadline = Date.now() + 5_000;
      while (runtime.getObservation().state.severity !== "normal" && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      assert.equal(
        runtime.getObservation().state.severity,
        "normal",
        "background driver must recover state to normal without any incoming check() calls"
      );
    } finally {
      runtime.dispose();
    }
  });
});
