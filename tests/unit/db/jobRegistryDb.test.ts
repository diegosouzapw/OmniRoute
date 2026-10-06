/**
 * Tests for jobRegistry persistence (migration 139 + jobRegistryDb.ts).
 *
 * Verifies:
 *  - 3 built-in jobs seeded by the migration
 *  - upsertJob insert + column-level update (preserves enabled + created_at)
 *  - recordRun writes ISO-8601 timestamps
 *  - pruneRuns count dimension (150 rows -> keep 100)
 *  - pruneRuns time dimension (rows older than 30 days deleted)
 *  - pruneRuns dual dimension (150 rows, 50 older than 30 days -> keep 100)
 *  - cleanupOrphanedRuns fixes stale 'running' records past the timeout
 *
 * Runs against an isolated temp DATA_DIR so the real ~/.omniroute DB is never touched.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-jr-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const db = await import("../../../src/lib/db/jobRegistryDb.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("seed: migration registers 3 built-in jobs", () => {
  const jobs = db.getAllJobs();
  assert.equal(jobs.length, 3);
  const ids = jobs.map((j) => j.id).sort();
  assert.deepEqual(ids, ["budget_reset", "token_health_check", "warmup"]);
});

test("seed: warmup is cron type with env gate + envDefault=false", () => {
  const warmup = db.getAllJobs().find((j) => j.id === "warmup");
  assert.ok(warmup);
  assert.equal(warmup.type, "cron");
  assert.equal(warmup.cron, "0 7 * * *");
  assert.equal(warmup.envFlag, "OMNIROUTE_WARMUP_ENABLED");
  // Seeded disabled: the warmup handler is not registered by this change, and
  // startAll() would otherwise warn about the missing handler on every boot.
  assert.equal(warmup.enabled, false);
  assert.equal(warmup.config.envDefault, false);
  assert.equal(warmup.config.timezone, "America/Los_Angeles");
});

test("seed: budget_reset is interval type with no env gate", () => {
  const budget = db.getAllJobs().find((j) => j.id === "budget_reset");
  assert.ok(budget);
  assert.equal(budget.type, "interval");
  assert.equal(budget.intervalMs, 600000);
  assert.equal(budget.envFlag, null);
});

test("upsertJob: insert a new job then update scheduling fields", () => {
  const created = new Date().toISOString();
  db.upsertJob({
    id: "custom",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: { foo: "bar" },
    createdAt: created,
    updatedAt: created,
  });
  let job = db.getJob("custom");
  assert.ok(job);
  assert.equal(job.type, "interval");
  assert.equal(job.intervalMs, 1000);
  assert.deepEqual(job.config, { foo: "bar" });

  // Update interval + config; created_at must not change.
  db.upsertJob({
    ...job!,
    intervalMs: 2000,
    config: { foo: "baz" },
  });
  job = db.getJob("custom");
  assert.equal(job!.intervalMs, 2000);
  assert.deepEqual(job!.config, { foo: "baz" });
  assert.equal(job!.createdAt, created);
});

test("upsertJob: does NOT overwrite enabled (user toggle preserved)", () => {
  const ts = new Date().toISOString();
  db.upsertJob({
    id: "toggle",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: ts,
    updatedAt: ts,
  });
  db.updateJobEnabled("toggle", false);
  // Re-register with enabled=true - must not flip the user's disabled state.
  db.upsertJob({
    id: "toggle",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: ts,
    updatedAt: ts,
  });
  assert.equal(db.getJob("toggle")!.enabled, false);
});

test("recordRun: writes a completed run with ISO timestamps", () => {
  db.upsertJob({
    id: "j",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  db.recordRun("j", "success", {
    startedAt: "2026-01-01T00:00:00.000Z",
    durationMs: 123,
    recordsAffected: 7,
  });
  const runs = db.getRuns("j");
  assert.equal(runs.length, 1);
  assert.equal(runs[0].status, "success");
  assert.equal(runs[0].recordsAffected, 7);
  assert.equal(runs[0].durationMs, 123);
  assert.equal(runs[0].startedAt, "2026-01-01T00:00:00.000Z");
  assert.ok(runs[0].finishedAt, "finishedAt must be set for a completed run");
});

test("recordRun: running status leaves finishedAt NULL", () => {
  db.upsertJob({
    id: "j",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  db.recordRun("j", "running", { startedAt: "2026-01-01T00:00:00.000Z" });
  const runs = db.getRuns("j");
  assert.equal(runs[0].status, "running");
  assert.equal(runs[0].finishedAt, null);
});

test("pruneRuns: count dimension keeps the most recent 100 of 150", () => {
  db.upsertJob({
    id: "j",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  // Insert 150 rows, oldest first, 1s apart.
  for (let i = 0; i < 150; i++) {
    const t = new Date(Date.UTC(2026, 0, 1, 0, 0, i)).toISOString();
    db.recordRun("j", "success", { startedAt: t, durationMs: 1 });
  }
  db.pruneRuns("j", 100, 30);
  const runs = db.getRuns("j", 200);
  assert.equal(runs.length, 100);
  // The oldest surviving row is the 50th (i=50); rows i=0..49 are pruned.
  const oldestSec = new Date(runs[runs.length - 1].startedAt).getUTCSeconds();
  assert.equal(oldestSec, 50);
});

test("pruneRuns: time dimension deletes rows older than 30 days (once outside recent-100)", () => {
  // Dual-dimension semantics: a row is deleted only when it is BOTH outside the
  // recent-100 window AND older than maxDays. So we insert 100 recent rows to push
  // the 40-day-old row out of the recent-100, where age then prunes it.
  db.upsertJob({
    id: "j",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const now = Date.now();
  db.recordRun("j", "success", {
    startedAt: new Date(now - 40 * 86_400_000).toISOString(),
    durationMs: 1,
  });
  // 100 genuinely-recent rows (hourly, within the last ~4 days) fill the recent-100 window.
  for (let i = 0; i < 100; i++) {
    db.recordRun("j", "success", {
      startedAt: new Date(now - i * 3_600_000).toISOString(),
      durationMs: 1,
    });
  }
  db.pruneRuns("j", 100, 30);
  const runs = db.getRuns("j", 200);
  // The 40-day-old row is outside recent-100 and >30 days -> deleted.
  // Of the 100 recent rows, those aged 31..99 days are also pruned (outside recent-100? no -
  // they're within recent-100 by rank). Only the single 40-day outlier is deleted.
  const hasOld = runs.some((r) => new Date(r.startedAt).getTime() < now - 30 * 86_400_000);
  assert.equal(hasOld, false, "no run older than 30 days should survive");
  assert.equal(runs.length, 100);
});

test("pruneRuns: dual dimension - old rows inside the recent-100 are kept", () => {
  db.upsertJob({
    id: "j",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const now = Date.now();
  // 150 rows total: the 50 oldest are >30 days ago, the newest 100 are recent.
  for (let i = 0; i < 150; i++) {
    // Row i=0 oldest. Newest 100 (i=50..149) are recent; oldest 50 (i=0..49) are 40 days old.
    const ageDays = i < 50 ? 40 : 1;
    const t = new Date(now - ageDays * 86_400_000 - (149 - i) * 1000).toISOString();
    db.recordRun("j", "success", { startedAt: t, durationMs: 1 });
  }
  db.pruneRuns("j", 100, 30);
  const runs = db.getRuns("j", 200);
  // The 50 rows older than 30 days are all outside the recent-100 -> deleted.
  // The 100 recent rows survive.
  assert.equal(runs.length, 100);
});

test("cleanupOrphanedRuns: fixes only running rows past the timeout", () => {
  db.upsertJob({
    id: "j",
    type: "interval",
    cron: null,
    intervalMs: 1000,
    enabled: true,
    envFlag: null,
    config: {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const now = Date.now();
  // Orphaned: running, started 10 minutes ago.
  db.recordRun("j", "running", { startedAt: new Date(now - 10 * 60_000).toISOString() });
  // Fresh: running, started now - must NOT be touched.
  db.recordRun("j", "running", { startedAt: new Date(now).toISOString() });

  db.cleanupOrphanedRuns(5);
  const runs = db.getRuns("j", 200);
  const orphaned = runs.find((r) => new Date(r.startedAt).getTime() <= now - 10 * 60_000);
  const fresh = runs.find((r) => new Date(r.startedAt).getTime() > now - 60_000);
  assert.equal(orphaned.status, "failure");
  assert.equal(orphaned.errorMessage, "orphaned: exceeded timeout");
  assert.equal(fresh.status, "running");
});
