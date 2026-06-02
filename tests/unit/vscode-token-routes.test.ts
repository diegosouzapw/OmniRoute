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
const vscodeRawModelsRoute = await import("../../src/app/api/v1/vscode/raw/[token]/models/route.ts");
const vscodeV1ModelsRoute = await import("../../src/app/api/v1/vscode/[token]/v1/models/route.ts");
const vscodeVersionRoute = await import("../../src/app/api/v1/vscode/[token]/api/version/route.ts");
const vscodeShowRoute = await import("../../src/app/api/v1/vscode/[token]/api/show/route.ts");
const vscodeTagsRoute = await import("../../src/app/api/v1/vscode/[token]/api/tags/route.ts");
const vscodeV1ChatCompletionsRoute = await import(
  "../../src/app/api/v1/vscode/[token]/v1/chat/completions/route.ts"
);
const serviceTierVariants = await import("../../src/app/api/v1/vscode/[token]/serviceTierVariants.ts");
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

test("vscode tokenized root route mirrors the OpenAI-compatible model catalog", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("openai", { name: "openai-vscode-root" });
  const key = await apiKeysDb.createApiKey("vscode-root", "machine-vscode-root");

  const response = await vscodeRootRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/`)
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.data));
  assert.ok(body.data.length > 0);
});

test("vscode tokenized root route exposes friendly model names alongside ids", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-root-friendly-name" });
  const key = await apiKeysDb.createApiKey("vscode-root-friendly-name", "machine-vscode-root-friendly-name");

  const response = await vscodeRootRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/`)
  );
  const body = (await response.json()) as any;
  const model = (body.data || []).find((entry: any) => entry.id === "cx/gpt-5.4");

  assert.equal(response.status, 200);
  assert.ok(model, "missing cx/gpt-5.4 in tokenized VS Code root route");
  assert.equal(model.name, "GPT 5.4");
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

  const key = await apiKeysDb.createApiKey("vscode-combos", "machine-vscode-combos");
  await combosDb.createCombo({
    name: "test-combo",
    strategy: "priority",
    models: [],
  });

  const combosRoute = await import("../../src/app/api/v1/vscode/combos/[token]/[[...slug]]/route.ts");
  const response = await combosRoute.GET(
    new Request(`http://localhost/api/v1/vscode/combos/${encodeURIComponent(key.key)}`),
    { params: { token: key.key, slug: undefined } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.object, "list");
  assert.ok(Array.isArray(body.data), "expected data property to be an array");
  assert.ok(Array.isArray(body.combos), "expected combos property to be an array");
  assert.ok(body.data.some((combo: any) => combo.name === "test-combo"), "expected test combo in data response");
  assert.ok(body.combos.some((combo: any) => combo.name === "test-combo"), "expected test combo in response");
});

test("vscode combos route responds to Ollama compatibility check (/api/version)", async () => {
  const key = await apiKeysDb.createApiKey("vscode-combos-version", "machine-vscode-combos-version");

  const combosRoute = await import("../../src/app/api/v1/vscode/combos/[token]/[[...slug]]/route.ts");
  const response = await combosRoute.GET(
    new Request(`http://localhost/api/v1/vscode/combos/${encodeURIComponent(key.key)}/api/version`),
    { params: { token: key.key, slug: ["api", "version"] } }
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.ok(body.version, "expected version property in response");
  assert.match(body.version as string, /0\.6\.\d+/, "expected Ollama-compatible version format");
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
  const fastModel = (body.data || []).find((entry: any) => entry.id === "gpt-5.4__provider_cx__tier_priority");
  const flexModel = (body.data || []).find((entry: any) => entry.id === "gpt-5.4__provider_cx__tier_flex");

  assert.equal(response.status, 200);
  assert.ok(model, "missing gpt-5.4__provider_cx in tokenized VS Code models route");
  assert.ok(fastModel, "missing gpt-5.4__provider_cx__tier_priority in tokenized VS Code models route");
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
  const fastModel = (body.data || []).find((entry: any) => entry.id === "cx/gpt-5.4__tier_priority");
  const flexModel = (body.data || []).find((entry: any) => entry.id === "cx/gpt-5.4__tier_flex");

  assert.equal(response.status, 200);
  assert.ok(defaultModel, "missing cx/gpt-5.4 in raw VS Code models route");
  assert.ok(fastModel, "missing cx/gpt-5.4__tier_priority in raw VS Code models route");
  assert.ok(flexModel, "missing cx/gpt-5.4__tier_flex in raw VS Code models route");
  assert.ok(!importedIds.has("gpt-5.4__provider_cx"));
  assert.ok(!importedIds.has("gpt-5.4__provider_cx__tier_priority"));
  assert.ok(!importedIds.has("gpt-5.4__provider_cx__tier_flex"));
  assert.deepEqual(defaultModel.supportsReasoningEffort, ["none", "low", "medium", "high", "xhigh"]);
  assert.equal(
    defaultModel.url,
    `http://localhost/api/v1/vscode/raw/${encodeURIComponent(key.key)}/responses#models.ai.azure.com`
  );
});

test("vscode tokenized models route prefixes the provider without duplicating brand names", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("gemini-cli", { name: "gemini-cli-vscode-models-labels" });
  const key = await apiKeysDb.createApiKey(
    "vscode-models-provider-prefix",
    "machine-vscode-models-provider-prefix"
  );

  const response = await vscodeModelsRoute.GET(
    new Request(`http://localhost/api/v1/vscode/${encodeURIComponent(key.key)}/models`)
  );
  const body = (await response.json()) as any;
  const model = (body.data || []).find((entry: any) => entry.id === "gemini-cli/gemini-1.5-pro");

  assert.equal(response.status, 200);
  assert.ok(model, "missing gemini-cli/gemini-1.5-pro in tokenized VS Code models route");
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
  const key = await apiKeysDb.createApiKey("vscode-tags-reasoning", "machine-vscode-tags-reasoning");

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
  assert.deepEqual(model.details.supports_reasoning_effort, ["none", "low", "medium", "high", "xhigh"]);
  assert.equal(model.details.selected_reasoning_effort, "none");
  assert.ok(
    !(body.models || []).some((entry: any) => entry.name === "cx/gpt-5.4-low"),
    "reasoning variant leaked into grouped VS Code tags route"
  );
  assert.ok(
    !(body.models || []).some((entry: any) => entry.name === "cx/gpt-5.4-low__tier_priority"),
    "tier reasoning variant leaked into grouped VS Code tags route"
  );
  assert.ok((body.models || []).some((entry: any) => entry.name === "gpt-5.4__provider_cx__tier_priority"));
  assert.ok((body.models || []).some((entry: any) => entry.name === "gpt-5.4__provider_cx__tier_flex"));
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

  const catalogById = new Map(
    (modelsBody.data || []).map((model: any) => [model.id, model])
  );
  const rawCatalogById = new Map(
    (rawModelsBody.data || []).map((model: any) => [model.id, model])
  );
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

test("vscode tokenized tags route prefers canonical codex models when codex is the only active provider", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-tags-canonical" });
  const key = await apiKeysDb.createApiKey("vscode-tags-canonical", "machine-vscode-tags-canonical");

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

test("vscode tokenized api/show route exposes explicit reasoning effort metadata", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-show-reasoning" });
  const key = await apiKeysDb.createApiKey("vscode-show-reasoning", "machine-vscode-show-reasoning");

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
  assert.deepEqual(body.model_info.supports_reasoning_effort, ["none", "low", "medium", "high", "xhigh"]);
  assert.equal(body.model_info.selected_reasoning_effort, "none");
  assert.deepEqual(
    body.model_info.capabilities.supports_reasoning_effort,
    ["none", "low", "medium", "high", "xhigh"]
  );
});

test("vscode tokenized api/show route exposes service tier variants with suffixed display names", async () => {
  await settingsDb.updateSettings({
    requireLogin: true,
    password: "hashed-password",
    requireAuthForModels: true,
  });
  await seedConnection("codex", { name: "codex-vscode-show-tier-priority" });
  const key = await apiKeysDb.createApiKey("vscode-show-tier-priority", "machine-vscode-show-tier-priority");

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
  const payload = serviceTierVariants.resolveVscodeServiceTierRequest({ model: "gpt-5.4__provider_cx__tier_priority" });

  assert.equal(payload.model, "cx/gpt-5.4");
  assert.equal(payload.service_tier, "priority");
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
