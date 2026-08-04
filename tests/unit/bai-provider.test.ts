import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");

const BAI_CHAT_URL = "https://api.b.ai/v1/chat/completions";
const BAI_MODELS_URL = "https://api.b.ai/v1/models";

test("b.ai is registered as an API-key provider", () => {
  const entry = APIKEY_PROVIDERS.bai;
  assert.ok(entry, "APIKEY_PROVIDERS.bai must be defined");
  assert.equal(entry.id, "bai");
  assert.equal(entry.alias, "bai");
  assert.equal(entry.name, "b.ai");
  assert.equal(entry.website, "https://b.ai");
  assert.equal(entry.passthroughModels, true);
});

test("b.ai is distinct from the existing thebai (TheB.AI) provider", () => {
  const bai = APIKEY_PROVIDERS.bai;
  const thebai = APIKEY_PROVIDERS.thebai;
  assert.ok(bai, "APIKEY_PROVIDERS.bai must be defined");
  assert.ok(thebai, "APIKEY_PROVIDERS.thebai must be defined");
  assert.notEqual(bai.id, thebai.id);
  assert.notEqual(bai.website, thebai.website);
  assert.equal(bai.website, "https://b.ai");
  assert.equal(thebai.website, "https://theb.ai");
});

test("b.ai exposes the OpenAI-compatible chat completions endpoint", () => {
  assert.equal(PROVIDER_ENDPOINTS.bai, BAI_CHAT_URL);
});

test("b.ai registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.bai;
  assert.ok(entry, "providerRegistry.bai must be defined");
  assert.equal(entry.id, "bai");
  assert.equal(entry.alias, "bai");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, BAI_CHAT_URL);
  assert.equal(entry.modelsUrl, BAI_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("b.ai ships no static model seed — relies fully on passthrough + live catalog", () => {
  const models = providerRegistry.bai.models;
  assert.deepEqual(models, []);
});

test("b.ai accepts any model id via passthrough models (GPT/Claude/Gemini/Kimi/GLM behind one key)", () => {
  assert.equal(isValidModel("bai", "gpt-5.2"), true);
  assert.equal(isValidModel("bai", "claude-opus-4-5"), true);
  assert.equal(isValidModel("bai", "gemini-3-pro"), true);
  assert.equal(isValidModel("bai", "kimi-k2.5"), true);
});

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bai-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

interface ModelsBody {
  provider: string;
  connectionId: string;
  models: Array<{ id: string }>;
  source?: string;
}

test("b.ai import fetches the live /v1/models catalog", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "bai",
    authType: "apikey",
    name: "bai-live",
    apiKey: "bai-key",
  });

  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url) === BAI_MODELS_URL) {
      fetched = true;
      return Response.json({
        object: "list",
        data: [{ id: "gpt-5.2" }, { id: "claude-opus-4-5" }, { id: "kimi-k2.5" }],
      });
    }
    return new Response("not found", { status: 404 });
  };

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as ModelsBody;
    assert.equal(body.provider, "bai");
    assert.equal(body.source, "api", "should serve the live upstream catalog");
    assert.ok(fetched, `should have probed ${BAI_MODELS_URL}`);
    const ids = body.models.map((model) => model.id);
    assert.ok(ids.includes("gpt-5.2"), `live catalog model missing: ${ids.join(",")}`);
    assert.ok(ids.includes("kimi-k2.5"), `live catalog model missing: ${ids.join(",")}`);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("b.ai import falls back to an empty local catalog when live fetch fails", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "bai",
    authType: "apikey",
    name: "bai-fallback",
    apiKey: "bai-key-2",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("bad gateway", { status: 502 });

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as ModelsBody;
    assert.equal(body.provider, "bai");
    assert.equal(body.source, "local_catalog", "import must not break when upstream is down");
    assert.deepEqual(
      body.models.map((model) => model.id),
      []
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
