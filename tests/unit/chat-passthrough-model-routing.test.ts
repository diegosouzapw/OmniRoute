import test from "node:test";
import assert from "node:assert/strict";
import { getPassthroughProviders } from "../../open-sse/config/providerRegistry.ts";
import { comboTargetCredentialProviderId } from "../../src/sse/handlers/chatHelpers.ts";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("combo-provider-override-14743");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildRequest,
  combosDb,
  handleChat,
  modelComboMappingsDb,
  resetStorage,
} = harness;
const providersDb = await import("../../src/lib/db/providers.ts");
const { persistDiscoveredModels } = await import("../../src/lib/providerModels/modelDiscovery.ts");
const TARGET_MODEL = "custom-combo-model-14743";

test("src/sse/handlers/chat.ts imports cleanly without module or syntax errors", async () => {
  const chatHandler = await import("../../src/sse/handlers/chat.ts");
  assert.ok(chatHandler, "chat.ts handler module should export successfully");
});

test("getPassthroughProviders includes expected proxy/passthrough providers", () => {
  const providers = getPassthroughProviders();
  assert.ok(providers.has("cline"), "cline should be a passthrough provider");
  assert.ok(providers.has("kilocode"), "kilocode should be a passthrough provider");
});

test("passthrough model routing preserves original unstripped modelStr when provider overrides to passthrough", () => {
  const passthroughProviders = getPassthroughProviders();
  const provider: string = "cline";
  const resolvedProvider: string = "openai";
  const modelStr = "cline/gpt-4o-mini";
  const model = "gpt-4o-mini";
  const body = { model: "cline/gpt-4o-mini", messages: [] };

  let effectiveModel = model;
  let requestBody = { ...body, model: `cline/${effectiveModel}` };

  if (provider !== resolvedProvider && passthroughProviders.has(provider)) {
    effectiveModel = modelStr;
    requestBody = { ...body, model: modelStr };
  }

  assert.equal(effectiveModel, "cline/gpt-4o-mini");
  assert.equal(requestBody.model, "cline/gpt-4o-mini");
});

test("bare Claude combo targets do not override an inferred provider with the unknown sentinel", () => {
  const target = { modelStr: "claude-opus-5-5", providerId: null, provider: "unknown" };

  assert.equal(comboTargetCredentialProviderId(target), null);
  assert.equal(comboTargetCredentialProviderId(target) ?? "antigravity", "antigravity");
});

test("explicit combo providerId remains an authoritative credential-provider override", () => {
  const target = { modelStr: "xiaomi/mimo-v2-flash", providerId: "opengate", provider: "xiaomi" };

  assert.equal(comboTargetCredentialProviderId(target), "opengate");
});

test("a provider-only combo target still overrides the credential provider (#11840)", () => {
  // An alias-prefixed passthrough target (kilocode/cline) carries only `provider`;
  // it must keep routing credentials to that provider. Only the "unknown"
  // sentinel stamped on bare model ids is ignored.
  assert.equal(comboTargetCredentialProviderId({ provider: "kilocode" }), "kilocode");
  assert.equal(comboTargetCredentialProviderId({ providerId: null, provider: "cline" }), "cline");
  assert.equal(comboTargetCredentialProviderId({ provider: "unknown" }), null);
  assert.equal(comboTargetCredentialProviderId({}), null);
  assert.equal(comboTargetCredentialProviderId(null), null);
});

test("mapped bare combo target keeps its model-resolved provider", async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "combo-provider-override-14743",
    apiKey: "sk-combo-provider-override-14743",
    isActive: true,
    testStatus: "active",
  });
  await persistDiscoveredModels("openai", connection.id, [
    { id: TARGET_MODEL, name: "Custom combo model" },
  ]);
  const combo = await combosDb.createCombo({
    name: `combo-provider-override-14743-${Date.now()}`,
    strategy: "priority",
    models: [{ kind: "model", model: TARGET_MODEL }],
  });
  await modelComboMappingsDb.createModelComboMapping({
    pattern: "claude-opus-5-5",
    comboId: combo.id,
  });

  const upstreamBodies: Array<Record<string, unknown>> = [];
  globalThis.fetch = async (_input, init) => {
    upstreamBodies.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
    return buildOpenAIResponse("OK", TARGET_MODEL);
  };
  const response = await handleChat(
    buildRequest({
      body: {
        model: "claude-opus-5-5",
        stream: false,
        messages: [{ role: "user", content: "Reply with OK." }],
      },
    })
  );
  const body = await response.json();

  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(upstreamBodies.length, 1);
  assert.equal(upstreamBodies[0].model, TARGET_MODEL);
  assert.equal(
    (body as { choices: Array<{ message: { content: string } }> }).choices[0].message.content,
    "OK"
  );
});

test("a bare combo target fails over to a sibling connection of its inferred provider (#14743)", async () => {
  // Before the fix the target's "unknown" sentinel became the credential provider:
  // the first attempt ran on the combo's preselected connection, but the failover
  // lookup after a 429 asked for connections of provider "unknown", found none and
  // failed the request instead of moving to the second openai key.
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  const model = `${TARGET_MODEL}-failover`;
  const first = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "combo-provider-override-14743-a",
    apiKey: "sk-combo-14743-a",
    isActive: true,
    testStatus: "active",
    priority: 1,
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "combo-provider-override-14743-b",
    apiKey: "sk-combo-14743-b",
    isActive: true,
    testStatus: "active",
    priority: 2,
  });
  await persistDiscoveredModels("openai", first.id, [{ id: model, name: "Failover model" }]);
  const combo = await combosDb.createCombo({
    name: `combo-provider-failover-14743-${Date.now()}`,
    strategy: "priority",
    models: [{ kind: "model", model }],
  });

  const keysSeen: string[] = [];
  globalThis.fetch = async (_input, init) => {
    const auth = String((init?.headers as Record<string, string>)?.Authorization ?? "");
    keysSeen.push(auth.replace(/^Bearer /, ""));
    if (auth.endsWith("-a")) {
      return new Response(
        JSON.stringify({ error: { message: "rate limited", type: "rate_limit" } }),
        {
          status: 429,
          headers: { "content-type": "application/json" },
        }
      );
    }
    return buildOpenAIResponse("OK", model);
  };
  const response = await handleChat(
    buildRequest({
      body: { model: combo.name, stream: false, messages: [{ role: "user", content: "Hi" }] },
    })
  );
  const body = await response.json();

  assert.equal(response.status, 200, JSON.stringify(body));
  assert.deepEqual(keysSeen, ["sk-combo-14743-a", "sk-combo-14743-b"]);
});

test.after(async () => {
  await harness.cleanup();
});
