/**
 * tests/unit/quota-pool-delete-prune.test.ts
 *
 * Fix: deletePool should prune its id from every api_key's allowed_quotas JSON array.
 *
 * Coverage:
 * 1. Create a pool, assign it to a key's allowed_quotas → deletePool → key's
 *    allowed_quotas no longer contains that pool id.
 * 2. Unrelated pool ids in allowed_quotas are untouched.
 * 3. Key whose allowed_quotas doesn't contain the deleted pool id → unchanged.
 * 4. Key with empty allowed_quotas stays empty after delete.
 * 5. Multiple keys all pruned simultaneously.
 * 6. deletePool still returns true/false correctly.
 * 7. Pool row and allocation rows are gone after delete (regression guard).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB harness (same pattern as quota-exclusivity-reconcile.test.ts) ─────────
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-delete-prune-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET =
  process.env.API_KEY_SECRET || "delete-prune-test-secret-32chars!!";

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (err: any) {
      if ((err?.code === "EBUSY" || err?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw err;
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

// ── Helper: get allowed_quotas for a key by id from DB ───────────────────────
function getAllowedQuotasById(keyId: string): string[] {
  const db = core.getDbInstance();
  const row = (db as any)
    .prepare("SELECT allowed_quotas FROM api_keys WHERE id = ?")
    .get(keyId) as { allowed_quotas: string } | undefined;
  if (!row) return [];
  try {
    const parsed = JSON.parse(row.allowed_quotas ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ── 1. Basic prune: deletePool removes pool id from key's allowed_quotas ──────

test("deletePool prunes its id from api_key allowed_quotas", async () => {
  const pool = poolsDb.createPool({ connectionId: "conn-prune-1", name: "Prune Pool 1" });
  const keyObj = await apiKeysDb.createApiKey("Prune Key 1", "machine-prune-1");
  await apiKeysDb.updateApiKeyPermissions(keyObj.id, { allowedQuotas: [pool.id] });

  // Sanity: pool id is there before delete
  const before = getAllowedQuotasById(keyObj.id);
  assert.ok(before.includes(pool.id), `pool.id should be in allowed_quotas before delete`);

  poolsDb.deletePool(pool.id);

  const after = getAllowedQuotasById(keyObj.id);
  assert.ok(!after.includes(pool.id), `pool.id should NOT be in allowed_quotas after delete`);
});

// ── 2. Unrelated pool ids are preserved ───────────────────────────────────────

test("deletePool preserves unrelated pool ids in allowed_quotas", async () => {
  const poolToDelete = poolsDb.createPool({ connectionId: "conn-prune-2a", name: "Delete Me" });
  const otherPool = poolsDb.createPool({ connectionId: "conn-prune-2b", name: "Keep Me" });
  const unrelatedId = "unrelated-pool-id-xyz";

  const keyObj = await apiKeysDb.createApiKey("Prune Key 2", "machine-prune-2");
  await apiKeysDb.updateApiKeyPermissions(keyObj.id, {
    allowedQuotas: [poolToDelete.id, otherPool.id, unrelatedId],
  });

  poolsDb.deletePool(poolToDelete.id);

  const after = getAllowedQuotasById(keyObj.id);
  assert.ok(!after.includes(poolToDelete.id), "deleted pool id should be removed");
  assert.ok(after.includes(otherPool.id), "other pool id should remain");
  assert.ok(after.includes(unrelatedId), "unrelated id should remain");
});

// ── 3. Keys without the pool id are unchanged ─────────────────────────────────

test("deletePool does not modify keys that don't reference the deleted pool", async () => {
  const poolToDelete = poolsDb.createPool({ connectionId: "conn-prune-3a", name: "Target" });
  const otherPool = poolsDb.createPool({ connectionId: "conn-prune-3b", name: "Other" });

  const keyObj = await apiKeysDb.createApiKey("Prune Key 3", "machine-prune-3");
  // This key only references otherPool, not poolToDelete
  await apiKeysDb.updateApiKeyPermissions(keyObj.id, { allowedQuotas: [otherPool.id] });

  poolsDb.deletePool(poolToDelete.id);

  const after = getAllowedQuotasById(keyObj.id);
  assert.deepEqual(after, [otherPool.id], "key referencing only other pool should be unchanged");
});

// ── 4. Key with empty allowed_quotas remains empty ───────────────────────────

test("deletePool: key with empty allowed_quotas stays empty", async () => {
  const pool = poolsDb.createPool({ connectionId: "conn-prune-4", name: "Empty Test" });
  const keyObj = await apiKeysDb.createApiKey("Prune Key 4", "machine-prune-4");
  // Don't set allowedQuotas — default is []

  poolsDb.deletePool(pool.id);

  const after = getAllowedQuotasById(keyObj.id);
  assert.deepEqual(after, [], "empty allowed_quotas should remain empty after delete");
});

// ── 5. Multiple keys: all pruned simultaneously ───────────────────────────────

test("deletePool prunes pool id from ALL keys that reference it", async () => {
  const pool = poolsDb.createPool({ connectionId: "conn-prune-5", name: "Multi Key Pool" });

  const keys = await Promise.all([
    apiKeysDb.createApiKey("Prune Multi 1", "machine-pm-1"),
    apiKeysDb.createApiKey("Prune Multi 2", "machine-pm-2"),
    apiKeysDb.createApiKey("Prune Multi 3", "machine-pm-3"),
  ]);

  const otherPoolId = "other-pool-id-static";
  for (const k of keys) {
    await apiKeysDb.updateApiKeyPermissions(k.id, { allowedQuotas: [pool.id, otherPoolId] });
  }

  poolsDb.deletePool(pool.id);

  for (const k of keys) {
    const after = getAllowedQuotasById(k.id);
    assert.ok(!after.includes(pool.id), `${k.name}: pool.id should be pruned`);
    assert.ok(after.includes(otherPoolId), `${k.name}: other-pool-id should remain`);
  }
});

// ── 6. deletePool still returns true/false correctly ─────────────────────────

test("deletePool returns true for existing pool, false for non-existent", () => {
  const pool = poolsDb.createPool({ connectionId: "conn-ret-1", name: "Return Test" });
  assert.equal(poolsDb.deletePool(pool.id), true, "should return true for existing pool");
  assert.equal(poolsDb.deletePool(pool.id), false, "should return false for already-deleted pool");
  assert.equal(poolsDb.deletePool("nonexistent-id"), false, "should return false for unknown id");
});

// ── 7. Pool row and allocation rows are gone after delete (regression guard) ──

test("deletePool removes pool and allocation rows from DB", () => {
  const pool = poolsDb.createPool({
    connectionId: "conn-reg-1",
    name: "Regression Pool",
    allocations: [{ apiKeyId: "key-reg-1", weight: 50, policy: "hard" }],
  });

  poolsDb.deletePool(pool.id);

  assert.equal(poolsDb.getPool(pool.id), null, "getPool should return null after delete");
  const allPools = poolsDb.listPools();
  assert.ok(
    !allPools.some((p) => p.id === pool.id),
    "listPools should not contain the deleted pool"
  );
});
