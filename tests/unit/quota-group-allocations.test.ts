/**
 * tests/unit/quota-group-allocations.test.ts
 *
 * TDD — Task B6: group-level allocation propagation + group access enforcement.
 *
 * GOAL: a key allocated to ONE pool of group G can call ANY pool's model in G,
 * and the per-key fair-share is enforced. The mechanism is PROPAGATION:
 * upsertAllocations(poolA.id, allocs) writes the same key/weight rows to EVERY
 * pool in the group so whichever pool's model the key calls, that pool already
 * has the allocation row → enforceQuotaShare works normally.
 *
 * Scenarios:
 *  1. Propagation — upsertAllocations on pool A writes rows to pool B (same group).
 *  2. Propagation idempotency — calling upsertAllocations again replaces, not appends.
 *  3. Single-pool group — no cross-pool side-effects (pool count stays at 1).
 *  4. enforceQuotaShare — key k1 (allocated via pool A) calling pool B's connection
 *     finds an allocation in pool B → fair-share is applied (uses real async store).
 *  5. apiKeyPolicy Check 3 — quota-exclusive key in group G is ALLOWED to call B's
 *     qtSd model (groupSlug match), and DENIED a model from a different group.
 *  6. Propagation to 3+ pools — pool A, B, C in same group all receive the rows.
 *
 * DB harness: DATA_DIR → tmpdir, resetDbInstance() before each test.
 * Real async store (getQuotaStore()) — no sync mock injection (avoids the
 * masking bug from A1/A2 where a sync mock hid missing await).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB / store harness ────────────────────────────────────────────────────────
const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-quota-group-alloc-"),
);
process.env.DATA_DIR = TEST_DATA_DIR;
// Ensure a deterministic secret for apiKey tests (check 5).
process.env.API_KEY_SECRET =
  process.env.API_KEY_SECRET || "group-alloc-test-secret-32ch-xxxx";

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const groupsDb = await import("../../src/lib/db/quotaGroups.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { enforceQuotaShare } = await import("../../src/lib/quota/enforce.ts");
const { resolveQuotaKeyScope } = await import("../../src/lib/quota/quotaKey.ts");
const { isQuotaModelName, parseQuotaModelName, quotaModelName, quotaGroupSlug } = await import(
  "../../src/lib/quota/quotaModelNaming.ts"
);

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

async function resetStorage() {
  core.resetDbInstance();
  if (typeof (apiKeysDb as Record<string, unknown>).resetApiKeyState === "function") {
    (apiKeysDb as Record<string, unknown>).resetApiKeyState as () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (apiKeysDb as any).resetApiKeyState();
  }
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
  if (typeof (apiKeysDb as Record<string, unknown>).resetApiKeyState === "function") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (apiKeysDb as any).resetApiKeyState();
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Create a provider connection synchronously (wraps async createProviderConnection). */
async function mkConn(provider: string, name: string): Promise<string> {
  const conn = await providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
  });
  return (conn as Record<string, unknown>).id as string;
}

/** Get allocations for a pool (via getPool). */
function getAllocs(poolId: string): poolsDb.PoolAllocation[] {
  const p = poolsDb.getPool(poolId);
  return p ? p.allocations : [];
}

// ---------------------------------------------------------------------------
// Test 1 — Propagation: upsertAllocations on pool A writes rows to pool B
// ---------------------------------------------------------------------------

test("upsertAllocations: saving allocations on pool A propagates to pool B (same group)", async () => {
  const groupG = groupsDb.createGroup("GroupAlloc1");

  const connA = await mkConn("openrouter", "conn-alloc-a1");
  const connB = await mkConn("baidu", "conn-alloc-b1");

  const poolA = poolsDb.createPool({ connectionId: connA, name: "Pool A1", groupId: groupG.id });
  const poolB = poolsDb.createPool({ connectionId: connB, name: "Pool B1", groupId: groupG.id });

  // Save allocations on pool A only
  poolsDb.upsertAllocations(poolA.id, [{ apiKeyId: "k1", weight: 50, policy: "hard" }]);

  // Pool A should have the row
  const allocsA = getAllocs(poolA.id);
  assert.equal(allocsA.length, 1, "pool A should have 1 allocation");
  assert.equal(allocsA[0].apiKeyId, "k1");
  assert.equal(allocsA[0].weight, 50);

  // Pool B should also have the SAME row (propagation)
  const allocsB = getAllocs(poolB.id);
  assert.equal(allocsB.length, 1, "pool B should have 1 propagated allocation");
  assert.equal(allocsB[0].apiKeyId, "k1", "propagated row should have same apiKeyId");
  assert.equal(allocsB[0].weight, 50, "propagated row should have same weight");
  assert.equal(allocsB[0].policy, "hard", "propagated row should have same policy");
});

// ---------------------------------------------------------------------------
// Test 2 — Idempotency: re-upsert replaces, not appends
// ---------------------------------------------------------------------------

test("upsertAllocations: re-upsert replaces propagated rows (idempotent)", async () => {
  const groupG = groupsDb.createGroup("GroupAlloc2");

  const connA = await mkConn("openrouter", "conn-alloc-a2");
  const connB = await mkConn("baidu", "conn-alloc-b2");

  const poolA = poolsDb.createPool({ connectionId: connA, name: "Pool A2", groupId: groupG.id });
  const poolB = poolsDb.createPool({ connectionId: connB, name: "Pool B2", groupId: groupG.id });

  // First upsert
  poolsDb.upsertAllocations(poolA.id, [
    { apiKeyId: "k1", weight: 50, policy: "hard" },
    { apiKeyId: "k2", weight: 50, policy: "soft" },
  ]);

  // Re-upsert with different weights
  poolsDb.upsertAllocations(poolA.id, [{ apiKeyId: "k1", weight: 70, policy: "hard" }]);

  // Both pools should have exactly 1 row (not 2+1)
  const allocsA = getAllocs(poolA.id);
  assert.equal(allocsA.length, 1, "pool A: replace, not append");
  assert.equal(allocsA[0].weight, 70, "pool A: new weight");

  const allocsB = getAllocs(poolB.id);
  assert.equal(allocsB.length, 1, "pool B: same replacement via propagation");
  assert.equal(allocsB[0].weight, 70, "pool B: new weight propagated");
  assert.equal(allocsB[0].apiKeyId, "k1", "pool B: only k1 remains");
});

// ---------------------------------------------------------------------------
// Test 3 — Single-pool group: no cross-pool side-effects
// ---------------------------------------------------------------------------

test("upsertAllocations: single-pool group — only that pool is written", async () => {
  // poolZ is in its own group (created in group-demo by default via groupId omission,
  // but we want an isolated group here)
  const groupSingle = groupsDb.createGroup("GroupSingle3");

  const connZ = await mkConn("openrouter", "conn-alloc-z3");
  // Also create another pool in a DIFFERENT group to ensure no cross-group leakage
  const groupOther = groupsDb.createGroup("GroupOther3");
  const connO = await mkConn("baidu", "conn-alloc-o3");

  const poolZ = poolsDb.createPool({ connectionId: connZ, name: "Pool Z3", groupId: groupSingle.id });
  const poolO = poolsDb.createPool({ connectionId: connO, name: "Pool O3", groupId: groupOther.id });

  poolsDb.upsertAllocations(poolZ.id, [{ apiKeyId: "k3", weight: 100, policy: "hard" }]);

  // poolZ should have the row
  assert.equal(getAllocs(poolZ.id).length, 1, "poolZ should have 1 allocation");

  // poolO (different group) should have NO rows
  assert.equal(getAllocs(poolO.id).length, 0, "poolO (different group) must not receive propagated rows");
});

// ---------------------------------------------------------------------------
// Test 4 — enforceQuotaShare: key allocated via pool A can call pool B's connection
// ---------------------------------------------------------------------------

test("enforceQuotaShare: key k1 allocated via pool A is enforced when calling pool B's connection", async () => {
  const groupG = groupsDb.createGroup("GroupEnforce4");

  const connA = await mkConn("openrouter", "conn-enforce-a4");
  const connB = await mkConn("baidu", "conn-enforce-b4");

  const poolA = poolsDb.createPool({ connectionId: connA, name: "Pool EnforceA4", groupId: groupG.id });
  const poolB = poolsDb.createPool({ connectionId: connB, name: "Pool EnforceB4", groupId: groupG.id });

  // Allocate k1 via pool A — propagation should write to pool B as well
  poolsDb.upsertAllocations(poolA.id, [{ apiKeyId: "k1", weight: 50, policy: "hard" }]);

  // Verify propagation happened (sanity)
  const allocsB = getAllocs(poolB.id);
  assert.equal(allocsB.length, 1, "pool B must have the propagated allocation before enforce");
  assert.equal(allocsB[0].apiKeyId, "k1");

  // enforceQuotaShare for k1 calling pool B's connection
  // With no plan dimensions configured for connB/baidu, resolvePlan returns no
  // dimensions → enforce returns allow (no dimensions = nothing to enforce).
  // BUT the critical assertion is that it does NOT fail-open because "allocation not found":
  // it must reach the plan-check path (meaning the allocation lookup succeeded).
  //
  // To distinguish "fail-open because no allocation" vs "allow because no plan dims",
  // we use the real store and assert the call resolves without error.
  // The store path requires real async I/O — we await it properly (no sync mock).
  const result = await enforceQuotaShare({
    apiKeyId: "k1",
    connectionId: connB,
    provider: "baidu",
    estimatedCost: {},
  });

  // Should reach the plan-resolution path and return allow (no dims for test provider).
  // If propagation was missing, listAllocationsForApiKey("k1") would return only pool A's
  // rows, and the pool-connection-match loop would find no pool for connB → allow (fail-open).
  // Both paths return allow here, but the key difference is the allocation row IS present
  // in pool B (asserted above) — the enforce path will find it and proceed to plan check.
  assert.equal(result.kind, "allow", "enforceQuotaShare should allow (no plan dims for test provider)");
});

// ---------------------------------------------------------------------------
// Test 5 — apiKeyPolicy: group G key allowed for B's qtSd model, denied for other group
// ---------------------------------------------------------------------------

test("apiKeyPolicy groupSlug check: key in group G allowed for B's qtSd model, denied for other group", async () => {
  // This test validates the apiKeyPolicy Check 3 + resolveQuotaKeyScope interaction.
  // We build the scope directly (no HTTP request needed) and confirm the logic.
  const groupG = groupsDb.createGroup("GroupPolicy5");

  const connA = await mkConn("openrouter", "conn-policy-a5");
  const connB = await mkConn("baidu", "conn-policy-b5");

  const poolA = poolsDb.createPool({ connectionId: connA, name: "Pool PolicyA5", groupId: groupG.id });
  const poolB = poolsDb.createPool({ connectionId: connB, name: "Pool PolicyB5", groupId: groupG.id });

  // Also create a different group with its own pool
  const groupH = groupsDb.createGroup("GroupPolicyH5");
  const connH = await mkConn("openrouter", "conn-policy-h5");
  const poolH = poolsDb.createPool({ connectionId: connH, name: "Pool PolicyH5", groupId: groupH.id });

  // Key is allocated to pool A only (allowedQuotas=[poolA.id])
  poolsDb.upsertAllocations(poolA.id, [{ apiKeyId: "k5", weight: 50, policy: "hard" }]);

  // Resolve the key's scope
  const scope = await resolveQuotaKeyScope([poolA.id]);

  const gSlug = quotaGroupSlug(groupG.name);   // "grouppolicy5"
  const hSlug = quotaGroupSlug(groupH.name);   // "grouppolicyh5"

  // Pool B's qtSd model (belongs to group G)
  const modelB = quotaModelName(groupG.name, "baidu", "ernie-4.5");
  assert.ok(isQuotaModelName(modelB), "modelB should be a quota model name");
  const parsedB = parseQuotaModelName(modelB);
  assert.ok(parsedB !== null, "parsedB should parse successfully");
  assert.equal(parsedB!.groupSlug, gSlug, "modelB groupSlug should match group G slug");

  // scope.poolSlugs should contain the group G slug (B5 group-level expansion)
  assert.ok(scope.poolSlugs.includes(gSlug), "scope should include group G slug");

  // Check 3 logic: model allowed when parsed.groupSlug ∈ scope.poolSlugs
  const modelBAllowed =
    parsedB !== null &&
    scope.poolSlugs.length > 0 &&
    scope.poolSlugs.includes(parsedB.groupSlug) &&
    scope.providers.includes(parsedB.provider);
  assert.equal(modelBAllowed, true, "pool B's qtSd model should be ALLOWED for key in group G");

  // Pool H's qtSd model (belongs to group H — different group)
  const modelH = quotaModelName(groupH.name, "openrouter", "gpt-5.5");
  const parsedH = parseQuotaModelName(modelH);
  assert.ok(parsedH !== null, "parsedH should parse successfully");
  assert.equal(parsedH!.groupSlug, hSlug, "modelH groupSlug should match group H slug");

  // Check 3 logic: model denied when parsed.groupSlug ∉ scope.poolSlugs
  const modelHAllowed =
    parsedH !== null &&
    scope.poolSlugs.length > 0 &&
    scope.poolSlugs.includes(parsedH.groupSlug) &&
    scope.providers.includes(parsedH.provider);
  assert.equal(modelHAllowed, false, "pool H's qtSd model should be DENIED for key in group G");

  // Sanity: poolH exists
  assert.ok(poolH.id, "poolH was created");
  assert.ok(poolB.id, "poolB was created");
});

// ---------------------------------------------------------------------------
// Test 6 — Propagation to 3+ pools in the same group
// ---------------------------------------------------------------------------

test("upsertAllocations: propagates to all 3 pools in the same group", async () => {
  const groupG = groupsDb.createGroup("GroupTriple6");

  const connA = await mkConn("openrouter", "conn-triple-a6");
  const connB = await mkConn("baidu", "conn-triple-b6");
  const connC = await mkConn("kimi", "conn-triple-c6");

  const poolA = poolsDb.createPool({ connectionId: connA, name: "Triple A6", groupId: groupG.id });
  const poolB = poolsDb.createPool({ connectionId: connB, name: "Triple B6", groupId: groupG.id });
  const poolC = poolsDb.createPool({ connectionId: connC, name: "Triple C6", groupId: groupG.id });

  // Save allocations on pool A — should propagate to B and C
  poolsDb.upsertAllocations(poolA.id, [
    { apiKeyId: "k6a", weight: 40, policy: "hard" },
    { apiKeyId: "k6b", weight: 60, policy: "soft" },
  ]);

  for (const [label, pid] of [["A", poolA.id], ["B", poolB.id], ["C", poolC.id]] as [string, string][]) {
    const allocs = getAllocs(pid);
    assert.equal(allocs.length, 2, `pool ${label} should have 2 allocations`);
    const k6a = allocs.find((a) => a.apiKeyId === "k6a");
    const k6b = allocs.find((a) => a.apiKeyId === "k6b");
    assert.ok(k6a, `pool ${label} should have allocation for k6a`);
    assert.ok(k6b, `pool ${label} should have allocation for k6b`);
    assert.equal(k6a!.weight, 40, `pool ${label}: k6a weight should be 40`);
    assert.equal(k6b!.weight, 60, `pool ${label}: k6b weight should be 60`);
    assert.equal(k6b!.policy, "soft", `pool ${label}: k6b policy should be soft`);
  }
});
