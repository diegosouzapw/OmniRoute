import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-perplexity-agent-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "perplexity-agent-provider-test-secret";

const { REGISTRY, providerUsesAuthoritativeLiveCatalog } =
  await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { AI_PROVIDERS, APIKEY_PROVIDERS, getProviderByAlias, getProviderById } =
  await import("../../src/shared/constants/providers.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { replaceSyncedAvailableModelsForConnection } = await import("../../src/lib/db/models.ts");
const dbCore = await import("../../src/lib/db/core.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

const AGENT_RESPONSES_URL = "https://api.perplexity.ai/v1/responses";
const AGENT_MODELS_URL = "https://api.perplexity.ai/v1/models";
const AGENT_CONNECTION_ID = "perplexity-agent-live-catalog-test";
const DOCUMENTED_AGENT_MODEL_IDS = [
  "anthropic/claude-fable-5",
  "anthropic/claude-opus-5",
  "anthropic/claude-opus-4-8",
  "anthropic/claude-opus-4-7",
  "anthropic/claude-opus-4-6",
  "anthropic/claude-opus-4-5",
  "anthropic/claude-sonnet-5",
  "anthropic/claude-sonnet-4-6",
  "anthropic/claude-sonnet-4-5",
  "anthropic/claude-haiku-4-5",
  "openai/gpt-5.6-sol",
  "openai/gpt-5.6-terra",
  "openai/gpt-5.6-luna",
  "openai/gpt-5.5",
  "openai/gpt-5.4",
  "openai/gpt-5.4-mini",
  "openai/gpt-5.4-nano",
  "openai/gpt-5.2",
  "openai/gpt-5.1",
  "openai/gpt-5",
  "openai/gpt-5-mini",
  "google/gemini-3.1-pro-preview",
  "google/gemini-3.1-flash-lite",
  "google/gemini-3.5-flash",
  "google/gemini-3.5-flash-lite",
  "google/gemini-3.6-flash",
  "google/gemini-3.7-flash",
  "google/gemini-3-flash-preview",
  "xai/grok-4.6",
  "xai/grok-4.5",
  "xai/grok-4.3",
  "xai/grok-4.20-reasoning",
  "xai/grok-4.20-non-reasoning",
  "xai/grok-4.20-multi-agent",
  "perplexity/deepseek-v4-flash-0731",
  "perplexity/glm-5.2",
  "perplexity/glm-5.3",
  "perplexity/kimi-k3",
  "perplexity/kimi-k2.7-code",
  "perplexity/nemotron-3.5-lightning-30b-a3b",
  "perplexity/nemotron-3-ultra-550b-a55b",
  "perplexity/sonar",
] as const;

test.after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }

  if (ORIGINAL_API_KEY_SECRET === undefined) {
    delete process.env.API_KEY_SECRET;
  } else {
    process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
  }
});

async function seedOneItemAgentLiveCatalog() {
  const now = new Date().toISOString();
  dbCore
    .getDbInstance()
    .prepare(
      `INSERT OR REPLACE INTO provider_connections
         (id, provider, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(AGENT_CONNECTION_ID, "perplexity-agent", 1, now, now);

  await replaceSyncedAvailableModelsForConnection("perplexity-agent", AGENT_CONNECTION_ID, [
    {
      id: "openai/gpt-5.6-sol",
      name: "GPT-5.6 Sol",
      source: "imported",
    },
  ]);
}

test("perplexity-agent registry entry uses Responses format with passthrough models", () => {
  const entry = REGISTRY["perplexity-agent"];

  assert.ok(entry, "REGISTRY['perplexity-agent'] must be defined");
  assert.equal(entry.id, "perplexity-agent");
  assert.equal(entry.alias, "pplx-agent");
  assert.equal(entry.format, "openai-responses");
  assert.equal(entry.executor, "default");
  assert.equal(entry.baseUrl, AGENT_RESPONSES_URL);
  assert.equal(entry.modelsUrl, AGENT_MODELS_URL);
  assert.equal(entry.testKeyModelsUrl, AGENT_MODELS_URL);
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.passthroughModels, true);
  assert.equal(entry.liveCatalogAuthoritative, false);
  assert.equal(providerUsesAuthoritativeLiveCatalog("perplexity-agent"), false);
  assert.equal(providerUsesAuthoritativeLiveCatalog("pplx-agent"), false);
});

test("perplexity-agent is available from the canonical API-key provider catalog", () => {
  const entry = APIKEY_PROVIDERS["perplexity-agent"];

  assert.ok(entry, "APIKEY_PROVIDERS['perplexity-agent'] must be defined");
  assert.equal(entry.id, "perplexity-agent");
  assert.equal(entry.alias, "pplx-agent");
  assert.equal(entry.name, "Perplexity Agent");
  assert.equal(entry.icon, "search");
  assert.equal(entry.color, "#20808D");
  assert.equal(entry.textIcon, "PA");
  assert.equal(entry.website, "https://www.perplexity.ai");
  assert.equal(entry.passthroughModels, true);
  assert.equal(AI_PROVIDERS["perplexity-agent"], entry);
  assert.equal(getProviderById("perplexity-agent"), entry);
  assert.equal(getProviderByAlias("pplx-agent"), entry);
});

test("perplexity-agent exposes minimal starter models without duplicating live discovery", () => {
  const entry = REGISTRY["perplexity-agent"];
  const ids = new Set(entry.models.map((model) => model.id));

  assert.deepEqual([...ids].sort(), ["openai/gpt-5.6-sol", "perplexity/kimi-k3"].sort());
  assert.equal(entry.models.length, 2);
  assert.ok(entry.models.some((model) => model.id === "openai/gpt-5.6-sol"));
  assert.ok(entry.models.some((model) => model.id === "perplexity/kimi-k3"));
});

test("pplx-agent prefix preserves raw slash-containing Agent API model IDs", async () => {
  const info = await getModelInfo("pplx-agent/openai/gpt-5.6-sol");

  assert.equal(info.provider, "perplexity-agent");
  assert.equal(info.model, "openai/gpt-5.6-sol");
});

test("pplx-agent keeps unseen slash-containing Agent API IDs routable after live sync", async () => {
  await seedOneItemAgentLiveCatalog();

  const info = await getModelInfo("pplx-agent/future/labs/model-alpha");

  assert.equal(info.provider, "perplexity-agent");
  assert.equal(info.model, "future/labs/model-alpha");
});

test("perplexity-agent default executor dispatches to Perplexity Responses endpoint", () => {
  const executor = new DefaultExecutor("perplexity-agent");

  assert.equal(executor.buildUrl("openai/gpt-5.6-sol", false, 0, null), AGENT_RESPONSES_URL);
});

test("perplexity-agent defaults max_output_tokens when Agent requests omit token fields", () => {
  const executor = new DefaultExecutor("perplexity-agent");
  const explicit = executor.transformRequest(
    "anthropic/claude-opus-4-5",
    { model: "anthropic/claude-opus-4-5", input: "hi", max_output_tokens: 32 },
    false,
    null
  ) as Record<string, unknown>;
  const defaulted = executor.transformRequest(
    "anthropic/claude-opus-4-5",
    { model: "anthropic/claude-opus-4-5", input: "hi" },
    false,
    null
  ) as Record<string, unknown>;
  const kimiAgent = executor.transformRequest(
    "perplexity/kimi-k3",
    { model: "perplexity/kimi-k3", input: "hi" },
    false,
    null
  ) as Record<string, unknown>;
  const futureAgent = executor.transformRequest(
    "future-lab/model-alpha-1",
    { model: "future-lab/model-alpha-1", input: "hi" },
    false,
    null
  ) as Record<string, unknown>;

  assert.equal(explicit.max_output_tokens, 32);
  assert.equal(defaulted.max_output_tokens, 4096);
  assert.equal(kimiAgent.max_output_tokens, 4096);
  assert.equal(futureAgent.max_output_tokens, 4096);
});

test("perplexity-agent model discovery accepts documented and future Agent API model IDs", async () => {
  const { id } = (await createProviderConnection({
    provider: "perplexity-agent",
    authType: "apikey",
    name: "valid Perplexity Agent key",
    apiKey: "pplx-valid-test-key",
    isActive: true,
  })) as { id?: unknown };
  assert.equal(typeof id, "string");

  const originalFetch = globalThis.fetch;
  const futureModelId = "future-lab/model-alpha-1";
  const upstreamModelIds = [...DOCUMENTED_AGENT_MODEL_IDS, futureModelId];
  let upstreamUrl: string | null = null;
  let upstreamAuthorization: string | null = null;
  globalThis.fetch = (async (input, init) => {
    upstreamUrl =
      input instanceof URL ? input.toString() : typeof input === "string" ? input : input.url;
    upstreamAuthorization = new Headers(init?.headers).get("authorization");

    return new Response(
      JSON.stringify({
        object: "list",
        data: upstreamModelIds.map((modelId) => ({
          id: modelId,
          object: "model",
          owned_by: "perplexity-agent",
        })),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof globalThis.fetch;

  try {
    const { GET } = await import("../../src/app/api/providers/[id]/models/route.ts");
    const response = await GET(
      new Request(`http://localhost/api/providers/${id}/models?refresh=true`),
      { params: { id } }
    );
    const body = (await response.json()) as { models?: Array<{ id?: string }> };
    const modelIds = (body.models ?? []).map((model) => model.id);

    assert.equal(response.status, 200);
    assert.equal(upstreamUrl, AGENT_MODELS_URL);
    assert.equal(upstreamAuthorization, "Bearer pplx-valid-test-key");
    for (const modelId of upstreamModelIds) {
      assert.ok(modelIds.includes(modelId), `expected discovered catalog to include ${modelId}`);
    }

    const futureInfo = await getModelInfo(`pplx-agent/${futureModelId}`);
    assert.equal(futureInfo.provider, "perplexity-agent");
    assert.equal(futureInfo.model, futureModelId);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("existing Perplexity Sonar provider remains unchanged", () => {
  const entry = REGISTRY.perplexity;

  assert.ok(entry, "REGISTRY.perplexity must remain defined");
  assert.equal(entry.id, "perplexity");
  assert.equal(entry.alias, "pplx");
  assert.equal(entry.format, "openai");
  assert.equal(entry.baseUrl, "https://api.perplexity.ai/chat/completions");
  assert.equal(entry.testKeyModelsUrl, AGENT_MODELS_URL);
});
