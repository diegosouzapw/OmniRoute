/**
 * Tests for SqliteCircuitBreakerStore — same behavior contract as the Redis
 * store, but persisted to the connection_runtime_state table.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-warmup-sqlite-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../../src/lib/db/core.ts");
const providersDb = await import("../../../../src/lib/db/providers.ts");
const { SqliteCircuitBreakerStore } =
  await import("../../../../src/lib/warmupScheduler/sqliteCircuitBreakerStore.ts");

const store = new SqliteCircuitBreakerStore();

async function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(name: string) {
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

test("recordResult(success): clears streak and records tokens", async () => {
  const c1 = await seedConnection("ok");
  await store.recordResult(c1, {
    success: false,
    tokensUsed: 0,
    durationMs: 1,
    failureKind: "network",
  });
  await store.recordResult(c1, {
    success: false,
    tokensUsed: 0,
    durationMs: 1,
    failureKind: "network",
  });
  let state = await store.get(c1);
  assert.equal(state?.streak, 2);

  await store.recordResult(c1, { success: true, tokensUsed: 9, durationMs: 5 });
  state = await store.get(c1);
  assert.equal(state?.streak, 0);
  assert.equal(state?.lastResult, "success");
  assert.ok(state?.lastWarmupAt, "success should set lastWarmupAt");
  assert.ok(state?.lastFailAt === null, "success clears lastFailAt via clearWarmupCircuit");
});

test("recordResult(forbidden): sets lastResult=forbidden", async () => {
  const c1 = await seedConnection("fb");
  await store.recordResult(c1, {
    success: false,
    tokensUsed: 0,
    durationMs: 1,
    failureKind: "forbidden",
  });
  const state = await store.get(c1);
  assert.equal(state?.lastResult, "forbidden");
});

test("recordResult(rate_limit): increments streak, honors Retry-After", async () => {
  const c1 = await seedConnection("rl");
  const retryAt = new Date(Date.now() + 120 * 1000).toISOString();
  await store.recordResult(c1, {
    success: false,
    tokensUsed: 0,
    durationMs: 1,
    failureKind: "rate_limit",
    retryAfterSeconds: 120,
  });
  const state = await store.get(c1);
  assert.equal(state?.streak, 1);
  assert.ok(state?.until);
  // until should be ~120s out (Retry-After), not the default 5min backoff.
  assert.ok(
    Math.abs(new Date(state.until!).getTime() - new Date(retryAt).getTime()) < 1000,
    "until should honor Retry-After"
  );
});

test("isInBackoff: true when until > now, false otherwise", async () => {
  const c1 = await seedConnection("bo");
  assert.equal(await store.isInBackoff(c1), false);
  await store.recordResult(c1, {
    success: false,
    tokensUsed: 0,
    durationMs: 1,
    failureKind: "rate_limit",
    retryAfterSeconds: 60,
  });
  assert.equal(await store.isInBackoff(c1), true);
});
