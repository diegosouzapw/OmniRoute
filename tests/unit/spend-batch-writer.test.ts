import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-spend-batch-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const costRules = await import("../../src/domain/costRules.ts");
const domainState = await import("../../src/lib/db/domainState.ts");
const { SpendBatchWriter, flushSpendBatchWriter, resetSpendBatchWriterForTests } =
  await import("../../src/lib/spend/batchWriter.ts");

function quietLogger() {
  return {
    log() {},
    error() {},
  };
}

async function resetStorage() {
  resetSpendBatchWriterForTests();
  costRules.resetCostData();
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function waitFor(fn: () => boolean, timeoutMs = 1_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (fn()) return;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  throw new Error("Timed out waiting for condition");
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  resetSpendBatchWriterForTests();
  costRules.resetCostData();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("spend batch writer auto-flushes at the configured threshold", async () => {
  const persisted: Array<{ apiKeyId: string; cost: number; timestamp: number }> = [];
  const writer = new SpendBatchWriter({
    maxBufferSize: 2,
    persistEntries: async (entries) => {
      persisted.push(...entries);
    },
    logger: quietLogger(),
  });

  writer.increment("key-a", 1.25, 100);
  writer.increment("key-b", 2.75, 200);

  await waitFor(() => persisted.length === 2);

  assert.deepEqual(persisted, [
    { apiKeyId: "key-a", cost: 1.25, timestamp: 100 },
    { apiKeyId: "key-b", cost: 2.75, timestamp: 200 },
  ]);

  await writer.stop();
});

test("spend batch writer requeues failed flushes and flushes pending entries on stop", async () => {
  const persisted: Array<{ apiKeyId: string; cost: number; timestamp: number }> = [];
  let shouldFail = true;

  const writer = new SpendBatchWriter({
    persistEntries: async (entries) => {
      if (shouldFail) {
        shouldFail = false;
        throw new Error("database temporarily unavailable");
      }
      persisted.push(...entries);
    },
    logger: quietLogger(),
  });

  writer.increment("key-a", 1.5, 111);
  writer.increment("key-b", 2.5, 222);

  const failed = await writer.flush();
  assert.equal(failed.requeued, true);
  assert.equal(writer.getPendingCostTotal("key-a", 0), 1.5);
  assert.equal(writer.getPendingCostTotal("key-b", 0), 2.5);

  const stopped = await writer.stop();
  assert.equal(stopped.requeued, false);
  assert.equal(stopped.flushedEntries, 2);
  assert.equal(writer.getPendingCostTotal("key-a", 0), 0);
  assert.equal(writer.getPendingCostTotal("key-b", 0), 0);
  assert.deepEqual(persisted, [
    { apiKeyId: "key-a", cost: 1.5, timestamp: 111 },
    { apiKeyId: "key-b", cost: 2.5, timestamp: 222 },
  ]);
});

test("recordCost buffers writes while budget checks and summaries still see pending spend", async () => {
  costRules.setBudget("key-live", { dailyLimitUsd: 5 });
  costRules.recordCost("key-live", 3.5);
  costRules.recordCost("key-live", 1.0);

  assert.deepEqual(domainState.loadCostEntries("key-live", 0), []);
  assert.equal(costRules.getDailyTotal("key-live"), 4.5);
  assert.equal(costRules.getCostSummary("key-live").dailyTotal, 4.5);
  assert.equal(costRules.checkBudget("key-live", 0).periodUsed, 4.5);
  assert.equal(costRules.checkBudget("key-live", 1).allowed, false);

  const flushResult = await flushSpendBatchWriter();
  assert.equal(flushResult.flushedEntries, 2);

  const persistedEntries = domainState.loadCostEntries("key-live", 0);
  assert.equal(persistedEntries.length, 2);
  assert.equal(costRules.getDailyTotal("key-live"), 4.5);
});

test("deleteBudget discards pending spend before it reaches the database", async () => {
  costRules.setBudget("key-drop", { dailyLimitUsd: 10 });
  costRules.recordCost("key-drop", 2);
  costRules.deleteBudget("key-drop");

  const flushResult = await flushSpendBatchWriter();
  assert.equal(flushResult.flushedEntries, 0);
  assert.deepEqual(domainState.loadCostEntries("key-drop", 0), []);
});
