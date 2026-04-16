import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-domain-cost-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const costRules = await import("../../src/domain/costRules.ts");
const domainState = await import("../../src/lib/db/domainState.ts");

async function resetStorage() {
  costRules.resetCostData();
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  costRules.resetCostData();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("setBudget normalizes defaults and getBudget returns the stored config", () => {
  costRules.setBudget("key-budget", { dailyLimitUsd: 12.5 });

  assert.deepEqual(costRules.getBudget("key-budget"), {
    dailyLimitUsd: 12.5,
    monthlyLimitUsd: 0,
    warningThreshold: 0.8,
  });
  assert.equal(costRules.getBudget("missing-key"), null);
});

test("checkBudget reports warning and blocks when projected spend exceeds the daily cap", () => {
  costRules.setBudget("key-warning", {
    dailyLimitUsd: 10,
    warningThreshold: 0.6,
  });
  costRules.recordCost("key-warning", 5);

  const warning = costRules.checkBudget("key-warning", 1);
  const denied = costRules.checkBudget("key-warning", 6);

  assert.deepEqual(warning, {
    allowed: true,
    dailyUsed: 5,
    dailyLimit: 10,
    warningReached: true,
  });
  assert.equal(denied.allowed, false);
  assert.equal(denied.warningReached, true);
  assert.match(denied.reason, /Daily budget exceeded/);
});

test("getDailyTotal and getCostSummary split daily and monthly totals correctly", () => {
  costRules.setBudget("key-summary", {
    dailyLimitUsd: 50,
    monthlyLimitUsd: 100,
    warningThreshold: 0.75,
  });

  const now = Date.now();
  const today = now - 1_000;
  const yesterday = now - 24 * 60 * 60 * 1000;
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  domainState.saveCostEntry("key-summary", 2.5, today);
  domainState.saveCostEntry("key-summary", 1.5, yesterday);
  domainState.saveCostEntry("key-summary", 9.9, lastMonth.getTime());

  assert.equal(costRules.getDailyTotal("key-summary"), 2.5);
  assert.deepEqual(costRules.getCostSummary("key-summary"), {
    dailyTotal: 2.5,
    monthlyTotal: 4,
    totalEntries: 2,
    budget: {
      dailyLimitUsd: 50,
      monthlyLimitUsd: 100,
      warningThreshold: 0.75,
    },
  });
});

test("costRules covers DB-loaded budgets, malformed entries and storage failure fallbacks", () => {
  domainState.saveBudget("db-loaded", {
    dailyLimitUsd: 7,
    monthlyLimitUsd: 21,
    warningThreshold: 0.7,
  });
  assert.deepEqual(costRules.getBudget("db-loaded"), {
    dailyLimitUsd: 7,
    monthlyLimitUsd: 21,
    warningThreshold: 0.7,
  });

  assert.deepEqual(costRules.checkBudget("missing-budget"), {
    allowed: true,
    dailyUsed: 0,
    dailyLimit: 0,
    warningReached: false,
  });

  const db = core.getDbInstance();
  const now = Date.now();
  db.prepare("INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)").run(
    "malformed-costs",
    "2.25",
    String(now)
  );
  db.prepare("INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)").run(
    "malformed-costs",
    "not-a-number",
    now
  );
  db.prepare("INSERT INTO domain_cost_history (api_key_id, cost, timestamp) VALUES (?, ?, ?)").run(
    "malformed-costs",
    4,
    "not-a-timestamp"
  );

  assert.equal(costRules.getDailyTotal("malformed-costs"), 2.25);
  assert.deepEqual(costRules.getCostSummary("malformed-costs"), {
    dailyTotal: 2.25,
    monthlyTotal: 2.25,
    totalEntries: 1,
    budget: null,
  });

  db.exec("DROP TABLE domain_cost_history");
  assert.equal(costRules.getDailyTotal("malformed-costs"), 0);
  assert.deepEqual(costRules.getCostSummary("malformed-costs"), {
    dailyTotal: 0,
    monthlyTotal: 0,
    totalEntries: 0,
    budget: null,
  });
});
