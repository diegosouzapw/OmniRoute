/**
 * Self-heal circuit for sustained critical resource pressure.
 *
 * The 2026-09-07 outage: the container's cgroup working set sat at the 5 GiB cap
 * for 36 minutes (every request 503), then the event loop stalled completely until
 * an operator restarted the container by hand. With OMNIROUTE_PRESSURE_SELF_RESTART
 * enabled the runtime exits on sustained critical pressure so the supervisor
 * (systemd Restart=always) brings back a clean process in seconds.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createResourcePressureRuntime,
  type ResourcePressureRuntime,
} from "../../open-sse/utils/resourcePressure.ts";
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
    // workingset (current - file) = 950MB of a 1000MB cgroup cap -> critical ratio 0.95
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
  recoverySamples: 2,
};

function makeHarness(options: {
  selfRestart?: { enabled?: boolean; afterMs?: number; exitCode?: number };
}) {
  let clock = 0;
  let scheduledFn: (() => void) | null = null;
  const exitCalls: number[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];
  const origWarn = console.warn;
  const origError = console.error;
  console.warn = (msg: unknown) => warnings.push(String(msg));
  console.error = (msg: unknown) => errors.push(String(msg));

  const runtime = createResourcePressureRuntime({
    thresholds: fastThresholds,
    immediateHeapUsedMb: () => 0,
    nowMs: () => clock,
    schedule: (fn) => {
      scheduledFn = fn;
    },
    staleAfterMs: 0,
    maxStaleMs: 60 * 60 * 1000,
    retryAfterMs: 1000,
    sample: async () => harness.signals(clock),
    selfRestart: {
      enabled: options.selfRestart?.enabled,
      afterMs: options.selfRestart?.afterMs,
      exitCode: options.selfRestart?.exitCode,
      exitFn: (code) => {
        exitCalls.push(code);
      },
    },
  });

  const harness = {
    runtime,
    exitCalls,
    warnings,
    errors,
    signals: criticalSignals as (ms: number) => ResourceSignals,
    async tick(advanceMs: number) {
      clock += advanceMs;
      runtime.check();
      assert.ok(scheduledFn, "check() must schedule a refresh");
      const fn = scheduledFn;
      scheduledFn = null;
      fn();
      await runtime.whenRefreshSettled();
    },
    restore() {
      console.warn = origWarn;
      console.error = origError;
      runtime.dispose();
    },
  };
  return harness;
}

describe("resource pressure self-restart circuit", () => {
  it("exits once critical pressure has been sustained for afterMs", async () => {
    const h = makeHarness({ selfRestart: { enabled: true, afterMs: 60_000 } });
    try {
      await h.tick(1_000); // elevated streak 1, still below critical sample count
      await h.tick(1_000); // streak 2 -> critical, criticalSince = 2000
      assert.deepEqual(h.exitCalls, []);
      assert.ok(
        h.warnings.some((line) => line.includes("entered critical")),
        "the first critical transition must log diagnostics"
      );
      await h.tick(30_000); // critical for 30s < 60s afterMs
      assert.deepEqual(h.exitCalls, []);
      await h.tick(31_000); // critical for 61s >= 60s -> self-restart
      assert.deepEqual(h.exitCalls, [1]);
      assert.ok(
        h.errors.some((line) => line.includes("exiting with code 1")),
        "the self-restart must log the exit reason for post-mortem diagnosis"
      );
      await h.tick(120_000); // never fires twice
      assert.deepEqual(h.exitCalls, [1]);
    } finally {
      h.restore();
    }
  });

  it("stays quiet when pressure recovers before afterMs", async () => {
    const h = makeHarness({ selfRestart: { enabled: true, afterMs: 60_000 } });
    try {
      await h.tick(1_000);
      await h.tick(1_000); // critical since 2000
      h.signals = normalSignals;
      await h.tick(10_000); // recovery streak 1
      await h.tick(10_000); // recovery streak 2 -> normal, circuit resets
      h.signals = criticalSignals;
      await h.tick(10_000); // elevated again
      await h.tick(10_000); // critical again, fresh criticalSince
      await h.tick(30_000); // 30s < 60s
      assert.deepEqual(h.exitCalls, []);
    } finally {
      h.restore();
    }
  });

  it("never exits when the circuit is disabled (the default)", async () => {
    const saved = process.env.OMNIROUTE_PRESSURE_SELF_RESTART;
    delete process.env.OMNIROUTE_PRESSURE_SELF_RESTART;
    const h = makeHarness({ selfRestart: { afterMs: 1_000 } });
    try {
      for (let i = 0; i < 10; i += 1) {
        await h.tick(60_000); // critical far past afterMs
      }
      assert.deepEqual(h.exitCalls, []);
    } finally {
      h.restore();
      if (saved !== undefined) process.env.OMNIROUTE_PRESSURE_SELF_RESTART = saved;
    }
  });

  it("honors the env switch and custom afterMs", async () => {
    const savedFlag = process.env.OMNIROUTE_PRESSURE_SELF_RESTART;
    const savedAfter = process.env.OMNIROUTE_PRESSURE_SELF_RESTART_AFTER_MS;
    process.env.OMNIROUTE_PRESSURE_SELF_RESTART = "1";
    process.env.OMNIROUTE_PRESSURE_SELF_RESTART_AFTER_MS = "5000";
    const h = makeHarness({});
    try {
      await h.tick(1_000);
      await h.tick(1_000); // critical since 2000
      await h.tick(4_000); // 4s < 5s env afterMs
      assert.deepEqual(h.exitCalls, []);
      await h.tick(2_000); // 6s >= 5s
      assert.deepEqual(h.exitCalls, [1]);
    } finally {
      h.restore();
      if (savedFlag === undefined) delete process.env.OMNIROUTE_PRESSURE_SELF_RESTART;
      else process.env.OMNIROUTE_PRESSURE_SELF_RESTART = savedFlag;
      if (savedAfter === undefined) delete process.env.OMNIROUTE_PRESSURE_SELF_RESTART_AFTER_MS;
      else process.env.OMNIROUTE_PRESSURE_SELF_RESTART_AFTER_MS = savedAfter;
    }
  });

  it("re-arms when exitFn throws instead of bricking the circuit", async () => {
    let clock = 0;
    let scheduledFn: (() => void) | null = null;
    const exitCalls: number[] = [];
    const errors: string[] = [];
    const origError = console.error;
    console.error = (msg: unknown) => errors.push(String(msg));
    let shouldThrow = true;
    const runtime = createResourcePressureRuntime({
      thresholds: fastThresholds,
      immediateHeapUsedMb: () => 0,
      nowMs: () => clock,
      schedule: (fn) => {
        scheduledFn = fn;
      },
      staleAfterMs: 0,
      maxStaleMs: 60 * 60 * 1000,
      sample: async () => criticalSignals(clock),
      selfRestart: {
        enabled: true,
        afterMs: 10_000,
        exitFn: (code) => {
          if (shouldThrow) throw new Error("exit wedged");
          exitCalls.push(code);
        },
      },
    });
    const tick = async (advanceMs: number) => {
      clock += advanceMs;
      runtime.check();
      const fn = scheduledFn;
      scheduledFn = null;
      assert.ok(fn, "check() must schedule a refresh");
      fn();
      await runtime.whenRefreshSettled();
    };
    try {
      await tick(1_000); // streak 1
      await tick(1_000); // critical since t=2000
      await tick(10_000); // sustained 10s >= afterMs -> exitFn throws -> re-arm
      assert.deepEqual(exitCalls, []);
      assert.ok(
        errors.some((line) => line.includes("self-restart exit failed")),
        "a throwing exitFn must be logged, not swallowed"
      );
      // circuit re-armed: new critical window starts on the next critical sample
      shouldThrow = false;
      await tick(1_000); // window restarts at t=13000
      await tick(9_000); // 9s < 10s, no fire yet
      assert.deepEqual(exitCalls, []);
      await tick(2_000); // 11s >= 10s -> retry fires
      assert.deepEqual(exitCalls, [1]);
    } finally {
      console.error = origError;
      runtime.dispose();
    }
  });

  it("advances the circuit without any incoming requests via the self-restart driver", async () => {
    // Real clock, real timers: no check() calls at all. The driver must re-arm
    // refresh on its own so a traffic-less outage still exits.
    const exitCalls: number[] = [];
    const runtime = createResourcePressureRuntime({
      thresholds: fastThresholds,
      immediateHeapUsedMb: () => 0,
      staleAfterMs: 1_000,
      maxStaleMs: 60_000,
      sample: async () => criticalSignals(Date.now()),
      selfRestart: { enabled: true, afterMs: 3_000, exitFn: (code) => exitCalls.push(code) },
    });
    try {
      const deadline = Date.now() + 15_000;
      while (exitCalls.length === 0 && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
      assert.deepEqual(exitCalls, [1], "driver must fire the exit without any check() traffic");
    } finally {
      runtime.dispose();
    }
  }, 20_000);

  it("dispose() stops the driver so a disposed runtime never exits", async () => {
    const exitCalls: number[] = [];
    const runtime = createResourcePressureRuntime({
      thresholds: fastThresholds,
      immediateHeapUsedMb: () => 0,
      staleAfterMs: 1_000,
      sample: async () => criticalSignals(Date.now()),
      selfRestart: { enabled: true, afterMs: 1_000, exitFn: (code) => exitCalls.push(code) },
    });
    runtime.dispose();
    await new Promise((resolve) => setTimeout(resolve, 2_500));
    assert.deepEqual(exitCalls, []);
  });
});
