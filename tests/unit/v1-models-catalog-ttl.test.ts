// Regression guard — GET /v1/models re-ran the full builder on almost every request.
//
// The response cache added by #6408 memoized the serialized body for
// CATALOG_CACHE_TTL_MS_DEFAULT, which was 1500 ms. On a real install the builder
// takes tens of seconds (measured 2026-07-28 on the production VPS: ~49 s for a
// 1.3 MB / 2645-model catalog), so any two requests more than 1.5 s apart both
// missed the fresh window. The second one fell into the stale-while-revalidate
// path, which kicks off the rebuild via setTimeout(…, 0) — and because the builder
// is overwhelmingly synchronous (SQLite reads + 8 registry walks) under the
// single-threaded App Router, it pins the event loop, so even the "served
// immediately" stale response only reaches the client once the rebuild finishes.
// Net effect: a ~50 s response on essentially every call.
//
// A short TTL is redundant with the invalidation this cache already has:
// invalidateDbCache() bumps modelCatalogCacheVersion on every settings/connections/
// combos/pricing write, and dropCatalogCacheIfStateChanged() drops the whole cache
// the moment it moves. So post-write freshness does not depend on the TTL at all —
// the TTL only governs the "nothing was written" case, where serving a body that is
// a few seconds old is exactly what a cache is for.
//
// This test pins that: with DB state untouched, a request arriving well after the
// old 1.5 s window must still be served from cache without a second builder run.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-ttl-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-ttl-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const catalogCache = await import("../../src/app/api/v1/models/catalogCache.ts");

/** Comfortably past the old 1500 ms TTL, and a realistic client poll gap. */
const GAP_MS = 10_000;

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("the settings default and the constant agree on the catalog TTL", async () => {
  // catalog.ts resolves the TTL as `dbSettings.cache?.modelCatalogCacheTtlMs ??
  // CATALOG_CACHE_TTL_MS_DEFAULT`. The `??` never falls through while the settings
  // default is defined, so the settings value is the one that takes effect and raising
  // only the constant is a silent no-op — which is exactly how the first attempt at
  // this fix measured identical to no fix at all.
  const { DEFAULT_DATABASE_SETTINGS } = await import("../../src/types/databaseSettings.ts");
  assert.equal(
    DEFAULT_DATABASE_SETTINGS.cache.modelCatalogCacheTtlMs,
    catalogCache.CATALOG_CACHE_TTL_MS_DEFAULT,
    "settings default and CATALOG_CACHE_TTL_MS_DEFAULT drifted — the settings value wins, " +
      "so the constant alone does not change runtime behavior"
  );
});

test("the effective TTL stays within what the settings schema accepts", async () => {
  const { databaseSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");
  // An operator must be able to configure the value the product ships with; a default
  // above the schema ceiling would be rejected the moment anyone saved settings.
  const parsed = databaseSettingsSchema.shape.cache.shape.modelCatalogCacheTtlMs.safeParse(
    catalogCache.CATALOG_CACHE_TTL_MS_DEFAULT
  );
  assert.ok(
    parsed.success,
    `default TTL ${catalogCache.CATALOG_CACHE_TTL_MS_DEFAULT} ms is outside the range the ` +
      `settings schema allows`
  );
});

test("the default TTL outlives a realistic gap between catalog polls", () => {
  assert.ok(
    catalogCache.CATALOG_CACHE_TTL_MS_DEFAULT >= GAP_MS,
    `default catalog TTL is ${catalogCache.CATALOG_CACHE_TTL_MS_DEFAULT} ms — too short to ` +
      `survive a ${GAP_MS} ms gap, so every poll pays a full rebuild (~49 s in production)`
  );
});

test("a request after the old 1.5s window is served from cache, without a second builder run", async (t) => {
  // Fake Date so the cache's expiresAt comparison sees the gap without sleeping.
  // Timer callbacks stay real: scheduleBackgroundRefresh() uses setTimeout(…, 0),
  // and mocking that away would hide the very rebuild this test must not trigger.
  t.mock.timers.enable({ apis: ["Date"] });

  const res1 = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models")
  );
  assert.equal(res1.status, 200);
  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    1,
    "cold request must run the builder exactly once"
  );
  const body1 = await res1.text();

  t.mock.timers.tick(GAP_MS);

  const res2 = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models")
  );
  assert.equal(res2.status, 200);
  assert.equal(await res2.text(), body1, "cached response must be byte-identical");

  // The stale path returns the body immediately and rebuilds via setTimeout(…, 0), so
  // reading the counter right here would still show 1 even when the request missed the
  // fresh window. Let any scheduled refresh settle first — a rebuild that happens at all
  // is the defect: in production it pins the event loop and the "immediate" stale
  // response is only flushed ~49 s later.
  await catalogCache.__flushCatalogBackgroundRefreshForTest();
  await new Promise((resolve) => setTimeout(resolve, 0));
  await catalogCache.__flushCatalogBackgroundRefreshForTest();

  assert.equal(
    v1ModelsCatalog.__getCatalogBuilderRunsForTest(),
    1,
    `builder re-ran ${GAP_MS} ms after the first request with no DB write in between — ` +
      `the caller pays a full rebuild on every poll`
  );
});
