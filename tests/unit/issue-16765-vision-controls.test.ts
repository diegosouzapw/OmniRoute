import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vision-16765-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const route = await import("../../src/app/api/provider-models/route.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const provider = "openai-compatible-chat-16765";
const modelId = "ali/text-only-fixture-16765";
const input = { provider, model: modelId };
const put = (supportsVision: boolean | null) =>
  route.PUT(
    new Request("http://localhost/api/provider-models", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, modelId, supportsVision }),
    })
  );

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("an unrelated edit preserves explicit false and other models/providers", async () => {
  models.mergeModelCompatOverride(provider, modelId, {
    supportsVision: false,
    normalizeToolCallId: true,
  });
  models.mergeModelCompatOverride(provider, "other", { supportsVision: true });
  models.mergeModelCompatOverride("other-provider", modelId, { supportsVision: true });
  const response = await route.PUT(
    new Request("http://localhost/api/provider-models", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, modelId, modelName: "Renamed" }),
    })
  );
  assert.equal(response.status, 200);
  assert.equal(getResolvedModelCapabilities(input).supportsVision, false);
  assert.equal((await put(null)).status, 200);
  assert.equal(
    models.getModelCompatOverrides(provider).find((row) => row.id === "other")?.supportsVision,
    true
  );
  assert.equal(models.getModelCompatOverrides("other-provider")[0].supportsVision, true);
  assert.equal((await models.getCustomModels(provider))[0].name, "Renamed");
});

test("invalid vision payload cannot change either manual layer", async () => {
  models.mergeModelCompatOverride(provider, modelId, { supportsVision: true });
  const response = await route.PUT(
    new Request("http://localhost/api/provider-models", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider, modelId, supportsVision: "clear" }),
    })
  );
  assert.equal(response.status, 400);
  assert.equal(models.getModelCompatOverrides(provider)[0].supportsVision, true);
  assert.deepEqual(await models.getCustomModels(provider), []);
});

test("management authentication rejects a clear before changing either layer", async () => {
  const { updateSettings } = await import("../../src/lib/db/settings.ts");
  await updateSettings({ requireLogin: true });
  const previous = process.env.INITIAL_PASSWORD;
  process.env.INITIAL_PASSWORD = "synthetic-test-only-16765";
  models.mergeModelCompatOverride(provider, modelId, { supportsVision: true });
  try {
    const response = await put(null);
    assert.ok(response.status === 401 || response.status === 403);
    assert.equal(models.getModelCompatOverrides(provider)[0].supportsVision, true);
    assert.deepEqual(await models.getCustomModels(provider), []);
  } finally {
    if (previous === undefined) delete process.env.INITIAL_PASSWORD;
    else process.env.INITIAL_PASSWORD = previous;
  }
});
