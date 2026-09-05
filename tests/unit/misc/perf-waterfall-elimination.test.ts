// Regression guards for upstream issue #11396: the four core hot paths below
// each resolved several independent async reads as a serial waterfall
// (`await a(); await b(); ...`), adding each read's latency to the total.
// They now launch the reads concurrently via Promise.all and destructure the
// results in order.
//
// Why structure guards + one behavioral test:
//  - A pure serial→parallel refactor is invisible in function output, so the
//    only honest canary against silently regressing back to serial awaits is
//    pinning the Promise.all batch shape at each site. These assertions RED
//    against the pre-fix serial source and GREEN against the batched source.
//  - Where the real call graph is reachable from a unit test (the cache
//    route), we also exercise the module end-to-end against an isolated temp
//    DB to prove batching did not disturb result correctness.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function readSource(rel: string): string {
  return fs.readFileSync(path.join(repoRoot, rel), "utf8");
}

// Body of the first `await Promise.all([...]);` in `src` (non-greedy).
function firstPromiseAllBody(src: string): string | null {
  const m = src.match(/await Promise\.all\(\[([\s\S]*?)\]\);/);
  return m ? m[1] : null;
}

// All `await Promise.all([...]);` batch bodies in `src`, in file order.
// Used where a file legitimately contains more than one batch site (deletion.ts
// has one per delete function) so a regression at ANY site fails the guard.
function allPromiseAllBodies(src: string): string[] {
  const bodies: string[] = [];
  const regex = /await Promise\.all\(\[([\s\S]*?)\]\);/g;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(src)) !== null) {
    bodies.push(m[1]);
  }
  return bodies;
}

// ─── A1: Home dashboard render ──────────────────────────────────────────────
test("A1: home page fetches settings + machineId concurrently (#11396)", () => {
  const src = readSource("src/app/(dashboard)/home/page.tsx");

  const pair = src.match(/const \[settings, machineId\] = await Promise\.all\(\[([\s\S]*?)\]\);/s);
  assert.ok(pair, "expected `[settings, machineId] = await Promise.all([...])`");
  assert.match(pair![1], /\bgetSettings\(\)/);
  assert.match(pair![1], /\bgetMachineId\(\)/);
  // destructuring order must stay (settings → machineId), or values swap
  assert.ok(pair![1].indexOf("getSettings()") < pair![1].indexOf("getMachineId()"));

  // both values are still consumed exactly as before the batching
  assert.match(src, /setupComplete=\{Boolean\(settings\.setupComplete\)\}/);
  assert.match(src, /machineId=\{machineId\}/);

  // no serial awaits left for these two reads
  assert.doesNotMatch(src, /await getSettings\(\)\s*;/);
  assert.doesNotMatch(src, /await getMachineId\(\)\s*;/);
});

// ─── F1: /api/cache GET ─────────────────────────────────────────────────────
test("F1: cache route GET batches its four async reads (#11396)", () => {
  const src = readSource("src/app/api/cache/route.ts");
  const body = firstPromiseAllBody(src);
  assert.ok(body, "expected an `await Promise.all([...])` batch in the cache route");

  assert.match(body, /getIdempotencyStats\(\)/);
  assert.match(body, /getCacheMetrics\(\)/);
  assert.match(body, /getCacheTrend\(trendHours\)/);
  // settings-load failure must degrade to {} *inside* the batch, not reject
  // the whole Promise.all and 500 the stats endpoint
  assert.match(body, /getCachedSettings\(\)\.catch\(\s*\(\s*\)\s*=>\s*\(\s*\{\}\s*\)\s*\)/);

  // no serial waterfall remains for the same reads
  assert.doesNotMatch(src, /await getIdempotencyStats\(\)\s*;/);
  assert.doesNotMatch(src, /await getCacheMetrics\(\)\s*;/);
  assert.doesNotMatch(src, /await getCacheTrend\(trendHours\)\s*;/);
  assert.doesNotMatch(src, /const settings = await getCachedSettings\(\)/);
});

// ─── F1 behavioral: real route + real DB, isolated temp data dir ───────────
let core: typeof import("../../../src/lib/db/core.ts");
let TEST_DATA_DIR: string;

test.before(async () => {
  TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-perf-waterfall-"));
  process.env.DATA_DIR = TEST_DATA_DIR;
  process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
  core = await import("../../../src/lib/db/core.ts");
});

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core?.resetDbInstance();
  if (TEST_DATA_DIR) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
  delete process.env.DATA_DIR;
  delete process.env.DISABLE_SQLITE_AUTO_BACKUP;
});

test("F1: cache GET returns correct shapes + trend window after batching (#11396)", async () => {
  const route = await import("../../../src/app/api/cache/route.ts");
  const db = core.getDbInstance();

  // usage_history is the single source for metrics + trend; ensure it exists
  const hasTable = db
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='usage_history'")
    .get();
  if (!hasTable) {
    db.prepare(
      `CREATE TABLE usage_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        provider TEXT, model TEXT, connection_id TEXT, api_key_id TEXT, api_key_name TEXT,
        tokens_input INTEGER DEFAULT 0, tokens_output INTEGER DEFAULT 0,
        tokens_cache_read INTEGER DEFAULT 0, tokens_cache_creation INTEGER DEFAULT 0,
        tokens_reasoning INTEGER DEFAULT 0, status TEXT, timestamp TEXT,
        success INTEGER, latency_ms INTEGER DEFAULT 0, ttft_ms INTEGER DEFAULT 0,
        error_code TEXT
      )`
    ).run();
  }

  const now = Date.now();
  const iso = (t: number) => new Date(t).toISOString();
  const insert = db.prepare(
    `INSERT INTO usage_history
       (provider, model, connection_id, api_key_id, api_key_name,
        tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation,
        tokens_reasoning, status, success, latency_ms, ttft_ms, error_code, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  // cache hit (tokens_cache_read > 0)
  insert.run(
    "test-provider",
    "test-model",
    "conn-1",
    "key-1",
    "k",
    1000,
    100,
    900,
    0,
    0,
    "ok",
    1,
    123,
    45,
    null,
    iso(now - 3_600_000)
  );
  // cache creation (tokens_cache_creation > 0)
  insert.run(
    "test-provider",
    "test-model",
    "conn-2",
    "key-2",
    "k",
    2000,
    200,
    0,
    1500,
    0,
    "ok",
    1,
    200,
    50,
    null,
    iso(now - 7_200_000)
  );
  // plain request — must not pollute cache metrics
  insert.run(
    "test-provider",
    "test-model",
    "conn-3",
    "key-3",
    "k",
    500,
    50,
    0,
    0,
    0,
    "ok",
    1,
    90,
    30,
    null,
    iso(now - 300_000)
  );

  const req = new Request("http://localhost/api/cache?trendHours=48", {
    method: "GET",
    headers: { "x-forwarded-for": "127.0.0.1" },
  });
  const resp = await route.GET(req as never);
  assert.equal(resp.status, 200);
  const body = await resp.json();

  // semanticCache is the sync LRU stats — still present
  assert.ok(body.semanticCache && typeof body.semanticCache.memoryEntries === "number");
  assert.ok(body.semanticCache && typeof body.semanticCache.dbEntries === "number");
  // promptCache aggregates usage_history: allRequests=3, cache-touching=2,
  // cache reads=900, cache creations=1500
  assert.equal(body.promptCache.totalRequests, 3);
  assert.equal(body.promptCache.requestsWithCacheControl, 2);
  assert.equal(body.promptCache.totalCachedTokens, 900);
  assert.equal(body.promptCache.totalCacheCreationTokens, 1500);
  // idempotency stats survive batching
  assert.ok(body.idempotency && typeof body.idempotency === "object");
  // trend honors the requested window and carries the seeded rows
  assert.ok(Array.isArray(body.trend));
  assert.equal(
    body.trend.reduce((s: number, p: { requests: number }) => s + p.requests, 0),
    3
  );
  // config reads settings through the batched getCachedSettings(.catch → {})
  assert.equal(body.config.semanticCacheEnabled, true);

  // trendHours clamping still applies after batching
  const clamped = await route.GET(
    new Request("http://localhost/api/cache?trendHours=99999", {
      headers: { "x-forwarded-for": "127.0.0.1" },
    }) as never
  );
  assert.equal(clamped.status, 200);
  const clampedBody = await clamped.json();
  assert.ok(Array.isArray(clampedBody.trend));
  assert.ok(clampedBody.trend.length >= 1, "clamped 720h window must still see seeded rows");
});

// ─── N1: apiKeys permission probe ───────────────────────────────────────────
test("N1: apiKeys fetches synced + custom models in parallel (#11396)", () => {
  const src = readSource("src/lib/db/apiKeys.ts");

  const pair = src.match(
    /const \[syncedModelsByConnection, customModels\] = await Promise\.all\(\[([\s\S]*?)\]\);/s
  );
  assert.ok(pair, "expected `[syncedModelsByConnection, customModels] = await Promise.all([...])`");
  assert.match(pair![1], /getSyncedAvailableModelsByConnection\(providerId\)/);
  assert.match(pair![1], /getCustomModels\(providerId\)/);
  // destructuring order must stay (synced first, custom second)
  assert.ok(
    pair![1].indexOf("getSyncedAvailableModelsByConnection(providerId)") <
      pair![1].indexOf("getCustomModels(providerId)")
  );

  // the merged view feeding the deny/allow decision is unchanged
  assert.match(
    src,
    /allDiscoveredModels = Object\.values\(syncedModelsByConnection\)\s*\.flat\(\)\s*\.concat\(customModels\)/
  );

  // no serial awaits left behind
  assert.doesNotMatch(src, /await getSyncedAvailableModelsByConnection\(providerId\)/);
  assert.doesNotMatch(src, /await getCustomModels\(providerId\)/);
});

// ─── N2: provider connection deletion ───────────────────────────────────────
test("N2: provider deletion cleanup helpers run in parallel (#11396)", () => {
  const src = readSource("src/lib/db/providers/deletion.ts");

  const batches = allPromiseAllBodies(src);
  assert.equal(
    batches.length,
    3,
    "expected 3 Promise.all batches in deletion.ts (one per delete function)"
  );
  for (const batch of batches) {
    assert.match(batch, /_cleanupDeletedComboConnectionRefs\(/);
    assert.match(batch, /_cleanupDeletedLKGPConnectionRefs\(/);
  }

  // helpers keep swallowing their own errors → the parallel batch cannot reject
  assert.match(src, /Failed to clean up combo route refs for deleted connections/);
  assert.match(src, /Failed to clean up LKGP refs for deleted connections/);

  // side effects that followed the serially-awaited cleanups must still run
  assert.match(src, /revokeNativeCodexTurnPinsForConnection\(id\)/);
  assert.match(src, /removeConnectionHealth\(id\)/);

  // no serial awaits left behind
  assert.doesNotMatch(src, /await _cleanupDeletedComboConnectionRefs\(/);
  assert.doesNotMatch(src, /await _cleanupDeletedLKGPConnectionRefs\(/);
});
