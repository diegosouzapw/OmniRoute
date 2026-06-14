/**
 * tests/unit/quota-pool-update-full.test.ts
 *
 * Task 1 TDD — pool PATCH accepts groupId + connectionIds + re-syncs combos.
 *
 * Coverage:
 * - PoolUpdateSchema now accepts groupId and connectionIds.
 * - updatePool + syncQuotaCombos: switching a pool from openrouter to baidu
 *   produces baidu qtSd/ combos and prunes the openrouter combos.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB harness (mirror quota-pool-connections.test.ts) ──────────────────────
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-update-full-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { createGroup } = await import("../../src/lib/db/quotaGroups.ts");
const { syncQuotaCombos, removeQuotaCombosForPool } = await import(
  "../../src/lib/quota/quotaCombos.ts"
);
const { PoolUpdateSchema } = await import("../../src/shared/schemas/quota.ts");
const { isQuotaModelName, parseQuotaModelName, quotaGroupSlug } = await import(
  "../../src/lib/quota/quotaModelNaming.ts"
);

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

// ── Helper: list only quota-named combos ───────────────────────────────────

async function listQuotaCombos(): Promise<Array<{ name: string }>> {
  const all = await combosDb.getCombos();
  return all
    .filter((c) => typeof c.name === "string" && isQuotaModelName(c.name as string))
    .map((c) => ({ name: c.name as string }));
}

// ── Schema tests ──────────────────────────────────────────────────────────

test("PoolUpdateSchema accepts groupId and connectionIds together with name", () => {
  const result = PoolUpdateSchema.safeParse({ name: "P", groupId: "g1", connectionIds: ["c1"] });
  assert.ok(result.success, `Expected success, got: ${JSON.stringify(result.error)}`);
  assert.equal(result.data?.groupId, "g1");
  assert.deepEqual(result.data?.connectionIds, ["c1"]);
});

test("PoolUpdateSchema.data.groupId equals the parsed value", () => {
  const result = PoolUpdateSchema.safeParse({ groupId: "my-group" });
  assert.ok(result.success);
  assert.equal(result.data?.groupId, "my-group");
});

test("PoolUpdateSchema.data.connectionIds deep-equals the input array", () => {
  const result = PoolUpdateSchema.safeParse({ connectionIds: ["conn-x", "conn-y"] });
  assert.ok(result.success);
  assert.deepEqual(result.data?.connectionIds, ["conn-x", "conn-y"]);
});

test("PoolUpdateSchema rejects connectionIds with empty string element", () => {
  const result = PoolUpdateSchema.safeParse({ connectionIds: [""] });
  assert.equal(result.success, false, "Empty string element should be rejected");
});

test("PoolUpdateSchema rejects connectionIds as empty array", () => {
  const result = PoolUpdateSchema.safeParse({ connectionIds: [] });
  assert.equal(result.success, false, "Empty connectionIds array should be rejected");
});

test("PoolUpdateSchema accepts empty object (no-op still works)", () => {
  assert.ok(PoolUpdateSchema.safeParse({}).success);
});

test("PoolUpdateSchema accepts only groupId (partial update)", () => {
  const result = PoolUpdateSchema.safeParse({ groupId: "grp-abc" });
  assert.ok(result.success);
  assert.equal(result.data?.groupId, "grp-abc");
  assert.equal(result.data?.connectionIds, undefined);
});

// ── DB + combo integration tests ──────────────────────────────────────────

test("updatePool with new connectionIds triggers combo re-sync (openrouter → baidu)", async () => {
  // Create a named group
  const group = createGroup("PoolUpdateGroup");
  const groupSlug = quotaGroupSlug(group.name);

  // Provider connection 1: openrouter
  const connA = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "upd-or-conn",
    apiKey: "sk-upd-or",
  });
  const idA = (connA as Record<string, unknown>).id as string;

  // Provider connection 2: baidu
  const connB = await providersDb.createProviderConnection({
    provider: "baidu",
    authType: "apikey",
    name: "upd-baidu-conn",
    apiKey: "sk-upd-baidu",
  });
  const idB = (connB as Record<string, unknown>).id as string;

  // Create pool initially pointing to openrouter
  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "Pool Switch Test",
    groupId: group.id,
  });

  // Sync: openrouter combos should now exist
  await syncQuotaCombos(pool.id);

  const beforeSwitch = await listQuotaCombos();
  const orBefore = beforeSwitch.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "openrouter";
  });
  assert.ok(orBefore.length > 0, `Expected openrouter combos before switch, got 0`);

  // Now update the pool to point to baidu
  const updated = poolsDb.updatePool(pool.id, { connectionIds: [idB] });
  assert.ok(updated, "updatePool should return the updated pool");
  assert.equal(updated!.connectionId, idB, "primary connectionId should now be baidu conn");

  // Explicitly sync (mirrors what the PATCH route does)
  await syncQuotaCombos(pool.id);

  const afterSwitch = await listQuotaCombos();

  // baidu combos must now exist for this group (the new provider's combos are minted)
  const baiduAfter = afterSwitch.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "baidu";
  });
  assert.ok(
    baiduAfter.length > 0,
    `Expected baidu combos under qtSd/${groupSlug}/baidu/... after switch, found none`
  );

  // The pool's primary connection should now reflect baidu
  const reread = poolsDb.getPool(pool.id)!;
  assert.equal(reread.connectionId, idB, "pool.connectionId must be baidu conn after update");
  assert.deepEqual(reread.connectionIds, [idB], "pool.connectionIds must contain only baidu conn");
});

test("PATCH route sequence (remove→update→sync) prunes OLD-provider combos on switch", async () => {
  const group = createGroup("RouteSwitchGroup");
  const groupSlug = quotaGroupSlug(group.name);

  const connA = await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "rt-or-conn",
    apiKey: "sk-rt-or",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const connB = await providersDb.createProviderConnection({
    provider: "baidu",
    authType: "apikey",
    name: "rt-baidu-conn",
    apiKey: "sk-rt-baidu",
  });
  const idB = (connB as Record<string, unknown>).id as string;

  const pool = poolsDb.createPool({ connectionId: idA, name: "Route Switch", groupId: group.id });
  await syncQuotaCombos(pool.id);
  assert.ok(
    (await listQuotaCombos()).some((c) => parseQuotaModelName(c.name)?.provider === "openrouter"),
    "precondition: openrouter combos exist"
  );

  // Mirror the PATCH route's connection/group-change path exactly:
  await removeQuotaCombosForPool(pool.id); // pool still has OLD (openrouter) provider here
  poolsDb.updatePool(pool.id, { connectionIds: [idB] });
  await syncQuotaCombos(pool.id); // pool now has NEW (baidu) provider

  const after = await listQuotaCombos();
  const orphans = after.filter((c) => {
    const p = parseQuotaModelName(c.name);
    return p?.groupSlug === groupSlug && p?.provider === "openrouter";
  });
  assert.equal(orphans.length, 0, `OLD openrouter combos must be pruned; found ${orphans.length}`);
  assert.ok(
    after.some((c) => {
      const p = parseQuotaModelName(c.name);
      return p?.groupSlug === groupSlug && p?.provider === "baidu";
    }),
    "NEW baidu combos must exist after the switch"
  );
});

test("updatePool with groupId persists the new group assignment", () => {
  const groupA = createGroup("GroupAlpha");
  const groupB = createGroup("GroupBeta");

  const pool = poolsDb.createPool({
    connectionId: "gc-conn-1",
    name: "Group Reassign Pool",
    groupId: groupA.id,
  });

  assert.equal(pool.groupId, groupA.id, "pool should start in groupA");

  const updated = poolsDb.updatePool(pool.id, { groupId: groupB.id });
  assert.ok(updated, "updatePool should return updated pool");
  assert.equal(updated!.groupId, groupB.id, "pool should now be in groupB");

  // Re-read from DB to confirm persistence
  const reread = poolsDb.getPool(pool.id)!;
  assert.equal(reread.groupId, groupB.id, "persisted groupId should be groupB");
});

test("updatePool without connectionIds leaves connection membership untouched", () => {
  const pool = poolsDb.createPool({
    connectionId: "stable-conn",
    name: "Stable Conn Pool",
    connectionIds: ["stable-conn", "stable-conn-2"],
  });

  poolsDb.updatePool(pool.id, { name: "Renamed" });

  const reread = poolsDb.getPool(pool.id)!;
  assert.equal(reread.name, "Renamed");
  assert.equal(reread.connectionIds.length, 2, "connectionIds should be unchanged");
  assert.ok(reread.connectionIds.includes("stable-conn"));
  assert.ok(reread.connectionIds.includes("stable-conn-2"));
});

test("PoolUpdateSchema path: groupId flows through to updatePool (schema→db round-trip)", () => {
  const groupX = createGroup("XGroup");
  const groupY = createGroup("YGroup");

  const pool = poolsDb.createPool({
    connectionId: "grp-rt-conn",
    name: "Round Trip Pool",
    groupId: groupX.id,
  });

  // Simulate what the PATCH route does: parse → updatePool
  const parsed = PoolUpdateSchema.safeParse({ groupId: groupY.id });
  assert.ok(parsed.success);

  const updated = poolsDb.updatePool(pool.id, parsed.data!);
  assert.ok(updated);
  assert.equal(updated!.groupId, groupY.id);
});

test("PoolUpdateSchema path: connectionIds flows through to updatePool (schema→db round-trip)", () => {
  const pool = poolsDb.createPool({
    connectionId: "rt-conn-old",
    name: "ConnIds Round Trip Pool",
  });

  const parsed = PoolUpdateSchema.safeParse({ connectionIds: ["rt-conn-new"] });
  assert.ok(parsed.success);

  const updated = poolsDb.updatePool(pool.id, parsed.data!);
  assert.ok(updated);
  assert.equal(updated!.connectionId, "rt-conn-new");
  assert.deepEqual(updated!.connectionIds, ["rt-conn-new"]);
});
