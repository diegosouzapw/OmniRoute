import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import type { Server } from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import {
  buildOmniRouteOpenCodeConfig,
  createOmniRouteAgentBlock,
  createOmniRouteComboConfig,
  createOmniRouteMCPEntry,
  createOmniRouteModesBlock,
  createOmniRouteProvider,
  fetchLiveModels,
  listCombos,
  mergeIntoExistingConfig,
  normalizeBaseURL,
  OMNIROUTE_DEFAULT_MODEL_CAPABILITIES,
  OMNIROUTE_DEFAULT_MODEL_CONTEXT_LENGTHS,
  OMNIROUTE_DEFAULT_OPENCODE_MODELS,
  OMNIROUTE_MCP_DEFAULT_SCOPES,
  OMNIROUTE_PROVIDER_NPM,
  OPENCODE_CONFIG_SCHEMA,
} from "../src/index.ts";

test("normalizeBaseURL preserves a bare host:port", () => {
  assert.equal(normalizeBaseURL("http://localhost:20128"), "http://localhost:20128/v1");
});

test("normalizeBaseURL strips trailing slashes", () => {
  assert.equal(normalizeBaseURL("http://localhost:20128////"), "http://localhost:20128/v1");
});

test("normalizeBaseURL deduplicates an existing /v1 suffix", () => {
  assert.equal(normalizeBaseURL("http://localhost:20128/v1"), "http://localhost:20128/v1");
  assert.equal(normalizeBaseURL("http://localhost:20128/v1/"), "http://localhost:20128/v1");
});

test("normalizeBaseURL rejects empty input", () => {
  assert.throws(() => normalizeBaseURL("   "), /baseURL is required/);
});

test("normalizeBaseURL rejects malformed URLs", () => {
  assert.throws(() => normalizeBaseURL("not a url"), /not a valid URL/);
});

test("createOmniRouteProvider validates required fields", () => {
  assert.throws(
    () => createOmniRouteProvider({ baseURL: "", apiKey: "x" } as never),
    /baseURL is required/
  );
  assert.throws(
    () => createOmniRouteProvider({ baseURL: "http://x", apiKey: "" } as never),
    /apiKey is required/
  );
});

test("createOmniRouteProvider produces the OpenCode-compatible shape", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
  });

  assert.equal(provider.npm, OMNIROUTE_PROVIDER_NPM);
  assert.equal(provider.name, "OmniRoute");
  assert.equal(provider.options.baseURL, "http://localhost:20128/v1");
  assert.equal(provider.options.apiKey, "sk_omniroute");
  assert.equal(typeof provider.models, "object");
});

test("createOmniRouteProvider seeds the default model catalog", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
  });

  const modelIds = Object.keys(provider.models).sort();
  const defaultIds = [...OMNIROUTE_DEFAULT_OPENCODE_MODELS].sort();
  assert.deepEqual(modelIds, defaultIds);
  for (const id of defaultIds) {
    assert.equal(provider.models[id]?.name, id);
    assert.equal(provider.models[id]?.attachment, true);
  }
});

test("createOmniRouteProvider honours a custom models list and labels", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    models: ["auto", "claude-opus-4-7"],
    modelLabels: { auto: "Auto-Combo", "claude-opus-4-7": "Opus 4.7" },
  });

  assert.deepEqual(Object.keys(provider.models), ["auto", "claude-opus-4-7"]);
  assert.equal(provider.models.auto.name, "Auto-Combo");
  assert.equal(provider.models["claude-opus-4-7"].name, "Opus 4.7");
});

test("createOmniRouteProvider deduplicates and trims model ids", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    models: ["  auto  ", "auto", "", "claude-opus-4-7"],
  });
  assert.deepEqual(Object.keys(provider.models), ["auto", "claude-opus-4-7"]);
});

test("createOmniRouteProvider honours displayName override", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    displayName: "Local OmniRoute",
  });
  assert.equal(provider.name, "Local OmniRoute");
});

test("buildOmniRouteOpenCodeConfig wraps the provider with the OpenCode schema", () => {
  const doc = buildOmniRouteOpenCodeConfig({
    baseURL: "http://localhost:20128/v1",
    apiKey: "sk_omniroute",
  });

  assert.equal(doc.$schema, OPENCODE_CONFIG_SCHEMA);
  assert.equal(typeof doc.provider.omniroute, "object");
  assert.equal(doc.provider.omniroute.options.baseURL, "http://localhost:20128/v1");
});

test("config document is JSON-serialisable", () => {
  const doc = buildOmniRouteOpenCodeConfig({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
  });
  const round = JSON.parse(JSON.stringify(doc));
  assert.deepEqual(round, doc);
});

test("buildOmniRouteOpenCodeConfig emits model and small_model prefixed with provider key", () => {
  const doc = buildOmniRouteOpenCodeConfig({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    model: "claude-sonnet-4-5-thinking",
    smallModel: "gemini-3-flash",
  });
  assert.equal(doc.model, "omniroute/claude-sonnet-4-5-thinking");
  assert.equal(doc.small_model, "omniroute/gemini-3-flash");
});

test("buildOmniRouteOpenCodeConfig omits model and small_model when not supplied", () => {
  const doc = buildOmniRouteOpenCodeConfig({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
  });
  assert.equal(doc.model, undefined);
  assert.equal(doc.small_model, undefined);
  assert.ok(!("model" in doc));
  assert.ok(!("small_model" in doc));
});

test("buildOmniRouteOpenCodeConfig ignores blank model strings", () => {
  const doc = buildOmniRouteOpenCodeConfig({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    model: "   ",
    smallModel: "",
  });
  assert.ok(!("model" in doc));
  assert.ok(!("small_model" in doc));
});

test("mergeIntoExistingConfig preserves existing provider entries", () => {
  const existing = {
    $schema: OPENCODE_CONFIG_SCHEMA,
    provider: {
      anthropic: { npm: "@ai-sdk/anthropic", name: "Anthropic", options: {}, models: {} },
    },
    keybinds: { submit: "enter" },
  };
  const result = mergeIntoExistingConfig(existing, {
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
  });
  assert.ok("anthropic" in (result.provider as Record<string, unknown>));
  assert.ok("omniroute" in (result.provider as Record<string, unknown>));
  assert.deepEqual((result as Record<string, unknown>).keybinds, { submit: "enter" });
});

test("mergeIntoExistingConfig overwrites existing omniroute entry", () => {
  const existing = {
    provider: {
      omniroute: {
        npm: "@ai-sdk/openai-compatible",
        name: "OLD",
        options: { baseURL: "http://old/v1", apiKey: "old" },
        models: {},
      },
    },
  };
  const result = mergeIntoExistingConfig(existing, {
    baseURL: "http://new",
    apiKey: "new-key",
    displayName: "NEW",
  });
  const omniroute = (result.provider as Record<string, unknown>).omniroute as { name: string };
  assert.equal(omniroute.name, "NEW");
});

test("mergeIntoExistingConfig writes model and small_model when supplied", () => {
  const result = mergeIntoExistingConfig(
    {},
    {
      baseURL: "http://localhost:20128",
      apiKey: "sk_omniroute",
      model: "claude-sonnet-4-5-thinking",
      smallModel: "gemini-3-flash",
    }
  );
  assert.equal(result.model, "omniroute/claude-sonnet-4-5-thinking");
  assert.equal(result.small_model, "omniroute/gemini-3-flash");
});

test("mergeIntoExistingConfig does not add model keys when not supplied", () => {
  const result = mergeIntoExistingConfig(
    {},
    { baseURL: "http://localhost:20128", apiKey: "sk_omniroute" }
  );
  assert.ok(!("model" in result));
  assert.ok(!("small_model" in result));
});

test("OMNIROUTE_MCP_DEFAULT_SCOPES contains 7 read-only scopes", () => {
  assert.equal(OMNIROUTE_MCP_DEFAULT_SCOPES.length, 7);
  assert.ok(OMNIROUTE_MCP_DEFAULT_SCOPES.every((s) => s.startsWith("read:")));
});

test("createOmniRouteMCPEntry defaults to tsx runtime", () => {
  const entry = createOmniRouteMCPEntry({
    serverPath: "/path/to/server.ts",
    apiKey: "sk_omniroute",
  });
  assert.equal(entry.command, "npx");
  assert.deepEqual(entry.args, ["tsx", "/path/to/server.ts"]);
  assert.equal(entry.env.OMNIROUTE_API_KEY, "sk_omniroute");
  assert.ok(!("OMNIROUTE_MCP_ENFORCE_SCOPES" in entry.env));
  assert.ok(!("OMNIROUTE_MANAGEMENT_API_KEY" in entry.env));
});

test("createOmniRouteMCPEntry uses node runtime when specified", () => {
  const entry = createOmniRouteMCPEntry({
    serverPath: "/path/to/server.js",
    apiKey: "sk_omniroute",
    runtime: "node",
  });
  assert.equal(entry.command, "node");
  assert.deepEqual(entry.args, ["/path/to/server.js"]);
});

test("createOmniRouteMCPEntry sets management key and scopes when supplied", () => {
  const entry = createOmniRouteMCPEntry({
    serverPath: "/path/to/server.ts",
    apiKey: "sk_omniroute",
    managementApiKey: "sk_manage",
    scopes: ["read:health", "read:combos", "execute:completions"],
  });
  assert.equal(entry.env.OMNIROUTE_MANAGEMENT_API_KEY, "sk_manage");
  assert.equal(entry.env.OMNIROUTE_MCP_ENFORCE_SCOPES, "true");
  assert.equal(entry.env.OMNIROUTE_MCP_SCOPES, "read:health,read:combos,execute:completions");
});

test("createOmniRouteMCPEntry rejects missing required fields", () => {
  assert.throws(
    () => createOmniRouteMCPEntry({ serverPath: "", apiKey: "x" }),
    /serverPath is required/
  );
  assert.throws(
    () => createOmniRouteMCPEntry({ serverPath: "/p", apiKey: "" }),
    /apiKey is required/
  );
});

function startMockServer(
  handler: (path: string) => unknown
): Promise<{ url: string; close: () => void }> {
  return new Promise((resolve) => {
    const server: Server = createServer((req, res) => {
      const body = JSON.stringify(handler(req.url ?? ""));
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(body);
    });
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address() as { port: number };
      resolve({ url: `http://127.0.0.1:${addr.port}`, close: () => server.close() });
    });
  });
}

test("fetchLiveModels handles array envelope", async () => {
  const { url, close } = await startMockServer(() => [
    { id: "claude-sonnet", name: "Claude Sonnet" },
    { id: "gemini-flash", displayName: "Gemini Flash" },
  ]);
  try {
    const models = await fetchLiveModels(url, "sk_test");
    assert.equal(models.length, 2);
    assert.equal(models[0].id, "claude-sonnet");
    assert.equal(models[0].name, "Claude Sonnet");
    assert.equal(models[1].id, "gemini-flash");
    assert.equal(models[1].name, "Gemini Flash");
  } finally {
    close();
  }
});

test("fetchLiveModels handles data-envelope and snake_case fields", async () => {
  const { url, close } = await startMockServer(() => ({
    data: [{ model_id: "gpt-4o", display_name: "GPT-4o" }],
  }));
  try {
    const models = await fetchLiveModels(url, "sk_test");
    assert.equal(models.length, 1);
    assert.equal(models[0].id, "gpt-4o");
    assert.equal(models[0].name, "GPT-4o");
  } finally {
    close();
  }
});

test("fetchLiveModels falls back to id as name when no name field", async () => {
  const { url, close } = await startMockServer(() => [{ id: "auto" }]);
  try {
    const models = await fetchLiveModels(url, "sk_test");
    assert.equal(models[0].name, "auto");
  } finally {
    close();
  }
});

test("listCombos normalises compressionOverride", async () => {
  const { url, close } = await startMockServer(() => ({
    combos: [
      {
        id: "c1",
        name: "Primary",
        strategy: "priority",
        active: true,
        compressionOverride: "standard",
      },
      {
        id: "c2",
        name: "Cheap",
        strategy: "weighted",
        active: false,
        compressionOverride: "unknown-value",
      },
      { id: "c3", name: "Off", strategy: "round-robin", active: true, compressionOverride: "" },
    ],
  }));
  try {
    const combos = await listCombos(url, "sk_manage");
    assert.equal(combos.length, 3);
    assert.equal(combos[0].compressionOverride, "standard");
    assert.equal(combos[1].compressionOverride, "");
    assert.equal(combos[2].compressionOverride, "");
  } finally {
    close();
  }
});

test("createOmniRouteComboConfig builds minimal payload", () => {
  const payload = createOmniRouteComboConfig({ name: "my-combo", strategy: "priority" });
  assert.equal(payload.name, "my-combo");
  assert.equal(payload.strategy, "priority");
  assert.equal(payload.active, true);
  assert.ok(!("compressionOverride" in payload));
  assert.ok(!("providers" in payload));
});

test("createOmniRouteComboConfig includes optional fields when supplied", () => {
  const payload = createOmniRouteComboConfig({
    name: "full",
    strategy: "weighted",
    compressionOverride: "aggressive",
    active: false,
    providers: ["provider-a", "provider-b"],
  });
  assert.equal(payload.compressionOverride, "aggressive");
  assert.equal(payload.active, false);
  assert.deepEqual(payload.providers, ["provider-a", "provider-b"]);
});

test("OMNIROUTE_DEFAULT_OPENCODE_MODELS includes cc/ prefixed models", () => {
  const defaults = [...OMNIROUTE_DEFAULT_OPENCODE_MODELS];
  assert.ok(defaults.includes("cc/claude-opus-4-8"));
  assert.ok(
    defaults.some((m) => m.startsWith("cc/")),
    "should have cc/ prefixed models"
  );
  assert.ok(defaults.length >= 7, "should have at least 7 models");
});

test("OMNIROUTE_DEFAULT_MODEL_CONTEXT_LENGTHS covers every default model id", () => {
  for (const id of OMNIROUTE_DEFAULT_OPENCODE_MODELS) {
    const ctx = OMNIROUTE_DEFAULT_MODEL_CONTEXT_LENGTHS[id];
    assert.ok(
      typeof ctx === "number" && ctx > 0,
      `default context_length for ${id} missing — should be a positive number`
    );
    // Sanity: context should be at least 8K, at most 2M tokens
    assert.ok(ctx >= 8_000, `${id} context_length ${ctx} seems too low`);
    assert.ok(ctx <= 2_000_000, `${id} context_length ${ctx} seems too high`);
  }
});

test("createOmniRouteProvider emits limit.context on default model entries", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
  });
  const entry = provider.models["cc/claude-opus-4-8"];
  assert.ok(entry.limit, "model entry should have a limit field");
  assert.equal(entry.limit!.context, 1_000_000);
  assert.equal(provider.models["cc/claude-opus-4-7"].limit!.context, 1_000_000);
});

test("createOmniRouteProvider omits limit.context for unknown model ids", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    models: ["completely-unknown-model"],
  });
  const entry = provider.models["completely-unknown-model"];
  assert.equal(entry.limit, undefined);
});

test("createOmniRouteProvider reads contextLength from a live model entry for ids absent from the static map", () => {
  // #3298 regression guard: the static OMNIROUTE_DEFAULT_MODEL_CONTEXT_LENGTHS
  // map only covers the legacy 8 Claude/Gemini ids. Before this change, any
  // other model got `undefined` context (see the test above, string form) and
  // OpenCode silently fell back to its 128K internal default. A live model
  // entry carrying `contextLength` must now surface as `limit.context`.
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    models: [{ id: "completely-unknown-model", contextLength: 262_144 }],
  });
  const entry = provider.models["completely-unknown-model"];
  assert.ok(entry.limit, "a live contextLength should produce a limit field even for ids absent from the static map");
  assert.equal(entry.limit!.context, 262_144);
});

test("createOmniRouteProvider: a live model contextLength wins over the static default map", () => {
  // `cc/claude-opus-4-8` has a static default (1_000_000). A live entry carrying
  // a different contextLength must take precedence (live > modelContextLengths >
  // static defaults).
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    models: [{ id: "cc/claude-opus-4-8", contextLength: 524_288 }],
  });
  assert.equal(provider.models["cc/claude-opus-4-8"].limit!.context, 524_288);
});

test("createOmniRouteProvider serialises limit.context to JSON", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
  });
  const round = JSON.parse(JSON.stringify(provider));
  for (const id of OMNIROUTE_DEFAULT_OPENCODE_MODELS) {
    const expectedContext = OMNIROUTE_DEFAULT_MODEL_CONTEXT_LENGTHS[id];
    assert.equal(
      round.models[id].limit?.context,
      expectedContext,
      `${id} should serialise limit.context=${expectedContext}`
    );
  }
});

test("fetchLiveModels extracts context_length from snake_case field", async () => {
  const { url, close } = await startMockServer(() => ({
    data: [
      { id: "cc/claude-opus-4-7", name: "Claude Opus 4.7", context_length: 200_000 },
      { id: "gemini-3.1-pro-high", name: "Gemini 3.1 Pro", context_length: 1_000_000 },
      { id: "no-context", name: "No Context" },
    ],
  }));
  try {
    const models = await fetchLiveModels(url, "sk_test");
    const claude = models.find((m) => m.id === "cc/claude-opus-4-7");
    assert.ok(claude, "claude model should be present");
    assert.equal(claude!.contextLength, 200_000);
    const gemini = models.find((m) => m.id === "gemini-3.1-pro-high");
    assert.equal(gemini!.contextLength, 1_000_000);
    const noCtx = models.find((m) => m.id === "no-context");
    assert.equal(noCtx!.contextLength, undefined);
  } finally {
    close();
  }
});

test("OMNIROUTE_DEFAULT_MODEL_CAPABILITIES covers every default model id", () => {
  for (const id of OMNIROUTE_DEFAULT_OPENCODE_MODELS) {
    const caps = OMNIROUTE_DEFAULT_MODEL_CAPABILITIES[id];
    assert.ok(caps, `default capabilities for ${id} missing`);
    assert.equal(caps.attachment, true, `${id} should default to attachment=true`);
    assert.equal(caps.tool_call, true, `${id} should default to tool_call=true`);
  }
});

test("createOmniRouteProvider emits default capability flags inline with the model entry", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
  });
  const entry = provider.models["cc/claude-opus-4-8"];
  assert.equal(entry.name, "cc/claude-opus-4-8");
  assert.equal(entry.attachment, true);
  assert.equal(entry.reasoning, true);
  assert.equal(entry.temperature, true);
  assert.equal(entry.tool_call, true);
});

test("createOmniRouteProvider modelCapabilities overrides defaults and merges per id", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    modelCapabilities: {
      "cc/claude-opus-4-7": { reasoning: false, label: "Opus (no thinking)" },
    },
  });
  const entry = provider.models["cc/claude-opus-4-7"];
  assert.equal(entry.name, "Opus (no thinking)");
  assert.equal(entry.reasoning, false);
  assert.equal(entry.attachment, true);
  assert.equal(entry.tool_call, true);
});

test("createOmniRouteProvider applies capability overrides to non-default model ids", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    models: ["custom-model"],
    modelCapabilities: {
      "custom-model": { attachment: false, tool_call: true, label: "Custom" },
    },
  });
  const entry = provider.models["custom-model"];
  assert.equal(entry.name, "Custom");
  assert.equal(entry.attachment, false);
  assert.equal(entry.tool_call, true);
  assert.equal(entry.reasoning, undefined);
  assert.equal(entry.temperature, undefined);
});

test("createOmniRouteProvider modelLabels still works when modelCapabilities omits label", () => {
  const provider = createOmniRouteProvider({
    baseURL: "http://localhost:20128",
    apiKey: "sk_omniroute",
    models: ["claude-opus-4-5-thinking"],
    modelLabels: { "claude-opus-4-5-thinking": "Opus 4.5 (legacy label)" },
  });
  assert.equal(provider.models["claude-opus-4-5-thinking"].name, "Opus 4.5 (legacy label)");
});

test("createOmniRouteAgentBlock builds provider-prefixed entries per role", () => {
  const block = createOmniRouteAgentBlock({
    roles: {
      build: { modelId: "claude-sonnet-4-5-thinking", temperature: 0.2 },
      plan: { modelId: "claude-opus-4-5-thinking", top_p: 0.95 },
      review: { modelId: "gemini-3-flash", temperature: 0.0 },
    },
  });
  assert.equal(block.build.model, "omniroute/claude-sonnet-4-5-thinking");
  assert.equal(block.build.temperature, 0.2);
  assert.equal(block.plan.model, "omniroute/claude-opus-4-5-thinking");
  assert.equal(block.plan.top_p, 0.95);
  assert.equal(block.review.model, "omniroute/gemini-3-flash");
  assert.equal(block.review.temperature, 0.0);
});

test("createOmniRouteAgentBlock omits optional fields when not supplied", () => {
  const block = createOmniRouteAgentBlock({
    roles: { build: { modelId: "claude-sonnet-4-5-thinking" } },
  });
  assert.equal(block.build.model, "omniroute/claude-sonnet-4-5-thinking");
  assert.ok(!("temperature" in block.build));
  assert.ok(!("top_p" in block.build));
  assert.ok(!("tools" in block.build));
  assert.ok(!("prompt" in block.build));
});

test("createOmniRouteAgentBlock skips roles with empty modelId", () => {
  const block = createOmniRouteAgentBlock({
    roles: {
      build: { modelId: "claude-sonnet-4-5-thinking" },
      plan: { modelId: "   " },
      review: { modelId: "" },
    },
  });
  assert.deepEqual(Object.keys(block), ["build"]);
});

test("createOmniRouteAgentBlock emits tools as Record<string, boolean> per OC schema", () => {
  const block = createOmniRouteAgentBlock({
    roles: {
      build: {
        modelId: "claude-sonnet-4-5-thinking",
        tools: { edit: true, bash: true, web: false },
        prompt: "Edit files carefully.",
      },
    },
  });
  assert.deepEqual(block.build.tools, { edit: true, bash: true, web: false });
  assert.equal(block.build.prompt, "Edit files carefully.");
});

test("createOmniRouteAgentBlock filters invalid tool entries and omits empty maps", () => {
  const block = createOmniRouteAgentBlock({
    roles: {
      build: {
        modelId: "claude-sonnet-4-5-thinking",
        // @ts-expect-error — exercising runtime guard against bad input
        tools: { edit: true, bash: "yes", "": true, web: null },
      },
      plan: {
        modelId: "claude-opus-4-5-thinking",
        tools: {},
      },
    },
  });
  assert.deepEqual(block.build.tools, { edit: true });
  assert.ok(!("tools" in block.plan));
});

test("createOmniRouteModesBlock builds provider-prefixed mode entries", () => {
  const block = createOmniRouteModesBlock({
    modes: {
      build: { modelId: "claude-sonnet-4-5-thinking", tools: { edit: true, bash: true } },
      plan: { modelId: "claude-opus-4-5-thinking", prompt: "Plan first, code later." },
      review: { modelId: "gemini-3-flash" },
    },
  });
  assert.equal(block.build.model, "omniroute/claude-sonnet-4-5-thinking");
  assert.deepEqual(block.build.tools, { edit: true, bash: true });
  assert.equal(block.plan.prompt, "Plan first, code later.");
  assert.equal(block.review.model, "omniroute/gemini-3-flash");
});

test("createOmniRouteModesBlock skips modes with empty modelId", () => {
  const block = createOmniRouteModesBlock({
    modes: {
      build: { modelId: "claude-sonnet-4-5-thinking" },
      plan: { modelId: "" },
    },
  });
  assert.deepEqual(Object.keys(block), ["build"]);
});

test("createOmniRouteModesBlock honours numeric overrides limited to OC schema", () => {
  const block = createOmniRouteModesBlock({
    modes: {
      build: {
        modelId: "claude-sonnet-4-5-thinking",
        temperature: 0.7,
        top_p: 0.9,
      },
    },
  });
  assert.equal(block.build.temperature, 0.7);
  assert.equal(block.build.top_p, 0.9);
});

// #3419 — soft-deprecation in favour of @omniroute/opencode-plugin. Guard the
// deprecation notice so it can't be silently dropped while the package is kept
// publishing (it still works; it is just no longer the recommended path).
test("package is marked deprecated in favour of @omniroute/opencode-plugin (#3419)", () => {
  const here = dirname(fileURLToPath(import.meta.url));
  const pkg = JSON.parse(readFileSync(join(here, "..", "package.json"), "utf8"));
  assert.match(pkg.description, /DEPRECATED/);
  assert.match(pkg.description, /@omniroute\/opencode-plugin/);

  const readme = readFileSync(join(here, "..", "README.md"), "utf8");
  assert.match(readme, /Deprecated/i);
  assert.match(readme, /@omniroute\/opencode-plugin/);
});
