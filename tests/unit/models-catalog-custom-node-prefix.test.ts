import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-custom-node-prefix-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const aliasesDb = await import("../../src/lib/db/models/aliases.ts");
const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const modelsRoute = await import("../../src/app/api/v1/models/route.ts");

const NODE_ID = "openai-compatible-chat-550e8400-e29b-41d4-a716-446655440000";
const PREFIX = "infrex";
const EXPECTED_IDS = [
  `${PREFIX}/synced-model`,
  `${PREFIX}/custom-model`,
  `${PREFIX}/alias-backed-model`,
];

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  modelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedCustomNode(): Promise<void> {
  await providersDb.createProviderNode({
    id: NODE_ID,
    type: "openai-compatible",
    name: "Infrex",
    prefix: PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  const connection = await providersDb.createProviderConnection({
    provider: NODE_ID,
    authType: "apikey",
    name: "infrex-primary",
    apiKey: "test-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com",
      chatPath: "/v1/chat/completions",
      modelsPath: "/v1/models",
    },
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection(
    NODE_ID,
    (connection as { id: string }).id,
    [{ id: "synced-model", source: "imported", supportedEndpoints: ["chat"] }]
  );
  await modelsDb.addCustomModel(NODE_ID, "custom-model", "Custom Model");
  await aliasesDb.setModelAlias("alias-backed-model", `${NODE_ID}/alias-backed-model`);
}

async function getCatalogIds(mode: "alias" | "canonical" | "dual"): Promise<string[]> {
  modelsCatalog.__resetCatalogBuilderRunsForTest();
  const response = await modelsRoute.GET(
    new Request(`http://localhost/api/v1/models?prefix=${mode}`)
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string }> };
  return body.data.map((model) => model.id);
}

function assertCustomNodeModels(ids: string[]): void {
  const actualCustomNodeIds = ids.filter((id) => EXPECTED_IDS.includes(id)).sort();
  assert.deepEqual(
    actualCustomNodeIds,
    [...EXPECTED_IDS].sort(),
    `expected each custom node source exactly once in ${JSON.stringify(ids)}`
  );
  assert.equal(
    ids.some((id) => id.startsWith(`${NODE_ID}/`)),
    false,
    "catalog must not expose the internal provider node id"
  );
}

test.beforeEach(async () => {
  await resetStorage();
  await seedCustomNode();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("alias mode exposes every custom node model under its configured prefix", async () => {
  assertCustomNodeModels(await getCatalogIds("alias"));
});

test("canonical mode keeps custom node models under their configured prefix", async () => {
  assertCustomNodeModels(await getCatalogIds("canonical"));
});

test("dual mode exposes each custom node model once under its configured prefix", async () => {
  assertCustomNodeModels(await getCatalogIds("dual"));
});
