import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hidden-combo-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET ||= "hidden-combo-catalog-test-secret";

const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

type CatalogModel = {
  id: string;
  context_length?: number;
  max_output_tokens?: number;
};

function capability(limitContext: number, limitOutput: number) {
  return {
    tool_call: null,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: JSON.stringify([]),
    modalities_output: JSON.stringify([]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: limitContext,
    limit_input: null,
    limit_output: limitOutput,
    interleaved_field: null,
  };
}

async function getCatalogData(): Promise<CatalogModel[]> {
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body: { data: CatalogModel[] } = await response.json();
  assert.equal(response.status, 200);
  return body.data;
}

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
});

test.after(() => {
  modelsDevSync.saveModelsDevCapabilities({});
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("v1 models catalog keeps partially hidden combos and derives metadata from visible targets", async () => {
  modelsDevSync.saveModelsDevCapabilities({
    openai: {
      "catalog-hidden-leaf": capability(1000, 100),
      "catalog-visible-leaf": capability(8000, 800),
    },
  });
  modelsDb.mergeModelCompatOverride("openai", "catalog-hidden-leaf", { isHidden: true });
  await combosDb.createCombo({
    name: "partially-hidden-router",
    strategy: "priority",
    models: ["openai/catalog-hidden-leaf", "openai/catalog-visible-leaf"],
  });

  const combo = (await getCatalogData()).find((item) => item.id === "partially-hidden-router");

  assert.ok(combo);
  assert.equal(combo.context_length, 8000);
  assert.equal(combo.max_output_tokens, 800);
});

test("v1 models catalog omits combos when every resolved target is hidden", async () => {
  modelsDb.mergeModelCompatOverride("openai", "catalog-hidden-alpha", { isHidden: true });
  modelsDb.mergeModelCompatOverride("openai", "catalog-hidden-beta", { isHidden: true });
  await combosDb.createCombo({
    name: "fully-hidden-router",
    strategy: "priority",
    models: ["openai/catalog-hidden-alpha", "openai/catalog-hidden-beta"],
  });

  const data = await getCatalogData();

  assert.equal(
    data.some((item) => item.id === "fully-hidden-router"),
    false
  );
});

test("v1 models catalog applies hidden leaf filtering through nested combos", async () => {
  modelsDevSync.saveModelsDevCapabilities({
    openai: {
      "nested-hidden-leaf": capability(2000, 200),
      "nested-visible-leaf": capability(16000, 1600),
      "nested-hidden-only": capability(4000, 400),
    },
  });
  modelsDb.mergeModelCompatOverride("openai", "nested-hidden-leaf", { isHidden: true });
  modelsDb.mergeModelCompatOverride("openai", "nested-hidden-only", { isHidden: true });
  await combosDb.createCombo({
    name: "partially-hidden-child",
    strategy: "priority",
    models: ["openai/nested-hidden-leaf", "openai/nested-visible-leaf"],
  });
  await combosDb.createCombo({
    name: "partially-hidden-parent",
    strategy: "priority",
    models: ["partially-hidden-child"],
  });
  await combosDb.createCombo({
    name: "fully-hidden-child",
    strategy: "priority",
    models: ["openai/nested-hidden-only"],
  });
  await combosDb.createCombo({
    name: "fully-hidden-parent",
    strategy: "priority",
    models: ["fully-hidden-child"],
  });

  const data = await getCatalogData();
  const parent = data.find((item) => item.id === "partially-hidden-parent");

  assert.ok(parent);
  assert.equal(parent.context_length, 16000);
  assert.equal(parent.max_output_tokens, 1600);
  assert.equal(
    data.some((item) => item.id === "fully-hidden-child"),
    false
  );
  assert.equal(
    data.some((item) => item.id === "fully-hidden-parent"),
    false
  );
});

test("v1 models catalog canonicalizes aliases before deciding that a combo is fully hidden", async () => {
  modelsDb.mergeModelCompatOverride("github", "claude-opus-4-5-20251101", { isHidden: true });
  await combosDb.createCombo({
    name: "hidden-alias-router",
    strategy: "priority",
    models: ["gh/claude-4.5-opus"],
  });

  const data = await getCatalogData();

  assert.equal(
    data.some((item) => item.id === "hidden-alias-router"),
    false
  );
});

test("v1 models catalog preserves explicit providers for slashful model ids", async () => {
  modelsDb.mergeModelCompatOverride("nvidia", "openai/gpt-oss-120b", { isHidden: true });
  await combosDb.createCombo({
    name: "hidden-slashful-router",
    strategy: "priority",
    models: [{ model: "openai/gpt-oss-120b", providerId: "nvidia" }],
  });

  const data = await getCatalogData();

  assert.equal(
    data.some((item) => item.id === "hidden-slashful-router"),
    false
  );
});

test("v1 models catalog omits combos with no resolved targets", async () => {
  await combosDb.createCombo({
    name: "empty-router",
    strategy: "priority",
    models: [],
  });

  const data = await getCatalogData();

  assert.equal(
    data.some((item) => item.id === "empty-router"),
    false
  );
});
