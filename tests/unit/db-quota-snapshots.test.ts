import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-db-quota-snapshots-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const quotaSnapshotsDb = await import("../../src/lib/db/quotaSnapshots.ts");

async function resetStorage() {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("quotaSnapshots save and query rows with provider and connection filters", () => {
  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: "conn-1",
    window_key: "hourly",
    remaining_percentage: 60,
    is_exhausted: 0,
    next_reset_at: "2026-01-01T01:00:00.000Z",
    window_duration_ms: 3600000,
    raw_data: JSON.stringify({ source: "first" }),
  });
  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "anthropic",
    connection_id: "conn-2",
    window_key: "daily",
    remaining_percentage: 30,
    is_exhausted: 1,
    next_reset_at: "2026-01-02T00:00:00.000Z",
    window_duration_ms: 86400000,
    raw_data: JSON.stringify({ source: "second" }),
  });

  const openaiRows = quotaSnapshotsDb.getQuotaSnapshots({
    provider: "openai",
    connectionId: "conn-1",
    since: "2000-01-01T00:00:00.000Z",
  });

  assert.equal(openaiRows.length, 1);
  assert.equal(openaiRows[0].provider, "openai");
  assert.equal(openaiRows[0].connectionId, "conn-1");
});

test("quotaSnapshots aggregates by provider or connection and rejects invalid buckets", () => {
  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: "conn-a",
    window_key: "hourly",
    remaining_percentage: 50,
    is_exhausted: 0,
    next_reset_at: "2026-01-01T01:00:00.000Z",
    window_duration_ms: 3600000,
    raw_data: "{}",
  });
  quotaSnapshotsDb.saveQuotaSnapshot({
    provider: "openai",
    connection_id: "conn-a",
    window_key: "hourly",
    remaining_percentage: 70,
    is_exhausted: 0,
    next_reset_at: "2026-01-01T01:10:00.000Z",
    window_duration_ms: 3600000,
    raw_data: "{}",
  });

  const providerAgg = quotaSnapshotsDb.getAggregatedSnapshots({
    provider: "openai",
    since: "2000-01-01T00:00:00.000Z",
    bucketMinutes: 60,
  });
  const connectionAgg = quotaSnapshotsDb.getAggregatedSnapshots({
    since: "2000-01-01T00:00:00.000Z",
    bucketMinutes: 60,
    aggregateBy: "connection",
  });

  assert.equal(providerAgg.length, 1);
  assert.equal(providerAgg[0].remainingPct, 60);
  assert.equal(connectionAgg[0].provider, "openai:conn-a");

  assert.throws(
    () =>
      quotaSnapshotsDb.getAggregatedSnapshots({
        since: "2000-01-01T00:00:00.000Z",
        bucketMinutes: 0,
      }),
    /Invalid bucket size/
  );
});

test("quotaSnapshots cleanup removes old rows and throttles repeated execution", () => {
  const db = coreDb.getDbInstance();
  db.prepare(
    `
    INSERT INTO quota_snapshots
    (provider, connection_id, window_key, remaining_percentage, is_exhausted, next_reset_at, window_duration_ms, raw_data, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    "openai",
    "old-conn",
    "hourly",
    20,
    1,
    "2000-01-01T01:00:00.000Z",
    3600000,
    "{}",
    "2000-01-01T00:00:00.000Z"
  );

  const deleted = quotaSnapshotsDb.cleanupOldSnapshots(1);
  const throttled = quotaSnapshotsDb.cleanupOldSnapshots(1);

  assert.equal(deleted, 1);
  assert.equal(throttled, 0);
});
