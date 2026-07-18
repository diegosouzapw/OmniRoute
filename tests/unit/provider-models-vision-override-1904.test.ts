import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #1904: manual vision-capability override for custom OpenAI-compatible models.
//
// detectVisionInput()/getCustomVisionCapabilityFields() already honour an explicit
// `supportsVision` flag when it is present on a custom-model record, but there was no
// way to *set* that flag from the dashboard's "Custom Models" add/edit form and no
// persistence path in the POST/PUT /api/provider-models handlers — so a user whose
// self-hosted backend doesn't self-report an image input modality (e.g. OpenRouter-style
// `architecture.input_modalities`) had no way to manually flag the model as
// vision-capable, exactly the report in the linked issue (Qwen-based custom vision
// model not showing the vision tag).
//
// This test proves the API round trip end-to-end: POST/PUT persist supportsVision on
// the custom-model row, GET surfaces it back, and getCustomVisionCapabilityFields()
// (what the /v1/models catalog calls) honours the explicit override.

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-model-vision-override-1904-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");
const catalogVision = await import("../../src/app/api/v1/models/catalogVision.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function buildRequest(method: string, body: unknown) {
  return new Request("http://localhost/api/provider-models", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("POST with supportsVision:true persists the flag on the custom model row", async () => {
  const postRes = await providerModelsRoute.POST(
    buildRequest("POST", {
      provider: "openai-compatible-demo",
      modelId: "qwen-vl-custom",
      modelName: "Qwen VL Custom",
      apiFormat: "chat-completions",
      supportedEndpoints: ["chat"],
      supportsVision: true,
    })
  );
  const postBody = (await postRes.json()) as { model?: { supportsVision?: boolean } };
  assert.equal(postRes.status, 200);
  assert.equal(postBody.model?.supportsVision, true);

  const models = await modelsDb.getCustomModels("openai-compatible-demo");
  const row = (models as Array<{ id?: string; supportsVision?: boolean }>).find(
    (m) => m.id === "qwen-vl-custom"
  );
  assert.ok(row, "model row should exist");
  assert.equal(row!.supportsVision, true);
});

test("PUT with supportsVision:true persists a manual override and PUT null clears it", async () => {
  await modelsDb.addCustomModel(
    "openai-compatible-demo",
    "custom-local-model",
    "Custom Local Model"
  );

  const putRes = await providerModelsRoute.PUT(
    buildRequest("PUT", {
      provider: "openai-compatible-demo",
      modelId: "custom-local-model",
      supportsVision: true,
    })
  );
  const putBody = (await putRes.json()) as { model?: { supportsVision?: boolean } };
  assert.equal(putRes.status, 200);
  assert.equal(putBody.model?.supportsVision, true);

  const getRes = await providerModelsRoute.GET(
    new Request("http://localhost/api/provider-models?provider=openai-compatible-demo")
  );
  const getBody = (await getRes.json()) as {
    models: Array<{ id?: string; supportsVision?: boolean }>;
  };
  const row = getBody.models.find((m) => m.id === "custom-local-model");
  assert.ok(row, "model row should be present");
  assert.equal(row!.supportsVision, true);

  // Clearing back to the id-based heuristic.
  const clearRes = await providerModelsRoute.PUT(
    buildRequest("PUT", {
      provider: "openai-compatible-demo",
      modelId: "custom-local-model",
      supportsVision: null,
    })
  );
  const clearBody = (await clearRes.json()) as { model?: { supportsVision?: boolean } };
  assert.equal(clearRes.status, 200);
  assert.equal(clearBody.model?.supportsVision, undefined);
});

test("getCustomVisionCapabilityFields honours an explicit supportsVision:true override", () => {
  const fields = catalogVision.getCustomVisionCapabilityFields(
    { supportsVision: true },
    "openai-compatible-demo/qwen-not-heuristic-matched"
  );
  assert.ok(fields, "explicit override should produce vision capability fields");
  assert.deepEqual(fields!.capabilities, { vision: true });
});

test("getCustomVisionCapabilityFields honours an explicit supportsVision:false override even for a vision-like id", () => {
  const fields = catalogVision.getCustomVisionCapabilityFields(
    { supportsVision: false },
    "openai-compatible-demo/gpt-4-vision-preview"
  );
  assert.equal(fields, null);
});

test("without an explicit flag, the UI has no field wired to persist supportsVision by default", async () => {
  // Before this fix there was no request-shape carrying supportsVision at all; a plain
  // add-model POST (matching the pre-fix form payload) must not silently mark a model
  // vision-capable — the flag stays absent unless the user explicitly opts in.
  const postRes = await providerModelsRoute.POST(
    buildRequest("POST", {
      provider: "openai-compatible-demo",
      modelId: "plain-model",
      apiFormat: "chat-completions",
      supportedEndpoints: ["chat"],
    })
  );
  const postBody = (await postRes.json()) as { model?: { supportsVision?: boolean } };
  assert.equal(postRes.status, 200);
  assert.equal(postBody.model?.supportsVision, undefined);
});
