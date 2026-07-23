import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-domainstate-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const ds = await import("../../src/lib/db/domainState.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

await resetStorage();

// ──────────────── Fallback Chains ────────────────

test("saveFallbackChain and loadFallbackChain round-trip", async () => {
  await resetStorage();
  const model = "gpt-4";
  const chain = [
    { provider: "openai", priority: 1, enabled: true },
    { provider: "anthropic", priority: 2, enabled: false },
  ];

  ds.saveFallbackChain(model, chain);
  const loaded = ds.loadFallbackChain(model);
  assert.deepEqual(loaded, chain);
});

test("loadFallbackChain returns null for missing model", async () => {
  await resetStorage();
  const result = ds.loadFallbackChain("nonexistent");
  assert.equal(result, null);
});

test("loadAllFallbackChains returns all chains", async () => {
  await resetStorage();
  ds.saveFallbackChain("model-a", [{ provider: "p1", priority: 1, enabled: true }]);
  ds.saveFallbackChain("model-b", [{ provider: "p2", priority: 2, enabled: false }]);

  const all = ds.loadAllFallbackChains();
  assert.ok("model-a" in all);
  assert.ok("model-b" in all);
  assert.equal((all["model-a"] as any[]).length, 1);
});

test("deleteFallbackChain removes a chain", async () => {
  await resetStorage();
  ds.saveFallbackChain("to-delete", [{ provider: "p", priority: 1, enabled: true }]);
  assert.equal(ds.deleteFallbackChain("to-delete"), true);
  assert.equal(ds.loadFallbackChain("to-delete"), null);
});

test("deleteFallbackChain returns false when chain does not exist", async () => {
  await resetStorage();
  assert.equal(ds.deleteFallbackChain("never-existed"), false);
});

test("deleteAllFallbackChains clears everything", async () => {
  await resetStorage();
  ds.saveFallbackChain("a", [{ provider: "p", priority: 1, enabled: true }]);
  ds.saveFallbackChain("b", [{ provider: "p", priority: 1, enabled: true }]);
  ds.deleteAllFallbackChains();
  assert.deepEqual(ds.loadAllFallbackChains(), {});
});

// ──────────────── Budgets ────────────────

test("saveBudget and loadBudget round-trip", async () => {
  await resetStorage();
  ds.saveBudget("key-1", {
    dailyLimitUsd: 10,
    weeklyLimitUsd: 50,
    monthlyLimitUsd: 200,
    warningThreshold: 0.8,
    resetInterval: "daily",
    resetTime: "08:00",
    budgetResetAt: 1000,
    lastBudgetResetAt: 500,
    warningEmittedAt: 900,
    warningPeriodStart: 800,
  });

  const loaded = ds.loadBudget("key-1");
  assert.ok(loaded !== null);
  assert.equal(loaded.dailyLimitUsd, 10);
  assert.equal(loaded.weeklyLimitUsd, 50);
  assert.equal(loaded.monthlyLimitUsd, 200);
  assert.equal(loaded.warningThreshold, 0.8);
  assert.equal(loaded.resetInterval, "daily");
  assert.equal(loaded.resetTime, "08:00");
  assert.equal(loaded.budgetResetAt, 1000);
  assert.equal(loaded.lastBudgetResetAt, 500);
  assert.equal(loaded.warningEmittedAt, 900);
  assert.equal(loaded.warningPeriodStart, 800);
});

test("loadBudget returns null for missing key", () => {
  assert.equal(ds.loadBudget("no-such-key"), null);
});

test("saveBudget with minimal fields uses defaults", async () => {
  await resetStorage();
  ds.saveBudget("key-minimal", {});
  const loaded = ds.loadBudget("key-minimal");
  assert.ok(loaded !== null);
  assert.equal(loaded.dailyLimitUsd, 0);
  assert.equal(loaded.warningThreshold, 0.8);
  assert.equal(loaded.resetInterval, "daily");
  assert.equal(loaded.resetTime, "00:00");
  assert.equal(loaded.budgetResetAt, null);
  assert.equal(loaded.lastBudgetResetAt, null);
});

test("loadAllBudgets returns all budget configs", async () => {
  await resetStorage();
  ds.saveBudget("key-a", { dailyLimitUsd: 5 });
  ds.saveBudget("key-b", { dailyLimitUsd: 10 });

  const all = ds.loadAllBudgets();
  assert.equal(Object.keys(all).length, 2);
  assert.equal(all["key-a"].dailyLimitUsd, 5);
  assert.equal(all["key-b"].dailyLimitUsd, 10);
});

test("saveBudgetResetLog and loadBudgetResetLogs", async () => {
  await resetStorage();
  ds.saveBudget("budget-key", { dailyLimitUsd: 10 });

  const now = Date.now();
  ds.saveBudgetResetLog({
    apiKeyId: "budget-key",
    resetInterval: "daily",
    previousSpend: 8,
    resetAt: now,
    nextResetAt: now + 86400000,
    periodStart: now - 86400000,
    periodEnd: now,
  });

  const logs = ds.loadBudgetResetLogs("budget-key");
  assert.equal(logs.length, 1);
  assert.equal(logs[0].previousSpend, 8);
  assert.equal(logs[0].resetInterval, "daily");

  const noLogs = ds.loadBudgetResetLogs("no-such-key");
  assert.deepEqual(noLogs, []);
});

test("deleteBudget removes budget and reset logs", async () => {
  await resetStorage();
  ds.saveBudget("del-key", { dailyLimitUsd: 10 });
  ds.saveBudgetResetLog({ apiKeyId: "del-key", resetInterval: "daily", previousSpend: 3, resetAt: 1, nextResetAt: 2, periodStart: 0, periodEnd: 1 });
  ds.deleteBudget("del-key");
  assert.equal(ds.loadBudget("del-key"), null);
  assert.deepEqual(ds.loadBudgetResetLogs("del-key"), []);
});

// ──────────────── Cost History ────────────────

test("saveCostEntry and loadCostTotal", async () => {
  await resetStorage();
  ds.saveCostEntry("cost-key", 1.5, 1000);
  ds.saveCostEntry("cost-key", 2.5, 2000);
  ds.saveCostEntry("cost-key", 3.0, 3000);

  const total = ds.loadCostTotal("cost-key", 1500);
  assert.equal(total, 5.5); // 2.5 + 3.0

  const all = ds.loadCostTotal("cost-key", 0);
  assert.equal(all, 7.0);
});

test("loadCostTotal returns 0 for no entries", () => {
  assert.equal(ds.loadCostTotal("no-key", 0), 0);
});

test("batchSaveCostEntries inserts multiple entries", async () => {
  await resetStorage();
  ds.batchSaveCostEntries([
    { apiKeyId: "batch-key", cost: 1, timestamp: 100 },
    { apiKeyId: "batch-key", cost: 2, timestamp: 200 },
  ]);
  assert.equal(ds.loadCostTotal("batch-key", 0), 3);
});

test("batchSaveCostEntries skips empty array", () => {
  assert.doesNotThrow(() => ds.batchSaveCostEntries([]));
});

test("loadCostEntries returns entries in order", async () => {
  await resetStorage();
  ds.saveCostEntry("ce-key", 1, 100);
  ds.saveCostEntry("ce-key", 2, 200);
  ds.saveCostEntry("ce-key", 3, 300);

  const entries = ds.loadCostEntries("ce-key", 150);
  assert.equal(entries.length, 2);
  assert.equal((entries[0] as any).cost, 2);
  assert.equal((entries[1] as any).cost, 3);
});

test("loadCostEntriesInRange returns bounded entries", async () => {
  await resetStorage();
  ds.saveCostEntry("range-key", 1, 100);
  ds.saveCostEntry("range-key", 2, 200);
  ds.saveCostEntry("range-key", 3, 300);

  const entries = ds.loadCostEntriesInRange("range-key", 150, 250);
  assert.equal(entries.length, 1);
  assert.equal((entries[0] as any).cost, 2);
});

test("cleanOldCostEntries deletes old entries", async () => {
  await resetStorage();
  ds.saveCostEntry("clean-key", 1, 100);
  ds.saveCostEntry("clean-key", 2, 200);
  ds.saveCostEntry("clean-key", 3, 300);

  const deleted = ds.cleanOldCostEntries(250);
  assert.equal(deleted, 2); // entries at 100 and 200
  assert.equal(ds.loadCostTotal("clean-key", 0), 3);
});

test("deleteCostEntries removes all for key", async () => {
  await resetStorage();
  ds.saveCostEntry("del-cost", 5, 100);
  ds.saveCostEntry("del-cost", 10, 200);
  ds.deleteCostEntries("del-cost");
  assert.equal(ds.loadCostTotal("del-cost", 0), 0);
});

test("deleteAllCostData wipes budgets and cost data", async () => {
  await resetStorage();
  ds.saveBudget("wipe-key", { dailyLimitUsd: 10 });
  ds.saveCostEntry("wipe-key", 5, 100);
  ds.deleteAllCostData();
  assert.equal(ds.loadBudget("wipe-key"), null);
  assert.equal(ds.loadCostTotal("wipe-key", 0), 0);
});

// ──────────────── Lockout State ────────────────

test("saveLockoutState and loadLockoutState round-trip", async () => {
  await resetStorage();
  ds.saveLockoutState("user-1", { attempts: [100, 200, 300], lockedUntil: 9999999999999 });
  const loaded = ds.loadLockoutState("user-1");
  assert.ok(loaded !== null);
  assert.deepEqual(loaded.attempts, [100, 200, 300]);
  assert.equal(loaded.lockedUntil, 9999999999999);
});

test("loadLockoutState returns null for missing identifier", () => {
  assert.equal(ds.loadLockoutState("no-such"), null);
});

test("saveLockoutState with null lockedUntil", async () => {
  await resetStorage();
  ds.saveLockoutState("not-locked", { attempts: [], lockedUntil: null });
  const loaded = ds.loadLockoutState("not-locked");
  assert.ok(loaded !== null);
  assert.deepEqual(loaded.attempts, []);
  assert.equal(loaded.lockedUntil, null);
});

test("deleteLockoutState removes state", async () => {
  await resetStorage();
  ds.saveLockoutState("del-lock", { attempts: [1], lockedUntil: null });
  ds.deleteLockoutState("del-lock");
  assert.equal(ds.loadLockoutState("del-lock"), null);
});

test("loadAllLockedIdentifiers returns only currently locked", async () => {
  await resetStorage();
  ds.saveLockoutState("locked-now", { attempts: [1], lockedUntil: Date.now() + 3600000 });
  ds.saveLockoutState("expired", { attempts: [1], lockedUntil: Date.now() - 3600000 });
  ds.saveLockoutState("no-lock", { attempts: [], lockedUntil: null });

  const locked = ds.loadAllLockedIdentifiers();
  assert.equal(locked.length, 1);
  assert.equal(locked[0].identifier, "locked-now");
});

// ──────────────── Circuit Breakers ────────────────

test("saveCircuitBreakerState and loadCircuitBreakerState round-trip", async () => {
  await resetStorage();
  ds.saveCircuitBreakerState("cb-1", {
    state: "OPEN",
    failureCount: 5,
    lastFailureTime: 1000,
    options: { timeout: 30000 },
  });

  const loaded = ds.loadCircuitBreakerState("cb-1");
  assert.ok(loaded !== null);
  assert.equal(loaded.state, "OPEN");
  assert.equal(loaded.failureCount, 5);
  assert.equal(loaded.lastFailureTime, 1000);
  assert.deepEqual(loaded.options, { timeout: 30000 });
});

test("loadCircuitBreakerState returns null for missing name", () => {
  assert.equal(ds.loadCircuitBreakerState("no-such"), null);
});

test("saveCircuitBreakerState without options", async () => {
  await resetStorage();
  ds.saveCircuitBreakerState("cb-simple", {
    state: "CLOSED",
    failureCount: 0,
    lastFailureTime: null,
  });
  const loaded = ds.loadCircuitBreakerState("cb-simple");
  assert.ok(loaded !== null);
  assert.equal(loaded.state, "CLOSED");
  assert.equal(loaded.failureCount, 0);
  assert.equal(loaded.lastFailureTime, null);
  assert.equal(loaded.options, null);
});

test("loadAllCircuitBreakerStates returns all", async () => {
  await resetStorage();
  ds.saveCircuitBreakerState("cb-a", { state: "HALF_OPEN", failureCount: 2, lastFailureTime: 500 });
  ds.saveCircuitBreakerState("cb-b", { state: "CLOSED", failureCount: 0, lastFailureTime: null });

  const all = ds.loadAllCircuitBreakerStates();
  assert.equal(all.length, 2);
  const names = all.map((r: any) => r.name).sort();
  assert.deepEqual(names, ["cb-a", "cb-b"]);
});

test("deleteCircuitBreakerState removes state", async () => {
  await resetStorage();
  ds.saveCircuitBreakerState("del-cb", { state: "OPEN", failureCount: 1, lastFailureTime: 100 });
  ds.deleteCircuitBreakerState("del-cb");
  assert.equal(ds.loadCircuitBreakerState("del-cb"), null);
});

test("deleteAllCircuitBreakerStates clears everything", async () => {
  await resetStorage();
  ds.saveCircuitBreakerState("a", { state: "OPEN", failureCount: 1, lastFailureTime: 100 });
  ds.saveCircuitBreakerState("b", { state: "CLOSED", failureCount: 0, lastFailureTime: null });
  ds.deleteAllCircuitBreakerStates();
  assert.deepEqual(ds.loadAllCircuitBreakerStates(), []);
});
