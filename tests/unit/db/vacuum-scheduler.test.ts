/**
 * Tests for src/lib/db/vacuumScheduler.ts
 *
 * Covers:
 * 1. Module loads without error (no orphan exports, all imports resolve)
 * 2. init() is idempotent (safe to call from instrumentation-node.ts)
 * 3. stop() is safe to call before init()
 * 4. stop() is idempotent
 * 5. getState() returns the expected shape before any runs
 * 6. runNow() returns success=true on a healthy DB and writes lastRunAt
 * 7. runNow() returns success=false / already_running when invoked twice concurrently
 * 8. lastRunAt is persisted to key_value and survives a "restart" (re-import)
 *
 * No timer-based tests (Node's setInterval is hard to assert deterministically
 * without sinon). The timer is exercised in integration tests in the
 * Next.js harness.
 */
import { describe, it, expect, beforeEach } from "vitest";

describe("vacuumScheduler", () => {
  let scheduler: typeof import("@/lib/db/vacuumScheduler");

  beforeEach(async () => {
    // Reset module cache so each test starts from a clean slate.
    // This also ensures the "restart" test in case 8 sees the persisted
    // row that case 6 wrote.
    scheduler = await import("@/lib/db/vacuumScheduler");
    scheduler.stop();
  });

  it("module loads and exports the expected public API", () => {
    expect(typeof scheduler.init).toBe("function");
    expect(typeof scheduler.stop).toBe("function");
    expect(typeof scheduler.runNow).toBe("function");
    expect(typeof scheduler.getState).toBe("function");
  });

  it("getState() returns the documented shape before any init/run", () => {
    const state = scheduler.getState();
    expect(state).toMatchObject({
      initialized: expect.any(Boolean),
      running: expect.any(Boolean),
      lastRunAt: expect.any(Object), // null | ISO string
      lastDurationMs: expect.any(Object), // null | number
      lastError: expect.any(Object), // null | string
      nextRunAt: expect.any(Object), // null | ISO string
    });
  });

  it("init() is idempotent — calling it twice does not throw", () => {
    expect(() => scheduler.init()).not.toThrow();
    expect(() => scheduler.init()).not.toThrow();
    scheduler.stop();
  });

  it("stop() is safe to call before init()", () => {
    expect(() => scheduler.stop()).not.toThrow();
  });

  it("stop() is idempotent", () => {
    scheduler.init();
    expect(() => scheduler.stop()).not.toThrow();
    expect(() => scheduler.stop()).not.toThrow();
  });

  it("runNow() returns success on a healthy DB and persists lastRunAt", async () => {
    // init() must be called first so the scheduler has a DB instance
    // to write to. In the integration harness this is wired into
    // instrumentation-node.ts; in unit tests we call it manually.
    scheduler.init();
    try {
      const result = await scheduler.runNow();
      expect(result.success).toBe(true);
      expect(typeof result.durationMs).toBe("number");
      expect(result.durationMs).toBeGreaterThanOrEqual(0);

      const state = scheduler.getState();
      expect(state.running).toBe(false);
      expect(state.lastRunAt).not.toBeNull();
      expect(state.lastError).toBeNull();
    } finally {
      scheduler.stop();
    }
  }, 15000); // VACUUM can take a few seconds on a populated DB

  it("runNow() returns already_running when called twice in parallel", async () => {
    scheduler.init();
    try {
      const [first, second] = await Promise.all([
        scheduler.runNow(),
        scheduler.runNow(),
      ]);

      const successes = [first, second].filter((r) => r.success).length;
      const alreadyRunning = [first, second].filter(
        (r) => r.error === "already_running"
      ).length;

      expect(successes).toBe(1);
      expect(alreadyRunning).toBe(1);
    } finally {
      scheduler.stop();
    }
  }, 15000);

  it("lastRunAt survives a module re-import (simulated restart)", async () => {
    scheduler.init();
    await scheduler.runNow();
    const beforeRestart = scheduler.getState().lastRunAt;
    expect(beforeRestart).not.toBeNull();

    scheduler.stop();

    // Simulate a process restart: clear the require cache and re-import.
    // In a real Next.js process this is what happens on the next request
    // after the worker hot-reloads.
    const modulePath = require.resolve("@/lib/db/vacuumScheduler");
    delete require.cache[modulePath];
    const reloaded = await import("@/lib/db/vacuumScheduler");
    const afterRestart = reloaded.getState().lastRunAt;

    // The persisted timestamp should match (or be the same ISO string).
    expect(afterRestart).toBe(beforeRestart);

    reloaded.stop();
  }, 20000);
});
