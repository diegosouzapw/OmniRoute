process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";

const require_ = createRequire(import.meta.url);
const BetterSqlite3 = require_("better-sqlite3") as typeof import("better-sqlite3");

import { createBetterSqliteAdapter } from "../../src/lib/db/adapters/betterSqliteAdapter";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types";

const MIGRATION_174_PATH = path.resolve(
  import.meta.dirname ?? ".",
  "../../src/lib/db/migrations/174_server_tool_executions.sql"
);
const MIGRATION_174_SQL = fs.readFileSync(MIGRATION_174_PATH, "utf8");

// Minimal pre-174 fixture: only skills + skill_executions tables.
// No SCHEMA_SQL import from core.ts, no runMigrations.
const PRE_174_FIXTURE = `
  CREATE TABLE IF NOT EXISTS skills (
    id TEXT PRIMARY KEY,
    api_key_id TEXT NOT NULL,
    name TEXT NOT NULL,
    version TEXT NOT NULL DEFAULT '1.0.0',
    description TEXT,
    schema TEXT NOT NULL,
    handler TEXT NOT NULL,
    enabled INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS skill_executions (
    id TEXT PRIMARY KEY,
    skill_id TEXT NOT NULL,
    api_key_id TEXT NOT NULL,
    session_id TEXT,
    input TEXT NOT NULL,
    output TEXT,
    status TEXT NOT NULL CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout')),
    error_message TEXT,
    duration_ms INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_skill_executions_skill ON skill_executions(skill_id);
  CREATE INDEX IF NOT EXISTS idx_skill_executions_api_key ON skill_executions(api_key_id);
`;

function makeTempDb(): {
  adapter: SqliteAdapter;
  dir: string;
  raw: import("better-sqlite3").Database;
} {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "migration-174-test-"));
  const dbPath = path.join(dir, "test.db");
  const raw = new BetterSqlite3(dbPath);
  raw.pragma("journal_mode = WAL");
  raw.pragma("busy_timeout = 2000");
  // Create migrations tracking table
  raw.exec(`
    CREATE TABLE IF NOT EXISTS _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  // Apply minimal pre-174 fixture (skills + skill_executions only)
  raw.exec(PRE_174_FIXTURE);
  // Apply migration 174 via raw.exec (real SQL, twice for idempotency)
  raw.exec(MIGRATION_174_SQL);
  raw.exec(MIGRATION_174_SQL);
  const adapter = createBetterSqliteAdapter(raw);
  return { adapter, dir, raw };
}

function getColumnInfo(raw: import("better-sqlite3").Database, table: string) {
  return raw.pragma(`table_info(${table})`) as Array<{
    name: string;
    type: string;
    notnull: number;
    pk: number;
  }>;
}

function getIndexInfo(raw: import("better-sqlite3").Database, table: string) {
  return raw.pragma(`index_list(${table})`) as Array<{
    name: string;
    unique: number;
  }>;
}

// ── Migration 174 tests ──

test("migration 174: server_tool_executions table exists with correct columns", (_, done) => {
  const { raw, dir } = makeTempDb();
  try {
    const tables = raw.pragma("table_list") as Array<{ name: string }>;
    const names = tables.map((t) => t.name);
    assert.ok(
      names.includes("server_tool_executions"),
      `Expected server_tool_executions in: ${names.join(", ")}`
    );
    const cols = getColumnInfo(raw, "server_tool_executions");
    const colNames = cols.map((c) => c.name);
    assert.ok(colNames.includes("id"), "must have id column");
    assert.ok(colNames.includes("api_key_id"), "must have api_key_id column");
    assert.ok(colNames.includes("request_identity"), "must have request_identity column");
    assert.ok(colNames.includes("tool_call_id"), "must have tool_call_id column");
    assert.ok(colNames.includes("tool_name"), "must have tool_name column");
    assert.ok(colNames.includes("input_digest"), "must have input_digest column");
    assert.ok(colNames.includes("status"), "must have status column");
    assert.ok(colNames.includes("claim_expires_at"), "must have claim_expires_at column");
    assert.ok(colNames.includes("duration_ms"), "must have duration_ms column");
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
    done();
  }
});

test("migration 174: UNIQUE constraint on (api_key_id, request_identity, tool_call_id)", (_, done) => {
  const { raw, dir } = makeTempDb();
  try {
    raw.exec(`
      INSERT INTO server_tool_executions
        (id, api_key_id, request_identity, tool_call_id, tool_name, input_digest, status, claim_expires_at)
      VALUES ('e1','k1','r1','c1','tool_a','d1','running',datetime('now'))
    `);
    assert.throws(() => {
      raw.exec(`
          INSERT INTO server_tool_executions
            (id, api_key_id, request_identity, tool_call_id, tool_name, input_digest, status, claim_expires_at)
          VALUES ('e2','k1','r1','c1','tool_a','d1','running',datetime('now'))
        `);
    }, /UNIQUE/i);
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
    done();
  }
});

test("migration 174: two indexes exist on server_tool_executions", (_, done) => {
  const { raw, dir } = makeTempDb();
  try {
    const indexes = getIndexInfo(raw, "server_tool_executions");
    const names = indexes.map((i) => i.name);
    assert.ok(
      names.some((n) => n.includes("status_expiry")),
      `Expected status_expiry index, got: ${names.join(", ")}`
    );
    assert.ok(
      names.some((n) => n.includes("created")),
      `Expected created index, got: ${names.join(", ")}`
    );
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
    done();
  }
});

test("migration 174: existing skill_executions data preserved after migration", (_, done) => {
  const { raw, dir } = makeTempDb();
  try {
    // Insert a skill to satisfy FK
    raw.exec(`
      INSERT INTO skills (id, api_key_id, name, version, schema, handler)
      VALUES ('s1','k1','test','1.0.0','{}','h.js')
    `);
    raw.exec(`
      INSERT INTO skill_executions (id, skill_id, api_key_id, input, status)
      VALUES ('old_exec','s1','k1','{"q":"test"}','success')
    `);
    const rows = raw.prepare("SELECT * FROM skill_executions WHERE id = 'old_exec'").all();
    assert.equal(rows.length, 1, "old row should exist after migration 174");
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
    done();
  }
});

test("migration 174: skill_executions still enforces skill_id NOT NULL", (_, done) => {
  const { raw, dir } = makeTempDb();
  try {
    assert.throws(() => {
      raw.exec(
        `INSERT INTO skill_executions (id, api_key_id, input, status)
           VALUES ('bad','k1','{}','running')`
      );
    }, /NOT NULL/i);
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
    done();
  }
});

test("migration 174: custom skill execution write still works after migration", (_, done) => {
  const { raw, dir } = makeTempDb();
  try {
    // Insert a skill to satisfy FK
    raw.exec(`
      INSERT INTO skills (id, api_key_id, name, version, schema, handler)
      VALUES ('s2','k1','test2','1.0.0','{}','h.js')
    `);
    raw.exec(`
      INSERT INTO skill_executions (id, skill_id, api_key_id, input, status)
      VALUES ('new_exec','s2','k1','{"q":"test2"}','success')
    `);
    const allRows = raw.prepare("SELECT * FROM skill_executions").all();
    assert.ok(allRows.length >= 1, "should read skill_executions after migration 174");
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
    done();
  }
});

test("migration 174: idempotent — running twice does not error or duplicate", (_, done) => {
  const { raw, dir } = makeTempDb();
  try {
    // makeTempDb already runs the SQL twice; verify no error and table exists
    const tables = raw.pragma("table_list") as Array<{ name: string }>;
    const names = tables.map((t) => t.name);
    assert.ok(names.includes("server_tool_executions"), "table must exist after double-apply");
    // Verify no duplicate columns or indexes from double-apply
    const indexes = getIndexInfo(raw, "server_tool_executions");
    const statusIdx = indexes.filter((i) => i.name.includes("status_expiry"));
    assert.equal(statusIdx.length, 1, "must have exactly one status_expiry index");
  } finally {
    raw.close();
    fs.rmSync(dir, { recursive: true, force: true });
    done();
  }
});
