/**
 * Tests for connection_runtime_state DB module (migration 134).
 *
 * Verifies:
 *  - column-level atomic UPSERT (warmup state vs circuit state don't clobber)
 *  - get returns null for unknown connection
 *  - markForbidden sets lastWarmupResult=forbidden
 *  - clearWarmupCircuit zeroes the circuit streak
 *
 * Note: connection_runtime_state has a FK to provider_connections(id), so each
 * test seeds a real (inactive) connection row first.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-crs-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const crs = await import("../../../src/lib/db/connectionRuntimeState.ts");

async function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(name: string) {
  // createProviderConnection always generates its own uuid; capture the returned id.
  const conn = await providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name,
    email: `${name}@example.com`,
    accessToken: "tok",
    refreshToken: "rt",
    isActive: false,
  });
  return conn!.id;
}

test.beforeEach(async () => {
  await resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("get: returns null for unknown connection", async () => {
  assert.equal(crs.getConnectionRuntimeState("nope"), null);
});

test("upsertWarmupState: creates row and reads back", async () => {
  const c1 = await seedConnection("c1");
  await crs.upsertWarmupState(c1, {
    lastWarmupAt: "2026-01-01T00:00:00Z",
    lastResult: "success",
    tokensUsed: 7,
  });
  const row = crs.getConnectionRuntimeState(c1);
  assert.ok(row !== null);
  assert.equal(row.lastWarmupAt, "2026-01-01T00:00:00Z");
  assert.equal(row.lastWarmupResult, "success");
  assert.equal(row.warmupTokensUsed, 7);
});

test("column-level atomic update: warmup state does not clobber circuit streak", async () => {
  const c1 = await seedConnection("c1");
  // Seed a circuit state first.
  await crs.upsertWarmupCircuit(c1, {
    streak: 3,
    until: "2026-02-02T00:00:00Z",
    lastFailAt: "2026-02-01T00:00:00Z",
  });
  // Now update only the warmup state.
  await crs.upsertWarmupState(c1, {
    lastWarmupAt: "2026-03-03T00:00:00Z",
    lastResult: "success",
    tokensUsed: 5,
  });
  const row = crs.getConnectionRuntimeState(c1);
  assert.ok(row !== null);
  // Warmup state updated.
  assert.equal(row.lastWarmupResult, "success");
  assert.equal(row.warmupTokensUsed, 5);
  // Circuit streak preserved (not reset to 0).
  assert.equal(row.warmupCircuitStreak, 3);
  assert.equal(row.warmupCircuitUntil, "2026-02-02T00:00:00Z");
});

test("markForbidden: sets lastWarmupResult=forbidden and persists", async () => {
  const c1 = await seedConnection("c1");
  await crs.markForbidden(c1, "2026-04-04T00:00:00Z");
  const row = crs.getConnectionRuntimeState(c1);
  assert.ok(row !== null);
  assert.equal(row.lastWarmupResult, "forbidden");
  assert.equal(row.lastWarmupAt, "2026-04-04T00:00:00Z");
});

test("clearWarmupCircuit: zeroes streak and clears until", async () => {
  const c1 = await seedConnection("c1");
  await crs.upsertWarmupCircuit(c1, {
    streak: 5,
    until: "2026-05-05T00:00:00Z",
    lastFailAt: "2026-05-04T00:00:00Z",
  });
  await crs.clearWarmupCircuit(c1);
  const row = crs.getConnectionRuntimeState(c1);
  assert.ok(row !== null);
  assert.equal(row.warmupCircuitStreak, 0);
  assert.equal(row.warmupCircuitUntil, null);
  assert.equal(row.warmupLastFailAt, null);
});
