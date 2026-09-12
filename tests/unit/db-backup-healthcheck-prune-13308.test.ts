// #13308 — health-check-repair backups were never pruned because the retention
// call was missing from the VACUUM INTO path in core.ts.  This test seeds a
// backup directory with more families than MAX_DB_BACKUPS, then runs the same
// pruneBackupDirectory call that createManagedDbBackup now executes after each
// health-check snapshot, and asserts that overflow families are deleted.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  pruneBackupDirectory,
  MAX_DB_BACKUPS,
} from "../../src/lib/db/backupRetention.ts";

const serial = { concurrency: false };

function makeBackupDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-prune-"));
}

function seedFamilies(dir: string, count: number) {
  for (let i = 0; i < count; i++) {
    const ts = new Date(Date.now() - i * 1000).toISOString().replace(/[:.]/g, "-");
    const name = `db_${ts}_health-check-repair.sqlite`;
    fs.writeFileSync(path.join(dir, name), Buffer.from(`fake-snapshot-${i}`));
  }
}

test("#13308 — pruneBackupDirectory removes overflow from health-check-repair path", serial, () => {
  const dir = makeBackupDir();
  try {
    const extra = 5;
    seedFamilies(dir, MAX_DB_BACKUPS + extra);

    const before = fs.readdirSync(dir).filter((f) => f.endsWith(".sqlite")).length;
    assert.ok(before >= MAX_DB_BACKUPS + extra, `seeded ${before} families`);

    const result = pruneBackupDirectory({
      backupDir: dir,
      maxFiles: MAX_DB_BACKUPS,
      retentionDays: 0,
    });

    const after = fs.readdirSync(dir).filter((f) => f.endsWith(".sqlite")).length;
    assert.equal(after, MAX_DB_BACKUPS, `pruned to MAX_DB_BACKUPS (${MAX_DB_BACKUPS}), got ${after}`);
    assert.equal(result.deletedBackupFamilies, extra, `deleted ${extra} overflow families`);
    assert.equal(result.keptBackupFamilies, MAX_DB_BACKUPS);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("#13308 — pruneBackupDirectory is a no-op when under limit", serial, () => {
  const dir = makeBackupDir();
  try {
    seedFamilies(dir, 3);

    const result = pruneBackupDirectory({
      backupDir: dir,
      maxFiles: MAX_DB_BACKUPS,
      retentionDays: 0,
    });

    const after = fs.readdirSync(dir).filter((f) => f.endsWith(".sqlite")).length;
    assert.equal(after, 3, "no files removed when under limit");
    assert.equal(result.deletedBackupFamilies, 0);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
