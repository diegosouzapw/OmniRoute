import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");

const QINIU_CHAT_URL = "https://api.qnaigc.com/v1/chat/completions";
const QINIU_MODELS_URL = "https://api.qnaigc.com/v1/models";

test("Qiniu is registered as an API-key provider", () => {
  const entry = APIKEY_PROVIDERS.qiniu;
  assert.ok(entry, "APIKEY_PROVIDERS.qiniu must be defined");
  assert.equal(entry.id, "qiniu");
  assert.equal(entry.alias, "qiniu");
  assert.equal(entry.name, "Qiniu");
  assert.equal(entry.website, "https://www.qiniu.com");
  assert.equal(entry.passthroughModels, true);
});

test("Qiniu exposes the OpenAI-compatible chat completions endpoint", () => {
  assert.equal(PROVIDER_ENDPOINTS.qiniu, QINIU_CHAT_URL);
});

test("Qiniu registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.qiniu;
  assert.ok(entry, "providerRegistry.qiniu must be defined");
  assert.equal(entry.id, "qiniu");
  assert.equal(entry.alias, "qiniu");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, QINIU_CHAT_URL);
  assert.equal(entry.modelsUrl, QINIU_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("Qiniu ships no static model seed — relies fully on passthrough + live catalog", () => {
  const models = providerRegistry.qiniu.models;
  assert.deepEqual(models, []);
});

test("Qiniu accepts any model id via passthrough models (DeepSeek/Claude/Kimi behind one key)", () => {
  assert.equal(isValidModel("qiniu", "deepseek-v3"), true);
  assert.equal(isValidModel("qiniu", "deepseek-v3.2"), true);
  assert.equal(isValidModel("qiniu", "claude-sonnet-4-5"), true);
  assert.equal(isValidModel("qiniu", "kimi-k2"), true);
});

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qiniu-"));
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

test("Qiniu import fetches the live /v1/models catalog", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "qiniu",
    authType: "apikey",
    name: "qiniu-live",
    apiKey: "qiniu-key",
  });

  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url) === QINIU_MODELS_URL) {
      fetched = true;
      return Response.json({
        object: "list",
        data: [{ id: "deepseek-v3" }, { id: "deepseek-v4" }, { id: "kimi-k2" }],
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
    assert.equal(body.provider, "qiniu");
    assert.equal(body.source, "api", "should serve the live upstream catalog");
    assert.ok(fetched, `should have probed ${QINIU_MODELS_URL}`);
    const ids = body.models.map((model) => model.id);
    assert.ok(ids.includes("deepseek-v3"), `live catalog model missing: ${ids.join(",")}`);
    assert.ok(ids.includes("kimi-k2"), `live catalog model missing: ${ids.join(",")}`);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Qiniu import falls back to an empty local catalog when live fetch fails", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "qiniu",
    authType: "apikey",
    name: "qiniu-fallback",
    apiKey: "qiniu-key-2",
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
    assert.equal(body.provider, "qiniu");
    assert.equal(body.source, "local_catalog", "import must not break when upstream is down");
    assert.deepEqual(
      body.models.map((model) => model.id),
      []
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
