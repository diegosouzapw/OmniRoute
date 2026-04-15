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
  const body = await response.json();

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
  const body = await response.json();
  const ids = body.data.map((item) => item.id);

  assert.equal(response.status, 200);
  assert.ok(ids.some((id) => id.startsWith("openai/")));
  assert.equal(
    ids.some((id) => id.startsWith("claude/") || id.startsWith("cc/")),
    false
  );
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
  const body = await response.json();
  const ids = new Set(body.data.map((item) => item.id));

  assert.equal(response.status, 200);
  assert.ok(ids.has("team-router"));
  assert.ok(ids.has("kr/custom-kiro"));
  assert.ok(ids.has("kiro/custom-kiro"));
  assert.equal(ids.has("openai/gpt-4o-mini"), false);
  assert.equal(
    [...ids].some((id) => id.startsWith("claude/") || id.startsWith("cc/")),
    false
  );
});

test("v1 models catalog keeps only visible combos when no providers are active", async () => {
  const visible = await combosDb.createCombo({
    name: "visible-combo",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });
  await combosDb.updateCombo(visible.id, { context_length: 32000 });
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
  await combosDb.updateCombo(inactive.id, { isActive: false });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = await response.json();

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
  const body = await response.json();
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
  const body = await response.json();
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

  await modelsDb.replaceSyncedAvailableModelsForConnection("gemini", connection.id, [
    {
      id: "gemini-audio-live",
      name: "Gemini Audio Live",
      source: "api-sync",
      supportedEndpoints: ["audio"],
      inputTokenLimit: 4096,
    },
    {
      id: "text-embedding-004",
      name: "Text Embedding 004",
      source: "api-sync",
      supportedEndpoints: ["embeddings"],
      inputTokenLimit: 2048,
    },
    {
      id: "gemini-hidden",
      name: "Gemini Hidden",
      source: "api-sync",
      supportedEndpoints: ["chat"],
    },
  ]);
  modelsDb.mergeModelCompatOverride("gemini", "gemini-hidden", { isHidden: true });

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = await response.json();
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

  await modelsDb.replaceSyncedAvailableModelsForConnection("gemini", connection.id, [
    {
      id: "gemini-2.5-pro-live",
      name: "Gemini 2.5 Pro Live",
      source: "api-sync",
      inputTokenLimit: 8192,
    },
  ]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = await response.json();
  const chatModel = body.data.find((item) => item.id === "gemini/gemini-2.5-pro-live");

  assert.equal(response.status, 200);
  assert.ok(chatModel);
  assert.equal("type" in chatModel, false);
  assert.equal("supported_endpoints" in chatModel, false);
  assert.equal(chatModel.context_length, 8192);
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
  const body = await response.json();
  const byId = new Map(body.data.map((item) => [item.id, item]));

  assert.equal(response.status, 200);
  assert.equal(byId.get("openai/gpt-image-1")?.type, "image");
  assert.equal(byId.get("openai/whisper-1")?.type, "audio");
  assert.equal(byId.get("openai/whisper-1")?.subtype, "transcription");
  assert.equal(byId.get("openai/omni-moderation-latest")?.type, "moderation");
  assert.equal(byId.get("cohere/rerank-v3.5")?.type, "rerank");
  assert.equal(byId.get("comfyui/animatediff")?.type, "video");
  assert.equal(byId.get("comfyui/stable-audio-open")?.type, "music");
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
    const body = await response.json();

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
  const body = await response.json();
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
    const body = await response.json();

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
  const body = await response.json();
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
  const body = await response.json();
  const ids = new Set(body.data.map((item) => item.id));

  assert.equal(response.status, 200);
  assert.ok(ids.has("ccdemo/claude-opus-4-6"));
  assert.equal(ids.has("ccdemo/claude-sonnet-4-6"), false);
});
