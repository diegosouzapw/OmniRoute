import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-builder-options-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const route = await import("../../src/app/api/combos/builder/options/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider, overrides = {}) {
  const payload = {
    provider,
    authType: overrides.authType || "apikey",
    displayName: overrides.displayName,
    email: overrides.email,
    apiKey: overrides.apiKey === undefined ? "sk-test" : overrides.apiKey,
    accessToken: overrides.accessToken,
    isActive: overrides.isActive ?? true,
    priority: overrides.priority || 1,
    testStatus: overrides.testStatus || "active",
    rateLimitedUntil: overrides.rateLimitedUntil,
    defaultModel: overrides.defaultModel,
    providerSpecificData: overrides.providerSpecificData || {},
  };

  if (overrides.name !== undefined) {
    payload.name = overrides.name;
  } else if ((overrides.authType || "apikey") !== "oauth") {
    payload.name = `${provider}-${Math.random().toString(16).slice(2, 8)}`;
  }

  return providersDb.createProviderConnection(payload);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("combo builder options route aggregates providers, connections, models and combo refs", async () => {
  const nowPlusMinute = Date.now() + 60_000;
  modelsDevSync.saveModelsDevCapabilities({
    openai: {
      "gpt-4o": {
        tool_call: true,
        reasoning: false,
        attachment: true,
        structured_output: true,
        temperature: true,
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
        knowledge_cutoff: "2024-10",
        release_date: "2024-05-13",
        last_updated: "2024-10-01",
        status: "stable",
        family: "gpt-4",
        open_weights: false,
        limit_context: 128000,
        limit_input: 128000,
        limit_output: 16384,
        interleaved_field: null,
      },
    },
  });

  await seedConnection("openai", {
    name: "OpenAI Primary",
    priority: 2,
    defaultModel: "gpt-4o",
  });
  await seedConnection("openai", {
    authType: "oauth",
    email: "disabled@example.com",
    accessToken: "oauth-token",
    isActive: false,
    priority: 1,
    testStatus: "failed",
  });
  await seedConnection("codex", {
    authType: "oauth",
    email: "codex@example.com",
    accessToken: "codex-token",
    rateLimitedUntil: nowPlusMinute,
    defaultModel: "gpt-5.3-codex",
  });

  await modelsDb.addCustomModel("openai", "custom-ops", "Custom Ops");
  await modelsDb.addCustomModel(
    "openai",
    "text-embedding-hidden",
    "Hidden Embedding",
    "manual",
    "chat-completions",
    ["embeddings"]
  );
  modelsDb.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: true });

  const visibleCombo = await combosDb.createCombo({
    name: "team-router",
    strategy: "priority",
    models: ["openai/gpt-4o"],
  });
  await combosDb.createCombo({
    name: "hidden-router",
    strategy: "priority",
    models: ["openai/gpt-4o"],
    isHidden: true,
  });

  const response = await route.GET();
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.schemaVersion, 2);
  assert.ok(Array.isArray(body.providers));
  assert.ok(Array.isArray(body.comboRefs));

  const openai = body.providers.find((provider) => provider.providerId === "openai");
  const codex = body.providers.find((provider) => provider.providerId === "codex");

  assert.ok(openai);
  assert.equal(openai.displayName, "OpenAI");
  assert.equal(openai.connectionCount, 2);
  assert.equal(openai.activeConnectionCount, 1);
  assert.ok(openai.models.some((model) => model.id === "gpt-4o"));
  assert.equal(openai.models.find((model) => model.id === "gpt-4o").outputTokenLimit, 16384);
  assert.equal(openai.models.find((model) => model.id === "gpt-4o").supportsThinking, false);
  assert.equal(
    openai.models.some((model) => model.id === "gpt-4o-mini"),
    false
  );
  assert.ok(openai.models.some((model) => model.id === "custom-ops"));
  assert.equal(
    openai.models.some((model) => model.id === "text-embedding-hidden"),
    false
  );
  assert.deepEqual(
    openai.connections.map((connection) => ({
      label: connection.label,
      status: connection.status,
      isActive: connection.isActive,
    })),
    [
      {
        label: "OpenAI Primary",
        status: "active",
        isActive: true,
      },
      {
        label: "disabled@example.com",
        status: "inactive",
        isActive: false,
      },
    ]
  );
  assert.equal(
    openai.connections.some((connection) =>
      Object.prototype.hasOwnProperty.call(connection, "apiKey")
    ),
    false
  );
  assert.equal(
    openai.connections.some((connection) =>
      Object.prototype.hasOwnProperty.call(connection, "accessToken")
    ),
    false
  );

  assert.ok(codex);
  assert.equal(codex.connections[0].status, "rate-limited");
  assert.equal(codex.connections[0].defaultModel, "gpt-5.3-codex");

  assert.deepEqual(
    body.comboRefs.map((combo) => combo.name),
    [visibleCombo.name]
  );
});

test("combo builder options route exposes compatible provider nodes with node metadata", async () => {
  await providersDb.createProviderNode({
    id: "openai-compatible-demo",
    type: "openai-compatible",
    name: "Gateway Demo",
    prefix: "gd",
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  await seedConnection("openai-compatible-demo", {
    name: "Gateway Account",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
    },
  });
  await modelsDb.addCustomModel("openai-compatible-demo", "gpt-custom", "GPT Custom");

  const response = await route.GET();
  const body = (await response.json()) as any;
  const provider = body.providers.find((entry) => entry.providerId === "openai-compatible-demo");

  assert.equal(response.status, 200);
  assert.ok(provider);
  assert.equal(provider.displayName, "Gateway Demo");
  assert.equal(provider.providerType, "openai-compatible");
  assert.equal(provider.alias, "gd");
  assert.equal(provider.prefix, "gd");
  assert.equal(provider.source, "provider-node");
  assert.equal(provider.acceptsArbitraryModel, true);
  assert.ok(provider.models.some((model) => model.id === "gpt-custom"));
  assert.equal(provider.models[0].qualifiedModel, "openai-compatible-demo/gpt-custom");
});
