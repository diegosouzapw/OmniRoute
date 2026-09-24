/**
 * Tests for src/lib/db/vacuumScheduler.ts (#4437 / PR #4480)
 *
 * Covers:
 * 1. Module exports the expected public API.
 * 2. getState() returns the documented shape before any init/run.
 * 3. init() honors Storage's scheduledVacuum/vacuumHour settings.
 * 4. refresh() applies Storage setting changes without a restart.
 * 5. runNow() succeeds on a healthy DB, persists lastRunAt, clears isRunning.
 * 6. lastRunAt survives a simulated restart (__resetForTests + init reloads the
 *    persisted state from key_value).
 *
 * Rebuild note (PR #4480): the original PR test was authored against the Vitest
 * API and a stale scheduler interface (`state.initialized` / `state.running`),
 * which never matched the shipped module (`isRunning`, no `initialized`) and was
 * placed under tests/unit/db/** where the Node native runner — not Vitest —
 * picks it up. Rewritten for node:test against the real VacuumSchedulerState.
 *
 * DB isolation pattern mirrors tests/unit/db/default-combo-toggle.test.ts:
 * temp DATA_DIR, resetDbInstance() before each test, cleanup in test.after().
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vacuum-scheduler-"));
const originalDataDir = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
core.resetDbInstance();

const scheduler = await import("../../../src/lib/db/vacuumScheduler.ts");

function setOptimizationSettings(values: { scheduledVacuum?: string; vacuumHour?: number }) {
  const db = core.getDbInstance();
  const insert = db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
  );
  for (const [key, value] of Object.entries(values)) {
    insert.run("databaseSettings", `optimization.${key}`, JSON.stringify(value));
  }
}

test.beforeEach(() => {
  scheduler.__resetForTests();
  const db = core.getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace IN ('scheduler', 'databaseSettings')").run();
});

test.after(() => {
  scheduler.__resetForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("module loads and exports the expected public API", () => {
  assert.equal(typeof scheduler.init, "function");
  assert.equal(typeof scheduler.stop, "function");
  assert.equal(typeof scheduler.runNow, "function");
  assert.equal(typeof scheduler.getState, "function");
  assert.equal(typeof scheduler.refresh, "function");
  assert.equal(typeof scheduler.resolveNextRunAt, "function");
});

test("getState() returns the documented shape before any init/run", () => {
  const state = scheduler.getState();
  assert.equal(typeof state.enabled, "boolean");
  assert.equal(typeof state.isRunning, "boolean");
  assert.equal(state.isRunning, false);
  assert.equal(state.lastRunAt, null);
  assert.equal(state.lastDurationMs, null);
  assert.equal(state.lastError, null);
  assert.equal(state.nextRunAt, null);
});

test("resolveNextRunAt respects Storage frequency and vacuumHour", () => {
  const nowBeforeHour = new Date(2026, 0, 1, 1, 30, 0, 0).getTime();
  const todayAtTwo = new Date(2026, 0, 1, 2, 0, 0, 0).getTime();
  assert.equal(
    scheduler.resolveNextRunAt({ scheduledVacuum: "daily", vacuumHour: 2 }, null, nowBeforeHour),
    todayAtTwo
  );

  const nowAfterHour = new Date(2026, 0, 1, 3, 0, 0, 0).getTime();
  const tomorrowAtTwo = new Date(2026, 0, 2, 2, 0, 0, 0).getTime();
  assert.equal(
    scheduler.resolveNextRunAt({ scheduledVacuum: "daily", vacuumHour: 2 }, null, nowAfterHour),
    tomorrowAtTwo
  );

  const lastRun = new Date(2026, 0, 1, 3, 0, 0, 0).getTime();
  const nextWeekAtTwo = new Date(2026, 0, 8, 2, 0, 0, 0).getTime();
  assert.equal(
    scheduler.resolveNextRunAt({ scheduledVacuum: "weekly", vacuumHour: 2 }, lastRun, lastRun),
    nextWeekAtTwo
  );

  assert.equal(
    scheduler.resolveNextRunAt({ scheduledVacuum: "never", vacuumHour: 2 }, null, nowBeforeHour),
    null
  );
});

test("init() honors Storage scheduledVacuum=never", () => {
  setOptimizationSettings({ scheduledVacuum: "never", vacuumHour: 4 });
  const state = scheduler.init();
  assert.equal(state.enabled, false);
  assert.equal(state.intervalMs, 0);
  assert.equal(state.nextRunAt, null);
});

test("init() honors Storage schedule settings", () => {
  setOptimizationSettings({ scheduledVacuum: "weekly", vacuumHour: 4 });
  const state = scheduler.init();
  assert.equal(state.enabled, true);
  assert.equal(state.intervalMs, 7 * 24 * 60 * 60 * 1000);
  assert.notEqual(state.nextRunAt, null);
});

test("refresh() applies Storage setting changes without restart", () => {
  setOptimizationSettings({ scheduledVacuum: "daily", vacuumHour: 1 });
  assert.equal(scheduler.init().enabled, true);

  setOptimizationSettings({ scheduledVacuum: "never" });
  const state = scheduler.refresh();
  assert.equal(state.enabled, false);
  assert.equal(state.nextRunAt, null);
});

test("init() is idempotent — calling it twice does not throw", () => {
  setOptimizationSettings({ scheduledVacuum: "never" });
  assert.doesNotThrow(() => scheduler.init());
  assert.doesNotThrow(() => scheduler.init());
  scheduler.stop();
});

test("stop() is safe to call before init() and is idempotent", () => {
  setOptimizationSettings({ scheduledVacuum: "never" });
  assert.doesNotThrow(() => scheduler.stop());
  scheduler.init();
  assert.doesNotThrow(() => scheduler.stop());
  assert.doesNotThrow(() => scheduler.stop());
});

test("runNow() succeeds on a healthy DB and persists lastRunAt", async () => {
  setOptimizationSettings({ scheduledVacuum: "never" });
  scheduler.init();
  try {
    const result = await scheduler.runNow();
    assert.equal(result.success, true);
    assert.equal(typeof result.durationMs, "number");
    assert.ok(result.durationMs >= 0);

    const state = scheduler.getState();
    assert.equal(state.isRunning, false);
    assert.notEqual(state.lastRunAt, null);
    assert.equal(state.lastError, null);
  } finally {
    scheduler.stop();
  }
});

test("runNow() can be called repeatedly; each run succeeds and refreshes lastRunAt", async () => {
  // better-sqlite3 is synchronous, so VACUUM blocks the event loop for the whole
  // run — the isRunning guard (which returns "already_running") cannot be
  // triggered by overlapping awaits in-process. The realistic contract is that
  // sequential runs each succeed and update lastRunAt.
  setOptimizationSettings({ scheduledVacuum: "never" });
  scheduler.init();
  try {
    const first = await scheduler.runNow();
    assert.equal(first.success, true);
    const second = await scheduler.runNow();
    assert.equal(second.success, true);
    assert.equal(scheduler.getState().isRunning, false);
    assert.notEqual(scheduler.getState().lastRunAt, null);
  } finally {
    scheduler.stop();
  }
});

test("lastRunAt survives a simulated restart (state reloaded from key_value)", async () => {
  setOptimizationSettings({ scheduledVacuum: "never" });
  scheduler.init();
  await scheduler.runNow();
  const beforeRestart = scheduler.getState().lastRunAt;
  assert.notEqual(beforeRestart, null);

  // Simulate a process restart: wipe in-memory state, then init() reloads the
  // persisted blob from key_value.
  scheduler.__resetForTests();
  assert.equal(scheduler.getState().lastRunAt, null);

  scheduler.init();
  const afterRestart = scheduler.getState().lastRunAt;
  assert.equal(afterRestart, beforeRestart);
  scheduler.stop();
});

// ──────────────── #12821: deferred full-VACUUM requests ────────────────

test("getState() exposes the deferred full-VACUUM request fields as null by default", () => {
  const state = scheduler.getState();
  assert.equal(state.fullVacuumRequestedAt, null);
  assert.equal(state.fullVacuumRequestReason, null);
});

test("requestFullVacuum() records the request, persists it, and keeps the first timestamp", () => {
  setOptimizationSettings({ scheduledVacuum: "weekly", vacuumHour: 2 });
  scheduler.init();
  try {
    const first = scheduler.requestFullVacuum("cleanup left 42 free page(s)");
    assert.equal(typeof first.fullVacuumRequestedAt, "number");
    assert.equal(first.fullVacuumRequestReason, "cleanup left 42 free page(s)");
    // It must NOT run the VACUUM itself — only record intent.
    assert.equal(first.lastRunAt, null);
    assert.equal(first.isRunning, false);

    const second = scheduler.requestFullVacuum("cleanup left 7 free page(s)");
    assert.equal(second.fullVacuumRequestedAt, first.fullVacuumRequestedAt, "first timestamp wins");
    assert.equal(
      second.fullVacuumRequestReason,
      "cleanup left 7 free page(s)",
      "latest reason wins"
    );

    // Persisted in the same key_value blob as the rest of the state.
    const row = core
      .getDbInstance()
      .prepare("SELECT value FROM key_value WHERE namespace = 'scheduler' AND key = 'vacuum'")
      .get() as { value: string } | undefined;
    assert.ok(row, "state row must exist");
    const persisted = JSON.parse(row.value);
    assert.equal(persisted.fullVacuumRequestedAt, first.fullVacuumRequestedAt);
    assert.equal(persisted.fullVacuumRequestReason, "cleanup left 7 free page(s)");
  } finally {
    scheduler.stop();
  }
});

test("a deferred request survives a simulated restart and is cleared by the next successful run", async () => {
  setOptimizationSettings({ scheduledVacuum: "never" });
  scheduler.init();
  scheduler.requestFullVacuum("auto_vacuum=0 cannot reclaim incrementally");
  const requestedAt = scheduler.getState().fullVacuumRequestedAt;
  assert.equal(typeof requestedAt, "number");

  // Restart: in-memory state wiped, init() reloads from key_value.
  scheduler.__resetForTests();
  assert.equal(scheduler.getState().fullVacuumRequestedAt, null);
  scheduler.init();
  assert.equal(scheduler.getState().fullVacuumRequestedAt, requestedAt);
  assert.match(scheduler.getState().fullVacuumRequestReason ?? "", /auto_vacuum=0/);

  // scheduledVacuum=never is honored: nothing is armed even though a request is pending.
  assert.equal(scheduler.getState().enabled, false);
  assert.equal(scheduler.getState().nextRunAt, null);

  // The next successful full run (scheduled or manual via the Storage page) satisfies it.
  try {
    const result = await scheduler.runNow();
    assert.equal(result.success, true);
    const state = scheduler.getState();
    assert.equal(state.fullVacuumRequestedAt, null);
    assert.equal(state.fullVacuumRequestReason, null);
    assert.notEqual(state.lastRunAt, null);
  } finally {
    scheduler.stop();
  }
});
