import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate DATA_DIR before any src import — the scheduler module's default deps
// reference the DB layer (never invoked here: every test injects its deps).
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-radar-scheduler-"));
process.env.DATA_DIR = tmpDir;

const {
  radarSchedulerTick,
  ensureRadarSyncScheduler,
  stopRadarSyncScheduler,
  initRadarSyncScheduler,
  RADAR_SCHEDULER_TICK_MS,
} = await import("../../src/lib/radar/scheduler.ts");

const NOW = Date.parse("2026-08-06T12:00:00.000Z");
const FRESH = new Date(NOW - 60 * 60 * 1000).toISOString(); // 1h ago — inside the daily window
const STALE = new Date(NOW - 25 * 60 * 60 * 1000).toISOString(); // 25h ago — due

/** Fake interval registry so no real timer ever exists in these tests. */
function fakeTimers() {
  const registered: Array<{ fn: () => void; ms: number }> = [];
  let cleared = 0;
  return {
    registered,
    clearedCount: () => cleared,
    setIntervalFn: ((fn: () => void, ms: number) => {
      registered.push({ fn, ms });
      return registered.length as unknown as ReturnType<typeof setInterval>;
    }) as typeof setInterval,
    clearIntervalFn: (() => {
      cleared += 1;
    }) as typeof clearInterval,
  };
}

function deps(overrides: Record<string, unknown> = {}) {
  const syncCalls: number[] = [];
  const timers = fakeTimers();
  return {
    syncCalls,
    timers,
    d: {
      getFlag: () => true,
      getSettings: () => ({ optIn: true }),
      getCache: () => ({ fetchedAt: STALE }),
      sync: async () => {
        syncCalls.push(1);
        return { status: "updated", version: "2026.08.06.1", tier: "live" } as const;
      },
      now: () => NOW,
      setIntervalFn: timers.setIntervalFn,
      clearIntervalFn: timers.clearIntervalFn,
      ...overrides,
    },
  };
}

test("radar sync scheduler", async (t) => {
  t.afterEach(() => {
    // Module-level timer state must not leak between subtests.
    stopRadarSyncScheduler({ clearIntervalFn: (() => {}) as typeof clearInterval });
  });

  await t.test("tick: flag off => stopped, sync never called", async () => {
    const { d, syncCalls } = deps({ getFlag: () => false });
    const result = await radarSchedulerTick(d);
    assert.deepEqual(result, { action: "stopped", reason: "flag_off" });
    assert.equal(syncCalls.length, 0);
  });

  await t.test("tick: flag off stops a running timer (self-heal to zero-timer state)", async () => {
    const { d, timers } = deps();
    assert.equal(ensureRadarSyncScheduler(d), true);
    assert.equal(timers.registered.length, 1);
    const offDeps = { ...d, getFlag: () => false };
    await radarSchedulerTick(offDeps);
    assert.equal(timers.clearedCount(), 1);
  });

  await t.test("tick: opt-in off => skipped, no sync", async () => {
    const { d, syncCalls } = deps({ getSettings: () => ({ optIn: false }) });
    const result = await radarSchedulerTick(d);
    assert.deepEqual(result, { action: "skipped", reason: "opt_out" });
    assert.equal(syncCalls.length, 0);
  });

  await t.test("tick: fresh cache => not due, no sync", async () => {
    const { d, syncCalls } = deps({ getCache: () => ({ fetchedAt: FRESH }) });
    const result = await radarSchedulerTick(d);
    assert.deepEqual(result, { action: "skipped", reason: "not_due" });
    assert.equal(syncCalls.length, 0);
  });

  await t.test("tick: no cache at all => syncs immediately", async () => {
    const { d, syncCalls } = deps({ getCache: () => null });
    const result = await radarSchedulerTick(d);
    assert.equal(result.action, "synced");
    assert.equal(syncCalls.length, 1);
  });

  await t.test("tick: stale cache (>24h) => syncs", async () => {
    const { d, syncCalls } = deps();
    const result = await radarSchedulerTick(d);
    assert.equal(result.action, "synced");
    assert.equal(syncCalls.length, 1);
  });

  await t.test("ensure: registers one hourly timer, fires an immediate tick, idempotent", async () => {
    const { d, timers, syncCalls } = deps();
    assert.equal(ensureRadarSyncScheduler(d), true);
    assert.equal(timers.registered.length, 1);
    assert.equal(timers.registered[0].ms, RADAR_SCHEDULER_TICK_MS);
    // The immediate tick is fire-and-forget; give the microtask queue a turn.
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(syncCalls.length, 1, "immediate tick should have synced the stale cache");
    // Second ensure is a no-op — no second timer.
    assert.equal(ensureRadarSyncScheduler(d), false);
    assert.equal(timers.registered.length, 1);
  });

  await t.test("init: flag off => never arms (flag-off boot stays timer-free)", () => {
    const { d, timers } = deps({ getFlag: () => false });
    assert.equal(initRadarSyncScheduler(d), false);
    assert.equal(timers.registered.length, 0);
  });

  await t.test("init: opt-in off => never arms", () => {
    const { d, timers } = deps({ getSettings: () => ({ optIn: false }) });
    assert.equal(initRadarSyncScheduler(d), false);
    assert.equal(timers.registered.length, 0);
  });

  await t.test("init: flag + opt-in on => arms the timer", () => {
    const { d, timers } = deps();
    assert.equal(initRadarSyncScheduler(d), true);
    assert.equal(timers.registered.length, 1);
  });

  await t.test("init: settings reader throwing => false, never throws out", () => {
    const { d, timers } = deps({
      getSettings: () => {
        throw new Error("db unavailable");
      },
    });
    assert.equal(initRadarSyncScheduler(d), false);
    assert.equal(timers.registered.length, 0);
  });
});
