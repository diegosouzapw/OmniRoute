import test from "node:test";
import assert from "node:assert/strict";

import {
  applyConfiguredUserAgent,
  BaseExecutor,
  getCustomUserAgent,
  mergeAbortSignals,
  mergeUpstreamExtraHeaders,
  setUserAgentHeader,
} from "../../open-sse/executors/base.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { PROVIDERS } from "../../open-sse/config/constants.ts";
import {
  CLAUDE_CODE_COMPATIBLE_ANTHROPIC_VERSION,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  CONTEXT_1M_BETA_HEADER,
} from "../../open-sse/services/claudeCodeCompatible.ts";

class TestExecutor extends BaseExecutor {
  constructor(config = {}) {
    super("test-provider", {
      baseUrls: [
        "https://primary.example/v1/chat/completions",
        "https://fallback.example/v1/chat/completions",
      ],
      headers: { "X-Test-Header": "base" },
      ...config,
    });
  }

  async transformRequest(model, body, stream) {
    return { ...body, transformed: true, model, stream };
  }
}

test("BaseExecutor: openai-compatible buildUrl sanitizes custom chat paths", () => {
  const executor = new BaseExecutor("openai-compatible-test", {});
  const valid = executor.buildUrl("gpt-4.1", true, 0, {
    providerSpecificData: {
      baseUrl: "https://proxy.example/v1/",
      chatPath: "/custom/chat/completions",
    },
  });
  const invalid = executor.buildUrl("gpt-4.1", true, 0, {
    providerSpecificData: {
      baseUrl: "https://proxy.example/v1/",
      chatPath: "../evil",
    },
  });
  const invalidNullByte = executor.buildUrl("gpt-4.1", true, 0, {
    providerSpecificData: {
      baseUrl: "https://proxy.example/v1/",
      chatPath: "/ok\0evil",
    },
  });

  assert.equal(valid, "https://proxy.example/v1/custom/chat/completions");
  assert.equal(invalid, "https://proxy.example/v1/chat/completions");
  assert.equal(invalidNullByte, "https://proxy.example/v1/chat/completions");
});

test("BaseExecutor: legacy openai-compatible providers honor providerSpecificData.apiType", () => {
  const executor = new BaseExecutor("openai-compatible-sp-openai", {});
  const url = executor.buildUrl("gpt-5.4", true, 0, {
    providerSpecificData: {
      apiType: "responses",
      baseUrl: "https://proxy.example/v1/",
    },
  });

  assert.equal(url, "https://proxy.example/v1/responses");
});

test("DefaultExecutor.buildUrl handles Gemini, Claude and Qwen variants", () => {
  const gemini = new DefaultExecutor("gemini");
  const claude = new DefaultExecutor("claude");
  const qwen = new DefaultExecutor("qwen");

  assert.equal(
    gemini.buildUrl("gemini-2.5-flash", false),
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
  );
  assert.equal(
    gemini.buildUrl("gemini-2.5-flash", true),
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse"
  );
  assert.equal(claude.buildUrl("claude-sonnet-4", true), `${PROVIDERS.claude.baseUrl}?beta=true`);
  assert.equal(qwen.buildUrl("qwen3-coder", true), "https://portal.qwen.ai/v1/chat/completions");
  assert.equal(
    qwen.buildUrl("qwen3-coder", true, 0, {
      providerSpecificData: { resourceUrl: "custom.qwen.ai" },
    }),
    "https://custom.qwen.ai/v1/chat/completions"
  );
});

test("DefaultExecutor.buildUrl handles openai-compatible and anthropic-compatible providers", () => {
  const openAICompat = new DefaultExecutor("openai-compatible-test");
  const openAIResponsesCompat = new DefaultExecutor("openai-compatible-responses-test");
  const openAILegacyResponsesCompat = new DefaultExecutor("openai-compatible-sp-openai");
  const anthropicCompat = new DefaultExecutor("anthropic-compatible-test");
  const anthropicCcCompat = new DefaultExecutor("anthropic-compatible-cc-test");

  assert.equal(
    openAICompat.buildUrl("gpt-4.1", true, 0, {
      providerSpecificData: { baseUrl: "https://proxy.example/v1/" },
    }),
    "https://proxy.example/v1/chat/completions"
  );
  assert.equal(
    openAICompat.buildUrl("gpt-4.1", true, 0, {
      providerSpecificData: {
        baseUrl: "https://proxy.example/v1/",
        chatPath: "/custom/chat",
      },
    }),
    "https://proxy.example/v1/custom/chat"
  );
  assert.equal(
    openAIResponsesCompat.buildUrl("gpt-4.1", true, 0, {
      providerSpecificData: { baseUrl: "https://proxy.example/v1/" },
    }),
    "https://proxy.example/v1/responses"
  );
  assert.equal(
    openAILegacyResponsesCompat.buildUrl("gpt-5.4", true, 0, {
      providerSpecificData: {
        apiType: "responses",
        baseUrl: "https://proxy.example/v1/",
      },
    }),
    "https://proxy.example/v1/responses"
  );
  assert.equal(
    anthropicCompat.buildUrl("claude-sonnet-4", true, 0, {
      providerSpecificData: { baseUrl: "https://anthropic.example/v1/" },
    }),
    "https://anthropic.example/v1/messages"
  );
  assert.equal(
    anthropicCompat.buildUrl("claude-sonnet-4", true, 0, {
      providerSpecificData: {
        baseUrl: "https://anthropic.example/v1/",
        chatPath: "/custom/messages",
      },
    }),
    "https://anthropic.example/v1/custom/messages"
  );
  assert.equal(
    anthropicCcCompat.buildUrl("claude-sonnet-4", true, 0, {
      providerSpecificData: {
        baseUrl: "https://cc.example/v1/messages",
      },
    }),
    `https://cc.example${CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH}`
  );
});

test("DefaultExecutor.buildUrl normalizes configurable chat-openai-compat base URLs", () => {
  const bailian = new DefaultExecutor("bailian-coding-plan");
  const heroku = new DefaultExecutor("heroku");
  const databricks = new DefaultExecutor("databricks");
  const snowflake = new DefaultExecutor("snowflake");
  const gigachat = new DefaultExecutor("gigachat");

  assert.equal(
    bailian.buildUrl("qwen3-coder-plus", true, 0, {
      providerSpecificData: {
        baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
      },
    }),
    "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1/messages?beta=true"
  );
  assert.equal(
    heroku.buildUrl("claude-4-sonnet", true, 0, {
      providerSpecificData: { baseUrl: "https://us.inference.heroku.com" },
    }),
    "https://us.inference.heroku.com/v1/chat/completions"
  );
  assert.equal(
    databricks.buildUrl("databricks-gpt-5", true, 0, {
      providerSpecificData: {
        baseUrl: "https://adb-1234567890123456.7.azuredatabricks.net/serving-endpoints",
      },
    }),
    "https://adb-1234567890123456.7.azuredatabricks.net/serving-endpoints/chat/completions"
  );
  assert.equal(
    snowflake.buildUrl("llama3.3-70b", true, 0, {
      providerSpecificData: { baseUrl: "https://account.snowflakecomputing.com" },
    }),
    "https://account.snowflakecomputing.com/api/v2/cortex/inference:complete"
  );
  assert.equal(
    gigachat.buildUrl("GigaChat-2-Pro", true, 0, {
      providerSpecificData: { baseUrl: "https://gigachat.devices.sberbank.ru/api/v1" },
    }),
    "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"
  );
});

test("DefaultExecutor.buildUrl falls back to OpenAI config for unknown providers", () => {
  const executor = new DefaultExecutor("unknown-provider");
  assert.equal(executor.config.baseUrl, PROVIDERS.openai.baseUrl);
  assert.equal(executor.buildUrl("gpt-4.1", true), PROVIDERS.openai.baseUrl);
});

test("DefaultExecutor.buildHeaders handles Gemini and Claude auth modes", () => {
  const gemini = new DefaultExecutor("gemini");
  const claude = new DefaultExecutor("claude");

  const geminiApiKeyHeaders = gemini.buildHeaders({ apiKey: "gem-key" }, true);
  const geminiOAuthHeaders = gemini.buildHeaders({ accessToken: "gem-token" }, false);
  const claudeApiKeyHeaders = claude.buildHeaders({ apiKey: "claude-key" }, true);
  const claudeOAuthHeaders = claude.buildHeaders({ accessToken: "claude-token" }, false);

  assert.equal(geminiApiKeyHeaders["x-goog-api-key"], "gem-key");
  assert.equal(geminiApiKeyHeaders.Accept, "text/event-stream");
  assert.equal(geminiApiKeyHeaders.Authorization, undefined);
  assert.equal(geminiOAuthHeaders.Authorization, "Bearer gem-token");
  assert.equal(claudeApiKeyHeaders["x-api-key"], "claude-key");
  assert.equal(claudeApiKeyHeaders.Accept, "text/event-stream");
  assert.equal(claudeOAuthHeaders.Authorization, "Bearer claude-token");
  assert.equal(claudeOAuthHeaders["x-api-key"], undefined);
});

test("DefaultExecutor.buildHeaders handles GLM, default auth and anthropic-compatible headers", () => {
  const glm = new DefaultExecutor("glm");
  const glmt = new DefaultExecutor("glmt");
  const openai = new DefaultExecutor("openai");
  const anthropicCompat = new DefaultExecutor("anthropic-compatible-test");

  const glmHeaders = glm.buildHeaders({ accessToken: "glm-token" }, false);
  const glmtHeaders = glmt.buildHeaders({ apiKey: "glmt-key" }, false);
  const openaiHeaders = openai.buildHeaders({ apiKey: "sk-openai" }, true);
  const anthropicHeaders = anthropicCompat.buildHeaders({ apiKey: "anth-key" }, true);

  assert.equal(glmHeaders["x-api-key"], "glm-token");
  assert.equal(glmtHeaders["x-api-key"], "glmt-key");
  assert.equal(openaiHeaders.Authorization, "Bearer sk-openai");
  assert.equal(openaiHeaders.Accept, "text/event-stream");
  assert.equal(anthropicHeaders["x-api-key"], "anth-key");
  assert.equal(anthropicHeaders["anthropic-version"], "2023-06-01");
  assert.equal(anthropicHeaders.Accept, "text/event-stream");
});

test("DefaultExecutor.buildHeaders handles Snowflake PATs and GigaChat access tokens", () => {
  const snowflake = new DefaultExecutor("snowflake");
  const gigachat = new DefaultExecutor("gigachat");

  const snowflakePatHeaders = snowflake.buildHeaders({ apiKey: "pat/test-token" }, false);
  const snowflakeJwtHeaders = snowflake.buildHeaders({ apiKey: "jwt-token" }, false);
  const gigachatHeaders = gigachat.buildHeaders({ accessToken: "gigachat-token" }, false);

  assert.equal(snowflakePatHeaders.Authorization, "Bearer test-token");
  assert.equal(
    snowflakePatHeaders["X-Snowflake-Authorization-Token-Type"],
    "PROGRAMMATIC_ACCESS_TOKEN"
  );
  assert.equal(snowflakeJwtHeaders.Authorization, "Bearer jwt-token");
  assert.equal(snowflakeJwtHeaders["X-Snowflake-Authorization-Token-Type"], "KEYPAIR_JWT");
  assert.equal(gigachatHeaders.Authorization, "Bearer gigachat-token");
});

test("DefaultExecutor.buildHeaders strips DashScope headers for Qwen API keys and preserves them for OAuth", () => {
  const executor = new DefaultExecutor("qwen");

  const apiKeyHeaders = executor.buildHeaders({ apiKey: "dash-key" }, true);
  const oauthHeaders = executor.buildHeaders({ accessToken: "oauth-token" }, true);

  assert.equal(apiKeyHeaders.Authorization, "Bearer dash-key");
  assert.equal(
    Object.keys(apiKeyHeaders).some((key) => key.toLowerCase().startsWith("x-dashscope-")),
    false
  );
  assert.equal(oauthHeaders.Authorization, "Bearer oauth-token");
  assert.equal(oauthHeaders["X-Dashscope-AuthType"], "qwen-oauth");
  assert.equal(oauthHeaders["X-Dashscope-CacheControl"], "enable");
});

test("DefaultExecutor.buildHeaders rotates extra API keys and builds Claude Code compatible headers", () => {
  const openai = new DefaultExecutor("openai");
  const cc = new DefaultExecutor("anthropic-compatible-cc-test");

  const first = openai.buildHeaders(
    {
      apiKey: "primary",
      connectionId: "conn-rotation",
      providerSpecificData: { extraApiKeys: ["extra-1", "extra-2"] },
    },
    false
  );
  const second = openai.buildHeaders(
    {
      apiKey: "primary",
      connectionId: "conn-rotation",
      providerSpecificData: { extraApiKeys: ["extra-1", "extra-2"] },
    },
    false
  );
  const ccHeaders = cc.buildHeaders(
    {
      apiKey: "cc-key",
      providerSpecificData: { ccSessionId: "session-1" },
    },
    true
  );
  const ccJsonHeaders = cc.buildHeaders(
    {
      apiKey: "cc-key",
      providerSpecificData: { ccSessionId: "session-1" },
    },
    false
  );

  assert.equal(first.Authorization, "Bearer primary");
  assert.equal(second.Authorization, "Bearer extra-1");
  assert.equal(ccHeaders.Authorization, "Bearer cc-key");
  assert.equal(ccHeaders["x-api-key"], undefined);
  assert.equal(ccHeaders["anthropic-version"], CLAUDE_CODE_COMPATIBLE_ANTHROPIC_VERSION);
  assert.equal(ccHeaders["X-Claude-Code-Session-Id"], "session-1");
  assert.equal(ccHeaders.Accept, "application/json");
  assert.equal(ccJsonHeaders.Accept, "application/json");
});

test("DefaultExecutor.execute uses CC-compatible connection defaults to append 1M beta", async () => {
  const originalFetch = globalThis.fetch;
  const calls = [];
  const toPlainHeaders = (headers) =>
    headers instanceof Headers
      ? Object.fromEntries(headers.entries())
      : Object.fromEntries(
          Object.entries(headers || {}).map(([key, value]) => [
            key,
            value == null ? "" : String(value),
          ])
        );

  globalThis.fetch = async (_url, init = {}) => {
    calls.push({ headers: toPlainHeaders(init.headers) });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const cc = new DefaultExecutor("anthropic-compatible-cc-test");
    await cc.execute({
      model: "claude-sonnet-4-6",
      body: {
        model: "claude-sonnet-4-6",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: {
        apiKey: "cc-key",
        providerSpecificData: {
          baseUrl: "https://cc.example.com/v1/messages?beta=true",
          ccSessionId: "session-1",
        },
      },
      extendedContext: false,
    });
    await cc.execute({
      model: "claude-sonnet-4-6",
      body: {
        model: "claude-sonnet-4-6",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: {
        apiKey: "cc-key",
        providerSpecificData: {
          baseUrl: "https://cc.example.com/v1/messages?beta=true",
          ccSessionId: "session-1",
          requestDefaults: { context1m: true },
        },
      },
      extendedContext: false,
    });

    const anthropicCompat = new DefaultExecutor("anthropic-compatible-test");
    await anthropicCompat.execute({
      model: "claude-sonnet-4-6",
      body: {
        model: "claude-sonnet-4-6",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: {
        apiKey: "anth-key",
        providerSpecificData: {
          baseUrl: "https://anthropic.example.com/v1",
        },
      },
      extendedContext: true,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(calls[0].headers["anthropic-beta"].includes(CONTEXT_1M_BETA_HEADER), false);
  assert.equal(calls[1].headers["anthropic-beta"].includes(CONTEXT_1M_BETA_HEADER), true);
  assert.equal(calls[2].headers["anthropic-beta"], CONTEXT_1M_BETA_HEADER);
});

test("DefaultExecutor.transformRequest is a passthrough and preserves model ids with slashes", () => {
  const executor = new DefaultExecutor("openai");
  const body = { model: "zai-org/GLM-5-FP8", messages: [{ role: "user", content: "hi" }] };
  const result = executor.transformRequest("zai-org/GLM-5-FP8", body, true, {});

  assert.equal(result, body);
  assert.equal(result.model, "zai-org/GLM-5-FP8");
});

test("DefaultExecutor.transformRequest neutralizes incompatible tool_choice for Qwen thinking", () => {
  const executor = new DefaultExecutor("qwen");
  const body = {
    messages: [{ role: "user", content: "hi" }],
    thinking: { type: "enabled" },
    tool_choice: { type: "function", function: { name: "pwd" } },
  };
  const result = executor.transformRequest("qwen3-coder-plus", body, true, {});

  assert.notEqual(result, body);
  assert.equal(result.tool_choice, "auto");
});

test("DefaultExecutor.transformRequest applies GLMT preset defaults without overriding explicit values", () => {
  const executor = new DefaultExecutor("glmt");

  const autoBody = {
    messages: [{ role: "user", content: "hi" }],
  };
  const autoResult = executor.transformRequest("glm-5.1", autoBody, true, {});

  assert.notEqual(autoResult, autoBody);
  assert.equal(autoResult.max_tokens, 65536);
  assert.equal(autoResult.temperature, 0.2);
  assert.deepEqual(autoResult.thinking, {
    type: "enabled",
    budget_tokens: 24576,
  });

  const explicitBody = {
    messages: [{ role: "user", content: "hi" }],
    max_tokens: 4096,
    temperature: 0.7,
    thinking: { type: "enabled" },
  };
  const explicitResult = executor.transformRequest("glm-5.1", explicitBody, true, {});

  assert.notEqual(explicitResult, explicitBody);
  assert.equal(explicitResult.max_tokens, 4096);
  assert.equal(explicitResult.temperature, 0.7);
  assert.deepEqual(explicitResult.thinking, {
    type: "enabled",
    budget_tokens: 4095,
  });
});

test("BaseExecutor helpers manage custom user agents and upstream extra headers", () => {
  const headers = { "user-agent": "old", Authorization: "Bearer old" };

  assert.equal(getCustomUserAgent({ customUserAgent: "  MyAgent/1.0  " }), "MyAgent/1.0");
  assert.equal(getCustomUserAgent({ customUserAgent: "   " }), null);

  setUserAgentHeader(headers, "MyAgent/2.0");
  assert.equal(headers["User-Agent"], "MyAgent/2.0");
  assert.equal(headers["user-agent"], "MyAgent/2.0");

  applyConfiguredUserAgent(headers, { customUserAgent: "MyAgent/3.0" });
  assert.equal(headers["User-Agent"], "MyAgent/3.0");

  mergeUpstreamExtraHeaders(headers, {
    Authorization: "Bearer override",
    "user-agent": "Merged/4.0",
    "X-Upstream": "1",
  });
  assert.equal(headers.Authorization, "Bearer override");
  assert.equal(headers["User-Agent"], "Merged/4.0");
  assert.equal(headers["user-agent"], "Merged/4.0");
  assert.equal(headers["X-Upstream"], "1");
});

test("BaseExecutor.mergeAbortSignals aborts when either source signal aborts", () => {
  const primary = new AbortController();
  const secondary = new AbortController();
  const merged = mergeAbortSignals(primary.signal, secondary.signal);

  assert.equal(merged.aborted, false);
  const primaryReason = new Error("primary timeout");
  primaryReason.name = "TimeoutError";
  primary.abort(primaryReason);
  assert.equal(merged.aborted, true);
  assert.equal(merged.reason, primaryReason);

  const otherPrimary = new AbortController();
  const otherSecondary = new AbortController();
  const merged2 = mergeAbortSignals(otherPrimary.signal, otherSecondary.signal);
  const secondaryReason = new Error("client closed");
  otherSecondary.abort(secondaryReason);
  assert.equal(merged2.aborted, true);
  assert.equal(merged2.reason, secondaryReason);
});

test("BaseExecutor.needsRefresh returns true only when expiry is near", () => {
  const executor = new TestExecutor();
  const soon = new Date(Date.now() + 60_000).toISOString();
  const later = new Date(Date.now() + 60 * 60 * 1000).toISOString();

  assert.equal(executor.needsRefresh({ expiresAt: soon }), true);
  assert.equal(executor.needsRefresh({ expiresAt: later }), false);
  assert.equal(executor.needsRefresh({}), false);
});

test("DefaultExecutor.refreshCredentials returns null without refresh token", async () => {
  const executor = new DefaultExecutor("gemini");
  const result = await executor.refreshCredentials({}, null);
  assert.equal(result, null);
});

test("DefaultExecutor.needsRefresh requests a proactive token for GigaChat", () => {
  const executor = new DefaultExecutor("gigachat");

  assert.equal(executor.needsRefresh({ apiKey: "base64-basic-credentials" }), true);
  assert.equal(
    executor.needsRefresh({
      apiKey: "base64-basic-credentials",
      accessToken: "existing-token",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    }),
    false
  );
});

test("DefaultExecutor.refreshCredentials delegates to OAuth refresh and returns new tokens", async () => {
  const executor = new DefaultExecutor("gemini");
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    assert.match(String(url), /oauth2\.googleapis\.com/);
    assert.equal(options.method, "POST");
    return new Response(
      JSON.stringify({
        access_token: "new-access-token",
        refresh_token: "new-refresh-token",
        expires_in: 3600,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  try {
    const result = await executor.refreshCredentials({ refreshToken: "refresh-me" }, null);
    assert.deepEqual(result, {
      accessToken: "new-access-token",
      refreshToken: "new-refresh-token",
      expiresIn: 3600,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("DefaultExecutor.refreshCredentials swallows refresh errors and logs them", async () => {
  const executor = new DefaultExecutor("gemini");
  const originalFetch = globalThis.fetch;
  const messages = [];
  globalThis.fetch = async () => {
    throw new Error("network down");
  };

  try {
    const result = await executor.refreshCredentials(
      { refreshToken: "refresh-me" },
      { error: (tag, message) => messages.push({ tag, message }) }
    );
    assert.equal(result, null);
    assert.equal(messages.length, 1);
    assert.match(messages[0].message, /refresh error: network down/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute returns response metadata and merges headers", async () => {
  const executor = new TestExecutor();
  const originalFetch = globalThis.fetch;
  let captured;
  globalThis.fetch = async (url, options) => {
    captured = { url, options };
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gpt-4.1",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {
        apiKey: "base-key",
        providerSpecificData: { customUserAgent: "CredsAgent/1.0" },
      },
      upstreamExtraHeaders: {
        Authorization: "Bearer override",
        "user-agent": "UpstreamAgent/2.0",
        "X-Trace-Id": "trace-1",
      },
    });

    assert.equal(result.url, "https://primary.example/v1/chat/completions");
    assert.equal(result.response.status, 200);
    assert.equal(result.transformedBody.transformed, true);
    assert.equal(result.transformedBody.model, "gpt-4.1");
    assert.equal(result.headers.Authorization, "Bearer override");
    assert.equal(result.headers["User-Agent"], "UpstreamAgent/2.0");
    assert.equal(result.headers["user-agent"], undefined);
    assert.equal(result.headers["X-Trace-Id"], "trace-1");
    assert.equal(result.headers.Accept, "text/event-stream");
    assert.equal(captured.options.body.includes('"transformed":true'), true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute refreshes credentials before the request when needed", async () => {
  class RefreshingExecutor extends BaseExecutor {
    constructor() {
      super("refreshing-provider", {
        baseUrl: "https://refresh.example/v1/chat/completions",
      });
    }

    needsRefresh() {
      return true;
    }

    async refreshCredentials() {
      return {
        accessToken: "fresh-token",
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      };
    }
  }

  const executor = new RefreshingExecutor();
  const originalFetch = globalThis.fetch;
  let capturedHeaders;
  globalThis.fetch = async (url, options) => {
    assert.equal(String(url), "https://refresh.example/v1/chat/completions");
    capturedHeaders = options.headers;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };

  try {
    await executor.execute({
      model: "gpt-4.1",
      body: {},
      stream: false,
      credentials: { apiKey: "stale-token" },
    });

    assert.equal(capturedHeaders.Authorization, "Bearer fresh-token");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute falls back to the next base URL after a transport error", async () => {
  const executor = new TestExecutor();
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (calls.length === 1) {
      throw new Error("first node down");
    }
    return new Response("ok", { status: 200 });
  };

  try {
    const result = await executor.execute({
      model: "gpt-4.1",
      body: { hello: "world" },
      stream: false,
      credentials: {},
    });

    assert.deepEqual(calls, [
      "https://primary.example/v1/chat/completions",
      "https://fallback.example/v1/chat/completions",
    ]);
    assert.equal(result.url, "https://fallback.example/v1/chat/completions");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute throws the last error when all URLs fail", async () => {
  const executor = new TestExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("still down");
  };

  try {
    await assert.rejects(
      executor.execute({
        model: "gpt-4.1",
        body: {},
        stream: false,
        credentials: {},
      }),
      /still down/
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute propagates aborted requests through the merged signal", async () => {
  const executor = new TestExecutor({ baseUrls: ["https://single.example/v1/chat/completions"] });
  const controller = new AbortController();
  controller.abort();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url, options) => {
    assert.equal(options.signal.aborted, true);
    const error = new Error(`aborted ${url}`);
    error.name = "AbortError";
    throw error;
  };

  try {
    await assert.rejects(
      executor.execute({
        model: "gpt-4.1",
        body: {},
        stream: false,
        credentials: {},
        signal: controller.signal,
      }),
      /aborted/
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute clears the startup timeout after headers arrive", async () => {
  const executor = new TestExecutor({ baseUrls: ["https://single.example/v1/chat/completions"] });
  const originalFetch = globalThis.fetch;
  const originalFetchStartTimeoutMs = BaseExecutor.FETCH_START_TIMEOUT_MS;
  let capturedSignal;

  BaseExecutor.FETCH_START_TIMEOUT_MS = 20;
  globalThis.fetch = async (_url, options) => {
    capturedSignal = options.signal;
    return new Response("ok", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "gpt-4.1",
      body: {},
      stream: true,
      credentials: {},
    });

    assert.equal(capturedSignal?.aborted, false);
    await new Promise((resolve) => setTimeout(resolve, 40));
    assert.equal(capturedSignal?.aborted, false);
  } finally {
    BaseExecutor.FETCH_START_TIMEOUT_MS = originalFetchStartTimeoutMs;
    globalThis.fetch = originalFetch;
  }
});
