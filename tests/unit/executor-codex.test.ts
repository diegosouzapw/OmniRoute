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
  clearRememberedResponseFunctionCallsForTesting,
  rememberResponseConversationState,
  rememberResponseFunctionCalls,
} from "../../open-sse/services/responsesToolCallState.ts";
import { sanitizeReasoningEffortForProvider } from "../../open-sse/executors/base.ts";
import {
  DEFAULT_THINKING_CONFIG,
  setThinkingBudgetConfig,
  ThinkingMode,
} from "../../open-sse/services/thinkingBudget.ts";
import { runWithCapture } from "../../open-sse/utils/providerRequestLogging.ts";
import { CODEX_CHAT_DEFAULT_INSTRUCTIONS } from "../../open-sse/config/codexInstructions.ts";

type MockCodexWebSocket = {
  send: (data: string) => void;
  close: (code?: number, reason?: string) => void;
  onmessage: ((event: { data: unknown }) => void) | null;
  onerror: ((event: { message?: string }) => void) | null;
  onclose: (() => void) | null;
};

function getRecord(value: unknown): Record<string, unknown> {
  assert.equal(typeof value, "object");
  assert.notEqual(value, null);
  assert.equal(Array.isArray(value), false);
  return value as Record<string, unknown>;
}

test.afterEach(() => {
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
  __setCodexWebSocketTransportForTesting(undefined);
});

async function withEnv<T>(entries: Record<string, string | undefined>, fn: () => T | Promise<T>) {
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
  const quota = parseCodexQuotaHeaders({
    "x-codex-5h-usage": "100",
    "x-codex-5h-limit": "500",
    "x-codex-5h-reset-at": new Date(Date.now() + 60_000).toISOString(),
    "x-codex-7d-usage": "1000",
    "x-codex-7d-limit": "5000",
    "x-codex-7d-reset-at": new Date(Date.now() + 120_000).toISOString(),
  });

  assert.equal(getCodexModelScope("codex-spark-mini"), "spark");
  assert.equal(getCodexModelScope("gpt-5.3-codex-spark"), "spark");
  assert.equal(getCodexModelScope("codex-bengalfox"), "spark");
  assert.equal(getCodexModelScope("gpt-5.3-codex"), "codex");
  assert.equal(getCodexModelScope("gpt-5.5-xhigh"), "codex");
  assert.equal(getCodexUpstreamModel("gpt-5.5-xhigh"), "gpt-5.5");
  assert.equal(getCodexUpstreamModel("gpt-5.5-medium"), "gpt-5.5");
  // With mock WS transport + codexTransport=websocket, gpt-5.5 models require WS
  __setCodexWebSocketTransportForTesting(
    async (): Promise<MockCodexWebSocket> => ({
      send() {},
      close() {},
      onmessage: null,
      onerror: null,
      onclose: null,
    })
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
  // Without codexTransport setting, defaults to HTTP (false)
  assert.equal(isCodexResponsesWebSocketRequired("gpt-5.5-xhigh", {}), false);
  assert.equal(isCodexResponsesWebSocketRequired("gpt-5.5-medium", {}), false);
  __setCodexWebSocketTransportForTesting(undefined);
  assert.equal(getCodexRateLimitKey("acct-1", "codex-spark-mini"), "acct-1:spark");
  assert.equal(getCodexRateLimitKey("acct-1", "gpt-5.3-codex-spark"), "acct-1:spark");
  assert.equal(quota.usage5h, 100);
  assert.equal(quota.limit7d, 5000);
  assert.ok(getCodexResetTime(quota) >= new Date(quota.resetAt7d).getTime());
});

test("isCodexResponsesWebSocketRequired: OMNIROUTE_CODEX_WS_ENABLED=false forces HTTP even with codexTransport=websocket", () => {
  // Transport available + per-connection opt-in would normally enable WS…
  __setCodexWebSocketTransportForTesting(
    () =>
      ({
        send() {},
        close() {},
        onmessage: null,
        onopen: null,
        onerror: null,
        onclose: null,
      }) as unknown as ReturnType<typeof Object>
  );
  const prev = process.env.OMNIROUTE_CODEX_WS_ENABLED;
  process.env.OMNIROUTE_CODEX_WS_ENABLED = "false";
  try {
    // …but the global kill-switch (default ON) overrides it to false.
    assert.equal(
      isCodexResponsesWebSocketRequired("gpt-5.5-xhigh", {
        providerSpecificData: { codexTransport: "websocket" },
      }),
      false
    );
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_CODEX_WS_ENABLED;
    else process.env.OMNIROUTE_CODEX_WS_ENABLED = prev;
    __setCodexWebSocketTransportForTesting(undefined);
  }
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
  assert.equal(standardHeaders.Version, "0.132.0");
  assert.equal(standardHeaders["Openai-Beta"], "responses=experimental");
  assert.equal(standardHeaders["X-Codex-Beta-Features"], "responses_websockets");
  assert.equal(standardHeaders["User-Agent"], "codex-cli/0.132.0 (Windows 10.0.26200; x64)");
  assert.equal(compactHeaders.Accept, "application/json");
});

test("CodexExecutor.buildHeaders honors safe env overrides for Version and User-Agent", async () => {
  const executor = new CodexExecutor();

  await withEnv(
    {
      CODEX_CLIENT_VERSION: "0.132.0",
      CODEX_USER_AGENT: undefined,
    },
    () => {
      const headers = executor.buildHeaders({ accessToken: "codex-token" }, true);
      assert.equal(headers.Version, "0.132.0");
      assert.equal(headers["User-Agent"], "codex-cli/0.132.0 (Windows 10.0.26200; x64)");
    }
  );

  await withEnv(
    {
      CODEX_CLIENT_VERSION: "bad version value",
      CODEX_USER_AGENT: "custom-codex/9.9.9",
    },
    () => {
      const headers = executor.buildHeaders({ accessToken: "codex-token" }, true);
      assert.equal(headers.Version, "0.132.0");
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

  assert.deepEqual([result.stream, result.store], [true, false]);
  assert.equal(result.instructions.length > 0, true);
  assert.deepEqual(result.reasoning, { effort: "high", summary: "auto" });
  assert.deepEqual(result.include, ["reasoning.encrypted_content"]);
  assert.equal(result.service_tier, "priority");
  assert.equal(result.messages, undefined);
  assert.equal(result.prompt, undefined);
  assert.equal(result.temperature, undefined);
  assert.equal(result.user, undefined);
  assert.equal(result.stream_options, undefined);
});

// Issue #2608: gpt-5.5 models reject residual Chat Completions fields via Codex OAuth.
// The non-passthrough path must strip ALL non-Responses-API fields using an allowlist.
test("CodexExecutor.transformRequest non-passthrough allowlist strips all residual Chat Completions fields (#2608)", () => {
  const executor = new CodexExecutor();
  const body = {
    model: "gpt-5.5",
    messages: [{ role: "user", content: "hello" }],
    instructions: "",
    // All of these are Chat Completions fields that must be stripped:
    temperature: 0.7,
    top_p: 0.9,
    frequency_penalty: 0.5,
    presence_penalty: 0.3,
    logprobs: true,
    top_logprobs: 3,
    n: 2,
    seed: 42,
    stop: ["\n"],
    response_format: { type: "json_object" },
    logit_bias: { "123": 1 },
    function_call: "auto",
    functions: [{ name: "test", parameters: {} }],
    max_completion_tokens: 1000,
    parallel_tool_calls: true,
    user: "cursor-user",
    metadata: { key: "value" },
    stream_options: { include_usage: true },
    safety_identifier: "safe-1",
    suffix: "end",
    // Custom/arbitrary fields that could be injected by middleware
    custom_field: "should be stripped",
    _internal_marker: true,
  };

  const result = executor.transformRequest("gpt-5.5", body, false, {
    requestEndpointPath: "/responses",
  });

  // Allowed Responses API fields should survive
  assert.equal(result.model, "gpt-5.5");
  assert.ok(Array.isArray(result.input));
  assert.equal(typeof result.instructions, "string");
  assert.equal(result.store, false);
  assert.equal(result.stream, true);

  // All Chat Completions fields must be stripped
  assert.equal(result.temperature, undefined, "temperature should be stripped");
  assert.equal(result.top_p, undefined, "top_p should be stripped");
  assert.equal(result.frequency_penalty, undefined, "frequency_penalty should be stripped");
  assert.equal(result.presence_penalty, undefined, "presence_penalty should be stripped");
  assert.equal(result.logprobs, undefined, "logprobs should be stripped");
  assert.equal(result.top_logprobs, undefined, "top_logprobs should be stripped");
  assert.equal(result.n, undefined, "n should be stripped");
  assert.equal(result.seed, undefined, "seed should be stripped");
  assert.equal(result.stop, undefined, "stop should be stripped");
  assert.equal(result.response_format, undefined, "response_format should be stripped");
  assert.equal(result.logit_bias, undefined, "logit_bias should be stripped");
  assert.equal(result.function_call, undefined, "function_call should be stripped");
  assert.equal(result.functions, undefined, "functions should be stripped");
  assert.equal(result.max_completion_tokens, undefined, "max_completion_tokens should be stripped");
  assert.equal(result.parallel_tool_calls, undefined, "parallel_tool_calls should be stripped");
  assert.equal(result.user, undefined, "user should be stripped");
  assert.equal(result.metadata, undefined, "metadata should be stripped");
  assert.equal(result.stream_options, undefined, "stream_options should be stripped");
  assert.equal(result.safety_identifier, undefined, "safety_identifier should be stripped");
  assert.equal(result.suffix, undefined, "suffix should be stripped");
  assert.equal(result.custom_field, undefined, "arbitrary custom fields should be stripped");
  assert.equal(result._internal_marker, undefined, "internal markers should be stripped");
});

test("CodexExecutor.transformRequest normalizes max reasoning_effort to xhigh", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.5",
    {
      model: "gpt-5.5",
      input: [],
      reasoning_effort: "max",
    },
    false,
    {
      requestEndpointPath: "/responses",
    }
  );

  assert.equal(result.reasoning.effort, "xhigh");
  assert.equal(result.reasoning_effort, undefined);
});

test("CodexExecutor.transformRequest sends neutral instructions for bare chat requests", () => {
  const executor = new CodexExecutor();
  const body = {
    model: "gpt-5.5-medium",
    input: [
      {
        type: "message",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Calculate 79530+41475, and reply with the result only.",
          },
        ],
      },
    ],
    instructions: "",
    stream: false,
  };

  const result = executor.transformRequest("gpt-5.5-medium", body, false, {
    requestEndpointPath: "/responses",
  });

  assert.equal(result.instructions, CODEX_CHAT_DEFAULT_INSTRUCTIONS);
  assert.equal(result.stream, true);
  assert.equal(result.model, "gpt-5.5");
  assert.equal(result.input.length, 1);
  assert.equal(result.tools, undefined);
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
  assert.equal(result.store, undefined);
  assert.equal(result.instructions, "keep this");
});

test("CodexExecutor.transformRequest applies flex request default service tier", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest("gpt-5.5", { input: "hello" }, false, {
    requestEndpointPath: "/responses",
    providerSpecificData: {
      requestDefaults: { serviceTier: "flex" },
    },
  });

  assert.equal(result.service_tier, "flex");
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
    requestEndpointPath: "/responses",
    providerSpecificData: {
      openaiStoreEnabled: true,
      requestDefaults: { serviceTier: "priority" },
    },
  });

  assert.equal(result._omnirouteResponsesStore, undefined);
  assert.equal(result.store, true);
  assert.equal(result.previous_response_id, "resp_prev_123");
});
test("CodexExecutor.transformRequest strips store from compact requests even when store is enabled", () => {
  const executor = new CodexExecutor();
  const body = {
    _nativeCodexPassthrough: true,
    _omnirouteResponsesStore: true,
    instructions: "keep this",
    store: true,
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
  assert.equal(result.store, undefined);
  assert.equal(result.stream, undefined);
  assert.equal(result.instructions, "keep this");
});

test("CodexExecutor.transformRequest preserves native assistant commentary history", () => {
  const executor = new CodexExecutor();
  const body = {
    _nativeCodexPassthrough: true,
    input: [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "Use the tool result." }],
      },
      {
        type: "message",
        role: "assistant",
        phase: "commentary",
        content: [{ type: "output_text", text: "Need maybe inspect tool output first." }],
      },
      {
        type: "message",
        role: "assistant",
        phase: "final",
        content: [{ type: "output_text", text: "Visible final assistant answer." }],
      },
      {
        type: "message",
        role: "assistant",
        phase: "final_answer",
        content: [{ type: "output_text", text: "Visible final_answer assistant answer." }],
      },
      {
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "Visible assistant history without phase." }],
      },
      {
        type: "reasoning",
        summary: [{ type: "summary_text", text: "formal reasoning item" }],
      },
      {
        type: "function_call",
        call_id: "call_keep_123",
        name: "workspace_read_file",
        arguments: '{"path":"README.md"}',
      },
      {
        type: "function_call_output",
        call_id: "call_keep_123",
        output: '{"ok":true}',
      },
    ],
    stream: false,
  };

  const result = executor.transformRequest("gpt-5.5-low", body, false, {
    requestEndpointPath: "/responses",
  });

  assert.equal(
    result.input.some((item) => JSON.stringify(item).includes("Need maybe inspect tool output")),
    true
  );
  assert.equal(
    result.input.some((item) => JSON.stringify(item).includes("Visible final assistant answer")),
    true
  );
  assert.equal(
    result.input.some((item) =>
      JSON.stringify(item).includes("Visible final_answer assistant answer")
    ),
    true
  );
  assert.equal(
    result.input.some((item) =>
      JSON.stringify(item).includes("Visible assistant history without phase")
    ),
    true
  );
  assert.equal(
    result.input.some((item) => item.type === "reasoning"),
    true
  );
  assert.equal(
    result.input.some((item) => item.type === "function_call"),
    true
  );
  assert.equal(
    result.input.some((item) => item.type === "function_call_output"),
    true
  );
});

test("CodexExecutor.transformRequest still strips assistant commentary outside native passthrough", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.5-low",
    {
      input: [
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "Continue." }],
        },
        {
          type: "message",
          role: "assistant",
          phase: "commentary",
          content: [{ type: "output_text", text: "Internal progress note." }],
        },
        {
          type: "message",
          role: "assistant",
          phase: "final_answer",
          content: [{ type: "output_text", text: "Visible final answer." }],
        },
      ],
      stream: false,
    },
    false,
    { requestEndpointPath: "/responses" }
  );

  assert.equal(
    result.input.some((item) => JSON.stringify(item).includes("Internal progress note")),
    false
  );
  assert.equal(
    result.input.some((item) => JSON.stringify(item).includes("Visible final answer")),
    true
  );
});

test("CodexExecutor.transformRequest inserts missing function_call_output items", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.5-xhigh",
    {
      _nativeCodexPassthrough: true,
      input: [
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "Continue." }],
        },
        {
          type: "function_call",
          call_id: "call_missing_result",
          name: "read_file",
          arguments: "{}",
        },
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "Next turn." }],
        },
      ],
      stream: false,
    },
    false,
    {
      requestEndpointPath: "/responses",
    }
  );

  const missingOutputIndex = result.input.findIndex(
    (item) => item.type === "function_call_output" && item.call_id === "call_missing_result"
  );
  const functionCallIndex = result.input.findIndex(
    (item) => item.type === "function_call" && item.call_id === "call_missing_result"
  );

  assert.equal(missingOutputIndex, functionCallIndex + 1);
  assert.deepEqual(result.input[missingOutputIndex], {
    type: "function_call_output",
    call_id: "call_missing_result",
    output: "",
  });
});

test("CodexExecutor.transformRequest preserves native assistant commentary before mapping messages to input", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.5-low",
    {
      _nativeCodexPassthrough: true,
      messages: [
        { role: "user", content: "Continue." },
        {
          role: "assistant",
          phase: "commentary",
          content: "Need maybe update PR body first.",
        },
        {
          role: "assistant",
          phase: "final",
          content: "Visible final assistant answer.",
        },
      ],
      stream: false,
    },
    false,
    { requestEndpointPath: "/responses" }
  );

  assert.equal(
    result.input.some((item) => JSON.stringify(item).includes("Need maybe update PR body")),
    true
  );
  assert.equal(
    result.input.some((item) => JSON.stringify(item).includes("Visible final assistant answer")),
    true
  );
  assert.equal(result.messages, undefined);
});

test("CodexExecutor.transformRequest does not locally replay previous_response_id tool follow-ups", () => {
  const executor = new CodexExecutor();
  const body = {
    _nativeCodexPassthrough: true,
    previous_response_id: "resp_prev_tool_123",
    input: [
      {
        type: "function_call_output",
        call_id: "call_tool_123",
        output: '{"ok":true}',
      },
    ],
    stream: false,
  };

  const result = executor.transformRequest("gpt-5.5-low", body, false, {
    requestEndpointPath: "/responses",
  });

  assert.equal(result.previous_response_id, "resp_prev_tool_123");
  assert.equal(result.store, false);
  assert.equal(result.input.length, 1);
  assert.deepEqual(result.input[0], {
    type: "function_call_output",
    call_id: "call_tool_123",
    output: '{"ok":true}',
  });
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

  assert.deepEqual([result.reasoning, result.include], [{ effort: "none" }, undefined]);
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

test("CodexExecutor.transformRequest keeps GPT 5.3 Codex reasoning in Responses shape", () => {
  const executor = new CodexExecutor();
  const transformed = executor.transformRequest(
    "gpt-5.3-codex",
    {
      model: "gpt-5.3-codex",
      input: [],
      reasoning_effort: "high",
    },
    true,
    {
      requestEndpointPath: "/responses",
    }
  );
  const sanitized = sanitizeReasoningEffortForProvider(
    transformed,
    "codex",
    "gpt-5.3-codex",
    null
  ) as Record<string, unknown>;
  const reasoning = getRecord(sanitized.reasoning);

  assert.equal(sanitized.model, "gpt-5.3-codex");
  assert.equal(reasoning.effort, "high");
  assert.equal(sanitized.reasoning_effort, undefined);
});

test("CodexExecutor.transformRequest passes GPT 5.4 Mini xhigh reasoning through unchanged in Responses shape (#3756)", () => {
  const executor = new CodexExecutor();
  const transformed = executor.transformRequest(
    "gpt-5.4-mini",
    {
      model: "gpt-5.4-mini",
      input: [],
      reasoning: { effort: "xhigh", summary: "detailed" },
      include: ["code_interpreter_call.outputs"],
    },
    true,
    {
      requestEndpointPath: "/responses",
    }
  );
  const sanitized = sanitizeReasoningEffortForProvider(
    transformed,
    "codex",
    "gpt-5.4-mini",
    null
  ) as Record<string, unknown>;
  const reasoning = getRecord(sanitized.reasoning);

  assert.equal(sanitized.model, "gpt-5.4-mini");
  assert.deepEqual(reasoning, { effort: "xhigh", summary: "detailed" });
  assert.deepEqual(sanitized.include, ["code_interpreter_call.outputs", "reasoning.encrypted_content"]);
  assert.equal(sanitized.reasoning_effort, undefined);
});

test("CodexExecutor.transformRequest merges Codex installation metadata", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.5",
    {
      model: "gpt-5.5",
      input: [],
      client_metadata: { existing: "keep" },
    },
    true,
    {
      providerSpecificData: {
        codexClientIdentity: {
          sessionId: "session-1",
          turnId: "turn-1",
          windowId: "session-1:0",
          installationId: "11111111-1111-4111-a111-111111111111",
        },
      },
    }
  );

  assert.deepEqual(result.client_metadata, {
    existing: "keep",
    "x-codex-installation-id": "11111111-1111-4111-a111-111111111111",
  });
});

test("CodexExecutor.transformRequest omits client metadata for compact requests", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.5",
    {
      model: "gpt-5.5",
      input: [],
      client_metadata: { existing: "drop" },
      _nativeCodexPassthrough: true,
    },
    false,
    {
      requestEndpointPath: "/responses/compact",
      providerSpecificData: {
        codexClientIdentity: {
          sessionId: "session-1",
          turnId: "turn-1",
          windowId: "session-1:0",
          installationId: "11111111-1111-4111-a111-111111111111",
        },
      },
    }
  );

  assert.equal(result.client_metadata, undefined);
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
    assert.equal(getRecord(result.transformedBody).model, "gpt-5.5");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("CodexExecutor.execute captures the exact websocket request body before send", async () => {
  const executor = new CodexExecutor();
  let sent: string | null = null;
  let sendStarted = false;
  let prepared: unknown = null;
  let preparedBeforeSend = false;
  const ws: MockCodexWebSocket = {
    send(data) {
      sendStarted = true;
      sent = data;
      queueMicrotask(() => {
        ws.onmessage?.({
          data: JSON.stringify({ type: "response.completed", response: { status: "completed" } }),
        });
      });
    },
    close() {},
    onmessage: null,
    onerror: null,
    onclose: null,
  };
  __setCodexWebSocketTransportForTesting(async () => ws);

  const requestCapture = {
    capture(request) {
      preparedBeforeSend = !sendStarted;
      prepared = request.body;
    },
    body(fallback) {
      return prepared ?? fallback;
    },
    latest() {
      return null;
    },
  };
  const result = await runWithCapture(requestCapture, () =>
    executor.execute({
      model: "gpt-5.5-xhigh",
      body: { model: "gpt-5.5-xhigh", input: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: {
        accessToken: "codex-token",
        providerSpecificData: { codexTransport: "websocket" },
      },
    })
  );
  await result.response.text();

  assert.ok(sent);
  const sentBody = JSON.parse(sent);
  assert.equal(preparedBeforeSend, true);
  assert.deepEqual(prepared, sentBody);
  assert.equal(sentBody.type, "response.create");
  assert.equal(sentBody.model, "gpt-5.5");
});

test("CodexExecutor.execute adds CLI-like session identity headers without changing response flow", async () => {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  let capturedBody: Record<string, unknown> | null = null;
  let capturedHeaders: Headers | null = null;

  globalThis.fetch = async (_url, init) => {
    capturedHeaders = new Headers(init?.headers as HeadersInit);
    capturedBody = JSON.parse(String(init?.body || "{}"));
    return new Response(JSON.stringify({ id: "resp_identity", object: "response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gpt-5.5",
      body: {
        model: "gpt-5.5",
        session_id: "conversation-1",
        input: [{ role: "user", content: "hello" }],
      },
      stream: true,
      credentials: {
        accessToken: "codex-token",
        providerSpecificData: { workspaceId: "workspace-1" },
      },
    });

    assert.equal(result.response.status, 200);
    assert.equal(capturedHeaders?.get("session_id"), "conversation-1");
    assert.equal(capturedHeaders?.get("x-client-request-id"), "conversation-1");
    assert.equal(capturedHeaders?.get("x-codex-window-id"), "conversation-1:0");
    const turnMetadata = JSON.parse(capturedHeaders?.get("x-codex-turn-metadata") || "{}");
    assert.equal(turnMetadata.session_id, "conversation-1");
    assert.equal(turnMetadata.thread_source, "user");
    assert.equal(turnMetadata.sandbox, "none");
    assert.equal(typeof turnMetadata.turn_id, "string");
    assert.equal(capturedBody?.prompt_cache_key, "conversation-1");
    assert.equal(
      (capturedBody?.client_metadata as Record<string, unknown>)?.["x-codex-installation-id"],
      "7f06a8ee-2981-4c81-a4ca-e443b5400a63"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("CodexExecutor.execute skips identity headers for unsafe session ids", async () => {
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  let capturedHeaders: Headers | null = null;

  globalThis.fetch = async (_url, init) => {
    capturedHeaders = new Headers(init?.headers as HeadersInit);
    return new Response(JSON.stringify({ id: "resp_identity", object: "response" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "gpt-5.5",
      body: {
        model: "gpt-5.5",
        session_id: "bad\r\nheader",
        input: [{ role: "user", content: "hello" }],
      },
      stream: true,
      credentials: { accessToken: "codex-token" },
    });

    assert.equal(capturedHeaders?.get("x-client-request-id"), null);
    assert.equal(capturedHeaders?.get("x-codex-window-id"), null);
    assert.equal(capturedHeaders?.get("x-codex-turn-metadata"), null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("CodexExecutor.transformRequest preserves namespace MCP tools and hosted tool types", () => {
  // Regression: PR #1581 đã vô tình xoá nhánh `namespace` + whitelist hosted tools
  // trong normalizeCodexTools, khiến MCP tool group (vd. mcp__atlassian__) bị strip
  // trước khi forward lên Codex Responses API. Test này khoá lại hành vi đúng.
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.4",
    {
      model: "gpt-5.4",
      input: [],
      tools: [
        { type: "function", name: "exec_command", parameters: { type: "object" } },
        {
          type: "namespace",
          name: "mcp__atlassian__",
          description: "Tools in the mcp__atlassian__ namespace.",
          tools: [
            { type: "function", name: "jira_get_issue", parameters: { type: "object" } },
            { type: "function", name: "jira_search", parameters: { type: "object" } },
          ],
        },
        { type: "image_generation", output_format: "png" },
        { type: "tool_search" },
        { type: "web_search" },
        { type: "unknown_hosted_tool" },
      ],
      tool_choice: { type: "function", name: "jira_get_issue" },
    },
    false,
    {}
  );

  const types = (result.tools as Array<Record<string, unknown>>).map((tool) => tool.type);
  assert.deepEqual(types, [
    "function",
    "namespace",
    "image_generation",
    "tool_search",
    "web_search",
  ]);

  const namespaceTool = (result.tools as Array<Record<string, unknown>>).find(
    (tool) => tool.type === "namespace"
  );
  assert.equal((namespaceTool as { name: string }).name, "mcp__atlassian__");
  assert.equal(((namespaceTool as { tools: unknown[] }).tools ?? []).length, 2);

  // tool_choice trỏ vào sub-tool của namespace phải được giữ nguyên (không bị xoá
  // do tên nằm trong namespace.tools[*].name đã được đăng ký vào validToolNames).
  assert.deepEqual(result.tool_choice, { type: "function", name: "jira_get_issue" });
});

test("CodexExecutor.transformRequest preserves native Codex custom tools", () => {
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.5",
    {
      _nativeCodexPassthrough: true,
      model: "gpt-5.5",
      input: [],
      tools: [
        {
          type: "custom",
          name: "apply_patch",
          description: "Use the apply_patch tool to edit files.",
          format: {
            type: "grammar",
            syntax: "lark",
            definition: "start: /.+/",
          },
        },
        {
          type: "function",
          name: "exec_command",
          description: "Runs a command.",
          parameters: { type: "object", properties: {} },
          strict: false,
        },
      ],
    },
    true,
    { requestEndpointPath: "/responses" }
  );

  const tools = result.tools as Array<Record<string, unknown>>;
  assert.equal(tools.length, 2);
  assert.deepEqual(tools[0], {
    type: "custom",
    name: "apply_patch",
    description: "Use the apply_patch tool to edit files.",
    format: {
      type: "grammar",
      syntax: "lark",
      definition: "start: /.+/",
    },
  });
  assert.equal(tools[1].strict, false);
});

test("CodexExecutor.transformRequest preserves Responses-native custom tools even outside native passthrough", () => {
  // Ported from upstream decolua/9router ed68bced — Responses-native freeform
  // tools (e.g. grammar-backed apply_patch) are a legal upstream shape and
  // must survive normalization regardless of whether the request is flagged
  // as a native Codex passthrough.
  const executor = new CodexExecutor();
  const result = executor.transformRequest(
    "gpt-5.5",
    {
      model: "gpt-5.5",
      input: [],
      tools: [
        { type: "custom", name: "apply_patch", format: { type: "grammar" } },
        { type: "function", name: "exec_command", parameters: { type: "object" } },
      ],
    },
    true,
    { requestEndpointPath: "/responses" }
  );

  const tools = result.tools as Array<Record<string, unknown>>;
  assert.deepEqual(
    tools.map((tool) => tool.name),
    ["apply_patch", "exec_command"]
  );
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

test("CodexExecutor.refreshCredentials returns null for unrecoverable errors to preserve original credentials", async () => {
  // Source intentionally returns null (not an error object) so that base.ts does
  // not spread stale error fields onto activeCredentials. The upstream 401/403
  // drives the proper re-auth / mark-expired path instead.
  // Source: open-sse/executors/codex.ts — refreshCredentials(), lines ~1205-1216.
  const executor = new CodexExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({ error: "invalid_grant", error_description: "Refresh token expired" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );

  try {
    const result = await executor.refreshCredentials({ refreshToken: "dead-token" }, null);
    assert.equal(result, null, "should return null to leave original credentials untouched");
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
