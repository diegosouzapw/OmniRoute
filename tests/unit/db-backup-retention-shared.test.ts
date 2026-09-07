// Health-check-repair backups (core.ts's createManagedDbBackup) never called into the
// shared retention policy at all, so db_backups/ grew without bound (observed live:
// 570 GB / 60 files against a small live database). backup.ts and migrationRunner.ts
// both already resolved settings + pruned after writing; core.ts's health-check path
// is the one call site that reached VACUUM INTO with no retention step whatsoever.
//
// core.ts's real writer (createManagedDbBackup) is gated behind isAutomatedTestProcess()
// and cannot be exercised end-to-end from this test runner (that gate is an intentional,
// pre-existing production-safety check, not something this fix should bypass) — which is
// also exactly why a missing prune call there could go unnoticed by the existing suite.
// These tests instead pin the shared helper (pruneManagedDbBackups /
// resolveDbBackupRetentionSettings) that core.ts's fix now calls, the same way
// db-pre-migration-backup-retention-10421.test.ts pins migrationRunner.ts's call site.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";
import {
  pruneManagedDbBackups,
  resolveDbBackupRetentionSettings,
} from "../../src/lib/db/backupRetention.ts";

const serial = { concurrency: false };

/** Minimal adapter: pruneManagedDbBackups only ever calls db.prepare(...).get(...). */
function createSettingsDb(sqlitePath: string) {
  const db = new Database(sqlitePath);
  db.exec(
    "CREATE TABLE IF NOT EXISTS key_value (namespace TEXT, key TEXT, value TEXT, PRIMARY KEY (namespace, key))"
  );
  return {
    prepare: (sql: string) => db.prepare(sql),
    close: () => db.close(),
  };
}

function storeSetting(db: ReturnType<typeof createSettingsDb>, key: string, value: number) {
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "dbBackup",
    key,
    JSON.stringify(value)
  );
}

function makeTempDir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-retention-shared-"));
  fs.mkdirSync(path.join(dir, "db_backups"), { recursive: true });
  return dir;
}

function seedBackups(backupDir: string, count: number, reason: string) {
  for (let i = 0; i < count; i++) {
    const name = `db_2026-08-${String(i + 1).padStart(2, "0")}T00-00-00-000Z_${reason}.sqlite`;
    const filePath = path.join(backupDir, name);
    fs.writeFileSync(filePath, "x");
    const t = new Date(2026, 7, i + 1).getTime() / 1000;
    fs.utimesSync(filePath, t, t);
  }
}

function countBackups(backupDir: string) {
  return fs.readdirSync(backupDir).filter((n) => n.startsWith("db_")).length;
}

function withEnv(vars: Record<string, string | undefined>, fn: () => void) {
  const saved: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(vars)) {
    saved[k] = process.env[k];
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  try {
    return fn();
  } finally {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

test(
  "pruneManagedDbBackups caps health-check-repair backups at the persisted maxFiles",
  serial,
  () => {
    const dataDir = makeTempDir();
    const backupDir = path.join(dataDir, "db_backups");
    const db = createSettingsDb(path.join(dataDir, "settings.sqlite"));

    try {
      seedBackups(backupDir, 30, "health-check-repair");
      assert.equal(countBackups(backupDir), 30, "precondition: 30 stale backups on disk");
      storeSetting(db, "maxFiles", 5);
      storeSetting(db, "retentionDays", 0);

      withEnv({ DB_BACKUP_MAX_FILES: undefined, DB_BACKUP_RETENTION_DAYS: undefined }, () => {
        pruneManagedDbBackups(db as never, backupDir, "[DB (health-check-repair)]");
      });

      const remaining = countBackups(backupDir);
      assert.ok(
        remaining <= 5,
        `expected the operator's persisted maxFiles=5 to cap db_backups, found ${remaining}`
      );
    } finally {
      db.close();
      fs.rmSync(dataDir, { recursive: true, force: true });
    }
  }
);

test("pruneManagedDbBackups never throws when pruning itself fails", serial, () => {
  const dataDir = makeTempDir();
  const db = createSettingsDb(path.join(dataDir, "settings.sqlite"));

  try {
    // A backup dir that cannot exist as a directory (it's a file) makes pruning fail;
    // callers (health-check-repair, in production) must not see that as a backup failure.
    const notADir = path.join(dataDir, "not-a-directory");
    fs.writeFileSync(notADir, "x");

    assert.doesNotThrow(() => {
      pruneManagedDbBackups(db as never, path.join(notADir, "db_backups"), "[DB (test)]");
    });
  } finally {
    db.close();
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});

test("resolveDbBackupRetentionSettings: env override wins over the persisted value", serial, () => {
  const dataDir = makeTempDir();
  const db = createSettingsDb(path.join(dataDir, "settings.sqlite"));

  try {
    storeSetting(db, "maxFiles", 5);
    withEnv({ DB_BACKUP_MAX_FILES: "12" }, () => {
      const { maxFiles } = resolveDbBackupRetentionSettings(db as never);
      assert.equal(maxFiles, 12);
    });
  } finally {
    db.close();
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
});
