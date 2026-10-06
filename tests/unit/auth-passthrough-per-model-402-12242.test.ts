// #12242 — 402 variant of #3027. A per-model billing 402 on a passthrough /
// per-model-quota provider (e.g. kilo-gateway, ollama-cloud) must lock out
// ONLY the paid model, not terminalize the whole connection (which would
// knock out the free models on the same key with a terminal, never-auto-
// recovered credits_exhausted status). A genuine whole-key 402 on a
// single-credential (non-passthrough) provider must still terminalize the
// connection, since that behavior is deliberate for prepaid API keys (see
// #5239 / #10616).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-402-passthrough-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

const CREDITS_402 = "Add credits to continue, or switch to a free model";

async function resetStorage() {
  core.resetDbInstance();
  // maxRetries/retryDelay: closing the better-sqlite3 handle above is
  // synchronous, but the OS can briefly hold the WAL/SHM files open a beat
  // longer under concurrent test runs — retry instead of failing the test on
  // an unrelated filesystem race (ENOTEMPTY).
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
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

/** Non-passthrough, single-credential provider — a 402 here is genuinely terminal. */
async function seedSingleCredentialProvider() {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "openai-key",
    isActive: true,
    testStatus: "active",
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("per-model billing 402 on a passthrough provider locks only the paid model, connection stays active", async () => {
  await resetStorage();
  const conn = await seedOllamaCloud();

  const result = await auth.markAccountUnavailable(
    (conn as { id: string }).id,
    402,
    CREDITS_402,
    "ollama-cloud",
    "gpt-chat-latest"
  );

  assert.equal(result.shouldFallback, true);

  // Connection must NOT be terminalized — free models on the same key keep serving.
  const after = await providersDb.getProviderConnectionById((conn as { id: string }).id);
  assert.equal(after.testStatus, "active");
  assert.notEqual(after.testStatus, "credits_exhausted");
  assert.ok(!after.rateLimitedUntil, "connection must not be rate-limited");

  // The paid model is locked out for this connection...
  const paidLockout = accountFallback.getModelLockoutInfo(
    "ollama-cloud",
    (conn as { id: string }).id,
    "gpt-chat-latest"
  );
  assert.equal(paidLockout?.reason, "credits");

  // ...but a free model on the same connection is still eligible.
  const freeLockout = accountFallback.getModelLockoutInfo(
    "ollama-cloud",
    (conn as { id: string }).id,
    "gpt-oss:20b"
  );
  assert.equal(freeLockout, null);
});

test("a subsequent request for a free model succeeds after a sibling paid model 402s", async () => {
  await resetStorage();
  const conn = await seedOllamaCloud();

  await auth.markAccountUnavailable(
    (conn as { id: string }).id,
    402,
    CREDITS_402,
    "ollama-cloud",
    "nex-agi/nex-n2-mini"
  );

  // Simulate the next request routing to a free model on the same connection:
  // getProviderCredentials excludes connections whose testStatus isn't active,
  // so the connection must still read back as active for the free model to
  // even be considered.
  const after = await providersDb.getProviderConnectionById((conn as { id: string }).id);
  assert.equal(after.testStatus, "active");

  const freeLockout = accountFallback.getModelLockoutInfo(
    "ollama-cloud",
    (conn as { id: string }).id,
    "gpt-oss:20b"
  );
  assert.equal(freeLockout, null, "free model must not have inherited the paid model's lockout");
});

test("genuine whole-key 402 on a single-credential provider still terminalizes the connection", async () => {
  await resetStorage();
  const conn = await seedSingleCredentialProvider();

  const result = await auth.markAccountUnavailable(
    (conn as { id: string }).id,
    402,
    CREDITS_402,
    "openai",
    "gpt-chat-latest"
  );
  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById((conn as { id: string }).id);
  // Deliberately unchanged behavior for single-credential providers (#5239 / #10616):
  // a 402 there genuinely means the key itself is out of credit.
  assert.equal(after.testStatus, "credits_exhausted");

  const lockout = accountFallback.getModelLockoutInfo(
    "openai",
    (conn as { id: string }).id,
    "gpt-chat-latest"
  );
  assert.equal(lockout, null, "single-credential 402 must not be downgraded to a model lockout");
});

test("repeated per-model 402s on a passthrough provider do not escalate a connection-wide backoff", async () => {
  await resetStorage();
  const conn = await seedOllamaCloud();

  await auth.markAccountUnavailable(
    (conn as { id: string }).id,
    402,
    CREDITS_402,
    "ollama-cloud",
    "gpt-chat-latest"
  );
  await auth.markAccountUnavailable(
    (conn as { id: string }).id,
    402,
    CREDITS_402,
    "ollama-cloud",
    "gpt-chat-latest"
  );

  const after = await providersDb.getProviderConnectionById((conn as { id: string }).id);
  assert.equal(after.testStatus, "active");
  assert.ok(!after.rateLimitedUntil, "connection must not be rate-limited");
  assert.equal(after.backoffLevel ?? 0, 0, "connection backoff must not escalate");

  const paidLockout = accountFallback.getModelLockoutInfo(
    "ollama-cloud",
    (conn as { id: string }).id,
    "gpt-chat-latest"
  );
  assert.equal(paidLockout?.reason, "credits");
});
