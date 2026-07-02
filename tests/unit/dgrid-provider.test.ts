import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
const { REGISTRY: providerRegistry } = await import("../../open-sse/config/providerRegistry.ts");
const { isValidModel } = await import("../../src/shared/constants/models.ts");

const DGRID_CHAT_URL = "https://api.dgrid.ai/v1/chat/completions";
const DGRID_MODELS_URL = "https://api.dgrid.ai/v1/models";
const DGRID_FREE_ROUTER = "dgridai/free";

test("DGrid is registered as a free API-key provider", () => {
  const entry = APIKEY_PROVIDERS.dgrid;
  assert.ok(entry, "APIKEY_PROVIDERS.dgrid must be defined");
  assert.equal(entry.id, "dgrid");
  assert.equal(entry.alias, "dgrid");
  assert.equal(entry.name, "DGrid");
  assert.equal(entry.website, "https://dgrid.ai");
  assert.equal(entry.hasFree, true);
  assert.equal(entry.passthroughModels, true);
  assert.match(entry.freeNote, /10 requests\/minute/);
  assert.match(entry.freeNote, /100 requests\/day/);
  assert.match(entry.freeNote, /\$5 lifetime top-up/);
});

test("DGrid exposes the OpenAI-compatible chat completions endpoint", () => {
  assert.equal(PROVIDER_ENDPOINTS.dgrid, DGRID_CHAT_URL);
});

test("DGrid registry entry uses OpenAI format with bearer API-key auth", () => {
  const entry = providerRegistry.dgrid;
  assert.ok(entry, "providerRegistry.dgrid must be defined");
  assert.equal(entry.id, "dgrid");
  assert.equal(entry.alias, "dgrid");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "default");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.baseUrl, DGRID_CHAT_URL);
  assert.equal(entry.modelsUrl, DGRID_MODELS_URL);
  assert.equal(entry.passthroughModels, true);
});

test("DGrid ships the Free Models Router as the seeded default model", () => {
  const models = providerRegistry.dgrid.models;
  const ids = models.map((model: { id: string }) => model.id);
  assert.ok(ids.includes(DGRID_FREE_ROUTER), "seed list must include dgridai/free");
  assert.equal(new Set(ids).size, ids.length, "model ids must be unique");
  assert.equal(
    models.find((model: { id: string }) => model.id === DGRID_FREE_ROUTER)?.name,
    "DGrid Free Models Router"
  );
});

test("DGrid accepts the free router and the 200+ live catalog via passthrough models", () => {
  assert.equal(isValidModel("dgrid", DGRID_FREE_ROUTER), true);
  assert.equal(isValidModel("dgrid", "openai/gpt-4o"), true);
  assert.equal(isValidModel("dgrid", "anthropic/claude-sonnet-4"), true);
});

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-dgrid-"));
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

test("DGrid import fetches the live /v1/models catalog", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "dgrid",
    authType: "apikey",
    name: "dgrid-live",
    apiKey: "dgrid-key",
  });

  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url) === DGRID_MODELS_URL) {
      fetched = true;
      return Response.json({
        object: "list",
        data: [
          { id: DGRID_FREE_ROUTER },
          { id: "openai/gpt-4o" },
          { id: "anthropic/claude-sonnet-4" },
        ],
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
    assert.equal(body.provider, "dgrid");
    assert.equal(body.source, "api", "should serve the live upstream catalog");
    assert.ok(fetched, `should have probed ${DGRID_MODELS_URL}`);
    const ids = body.models.map((model) => model.id);
    assert.ok(ids.includes(DGRID_FREE_ROUTER), `free router missing: ${ids.join(",")}`);
    assert.ok(ids.includes("openai/gpt-4o"), `live catalog model missing: ${ids.join(",")}`);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("DGrid import falls back to the seeded free router when live fetch fails", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "dgrid",
    authType: "apikey",
    name: "dgrid-fallback",
    apiKey: "dgrid-key-2",
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
    assert.equal(body.provider, "dgrid");
    assert.equal(body.source, "local_catalog", "import must not break when upstream is down");
    assert.deepEqual(
      body.models.map((model) => model.id),
      [DGRID_FREE_ROUTER]
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
