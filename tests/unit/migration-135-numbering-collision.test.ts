/**
 * Regression test for a migration version-numbering collision: two files,
 * 135_connection_runtime_state.sql (#9449, landed 2026-08-07) and
 * 135_migrate_model_capability_max_token.sql (#8908, landed 2026-08-05),
 * both claimed version "135" — #9449 branched before #8908 merged and never
 * got renumbered before landing on release/v3.8.50.
 *
 * This is not a cosmetic issue: `getMigrationFiles()` throws
 * "Migration version collision detected" the moment ANY code path first
 * touches the database (getDbInstance() -> runMigrations()), which means a
 * completely fresh install/deploy from this branch cannot even boot —
 * confirmed live against a freshly built container.
 *
 * Fix: renumbered the later-landing file to 140 (the next free slot) and
 * added the matching isSchemaAlreadyApplied("140") retroactive guard
 * (migrationRunner.ts), matching the established pattern already used for
 * the prior 135/136 -> 137/138 renumber in the same file.
 */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-135-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

let core: typeof import("../../src/lib/db/core.ts");

before(async () => {
  core = await import("../../src/lib/db/core.ts");
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("a fresh install applies all real on-disk migrations without a version collision", () => {
  // getDbInstance() runs every migration file under src/lib/db/migrations/
  // against a brand-new, empty SQLite file — the exact scenario a fresh
  // deploy hits. Before the fix this threw synchronously here.
  assert.doesNotThrow(() => core.getDbInstance());
});

test("both formerly-135 migrations' tables exist after a fresh install", () => {
  const db = core.getDbInstance();
  const tableNames = (
    db.prepare("SELECT name FROM sqlite_master WHERE type = 'table'").all() as Array<{
      name: string;
    }>
  ).map((row) => row.name);

  // From 135_connection_runtime_state.sql (renumbered to 140).
  assert.ok(
    tableNames.includes("connection_runtime_state"),
    "connection_runtime_state table must exist"
  );
  // From 135_migrate_model_capability_max_token.sql (kept at 135) — this
  // migration only mutates existing model_capabilities rows, so its
  // observable effect is that the migration completed, not a new table;
  // provider_connections already exists as its target table.
  assert.ok(tableNames.includes("provider_connections"), "sanity: base schema applied");
});
