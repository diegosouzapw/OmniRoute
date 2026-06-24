import "../../open-sse/utils/setupPolyfill.ts";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-add-to-pool-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;
delete process.env.OMNIROUTE_API_KEY;

const core = await import("../../src/lib/db/core.ts");
const freeProxiesDb = await import("../../src/lib/db/freeProxies.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const addToPoolRoute =
  await import("../../src/app/api/settings/free-proxies/[id]/add-to-pool/route.ts");
const bulkAddRoute =
  await import("../../src/app/api/settings/free-proxies/bulk-add-to-pool/route.ts");

async function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function makeReq(): Request {
  return new Request("http://localhost/test", { method: "POST" });
}

function makeBulkReq(ids: string[]): Request {
  return new Request("http://localhost/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids }),
  });
}

test.beforeEach(async () => {
  await reset();
  await settingsDb.updateSettings({ requireLogin: false });
  addToPoolRoute._resetConnectivityTesterForTests();
  bulkAddRoute._resetQuickTesterForTests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
  if (ORIGINAL_JWT_SECRET === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  }
});

// ── /[id]/add-to-pool ────────────────────────────────────────────────────────

test("add-to-pool returns 404 for non-existent free proxy", async () => {
  const res = await addToPoolRoute.POST(makeReq(), {
    params: Promise.resolve({ id: randomUUID() }),
  });
  assert.equal(res.status, 404);
  const body = await res.json();
  assert.ok(body.error);
});

test("add-to-pool returns alreadyInPool:true when proxy is already in pool", async () => {
  const { id } = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host: "10.0.0.1",
    port: 8080,
    type: "http",
    countryCode: null,
    qualityScore: null,
    latencyMs: null,
    anonymity: null,
    lastValidated: null,
  });
  await freeProxiesDb.markFreeProxyInPool(id, "existing-pool-id");

  const res = await addToPoolRoute.POST(makeReq(), {
    params: Promise.resolve({ id }),
  });
  const body = await res.json();
  assert.ok(body.success);
  assert.ok(body.alreadyInPool);
  assert.equal(body.poolProxyId, "existing-pool-id");
});

test("add-to-pool returns success:false when connectivity test fails (unreachable proxy)", async () => {
  const { id } = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host: "127.0.0.1",
    port: 1,
    type: "http",
    countryCode: null,
    qualityScore: null,
    latencyMs: null,
    anonymity: null,
    lastValidated: null,
  });

  const res = await addToPoolRoute.POST(makeReq(), {
    params: Promise.resolve({ id }),
  });
  const body = await res.json();
  assert.equal(body.success, false);
  assert.ok(body.error);
  // Proxy must NOT have been added to pool
  const fp = await freeProxiesDb.getFreeProxyById(id);
  assert.ok(!fp?.inPool);
});

// ── /bulk-add-to-pool ────────────────────────────────────────────────────────

test("bulk-add-to-pool returns 400 for invalid body (ids not array)", async () => {
  const req = new Request("http://localhost/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ids: "not-an-array" }),
  });
  const res = await bulkAddRoute.POST(req);
  assert.equal(res.status, 400);
});

test("bulk-add-to-pool returns 400 for empty ids array", async () => {
  const res = await bulkAddRoute.POST(makeBulkReq([]));
  assert.equal(res.status, 400);
});

test("bulk-add-to-pool returns 400 for invalid JSON body", async () => {
  const req = new Request("http://localhost/test", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "not-json",
  });
  const res = await bulkAddRoute.POST(req);
  assert.equal(res.status, 400);
});

test("bulk-add-to-pool: alreadyInPool proxies counted as succeeded", async () => {
  const { id: id1 } = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host: "10.0.0.1",
    port: 8080,
    type: "http",
    countryCode: null,
    qualityScore: null,
    latencyMs: null,
    anonymity: null,
    lastValidated: null,
  });
  const { id: id2 } = await freeProxiesDb.upsertFreeProxy({
    source: "proxifly",
    host: "10.0.0.2",
    port: 8080,
    type: "http",
    countryCode: null,
    qualityScore: null,
    latencyMs: null,
    anonymity: null,
    lastValidated: null,
  });
  await freeProxiesDb.markFreeProxyInPool(id1, "pool-1");
  await freeProxiesDb.markFreeProxyInPool(id2, "pool-2");

  const res = await bulkAddRoute.POST(makeBulkReq([id1, id2]));
  const body = await res.json();
  assert.equal(body.succeeded, 2);
  assert.equal(body.failed, 0);
  assert.equal(body.results.length, 2);
  assert.ok(body.results.every((r: { success: boolean }) => r.success === true));
});

test("bulk-add-to-pool: not-found ids counted as failed", async () => {
  const res = await bulkAddRoute.POST(makeBulkReq([randomUUID(), randomUUID()]));
  const body = await res.json();
  assert.equal(body.succeeded, 0);
  assert.equal(body.failed, 2);
  assert.equal(body.results.length, 2);
  assert.ok(
    body.results.every((r: { success: boolean; error?: string }) => r.success === false && r.error)
  );
});

test("bulk-add-to-pool: response shape with mix of already-in-pool and connectivity failures", async () => {
  // 2 already in pool (succeed)
  const { id: p1 } = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host: "10.1.0.1",
    port: 8080,
    type: "http",
    countryCode: null,
    qualityScore: null,
    latencyMs: null,
    anonymity: null,
    lastValidated: null,
  });
  const { id: p2 } = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host: "10.1.0.2",
    port: 8080,
    type: "http",
    countryCode: null,
    qualityScore: null,
    latencyMs: null,
    anonymity: null,
    lastValidated: null,
  });
  await freeProxiesDb.markFreeProxyInPool(p1, "pool-aaa");
  await freeProxiesDb.markFreeProxyInPool(p2, "pool-bbb");

  // 3 unreachable proxies (fail connectivity)
  const failProxies = await Promise.all(
    [1, 2, 3].map((port) =>
      freeProxiesDb.upsertFreeProxy({
        source: "1proxy",
        host: "127.0.0.1",
        port,
        type: "http",
        countryCode: null,
        qualityScore: null,
        latencyMs: null,
        anonymity: null,
        lastValidated: null,
      })
    )
  );

  const ids = [p1, p2, ...failProxies.map((r) => r.id)];
  const res = await bulkAddRoute.POST(makeBulkReq(ids));
  const body = await res.json();

  assert.equal(body.succeeded, 2);
  assert.equal(body.failed, 3);
  assert.equal(body.results.length, 5);
  assert.ok(body.results.every((r: { id: string }) => typeof r.id === "string"));

  // Verify ids are preserved in results
  for (const id of ids) {
    assert.ok(body.results.some((r: { id: string }) => r.id === id));
  }
});

test("bulk-add-to-pool respects 100-item limit (Zod validation)", async () => {
  const ids = Array.from({ length: 101 }, () => randomUUID());
  const res = await bulkAddRoute.POST(makeBulkReq(ids));
  assert.equal(res.status, 400);
});

// ── Happy path (injected connectivity stub) ──────────────────────────────────

test("add-to-pool happy path: connectivity succeeds → proxy created → marked in pool", async () => {
  const { id } = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host: "10.5.0.1",
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
  const body = await res.json();

  assert.equal(body.success, true);
  assert.ok(typeof body.poolProxyId === "string", "response.poolProxyId should be a string");
  assert.ok(typeof body.latencyMs === "number", "response.latencyMs should be a number");

  const fp = await freeProxiesDb.getFreeProxyById(id);
  assert.ok(fp?.inPool, "free proxy should be marked as in pool");
  assert.equal(fp?.poolProxyId, body.poolProxyId, "poolProxyId should match created proxy id");
});

test("bulk-add-to-pool happy path: connectivity succeeds → proxies created and marked in pool", async () => {
  const p1 = await freeProxiesDb.upsertFreeProxy({
    source: "proxifly",
    host: "10.6.0.1",
    port: 8080,
    type: "http",
    countryCode: null,
    qualityScore: null,
    latencyMs: null,
    anonymity: null,
    lastValidated: null,
  });
  const p2 = await freeProxiesDb.upsertFreeProxy({
    source: "iplocate",
    host: "10.6.0.2",
    port: 8080,
    type: "http",
    countryCode: null,
    qualityScore: null,
    latencyMs: null,
    anonymity: null,
    lastValidated: null,
  });

  bulkAddRoute._setQuickTesterForTests(async () => ({ ok: true, latencyMs: 3 }));

  const res = await bulkAddRoute.POST(makeBulkReq([p1.id, p2.id]));
  const body = await res.json();

  assert.equal(body.succeeded, 2);
  assert.equal(body.failed, 0);
  assert.equal(body.results.length, 2);
  assert.ok(body.results.every((r: { success: boolean }) => r.success));

  const fp1 = await freeProxiesDb.getFreeProxyById(p1.id);
  const fp2 = await freeProxiesDb.getFreeProxyById(p2.id);
  assert.ok(fp1?.inPool, "p1 should be in pool");
  assert.ok(fp2?.inPool, "p2 should be in pool");
});
