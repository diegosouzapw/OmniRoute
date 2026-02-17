import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

// ─── Test Setup: Use temp DB ────────────────────────

let tmpDir;
let originalEnv;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-domain-test-"));
  originalEnv = process.env.DATA_DIR;
  process.env.DATA_DIR = tmpDir;
});

afterEach(() => {
  process.env.DATA_DIR = originalEnv;
  if (tmpDir && fs.existsSync(tmpDir)) {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

// ─── Fallback Policy Tests ────────────────────────

describe("fallbackPolicy persistence", () => {
  it("should register and resolve a fallback chain", async () => {
    const { registerFallback, resolveFallbackChain, hasFallback, resetAllFallbacks } =
      await import("../../src/domain/fallbackPolicy.ts");

    resetAllFallbacks();

    registerFallback("gpt-4o", [
      { provider: "openai", priority: 0, enabled: true },
      { provider: "anthropic", priority: 1, enabled: true },
      { provider: "disabled-one", priority: 2, enabled: false },
    ]);

    assert.ok(hasFallback("gpt-4o"));

    const chain = resolveFallbackChain("gpt-4o");
    assert.equal(chain.length, 2); // disabled-one excluded
    assert.equal(chain[0].provider, "openai");
    assert.equal(chain[1].provider, "anthropic");

    resetAllFallbacks();
  });

  it("should resolve with exclusions", async () => {
    const { registerFallback, resolveFallbackChain, resetAllFallbacks } =
      await import("../../src/domain/fallbackPolicy.ts");

    resetAllFallbacks();

    registerFallback("claude-3", [
      { provider: "anthropic", priority: 0 },
      { provider: "openai", priority: 1 },
    ]);

    const chain = resolveFallbackChain("claude-3", ["anthropic"]);
    assert.equal(chain.length, 1);
    assert.equal(chain[0].provider, "openai");

    resetAllFallbacks();
  });

  it("should get next fallback correctly", async () => {
    const { registerFallback, getNextFallback, resetAllFallbacks } =
      await import("../../src/domain/fallbackPolicy.ts");

    resetAllFallbacks();

    registerFallback("test-model", [
      { provider: "p1", priority: 0 },
      { provider: "p2", priority: 1 },
    ]);

    assert.equal(getNextFallback("test-model"), "p1");
    assert.equal(getNextFallback("test-model", ["p1"]), "p2");
    assert.equal(getNextFallback("test-model", ["p1", "p2"]), null);

    // Non-existing model
    assert.equal(getNextFallback("no-model"), null);

    resetAllFallbacks();
  });

  it("should remove fallback chain", async () => {
    const { registerFallback, removeFallback, hasFallback, resetAllFallbacks } =
      await import("../../src/domain/fallbackPolicy.ts");

    resetAllFallbacks();

    registerFallback("gpt-4", [{ provider: "openai" }]);
    assert.ok(hasFallback("gpt-4"));

    removeFallback("gpt-4");
    assert.ok(!hasFallback("gpt-4"));

    resetAllFallbacks();
  });

  it("should get all fallback chains", async () => {
    const { registerFallback, getAllFallbackChains, resetAllFallbacks } =
      await import("../../src/domain/fallbackPolicy.ts");

    resetAllFallbacks();

    registerFallback("m1", [{ provider: "p1" }]);
    registerFallback("m2", [{ provider: "p2" }]);

    const all = getAllFallbackChains();
    assert.ok("m1" in all);
    assert.ok("m2" in all);

    resetAllFallbacks();
  });
});

// ─── Cost Rules Tests ────────────────────────

describe("costRules persistence", () => {
  it("should set and check budget", async () => {
    const { setBudget, getBudget, checkBudget, resetCostData } =
      await import("../../src/domain/costRules.ts");

    resetCostData();

    setBudget("key1", { dailyLimitUsd: 10 });
    const budget = getBudget("key1");
    assert.equal(budget.dailyLimitUsd, 10);
    assert.equal(budget.warningThreshold, 0.8);

    const check = checkBudget("key1");
    assert.ok(check.allowed);
    assert.equal(check.dailyLimit, 10);

    resetCostData();
  });

  it("should record cost and check daily total", async () => {
    const { setBudget, recordCost, getDailyTotal, checkBudget, resetCostData } =
      await import("../../src/domain/costRules.ts");

    resetCostData();

    setBudget("key2", { dailyLimitUsd: 5 });
    recordCost("key2", 3.5);
    recordCost("key2", 1.0);

    const total = getDailyTotal("key2");
    assert.ok(total >= 4.5);

    // Should still be allowed
    const check = checkBudget("key2", 0);
    assert.ok(check.allowed);

    // Should be denied with additional cost
    const checkOver = checkBudget("key2", 1.0);
    assert.ok(!checkOver.allowed);

    resetCostData();
  });

  it("should return allowed=true when no budget set", async () => {
    const { checkBudget, resetCostData } = await import("../../src/domain/costRules.ts");

    resetCostData();

    const check = checkBudget("no-budget-key");
    assert.ok(check.allowed);
    assert.equal(check.dailyLimit, 0);

    resetCostData();
  });

  it("should get cost summary", async () => {
    const { setBudget, recordCost, getCostSummary, resetCostData } =
      await import("../../src/domain/costRules.ts");

    resetCostData();

    setBudget("key3", { dailyLimitUsd: 100 });
    recordCost("key3", 1.5);
    recordCost("key3", 2.5);

    const summary = getCostSummary("key3");
    assert.ok(summary.dailyTotal >= 4.0);
    assert.ok(summary.monthlyTotal >= 4.0);
    assert.equal(summary.budget.dailyLimitUsd, 100);

    resetCostData();
  });
});

// ─── Lockout Policy Tests ────────────────────────

describe("lockoutPolicy persistence", () => {
  it("should track failed attempts and trigger lockout", async () => {
    const { recordFailedAttempt, checkLockout, recordSuccess } =
      await import("../../src/domain/lockoutPolicy.ts");

    const id = "test-ip-" + Date.now();
    const config = { maxAttempts: 3, lockoutDurationMs: 5000, attemptWindowMs: 10000 };

    // First attempts should not lock
    let result = recordFailedAttempt(id, config);
    assert.ok(!result.locked);

    result = recordFailedAttempt(id, config);
    assert.ok(!result.locked);

    // Third attempt triggers lockout
    result = recordFailedAttempt(id, config);
    assert.ok(result.locked);
    assert.ok(result.remainingMs > 0);

    // Check lockout
    const lockCheck = checkLockout(id, config);
    assert.ok(lockCheck.locked);

    // Clean up
    recordSuccess(id);
  });

  it("should unlock after success", async () => {
    const { recordFailedAttempt, recordSuccess, checkLockout } =
      await import("../../src/domain/lockoutPolicy.ts");

    const id = "test-unlock-" + Date.now();
    const config = { maxAttempts: 3, lockoutDurationMs: 5000, attemptWindowMs: 10000 };

    recordFailedAttempt(id, config);
    recordFailedAttempt(id, config);

    recordSuccess(id);

    const check = checkLockout(id, config);
    assert.ok(!check.locked);
  });

  it("should force-unlock", async () => {
    const { recordFailedAttempt, forceUnlock, checkLockout } =
      await import("../../src/domain/lockoutPolicy.ts");

    const id = "test-force-" + Date.now();
    const config = { maxAttempts: 2, lockoutDurationMs: 60000, attemptWindowMs: 60000 };

    recordFailedAttempt(id, config);
    recordFailedAttempt(id, config);

    const lockCheck = checkLockout(id, config);
    assert.ok(lockCheck.locked);

    forceUnlock(id);

    const afterUnlock = checkLockout(id, config);
    assert.ok(!afterUnlock.locked);
  });
});

// ─── Circuit Breaker Tests ────────────────────────

describe("circuitBreaker persistence", () => {
  it("should open after threshold failures", async () => {
    const { CircuitBreaker, STATE } = await import("../../src/shared/utils/circuitBreaker.ts");

    const cb = new CircuitBreaker("test-cb-" + Date.now(), { failureThreshold: 3 });
    assert.equal(cb.state, STATE.CLOSED);

    // Simulate failures
    for (let i = 0; i < 3; i++) {
      try {
        await cb.execute(() => Promise.reject(new Error("fail")));
      } catch {
        // expected
      }
    }

    assert.equal(cb.state, STATE.OPEN);
    assert.ok(!cb.canExecute());
  });

  it("should reset correctly", async () => {
    const { CircuitBreaker, STATE } = await import("../../src/shared/utils/circuitBreaker.ts");

    const cb = new CircuitBreaker("test-reset-" + Date.now(), { failureThreshold: 2 });

    try {
      await cb.execute(() => Promise.reject(new Error("fail")));
    } catch {}
    try {
      await cb.execute(() => Promise.reject(new Error("fail")));
    } catch {}

    assert.equal(cb.state, STATE.OPEN);

    cb.reset();
    assert.equal(cb.state, STATE.CLOSED);
    assert.equal(cb.failureCount, 0);
    assert.ok(cb.canExecute());
  });

  it("should close on success after half-open", async () => {
    const { CircuitBreaker, STATE } = await import("../../src/shared/utils/circuitBreaker.ts");

    const cb = new CircuitBreaker("test-halfopen-" + Date.now(), {
      failureThreshold: 2,
      resetTimeout: 10, // 10ms for test speed
    });

    // Open the circuit
    try {
      await cb.execute(() => Promise.reject(new Error("fail")));
    } catch {}
    try {
      await cb.execute(() => Promise.reject(new Error("fail")));
    } catch {}
    assert.equal(cb.state, STATE.OPEN);

    // Wait for resetTimeout
    await new Promise((r) => setTimeout(r, 20));

    // Should transition to HALF_OPEN and succeed
    const result = await cb.execute(() => Promise.resolve("ok"));
    assert.equal(result, "ok");
    assert.equal(cb.state, STATE.CLOSED);
  });

  it("registry should return statuses", async () => {
    const { getCircuitBreaker, getAllCircuitBreakerStatuses } =
      await import("../../src/shared/utils/circuitBreaker.ts");

    const name = "reg-test-" + Date.now();
    const cb = getCircuitBreaker(name, { failureThreshold: 5 });
    assert.ok(cb);

    const statuses = getAllCircuitBreakerStatuses();
    const found = statuses.find((s) => s.name === name);
    assert.ok(found);
    assert.equal(found.state, "CLOSED");
  });
});
