import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, readFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

async function withTmpDataDir(fn: (dataDir: string) => Promise<void>) {
  const dataDir = mkdtempSync(join(tmpdir(), "omniroute-backup-job-test-"));
  const orig = process.env.DATA_DIR;
  process.env.DATA_DIR = dataDir;
  try {
    await fn(dataDir);
  } finally {
    if (orig === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = orig;
    rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("runBackupScheduleTick — no schedule file: no-op, no throw", async () => {
  await withTmpDataDir(async () => {
    const { runBackupScheduleTick } = await import("@/lib/jobs/backupScheduleJob");
    const ran = await runBackupScheduleTick(new Date(2026, 6, 25, 3, 0, 0));
    assert.equal(ran, false);
  });
});

test("runBackupScheduleTick — disabled schedule: no-op", async () => {
  await withTmpDataDir(async (dataDir) => {
    writeFileSync(
      join(dataDir, "backup-schedule.json"),
      JSON.stringify({
        enabled: false,
        cron: "0 3 * * *",
        cloud: false,
        encrypt: false,
        retention: 7,
      })
    );
    const { runBackupScheduleTick } = await import("@/lib/jobs/backupScheduleJob");
    const ran = await runBackupScheduleTick(new Date(2026, 6, 25, 3, 0, 0));
    assert.equal(ran, false);
  });
});

test("runBackupScheduleTick — enabled but current time doesn't match cron: no-op", async () => {
  await withTmpDataDir(async (dataDir) => {
    writeFileSync(
      join(dataDir, "backup-schedule.json"),
      JSON.stringify({
        enabled: true,
        cron: "0 3 * * *",
        cloud: false,
        encrypt: false,
        retention: 7,
      })
    );
    const { runBackupScheduleTick } = await import("@/lib/jobs/backupScheduleJob");
    const ran = await runBackupScheduleTick(new Date(2026, 6, 25, 9, 0, 0));
    assert.equal(ran, false);
  });
});

test("runBackupScheduleTick — enabled + matching time: fires exactly once, updates lastRunAt", async () => {
  await withTmpDataDir(async (dataDir) => {
    writeFileSync(
      join(dataDir, "storage.sqlite"),
      Buffer.alloc(4096) // large enough for runBackupCommand's FILES_TO_BACKUP existsSync check
    );
    writeFileSync(
      join(dataDir, "backup-schedule.json"),
      JSON.stringify({
        enabled: true,
        cron: "0 3 * * *",
        cloud: false,
        encrypt: false,
        retention: null,
      })
    );
    const { runBackupScheduleTick } = await import("@/lib/jobs/backupScheduleJob");
    const dueAt = new Date(2026, 6, 25, 3, 0, 0);

    const firstRun = await runBackupScheduleTick(dueAt);
    assert.equal(firstRun, true, "first tick at the matching minute should fire");

    const schedule = JSON.parse(readFileSync(join(dataDir, "backup-schedule.json"), "utf8"));
    assert.ok(schedule.lastRunAt, "lastRunAt should be recorded");
    assert.ok(existsSync(join(dataDir, "backups")), "a backup should have been created");

    // Second tick within the SAME matching minute must not re-fire — this is the
    // difference between a scheduling library and a naive per-tick cron check:
    // without lastRunAt tracking, every tick inside the matching minute would
    // fire again (the interval is shorter than 60s).
    const secondRun = await runBackupScheduleTick(dueAt);
    assert.equal(secondRun, false, "same minute must not fire twice");
  });
});
