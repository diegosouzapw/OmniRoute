// #3027 — A per-model subscription 403 on a passthrough / per-model-quota provider
// (e.g. ollama-cloud "this model requires a subscription") must lock out ONLY the paid
// model, not cool down the whole connection (which would knock out the free models on
// the same key). Terminal whole-key 403s (account deactivated / credits exhausted) must
// still take the connection-level terminal path and NOT be downgraded to a model lockout.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ollama-403-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

const SUBSCRIPTION_403 =
  "this model requires a subscription, upgrade for access: https://ollama.com/upgrade";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedOllamaCloud() {
  return providersDb.createProviderConnection({
    provider: "ollama-cloud",
    authType: "apikey",
    apiKey: "ollama-key",
    isActive: true,
    testStatus: "active",
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("per-model subscription 403 locks only the paid model, connection stays active", async () => {
  await resetStorage();
  const conn = await seedOllamaCloud();

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    403,
    SUBSCRIPTION_403,
    "ollama-cloud",
    "deepseek-v4-pro"
  );

  assert.equal(result.shouldFallback, true);

  // Connection must NOT be cooled down — free models on the same key keep serving.
  const after = await providersDb.getProviderConnectionById((conn as any).id);
  assert.equal(after.testStatus, "active");
  assert.ok(!after.rateLimitedUntil, "connection must not be rate-limited");

  // The paid model is locked out for this connection...
  const paidLockout = accountFallback.getModelLockoutInfo(
    "ollama-cloud",
    (conn as any).id,
    "deepseek-v4-pro"
  );
  assert.equal(paidLockout?.reason, "forbidden");

  // ...but a free model on the same connection is still eligible.
  const freeLockout = accountFallback.getModelLockoutInfo(
    "ollama-cloud",
    (conn as any).id,
    "gemma4:31b"
  );
  assert.equal(freeLockout, null);
});

test("genuine whole-key 403 (account deactivated) still terminates the connection", async () => {
  await resetStorage();
  const conn = await seedOllamaCloud();

  const result = await auth.markAccountUnavailable(
    (conn as any).id,
    403,
    "this account is deactivated",
    "ollama-cloud",
    "deepseek-v4-pro"
  );
  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById((conn as any).id);
  // Terminal status (not a model-scoped lockout downgrade). A deactivated key is a
  // permanent failure -> "banned" via resolveTerminalConnectionStatus.
  assert.equal(after.testStatus, "banned");

  const lockout = accountFallback.getModelLockoutInfo(
    "ollama-cloud",
    (conn as any).id,
    "deepseek-v4-pro"
  );
  assert.equal(lockout, null);
});

test("repeated subscription 403s do not escalate a connection-wide backoff", async () => {
  await resetStorage();
  const conn = await seedOllamaCloud();

  await auth.markAccountUnavailable(
    (conn as any).id,
    403,
    SUBSCRIPTION_403,
    "ollama-cloud",
    "deepseek-v4-pro"
  );
  await auth.markAccountUnavailable(
    (conn as any).id,
    403,
    SUBSCRIPTION_403,
    "ollama-cloud",
    "deepseek-v4-pro"
  );

  const after = await providersDb.getProviderConnectionById((conn as any).id);
  assert.equal(after.testStatus, "active");
  assert.ok(!after.rateLimitedUntil, "connection must not be rate-limited");
  assert.equal(after.backoffLevel ?? 0, 0, "connection backoff must not escalate");

  // The model lockout itself still exists.
  const paidLockout = accountFallback.getModelLockoutInfo(
    "ollama-cloud",
    (conn as any).id,
    "deepseek-v4-pro"
  );
  assert.equal(paidLockout?.reason, "forbidden");
});
