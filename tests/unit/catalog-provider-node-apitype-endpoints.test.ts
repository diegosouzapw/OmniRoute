// Regression tests: /v1/models types compatible-provider-node rows by the node's apiType.
//
// Model rows discovered from a local OpenAI-compatible node rarely carry endpoint
// metadata (a TEI/Infinity/vLLM `/v1/models` listing is just ids), and the catalog
// defaulted such rows to `["chat"]`. So an `embeddings`-typed node exposing `bge-m3`
// and a `rerank`-typed node exposing `bge-reranker-v2-m3` both surfaced in `/v1/models`
// as untyped chat models — clients that build their picker from `type: "embedding"` /
// `type: "rerank"` never saw them, and chat pickers listed models that 400 on chat.
//
// Rows with no explicit `supportedEndpoints` now inherit the node's modality; a manual
// overlay row that sets `supportedEndpoints: ["rerank"]` on top of a discovered row also
// re-types the merged entry.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-node-apitype-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { defaultEndpointsForProviderNodeApiType } =
  await import("../../src/shared/constants/modelSupportedEndpoints.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

interface CatalogRow {
  id: string;
  type?: string;
  subtype?: string;
  owned_by?: string;
  supported_endpoints?: string[];
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.afterEach(async () => {
  await resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("defaultEndpointsForProviderNodeApiType maps node apiType to a modality", () => {
  assert.deepEqual(defaultEndpointsForProviderNodeApiType("embeddings"), ["embeddings"]);
  assert.deepEqual(defaultEndpointsForProviderNodeApiType("rerank"), ["rerank"]);
  assert.deepEqual(defaultEndpointsForProviderNodeApiType("audio-speech"), ["audio-speech"]);
  assert.deepEqual(defaultEndpointsForProviderNodeApiType("audio-transcriptions"), [
    "audio-transcriptions",
  ]);
  assert.deepEqual(defaultEndpointsForProviderNodeApiType("images-generations"), ["images"]);
  assert.deepEqual(defaultEndpointsForProviderNodeApiType("chat"), ["chat"]);
  assert.deepEqual(defaultEndpointsForProviderNodeApiType("responses"), ["chat"]);
  assert.deepEqual(defaultEndpointsForProviderNodeApiType(undefined), ["chat"]);
  assert.deepEqual(defaultEndpointsForProviderNodeApiType(" RERANK "), ["rerank"]);
});

async function createNode(id: string, prefix: string, apiType: string) {
  await providersDb.createProviderNode({
    id,
    type: "openai-compatible",
    name: prefix,
    prefix,
    apiType,
    baseUrl: "http://10.10.50.19:8888/v1",
    modelsPath: "/v1/models",
  });
  const connection = await providersDb.createProviderConnection({
    provider: id,
    authType: "apikey",
    name: `${prefix}-main`,
    apiKey: "sk-test",
    isActive: true,
    providerSpecificData: { baseUrl: "http://10.10.50.19:8888/v1", prefix, apiType },
  });
  return connection;
}

async function fetchCatalog(): Promise<CatalogRow[]> {
  invalidateDbCache("nodes");
  invalidateDbCache("connections");
  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", { method: "GET" })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: CatalogRow[] };
  return body.data;
}

test("synced rows on an embeddings node without endpoint metadata are typed embedding", async () => {
  const connection = await createNode(
    "openai-compatible-embeddings-node-a",
    "skilled-mini",
    "embeddings"
  );
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "openai-compatible-embeddings-node-a",
    (connection as { id: string }).id,
    [{ id: "bge-m3", name: "bge-m3" }]
  );

  const rows = await fetchCatalog();
  const row = rows.find((r) => r.id === "skilled-mini/bge-m3");
  assert.ok(row, "expected skilled-mini/bge-m3 in /v1/models");
  assert.equal(row.type, "embedding");
  assert.equal(row.owned_by, "skilled-mini");
});

test("synced rows on a rerank node without endpoint metadata are typed rerank", async () => {
  const connection = await createNode("openai-compatible-rerank-node-b", "skilled-rr", "rerank");
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "openai-compatible-rerank-node-b",
    (connection as { id: string }).id,
    [{ id: "bge-reranker-v2-m3", name: "bge-reranker-v2-m3" }]
  );

  const rows = await fetchCatalog();
  const row = rows.find((r) => r.id === "skilled-rr/bge-reranker-v2-m3");
  assert.ok(row, "expected skilled-rr/bge-reranker-v2-m3 in /v1/models");
  assert.equal(row.type, "rerank");
});

test("explicit supportedEndpoints on a synced row still win over the node apiType", async () => {
  const connection = await createNode("openai-compatible-embeddings-node-c", "mixed", "embeddings");
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "openai-compatible-embeddings-node-c",
    (connection as { id: string }).id,
    [
      { id: "bge-m3", name: "bge-m3" },
      { id: "bge-reranker-v2-m3", name: "bge-reranker-v2-m3", supportedEndpoints: ["rerank"] },
    ]
  );

  const rows = await fetchCatalog();
  assert.equal(rows.find((r) => r.id === "mixed/bge-m3")?.type, "embedding");
  assert.equal(rows.find((r) => r.id === "mixed/bge-reranker-v2-m3")?.type, "rerank");
});

test("chat nodes keep the historical chat default (no type)", async () => {
  const connection = await createNode("openai-compatible-chat-node-d", "homegw", "chat");
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "openai-compatible-chat-node-d",
    (connection as { id: string }).id,
    [{ id: "qwen3-8b", name: "qwen3-8b" }]
  );

  const rows = await fetchCatalog();
  const row = rows.find((r) => r.id === "homegw/qwen3-8b");
  assert.ok(row, "expected homegw/qwen3-8b in /v1/models");
  assert.equal(row.type, undefined);
});

test("a manual overlay with supportedEndpoints re-types a discovered chat-default row", async () => {
  const connection = await createNode("openai-compatible-chat-node-e", "gw", "chat");
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "openai-compatible-chat-node-e",
    (connection as { id: string }).id,
    [{ id: "bge-reranker-v2-m3", name: "bge-reranker-v2-m3" }]
  );
  await modelsDb.addCustomModel(
    "openai-compatible-chat-node-e",
    "bge-reranker-v2-m3",
    "bge-reranker-v2-m3",
    "manual",
    "rerank",
    ["rerank"]
  );

  const rows = await fetchCatalog();
  const matches = rows.filter((r) => r.id === "gw/bge-reranker-v2-m3");
  assert.equal(matches.length, 1, "overlay merges into the discovered row, no duplicate");
  assert.equal(matches[0].type, "rerank");
  assert.deepEqual(matches[0].supported_endpoints, ["rerank"]);
});
