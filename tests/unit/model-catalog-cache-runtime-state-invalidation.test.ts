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
const readCache = await import("../../src/lib/db/readCache.ts");
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

function findConnection(rows: unknown[], connectionId: string): Record<string, unknown> {
  const row = rows.find(
    (candidate) =>
      typeof candidate === "object" &&
      candidate !== null &&
      (candidate as Record<string, unknown>).id === connectionId
  );
  assert.ok(row, `connection ${connectionId} must be present in the cached result`);
  return row as Record<string, unknown>;
}

async function assertCatalogStillWarm() {
  const response = await resolve(2);
  assert.equal(await response.text(), "build-1");
  assert.equal(
    catalogCache.__getCatalogBuilderRunsForTest(),
    1,
    "runtime-state write must not rebuild the catalog"
  );
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

  await assertCatalogStillWarm();
});

test("a cooldown write refreshes list, raw, and by-ID connection caches", async () => {
  const connectionId = await seedConnection();
  const providerFilter = { provider: "runtime-state-test" };

  await resolve(1);
  await readCache.getCachedProviderConnections(providerFilter);
  await readCache.getCachedRawProviderConnections(providerFilter);
  await readCache.getCachedProviderConnectionById(connectionId);

  const rateLimitedUntil = Date.now() + 60_000;
  await providersDb.setConnectionRateLimitUntil(connectionId, rateLimitedUntil);

  const listRow = findConnection(
    await readCache.getCachedProviderConnections(providerFilter),
    connectionId
  );
  const rawRow = findConnection(
    await readCache.getCachedRawProviderConnections(providerFilter),
    connectionId
  );
  const byIdRow = await readCache.getCachedProviderConnectionById(connectionId);

  assert.equal(Number(listRow.rateLimitedUntil), rateLimitedUntil);
  assert.equal(Number(rawRow.rateLimitedUntil), rateLimitedUntil);
  assert.equal(Number(byIdRow?.rateLimitedUntil), rateLimitedUntil);
  await assertCatalogStillWarm();
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

  await assertCatalogStillWarm();
});

test("an applied conditional error clear refreshes connection state and preserves the catalog", async () => {
  const connectionId = await seedConnection();
  const lastErrorAt = new Date().toISOString();
  const rateLimitedUntil = new Date(Date.now() + 60_000).toISOString();
  await providersDb.updateProviderConnection(connectionId, {
    testStatus: "unavailable",
    lastError: "temporary upstream failure",
    lastErrorAt,
    lastErrorType: "transient",
    lastErrorSource: "upstream",
    errorCode: 503,
    rateLimitedUntil,
    backoffLevel: 2,
  });
  await resolve(1);
  await readCache.getCachedProviderConnectionById(connectionId);

  const applied = await providersDb.clearConnectionErrorIfUnchanged(connectionId, {
    testStatus: "unavailable",
    lastErrorAt,
    rateLimitedUntil,
  });

  assert.equal(applied, true);
  const fresh = await readCache.getCachedProviderConnectionById(connectionId);
  assert.equal(fresh?.testStatus, "active");
  assert.equal(fresh?.lastError, undefined);
  assert.equal(fresh?.backoffLevel, 0);
  await assertCatalogStillWarm();
});

test("resetConnectionBackoff refreshes connection state and preserves the catalog", async () => {
  const connectionId = await seedConnection();
  await providersDb.updateProviderConnection(connectionId, {
    testStatus: "unavailable",
    lastError: "temporary upstream failure",
    lastErrorAt: new Date().toISOString(),
    lastErrorType: "transient",
    lastErrorSource: "upstream",
    errorCode: 503,
    backoffLevel: 3,
  });
  await resolve(1);
  await readCache.getCachedProviderConnectionById(connectionId);

  await providersDb.resetConnectionBackoff(connectionId);

  const fresh = await readCache.getCachedProviderConnectionById(connectionId);
  assert.equal(fresh?.testStatus, "active");
  assert.equal(fresh?.lastError, undefined);
  assert.equal(fresh?.backoffLevel, 0);
  await assertCatalogStillWarm();
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

const failClosedUpdates: Array<{ name: string; update: Record<string, unknown> }> = [
  {
    name: "a mixed runtime and isActive update",
    update: { lastError: "disabled after failure", isActive: false },
  },
  {
    name: "an excludedModels providerSpecificData update",
    update: { providerSpecificData: { excludedModels: ["runtime-state-test/model"] } },
  },
  {
    name: "an update containing an unknown future field",
    update: { futureConnectionState: "unknown" },
  },
  {
    name: "an empty update",
    update: {},
  },
];

for (const { name, update } of failClosedUpdates) {
  test(`${name} invalidates the whole catalog`, async () => {
    const connectionId = await seedConnection();
    await resolve(1);
    assert.equal(catalogCache.__getCatalogBuilderRunsForTest(), 1);

    await providersDb.updateProviderConnection(connectionId, update);

    const response = await resolve(2);
    assert.equal(await response.text(), "build-2");
    assert.equal(
      catalogCache.__getCatalogBuilderRunsForTest(),
      2,
      `${name} must fail closed to full catalog invalidation`
    );
  });
}
