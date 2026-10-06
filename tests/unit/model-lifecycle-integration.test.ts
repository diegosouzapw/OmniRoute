import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-lifecycle-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "model-lifecycle-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedOpenAiConnection() {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `openai-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "sk-openai",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("chatCore rejects a shutdown OpenAI model before an upstream request", async () => {
  const originalFetch = globalThis.fetch;
  let upstreamCalls = 0;
  globalThis.fetch = async () => {
    upstreamCalls += 1;
    return new Response("unexpected", { status: 200 });
  };

  try {
    const body = {
      model: "gpt-5.2-codex",
      messages: [{ role: "user", content: "hello" }],
    };
    const result = await handleChatCore({
      body: structuredClone(body),
      modelInfo: {
        provider: "openai",
        model: "gpt-5.2-codex",
        extendedContext: false,
      },
      credentials: { apiKey: "sk-test", providerSpecificData: {} },
      log: { debug() {}, info() {}, warn() {}, error() {} },
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: structuredClone(body),
        headers: new Headers({ accept: "application/json" }),
      },
      userAgent: "model-lifecycle-test",
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 410);
    assert.equal(result.errorCode, "model_shutdown");
    assert.equal(upstreamCalls, 0);

    const responseBody = await result.response.json();
    assert.equal(responseBody.error.code, "model_shutdown");
    assert.match(responseBody.error.message, /openai\/gpt-5\.2-codex/);
    assert.match(responseBody.error.message, /openai\/gpt-5\.6-sol/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("unified catalog suppresses stale OpenAI chat rows but retains typed media", async () => {
  const connection = await seedOpenAiConnection();
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", connection.id, [
    { id: "gpt-5.2-codex", name: "GPT-5.2 Codex", source: "imported" },
    { id: "gpt-image-2", name: "GPT Image 2", source: "imported" },
    { id: "sora-2-pro", name: "Sora 2 Pro", source: "imported" },
  ]);
  await modelsDb.replaceCustomModels("openai", [
    { id: "sora-2", name: "Sora 2", source: "imported" },
  ]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  const body = (await response.json()) as { data: Array<{ id: string; type?: string }> };
  const ids = new Set(body.data.map((item) => item.id));

  assert.equal(response.status, 200);
  assert.equal(ids.has("openai/gpt-5.2-codex"), false);
  assert.equal(ids.has("openai/sora-2"), false);
  assert.equal(ids.has("openai/sora-2-pro"), false);
  // Since #11919 (fixes #11829) an authoritative live catalog REPLACES the static
  // registry: a static-only row like gpt-5.6-sol that the synced catalog does not
  // list is suppressed instead of leaking into /v1/models. The lifecycle contract
  // this file guards (#8627: stale chat rows suppressed, typed media retained)
  // is unchanged — only the "static rows survive a sync" expectation moved.
  assert.equal(ids.has("openai/gpt-5.6-sol"), false);
  assert.equal(body.data.find((item) => item.id === "openai/gpt-image-2")?.type, "image");
});

test("chat-only provider catalog excludes OpenAI lifecycle and media models", async () => {
  const connection = await seedOpenAiConnection();
  await modelsDb.replaceSyncedAvailableModelsForConnection("openai", connection.id, [
    { id: "gpt-5.6-sol", name: "GPT-5.6 Sol", source: "imported" },
    { id: "gpt-5.2-codex", name: "GPT-5.2 Codex", source: "imported" },
    { id: "gpt-5.3-chat-latest", name: "GPT-5.3 Chat", source: "imported" },
    { id: "gpt-image-2", name: "GPT Image 2", source: "imported" },
    { id: "sora-2-pro", name: "Sora 2 Pro", source: "imported" },
  ]);

  const response = await providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connection.id}/models?chatOnly=true`),
    { params: { id: connection.id } }
  );
  const body = (await response.json()) as { models: Array<{ id: string }> };

  assert.equal(response.status, 200);
  assert.deepEqual(
    body.models.map((model) => model.id),
    ["gpt-5.6-sol"]
  );
});
