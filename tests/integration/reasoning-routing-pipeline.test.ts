import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("reasoning-routing-pipeline");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildRequest,
  cleanup,
  combosDb,
  getLatestCallLog,
  handleChat,
  reasoningRulesDb,
  resetStorage,
  seedApiKey,
  seedConnection,
  toPlainHeaders,
  waitFor,
} = harness;

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = harness.originalRetryDelayMs;
  await resetStorage();
});

test.after(async () => {
  await cleanup();
});

test("chat pipeline applies a reasoning model/effort rule once and records route trace", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-reasoning-target" });
  await reasoningRulesDb.createReasoningRoutingRule({
    name: "Route low to high",
    description: "integration test",
    scope: "global",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: "openai/gpt-4o-mini",
    sourceEffort: "low",
    requestTags: ["coding"],
    tagMatchMode: "all",
    effortMode: "force",
    targetEffort: "high",
    targetKind: "model",
    targetModel: "openai/gpt-4.1-mini",
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 10,
    enabled: true,
  });
  const fetchCalls: FetchCall[] = [];
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    fetchCalls.push({
      url: String(url),
      method: init.method || "GET",
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponse("reasoning route ok", "gpt-4.1-mini");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        reasoning_effort: "low",
        metadata: { tags: ["coding"] },
        messages: [{ role: "user", content: "Apply the reasoning rule" }],
      },
    })
  );
  await response.json();
  const callLog = await waitFor(() => getLatestCallLog());

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].body.model, "gpt-4.1-mini");
  assert.equal(fetchCalls[0].body.reasoning_effort, "high");
  assert.equal(fetchCalls[0].body._omnirouteReasoningRule, undefined);
  assert.equal(fetchCalls[0].body._omnirouteReasoningRouteTrace, undefined);
  assert.equal(callLog?.pipelinePayloads?.routeDecision?.sourceModel, "openai/gpt-4o-mini");
  assert.equal(callLog?.pipelinePayloads?.routeDecision?.targetModel, "openai/gpt-4.1-mini");
  assert.equal(callLog?.pipelinePayloads?.routeDecision?.targetEffort, "high");
});

test("chat pipeline stays unchanged when the reasoning rule table is empty", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-no-reasoning-rule" });
  const fetchCalls: FetchCall[] = [];
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    fetchCalls.push({
      url: String(url),
      method: init.method || "GET",
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponse("unchanged");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        reasoning_effort: "low",
        messages: [{ role: "user", content: "Keep this request unchanged" }],
      },
    })
  );
  await response.json();

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].body.model, "gpt-4o-mini");
  assert.equal(fetchCalls[0].body._omnirouteReasoningRule, undefined);
  assert.equal(fetchCalls[0].body._omnirouteReasoningRouteTrace, undefined);
});

test("reasoning routing works through Responses and Anthropic Messages transports", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-reasoning-transports" });
  await reasoningRulesDb.createReasoningRoutingRule({
    name: "Transport effort rule",
    description: "",
    scope: "global",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: "openai/gpt-4o-mini",
    sourceEffort: "missing",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort: "high",
    targetKind: "model",
    targetModel: "openai/gpt-4.1-mini",
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 1,
    enabled: true,
  });
  const fetchCalls: FetchCall[] = [];
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    fetchCalls.push({
      url: String(url),
      method: init.method || "GET",
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponse("transport reasoning ok");
  };

  const responses = await handleChat(
    buildRequest({
      url: "http://localhost/v1/responses",
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        input: "Responses reasoning rule",
      },
    })
  );
  await responses.json();
  const messages = await handleChat(
    buildRequest({
      url: "http://localhost/v1/messages",
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        max_tokens: 128,
        messages: [{ role: "user", content: "Messages reasoning rule" }],
      },
    })
  );
  await messages.json();

  assert.equal(responses.status, 200);
  assert.equal(messages.status, 200);
  assert.equal(fetchCalls.length, 2);
  assert.equal(fetchCalls[0].body.reasoning_effort, "high");
  assert.equal(fetchCalls[1].body.reasoning_effort, "high");
});

test("reasoning routing cannot widen an API key model allowlist", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-reasoning-policy" });
  const apiKey = await seedApiKey({ allowedModels: ["openai/gpt-4o-mini"] });
  await reasoningRulesDb.createReasoningRoutingRule({
    name: "Disallowed target",
    description: "",
    scope: "global",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: "openai/gpt-4o-mini",
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "inherit",
    targetEffort: null,
    targetKind: "model",
    targetModel: "openai/gpt-4.1-mini",
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 1,
    enabled: true,
  });
  let upstreamCalls = 0;
  globalThis.fetch = async () => {
    upstreamCalls += 1;
    return buildOpenAIResponse();
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Do not widen my model access" }],
      },
    })
  );

  assert.equal(response.status, 403);
  assert.equal(upstreamCalls, 0);
});

test("reasoning routing cannot target a combo outside the API key policy", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-reasoning-combo-policy" });
  const allowedCombo = await combosDb.createCombo({
    name: "allowed-reasoning-combo",
    strategy: "priority",
    models: ["openai/gpt-4o-mini"],
  });
  const disallowedCombo = await combosDb.createCombo({
    name: "disallowed-reasoning-combo",
    strategy: "priority",
    models: ["openai/gpt-4.1-mini"],
  });
  const apiKey = await seedApiKey({ allowedCombos: [String(allowedCombo.name)] });
  await reasoningRulesDb.createReasoningRoutingRule({
    name: "Disallowed combo target",
    description: "",
    scope: "global",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: "openai/gpt-4o-mini",
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "inherit",
    targetEffort: null,
    targetKind: "combo",
    targetModel: null,
    targetComboId: String(disallowedCombo.id),
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 1,
    enabled: true,
  });
  let upstreamCalls = 0;
  globalThis.fetch = async () => {
    upstreamCalls += 1;
    return buildOpenAIResponse();
  };

  const response = await handleChat(
    buildRequest({
      authKey: apiKey.key,
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Do not widen my combo access" }],
      },
    })
  );

  assert.equal(response.status, 403);
  assert.equal(upstreamCalls, 0);
});

test("reasoning routing filters incompatible combo targets and rejects an empty result", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-reasoning-combo-filter" });
  const mixedCombo = await combosDb.createCombo({
    name: "mixed-reasoning-combo",
    strategy: "priority",
    models: ["antigravity/gemini-3-pro", "openai/gpt-4.1-mini"],
  });
  await reasoningRulesDb.createReasoningRoutingRule({
    name: "Filtered combo target",
    description: "",
    scope: "global",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: "openai/gpt-4o-mini",
    sourceEffort: "missing",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort: "high",
    targetKind: "combo",
    targetModel: null,
    targetComboId: String(mixedCombo.id),
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 1,
    enabled: true,
  });
  const fetchCalls: FetchCall[] = [];
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    fetchCalls.push({
      url: String(url),
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponse("filtered combo ok", "gpt-4.1-mini");
  };

  const mixedResponse = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Filter incompatible targets" }],
      },
    })
  );
  await mixedResponse.json();

  assert.equal(mixedResponse.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].body.model, "gpt-4.1-mini");
  assert.equal(fetchCalls[0].body.reasoning_effort, "high");

  await reasoningRulesDb.deleteReasoningRoutingRule(
    (await reasoningRulesDb.getReasoningRoutingRules())[0].id
  );
  const incompatibleCombo = await combosDb.createCombo({
    name: "incompatible-reasoning-combo",
    strategy: "priority",
    models: ["antigravity/gemini-3-pro"],
  });
  await reasoningRulesDb.createReasoningRoutingRule({
    name: "Empty combo target",
    description: "",
    scope: "global",
    apiKeyId: null,
    comboId: null,
    connectionId: null,
    modelPattern: "openai/gpt-4o-mini",
    sourceEffort: "missing",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort: "high",
    targetKind: "combo",
    targetModel: null,
    targetComboId: String(incompatibleCombo.id),
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 1,
    enabled: true,
  });

  const emptyResponse = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "Reject an empty target set" }],
      },
    })
  );

  assert.equal(emptyResponse.status, 400);
  assert.equal(fetchCalls.length, 1);
});

test("connection reasoning rules apply only after selecting their connection", async () => {
  const connection = await seedConnection("openai", {
    apiKey: "sk-openai-connection-reasoning",
  });
  await reasoningRulesDb.createReasoningRoutingRule({
    name: "Connection effort",
    description: "",
    scope: "connection",
    apiKeyId: null,
    comboId: null,
    connectionId: String(connection.id),
    modelPattern: null,
    sourceEffort: "missing",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort: "high",
    targetKind: "keep",
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 1,
    enabled: true,
  });
  const fetchCalls: FetchCall[] = [];
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    fetchCalls.push({
      url: String(url),
      headers: toPlainHeaders(init.headers),
      body: init.body ? JSON.parse(String(init.body)) : null,
    });
    return buildOpenAIResponse("connection rule ok");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/o3-mini",
        stream: false,
        messages: [{ role: "user", content: "Apply the selected connection rule" }],
      },
    })
  );
  await response.json();

  assert.equal(response.status, 200);
  assert.equal(fetchCalls.length, 1);
  assert.equal(fetchCalls[0].body.model, "o3-mini");
  assert.equal(fetchCalls[0].body.reasoning_effort, "high");
});
