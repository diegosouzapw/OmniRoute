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
// Referrals staleness window is much shorter (1h, see REFERRALS_STALE_MS) —
// this default must sit well inside it so existing catalog-only subtests
// never trigger a referrals sync as an unasserted side effect.
const REFERRALS_FRESH = new Date(NOW - 5 * 60 * 1000).toISOString(); // 5m ago
const REFERRALS_STALE = new Date(NOW - 2 * 60 * 60 * 1000).toISOString(); // 2h ago — due

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
  const referralsSyncCalls: number[] = [];
  const timers = fakeTimers();
  return {
    syncCalls,
    referralsSyncCalls,
    timers,
    d: {
      getFlag: () => true,
      getSettings: () => ({ optIn: true }),
      getCache: () => ({ fetchedAt: STALE }),
      sync: async () => {
        syncCalls.push(1);
        return { status: "updated", version: "2026.08.06.1", tier: "live" } as const;
      },
      // Referrals side-sync — separate cache/sync from the catalog above.
      // Defaults to a FRESH referrals cache so existing subtests (which
      // don't care about referrals at all) never trigger a referrals sync
      // as an unasserted side effect.
      getReferralsCache: () => ({ fetchedAt: REFERRALS_FRESH }),
      syncReferrals: async () => {
        referralsSyncCalls.push(1);
        return { status: "updated", generatedAt: "2026-08-06T12:00:00.000Z", tier: "live" } as const;
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

  // -------------------------------------------------------------------------
  // Referrals side-sync — piggybacks on the same hourly tick but its own
  // (much shorter, 1h) staleness window, independent of the catalog's
  // due-ness. Never surfaces in RadarTickResult (fire-and-await side effect
  // only) so the catalog-sync result shape/assertions above stay unchanged.
  // -------------------------------------------------------------------------

  await t.test("tick: referrals cache fresh => referrals sync NOT called (catalog path unaffected)", async () => {
    const { d, syncCalls, referralsSyncCalls } = deps();
    const result = await radarSchedulerTick(d);
    assert.equal(result.action, "synced", "catalog was due and must still sync as before");
    assert.equal(syncCalls.length, 1);
    assert.equal(referralsSyncCalls.length, 0, "referrals cache was fresh — must not sync");
  });

  await t.test("tick: referrals cache stale => referrals sync called, independent of catalog due-ness", async () => {
    const { d, syncCalls, referralsSyncCalls } = deps({
      getCache: () => ({ fetchedAt: FRESH }), // catalog NOT due
      getReferralsCache: () => ({ fetchedAt: REFERRALS_STALE }), // referrals due
    });
    const result = await radarSchedulerTick(d);
    assert.deepEqual(result, { action: "skipped", reason: "not_due" }, "catalog result shape must stay unchanged");
    assert.equal(syncCalls.length, 0, "catalog must not sync — it was not due");
    assert.equal(referralsSyncCalls.length, 1, "referrals were due and must sync independently");
  });

  await t.test("tick: referrals cache missing => referrals sync called (missing counts as stale)", async () => {
    const { d, referralsSyncCalls } = deps({
      getCache: () => ({ fetchedAt: FRESH }),
      getReferralsCache: () => null,
    });
    await radarSchedulerTick(d);
    assert.equal(referralsSyncCalls.length, 1);
  });

  await t.test("tick: flag off => referrals sync NOT called (stopped before any sync check)", async () => {
    const { d, referralsSyncCalls } = deps({
      getFlag: () => false,
      getReferralsCache: () => null, // would be due if ever reached
    });
    await radarSchedulerTick(d);
    assert.equal(referralsSyncCalls.length, 0);
  });

  await t.test("tick: opt-in off => referrals sync NOT called (skipped before any sync check)", async () => {
    const { d, referralsSyncCalls } = deps({
      getSettings: () => ({ optIn: false }),
      getReferralsCache: () => null, // would be due if ever reached
    });
    await radarSchedulerTick(d);
    assert.equal(referralsSyncCalls.length, 0);
  });

  await t.test("tick: referrals sync throwing => swallowed, catalog tick still completes normally", async () => {
    const { d, syncCalls } = deps({
      getReferralsCache: () => ({ fetchedAt: REFERRALS_STALE }),
      syncReferrals: async () => {
        throw new Error("referrals upstream exploded");
      },
    });
    const result = await radarSchedulerTick(d);
    assert.equal(result.action, "synced", "a throwing referrals sync must never break the catalog tick");
    assert.equal(syncCalls.length, 1);
  });
});
