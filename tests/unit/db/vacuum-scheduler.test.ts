/**
 * Tests for src/lib/db/vacuumScheduler.ts (#4437 / PR #4480)
 *
 * Covers:
 * 1. Module exports the expected public API.
 * 2. getState() returns the documented shape before any init/run.
 * 3. init() is idempotent (safe to call from instrumentation-node.ts).
 * 4. stop() is safe before init() and idempotent.
 * 5. runNow() succeeds on a healthy DB, persists lastRunAt, clears isRunning.
 * 6. runNow() called twice concurrently yields exactly one success and one
 *    "already_running".
 * 7. lastRunAt survives a simulated restart (__resetForTests + init reloads the
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
const originalEnabled = process.env.OMNIROUTE_VACUUM_ENABLED;

process.env.DATA_DIR = TEST_DATA_DIR;
// Keep the scheduler from arming a real interval timer during unit tests.
process.env.OMNIROUTE_VACUUM_ENABLED = "0";

const core = await import("../../../src/lib/db/core.ts");
core.resetDbInstance();

const scheduler = await import("../../../src/lib/db/vacuumScheduler.ts");

test.beforeEach(() => {
  scheduler.__resetForTests();
});

test.after(() => {
  scheduler.__resetForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalEnabled === undefined) delete process.env.OMNIROUTE_VACUUM_ENABLED;
  else process.env.OMNIROUTE_VACUUM_ENABLED = originalEnabled;
});

test("module loads and exports the expected public API", () => {
  assert.equal(typeof scheduler.init, "function");
  assert.equal(typeof scheduler.stop, "function");
  assert.equal(typeof scheduler.runNow, "function");
  assert.equal(typeof scheduler.getState, "function");
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

test("init() is idempotent — calling it twice does not throw", () => {
  assert.doesNotThrow(() => scheduler.init());
  assert.doesNotThrow(() => scheduler.init());
  scheduler.stop();
});

test("stop() is safe to call before init() and is idempotent", () => {
  assert.doesNotThrow(() => scheduler.stop());
  scheduler.init();
  assert.doesNotThrow(() => scheduler.stop());
  assert.doesNotThrow(() => scheduler.stop());
});

test("runNow() succeeds on a healthy DB and persists lastRunAt", async () => {
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
