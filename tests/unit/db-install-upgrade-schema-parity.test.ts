// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test opens a real SQLite database through `src/lib/db/core.ts`. better-sqlite3 is a
// native addon; production and CI load it normally, but some sandboxes ship a system glibc
// older than the prebuilt binary requires ("GLIBC_2.29 not found"), in which case the
// runtime cascades to node:sqlite/sql.js. See tests/unit/_helpers/betterSqlite3Availability.ts.
//
// WHY THIS FILE EXISTS
// --------------------
// `npm run check:install-upgrade` (scripts/check/check-install-upgrade.mjs) proves that a
// CLEAN install and an UPGRADE converge on the same schema, but it costs a full `npm pack`
// plus three global installs and three boots (~17 min in CI) and it can only ever run at
// publish time, against an already-published previous version. It is not a development
// feedback loop, and the v3.8.50 publish run is what proved it: the gate reported 15
// "missing" tables, and the deterministic half of that verdict was never checkable locally.
//
// This file pins the deterministic half in milliseconds:
//
//   1. Every migration file on disk is actually reachable by the runner on a fresh install.
//      A file the runner never applies is a table no user ever gets.
//   2. `model_capabilities` is created by the MIGRATION SET, not lazily at runtime.
//      A table created on demand by `CREATE TABLE IF NOT EXISTS` inside a feature code
//      path exists or not depending on whether that feature happened to run before the
//      snapshot — so it diverges between the two install paths by TIMING, not by schema.
//      That is precisely how `model_capabilities` surfaced as a divergence on the v3.8.50
//      publish run (present in the upgraded database, absent from the clean one).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const MIGRATIONS_DIR = path.join(REPO_ROOT, "src", "lib", "db", "migrations");

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-install-upgrade-parity-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");

// A clean install: core.ts applies the inline SCHEMA_SQL, the `ensure*Columns()` helpers,
// then runMigrations(). This is the exact code path Phase A of the gate exercises.
const db = core.getDbInstance();

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {
    /* best effort */
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function migrationFiles(): Array<{ version: string; name: string }> {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .sort()
    .map((file) => /^(\d{3,})_(.+)\.sql$/.exec(file))
    .filter((m): m is RegExpExecArray => m !== null)
    .map((m) => ({ version: m[1], name: m[2] }));
}

function hasTable(name: string): boolean {
  return Boolean(
    db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?").get(name)
  );
}

test("a clean install applies every migration file on disk", () => {
  const ledger = new Set(
    (
      db.prepare("SELECT version FROM _omniroute_migrations").all() as Array<{ version: string }>
    ).map((row) => row.version)
  );
  const unapplied = migrationFiles()
    .filter((m) => !ledger.has(m.version))
    .map((m) => `${m.version}_${m.name}`);
  assert.deepEqual(
    unapplied,
    [],
    "migration files the runner never applied — an upgrade would not create their tables either"
  );
});

test("model_capabilities comes from the migration set, not from a lazy runtime CREATE", () => {
  assert.ok(
    hasTable("model_capabilities"),
    "model_capabilities must be created by a migration so a clean install and an upgrade " +
      "converge deterministically instead of depending on whether the models.dev sync ran"
  );
});

test("the model_capabilities migration does not drift from ensureCapabilitiesTable()", () => {
  const source = fs.readFileSync(path.join(REPO_ROOT, "src", "lib", "modelsDevSync.ts"), "utf8");
  const ddl = /CREATE TABLE IF NOT EXISTS model_capabilities\s*\(([\s\S]*?)\n\s*\)/.exec(source);
  assert.ok(ddl, "ensureCapabilitiesTable() DDL not found in src/lib/modelsDevSync.ts");

  const runtimeColumns = ddl[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !/^PRIMARY KEY/i.test(line))
    .map((line) => line.replace(/,$/, "").split(/\s+/)[0])
    .sort();

  const migrationColumns = (
    db.prepare("PRAGMA table_info(model_capabilities)").all() as Array<{ name: string }>
  )
    .map((column) => column.name)
    .sort();

  assert.deepEqual(
    migrationColumns,
    runtimeColumns,
    "the migration and the runtime helper must create the same columns — a drift here means " +
      "an upgraded database keeps the old shape while a clean install gets the new one"
  );
});
