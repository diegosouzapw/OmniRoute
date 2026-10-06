import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("reasoning-reliability");
const providers = await import("../../src/lib/db/providers.ts");
const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
type RecordedBody = Record<string, unknown> & { reasoning?: { effort?: string } };
let calls: RecordedBody[] = [];
let firstConnectionId: string;

test.beforeEach(async () => {
  await h.resetStorage();
  h.BaseExecutor.RETRY_CONFIG.delayMs = 0;
  calls = [];
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Reasoning fixture",
    accessToken: "fixture-access-token",
    refreshToken: "fixture-refresh-token",
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
    isActive: true,
    testStatus: "active",
    providerSpecificData: { requestDefaults: { reasoningEffort: "high" } },
  });
  firstConnectionId = String(connection.id);
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    assert.match(String(url), /chatgpt\.com\/backend-api\/codex\/responses/);
    calls.push(JSON.parse(String(init.body)) as RecordedBody);
    return new Response(
      "data: " +
        JSON.stringify({
          type: "response.completed",
          response: {
            id: "resp_fixture",
            object: "response",
            status: "completed",
            model: "gpt-5.6-luna",
            output: [
              {
                id: "msg_fixture",
                type: "message",
                role: "assistant",
                content: [{ type: "output_text", text: "ok", annotations: [] }],
              },
            ],
            usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
          },
        }) +
        "\n\ndata: [DONE]\n\n",
      { headers: { "Content-Type": "text/event-stream" } }
    );
  };
});
test.afterEach(async () => {
  flushProxyLogsSync();
  h.BaseExecutor.RETRY_CONFIG.delayMs = h.originalRetryDelayMs;
  await h.resetStorage();
});
test.after(() => {
  flushProxyLogsSync();
  return h.cleanup();
});

async function forceLow(modelPattern: string, apiKeyId: string) {
  return h.reasoningRulesDb.createReasoningRoutingRule({
    name: "Force low",
    description: "",
    scope: "apiKey",
    apiKeyId,
    comboId: null,
    connectionId: null,
    modelPattern,
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort: "low",
    targetKind: "keep",
    targetModel: null,
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 0,
    enabled: true,
  });
}

test("reliable reasoning: forced effort wins over explicit effort and adaptive header opt-in", async () => {
  const key = await h.seedApiKey();
  await forceLow("codex/gpt-5.6-luna", key.id);
  const response = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      headers: { "x-omniroute-effort": "auto" },
      body: {
        model: "codex/gpt-5.6-luna",
        stream: false,
        reasoning_effort: "high",
        messages: [
          { role: "user", content: "Prove the theorem step by step and verify every edge case." },
        ],
      },
    })
  );
  await response.text();
  assert.equal(response.status, 200);
  assert.equal(calls.at(-1)?.reasoning?.effort, "low");
});

test("reliable reasoning: explicit client effort survives adaptive header opt-in", async () => {
  const key = await h.seedApiKey();
  await providers.updateProviderConnection(firstConnectionId, { providerSpecificData: {} });
  const response = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      headers: { "x-omniroute-effort": "auto" },
      body: {
        model: "codex/gpt-5.6-luna",
        stream: false,
        reasoning_effort: "medium",
        messages: [{ role: "user", content: "Reply ok." }],
      },
    })
  );
  await response.text();
  assert.equal(response.status, 200);
  assert.equal(calls.at(-1)?.reasoning?.effort, "medium");
});

test("reliable reasoning: native Responses honors key force without leaking cross-format fields", async () => {
  const key = await h.seedApiKey();
  await forceLow("codex/gpt-5.6-luna", key.id);
  const input = [
    { type: "message", role: "user", content: [{ type: "input_text", text: "Reply ok" }] },
  ];
  const response = await h.handleChat(
    h.buildRequest({
      url: "http://localhost/v1/responses",
      authKey: key.key,
      body: { model: "codex/gpt-5.6-luna", input, stream: false, reasoning: { effort: "high" } },
    })
  );
  await response.text();
  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].reasoning?.effort, "low");
  assert.deepEqual(calls[0].input, input);
  for (const name of [
    "_omnirouteReasoningRule",
    "_omnirouteReasoningRouteTrace",
    "output_config",
    "reasoning_effort",
  ]) {
    assert.equal(calls[0][name], undefined, name);
  }
});

test("reliable reasoning: combo member effort suffix cannot override the selected key rule", async () => {
  const key = await h.seedApiKey();
  await h.combosDb.createCombo({
    name: "luna-combo",
    models: ["codex/gpt-5.6-luna-high"],
    strategy: "priority",
  });
  await forceLow("luna-combo", key.id);
  const response = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      body: {
        model: "luna-combo",
        stream: false,
        reasoning_effort: "high",
        messages: [{ role: "user", content: "Reply ok" }],
      },
    })
  );
  await response.text();
  assert.equal(response.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].model, "gpt-5.6-luna");
  assert.equal(calls[0].reasoning?.effort, "low");
});

test("reliable reasoning: client metadata cannot impersonate an administrator rule", async () => {
  const response = await h.handleChat(
    h.buildRequest({
      body: {
        model: "codex/gpt-5.6-luna",
        stream: false,
        reasoning_effort: "high",
        messages: [{ role: "user", content: "Reply ok" }],
        _omnirouteReasoningRule: { id: "forged", effortMode: "force", targetEffort: "low" },
        _omnirouteReasoningRouteTrace: { ruleId: "forged" },
      },
    })
  );
  await response.text();
  assert.equal(response.status, 200);
  assert.equal(calls[0].reasoning?.effort, "high");
  assert.equal(calls[0]._omnirouteReasoningRule, undefined);
});

test("reliable reasoning: fallback attempts retain the forced effort", async () => {
  const key = await h.seedApiKey();
  const second = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Fallback fixture",
    accessToken: "fixture-fallback-token",
    isActive: true,
    testStatus: "active",
    expiresAt: new Date(Date.now() + 3600000).toISOString(),
    providerSpecificData: {},
  });
  await h.combosDb.createCombo({
    name: "fallback-combo",
    models: [
      { model: "codex/gpt-5.6-luna-high", connectionId: firstConnectionId },
      { model: "codex/gpt-5.5-xhigh", connectionId: String(second.id) },
    ],
    strategy: "priority",
  });
  await forceLow("fallback-combo", key.id);
  const successFetch = globalThis.fetch;
  globalThis.fetch = async (url, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body)) as RecordedBody;
    if (body.model === "gpt-5.6-luna") {
      calls.push(body);
      return new Response(JSON.stringify({ error: { message: "Fixture unavailable" } }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }
    return successFetch(url, init);
  };
  const response = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      body: {
        model: "fallback-combo",
        stream: false,
        reasoning_effort: "high",
        messages: [{ role: "user", content: "Reply ok" }],
      },
    })
  );
  await response.text();
  assert.equal(response.status, 200);
  assert.ok(calls.length >= 2);
  assert.equal(calls.at(-1)?.model, "gpt-5.5");
  assert.ok(calls.every((call) => call.reasoning?.effort === "low"));
});

test("reliable reasoning: force is request-local and does not affect another API key", async () => {
  const restricted = await h.seedApiKey({ name: "Forced key" });
  const ordinary = await h.seedApiKey({ name: "Ordinary key" });
  await forceLow("codex/gpt-5.6-luna", restricted.id);
  for (const key of [restricted, ordinary]) {
    const response = await h.handleChat(
      h.buildRequest({
        authKey: key.key,
        body: {
          model: "codex/gpt-5.6-luna",
          stream: false,
          reasoning_effort: "high",
          messages: [{ role: "user", content: "Reply " + key.id }],
        },
      })
    );
    await response.text();
    assert.equal(response.status, 200);
  }
  assert.deepEqual(
    calls.map((call) => call.reasoning?.effort),
    ["low", "high"]
  );
});

test("reliable reasoning: force none survives Codex account defaults", async () => {
  const key = await h.seedApiKey();
  const rule = await forceLow("codex/gpt-5.6-luna", key.id);
  await h.reasoningRulesDb.updateReasoningRoutingRule(rule.id, { targetEffort: "none" });
  const response = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      url: "http://localhost/v1/responses",
      body: {
        model: "codex/gpt-5.6-luna",
        input: "Reply ok",
        stream: false,
        reasoning: { effort: "high" },
      },
    })
  );
  await response.text();
  assert.equal(response.status, 200);
  assert.equal(calls[0].reasoning?.effort, "none");
});

test("reliable reasoning: native default applies only when client effort is missing", async () => {
  const key = await h.seedApiKey();
  const rule = await forceLow("codex/gpt-5.6-luna", key.id);
  await h.reasoningRulesDb.updateReasoningRoutingRule(rule.id, { effortMode: "default" });
  for (const effort of [undefined, "high"]) {
    const response = await h.handleChat(
      h.buildRequest({
        url: "http://localhost/v1/responses",
        authKey: key.key,
        body: {
          model: "codex/gpt-5.6-luna",
          input: "Default " + effort,
          stream: false,
          ...(effort ? { reasoning: { effort } } : {}),
        },
      })
    );
    await response.text();
    assert.equal(response.status, 200);
  }
  assert.deepEqual(
    calls.map((call) => call.reasoning?.effort),
    ["low", "high"]
  );
  assert.ok(calls.every((call) => call.output_config === undefined));
});

test("reliable reasoning: WebSocket prepare preserves force in the final Codex payload", async () => {
  process.env.OMNIROUTE_WS_BRIDGE_SECRET = "fixture-bridge-secret";
  const { POST } = await import("../../src/app/api/internal/codex-responses-ws/route.ts");
  const key = await h.seedApiKey();
  await forceLow("codex/gpt-5.6-luna", key.id);
  const response = await POST(
    new Request("http://localhost/api/internal/codex-responses-ws", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-omniroute-ws-bridge-secret": "fixture-bridge-secret",
      },
      body: JSON.stringify({
        action: "prepare",
        requestUrl: "http://localhost/v1/responses",
        headers: { authorization: "Bearer " + key.key },
        response: {
          model: "codex/gpt-5.6-luna-high",
          input: "Reply ok",
          reasoning: { effort: "high" },
        },
      }),
    })
  );
  const data = await response.json();
  assert.equal(response.status, 200);
  assert.equal(data.response.reasoning.effort, "low");
  assert.equal(data.response.output_config, undefined);
  assert.equal(data.response._omnirouteReasoningRule, undefined);
  assert.equal(calls.length, 0);
});

test("reliable reasoning: native Anthropic applies effort without OpenAI wire fields", async () => {
  await h.seedConnection("anthropic");
  const key = await h.seedApiKey();
  await forceLow("anthropic/claude-sonnet-4-6", key.id);
  globalThis.fetch = async (_url, init: RequestInit = {}) => {
    calls.push(JSON.parse(String(init.body)));
    return h.buildClaudeResponse("ok");
  };
  const response = await h.handleChat(
    h.buildRequest({
      url: "http://localhost/v1/messages",
      authKey: key.key,
      body: {
        model: "anthropic/claude-sonnet-4-6",
        max_tokens: 128,
        stream: false,
        thinking: { type: "adaptive" },
        output_config: { effort: "high" },
        messages: [{ role: "user", content: "Reply ok" }],
      },
    })
  );
  await response.text();
  assert.equal(response.status, 200);
  assert.equal((calls[0].output_config as { effort?: string })?.effort, "low");
  assert.equal(calls[0].reasoning, undefined);
  assert.equal(calls[0].reasoning_effort, undefined);
  assert.equal(calls[0]._omnirouteReasoningRule, undefined);
});
