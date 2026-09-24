// #13308 follow-up — #13404 fixed the health-check-repair prune call itself but only
// resolved maxFiles/retentionDays from env vars, ignoring the persisted Storage-page
// setting that backup.ts honors for manual/API/auto backups. resolveDbBackupRetention()
// is the single precedence chain (env override → persisted setting → default) both
// paths now share.

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-retention-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { resolveDbBackupRetention } = await import("../../src/lib/db/backupRetention.ts");
const { setDbBackupMaxFiles, setDbBackupRetentionDays } =
  await import("../../src/lib/db/backup.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("resolveDbBackupRetention() falls back to defaults with nothing set (#13308)", () => {
  const db = core.getDbInstance();
  const result = resolveDbBackupRetention(db, {});
  assert.equal(result.maxFiles, 20);
  assert.equal(result.retentionDays, 0);
});

test("resolveDbBackupRetention() honors the persisted Storage-page setting (#13308)", () => {
  const db = core.getDbInstance();
  setDbBackupMaxFiles(3);
  setDbBackupRetentionDays(7);

  const result = resolveDbBackupRetention(db, {});
  assert.equal(result.maxFiles, 3);
  assert.equal(result.retentionDays, 7);
});

test("resolveDbBackupRetention() lets an env override win over the persisted setting (#13308)", () => {
  const db = core.getDbInstance();
  setDbBackupMaxFiles(3);
  setDbBackupRetentionDays(7);

  const result = resolveDbBackupRetention(db, {
    DB_BACKUP_MAX_FILES: "5",
    DB_BACKUP_RETENTION_DAYS: "14",
  });
  assert.equal(result.maxFiles, 5);
  assert.equal(result.retentionDays, 14);
});
