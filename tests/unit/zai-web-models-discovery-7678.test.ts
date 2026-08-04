/**
 * TDD regression for #7678: `zai-web` (chat.z.ai) had no entry in
 * PROVIDER_MODELS_CONFIG (`src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts`),
 * so the model-discovery page always fell through to the 400
 * "does not support models listing" error — the hardcoded 3-model registry
 * catalog (glm-4.6/glm-4.5/glm-4.5v, one or more now 404 upstream) was the
 * only source and the provider had no way to pick up new upstream models.
 *
 * Fix: add a `zai-web` PROVIDER_MODELS_CONFIG entry pointing at the
 * undocumented `https://chat.z.ai/api/models` endpoint (same category as the
 * `qwen-web` precedent — #3931), building a Bearer header from the stored
 * cookie via the executor's own `extractZaiToken()`, and parsing the
 * `{ data: { data: [{ id, name, owned_by }] } }` shape with a flatter
 * `{ data: [...] }` fallback.
 *
 * IMPORTANT: the exact response shape and whether a bare
 * `Authorization: Bearer <token>` is accepted by chat.z.ai/api/models (vs the
 * full Cookie header the chat-completions endpoint requires) is UNVERIFIED —
 * no live z.ai session was available during research (plan-file Step 4).
 * These tests only prove the pipeline (auth-header construction, parsing,
 * cache, local-catalog fallback) against the assumed/qwen-web-shaped
 * response; they are not a substitute for the mandatory live check before
 * merge.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7678-"));
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
  models: Array<{ id: string; name?: string; owned_by?: string }>;
  source?: string;
}

const ZAI_WEB_MODELS_URL = "https://chat.z.ai/api/models";

test("#7678 zai-web model discovery fetches the live /api/models catalog with a Bearer header", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "zai-web",
    authType: "apikey",
    name: "zai-web-discovery",
    apiKey: "token=abc123; other=xyz",
  });

  let fetchedUrl: string | null = null;
  let capturedAuthHeader: string | null = null;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const u = String(url);
    if (u.startsWith(ZAI_WEB_MODELS_URL)) {
      fetchedUrl = u;
      const headers = new Headers(init?.headers);
      capturedAuthHeader = headers.get("Authorization");
      return Response.json({
        data: {
          data: [{ id: "glm-5.0", name: "GLM-5.0", owned_by: "zai-web" }],
        },
      });
    }
    return new Response("not found", { status: 404 });
  }) as typeof globalThis.fetch;

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as ModelsBody;
    assert.equal(body.provider, "zai-web");
    assert.equal(body.source, "api", "should serve the live zai-web catalog, not local_catalog");
    assert.ok(fetchedUrl, `should have probed ${ZAI_WEB_MODELS_URL}`);
    const ids = body.models.map((m) => m.id);
    assert.ok(ids.includes("glm-5.0"), `live ids missing: ${ids.join(",")}`);
    assert.equal(
      capturedAuthHeader,
      "Bearer abc123",
      "extractZaiToken should strip the cookie down to the bare token= value"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#7678 zai-web parseResponse tolerates the flatter { data: [...] } shape", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "zai-web",
    authType: "apikey",
    name: "zai-web-flat",
    apiKey: "token=def456",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request) => {
    if (String(url).startsWith(ZAI_WEB_MODELS_URL)) {
      return Response.json({ data: [{ id: "glm-4.6", name: "GLM-4.6" }] });
    }
    return new Response("not found", { status: 404 });
  }) as typeof globalThis.fetch;

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as ModelsBody;
    assert.equal(body.source, "api");
    assert.ok(body.models.map((m) => m.id).includes("glm-4.6"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#7678 zai-web discovery failure falls back to the hardcoded local catalog", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "zai-web",
    authType: "apikey",
    name: "zai-web-fallback",
    apiKey: "token=expired",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request) => {
    if (String(url).startsWith(ZAI_WEB_MODELS_URL)) {
      return new Response("unauthorized", { status: 401 });
    }
    return new Response("not found", { status: 404 });
  }) as typeof globalThis.fetch;

  try {
    const response = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as ModelsBody;
    assert.equal(
      body.source,
      "local_catalog",
      "a failed live fetch must degrade to the hardcoded catalog, never an empty list"
    );
    const ids = body.models.map((m) => m.id);
    assert.ok(ids.length > 0, "local_catalog fallback must not be empty");
    assert.ok(
      ids.includes("glm-4.6"),
      `expected the registry's static zai-web catalog, got: ${ids.join(",")}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#7678 zai-web second call without ?refresh uses the cache, not a new live fetch", async () => {
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "zai-web",
    authType: "apikey",
    name: "zai-web-cache",
    apiKey: "token=cached",
  });

  const originalFetch = globalThis.fetch;
  let liveFetchCount = 0;
  globalThis.fetch = (async (url: string | URL | Request) => {
    if (String(url).startsWith(ZAI_WEB_MODELS_URL)) {
      liveFetchCount++;
      return Response.json({
        data: { data: [{ id: "glm-4.6", name: "GLM-4.6", owned_by: "zai-web" }] },
      });
    }
    return new Response("not found", { status: 404 });
  }) as typeof globalThis.fetch;

  try {
    const first = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models?refresh=true`),
      { params: { id: connection.id } }
    );
    assert.equal(first.status, 200);
    const firstBody = (await first.json()) as ModelsBody;
    assert.equal(firstBody.source, "api");
    assert.equal(liveFetchCount, 1);

    // Second call: fetch mock would fail if hit again — proves the cache short-circuits it.
    globalThis.fetch = (async (url: string | URL | Request) => {
      if (String(url).startsWith(ZAI_WEB_MODELS_URL)) {
        liveFetchCount++;
        return new Response("should not be called", { status: 500 });
      }
      return new Response("not found", { status: 404 });
    }) as typeof globalThis.fetch;

    const second = await modelsRoute.GET(
      new Request(`http://localhost/api/providers/${connection.id}/models`),
      { params: { id: connection.id } }
    );
    assert.equal(second.status, 200);
    const secondBody = (await second.json()) as ModelsBody;
    assert.equal(secondBody.source, "cache", "second call without ?refresh must be served from cache");
    assert.equal(liveFetchCount, 1, "the cache must short-circuit the live fetch entirely");
    assert.ok(secondBody.models.map((m) => m.id).includes("glm-4.6"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
