import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hidden-dispatch-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "hidden-dispatch-fixture-secret";
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const models = await import("../../src/lib/db/models.ts");
const settings = await import("../../src/lib/db/settings.ts");
const aliases = await import("../../src/lib/modelAliasResolver.ts");
const chatRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const originalFetch = globalThis.fetch;
let connectionId = "";
const dispatchedModels: string[] = [];

async function chat(model: string, apiKey?: string): Promise<Response> {
  return chatRoute.POST(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-OmniRoute-No-Cache": "true",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      }),
    })
  );
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  aliases.invalidateAliasCache();
  dispatchedModels.length = 0;
  await settings.updateSettings({ requestRetry: 0 });
  const connection = await providers.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Hidden dispatch fixture",
    apiKey: "sk-hidden-dispatch-fixture",
    isActive: true,
    testStatus: "active",
  });
  connectionId = String(connection.id);
  globalThis.fetch = async (_input, init) => {
    dispatchedModels.push(JSON.parse(String(init?.body)).model);
    return Response.json({
      id: "chatcmpl-hidden-dispatch",
      choices: [
        {
          message: { role: "assistant", content: "visible model reached upstream" },
          finish_reason: "stop",
        },
      ],
    });
  };
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a visible model remains callable through the HTTP chat route", async () => {
  const response = await chat("openai/gpt-4o-mini");
  assert.equal(response.status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o-mini"]);
});

test("an individually hidden model returns 404 before upstream dispatch", async () => {
  models.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: true });
  const response = await chat("openai/gpt-4o-mini");
  assert.deepEqual(
    { status: response.status, dispatchedModels: [...dispatchedModels] },
    { status: 404, dispatchedModels: [] }
  );
  const body = await response.json();
  assert.equal(body.error.code, "model_not_found");
  assert.equal(JSON.stringify(body).includes("at /"), false);
});

test("a persisted model alias cannot dispatch an individually hidden target", async () => {
  const modelAliases = await import("../../src/lib/db/models/aliases.ts");
  await modelAliases.setModelAlias("private-fixture-model", "openai/gpt-4o-mini");
  aliases.invalidateAliasCache();
  models.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: true });
  const response = await chat("private-fixture-model");
  assert.equal(response.status, 404);
  assert.deepEqual(dispatchedModels, []);
});

test("hide then unhide takes effect on the next request without a stale visibility cache", async () => {
  models.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: true });
  assert.equal((await chat("openai/gpt-4o-mini")).status, 404);
  assert.deepEqual(dispatchedModels, []);
  models.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: false });
  assert.equal((await chat("openai/gpt-4o-mini")).status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o-mini"]);
});

test("an image-only hide does not disable the chat model with the same id", async () => {
  models.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: true, modality: "images" });
  assert.equal((await chat("openai/gpt-4o-mini")).status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o-mini"]);
});

for (const [storedProvider, requestProvider] of [
  ["github", "gh"],
  ["gh", "github"],
]) {
  test(`hide persisted under ${storedProvider} rejects requests using ${requestProvider}`, async () => {
    models.mergeModelCompatOverride(storedProvider, "gpt-4o", { isHidden: true });
    const response = await chat(`${requestProvider}/gpt-4o`);
    assert.equal(response.status, 404);
    assert.deepEqual(dispatchedModels, []);
  });
}

for (const storedAsPrefix of [false, true]) {
  test(`a compatible node hidden by ${storedAsPrefix ? "prefix" : "UUID"} rejects both forms`, async () => {
    const nodes = await import("../../src/lib/db/providers/nodes.ts");
    const nodeId = "openai-compatible-hidden-dispatch-node";
    await nodes.createProviderNode({
      id: nodeId,
      type: "openai-compatible",
      name: "Hidden fixture",
      prefix: "private-node",
      apiType: "chat",
      baseUrl: "https://node.example.invalid/v1",
    });
    await providers.createProviderConnection({
      provider: nodeId,
      authType: "apikey",
      apiKey: "sk-node-fixture",
      name: "Hidden node fixture",
      isActive: true,
      testStatus: "active",
      providerSpecificData: { baseUrl: "https://node.example.invalid/v1" },
    });
    assert.equal((await chat("private-node/vendor/model-x")).status, 200);
    assert.deepEqual(dispatchedModels, ["vendor/model-x"]);
    dispatchedModels.length = 0;
    models.mergeModelCompatOverride(storedAsPrefix ? "private-node" : nodeId, "vendor/model-x", {
      isHidden: true,
    });
    for (const prefix of [nodeId, "private-node"]) {
      const response = await chat(`${prefix}/vendor/model-x`);
      assert.deepEqual(
        { status: response.status, dispatchedModels: [...dispatchedModels] },
        { status: 404, dispatchedModels: [] }
      );
    }
  });
}

test("a model hidden for another provider does not block a visible OpenAI model", async () => {
  models.mergeModelCompatOverride("github", "gpt-4o-mini", { isHidden: true });
  assert.equal((await chat("openai/gpt-4o-mini")).status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o-mini"]);
});

test("a connection default cannot replace a visible request with a hidden model", async () => {
  await providers.updateProviderConnection(connectionId, { defaultModel: "gpt-4o-mini" });
  assert.equal((await chat("gpt-4o")).status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o-mini"]);
  dispatchedModels.length = 0;
  models.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: true });
  assert.equal((await chat("gpt-4o")).status, 404);
  assert.deepEqual(dispatchedModels, []);
});

test("visibility does not override API-key denial or grant access to visible models", async () => {
  const apiKeys = await import("../../src/lib/db/apiKeys.ts");
  apiKeys.resetApiKeyState();
  const key = await apiKeys.createApiKey("Hidden model ACL fixture", "hidden-model-dispatch");
  await apiKeys.updateApiKeyPermissions(key.id, {
    modelAccessMode: "restricted",
    allowedModels: ["openai/gpt-4o"],
  });
  assert.equal((await chat("openai/gpt-4o-mini", key.key)).status, 403);
  assert.deepEqual(dispatchedModels, []);
  models.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: true });
  assert.equal((await chat("openai/gpt-4o-mini", key.key)).status, 403);
  assert.deepEqual(dispatchedModels, []);
  assert.equal((await chat("openai/gpt-4o", key.key)).status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o"]);
  apiKeys.resetApiKeyState();
});

test("catalog exposure lists remain compatible with explicit visible-model requests", async () => {
  await settings.updateSettings({
    modelVisibilityDenylist: ["openai/gpt-4o-mini"],
    modelVisibilityAllowlist: ["github/*"],
  });
  assert.equal((await chat("openai/gpt-4o-mini")).status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o-mini"]);
});

test("a custom model's explicit unhide retains precedence over its compatibility override", async () => {
  models.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: true });
  await models.addCustomModel("openai", "gpt-4o-mini");
  await models.updateCustomModel("openai", "gpt-4o-mini", { isHidden: false });
  assert.equal((await chat("openai/gpt-4o-mini")).status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o-mini"]);
});

test("a provider redirect checks the native destination's hidden model", async () => {
  models.mergeModelCompatOverride("deepseek", "deepseek-v4-pro", { isHidden: true });
  const response = await chat("codex/deepseek-v4-pro");
  assert.equal(response.status, 404);
  assert.deepEqual(dispatchedModels, []);
  assert.equal((await response.json()).error.code, "model_not_found");
});

test("the HTTP combo route sends only visible siblings and returns404 when all are hidden", async () => {
  const combos = await import("../../src/lib/db/combos.ts");
  await combos.createCombo({
    name: "hidden-dispatch-combo",
    strategy: "priority",
    models: ["openai/gpt-4o-mini", "openai/gpt-4o"],
  });
  models.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: true });
  assert.equal((await chat("hidden-dispatch-combo")).status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o"]);
  dispatchedModels.length = 0;
  models.mergeModelCompatOverride("openai", "gpt-4o", { isHidden: true });
  const response = await chat("hidden-dispatch-combo");
  assert.equal(response.status, 404);
  assert.deepEqual(dispatchedModels, []);
  assert.equal((await response.json()).error.code, "model_not_found");
});

test("a global reasoning rule cannot redirect a visible model to a hidden target", async () => {
  const rules = await import("../../src/lib/db/reasoningRoutingRules.ts");
  rules.invalidateReasoningRoutingRuleCache();
  await rules.createReasoningRoutingRule({
    name: "Hidden target fixture",
    description: "",
    scope: "global",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: null,
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "inherit",
    targetEffort: null,
    targetKind: "model",
    targetModel: "openai/gpt-4o-mini",
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 0,
    enabled: true,
  });
  assert.equal((await chat("openai/gpt-4o")).status, 200);
  assert.deepEqual(dispatchedModels, ["gpt-4o-mini"]);
  dispatchedModels.length = 0;
  models.mergeModelCompatOverride("openai", "gpt-4o-mini", { isHidden: true });
  assert.equal((await chat("openai/gpt-4o")).status, 404);
  assert.deepEqual(dispatchedModels, []);
  rules.invalidateReasoningRoutingRuleCache();
});
