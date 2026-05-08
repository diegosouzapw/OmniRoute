import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider, overrides = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey || "sk-test",
    accessToken: overrides.accessToken,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("v1 models catalog requires auth when the route is protected and login is enabled", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 401);
  assert.equal(body.error.code, "invalid_api_key");
  assert.match(body.error.message, /Authentication required/i);
});

test("v1 models catalog accepts bearer API keys and filters the list by allowed model patterns", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("openai", { name: "openai-main" });
  await seedConnection("claude", {
    authType: "oauth",
    name: "claude-main",
    apiKey: null,
    accessToken: "claude-access",
  });

  const key = await apiKeysDb.createApiKey("catalog-filter", "machine-catalog");
  await apiKeysDb.updateApiKeyPermissions(key.id, {
    allowedModels: ["openai/*"],
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${key.key}` },
    })
  );
  const body = (await response.json()) as any;
  const ids = body.data.map((item) => item.id);

  assert.equal(response.status, 200);
  assert.ok(ids.some((id) => id.startsWith("openai/")));
  assert.equal(
    ids.some((id) => id.startsWith("claude/") || id.startsWith("cc/")),
    false
  );
});

test("v1 models catalog hides models excluded by every active connection while keeping models served by at least one account", async () => {
  const first = await seedConnection("openai", {
    name: "openai-first",
    providerSpecificData: {
      excludedModels: ["gpt-5.4*"],
    },
  });
  const second = await seedConnection("openai", {
    name: "openai-second",
    providerSpecificData: {
      excludedModels: ["gpt-4.1*"],
    },
  });

  let response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  let body = (await response.json()) as any;
  let ids = new Set(body.data.map((item) => item.id));

  assert.equal(response.status, 200);
  assert.equal(ids.has("openai/gpt-5.4-mini"), true);

  await providersDb.updateProviderConnection((second as any).id, {
    providerSpecificData: {
      excludedModels: ["gpt-5.4*"],
    },
  });

  response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  body = (await response.json()) as any;
  ids = new Set(body.data.map((item) => item.id));

  assert.equal(response.status, 200);
  assert.equal(ids.has("openai/gpt-5.4-mini"), false);

  await providersDb.updateProviderConnection((first as any).id, {
    providerSpecificData: {
      excludedModels: [],
    },
  });
});

test("v1 models catalog includes combos and custom models while excluding hidden models and blocked providers", async () => {
  await settingsDb.updateSettings({
    blockedProviders: ["claude"],
  });
  await seedConnection("openai", { name: "openai-visible" });
  await seedConnection("claude", {
    authType: "oauth",
    name: "claude-blocked",
    apiKey: null,
    accessToken: "claude-access",
  });
  await seedConnection("kiro", {
    authType: "oauth",
    name: "kiro-custom",
    apiKey: null,
    accessToken: "kiro-access",
  });

  modelsDb.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: true });
  await modelsDb.addCustomModel("kiro", "custom-kiro", "Custom Kiro");
  await combosDb.createCombo({
    name: "team-router",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const ids = new Set(body.data.map((item) => item.id));

  assert.equal(response.status, 200);
  assert.ok(ids.has("team-router"));
  assert.ok(ids.has("kr/custom-kiro"));
  assert.ok(ids.has("kiro/custom-kiro"));
  assert.equal(ids.has("openai/gpt-4o-mini"), false);
  assert.equal(
    [...ids].some((id) => (id as any).startsWith("claude/") || (id as any).startsWith("cc/")),
    false
  );
});

test("v1 models catalog keeps only visible combos when no providers are active", async () => {
  const visible = await combosDb.createCombo({
    name: "visible-combo",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });
  await combosDb.updateCombo((visible as any).id, { context_length: 32000 });
  const hidden = await combosDb.createCombo({
    name: "hidden-combo",
    strategy: "priority",
    models: ["openai/gpt-4o"],
    isHidden: true,
  });
  const inactive = await combosDb.createCombo({
    name: "inactive-combo",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });
  await combosDb.updateCombo((inactive as any).id, { isActive: false });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.deepEqual(
    body.data.map((item) => item.id),
    [visible.name]
  );
  assert.equal(body.data[0].context_length, 32000);
  assert.equal(
    body.data.some((item) => item.id === hidden.name),
    false
  );
  assert.equal(
    body.data.some((item) => item.id === inactive.name),
    false
  );
});

test("v1 models catalog exposes claude alias and provider-prefixed built-in models with vision metadata", async () => {
  await seedConnection("claude", {
    authType: "oauth",
    name: "claude-vision",
    apiKey: null,
    accessToken: "claude-access",
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const aliasModel = body.data.find((item) => item.id === "cc/claude-sonnet-4-6");
  const providerModel = body.data.find((item) => item.id === "claude/claude-sonnet-4-6");

  assert.equal(response.status, 200);
  assert.ok(aliasModel);
  assert.ok(providerModel);
  assert.equal(providerModel.parent, aliasModel.id);
  assert.equal(aliasModel.capabilities?.vision, true);
  assert.deepEqual(aliasModel.input_modalities, ["text", "image"]);
  assert.deepEqual(aliasModel.output_modalities, ["text"]);
});

test("v1 models catalog exposes refreshed GitHub Copilot aliases and drops retired models", async () => {
  await seedConnection("github", {
    authType: "oauth",
    name: "github-current",
    apiKey: null,
    accessToken: "github-access",
    providerSpecificData: {
      copilotToken: "copilot-token",
    },
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const aliasModel = body.data.find((item) => item.id === "gh/gpt-5.4");
  const providerModel = body.data.find((item) => item.id === "github/gpt-5.4");
  const codexModel = body.data.find((item) => item.id === "gh/gpt-5.3-codex");
  const opusModel = body.data.find((item) => item.id === "github/claude-opus-4.7");

  assert.equal(response.status, 200);
  assert.ok(aliasModel);
  assert.ok(providerModel);
  assert.ok(codexModel);
  assert.ok(opusModel);
  assert.equal(providerModel.parent, aliasModel.id);
  assert.equal(
    body.data.some((item) => item.id === "gh/gpt-5.1"),
    false
  );
  assert.equal(
    body.data.some((item) => item.id === "gh/claude-opus-4.1"),
    false
  );
});

test("v1 models catalog exposes Antigravity client-visible preview aliases instead of upstream internal IDs", async () => {
  await seedConnection("antigravity", {
    authType: "oauth",
    name: "antigravity-preview",
    apiKey: null,
    accessToken: "antigravity-access",
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const ids = new Set(body.data.map((item) => item.id));

  assert.equal(response.status, 200);
  assert.ok(ids.has("antigravity/gemini-3-pro-preview"));
  assert.ok(ids.has("antigravity/gemini-3-flash-preview"));
  assert.equal(ids.has("antigravity/gemini-3.1-pro-high"), false);
  assert.equal(ids.has("antigravity/gemini-claude-sonnet-4-5"), false);
  assert.equal(ids.has("antigravity/gemini-claude-sonnet-4-5-thinking"), false);
  assert.equal(ids.has("antigravity/gemini-claude-opus-4-5-thinking"), false);
});

test("v1 models catalog uses provider-node prefixes for compatible provider custom models", async () => {
  await providersDb.createProviderNode({
    id: "anthropic-compatible-demo",
    type: "anthropic-compatible",
    name: "Anthropic Demo",
    prefix: "cm",
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/messages",
    modelsPath: "/v1/models",
  });
  await seedConnection("anthropic-compatible-demo", {
    name: "anthropic-node",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/messages",
      modelsPath: "/v1/models",
    },
  });
  await modelsDb.addCustomModel("anthropic-compatible-demo", "claude-edge", "Claude Edge");

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const ids = new Set(body.data.map((item) => item.id));

  assert.equal(response.status, 200);
  assert.ok(ids.has("cm/claude-edge"));
  assert.equal(ids.has("anthropic-compatible-demo/claude-edge"), false);
});

test("v1 models catalog includes synced Gemini models and duplicates audio models for speech", async () => {
  const connection = await seedConnection("gemini", {
    name: "gemini-synced",
    apiKey: "gm-key",
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "gemini" as any,
    (connection as any).id,
    [
      {
        id: "gemini-audio-live",
        name: "Gemini Audio Live",
        source: "imported",
        supportedEndpoints: ["audio"],
        inputTokenLimit: 4096,
      },
      {
        id: "text-embedding-004",
        name: "Text Embedding 004",
        source: "imported",
        supportedEndpoints: ["embeddings"],
        inputTokenLimit: 2048,
      },
      {
        id: "gemini-hidden",
        name: "Gemini Hidden",
        source: "imported",
        supportedEndpoints: ["chat"],
      },
    ]
  );
  modelsDb.mergeModelCompatOverride("gemini", "gemini-hidden", { isHidden: true });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const audioVariants = body.data.filter((item) => item.id === "gemini/gemini-audio-live");
  const embedding = body.data.find((item) => item.id === "gemini/text-embedding-004");

  assert.equal(response.status, 200);
  assert.equal(audioVariants.length, 2);
  assert.deepEqual(audioVariants.map((item) => item.subtype).sort(), ["speech", "transcription"]);
  assert.equal(embedding.type, "embedding");
  assert.equal(
    body.data.some((item) => item.id === "gemini/gemini-hidden"),
    false
  );
});

test("v1 models catalog keeps Gemini chat models untyped when synced endpoints are omitted", async () => {
  const connection = await seedConnection("gemini", {
    name: "gemini-chat-default",
    apiKey: "gm-chat-key",
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection("gemini", (connection as any).id, [
    {
      id: "gemini-2.5-pro-live",
      name: "Gemini 2.5 Pro Live",
      source: "imported",
      inputTokenLimit: 8192,
    },
  ]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const chatModel = body.data.find((item) => item.id === "gemini/gemini-2.5-pro-live");

  assert.equal(response.status, 200);
  assert.ok(chatModel);
  assert.equal("type" in chatModel, false);
  assert.equal("supported_endpoints" in chatModel, false);
  assert.equal(chatModel.context_length, 8192);
});

test("v1 models catalog includes synced non-Gemini provider models from discovery cache", async () => {
  const connection = await seedConnection("opencode-go", {
    name: "opencode-go-synced",
    apiKey: "go-key",
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection("opencode-go", (connection as any).id, [
    {
      id: "glm-5.1",
      name: "GLM 5.1",
      source: "imported",
      supportedEndpoints: ["chat"],
      inputTokenLimit: 262144,
    },
  ]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const syncedModel = body.data.find((item) => item.id === "opencode-go/glm-5.1");

  assert.equal(response.status, 200);
  assert.ok(syncedModel);
  assert.equal(syncedModel.owned_by, "opencode-go");
  assert.equal(syncedModel.context_length, 262144);
});

test("v1 models catalog includes media, moderation, rerank, video, and music models for active providers", async () => {
  await seedConnection("openai", { name: "openai-media" });
  await seedConnection("cohere", { name: "cohere-rerank" });
  await seedConnection("comfyui", {
    name: "comfy-media",
    apiKey: null,
    accessToken: null,
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const byId = new Map(body.data.map((item) => [item.id, item]));

  assert.equal(response.status, 200);
  assert.equal((byId.get("openai/gpt-image-2") as any).type, "image");
  assert.equal((byId.get("openai/whisper-1") as any).type, "audio");
  assert.equal((byId.get("openai/whisper-1") as any).subtype, "transcription");
  assert.equal((byId.get("openai/omni-moderation-latest") as any).type, "moderation");
  assert.equal((byId.get("cohere/rerank-v3.5") as any).type, "rerank");
  assert.equal((byId.get("comfyui/animatediff") as any).type, "video");
  assert.equal((byId.get("comfyui/stable-audio-open") as any).type, "music");
});

test("v1 models catalog does not duplicate imported Jina specialty models", async () => {
  const connection = await seedConnection("jina-ai", {
    name: "jina-synced",
    apiKey: "jina-key",
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection("jina-ai", (connection as any).id, [
    {
      id: "jina-embeddings-v5-text-small",
      name: "Jina Embeddings v5 Text Small",
      source: "imported",
      apiFormat: "embeddings",
      supportedEndpoints: ["embeddings"],
    },
    {
      id: "jina-reranker-v3",
      name: "Jina Reranker v3",
      source: "imported",
      apiFormat: "rerank",
      supportedEndpoints: ["rerank"],
    },
  ]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const visibleJinaEmbeddingRows = body.data.filter(
    (item) =>
      item.owned_by === "jina-ai" &&
      item.root === "jina-embeddings-v5-text-small" &&
      item.type === "embedding" &&
      !item.parent
  );
  const visibleJinaRerankRows = body.data.filter(
    (item) =>
      item.owned_by === "jina-ai" &&
      item.root === "jina-reranker-v3" &&
      item.type === "rerank" &&
      !item.parent
  );

  assert.equal(response.status, 200);
  assert.equal(visibleJinaEmbeddingRows.length, 1);
  assert.equal(visibleJinaEmbeddingRows[0].id, "jina/jina-embeddings-v5-text-small");
  assert.equal(visibleJinaRerankRows.length, 1);
  assert.equal(visibleJinaRerankRows[0].id, "jina/jina-reranker-v3");
});

test("v1 models catalog does not duplicate custom Jina specialty models", async () => {
  await seedConnection("jina-ai", {
    name: "jina-custom",
    apiKey: "jina-key",
  });
  await modelsDb.addCustomModel(
    "jina-ai",
    "jina-embeddings-v5-text-small",
    "Jina Embeddings v5 Text Small",
    "imported",
    "embeddings",
    ["embeddings"]
  );
  await modelsDb.addCustomModel(
    "jina-ai",
    "jina-reranker-v3",
    "Jina Reranker v3",
    "imported",
    "rerank",
    ["rerank"]
  );

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const visibleJinaEmbeddingRows = body.data.filter(
    (item) =>
      item.owned_by === "jina-ai" &&
      item.root === "jina-embeddings-v5-text-small" &&
      item.type === "embedding" &&
      !item.parent
  );
  const visibleJinaRerankRows = body.data.filter(
    (item) =>
      item.owned_by === "jina-ai" &&
      item.root === "jina-reranker-v3" &&
      item.type === "rerank" &&
      !item.parent
  );

  assert.equal(response.status, 200);
  assert.equal(visibleJinaEmbeddingRows.length, 1);
  assert.equal(visibleJinaEmbeddingRows[0].id, "jina-ai/jina-embeddings-v5-text-small");
  assert.equal(visibleJinaRerankRows.length, 1);
  assert.equal(visibleJinaRerankRows[0].id, "jina-ai/jina-reranker-v3");
});

test("v1 models catalog exposes image model input and output modalities for advanced image providers", async () => {
  await seedConnection("together", { name: "together-images" });
  await seedConnection("topaz", { name: "topaz-images" });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const byId = new Map(body.data.map((item) => [item.id, item]));

  assert.equal(response.status, 200);
  assert.deepEqual((byId as any).get("flux-2-dev")?.input_modalities, ["text", "image"]);
  (assert as any).deepEqual((byId.get("flux-2-dev") as any).output_modalities, ["image"]);
  (assert as any).equal((byId.get("flux-2-dev") as any).type, "image");
  assert.ok((byId.get("flux-2-dev") as any).supported_sizes?.includes("1024x1024"));
  (assert as any).deepEqual((byId.get("topaz/topaz-enhance") as any).input_modalities, ["image"]);
  assert.deepEqual((byId.get("topaz/topaz-enhance") as any).output_modalities, ["image"]);
});

test("v1 models catalog tolerates custom model lookup failures and keeps builtin models available", async () => {
  await seedConnection("openai", { name: "openai-custom-failure" });

  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  const originalLog = console.log;
  const logs = [];

  db.prepare = (sql) => {
    if (String(sql) === "SELECT key, value FROM key_value WHERE namespace = 'customModels'") {
      throw new Error("custom models offline");
    }
    return originalPrepare(sql);
  };
  console.log = (...args) => {
    logs.push(args.map((arg) => String(arg)).join(" "));
  };

  try {
    const response = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    const body = (await response.json()) as any;

    assert.equal(response.status, 200);
    assert.ok(body.data.some((item) => item.id === "openai/gpt-4o"));
    assert.ok(logs.some((entry) => entry.includes("Could not fetch custom models")));
  } finally {
    db.prepare = originalPrepare;
    console.log = originalLog;
  }
});

test("v1 models catalog exposes provider-prefixed custom models, filters by raw model permissions, and skips hidden or Gemini custom rows", async () => {
  await seedConnection("cline", {
    authType: "oauth",
    name: "cline-custom",
    apiKey: null,
    accessToken: "cline-access",
  });
  await seedConnection("gemini", { name: "gemini-custom" });

  await modelsDb.addCustomModel("cline", "demo-custom", "Demo Custom", "manual", "responses", [
    "images",
  ]);
  await modelsDb.updateCustomModel("cline", "demo-custom", {
    inputTokenLimit: 1234,
  });
  await modelsDb.addCustomModel("gemini", "gemini-custom-only", "Gemini Custom");

  const db = core.getDbInstance();
  db.prepare("UPDATE key_value SET value = ? WHERE namespace = 'customModels' AND key = ?").run(
    JSON.stringify([
      {
        id: "demo-custom",
        name: "Demo Custom",
        apiFormat: "responses",
        supportedEndpoints: ["images"],
        inputTokenLimit: 1234,
      },
      {
        id: "hidden-custom",
        name: "Hidden Custom",
        isHidden: true,
      },
      {
        name: "Missing Id",
      },
      null,
    ]),
    "cline"
  );

  const key = await apiKeysDb.createApiKey("catalog-root-filter", "machine-root-filter");
  await apiKeysDb.updateApiKeyPermissions(key.id, {
    allowedModels: ["demo-custom"],
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${key.key}` },
    })
  );
  const body = (await response.json()) as any;
  const ids = new Set(body.data.map((item) => item.id));
  const shortAlias = body.data.find((item) => item.id === "cl/demo-custom");
  const providerAlias = body.data.find((item) => item.id === "cline/demo-custom");

  assert.equal(response.status, 200);
  assert.ok(ids.has("cl/demo-custom"));
  assert.ok(ids.has("cline/demo-custom"));
  assert.equal(ids.has("cl/hidden-custom"), false);
  assert.equal(ids.has("gemini/gemini-custom-only"), false);
  assert.equal(shortAlias.type, "image");
  assert.equal(shortAlias.api_format, "responses");
  assert.deepEqual(shortAlias.supported_endpoints, ["images"]);
  assert.equal(shortAlias.context_length, 1234);
  assert.equal(providerAlias.parent, "cl/demo-custom");
});

test("v1 models catalog uses synced models.dev limits instead of provider defaults", async () => {
  await seedConnection("openai", { name: "openai-models-dev" });

  try {
    modelsDevSync.saveModelsDevCapabilities({
      openai: {
        "gpt-5.5": {
          tool_call: true,
          reasoning: true,
          attachment: true,
          structured_output: true,
          temperature: true,
          modalities_input: JSON.stringify(["text", "image"]),
          modalities_output: JSON.stringify(["text"]),
          knowledge_cutoff: null,
          release_date: null,
          last_updated: null,
          status: null,
          family: "gpt-5",
          open_weights: false,
          limit_context: 1050000,
          limit_input: 1050000,
          limit_output: 128000,
          interleaved_field: null,
        },
      },
    });

    const response = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    const body = (await response.json()) as any;
    const model = body.data.find((item) => item.id === "openai/gpt-5.5");

    assert.equal(response.status, 200);
    assert.ok(model);
    assert.equal(model.context_length, 1050000);
    assert.equal(model.max_input_tokens, 1050000);
    assert.equal(model.max_output_tokens, 128000);
  } finally {
    modelsDevSync.saveModelsDevCapabilities({});
  }
});

test("v1 models catalog lets provider-specific synced limits beat global static specs", async () => {
  await seedConnection("github", {
    authType: "oauth",
    name: "github-copilot-models-dev",
    apiKey: null,
    accessToken: "github-access",
  });

  try {
    modelsDevSync.saveModelsDevCapabilities({
      github: {
        "gpt-5.5": {
          tool_call: true,
          reasoning: true,
          attachment: true,
          structured_output: true,
          temperature: true,
          modalities_input: JSON.stringify(["text", "image"]),
          modalities_output: JSON.stringify(["text"]),
          knowledge_cutoff: null,
          release_date: null,
          last_updated: null,
          status: null,
          family: "gpt-5",
          open_weights: false,
          limit_context: 400000,
          limit_input: 272000,
          limit_output: 128000,
          interleaved_field: null,
        },
      },
    });

    const response = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    const body = (await response.json()) as any;
    const model = body.data.find((item) => item.id === "gh/gpt-5.5");

    assert.equal(response.status, 200);
    assert.ok(model);
    assert.equal(model.context_length, 400000);
    assert.equal(model.max_input_tokens, 272000);
    assert.equal(model.max_output_tokens, 128000);
  } finally {
    modelsDevSync.saveModelsDevCapabilities({});
  }
});

test("v1 models catalog returns 500 when model compatibility lookup crashes", async () => {
  await seedConnection("openai", { name: "openai-compat-crash" });

  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  const originalLog = console.log;
  const logs = [];

  db.prepare = (sql) => {
    const statement = originalPrepare(sql);
    if (String(sql) !== "SELECT value FROM key_value WHERE namespace = ? AND key = ?") {
      return statement;
    }

    return new Proxy(statement, {
      get(target, prop, receiver) {
        if (prop === "get") {
          return (...args) => {
            if (args[0] === "modelCompatOverrides") {
              throw new Error("compat lookup boom");
            }
            return target.get(...args);
          };
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  };
  console.log = (...args) => {
    logs.push(args.map((arg) => String(arg)).join(" "));
  };

  try {
    const response = await v1ModelsCatalog.getUnifiedModelsResponse(
      new Request("http://localhost/api/v1/models")
    );
    const body = (await response.json()) as any;

    assert.equal(response.status, 500);
    assert.equal(body.error.type, "server_error");
    assert.match(body.error.message, /compat lookup boom/i);
    assert.ok(logs.some((entry) => entry.includes("Error fetching models:")));
  } finally {
    db.prepare = originalPrepare;
    console.log = originalLog;
  }
});

test("v1 models catalog skips duplicate built-ins and custom models from inactive providers", async () => {
  await seedConnection("openai", { name: "openai-duplicate" });
  await seedConnection("cline", {
    authType: "oauth",
    name: "cline-inactive-custom",
    apiKey: null,
    accessToken: "cline-access",
    isActive: false,
  });

  await modelsDb.addCustomModel("openai", "gpt-4o", "Duplicate Builtin");
  await modelsDb.addCustomModel("cline", "inactive-only", "Inactive Only");

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const duplicateBuiltins = body.data.filter((item) => item.id === "openai/gpt-4o");

  assert.equal(response.status, 200);
  assert.equal(duplicateBuiltins.length, 1);
  assert.equal(duplicateBuiltins[0].custom === true, false);
  assert.equal(
    body.data.some((item) => item.id === "cl/inactive-only" || item.id === "cline/inactive-only"),
    false
  );
});

test("v1 models catalog adds managed fallback models for Claude-compatible providers", async () => {
  await providersDb.createProviderNode({
    id: "anthropic-compatible-cc-demo",
    type: "anthropic-compatible",
    name: "Claude Compatible Demo",
    prefix: "ccdemo",
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/messages",
    modelsPath: "/v1/models",
  });
  await seedConnection("anthropic-compatible-cc-demo", {
    name: "claude-compatible-node",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/messages",
      modelsPath: "/v1/models",
    },
  });
  modelsDb.mergeModelCompatOverride("anthropic-compatible-cc-demo", "claude-sonnet-4-6", {
    isHidden: true,
  });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as any;
  const ids = new Set(body.data.map((item) => item.id));

  assert.equal(response.status, 200);
  assert.ok(ids.has("ccdemo/claude-opus-4-7"));
  assert.ok(ids.has("ccdemo/claude-opus-4-6"));
  assert.equal(ids.has("ccdemo/claude-sonnet-4-6"), false);
});
