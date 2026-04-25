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
import { BEDROCK_DEFAULT_BASE_URL } from "../../open-sse/config/bedrock.ts";
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
  const datarobot = new DefaultExecutor("datarobot");
  const clarifai = new DefaultExecutor("clarifai");
  const azureAi = new DefaultExecutor("azure-ai");
  const bedrock = new DefaultExecutor("bedrock");
  const watsonx = new DefaultExecutor("watsonx");
  const oci = new DefaultExecutor("oci");
  const sap = new DefaultExecutor("sap");
  const modal = new DefaultExecutor("modal");
  const reka = new DefaultExecutor("reka");
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
    datarobot.buildUrl("azure/gpt-5-mini-2025-08-07", true, 0, {
      providerSpecificData: { baseUrl: "https://app.datarobot.com" },
    }),
    "https://app.datarobot.com/api/v2/genai/llmgw/chat/completions/"
  );
  assert.equal(
    datarobot.buildUrl("datarobot-deployed-llm", true, 0, {
      providerSpecificData: {
        baseUrl: "https://app.datarobot.com/api/v2/deployments/65f5b2b7c8f8c4b257e0d123",
      },
    }),
    "https://app.datarobot.com/api/v2/deployments/65f5b2b7c8f8c4b257e0d123/chat/completions"
  );
  assert.equal(
    clarifai.buildUrl("openai/chat-completion/models/gpt-oss-120b", true),
    "https://api.clarifai.com/v2/ext/openai/v1/chat/completions"
  );
  assert.equal(
    azureAi.buildUrl("DeepSeek-V3.1", true, 0, {
      providerSpecificData: { baseUrl: "https://my-foundry.services.ai.azure.com" },
    }),
    "https://my-foundry.services.ai.azure.com/openai/v1/chat/completions"
  );
  assert.equal(
    bedrock.buildUrl("openai.gpt-oss-120b", true, 0, {
      providerSpecificData: { baseUrl: "https://bedrock-mantle.us-east-1.api.aws" },
    }),
    "https://bedrock-mantle.us-east-1.api.aws/v1/chat/completions"
  );
  assert.equal(
    bedrock.buildUrl("openai.gpt-oss-120b-1:0", true, 0, {
      providerSpecificData: { baseUrl: "https://bedrock-runtime.us-east-1.amazonaws.com" },
    }),
    "https://bedrock-runtime.us-east-1.amazonaws.com/openai/v1/chat/completions"
  );
  assert.equal(
    bedrock.buildUrl("openai.gpt-oss-120b", true),
    `${BEDROCK_DEFAULT_BASE_URL}/chat/completions`
  );
  assert.equal(
    watsonx.buildUrl("ibm/granite-3-3-8b-instruct", true, 0, {
      providerSpecificData: { baseUrl: "https://ca-tor.ml.cloud.ibm.com" },
    }),
    "https://ca-tor.ml.cloud.ibm.com/ml/gateway/v1/chat/completions"
  );
  assert.equal(
    oci.buildUrl("openai.gpt-oss-20b", true, 0, {
      providerSpecificData: {
        baseUrl: "https://inference.generativeai.us-ashburn-1.oci.oraclecloud.com",
      },
    }),
    "https://inference.generativeai.us-ashburn-1.oci.oraclecloud.com/openai/v1/chat/completions"
  );
  assert.equal(
    sap.buildUrl("gpt-4o", true, 0, {
      providerSpecificData: {
        baseUrl: "https://sap.example.com/v2/lm/deployments/demo-deployment",
      },
    }),
    "https://sap.example.com/v2/lm/deployments/demo-deployment/chat/completions"
  );
  assert.equal(
    modal.buildUrl("Qwen/Qwen3-4B-Thinking-2507-FP8", true, 0, {
      providerSpecificData: {
        baseUrl: "https://alice--demo.modal.run/v1",
      },
    }),
    "https://alice--demo.modal.run/v1/chat/completions"
  );
  assert.equal(
    reka.buildUrl("reka-core", true, 0, {
      providerSpecificData: {
        baseUrl: "https://api.reka.ai/v1",
      },
    }),
    "https://api.reka.ai/v1/chat/completions"
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
  const clarifai = new DefaultExecutor("clarifai");
  const azureAi = new DefaultExecutor("azure-ai");
  const oci = new DefaultExecutor("oci");
  const sap = new DefaultExecutor("sap");
  const modal = new DefaultExecutor("modal");
  const reka = new DefaultExecutor("reka");

  const geminiApiKeyHeaders = gemini.buildHeaders({ apiKey: "gem-key" }, true);
  const geminiOAuthHeaders = gemini.buildHeaders({ accessToken: "gem-token" }, false);
  const claudeApiKeyHeaders = claude.buildHeaders({ apiKey: "claude-key" }, true);
  const claudeOAuthHeaders = claude.buildHeaders({ accessToken: "claude-token" }, false);
  const azureAiHeaders = azureAi.buildHeaders({ apiKey: "azure-ai-key" }, true);
  const ociHeaders = oci.buildHeaders(
    {
      apiKey: "oci-key",
      projectId: "ocid1.generativeaiproject.oc1.us-chicago-1.example",
    },
    true
  );
  const sapHeaders = sap.buildHeaders(
    {
      apiKey: "sap-key",
      providerSpecificData: {
        resourceGroup: "shared",
      },
    },
    true
  );
  const modalHeaders = modal.buildHeaders(
    {
      apiKey: "modal-key",
    },
    true
  );
  const rekaHeaders = reka.buildHeaders(
    {
      apiKey: "reka-key",
    },
    true
  );
  const clarifaiHeaders = clarifai.buildHeaders(
    {
      apiKey: "clarifai-pat",
    },
    true
  );

  assert.equal(geminiApiKeyHeaders["x-goog-api-key"], "gem-key");
  assert.equal(geminiApiKeyHeaders.Accept, "text/event-stream");
  assert.equal(geminiApiKeyHeaders.Authorization, undefined);
  assert.equal(geminiOAuthHeaders.Authorization, "Bearer gem-token");
  assert.equal(claudeApiKeyHeaders["x-api-key"], "claude-key");
  assert.equal(claudeApiKeyHeaders.Accept, "text/event-stream");
  assert.equal(claudeOAuthHeaders.Authorization, "Bearer claude-token");
  assert.equal(claudeOAuthHeaders["x-api-key"], undefined);
  assert.equal(azureAiHeaders["api-key"], "azure-ai-key");
  assert.equal(azureAiHeaders.Authorization, undefined);
  assert.equal(ociHeaders.Authorization, "Bearer oci-key");
  assert.equal(ociHeaders["OpenAI-Project"], "ocid1.generativeaiproject.oc1.us-chicago-1.example");
  assert.equal(sapHeaders.Authorization, "Bearer sap-key");
  assert.equal(sapHeaders["AI-Resource-Group"], "shared");
  assert.equal(modalHeaders.Authorization, "Bearer modal-key");
  assert.equal(rekaHeaders.Authorization, "Bearer reka-key");
  assert.equal(rekaHeaders["X-Api-Key"], "reka-key");
  assert.equal(clarifaiHeaders.Authorization, "Key clarifai-pat");
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

test("DefaultExecutor local OpenAI-style providers honor custom base URLs and skip empty bearer headers", () => {
  const lmStudio = new DefaultExecutor("lm-studio");
  const vllm = new DefaultExecutor("vllm");
  const lemonade = new DefaultExecutor("lemonade");

  const lmStudioUrl = lmStudio.buildUrl("local-model", true, 0, {
    providerSpecificData: { baseUrl: "http://127.0.0.1:4321/v1" },
  });
  const lemonadeUrl = lemonade.buildUrl("Llama-3.2-1B-Instruct-Hybrid", true);
  const vllmHeaders = vllm.buildHeaders({}, false);

  assert.equal(lmStudioUrl, "http://127.0.0.1:4321/v1/chat/completions");
  assert.equal(lemonadeUrl, "http://localhost:13305/api/v1/chat/completions");
  assert.equal(vllmHeaders.Authorization, undefined);
  assert.equal(vllmHeaders.Accept, "application/json");
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
          ccSessionId: "session-1",
        },
      },
      clientHeaders: {
        "x-app": "cli",
        "user-agent": "claude-cli/2.1.116 (external, cli)",
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

test("DefaultExecutor.execute only injects adaptive thinking defaults for Claude models that support x-high effort", async () => {
  const originalFetch = globalThis.fetch;
  const requestBodies = [];

  globalThis.fetch = async (_url, init = {}) => {
    requestBodies.push(JSON.parse(String(init.body)));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const claude = new DefaultExecutor("claude");
    await claude.execute({
      model: "claude-opus-4-7",
      body: {
        model: "claude-opus-4-7",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: {
        apiKey: "cc-key",
        providerSpecificData: {
          ccSessionId: "session-1",
        },
      },
      clientHeaders: {
        "x-app": "cli",
        "user-agent": "claude-cli/2.1.116 (external, cli)",
      },
      extendedContext: false,
    });

    await claude.execute({
      model: "claude-haiku-4-5-20251001",
      body: {
        model: "claude-haiku-4-5-20251001",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: {
        apiKey: "cc-key",
        providerSpecificData: {
          ccSessionId: "session-1",
        },
      },
      clientHeaders: {
        "x-app": "cli",
        "user-agent": "claude-cli/2.1.116 (external, cli)",
      },
      extendedContext: false,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.deepEqual((requestBodies[0] as any).thinking, { type: "adaptive" });
  assert.deepEqual((requestBodies[0] as any).context_management, {
    edits: [{ type: "clear_thinking_20251015", keep: "all" }],
  });
  assert.deepEqual((requestBodies[0] as any).output_config, { effort: "high" });

  assert.equal((requestBodies[1] as any).thinking, undefined);
  assert.equal((requestBodies[1] as any).context_management, undefined);
  assert.equal((requestBodies[1] as any).output_config, undefined);
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
  assert.equal((result as any).tool_choice, "auto");
});

test("DefaultExecutor.transformRequest applies GLMT preset defaults without overriding explicit values", () => {
  const executor = new DefaultExecutor("glmt");

  const autoBody = {
    messages: [{ role: "user", content: "hi" }],
  };
  const autoResult = executor.transformRequest("glm-5.1", autoBody, true, {});

  assert.notEqual(autoResult, autoBody);
  assert.equal((autoResult as any).max_tokens, 65536);
  (assert as any).equal((autoResult as any).temperature, 0.2);
  (assert as any).deepEqual((autoResult as any).thinking, {
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
  assert.equal((explicitResult as any).max_tokens, 4096);
  assert.equal((explicitResult as any).temperature, 0.7);
  assert.deepEqual((explicitResult as any).thinking, {
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
    (assert as any).equal((result.transformedBody as any).transformed, true);
    assert.equal((result.transformedBody as any).model, "gpt-4.1");
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

// Regression test for issue #1454: duplicate anthropic-version header when
// Claude Code CLI headers are detected on the native `claude` provider.
// The provider config seeds headers with Title-Case "Anthropic-Version" while
// the Claude-Code patch injects lowercase "anthropic-version".  Before the fix,
// both keys coexisted in the JS object and undici combined their values into
// "2023-06-01, 2023-06-01", causing a 400 from Anthropic.
test("DefaultExecutor.execute does not produce duplicate anthropic-version header when Claude Code CLI headers are present", async () => {
  const executor = new DefaultExecutor("claude");
  const originalFetch = globalThis.fetch;
  let capturedHeaders: Record<string, string> = {};

  globalThis.fetch = async (_url, init = {}) => {
    // Capture raw headers without normalisation so case-variant duplicate keys are visible.
    capturedHeaders = (init.headers as Record<string, string>) || {};
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "claude-sonnet-4-6",
      body: {
        model: "claude-sonnet-4-6",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: { accessToken: "oauth-token" },
      clientHeaders: {
        "x-app": "cli",
        "user-agent": "claude-cli/2.1.116 (external, cli)",
        "anthropic-beta": "oauth-2025-04-20",
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  // Must be exactly one key — not multiple case variants that undici would combine
  const versionKeys = Object.keys(capturedHeaders).filter(
    (k) => k.toLowerCase() === "anthropic-version"
  );
  assert.equal(versionKeys.length, 1, "Duplicate anthropic-version header keys found");
  assert.equal(capturedHeaders[versionKeys[0]], "2023-06-01");
});
