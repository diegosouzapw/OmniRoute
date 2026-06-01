/**
 * tests/unit/quota-combo-groups.test.ts
 *
 * Task B4 TDD — Group-aware quotaShared combos.
 *
 * Two pools in the SAME group produce combos under the GROUP slug
 * (`qtSd/<group>/...`) and each pool's sync does NOT prune the other
 * provider's combos.
 *
 * Uses "openrouter" (1 model: "auto") as pool A's provider and "baidu"
 * (1 model: "ernie-4.0-8k") as pool B's provider — both have a small,
 * stable registry entry.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-quota-combo-groups-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { createGroup } = await import("../../src/lib/db/quotaGroups.ts");
const { syncQuotaCombos } = await import("../../src/lib/quota/quotaCombos.ts");
const { isQuotaModelName, parseQuotaModelName, quotaGroupSlug } = await import(
  "../../src/lib/quota/quotaModelNaming.ts"
);

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

async function listQuotaCombos(): Promise<Array<{ name: string; models: unknown[] }>> {
  const all = await combosDb.getCombos();
  return all
    .filter((c) => typeof c.name === "string" && isQuotaModelName(c.name as string))
    .map((c) => ({
      name: c.name as string,
      models: Array.isArray(c.models) ? (c.models as unknown[]) : [],
    }));
}

// ---------------------------------------------------------------------------
// G1 — Two pools in the SAME group produce combos under the GROUP slug
// ---------------------------------------------------------------------------

test("G1: two pools in same group → combos named qtSd/<group>/provider/model (group slug, not pool name)", async () => {
  // Create a named group
  const group = createGroup("MyGroup");

  // Pool A: openrouter
  const connA = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "g1-or-conn",
    apiKey: "sk-g1-or",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const poolA = poolsDb.createPool({
    connectionId: idA,
    name: "OpenRouter Pool G1",
    groupId: group.id,
  });

  // Pool B: baidu
  const connB = await providersDb.createProviderConnection({
    provider: "baidu",
    authType: "apikey",
    name: "g1-baidu-conn",
    apiKey: "sk-g1-baidu",
  });
  const idB = (connB as Record<string, unknown>).id as string;
  const poolB = poolsDb.createPool({
    connectionId: idB,
    name: "Baidu Pool G1",
    groupId: group.id,
  });

  // Sync both pools
  await syncQuotaCombos(poolA.id);
  await syncQuotaCombos(poolB.id);

  const allCombos = await listQuotaCombos();
  const groupSlug = quotaGroupSlug(group.name); // "mygroup"

  // All combos should use the group slug, not the pool name slug
  for (const c of allCombos) {
    const parsed = parseQuotaModelName(c.name);
    assert.ok(parsed, `Could not parse quota model name: ${c.name}`);
    assert.equal(
      parsed.groupSlug,
      groupSlug,
      `Combo "${c.name}" groupSlug should be "${groupSlug}" (group name), got "${parsed.groupSlug}"`
    );
  }

  // Combos for openrouter must exist under the group slug
  const orCombos = allCombos.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "openrouter";
  });
  assert.ok(orCombos.length > 0, `Expected openrouter combos under qtSd/${groupSlug}/openrouter/...`);

  // Combos for baidu must exist under the group slug
  const baiduCombos = allCombos.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "baidu";
  });
  assert.ok(baiduCombos.length > 0, `Expected baidu combos under qtSd/${groupSlug}/baidu/...`);
});

// ---------------------------------------------------------------------------
// G2 — Re-syncing pool A does NOT prune pool B's combos (provider-scoped prune)
// ---------------------------------------------------------------------------

test("G2: re-syncing pool A (openrouter) does not delete pool B (baidu) combos in same group", async () => {
  const group = createGroup("SharedGroup");
  const groupSlug = quotaGroupSlug(group.name);

  // Pool A: openrouter
  const connA = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "g2-or-conn",
    apiKey: "sk-g2-or",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const poolA = poolsDb.createPool({
    connectionId: idA,
    name: "OpenRouter Pool G2",
    groupId: group.id,
  });

  // Pool B: baidu
  const connB = await providersDb.createProviderConnection({
    provider: "baidu",
    authType: "apikey",
    name: "g2-baidu-conn",
    apiKey: "sk-g2-baidu",
  });
  const idB = (connB as Record<string, unknown>).id as string;
  const poolB = poolsDb.createPool({
    connectionId: idB,
    name: "Baidu Pool G2",
    groupId: group.id,
  });

  // Sync both
  await syncQuotaCombos(poolA.id);
  await syncQuotaCombos(poolB.id);

  // Count baidu combos before re-sync of pool A
  const beforeResync = await listQuotaCombos();
  const baiduBefore = beforeResync.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "baidu";
  });
  assert.ok(baiduBefore.length > 0, "baidu combos must exist before re-sync");

  // Re-sync pool A (openrouter) again — must NOT touch baidu combos
  await syncQuotaCombos(poolA.id);

  const afterResync = await listQuotaCombos();
  const baiduAfter = afterResync.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "baidu";
  });

  assert.equal(
    baiduAfter.length,
    baiduBefore.length,
    `Re-syncing pool A (openrouter) must not prune pool B's (baidu) combos. ` +
      `Before: ${baiduBefore.length}, After: ${baiduAfter.length}`
  );

  // Also verify openrouter combos still present
  const orAfter = afterResync.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "openrouter";
  });
  assert.ok(orAfter.length > 0, "openrouter combos must still be present after re-sync");
});

// ---------------------------------------------------------------------------
// G3 — Pool in default group still works (group name = "GroupDemo", slug = "groupdemo")
// ---------------------------------------------------------------------------

test("G3: pool in default 'group-demo' group produces combos under groupdemo slug", async () => {
  // Create a pool without specifying a groupId → defaults to "group-demo"
  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "g3-glm-conn",
    apiKey: "sk-g3-glm",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({
    connectionId: connId,
    name: "Default Group Pool",
    // no groupId → defaults to "group-demo"
  });

  // Sanity: groupId should be "group-demo"
  assert.equal(pool.groupId, "group-demo", "pool without groupId should default to group-demo");

  await syncQuotaCombos(pool.id);

  const allCombos = await listQuotaCombos();
  assert.ok(allCombos.length > 0, "should produce combos even for default group pool");

  // All combos should be under the "groupdemo" slug (the group name is "GroupDemo")
  for (const c of allCombos) {
    const parsed = parseQuotaModelName(c.name);
    assert.ok(parsed, `Could not parse: ${c.name}`);
    assert.equal(
      parsed.groupSlug,
      "groupdemo",
      `Combo "${c.name}" should be under "groupdemo" slug (GroupDemo group), got "${parsed.groupSlug}"`
    );
  }
});

// ---------------------------------------------------------------------------
// G4 — Stale prune: a same-group same-provider stale combo IS pruned on re-sync
// ---------------------------------------------------------------------------

test("G4: stale same-group same-provider combo is pruned on re-sync", async () => {
  const group = createGroup("PruneGroup");
  const groupSlug = quotaGroupSlug(group.name); // "prunegroup"

  const conn = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "g4-or-conn",
    apiKey: "sk-g4-or",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({
    connectionId: connId,
    name: "PrunePool G4",
    groupId: group.id,
  });

  await syncQuotaCombos(pool.id);

  // Manually insert a stale combo under same group+provider but a nonexistent model
  const staleComboName = `qtSd/${groupSlug}/openrouter/fake-stale-model`;
  await combosDb.createCombo({
    name: staleComboName,
    models: [{ kind: "model", model: "openrouter/fake-stale-model", providerId: "openrouter", weight: 100 }],
    strategy: "priority",
    isHidden: true,
  });

  const beforePrune = await combosDb.getComboByName(staleComboName);
  assert.ok(beforePrune, "stale combo should exist before re-sync");

  // Re-sync: stale same-group same-provider combo should be pruned
  await syncQuotaCombos(pool.id);

  const afterPrune = await combosDb.getComboByName(staleComboName);
  assert.equal(afterPrune, null, "stale same-group same-provider combo should be pruned");
});
