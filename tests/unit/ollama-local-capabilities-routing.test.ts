import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ollama-capabilities-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.API_KEY_SECRET = "ollama-capabilities-test-secret";
process.env.REQUIRE_API_KEY = "false";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

const originalFetch = globalThis.fetch;

function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedOllamaConnection(baseUrl = "http://127.0.0.1:11434/v1", priority = 1) {
  return providersDb.createProviderConnection({
    provider: "ollama-local",
    authType: "apikey",
    name: "Ollama test host",
    apiKey: "test-key",
    isActive: true,
    testStatus: "active",
    priority,
    providerSpecificData: { baseUrl },
  });
}

test.beforeEach(resetStorage);

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Ollama discovery maps /api/show capabilities into connection-scoped model metadata", async () => {
  const connection = await seedOllamaConnection();
  const showCapabilities: Record<string, string[]> = {
    "image-model": ["image"],
    "embedding-model": ["embedding"],
    "chat-model": ["completion", "vision", "tools", "thinking"],
  };
  const calledUrls: string[] = [];

  globalThis.fetch = async (input, init = {}) => {
    const url = String(input);
    calledUrls.push(url);
    if (url.endsWith("/v1/models")) {
      return Response.json({
        data: Object.keys(showCapabilities).map((id) => ({ id, object: "model" })),
      });
    }
    if (url.endsWith("/api/show")) {
      const body = JSON.parse(String(init.body || "{}")) as { model?: string };
      return Response.json({ capabilities: showCapabilities[body.model || ""] || [] });
    }
    return new Response("not found", { status: 404 });
  };

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as {
    models: Array<{
      id: string;
      apiFormat?: string;
      supportedEndpoints?: string[];
      supportsVision?: boolean;
      supportsTools?: boolean;
      supportsThinking?: boolean;
    }>;
  };

  assert.equal(response.status, 200);
  assert.ok(calledUrls.some((url) => url.endsWith("/api/show")));
  assert.deepEqual(body.models.find((model) => model.id === "image-model")?.supportedEndpoints, [
    "images",
  ]);
  assert.equal(
    body.models.find((model) => model.id === "image-model")?.apiFormat,
    "images-generations"
  );
  assert.deepEqual(
    body.models.find((model) => model.id === "embedding-model")?.supportedEndpoints,
    ["embeddings"]
  );
  assert.equal(
    body.models.find((model) => model.id === "embedding-model")?.apiFormat,
    "embeddings"
  );
  const chatModel = body.models.find((model) => model.id === "chat-model");
  assert.deepEqual(chatModel?.supportedEndpoints, ["chat"]);
  assert.equal(chatModel?.supportsVision, true);
  assert.equal(chatModel?.supportsTools, true);
  assert.equal(chatModel?.supportsThinking, true);

  const persisted = await modelsDb.getSyncedAvailableModelsForConnection(
    "ollama-local",
    connection.id
  );
  assert.deepEqual(persisted.find((model) => model.id === "image-model")?.supportedEndpoints, [
    "images",
  ]);
  assert.deepEqual(persisted.find((model) => model.id === "embedding-model")?.supportedEndpoints, [
    "embeddings",
  ]);

  const catalogResponse = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/v1/models")
  );
  const catalog = (await catalogResponse.json()) as {
    data: Array<{
      id: string;
      type?: string;
      supported_endpoints?: string[];
      capabilities?: Record<string, boolean>;
    }>;
  };
  const imageCatalogModel = catalog.data.find((model) => model.id.endsWith("/image-model"));
  assert.equal(imageCatalogModel?.type, "image");
  assert.deepEqual(imageCatalogModel?.supported_endpoints, ["images"]);
  const embeddingCatalogModel = catalog.data.find((model) => model.id.endsWith("/embedding-model"));
  assert.equal(embeddingCatalogModel?.type, "embedding");
  assert.deepEqual(embeddingCatalogModel?.supported_endpoints, ["embeddings"]);
  const chatCatalogModel = catalog.data.find((model) => model.id.endsWith("/chat-model"));
  assert.equal(chatCatalogModel?.capabilities?.vision, true);
  assert.equal(chatCatalogModel?.capabilities?.tool_calling, true);
  assert.equal(chatCatalogModel?.capabilities?.reasoning, true);
});

test("Ollama image model routes through its advertising connection", async () => {
  await seedOllamaConnection("http://127.0.0.1:11434/v1", 1);
  const connection = await seedOllamaConnection("http://127.0.0.1:11435/v1", 2);
  await modelsDb.replaceSyncedAvailableModelsForConnection("ollama-local", connection.id, [
    {
      id: "image-model",
      name: "Image Model",
      apiFormat: "images-generations",
      supportedEndpoints: ["images"],
    },
  ]);

  let capturedUrl = "";
  globalThis.fetch = async (input) => {
    capturedUrl = String(input);
    return Response.json({ data: [{ b64_json: "aW1hZ2U=" }] });
  };

  const response = await imageRoute.POST(
    new Request("http://localhost/v1/images/generations", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "ollama-local/image-model", prompt: "test image" }),
    })
  );

  assert.equal(response.status, 200, await response.text());
  assert.equal(capturedUrl, "http://127.0.0.1:11435/v1/images/generations");
});

test("Ollama embedding model routes through its advertising connection", async () => {
  await seedOllamaConnection("http://127.0.0.1:11434/v1", 1);
  const connection = await seedOllamaConnection("http://127.0.0.1:11436/v1", 2);
  await modelsDb.replaceSyncedAvailableModelsForConnection("ollama-local", connection.id, [
    {
      id: "embedding-model",
      name: "Embedding Model",
      apiFormat: "embeddings",
      supportedEndpoints: ["embeddings"],
    },
  ]);

  let capturedUrl = "";
  globalThis.fetch = async (input) => {
    capturedUrl = String(input);
    return Response.json({
      data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
      usage: { prompt_tokens: 2, total_tokens: 2 },
    });
  };

  const response = await createEmbeddingResponse({
    model: "ollama-local/embedding-model",
    input: "hello",
  });

  assert.equal(response.status, 200, await response.text());
  assert.equal(capturedUrl, "http://127.0.0.1:11436/v1/embeddings");
});
