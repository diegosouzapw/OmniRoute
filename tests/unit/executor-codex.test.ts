import test from "node:test";
import assert from "node:assert/strict";

import {
  CodexExecutor,
  __setCodexWebSocketTransportForTesting,
  encodeResponseSseEvent,
  getCodexModelScope,
  getCodexRateLimitKey,
  getCodexResetTime,
  getCodexUpstreamModel,
  isCodexResponsesWebSocketRequired,
  parseCodexQuotaHeaders,
} from "../../open-sse/executors/codex.ts";
import {
  DEFAULT_THINKING_CONFIG,
  setThinkingBudgetConfig,
  ThinkingMode,
} from "../../open-sse/services/thinkingBudget.ts";

test.afterEach(() => {
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
  __setCodexWebSocketTransportForTesting(undefined);
});

async function withEnv(entries, fn) {
  const previous = new Map();

  for (const [key, value] of Object.entries(entries)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  try {
    return await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

test("Codex helper functions isolate rate-limit scopes and parse quota headers", () => {
  const quota = parseCodexQuotaHeaders(
    new Headers({
      "x-codex-5h-usage": "100",
      "x-codex-5h-limit": "500",
      "x-codex-5h-reset-at": new Date(Date.now() + 60_000).toISOString(),
      "x-codex-7d-usage": "1000",
      "x-codex-7d-limit": "5000",
      "x-codex-7d-reset-at": new Date(Date.now() + 120_000).toISOString(),
    })
  );

  assert.equal(getCodexModelScope("codex-spark-mini"), "spark");
  assert.equal(getCodexModelScope("gpt-5.3-codex"), "codex");
  assert.equal(getCodexModelScope("gpt-5.5-xhigh"), "codex");
  assert.equal(getCodexUpstreamModel("gpt-5.5-xhigh"), "gpt-5.5");
  assert.equal(getCodexUpstreamModel("gpt-5.5-medium"), "gpt-5.5");
  // With mock WS transport + codexTransport=websocket, gpt-5.5 models require WS
  __setCodexWebSocketTransportForTesting(
    async () => ({ send() {}, close() {}, onmessage: null, onerror: null, onclose: null }) as any
  );
  assert.equal(
    isCodexResponsesWebSocketRequired("gpt-5.5-xhigh", {
      providerSpecificData: { codexTransport: "websocket" },
    }),
    true
  );
  assert.equal(
    isCodexResponsesWebSocketRequired("gpt-5.5-medium", {
      providerSpecificData: { codexTransport: "websocket" },
    }),
    true
  );
  assert.equal(
    isCodexResponsesWebSocketRequired("gpt-5.5-mini", {
      providerSpecificData: { codexTransport: "websocket" },
    }),
    true
  );
  // Without codexTransport setting, defaults to HTTP (false)
  assert.equal(isCodexResponsesWebSocketRequired("gpt-5.5-xhigh", {}), false);
  assert.equal(isCodexResponsesWebSocketRequired("gpt-5.5-medium", {}), false);
  __setCodexWebSocketTransportForTesting(undefined);
  assert.equal(getCodexRateLimitKey("acct-1", "codex-spark-mini"), "acct-1:spark");
  assert.equal(quota.usage5h, 100);
  assert.equal(quota.limit7d, 5000);
  assert.ok(getCodexResetTime(quota) >= new Date(quota.resetAt7d).getTime());
});

test("CodexExecutor.buildUrl honors /responses subpaths and compact mode", () => {
  const executor = new CodexExecutor();

  assert.equal(
    executor.buildUrl("gpt-5.3-codex", true, 0, {}),
    "https://chatgpt.com/backend-api/codex/responses"
  );
  assert.equal(
    executor.buildUrl("gpt-5.3-codex", true, 0, { requestEndpointPath: "/responses" }),
    "https://chatgpt.com/backend-api/codex/responses"
  );
  assert.equal(
    executor.buildUrl("gpt-5.3-codex", true, 0, { requestEndpointPath: "/responses/compact" }),
    "https://chatgpt.com/backend-api/codex/responses/compact"
  );
});

test("CodexExecutor.buildHeaders binds workspace ids and disables SSE accept for compact responses", () => {
  const executor = new CodexExecutor();
  const standardHeaders = executor.buildHeaders(
    {
      accessToken: "codex-token",
      providerSpecificData: { workspaceId: "workspace-1" },
    },
    true
  );
  const compactHeaders = executor.buildHeaders(
    {
      accessToken: "codex-token",
      requestEndpointPath: "/responses/compact",
    },
    true
  );

  assert.equal(standardHeaders.Authorization, "Bearer codex-token");
  assert.equal(standardHeaders.Accept, "text/event-stream");
  assert.equal(standardHeaders["chatgpt-account-id"], "workspace-1");
  assert.equal(standardHeaders.Version, "0.125.0");
  assert.equal(standardHeaders["Openai-Beta"], "responses=experimental");
  assert.equal(standardHeaders["X-Codex-Beta-Features"], "responses_websockets");
  assert.equal(standardHeaders["User-Agent"], "codex-cli/0.125.0 (Windows 10.0.26100; x64)");
  assert.equal(compactHeaders.Accept, "application/json");
});

test("CodexExecutor.buildHeaders honors safe env overrides for Version and User-Agent", async () => {
  const executor = new CodexExecutor();

  await withEnv(
    {
      CODEX_CLIENT_VERSION: "0.120.0-alpha.3",
      CODEX_USER_AGENT: undefined,
    },
    () => {
      const headers = executor.buildHeaders({ accessToken: "codex-token" }, true);
      assert.equal(headers.Version, "0.120.0-alpha.3");
      assert.equal(headers["User-Agent"], "codex-cli/0.120.0-alpha.3 (Windows 10.0.26100; x64)");
    }
  );

  await withEnv(
    {
      CODEX_CLIENT_VERSION: "bad version value",
      CODEX_USER_AGENT: "custom-codex/9.9.9",
    },
    () => {
      const headers = executor.buildHeaders({ accessToken: "codex-token" }, true);
      assert.equal(headers.Version, "0.125.0");
      assert.equal(headers["User-Agent"], "custom-codex/9.9.9");
    }
  );
});

test("CodexExecutor.transformRequest injects default instructions, clamps reasoning and strips unsupported fields", () => {
  const executor = new CodexExecutor();
  const body = {
    model: "gpt-5-mini",
    messages: [{ role: "user", content: "hello" }],
    tools: [{ type: "function", function: { name: "test_tool" } }],
    prompt: "legacy",
    stream_options: { include_usage: true },
    instructions: "",
    reasoning_effort: "xhigh",
    service_tier: "fast",
    temperature: 0.4,
    user: "cursor",
  };

  const result = executor.transformRequest("gpt-5-mini-xhigh", body, false, {
    requestEndpointPath: "/responses",
  });

  assert.equal(result.stream, true);
  assert.equal(result.store, false);
  assert.equal(result.instructions.length > 0, true);
  assert.equal(result.reasoning.effort, "high");
  assert.equal(result.service_tier, "priority");
  assert.equal(result.messages, undefined);
  assert.equal(result.prompt, undefined);
  assert.equal(result.temperature, undefined);
  assert.equal(result.user, undefined);
  assert.equal(result.stream_options, undefined);
});

test("CodexExecutor.transformRequest preserves compact requests and native passthrough semantics", () => {
  const executor = new CodexExecutor();
  const body = {
    _nativeCodexPassthrough: true,
    instructions: "keep this",
    stream: false,
  };
  const result = executor.transformRequest("gpt-5.3-codex", body, false, {
    requestEndpointPath: "/responses/compact",
    providerSpecificData: {
      requestDefaults: { serviceTier: "priority" },
    },
  });

  assert.equal(result._nativeCodexPassthrough, undefined);
  assert.equal(result.stream, undefined);
  assert.equal(result.service_tier, "priority");
  assert.equal(result.reasoning.effort, "medium");
  assert.equal(result.store, false);
  assert.equal(result.instructions, "keep this");
});

test("CodexExecutor.transformRequest preserves store-enabled responses state when explicitly enabled", () => {
  const executor = new CodexExecutor();
  const body = {
    _nativeCodexPassthrough: true,
    _omnirouteResponsesStore: true,
    instructions: "keep this",
    previous_response_id: "resp_prev_123",
    stream: false,
  };

  const result = executor.transformRequest("gpt-5.3-codex", body, false, {
    requestEndpointPath: "/responses/compact",
    providerSpecificData: {
      openaiStoreEnabled: true,
      requestDefaults: { serviceTier: "priority" },
    },
  });

  assert.equal(result._omnirouteResponsesStore, undefined);
  assert.equal(result.store, true);
  assert.equal(result.previous_response_id, undefined);
});

test("CodexExecutor.transformRequest applies per-connection reasoning and service tier defaults", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.3-codex",
    { model: "gpt-5.3-codex", input: [] },
    false,
    {
      providerSpecificData: {
        requestDefaults: {
          reasoningEffort: "high",
          serviceTier: "priority",
        },
      },
    }
  );

  assert.equal(result.reasoning.effort, "high");
  assert.equal(result.service_tier, "priority");
});

test("CodexExecutor.transformRequest keeps explicit request values ahead of connection defaults", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.3-codex",
    {
      model: "gpt-5.3-codex",
      input: [],
      reasoning_effort: "none",
      service_tier: "standard",
    },
    false,
    {
      providerSpecificData: {
        requestDefaults: {
          reasoningEffort: "high",
          serviceTier: "priority",
        },
      },
    }
  );

  assert.equal(result.reasoning.effort, "none");
  assert.equal(result.service_tier, "standard");
});

test("CodexExecutor.transformRequest lets model suffix beat connection reasoning defaults", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.3-codex-high",
    { model: "gpt-5.3-codex-high", input: [] },
    false,
    {
      providerSpecificData: {
        requestDefaults: {
          reasoningEffort: "low",
        },
      },
    }
  );

  assert.equal(result.model, "gpt-5.3-codex");
  assert.equal(result.reasoning.effort, "high");
});

test("CodexExecutor.transformRequest keeps gpt-5.5 as the model and applies xhigh reasoning", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.5-xhigh",
    { model: "gpt-5.5-xhigh", input: [] },
    false,
    {}
  );

  assert.equal(result.model, "gpt-5.5");
  assert.equal(result.reasoning.effort, "xhigh");
});

test("CodexExecutor.execute falls back to HTTP when websocket transport is unavailable", async () => {
  __setCodexWebSocketTransportForTesting(null);
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ id: "resp_http_fallback", object: "response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const result = await executor.execute({
      model: "gpt-5.5-xhigh",
      body: { model: "gpt-5.5-xhigh", input: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: {
        accessToken: "codex-token",
        providerSpecificData: { codexTransport: "websocket" },
      },
    });

    // When WS transport is unavailable, isCodexResponsesWebSocketRequired returns false
    // and the executor falls back to HTTP via super.execute()
    assert.equal(result.response.status, 200);
    assert.equal(result.transformedBody.model, "gpt-5.5");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("CodexExecutor maps Codex websocket error events to response.failed SSE", () => {
  const raw = JSON.stringify({
    type: "error",
    status_code: 429,
    error: {
      type: "usage_limit_reached",
      message: "The usage limit has been reached",
    },
  });

  const result = encodeResponseSseEvent(raw);
  assert.equal(result.terminal, true);
  assert.match(result.sse, /^event: response\.failed/m);

  const dataLine = result.sse.split("\n").find((line) => line.startsWith("data: "));
  assert.ok(dataLine);
  const payload = JSON.parse(dataLine.slice("data: ".length));
  assert.equal(payload.type, "response.failed");
  assert.equal(payload.response.status, "failed");
  assert.equal(payload.response.error.code, "usage_limit_reached");
  assert.equal(payload.response.error.status_code, 429);
});

test("CodexExecutor.transformRequest does not apply connection reasoning defaults when Thinking Budget is not passthrough", () => {
  const executor = new CodexExecutor();
  setThinkingBudgetConfig({ mode: ThinkingMode.AUTO });

  const noDefaults = executor.transformRequest(
    "gpt-5.3-codex",
    { model: "gpt-5.3-codex", input: [] },
    false,
    {
      providerSpecificData: {
        requestDefaults: {
          reasoningEffort: "high",
        },
      },
    }
  );
  const explicit = executor.transformRequest(
    "gpt-5.3-codex",
    { model: "gpt-5.3-codex", input: [], reasoning_effort: "high" },
    false,
    {
      providerSpecificData: {
        requestDefaults: {
          reasoningEffort: "low",
        },
      },
    }
  );

  assert.equal(noDefaults.reasoning, undefined);
  assert.equal(explicit.reasoning.effort, "high");
});

test("CodexExecutor.refreshCredentials refreshes OAuth tokens and returns null without a refresh token", async () => {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.match(String(url), /auth\.openai\.com\/oauth\/token$/);
    return new Response(
      JSON.stringify({
        access_token: "new-token",
        refresh_token: "new-refresh",
        expires_in: 3600,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    assert.equal(await executor.refreshCredentials({}, null), null);
    const refreshed = await executor.refreshCredentials({ refreshToken: "refresh-me" }, null);
    assert.deepEqual(refreshed, {
      accessToken: "new-token",
      refreshToken: "new-refresh",
      expiresIn: 3600,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("CodexExecutor maps usage_limit_reached websocket failures without explicit status to 429", () => {
  const raw = JSON.stringify({
    type: "response.failed",
    response: {
      id: "resp_usage_limit",
      status: "failed",
      error: {
        code: "usage_limit_reached",
        message: "Your weekly usage limit has been reached",
      },
    },
  });

  const result = encodeResponseSseEvent(raw);
  assert.equal(result.terminal, true);

  const dataLine = result.sse.split("\n").find((line) => line.startsWith("data: "));
  assert.ok(dataLine);
  const payload = JSON.parse(dataLine.slice("data: ".length));
  assert.equal(payload.type, "response.failed");
  assert.equal(payload.response.id, "resp_usage_limit");
  assert.equal(payload.response.error.code, "usage_limit_reached");
  assert.equal(payload.response.error.status_code, 429);
});

test("Codex internal websocket bridge secret comparison handles mismatched lengths safely", async () => {
  const { bridgeSecretMatches } =
    await import("../../src/app/api/internal/codex-responses-ws/route.ts");

  assert.equal(bridgeSecretMatches("bridge-secret", "bridge-secret"), true);
  assert.equal(bridgeSecretMatches("bridge-secret", "bridge-secret-extra"), false);
  assert.equal(bridgeSecretMatches("bridge-secret", ""), false);
});

test("Codex internal websocket bridge rejects non-object JSON payloads", async () => {
  await withEnv({ OMNIROUTE_WS_BRIDGE_SECRET: "bridge-secret" }, async () => {
    const { POST } = await import("../../src/app/api/internal/codex-responses-ws/route.ts");

    const response = await POST(
      new Request("http://omniroute.local/api/internal/codex-responses-ws", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-omniroute-ws-bridge-secret": "bridge-secret",
        },
        body: JSON.stringify(["invalid"]),
      })
    );
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.equal(body.error.code, "invalid_json");
    assert.match(body.error.message, /JSON object/);
  });
});
