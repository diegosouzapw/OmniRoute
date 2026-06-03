/**
 * tests/unit/quota-exclusivity-reconcile.test.ts
 *
 * TDD coverage for reconcilePoolExclusivity (Phase C3):
 *
 * - Adding a key as exclusive → poolId added to its allowedQuotas
 * - Transferring exclusivity between keys → prev key loses poolId, next gains it
 * - Turning off exclusive → all keys lose poolId
 * - Idempotency: calling twice with same args makes no extra change
 * - Missing / unknown key → skipped defensively (never throws)
 * - Absent exclusive param on PATCH → no reconciliation (skip test at unit level)
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-quota-exclusivity-"),
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET =
  process.env.API_KEY_SECRET || "exclusivity-reconcile-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const { reconcilePoolExclusivity } = await import(
  "../../src/lib/quota/quotaKey.ts"
);

// ---------------------------------------------------------------------------
// Test lifecycle helpers
// ---------------------------------------------------------------------------

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();

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

/** Helper: get the current allowedQuotas for a key by id. */
async function getAllowedQuotas(keyId: string): Promise<string[]> {
  const row = await apiKeysDb.getApiKeyById(keyId);
  if (!row) return [];
  return Array.isArray((row as Record<string, unknown>).allowedQuotas)
    ? ((row as Record<string, unknown>).allowedQuotas as string[])
    : [];
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ---------------------------------------------------------------------------
// Core scenarios
// ---------------------------------------------------------------------------

test("reconcilePoolExclusivity: exclusive=true adds poolId to allocated key, leaves other key unchanged", async () => {
  const pool = poolsDb.createPool({ connectionId: "conn-excl-1", name: "Excl Pool A" });
  const keyA = await apiKeysDb.createApiKey("Key A", "machine-excl-a");
  const keyB = await apiKeysDb.createApiKey("Key B", "machine-excl-b");

  // keyA gets allocated exclusively; keyB is not in next allocation
  await reconcilePoolExclusivity(pool.id, [], [keyA.id], true);

  apiKeysDb.clearApiKeyCaches();

  const quotasA = await getAllowedQuotas(keyA.id);
  const quotasB = await getAllowedQuotas(keyB.id);

  assert.ok(quotasA.includes(pool.id), "keyA should have poolId in allowedQuotas");
  assert.deepEqual(quotasB, [], "keyB should remain untouched");
});

test("reconcilePoolExclusivity: transferring exclusivity — prev key loses poolId, next key gains it", async () => {
  const pool = poolsDb.createPool({ connectionId: "conn-excl-2", name: "Excl Pool B" });
  const keyA = await apiKeysDb.createApiKey("Key A2", "machine-excl-a2");
  const keyB = await apiKeysDb.createApiKey("Key B2", "machine-excl-b2");

  // First, keyA is exclusively allocated
  await apiKeysDb.updateApiKeyPermissions(keyA.id, { allowedQuotas: [pool.id] });
  apiKeysDb.clearApiKeyCaches();

  // Now transfer: prev=[keyA], next=[keyB], exclusive=true
  await reconcilePoolExclusivity(pool.id, [keyA.id], [keyB.id], true);
  apiKeysDb.clearApiKeyCaches();

  const quotasA = await getAllowedQuotas(keyA.id);
  const quotasB = await getAllowedQuotas(keyB.id);

  assert.ok(!quotasA.includes(pool.id), "keyA should no longer have poolId");
  assert.ok(quotasB.includes(pool.id), "keyB should now have poolId");
});

test("reconcilePoolExclusivity: exclusive=false removes poolId from all prev+next keys", async () => {
  const pool = poolsDb.createPool({ connectionId: "conn-excl-3", name: "Excl Pool C" });
  const keyB = await apiKeysDb.createApiKey("Key B3", "machine-excl-b3");

  // Give keyB the poolId first
  await apiKeysDb.updateApiKeyPermissions(keyB.id, { allowedQuotas: [pool.id] });
  apiKeysDb.clearApiKeyCaches();

  // Turn off exclusive: prev=[keyB], next=[keyB], exclusive=false
  await reconcilePoolExclusivity(pool.id, [keyB.id], [keyB.id], false);
  apiKeysDb.clearApiKeyCaches();

  const quotasB = await getAllowedQuotas(keyB.id);
  assert.ok(!quotasB.includes(pool.id), "keyB should no longer have poolId after exclusive=false");
});

test("reconcilePoolExclusivity: idempotent — calling twice with same args does not duplicate or change anything", async () => {
  const pool = poolsDb.createPool({ connectionId: "conn-excl-4", name: "Excl Pool D" });
  const keyA = await apiKeysDb.createApiKey("Key A4", "machine-excl-a4");

  // First call
  await reconcilePoolExclusivity(pool.id, [], [keyA.id], true);
  apiKeysDb.clearApiKeyCaches();

  const quotasAfterFirst = await getAllowedQuotas(keyA.id);
  assert.ok(quotasAfterFirst.includes(pool.id), "poolId should be present after first call");
  assert.equal(
    quotasAfterFirst.filter((q) => q === pool.id).length,
    1,
    "poolId should appear exactly once",
  );

  // Second call — idempotent
  await reconcilePoolExclusivity(pool.id, [], [keyA.id], true);
  apiKeysDb.clearApiKeyCaches();

  const quotasAfterSecond = await getAllowedQuotas(keyA.id);
  assert.deepEqual(
    quotasAfterSecond,
    quotasAfterFirst,
    "allowedQuotas should be unchanged after second call",
  );
  assert.equal(
    quotasAfterSecond.filter((q) => q === pool.id).length,
    1,
    "poolId should still appear exactly once",
  );
});

test("reconcilePoolExclusivity: idempotent removal — calling exclusive=false twice is safe", async () => {
  const pool = poolsDb.createPool({ connectionId: "conn-excl-5", name: "Excl Pool E" });
  const keyA = await apiKeysDb.createApiKey("Key A5", "machine-excl-a5");

  await apiKeysDb.updateApiKeyPermissions(keyA.id, { allowedQuotas: [pool.id] });
  apiKeysDb.clearApiKeyCaches();

  await reconcilePoolExclusivity(pool.id, [keyA.id], [keyA.id], false);
  apiKeysDb.clearApiKeyCaches();

  const quotasAfterFirst = await getAllowedQuotas(keyA.id);
  assert.ok(!quotasAfterFirst.includes(pool.id), "poolId removed after first exclusive=false");

  // Second call — should not throw, should be a no-op
  await reconcilePoolExclusivity(pool.id, [keyA.id], [keyA.id], false);
  apiKeysDb.clearApiKeyCaches();

  const quotasAfterSecond = await getAllowedQuotas(keyA.id);
  assert.deepEqual(quotasAfterSecond, [], "still empty after second exclusive=false call");
});

test("reconcilePoolExclusivity: missing/unknown keyId is skipped defensively (no throw)", async () => {
  const pool = poolsDb.createPool({ connectionId: "conn-excl-6", name: "Excl Pool F" });

  // ghost-key does not exist in the DB; must not throw
  await assert.doesNotReject(
    () => reconcilePoolExclusivity(pool.id, [], ["ghost-key-id-that-does-not-exist"], true),
    "should not throw for unknown key IDs",
  );
});

test("reconcilePoolExclusivity: exclusive=true preserves other poolIds already in allowedQuotas", async () => {
  const pool1 = poolsDb.createPool({ connectionId: "conn-excl-7a", name: "Excl Pool G1" });
  const pool2 = poolsDb.createPool({ connectionId: "conn-excl-7b", name: "Excl Pool G2" });
  const keyA = await apiKeysDb.createApiKey("Key A7", "machine-excl-a7");

  // Pre-seed keyA with pool1 already
  await apiKeysDb.updateApiKeyPermissions(keyA.id, { allowedQuotas: [pool1.id] });
  apiKeysDb.clearApiKeyCaches();

  // Reconcile pool2 exclusively for keyA
  await reconcilePoolExclusivity(pool2.id, [], [keyA.id], true);
  apiKeysDb.clearApiKeyCaches();

  const quotas = await getAllowedQuotas(keyA.id);
  assert.ok(quotas.includes(pool1.id), "pool1 should still be present");
  assert.ok(quotas.includes(pool2.id), "pool2 should be added");
});
