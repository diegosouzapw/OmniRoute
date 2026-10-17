/**
 * Gate tests for a call log row blocked by a locked database.
 *
 * A first insert that meets a lock is deferred once, off the request path,
 * and replayed a single time. A second lock drops the row with the existing
 * log line. Any other error keeps the current behaviour: logged at once,
 * never retried. A first-attempt success never schedules a second write.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

// Isolate the DB from other tests and from the real data dir.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-call-log-retry-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";

// Dynamic imports so DATA_DIR is set before any module initialises the DB.
const core = await import("../../../src/lib/db/core.ts");
const callLogs = await import("../../../src/lib/usage/callLogs.ts");
const artifactWriter = await import("../../../src/lib/usage/callLogArtifactWriter.ts");
const { saveCallLog, waitForCallLogSaves, getCallLogs } = callLogs;

// Cleanup: close DB handle and temp directory so the test runner doesn't hang.
test.after(async () => {
  try {
    await callLogs.closeCallLogSaves(1000);
  } catch {
    // Best-effort drain only.
  }
  await artifactWriter.closeCallLogArtifactWriter();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── helpers ──────────────────────────────────────────────────────────────────

let entrySeq = 0;

function makeEntry(overrides: Record<string, unknown> = {}) {
  entrySeq++;
  return {
    id: `call-log-retry-${Date.now()}-${entrySeq}`,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "test-model",
    provider: "test-provider",
    duration: 100,
    tokens: { in: 10, out: 5 },
    ...overrides,
  };
}

function countRowsFor(id: string): number {
  const db = core.getDbInstance();
  const row = db.prepare("SELECT COUNT(*) AS cnt FROM call_logs WHERE id = ?").get(id) as {
    cnt: number;
  };
  return row.cnt;
}

/** Hold a write lock on the same SQLite file until released by the caller. */
function holdWriteLock() {
  const db = new Database(path.join(TEST_DATA_DIR, "storage.sqlite"));
  db.exec("BEGIN IMMEDIATE");
  return db;
}

function releaseWriteLock(db: ReturnType<typeof holdWriteLock>) {
  try {
    db.exec("ROLLBACK");
  } finally {
    db.close();
  }
}

/** Wait until `check()` is true, up to `timeoutMs`, polling every 50 ms. */
async function waitFor(check: () => boolean, timeoutMs = 8000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    if (check()) return true;
    if (Date.now() >= deadline) return false;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

async function loggedLines(errors: unknown[][]): Promise<string[]> {
  return errors.map((args) => String(args[0]));
}

// ── gate 1: locked first, free second → row written ──────────────────────────

test("call log locked on the first attempt is written once the lock clears", async () => {
  const errors: unknown[][] = [];
  const log = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  core.getDbInstance();
  const locker = holdWriteLock();
  const entry = makeEntry();
  try {
    // Filled while the rival connection holds the lock: the row cannot land yet.
    // Not awaited: the deferred retry rides an unref'd timer (best-effort at
    // shutdown), so awaiting here would let the loop drain; the polling
    // waitFor below keeps a ref'd handle alive instead.
    void saveCallLog(entry).catch(() => {});
    await new Promise((resolve) => setTimeout(resolve, 2500));
    assert.equal(countRowsFor(entry.id as string), 0);

    // Free the base before the deferred attempt runs.
    releaseWriteLock(locker);

    assert.equal(await waitFor(() => countRowsFor(entry.id as string) === 1), true);
    assert.equal(await waitForCallLogSaves(8000), true);
    assert.equal(countRowsFor(entry.id as string), 1);
    assert.equal(errors.length, 0);
  } finally {
    try {
      if (locker.open) releaseWriteLock(locker);
    } catch {
      // Already released above.
    }
    console.error = log;
    const db = core.getDbInstance();
    db.prepare("DELETE FROM call_logs WHERE id = ?").run(entry.id);
  }
});

// ── gate 2: locked twice → dropped with the existing line ────────────────────

test("call log locked on both attempts is dropped with the existing log line", async () => {
  const errors: unknown[][] = [];
  const log = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  core.getDbInstance();
  const locker = holdWriteLock();
  const entry = makeEntry();
  try {
    void saveCallLog(entry).catch(() => {});

    // Keep the lock held past the deferred attempt, then wait past any
    // further attempt: a third try would need another full delay window.
    assert.equal(await waitFor(() => errors.length > 0), true);
    const logged = errors.length;
    assert.equal(logged, 1);
    assert.match((await loggedLines(errors))[0], /Failed to save call log/);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    assert.equal(errors.length, logged);
    assert.equal(countRowsFor(entry.id as string), 0);
  } finally {
    try {
      if (locker.open) releaseWriteLock(locker);
    } catch {
      // Already released above.
    }
    console.error = log;
  }
});

// ── gate 3: non-lock error → current behaviour, no second attempt ────────────

test("call log failing on another error is logged at once and never retried", async () => {
  const errors: unknown[][] = [];
  const log = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  try {
    // A missing table is never a lock: the current path logs and stops.
    const db = core.getDbInstance();
    db.exec("ALTER TABLE call_logs RENAME TO call_logs_backup");
    try {
      await saveCallLog(makeEntry());
    } finally {
      db.exec("ALTER TABLE call_logs_backup RENAME TO call_logs");
    }

    assert.equal(errors.length, 1);
    assert.match((await loggedLines(errors))[0], /Failed to save call log/);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    assert.equal(errors.length, 1);
  } finally {
    console.error = log;
  }
});

// ── gate 4: first-attempt success → no second attempt ────────────────────────

test("call log succeeding on the first attempt never writes twice", async () => {
  const errors: unknown[][] = [];
  const log = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  const entry = makeEntry();
  try {
    await saveCallLog(entry);
    assert.equal(countRowsFor(entry.id as string), 1);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    assert.equal(countRowsFor(entry.id as string), 1);
    assert.equal(errors.length, 0);
    const logs = await getCallLogs({ limit: 100 });
    assert.ok(logs.some((l: { id: string }) => l.id === entry.id));
  } finally {
    console.error = log;
    const db = core.getDbInstance();
    db.prepare("DELETE FROM call_logs WHERE id = ?").run(entry.id);
  }
});
