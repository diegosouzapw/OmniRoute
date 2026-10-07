// Regression test for issue #13973 (remaining scope after PR #14005):
// the cleanup scheduler and the model-sync scheduler are both anchored to
// process-start with an *identical* 6h period and *zero* jitter/offset
// between them. Since both are started within milliseconds of each other
// during server bootstrap (src/instrumentation-node.ts calls
// startCleanupScheduler() in the same Promise.all-driven boot sequence that
// calls ensureCloudSyncInitialized() -> startModelSyncScheduler()), they
// would otherwise keep firing in the same second every 6 hours for the
// lifetime of the process.
//
// This test does NOT touch the DB or execute the scheduled work: it spies on
// the global timer constructors to capture the delay each scheduler
// registers. The stagger must be a PHASE offset — the model-sync interval is
// armed only after MODEL_SYNC_STAGGER_OFFSET_MS — never a change of PERIOD
// (a 6h45m period merely drifts back into collision and silently overrides
// MODEL_SYNC_INTERVAL_HOURS). It must run as its own file, not as part of a
// suite.

import { test, before, after } from "node:test";
import assert from "node:assert/strict";

process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "1";

let startCleanupScheduler: () => void;
let stopCleanupScheduler: () => void;
let startModelSyncScheduler: (apiBaseUrl?: string, intervalMs?: number) => void;
let stopModelSyncScheduler: () => void;

before(async () => {
  ({ startCleanupScheduler, stopCleanupScheduler } = await import("../../src/lib/db/cleanup.ts"));
  ({ startModelSyncScheduler, stopModelSyncScheduler } =
    await import("../../src/shared/services/modelSyncScheduler.ts"));
});

after(() => {
  try {
    stopCleanupScheduler();
  } catch {}
  try {
    stopModelSyncScheduler();
  } catch {}
});

test("cleanup and model-sync 6h schedulers keep the same period but different phase — issue #13973 remaining scope", async () => {
  const { MODEL_SYNC_STAGGER_OFFSET_MS } =
    await import("../../src/shared/services/modelSyncScheduler.ts");
  const originalSetInterval = global.setInterval;
  const originalSetTimeout = global.setTimeout;

  type TimerFn = (...a: unknown[]) => void;
  type TimerSetter = (fn: TimerFn, delay?: number, ...rest: unknown[]) => unknown;

  const bootIntervals: number[] = [];
  const bootTimeouts: { fn: TimerFn; delay: number }[] = [];

  (global as unknown as { setInterval: TimerSetter }).setInterval = (
    fn: TimerFn,
    delay?: number,
    ...rest: unknown[]
  ) => {
    bootIntervals.push(delay ?? -1);
    // Capture only: arm an inert, unref'd timer so no scheduled DB/HTTP work
    // runs and the process is not kept alive by the real 30s/90s first passes.
    void fn;
    return originalSetInterval(() => {}, delay, ...rest).unref();
  };
  (global as unknown as { setTimeout: TimerSetter }).setTimeout = (
    fn: TimerFn,
    delay?: number,
    ...rest: unknown[]
  ) => {
    bootTimeouts.push({ fn, delay: delay ?? -1 });
    return originalSetTimeout(() => {}, delay, ...rest).unref();
  };

  let modelSyncIntervals: number[] = [];
  try {
    startCleanupScheduler();
    const cleanupIntervals = bootIntervals.length;
    startModelSyncScheduler("http://127.0.0.1:0");

    const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
    assert.equal(cleanupIntervals, 1, "cleanup arms its 6h interval at boot");
    assert.deepEqual(
      bootIntervals,
      [SIX_HOURS_MS],
      "model-sync must NOT arm its recurring interval at boot (it would share cleanup's phase), " +
        `got ${JSON.stringify(bootIntervals)}`
    );

    assert.ok(MODEL_SYNC_STAGGER_OFFSET_MS > 0);
    const phase = bootTimeouts.find((t) => t.delay === MODEL_SYNC_STAGGER_OFFSET_MS);
    assert.ok(phase, "model-sync must schedule a one-shot phase-offset timer");

    // Fire the phase timer (still under the capture stubs): the recurring
    // interval it arms must keep the configured 6h period exactly.
    bootIntervals.length = 0;
    phase.fn();
    modelSyncIntervals = [...bootIntervals];
  } finally {
    global.setInterval = originalSetInterval;
    global.setTimeout = originalSetTimeout;
  }

  assert.deepEqual(modelSyncIntervals, [6 * 60 * 60 * 1000]);
});
