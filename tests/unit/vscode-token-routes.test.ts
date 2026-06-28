import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vscode-token-routes-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "vscode-token-routes-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const vscodeRootRoute = await import("../../src/app/api/v1/vscode/[token]/route.ts");
const vscodeModelsRoute = await import("../../src/app/api/v1/vscode/[token]/models/route.ts");
const vscodeRawRootRoute = await import("../../src/app/api/v1/vscode/raw/[token]/route.ts");
const vscodeRawModelsRoute =
  await import("../../src/app/api/v1/vscode/raw/[token]/models/route.ts");
const vscodeRawVersionRoute =
  await import("../../src/app/api/v1/vscode/raw/[token]/api/version/route.ts");
const vscodeRawShowRoute =
  await import("../../src/app/api/v1/vscode/raw/[token]/api/show/route.ts");
const vscodeRawTagsRoute =
  await import("../../src/app/api/v1/vscode/raw/[token]/api/tags/route.ts");
const vscodeV1ModelsRoute = await import("../../src/app/api/v1/vscode/[token]/v1/models/route.ts");
const vscodeVersionRoute = await import("../../src/app/api/v1/vscode/[token]/api/version/route.ts");
const vscodeShowRoute = await import("../../src/app/api/v1/vscode/[token]/api/show/route.ts");
const vscodeTagsRoute = await import("../../src/app/api/v1/vscode/[token]/api/tags/route.ts");
const vscodeV1ChatCompletionsRoute =
  await import("../../src/app/api/v1/vscode/[token]/v1/chat/completions/route.ts");
const vscodeChatCompletionsRoute =
  await import("../../src/app/api/v1/vscode/[token]/chat/completions/route.ts");
const vscodeResponsesRoute = await import("../../src/app/api/v1/vscode/[token]/responses/route.ts");
const serviceTierVariants =
  await import("../../src/app/api/v1/vscode/[token]/serviceTierVariants.ts");
const combosDb = await import("../../src/lib/db/combos.ts");

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: (overrides.authType as string) || "apikey",
    name: (overrides.name as string) || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: (overrides.apiKey as string) || "sk-test",
    accessToken: overrides.accessToken as string | undefined,
    isActive: (overrides.isActive as boolean) ?? true,
    testStatus: (overrides.testStatus as string) || "active",
    providerSpecificData: (overrides.providerSpecificData as Record<string, unknown>) || {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("vscode tokenized root route mirrors the grouped VS Code catalog without combos", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("openai", { name: "openai-vscode-root" });
  const key = await apiKeysDb.createApiKey("vscode-root", "machine-vscode-root");
  await combosDb.createCombo({
    name: "root-hidden-combo",
    strategy: "priority",
    models: [],
  });

  const response = await vscodeRootRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/`)
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.data));
  assert.ok(body.data.length > 0);
  assert.equal(
    body.data.some(
      (entry: any) => entry.id === "root-hidden-combo" || entry.name === "root-hidden-combo"
    ),
    false
  );
});

test("vscode tokenized root route exposes friendly model names alongside ids", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-root-friendly-name" });
  const key = await apiKeysDb.createApiKey(
    "vscode-root-friendly-name",
    "machine-vscode-root-friendly-name"
  );

  const response = await vscodeRootRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/`)
  );
  const body = (await response.json()) as any;
  const model = (body.data || []).find((entry: any) => entry.id === "gpt-5.4__provider_cx");

  assert.equal(response.status, 200);
  assert.ok(model, "missing gpt-5.4__provider_cx in tokenized VS Code root route");
  assert.equal(model.name, "Codex GPT 5.4 (Default)");
});

test("vscode tokenized models route accepts path-scoped API keys", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("openai", { name: "openai-vscode-models" });
  const key = await apiKeysDb.createApiKey("vscode-models", "machine-vscode-models");

  const response = await vscodeModelsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/models`)
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.data));
  assert.ok(body.data.length > 0);
});

test("vscode tokenized combos route exposes configured combos via token alias", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });

  await seedConnection("codex", { name: "codex-vscode-combos-root-basic" });

  const key = await apiKeysDb.createApiKey("vscode-combos", "machine-vscode-combos");
  await combosDb.createCombo({
    name: "test-combo",
    strategy: "priority",
    models: [{ kind: "model", model: "codex/gpt-5.4-high", providerId: "codex" }],
  });

  const combosRoute =
    await import("../../src/app/api/v1/vscode/combos/[token]/[[...slug]]/route.ts");
  const response = await combosRoute.GET(
    new Request(`http://localhost/api/v1/vscode/combos/${encodeURIComponent(key.key)}`),
    { params: { token: key.key, slug: undefined } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.object, "list");
  assert.ok(Array.isArray(body.data), "expected data property to be an array");
  assert.ok(
    body.data.some((combo: any) => combo.name === "test-combo"),
    "expected test combo in data response"
  );
  assert.equal("combos" in body, false, "did not expect legacy combos property in response");
});

test("vscode combos route responds to Ollama compatibility check (/api/version)", async () => {
  const key = await apiKeysDb.createApiKey(
    "vscode-combos-version",
    "machine-vscode-combos-version"
  );

  const combosRoute =
    await import("../../src/app/api/v1/vscode/combos/[token]/[[...slug]]/route.ts");
  const response = await combosRoute.GET(
    new Request(`http://localhost/api/v1/vscode/combos/${encodeURIComponent(key.key)}/api/version`),
    { params: { token: key.key, slug: ["api", "version"] } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(body.version, "expected version property in response");
  assert.match(body.version as string, /0\.6\.\d+/, "expected Ollama-compatible version format");
});

test("vscode combos route exposes combos through Ollama api/tags", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });

  await seedConnection("codex", { name: "codex-vscode-combos-tags" });

  const key = await apiKeysDb.createApiKey("vscode-combos-tags", "machine-vscode-combos-tags");
  await combosDb.createCombo({
    name: "tags-combo",
    strategy: "priority",
    models: [{ kind: "model", model: "codex/gpt-5.4-high", providerId: "codex" }],
  });

  const combosRoute =
    await import("../../src/app/api/v1/vscode/combos/[token]/[[...slug]]/route.ts");
  const response = await combosRoute.GET(
    new Request(`http://localhost/api/v1/vscode/combos/${encodeURIComponent(key.key)}/api/tags`),
    { params: { token: key.key, slug: ["api", "tags"] } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.models), "expected models array in api/tags response");
  const combo = body.models.find((entry: any) => entry.name === "tags-combo");
  assert.ok(combo, "expected combo name in api/tags response");
  assert.equal(combo.details.family, "tags-combo");
  assert.deepEqual(combo.supportsReasoningEffort, ["none", "low", "medium", "high", "xhigh"]);
});

test("vscode combos route resolves combo names through Ollama api/show", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });

  await seedConnection("codex", { name: "codex-vscode-combos-show" });

  const key = await apiKeysDb.createApiKey("vscode-combos-show", "machine-vscode-combos-show");
  await combosDb.createCombo({
    name: "show-combo",
    strategy: "priority",
    models: [{ kind: "model", model: "codex/gpt-5.4-high", providerId: "codex" }],
  });

  const combosRoute =
    await import("../../src/app/api/v1/vscode/combos/[token]/[[...slug]]/route.ts");
  const response = await combosRoute.POST(
    new Request(`http://localhost/api/v1/vscode/combos/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "show-combo" }),
    }),
    { params: { token: key.key, slug: ["api", "show"] } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.model, "show-combo");
  assert.equal(body.modelfile, "FROM show-combo");
  assert.equal(body.details.family, "show-combo");
  assert.equal(body.model_info.context_length, 200000);
  assert.deepEqual(body.supportsReasoningEffort, ["none", "low", "medium", "high", "xhigh"]);
  assert.equal(body.model_info.capabilities.reasoning, true);
});

test("vscode tokenized combos root route exposes importable combo metadata", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });

  await seedConnection("codex", { name: "codex-vscode-combos-root" });
  const key = await apiKeysDb.createApiKey(
    "vscode-combos-root-rich",
    "machine-vscode-combos-root-rich"
  );
  await combosDb.createCombo({
    name: "balanced-load",
    strategy: "reset-aware",
    models: [{ kind: "model", model: "codex/gpt-5.4-high", providerId: "codex" }],
  });

  const combosRoute =
    await import("../../src/app/api/v1/vscode/combos/[token]/[[...slug]]/route.ts");
  const response = await combosRoute.GET(
    new Request(`http://localhost/api/v1/vscode/combos/${encodeURIComponent(key.key)}`),
    { params: { token: key.key, slug: undefined } }
  );
  const body = (await response.json()) as any;
  const combo = body.data.find((entry: any) => entry.id === "balanced-load");

  assert.equal(response.status, 200);
  assert.ok(combo, "expected balanced-load in combo root response");
  assert.equal(combo.url.includes("/responses#models.ai.azure.com"), true);
  assert.equal(combo.maxInputTokens, 200000);
  assert.equal(combo.maxOutputTokens, 131072);
  assert.equal(combo.toolCalling, true);
  assert.deepEqual(combo.supportsReasoningEffort, ["none", "low", "medium", "high", "xhigh"]);
});

test("vscode tokenized models route exposes reasoning effort metadata for importable chat models", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("github", {
    authType: "oauth",
    apiKey: null,
    accessToken: "gh-test-access-token",
    name: "github-vscode-models-reasoning",
  });
  const key = await apiKeysDb.createApiKey(
    "vscode-models-reasoning",
    "machine-vscode-models-reasoning"
  );

  const response = await vscodeModelsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/models`)
  );
  const body = (await response.json()) as any;
  const model = (body.data || []).find((entry: any) => entry.id === "gpt-5.4__provider_gh");

  assert.equal(response.status, 200);
  assert.ok(model, "missing gpt-5.4__provider_gh in tokenized VS Code models route");
  assert.equal(model.family, "gpt-5.4");
  assert.deepEqual(model.supportsReasoningEffort, ["none", "low", "medium", "high"]);
  assert.deepEqual(model.supportedReasoningEfforts, ["none", "low", "medium", "high", "xhigh"]);
  assert.deepEqual(model.configurationSchema?.properties?.reasoningEffort?.enum, [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
  ]);
  assert.equal(model.configurationSchema?.properties?.reasoningEffort?.default, "none");
  assert.equal(
    model.url,
    `http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/responses#models.ai.azure.com`
  );
});

test("vscode tokenized models route keeps xhigh for codex models that advertise it", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-models-reasoning" });
  const key = await apiKeysDb.createApiKey(
    "vscode-models-codex-reasoning",
    "machine-vscode-models-codex-reasoning"
  );

  const response = await vscodeModelsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/models`)
  );
  const body = (await response.json()) as any;
  const model = (body.data || []).find((entry: any) => entry.id === "gpt-5.4__provider_cx");
  const fastModel = (body.data || []).find(
    (entry: any) => entry.id === "gpt-5.4__provider_cx__tier_priority"
  );
  const flexModel = (body.data || []).find(
    (entry: any) => entry.id === "gpt-5.4__provider_cx__tier_flex"
  );

  assert.equal(response.status, 200);
  assert.ok(model, "missing gpt-5.4__provider_cx in tokenized VS Code models route");
  assert.ok(
    fastModel,
    "missing gpt-5.4__provider_cx__tier_priority in tokenized VS Code models route"
  );
  assert.ok(flexModel, "missing gpt-5.4__provider_cx__tier_flex in tokenized VS Code models route");
  assert.equal(model.name, "Codex GPT 5.4 (Default)");
  assert.equal(fastModel.name, "Codex GPT 5.4 (Fast)");
  assert.equal(flexModel.name, "Codex GPT 5.4 (Flex)");
  assert.equal(model.toolCalling, true);
  assert.equal(model.vision, true);
  assert.deepEqual(model.supportsReasoningEffort, ["none", "low", "medium", "high", "xhigh"]);
  assert.deepEqual(model.supportedReasoningEfforts, ["none", "low", "medium", "high", "xhigh"]);
  assert.equal(model.defaultReasoningEffort, "none");
  assert.deepEqual(model.configSchema?.properties?.reasoningEffort?.enum, [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
  ]);
  assert.equal(model.configSchema?.properties?.reasoningEffort?.default, "none");
  const importedIds = new Set((body.data || []).map((entry: any) => entry.id));
  assert.ok(!importedIds.has("cx/gpt-5.4"));
  assert.ok(!importedIds.has("cx/gpt-5.4__tier_priority"));
  assert.ok(!importedIds.has("cx/gpt-5.4__tier_flex"));
  assert.ok(!importedIds.has("codex/gpt-5.4"));
  assert.ok(!importedIds.has("cx/gpt-5.4-low"));
  assert.ok(!importedIds.has("cx/gpt-5.4-medium"));
  assert.ok(!importedIds.has("cx/gpt-5.4-high"));
  assert.ok(!importedIds.has("cx/gpt-5.4-xhigh"));
  assert.ok(!importedIds.has("cx/gpt-5.4-low__tier_priority"));
  assert.ok(!importedIds.has("cx/gpt-5.4-medium__tier_priority"));
  assert.ok(!importedIds.has("cx/gpt-5.4-xhigh__tier_flex"));
  assert.equal(
    model.url,
    `http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/responses#models.ai.azure.com`
  );
});

test("vscode tokenized raw models route exposes provider-native ids without family-first grouping", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-raw-models" });
  const key = await apiKeysDb.createApiKey(
    "vscode-raw-models-codex",
    "machine-vscode-raw-models-codex"
  );

  const response = await vscodeRawModelsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}/models`)
  );
  const body = (await response.json()) as any;
  const importedIds = new Set((body.data || []).map((entry: any) => entry.id));
  const defaultModel = (body.data || []).find((entry: any) => entry.id === "cx/gpt-5.4");
  const fastModel = (body.data || []).find(
    (entry: any) => entry.id === "cx/gpt-5.4__tier_priority"
  );
  const flexModel = (body.data || []).find((entry: any) => entry.id === "cx/gpt-5.4__tier_flex");

  assert.equal(response.status, 200);
  assert.ok(defaultModel, "missing cx/gpt-5.4 in raw VS Code models route");
  assert.ok(fastModel, "missing cx/gpt-5.4__tier_priority in raw VS Code models route");
  assert.ok(flexModel, "missing cx/gpt-5.4__tier_flex in raw VS Code models route");
  assert.equal(
    importedIds.size,
    (body.data || []).length,
    "raw VS Code models route should not duplicate model ids"
  );
  assert.ok(!importedIds.has("gpt-5.4__provider_cx"));
  assert.ok(!importedIds.has("gpt-5.4__provider_cx__tier_priority"));
  assert.ok(!importedIds.has("gpt-5.4__provider_cx__tier_flex"));
  assert.equal(defaultModel.object, "model");
  assert.equal(typeof defaultModel.created, "number");
  assert.equal(defaultModel.owned_by, "codex");
  assert.equal(defaultModel.name, "Codex GPT 5.4");
  assert.equal(typeof defaultModel.context_length, "number");
  assert.equal(typeof defaultModel.max_output_tokens, "number");
  assert.equal(typeof defaultModel.max_input_tokens, "number");
  assert.deepEqual(defaultModel.capabilities, {
    vision: true,
    tool_calling: true,
    reasoning: true,
    thinking: true,
  });
  assert.equal(defaultModel.url, undefined);
  assert.equal(defaultModel.toolCalling, undefined);
  assert.equal(defaultModel.vision, undefined);
  assert.equal(defaultModel.family, undefined);
  assert.equal(defaultModel.supportsReasoningEffort, undefined);
  assert.equal(defaultModel.supportedReasoningEfforts, undefined);
  assert.equal(defaultModel.defaultReasoningEffort, undefined);
  assert.equal(defaultModel.configurationSchema, undefined);
  assert.equal(defaultModel.configSchema, undefined);
  assert.equal(defaultModel.maxInputTokens, undefined);

  const lowModel = (body.data || []).find((entry: any) => entry.id === "cx/gpt-5.4-low");
  const mediumModel = (body.data || []).find((entry: any) => entry.id === "cx/gpt-5.4-medium");
  const highModel = (body.data || []).find((entry: any) => entry.id === "cx/gpt-5.4-high");
  const lowFastModel = (body.data || []).find(
    (entry: any) => entry.id === "cx/gpt-5.4-low__tier_priority"
  );
  const mediumFastModel = (body.data || []).find(
    (entry: any) => entry.id === "cx/gpt-5.4-medium__tier_priority"
  );
  const highFastModel = (body.data || []).find(
    (entry: any) => entry.id === "cx/gpt-5.4-high__tier_priority"
  );

  assert.ok(lowModel, "missing cx/gpt-5.4-low in raw VS Code models route");
  assert.ok(mediumModel, "missing cx/gpt-5.4-medium in raw VS Code models route");
  assert.ok(highModel, "missing cx/gpt-5.4-high in raw VS Code models route");
  assert.ok(lowFastModel, "missing cx/gpt-5.4-low__tier_priority in raw VS Code models route");
  assert.ok(
    mediumFastModel,
    "missing cx/gpt-5.4-medium__tier_priority in raw VS Code models route"
  );
  assert.ok(highFastModel, "missing cx/gpt-5.4-high__tier_priority in raw VS Code models route");
  assert.equal(lowModel.name, "Codex GPT 5.4 (Low)");
  assert.equal(lowFastModel.name, "Codex GPT 5.4 (Low) (Fast)");
  assert.equal(mediumFastModel.name, "Codex GPT 5.4 (Medium) (Fast)");
  assert.equal(highFastModel.name, "Codex GPT 5.4 (High) (Fast)");
  assert.equal(defaultModel.url, undefined);
  assert.equal(defaultModel.toolCalling, undefined);
  assert.equal(defaultModel.vision, undefined);
  assert.equal(defaultModel.family, undefined);
  assert.equal(defaultModel.supportsReasoningEffort, undefined);
  assert.equal(defaultModel.supportedReasoningEfforts, undefined);
  assert.equal(defaultModel.defaultReasoningEffort, undefined);
  assert.equal(defaultModel.configurationSchema, undefined);
  assert.equal(defaultModel.configSchema, undefined);
  assert.equal(defaultModel.maxInputTokens, undefined);
  assert.equal(typeof defaultModel.max_output_tokens, "number");
  assert.equal(typeof defaultModel.max_input_tokens, "number");
  assert.deepEqual(defaultModel.capabilities, {
    vision: true,
    tool_calling: true,
    reasoning: true,
    thinking: true,
  });
});

test("vscode tokenized raw root route mirrors the raw models catalog", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-raw-root" });
  const key = await apiKeysDb.createApiKey(
    "vscode-raw-root-codex",
    "machine-vscode-raw-root-codex"
  );

  const response = await vscodeRawRootRoute.GET(
    new Request(`http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}`),
    { params: { token: key.key } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.data));
  assert.ok(body.data.some((entry: any) => entry.id === "cx/gpt-5.4"));
  assert.ok(body.data.some((entry: any) => entry.id === "cx/gpt-5.4-low__tier_priority"));
});

test("vscode tokenized raw routes do not publish combo entries", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("openai", { name: "openai-vscode-raw-hide-combos" });
  const key = await apiKeysDb.createApiKey(
    "vscode-raw-hide-combos",
    "machine-vscode-raw-hide-combos"
  );
  await combosDb.createCombo({
    name: "raw-hidden-combo",
    strategy: "priority",
    models: [],
  });

  const response = await vscodeRawRootRoute.GET(
    new Request(`http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}`),
    { params: { token: key.key } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.data));
  assert.equal(
    body.data.some(
      (entry: any) => entry.id === "raw-hidden-combo" || entry.name === "raw-hidden-combo"
    ),
    false
  );
});

test("vscode tokenized raw tags route does not publish combo entries", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-raw-tags-no-combo" });
  const key = await apiKeysDb.createApiKey(
    "vscode-raw-tags-no-combo",
    "machine-vscode-raw-tags-no-combo"
  );
  await combosDb.createCombo({
    name: "raw-tags-hidden-combo",
    strategy: "priority",
    models: [{ kind: "model", model: "codex/gpt-5.4-high", providerId: "codex" }],
  });

  const response = await vscodeRawTagsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}/api/tags`),
    { params: { token: key.key } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.models));
  assert.equal(
    body.models.some((entry: any) => entry.name === "raw-tags-hidden-combo"),
    false
  );
});

test("vscode tokenized raw show route resolves reasoning and service-tier variants independently", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-raw-show-reasoning-tier" });
  const key = await apiKeysDb.createApiKey(
    "vscode-raw-show-reasoning-tier",
    "machine-vscode-raw-show-reasoning-tier"
  );

  const response = await vscodeRawShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "cx/gpt-5.4-low__tier_priority" }),
    }),
    { params: { token: key.key } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.model, "cx/gpt-5.4-low__tier_priority");
  assert.equal(body.remote_model, "Codex GPT 5.4 (Low) (Fast)");
  assert.equal(body.selectedReasoningEffort, "low");
  assert.equal(body.selected_reasoning_effort, "low");
  assert.equal(body.details.selectedReasoningEffort, "low");
  assert.equal(body.details.selected_reasoning_effort, "low");
});

test("vscode tokenized raw api/show does not resolve combo names", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-raw-show-no-combo" });
  const key = await apiKeysDb.createApiKey(
    "vscode-raw-show-no-combo",
    "machine-vscode-raw-show-no-combo"
  );
  await combosDb.createCombo({
    name: "raw-show-hidden-combo",
    strategy: "priority",
    models: [{ kind: "model", model: "codex/gpt-5.4-high", providerId: "codex" }],
  });

  const response = await vscodeRawShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "raw-show-hidden-combo" }),
    }),
    { params: { token: key.key } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 404);
  assert.equal(body.error, "Model not found: raw-show-hidden-combo");
});

test("vscode tokenized raw version route returns Ollama-compatible version", async () => {
  const response = await vscodeVersionRoute.GET();
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.match(body.version as string, /0\.6\.\d+/);
});

test("vscode tokenized models route prefixes the provider without duplicating brand names", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("gemini", { name: "gemini-vscode-models-labels" });
  const key = await apiKeysDb.createApiKey(
    "vscode-models-provider-prefix",
    "machine-vscode-models-provider-prefix"
  );

  const response = await vscodeModelsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/models`)
  );
  const body = (await response.json()) as any;
  const model = (body.data || []).find((entry: any) => entry.id === "gemini/gemini-1.5-pro");

  assert.equal(response.status, 200);
  assert.ok(model, "missing gemini/gemini-1.5-pro in tokenized VS Code models route");
  assert.equal(model.name, "Gemini 1.5 Pro");
});

test("vscode tokenized tags route mirrors the Ollama tags payload", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("openai", { name: "openai-vscode-tags" });
  const key = await apiKeysDb.createApiKey("vscode-tags", "machine-vscode-tags");

  const response = await vscodeTagsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/tags`)
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.models));
  assert.ok(body.models.length > 0);
  assert.equal(typeof body.models[0]?.name, "string");
});

test("vscode tokenized tags route exposes reasoning metadata for codex models", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-tags-reasoning" });
  const key = await apiKeysDb.createApiKey(
    "vscode-tags-reasoning",
    "machine-vscode-tags-reasoning"
  );

  const response = await vscodeTagsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/tags`)
  );
  const body = (await response.json()) as any;
  const model = (body.models || []).find((entry: any) => entry.name === "gpt-5.4__provider_cx");

  assert.equal(response.status, 200);
  assert.ok(model, "missing gpt-5.4__provider_cx in tokenized VS Code tags route");
  assert.deepEqual(model.supportsReasoningEffort, ["none", "low", "medium", "high", "xhigh"]);
  assert.deepEqual(model.supports_reasoning_effort, ["none", "low", "medium", "high", "xhigh"]);
  assert.deepEqual(model.supportedReasoningEfforts, ["none", "low", "medium", "high", "xhigh"]);
  assert.equal(model.defaultReasoningEffort, "none");
  assert.equal(model.selectedReasoningEffort, "none");
  assert.equal(model.selected_reasoning_effort, "none");
  assert.equal(model.details.family, "gpt-5.4");
  assert.deepEqual(model.configurationSchema?.properties?.reasoningEffort?.enum, [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
  ]);
  assert.equal(model.configurationSchema?.properties?.reasoningEffort?.default, "none");
  assert.deepEqual(model.details.configurationSchema?.properties?.reasoningEffort?.enum, [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
  ]);
  assert.deepEqual(model.details.supports_reasoning_effort, [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
  ]);
  assert.equal(model.details.selected_reasoning_effort, "none");
  assert.ok(
    !(body.models || []).some((entry: any) => entry.name === "cx/gpt-5.4-low"),
    "reasoning variant leaked into grouped VS Code tags route"
  );
  assert.ok(
    !(body.models || []).some((entry: any) => entry.name === "cx/gpt-5.4-low__tier_priority"),
    "tier reasoning variant leaked into grouped VS Code tags route"
  );
  assert.ok(
    (body.models || []).some((entry: any) => entry.name === "gpt-5.4__provider_cx__tier_priority")
  );
  assert.ok(
    (body.models || []).some((entry: any) => entry.name === "gpt-5.4__provider_cx__tier_flex")
  );
});

test("vscode tokenized tags route only exposes usable canonical chat models", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("openai", { name: "openai-vscode-tags-usable" });
  const key = await apiKeysDb.createApiKey("vscode-tags-usable", "machine-vscode-tags-usable");

  const tagsResponse = await vscodeTagsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/tags`)
  );
  const tagsBody = (await tagsResponse.json()) as any;

  const modelsResponse = await vscodeModelsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/models`)
  );
  const modelsBody = (await modelsResponse.json()) as any;
  const rawModelsResponse = await vscodeV1ModelsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/v1/models`)
  );
  const rawModelsBody = (await rawModelsResponse.json()) as any;

  assert.equal(tagsResponse.status, 200);
  assert.equal(modelsResponse.status, 200);
  assert.equal(rawModelsResponse.status, 200);

  const catalogById = new Map((modelsBody.data || []).map((model: any) => [model.id, model]));
  const rawCatalogById = new Map((rawModelsBody.data || []).map((model: any) => [model.id, model]));
  type CatalogLike = {
    parent?: string | null;
    type?: string;
    api_format?: string;
    supported_endpoints?: string[];
    output_modalities?: string[];
  };

  for (const tagModel of tagsBody.models || []) {
    const catalogModel = (catalogById.get(tagModel.name) || rawCatalogById.get(tagModel.name)) as
      | CatalogLike
      | undefined;
    assert.ok(catalogModel, `missing catalog model for tag ${tagModel.name}`);
    assert.ok(!catalogModel.parent, `tag ${tagModel.name} should not expose an alias child`);
    assert.ok(
      !catalogModel.type || catalogModel.type === "chat",
      `tag ${tagModel.name} should be chat-capable`
    );
    assert.ok(
      !catalogModel.api_format || catalogModel.api_format === "chat-completions",
      `tag ${tagModel.name} should use chat-completions`
    );
    assert.ok(
      !Array.isArray(catalogModel.supported_endpoints) ||
        catalogModel.supported_endpoints.includes("chat"),
      `tag ${tagModel.name} should support chat`
    );
    assert.ok(
      !Array.isArray(catalogModel.output_modalities) ||
        catalogModel.output_modalities.includes("text"),
      `tag ${tagModel.name} should output text`
    );
  }

  const unusableCatalogModels = (modelsBody.data || []).filter(
    (model: any) =>
      model.parent ||
      (typeof model.type === "string" && model.type !== "chat") ||
      (typeof model.api_format === "string" && model.api_format !== "chat-completions") ||
      (Array.isArray(model.supported_endpoints) && !model.supported_endpoints.includes("chat")) ||
      (Array.isArray(model.output_modalities) && !model.output_modalities.includes("text"))
  );
  const tagNames = new Set((tagsBody.models || []).map((model: any) => model.name));

  for (const model of unusableCatalogModels) {
    assert.ok(!tagNames.has(model.id), `unusable model leaked into tags: ${model.id}`);
  }
});

test("vscode tokenized grouped tags route does not publish combo entries", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-grouped-tags-no-combo" });
  const key = await apiKeysDb.createApiKey(
    "vscode-grouped-tags-no-combo",
    "machine-vscode-grouped-tags-no-combo"
  );
  await combosDb.createCombo({
    name: "grouped-hidden-combo",
    strategy: "priority",
    models: [{ kind: "model", model: "codex/gpt-5.4-high", providerId: "codex" }],
  });

  const response = await vscodeTagsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/tags`)
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.models));
  assert.equal(
    body.models.some((entry: any) => entry.name === "grouped-hidden-combo"),
    false
  );
});

test("vscode tokenized tags route prefers canonical codex models when codex is the only active provider", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-tags-canonical" });
  const key = await apiKeysDb.createApiKey(
    "vscode-tags-canonical",
    "machine-vscode-tags-canonical"
  );

  const response = await vscodeTagsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/tags`)
  );
  const body = (await response.json()) as any;
  const tagNames = (body.models || []).map((model: any) => model.name);

  assert.equal(response.status, 200);
  assert.ok(tagNames.length > 0);
  assert.ok(
    tagNames.some((name: string) => name === "gpt-5.5__provider_cx"),
    `missing family-first codex tag: ${tagNames.join(", ")}`
  );
  assert.ok(tagNames.includes("gpt-5.5__provider_cx"));
  assert.ok(!tagNames.includes("cx/gpt-5.5"));
  assert.ok(!tagNames.includes("cx/gpt-5.5-low"));
  assert.ok(!tagNames.includes("cx/gpt-5.5-medium"));
  assert.ok(!tagNames.includes("cx/gpt-5.5-high"));
  assert.ok(!tagNames.includes("cx/gpt-5.5-xhigh"));

  for (const name of tagNames) {
    assert.ok(!name.startsWith("oc/"), `opencode tag leaked into codex-only endpoint: ${name}`);
  }
});

test("vscode tokenized api/version route exposes Ollama compatibility version", async () => {
  const response = await vscodeVersionRoute.GET();
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.version, "0.6.4");
});

test("vscode raw tokenized api/version route exposes Ollama compatibility version", async () => {
  const response = await vscodeRawVersionRoute.GET();
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.version, "0.6.4");
});

test("vscode tokenized api/show route resolves a catalog model through the path token", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("openai", { name: "openai-vscode-show" });
  const key = await apiKeysDb.createApiKey("vscode-show", "machine-vscode-show");

  const modelsResponse = await vscodeV1ModelsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/v1/models`)
  );
  const modelsBody = (await modelsResponse.json()) as any;
  const modelId = modelsBody.data?.[0]?.id;

  assert.equal(modelsResponse.status, 200);
  assert.equal(typeof modelId, "string");

  const response = await vscodeShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: modelId }),
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.modelfile, `FROM ${modelId}`);
  assert.ok(Array.isArray(body.capabilities));
  assert.ok(body.capabilities.includes("completion"));
});

test("vscode tokenized tags names stay resolvable by api/show", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("openai", { name: "openai-vscode-tags-show" });
  const key = await apiKeysDb.createApiKey("vscode-tags-show", "machine-vscode-tags-show");

  const tagsResponse = await vscodeTagsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/tags`)
  );
  const tagsBody = (await tagsResponse.json()) as any;
  const tagModelName = tagsBody.models?.[0]?.name;

  assert.equal(tagsResponse.status, 200);
  assert.equal(typeof tagModelName, "string");

  const showResponse = await vscodeShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: tagModelName }),
    })
  );
  const showBody = (await showResponse.json()) as any;

  assert.equal(showResponse.status, 200);
  assert.equal(showBody.modelfile, `FROM ${tagModelName}`);
});

test("vscode tokenized grouped api/show does not resolve combo names", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-grouped-show-no-combo" });
  const key = await apiKeysDb.createApiKey(
    "vscode-grouped-show-no-combo",
    "machine-vscode-grouped-show-no-combo"
  );
  await combosDb.createCombo({
    name: "grouped-show-hidden-combo",
    strategy: "priority",
    models: [{ kind: "model", model: "codex/gpt-5.4-high", providerId: "codex" }],
  });

  const response = await vscodeShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "grouped-show-hidden-combo" }),
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 404);
  assert.equal(body.error, "Model not found: grouped-show-hidden-combo");
});

test("vscode raw tokenized tags names stay resolvable by raw api/show", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("openai", { name: "openai-vscode-raw-tags-show" });
  const key = await apiKeysDb.createApiKey("vscode-raw-tags-show", "machine-vscode-raw-tags-show");

  const tagsResponse = await vscodeRawTagsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}/api/tags`),
    { params: { token: key.key } }
  );
  const tagsBody = (await tagsResponse.json()) as any;
  const tagModelName = tagsBody.models?.[0]?.name;

  assert.equal(tagsResponse.status, 200);
  assert.equal(typeof tagModelName, "string");

  const showResponse = await vscodeRawShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: tagModelName }),
    }),
    { params: { token: key.key } }
  );
  const showBody = (await showResponse.json()) as any;

  assert.equal(showResponse.status, 200);
  assert.equal(showBody.modelfile, `FROM ${tagModelName}`);
});

test("vscode tokenized api/show route exposes explicit reasoning effort metadata", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-show-reasoning" });
  const key = await apiKeysDb.createApiKey(
    "vscode-show-reasoning",
    "machine-vscode-show-reasoning"
  );

  const response = await vscodeShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "gpt-5.4__provider_cx" }),
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.model, "gpt-5.4__provider_cx");
  assert.equal(body.remote_model, "Codex GPT 5.4 (Default)");
  assert.equal(body.details.family, "gpt-5.4");
  assert.deepEqual(body.supportsReasoningEffort, ["none", "low", "medium", "high", "xhigh"]);
  assert.deepEqual(body.supports_reasoning_effort, ["none", "low", "medium", "high", "xhigh"]);
  assert.deepEqual(body.supportedReasoningEfforts, ["none", "low", "medium", "high", "xhigh"]);
  assert.equal(body.defaultReasoningEffort, "none");
  assert.equal(body.selectedReasoningEffort, "none");
  assert.equal(body.selected_reasoning_effort, "none");
  assert.deepEqual(body.configurationSchema?.properties?.reasoningEffort?.enum, [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
  ]);
  assert.equal(body.configurationSchema?.properties?.reasoningEffort?.default, "none");
  assert.equal(body.model_info["general.basename"], "Codex GPT 5.4 (Default)");
  assert.equal(body.model_info["general.architecture"], "codex");
  assert.equal(body.model_info["codex.context_length"], 200000);
  assert.deepEqual(body.model_info.supports_reasoning_effort, [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
  ]);
  assert.equal(body.model_info.selected_reasoning_effort, "none");
  assert.deepEqual(body.model_info.capabilities.supports_reasoning_effort, [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
  ]);
});

test("vscode tokenized api/show route exposes service tier variants with suffixed display names", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-show-tier-priority" });
  const key = await apiKeysDb.createApiKey(
    "vscode-show-tier-priority",
    "machine-vscode-show-tier-priority"
  );

  const response = await vscodeShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "gpt-5.4__provider_cx__tier_priority" }),
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.model, "gpt-5.4__provider_cx__tier_priority");
  assert.equal(body.remote_model, "Codex GPT 5.4 (Fast)");
  assert.equal(body.details.family, "gpt-5.4");
});

test("vscode tokenized chat routes rewrite family-first ids back to the codex provider id", async () => {
  const payload = serviceTierVariants.resolveVscodeServiceTierRequest({
    model: "gpt-5.4__provider_cx__tier_priority",
  });

  assert.equal(payload.model, "cx/gpt-5.4");
  assert.equal(payload.service_tier, "priority");
});

test("vscode tokenized /chat/completions route applies the path token and codex tier rewrite", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  const key = await apiKeysDb.createApiKey(
    "vscode-chat-completions-route",
    "machine-vscode-chat-completions-route"
  );

  const response = await vscodeChatCompletionsRoute.POST(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-5.4__provider_cx__tier_priority",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
        stream: false,
      }),
    })
  );
  const body = (await response.json()) as any;

  // Upstream port decolua/9router#336: zero-active-credentials now surfaces as
  // 404 (combo-fallbackable) instead of 400 (combo hard-stop). The 404 OpenAI
  // error code mapping is "model_not_found" (open-sse/config/errorConfig.ts:29).
  assert.equal(response.status, 404);
  assert.equal(body.error?.code, "model_not_found");
  assert.equal(body.error?.message, "No active credentials for provider: codex");
});

test("vscode tokenized /responses route applies the path token and codex tier rewrite", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  const key = await apiKeysDb.createApiKey(
    "vscode-responses-route",
    "machine-vscode-responses-route"
  );

  const response = await vscodeResponsesRoute.POST(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/responses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-5.4__provider_cx__tier_priority",
        input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
        max_output_tokens: 1,
        stream: false,
      }),
    })
  );
  const body = (await response.json()) as any;

  // Upstream port decolua/9router#336: see chat/completions sibling test above.
  assert.equal(response.status, 404);
  assert.equal(body.error?.code, "model_not_found");
  assert.equal(body.error?.message, "No active credentials for provider: codex");
});

test("vscode tokenized api/show route preserves the selected reasoning effort for codex variants", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-show-reasoning-low" });
  const key = await apiKeysDb.createApiKey(
    "vscode-show-reasoning-low",
    "machine-vscode-show-reasoning-low"
  );

  const response = await vscodeShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "cx/gpt-5.4-low" }),
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.model_info.selected_reasoning_effort, "low");
  assert.equal(body.model_info.capabilities.selected_reasoning_effort, "low");
});

test("vscode tokenized api/show route resolves canonical family aliases", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-show-family-alias" });
  const key = await apiKeysDb.createApiKey(
    "vscode-show-family-alias",
    "machine-vscode-show-family-alias"
  );

  const response = await vscodeShowRoute.POST(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/api/show`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "gpt-5.4" }),
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.model, "gpt-5.4");
  assert.equal(body.details.family, "gpt-5.4");
});

test("vscode tokenized v1 chat route is exposed under the tokenized base path", async () => {
  const response = await vscodeV1ChatCompletionsRoute.OPTIONS();

  assert.equal(response.status, 204);
  assert.match(response.headers.get("Access-Control-Allow-Methods") || "", /POST/);
});
