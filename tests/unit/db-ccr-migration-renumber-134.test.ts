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
import Database from "better-sqlite3";

const migrationsDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ccr-migration-"));
const originalMigrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
process.env.OMNIROUTE_MIGRATIONS_DIR = migrationsDir;

fs.writeFileSync(
  path.join(migrationsDir, "134_proxy_logs_egress_ip.sql"),
  "ALTER TABLE proxy_logs ADD COLUMN egress_ip TEXT;"
);
fs.writeFileSync(
  path.join(migrationsDir, "139_ccr_blocks.sql"),
  "CREATE TABLE ccr_blocks (principal_id TEXT PRIMARY KEY);"
);

const { runMigrations } = await import("../../src/lib/db/migrationRunner.ts");

function createLegacyDb(appliedName: string) {
  const db = new Database(":memory:");
  db.exec(`
    CREATE TABLE proxy_logs (id TEXT PRIMARY KEY);
    CREATE TABLE ccr_blocks (principal_id TEXT PRIMARY KEY);
    CREATE TABLE _omniroute_migrations (
      version TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      applied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  db.prepare("INSERT INTO _omniroute_migrations (version, name) VALUES (?, ?)").run(
    "134",
    appliedName
  );
  return db;
}

test.after(() => {
  fs.rmSync(migrationsDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalMigrationsDir === undefined) delete process.env.OMNIROUTE_MIGRATIONS_DIR;
  else process.env.OMNIROUTE_MIGRATIONS_DIR = originalMigrationsDir;
});

test("renumbered CCR migration frees 134 for proxy_logs on existing databases", () => {
  const db = createLegacyDb("ccr_blocks");
  try {
    assert.equal(runMigrations(db), 1);
    assert.deepEqual(
      db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
      [
        { version: "134", name: "proxy_logs_egress_ip" },
        { version: "139", name: "ccr_blocks" },
      ]
    );
    const columns = db.prepare("PRAGMA table_info(proxy_logs)").all() as Array<{ name: string }>;
    assert.ok(columns.some((column) => column.name === "egress_ip"));
  } finally {
    db.close();
  }
});

test("renumbered CCR migration marks an existing table without recreating it", () => {
  const db = createLegacyDb("proxy_logs_egress_ip");
  try {
    assert.equal(runMigrations(db), 1);
    assert.deepEqual(
      db.prepare("SELECT version, name FROM _omniroute_migrations ORDER BY version").all(),
      [
        { version: "134", name: "proxy_logs_egress_ip" },
        { version: "139", name: "ccr_blocks" },
      ]
    );
  } finally {
    db.close();
  }
});
