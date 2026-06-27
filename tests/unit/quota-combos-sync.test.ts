/**
 * tests/unit/quota-combos-sync.test.ts
 *
 * TDD coverage for src/lib/quota/quotaCombos.ts::syncQuotaCombos and
 * src/lib/quota/quotaCombos.ts::removeQuotaCombosForPool (Phase B2).
 *
 * Uses "glm" as the test provider because it has a small, stable model list
 * in the static registry (10 models). Mirrors the seeding pattern from
 * quota-key-resolve.test.ts.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-combos-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { syncQuotaCombos, removeQuotaCombosForPool } = await import(
  "../../src/lib/quota/quotaCombos.ts"
);
const { quotaModelName, isQuotaModelName, parseQuotaModelName, quotaPoolSlug } = await import(
  "../../src/lib/quota/quotaModelNaming.ts"
);
const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");

// ---------------------------------------------------------------------------
// Test lifecycle helpers
// ---------------------------------------------------------------------------

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if ((err?.code === "EBUSY" || err?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Helper to list all quota combos from the DB
// ---------------------------------------------------------------------------

async function listQuotaCombos(): Promise<Array<{ name: string; models: unknown[] }>> {
  const all = await combosDb.getCombos();
  return all
    .filter((c) => typeof c.name === "string" && isQuotaModelName(c.name))
    .map((c) => ({
      name: c.name as string,
      models: Array.isArray(c.models) ? (c.models as unknown[]) : [],
    }));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("syncQuotaCombos: creates one combo per glm model with correct name and target", async () => {
  // Seed a glm connection
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-sync-glm",
    apiKey: "sk-test-glm-quota-b2",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  assert.ok(connId, "connection should have an id");

  // Pool defaults to "group-demo" (GroupDemo → slug "groupdemo").
  const pool = poolsDb.createPool({ connectionId: connId, name: "TestGlmPool" });

  await syncQuotaCombos(pool.id);

  const glmModels = PROVIDER_MODELS["glm"] ?? [];
  assert.ok(glmModels.length > 0, "glm should have models in registry");

  const quotaCombos = await listQuotaCombos();
  const quotaComboNames = new Set(quotaCombos.map((c) => c.name));

  // B4: combos are named with the GROUP name ("GroupDemo" → slug "groupdemo"), not pool name.
  const expectedGroupSlug = quotaPoolSlug("GroupDemo");
  for (const model of glmModels) {
    const expectedName = quotaModelName("GroupDemo", "glm", model.id);
    assert.ok(
      quotaComboNames.has(expectedName),
      `Missing combo for model ${model.id}: ${expectedName}`
    );
  }

  // All combos should be under the group slug (not the pool name slug).
  for (const c of quotaCombos) {
    const parsed = parseQuotaModelName(c.name);
    assert.ok(parsed, `Could not parse quota model name: ${c.name}`);
    assert.equal(parsed?.groupSlug, expectedGroupSlug);
  }
});

test("syncQuotaCombos: each combo has a single step with provider=glm and connectionId pinned", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-step-check",
    apiKey: "sk-test-glm-step",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "StepCheckPool" });

  await syncQuotaCombos(pool.id);

  const quotaCombos = await listQuotaCombos();
  assert.ok(quotaCombos.length > 0, "expected at least one quota combo");

  for (const c of quotaCombos) {
    const parsed = parseQuotaModelName(c.name);
    assert.ok(parsed, `unparseable combo name: ${c.name}`);
    assert.equal(parsed?.provider, "glm");

    assert.equal(c.models.length, 1, `combo ${c.name} should have exactly 1 step`);
    const step = c.models[0] as Record<string, unknown>;
    assert.equal(step.kind, "model");

    // Model string includes the provider prefix
    const modelStr = typeof step.model === "string" ? step.model : "";
    assert.ok(
      modelStr.startsWith("glm/") || modelStr === parsed.model,
      `step.model "${modelStr}" should contain the model id "${parsed.model}"`
    );

    // connectionId is pinned to the pool's connection
    assert.equal(
      step.connectionId,
      connId,
      `step.connectionId should be pinned to pool connection ${connId}`
    );
  }
});

test("syncQuotaCombos: idempotent — calling twice produces no duplicates", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-idempotent",
    apiKey: "sk-test-glm-idem",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "IdempotentPool" });

  await syncQuotaCombos(pool.id);
  const afterFirst = await listQuotaCombos();
  const firstCount = afterFirst.length;

  await syncQuotaCombos(pool.id);
  const afterSecond = await listQuotaCombos();

  assert.equal(afterSecond.length, firstCount, "second sync must not create duplicate combos");

  // All names should be identical sets
  const firstNames = new Set(afterFirst.map((c) => c.name));
  const secondNames = new Set(afterSecond.map((c) => c.name));
  for (const name of firstNames) {
    assert.ok(secondNames.has(name), `Name disappeared after second sync: ${name}`);
  }
});

test("syncQuotaCombos: prunes stale combos for same pool slug", async () => {
  // Seed two separate connections and pools, both named to produce different slugs
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-prune-conn",
    apiKey: "sk-test-glm-prune",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "PrunePool" });

  await syncQuotaCombos(pool.id);

  const afterInitial = await listQuotaCombos();
  const initialCount = afterInitial.length;
  assert.ok(initialCount > 0, "should have combos after initial sync");

  // Manually insert a stale combo with the same group+provider slug but a nonexistent model.
  // B4: prune is group+provider scoped. Pool defaults to "group-demo" (GroupDemo → "groupdemo").
  const staleComboName = `qtSd/${quotaPoolSlug("GroupDemo")}/glm/fake-model-stale`;
  await combosDb.createCombo({
    name: staleComboName,
    models: [{ kind: "model", model: "glm/fake-model-stale", providerId: "glm", weight: 100 }],
    strategy: "priority",
    isHidden: true,
  });

  // Verify the stale combo exists
  const stale = await combosDb.getComboByName(staleComboName);
  assert.ok(stale, "stale combo should exist before prune");

  // Re-sync — should prune the stale combo
  await syncQuotaCombos(pool.id);

  const pruned = await combosDb.getComboByName(staleComboName);
  assert.equal(pruned, null, "stale combo should be pruned after re-sync");

  // Desired combos should still be present
  const afterPrune = await listQuotaCombos();
  assert.equal(
    afterPrune.length,
    initialCount,
    "combo count should return to initial after pruning stale"
  );
});

test("removeQuotaCombosForPool: removes all quota combos for the pool", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-remove",
    apiKey: "sk-test-glm-remove",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "RemovePool" });

  await syncQuotaCombos(pool.id);

  const before = await listQuotaCombos();
  assert.ok(before.length > 0, "expected combos to remove");

  await removeQuotaCombosForPool(pool.id);

  const after = await listQuotaCombos();
  assert.equal(after.length, 0, "all quota combos should be removed");
});

test("syncQuotaCombos: does not affect quota combos for a different provider in the same group", async () => {
  // B4: isolation is now by group+provider (not pool name slug).
  // Two pools in the same group (group-demo) but different providers:
  // PoolAlpha = glm, PoolBeta = openrouter. Removing PoolAlpha (glm) should
  // NOT touch PoolBeta's (openrouter) combos.
  const connGlm = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-isolation-glm",
    apiKey: "sk-test-glm-isolation",
  });
  const connGlmId = (connGlm as Record<string, unknown>).id as string;

  const connOr = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "quota-combos-isolation-or",
    apiKey: "sk-test-or-isolation",
  });
  const connOrId = (connOr as Record<string, unknown>).id as string;

  // Both pools default to "group-demo" (same group).
  const poolA = poolsDb.createPool({ connectionId: connGlmId, name: "PoolAlpha" });
  const poolB = poolsDb.createPool({ connectionId: connOrId, name: "PoolBeta" });

  await syncQuotaCombos(poolA.id);
  await syncQuotaCombos(poolB.id);

  const all = await listQuotaCombos();
  const groupSlug = quotaPoolSlug("GroupDemo");

  const forA = all.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "glm";
  });
  const forB = all.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "openrouter";
  });

  assert.ok(forA.length > 0, "PoolAlpha (glm) should have combos");
  assert.ok(forB.length > 0, "PoolBeta (openrouter) should have combos");

  // Removing PoolAlpha (glm) combos should NOT touch PoolBeta's (openrouter) combos.
  await removeQuotaCombosForPool(poolA.id);

  const remaining = await listQuotaCombos();
  const remainingForA = remaining.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "glm";
  });
  const remainingForB = remaining.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "openrouter";
  });

  assert.equal(remainingForA.length, 0, "PoolAlpha (glm) combos should all be removed");
  assert.equal(remainingForB.length, forB.length, "PoolBeta (openrouter) combos should be untouched");
});

test("syncQuotaCombos: unknown pool id — no throw, prunes nothing (no combos exist)", async () => {
  // Should not throw
  await assert.doesNotReject(
    () => syncQuotaCombos("nonexistent-pool-id"),
    "syncQuotaCombos with unknown poolId should not throw"
  );

  const quotaCombos = await listQuotaCombos();
  assert.equal(quotaCombos.length, 0, "no combos should exist");
});

test("removeQuotaCombosForPool: unknown pool id — no throw", async () => {
  await assert.doesNotReject(
    () => removeQuotaCombosForPool("nonexistent-pool-id"),
    "removeQuotaCombosForPool with unknown poolId should not throw"
  );
});

// ---------------------------------------------------------------------------
// Guard B (issue #10): a pool whose connections no longer resolve (empty/dangling
// connection list) must NOT prune/delete the group's existing combos. Pruning is
// provider-scoped, and with no resolvable connection the provider is unknown — so
// syncQuotaCombos returns early (poolProvider === undefined) BEFORE the prune loop.
// This proves the `if (!poolProvider) return` guard covers the empty-connection
// path: a transient connection-resolution failure cannot wipe a group's combos.
// ---------------------------------------------------------------------------

test("syncQuotaCombos: pool with no resolvable connection does NOT prune existing combos (Guard B)", async () => {
  // 1. Seed a glm connection + pool and mint combos.
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-guardB",
    apiKey: "sk-test-glm-guardb",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "GuardBPool" });

  await syncQuotaCombos(pool.id);
  const before = await listQuotaCombos();
  assert.ok(before.length > 0, "expected combos after initial sync");
  const beforeNames = new Set(before.map((c) => c.name));

  // 2. Delete the provider connection while the pool still references it.
  //    The join row (quota_pool_connections) remains → getConnectionIds returns a
  //    dangling id whose getProviderConnectionById() resolves to null. This is the
  //    "connections do not resolve" scenario.
  const removed = await providersDb.deleteProviderConnection(connId);
  assert.equal(removed, true, "connection should be deleted");
  assert.equal(
    await providersDb.getProviderConnectionById(connId),
    null,
    "connection must no longer resolve"
  );

  // 3. Re-sync. With no resolvable connection, poolProvider is undefined → the
  //    guard returns before pruning. Existing combos must be untouched.
  await syncQuotaCombos(pool.id);

  const after = await listQuotaCombos();
  assert.equal(
    after.length,
    before.length,
    "combos must NOT be pruned when the pool has no resolvable connection"
  );
  for (const name of beforeNames) {
    const stillThere = after.some((c) => c.name === name);
    assert.ok(stillThere, `combo was wrongly pruned: ${name}`);
  }
});

test("syncQuotaCombos: pool whose join table is emptied (truly no connectionIds) does NOT prune combos (Guard B)", async () => {
  // Variant of Guard B where the join table itself is empty AND the primary
  // connection is gone — connectionIds falls back to [pool.connectionId], which
  // also fails to resolve. Still must not prune.
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-combos-guardB-empty",
    apiKey: "sk-test-glm-guardb-empty",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "GuardBEmptyPool" });

  await syncQuotaCombos(pool.id);
  const before = await listQuotaCombos();
  assert.ok(before.length > 0, "expected combos after initial sync");

  // Empty the join table for this pool AND delete the connection row.
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { run: (...p: unknown[]) => unknown };
  };
  db.prepare("DELETE FROM quota_pool_connections WHERE pool_id = ?").run(pool.id);
  await providersDb.deleteProviderConnection(connId);

  await syncQuotaCombos(pool.id);

  const after = await listQuotaCombos();
  assert.equal(
    after.length,
    before.length,
    "combos must survive when the pool has an empty/unresolvable connection set"
  );
});
