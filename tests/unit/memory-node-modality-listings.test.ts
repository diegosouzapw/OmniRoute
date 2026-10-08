// Regression tests: the memory Embedding / Rerank selectors list local provider
// nodes with the models they actually expose for that modality.
//
// Before: a node was listed by apiType alone and always with `models: []`, so a
// node typed `embeddings` that also served a rerank model never appeared in the
// Rerank dropdown, and appeared in the Embedding dropdown with nothing to pick.
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-node-modality-listings-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { buildProviderNodeModalityListings } =
  await import("../../src/lib/memory/embedding/nodeModalityListings.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const rerankProvidersRoute = await import("../../src/app/api/memory/rerank-providers/route.ts");
const { listEmbeddingProviders } = await import("../../src/lib/memory/embedding/index.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.describe("buildProviderNodeModalityListings (pure)", () => {
  const nodes = [
    {
      id: "n-emb",
      prefix: "skilled-mini",
      baseUrl: "http://10.10.50.19:8888/v1",
      apiType: "embeddings",
    },
    { id: "n-chat", prefix: "homegw", baseUrl: "http://127.0.0.1:11434/v1", apiType: "chat" },
    { id: "n-rr", prefix: "rr-only", baseUrl: "http://127.0.0.1:8099/v1", apiType: "rerank" },
    { id: "n-bad", prefix: "bad/prefix", baseUrl: "http://127.0.0.1:1/v1", apiType: "rerank" },
  ];
  const synced = {
    "n-emb": [
      { id: "bge-m3", name: "bge-m3" },
      { id: "bge-reranker-v2-m3", name: "bge-reranker-v2-m3" },
    ],
    "n-chat": [{ id: "qwen3-8b", name: "qwen3-8b" }],
  };
  const custom = {
    // A manual override re-types the reranker row on the embeddings node.
    "n-emb": [
      { id: "bge-reranker-v2-m3", name: "BGE Reranker v2 M3", supportedEndpoints: ["rerank"] },
    ],
  };

  test("embeddings: embeddings-typed rows are listed under the node prefix", () => {
    const out = buildProviderNodeModalityListings("embeddings", nodes, synced, custom);
    const mini = out.find((p) => p.provider === "skilled-mini");
    assert.deepEqual(mini, {
      provider: "skilled-mini",
      hasKey: true,
      models: [{ id: "skilled-mini/bge-m3", name: "bge-m3", dimensions: null }],
    });
  });

  test("rerank: the embeddings node is listed because one of its rows is typed rerank", () => {
    const out = buildProviderNodeModalityListings("rerank", nodes, synced, custom);
    const mini = out.find((p) => p.provider === "skilled-mini");
    assert.deepEqual(mini, {
      provider: "skilled-mini",
      hasKey: true,
      models: [
        { id: "skilled-mini/bge-reranker-v2-m3", name: "BGE Reranker v2 M3", dimensions: null },
      ],
    });
  });

  test("rerank: a rerank-typed node with no catalog is still listed (historical behaviour)", () => {
    const out = buildProviderNodeModalityListings("rerank", nodes, synced, custom);
    assert.deepEqual(
      out.find((p) => p.provider === "rr-only"),
      {
        provider: "rr-only",
        hasKey: true,
        models: [],
      }
    );
  });

  test("chat nodes stay listed for both modalities, but their chat rows are not offered", () => {
    for (const modality of ["embeddings", "rerank"] as const) {
      const out = buildProviderNodeModalityListings(modality, nodes, synced, custom);
      assert.deepEqual(
        out.find((p) => p.provider === "homegw"),
        {
          provider: "homegw",
          hasKey: true,
          models: [],
        }
      );
    }
  });

  test("invalid prefixes are skipped", () => {
    const out = buildProviderNodeModalityListings("rerank", nodes, synced, custom);
    assert.equal(
      out.find((p) => p.provider === "bad/prefix"),
      undefined
    );
  });
});

test.describe("selector endpoints end-to-end", () => {
  test.before(async () => {
    await providersDb.createProviderNode({
      id: "openai-compatible-skilled-mini",
      type: "openai-compatible",
      name: "skilled-mini",
      prefix: "skilled-mini",
      apiType: "embeddings",
      baseUrl: "http://10.10.50.19:8888/v1",
      modelsPath: "/v1/models",
    });
    const connection = await providersDb.createProviderConnection({
      provider: "openai-compatible-skilled-mini",
      authType: "apikey",
      name: "skilled-mini-main",
      apiKey: "sk-test",
      isActive: true,
      providerSpecificData: {
        baseUrl: "http://10.10.50.19:8888/v1",
        prefix: "skilled-mini",
        apiType: "embeddings",
      },
    });
    await modelsDb.replaceSyncedAvailableModelsForConnection(
      "openai-compatible-skilled-mini",
      (connection as { id: string }).id,
      [
        { id: "bge-m3", name: "bge-m3" },
        { id: "bge-reranker-v2-m3", name: "bge-reranker-v2-m3" },
      ]
    );
    await modelsDb.addCustomModel(
      "openai-compatible-skilled-mini",
      "bge-reranker-v2-m3",
      "bge-reranker-v2-m3",
      "manual",
      "rerank",
      ["rerank"]
    );
    invalidateDbCache("nodes");
    invalidateDbCache("connections");
  });

  test("GET /api/memory/rerank-providers lists the reranker under skilled-mini", async () => {
    const response = await rerankProvidersRoute.GET(
      new NextRequest("http://localhost/api/memory/rerank-providers")
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as {
      providers: Array<{ provider: string; hasKey: boolean; models: Array<{ id: string }> }>;
    };
    const mini = body.providers.find((p) => p.provider === "skilled-mini");
    assert.ok(mini, "skilled-mini should be listed for rerank");
    assert.equal(mini.hasKey, true);
    assert.deepEqual(
      mini.models.map((m) => m.id),
      ["skilled-mini/bge-reranker-v2-m3"]
    );
  });

  test("listEmbeddingProviders lists the embedding model under skilled-mini", async () => {
    const providers = await listEmbeddingProviders();
    const mini = providers.find((p) => p.provider === "skilled-mini");
    assert.ok(mini, "skilled-mini should be listed for embeddings");
    assert.deepEqual(
      mini.models.map((m) => m.id),
      ["skilled-mini/bge-m3"]
    );
  });
});
