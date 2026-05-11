import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-settings-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");
const databaseSettingsRoute = await import("../../src/app/api/settings/database/route.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const aggregateHistory = await import("../../src/lib/usage/aggregateHistory.ts");

type CountRow = {
  count: number;
};

type UsageSummaryRow = {
  total_requests: number;
  total_input_tokens: number;
  total_output_tokens: number;
  total_cost: number;
};

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeJsonRequest(method: string, body?: unknown): Request {
  return new Request("http://localhost/api/settings/database", {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  resetStorage();
});

test("database settings route returns mapped stats and persists editable sections", async () => {
  const current = databaseSettings.getUserDatabaseSettings();
  const response = await databaseSettingsRoute.PATCH(
    makeJsonRequest("PATCH", {
      retention: { ...current.retention, callLogs: 12, autoCleanupEnabled: false },
      aggregation: { ...current.aggregation, enabled: false, rawDataRetentionDays: 8 },
    }) as never
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.retention.callLogs, 12);
  assert.equal(body.aggregation.rawDataRetentionDays, 8);
  assert.equal(typeof body.location.databasePath, "string");
  assert.equal(typeof body.location.dataDir, "string");
  assert.equal(typeof body.location.walSizeBytes, "number");
  assert.equal(typeof body.stats.databaseSizeBytes, "number");
  assert.equal(typeof body.stats.pageCount, "number");
  assert.equal(typeof body.stats.freelistCount, "number");

  const db = core.getDbInstance();
  const stored = db
    .prepare(
      "SELECT value FROM key_value WHERE namespace = 'databaseSettings' AND key = 'retention.callLogs'"
    )
    .get() as { value: string } | undefined;
  assert.equal(JSON.parse(stored?.value ?? "null"), 12);

  const getResponse = await databaseSettingsRoute.GET(makeJsonRequest("GET") as never);
  const getBody = await getResponse.json();

  assert.equal(getResponse.status, 200);
  assert.equal(getBody.retention.callLogs, 12);
  assert.equal(getBody.aggregation.rawDataRetentionDays, 8);
});

test("database settings reader supports legacy flat keys and lets nested saves win", () => {
  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('databaseSettings', ?, ?)"
  ).run("callLogs", JSON.stringify(99));

  assert.equal(databaseSettings.getUserDatabaseSettings().retention.callLogs, 99);

  databaseSettings.updateDatabaseSettings({
    retention: {
      ...databaseSettings.getUserDatabaseSettings().retention,
      callLogs: 7,
    },
  });

  assert.equal(databaseSettings.getUserDatabaseSettings().retention.callLogs, 7);
});

test("purgeDetailedLogs deletes request_detail_logs", async () => {
  const db = core.getDbInstance();
  db.prepare("INSERT INTO request_detail_logs (id, timestamp, duration_ms) VALUES (?, ?, ?)").run(
    "detail-1",
    new Date().toISOString(),
    10
  );
  db.prepare("INSERT INTO request_detail_logs (id, timestamp, duration_ms) VALUES (?, ?, ?)").run(
    "detail-2",
    new Date().toISOString(),
    20
  );

  const result = await cleanup.purgeDetailedLogs();

  assert.equal(result.errors, 0);
  assert.equal(result.deleted, 2);
  assert.equal(
    (db.prepare("SELECT COUNT(*) AS count FROM request_detail_logs").get() as CountRow).count,
    0
  );
});

test("usage aggregation upserts replace recomputed totals instead of adding them twice", async () => {
  const db = core.getDbInstance();
  const insertSnapshot = db.prepare(
    `INSERT INTO quota_snapshots
       (provider, connection_id, window_key, remaining_percentage, is_exhausted, raw_data, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );

  insertSnapshot.run(
    "openai",
    "conn-1",
    "daily",
    90,
    0,
    JSON.stringify({ model: "gpt-test", input_tokens: 10, output_tokens: 4, cost: 0.25 }),
    "2026-05-01 10:15:00"
  );
  insertSnapshot.run(
    "openai",
    "conn-1",
    "daily",
    80,
    0,
    JSON.stringify({ model: "gpt-test", input_tokens: 20, output_tokens: 6, cost: 0.5 }),
    "2026-05-01 10:45:00"
  );

  await aggregateHistory.rollupDailyUsage("2026-05-01", "2026-05-01");
  await aggregateHistory.rollupDailyUsage("2026-05-01", "2026-05-01");
  await aggregateHistory.rollupHourlyQuota("2026-05-01 10:00:00", "2026-05-01 10:59:59");
  await aggregateHistory.rollupHourlyQuota("2026-05-01 10:00:00", "2026-05-01 10:59:59");

  const daily = db.prepare("SELECT * FROM daily_usage_summary").get() as UsageSummaryRow;
  const hourly = db.prepare("SELECT * FROM hourly_usage_summary").get() as UsageSummaryRow;

  assert.equal(daily.total_requests, 2);
  assert.equal(daily.total_input_tokens, 30);
  assert.equal(daily.total_output_tokens, 10);
  assert.equal(daily.total_cost, 0.75);
  assert.equal(hourly.total_requests, 2);
  assert.equal(hourly.total_input_tokens, 30);
  assert.equal(hourly.total_output_tokens, 10);
  assert.equal(hourly.total_cost, 0.75);
});
