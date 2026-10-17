import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-policy-api-16977-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const settings = await import("../../src/lib/db/settings.ts");
const models = await import("../../src/lib/db/models.ts");
const route = await import("../../src/app/api/provider-models/route.ts");

const url = "http://localhost/api/provider-models?provider=openrouter";
const request = (data: unknown) => new Request(url, {
  method: "PATCH", headers: { "content-type": "application/json" },
  body: JSON.stringify(data),
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#16977 policy PATCH validates input and requires explicit opt-in", async () => {
  await settings.updateSettings({ requireLogin: false });
  for (const input of [
    { visibilityPolicy: "allowlist" },
    { visibilityPolicy: "allowlist", modelIds: "raw" },
    { visibilityPolicy: "allowlist", modelIds: [null] },
    { visibilityPolicy: "allowlist", modelIds: [""] },
    { visibilityPolicy: "allowlist", modelIds: [], modality: "images" },
    { visibilityPolicy: "unknown", modelIds: [] },
  ]) {
    const response = await route.PATCH(request(input) as never);
    assert.equal(response.status, 400, JSON.stringify(input));
  }
  assert.equal(models.getModelVisibilityAllowlist("openrouter"), null);
});

test("#16977 policy survives catalog updates and single/bulk toggles remain consistent", async () => {
  await settings.updateSettings({ requireLogin: false });
  const initial = await route.PATCH(request({
    visibilityPolicy: "allowlist", modality: "chat",
    modelIds: ["vendor/one", "vendor/two"],
  }) as never);
  assert.equal(initial.status, 200);
  const modelList = await route.GET(new Request(url) as never);
  assert.equal(modelList.status, 200);
  const body = await modelList.json();
  assert.deepEqual(body.visibilityAllowlist, ["vendor/one", "vendor/two"]);
  assert.deepEqual(body.modelVisibilityAllowlists.openrouter, ["vendor/one", "vendor/two"]);

  assert.equal(models.getModelIsHidden("openrouter", "vendor/new-after-sync"), true);
  const hidden = await route.PATCH(request({
    isHidden: true, modality: "chat", modelIds: ["vendor/one"],
  }) as never);
  assert.equal(hidden.status, 200);
  assert.equal(models.getModelIsHidden("openrouter", "vendor/one"), true);

  const visible = await route.PATCH(request({
    isHidden: false, modality: "chat", modelIds: ["vendor/new-after-sync"],
  }) as never);
  assert.equal(visible.status, 200);
  assert.equal(models.getModelIsHidden("openrouter", "vendor/new-after-sync"), false);
  assert.deepEqual([...models.getModelVisibilityAllowlist("openrouter")!].sort(),
    ["vendor/new-after-sync", "vendor/two"]);

  // A custom row and a synced/compat override cannot disagree after a hide.
  await models.addCustomModel("openrouter", "vendor/two", "Vendor Two", "manual");
  const hiddenBoth = await route.PATCH(request({
    isHidden: true, modality: "chat", modelIds: ["vendor/two"],
  }) as never);
  assert.equal(hiddenBoth.status, 200);
  assert.equal(models.getModelIsHidden("openrouter", "vendor/two"), true);
  assert.equal(models.getHiddenModelsByProvider().get("openrouter")?.has("vendor/two"), true);

  const disabled = await route.PATCH(request({ visibilityPolicy: "off", modality: "chat" }) as never);
  assert.equal(disabled.status, 200);
  assert.equal(models.getModelVisibilityAllowlist("openrouter"), null);
  assert.equal(models.getModelIsHidden("openrouter", "vendor/new-after-sync"), false);
  assert.equal(models.getModelIsHidden("openrouter", "vendor/two"), true);
});
