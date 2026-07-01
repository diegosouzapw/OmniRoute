import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-catalog-custom-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-custom-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

type CatalogModel = {
  id: string;
  type?: string;
  capabilities?: Record<string, unknown>;
  input_modalities?: string[];
  output_modalities?: string[];
};

type CatalogBody = {
  data: CatalogModel[];
};

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "sk-test",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
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

test("v1 models catalog exposes explicit vision for custom chat models without defaulting unknowns", async () => {
  await seedConnection("openai");
  await modelsDb.addCustomModel(
    "openai",
    "custom-vision-chat",
    "Custom Vision Chat",
    "manual",
    "chat-completions",
    ["chat"],
    undefined,
    {},
    { capabilities: { supportsVision: true } }
  );

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as CatalogBody;
  const custom = body.data.find((item) => item.id === "openai/custom-vision-chat");

  assert.equal(response.status, 200);
  assert.ok(custom);
  assert.equal(custom.capabilities?.vision, true);
  assert.deepEqual(custom.input_modalities, ["text", "image"]);
  assert.deepEqual(custom.output_modalities, ["text"]);
  assert.equal("type" in custom, false);
});
