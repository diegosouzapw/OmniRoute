import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-history-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");

const clearPendingRequests = usageHistory.clearPendingRequests;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  clearPendingRequests();
}

async function seedUsageEntries(
  entries: Array<{
    provider: string;
    model: string;
    connectionId?: string;
    tokens: { input?: number; output?: number };
    success?: boolean;
    latencyMs?: number;
    minutesAgo?: number;
  }>
) {
  for (const [i, e] of entries.entries()) {
    await usageHistory.saveRequestUsage({
      provider: e.provider,
      model: e.model,
      connectionId: e.connectionId || `conn-${i}`,
      apiKeyId: `key-${i}`,
      apiKeyName: `Key ${i}`,
      tokens: e.tokens,
      success: e.success !== false,
      latencyMs: e.latencyMs || 100,
      timestamp: new Date(Date.now() - (e.minutesAgo || i) * 60 * 1000).toISOString(),
    });
  }
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ──────────────── getUsageDb ────────────────

test("getUsageDb returns all rows up to MAX_ROWS limit in ASC order", async () => {
  // Save 12 entries (limit is 10000, so all should return)
  const entries = Array.from({ length: 12 }, (_, i) => ({
    provider: `prov-${i}`,
    model: `model-${i}`,
    tokens: { input: i * 10, output: i },
    success: true,
    minutesAgo: i,
  }));
  await seedUsageEntries(entries);

  const result = await usageHistory.getUsageDb();

  assert.equal(result.data.history.length, 12);
  assert.equal(result.data.history[0].provider, "prov-11");
  assert.equal(result.data.history[11].provider, "prov-0");
  assert.equal(result.data.nextCursor, null); // No next cursor (didn't hit limit)
});

test("getUsageDb filters by sinceIso date", async () => {
  const entries = [
    { provider: "old", model: "m", tokens: { input: 10 }, minutesAgo: 120 },
    { provider: "new", model: "m", tokens: { input: 20 }, minutesAgo: 1 },
  ];
  await seedUsageEntries(entries);

  const cutoff = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const result = await usageHistory.getUsageDb(cutoff);

  assert.equal(result.data.history.length, 1);
  assert.equal(result.data.history[0].provider, "new");
});

test("getUsageDb provides nextCursor when rows exceed MAX_ROWS", async () => {
  const db = core.getDbInstance();
  // Insert exactly MAX_ROWS + 1 = 10001 rows so getUsageDb returns a cursor
  for (let i = 0; i < 10001; i++) {
    db.prepare(
      `INSERT INTO usage_history (provider, model, timestamp, tokens_input, tokens_output, success, latency_ms)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(`prov-${i}`, `model-${i}`, new Date(Date.now() - i * 1000).toISOString(), 10, 5, 1, 100);
  }

  const result = await usageHistory.getUsageDb();

  assert.equal(result.data.history.length, 10000);
  assert.notEqual(result.data.nextCursor, null);
});

test("getUsageDb cursor-based pagination fetches subsequent pages", async () => {
  const entries = Array.from({ length: 5 }, (_, i) => ({
    provider: `prov-${i}`,
    model: `model-${i}`,
    tokens: { input: 10 },
    success: true,
    minutesAgo: i,
  }));
  await seedUsageEntries(entries);

  // First page (limit=2)
  const page1 = await usageHistory.getUsageDb(undefined, 2);
  assert.equal(page1.data.history.length, 2);
  assert.notEqual(page1.data.nextCursor, null);
});
