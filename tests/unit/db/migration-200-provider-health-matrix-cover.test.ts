// The provider health matrix ranks recent call log targets with two ROW_NUMBER()
// windows, which scanned call_logs without a covering index. Migration 200 adds
// idx_cl_health_matrix_cover. This pins the migration and asserts the ranked
// query actually uses the index (EXPLAIN QUERY PLAN).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { SqliteAdapter } from "../../../src/lib/db/adapters/types.ts";
import { openMemorySqliteAdapter } from "../_helpers/memorySqliteAdapter.ts";

const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/lib/db/migrations"
);
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-200-"));
fs.copyFileSync(
  path.join(repoMigrations, "200_provider_health_matrix_covering_index.sql"),
  path.join(migrationsDir, "200_provider_health_matrix_covering_index.sql")
);
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

// Minimal call_logs shape the ranked query reads: same columns and order the
// production reader projects (provider, connection, model, timestamp).
function openDb(): SqliteAdapter {
  const db = openMemorySqliteAdapter();
  db.exec(
    `CREATE TABLE call_logs (
       id TEXT PRIMARY KEY,
       timestamp TEXT NOT NULL,
       status INTEGER,
       model TEXT,
       requested_model TEXT,
       provider TEXT,
       connection_id TEXT,
       duration INTEGER DEFAULT 0,
       error_summary TEXT
     );`
  );
  return db;
}

function seedCallLogs(db: SqliteAdapter, rows: number): void {
  const insert = db.prepare(
    `INSERT INTO call_logs
       (id, timestamp, status, model, requested_model, provider, connection_id, duration, error_summary)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const providers = ["openai", "anthropic", "gemini", "deepseek"];
  const connections = ["conn-a", "conn-b", "conn-c", "conn-d", "conn-e"];
  const models = [
    "model-alpha",
    "model-beta",
    "model-gamma",
    "model-delta",
    "model-epsilon",
    "model-zeta",
  ];
  for (let i = 0; i < rows; i++) {
    const provider = providers[i % providers.length];
    const connection = connections[i % connections.length];
    const model = models[i % models.length];
    const recent = i % 5 !== 0;
    const day = recent ? "15" : "01";
    const hour = String(i % 24).padStart(2, "0");
    const failed = i % 7 === 0;
    insert.run(
      `call-${i}`,
      `2026-09-${day}T${hour}:00:00.000Z`,
      failed ? 503 : 200,
      i % 11 === 0 ? null : model,
      model,
      provider,
      connection,
      100 + (i % 900),
      failed ? "upstream gateway error" : null
    );
  }
  db.exec("ANALYZE;");
}

const RANKED_QUERY = `WITH log_targets AS (
  SELECT
    c.provider,
    COALESCE(c.connection_id, '') as connectionId,
    COALESCE(c.model, c.requested_model, 'unknown') as model,
    c.status,
    c.duration,
    c.timestamp,
    c.id,
    c.error_summary
  FROM call_logs c
  WHERE c.provider IS NOT NULL
    AND c.provider != '-'
    AND c.timestamp >= :cutoff
), ranked AS (
  SELECT
    provider,
    connectionId,
    model,
    status,
    duration,
    timestamp,
    CASE
      WHEN (status IS NOT NULL AND (status < 200 OR status >= 400))
        OR error_summary IS NOT NULL
      THEN 1
      ELSE 0
    END as isError,
    ROW_NUMBER() OVER (
      PARTITION BY provider, connectionId, model
      ORDER BY timestamp DESC, id DESC
    ) as latestRank,
    ROW_NUMBER() OVER (
      PARTITION BY provider, connectionId, model,
        CASE
          WHEN (status IS NOT NULL AND (status < 200 OR status >= 400))
            OR error_summary IS NOT NULL
          THEN 1
          ELSE 0
        END
      ORDER BY timestamp DESC, id DESC
    ) as errorRank
  FROM log_targets
)
SELECT
  provider,
  connectionId,
  model,
  COUNT(*) as requests,
  SUM(CASE WHEN status >= 200 AND status < 400 THEN 1 ELSE 0 END) as successes,
  ROUND(AVG(duration)) as avgLatencyMs,
  MAX(timestamp) as lastRequestAt,
  MAX(
    CASE
      WHEN isError = 1
      THEN timestamp
      ELSE NULL
    END
  ) as lastErrorAt,
  MAX(CASE WHEN latestRank = 1 THEN status ELSE NULL END) as lastStatus,
  MAX(CASE WHEN isError = 1 AND errorRank = 1 THEN status ELSE NULL END) as lastErrorStatus
FROM ranked
GROUP BY provider, connectionId, model`;

const FILTERED_QUERY = RANKED_QUERY.replace(
  "AND c.timestamp >= :cutoff",
  "AND c.timestamp >= :cutoff\n    AND c.provider = :provider"
);

function explain(db: SqliteAdapter, sql: string, params: Record<string, string>): string {
  return (db.prepare(`EXPLAIN QUERY PLAN ${sql}`).all(params) as Array<{ detail: string }>)
    .map((row) => row.detail)
    .join(" | ");
}

test("migration 200 creates idx_cl_health_matrix_cover and a second run is a no-op", () => {
  const db = openDb();
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 1);
    const names = (
      db.prepare("SELECT name FROM sqlite_master WHERE type = 'index'").all() as Array<{
        name: string;
      }>
    ).map((row) => row.name);
    assert.ok(names.includes("idx_cl_health_matrix_cover"));
    assert.equal(runMigrations(db, { isNewDb: true }), 0);
    assert.deepEqual(db.prepare("SELECT version, name FROM _omniroute_migrations").all(), [
      { version: "200", name: "provider_health_matrix_covering_index" },
    ]);
  } finally {
    db.close();
  }
});

test("the ranked health query seeks the covering index instead of scanning", () => {
  const db = openDb();
  try {
    runMigrations(db, { isNewDb: true });
    seedCallLogs(db, 2000);
    const cutoff = "2026-09-10T00:00:00.000Z";
    const plan = explain(db, RANKED_QUERY, { cutoff });
    assert.ok(
      plan.includes("idx_cl_health_matrix_cover"),
      `expected covering index use, got: ${plan}`
    );
    assert.ok(plan.includes("COVERING"), `expected a covering plan, got: ${plan}`);
    assert.ok(
      !plan.includes("SCAN call_logs") && !plan.includes("SCAN c"),
      `must not scan call_logs, got: ${plan}`
    );
    const filtered = explain(db, FILTERED_QUERY, { cutoff, provider: "openai" });
    assert.ok(
      filtered.includes("idx_cl_health_matrix_cover"),
      `expected covering index use when filtered, got: ${filtered}`
    );
  } finally {
    db.close();
  }
});
