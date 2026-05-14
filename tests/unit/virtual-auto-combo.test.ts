import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-virtual-auto-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");

type VirtualComboResult = Awaited<ReturnType<typeof virtualFactory.createVirtualAutoCombo>>;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("createVirtualAutoCombo returns an executable auto combo for API-key connections", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI",
    apiKey: "sk-test-openai",
    defaultModel: "gpt-4o-mini",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("fast");

  assert.equal(combo.strategy, "auto");
  assert.equal(combo.models.length, 1);
  assert.equal(combo.models[0].kind, "model");
  assert.equal(combo.models[0].model, "openai/gpt-4o-mini");
  assert.equal(combo.models[0].providerId, "openai");
  assert.equal(combo.autoConfig.routerStrategy, "lkgp");
  assert.deepEqual(combo.autoConfig.candidatePool, ["openai"]);
});

test("createVirtualAutoCombo includes OAuth accessToken connections with real expiry fields", async () => {
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "oauth",
    email: "oauth@example.com",
    accessToken: "oauth-access-token",
    tokenExpiresAt: new Date(Date.now() + 60_000).toISOString(),
    defaultModel: "claude-sonnet-4-5",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  assert.equal(combo.strategy, "auto");
  assert.equal(combo.models.length, 1);
  assert.equal(combo.models[0].model, "anthropic/claude-sonnet-4-5");
  assert.deepEqual(combo.autoConfig.candidatePool, ["anthropic"]);
});
