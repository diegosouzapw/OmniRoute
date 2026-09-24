// #13308 follow-up — the health-check-repair backup path lives in managedBackup.ts's
// createManagedDbBackup() (core.ts just delegates to it), and until this fix that prune
// call resolved maxFiles/retentionDays from env vars only, ignoring the persisted
// Storage-page setting that backup.ts honors for manual/API/auto backups via
// resolveDbBackupRetention(). This seeds a backup directory beyond the *persisted*
// maxFiles (well under the hardcoded MAX_DB_BACKUPS default of 20) and asserts the
// actual health-check-repair write path (managedBackup.ts) prunes down to the
// persisted limit, not the env-only default.

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-managed-backup-retention-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { setDbBackupMaxFiles } = await import("../../src/lib/db/backup.ts");
const { createManagedDbBackup } = await import("../../src/lib/db/managedBackup.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function seedFamilies(dir: string, count: number) {
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < count; i++) {
    const ts = new Date(Date.now() - (i + 1) * 1000).toISOString().replace(/[:.]/g, "-");
    fs.writeFileSync(path.join(dir, `db_${ts}_health-check-repair.sqlite`), `fake-${i}`);
  }
}

test("createManagedDbBackup() health-check-repair path honors the persisted maxFiles setting (#13308)", () => {
  const db = core.getDbInstance();

  // Persist a much stricter limit than the MAX_DB_BACKUPS (20) env-only default.
  setDbBackupMaxFiles(3);

  const backupDir = path.join(TEST_DATA_DIR, "db_backups_managed");
  seedFamilies(backupDir, 6);
  const beforeCount = fs.readdirSync(backupDir).filter((f) => f.endsWith(".sqlite")).length;
  assert.equal(beforeCount, 6, "seeded 6 pre-existing families");

  const created = createManagedDbBackup(db, "health-check-repair", backupDir);
  assert.equal(created, true, "backup write should succeed");

  const afterCount = fs.readdirSync(backupDir).filter((f) => f.endsWith(".sqlite")).length;
  // maxFiles=3 caps the whole family set (the 6 seeded + the 1 just created), newest kept.
  assert.equal(
    afterCount,
    3,
    `expected pruning down to the persisted maxFiles=3, got ${afterCount} — ` +
      "if this is 7, the health-check-repair path is still using the env-only MAX_DB_BACKUPS=20 default"
  );
});
