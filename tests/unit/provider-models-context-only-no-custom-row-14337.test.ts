import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #14337 final review: a context-window-only PUT for a native catalog model must
// persist/clear the override in `model_context_overrides` WITHOUT upserting a
// `customModels` row (#13078's createIfMissing would otherwise turn the catalog
// model into a "custom" one: /v1/models overlay, apiFormat flip, availability).

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-model-context-only-14337-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const contextOverrides = await import("../../src/lib/db/modelContextOverrides.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function put(body: unknown) {
  return providerModelsRoute.PUT(
    new Request("http://localhost/api/provider-models", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

test("context-only PUT on a native catalog model sets and clears the override without a customModels row", async () => {
  const setRes = await put({ provider: "openai", modelId: "gpt-5", contextWindowOverride: 500000 });
  assert.equal(setRes.status, 200);
  assert.equal(
    ((await setRes.json()) as { contextWindowOverride?: number }).contextWindowOverride,
    500000
  );
  assert.equal(
    contextOverrides.getModelContextOverrideRecord("openai", "gpt-5")?.realContext,
    500000
  );
  assert.deepEqual(await modelsDb.getCustomModels("openai"), []);

  const clearRes = await put({ provider: "openai", modelId: "gpt-5", contextWindowOverride: null });
  assert.equal(clearRes.status, 200);
  assert.equal(
    ((await clearRes.json()) as { contextWindowOverride?: number | null }).contextWindowOverride,
    null
  );
  assert.equal(contextOverrides.getModelContextOverrideRecord("openai", "gpt-5"), null);
  assert.deepEqual(await modelsDb.getCustomModels("openai"), []);
});

test("context-only PUT still rejects an unknown provider", async () => {
  const res = await put({
    provider: "no-such-provider",
    modelId: "x",
    contextWindowOverride: 1000,
  });
  assert.equal(res.status, 400);
});

test("context-only PUT on an existing custom model keeps working and keeps its row", async () => {
  await modelsDb.addCustomModel("openai-compatible-demo", "m1", "M1");
  const res = await put({
    provider: "openai-compatible-demo",
    modelId: "m1",
    contextWindowOverride: 64000,
  });
  assert.equal(res.status, 200);
  assert.equal(
    contextOverrides.getModelContextOverrideRecord("openai-compatible-demo", "m1")?.realContext,
    64000
  );
  const rows = await modelsDb.getCustomModels("openai-compatible-demo");
  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, "m1");
});

test("a PUT carrying other fields next to the override still upserts the row (#13078)", async () => {
  const res = await put({
    provider: "openai",
    modelId: "gpt-5",
    modelName: "GPT 5",
    contextWindowOverride: 500000,
  });
  assert.equal(res.status, 200);
  assert.equal((await modelsDb.getCustomModels("openai")).length, 1);
});
