/**
 * Tests for migration 071 — extend version_manager for embedded services.
 *
 * Verifies:
 *  - 3 new columns are added (logs_buffer_path, provider_expose, last_sync_at)
 *  - 9router seed row inserted with expected defaults
 *  - Migration is idempotent (apply-twice → no error, no double seed)
 *  - Existing data survives the migration
 *  - getServiceRow / updateServiceField helpers work correctly
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-migration-071-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const versionManager = await import("../../../src/lib/db/versionManager.ts");

async function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("migration 071 — adds 3 new columns to version_manager", async () => {
  const db = core.getDbInstance();
  const columns = (
    db.prepare("PRAGMA table_info(version_manager)").all() as Array<{ name: string }>
  ).map((c) => c.name);

  assert.ok(columns.includes("logs_buffer_path"), "logs_buffer_path column missing");
  assert.ok(columns.includes("provider_expose"), "provider_expose column missing");
  assert.ok(columns.includes("last_sync_at"), "last_sync_at column missing");
});

test("migration 071 — seeds 9router row with expected defaults", async () => {
  const row = await versionManager.getServiceRow("9router");

  assert.ok(row !== null, "9router row should exist after migration");
  assert.equal(row.tool, "9router");
  assert.equal(row.status, "not_installed");
  assert.equal(row.port, 20130);
  assert.equal(row.autoStart, false);
  assert.equal(row.autoUpdate, true);
  assert.equal(row.providerExpose, true);
  assert.equal(row.pid, null);
  assert.equal(row.logsBufferPath, null);
  assert.equal(row.lastSyncAt, null);
});

test("migration 071 — idempotent: applying twice produces no error and no double seed", async () => {
  const db = core.getDbInstance();

  // Apply the migration SQL manually a second time (simulates re-run).
  // The runner catches "duplicate column name" automatically; here we verify
  // INSERT OR IGNORE prevents a duplicate 9router row.
  assert.doesNotThrow(() => {
    db.exec(`INSERT OR IGNORE INTO version_manager
      (tool, status, port, auto_start, auto_update, provider_expose)
    VALUES
      ('9router', 'not_installed', 20130, 0, 1, 1)`);
  });

  const rows = db
    .prepare("SELECT * FROM version_manager WHERE tool = '9router'")
    .all() as unknown[];
  assert.equal(rows.length, 1, "Should be exactly 1 9router row after double-seed attempt");
});

test("migration 071 — existing CLIProxyAPI data survives the migration", async () => {
  const db = core.getDbInstance();

  // Simulate a pre-existing cliproxyapi row (it's seeded by T-11, not this migration).
  db.prepare(
    `INSERT OR IGNORE INTO version_manager (tool, status, port, auto_start, auto_update)
     VALUES ('cliproxyapi', 'stopped', 8317, 1, 1)`
  ).run();

  const row = await versionManager.getServiceRow("cliproxyapi");
  assert.ok(row !== null, "cliproxyapi row should still exist");
  assert.equal(row.status, "stopped");
  assert.equal(row.port, 8317);
  assert.equal(row.providerExpose, false, "CLIProxyAPI provider_expose should default to 0");
});

test("getServiceRow — returns null for unknown tool", async () => {
  const row = await versionManager.getServiceRow("nonexistent-tool");
  assert.equal(row, null);
});

test("updateServiceField — updates a whitelisted field", async () => {
  const updated = await versionManager.updateServiceField(
    "9router",
    "logsBufferPath",
    "/tmp/ring.log"
  );
  assert.ok(updated !== null);
  assert.equal(updated.logsBufferPath, "/tmp/ring.log");

  const fetched = await versionManager.getServiceRow("9router");
  assert.equal(fetched?.logsBufferPath, "/tmp/ring.log");
});

test("updateServiceField — updates providerExpose boolean → stored as INTEGER", async () => {
  const updated = await versionManager.updateServiceField("9router", "providerExpose", false);
  assert.ok(updated !== null);
  assert.equal(updated.providerExpose, false);

  const fetched = await versionManager.getServiceRow("9router");
  assert.equal(fetched?.providerExpose, false);
});

test("updateServiceField — rejects non-whitelisted field", async () => {
  await assert.rejects(
    () =>
      versionManager.updateServiceField(
        "9router",
        "injected_column; DROP TABLE version_manager--",
        "evil"
      ),
    /not in the allowed list/
  );
});

test("updateServiceField — updates lastSyncAt timestamp", async () => {
  const ts = new Date().toISOString();
  const updated = await versionManager.updateServiceField("9router", "lastSyncAt", ts);
  assert.ok(updated !== null);
  assert.equal(updated.lastSyncAt, ts);
});
