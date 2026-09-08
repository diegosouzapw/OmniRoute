import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-logs-stats-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const stats = await import("../../../src/lib/db/callLogStats.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("getFallbackStats on empty DB returns zeros, not nulls", () => {
  core.getDbInstance(); // plays SCHEMA + runMigrations on the file DB
  const row = stats.getFallbackStats("", {});
  assert.deepEqual(row, {
    total: 0,
    with_requested: 0,
    fallback_eligible: 0,
    fallbacks: 0,
  });
});

test("avgLatencyMs is null when all durations are NULL, and the route propagates null", async () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO provider_connections (id, provider, created_at, updated_at)
     VALUES ('conn-1', 'openai', ?, ?)`
  ).run(now, now);
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, provider, status, duration)
     VALUES ('log-1', ?, 'openai', 200, NULL)`
  ).run(now);

  const { toNumberOrNull } = await import("../../../src/shared/utils/numeric.ts");
  const rows = stats.getProviderMetrics();
  assert.equal(rows.length, 1);
  // Lib-level: passes before AND after (the driver already returns null — only
  // the TS type lied). Kept as documentation, not as red/green proof.
  assert.equal(toNumberOrNull(rows[0].avgLatencyMs), null);

  const { GET } = await import("../../../src/app/api/provider-metrics/route.ts");
  const res = await GET();
  const body = (await res.json()) as {
    metrics: Record<string, { avgLatencyMs: number | null }>;
  };
  // Route-level: THIS is the red/green proof (toNumber(null) → 0 before fix).
  assert.equal(body.metrics["openai"].avgLatencyMs, null);
});

test("error_type NULL splits into pre_migration vs unclassified by timestamp", () => {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO provider_connections (id, provider, created_at, updated_at)
     VALUES ('conn-1', 'openai', ?, ?)`
  ).run(now, now);
  db.prepare(
    `INSERT INTO call_logs (id, timestamp, provider, status, error_type)
     VALUES ('old-1', '2026-08-01T00:00:00.000Z', 'openai', 500, NULL),
            ('new-1', ?, 'openai', 500, NULL)`
  ).run(now);

  const breakdown = stats.getErrorTypeBreakdown("", {});
  const byType = new Map(breakdown.map((b) => [b.errorType, b.count]));
  assert.equal(byType.get("pre_migration"), 1);
  assert.equal(byType.get("unclassified"), 1);
});

test("migration 174 creates provider GROUP BY indexes used by search stats", () => {
  const db = core.getDbInstance();

  const names = (
    db.prepare("SELECT name FROM sqlite_master WHERE type = 'index'").all() as Array<{
      name: string;
    }>
  ).map((r) => r.name);
  assert.ok(
    names.includes("idx_cl_provider_timestamp"),
    "idx_cl_provider_timestamp must exist after migrations"
  );
  assert.ok(
    names.includes("idx_cl_request_provider"),
    "idx_cl_request_provider must exist after migrations"
  );

  const plan = (
    db
      .prepare(
        "EXPLAIN QUERY PLAN SELECT provider, COUNT(*), AVG(duration) FROM call_logs WHERE request_type = 'search' GROUP BY provider"
      )
      .all() as Array<{ detail: string }>
  )
    .map((r) => r.detail)
    .join(" | ");
  assert.ok(
    plan.includes("USING INDEX idx_cl_request_provider"),
    `planner must use idx_cl_request_provider, got: ${plan}`
  );
  assert.ok(!plan.includes("SCAN TABLE"), `must not table-scan, got: ${plan}`);
});
