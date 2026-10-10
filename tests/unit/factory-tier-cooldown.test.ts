import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-factory-tier-cd-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "factory-tier-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const { persistFactoryTierCooldown, rehydrateFactoryTierLocks, persistFactoryPreflightTierLock } =
  await import("../../open-sse/services/factoryTierCooldown.ts");

test.after(() => {
  fallback.clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("persisted Factory Standard cooldown rehydrates without cooling Core", async () => {
  fallback.clearAllModelLockouts();
  const conn = await providersDb.createProviderConnection({
    provider: "factory",
    authType: "oauth",
    name: "factory-tier-persist",
    accessToken: "access-a",
    refreshToken: "refresh-a",
  });
  const connId = (conn as { id: string }).id;
  const until = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  await persistFactoryTierCooldown({
    connectionId: connId,
    model: "claude-haiku-4-5-20251001",
    rateLimitedUntil: until,
  });

  fallback.clearAllModelLockouts();
  assert.equal(fallback.isModelLocked("factory", connId, "claude-haiku-4-5-20251001"), false);
  assert.equal(fallback.isModelLocked("factory", connId, "minimax-m2.7"), false);

  const fresh = await providersDb.getProviderConnectionById(connId);
  const psd = (fresh as { providerSpecificData?: Record<string, unknown> }).providerSpecificData;
  assert.equal(typeof psd?.factoryTierCooldowns, "object");
  rehydrateFactoryTierLocks("factory", connId, psd);
  assert.equal(fallback.isModelLocked("factory", connId, "claude-haiku-4-5-20251001"), true);
  assert.equal(fallback.isModelLocked("factory", connId, "gpt-5.4"), true);
  assert.equal(fallback.isModelLocked("factory", connId, "minimax-m2.7"), false);
  assert.equal(providersDb.isConnectionRateLimited(connId), false);
});

test("Factory preflight lock persists Standard without cooling the account", async () => {
  fallback.clearAllModelLockouts();
  const conn = await providersDb.createProviderConnection({
    provider: "factory",
    authType: "oauth",
    name: "factory-preflight-lock",
    accessToken: "access-b",
    refreshToken: "refresh-b",
  });
  const connId = (conn as { id: string }).id;
  const until = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  await persistFactoryPreflightTierLock({
    provider: "factory",
    connectionId: connId,
    model: "claude-haiku-4-5-20251001",
    unavailableUntil: until,
  });
  assert.equal(fallback.isModelLocked("factory", connId, "claude-haiku-4-5-20251001"), true);
  assert.equal(fallback.isModelLocked("factory", connId, "minimax-m2.7"), false);
  assert.equal(providersDb.isConnectionRateLimited(connId), false);
});
