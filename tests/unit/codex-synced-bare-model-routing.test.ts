import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-synced-routing-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getModelInfoCore } = await import("../../open-sse/services/model.ts");

const FUTURE_CODEX_MODEL = "gpt-5.6-sol";

async function seedConnection(provider: "codex" | "openai", isActive = true) {
  return providersDb.createProviderConnection({
    provider,
    authType: provider === "codex" ? "oauth" : "apikey",
    name: `${provider}-routing-test`,
    email: provider === "codex" ? `${provider}@example.com` : undefined,
    apiKey: provider === "openai" ? `sk-${provider}-routing-test` : undefined,
    isActive,
    providerSpecificData: provider === "codex" ? { workspaceId: "ws-routing-test" } : undefined,
  });
}

async function seedSyncedModel(provider: "codex" | "openai", modelId: string, isActive = true) {
  const connection = await seedConnection(provider, isActive);
  assert.ok(connection?.id, `${provider} connection must be created`);
  await modelsDb.replaceSyncedAvailableModelsForConnection(provider, String(connection.id), [
    {
      id: modelId,
      name: modelId,
      apiFormat: "openai-responses",
      supportedEndpoints: ["chat"],
    },
  ]);
  return connection;
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("bare synchronized Codex model routes through the active Codex connection", async () => {
  await seedSyncedModel("codex", FUTURE_CODEX_MODEL);

  const info = await getModelInfoCore(FUTURE_CODEX_MODEL, null);

  assert.equal(info.provider, "codex");
  assert.equal(info.model, FUTURE_CODEX_MODEL);
});

test("Codex wins when active Codex and OpenAI connections advertise the same bare model", async () => {
  await seedSyncedModel("codex", FUTURE_CODEX_MODEL);
  await seedSyncedModel("openai", FUTURE_CODEX_MODEL);

  const info = await getModelInfoCore(FUTURE_CODEX_MODEL, null);

  assert.equal(info.provider, "codex");
  assert.equal(info.model, FUTURE_CODEX_MODEL);
});

test("OpenAI remains selected when it is the only active provider advertising the model", async () => {
  await seedSyncedModel("openai", FUTURE_CODEX_MODEL);

  const info = await getModelInfoCore(FUTURE_CODEX_MODEL, null);

  assert.equal(info.provider, "openai");
  assert.equal(info.model, FUTURE_CODEX_MODEL);
});

test("inactive Codex synchronized models do not influence bare-model routing", async () => {
  await seedSyncedModel("codex", FUTURE_CODEX_MODEL, false);
  await seedSyncedModel("openai", FUTURE_CODEX_MODEL);

  const info = await getModelInfoCore(FUTURE_CODEX_MODEL, null);

  assert.equal(info.provider, "openai");
  assert.equal(info.model, FUTURE_CODEX_MODEL);
});

test("Codex wins for overlapping static models when both providers are active", async () => {
  await seedConnection("codex");
  await seedConnection("openai");

  const info = await getModelInfoCore("gpt-5.5", null);

  assert.equal(info.provider, "codex");
  assert.equal(info.model, "gpt-5.5");
});

test("OpenAI remains selected for an overlapping static model when Codex is inactive", async () => {
  await seedConnection("codex", false);
  await seedConnection("openai");

  const info = await getModelInfoCore("gpt-5.5", null);

  assert.equal(info.provider, "openai");
  assert.equal(info.model, "gpt-5.5");
});

test("explicit Codex and OpenAI prefixes remain authoritative", async () => {
  await seedSyncedModel("codex", FUTURE_CODEX_MODEL);
  await seedSyncedModel("openai", FUTURE_CODEX_MODEL);

  const codexAlias = await getModelInfoCore(`cx/${FUTURE_CODEX_MODEL}`, null);
  const codexCanonical = await getModelInfoCore(`codex/${FUTURE_CODEX_MODEL}`, null);
  const openai = await getModelInfoCore(`openai/${FUTURE_CODEX_MODEL}`, null);

  assert.equal(codexAlias.provider, "codex");
  assert.equal(codexCanonical.provider, "codex");
  assert.equal(openai.provider, "openai");
});
