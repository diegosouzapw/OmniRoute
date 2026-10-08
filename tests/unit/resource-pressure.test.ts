import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  computeRssPressureThresholdMb,
  createResourcePressureRuntime,
  getResourcePressureObservation,
  reloadResourcePressureRuntime,
  type ResourceSignals,
} from "../../open-sse/utils/resourcePressure.ts";

const MiB = 1024 ** 2;

function signals(observedAtMs: number, heapUsedMb: number): ResourceSignals {
  return {
    observedAtMs,
    v8: { heapUsedBytes: heapUsedMb * MiB, heapLimitBytes: 1_000 * MiB },
    process: {
      rssBytes: 200 * MiB,
      externalBytes: 10 * MiB,
      arrayBuffersBytes: MiB,
      availableBytes: null,
      constrainedBytes: null,
    },
    cgroup: { currentBytes: null, maxBytes: null, highBytes: null, fileBytes: null, events: null },
    psi: null,
  };
}

describe("RSS pressure fuse", () => {
  it("derives a conservative RSS ceiling from OMNIROUTE_MEMORY_MB", () => {
    assert.equal(computeRssPressureThresholdMb(1024, undefined), 3072);
    assert.equal(computeRssPressureThresholdMb(4096, undefined), 8192);
    assert.equal(computeRssPressureThresholdMb(4096, 7000), 7000);
    assert.equal(computeRssPressureThresholdMb(undefined, undefined), null);
  });

  it("sheds on runaway RSS even when V8 heap is healthy", () => {
    const runtime = createResourcePressureRuntime({
      heapThresholdMb: 2000,
      rssThresholdMb: 6144,
      immediateHeapUsedMb: () => 500,
      immediateRssUsedMb: () => 7000,
      sample: async () => signals(1, 500),
    });
    const guard = runtime.check();
    assert.ok(guard);
    assert.equal(guard.status, 503);
    assert.equal(runtime.getObservation().state.reason, "rss_absolute");
    runtime.dispose();
  });

  it("does not shed when RSS equals the configured ceiling", () => {
    const runtime = createResourcePressureRuntime({
      heapThresholdMb: 2000,
      rssThresholdMb: 6144,
      immediateHeapUsedMb: () => 500,
      immediateRssUsedMb: () => 6144,
      sample: async () => signals(1, 500),
    });
    assert.equal(runtime.check(), null);
    runtime.dispose();
  });
});

describe("resource pressure HTTP guard facade", () => {
  it("preserves strict immediate first-request heap shedding", async () => {
    let samples = 0;
    const runtime = createResourcePressureRuntime({
      heapThresholdMb: 200,
      immediateHeapUsedMb: () => 201,
      sample: async () => {
        samples += 1;
        return signals(1, 100);
      },
    });

    const guard = runtime.check();
    assert.ok(guard);
    assert.equal(guard.status, 503);
    assert.equal(samples, 0, "the asynchronous sampler cannot run in the request path");
    runtime.dispose();
  });

  it("does not shed when heap usage equals the strict threshold", () => {
    const runtime = createResourcePressureRuntime({
      heapThresholdMb: 200,
      immediateHeapUsedMb: () => 200,
      sample: async () => signals(1, 100),
    });
    assert.equal(runtime.check(), null);
    runtime.dispose();
  });

  it("returns a sanitized standards-correct 503 with Retry-After", async () => {
    const runtime = createResourcePressureRuntime({
      heapThresholdMb: 200,
      immediateHeapUsedMb: () => 987,
      sample: async () => signals(1, 100),
    });

    const guard = runtime.check();
    assert.ok(guard);
    assert.equal(guard.success, false);
    assert.equal(guard.status, 503);
    assert.equal(guard.response.status, 503);
    assert.equal(guard.response.headers.get("Retry-After"), "5");
    assert.equal(guard.response.headers.get("Content-Type"), "application/json");
    const payload = await guard.response.json();
    assert.deepEqual(payload.error, {
      message: "Service temporarily unavailable due to resource pressure. Retry shortly.",
      type: "server_error",
      code: "resource_pressure",
    });
    const clientText = JSON.stringify(payload) + guard.error;
    assert.ok(!clientText.includes("987"));
    assert.ok(!/\bMB\b/.test(clientText));
    runtime.dispose();
  });

  it("reload atomically replaces and resets the thin default facade", async () => {
    let firstCalls = 0;
    reloadResourcePressureRuntime({
      immediateHeapUsedMb: () => 100,
      sample: async () => {
        firstCalls += 1;
        return signals(1, 100);
      },
    });
    const replacement = reloadResourcePressureRuntime({
      immediateHeapUsedMb: () => 100,
      sample: async () => signals(2, 100),
    });

    assert.deepEqual(getResourcePressureObservation(), {
      signals: null,
      state: {
        severity: "normal",
        reason: "none",
        elevatedStreak: 0,
        recoveryStreak: 0,
        lastTransitionAtMs: 0,
        observedAtMs: 0,
      },
    });
    assert.equal(firstCalls, 0, "replaced runtime must not retain or run scheduled work");
    replacement.dispose();
  });

  it("exposes all observation snapshot fields", async () => {
    const runtime = createResourcePressureRuntime({
      immediateHeapUsedMb: () => 100,
      sample: async () => signals(42, 100),
    });
    assert.deepEqual(runtime.getObservation(), {
      signals: null,
      state: {
        severity: "normal",
        reason: "none",
        elevatedStreak: 0,
        recoveryStreak: 0,
        lastTransitionAtMs: 0,
        observedAtMs: 0,
      },
    });
    runtime.check();
    await runtime.whenRefreshSettled();
    assert.equal(runtime.getObservation().signals?.observedAtMs, 42);
    assert.equal(runtime.getObservation().state.observedAtMs, 42);
    runtime.dispose();
  });
});
