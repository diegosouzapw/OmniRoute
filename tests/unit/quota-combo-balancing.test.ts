/**
 * tests/unit/quota-combo-balancing.test.ts
 *
 * Task 4 TDD — Fix same-provider combo collision:
 * a pool with N connections to the same provider must produce ONE combo
 * per model with ALL connection steps + strategy "fill-first".
 *
 * Uses "openrouter" (1 model: "auto") as test provider.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-quota-combo-balancing-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { syncQuotaCombos } = await import("../../src/lib/quota/quotaCombos.ts");
const { isQuotaModelName, quotaModelName } = await import(
  "../../src/lib/quota/quotaModelNaming.ts"
);
const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");

// ---------------------------------------------------------------------------
// Lifecycle
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
// Helper
// ---------------------------------------------------------------------------

async function listQuotaCombos(): Promise<Array<{ name: string; models: unknown[]; strategy: unknown }>> {
  const all = await combosDb.getCombos();
  return all
    .filter((c) => typeof c.name === "string" && isQuotaModelName(c.name as string))
    .map((c) => ({
      name: c.name as string,
      models: Array.isArray(c.models) ? (c.models as unknown[]) : [],
      strategy: c.strategy,
    }));
}

const PROVIDER = "openrouter";
const FIRST_MODEL = "auto"; // single model in openrouter registry

// ---------------------------------------------------------------------------
// B1 — 2-connection same-provider pool: one combo per model with 2 steps
// ---------------------------------------------------------------------------

test("B1: syncQuotaCombos — 2-connection same-provider pool produces ONE combo per model with 2 steps + fill-first", async () => {
  const modelsForProvider = (PROVIDER_MODELS[PROVIDER] ?? []).map((m) => m.id);
  assert.ok(modelsForProvider.length > 0, `${PROVIDER} must have at least one model in registry`);

  const connA = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "b1-conn-a",
    apiKey: "sk-b1-a",
  });
  const connB = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "b1-conn-b",
    apiKey: "sk-b1-b",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const idB = (connB as Record<string, unknown>).id as string;

  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "BalancingPool B1",
    connectionIds: [idA, idB],
  });

  await syncQuotaCombos(pool.id);

  const quotaCombos = await listQuotaCombos();

  // Assert exactly one combo per model (no collision/duplicate).
  assert.equal(
    quotaCombos.length,
    modelsForProvider.length,
    `expected exactly ${modelsForProvider.length} combo(s), one per model`
  );

  // For each model, assert: one combo, 2 steps, fill-first, both connIds present.
  for (const modelId of modelsForProvider) {
    // B4: combos are named with the GROUP name ("GroupDemo"), not pool name.
    const comboName = quotaModelName("GroupDemo", PROVIDER, modelId);
    const matchingCombos = quotaCombos.filter((c) => c.name === comboName);

    // Exactly ONE combo with this name (no duplicate/collision).
    assert.equal(
      matchingCombos.length,
      1,
      `expected exactly 1 combo named "${comboName}", got ${matchingCombos.length}`
    );

    const combo = matchingCombos[0];

    // Strategy must be fill-first.
    assert.equal(
      combo.strategy,
      "fill-first",
      `combo "${comboName}" strategy should be "fill-first", got "${combo.strategy}"`
    );

    // Must have exactly 2 steps (one per connection).
    assert.equal(
      combo.models.length,
      2,
      `combo "${comboName}" should have 2 steps (one per connection), got ${combo.models.length}`
    );

    // Both connection IDs must appear in the steps.
    const stepConnIds = (combo.models as Array<Record<string, unknown>>).map(
      (s) => s.connectionId
    );
    assert.ok(
      stepConnIds.includes(idA),
      `combo "${comboName}" steps should include connA (${idA}), got: ${JSON.stringify(stepConnIds)}`
    );
    assert.ok(
      stepConnIds.includes(idB),
      `combo "${comboName}" steps should include connB (${idB}), got: ${JSON.stringify(stepConnIds)}`
    );

    // Every step must reference the correct provider and model.
    for (const step of combo.models as Array<Record<string, unknown>>) {
      assert.equal(step.providerId, PROVIDER, `step.providerId should be "${PROVIDER}"`);
      assert.ok(
        typeof step.model === "string" && step.model.includes(modelId),
        `step.model "${step.model}" should include model id "${modelId}"`
      );
    }
  }
});

// ---------------------------------------------------------------------------
// B2 — Single-connection pool still produces a 1-step combo (no regression)
// ---------------------------------------------------------------------------

test("B2: syncQuotaCombos — single-connection pool still produces 1-step combos (regression guard)", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "b2-conn",
    apiKey: "sk-b2",
  });
  const connId = (conn as Record<string, unknown>).id as string;

  const pool = poolsDb.createPool({
    connectionId: connId,
    name: "SingleConnPool B2",
  });

  await syncQuotaCombos(pool.id);

  const quotaCombos = await listQuotaCombos();
  assert.ok(quotaCombos.length > 0, "single-connection pool should produce at least one combo");

  for (const combo of quotaCombos) {
    assert.equal(
      combo.models.length,
      1,
      `single-connection pool combo "${combo.name}" should have exactly 1 step`
    );
    const step = combo.models[0] as Record<string, unknown>;
    assert.equal(step.connectionId, connId, "step.connectionId should be the single connection");
  }
});

// ---------------------------------------------------------------------------
// B3 — Idempotent: running syncQuotaCombos twice on a 2-connection pool
//      still produces exactly 1 combo per model with 2 steps
// ---------------------------------------------------------------------------

test("B3: syncQuotaCombos — idempotent on 2-connection pool (no duplicates after second run)", async () => {
  const connA = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "b3-conn-a",
    apiKey: "sk-b3-a",
  });
  const connB = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "b3-conn-b",
    apiKey: "sk-b3-b",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const idB = (connB as Record<string, unknown>).id as string;

  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "IdempotentBalancingPool B3",
    connectionIds: [idA, idB],
  });

  await syncQuotaCombos(pool.id);
  const afterFirst = await listQuotaCombos();

  await syncQuotaCombos(pool.id);
  const afterSecond = await listQuotaCombos();

  // Same count after both runs.
  assert.equal(
    afterSecond.length,
    afterFirst.length,
    "second sync should not create duplicate combos"
  );

  // Every combo from first run still has exactly 2 steps.
  for (const combo of afterSecond) {
    assert.equal(
      combo.models.length,
      2,
      `after 2nd sync, combo "${combo.name}" should still have 2 steps, got ${combo.models.length}`
    );
    assert.equal(combo.strategy, "fill-first", `combo "${combo.name}" strategy must remain "fill-first"`);
  }
});

// ---------------------------------------------------------------------------
// B4 — After removing one connection → re-sync collapses to 1-step combo
// ---------------------------------------------------------------------------

test("B4: syncQuotaCombos — after removing one connection from pool, re-sync collapses combo to 1 step", async () => {
  const connA = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "b4-conn-a",
    apiKey: "sk-b4-a",
  });
  const connB = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "b4-conn-b",
    apiKey: "sk-b4-b",
  });
  const idA = (connA as Record<string, unknown>).id as string;

  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "CollapsePool B4",
    connectionIds: [idA, (connB as Record<string, unknown>).id as string],
  });

  // Initial sync: 2 steps.
  await syncQuotaCombos(pool.id);
  const initial = await listQuotaCombos();
  for (const c of initial) {
    assert.equal(c.models.length, 2, `initial: combo "${c.name}" should have 2 steps`);
  }

  // Remove connB — pool now has only connA.
  poolsDb.updatePool(pool.id, { connectionIds: [idA] });

  // Re-sync: should collapse to 1 step.
  await syncQuotaCombos(pool.id);
  const after = await listQuotaCombos();

  assert.equal(after.length, initial.length, "combo count should be unchanged after connB removal");
  for (const c of after) {
    assert.equal(c.models.length, 1, `after removal, combo "${c.name}" should collapse to 1 step`);
    const step = c.models[0] as Record<string, unknown>;
    assert.equal(step.connectionId, idA, "remaining step must be pinned to connA");
  }
});

// ---------------------------------------------------------------------------
// B5 — getComboByName: confirming no duplicate combo name exists
// ---------------------------------------------------------------------------

test("B5: after syncQuotaCombos on 2-connection pool, getComboByName returns the N-step combo (no collision)", async () => {
  const connA = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "b5-conn-a",
    apiKey: "sk-b5-a",
  });
  const connB = await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "apikey",
    name: "b5-conn-b",
    apiKey: "sk-b5-b",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const idB = (connB as Record<string, unknown>).id as string;

  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "GetByNamePool B5",
    connectionIds: [idA, idB],
  });

  await syncQuotaCombos(pool.id);

  // B4: combos are named with the GROUP name ("GroupDemo"), not pool name.
  const comboName = quotaModelName("GroupDemo", PROVIDER, FIRST_MODEL);
  const found = await combosDb.getComboByName(comboName);

  assert.ok(found, `getComboByName("${comboName}") should return the combo`);
  assert.ok(Array.isArray(found.models), "combo.models should be an array");
  assert.equal(
    (found.models as unknown[]).length,
    2,
    `combo "${comboName}" models.length should be 2, got ${(found.models as unknown[]).length}`
  );
  assert.equal(found.strategy, "fill-first", `combo "${comboName}" strategy should be "fill-first"`);

  // Verify no second combo by scanning all combos for the same name.
  const all = await combosDb.getCombos();
  const withSameName = all.filter((c) => c.name === comboName);
  assert.equal(
    withSameName.length,
    1,
    `there should be exactly 1 combo named "${comboName}", found ${withSameName.length}`
  );
});
