import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createResourcePressureRuntime,
  type ResourcePressureRuntime,
} from "../../open-sse/utils/resourcePressure.ts";
import type { ResourceSignals } from "../../open-sse/utils/resourcePressurePolicy.ts";

const MiB = 1024 ** 2;

function signals(observedAtMs: number, heapUsedMb = 100): ResourceSignals {
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

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

async function settleRefresh(runtime: ResourcePressureRuntime): Promise<void> {
  await runtime.whenRefreshSettled();
  await Promise.resolve();
}

describe("ResourcePressureRuntime stale-while-revalidate cache", () => {
  it("does no proc/sys I/O in check(), while a cheap first-request heap breach sheds immediately", async () => {
    let slowSamples = 0;
    const runtime = createResourcePressureRuntime({
      heapThresholdMb: 200,
      immediateHeapUsedMb: () => 201,
      sample: async () => {
        slowSamples += 1;
        return signals(1);
      },
    });

    const guard = runtime.check();
    assert.ok(guard);
    assert.equal(guard.status, 503);
    assert.equal(slowSamples, 0, "request-path check must not invoke the async proc/sys sampler");
    assert.equal(runtime.getObservation().state.reason, "v8_heap_absolute");
    await settleRefresh(runtime);
    assert.equal(slowSamples, 1, "refresh may run after the request-path decision");
    runtime.dispose();
  });

  it("serves a fresh cached sample without scheduling another refresh", async () => {
    let now = 0;
    let calls = 0;
    const runtime = createResourcePressureRuntime({
      nowMs: () => now,
      staleAfterMs: 100,
      immediateHeapUsedMb: () => 100,
      sample: async () => {
        calls += 1;
        return signals(now);
      },
    });

    runtime.check();
    await settleRefresh(runtime);
    assert.equal(calls, 1);
    now = 99;
    runtime.check();
    await settleRefresh(runtime);
    assert.equal(calls, 1);
    runtime.dispose();
  });

  it("schedules at most one refresh under concurrent stale checks", async () => {
    let now = 0;
    let calls = 0;
    const pending = deferred<ResourceSignals>();
    const runtime = createResourcePressureRuntime({
      nowMs: () => now,
      staleAfterMs: 10,
      immediateHeapUsedMb: () => 100,
      sample: async () => {
        calls += 1;
        if (calls === 1) return signals(0);
        return pending.promise;
      },
    });

    runtime.check();
    await settleRefresh(runtime);
    now = 11;
    for (let index = 0; index < 50; index += 1) runtime.check();
    assert.equal(calls, 1, "scheduled work must not run synchronously in check()");
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(calls, 2);
    pending.resolve(signals(11));
    await settleRefresh(runtime);
    assert.equal(calls, 2);
    runtime.dispose();
  });

  it("retains a bounded stale snapshot on refresh failure and retries only after backoff", async () => {
    let now = 0;
    let calls = 0;
    const runtime = createResourcePressureRuntime({
      nowMs: () => now,
      staleAfterMs: 10,
      maxStaleMs: 100,
      retryAfterMs: 20,
      immediateHeapUsedMb: () => 100,
      sample: async () => {
        calls += 1;
        if (calls === 1) return signals(0, 950);
        throw new Error("proc unavailable");
      },
      thresholds: {
        sustainedSamplesCritical: 1,
        heapAbsoluteThresholdMb: null,
      },
    });

    runtime.check();
    await settleRefresh(runtime);
    now = 11;
    runtime.check();
    await settleRefresh(runtime);
    assert.equal(calls, 2);
    assert.equal(runtime.getObservation().signals?.observedAtMs, 0, "failure retains stale data");

    now = 25;
    runtime.check();
    await settleRefresh(runtime);
    assert.equal(calls, 2, "failure backoff prevents a refresh storm");

    now = 31;
    runtime.check();
    await settleRefresh(runtime);
    assert.equal(calls, 3);

    now = 101;
    assert.equal(runtime.check(), null, "expired stale adaptive pressure fails open");
    runtime.dispose();
  });

  it("measures failure backoff from settlement, not refresh start", async () => {
    let now = 0;
    let calls = 0;
    const pending = deferred<ResourceSignals>();
    const runtime = createResourcePressureRuntime({
      nowMs: () => now,
      staleAfterMs: 10,
      maxStaleMs: 100,
      retryAfterMs: 20,
      immediateHeapUsedMb: () => 100,
      sample: async () => {
        calls += 1;
        if (calls === 1) return signals(0);
        return pending.promise;
      },
    });

    runtime.check();
    await settleRefresh(runtime);
    assert.equal(calls, 1);

    now = 11;
    runtime.check();
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(calls, 2);

    // Slow failure: wall clock advances past retryAfter before the sample rejects.
    now = 50;
    pending.reject(new Error("proc unavailable"));
    await settleRefresh(runtime);
    assert.equal(calls, 2);

    // Retry must wait full retryAfterMs from settlement (50), not from start (11).
    now = 69;
    runtime.check();
    await settleRefresh(runtime);
    assert.equal(calls, 2, "failure backoff starts at settlement, not refresh start");

    now = 70;
    runtime.check();
    await settleRefresh(runtime);
    assert.equal(calls, 3);
    runtime.dispose();
  });

  it("measures success freshness from publication, not refresh start", async () => {
    let now = 0;
    let calls = 0;
    const pending = deferred<ResourceSignals>();
    const runtime = createResourcePressureRuntime({
      nowMs: () => now,
      staleAfterMs: 20,
      maxStaleMs: 100,
      immediateHeapUsedMb: () => 100,
      sample: async () => {
        calls += 1;
        if (calls === 1) return signals(0);
        return pending.promise;
      },
    });

    runtime.check();
    await settleRefresh(runtime);
    assert.equal(calls, 1);

    now = 21;
    runtime.check();
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(calls, 2);

    // Slow success: wall clock advances past staleAfter before the sample resolves.
    now = 100;
    pending.resolve(signals(100));
    await settleRefresh(runtime);
    assert.equal(calls, 2);
    assert.equal(runtime.getObservation().signals?.observedAtMs, 100);

    // Freshness must run full staleAfterMs from publication (100), not start (21).
    now = 119;
    runtime.check();
    await settleRefresh(runtime);
    assert.equal(calls, 2, "success freshness starts at publication, not refresh start");

    now = 120;
    runtime.check();
    await settleRefresh(runtime);
    assert.equal(calls, 3);
    runtime.dispose();
  });

  it("default scheduler unrefs Immediate; injected schedulers stay caller-owned", async () => {
    // Injected schedule is never wrapped: the runtime must not call unref on it.
    let scheduled = 0;
    let unrefCalled = 0;
    const injected = (refresh: () => void) => {
      scheduled += 1;
      const handle = setImmediate(refresh);
      const originalUnref = handle.unref.bind(handle);
      handle.unref = () => {
        unrefCalled += 1;
        return originalUnref();
      };
    };

    const withInjected = createResourcePressureRuntime({
      immediateHeapUsedMb: () => 100,
      sample: async () => signals(1),
      schedule: injected,
    });
    withInjected.check();
    await settleRefresh(withInjected);
    assert.equal(scheduled, 1);
    assert.equal(unrefCalled, 0, "injected schedule handles remain caller-owned");
    withInjected.dispose();

    // Default schedule path: capture the Immediate and prove it is unref'd so a
    // pending refresh alone cannot keep the process alive.
    const originalSetImmediate = globalThis.setImmediate;
    let captured: NodeJS.Immediate | undefined;
    globalThis.setImmediate = ((callback: (...args: unknown[]) => void, ...args: unknown[]) => {
      const handle = originalSetImmediate(callback, ...args);
      captured = handle;
      return handle;
    }) as typeof setImmediate;
    try {
      const runtime = createResourcePressureRuntime({
        immediateHeapUsedMb: () => 100,
        // Never resolve: we only care about the scheduled Immediate ref state.
        sample: () => new Promise(() => {}),
      });
      runtime.check();
      assert.ok(captured, "default schedule must use setImmediate");
      assert.equal(captured.hasRef(), false, "default Immediate must be unref'd");
      runtime.dispose();
      if (captured) clearImmediate(captured);
    } finally {
      globalThis.setImmediate = originalSetImmediate;
    }
  });

  it("dispose ignores late refresh results and independently owned runtimes do not share state", async () => {
    const pending = deferred<ResourceSignals>();
    let firstCalls = 0;
    const first = createResourcePressureRuntime({
      immediateHeapUsedMb: () => 100,
      sample: async () => {
        firstCalls += 1;
        return pending.promise;
      },
    });
    first.check();
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(firstCalls, 1);
    first.dispose();
    pending.resolve(signals(1));
    await settleRefresh(first);
    assert.equal(
      first.getObservation().signals,
      null,
      "disposed runtime ignores late refresh results"
    );

    const second = createResourcePressureRuntime({
      immediateHeapUsedMb: () => 100,
      sample: async () => signals(2),
    });
    assert.notEqual(first, second);
    second.check();
    await settleRefresh(second);
    assert.equal(second.getObservation().signals?.observedAtMs, 2);
    second.dispose();
  });
});
