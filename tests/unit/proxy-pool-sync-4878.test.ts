import "../../open-sse/utils/setupPolyfill.ts";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-sync-4878-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const freeProxiesDb = await import("../../src/lib/db/freeProxies.ts");
const addToPoolRoute = await import(
  "../../src/app/api/settings/free-proxies/[id]/add-to-pool/route.ts"
);
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");

function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeReq(): Request {
  return new Request("http://localhost/test", { method: "POST" });
}

test.beforeEach(() => {
  reset();
  addToPoolRoute._resetConnectivityTesterForTests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

// ── SUB-FIX 1: non-2xx status when the add fails ─────────────────────────────

test("#4878 add-to-pool returns a non-2xx status when connectivity test fails", async () => {
  const { id } = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host: "10.9.0.1",
    port: 8080,
    type: "http",
    countryCode: null,
    qualityScore: null,
    latencyMs: null,
    anonymity: null,
    lastValidated: null,
  });

  addToPoolRoute._setConnectivityTesterForTests(async () => ({ success: false, latencyMs: 7 }));

  const res = await addToPoolRoute.POST(makeReq(), { params: Promise.resolve({ id }) });
  assert.ok(
    !res.ok && res.status >= 400,
    `expected a non-2xx status on failure, got ${res.status}`
  );
  const body = await res.json();
  assert.equal(body.success, false);
  assert.ok(body.error);

  // Proxy must NOT have been added to the pool.
  const fp = await freeProxiesDb.getFreeProxyById(id);
  assert.ok(!fp?.inPool);
});

test("#4878 add-to-pool still returns 2xx + success:true on the happy path", async () => {
  const { id } = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host: "10.9.0.2",
    port: 8080,
    type: "http",
    countryCode: null,
    qualityScore: null,
    latencyMs: null,
    anonymity: null,
    lastValidated: null,
  });

  addToPoolRoute._setConnectivityTesterForTests(async () => ({
    success: true,
    latencyMs: 5,
    publicIp: "1.2.3.4",
  }));

  const res = await addToPoolRoute.POST(makeReq(), { params: Promise.resolve({ id }) });
  assert.ok(res.ok, `expected a 2xx status on success, got ${res.status}`);
  const body = await res.json();
  assert.equal(body.success, true);
});

// ── SUB-FIX 2: sync timestamp is persisted and surfaced in stats ─────────────

test("#4878 recordFreeProxySync persists a lastSyncAt surfaced by getFreeProxyStats", async () => {
  // No proxies upserted at all → MAX(last_validated) is NULL. The sync
  // timestamp must still be reported once a sync has run.
  const before = await freeProxiesDb.getFreeProxyStats();
  assert.equal(before.lastSyncAt, null);

  const ts = await freeProxiesDb.recordFreeProxySync();
  assert.ok(typeof ts === "string" && ts.length > 0);

  const after = await freeProxiesDb.getFreeProxyStats();
  assert.equal(after.lastSyncAt, ts);
});

test("#4878 recordFreeProxySync advances lastSyncAt on a subsequent sync", async () => {
  const first = await freeProxiesDb.recordFreeProxySync("2020-01-01T00:00:00.000Z");
  assert.equal(first, "2020-01-01T00:00:00.000Z");
  const second = await freeProxiesDb.recordFreeProxySync("2030-06-25T12:00:00.000Z");
  assert.equal(second, "2030-06-25T12:00:00.000Z");

  const stats = await freeProxiesDb.getFreeProxyStats();
  assert.equal(stats.lastSyncAt, "2030-06-25T12:00:00.000Z");
});

// ── SUB-FIX 3: Redis error-log throttle is state-change-gated ─────────────────

test("#4878 shouldLogRedisError only logs once per error-state change", () => {
  const tracker = rateLimiter._createRedisLogThrottleForTests();

  // First error in a run → log.
  assert.equal(tracker.shouldLog("ECONNREFUSED"), true);
  // Same error repeated (retry flood) → suppressed.
  assert.equal(tracker.shouldLog("ECONNREFUSED"), false);
  assert.equal(tracker.shouldLog("ECONNREFUSED"), false);
  // A different error message → state changed → log once more.
  assert.equal(tracker.shouldLog("ETIMEDOUT"), true);
  assert.equal(tracker.shouldLog("ETIMEDOUT"), false);
});
