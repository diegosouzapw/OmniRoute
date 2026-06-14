/**
 * tests/unit/quota-group-scope.test.ts
 *
 * TDD — Task B5: key scope + /v1/models expand to the whole group.
 *
 * Scenario: group G has pool A (openrouter, 1 conn) + pool B (baidu, 1 conn).
 * A key allocated to ONLY pool A:
 *  - resolveQuotaKeyScope([A.id]) must include connectionIds/providers from
 *    BOTH A and B (group-level expansion).
 *  - poolSlugs returns the GROUP slug (quotaGroupSlug of G's name), NOT the
 *    individual pool name slugs.
 *  - filterModelsToQuotaPools keeps models for both providers from that group.
 *
 * A key in a DIFFERENT group must NOT see G's models.
 *
 * An orphan pool (no valid connections) should NOT add the group slug unless
 * the group has at least one valid connection (any pool).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-group-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const groupsDb = await import("../../src/lib/db/quotaGroups.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { resolveQuotaKeyScope } = await import("../../src/lib/quota/quotaKey.ts");
const { filterModelsToQuotaPools } = await import("../../src/lib/quota/quotaCombos.ts");
const { quotaGroupSlug } = await import("../../src/lib/quota/quotaModelNaming.ts");

// ---------------------------------------------------------------------------
// Lifecycle helpers
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
// Tests
// ---------------------------------------------------------------------------

test("resolveQuotaKeyScope: key in pool A sees ALL connections/providers of group G (pool A + pool B)", async () => {
  // Create group G
  const groupG = groupsDb.createGroup("GroupG");

  // Create connections for each pool
  const connA = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "conn-openrouter-g",
    apiKey: "sk-openrouter-g",
  });
  const connB = await providersDb.createProviderConnection({
    provider: "baidu",
    authType: "apikey",
    name: "conn-baidu-g",
    apiKey: "sk-baidu-g",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const idB = (connB as Record<string, unknown>).id as string;

  // Create pool A and pool B, both in group G
  const poolA = poolsDb.createPool({ connectionId: idA, name: "Pool A", groupId: groupG.id });
  const poolB = poolsDb.createPool({ connectionId: idB, name: "Pool B", groupId: groupG.id });

  // Key is allocated ONLY to pool A
  const scope = await resolveQuotaKeyScope([poolA.id]);

  // Must include both connections
  assert.ok(scope.connectionIds.includes(idA), "should include pool A connection");
  assert.ok(scope.connectionIds.includes(idB), "should include pool B connection (group expansion)");
  assert.equal(scope.connectionIds.length, 2, "exactly 2 connections");

  // Must include both providers
  assert.ok(scope.providers.includes("openrouter"), "should include openrouter");
  assert.ok(scope.providers.includes("baidu"), "should include baidu (group expansion)");
  assert.equal(scope.providers.length, 2, "exactly 2 providers");

  // poolSlugs should be the GROUP slug (not individual pool slugs)
  const expectedGroupSlug = quotaGroupSlug(groupG.name); // "groupg"
  assert.deepEqual(scope.poolSlugs, [expectedGroupSlug], "poolSlugs should be the group slug");

  // Ensure pool B's id is reachable from scope (sanity)
  assert.ok(poolB.id, "pool B exists");
});

test("resolveQuotaKeyScope: key in pool from group H does NOT see group G models", async () => {
  // Create two groups
  const groupG = groupsDb.createGroup("GroupG2");
  const groupH = groupsDb.createGroup("GroupH2");

  const connG = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "conn-g2",
    apiKey: "sk-g2",
  });
  const connH = await providersDb.createProviderConnection({
    provider: "baidu",
    authType: "apikey",
    name: "conn-h2",
    apiKey: "sk-h2",
  });
  const idG = (connG as Record<string, unknown>).id as string;
  const idH = (connH as Record<string, unknown>).id as string;

  const poolInG = poolsDb.createPool({ connectionId: idG, name: "Pool G2", groupId: groupG.id });
  const poolInH = poolsDb.createPool({ connectionId: idH, name: "Pool H2", groupId: groupH.id });

  // Key only has pool from group H
  const scope = await resolveQuotaKeyScope([poolInH.id]);

  // Should NOT include group G's connection or provider
  assert.ok(!scope.connectionIds.includes(idG), "should NOT include group G connection");
  assert.ok(!scope.providers.includes("openrouter"), "should NOT include openrouter (group G)");

  // Should include group H's connection and provider
  assert.ok(scope.connectionIds.includes(idH), "should include group H connection");
  assert.ok(scope.providers.includes("baidu"), "should include baidu (group H)");

  const expectedGroupSlug = quotaGroupSlug(groupH.name);
  assert.deepEqual(scope.poolSlugs, [expectedGroupSlug], "poolSlugs should be H's group slug");

  // Sanity: pool in G exists but is not seen
  assert.ok(poolInG.id, "pool in G exists");
});

test("resolveQuotaKeyScope: two pools in the same group expand once (deduplicated group slug)", async () => {
  const groupG = groupsDb.createGroup("GroupGDedup");

  const connA = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "conn-dedup-a",
    apiKey: "sk-dedup-a",
  });
  const connB = await providersDb.createProviderConnection({
    provider: "baidu",
    authType: "apikey",
    name: "conn-dedup-b",
    apiKey: "sk-dedup-b",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const idB = (connB as Record<string, unknown>).id as string;

  const poolA = poolsDb.createPool({ connectionId: idA, name: "Pool Dedup A", groupId: groupG.id });
  const poolB = poolsDb.createPool({ connectionId: idB, name: "Pool Dedup B", groupId: groupG.id });

  // Key has BOTH pools from the same group
  const scope = await resolveQuotaKeyScope([poolA.id, poolB.id]);

  // Should only appear once in poolSlugs (group-level dedup)
  const expectedSlug = quotaGroupSlug(groupG.name);
  assert.deepEqual(scope.poolSlugs, [expectedSlug], "group slug should appear only once");

  // Both connections present
  assert.ok(scope.connectionIds.includes(idA));
  assert.ok(scope.connectionIds.includes(idB));
  assert.equal(scope.connectionIds.length, 2);
});

test("filterModelsToQuotaPools: keeps both providers' qtSd/<group>/... models from scope", async () => {
  const groupG = groupsDb.createGroup("GroupGFilter");
  const groupSlug = quotaGroupSlug(groupG.name); // e.g. "groupgfilter"

  const models = [
    { id: `qtSd/${groupSlug}/openrouter/gpt-5.5` },
    { id: `qtSd/${groupSlug}/baidu/ernie-4.5` },
    { id: `qtSd/otherg/openrouter/gpt-5.5` },
    { id: "gpt-5.5" }, // not a quota model
  ];

  const result = filterModelsToQuotaPools(models, [groupSlug]);

  assert.equal(result.length, 2, "should return both providers' models for the group");
  assert.ok(result.some((m) => m.id === `qtSd/${groupSlug}/openrouter/gpt-5.5`));
  assert.ok(result.some((m) => m.id === `qtSd/${groupSlug}/baidu/ernie-4.5`));
  assert.ok(!result.some((m) => m.id === `qtSd/otherg/openrouter/gpt-5.5`), "other group filtered out");
  assert.ok(!result.some((m) => m.id === "gpt-5.5"), "non-quota model filtered out");
});

test("resolveQuotaKeyScope: orphan pool (no valid connections) — group slug excluded if no valid conn in group", async () => {
  const groupG = groupsDb.createGroup("GroupGOrphan");

  // Pool with a non-existent connection
  const orphanPool = poolsDb.createPool({
    connectionId: "conn-does-not-exist-orphan",
    name: "Orphan Pool G",
    groupId: groupG.id,
  });

  const scope = await resolveQuotaKeyScope([orphanPool.id]);

  // No valid connections anywhere in the group → group slug must NOT be included
  assert.deepEqual(scope.connectionIds, []);
  assert.deepEqual(scope.providers, []);
  assert.deepEqual(scope.poolSlugs, [], "group slug excluded when no valid connection in group");
});

test("resolveQuotaKeyScope: orphan pool in group that also has a valid pool — group slug included", async () => {
  const groupG = groupsDb.createGroup("GroupGPartial");

  // One valid connection pool
  const connValid = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "conn-partial-valid",
    apiKey: "sk-partial-valid",
  });
  const idValid = (connValid as Record<string, unknown>).id as string;
  const validPool = poolsDb.createPool({ connectionId: idValid, name: "Valid Pool G", groupId: groupG.id });

  // One orphan pool in the same group
  const orphanPool = poolsDb.createPool({
    connectionId: "conn-orphan-partial",
    name: "Orphan Pool G2",
    groupId: groupG.id,
  });

  // Key is allocated only to the ORPHAN pool, but the group has the valid pool
  const scope = await resolveQuotaKeyScope([orphanPool.id]);

  // The group has a valid connection (the validPool's connection) so group slug should be included
  const expectedSlug = quotaGroupSlug(groupG.name);
  assert.ok(scope.poolSlugs.includes(expectedSlug), "group slug should be included since group has valid connection");
  assert.ok(scope.connectionIds.includes(idValid), "should include the valid pool's connection");
  assert.ok(scope.providers.includes("openrouter"), "should include openrouter from valid pool");

  assert.ok(validPool.id, "valid pool exists");
});
