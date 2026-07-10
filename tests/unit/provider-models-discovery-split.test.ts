// Split-guard for the provider-models discovery route decomposition
// (refactor: extract 4 pure leaves — helpers / normalizers / providerModelsConfig /
// providerSets — out of src/app/api/providers/[id]/models/route.ts). The leaves are
// DB-free and state-free; this guard pins their public surface and the host wiring
// so a future edit that silently breaks the split fails.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  asRecord,
  toNonEmptyString,
  buildOptionalBearerHeaders,
  buildNamedOpenAiStyleHeaders,
  isLocalOpenAIStyleProvider,
  mergeLocalCatalogModels,
  getAzureOpenAIApiVersion,
} from "../../src/app/api/providers/[id]/models/discovery/helpers.ts";
import { normalizeOpenAiLikeModelsResponse } from "../../src/app/api/providers/[id]/models/discovery/normalizers.ts";
import {
  NAMED_OPENAI_STYLE_PROVIDERS,
  isNamedOpenAIStyleProvider,
} from "../../src/app/api/providers/[id]/models/discovery/providerSets.ts";
import { PROVIDER_MODELS_CONFIG } from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import {
  buildCodexModelsUrl,
  CODEX_GITHUB_MODELS_URL,
  CODEX_MODELS_URL,
  clearCodexGithubCatalogCacheForTests,
  enrichCodexModelsFromGithubCatalog,
  fetchCodexDiscoveryModels,
  fetchCodexGithubCatalogModels,
  mergeCodexLiveModelsWithLocalCatalog,
  normalizeCodexGithubCatalogResponse,
  normalizeCodexModelsResponse,
} from "../../src/app/api/providers/[id]/models/discovery/codex.ts";

// ── helpers leaf ─────────────────────────────────────────────────────────────

test("helpers.asRecord returns plain objects untouched, non-objects as {}", () => {
  assert.deepEqual(asRecord({ a: 1 }), { a: 1 });
  assert.deepEqual(asRecord([1, 2]), {});
  assert.deepEqual(asRecord(null), {});
  assert.deepEqual(asRecord("x"), {});
});

test("helpers.toNonEmptyString trims and rejects blanks/non-strings", () => {
  assert.equal(toNonEmptyString("  hi  "), "hi");
  assert.equal(toNonEmptyString("   "), null);
  assert.equal(toNonEmptyString(7), null);
});

test("helpers.buildOptionalBearerHeaders only adds Authorization when a token is present", () => {
  assert.deepEqual(buildOptionalBearerHeaders("tok"), {
    "Content-Type": "application/json",
    Authorization: "Bearer tok",
  });
  assert.deepEqual(buildOptionalBearerHeaders(null), { "Content-Type": "application/json" });
});

test("helpers.buildNamedOpenAiStyleHeaders adds the reka X-Api-Key only for reka", () => {
  assert.equal(buildNamedOpenAiStyleHeaders("reka", "tok")["X-Api-Key"], "tok");
  assert.equal(buildNamedOpenAiStyleHeaders("openai", "tok")["X-Api-Key"], undefined);
});

test("helpers.mergeLocalCatalogModels dedupes by id, registry wins", () => {
  const merged = mergeLocalCatalogModels(
    [{ id: "a", name: "A" }],
    [
      { id: "a", name: "dup" },
      { id: "b", name: "B" },
    ]
  );
  assert.deepEqual(
    merged.map((m) => m.id),
    ["a", "b"]
  );
  assert.equal(merged.find((m) => m.id === "a")?.name, "A");
});

test("helpers.getAzureOpenAIApiVersion falls back to the pinned default", () => {
  assert.equal(getAzureOpenAIApiVersion({}), "2024-12-01-preview");
  assert.equal(getAzureOpenAIApiVersion({ apiVersion: "2025-01-01" }), "2025-01-01");
});

test("helpers.isLocalOpenAIStyleProvider is false for a hosted provider", () => {
  assert.equal(isLocalOpenAIStyleProvider("openai"), false);
});

// ── normalizers leaf ─────────────────────────────────────────────────────────

test("normalizers.normalizeOpenAiLikeModelsResponse maps ids and applies the fallback owner", () => {
  const out = normalizeOpenAiLikeModelsResponse(
    { data: [{ id: "m1" }, { id: "m2", display_name: "M2", owned_by: "x" }] },
    "acme"
  );
  assert.deepEqual(out, [
    { id: "m1", name: "m1", owned_by: "acme" },
    { id: "m2", name: "M2", owned_by: "x" },
  ]);
});

test("normalizers.normalizeOpenAiLikeModelsResponse drops entries without an id", () => {
  const out = normalizeOpenAiLikeModelsResponse({ data: [{}, { id: "ok" }] }, "acme");
  assert.deepEqual(
    out.map((m) => m.id),
    ["ok"]
  );
});

// ── providerSets leaf ────────────────────────────────────────────────────────

test("providerSets.NAMED_OPENAI_STYLE_PROVIDERS is a populated Set with known members", () => {
  assert.ok(NAMED_OPENAI_STYLE_PROVIDERS instanceof Set);
  assert.ok(NAMED_OPENAI_STYLE_PROVIDERS.size >= 30);
  for (const p of ["zenmux", "api-airforce", "together", "reka"]) {
    assert.ok(NAMED_OPENAI_STYLE_PROVIDERS.has(p), `${p} must be a named OpenAI-style provider`);
  }
});

test("providerSets.isNamedOpenAIStyleProvider matches Set membership", () => {
  assert.equal(isNamedOpenAIStyleProvider("zenmux"), true);
  assert.equal(isNamedOpenAIStyleProvider("definitely-not-a-provider"), false);
});

// ── providerModelsConfig leaf ────────────────────────────────────────────────

test("providerModelsConfig.PROVIDER_MODELS_CONFIG keeps core provider entries", () => {
  assert.equal(PROVIDER_MODELS_CONFIG.claude.url, "https://api.anthropic.com/v1/models");
  assert.equal(PROVIDER_MODELS_CONFIG["qwen-web"].url, "https://chat.qwen.ai/api/v2/models/");
});

test("providerModelsConfig keeps the aimlapi live catalog entry", () => {
  assert.equal(PROVIDER_MODELS_CONFIG.aimlapi.url, "https://api.aimlapi.com/models");
});

test("providerModelsConfig aimlapi.parseResponse keeps only chat-completion models when present", () => {
  const parsed = PROVIDER_MODELS_CONFIG.aimlapi.parseResponse([
    { id: "chat-1", type: "chat-completion", info: { name: "Chat 1" } },
    { id: "img-1", type: "image" },
  ]);
  assert.deepEqual(parsed, [{ id: "chat-1", name: "Chat 1" }]);
});

// ── codex discovery leaf ────────────────────────────────────────────────────

test.beforeEach(() => {
  clearCodexGithubCatalogCacheForTests();
});

test("codex.normalizeCodexModelsResponse maps data/models/map payloads to response models", () => {
  assert.deepEqual(normalizeCodexModelsResponse({ data: [{ id: "gpt-5.5", name: "GPT 5.5" }] }), [
    {
      id: "gpt-5.5",
      name: "GPT 5.5",
      owned_by: "codex",
      apiFormat: "responses",
      supportedEndpoints: ["responses"],
    },
  ]);

  assert.deepEqual(
    normalizeCodexModelsResponse({
      "gpt-5.4": { title: "GPT 5.4" },
      invalid: null,
    }).map((m) => ({ id: m.id, name: m.name })),
    [{ id: "gpt-5.4", name: "GPT 5.4" }]
  );
});

test("codex.normalizeCodexModelsResponse parses the Codex live catalog shape", () => {
  const parsed = normalizeCodexModelsResponse({
    models: [
      {
        slug: "codex-auto-review",
        display_name: "Codex Auto Review",
        visibility: "hide",
        supported_in_api: true,
      },
      {
        slug: "gpt-5.4",
        display_name: "GPT-5.4",
        visibility: "list",
        supported_in_api: true,
        context_length: 400000,
        max_output_tokens: 128000,
        service_tiers: [{ id: "priority", name: "Fast" }],
        additional_speed_tiers: ["fast"],
      },
      {
        slug: "gpt-5.5",
        display_name: "GPT-5.5",
        visibility: "list",
        supported_in_api: true,
        max_input_tokens: 272000,
        top_provider: { max_completion_tokens: 64000 },
      },
      {
        slug: "internal-only",
        display_name: "Internal Only",
        visibility: "list",
        supported_in_api: false,
      },
    ],
  });

  assert.deepEqual(
    parsed.map((m) => ({ id: m.id, name: m.name })),
    [
      { id: "gpt-5.4", name: "GPT-5.4" },
      { id: "gpt-5.5", name: "GPT-5.5" },
    ]
  );
  assert.equal(parsed.find((model) => model.id === "gpt-5.4")?.inputTokenLimit, 400000);
  assert.equal(parsed.find((model) => model.id === "gpt-5.4")?.outputTokenLimit, 128000);
  assert.equal(parsed.find((model) => model.id === "gpt-5.5")?.inputTokenLimit, 272000);
  assert.equal(parsed.find((model) => model.id === "gpt-5.5")?.outputTokenLimit, 64000);
});

test("codex.normalizeCodexGithubCatalogResponse parses current client catalog metadata", () => {
  const parsed = normalizeCodexGithubCatalogResponse({
    models: [
      {
        slug: "gpt-5.6-sol",
        display_name: "GPT-5.6-Sol",
        description: "Latest frontier agentic coding model.",
        visibility: "list",
        supported_in_api: true,
        minimal_client_version: "0.142.0",
        context_window: 372000,
        input_modalities: ["text", "image"],
        supported_reasoning_levels: [{ effort: "low" }, { effort: "ultra" }],
      },
      {
        slug: "future-model",
        display_name: "Future Model",
        visibility: "list",
        supported_in_api: true,
        minimal_client_version: "999.0.0",
      },
      {
        slug: "codex-auto-review",
        display_name: "Codex Auto Review",
        visibility: "hide",
        supported_in_api: true,
      },
    ],
  });

  assert.deepEqual(
    parsed.map((model) => model.id),
    ["gpt-5.6-sol"]
  );
  assert.equal(parsed[0]?.description, "Latest frontier agentic coding model.");
  assert.equal(parsed[0]?.inputTokenLimit, 372000);
  assert.equal(parsed[0]?.supportsThinking, true);
  assert.equal(parsed[0]?.supportsVision, true);
});

test("codex.enrichCodexModelsFromGithubCatalog keeps live entitlement list authoritative", () => {
  const enriched = enrichCodexModelsFromGithubCatalog(
    [
      {
        id: "gpt-5.6-sol",
        name: "Live Sol",
        owned_by: "codex",
        apiFormat: "responses",
        supportedEndpoints: ["responses"],
      },
    ],
    [
      {
        id: "gpt-5.6-sol",
        name: "GitHub Sol",
        owned_by: "codex",
        apiFormat: "responses",
        supportedEndpoints: ["responses"],
        inputTokenLimit: 372000,
        supportsVision: true,
      },
      {
        id: "gpt-5.6-luna",
        name: "GitHub Luna",
        owned_by: "codex",
        apiFormat: "responses",
        supportedEndpoints: ["responses"],
      },
    ]
  );

  assert.deepEqual(
    enriched.map((model) => model.id),
    ["gpt-5.6-sol"]
  );
  assert.equal(enriched[0]?.name, "Live Sol");
  assert.equal(enriched[0]?.inputTokenLimit, 372000);
  assert.equal(enriched[0]?.supportsVision, true);
});

test("codex.mergeCodexLiveModelsWithLocalCatalog preserves static effort aliases", () => {
  const merged = mergeCodexLiveModelsWithLocalCatalog(
    [
      {
        id: "gpt-5.6",
        name: "GPT 5.6 Live",
        owned_by: "codex",
        apiFormat: "responses",
        supportedEndpoints: ["responses"],
        inputTokenLimit: 512000,
      },
    ],
    [
      { id: "gpt-5.6", name: "GPT 5.6 Static", contextLength: 400000 },
      { id: "gpt-5.6-low", name: "GPT 5.6 Low", contextLength: 400000 },
    ]
  );

  assert.deepEqual(
    merged.map((model) => model.id),
    ["gpt-5.6", "gpt-5.6-low"]
  );
  assert.equal(merged.find((model) => model.id === "gpt-5.6")?.name, "GPT 5.6 Live");
  assert.equal(merged.find((model) => model.id === "gpt-5.6")?.inputTokenLimit, 512000);
  assert.equal(merged.find((model) => model.id === "gpt-5.6-low")?.inputTokenLimit, 400000);
});

test("codex.normalizeCodexModelsResponse drops entries without an id", () => {
  const parsed = normalizeCodexModelsResponse({ models: [{ name: "" }, { model: "gpt-5.4" }] });
  assert.deepEqual(
    parsed.map((m) => m.id),
    ["gpt-5.4"]
  );
});

test("codex.fetchCodexDiscoveryModels returns null for missing token, auth failure, empty, or network error", async () => {
  assert.equal(
    await fetchCodexDiscoveryModels({
      accessToken: null,
      fetchImpl: async () => Response.json({ data: [{ id: "never-called" }] }),
    }),
    null
  );

  assert.equal(
    await fetchCodexDiscoveryModels({
      accessToken: "tok",
      fetchImpl: async () => new Response("unauthorized", { status: 401 }),
    }),
    null
  );

  assert.equal(
    await fetchCodexDiscoveryModels({
      accessToken: "tok",
      fetchImpl: async () => Response.json({ data: [] }),
    }),
    null
  );

  assert.equal(
    await fetchCodexDiscoveryModels({
      accessToken: "tok",
      fetchImpl: async () => {
        throw new Error("network down");
      },
    }),
    null
  );
});

test("codex.fetchCodexDiscoveryModels calls the Codex models endpoint with Codex bearer headers", async () => {
  let seenUrl = "";
  let seenAuthorization = "";
  let seenWorkspace = "";
  let seenOriginator = "";
  const models = await fetchCodexDiscoveryModels({
    accessToken: "codex-access",
    providerSpecificData: { chatgptAccountId: "account-123" },
    fetchImpl: async (url, init) => {
      seenUrl = url;
      seenAuthorization = init.headers.Authorization;
      seenWorkspace = init.headers["chatgpt-account-id"];
      seenOriginator = init.headers.originator;
      return Response.json({ models: [{ slug: "gpt-5.6", display_name: "GPT 5.6" }] });
    },
  });

  assert.equal(CODEX_MODELS_URL, "https://chatgpt.com/backend-api/codex/models");
  assert.equal(seenUrl, buildCodexModelsUrl());
  assert.equal(seenAuthorization, "Bearer codex-access");
  assert.equal(seenWorkspace, "account-123");
  assert.equal(seenOriginator, "codex_cli_rs");
  assert.deepEqual(
    models?.map((m) => m.id),
    ["gpt-5.6"]
  );
});

test("codex.fetchCodexGithubCatalogModels fetches the OpenAI Codex repo catalog", async () => {
  let seenUrl = "";
  const models = await fetchCodexGithubCatalogModels({
    fetchImpl: async (url) => {
      seenUrl = url;
      return Response.json({
        models: [
          {
            slug: "gpt-5.6-terra",
            display_name: "GPT-5.6-Terra",
            visibility: "list",
            supported_in_api: true,
            minimal_client_version: "0.142.0",
          },
        ],
      });
    },
  });

  assert.equal(
    CODEX_GITHUB_MODELS_URL,
    "https://raw.githubusercontent.com/openai/codex/refs/heads/main/codex-rs/models-manager/models.json"
  );
  assert.equal(seenUrl, CODEX_GITHUB_MODELS_URL);
  assert.deepEqual(
    models?.map((model) => model.id),
    ["gpt-5.6-terra"]
  );
});

test("codex.fetchCodexGithubCatalogModels reuses cached catalog with ETags", async () => {
  const calls: Array<{ url: string; ifNoneMatch?: string }> = [];
  const first = await fetchCodexGithubCatalogModels({
    now: 1000,
    cacheTtlMs: 100,
    fetchImpl: async (url, init) => {
      calls.push({ url, ifNoneMatch: init.headers["If-None-Match"] });
      return Response.json(
        {
          models: [
            {
              slug: "gpt-5.6-luna",
              display_name: "GPT-5.6-Luna",
              visibility: "list",
              supported_in_api: true,
              minimal_client_version: "0.142.0",
            },
          ],
        },
        { headers: { etag: "catalog-v1" } }
      );
    },
  });
  const second = await fetchCodexGithubCatalogModels({
    now: 1050,
    cacheTtlMs: 100,
    fetchImpl: async () => {
      throw new Error("cache hit should not fetch");
    },
  });
  const third = await fetchCodexGithubCatalogModels({
    now: 1200,
    cacheTtlMs: 100,
    fetchImpl: async (url, init) => {
      calls.push({ url, ifNoneMatch: init.headers["If-None-Match"] });
      return new Response(null, { status: 304 });
    },
  });

  assert.deepEqual(
    first?.map((model) => model.id),
    ["gpt-5.6-luna"]
  );
  assert.deepEqual(
    second?.map((model) => model.id),
    ["gpt-5.6-luna"]
  );
  assert.deepEqual(
    third?.map((model) => model.id),
    ["gpt-5.6-luna"]
  );
  assert.deepEqual(calls, [
    { url: CODEX_GITHUB_MODELS_URL, ifNoneMatch: undefined },
    { url: CODEX_GITHUB_MODELS_URL, ifNoneMatch: "catalog-v1" },
  ]);
});

// ── host wiring guard ────────────────────────────────────────────────────────

test("route.ts imports the discovery leaves and no longer declares the moved consts", () => {
  const route = fs.readFileSync(
    path.join("src", "app", "api", "providers", "[id]", "models", "route.ts"),
    "utf-8"
  );
  for (const leaf of ["helpers", "normalizers", "providerSets", "providerModelsConfig", "codex"]) {
    assert.match(
      route,
      new RegExp(`from "\\./discovery/${leaf}"`),
      `route must import ./discovery/${leaf}`
    );
  }
  assert.doesNotMatch(
    route,
    /const PROVIDER_MODELS_CONFIG\s*:/,
    "PROVIDER_MODELS_CONFIG must live in the leaf, not route.ts"
  );
  assert.doesNotMatch(
    route,
    /const NAMED_OPENAI_STYLE_PROVIDERS\s*=/,
    "NAMED_OPENAI_STYLE_PROVIDERS must live in the leaf, not route.ts"
  );
});
