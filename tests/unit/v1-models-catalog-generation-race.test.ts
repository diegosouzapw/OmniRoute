// Regression guard — catalog in-flight build survived invalidation and repopulated
// the cache with pre-write state (generation race).
//
// catalogCache coalesces concurrent GET /v1/models onto one in-flight builder and
// drops completed entries when invalidateDbCache() bumps modelCatalogCacheVersion.
// But the in-flight map was keyed only by request shape: a build that STARTED before
// a write could still be JOINED by a request that arrived after it, and when the
// stale build finished it called storePayload unconditionally — repopulating the
// now-current cache with a body built from pre-write DB state.
//
// Fix: every in-flight build is bound to the catalog-state generation it started
// from. New requests only join a current-generation build, and storePayload only
// persists a payload whose build generation still equals the live version. A stale
// build still resolves to its own original caller (that request is legitimately
// waiting on it) but never overwrites the fresh cache.
//
// These tests drive resolveCachedCatalogResponse directly with a deferred builder so
// the interleaving is fully deterministic — no sleeps, no real-time races.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-genrace-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-genrace-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const readCache = await import("../../src/lib/db/readCache.ts");
const catalogCache = await import("../../src/app/api/v1/models/catalogCache.ts");

const HEADER_SOURCES = { corsHeaders: {}, diagnosticHeaders: {} };

function makeRequest() {
  return new Request("http://localhost/v1/models");
}

function makePayload(body: string): catalogCache.CatalogPayload {
  return { body, headers: { "content-type": "application/json" }, status: 200, cacheTTL: 60_000 };
}

/** A builder whose single in-flight promise resolves only when release() is called. */
function deferredBuilder(body: string) {
  let release!: (payload: catalogCache.CatalogPayload) => void;
  let calls = 0;
  const gate = new Promise<catalogCache.CatalogPayload>((resolve) => {
    release = resolve;
  });
  const builder = () => {
    calls += 1;
    return gate;
  };
  return {
    builder,
    release: () => release(makePayload(body)),
    calls: () => calls,
  };
}

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  catalogCache.__resetCatalogBuilderRunsForTest();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a build that started before invalidation is not joined and does not repopulate the cache", async () => {
  // 1. Start the OLD build and hold it in flight.
  const oldBuild = deferredBuilder("OLD");
  const oldResponsePromise = catalogCache.resolveCachedCatalogResponse(
    makeRequest(),
    HEADER_SOURCES,
    oldBuild.builder
  );
  // Let the cold path register its in-flight entry (it awaits inflight.promise).
  await Promise.resolve();
  assert.equal(oldBuild.calls(), 1, "first request starts the old build");

  // 2. Invalidate the catalog state (simulates a settings/connections/combos write).
  readCache.invalidateDbCache("model-capabilities");

  // 3. A new request after the write must NOT join the stale old build — it starts a
  //    FRESH build at the new generation.
  const newBuild = deferredBuilder("NEW");
  const newResponsePromise = catalogCache.resolveCachedCatalogResponse(
    makeRequest(),
    HEADER_SOURCES,
    newBuild.builder
  );
  await Promise.resolve();
  assert.equal(
    newBuild.calls(),
    1,
    "post-invalidation request must run a fresh builder, not join the stale old build"
  );

  // 4. Release the NEW build first — it is current-generation and must populate the cache.
  newBuild.release();
  const newResponse = await newResponsePromise;
  assert.equal(await newResponse.text(), "NEW");

  // 5. Now release the OLD (stale) build. It still resolves to its original caller,
  //    but must NOT overwrite the fresh cache entry.
  oldBuild.release();
  const oldResponse = await oldResponsePromise;
  assert.equal(
    await oldResponse.text(),
    "OLD",
    "stale build still returns its own payload to its original caller"
  );

  // 6. The next request must be served from cache with the FRESH body — proving the
  //    stale old build never repopulated the cache. A cache hit means no builder runs.
  const freshBuild = deferredBuilder("SHOULD-NOT-RUN");
  const cachedResponse = await catalogCache.resolveCachedCatalogResponse(
    makeRequest(),
    HEADER_SOURCES,
    freshBuild.builder
  );
  assert.equal(await cachedResponse.text(), "NEW", "cache must hold the fresh payload");
  assert.equal(freshBuild.calls(), 0, "a cache hit must not run the builder again");
});

test("concurrent requests in the SAME generation still coalesce onto one build", async () => {
  const build = deferredBuilder("SHARED");
  const p1 = catalogCache.resolveCachedCatalogResponse(
    makeRequest(),
    HEADER_SOURCES,
    build.builder
  );
  const p2 = catalogCache.resolveCachedCatalogResponse(
    makeRequest(),
    HEADER_SOURCES,
    build.builder
  );
  await Promise.resolve();
  assert.equal(build.calls(), 1, "same-generation concurrent requests share one build");

  build.release();
  const [r1, r2] = await Promise.all([p1, p2]);
  assert.equal(await r1.text(), "SHARED");
  assert.equal(await r2.text(), "SHARED");
});
