/**
 * #7079 — free-proxy auto-sync scheduler. Network-free: the sync-cycle body
 * is swapped out via `_setSyncCycleRunnerForTests()` so no test hits a real
 * provider or the network. Timers use `node:test`'s `mock.timers`.
 */
import { test, mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-proxy-autosync-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
// The module auto-initializes on import (matches `proxyHealth/scheduler.ts`);
// keep it disabled at import time so the very first import doesn't schedule
// anything before a test can control the env.
process.env.FREE_PROXY_AUTO_SYNC_ENABLED = "false";

const core = await import("../../src/lib/db/core.ts");
const freeProxiesDb = await import("../../src/lib/db/freeProxies.ts");
const scheduler = await import("../../src/lib/freeProxyProviders/scheduler.ts");

const ENV_KEYS = [
  "FREE_PROXY_AUTO_SYNC_ENABLED",
  "FREE_PROXY_AUTO_SYNC_INTERVAL_MS",
  "NEXT_PHASE",
  "OMNIROUTE_DISABLE_BACKGROUND_SERVICES",
  "FREE_PROXY_1PROXY_ENABLED",
  "FREE_PROXY_PROXIFLY_ENABLED",
] as const;
const savedEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));

function restoreEnv() {
  for (const key of ENV_KEYS) {
    const val = savedEnv[key];
    if (val === undefined) delete process.env[key];
    else process.env[key] = val;
  }
}

function reset() {
  scheduler.stopFreeProxyAutoSync();
  scheduler._setSyncCycleRunnerForTests(null);
  restoreEnv();
  process.env.FREE_PROXY_AUTO_SYNC_ENABLED = "false";
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  reset();
});

test.after(() => {
  scheduler.stopFreeProxyAutoSync();
  scheduler._setSyncCycleRunnerForTests(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  restoreEnv();
});

test("disabled by default (unset) — initFreeProxyAutoSync schedules nothing", () => {
  delete process.env.FREE_PROXY_AUTO_SYNC_ENABLED;
  scheduler.initFreeProxyAutoSync();
  assert.equal(globalThis.__freeProxyAutoSyncInterval, undefined);
  assert.equal(globalThis.__freeProxyAutoSyncStartupTimer, undefined);
});

test('FREE_PROXY_AUTO_SYNC_ENABLED="false" schedules nothing, sync never called', async () => {
  process.env.FREE_PROXY_AUTO_SYNC_ENABLED = "false";
  let calls = 0;
  scheduler._setSyncCycleRunnerForTests(async () => {
    calls++;
    return { results: {}, lastSyncAt: new Date().toISOString() };
  });

  scheduler.initFreeProxyAutoSync();
  assert.equal(globalThis.__freeProxyAutoSyncStartupTimer, undefined);
  assert.equal(calls, 0);
});

test("enabled but no providers are enabled — scheduling is skipped", () => {
  process.env.FREE_PROXY_AUTO_SYNC_ENABLED = "true";
  process.env.FREE_PROXY_1PROXY_ENABLED = "false";
  process.env.FREE_PROXY_PROXIFLY_ENABLED = "false";

  scheduler.initFreeProxyAutoSync();

  assert.equal(globalThis.__freeProxyAutoSyncStartupTimer, undefined);
  assert.equal(globalThis.__freeProxyAutoSyncInterval, undefined);
});

test("enabled with an enabled provider — startup timer is scheduled", async () => {
  process.env.FREE_PROXY_AUTO_SYNC_ENABLED = "true";
  // Leave oneproxy/proxifly at their default-enabled state.

  scheduler.initFreeProxyAutoSync();
  // The startup timer is armed after an async initial-delay DB read resolves.
  await new Promise((resolve) => setImmediate(resolve));

  assert.ok(globalThis.__freeProxyAutoSyncStartupTimer, "expected a startup timer to be armed");
});

test("an interval below the 5-minute floor is raised to the floor", () => {
  process.env.FREE_PROXY_AUTO_SYNC_INTERVAL_MS = "1000";
  assert.equal(scheduler.getFreeProxyAutoSyncIntervalMs(), 300_000);
});

test("a valid interval above the floor is respected as-is", () => {
  process.env.FREE_PROXY_AUTO_SYNC_INTERVAL_MS = "900000";
  assert.equal(scheduler.getFreeProxyAutoSyncIntervalMs(), 900_000);
});

test("an unset/invalid interval falls back to the 30-minute default", () => {
  delete process.env.FREE_PROXY_AUTO_SYNC_INTERVAL_MS;
  assert.equal(scheduler.getFreeProxyAutoSyncIntervalMs(), 1_800_000);

  process.env.FREE_PROXY_AUTO_SYNC_INTERVAL_MS = "not-a-number";
  assert.equal(scheduler.getFreeProxyAutoSyncIntervalMs(), 1_800_000);
});

test("isBuildProcess() (NEXT_PHASE=phase-production-build) suppresses scheduling", () => {
  process.env.FREE_PROXY_AUTO_SYNC_ENABLED = "true";
  process.env.NEXT_PHASE = "phase-production-build";

  scheduler.initFreeProxyAutoSync();

  assert.equal(globalThis.__freeProxyAutoSyncStartupTimer, undefined);
});

test("OMNIROUTE_DISABLE_BACKGROUND_SERVICES=true suppresses scheduling", () => {
  process.env.FREE_PROXY_AUTO_SYNC_ENABLED = "true";
  process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "true";

  scheduler.initFreeProxyAutoSync();

  assert.equal(globalThis.__freeProxyAutoSyncStartupTimer, undefined);
});

test("reentrancy guard: a second forced cycle is skipped while the first is still running", async () => {
  let concurrentCalls = 0;
  let maxConcurrent = 0;
  let releaseFirst: (() => void) | undefined;
  const gate = new Promise<void>((resolve) => {
    releaseFirst = resolve;
  });

  scheduler._setSyncCycleRunnerForTests(async () => {
    concurrentCalls++;
    maxConcurrent = Math.max(maxConcurrent, concurrentCalls);
    await gate;
    concurrentCalls--;
    return { results: {}, lastSyncAt: new Date().toISOString() };
  });

  const firstCycle = scheduler.forceFreeProxySyncCycle();
  // Fire the second cycle while the first is still awaiting the gate. The
  // reentrancy guard must skip it entirely — the runner must not be invoked
  // a second time while isRunning is true.
  const secondCycle = scheduler.forceFreeProxySyncCycle();

  releaseFirst?.();
  await Promise.all([firstCycle, secondCycle]);

  assert.equal(maxConcurrent, 1, "the cycle runner must never overlap itself");
});

test("cycle delegates to the shared sync-cycle runner (same path as the manual route)", async () => {
  let called = false;
  scheduler._setSyncCycleRunnerForTests(async () => {
    called = true;
    return { results: { "1proxy": { fetched: 1, added: 1, updated: 0, errors: [] } }, lastSyncAt: "x" };
  });

  await scheduler.forceFreeProxySyncCycle();

  assert.equal(called, true);
});

test("initial delay: a recent lastSyncAt shortens the first tick below a full interval", async () => {
  const intervalMs = 300_000; // floor
  process.env.FREE_PROXY_AUTO_SYNC_INTERVAL_MS = String(intervalMs);
  process.env.FREE_PROXY_AUTO_SYNC_ENABLED = "true";

  // Record a sync that "happened" 100s ago — well inside the 5-minute interval.
  const elapsedMs = 100_000;
  await freeProxiesDb.recordFreeProxySync(new Date(Date.now() - elapsedMs).toISOString());

  let cycleRuns = 0;
  scheduler._setSyncCycleRunnerForTests(async () => {
    cycleRuns++;
    return { results: {}, lastSyncAt: new Date().toISOString() };
  });

  mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
  try {
    scheduler.initFreeProxyAutoSync();
    // Let the async initial-delay computation (a DB read) resolve and arm the timer.
    await new Promise((resolve) => setImmediate(resolve));

    // Advancing by less than (intervalMs - elapsedMs) must not fire yet.
    mock.timers.tick(intervalMs - elapsedMs - 5_000);
    assert.equal(cycleRuns, 0, "must not fire before the shortened initial delay elapses");

    // Advancing past the remaining delay fires the first cycle.
    mock.timers.tick(10_000);
    assert.equal(cycleRuns, 1, "expected exactly one cycle once the initial delay elapses");
  } finally {
    mock.timers.reset();
  }
});
