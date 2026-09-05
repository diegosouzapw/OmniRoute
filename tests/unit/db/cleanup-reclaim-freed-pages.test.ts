/**
 * Regression tests for #12821 — the cleanup scheduler must never run a
 * blocking full `VACUUM` on the serving thread.
 *
 * Covers `reclaimFreedPages()` and `runScheduledCleanupPass()` in
 * src/lib/db/cleanup.ts:
 * 1. INCREMENTAL: freed pages are reclaimed in bounded `incremental_vacuum`
 *    batches, pausing between batches, and the WAL is checkpointed so the
 *    main file actually shrinks.
 * 2. Batch / time caps stop a pass early and leave the rest for the next one.
 * 3. FULL: nothing to do — SQLite reclaims on commit, freelist is empty.
 * 4. NONE: no rebuild happens here; a full VACUUM is requested from
 *    `vacuumScheduler` instead and the file keeps its page count.
 * 5. Empty freelist → `skipped` without touching the scheduler.
 * 6. The scheduled pass itself (the code the timers run) defers on NONE.
 *
 * The source-level "no VACUUM statement in cleanup.ts" invariant lives in
 * tests/unit/cleanup-column-fix.test.mjs alongside the other cleanup.ts scans.
 *
 * DB isolation mirrors tests/unit/db/vacuum-scheduler.test.ts: temp DATA_DIR,
 * resetDbInstance() before the suite, cleanup in test.after().
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cleanup-reclaim-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
core.resetDbInstance();

const cleanup = await import("../../../src/lib/db/cleanup.ts");
const scheduler = await import("../../../src/lib/db/vacuumScheduler.ts");

type AutoVacuumMode = 0 | 1 | 2;

const noPause = async () => {};

function pragmaNumber(pragma: string): number {
  return Number(core.getDbInstance().pragma(pragma, { simple: true }));
}

/**
 * `auto_vacuum` only changes on a rebuilt file, and VACUUM cannot run in WAL
 * mode while the journal is shared — so switch to DELETE journaling for the
 * rebuild the same way optimizationSettings.ts does, then back to WAL.
 */
function setAutoVacuum(mode: AutoVacuumMode): void {
  const db = core.getDbInstance();
  if (pragmaNumber("auto_vacuum") === mode) return;
  db.pragma("journal_mode = DELETE");
  db.pragma(`auto_vacuum = ${mode}`);
  db.exec("VACUUM");
  db.pragma("journal_mode = WAL");
  assert.equal(pragmaNumber("auto_vacuum"), mode, `auto_vacuum should now be ${mode}`);
}

/** Insert then delete ~`rows` KiB of blobs so the freelist has something on it. */
function churnPages(rows = 1500): void {
  const db = core.getDbInstance();
  db.exec("CREATE TABLE IF NOT EXISTS reclaim_churn (id INTEGER PRIMARY KEY, payload BLOB)");
  const insert = db.prepare("INSERT INTO reclaim_churn (payload) VALUES (?)");
  const blob = Buffer.alloc(1024, 0xab);
  const fill = db.transaction(() => {
    for (let i = 0; i < rows; i += 1) insert.run(blob);
  });
  fill();
  db.prepare("DELETE FROM reclaim_churn").run();
}

test.beforeEach(() => {
  scheduler.__resetForTests();
  const db = core.getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace IN ('scheduler', 'databaseSettings')").run();
  db.exec("DROP TABLE IF EXISTS reclaim_churn");
});

test.after(() => {
  scheduler.__resetForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("INCREMENTAL: freed pages are reclaimed in batches, pausing between them", async () => {
  setAutoVacuum(2);
  churnPages();
  const before = pragmaNumber("freelist_count");
  const pageCountBefore = pragmaNumber("page_count");
  assert.ok(before > 8, `expected a populated freelist, got ${before}`);

  const pauses: number[] = [];
  const result = await cleanup.reclaimFreedPages({
    batchPages: Math.max(1, Math.floor(before / 8)),
    pause: async (lastBatchMs) => {
      pauses.push(lastBatchMs);
    },
  });

  assert.equal(result.mode, "incremental");
  assert.equal(result.stopReason, "drained");
  assert.equal(result.autoVacuum, 2);
  assert.equal(result.pageSize, pragmaNumber("page_size"));
  assert.equal(result.freelistBefore, before);
  assert.equal(result.freelistAfter, 0, "freelist should be fully drained");
  assert.equal(pragmaNumber("freelist_count"), 0);
  assert.ok(result.batches > 1, `expected several batches, got ${result.batches}`);
  assert.equal(pauses.length, result.batches - 1, "must pause between every pair of batches");
  assert.ok(
    pauses.every((ms) => Number.isFinite(ms) && ms >= 0),
    "pause receives the last batch's duration"
  );
  // The pass ends with a TRUNCATE checkpoint, so the truncation reached the main file.
  assert.ok(
    pragmaNumber("page_count") < pageCountBefore,
    `page_count should shrink (${pageCountBefore} -> ${pragmaNumber("page_count")})`
  );
  assert.equal(scheduler.getState().fullVacuumRequestedAt, null, "no full VACUUM request");
});

test("INCREMENTAL: default batch size is derived from page_size (~1 MiB)", async () => {
  setAutoVacuum(2);
  churnPages(4000); // ~4 MiB of blobs → a few default-size batches
  const before = pragmaNumber("freelist_count");
  const pageSize = pragmaNumber("page_size");
  const expectedBatchPages = Math.max(1, Math.floor((1024 * 1024) / pageSize));

  const result = await cleanup.reclaimFreedPages({ pause: noPause });

  assert.equal(result.mode, "incremental");
  assert.equal(result.freelistAfter, 0);
  assert.equal(
    result.batches,
    Math.ceil(before / expectedBatchPages),
    `expected ceil(${before} / ${expectedBatchPages}) batches`
  );
});

test("INCREMENTAL: maxBatches caps a pass and leaves the remainder for the next one", async () => {
  setAutoVacuum(2);
  churnPages();
  const before = pragmaNumber("freelist_count");

  const result = await cleanup.reclaimFreedPages({
    batchPages: 1,
    maxBatches: 3,
    pause: noPause,
  });

  assert.equal(result.mode, "incremental");
  assert.equal(result.stopReason, "max-batches");
  assert.equal(result.batches, 3);
  // incremental_vacuum(1) frees *up to* one page per step (a pointer-map page can absorb a step).
  const after = pragmaNumber("freelist_count");
  assert.ok(
    after >= before - 3 && after < before,
    `expected ${before}-3..${before}-1, got ${after}`
  );
  assert.equal(result.freelistAfter, after);
});

test("INCREMENTAL: the time budget stops a pass early", async () => {
  setAutoVacuum(2);
  churnPages();
  const before = pragmaNumber("freelist_count");

  // Fake clock: every now() call advances 6ms, so the elapsed time crosses a
  // 10ms budget after the first batch and the loop must stop with pages left.
  let tick = 0;
  const result = await cleanup.reclaimFreedPages({
    batchPages: 1,
    timeBudgetMs: 10,
    now: () => {
      tick += 6;
      return tick;
    },
    pause: noPause,
  });

  assert.equal(result.mode, "incremental");
  assert.equal(result.stopReason, "time-budget");
  assert.ok(
    result.batches >= 1 && result.batches < before,
    `stopped early after ${result.batches} of ${before}`
  );
  assert.ok(result.freelistAfter > 0, "some pages must remain for the next pass");
});

test("FULL: nothing to reclaim by hand — SQLite already did it on commit", async () => {
  setAutoVacuum(1);
  churnPages();
  // auto_vacuum=FULL truncates on the DELETE's commit, so the freelist is empty
  // and the pass is a no-op that never runs an incremental batch.
  assert.equal(pragmaNumber("freelist_count"), 0);

  const result = await cleanup.reclaimFreedPages({ pause: noPause });

  assert.equal(result.autoVacuum, 1);
  assert.equal(result.mode, "skipped");
  assert.equal(result.batches, 0);
  assert.equal(scheduler.getState().fullVacuumRequestedAt, null);
});

test("NONE: no rebuild here — a full VACUUM is requested from vacuumScheduler instead", async () => {
  setAutoVacuum(0);
  churnPages();
  const before = pragmaNumber("freelist_count");
  const pageCountBefore = pragmaNumber("page_count");
  assert.ok(before > 0, `expected free pages with auto_vacuum=NONE, got ${before}`);

  const result = await cleanup.reclaimFreedPages({ pause: noPause });

  assert.equal(result.mode, "deferred");
  assert.equal(result.autoVacuum, 0);
  assert.equal(result.batches, 0);
  assert.equal(result.freelistAfter, before, "free pages must be untouched (no VACUUM ran)");
  assert.equal(pragmaNumber("freelist_count"), before);
  // A VACUUM would have rebuilt the file and dropped page_count; it must be unchanged.
  assert.equal(pragmaNumber("page_count"), pageCountBefore, "the file must not have been rebuilt");

  const state = scheduler.getState();
  assert.ok(typeof state.fullVacuumRequestedAt === "number", "request must be recorded");
  assert.match(state.fullVacuumRequestReason ?? "", /auto_vacuum=0/);
  assert.match(state.fullVacuumRequestReason ?? "", new RegExp(`${before} free page`));
});

test("empty freelist → skipped, scheduler untouched", async () => {
  setAutoVacuum(2);
  await cleanup.reclaimFreedPages({ pause: noPause }); // drain leftovers from earlier tests
  assert.equal(pragmaNumber("freelist_count"), 0);

  const result = await cleanup.reclaimFreedPages({ pause: noPause });

  assert.equal(result.mode, "skipped");
  assert.equal(result.batches, 0);
  assert.equal(result.freelistBefore, 0);
  assert.equal(result.stopReason, undefined);
  assert.equal(scheduler.getState().fullVacuumRequestedAt, null);
});

test("runScheduledCleanupPass(): the timers' code path defers on NONE instead of rebuilding", async () => {
  setAutoVacuum(0);
  churnPages();
  const before = pragmaNumber("freelist_count");
  const pageCountBefore = pragmaNumber("page_count");
  assert.ok(before > 0);

  const logged: string[] = [];
  const originalLog = console.log;
  console.log = (...args: unknown[]) => {
    logged.push(args.map(String).join(" "));
  };
  try {
    await cleanup.runScheduledCleanupPass("startup");
  } finally {
    console.log = originalLog;
  }

  assert.equal(pragmaNumber("freelist_count"), before, "no reclamation on NONE");
  assert.equal(pragmaNumber("page_count"), pageCountBefore, "no rebuild on NONE");
  assert.ok(
    typeof scheduler.getState().fullVacuumRequestedAt === "number",
    "the pass must hand the full VACUUM to vacuumScheduler"
  );
  assert.ok(
    logged.some((line) =>
      /\[Cleanup\] Space reclamation after startup cleanup: auto_vacuum=NONE/.test(line)
    ),
    `expected the reclamation summary line, got:\n${logged.join("\n")}`
  );
  assert.ok(
    !logged.some((line) => /Running VACUUM/.test(line)),
    "the old blocking-VACUUM log line must be gone"
  );
});
