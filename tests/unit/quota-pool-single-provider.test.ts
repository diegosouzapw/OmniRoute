/**
 * tests/unit/quota-pool-single-provider.test.ts
 *
 * Task 3 — One provider per pool (block mixed-type).
 *
 * Coverage:
 * - createPool with two DIFFERENT-provider connections → throws /single provider/i.
 * - createPool with two SAME-provider connections → succeeds, connectionIds.length === 2.
 * - updatePool replacing connectionIds with mixed-provider set → throws /single provider/i.
 * - updatePool replacing connectionIds with same-provider set → succeeds.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB harness (same pattern as quota-pool-connections.test.ts) ─────────────
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-single-prov-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

async function resetStorage() {
  core.resetDbInstance();
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

// ── T3.1: createPool with mixed providers → throws ──────────────────────────

test("createPool with two different-provider connections throws /single provider/i", async () => {
  const a = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "a",
    apiKey: "sk-a",
  });
  const b = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "b",
    apiKey: "sk-b",
  });

  const idA = (a as any).id as string;
  const idB = (b as any).id as string;

  assert.throws(
    () =>
      poolsDb.createPool({
        connectionId: idA,
        connectionIds: [idA, idB],
        name: "Mixed",
      }),
    /same provider|single provider/i
  );
});

// ── T3.2: createPool with same-provider connections → succeeds ──────────────

test("createPool with two same-provider connections succeeds with connectionIds.length === 2", async () => {
  const a = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "a",
    apiKey: "sk-a",
  });
  const c = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "c",
    apiKey: "sk-c",
  });

  const idA = (a as any).id as string;
  const idC = (c as any).id as string;

  const pool = poolsDb.createPool({
    connectionId: idA,
    connectionIds: [idA, idC],
    name: "SameType",
  });

  assert.equal(pool.connectionIds.length, 2, "same-provider pool should have 2 connectionIds");
  assert.ok(pool.connectionIds.includes(idA), "pool should include idA");
  assert.ok(pool.connectionIds.includes(idC), "pool should include idC");
});

// ── T3.3: updatePool with mixed-provider connectionIds → throws ──────────────

test("updatePool replacing connectionIds with mixed providers throws /single provider/i", async () => {
  const a = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "a",
    apiKey: "sk-a",
  });
  const b = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "b",
    apiKey: "sk-b",
  });

  const idA = (a as any).id as string;
  const idB = (b as any).id as string;

  // Create a valid single-connection pool first.
  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "StartSingle",
  });

  // Try updating to mixed-provider set → should throw.
  assert.throws(
    () => poolsDb.updatePool(pool.id, { connectionIds: [idA, idB] }),
    /same provider|single provider/i
  );
});

// ── T3.4: updatePool with same-provider connectionIds → succeeds ─────────────

test("updatePool replacing connectionIds with same-provider connections succeeds", async () => {
  const a = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "a",
    apiKey: "sk-a",
  });
  const c = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "c",
    apiKey: "sk-c",
  });

  const idA = (a as any).id as string;
  const idC = (c as any).id as string;

  const pool = poolsDb.createPool({
    connectionId: idA,
    name: "StartSingle",
  });

  const updated = poolsDb.updatePool(pool.id, { connectionIds: [idA, idC] });

  assert.ok(updated, "updatePool should return updated pool");
  assert.equal(updated!.connectionIds.length, 2, "should have 2 connectionIds after update");
  assert.ok(updated!.connectionIds.includes(idA));
  assert.ok(updated!.connectionIds.includes(idC));
});
