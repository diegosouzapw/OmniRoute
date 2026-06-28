import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auth-ag-retry-v2-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");

type CreatedConnection = { id: string };

function connectionId(connection: unknown): string {
  assert.ok(connection && typeof connection === "object" && "id" in connection);
  const id = (connection as CreatedConnection).id;
  assert.equal(typeof id, "string");
  return id;
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("round-robin same-model retry treats multi-exclude as fallback LRU and skips all excluded accounts", async () => {
  await resetStorage();

  const first = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "first@example.test",
    accessToken: "tok-first",
    isActive: true,
    testStatus: "active",
    priority: 1,
  });
  const second = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "second@example.test",
    accessToken: "tok-second",
    isActive: true,
    testStatus: "active",
    priority: 2,
  });
  // Two NON-excluded eligible accounts with diverging lastUsedAt so sticky
  // (most-recently-used) and fallback LRU (least-recently-used) pick different
  // accounts — this is what makes the test discriminate the
  // `excludedConnectionIds.size > 0` fallback branch. `recent` is the sticky
  // pick; `stale` is the LRU pick.
  const recent = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "recent@example.test",
    accessToken: "tok-recent",
    isActive: true,
    testStatus: "active",
    priority: 3,
  });
  const stale = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "stale@example.test",
    accessToken: "tok-stale",
    isActive: true,
    testStatus: "active",
    priority: 4,
  });

  const firstId = connectionId(first);
  const secondId = connectionId(second);
  const recentId = connectionId(recent);
  const staleId = connectionId(stale);

  await providersDb.updateProviderConnection(firstId, {
    lastUsedAt: new Date(Date.now() - 5_000).toISOString(),
    consecutiveUseCount: 1,
  });
  await providersDb.updateProviderConnection(secondId, {
    lastUsedAt: new Date(Date.now() - 4_000).toISOString(),
    consecutiveUseCount: 1,
  });
  // `recent` is the most-recently-used eligible account: WITHOUT the fallback
  // change, sticky routing (count 1 < limit 3) would stay on it.
  await providersDb.updateProviderConnection(recentId, {
    lastUsedAt: new Date(Date.now() - 1_000).toISOString(),
    consecutiveUseCount: 1,
  });
  // `stale` is the least-recently-used eligible account: the fallback LRU branch
  // must pick this one.
  await providersDb.updateProviderConnection(staleId, {
    lastUsedAt: new Date(Date.now() - 90_000).toISOString(),
    consecutiveUseCount: 1,
  });

  await settingsDb.updateSettings({ fallbackStrategy: "round-robin", stickyRoundRobinLimit: 3 });

  const selected = await auth.getProviderCredentials("antigravity", null, null, "gemini-3-pro", {
    excludeConnectionIds: [firstId, secondId],
  });

  assert.ok(selected, "expected an eligible non-excluded Antigravity account");
  // Excluded accounts must never be selected.
  assert.notEqual(selected.connectionId, firstId);
  assert.notEqual(selected.connectionId, secondId);
  // The fallback (excludedConnectionIds.size > 0) must route to the LRU account
  // (`stale`), NOT the sticky most-recently-used one (`recent`). Without the
  // `excludedConnectionIds.size > 0` fallback trigger this assertion gets
  // `recentId` and fails.
  assert.equal(selected.connectionId, staleId);
});

test("Antigravity inferred Gemini family cooldown starts around 30s when no upstream hint exists", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "quota@example.test",
    accessToken: "tok-quota",
    isActive: true,
    testStatus: "active",
  });

  const before = Date.now();
  const result = await auth.markAccountUnavailable(
    connectionId(conn),
    429,
    "RESOURCE_EXHAUSTED: Resource has been exhausted (queries per minute limit was reached)",
    "antigravity",
    "gemini-3-pro"
  );
  const elapsedAllowanceMs = Date.now() - before;

  assert.equal(result.shouldFallback, true);
  assert.ok(
    result.cooldownMs >= 30_000 - elapsedAllowanceMs - 500,
    `expected inferred cooldown near 30s+, got ${result.cooldownMs}`
  );
  assert.ok(
    result.cooldownMs <= 65_000,
    `expected bounded initial cooldown, got ${result.cooldownMs}`
  );

  const otherGemini = await auth.getProviderCredentials(
    "antigravity",
    null,
    null,
    "gemini-2.5-pro"
  );
  assert.ok(otherGemini && "allRateLimited" in otherGemini && otherGemini.allRateLimited);
  assert.equal(otherGemini.cooldownScope, "model");
  assert.equal(otherGemini.lastErrorCode, 429);
});
