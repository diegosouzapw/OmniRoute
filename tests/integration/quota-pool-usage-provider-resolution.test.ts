/**
 * Integration: GET /api/quota/pools/[id]/usage must resolve the pool's provider
 * from its connection so catalog-only pools (no manual `provider_plans` row)
 * still surface their plan dimensions.
 *
 * Regression: the route passed `resolvePlan(pool.connectionId, "")` with an
 * empty provider, so `getKnownPlan("")` returned null → empty plan → the route
 * fell back to the dimension-less `poolUsage()` snapshot, blanking the
 * dashboard (StackedAllocationBar / DimensionBar / BurnRateChart) for every
 * catalog-only pool.
 *
 * Fix: resolve the provider via `resolveConnectionProvider(connectionId)`
 * (awaited DB lookup) and pass it to `resolvePlan`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-quota-pool-usage-provider-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-quota-usage-provider-secret";
process.env.QUOTA_STORE_DRIVER = "sqlite";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const { createPool, upsertAllocations, createProviderConnection } = localDb;
const { resetQuotaStoreSingleton } = await import("../../src/lib/quota/QuotaStore.ts");
const usageRoute = await import("../../src/app/api/quota/pools/[id]/usage/route.ts");

function resetDb() {
  core.resetDbInstance();
  resetQuotaStoreSingleton();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetDb();
});

test.after(() => {
  core.resetDbInstance();
  resetQuotaStoreSingleton();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /usage surfaces catalog dimensions for a catalog-only pool (provider resolved from connection)", async () => {
  // kimi has a catalog plan: { unit: 'requests', window: 'hourly', limit: 1500 }
  const conn = (await createProviderConnection({
    provider: "kimi",
    name: "kimi-usage-test",
    authType: "apikey",
    apiKey: "sk-kimi-test",
  })) as { id: string };

  const pool = createPool({ name: "Kimi Shared Pool", connectionId: conn.id });
  upsertAllocations(pool.id, [{ apiKeyId: "key-a", weight: 100, policy: "hard" }]);

  const req = await makeManagementSessionRequest(
    `http://localhost/api/quota/pools/${pool.id}/usage`
  );
  const res = await usageRoute.GET(req, { params: Promise.resolve({ id: pool.id }) });
  assert.equal(res.status, 200);

  const body = (await res.json()) as {
    usage: {
      dimensions: Array<{ unit: string; window: string; limit: number }>;
    };
  };

  // Regression assertion: was [] because resolvePlan(connId, "") found no catalog match.
  assert.ok(
    body.usage.dimensions.length >= 1,
    "catalog-only pool must surface plan dimensions (was blank)"
  );
  const dim = body.usage.dimensions[0];
  assert.equal(dim.unit, "requests");
  assert.equal(dim.window, "hourly");
  assert.equal(dim.limit, 1500);
});

test("GET /usage still returns a 200 snapshot when the provider has no catalog plan", async () => {
  // A provider with no catalog entry resolves to an empty (manual) plan; the
  // route must still return a 200 minimal snapshot (no dimensions), not error.
  const conn = (await createProviderConnection({
    provider: "some-unknown-provider",
    name: "unknown-usage-test",
    authType: "apikey",
    apiKey: "sk-unknown-test",
  })) as { id: string };

  const pool = createPool({ name: "Unknown Pool", connectionId: conn.id });

  const req = await makeManagementSessionRequest(
    `http://localhost/api/quota/pools/${pool.id}/usage`
  );
  const res = await usageRoute.GET(req, { params: Promise.resolve({ id: pool.id }) });
  assert.equal(res.status, 200);
  const body = (await res.json()) as { usage: { dimensions: unknown[] } };
  assert.ok(Array.isArray(body.usage.dimensions));
});
