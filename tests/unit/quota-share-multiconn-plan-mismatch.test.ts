/**
 * Repro for issue #13876 — Quota Sharing dashboard "consumed" does not update.
 *
 * Root cause: the "Limite" wizard step writes a manual plan override (PUT
 * /api/quota/plans/[connectionId]) ONLY for the pool's primary connection
 * (connectionIds[0]) — see PoolWizard.tsx. But a multi-connection pool
 * actually serves traffic through ANY member connection (fallback /
 * round-robin), and:
 *   - the POST-hook (enforce.ts recordConsumption) resolved the plan with
 *     resolvePlan(input.connectionId, provider) — the connection that
 *     actually served THIS request.
 *   - the dashboard read path (GET /api/quota/pools/[id]/usage) resolves the
 *     plan with resolvePlan(pool.connectionId, provider) — always the
 *     primary connection.
 *
 * When the primary connection has a manual override and a non-primary member
 * connection does not (falls through to catalog / empty dimensions), the two
 * paths used DIFFERENT dimension shapes. Consumption got written under one
 * dimensionKey (poolId:unit:window) while the dashboard read a different
 * one, so real traffic never appeared as "consumed" even though it happened.
 *
 * Fix: recordConsumption / enforceQuotaShare now resolve the plan from the
 * pool's canonical (primary) connection, matching the dashboard read path.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-13876-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const plansDb = await import("../../src/lib/db/providerPlans.ts");

test.after(async () => {
  core.resetDbInstance();
  if (fs.existsSync(TEST_DATA_DIR)) {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("multi-connection pool: consumption served via a non-primary connection is visible on the usage dashboard", async () => {
  const { recordConsumption } = await import("../../src/lib/quota/enforce.ts");
  const { resolvePlan } = await import("../../src/lib/quota/planResolver.ts");
  const { getSqliteQuotaStore } = await import("../../src/lib/quota/sqliteQuotaStore.ts");

  const PROVIDER = "quota-13876-test-provider"; // not in the built-in catalog on purpose

  // Pool with 2 member connections sharing quota for one API key.
  // conn-primary is connectionIds[0] — the one the wizard PUTs the plan to.
  // conn-secondary is a normal pool member that can also serve requests
  // (fallback/round-robin across accounts in the same pool).
  const pool = poolsDb.createPool({
    connectionId: "conn-primary",
    connectionIds: ["conn-primary", "conn-secondary"],
    name: "Repro Pool #13876",
    allocations: [{ apiKeyId: "key-shared", weight: 100, policy: "hard" }],
  });

  // The operator opens the wizard's "Limite" step and sets a custom plan —
  // this PUTs only to /api/quota/plans/conn-primary (PoolWizard.tsx primaryConnectionId).
  plansDb.upsertPlan(
    "conn-primary",
    PROVIDER,
    [{ unit: "tokens", window: "daily", limit: 100000 }],
    "manual"
  );

  // Sanity: conn-secondary has no override and the provider has no catalog
  // entry, so resolvePlan for it falls through to the empty plan.
  const secondaryPlan = resolvePlan("conn-secondary", PROVIDER);
  assert.equal(
    secondaryPlan.dimensions.length,
    0,
    "precondition: conn-secondary must resolve to a DIFFERENT (empty) plan than conn-primary"
  );

  // A real request gets served through conn-secondary (the pool's fallback
  // member) and completes successfully — the POST-hook fires.
  await recordConsumption({
    apiKeyId: "key-shared",
    connectionId: "conn-secondary",
    provider: PROVIDER,
    cost: { tokens: 5000, usd: 0, requests: 1 },
  });

  // The Quota Sharing dashboard reads usage the same way the REST route does:
  // resolve the plan from pool.connectionId (always the primary) and read
  // poolUsageWithDimensions with those dimensions.
  const primaryPlan = resolvePlan(pool.connectionId, PROVIDER);
  assert.equal(
    primaryPlan.dimensions.length,
    1,
    "primary connection plan should have the override"
  );

  const store = getSqliteQuotaStore();
  const snapshot = await store.poolUsageWithDimensions(pool.id, primaryPlan.dimensions);

  const tokenDim = snapshot.dimensions.find((d) => d.unit === "tokens");
  assert.ok(tokenDim, "tokens dimension should be present in the snapshot");

  // Consumption served via conn-secondary must be visible under the pool's
  // canonical dimension key, exactly as the dashboard reads it.
  assert.equal(
    tokenDim!.consumedTotal,
    5000,
    `dashboard should show the 5000 tokens actually consumed via conn-secondary, got ${tokenDim!.consumedTotal}`
  );
});
