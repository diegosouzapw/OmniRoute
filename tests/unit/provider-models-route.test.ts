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

test("provider models route returns AWS Polly speech engines from the audio registry", async () => {
  const connection = await seedConnection("aws-polly", {
    apiKey: "aws-secret-key",
    providerSpecificData: {
      accessKeyId: "AKIA_TEST",
      region: "us-east-1",
    },
  });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "aws-polly");
  assert.equal(body.source, "local_catalog");
  assert.deepEqual(
    body.models.map((model) => model.id),
    ["standard", "neural", "long-form", "generative"]
  );
});

test("provider models route returns the local catalog for GitLab Duo fallback models", async () => {
  const connection = await seedConnection("gitlab", {
    apiKey: "glpat-test",
  });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "gitlab");
  assert.equal(body.source, "local_catalog");
  assert.deepEqual(body.models, [
    { id: "gitlab-duo-code-suggestions", name: "GitLab Duo Code Suggestions" },
  ]);
});

test("provider models route discovers local OpenAI-style models without requiring an API key", async () => {
  process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";

  const lmStudioConnection = await seedConnection("lm-studio", {
    providerSpecificData: {
      baseUrl: "http://localhost:1234/v1",
    },
  });
  const lemonadeConnection = await seedConnection("lemonade", {
    providerSpecificData: {
      baseUrl: "http://localhost:13305/api/v1",
    },
  });

  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    assert.equal(init.headers.Authorization, undefined);
    if (target === "http://localhost:1234/v1/models") {
      return Response.json({
        data: [{ id: "local-model", name: "Local Model" }],
      });
    }
    if (target === "http://localhost:13305/api/v1/models") {
      return Response.json({
        data: [{ id: "Llama-3.2-1B-Instruct-Hybrid", name: "Lemonade Llama" }],
      });
    }
    throw new Error(`unexpected fetch: ${target}`);
  };

  const lmStudioResponse = await callRoute(lmStudioConnection.id);
  const lmStudioBody = (await lmStudioResponse.json()) as any;
  const lemonadeResponse = await callRoute(lemonadeConnection.id);
  const lemonadeBody = (await lemonadeResponse.json()) as any;

  assert.equal(lmStudioResponse.status, 200);
  assert.equal(lmStudioBody.provider, "lm-studio");
  assert.equal(lmStudioBody.source, "api");
  assert.deepEqual(lmStudioBody.models, [{ id: "local-model", name: "Local Model" }]);

  assert.equal(lemonadeResponse.status, 200);
  assert.equal(lemonadeBody.provider, "lemonade");
  assert.equal(lemonadeBody.source, "api");
  assert.deepEqual(lemonadeBody.models, [
    { id: "Llama-3.2-1B-Instruct-Hybrid", name: "Lemonade Llama" },
  ]);
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

test("provider models route returns the local catalog for embedding and rerank providers", async () => {
  const voyage = await seedConnection("voyage-ai", {
    apiKey: "voyage-key",
  });
  const jina = await seedConnection("jina-ai", {
    apiKey: "jina-key",
  });

  const [voyageResponse, jinaResponse] = await Promise.all([
    callRoute(voyage.id),
    callRoute(jina.id),
  ]);
  const voyageBody = (await voyageResponse.json()) as any;
  const jinaBody = (await jinaResponse.json()) as any;

  assert.equal(voyageResponse.status, 200);
  assert.equal(voyageBody.provider, "voyage-ai");
  assert.equal(voyageBody.source, "local_catalog");
  assert.ok(voyageBody.models.some((model) => model.id === "voyage-4-large"));
  assert.ok(voyageBody.models.some((model) => model.id === "voyage-3-large"));

  assert.equal(jinaResponse.status, 200);
  assert.equal(jinaBody.provider, "jina-ai");
  assert.equal(jinaBody.source, "local_catalog");
  assert.ok(jinaBody.models.some((model) => model.id === "jina-reranker-v3"));
  assert.ok(jinaBody.models.some((model) => model.id === "jina-reranker-v2-base-multilingual"));
});

test("provider models route returns the local catalog for Runway video models", async () => {
  const connection = await seedConnection("runwayml", {
    apiKey: "runway-key",
  });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "runwayml");
  assert.equal(body.source, "local_catalog");
  assert.ok(body.models.some((model) => model.id === "gen4.5"));
  assert.ok(body.models.some((model) => model.id === "veo3.1"));
  assert.ok(body.models.some((model) => model.id === "gen3a_turbo"));
});

test("provider models route returns the updated local catalog for GitHub Copilot", async () => {
  const connection = await seedConnection("github", {
    authType: "oauth",
    apiKey: null,
    accessToken: "github-access",
    providerSpecificData: {
      copilotToken: "copilot-token",
    },
  });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "github");
  assert.equal(body.source, "local_catalog");
  assert.ok(body.models.some((model) => model.id === "gpt-5.4"));
  assert.ok(body.models.some((model) => model.id === "gpt-5.3-codex"));
  assert.ok(body.models.some((model) => model.id === "claude-opus-4.7"));
  assert.equal(
    body.models.some((model) => model.id === "gpt-5.1"),
    false
  );
});

test("provider models route returns the expanded local catalog for Kiro", async () => {
  const connection = await seedConnection("kiro", {
    authType: "oauth",
    apiKey: null,
    accessToken: "kiro-access",
  });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "kiro");
  assert.equal(body.source, "local_catalog");
  assert.ok(body.models.some((model) => model.id === "claude-haiku-4.5"));
  assert.ok(body.models.some((model) => model.id === "claude-opus-4.7"));
  assert.ok(body.models.some((model) => model.id === "claude-sonnet-4.6"));
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
  assert.deepEqual(cachedModels, [{ id: "glm-5.1", name: "GLM 5.1", source: "imported" }]);

  globalThis.fetch = async () => {
    throw new Error("cached route should not hit upstream");
  };

  const cachedResponse = await callRoute(connection.id);
  const cachedBody = (await cachedResponse.json()) as any;

  assert.equal(cachedResponse.status, 200);
  assert.equal(cachedBody.source, "cache");
  assert.deepEqual(cachedBody.models, [{ id: "glm-5.1", name: "GLM 5.1", source: "imported" }]);
  assert.equal(fetchCalls, 1);
});

test("provider models route falls back to cached models when a refresh fails", async () => {
  const connection = await seedConnection("opencode-go", {
    apiKey: "opencode-go-key",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection("opencode-go", connection.id, [
    { id: "cached-go", name: "Cached Go", source: "imported" },
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
  assert.deepEqual(body.models, [{ id: "cached-go", name: "Cached Go", source: "imported" }]);
  assert.equal(fetchCalls, 1);
});

test("provider models route clears cached discovery when a refresh returns no remote models", async () => {
  const connection = await seedConnection("opencode-go", {
    apiKey: "opencode-go-key",
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection("opencode-go", connection.id, [
    { id: "cached-go", name: "Cached Go", source: "imported" },
  ]);

  globalThis.fetch = async () => {
    return Response.json({ data: [] });
  };

  const response = await callRoute(connection.id, "?refresh=true");
  const body = (await response.json()) as any;
  const cachedModels = await modelsDb.getSyncedAvailableModelsForConnection(
    "opencode-go",
    connection.id
  );

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.match(body.warning, /no remote models discovered/i);
  assert.ok(body.models.every((model) => model.id !== "cached-go"));
  assert.deepEqual(cachedModels, []);
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
  assert.deepEqual(body.models, [{ id: "gemini-3-flash-preview", name: "Gemini 3 Flash" }]);
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

test("provider models route discovers active DataRobot gateway models from the catalog endpoint", async () => {
  const connection = await seedConnection("datarobot", {
    apiKey: "dr-key",
    providerSpecificData: {
      baseUrl: "https://app.datarobot.com",
    },
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://app.datarobot.com/genai/llmgw/catalog/");
    assert.equal(init.method, "GET");
    assert.equal(init.headers.Authorization, "Bearer dr-key");

    return Response.json({
      data: [
        { model: "azure/gpt-5-mini-2025-08-07", isActive: true },
        { model: "azure/gpt-4o-mini", label: "Azure GPT-4o Mini", isActive: true },
        { model: "anthropic/claude-sonnet-4-6", isActive: false },
      ],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "datarobot");
  assert.equal(body.source, "api");
  assert.deepEqual(body.models, [
    {
      id: "azure/gpt-5-mini-2025-08-07",
      name: "azure/gpt-5-mini-2025-08-07",
      owned_by: "datarobot",
    },
    {
      id: "azure/gpt-4o-mini",
      name: "Azure GPT-4o Mini",
      owned_by: "datarobot",
    },
  ]);
});

test("provider models route discovers Clarifai OpenAI-compatible models with Key auth", async () => {
  const connection = await seedConnection("clarifai", {
    apiKey: "clarifai-pat",
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://api.clarifai.com/v2/ext/openai/v1/models");
    assert.equal(init.method, "GET");
    assert.equal(init.headers.Authorization, "Key clarifai-pat");

    return Response.json({
      data: [
        {
          id: "openai/chat-completion/models/gpt-oss-120b",
          display_name: "GPT-OSS 120B",
        },
        { id: "anthropic/completion/models/claude-sonnet-4" },
      ],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "clarifai");
  assert.equal(body.source, "api");
  assert.deepEqual(body.models, [
    {
      id: "openai/chat-completion/models/gpt-oss-120b",
      name: "GPT-OSS 120B",
      owned_by: "clarifai",
    },
    {
      id: "anthropic/completion/models/claude-sonnet-4",
      name: "anthropic/completion/models/claude-sonnet-4",
      owned_by: "clarifai",
    },
  ]);
});

test("provider models route discovers Azure AI Foundry deployments through the v1 models endpoint", async () => {
  const connection = await seedConnection("azure-ai", {
    apiKey: "azure-ai-key",
    providerSpecificData: {
      baseUrl: "https://my-foundry.services.ai.azure.com",
    },
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://my-foundry.services.ai.azure.com/openai/v1/models");
    assert.equal(init.method, "GET");
    assert.equal(init.headers["api-key"], "azure-ai-key");

    return Response.json({
      data: [{ id: "DeepSeek-V3.1", display_name: "DeepSeek V3.1" }, { name: "Claude-Opus-4.6" }],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "azure-ai");
  assert.equal(body.source, "api");
  assert.deepEqual(body.models, [
    { id: "DeepSeek-V3.1", name: "DeepSeek V3.1", owned_by: "azure-ai" },
    { id: "Claude-Opus-4.6", name: "Claude-Opus-4.6", owned_by: "azure-ai" },
  ]);
});

test("provider models route discovers Azure OpenAI deployments from the resource endpoint", async () => {
  const connection = await seedConnection("azure-openai", {
    apiKey: "azure-openai-key",
    providerSpecificData: {
      baseUrl: "https://my-resource.openai.azure.com/openai",
      apiVersion: "2024-12-01-preview",
    },
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(
      String(url),
      "https://my-resource.openai.azure.com/openai/deployments?api-version=2024-12-01-preview"
    );
    assert.equal(init.method, "GET");
    assert.equal(init.headers["api-key"], "azure-openai-key");

    return Response.json({
      data: [
        { id: "gpt4o-prod", model: "gpt-4o", display_name: "GPT-4o Production" },
        { id: "o3-mini-staging", model: "o3-mini" },
      ],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "azure-openai");
  assert.equal(body.source, "api");
  assert.deepEqual(body.models, [
    { id: "gpt4o-prod", name: "GPT-4o Production", owned_by: "azure-openai" },
    { id: "o3-mini-staging", name: "o3-mini-staging", owned_by: "azure-openai" },
  ]);
});

test("provider models route discovers Bedrock mantle models from the OpenAI-compatible models endpoint", async () => {
  const connection = await seedConnection("bedrock", {
    apiKey: "bedrock-key",
    providerSpecificData: {
      baseUrl: "https://bedrock-mantle.us-east-1.api.aws",
    },
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://bedrock-mantle.us-east-1.api.aws/v1/models");
    assert.equal(init.method, "GET");
    assert.equal(init.headers.Authorization, "Bearer bedrock-key");

    return Response.json({
      data: [
        { id: "openai.gpt-oss-120b", display_name: "OpenAI GPT-OSS 120B" },
        { id: "mistral.mistral-large-3-675b-instruct" },
      ],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "bedrock");
  assert.equal(body.source, "api");
  assert.deepEqual(body.models, [
    {
      id: "openai.gpt-oss-120b",
      name: "OpenAI GPT-OSS 120B",
      owned_by: "bedrock",
    },
    {
      id: "mistral.mistral-large-3-675b-instruct",
      name: "mistral.mistral-large-3-675b-instruct",
      owned_by: "bedrock",
    },
  ]);
});

test("provider models route discovers watsonx gateway models from the v1 models endpoint", async () => {
  const connection = await seedConnection("watsonx", {
    apiKey: "watsonx-key",
    providerSpecificData: {
      baseUrl: "https://ca-tor.ml.cloud.ibm.com",
    },
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://ca-tor.ml.cloud.ibm.com/ml/gateway/v1/models");
    assert.equal(init.method, "GET");
    assert.equal(init.headers.Authorization, "Bearer watsonx-key");

    return Response.json({
      data: [
        { id: "ibm/granite-3-3-8b-instruct", display_name: "Granite 3.3 8B Instruct" },
        { model: "openai/gpt-4o", provider: "openai" },
      ],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "watsonx");
  assert.equal(body.source, "api");
  assert.deepEqual(body.models, [
    {
      id: "ibm/granite-3-3-8b-instruct",
      name: "Granite 3.3 8B Instruct",
      owned_by: "watsonx",
    },
    {
      id: "openai/gpt-4o",
      name: "openai/gpt-4o",
      owned_by: "openai",
    },
  ]);
});

test("provider models route discovers OCI OpenAI-compatible models and forwards the project header", async () => {
  const connection = await seedConnection("oci", {
    apiKey: "oci-key",
    projectId: "ocid1.generativeaiproject.oc1.us-chicago-1.demo",
    providerSpecificData: {
      baseUrl: "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com",
    },
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(
      String(url),
      "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com/openai/v1/models"
    );
    assert.equal(init.method, "GET");
    assert.equal(init.headers.Authorization, "Bearer oci-key");
    assert.equal(init.headers["OpenAI-Project"], "ocid1.generativeaiproject.oc1.us-chicago-1.demo");

    return Response.json({
      data: [
        { id: "openai.gpt-oss-20b", display_name: "OpenAI GPT-OSS 20B" },
        { id: "google.gemini-2.5-pro" },
      ],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "oci");
  assert.equal(body.source, "api");
  assert.deepEqual(body.models, [
    {
      id: "openai.gpt-oss-20b",
      name: "OpenAI GPT-OSS 20B",
      owned_by: "oci",
    },
    {
      id: "google.gemini-2.5-pro",
      name: "google.gemini-2.5-pro",
      owned_by: "oci",
    },
  ]);
});

test("provider models route discovers Modal models from the configured OpenAI-compatible /v1 endpoint", async () => {
  const connection = await seedConnection("modal", {
    apiKey: "modal-key",
    providerSpecificData: {
      baseUrl: "https://alice--demo.modal.run/v1",
    },
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://alice--demo.modal.run/v1/models");
    assert.equal(init.method, "GET");
    assert.equal(init.headers.Authorization, "Bearer modal-key");

    return Response.json({
      data: [
        { id: "Qwen/Qwen3-4B-Thinking-2507-FP8", display_name: "Qwen3 4B Thinking FP8" },
        { id: "google/gemma-4-26B-A4B-it" },
      ],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "modal");
  assert.equal(body.source, "api");
  assert.deepEqual(body.models, [
    {
      id: "Qwen/Qwen3-4B-Thinking-2507-FP8",
      name: "Qwen3 4B Thinking FP8",
      owned_by: "modal",
    },
    {
      id: "google/gemma-4-26B-A4B-it",
      name: "google/gemma-4-26B-A4B-it",
      owned_by: "modal",
    },
  ]);
});

test("provider models route discovers Reka models from the named OpenAI-compatible /v1 endpoint", async () => {
  const connection = await seedConnection("reka", {
    apiKey: "reka-key",
    providerSpecificData: {
      baseUrl: "https://api.reka.ai/v1",
    },
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://api.reka.ai/v1/models");
    assert.equal(init.method, "GET");
    assert.equal(init.headers.Authorization, "Bearer reka-key");
    assert.equal(init.headers["X-Api-Key"], "reka-key");

    return Response.json([{ id: "reka-core", name: "Reka Core" }, { id: "reka-flash" }]);
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "reka");
  assert.equal(body.source, "api");
  assert.deepEqual(body.models, [
    {
      id: "reka-core",
      name: "Reka Core",
      owned_by: "reka",
    },
    {
      id: "reka-flash",
      name: "reka-flash",
      owned_by: "reka",
    },
  ]);
});

test("provider models route discovers SAP models from AI_API_URL derived from deploymentUrl", async () => {
  const connection = await seedConnection("sap", {
    apiKey: "sap-key",
    providerSpecificData: {
      baseUrl: "https://sap.example.com/v2/lm/deployments/demo-deployment",
      resourceGroup: "shared",
    },
  });

  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://sap.example.com/v2/lm/scenarios/foundation-models/models");
    assert.equal(init.method, "GET");
    assert.equal(init.headers.Authorization, "Bearer sap-key");
    assert.equal(init.headers["AI-Resource-Group"], "shared");

    return Response.json({
      resources: [
        { model: "gpt-4o", displayName: "GPT-4o", provider: "OpenAI" },
        { model: "mistralai--mistral-medium-instruct", provider: "Mistral AI" },
      ],
    });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "sap");
  assert.equal(body.source, "api");
  assert.deepEqual(body.models, [
    {
      id: "gpt-4o",
      name: "GPT-4o",
      owned_by: "OpenAI",
    },
    {
      id: "mistralai--mistral-medium-instruct",
      name: "mistralai--mistral-medium-instruct",
      owned_by: "Mistral AI",
    },
  ]);
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
