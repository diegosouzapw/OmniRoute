import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-zai-web-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const registry = await import("../../open-sse/config/providers/registry/zai-web/index.ts");

const CURATED_ZAI_WEB_MODEL_IDS = ["glm-5.2", "GLM-5.1", "GLM-5-Turbo", "GLM-5v-Turbo"];

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("zai-web publishes the live reasoning and vision capabilities", () => {
  assert.deepEqual(
    registry.zai_webProvider.models.map((model) => ({
      id: model.id,
      supportsReasoning: model.supportsReasoning === true,
      supportsVision: model.supportsVision === true,
      toolCalling: model.toolCalling === true,
    })),
    [
      {
        id: "glm-5.2",
        supportsReasoning: true,
        supportsVision: false,
        toolCalling: false,
      },
      {
        id: "GLM-5.1",
        supportsReasoning: true,
        supportsVision: false,
        toolCalling: false,
      },
      {
        id: "GLM-5-Turbo",
        supportsReasoning: true,
        supportsVision: false,
        toolCalling: false,
      },
      {
        id: "GLM-5v-Turbo",
        supportsReasoning: true,
        supportsVision: true,
        toolCalling: false,
      },
    ]
  );
});

test("zai-web exposes only its curated public models without remote discovery", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "zai-web",
    authType: "apikey",
    name: "zai-web-curated",
    apiKey: "current-local-storage-token",
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection("zai-web", connection.id, [
    { id: "glm-4.6v", name: "GLM-4.6V", source: "imported" },
    { id: "0727-106B-API", name: "GLM-4.5-Air", source: "imported" },
    { id: "deep-research", name: "Z1-Rumination", source: "imported" },
  ]);
  await modelsDb.addCustomModel("zai-web", "glm-4-air-250414", "GLM-4-32B", "imported");
  await modelsDb.addCustomModel("zai-web", "manual-test-model", "Manual test model", "manual");

  let fetchCalls = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    throw new Error("zai-web curated catalog must not perform remote discovery");
  }) as typeof globalThis.fetch;

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.source, "local_catalog");
    assert.deepEqual(
      body.models.map((model: { id: string }) => model.id),
      CURATED_ZAI_WEB_MODEL_IDS
    );
    assert.equal(fetchCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
