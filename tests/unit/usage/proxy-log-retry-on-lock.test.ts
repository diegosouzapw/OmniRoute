/**
 * Gate tests for a proxy log batch blocked by a locked database.
 *
 * A first batch write that meets a lock is deferred once, off the request
 * path, and replayed a single time. A second lock drops the batch with the
 * existing log line. Any other error keeps the current behaviour: logged at
 * once, never retried. A clear between the attempts abandons the batch, and
 * two batches under one lock retry independently.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import Database from "better-sqlite3";

// Isolate the DB from other tests and from the real data dir.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-log-retry-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";

// Dynamic imports so DATA_DIR is set before any module initialises the DB.
const core = await import("../../../src/lib/db/core.ts");
const proxyLogger = await import("../../../src/lib/proxyLogger.ts");
const { logProxyEvent, flushProxyLogsSync, clearProxyLogs } = proxyLogger;

function countRows(): number {
  const db = core.getDbInstance();
  const row = db.prepare("SELECT COUNT(*) AS cnt FROM proxy_logs").get() as { cnt: number };
  return row.cnt;
}

function countRowsFor(correlationId: string): number {
  const db = core.getDbInstance();
  const row = db
    .prepare("SELECT COUNT(*) AS cnt FROM proxy_logs WHERE correlation_id = ?")
    .get(correlationId) as { cnt: number };
  return row.cnt;
}

// Cleanup: close DB handle and temp directory so the test runner doesn't hang.
test.after(() => {
  try {
    clearProxyLogs();
  } catch {
    // Best-effort cleanup only.
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  clearProxyLogs();
});

// ── helpers ──────────────────────────────────────────────────────────────────

let entrySeq = 0;

function logOne(correlationId: string, overrides: Record<string, unknown> = {}) {
  entrySeq++;
  return logProxyEvent({
    status: "success",
    level: "direct",
    provider: "test-provider",
    targetUrl: `https://upstream.invalid/${correlationId}/${entrySeq}`,
    correlationId,
    ...overrides,
  });
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

// ── gate 1: locked first, free second → whole batch written once ─────────────

test("proxy batch locked on the first attempt is written once the lock clears", async () => {
  const warnings: unknown[][] = [];
  const warn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args);
  };
  core.getDbInstance();
  const locker = holdWriteLock();
  const correlationId = `proxy-retry-${Date.now()}-1`;
  try {
    logOne(correlationId);
    logOne(correlationId);
    flushProxyLogsSync();
    assert.equal(countRowsFor(correlationId), 0);

    // Free the base before the deferred attempt runs.
    releaseWriteLock(locker);

    assert.equal(await waitFor(() => countRowsFor(correlationId) === 2), true);
    assert.equal(countRowsFor(correlationId), 2);
    assert.equal(warnings.length, 0);
  } finally {
    try {
      if (locker.open) releaseWriteLock(locker);
    } catch {
      // Already released above.
    }
    console.warn = warn;
    const db = core.getDbInstance();
    db.prepare("DELETE FROM proxy_logs WHERE correlation_id = ?").run(correlationId);
  }
});

// ── gate 2: locked twice → dropped with the existing line ────────────────────

test("proxy batch locked on both attempts is dropped with the existing log line", async () => {
  const warnings: unknown[][] = [];
  const warn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args);
  };
  core.getDbInstance();
  const locker = holdWriteLock();
  const correlationId = `proxy-retry-${Date.now()}-2`;
  try {
    logOne(correlationId);
    flushProxyLogsSync();

    // Keep the lock held past the deferred attempt, then wait past any
    // further attempt: a third try would need another full delay window.
    assert.equal(await waitFor(() => warnings.length > 0), true);
    const logged = warnings.length;
    assert.equal(logged, 1);
    assert.match(String(warnings[0][0]), /Failed to write proxy log batch/);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    assert.equal(warnings.length, logged);
    assert.equal(countRowsFor(correlationId), 0);
  } finally {
    try {
      if (locker.open) releaseWriteLock(locker);
    } catch {
      // Already released above.
    }
    console.warn = warn;
  }
});

// ── gate 3: non-lock error → current behaviour, no second attempt ────────────

test("proxy batch failing on another error is logged at once and never retried", async () => {
  const warnings: unknown[][] = [];
  const warn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args);
  };
  const correlationId = `proxy-retry-${Date.now()}-3`;
  try {
    // A missing table is never a lock: the current path logs and stops.
    const db = core.getDbInstance();
    db.exec("ALTER TABLE proxy_logs RENAME TO proxy_logs_backup");
    try {
      logOne(correlationId);
      flushProxyLogsSync();
    } finally {
      db.exec("ALTER TABLE proxy_logs_backup RENAME TO proxy_logs");
    }

    assert.equal(warnings.length, 1);
    assert.match(String(warnings[0][0]), /Failed to write proxy log batch/);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    assert.equal(warnings.length, 1);
    assert.equal(countRowsFor(correlationId), 0);
  } finally {
    console.warn = warn;
  }
});

// ── gate 4: clear between attempts → no re-insert ────────────────────────────

test("proxy batch cleared before the retry is never re-inserted", async () => {
  const warnings: unknown[][] = [];
  const warn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args);
  };
  core.getDbInstance();
  const locker = holdWriteLock();
  const correlationId = `proxy-retry-${Date.now()}-4`;
  try {
    logOne(correlationId);
    flushProxyLogsSync();
    assert.equal(countRows(), 0);

    // flushProxyLogsSync blocks ~2 s on the lock (busy_timeout) then arms
    // the retry (fires 1 s later). Release 0.5 s after the flush returns,
    // then clear while the DB is unlocked (the clear's own DELETE would
    // fail on a held lock) — still inside the armed-but-unfired window, so
    // the retry finds a stale generation and abandons its batch silently.
    await new Promise((resolve) => setTimeout(resolve, 500));
    releaseWriteLock(locker);
    clearProxyLogs();

    await new Promise((resolve) => setTimeout(resolve, 1500));
    assert.equal(countRowsFor(correlationId), 0);
    assert.equal(warnings.length, 0);
  } finally {
    try {
      if (locker.open) releaseWriteLock(locker);
    } catch {
      // Already released above.
    }
    console.warn = warn;
  }
});

// ── isolation: two batches under one lock retry independently ────────────────

test("two proxy batches under one lock each land exactly once", async () => {
  const warnings: unknown[][] = [];
  const warn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args);
  };
  core.getDbInstance();
  const locker = holdWriteLock();
  const firstId = `proxy-retry-${Date.now()}-5a`;
  const secondId = `proxy-retry-${Date.now()}-5b`;
  try {
    logOne(firstId);
    flushProxyLogsSync();
    logOne(secondId);
    flushProxyLogsSync();
    assert.equal(countRowsFor(firstId), 0);
    assert.equal(countRowsFor(secondId), 0);

    releaseWriteLock(locker);

    assert.equal(await waitFor(() => countRowsFor(firstId) === 1), true);
    assert.equal(await waitFor(() => countRowsFor(secondId) === 1), true);
    assert.equal(warnings.length, 0);
  } finally {
    try {
      if (locker.open) releaseWriteLock(locker);
    } catch {
      // Already released above.
    }
    console.warn = warn;
    const db = core.getDbInstance();
    db.prepare("DELETE FROM proxy_logs WHERE correlation_id = ?").run(firstId);
    db.prepare("DELETE FROM proxy_logs WHERE correlation_id = ?").run(secondId);
  }
});

// ── size: N failures arm N timers, all released after firing ─────────────────

test("proxy lock failures arm one timer each and release all after firing", async () => {
  const warnings: unknown[][] = [];
  const warn = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args);
  };
  core.getDbInstance();
  const locker = holdWriteLock();
  const ids = Array.from({ length: 3 }, (_, i) => `proxy-retry-${Date.now()}-6${i}`);
  try {
    // Each flush blocks ~2 s on the lock before arming its own retry: three
    // batches arm three independent timers, one per failure.
    for (const id of ids) {
      logOne(id);
      flushProxyLogsSync();
    }
    for (const id of ids) {
      assert.equal(countRowsFor(id), 0);
    }
    releaseWriteLock(locker);
    // All three deferred retries fire and release: every batch lands once.
    for (const id of ids) {
      assert.equal(await waitFor(() => countRowsFor(id) === 1), true);
    }
    assert.equal(warnings.length, 0);
  } finally {
    try {
      if (locker.open) releaseWriteLock(locker);
    } catch {
      // Already released above.
    }
    console.warn = warn;
    const db = core.getDbInstance();
    for (const id of ids) {
      db.prepare("DELETE FROM proxy_logs WHERE correlation_id = ?").run(id);
    }
  }
});
