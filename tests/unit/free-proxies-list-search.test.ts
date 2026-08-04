import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { FreeProxyItem } from "@/lib/freeProxyProviders/types";

// DATA_DIR must be set before the DB core module evaluates its singleton, so we
// make the temp dir + env assignment first, then dynamic-import the modules.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-list-"));
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

function make(host: string, quality: number, latency: number): FreeProxyItem {
  return {
    source: "1proxy",
    host,
    port: 8080,
    type: "http",
    countryCode: "US",
    qualityScore: quality,
    latencyMs: latency,
    anonymity: "elite",
    lastValidated: "2026-01-01T00:00:00.000Z",
  };
}

test("listFreeProxies + countFreeProxies agree on a filtered total", async () => {
  await reset();
  await freeProxiesDb.upsertFreeProxy(make("alpha.example", 90, 100));
  await freeProxiesDb.upsertFreeProxy(make("bravo.example", 40, 300));
  await freeProxiesDb.upsertFreeProxy(make("charlie.example", 70, 200));

  const all = await freeProxiesDb.listFreeProxies({});
  assert.equal(all.length, 3);
  assert.equal(await freeProxiesDb.countFreeProxies({}), 3);
});

test("search filters by host LIKE (case-sensitive on stored host)", async () => {
  await reset();
  await freeProxiesDb.upsertFreeProxy(make("alpha.example", 90, 100));
  await freeProxiesDb.upsertFreeProxy(make("bravo.example", 40, 300));

  const hit = await freeProxiesDb.listFreeProxies({ search: "alph" });
  assert.equal(hit.length, 1);
  assert.equal(hit[0].host, "alpha.example");
  assert.equal(await freeProxiesDb.countFreeProxies({ search: "alph" }), 1);
  assert.equal(await freeProxiesDb.countFreeProxies({ search: "zzz" }), 0);
});

test('sortBy "latency" orders by latency ascending with nulls last', async () => {
  await reset();
  await freeProxiesDb.upsertFreeProxy(make("slow.example", 50, 500));
  await freeProxiesDb.upsertFreeProxy(make("fast.example", 50, 50));
  await freeProxiesDb.upsertFreeProxy(make("mid.example", 50, 200));

  const sorted = await freeProxiesDb.listFreeProxies({ sortBy: "latency" });
  assert.deepEqual(
    sorted.map((p) => p.host),
    ["fast.example", "mid.example", "slow.example"]
  );
});

test('sortBy "quality" orders by quality descending (default)', async () => {
  await reset();
  await freeProxiesDb.upsertFreeProxy(make("low.example", 10, 100));
  await freeProxiesDb.upsertFreeProxy(make("high.example", 99, 100));

  const sorted = await freeProxiesDb.listFreeProxies({});
  assert.deepEqual(
    sorted.map((p) => p.host),
    ["high.example", "low.example"]
  );
});

test("pagination limit+offset is reflected in list but not count", async () => {
  await reset();
  for (let i = 0; i < 5; i++) {
    await freeProxiesDb.upsertFreeProxy(make(`host-${i}.example`, 10 + i, 100));
  }
  const page = await freeProxiesDb.listFreeProxies({ limit: 2, offset: 1 });
  assert.equal(page.length, 2);
  assert.equal(await freeProxiesDb.countFreeProxies({}), 5);
});
