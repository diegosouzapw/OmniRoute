import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-proxies-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const freeProxiesDb = await import("../../src/lib/db/freeProxies.ts");

async function reset() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("upsertFreeProxy creates a new record", async () => {
  await reset();

  const result = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host: "1.2.3.4",
    port: 8080,
    type: "http",
    countryCode: "US",
    qualityScore: 75,
    latencyMs: 200,
    anonymity: "elite",
    lastValidated: null,
  });

  assert.equal(result.action, "created");
  assert.ok(result.id);
});

test("upsertFreeProxy updates existing record on same source+host+port", async () => {
  await reset();

  await freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host: "1.2.3.4",
    port: 3128,
    type: "http",
    countryCode: "US",
    qualityScore: 60,
    latencyMs: 300,
    anonymity: null,
    lastValidated: null,
  });

  const result = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy",
    host: "1.2.3.4",
    port: 3128,
    type: "https",
    countryCode: "US",
    qualityScore: 80,
    latencyMs: 150,
    anonymity: "elite",
    lastValidated: null,
  });

  assert.equal(result.action, "updated");

  const record = await freeProxiesDb.getFreeProxyById(result.id);
  assert.equal(record?.qualityScore, 80);
  assert.equal(record?.type, "https");
});

test("listFreeProxies filters by source", async () => {
  await reset();

  await freeProxiesDb.upsertFreeProxy({
    source: "1proxy", host: "10.0.0.1", port: 8080, type: "http",
    countryCode: null, qualityScore: null, latencyMs: null, anonymity: null, lastValidated: null,
  });
  await freeProxiesDb.upsertFreeProxy({
    source: "proxifly", host: "10.0.0.2", port: 8080, type: "http",
    countryCode: null, qualityScore: null, latencyMs: null, anonymity: null, lastValidated: null,
  });

  const results = await freeProxiesDb.listFreeProxies({ sources: ["1proxy"] });
  assert.equal(results.length, 1);
  assert.equal(results[0].source, "1proxy");
});

test("listFreeProxies filters by minQuality", async () => {
  await reset();

  await freeProxiesDb.upsertFreeProxy({
    source: "1proxy", host: "10.0.0.1", port: 8080, type: "http",
    countryCode: null, qualityScore: 40, latencyMs: null, anonymity: null, lastValidated: null,
  });
  await freeProxiesDb.upsertFreeProxy({
    source: "1proxy", host: "10.0.0.2", port: 8080, type: "http",
    countryCode: null, qualityScore: 90, latencyMs: null, anonymity: null, lastValidated: null,
  });

  const results = await freeProxiesDb.listFreeProxies({ minQuality: 70 });
  assert.equal(results.length, 1);
  assert.equal(results[0].qualityScore, 90);
});

test("listFreeProxies filters by onlyNotInPool", async () => {
  await reset();

  const r1 = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy", host: "10.0.0.1", port: 8080, type: "http",
    countryCode: null, qualityScore: null, latencyMs: null, anonymity: null, lastValidated: null,
  });
  await freeProxiesDb.upsertFreeProxy({
    source: "1proxy", host: "10.0.0.2", port: 8080, type: "http",
    countryCode: null, qualityScore: null, latencyMs: null, anonymity: null, lastValidated: null,
  });
  await freeProxiesDb.markFreeProxyInPool(r1.id, "pool-proxy-id-1");

  const notInPool = await freeProxiesDb.listFreeProxies({ onlyNotInPool: true });
  assert.equal(notInPool.length, 1);
  assert.equal(notInPool[0].host, "10.0.0.2");
});

test("markFreeProxyInPool sets inPool=true and stores poolProxyId", async () => {
  await reset();

  const { id } = await freeProxiesDb.upsertFreeProxy({
    source: "iplocate", host: "5.6.7.8", port: 3128, type: "http",
    countryCode: "DE", qualityScore: null, latencyMs: null, anonymity: null, lastValidated: null,
  });

  await freeProxiesDb.markFreeProxyInPool(id, "pool-abc-123");

  const record = await freeProxiesDb.getFreeProxyById(id);
  assert.ok(record?.inPool);
  assert.equal(record?.poolProxyId, "pool-abc-123");
});

test("deleteFreeProxy removes record and returns true", async () => {
  await reset();

  const { id } = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy", host: "9.9.9.9", port: 9090, type: "http",
    countryCode: null, qualityScore: null, latencyMs: null, anonymity: null, lastValidated: null,
  });

  const deleted = await freeProxiesDb.deleteFreeProxy(id);
  assert.ok(deleted);

  const record = await freeProxiesDb.getFreeProxyById(id);
  assert.equal(record, null);
});

test("deleteFreeProxy returns false for non-existent id", async () => {
  await reset();

  const deleted = await freeProxiesDb.deleteFreeProxy("00000000-0000-0000-0000-000000000000");
  assert.equal(deleted, false);
});

test("clearFreeProxiesBySource removes only not-in-pool entries for that source", async () => {
  await reset();

  const { id: inPoolId } = await freeProxiesDb.upsertFreeProxy({
    source: "proxifly", host: "11.0.0.1", port: 8080, type: "http",
    countryCode: null, qualityScore: null, latencyMs: null, anonymity: null, lastValidated: null,
  });
  await freeProxiesDb.upsertFreeProxy({
    source: "proxifly", host: "11.0.0.2", port: 8080, type: "http",
    countryCode: null, qualityScore: null, latencyMs: null, anonymity: null, lastValidated: null,
  });
  await freeProxiesDb.upsertFreeProxy({
    source: "1proxy", host: "11.0.0.3", port: 8080, type: "http",
    countryCode: null, qualityScore: null, latencyMs: null, anonymity: null, lastValidated: null,
  });

  await freeProxiesDb.markFreeProxyInPool(inPoolId, "pool-xyz");

  const cleared = await freeProxiesDb.clearFreeProxiesBySource("proxifly");
  assert.equal(cleared, 1);

  const remaining = await freeProxiesDb.listFreeProxies();
  // The in-pool proxifly + the 1proxy remain
  assert.equal(remaining.length, 2);
  assert.ok(remaining.some((r) => r.inPool && r.source === "proxifly"));
  assert.ok(remaining.some((r) => r.source === "1proxy"));
});

test("getFreeProxyStats returns correct totals", async () => {
  await reset();

  const { id: id1 } = await freeProxiesDb.upsertFreeProxy({
    source: "1proxy", host: "20.0.0.1", port: 8080, type: "http",
    countryCode: "US", qualityScore: 60, latencyMs: null, anonymity: null, lastValidated: null,
  });
  await freeProxiesDb.upsertFreeProxy({
    source: "iplocate", host: "20.0.0.2", port: 8080, type: "http",
    countryCode: "BR", qualityScore: 80, latencyMs: null, anonymity: null, lastValidated: null,
  });
  await freeProxiesDb.markFreeProxyInPool(id1, "pool-yyy");

  const stats = await freeProxiesDb.getFreeProxyStats();
  assert.equal(stats.total, 2);
  assert.equal(stats.inPool, 1);
  assert.equal(stats.avgQuality, 70);
  assert.equal(stats.bySource.length, 2);
});
