// Regression for https://github.com/diegosouzapw/OmniRoute/issues/13821.
//
// The structural admission gate (chatBodyAdmission.ts, admitChatRequest) is
// the FIRST caller in the request path to consult pressure severity, ahead of
// every other code path that would otherwise call checkResourcePressureGuard()
// (handleChatCore, checkResourcePressureBeforeProviderWork,
// AdaptiveAdmissionRuntimeImpl.acquire). In production, one of those other
// paths is what first observes a real critical condition (a request that
// slips past the gate before it starts shedding, or the AdaptiveAdmission
// runtime for a different combo route) and flips the singleton's cached
// `state.severity` to "critical" via the sustained-sample tracker. From that
// point on, the structural gate sheds every subsequent request before any of
// those downstream paths can run again — so `check()` never gets called
// again and the guard can never observe recovery, even after the real
// condition clears. Only a full process restart clears it.
//
// This test drives the singleton to "critical" through the SAME sustained
// sample-and-recover path production uses (classifyAdaptiveResourcePressure's
// v8_heap_ratio + a two-sample streak, not the synchronous immediate-heap
// escape hatch), using an injected mock clock so no scheduled refresh from
// the setup phase can resolve on its own and contaminate the assertion. Only
// the exact calls under test (`defaultPressureSeverity`, twice) are allowed
// to drive anything after the singleton is latched critical.
import test from "node:test";
import assert from "node:assert/strict";

const { defaultPressureSeverity } =
  await import("../../src/shared/middleware/chatBodyAdmission.ts");
const { reloadResourcePressureRuntime, checkResourcePressureGuard } =
  await import("../../open-sse/utils/resourcePressure.ts");

const MiB = 1024 * 1024;

function signals(observedAtMs: number, heapUsedMb: number) {
  return {
    observedAtMs,
    v8: { heapUsedBytes: heapUsedMb * MiB, heapLimitBytes: 1000 * MiB },
    process: {
      rssBytes: 0,
      externalBytes: 0,
      arrayBuffersBytes: 0,
      availableBytes: null,
      constrainedBytes: null,
    },
    cgroup: { currentBytes: null, maxBytes: null, highBytes: null, fileBytes: null, events: null },
    psi: null,
  };
}

/** Advances the mock clock and drives one refresh cycle to completion. */
async function tick(runtime: { whenRefreshSettled: () => Promise<void> }): Promise<void> {
  checkResourcePressureGuard();
  await runtime.whenRefreshSettled();
}

test("defaultPressureSeverity recovers to normal once the underlying pressure clears, driven only by repeated calls to itself", async () => {
  let underPressure = true;
  let clockMs = 0;
  const staleAfterMs = 1_000;
  const runtime = reloadResourcePressureRuntime({
    heapThresholdMb: null,
    immediateHeapUsedMb: () => 0, // never trip the synchronous escape hatch — force the sample path
    nowMs: () => clockMs,
    sample: async () => signals(clockMs, underPressure ? 950 : 100), // 950/1000 = 0.95 >= criticalRatio(0.92)
    staleAfterMs,
  });

  try {
    // Drive two sustained critical samples (default sustainedSamplesCritical
    // is 2) via checkResourcePressureGuard directly, NOT defaultPressureSeverity —
    // this mirrors some other request's handleChatCore call being the thing
    // that first observes the real condition in production, not the gate
    // itself. Each call is followed by advancing the clock past staleAfterMs
    // so the NEXT call is the one that schedules and awaits the next sample.
    await tick(runtime);
    clockMs += staleAfterMs + 1;
    await tick(runtime);

    // The seed is fully settled now; nextRefreshAtMs is in the past relative
    // to the current clock only once we advance it again below — right now
    // there is nothing scheduled, so nothing can resolve on its own.
    assert.equal(defaultPressureSeverity(), "critical");

    // The underlying condition clears and enough time passes for the next
    // sample to be due. From here on nothing but defaultPressureSeverity's
    // own two calls touches the singleton.
    underPressure = false;
    clockMs += staleAfterMs + 1;

    // This call's synchronous return still reflects the pre-refresh cached
    // decision (matches production: check() answers instantly, the resample
    // it schedules resolves in the background) — both the old passive read
    // and the fixed active read must still say "critical" here.
    assert.equal(defaultPressureSeverity(), "critical");

    // Let whatever got scheduled by the call above resolve. Before the fix,
    // defaultPressureSeverity never called check() at all, so nothing was
    // scheduled here and this is a no-op — the singleton stays latched at
    // "critical" forever. The fix must have scheduled and awaited a real
    // resample from its own call above.
    await runtime.whenRefreshSettled();
    assert.equal(defaultPressureSeverity(), "normal");
  } finally {
    runtime.dispose();
  }
});

test("defaultPressureSeverity still sheds while genuinely critical, across repeated calls", async () => {
  let clockMs = 0;
  const staleAfterMs = 1_000;
  const runtime = reloadResourcePressureRuntime({
    heapThresholdMb: null,
    immediateHeapUsedMb: () => 0,
    nowMs: () => clockMs,
    sample: async () => signals(clockMs, 950),
    staleAfterMs,
  });

  try {
    await tick(runtime);
    clockMs += staleAfterMs + 1;
    await tick(runtime);

    assert.equal(defaultPressureSeverity(), "critical");
    clockMs += staleAfterMs + 1;
    assert.equal(defaultPressureSeverity(), "critical");
    await runtime.whenRefreshSettled();
    assert.equal(defaultPressureSeverity(), "critical");
  } finally {
    runtime.dispose();
  }
});
