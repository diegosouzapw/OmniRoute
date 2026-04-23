import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-model-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const antigravityVersion = await import("../../open-sse/services/antigravityVersion.ts");

const originalFetch = globalThis.fetch;
const originalAllowPrivateProviderUrls = process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  if (originalAllowPrivateProviderUrls === undefined) {
    delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  } else {
    process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = originalAllowPrivateProviderUrls;
  }
  antigravityVersion.clearAntigravityVersionCache();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider, overrides = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey,
    accessToken: overrides.accessToken,
    projectId: overrides.projectId,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

async function callRoute(connectionId, search = "") {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models${search}`),
    { params: { id: connectionId } }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("provider models route returns 404 for unknown connections", async () => {
  const response = await callRoute("missing-connection");

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: "Connection not found" });
});

test("provider models route rejects connections with an empty provider id", async () => {
  const connection = await seedConnection("openai", {
    apiKey: "sk-openai",
  });
  const db = core.getDbInstance();

  db.prepare("UPDATE provider_connections SET provider = '' WHERE id = ?").run(connection.id);

  const response = await callRoute(connection.id);

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Invalid connection provider" });
});

test("provider models route rejects OpenAI-compatible providers without a base URL", async () => {
  const connection = await seedConnection("openai-compatible-demo", {
    apiKey: "sk-openai-compatible",
  });

  const response = await callRoute(connection.id);

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "No base URL configured for OpenAI compatible provider",
  });
});

test("provider models route blocks private OpenAI-compatible base URLs", async () => {
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;

  const connection = await seedConnection("openai-compatible-private", {
    apiKey: "sk-openai-compatible",
    providerSpecificData: {
      baseUrl: "http://127.0.0.1:11434/v1",
    },
  });

  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return Response.json({ data: [] });
  };

  const response = await callRoute(connection.id);

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "Blocked private or local provider URL",
  });
  assert.equal(called, false);
});

test("provider models route returns auth failures from OpenAI-compatible upstreams", async () => {
  const connection = await seedConnection("openai-compatible-auth", {
    apiKey: "sk-openai-compatible",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com/v1/chat/completions",
    },
  });
  const seenUrls = [];

  globalThis.fetch = async (url) => {
    seenUrls.push(String(url));
    return new Response("unauthorized", { status: 401 });
  };

  const response = await callRoute(connection.id);

  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { error: "Auth failed: 401" });
  assert.equal(seenUrls.length, 1);
});

test("provider models route falls back after OpenAI-compatible endpoint probes all fail", async () => {
  const connection = await seedConnection("openai-compatible-fallback", {
    apiKey: "sk-openai-compatible",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com/v1",
    },
  });
  const seenUrls = [];

  globalThis.fetch = async (url) => {
    seenUrls.push(String(url));
    return new Response("bad gateway", { status: 502 });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "openai-compatible-fallback");
  assert.ok(Array.isArray(body.models));
  assert.ok(seenUrls.length >= 2);
});

test("provider models route retries transient OpenAI-compatible probe failures before succeeding", async () => {
  const connection = await seedConnection("openai-compatible-retry", {
    apiKey: "sk-openai-compatible",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com/v1",
    },
  });
  const seenUrls = [];

  globalThis.fetch = async (url) => {
    seenUrls.push(String(url));
    if (seenUrls.length === 1) {
      throw new Error("temporary upstream failure");
    }

    return Response.json({
      data: [{ id: "demo-model", name: "Demo Model" }],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.deepEqual(seenUrls, [
    "https://proxy.example.com/v1/models",
    "https://proxy.example.com/v1/models",
  ]);
  assert.deepEqual(body.models, [{ id: "demo-model", name: "Demo Model" }]);
});

test("provider models route returns static catalog entries for providers with hardcoded models", async () => {
  const connection = await seedConnection("bailian-coding-plan", {
    apiKey: "bailian-key",
  });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "bailian-coding-plan");
  assert.equal(body.models.length, 8);
});

test("provider models route returns the local catalog for built-in image providers", async () => {
  const connection = await seedConnection("topaz", {
    apiKey: "topaz-key",
  });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "topaz");
  assert.ok(Array.isArray(body.models));
  assert.deepEqual(body.models, [{ id: "topaz-enhance", name: "topaz-enhance" }]);
});

test("provider models route prefers the remote OpenRouter /models API over static image models", async () => {
  const connection = await seedConnection("openrouter", {
    apiKey: "openrouter-key",
  });
  const seenUrls = [];

  globalThis.fetch = async (url, init = {}) => {
    seenUrls.push(String(url));
    assert.equal(init.method, "GET");
    assert.equal(init.headers.Authorization, "Bearer openrouter-key");
    return Response.json({
      data: [{ id: "openai/gpt-4.1", name: "GPT-4.1 via OpenRouter" }],
    });
  };

  const response = await callRoute(connection.id, "?refresh=true");
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.deepEqual(seenUrls, ["https://openrouter.ai/api/v1/models"]);
  assert.deepEqual(body.models, [{ id: "openai/gpt-4.1", name: "GPT-4.1 via OpenRouter" }]);
});

test("provider models route returns the local catalog for new built-in chat-openai-compat providers", async () => {
  const connection = await seedConnection("deepinfra", {
    apiKey: "deepinfra-key",
  });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "deepinfra");
  assert.equal(body.source, "local_catalog");
  assert.match(body.warning, /local catalog/i);
  assert.ok(Array.isArray(body.models));
  assert.ok(body.models.length > 0);
  assert.ok(body.models.some((model) => model.id === "Qwen/Qwen3-Coder-480B-A35B-Instruct"));
});

test("provider models route caches discovered opencode-go models per connection", async () => {
  const connection = await seedConnection("opencode-go", {
    apiKey: "opencode-go-key",
  });
  let fetchCalls = 0;

  globalThis.fetch = async (url, init = {}) => {
    fetchCalls += 1;
    assert.equal(String(url), "https://opencode.ai/zen/go/v1/models");
    assert.equal(init.method, "GET");
    assert.equal(init.headers.Authorization, "Bearer opencode-go-key");
    return Response.json({
      data: [{ id: "glm-5.1", name: "GLM 5.1" }],
    });
  };

  const firstResponse = await callRoute(connection.id);
  const firstBody = (await firstResponse.json()) as any;
  const cachedModels = await modelsDb.getSyncedAvailableModelsForConnection(
    "opencode-go",
    connection.id
  );

  assert.equal(firstResponse.status, 200);
  assert.equal(firstBody.source, "api");
  assert.deepEqual(firstBody.models, [{ id: "glm-5.1", name: "GLM 5.1" }]);
  assert.deepEqual(cachedModels, [{ id: "glm-5.1", name: "GLM 5.1", source: "api-sync" }]);

  globalThis.fetch = async () => {
    throw new Error("cached route should not hit upstream");
  };

  const cachedResponse = await callRoute(connection.id);
  const cachedBody = (await cachedResponse.json()) as any;

  assert.equal(cachedResponse.status, 200);
  assert.equal(cachedBody.source, "cache");
  assert.deepEqual(cachedBody.models, [{ id: "glm-5.1", name: "GLM 5.1", source: "api-sync" }]);
  assert.equal(fetchCalls, 1);
});

test("provider models route falls back to cached models when a refresh fails", async () => {
  const connection = await seedConnection("opencode-go", {
    apiKey: "opencode-go-key",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection("opencode-go", connection.id, [
    { id: "cached-go", name: "Cached Go", source: "api-sync" },
  ]);
  let fetchCalls = 0;

  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response("upstream unavailable", { status: 503 });
  };

  const response = await callRoute(connection.id, "?refresh=true");
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.source, "cache");
  assert.match(body.warning, /cached catalog/i);
  assert.deepEqual(body.models, [{ id: "cached-go", name: "Cached Go", source: "api-sync" }]);
  assert.equal(fetchCalls, 1);
});

test("provider models route honors autoFetchModels=false and skips remote discovery", async () => {
  const connection = await seedConnection("opencode-go", {
    apiKey: "opencode-go-key",
    providerSpecificData: {
      autoFetchModels: false,
    },
  });
  let called = false;

  globalThis.fetch = async () => {
    called = true;
    return Response.json({
      data: [{ id: "glm-5.1", name: "GLM 5.1" }],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.match(body.warning, /auto-fetch disabled/i);
  assert.equal(called, false);
  assert.ok(body.models.some((model) => model.id === "glm-5"));
});

test("provider models route validates Gemini CLI credentials before fetching quota buckets", async () => {
  const missingToken = await seedConnection("gemini-cli", {
    authType: "oauth",
    apiKey: null,
  });
  const missingProject = await seedConnection("gemini-cli", {
    authType: "oauth",
    name: "gemini-cli-projectless",
    accessToken: "gemini-cli-access",
    apiKey: null,
  });

  const missingTokenResponse = await callRoute(missingToken.id);
  const missingProjectResponse = await callRoute(missingProject.id);

  assert.equal(missingTokenResponse.status, 400);
  assert.match((await missingTokenResponse.json()).error, /No access token/i);
  assert.equal(missingProjectResponse.status, 400);
  assert.match((await missingProjectResponse.json()).error, /project ID not available/i);
});

test("provider models route maps Gemini CLI quota buckets into a model list", async () => {
  const connection = await seedConnection("gemini-cli", {
    authType: "oauth",
    accessToken: "gemini-cli-access",
    apiKey: null,
    projectId: "projects/demo-123",
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://cloudcode-pa.googleapis.com/v1internal:retrieveUserQuota");
    assert.equal(init.headers.Authorization, "Bearer gemini-cli-access");
    assert.deepEqual(JSON.parse(String(init.body)), { project: "projects/demo-123" });
    return Response.json({
      buckets: [{ modelId: "gemini-3-pro-preview" }, { modelId: "gemini-3-flash" }],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.deepEqual(body.models, [
    { id: "gemini-3-pro-preview", name: "gemini-3-pro-preview", owned_by: "google" },
    { id: "gemini-3-flash", name: "gemini-3-flash", owned_by: "google" },
  ]);
});

test("provider models route retries Antigravity discovery endpoints before returning remote models", async () => {
  const connection = await seedConnection("antigravity", {
    authType: "oauth",
    accessToken: "ag-access",
    apiKey: null,
  });
  const seenUrls = [];
  antigravityVersion.seedAntigravityVersionCache("1.22.2");

  globalThis.fetch = async (url, init = {}) => {
    seenUrls.push(String(url));
    if (seenUrls.length === 1) {
      return new Response("unavailable", { status: 503 });
    }

    assert.equal(init.method, "POST");
    assert.equal(init.headers.Authorization, "Bearer ag-access");
    assert.match(init.headers["User-Agent"], /^antigravity\//);
    return Response.json({
      models: [{ id: "gemini-3-flash", displayName: "Gemini 3 Flash" }],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;
  const discoveryUrls = seenUrls.filter((url) => url.includes("/v1internal:models"));

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.deepEqual(discoveryUrls, [
    "https://cloudcode-pa.googleapis.com/v1internal:models",
    "https://daily-cloudcode-pa.googleapis.com/v1internal:models",
  ]);
  assert.deepEqual(body.models, [{ id: "gemini-3-flash-preview", name: "Gemini 3 Flash Preview" }]);
});

test("provider models route falls back through all Antigravity discovery endpoints when needed", async () => {
  const connection = await seedConnection("antigravity", {
    authType: "oauth",
    accessToken: "ag-access",
    apiKey: null,
  });
  const seenUrls = [];

  globalThis.fetch = async (url) => {
    seenUrls.push(String(url));
    return new Response("down", { status: 502 });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;
  const discoveryUrls = seenUrls.filter((url) => url.includes("/v1internal:models"));

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.match(body.warning, /local catalog/i);
  assert.deepEqual(discoveryUrls, [
    "https://cloudcode-pa.googleapis.com/v1internal:models",
    "https://daily-cloudcode-pa.googleapis.com/v1internal:models",
    "https://daily-cloudcode-pa.sandbox.googleapis.com/v1internal:models",
  ]);
  assert.ok(body.models.some((model) => model.id === "gemini-3-pro-preview"));
});

test("provider models route returns the local catalog for OAuth-backed Qwen connections", async () => {
  const connection = await seedConnection("qwen", {
    authType: "oauth",
    accessToken: "qwen-access",
    apiKey: null,
  });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.ok(Array.isArray(body.models));
});

test("provider models route filters hidden models from the static Claude catalog when requested", async () => {
  const connection = await seedConnection("claude", {
    authType: "oauth",
    accessToken: "claude-access",
    apiKey: null,
  });
  modelsDb.mergeModelCompatOverride("claude", "claude-sonnet-4-6", { isHidden: true });

  const response = await callRoute(connection.id, "?excludeHidden=true");
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "claude");
  assert.ok(body.models.some((model) => model.id === "claude-opus-4-7"));
  assert.equal(
    body.models.some((model) => model.id === "claude-sonnet-4-6"),
    false
  );
  assert.ok(body.models.some((model) => model.id === "claude-opus-4-6"));
});

test("provider models route rejects Anthropic-compatible providers without a base URL", async () => {
  const connection = await seedConnection("anthropic-compatible-demo", {
    apiKey: "sk-anthropic-compatible",
  });

  const response = await callRoute(connection.id);

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "No base URL configured for Anthropic compatible provider",
  });
});

test("provider models route trims Anthropic-compatible message URLs and filters hidden upstream models", async () => {
  const connection = await seedConnection("anthropic-compatible-demo", {
    apiKey: "sk-anthropic-compatible",
    accessToken: "anthropic-access",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com/v1/messages",
    },
  });
  modelsDb.mergeModelCompatOverride("anthropic-compatible-demo", "hidden-model", {
    isHidden: true,
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://proxy.example.com/v1/models");
    assert.equal(init.method, "GET");
    assert.equal(init.headers["Content-Type"], "application/json");
    assert.equal(init.headers["x-api-key"], "sk-anthropic-compatible");
    assert.equal(init.headers.Authorization, "Bearer anthropic-access");
    assert.equal(init.headers["anthropic-version"], "2023-06-01");

    return Response.json({
      data: [
        { id: "visible-model", name: "Visible Model" },
        { id: "hidden-model", name: "Hidden Model" },
      ],
    });
  };

  const response = await callRoute(connection.id, "?excludeHidden=true");
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.deepEqual(body.models, [{ id: "visible-model", name: "Visible Model" }]);
});

test("provider models route forwards Anthropic-compatible upstream failures", async () => {
  const connection = await seedConnection("anthropic-compatible-demo", {
    apiKey: "sk-anthropic-compatible",
    providerSpecificData: {
      baseUrl: "https://proxy.example.com/v1/messages",
    },
  });

  globalThis.fetch = async () => new Response("upstream unavailable", { status: 502 });

  const response = await callRoute(connection.id);

  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), {
    error: "Failed to fetch models: 502",
  });
});

test("provider models route paginates generic providers and filters hidden models when requested", async () => {
  const connection = await seedConnection("gemini", {
    apiKey: "gm-key",
  });
  modelsDb.mergeModelCompatOverride("gemini", "gemini-hidden", { isHidden: true });
  const seenUrls = [];

  globalThis.fetch = async (url) => {
    const currentUrl = String(url);
    seenUrls.push(currentUrl);
    if (!currentUrl.includes("pageToken=")) {
      assert.match(currentUrl, /key=gm-key/);
      return Response.json({
        models: [
          {
            name: "models/gemini-visible",
            displayName: "Gemini Visible",
            supportedGenerationMethods: ["generateContent"],
          },
          {
            name: "models/gemini-hidden",
            displayName: "Gemini Hidden",
            supportedGenerationMethods: ["generateContent"],
          },
        ],
        nextPageToken: "page-2",
      });
    }

    assert.match(currentUrl, /pageToken=page-2/);
    assert.match(currentUrl, /key=gm-key/);
    return Response.json({
      models: [
        {
          name: "models/text-embedding-004",
          displayName: "Text Embedding 004",
          supportedGenerationMethods: ["embedContent"],
        },
      ],
    });
  };

  const response = await callRoute(connection.id, "?excludeHidden=true");
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.deepEqual(body.models.map((model) => model.id).sort(), [
    "gemini-visible",
    "text-embedding-004",
  ]);
  assert.equal(seenUrls.length, 2);
});

test("provider models route stops pagination when the upstream repeats the next page token", async () => {
  const connection = await seedConnection("gemini", {
    apiKey: "gm-key",
  });
  let calls = 0;

  globalThis.fetch = async () => {
    calls += 1;
    return Response.json({
      models: [
        {
          name: `models/gemini-page-${calls}`,
          displayName: `Gemini Page ${calls}`,
          supportedGenerationMethods: ["generateContent"],
        },
      ],
      nextPageToken: "duplicate-token",
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.deepEqual(
    body.models.map((model) => model.id),
    ["gemini-page-1", "gemini-page-2"]
  );
  assert.equal(calls, 2);
});

test("provider models route forwards upstream status codes for generic provider model fetch failures", async () => {
  const connection = await seedConnection("groq", {
    apiKey: "groq-models-token",
  });

  globalThis.fetch = async () => new Response("upstream unavailable", { status: 503 });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.match(body.warning, /local catalog/i);
  assert.ok(Array.isArray(body.models));
  assert.ok(body.models.length > 0);
});

test("provider models route returns 500 when fetching models throws unexpectedly", async () => {
  const connection = await seedConnection("groq", {
    apiKey: "groq-models-token",
  });

  globalThis.fetch = async () => {
    throw new Error("socket closed");
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.match(body.warning, /local catalog/i);
});

test("provider models route rejects generic providers without any configured token", async () => {
  const connection = await seedConnection("groq", {
    apiKey: null,
    accessToken: null,
  });
  let called = false;

  globalThis.fetch = async () => {
    called = true;
    return Response.json({ data: [] });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.match(body.warning, /local catalog/i);
  assert.equal(called, false);
});

test("provider models route rejects unsupported providers without a models config", async () => {
  const connection = await seedConnection("unsupported-provider", {
    apiKey: "sk-unsupported",
  });

  const response = await callRoute(connection.id);

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    error: "Provider unsupported-provider does not support models listing",
  });
});

test("provider models route uses provider-specific auth headers for Kimi Coding", async () => {
  const connection = await seedConnection("kimi-coding", {
    apiKey: "kimi-coding-key",
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://api.kimi.com/coding/v1/models");
    assert.equal(init.method, "GET");
    assert.equal(init.headers["x-api-key"], "kimi-coding-key");
    assert.equal(init.headers.Authorization, undefined);

    return Response.json({
      data: [{ id: "kimi-k2.5", name: "Kimi K2.5" }],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "kimi-coding");
  assert.deepEqual(body.models, [{ id: "kimi-k2.5", name: "Kimi K2.5" }]);
});
