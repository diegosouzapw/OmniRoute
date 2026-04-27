import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-model-management-route-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function buildPatchRequest(url, body) {
  return new Request(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("provider-models PATCH updates hidden flag for custom models", async () => {
  await modelsDb.addCustomModel("openai", "gpt-test", "GPT Test", "manual", "chat-completions", [
    "chat",
  ]);

  const response = await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=openai&modelId=gpt-test", {
      isHidden: true,
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);

  const models = await modelsDb.getCustomModels("openai");
  assert.equal(models.find((model) => model.id === "gpt-test")?.isHidden, true);
});

test("provider-models PATCH persists visibility overrides for catalog models", async () => {
  const response = await providerModelsRoute.PATCH(
    buildPatchRequest(
      "http://localhost/api/provider-models?provider=claude&modelId=claude-sonnet-4-6",
      { isHidden: true }
    )
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.ok, true);

  const overrides = modelsDb.getModelCompatOverrides("claude");
  assert.equal(overrides.find((model) => model.id === "claude-sonnet-4-6")?.isHidden, true);
});

test("provider-models PATCH supports bulk visibility updates", async () => {
  await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=claude", {
      isHidden: true,
      modelIds: ["claude-opus-4-6", "claude-sonnet-4-6"],
    })
  );

  const response = await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=claude", {
      isHidden: false,
      modelIds: ["claude-opus-4-6", "claude-sonnet-4-6"],
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.updated, 2);

  const overrides = modelsDb.getModelCompatOverrides("claude");
  assert.equal(overrides.find((model) => model.id === "claude-opus-4-6")?.isHidden, false);
  assert.equal(overrides.find((model) => model.id === "claude-sonnet-4-6")?.isHidden, false);
});

test("provider-models PATCH validates required fields", async () => {
  const response = await providerModelsRoute.PATCH(
    buildPatchRequest("http://localhost/api/provider-models?provider=claude", {
      modelIds: ["claude-sonnet-4-6"],
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(body.error.message, "isHidden boolean is required");
});
