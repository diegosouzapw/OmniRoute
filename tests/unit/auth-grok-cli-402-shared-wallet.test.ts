// Grok Build (`grok-cli`) bills Chat/Imagine/Voice/Build/API against one
// weekly credit pool. A 402 "Grok Build usage balance exhausted" is therefore
// a connection-wide wallet signal, not a per-model billing miss. The
// passthroughModels flag still stands for catalog/404 behaviour; it must not
// route this 402 through the #12242 model-only lockout, or a combo of five
// grok-4.6 steps parks the first empty account and then skips the four
// remaining live accounts as "model locked".
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-cli-402-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

const GROK_BUILD_402 = "Grok Build usage balance exhausted";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedGrokCli(name: string) {
  return seedSharedWallet("grok-cli", name);
}

async function seedSharedWallet(provider: string, name: string) {
  const oauth = provider === "grok-cli" || provider === "xai-oauth";
  return providersDb.createProviderConnection({
    provider,
    authType: oauth ? "oauth" : "apikey",
    name,
    email: name,
    ...(oauth
      ? { accessToken: `${provider}-${name}` }
      : { apiKey: `${provider}-${name}` }),
    isActive: true,
    testStatus: "active",
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("grok-cli 402 parks the connection as credits_exhausted, not a model lock", async () => {
  await resetStorage();
  const conn = await seedGrokCli("empty@qq.com");
  const id = (conn as { id: string }).id;

  const result = await auth.markAccountUnavailable(id, 402, GROK_BUILD_402, "grok-cli", "grok-4.6");

  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(id);
  assert.equal(after.testStatus, "credits_exhausted");

  const lockout = accountFallback.getModelLockoutInfo("grok-cli", id, "grok-4.6");
  assert.equal(lockout, null, "shared-wallet 402 must not lock grok-4.6 on this account");
});

test("a sibling grok-cli account stays eligible after another account's 402", async () => {
  await resetStorage();
  const empty = await seedGrokCli("empty@qq.com");
  const live = await seedGrokCli("live@hotmail.com");
  const emptyId = (empty as { id: string }).id;
  const liveId = (live as { id: string }).id;

  await auth.markAccountUnavailable(emptyId, 402, GROK_BUILD_402, "grok-cli", "grok-4.6");

  assert.equal(
    accountFallback.isModelLocked("grok-cli", liveId, "grok-4.6"),
    false,
    "sibling account must not inherit the empty account's model lock"
  );

  const selected = await auth.getProviderCredentials("grok-cli");
  assert.ok(selected);
  assert.equal(selected.connectionId, liveId);
  assert.notEqual(selected.connectionId, emptyId);
});

test("grok-cli 402 still parks the connection when disableCooling is set", async () => {
  await resetStorage();
  const conn = await providersDb.createProviderConnection({
    provider: "grok-cli",
    authType: "oauth",
    accessToken: "gcli-disabled-cooling",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { disableCooling: true },
  });
  const id = (conn as { id: string }).id;

  await auth.markAccountUnavailable(id, 402, GROK_BUILD_402, "grok-cli", "grok-4.6");

  const after = await providersDb.getProviderConnectionById(id);
  assert.equal(after.testStatus, "credits_exhausted");
});

test("passthrough 402 on ollama-cloud still locks only the paid model (#12242)", async () => {
  await resetStorage();
  const conn = await providersDb.createProviderConnection({
    provider: "ollama-cloud",
    authType: "apikey",
    apiKey: "ollama-cloud-test-key",
    isActive: true,
    testStatus: "active",
  });
  const id = (conn as { id: string }).id;

  await auth.markAccountUnavailable(
    id,
    402,
    "Add credits to continue, or switch to a free model",
    "ollama-cloud",
    "gpt-chat-latest"
  );

  const after = await providersDb.getProviderConnectionById(id);
  assert.equal(after.testStatus, "active");
  assert.equal(
    accountFallback.getModelLockoutInfo("ollama-cloud", id, "gpt-chat-latest")?.reason,
    "credits"
  );
});

test("Grok Build usage balance exhausted matches the credits-exhausted signal", () => {
  assert.equal(accountFallback.isCreditsExhausted(GROK_BUILD_402), true);
});

test("a grok-cli 402 with an unrelated body does not park the connection", async () => {
  await resetStorage();
  const conn = await seedGrokCli("empty-unrelated@qq.com");
  const id = (conn as { id: string }).id;
  await auth.markAccountUnavailable(
    id,
    402,
    "Add credits to continue, or switch to a free model",
    "grok-cli",
    "grok-4.6"
  );
  const after = await providersDb.getProviderConnectionById(id);
  assert.equal(after.testStatus, "active");
  assert.equal(
    accountFallback.getModelLockoutInfo("grok-cli", id, "grok-4.6")?.reason,
    "credits"
  );
});

for (const provider of ["grok-web", "xai-oauth"] as const) {
  test(`${provider} 402 parks the connection as credits_exhausted, not a model lock`, async () => {
    await resetStorage();
    const conn = await seedSharedWallet(provider, `empty@${provider}.example`);
    const id = (conn as { id: string }).id;
    const model = provider === "grok-web" ? "fast" : "grok-4.5";

    await auth.markAccountUnavailable(id, 402, GROK_BUILD_402, provider, model);

    const after = await providersDb.getProviderConnectionById(id);
    assert.equal(after.testStatus, "credits_exhausted");
    assert.equal(
      accountFallback.getModelLockoutInfo(provider, id, model),
      null,
      `${provider} shares the Grok weekly wallet`
    );
  });
}

test("a grok-cli 402 with empty body parks the connection as credits_exhausted", async () => {
  await resetStorage();
  const conn = await seedGrokCli("empty-nobody@qq.com");
  const id = (conn as { id: string }).id;
  await auth.markAccountUnavailable(id, 402, "", "grok-cli", "grok-4.6");
  const after = await providersDb.getProviderConnectionById(id);
  assert.equal(after.testStatus, "credits_exhausted");
  assert.equal(accountFallback.getModelLockoutInfo("grok-cli", id, "grok-4.6"), null);
});
