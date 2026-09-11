// ENVIRONMENT NOTE (sandbox better-sqlite3 / glibc limitation, not a code defect):
// This test constructs or exercises a real better-sqlite3-backed SQLite database.
// better-sqlite3 is a native addon; production and CI load it normally, but some
// sandboxes/dev boxes ship a system glibc older than the prebuilt binary requires
// ("GLIBC_2.29 not found"), so the native module fails to dlopen and any test that
// reaches better-sqlite3 directly (or asserts stdout that the load-failure warning
// would pollute) fails HERE while passing in CI. This is a known environment
// limitation, not a defect in the code under test: the OmniRoute runtime itself
// cascades to node:sqlite/sql.js when better-sqlite3 is unavailable. See
// tests/unit/_helpers/betterSqlite3Availability.ts for a guard helper.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import Database from "better-sqlite3";
import { resetDbInstance } from "../../src/lib/db/core.ts";

// Regression guard for #9934 — init asymmetry breaks a fresh install.
//
// `omniroute setup` (bin/cli/sqlite.mjs::openOmniRouteDb) creates
// storage.sqlite with the *partial* inline schema (key_value +
// provider_connections) but NEVER creates _omniroute_migrations and never runs
// migrations. That file flips the server's new-DB heuristic
// (src/lib/db/core.ts uses `!fs.existsSync(sqliteFile)`), so the first
// `omniroute serve` believes it is an existing DB, auto-seeds only the 001
// marker, and then trips the mass-migration safety abort because 139 pending
// migrations exceed the default threshold of 50 (#6260 gate).
//
// A DB whose ONLY applied migration is the 001 initial-schema auto-seed is a
// fresh install, not a wiped/backup-restored database — it must NOT abort.

const serial = { concurrency: false };

// Re-import a module so module-level env-derived constants (DATA_DIR,
// SQLITE_FILE) re-resolve after we set DATA_DIR. Static import cannot work
// here: the whole point is exercising the module-loading boundary.
async function importFresh(modulePath: string) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

// Simulate a production (non-test) process so the #6260 mass-migration safety
// gate is actually LIVE: under `node --test` the runner would be detected and
// the gate skipped, making the bug invisible.
function withNonTestEnvironment<R>(fn: () => R): R {
  const originalNodeEnv = process.env.NODE_ENV;
  const originalVitest = process.env.VITEST;
  const originalDisableAutoBackup = process.env.DISABLE_SQLITE_AUTO_BACKUP;
  const originalArgv = [...process.argv];
  const originalExecArgv = [...process.execArgv];

  delete process.env.NODE_ENV;
  delete process.env.VITEST;
  delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
  process.argv = process.argv.filter((arg) => !arg.includes("test"));
  process.execArgv = process.execArgv.filter((arg) => !arg.includes("test"));

  try {
    return fn();
  } finally {
    process.argv = originalArgv;
    process.execArgv = originalExecArgv;
    if (originalNodeEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalNodeEnv;
    if (originalVitest === undefined) delete process.env.VITEST;
    else process.env.VITEST = originalVitest;
    if (originalDisableAutoBackup === undefined) delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
    else process.env.DISABLE_SQLITE_AUTO_BACKUP = originalDisableAutoBackup;
  }
}

function cleanupGlobalDb() {
  try {
    const g = globalThis as Record<string, { open?: boolean; close?: () => void }>;
    if (g.__omnirouteDb?.open) g.__omnirouteDb.close?.();
  } catch {
    /* ignore */
  }
  delete (globalThis as Record<string, unknown>).__omnirouteDb;
}

test.after(() => {
  cleanupGlobalDb();
  resetDbInstance();
});

test(
  "fresh `omniroute setup` DB (only the 001 seed) survives first serve without mass-migration abort (#9934)",
  serial,
  async () => {
    const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-9934-"));
    const originalDataDir = process.env.DATA_DIR;
    process.env.DATA_DIR = dataDir;

    try {
      // Step 1 — mimic `omniroute setup`: the CLI opens the DB, writes the
      // partial inline schema (key_value + provider_connections) and closes it,
      // WITHOUT running migrations or creating _omniroute_migrations.
      const cli = await importFresh("bin/cli/sqlite.mjs");
      const setup = await cli.openOmniRouteDb();
      assert.ok(fs.existsSync(setup.dbPath), "setup created storage.sqlite");
      setup.db
        .prepare(
          `INSERT INTO provider_connections
            (id, provider, created_at, updated_at)
           VALUES (?, ?, ?, ?)`
        )
        .run("setup-provider", "openai", "2026-09-02T00:00:00.000Z", "2026-09-02T00:00:00.000Z");
      setup.db.close();

      const onDisk = new Database(setup.dbPath, { readonly: true });
      try {
        const hasMigrationTable = !!onDisk
          .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=?")
          .get("_omniroute_migrations");
        assert.equal(
          hasMigrationTable,
          false,
          "setup must NOT pre-create the migrations tracking table (bug premise)"
        );
      } finally {
        onDisk.close();
      }

      // Step 2 — mimic the first `omniroute serve`: the real server opens the
      // same DB, auto-seeds only the 001 marker and runs migrations. Under a
      // live (non-test) safety gate this must NOT throw.
      const core = await importFresh("src/lib/db/core.ts");
      cleanupGlobalDb();
      resetDbInstance();

      let db: { prepare?: (sql: string) => { get: () => { maxV: number } | undefined } };
      assert.doesNotThrow(() => {
        withNonTestEnvironment(() => {
          db = core.getDbInstance();
        });
      }, "first serve must not abort on a fresh setup DB that only has the 001 seed (#9934)");

      // Prove the fresh DB actually got migrated past 001 to the latest version.
      const maxRow = db
        .prepare("SELECT MAX(CAST(version AS INTEGER)) AS maxV FROM _omniroute_migrations")
        .get();
      assert.ok(
        (maxRow?.maxV ?? 0) > 1,
        `expected migrations beyond 001 to run, got max=${maxRow?.maxV}`
      );

      const backupDir = path.join(dataDir, "db_backups");
      const snapshots = fs
        .readdirSync(backupDir)
        .filter((name) => /^db_state-[a-f0-9]{64}_pre-migration\.sqlite$/.test(name));
      assert.equal(
        snapshots.length,
        1,
        "a setup-created file is logically fresh for the mass guard but physically existing for snapshot safety"
      );

      const snapshot = new Database(path.join(backupDir, snapshots[0]!), { readonly: true });
      try {
        assert.deepEqual(
          snapshot.prepare("SELECT id, provider FROM provider_connections").get(),
          { id: "setup-provider", provider: "openai" },
          "the mandatory snapshot must preserve setup-created provider state"
        );
      } finally {
        snapshot.close();
      }
    } finally {
      if (originalDataDir === undefined) delete process.env.DATA_DIR;
      else process.env.DATA_DIR = originalDataDir;
      fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  }
);
