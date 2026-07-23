/**
 * tests/unit/quota-key-resolve.test.ts
 *
 * TDD coverage for src/lib/quota/quotaKey.ts::resolveQuotaKeyScope:
 * - Empty / falsy input → empty arrays (no throw)
 * - Unknown pool id → empty arrays (no throw)
 * - Valid pool → returns its connectionId and provider
 * - Multiple pools → deduplicates connections + providers
 * - Missing connection in DB → pool is skipped gracefully
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-key-resolve-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { resolveQuotaKeyScope } = await import("../../src/lib/quota/quotaKey.ts");

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
// Tests
// ---------------------------------------------------------------------------

test("resolveQuotaKeyScope: empty array input returns empty scope", async () => {
  const scope = await resolveQuotaKeyScope([]);
  assert.deepEqual(scope, { connectionIds: [], providers: [], poolSlugs: [] });
});

test("resolveQuotaKeyScope: null input returns empty scope", async () => {
  const scope = await resolveQuotaKeyScope(null);
  assert.deepEqual(scope, { connectionIds: [], providers: [], poolSlugs: [] });
});

test("resolveQuotaKeyScope: undefined input returns empty scope", async () => {
  const scope = await resolveQuotaKeyScope(undefined);
  assert.deepEqual(scope, { connectionIds: [], providers: [], poolSlugs: [] });
});

test("resolveQuotaKeyScope: unknown pool id returns empty scope (no throw)", async () => {
  const scope = await resolveQuotaKeyScope(["pool-does-not-exist"]);
  assert.deepEqual(scope, { connectionIds: [], providers: [], poolSlugs: [] });
});

test("resolveQuotaKeyScope: valid pool returns its connectionId, provider, and group slug", async () => {
  // Seed a real provider connection
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "quota-key-test-conn",
    apiKey: "sk-test-quota-key-helper",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  assert.ok(connId, "connection should have an id");

  // Seed a pool referencing that connection (defaults to group-demo)
  const pool = poolsDb.createPool({ connectionId: connId, name: "Test Pool A2" });

  const scope = await resolveQuotaKeyScope([pool.id]);

  assert.deepEqual(scope.connectionIds, [connId]);
  assert.deepEqual(scope.providers, ["openai"]);
  // Task B5: poolSlugs now contains the GROUP slug, not the pool-name slug.
  // Pool defaults to 'group-demo' → quotaGroupSlug("GroupDemo") = "groupdemo".
  assert.deepEqual(scope.poolSlugs, ["groupdemo"]);
});

test("resolveQuotaKeyScope: multiple pools same provider deduplicates providers", async () => {
  const conn1 = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "conn-anthro-1",
    apiKey: "sk-anthro-1",
  });
  const conn2 = await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "conn-anthro-2",
    apiKey: "sk-anthro-2",
  });
  const id1 = (conn1 as Record<string, unknown>).id as string;
  const id2 = (conn2 as Record<string, unknown>).id as string;

  // Both pools default to group-demo
  const pool1 = poolsDb.createPool({ connectionId: id1, name: "Pool Anthro 1" });
  const pool2 = poolsDb.createPool({ connectionId: id2, name: "Pool Anthro 2" });

  const scope = await resolveQuotaKeyScope([pool1.id, pool2.id]);

  assert.equal(scope.connectionIds.length, 2, "two distinct connections");
  assert.ok(scope.connectionIds.includes(id1));
  assert.ok(scope.connectionIds.includes(id2));

  // provider "anthropic" appears only once even though two pools share it
  assert.deepEqual(scope.providers, ["anthropic"]);

  // Task B5: both pools are in group-demo → single group slug "groupdemo"
  assert.deepEqual(scope.poolSlugs, ["groupdemo"]);
});

test("resolveQuotaKeyScope: multiple pools different providers (same group-demo)", async () => {
  const connA = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "conn-oai",
    apiKey: "sk-oai",
  });
  const connB = await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "conn-gem",
    apiKey: "sk-gem",
  });
  const idA = (connA as Record<string, unknown>).id as string;
  const idB = (connB as Record<string, unknown>).id as string;

  // Both pools in group-demo (default)
  const poolA = poolsDb.createPool({ connectionId: idA, name: "Pool OAI" });
  const poolB = poolsDb.createPool({ connectionId: idB, name: "Pool GEM" });

  const scope = await resolveQuotaKeyScope([poolA.id, poolB.id]);

  assert.equal(scope.connectionIds.length, 2);
  assert.ok(scope.connectionIds.includes(idA));
  assert.ok(scope.connectionIds.includes(idB));

  const providers = [...scope.providers].sort();
  assert.deepEqual(providers, ["gemini", "openai"]);

  // Task B5: both pools are in group-demo → single group slug
  assert.deepEqual(scope.poolSlugs, ["groupdemo"]);
});

test("resolveQuotaKeyScope: pool referencing non-existent connectionId is skipped gracefully", async () => {
  // Create a pool with a fictitious connectionId (no matching row in provider_connections)
  const pool = poolsDb.createPool({
    connectionId: "conn-does-not-exist",
    name: "Orphan Pool",
  });

  const scope = await resolveQuotaKeyScope([pool.id]);
  assert.deepEqual(scope, { connectionIds: [], providers: [], poolSlugs: [] });
});

test("resolveQuotaKeyScope: mix of valid and invalid pool ids — only valid contribute", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "conn-mix",
    apiKey: "sk-mix",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  const pool = poolsDb.createPool({ connectionId: connId, name: "Pool Mix" });

  const scope = await resolveQuotaKeyScope(["no-such-pool-id", pool.id, "another-ghost"]);

  assert.deepEqual(scope.connectionIds, [connId]);
  assert.deepEqual(scope.providers, ["openai"]);
  // Task B5: poolSlugs now returns the GROUP slug (group-demo → "groupdemo"),
  // not the pool-name slug ("poolmix"). Ghost pool IDs are skipped (no group
  // resolution), so only the one valid pool's group appears.
  assert.deepEqual(scope.poolSlugs, ["groupdemo"]);
});
