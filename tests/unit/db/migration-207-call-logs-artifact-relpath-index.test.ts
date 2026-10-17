// The call-log rotation clears one row per deleted artifact, which scanned
// call_logs on every lookup. Migration 207 adds idx_cl_artifact_relpath.
// This pins the migration and asserts both readers use the index
// (EXPLAIN QUERY PLAN), plus the functional clear-then-read behavior.
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
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-207-artifact-"));
fs.copyFileSync(
  path.join(repoMigrations, "207_call_logs_artifact_relpath_index.sql"),
  path.join(migrationsDir, "207_call_logs_artifact_relpath_index.sql")
);
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

// Minimal call_logs shape the two readers touch: same columns and order the
// production writer stores (id, timestamp, status, detail_state,
// artifact_relpath, artifact_size_bytes, artifact_sha256).
function openDb(): SqliteAdapter {
  const db = openMemorySqliteAdapter();
  db.exec(
    `CREATE TABLE call_logs (
       id TEXT PRIMARY KEY,
       timestamp TEXT NOT NULL,
       status INTEGER,
       detail_state TEXT DEFAULT 'none',
       artifact_relpath TEXT,
       artifact_size_bytes INTEGER DEFAULT NULL,
       artifact_sha256 TEXT DEFAULT NULL
     );`
  );
  return db;
}

function seedCallLogs(db: SqliteAdapter): void {
  const insert = db.prepare(
    `INSERT INTO call_logs
       (id, timestamp, status, detail_state, artifact_relpath, artifact_size_bytes, artifact_sha256)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  );
  insert.run(
    "log-with-artifact",
    "2026-10-01T00:00:00.000Z",
    200,
    "ready",
    "artifacts/a.bin",
    12,
    "aaa"
  );
  insert.run(
    "log-other-artifact",
    "2026-10-01T01:00:00.000Z",
    200,
    "ready",
    "artifacts/b.bin",
    34,
    "bbb"
  );
  insert.run("log-without-artifact", "2026-10-01T02:00:00.000Z", 200, "none", null, null, null);
  insert.run("log-empty-path", "2026-10-01T03:00:00.000Z", 200, "ready", "", 0, "ccc");
}

// Exact statement text of clearArtifactReference
// (src/lib/usage/callLogRotation.ts): UPDATE by artifact path.
const CLEAR_REFERENCE_SQL = `UPDATE call_logs
      SET detail_state = ?,
          artifact_relpath = NULL,
          artifact_size_bytes = NULL,
          artifact_sha256 = NULL
      WHERE artifact_relpath = ?`;

// Exact statement shape of findReferencedArtifacts
// (src/lib/usage/callLogsBoundedQueries.ts): DISTINCT lookup over IN + LIMIT.
function referencedArtifactsSql(paths: string[]): string {
  const placeholders = paths.map(() => "?").join(", ");
  return `SELECT DISTINCT artifact_relpath
       FROM call_logs
       WHERE artifact_relpath IN (${placeholders})
       LIMIT ?`;
}

function explain(db: SqliteAdapter, sql: string, params: unknown[]): string {
  return (db.prepare(`EXPLAIN QUERY PLAN ${sql}`).all(...params) as Array<{ detail: string }>)
    .map((row) => row.detail)
    .join(" | ");
}

test("migration 207 creates idx_cl_artifact_relpath and a second run is a no-op", () => {
  const db = openDb();
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 1);
    const names = (
      db.prepare("SELECT name FROM sqlite_master WHERE type = 'index'").all() as Array<{
        name: string;
      }>
    ).map((row) => row.name);
    assert.ok(names.includes("idx_cl_artifact_relpath"));
    assert.equal(runMigrations(db, { isNewDb: true }), 0);
    assert.deepEqual(db.prepare("SELECT version, name FROM _omniroute_migrations").all(), [
      { version: "207", name: "call_logs_artifact_relpath_index" },
    ]);
  } finally {
    db.close();
  }
});

test("the path update and the referenced-paths lookup seek the partial index instead of scanning", () => {
  const db = openDb();
  try {
    runMigrations(db, { isNewDb: true });
    seedCallLogs(db);
    const updatePlan = explain(db, CLEAR_REFERENCE_SQL, ["missing", "artifacts/a.bin"]);
    assert.ok(
      updatePlan.includes("idx_cl_artifact_relpath"),
      `expected the partial index use, got: ${updatePlan}`
    );
    assert.ok(
      !updatePlan.includes("SCAN call_logs"),
      `must not scan call_logs, got: ${updatePlan}`
    );
    const lookupPlan = explain(db, referencedArtifactsSql(["artifacts/a.bin", "artifacts/b.bin"]), [
      "artifacts/a.bin",
      "artifacts/b.bin",
      2,
    ]);
    assert.ok(
      lookupPlan.includes("idx_cl_artifact_relpath"),
      `expected the partial index use, got: ${lookupPlan}`
    );
    assert.ok(
      !lookupPlan.includes("SCAN call_logs"),
      `must not scan call_logs, got: ${lookupPlan}`
    );
  } finally {
    db.close();
  }
});

test("clearing an artifact reference removes it as today", () => {
  const db = openDb();
  try {
    runMigrations(db, { isNewDb: true });
    seedCallLogs(db);
    const changed = db.prepare(CLEAR_REFERENCE_SQL).run("missing", "artifacts/a.bin") as unknown as
      { changes: number } | number;
    const changes = typeof changed === "number" ? changed : changed.changes;
    assert.equal(changes, 1);
    assert.deepEqual(
      db
        .prepare(
          "SELECT detail_state, artifact_relpath, artifact_size_bytes, artifact_sha256 FROM call_logs WHERE id = ?"
        )
        .all("log-with-artifact"),
      [
        {
          detail_state: "missing",
          artifact_relpath: null,
          artifact_size_bytes: null,
          artifact_sha256: null,
        },
      ]
    );
    const untouched = db
      .prepare(CLEAR_REFERENCE_SQL)
      .run("missing", "artifacts/unknown.bin") as unknown as { changes: number } | number;
    assert.equal(typeof untouched === "number" ? untouched : untouched.changes, 0);
  } finally {
    db.close();
  }
});
