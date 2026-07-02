/**
 * Regression guard for #5871.
 *
 * Full pre-write SQLite backups (~70MB) must honor the persisted
 * `backup.autoBackupEnabled` dashboard setting, not only the
 * `DISABLE_SQLITE_AUTO_BACKUP` env var. Before the fix, disabling auto-backup in
 * the UI had no effect and pre-write snapshots kept firing (bounded only by the
 * 60-minute throttle).
 *
 * NOTE: `isSqliteAutoBackupDisabled()` short-circuits to `true` under the test
 * runner, so `backupDbFile()` always returns null in tests regardless of the new
 * gate. We therefore exercise the setting-gate logic directly via the exported
 * `isAutoBackupDisabledBySetting()` helper, which is exactly what `backupDbFile()`
 * consults for non-manual / non-pre-restore reasons.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-5871-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const backup = await import("../../src/lib/db/backup.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
  core.getDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("fresh install (seeded default autoBackupEnabled=false) → auto backups disabled", () => {
  // The DB seed persists databaseSettings.autoBackupEnabled=false by default, so the
  // dashboard toggle reads "off" out of the box — the gate must honor that.
  assert.equal(databaseSettings.getUserDatabaseSettings().backup.autoBackupEnabled, false);
  assert.equal(backup.isAutoBackupDisabledBySetting(), true);
});

test("no persisted value at all → auto backups are NOT disabled (backups allowed)", () => {
  // Remove every persisted autoBackupEnabled row to exercise the "absent" branch.
  const db = core.getDbInstance();
  db.prepare("DELETE FROM key_value WHERE key IN (?, ?)").run(
    "autoBackupEnabled",
    "backup.autoBackupEnabled"
  );
  db.prepare("DELETE FROM key_value WHERE namespace='settings' AND key IN (?, ?)").run(
    "backup",
    "databaseSettings"
  );
  assert.equal(backup.isAutoBackupDisabledBySetting(), false);
});

test("autoBackupEnabled=false → auto backups are disabled (gate trips)", () => {
  databaseSettings.updateDatabaseSettings({ backup: { autoBackupEnabled: false } });
  assert.equal(backup.isAutoBackupDisabledBySetting(), true);
});

test("autoBackupEnabled=true → auto backups are NOT disabled", () => {
  databaseSettings.updateDatabaseSettings({ backup: { autoBackupEnabled: true } });
  assert.equal(backup.isAutoBackupDisabledBySetting(), false);
});

test("persisted value survives a getUserDatabaseSettings round-trip", () => {
  databaseSettings.updateDatabaseSettings({ backup: { autoBackupEnabled: false } });
  assert.equal(databaseSettings.getUserDatabaseSettings().backup.autoBackupEnabled, false);
  assert.equal(backup.isAutoBackupDisabledBySetting(), true);

  databaseSettings.updateDatabaseSettings({ backup: { autoBackupEnabled: true } });
  assert.equal(databaseSettings.getUserDatabaseSettings().backup.autoBackupEnabled, true);
  assert.equal(backup.isAutoBackupDisabledBySetting(), false);
});
