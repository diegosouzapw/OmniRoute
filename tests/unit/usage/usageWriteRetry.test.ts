/**
 * Gate tests for the shared deferred write retry.
 *
 * The lock predicate accepts every lock shape and rejects any other error.
 * The generic scheduler runs a deferred task once after the delay, reports
 * a second failure through the abandon callback, and never chains a third
 * run. The usage entry point keeps its deferred single retry through the
 * usage writer below.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

// Isolate the DB from other tests and from the real data dir.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-write-retry-"));
process.env.DATA_DIR = TEST_DATA_DIR;

// Dynamic imports so DATA_DIR is set before any module initialises the DB.
const core = await import("../../../src/lib/db/core.ts");
const usageHistory = await import("../../../src/lib/usage/usageHistory.ts");
const { saveRequestUsage } = usageHistory;

// Cleanup: close DB handle and temp directory so the test runner doesn't hang.
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── helpers ──────────────────────────────────────────────────────────────────

let entrySeq = 0;

function makeEntry(overrides: Record<string, unknown> = {}) {
  entrySeq++;
  const timestamp = new Date(Date.now() + entrySeq).toISOString();

  return {
    provider: "test-provider",
    model: "test-model",
    connectionId: `conn-retry-${entrySeq}`,
    apiKeyId: null,
    apiKeyName: null,
    tokens: { input_tokens: 10, output_tokens: 20 },
    status: "success",
    success: true,
    latencyMs: 100,
    timeToFirstTokenMs: 50,
    errorCode: null,
    comboStrategy: null,
    endpoint: "/v1/chat/completions",
    timestamp,
    ...overrides,
  };
}

function countRows(): number {
  const db = core.getDbInstance();
  const row = db.prepare("SELECT COUNT(*) AS cnt FROM usage_history").get() as { cnt: number };
  return row.cnt;
}

function countRowsFor(connectionId: string): number {
  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT COUNT(*) AS cnt FROM usage_history WHERE connection_id = ?")
    .get(connectionId) as { cnt: number };
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
async function waitFor(check: () => boolean, timeoutMs = 5000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    if (check()) return true;
    if (Date.now() >= deadline) return false;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

/** Ref'd polling handle that keeps the loop alive past an unref'd retry timer. */
async function waitForGeneric(check: () => boolean, timeoutMs = 8000): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    if (check()) return true;
    if (Date.now() >= deadline) return false;
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
}

// ── predicate ────────────────────────────────────────────────────────────────

test("write lock predicate accepts lock shapes and rejects other errors", async () => {
  const { isWriteLockError } = await import("../../../src/lib/usage/usageWriteRetry.ts");
  assert.equal(isWriteLockError(new Error("database is locked")), true);
  assert.equal(isWriteLockError(new Error("database table is locked")), true);
  assert.equal(isWriteLockError(new Error("database schema is locked")), true);
  assert.equal(isWriteLockError(new Error("database is busy")), true);
  assert.equal(isWriteLockError({ code: "SQLITE_BUSY" }), true);
  assert.equal(isWriteLockError({ code: "SQLITE_LOCKED" }), true);
  assert.equal(isWriteLockError({ errcode: 5 }), true);
  assert.equal(isWriteLockError({ errcode: 6 }), true);
  assert.equal(isWriteLockError({ errcode: 0x0505 }), true);
  assert.equal(isWriteLockError("database is locked"), true);
  assert.equal(isWriteLockError(new Error("UNIQUE constraint failed: usage_history.id")), false);
  assert.equal(isWriteLockError(new Error("no such table: usage_history")), false);
});

// ── generic scheduler: deferred task runs once, failure reported, never chained ──

test("generic retry runs the deferred task once after the delay", async () => {
  const { scheduleWriteRetry } = await import("../../../src/lib/usage/usageWriteRetry.ts");
  let calls = 0;
  let failures = 0;
  // The retry rides an unref'd timer, so awaiting it alone would let the
  // loop drain; the polling waitFor below keeps a ref'd handle alive instead.
  const done = scheduleWriteRetry(
    () => {
      calls++;
    },
    () => {
      failures++;
    }
  );
  assert.equal(await waitForGeneric(() => calls === 1), true);
  await done;
  assert.equal(calls, 1);
  assert.equal(failures, 0);
});

test("generic retry reports the second failure and never chains a third run", async () => {
  const { scheduleWriteRetry } = await import("../../../src/lib/usage/usageWriteRetry.ts");
  let calls = 0;
  const seen: unknown[] = [];
  const failing = () => {
    calls++;
    throw new Error("database is locked");
  };
  const done = scheduleWriteRetry(failing, (err) => {
    seen.push(err);
  });
  assert.equal(await waitForGeneric(() => calls === 1), true);
  await done;
  assert.equal(calls, 1);
  assert.equal(seen.length, 1);
  assert.match(String((seen[0] as Error)?.message ?? seen[0]), /database is locked/);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  assert.equal(calls, 1);
  assert.equal(seen.length, 1);
});

// ── gate 1: locked first, free second → one row ──────────────────────────────

test("usage write locked on the first attempt is written once the lock clears", async () => {
  const db = core.getDbInstance();
  const before = countRows();
  const errors: unknown[] = [];
  const log = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  const locker = holdWriteLock();
  const entry = makeEntry();
  try {
    // Filled while the rival connection holds the lock: the row cannot land yet.
    await saveRequestUsage(entry as never);
    assert.equal(countRows(), before);

    // Free the base before the deferred attempt runs.
    releaseWriteLock(locker);

    assert.equal(await waitFor(() => countRows() === before + 1), true);
    assert.equal(countRows(), before + 1);
    assert.equal(errors.length, 0);
    void db;
  } finally {
    try {
      if (locker.open) releaseWriteLock(locker);
    } catch {
      // Already released above.
    }
    console.error = log;
  }
});

// ── gate 2: locked twice → dropped, logged, no third attempt ────────────────

test("usage write locked on both attempts is dropped with one log line", async () => {
  const before = countRows();
  const errors: unknown[][] = [];
  const log = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  const locker = holdWriteLock();
  const entry = makeEntry();
  try {
    await saveRequestUsage(entry as never);

    // Keep the lock held past the deferred attempt, then wait past any
    // further attempt: a third try would need another full delay window.
    assert.equal(await waitFor(() => errors.length > 0), true);
    const logged = errors.length;
    assert.equal(logged, 1);
    assert.match(String(errors[0][0]), /Failed to save usage stats:/);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    assert.equal(errors.length, logged);
    assert.equal(countRows(), before);
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

test("usage write failing on another error is logged at once and never retried", async () => {
  const before = countRows();
  const errors: unknown[][] = [];
  const log = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  try {
    // A missing table is never a lock: the current path logs and stops.
    const db = core.getDbInstance();
    db.exec("ALTER TABLE usage_history RENAME TO usage_history_backup");
    try {
      await saveRequestUsage(makeEntry() as never);
    } finally {
      db.exec("ALTER TABLE usage_history_backup RENAME TO usage_history");
    }

    assert.equal(errors.length, 1);
    assert.match(String(errors[0][0]), /Failed to save usage stats:/);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    assert.equal(errors.length, 1);
    assert.equal(countRows(), before);
  } finally {
    console.error = log;
  }
});

// ── frozen timestamp: first attempt and retry share one value ───────────────

test("usage write retry replays the first-attempt timestamp", async () => {
  const log = console.error;
  console.error = (..._args: unknown[]) => {};
  const locker = holdWriteLock();
  // No timestamp on the entry: the envelope freezes one at the first attempt.
  const entry = makeEntry({ connectionId: "conn-retry-frozen-ts" }) as Record<string, unknown>;
  delete entry.timestamp;
  try {
    const t0 = new Date().toISOString();
    await saveRequestUsage(entry as never);

    // Free the base before the deferred attempt runs.
    releaseWriteLock(locker);

    assert.equal(await waitFor(() => countRowsFor("conn-retry-frozen-ts") === 1), true);
    const t1 = new Date().toISOString();
    const row = core
      .getDbInstance()
      .prepare("SELECT timestamp AS ts FROM usage_history WHERE connection_id = ?")
      .get("conn-retry-frozen-ts") as { ts: string };
    // The retry replayed the frozen value, not one recomputed ~1 s later.
    assert.ok(row.ts >= t0 && row.ts <= t1);
    assert.ok(Date.parse(t1) - Date.parse(row.ts) >= 500);
  } finally {
    try {
      if (locker.open) releaseWriteLock(locker);
    } catch {
      // Already released above.
    }
    console.error = log;
  }
});

// ── gate 4: first-attempt success → no second attempt ────────────────────────
test("usage write succeeding on the first attempt never writes twice", async () => {
  const before = countRows();
  const errors: unknown[] = [];
  const log = console.error;
  console.error = (...args: unknown[]) => {
    errors.push(args);
  };
  try {
    await saveRequestUsage(makeEntry() as never);
    assert.equal(countRows(), before + 1);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    assert.equal(countRows(), before + 1);
    assert.equal(errors.length, 0);
  } finally {
    console.error = log;
  }
});
