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

type TestProvider = "anthropic" | "codex" | "openai";

const GPT_56_CODEX_MODEL = "gpt-5.6-sol";
const FUTURE_CODEX_MODEL = "codex-next-preview";
const FUTURE_NON_GPT_MODEL = "orion-preview-2027";

async function seedConnection(provider: TestProvider, isActive = true) {
  return providersDb.createProviderConnection({
    provider,
    authType: provider === "codex" ? "oauth" : "apikey",
    name: `${provider}-routing-test`,
    email: provider === "codex" ? `${provider}@example.com` : undefined,
    apiKey: provider !== "codex" ? `sk-${provider}-routing-test` : undefined,
    isActive,
    providerSpecificData: provider === "codex" ? { workspaceId: "ws-routing-test" } : undefined,
  });
}

async function seedSyncedModel(provider: TestProvider, modelId: string, isActive = true) {
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

test("bare GPT-5.6 model routes through Codex when it is the only active provider", async () => {
  await seedSyncedModel("codex", GPT_56_CODEX_MODEL);

  const info = await getModelInfoCore(GPT_56_CODEX_MODEL, null);

  assert.equal(info.provider, "codex");
  assert.equal(info.model, GPT_56_CODEX_MODEL);
});

test("OpenAI remains the historical default when both providers advertise the bare model", async () => {
  await seedSyncedModel("codex", GPT_56_CODEX_MODEL);
  await seedSyncedModel("openai", GPT_56_CODEX_MODEL);

  const info = await getModelInfoCore(GPT_56_CODEX_MODEL, null);

  assert.equal(info.provider, "openai");
  assert.equal(info.model, GPT_56_CODEX_MODEL);
});

test("Codex is inferred when only its active catalog advertises the model", async () => {
  await seedSyncedModel("codex", FUTURE_CODEX_MODEL);
  await seedConnection("openai");

  const info = await getModelInfoCore(FUTURE_CODEX_MODEL, null);

  assert.equal(info.provider, "codex");
  assert.equal(info.model, FUTURE_CODEX_MODEL);
});

test("non-GPT models use the same active synchronized-catalog inference", async () => {
  await seedSyncedModel("anthropic", FUTURE_NON_GPT_MODEL);

  const info = await getModelInfoCore(FUTURE_NON_GPT_MODEL, null);

  assert.equal(info.provider, "anthropic");
  assert.equal(info.model, FUTURE_NON_GPT_MODEL);
});

test("OpenAI remains selected when it is the only active provider advertising the model", async () => {
  await seedSyncedModel("openai", GPT_56_CODEX_MODEL);

  const info = await getModelInfoCore(GPT_56_CODEX_MODEL, null);

  assert.equal(info.provider, "openai");
  assert.equal(info.model, GPT_56_CODEX_MODEL);
});

test("inactive Codex synchronized models do not influence bare-model routing", async () => {
  await seedSyncedModel("codex", GPT_56_CODEX_MODEL, false);
  await seedSyncedModel("openai", GPT_56_CODEX_MODEL);

  const info = await getModelInfoCore(GPT_56_CODEX_MODEL, null);

  assert.equal(info.provider, "openai");
  assert.equal(info.model, GPT_56_CODEX_MODEL);
});

test("OpenAI remains the historical default for overlapping static models", async () => {
  await seedConnection("codex");
  await seedConnection("openai");

  const info = await getModelInfoCore("gpt-5.5", null);

  assert.equal(info.provider, "openai");
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
  await seedSyncedModel("codex", GPT_56_CODEX_MODEL);
  await seedSyncedModel("openai", GPT_56_CODEX_MODEL);

  const codexAlias = await getModelInfoCore(`cx/${GPT_56_CODEX_MODEL}`, null);
  const codexCanonical = await getModelInfoCore(`codex/${GPT_56_CODEX_MODEL}`, null);
  const openai = await getModelInfoCore(`openai/${GPT_56_CODEX_MODEL}`, null);

  assert.equal(codexAlias.provider, "codex");
  assert.equal(codexCanonical.provider, "codex");
  assert.equal(openai.provider, "openai");
});
