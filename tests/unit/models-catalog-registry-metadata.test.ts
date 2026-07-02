import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-model-catalog-registry-metadata-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const catalogLimitMasks = await import("../../src/app/api/v1/models/catalogLimitMasks.ts");
const modelMetadataRegistry = await import("../../src/lib/modelMetadataRegistry.ts");

type CatalogModel = {
  id: string;
  root?: string;
  owned_by?: string;
  type?: string;
  context_length?: number;
  max_input_tokens?: number;
  max_output_tokens?: number;
  capabilities?: Record<string, unknown>;
};

type CatalogBody = {
  data: CatalogModel[];
};

async function readCatalogBody(response: Response): Promise<CatalogBody> {
  return (await response.json()) as CatalogBody;
}

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("catalog metadata does not infer static OpenAI specs for compatible providers", () => {
  const model = modelMetadataRegistry.enrichCatalogModelEntry({
    id: "openai-compatible-demo/gpt-4o",
    root: "gpt-4o",
    owned_by: "openai-compatible-demo",
    type: "chat",
  } satisfies CatalogModel);

  assert.equal("context_length" in model, false);
  assert.equal("max_input_tokens" in model, false);
  assert.equal("max_output_tokens" in model, false);
  assert.equal(model.capabilities?.vision, undefined);
  assert.equal(model.capabilities?.tool_calling, undefined);
  assert.equal(model.capabilities?.reasoning, undefined);
});

test("catalog default context fallback preserves unknown registered provider limits", () => {
  const fallback = catalogLimitMasks.getDefaultContextFallback(
    {
      id: "pepper/pepper-1",
      root: "pepper-1",
      owned_by: "pepper",
      type: "chat",
    },
    { pepper: "chipotle" }
  );

  assert.equal(fallback, undefined);
});

test("v1 combo metadata includes registry max output without legacy thinking fields", async () => {
  await combosDb.createCombo({
    name: "registry-metadata-router",
    strategy: "priority",
    models: ["glm/glm-4.7-flash"],
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = await readCatalogBody(response);
  const combo = body.data.find((item) => item.id === "registry-metadata-router");

  assert.equal(response.status, 200);
  assert.ok(combo);
  assert.equal(combo.context_length, 200000);
  assert.equal(combo.max_input_tokens, 200000);
  assert.equal(combo.max_output_tokens, 131072);
  assert.equal(combo.capabilities?.reasoning, true);
  assert.equal("thinking" in (combo.capabilities || {}), false);
});

test("v1 model catalog does not advertise explicit unknown token limits", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-catalog-mask",
    apiKey: "sk-openai",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", "conn-a", [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      source: "imported",
      inputTokenLimit: 128000,
      outputTokenLimit: 16384,
      capabilities: { contextWindow: 128000, maxOutputTokens: 16384 },
    },
  ]);
  modelsDb.mergeModelCompatOverride("openai", "gpt-4o", {
    capabilities: {
      contextWindow: null,
      maxInputTokens: null,
      inputTokenLimit: null,
      maxOutputTokens: null,
      outputTokenLimit: null,
    },
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = await readCatalogBody(response);
  const model = body.data.find((item) => item.id === "openai/gpt-4o");

  assert.equal(response.status, 200);
  assert.ok(model);
  assert.equal("context_length" in model, false);
  assert.equal("max_input_tokens" in model, false);
  assert.equal("max_output_tokens" in model, false);
});

test("v1 model catalog does not invent token limits for unknown compatible custom models", async () => {
  await providersDb.createProviderConnection({
    provider: "openai-compatible-review",
    authType: "apikey",
    name: "compatible-catalog-unknown",
    apiKey: "sk-compatible",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  await modelsDb.addCustomModel(
    "openai-compatible-review",
    "mystery-model",
    "Mystery Model",
    "manual"
  );
  await modelsDb.addCustomModel("openai-compatible-review", "gpt-4o", "GPT-4o", "manual");

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = await readCatalogBody(response);
  const model = body.data.find((item) => item.id === "openai-compatible-review/mystery-model");
  const gptLikeModel = body.data.find((item) => item.id === "openai-compatible-review/gpt-4o");

  assert.equal(response.status, 200);
  assert.ok(model);
  assert.ok(gptLikeModel);
  assert.equal("context_length" in model, false);
  assert.equal("max_input_tokens" in model, false);
  assert.equal("max_output_tokens" in model, false);
  assert.equal("context_length" in gptLikeModel, false);
  assert.equal("max_input_tokens" in gptLikeModel, false);
  assert.equal("max_output_tokens" in gptLikeModel, false);
});

test("v1 model catalog does not advertise explicit unknown boolean capabilities", async () => {
  await providersDb.createProviderConnection({
    provider: "gemini",
    authType: "apikey",
    name: "gemini-catalog-unknown-booleans",
    apiKey: "gemini-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  modelsDb.mergeModelCompatOverride("gemini", "gemini-2.5-pro", {
    capabilities: {
      supportsVision: null,
      supportsTools: null,
    },
  });
  modelsDb.mergeModelCompatOverride("gemini", "gemini-2.0-flash-thinking-exp-01-21", {
    capabilities: {
      supportsReasoning: null,
    },
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = await readCatalogBody(response);
  const pro = body.data.find((item) => item.id === "gemini/gemini-2.5-pro");
  const thinking = body.data.find(
    (item) => item.id === "gemini/gemini-2.0-flash-thinking-exp-01-21"
  );

  assert.equal(response.status, 200);
  assert.ok(pro);
  assert.ok(thinking);
  assert.equal("vision" in (pro.capabilities || {}), false);
  assert.equal("tool_calling" in (pro.capabilities || {}), false);
  assert.equal("reasoning" in (thinking.capabilities || {}), false);
  assert.equal("thinking" in (thinking.capabilities || {}), false);
});

test("v1 combo metadata does not advertise target token limits explicitly marked unknown", async () => {
  modelsDb.mergeModelCompatOverride("openai", "gpt-4o", {
    capabilities: {
      contextWindow: null,
      maxInputTokens: null,
      inputTokenLimit: null,
      maxOutputTokens: null,
      outputTokenLimit: null,
    },
  });
  await combosDb.createCombo({
    name: "unknown-limit-router",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = await readCatalogBody(response);
  const combo = body.data.find((item) => item.id === "unknown-limit-router");

  assert.equal(response.status, 200);
  assert.ok(combo);
  assert.equal("context_length" in combo, false);
  assert.equal("max_input_tokens" in combo, false);
  assert.equal("max_output_tokens" in combo, false);
});

test("explicit unknown masks preserve rootless slashful model ids", async () => {
  modelsDb.mergeModelCompatOverride("openrouter", "vendor/model-a", {
    capabilities: {
      contextWindow: null,
      maxInputTokens: null,
      inputTokenLimit: null,
      maxOutputTokens: null,
      outputTokenLimit: null,
    },
  });

  const masked = catalogLimitMasks.applyExplicitUnknownLimitMasks(
    {
      id: "vendor/model-a",
      owned_by: "openrouter",
      type: "chat",
      context_length: 200000,
      max_input_tokens: 200000,
      max_output_tokens: 8192,
    },
    {}
  );

  assert.equal("context_length" in masked, false);
  assert.equal("max_input_tokens" in masked, false);
  assert.equal("max_output_tokens" in masked, false);
});
