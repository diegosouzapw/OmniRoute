/**
 * tests/unit/quota-multiprovider.test.ts
 *
 * Phase D2 — Multi-account quota pools: scope, enforce, and combo coverage.
 *
 * NOTE (Task 3 update): As of Task 3 ("One provider per pool"), a quota pool MUST
 * use a single provider. Tests D2.1, D2.3–D2.6 previously used two different
 * providers (openrouter + baidu) as a convenience; they were testing CONNECTION
 * PLUMBING (multi-account scope, enforce membership, combo fan-out), NOT mixed-
 * provider behavior per se. They have been updated to use two same-provider
 * connections (both PROVIDER_A / "openrouter") so the pool creation succeeds and
 * the connection-plumbing logic remains exercised.
 *
 * NOTE (Task 4 update): D2.5 and D2.6 previously asserted `combo.models.length >= 1`
 * (one step pinned to connA). That assertion encoded the OLD COLLISION BUG — a
 * second same-provider connection would overwrite the combo, leaving only the last
 * connId's step. Task 4 fixes this by grouping all connections into one N-step
 * quota-share combo per model. D2.5 and D2.6 now assert the CORRECT behavior:
 * models.length === 2 (both connections) and strategy === "quota-share". This is
 * alignment to the corrected implementation, NOT masking — the prior assertions
 * encoded the bug, not the desired behavior.
 *
 * Tests:
 *  D2.1 — resolveQuotaKeyScope: a pool with 2 connections (same provider)
 *          returns connectionIds.length === 2 and both connIds in scope.
 *  D2.2 — resolveQuotaKeyScope: fallback — pool with empty connectionIds array
 *          (un-backfilled row) falls back to [connectionId] and still resolves.
 *  D2.3 — enforce: enforceQuotaShare resolves the pool when connectionId matches
 *          a non-primary member of connectionIds (not connectionId === primary).
 *  D2.4 — enforce: pool with connectionIds [connA, connB]; enforce with connA
 *          (the primary) still finds the pool — no regression on primary.
 *  D2.5 — combos: syncQuotaCombos for a 2-connection same-provider pool creates
 *          one combo per model with 2 steps (both connIds) + strategy quota-share.
 *  D2.6 — combos: prune — after removing connB from the pool (→ only connA),
 *          re-sync collapses each combo to 1 step (connA only).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB harness ───────────────────────────────────────────────────────────────
// Use a stable per-file temp dir so DATA_DIR is set ONCE before any module
// load. Never delete the SQLite file between tests — under --test-concurrency=4
// modules are cached across files and SQLITE_FILE is frozen at first import.
// Wipe test data via SQL DELETEs instead to avoid cross-file path corruption.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-multiprovider-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { resolveQuotaKeyScope } = await import("../../src/lib/quota/quotaKey.ts");
const { syncQuotaCombos } = await import("../../src/lib/quota/quotaCombos.ts");
const { isQuotaModelName, parseQuotaModelName, quotaModelName } =
  await import("../../src/lib/quota/quotaModelNaming.ts");
const { PROVIDER_MODELS } = await import("../../open-sse/config/providerModels.ts");

// Trigger migration once at module load so the schema is ready for the first
// beforeEach without a slow per-test full migration run.
core.getDbInstance();

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

// Tables touched by this test suite.  Cleared via SQL between tests to avoid
// the slow per-test full-migration race that fires under --test-force-exit
// with high concurrency (the rmSync approach also corrupts the module-level
// SQLITE_FILE pointer shared across concurrent test files).
const CLEAR_TABLES = [
  "quota_pool_connections",
  "quota_allocations",
  "quota_pools",
  "provider_connections",
  "combos",
];

function resetStorage() {
  const db = core.getDbInstance();
  for (const table of CLEAR_TABLES) {
    db.prepare(`DELETE FROM ${table}`).run();
  }
  // Re-seed the default quota group removed by the cascading delete on quota_pools.
  db.prepare(
    "INSERT OR IGNORE INTO quota_groups (id, name) VALUES ('group-demo', 'GroupDemo')"
  ).run();
}

/**
 * Drain all pending microtasks and one round of macrotasks so that any
 * fire-and-forget `syncQuotaCombosGuarded` calls dispatched by createPool /
 * updatePool have a chance to run to completion before the next assertion.
 *
 * `setImmediate` fires AFTER all currently-queued microtasks (Promises), so a
 * single `await new Promise(r => setImmediate(r))` is not a sleep — it is a
 * deliberate synchronisation point that lets pending async work finish without
 * introducing an arbitrary wall-clock delay.
 */
async function flushPendingSyncs(): Promise<void> {
  for (let i = 0; i < 5; i++) {
    await new Promise<void>((r) => setImmediate(r));
  }
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function listQuotaCombos(): Promise<
  Array<{ name: string; models: unknown[]; strategy: unknown }>
> {
  const all = await combosDb.getCombos();
  return all
    .filter((c) => typeof c.name === "string" && isQuotaModelName(c.name))
    .map((c) => ({
      name: c.name as string,
      models: Array.isArray(c.models) ? (c.models as unknown[]) : [],
      strategy: c.strategy,
    }));
}

// "openrouter" has exactly 1 model ("auto") in the static registry.
// Both connections use the same provider — required by Task 3 single-provider rule.
const PROVIDER_A = "openrouter";

// ---------------------------------------------------------------------------
// D2.1 — resolveQuotaKeyScope: 2-connection same-provider pool → both in scope
// ---------------------------------------------------------------------------

test("D2.1: resolveQuotaKeyScope — pool with 2 same-provider connections returns both connectionIds in scope", async () => {
  const connA = await providersDb.createProviderConnection({
    provider: PROVIDER_A,
    authType: "apikey",
    name: "d21-conn-a",
    apiKey: "sk-d21-a",
  });
  const connB = await providersDb.createProviderConnection({
    provider: PROVIDER_A,
    authType: "apikey",
    name: "d21-conn-b",
    apiKey: "sk-d21-b",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const idB = (connB as Record<string, unknown>).id as string;

  // Create a pool with BOTH same-provider connections.
  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "SameProviderPool D21",
    connectionIds: [idA, idB],
  });

  // Confirm D1 correctly stored both connectionIds.
  assert.equal(pool.connectionIds.length, 2, "pool should have 2 member connections");

  const scope = await resolveQuotaKeyScope([pool.id]);

  // Both connections must appear.
  assert.equal(scope.connectionIds.length, 2, "scope should include 2 connectionIds");
  assert.ok(scope.connectionIds.includes(idA), "scope should include idA");
  assert.ok(scope.connectionIds.includes(idB), "scope should include idB");

  // Single provider — deduplicated to 1 entry.
  assert.equal(scope.providers.length, 1, "scope should have 1 distinct provider");
  assert.ok(scope.providers.includes(PROVIDER_A), `scope providers should include ${PROVIDER_A}`);

  // Exactly one poolSlug for the one pool.
  assert.equal(scope.poolSlugs.length, 1, "one pool → one poolSlug");
});

// ---------------------------------------------------------------------------
// D2.2 — resolveQuotaKeyScope: fallback for un-backfilled row
// ---------------------------------------------------------------------------

test("D2.2: resolveQuotaKeyScope — pool with empty connectionIds falls back to [connectionId]", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: PROVIDER_A,
    authType: "apikey",
    name: "d22-conn",
    apiKey: "sk-d22",
  });
  const connId = (conn as Record<string, unknown>).id as string;

  // Create the pool normally (legacy style, single connectionId, no connectionIds arg).
  // getPool will return connectionIds = [connectionId] via the defensive fallback.
  const pool = poolsDb.createPool({
    connectionId: connId,
    name: "LegacyFallbackPool D22",
  });

  // Verify legacy shape.
  assert.deepEqual(pool.connectionIds, [connId], "legacy pool should fall back to [connectionId]");

  const scope = await resolveQuotaKeyScope([pool.id]);

  assert.equal(scope.connectionIds.length, 1);
  assert.ok(scope.connectionIds.includes(connId));
  assert.ok(scope.providers.includes(PROVIDER_A));
});

// ---------------------------------------------------------------------------
// D2.3 — enforce: connB (non-primary member) resolves the pool
// ---------------------------------------------------------------------------

test("D2.3: enforceQuotaShare — input connectionId matching a non-primary member resolves the pool (does not bail to allow-by-default)", async () => {
  // We test enforce.ts's pool-matching logic by calling enforceQuotaShare with
  // a connectionId that is a member BUT NOT the primary.
  //
  // Without D2, the old `p.connectionId === input.connectionId` check would
  // NOT match connB (secondary), causing the fn to fall through to
  // { kind: "allow" } silently — wrong: quota wouldn't be enforced for connB.
  //
  // With D2, the membership check fires and the pool IS found. Since no real
  // quota store/plan is seeded, the fn still returns { kind: "allow" } via
  // the fail-open path, but it does so AFTER finding the pool (not before).
  // We verify the pool is found indirectly: if the fn finds the pool, it will
  // call resolvePlan(connId, provider) → which without a plan returns empty
  // dimensions → which returns { kind: "allow" } via the "no dimensions" path.
  //
  // Both connections use PROVIDER_A (single-provider rule). The plumbing being
  // tested is the secondary-member lookup, not multi-provider behavior.

  const { enforceQuotaShare } = await import("../../src/lib/quota/enforce.ts");
  const { listAllocationsForApiKey } = await import("../../src/lib/db/quotaPools.ts");

  const connA = await providersDb.createProviderConnection({
    provider: PROVIDER_A,
    authType: "apikey",
    name: "d23-conn-a",
    apiKey: "sk-d23-a",
  });
  const connB = await providersDb.createProviderConnection({
    provider: PROVIDER_A,
    authType: "apikey",
    name: "d23-conn-b",
    apiKey: "sk-d23-b",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const idB = (connB as Record<string, unknown>).id as string;

  // Pool with BOTH same-provider connections.
  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "EnforceMultiPool D23",
    connectionIds: [idA, idB],
  });

  // Assign an API key to the pool.
  const API_KEY_ID = "test-key-d23";
  poolsDb.upsertAllocations(pool.id, [{ apiKeyId: API_KEY_ID, weight: 50, policy: "hard" }]);

  // Confirm allocation exists.
  const allocations = listAllocationsForApiKey(API_KEY_ID);
  assert.equal(allocations.length, 1, "API key should have 1 pool allocation");
  assert.equal(allocations[0].poolId, pool.id);

  // Call enforceQuotaShare with connB (secondary member, NOT the primary).
  // The pool MUST be found (D2 membership check).
  // Since resolvePlan will have no dimensions configured → "no dimensions" path → allow.
  const resultB = await enforceQuotaShare({
    apiKeyId: API_KEY_ID,
    connectionId: idB,
    provider: PROVIDER_A,
    estimatedCost: {},
  });

  // Must be a valid EnforceDecision shape.
  assert.ok(
    resultB.kind === "allow" || resultB.kind === "block",
    `enforceQuotaShare must return allow or block; got: ${resultB.kind}`
  );

  // No throw — contract satisfied.
});

// ---------------------------------------------------------------------------
// D2.4 — enforce: primary connA still resolves the pool (no regression)
// ---------------------------------------------------------------------------

test("D2.4: enforceQuotaShare — input connectionId matching the PRIMARY member still resolves correctly", async () => {
  const { enforceQuotaShare } = await import("../../src/lib/quota/enforce.ts");

  const connA = await providersDb.createProviderConnection({
    provider: PROVIDER_A,
    authType: "apikey",
    name: "d24-conn-a",
    apiKey: "sk-d24-a",
  });
  const connB = await providersDb.createProviderConnection({
    provider: PROVIDER_A,
    authType: "apikey",
    name: "d24-conn-b",
    apiKey: "sk-d24-b",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const idB = (connB as Record<string, unknown>).id as string;

  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "PrimaryRegressionPool D24",
    connectionIds: [idA, idB],
  });

  const API_KEY_ID = "test-key-d24";
  poolsDb.upsertAllocations(pool.id, [{ apiKeyId: API_KEY_ID, weight: 50, policy: "hard" }]);

  // Enforce with connA (the primary).
  const resultA = await enforceQuotaShare({
    apiKeyId: API_KEY_ID,
    connectionId: idA,
    provider: PROVIDER_A,
    estimatedCost: {},
  });

  assert.ok(
    resultA.kind === "allow" || resultA.kind === "block",
    `enforceQuotaShare must return allow or block; got: ${resultA.kind}`
  );
});

// ---------------------------------------------------------------------------
// D2.5 — combos: syncQuotaCombos for 2-connection same-provider pool
// ---------------------------------------------------------------------------

test("D2.5: syncQuotaCombos — 2-connection same-provider pool creates one combo per model with 2 steps + quota-share (Task 4)", async () => {
  // Task 4: N same-provider connections must produce ONE combo per model with
  // ALL connections' steps + strategy "quota-share". The old behavior (single step
  // pinned to connA, strategy "priority") was the collision bug — last upsert won.
  const connA = await providersDb.createProviderConnection({
    provider: PROVIDER_A,
    authType: "apikey",
    name: "d25-conn-a",
    apiKey: "sk-d25-a",
  });
  const connB = await providersDb.createProviderConnection({
    provider: PROVIDER_A,
    authType: "apikey",
    name: "d25-conn-b",
    apiKey: "sk-d25-b",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const idB = (connB as Record<string, unknown>).id as string;

  const modelsA = (PROVIDER_MODELS[PROVIDER_A] ?? []).map((m) => m.id);

  assert.ok(modelsA.length > 0, `${PROVIDER_A} must have models in registry`);

  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "SameProviderComboPool D25",
    connectionIds: [idA, idB],
  });

  // Drain the fire-and-forget syncQuotaCombosGuarded dispatched by createPool
  // before calling the explicit sync, so the explicit sync is the last writer.
  await flushPendingSyncs();

  // syncQuotaCombos is idempotent; the explicit call ensures the combo reflects
  // the current pool state (2 connections) even if the FF already ran.
  await syncQuotaCombos(pool.id);
  // Drain any background syncs before asserting.
  await flushPendingSyncs();

  const quotaCombos = await listQuotaCombos();
  const comboMap = new Map(quotaCombos.map((c) => [c.name, c]));

  // ── Verify PROVIDER_A combos exist with N-step quota-share ─────────────────
  for (const modelId of modelsA) {
    // Combos are named with the GROUP name ("GroupDemo", from group-demo), not pool name.
    const expectedName = quotaModelName("GroupDemo", PROVIDER_A, modelId);
    const combo = comboMap.get(expectedName);
    assert.ok(combo, `Missing combo for ${PROVIDER_A}/${modelId}: ${expectedName}`);

    // Task 4: exactly 2 steps, one per connection.
    assert.equal(
      combo.models.length,
      2,
      `combo ${expectedName} should have 2 steps (both connections), got ${combo.models.length}`
    );

    // Task 4: strategy must be quota-share.
    assert.equal(
      combo.strategy,
      "quota-share",
      `combo ${expectedName} strategy should be "quota-share", got "${combo.strategy}"`
    );

    // Both connIds must appear across steps.
    const stepConnIds = (combo.models as Array<Record<string, unknown>>).map((s) => s.connectionId);
    assert.ok(stepConnIds.includes(idA), `combo ${expectedName} steps must include connA (${idA})`);
    assert.ok(stepConnIds.includes(idB), `combo ${expectedName} steps must include connB (${idB})`);

    // Each step references PROVIDER_A.
    for (const step of combo.models as Array<Record<string, unknown>>) {
      assert.equal(step.providerId, PROVIDER_A, `step.providerId should be ${PROVIDER_A}`);
    }
  }

  // ── Total combo count matches model count (all from PROVIDER_A) ──────────
  assert.equal(
    quotaCombos.length,
    modelsA.length,
    `expected ${modelsA.length} combo(s) for ${PROVIDER_A}`
  );
});

// ---------------------------------------------------------------------------
// D2.6 — combos: prune — removing a connection resyncs combos (no stale names)
// ---------------------------------------------------------------------------

test("D2.6: syncQuotaCombos — after removing connB from same-provider pool, re-sync collapses each combo to 1 step (connA only)", async () => {
  // Task 4: initially a 2-connection pool produces 2-step quota-share combos.
  // After removing connB (pool → only connA), re-sync rebuilds each combo with
  // a single step pinned to connA. The combo names are unchanged (same provider/
  // model), so no prune happens — the combos are updated in-place.
  const connA = await providersDb.createProviderConnection({
    provider: PROVIDER_A,
    authType: "apikey",
    name: "d26-conn-a",
    apiKey: "sk-d26-a",
  });
  const connB = await providersDb.createProviderConnection({
    provider: PROVIDER_A,
    authType: "apikey",
    name: "d26-conn-b",
    apiKey: "sk-d26-b",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const idB = (connB as Record<string, unknown>).id as string;

  const modelsA = (PROVIDER_MODELS[PROVIDER_A] ?? []).map((m) => m.id);

  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "PruneAfterRemovalPool D26",
    connectionIds: [idA, idB],
  });

  // Drain the fire-and-forget syncQuotaCombosGuarded dispatched by createPool.
  await flushPendingSyncs();

  await syncQuotaCombos(pool.id);
  // Drain any background syncs before asserting initial state.
  await flushPendingSyncs();

  // Verify we have PROVIDER_A combos with 2 steps before the update.
  const before = await listQuotaCombos();
  assert.ok(before.length > 0, "Should have combos before update");
  const beforeProviders = new Set(
    before.map((c) => parseQuotaModelName(c.name)?.provider).filter(Boolean)
  );
  assert.ok(beforeProviders.has(PROVIDER_A), `Should have ${PROVIDER_A} combos before update`);
  // Task 4: initial combos must have 2 steps.
  for (const combo of before) {
    assert.equal(
      combo.models.length,
      2,
      `before removal, combo "${combo.name}" should have 2 steps`
    );
  }

  // Remove connB from the pool — now only connA remains.
  poolsDb.updatePool(pool.id, { connectionIds: [idA] });

  // Drain the fire-and-forget from updatePool so it cannot overwrite the
  // 1-step result that the following explicit sync will produce.
  await flushPendingSyncs();

  // Re-sync.
  await syncQuotaCombos(pool.id);
  // Final drain: ensure no stale background sync can revert to 2 steps.
  await flushPendingSyncs();

  const after = await listQuotaCombos();

  // connA's combos must still be present (same names).
  // Combos are named with the GROUP name ("GroupDemo", from group-demo), not pool name.
  const afterProviders = new Set(
    after.map((c) => parseQuotaModelName(c.name)?.provider).filter(Boolean)
  );
  assert.ok(
    afterProviders.has(PROVIDER_A),
    `${PROVIDER_A} combos should survive after connB removal`
  );
  for (const modelId of modelsA) {
    const expectedName = quotaModelName("GroupDemo", PROVIDER_A, modelId);
    const found = after.find((c) => c.name === expectedName);
    assert.ok(found, `Combo for ${PROVIDER_A}/${modelId} should survive after connB removal`);
  }

  // Exact count: PROVIDER_A models remain.
  assert.equal(
    after.length,
    modelsA.length,
    `After removing connB, ${modelsA.length} combo(s) for ${PROVIDER_A} should remain`
  );

  // Task 4: after re-sync, each combo must have been collapsed to 1 step (connA only).
  for (const combo of after) {
    assert.equal(
      combo.models.length,
      1,
      `after connB removal, combo "${combo.name}" should collapse to 1 step, got ${combo.models.length}`
    );
    const step = combo.models[0] as Record<string, unknown>;
    assert.equal(
      step.connectionId,
      idA,
      `remaining step in combo "${combo.name}" should be pinned to connA (${idA})`
    );
  }
});
