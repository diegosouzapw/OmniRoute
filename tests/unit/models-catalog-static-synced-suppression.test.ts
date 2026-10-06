import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-model-catalog-static-synced-suppression-")
);

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET =
  process.env.API_KEY_SECRET || "model-catalog-static-synced-suppression-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");
const { REGISTRY } = await import("@omniroute/open-sse/config/providerRegistry");

const LIVE_MODEL = "google/gemma-4-31b-it";

function getStaticModel(provider: string) {
  const model = REGISTRY[provider]?.models?.[0];
  assert.ok(model, `${provider} must define a static registry model for this regression test`);
  return model;
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(path.join(TEST_DATA_DIR, "logs/application"), { recursive: true });
  catalog.__resetCatalogBuilderRunsForTest();
}

async function seedConnection(provider: string, name: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name,
    apiKey: "test-api-key",
    isActive: true,
    testStatus: "active",
  });
}

async function getCatalogIds(): Promise<Set<string>> {
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string }> };

  assert.equal(response.status, 200);
  return new Set(body.data.map((model) => model.id));
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("active authoritative live catalog suppresses stale static registry models", async () => {
  const staticNvidiaModel = getStaticModel("nvidia").id;
  const connection = await seedConnection("nvidia", "nvidia-static-synced-suppression");
  await modelsDb.replaceSyncedAvailableModelsForConnection("nvidia", connection.id as string, [
    { id: LIVE_MODEL, name: "Gemma 4 31B", source: "imported" },
  ]);

  const ids = await getCatalogIds();

  assert.equal(ids.has(`nvidia/${LIVE_MODEL}`), true);
  assert.equal(ids.has(`nvidia/${staticNvidiaModel}`), false);
});

test("static registry remains fallback when active connection has no live catalog", async () => {
  const staticNvidiaModel = getStaticModel("nvidia").id;
  await seedConnection("nvidia", "nvidia-fallback-static");

  const ids = await getCatalogIds();

  assert.equal(ids.has(`nvidia/${staticNvidiaModel}`), true);
});

test("authoritative live catalog suppresses static effort-tier variants on sync", async () => {
  const connection = await seedConnection("glm", "glm-authoritative-effort-suppression");
  const glmStaticModel = REGISTRY.glm?.models?.find(
    (model) =>
      Array.isArray(model.supportedThinkingEfforts) && model.supportedThinkingEfforts.length > 0
  );
  assert.ok(glmStaticModel, "glm must define an effort-tier static model for this regression test");
  const effort = glmStaticModel.supportedThinkingEfforts?.[0];
  assert.ok(effort, "glm static model must declare at least one effort tier");

  await modelsDb.replaceSyncedAvailableModelsForConnection("glm", connection.id as string, [
    { id: "glm-5-synced", name: "GLM 5 Synced", source: "imported" },
  ]);

  const ids = await getCatalogIds();

  assert.equal(ids.has("glm/glm-5-synced"), true);
  assert.equal(ids.has(`glm/${glmStaticModel.id}`), false);
  assert.equal(ids.has(`glm/${glmStaticModel.id}-${effort}`), false);
});

test("partial discovery provider preserves uncovered static models when synced", async () => {
  const connection = await seedConnection("command-code", "command-code-partial-discovery");
  const uncoveredStaticModel = "deepseek/deepseek-v4-flash";
  const coveredSyncedModel = "claude-opus-4-7";

  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "command-code",
    connection.id as string,
    [{ id: coveredSyncedModel, name: "Claude Opus 4.7", source: "imported" }]
  );

  const ids = await getCatalogIds();

  assert.equal(ids.has(`cmd/${coveredSyncedModel}`), true);
  assert.equal(ids.has(`cmd/${uncoveredStaticModel}`), true);
});
