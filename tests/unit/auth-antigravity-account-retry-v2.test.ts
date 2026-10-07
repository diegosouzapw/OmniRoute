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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

test("Antigravity 429 rate-limited locks only the exact model so siblings stay eligible", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    email: "quota@example.test",
    accessToken: "tok-quota",
    isActive: true,
    testStatus: "active",
  });
  const connId = connectionId(conn);

  const result = await auth.markAccountUnavailable(
    connId,
    429,
    "RESOURCE_EXHAUSTED: Resource has been exhausted (queries per minute limit was reached)",
    "antigravity",
    "gemini-3-pro"
  );

  // The exact-only lock replaces the previous family inference: only the
  // exhausted model is cooled down (short bounded cooldown), and sibling
  // models on the same connection stay eligible. See PR #8630.
  assert.equal(result.shouldFallback, true);
  assert.ok(
    result.cooldownMs > 0 && result.cooldownMs <= 60_000,
    `expected bounded cooldown, got ${result.cooldownMs}`
  );

  // The exhausted model itself is locked: getProviderCredentials reports
  // model-scope cooldown for that exact model on the only connection.
  const sameModel = await auth.getProviderCredentials("antigravity", null, null, "gemini-3-pro");
  assert.ok(sameModel);
  assert.ok("allRateLimited" in sameModel && sameModel.allRateLimited);
  assert.equal(sameModel.cooldownScope, "model");
  assert.equal(sameModel.cooldownModel, "gemini-3-pro");

  // Sibling model on the SAME connection stays eligible — the whole point
  // of the exact-model lock: a Claude/Gemini 429 must not disable unrelated
  // models on the same account.
  const siblingModel = await auth.getProviderCredentials(
    "antigravity",
    null,
    null,
    "gemini-2.5-pro"
  );
  assert.ok(siblingModel && !("allRateLimited" in siblingModel && siblingModel.allRateLimited));
  assert.equal(siblingModel.connectionId, connId);

  // The exact lock clears when a successful request for the same model comes
  // back through. clearModelLock is the existing success-path hook.
  const { clearModelLock } = await import("../../open-sse/services/accountFallback.ts");
  assert.equal(clearModelLock("antigravity", connId, "gemini-3-pro"), true);
});
