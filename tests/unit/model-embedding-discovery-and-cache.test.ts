import { test } from "node:test";
import assert from "node:assert/strict";
import {
  detectModelModality,
  normalizeDiscoveredModels,
} from "@/lib/providerModels/modelDiscovery";
import type { SyncedAvailableModel } from "@/lib/db/models";
import {
  getModelEndpointDecision,
  isChatSelectableModel,
  filterChatSelectableModels,
} from "../../open-sse/services/modelEndpointPolicy.ts";
import { detectTestKind } from "@/lib/api/modelTestRunner";

test("detectModelModality flags Lemonade embeddings model and pulls dimensions and context length", () => {
  // Lemonade verbatim /v1/models shape for harrier-oss-v1-0.6b
  const lemonadeRecord = {
    id: "harrier-oss-v1-0.6b",
    object: "model",
    owned_by: "lemonade",
    labels: ["custom", "embeddings"],
    context_length: 32768,
    max_context_window: 32768,
  };

  const modality = detectModelModality(lemonadeRecord, "lemonade");
  assert.equal(modality.isEmbedding, true);
  assert.equal(modality.isImage, false);
  assert.equal(modality.isRerank, false);
  assert.equal(modality.dimensions, 1024, "Should resolve 1024 dimensions from registry");
  assert.deepEqual(modality.supportedInputTypes, ["text"]);

  // Normalize discovered model
  const synced = normalizeDiscoveredModels([lemonadeRecord], "lemonade");
  assert.equal(synced.length, 1);
  const [model] = synced;
  assert.equal(model.id, "harrier-oss-v1-0.6b");
  assert.equal(model.modelType, "embedding");
  assert.equal(model.apiFormat, "embeddings");
  assert.deepEqual(model.supportedEndpoints, ["embeddings"]);
  assert.equal(model.inputTokenLimit, 32768);
  assert.equal(model.dimensions, 1024);
  assert.deepEqual(model.supportedInputTypes, ["text"]);
});

test("detectModelModality identifies reranking and image models from labels", () => {
  const rerankRecord = {
    id: "bge-reranker-large",
    labels: ["custom", "reranking"],
  };
  const rerankModality = detectModelModality(rerankRecord, "custom");
  assert.equal(rerankModality.isRerank, true);
  assert.equal(rerankModality.isEmbedding, false);

  const imageRecord = {
    id: "flux-1-schnell",
    labels: ["image"],
  };
  const imageModality = detectModelModality(imageRecord, "custom");
  assert.equal(imageModality.isImage, true);
  assert.equal(imageModality.isEmbedding, false);
});

test("modelEndpointPolicy excludes embedding models from chat completions", () => {
  // Upstream explicit endpoints with embeddings
  assert.deepEqual(getModelEndpointDecision("lemonade", "harrier-oss-v1-0.6b", ["embeddings"]), {
    kind: "embedding",
    chatSelectable: false,
    reason: "explicit-endpoints",
  });

  // OpenAI text-embedding-3-small provider policy
  assert.deepEqual(getModelEndpointDecision("openai", "text-embedding-3-small"), {
    kind: "embedding",
    chatSelectable: false,
    reason: "provider-policy",
  });

  // isChatSelectableModel returns false
  assert.equal(
    isChatSelectableModel("lemonade", {
      id: "harrier-oss-v1-0.6b",
      supportedEndpoints: ["embeddings"],
    }),
    false
  );

  // Filter removes embedding model from chat candidates
  const filtered = filterChatSelectableModels("lemonade", [
    { id: "qwen2.5-coder-7b", supportedEndpoints: ["chat"] },
    { id: "harrier-oss-v1-0.6b", supportedEndpoints: ["embeddings"] },
  ]);
  assert.deepEqual(
    filtered.map((m) => m.id),
    ["qwen2.5-coder-7b"]
  );
});

test("detectTestKind in modelTestRunner detects embedding test probe for harrier-oss-v1-0.6b", () => {
  // Test with modelType flag
  const result1 = detectTestKind("lemonade/harrier-oss-v1-0.6b", {
    modelType: "embedding",
    dimensions: 1024,
  } as unknown as SyncedAvailableModel);
  assert.equal(result1.isEmbedding, true);
  assert.equal(result1.isRerank, false);
  assert.equal(result1.isAudioTranscription, false);

  // Test with supportedEndpoints
  const result2 = detectTestKind("lemonade/harrier-oss-v1-0.6b", {
    supportedEndpoints: ["embeddings"],
  } as unknown as SyncedAvailableModel);
  assert.equal(result2.isEmbedding, true);

  // Test with apiFormat
  const result3 = detectTestKind("lemonade/harrier-oss-v1-0.6b", {
    apiFormat: "embeddings",
  } as unknown as SyncedAvailableModel);
  assert.equal(result3.isEmbedding, true);
});

test("test-embedding route validates inputs and generates embeddings via live Lemonade", async () => {
  const testEmbeddingRoute =
    await import("../../src/app/api/settings/cache-config/test-embedding/route.ts");

  const req = new Request("http://localhost/api/settings/cache-config/test-embedding", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider: "lemonade",
      model: "harrier-oss-v1-0.6b",
      baseUrl: "http://192.168.31.147:13305/v1",
      apiKey: "lemonade",
      dimensions: 1024,
    }),
  });

  const response = await testEmbeddingRoute.POST(req);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.ok, true);
  assert.equal(data.dimensions, 1024);
  assert.ok(typeof data.latencyMs === "number" && data.latencyMs > 0);
});

test("test-embedding route automatically resolves connection details from DB when not passed", async () => {
  const { getDbInstance } = await import("@/lib/db/core");
  const testEmbeddingRoute =
    await import("../../src/app/api/settings/cache-config/test-embedding/route.ts");

  const db = getDbInstance();
  db.prepare(
    `
    INSERT OR REPLACE INTO provider_connections (
      id, provider, name, auth_type, api_key, provider_specific_data, is_active, created_at, updated_at
    ) VALUES (
      'test-conn-lemonade-1',
      'lemonade',
      'Lemonade Local Server',
      'apikey',
      'lemonade',
      '{"baseUrl":"http://192.168.31.147:13305/"}',
      1,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP
    )
  `
  ).run();

  // Omit baseUrl and apiKey from payload
  const req = new Request("http://localhost/api/settings/cache-config/test-embedding", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      provider: "lemonade",
      model: "harrier-oss-v1-0.6b",
      dimensions: 1024,
    }),
  });

  const response = await testEmbeddingRoute.POST(req);
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.ok, true, `Expected ok=true but got error: ${data.error}`);
  assert.equal(data.dimensions, 1024);
  assert.equal(data.resolvedBaseUrl, "http://192.168.31.147:13305/");
});
