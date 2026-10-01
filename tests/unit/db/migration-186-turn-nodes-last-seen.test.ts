// #13973: the 6h retention sweep filters conversation_turn_nodes on
// last_seen_at, which had no index — every cleanup batch full-scanned the
// table. Migration 186 (landed via #14567) adds idx_turn_nodes_last_seen.
// This pins the migration and asserts the retention predicate actually uses
// the index (EXPLAIN QUERY PLAN), per review of #14772.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Database from "better-sqlite3";

const repoMigrations = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/lib/db/migrations"
);
const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-186-"));
fs.copyFileSync(
  path.join(repoMigrations, "186_conversation_turn_nodes_last_seen_index.sql"),
  path.join(migrationsDir, "186_conversation_turn_nodes_last_seen_index.sql")
);
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

const { runMigrations } = await import("../../../src/lib/db/migrationRunner.ts");

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

function openDb(): Database.Database {
  const db = new Database(":memory:");
  db.exec(
    `CREATE TABLE conversation_turn_nodes (
       id TEXT PRIMARY KEY,
       conversation_id TEXT NOT NULL,
       parent_id TEXT,
       role TEXT NOT NULL,
       content_hash TEXT NOT NULL DEFAULT '',
       last_correlation_id TEXT,
       first_seen_at TEXT NOT NULL,
       last_seen_at TEXT NOT NULL
     );`
  );
  return db;
}

function indexes(db: Database.Database): string[] {
  return (
    db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'conversation_turn_nodes'"
      )
      .all() as Array<{ name: string }>
  ).map((row) => row.name);
}

test("migration 186 creates idx_turn_nodes_last_seen and a second run is a no-op", () => {
  const db = openDb();
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 1);
    assert.ok(indexes(db).includes("idx_turn_nodes_last_seen"));
    assert.equal(runMigrations(db, { isNewDb: true }), 0);
    assert.deepEqual(db.prepare("SELECT version, name FROM _omniroute_migrations").all(), [
      { version: "186", name: "conversation_turn_nodes_last_seen_index" },
    ]);
  } finally {
    db.close();
  }
});

test("the retention predicate uses the index (no full scan)", () => {
  const db = openDb();
  try {
    assert.equal(runMigrations(db, { isNewDb: true }), 1);
    // Seed enough rows that the planner prefers the index over a scan: half
    // older than the cutoff (would be swept), half newer.
    const insert = db.prepare(
      "INSERT INTO conversation_turn_nodes (id, conversation_id, role, content_hash, first_seen_at, last_seen_at) VALUES (?, ?, 'user', 'h', '2026-01-01T00:00:00.000Z', ?)"
    );
    for (let i = 0; i < 500; i++) {
      const day = String((i % 28) + 1).padStart(2, "0");
      const month = i < 250 ? "05" : "09"; // half before, half after 2026-06-01
      insert.run(`n${i}`, `c${i % 10}`, `2026-${month}-${day}T00:00:00.000Z`);
    }
    const plan = db
      .prepare(
        "EXPLAIN QUERY PLAN SELECT rowid FROM conversation_turn_nodes WHERE last_seen_at < ? LIMIT 100"
      )
      .all("2026-06-01T00:00:00.000Z") as Array<{ detail: string }>;
    assert.ok(
      plan.some((row) => row.detail.includes("idx_turn_nodes_last_seen")),
      `expected index use, got: ${JSON.stringify(plan)}`
    );
  } finally {
    db.close();
  }
});
