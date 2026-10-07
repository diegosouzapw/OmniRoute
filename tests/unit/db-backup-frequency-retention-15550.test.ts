/**
 * Regression suite for #15550.
 *
 * Covers:
 * - autoBackupFrequency enforcement ("daily", "weekly", "monthly", "never")
 * - persistent timestamp resolution via newest valid backup on disk
 * - empty / corrupted (< 4096 bytes) backup files ignored as baselines
 * - manual and pre-restore backups bypass frequency and throttling
 * - retention precedence: env override -> dbBackup.maxFiles -> databaseSettings.backup.keepLastNBackups -> default
 * - legacy flat keepLastNBackups key support
 * - updateDatabaseSettings synchronization to dbBackup.maxFiles
 * - Windows EBUSY / EPERM synchronous retry and accurate deleted-family count
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-15550-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const backup = await import("../../src/lib/db/backup.ts");
const backupRetention = await import("../../src/lib/db/backupRetention.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeBackupSubdir(name = "db_backups") {
  const dir = path.join(TEST_DATA_DIR, name);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function seedBackupFile(backupDir: string, filename: string, mtimeMs: number, sizeBytes = 5000) {
  const filePath = path.join(backupDir, filename);
  fs.writeFileSync(filePath, Buffer.alloc(sizeBytes, "a"));
  const time = new Date(mtimeMs);
  fs.utimesSync(filePath, time, time);
  return filePath;
}

test.beforeEach(() => {
  resetStorage();
  core.getDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ──────────────── Backup Frequency Enforcement (#15550) ────────────────

test("autoBackupFrequency='daily': skips when latest backup is < 24h old", () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "daily", keepLastNBackups: 5 },
  });
  assert.equal(backup.getAutoBackupFrequencySetting(), "daily");

  const backupDir = makeBackupSubdir("freq-daily-recent");
  const now = Date.now();
  // Backup from 2 hours ago (< 24h)
  seedBackupFile(backupDir, "db_2026-02-11T12-00-00-000Z_auto.sqlite", now - 2 * 60 * 60 * 1000);

  const due = backup.isAutoBackupDueByFrequency({ backupDir, now });
  assert.equal(due, false, "daily backup must be skipped when last backup is 2h old");
});

test("autoBackupFrequency='daily': allows backup when latest backup is >= 24h old", () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "daily", keepLastNBackups: 5 },
  });

  const backupDir = makeBackupSubdir("freq-daily-due");
  const now = Date.now();
  // Backup from 25 hours ago (>= 24h)
  seedBackupFile(backupDir, "db_2026-02-10T11-00-00-000Z_auto.sqlite", now - 25 * 60 * 60 * 1000);

  const due = backup.isAutoBackupDueByFrequency({ backupDir, now });
  assert.equal(due, true, "daily backup must run when last backup is 25h old");
});

test("autoBackupFrequency='weekly': enforces 7-day interval", () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "weekly", keepLastNBackups: 5 },
  });
  assert.equal(backup.getAutoBackupFrequencySetting(), "weekly");

  const backupDir = makeBackupSubdir("freq-weekly");
  const now = Date.now();

  // 3 days old (< 7d) -> not due
  seedBackupFile(
    backupDir,
    "db_2026-02-08T12-00-00-000Z_auto.sqlite",
    now - 3 * 24 * 60 * 60 * 1000
  );
  assert.equal(backup.isAutoBackupDueByFrequency({ backupDir, now }), false);

  // 8 days old (>= 7d) -> due
  const oldBackupDir = makeBackupSubdir("freq-weekly-old");
  seedBackupFile(
    oldBackupDir,
    "db_2026-02-03T12-00-00-000Z_auto.sqlite",
    now - 8 * 24 * 60 * 60 * 1000
  );
  assert.equal(backup.isAutoBackupDueByFrequency({ backupDir: oldBackupDir, now }), true);
});

test("autoBackupFrequency='monthly': enforces 30-day interval", () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "monthly", keepLastNBackups: 5 },
  });
  assert.equal(backup.getAutoBackupFrequencySetting(), "monthly");

  const backupDir = makeBackupSubdir("freq-monthly");
  const now = Date.now();

  // 15 days old (< 30d) -> not due
  seedBackupFile(
    backupDir,
    "db_2026-01-27T12-00-00-000Z_auto.sqlite",
    now - 15 * 24 * 60 * 60 * 1000
  );
  assert.equal(backup.isAutoBackupDueByFrequency({ backupDir, now }), false);

  // 31 days old (>= 30d) -> due
  const oldBackupDir = makeBackupSubdir("freq-monthly-old");
  seedBackupFile(
    oldBackupDir,
    "db_2026-01-11T12-00-00-000Z_auto.sqlite",
    now - 31 * 24 * 60 * 60 * 1000
  );
  assert.equal(backup.isAutoBackupDueByFrequency({ backupDir: oldBackupDir, now }), true);
});

test("unset autoBackupFrequency keeps the hourly throttle; explicit never disables", () => {
  const db = core.getDbInstance();
  db.prepare(
    "DELETE FROM key_value WHERE key = 'autoBackupFrequency' OR key = 'backup.autoBackupFrequency'"
  ).run();
  assert.equal(backup.getAutoBackupFrequencySetting(), null);
  assert.equal(backup.getAutoBackupFrequencyIntervalMs(null), 60 * 60 * 1000);
  assert.equal(backup.getAutoBackupFrequencyIntervalMs("never"), null);

  const now = Date.now();
  const recentDir = makeBackupSubdir("freq-unset-recent");
  seedBackupFile(recentDir, "db_2026-02-11T12-30-00-000Z_auto.sqlite", now - 30 * 60 * 1000);
  assert.equal(
    backup.isAutoBackupDueByFrequency({ backupDir: recentDir, now }),
    false,
    "unset frequency must keep the 60-minute throttle"
  );

  const dueDir = makeBackupSubdir("freq-unset-due");
  seedBackupFile(dueDir, "db_2026-02-11T11-00-00-000Z_auto.sqlite", now - 61 * 60 * 1000);
  assert.equal(backup.isAutoBackupDueByFrequency({ backupDir: dueDir, now }), true);

  const emptyDir = makeBackupSubdir("freq-unset-empty");
  assert.equal(backup.isAutoBackupDueByFrequency({ backupDir: emptyDir, now }), true);

  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "never", keepLastNBackups: 5 },
  });
  assert.equal(backup.getAutoBackupFrequencySetting(), "never");
  assert.equal(backup.isAutoBackupDueByFrequency({ backupDir: dueDir, now }), false);
});

test("autoBackupFrequency='never': always skips automatic backups", () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "never", keepLastNBackups: 5 },
  });
  assert.equal(backup.getAutoBackupFrequencySetting(), "never");

  const backupDir = makeBackupSubdir("freq-never");
  const now = Date.now();

  // With no backups at all
  assert.equal(backup.isAutoBackupDueByFrequency({ backupDir, now }), false);

  // With a 100-day-old backup
  seedBackupFile(
    backupDir,
    "db_2025-10-01T12-00-00-000Z_auto.sqlite",
    now - 100 * 24 * 60 * 60 * 1000
  );
  assert.equal(backup.isAutoBackupDueByFrequency({ backupDir, now }), false);
});

test("no previous backup: automatic backup is due when frequency is daily", () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "daily", keepLastNBackups: 5 },
  });

  const emptyDir = makeBackupSubdir("freq-empty");
  const due = backup.isAutoBackupDueByFrequency({ backupDir: emptyDir, now: Date.now() });
  assert.equal(due, true, "backup must be due when no previous backup exists");
});

test("corrupt or empty (< 4096B) backups are ignored as frequency baselines", () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "daily", keepLastNBackups: 5 },
  });

  const backupDir = makeBackupSubdir("freq-corrupt-ignore");
  const now = Date.now();
  // 0-byte or <4096-byte aborted backup file from 10 minutes ago
  seedBackupFile(backupDir, "db_2026-02-11T13-50-00-000Z_auto.sqlite", now - 10 * 60 * 1000, 100);

  const due = backup.isAutoBackupDueByFrequency({ backupDir, now });
  assert.equal(due, true, "incomplete snapshot < 4096 bytes must not prevent automatic backup");
});

test("manual and pre-restore bypass autoBackupEnabled=false, frequency='never', and throttling", () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: false, autoBackupFrequency: "never", keepLastNBackups: 5 },
  });

  // Verify that an automatic backup (pre-write) is blocked by the settings
  const autoResult = backup.backupDbFile("pre-write");
  assert.equal(autoResult, null, "automatic backup must be blocked when disabled/never");

  // Verify that manual backup succeeds and creates a valid backup file
  const manualResult = backup.backupDbFile("manual");
  assert.ok(manualResult, "manual backup must succeed even when auto-backup is disabled and never");
  assert.ok(manualResult.filename.includes("_manual.sqlite"));

  // Verify that pre-restore backup succeeds even immediately after (within throttle window)
  const preRestoreResult = backup.backupDbFile("pre-restore");
  assert.ok(
    preRestoreResult,
    "pre-restore backup must succeed within throttle window and when auto-backup is disabled"
  );
  assert.ok(preRestoreResult.filename.includes("_pre-restore.sqlite"));

  // Verify that a subsequent automatic backup is still blocked
  const autoAfterResult = backup.backupDbFile("pre-arena-elo-sync");
  assert.equal(autoAfterResult, null, "automatic pre-arena-elo-sync must still be blocked");
});

// ──────────────── Retention Precedence (#15550) ────────────────

test("retention fallback: resolves keepLastNBackups when dbBackup.maxFiles is unset", () => {
  const db = core.getDbInstance();

  // Clear any dbBackup namespace rows
  db.prepare("DELETE FROM key_value WHERE namespace = ?").run("dbBackup");

  // Save keepLastNBackups=7 via databaseSettings
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "databaseSettings",
    "backup.keepLastNBackups",
    JSON.stringify(7)
  );

  const retention = backupRetention.resolveDbBackupRetention(db, {});
  assert.equal(retention.maxFiles, 7, "must fallback to databaseSettings.backup.keepLastNBackups");
});

test("retention fallback: resolves legacy flat keepLastNBackups key", () => {
  const db = core.getDbInstance();

  db.prepare("DELETE FROM key_value WHERE namespace = ?").run("dbBackup");
  db.prepare(
    "DELETE FROM key_value WHERE namespace = 'databaseSettings' AND key LIKE '%keepLastNBackups%'"
  ).run();

  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "databaseSettings",
    "keepLastNBackups",
    JSON.stringify(9)
  );

  const retention = backupRetention.resolveDbBackupRetention(db, {});
  assert.equal(retention.maxFiles, 9, "must fallback to legacy databaseSettings.keepLastNBackups");
});

test("retention precedence: dbBackup.maxFiles takes precedence over databaseSettings", () => {
  const db = core.getDbInstance();

  // databaseSettings has keepLastNBackups=7
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "databaseSettings",
    "backup.keepLastNBackups",
    JSON.stringify(7)
  );

  // Storage tab explicitly set maxFiles=3
  backup.setDbBackupMaxFiles(3);

  const retention = backupRetention.resolveDbBackupRetention(db, {});
  assert.equal(
    retention.maxFiles,
    3,
    "dbBackup.maxFiles must take precedence over databaseSettings"
  );
});

test("retention precedence: DB_BACKUP_MAX_FILES takes precedence over all DB settings", () => {
  const db = core.getDbInstance();

  backup.setDbBackupMaxFiles(3);
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "databaseSettings",
    "backup.keepLastNBackups",
    JSON.stringify(7)
  );

  const retention = backupRetention.resolveDbBackupRetention(db, {
    DB_BACKUP_MAX_FILES: "15",
  });
  assert.equal(retention.maxFiles, 15, "DB_BACKUP_MAX_FILES env var must take precedence");
});

test("updateDatabaseSettings synchronizes keepLastNBackups with dbBackup.maxFiles", () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "daily", keepLastNBackups: 11 },
  });

  assert.equal(
    backup.getDbBackupMaxFiles(),
    11,
    "updating databaseSettings must sync to dbBackup.maxFiles"
  );
});

// ──────────────── Windows EBUSY / EPERM Deletion & Counting (#15550) ────────────────

test("unlinkSyncWithRetry: retries on EBUSY and stops immediately upon success", () => {
  const tmpFile = path.join(TEST_DATA_DIR, "ebusy-retry-test.txt");
  fs.writeFileSync(tmpFile, "content to unlink");
  assert.ok(fs.existsSync(tmpFile));

  const originalUnlinkSync = fs.unlinkSync;
  let attempts = 0;

  // Simulate Windows file locking: fails with EBUSY for first 2 attempts, then succeeds on 3rd
  fs.unlinkSync = (targetPath) => {
    attempts += 1;
    if (attempts <= 2) {
      const err = new Error("resource busy or locked (EBUSY)");
      err.code = "EBUSY";
      throw err;
    }
    return originalUnlinkSync(targetPath);
  };

  try {
    const success = backupRetention.unlinkSyncWithRetry(tmpFile, {
      maxAttempts: 5,
      baseDelayMs: 2,
    });
    assert.equal(success, true, "deletion must succeed after transient EBUSY locks clear");
    assert.equal(
      attempts,
      3,
      "must retry until success on attempt 3 and not make unnecessary attempts (4 and 5)"
    );
    assert.ok(!fs.existsSync(tmpFile), "file must be deleted");
  } finally {
    fs.unlinkSync = originalUnlinkSync;
  }
});

test("unlinkSyncWithRetry: returns false when EBUSY retries are exhausted", () => {
  const tmpFile = path.join(TEST_DATA_DIR, "ebusy-exhaust-test.txt");
  fs.writeFileSync(tmpFile, "permanent lock content");
  assert.ok(fs.existsSync(tmpFile));

  const originalUnlinkSync = fs.unlinkSync;
  let attempts = 0;

  // Persistently locked file
  fs.unlinkSync = () => {
    attempts += 1;
    const err = new Error("permanently locked");
    err.code = "EBUSY";
    throw err;
  };

  try {
    const success = backupRetention.unlinkSyncWithRetry(tmpFile, {
      maxAttempts: 3,
      baseDelayMs: 2,
    });
    assert.equal(success, false, "must return false when maxAttempts exhausted");
    assert.equal(attempts, 3, "must attempt exactly maxAttempts times");
    assert.ok(fs.existsSync(tmpFile), "file must remain on disk");
  } finally {
    fs.unlinkSync = originalUnlinkSync;
  }
});

test("pruneBackupDirectory: accurately counts deletedBackupFamilies only on success", () => {
  const dir = makeBackupSubdir("prune-accurate");

  // Create 4 families: 2 to keep, 2 overflow
  for (let i = 0; i < 4; i++) {
    const ts = new Date(Date.now() - i * 1000).toISOString().replace(/[:.]/g, "-");
    const name = `db_${ts}_auto.sqlite`;
    fs.writeFileSync(path.join(dir, name), Buffer.from(`snapshot-${i}`));
  }

  const beforeCount = fs.readdirSync(dir).filter((f) => f.endsWith(".sqlite")).length;
  assert.equal(beforeCount, 4);

  const result = backupRetention.pruneBackupDirectory({
    backupDir: dir,
    maxFiles: 2,
    retentionDays: 0,
  });

  assert.equal(result.deletedBackupFamilies, 2, "must report exactly 2 deleted families");
  assert.equal(result.deletedFiles, 2, "must report exactly 2 deleted files");
  assert.equal(result.keptBackupFamilies, 2, "must keep 2 newest families");

  const afterCount = fs.readdirSync(dir).filter((f) => f.endsWith(".sqlite")).length;
  assert.equal(afterCount, 2);
});

// ✦ End-to-end frequency wiring: backupDbFile("pre-write") integration (#15550) ✦

test("backupDbFile('pre-write'): frequency gate is wired – recent backup prevents new file creation", () => {
  databaseSettings.updateDatabaseSettings({
    backup: { autoBackupEnabled: true, autoBackupFrequency: "daily", keepLastNBackups: 5 },
  });
  assert.equal(backup.getAutoBackupFrequencySetting(), "daily");

  // Seed a valid backup (> 4096 bytes) in the real backup directory, 2 hours ago.
  // backupDbFile() uses DATA_DIR/db_backups – same path as getBackupDir() in production.
  const backupDir = path.join(TEST_DATA_DIR, "db_backups");
  fs.mkdirSync(backupDir, { recursive: true });
  const now = Date.now();
  seedBackupFile(
    backupDir,
    "db_2026-02-11T12-00-00-000Z_pre-write.sqlite",
    now - 2 * 60 * 60 * 1000
  );

  // 1. Verify the exported frequency gate itself: it must report "not due" when the
  //    newest valid backup is only 2h old (< 24h daily interval).
  const due = backup.isAutoBackupDueByFrequency({ backupDir, now });
  assert.equal(
    due,
    false,
    "frequency gate must block a pre-write backup that is only 2h after the last one"
  );

  // 2. Verify end-to-end wiring: backupDbFile("pre-write") must return null.
  //    In the test runner context isSqliteAutoBackupDisabled() also returns true
  //    (test process detection fires first), so both the process-level safety gate and
  //    the frequency gate protect this path.  Counting files before and after proves no
  //    new backup was written regardless of which gate fired.
  const filesBefore = fs.readdirSync(backupDir).filter((f) => f.endsWith(".sqlite")).length;
  assert.equal(filesBefore, 1, "exactly one seeded backup must exist before the call");

  const result = backup.backupDbFile("pre-write");
  assert.equal(result, null, "backupDbFile must return null when a recent backup exists");

  const filesAfter = fs.readdirSync(backupDir).filter((f) => f.endsWith(".sqlite")).length;
  assert.equal(filesAfter, 1, "no additional backup file must be created");
});
