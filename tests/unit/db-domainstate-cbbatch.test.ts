/**
 * Tests for queueCircuitBreakerState + flushCircuitBreakerStates.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-cbbatch-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const ds = await import("../../src/lib/db/domainState.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance();
}

test.before(async () => {
  await resetStorage();
});

test.after(async () => {
  // Force-flush any pending timer so the test runner can exit cleanly.
  ds.flushCircuitBreakerStates();
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    // best-effort
  }
});

test("queue 3 states (including duplicate name), force-flush, assert last-write-wins", async () => {
  await resetStorage();

  const state1 = { state: "CLOSED", failureCount: 0, lastFailureTime: null };
  const state2first = { state: "OPEN", failureCount: 3, lastFailureTime: 1000 };
  const state2last = { state: "HALF_OPEN", failureCount: 1, lastFailureTime: 2000 };

  ds.queueCircuitBreakerState("cb-a", state1);
  ds.queueCircuitBreakerState("cb-b", state2first); // will be overwritten
  ds.queueCircuitBreakerState("cb-b", state2last); // last write wins

  // Nothing persisted yet (async)
  assert.strictEqual(
    ds.loadCircuitBreakerState("cb-a"),
    null,
    "should not be persisted before flush"
  );

  ds.flushCircuitBreakerStates();

  const loadedA = ds.loadCircuitBreakerState("cb-a");
  assert.ok(loadedA !== null, "cb-a should be persisted after flush");
  assert.strictEqual(loadedA!.state, "CLOSED");
  assert.strictEqual(loadedA!.failureCount, 0);

  const loadedB = ds.loadCircuitBreakerState("cb-b");
  assert.ok(loadedB !== null, "cb-b should be persisted after flush");
  // last-write-wins: state2last
  assert.strictEqual(loadedB!.state, "HALF_OPEN", "last-write-wins for duplicate name");
  assert.strictEqual(loadedB!.failureCount, 1);
  assert.strictEqual(loadedB!.lastFailureTime, 2000);

  // Result must equal what saveCircuitBreakerState would have written
  await resetStorage();
  ds.saveCircuitBreakerState("cb-a", state1);
  ds.saveCircuitBreakerState("cb-b", state2last);
  const refA = ds.loadCircuitBreakerState("cb-a")!;
  const refB = ds.loadCircuitBreakerState("cb-b")!;

  // Re-flush the same states and compare
  await resetStorage();
  ds.queueCircuitBreakerState("cb-a", state1);
  ds.queueCircuitBreakerState("cb-b", state2first);
  ds.queueCircuitBreakerState("cb-b", state2last);
  ds.flushCircuitBreakerStates();

  assert.deepEqual(ds.loadCircuitBreakerState("cb-a"), refA);
  assert.deepEqual(ds.loadCircuitBreakerState("cb-b"), refB);
});

test("auto-flush timer (~100ms) persists queued states", async () => {
  await resetStorage();

  const stateX = { state: "OPEN", failureCount: 5, lastFailureTime: 9999 };
  ds.queueCircuitBreakerState("cb-auto", stateX);

  // Should NOT be visible immediately
  assert.strictEqual(ds.loadCircuitBreakerState("cb-auto"), null);

  // Wait for auto-flush (~100ms + margin)
  await new Promise((r) => setTimeout(r, 200));

  const loaded = ds.loadCircuitBreakerState("cb-auto");
  assert.ok(loaded !== null, "should be persisted after auto-flush timer fires");
  assert.strictEqual(loaded!.state, "OPEN");
  assert.strictEqual(loaded!.failureCount, 5);
});

test("flushCircuitBreakerStates is idempotent when queue is empty", async () => {
  await resetStorage();
  // Should not throw
  ds.flushCircuitBreakerStates();
  ds.flushCircuitBreakerStates();
});
