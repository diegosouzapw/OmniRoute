/**
 * Features-block tests.
 *
 * Covers the v0.1.0 `features` toggle block + the enrichment / compression
 * metadata fetchers + the MCP auto-emit branch on the config hook.
 *
 * Surfaces tested:
 *   - `parseOmniRoutePluginOptions({ features: ... })`  → schema accept/reject
 *   - `applyEnrichment(model, entry)`                   → mutation semantics
 *   - `formatCompressionPipeline(steps)`                → display formatting
 *   - `createOmniRouteProviderHook` with mocked
 *     `enrichmentFetcher` / `compressionMetaFetcher`    → overlay applied,
 *                                                         off-by-default
 *                                                         gating works.
 *   - `createOmniRouteConfigHook` with `features.mcpAutoEmit:true`
 *                                                       → emits mcp entry
 *                                                       → falls back to
 *                                                         provider apiKey
 *                                                         when mcpToken
 *                                                         is unset
 *                                                       → respects operator
 *                                                         override
 *                                                       → no emit when
 *                                                         mcpAutoEmit is
 *                                                         false / unset
 */

import test from "node:test";
import assert from "node:assert/strict";

import {
  applyEnrichment,
  createOmniRouteConfigHook,
  createOmniRouteProviderHook,
  defaultOmniRouteEnrichmentFetcher,
  defaultOmniRouteCompressionMetaFetcher,
  formatCompressionPipeline,
  parseOmniRoutePluginOptions,
  type OmniRouteEnrichmentMap,
  type OmniRouteCompressionCombo,
  type OmniRouteRawModelEntry,
} from "../src/index.js";

// ─────────────────────────────────────────────────────────────────────────
// Zod schema — features block
// ─────────────────────────────────────────────────────────────────────────

test("parseOmniRoutePluginOptions: empty features object → preserved", () => {
  const r = parseOmniRoutePluginOptions({ features: {} });
  assert.deepEqual(r, { features: {} });
});

test("parseOmniRoutePluginOptions: all boolean features set → preserved", () => {
  const r = parseOmniRoutePluginOptions({
    features: {
      combos: true,
      enrichment: true,
      compressionMetadata: true,
      geminiSanitization: true,
      mcpAutoEmit: true,
      fetchInterceptor: true,
    },
  });
  assert.equal(r.features?.combos, true);
  assert.equal(r.features?.enrichment, true);
  assert.equal(r.features?.compressionMetadata, true);
  assert.equal(r.features?.mcpAutoEmit, true);
});

test("parseOmniRoutePluginOptions: mcpToken string → preserved", () => {
  const r = parseOmniRoutePluginOptions({
    features: { mcpAutoEmit: true, mcpToken: "sk-mcp-only-token-12345" },
  });
  assert.equal(r.features?.mcpToken, "sk-mcp-only-token-12345");
});

test("parseOmniRoutePluginOptions: unknown features key → throws (strict)", () => {
  assert.throws(
    () =>
      parseOmniRoutePluginOptions({
        features: { combos: true, unknown_field: "oops" },
      }),
    /Invalid @omniroute\/opencode-plugin options/
  );
});

test("parseOmniRoutePluginOptions: non-boolean for boolean feature → throws", () => {
  assert.throws(
    () =>
      parseOmniRoutePluginOptions({
        features: { combos: "yes" as unknown as boolean },
      }),
    /Invalid @omniroute\/opencode-plugin options/
  );
});

test("parseOmniRoutePluginOptions: empty mcpToken → throws (min 1)", () => {
  assert.throws(
    () => parseOmniRoutePluginOptions({ features: { mcpToken: "" } }),
    /Invalid @omniroute\/opencode-plugin options/
  );
});

// ─────────────────────────────────────────────────────────────────────────
// applyEnrichment
// ─────────────────────────────────────────────────────────────────────────

const baseModel = () => ({
  id: "claude-sonnet-4-6",
  name: "claude-sonnet-4-6",
  capabilities: {
    temperature: true,
    reasoning: false,
    attachment: false,
    toolcall: false,
    input: { text: true, audio: false, image: false, video: false, pdf: false },
    output: { text: true, audio: false, image: false, video: false, pdf: false },
    interleaved: false,
  },
  cost: { input: 0, output: 0, cache: { read: 0, write: 0 } },
  limit: { context: 200000, output: 64000 },
  status: "active" as const,
  options: {},
  headers: {},
  release_date: "",
  providerID: "omniroute",
  api: {
    id: "openai-compatible" as const,
    url: "https://or.example.com/v1",
    npm: "@ai-sdk/openai-compatible",
  },
});

test("applyEnrichment: undefined entry → no-op", () => {
  const m = baseModel();
  const orig = JSON.parse(JSON.stringify(m));
  applyEnrichment(m as never, undefined);
  assert.deepEqual(m, orig);
});

test("applyEnrichment: name overlay applied", () => {
  const m = baseModel();
  applyEnrichment(m as never, { name: "Claude Sonnet 4.6" });
  assert.equal(m.name, "Claude Sonnet 4.6");
});

test("applyEnrichment: empty name string ignored", () => {
  const m = baseModel();
  applyEnrichment(m as never, { name: "   " });
  assert.equal(m.name, "claude-sonnet-4-6"); // raw id untouched
});

test("applyEnrichment: pricing fields applied to cost", () => {
  const m = baseModel();
  applyEnrichment(m as never, {
    pricing: { input: 3, output: 15, cacheRead: 0.3, cacheWrite: 3.75 },
  });
  assert.equal(m.cost.input, 3);
  assert.equal(m.cost.output, 15);
  assert.equal(m.cost.cache.read, 0.3);
  assert.equal(m.cost.cache.write, 3.75);
});

test("applyEnrichment: partial pricing preserves untouched fields", () => {
  const m = baseModel();
  m.cost = { input: 1, output: 2, cache: { read: 0.1, write: 0.2 } };
  applyEnrichment(m as never, { pricing: { input: 99 } });
  assert.equal(m.cost.input, 99);
  assert.equal(m.cost.output, 2);
  assert.equal(m.cost.cache.read, 0.1);
});

// ─────────────────────────────────────────────────────────────────────────
// formatCompressionPipeline
// ─────────────────────────────────────────────────────────────────────────

test("formatCompressionPipeline: empty pipeline → empty string", () => {
  assert.equal(formatCompressionPipeline([]), "");
});

test("formatCompressionPipeline: single step with intensity", () => {
  assert.equal(
    formatCompressionPipeline([{ engine: "caveman", intensity: "full" }]),
    "[caveman:full]"
  );
});

test("formatCompressionPipeline: multi-step pipeline", () => {
  assert.equal(
    formatCompressionPipeline([
      { engine: "rtk", intensity: "standard" },
      { engine: "caveman", intensity: "full" },
    ]),
    "[rtk:standard → caveman:full]"
  );
});

test("formatCompressionPipeline: step without intensity", () => {
  assert.equal(formatCompressionPipeline([{ engine: "rtk" }]), "[rtk]");
});

// ─────────────────────────────────────────────────────────────────────────
// Provider hook — enrichment applied via injected fetcher
// ─────────────────────────────────────────────────────────────────────────

const SAMPLE_RAW: OmniRouteRawModelEntry[] = [
  {
    id: "claude-sonnet-4-6",
    object: "model",
    created: 0,
    owned_by: "anthropic",
    permission: [],
    root: "claude-sonnet-4-6",
    parent: null,
    context_length: 200000,
    max_output_tokens: 64000,
    input_modalities: ["text", "image"],
    output_modalities: ["text"],
    capabilities: { tool_calling: true, reasoning: true, vision: true, thinking: true },
  },
];

const apiAuth = (key: string) => ({ type: "api" as const, key });

test("provider hook: enrichment fetcher called when features.enrichment !== false", async () => {
  let called = 0;
  const enrichment: OmniRouteEnrichmentMap = new Map([
    ["claude-sonnet-4-6", { name: "Claude Sonnet 4.6", pricing: { input: 3, output: 15 } }],
  ]);
  const hook = createOmniRouteProviderHook(
    { providerId: "omniroute", baseURL: "https://or.example.com/v1" },
    {
      fetcher: async () => SAMPLE_RAW,
      combosFetcher: async () => [],
      enrichmentFetcher: async () => {
        called++;
        return enrichment;
      },
    }
  );
  const out = await hook.models!({} as never, { auth: apiAuth("sk") as never });
  assert.equal(called, 1, "enrichment fetcher called once");
  const m = out["claude-sonnet-4-6"];
  assert.equal(m.name, "Claude Sonnet 4.6", "enrichment name overlay applied");
  assert.equal(m.cost.input, 3, "enrichment pricing applied");
  assert.equal(m.cost.output, 15);
});

test("provider hook: enrichment fetcher NOT called when features.enrichment:false", async () => {
  let called = 0;
  const hook = createOmniRouteProviderHook(
    {
      providerId: "omniroute",
      baseURL: "https://or.example.com/v1",
      features: { enrichment: false },
    },
    {
      fetcher: async () => SAMPLE_RAW,
      combosFetcher: async () => [],
      enrichmentFetcher: async () => {
        called++;
        return new Map();
      },
    }
  );
  const out = await hook.models!({} as never, { auth: apiAuth("sk") as never });
  assert.equal(called, 0, "enrichment fetcher NOT called when gated off");
  assert.equal(out["claude-sonnet-4-6"].name, "claude-sonnet-4-6", "raw id preserved");
});

test("provider hook: compression metadata fetcher NOT called by default (opt-in)", async () => {
  let called = 0;
  const hook = createOmniRouteProviderHook(
    { providerId: "omniroute", baseURL: "https://or.example.com/v1" },
    {
      fetcher: async () => SAMPLE_RAW,
      combosFetcher: async () => [],
      enrichmentFetcher: async () => new Map(),
      compressionMetaFetcher: async () => {
        called++;
        return [];
      },
    }
  );
  await hook.models!({} as never, { auth: apiAuth("sk") as never });
  assert.equal(called, 0, "compression metadata is opt-in (features.compressionMetadata:true)");
});

test("provider hook: compression metadata fetcher called when opted in", async () => {
  let called = 0;
  const compressionCombos: OmniRouteCompressionCombo[] = [
    {
      id: "default-caveman",
      name: "Standard Savings",
      pipeline: [
        { engine: "rtk", intensity: "standard" },
        { engine: "caveman", intensity: "full" },
      ],
      isDefault: true,
    },
  ];
  const hook = createOmniRouteProviderHook(
    {
      providerId: "omniroute",
      baseURL: "https://or.example.com/v1",
      features: { compressionMetadata: true },
    },
    {
      fetcher: async () => SAMPLE_RAW,
      combosFetcher: async () => [
        {
          id: "claude-primary",
          name: "Claude Primary",
          models: [{ id: "step-1", model: "claude-sonnet-4-6" }],
        },
      ],
      enrichmentFetcher: async () => new Map(),
      compressionMetaFetcher: async () => {
        called++;
        return compressionCombos;
      },
    }
  );
  const out = await hook.models!({} as never, { auth: apiAuth("sk") as never });
  assert.equal(called, 1, "compression metadata fetcher called");
  const combo = out["claude-primary"];
  assert.ok(combo, "combo entry present");
  assert.match(combo.name, /\[rtk:standard → caveman:full\]/, "combo name decorated with pipeline");
});

// ─────────────────────────────────────────────────────────────────────────
// Config hook — MCP auto-emit
// ─────────────────────────────────────────────────────────────────────────

const stubAuthJson = (apiKey: string) => async () => ({
  omniroute: { type: "api" as const, key: apiKey },
});

test("config hook: MCP auto-emit OFF by default (no mcp entry)", async () => {
  const hook = createOmniRouteConfigHook(
    { providerId: "omniroute", baseURL: "https://or.example.com/v1" },
    {
      readAuthJson: stubAuthJson("sk-prod"),
      fetcher: async () => SAMPLE_RAW,
      combosFetcher: async () => [],
      logger: { warn: () => {} },
    }
  );
  const input: { provider?: Record<string, unknown>; mcp?: Record<string, unknown> } = {};
  await hook(input as never);
  assert.ok(input.provider?.omniroute, "provider block written");
  assert.equal(input.mcp, undefined, "no mcp block written");
});

test("config hook: features.mcpAutoEmit:true writes mcp entry with provider apiKey", async () => {
  const hook = createOmniRouteConfigHook(
    {
      providerId: "omniroute",
      baseURL: "https://or.example.com/v1",
      features: { mcpAutoEmit: true },
    },
    {
      readAuthJson: stubAuthJson("sk-prod-key"),
      fetcher: async () => SAMPLE_RAW,
      combosFetcher: async () => [],
      logger: { warn: () => {} },
    }
  );
  const input: { provider?: Record<string, unknown>; mcp?: Record<string, unknown> } = {};
  await hook(input as never);
  const entry = input.mcp?.omniroute as
    | { type: string; url: string; enabled: boolean; headers: Record<string, string> }
    | undefined;
  assert.ok(entry, "mcp entry written");
  assert.equal(entry.type, "remote");
  assert.equal(
    entry.url,
    "https://or.example.com/api/mcp/stream",
    "baseURL /v1 stripped to /api/mcp/stream"
  );
  assert.equal(entry.enabled, true);
  assert.equal(entry.headers.Authorization, "Bearer sk-prod-key");
});

test("config hook: features.mcpToken overrides provider apiKey in mcp Bearer", async () => {
  const hook = createOmniRouteConfigHook(
    {
      providerId: "omniroute",
      baseURL: "https://or.example.com/v1",
      features: { mcpAutoEmit: true, mcpToken: "sk-mcp-narrower" },
    },
    {
      readAuthJson: stubAuthJson("sk-chat"),
      fetcher: async () => SAMPLE_RAW,
      combosFetcher: async () => [],
      logger: { warn: () => {} },
    }
  );
  const input: { provider?: Record<string, unknown>; mcp?: Record<string, unknown> } = {};
  await hook(input as never);
  const entry = input.mcp?.omniroute as { headers: Record<string, string> };
  assert.equal(
    entry.headers.Authorization,
    "Bearer sk-mcp-narrower",
    "mcpToken takes precedence over apiKey"
  );
});

test("config hook: existing operator mcp.<providerId> wins (no overwrite)", async () => {
  const hook = createOmniRouteConfigHook(
    {
      providerId: "omniroute",
      baseURL: "https://or.example.com/v1",
      features: { mcpAutoEmit: true },
    },
    {
      readAuthJson: stubAuthJson("sk-prod"),
      fetcher: async () => SAMPLE_RAW,
      combosFetcher: async () => [],
      logger: { warn: () => {} },
    }
  );
  const input: { provider?: Record<string, unknown>; mcp?: Record<string, unknown> } = {
    mcp: { omniroute: { type: "custom-user-entry", url: "https://manual.example/mcp" } },
  };
  await hook(input as never);
  assert.deepEqual(
    input.mcp?.omniroute,
    { type: "custom-user-entry", url: "https://manual.example/mcp" },
    "operator override preserved"
  );
});

test("config hook: features.mcpAutoEmit:true with /v1 in baseURL → strips correctly", async () => {
  const hook = createOmniRouteConfigHook(
    {
      providerId: "omniroute-preprod",
      baseURL: "https://or-preprod.example.com/v1",
      features: { mcpAutoEmit: true },
    },
    {
      readAuthJson: async () => ({
        "omniroute-preprod": { type: "api" as const, key: "sk-preprod" },
      }),
      fetcher: async () => SAMPLE_RAW,
      combosFetcher: async () => [],
      logger: { warn: () => {} },
    }
  );
  const input: { provider?: Record<string, unknown>; mcp?: Record<string, unknown> } = {};
  await hook(input as never);
  const entry = input.mcp?.["omniroute-preprod"] as { url: string };
  assert.equal(
    entry.url,
    "https://or-preprod.example.com/api/mcp/stream",
    "/v1 stripped, /api/mcp/stream appended"
  );
});

// ─────────────────────────────────────────────────────────────────────────
// Default fetchers — soft-fail behavior (no real network)
// ─────────────────────────────────────────────────────────────────────────

test("defaultOmniRouteEnrichmentFetcher: empty baseURL → empty map", async () => {
  const m = await defaultOmniRouteEnrichmentFetcher("", "sk", 100);
  assert.equal(m.size, 0);
});

test("defaultOmniRouteEnrichmentFetcher: empty apiKey → empty map", async () => {
  const m = await defaultOmniRouteEnrichmentFetcher("https://or.example.com", "", 100);
  assert.equal(m.size, 0);
});

test("defaultOmniRouteCompressionMetaFetcher: empty baseURL → empty array", async () => {
  const arr = await defaultOmniRouteCompressionMetaFetcher("", "sk", 100);
  assert.equal(arr.length, 0);
});
