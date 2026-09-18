/**
 * Runtime-state connection writes must not drop the /v1/models catalog cache.
 *
 * Measured 2026-09-17 on a live gateway: any error/cooldown write on the chat
 * path (429 cooldowns, markAccountUnavailable, clearAccountError) bumps
 * `modelCatalogCacheVersion` via `invalidateDbCache("connections")`, dropping
 * the whole memoized catalog. With ~2.6 such writes/min against a 60 s TTL,
 * the cache never survives long enough to serve a second request, so
 * `GET /v1/models` pays the full ~7 s rebuild on nearly every call.
 *
 * The catalog builder only consumes `isActive` and
 * `providerSpecificData.excludedModels` from a connection row
 * (catalog.ts filter + hasEligibleConnectionForModel) — never test_status,
 * rate_limited_until, last_error* or backoff_level. These tests pin that
 * contract: runtime-state writes keep the connection read caches fresh
 * (selection must see new cooldowns immediately) but leave the catalog
 * generation alone, while catalog-relevant writes still invalidate it.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-catalog-runtime-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const catalogCache = await import("../../src/app/api/v1/models/catalogCache.ts");

function request() {
  return new Request("http://localhost/v1/models");
}

function payload(body: string): catalogCache.CatalogPayload {
  return {
    body,
    headers: { "content-type": "application/json" },
    status: 200,
    cacheTTL: 60_000,
  };
}

async function resolve(builds: number) {
  return catalogCache.resolveCachedCatalogResponse(
    request(),
    { corsHeaders: {}, diagnosticHeaders: {} },
    async () => payload(`build-${builds}`)
  );
}

async function seedConnection() {
  const created = await providersDb.createProviderConnection({
    provider: "runtime-state-test",
    authType: "api_key",
    apiKey: "sk-runtime-state-test-0123456789",
    isActive: true,
  });
  assert.ok(created?.id, "seed connection must exist");
  return created.id as string;
}

test.beforeEach(() => {
  catalogCache.__resetCatalogBuilderRunsForTest();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("a 429 cooldown write does not drop the cached catalog entry", async () => {
  const connectionId = await seedConnection();
  await resolve(1);
  assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 1);

  await providersDb.setConnectionRateLimitUntil(connectionId, Date.now() + 60_000);

  const second = await resolve(2);
  assert.equal(await second.text(), "build-1");
  assert.equal(
    catalogCache.__getCatalogBuilderRunsForTest(),
    1,
    "cooldown write must not rebuild the catalog"
  );
});

test("a runtime-state connection update does not drop the cached catalog entry", async () => {
  const connectionId = await seedConnection();
  await resolve(1);
  assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 1);

  // Same field set markAccountUnavailable/clearAccountError persist on the
  // chat path — strictly runtime state, no catalog-relevant field among them.
  await providersDb.updateProviderConnection(connectionId, {
    testStatus: "unavailable",
    lastError: "HTTP 402 insufficient balance",
    lastErrorAt: new Date().toISOString(),
    lastErrorType: "quota_exhausted",
    lastErrorSource: "upstream",
    errorCode: 402,
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    backoffLevel: 1,
  });

  const second = await resolve(2);
  assert.equal(await second.text(), "build-1");
  assert.equal(
    catalogCache.__getCatalogBuilderRunsForTest(),
    1,
    "runtime-state update must not rebuild the catalog"
  );
});

test("a catalog-relevant connection update still drops the cached catalog entry", async () => {
  const connectionId = await seedConnection();
  await resolve(1);
  assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 1);

  await providersDb.updateProviderConnection(connectionId, { isActive: false });

  const second = await resolve(2);
  assert.equal(await second.text(), "build-2");
  assert.equal(
    catalogCache.__getCatalogBuilderRunsForTest(),
    2,
    "isActive change must rebuild the catalog"
  );
});
