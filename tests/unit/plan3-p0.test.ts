import test from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../open-sse/translator/formats.ts";
import { getModelInfoCore } from "../../open-sse/services/model.ts";
import { detectFormat, detectFormatFromEndpoint } from "../../open-sse/services/provider.ts";
import { shouldUseNativeCodexPassthrough } from "../../open-sse/handlers/chatCore.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { GithubExecutor } from "../../open-sse/executors/github.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { extractUsageFromResponse } from "../../open-sse/handlers/usageExtractor.ts";
import {
  parseSSEToOpenAIResponse,
  parseSSEToResponsesOutput,
} from "../../open-sse/handlers/sseParser.ts";

test("getModelInfoCore resolves unique non-openai unprefixed model", async () => {
  const info = await getModelInfoCore("claude-haiku-4-5-20251001", {});
  assert.equal(info.provider, "claude");
  assert.equal(info.model, "claude-haiku-4-5-20251001");
});

test("getModelInfoCore keeps openai fallback for gpt-4o", async () => {
  const info = await getModelInfoCore("gpt-4o", {});
  assert.equal(info.provider, "openai");
  assert.equal(info.model, "gpt-4o");
});

test("getModelInfoCore resolves codex-auto-review to codex", async () => {
  const info = await getModelInfoCore("codex-auto-review", {});
  assert.equal(info.provider, "codex");
  assert.equal(info.model, "codex-auto-review");
});

test("getModelInfoCore resolves gpt-5.5 to codex", async () => {
  const info = await getModelInfoCore("gpt-5.5", {});
  assert.equal(info.provider, "codex");
  assert.equal(info.model, "gpt-5.5");
});

test("getModelInfoCore keeps explicit gpt-5.5-medium separate from gpt-5.5", async () => {
  const info = await getModelInfoCore("gpt-5.5-medium", {});
  assert.equal(info.provider, "codex");
  assert.equal(info.model, "gpt-5.5-medium");
});

test("getModelInfoCore resolves explicit gpt-5.5 Codex model", async () => {
  const info = await getModelInfoCore("cx/gpt-5.5", {});
  assert.equal(info.provider, "codex");
  assert.equal(info.model, "gpt-5.5");
});

test("getModelInfoCore resolves gpt-5.5 to codex", async () => {
  const info = await getModelInfoCore("gpt-5.5", {});
  assert.equal(info.provider, "codex");
  assert.equal(info.model, "gpt-5.5");
});

test("getModelInfoCore resolves gpt-5.5 to codex", async () => {
  const info = await getModelInfoCore("gpt-5.5", {});
  assert.equal(info.provider, "codex");
  assert.equal(info.model, "gpt-5.5");
});

test("getModelInfoCore resolves explicit gpt-5.5 Codex model", async () => {
  const info = await getModelInfoCore("cx/gpt-5.5", {});
  assert.equal(info.provider, "codex");
  assert.equal(info.model, "gpt-5.5");
});

test("getModelInfoCore returns explicit ambiguity metadata for ambiguous unprefixed model", async () => {
  const info = await getModelInfoCore("claude-haiku-4.5", {});
  assert.equal(info.provider, null);
  assert.equal((info as any).errorType, "ambiguous_model");
  assert.match((info as any).errorMessage, /Ambiguous model/i);
  assert.ok(Array.isArray((info as any).candidateProviders));
  assert.ok((info as any).candidateProviders.length >= 2);
});

test("getModelInfoCore canonicalizes github legacy alias with explicit provider prefix", async () => {
  const info = await getModelInfoCore("gh/claude-4.5-opus", {});
  assert.equal(info.provider, "github");
  assert.equal(info.model, "claude-opus-4-5-20251101");
});

test("GithubExecutor routes codex-family model to /responses", () => {
  const executor = new GithubExecutor();
  const url = executor.buildUrl("gpt-5.3-codex", true);
  assert.match(url, /\/responses$/);
});

test("GithubExecutor keeps non-codex model on /chat/completions", () => {
  const executor = new GithubExecutor();
  const url = executor.buildUrl("gpt-5", true);
  assert.match(url, /\/chat\/completions$/);
});

test("DefaultExecutor uses x-api-key for kimi-coding-apikey", () => {
  const executor = new DefaultExecutor("kimi-coding-apikey");
  const headers = executor.buildHeaders({ apiKey: "sk-kimi-test" }, true);

  assert.equal((headers as any)["x-api-key"], "sk-kimi-test");
  assert.equal((headers as any).Authorization, undefined);
});

test("DefaultExecutor execute honors connection-level custom User-Agent", async () => {
  const executor = new DefaultExecutor("openai");
  const originalFetch = globalThis.fetch;
  let capturedHeaders = null;

  globalThis.fetch = async (_url, init = {}) => {
    capturedHeaders = (init as any).headers || null;
    return new Response(JSON.stringify({ id: "chatcmpl-test" }), { status: 200 });
  };

  try {
    await executor.execute({
      model: "gpt-4o",
      body: {
        model: "gpt-4o",
        messages: [{ role: "user", content: "hello" }],
      },
      stream: false,
      credentials: {
        apiKey: "sk-openai-test",
        providerSpecificData: {
          customUserAgent: "OmniRouteCustomUA/2.0",
        },
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(capturedHeaders);
  assert.equal(capturedHeaders.Authorization, "Bearer sk-openai-test");
  assert.equal(capturedHeaders["User-Agent"], "OmniRouteCustomUA/2.0");
});

test("CodexExecutor forces stream=true for upstream compatibility", () => {
  const executor = new CodexExecutor();
  const transformed = executor.transformRequest(
    "gpt-5.1-codex",
    { model: "gpt-5.1-codex", input: [], stream: false },
    false,
    {}
  );
  assert.equal(transformed.stream, true);
});

test("Claude native messages can be round-tripped through OpenAI into Claude OAuth format", () => {
  const normalizeOptions = { normalizeToolCallId: false, preserveDeveloperRole: undefined };
  const openaiBody = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "claude-sonnet-4-6",
    {
      model: "claude-sonnet-4-6",
      max_tokens: 32,
      messages: [{ role: "user", content: "reply with OK only" }],
    },
    false,
    null,
    "claude",
    null,
    normalizeOptions
  );
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    "claude-sonnet-4-6",
    openaiBody,
    false,
    null,
    "claude",
    null,
    normalizeOptions
  );

  assert.deepEqual(translated.messages, [
    {
      role: "user",
      content: [{ type: "text", text: "reply with OK only" }],
    },
  ]);
  assert.ok(Array.isArray(translated.system));
  assert.equal(translated.system[0]?.text?.includes("You are Claude Code"), true);
});

test("CodexExecutor maps fast service tier to priority", () => {
  const executor = new CodexExecutor();
  const transformed = executor.transformRequest(
    "gpt-5.1-codex",
    { model: "gpt-5.1-codex", input: [], service_tier: "fast" },
    true,
    {}
  );
  assert.equal(transformed.service_tier, "priority");
});

test("shouldUseNativeCodexPassthrough only enables responses-native Codex requests", () => {
  assert.equal(
    shouldUseNativeCodexPassthrough({
      provider: "codex",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      endpointPath: "/v1/responses",
    }),
    true
  );

  assert.equal(
    shouldUseNativeCodexPassthrough({
      provider: "codex",
      sourceFormat: FORMATS.OPENAI,
      endpointPath: "/v1/responses",
    }),
    false
  );

  assert.equal(
    shouldUseNativeCodexPassthrough({
      provider: "openai",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      endpointPath: "/v1/responses",
    }),
    false
  );

  assert.equal(
    shouldUseNativeCodexPassthrough({
      provider: "codex",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      endpointPath: "/v1/responses/compact",
    }),
    true
  );

  assert.equal(
    shouldUseNativeCodexPassthrough({
      provider: "codex",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      endpointPath: "/v1/responses/items/history",
    }),
    true
  );

  assert.equal(
    shouldUseNativeCodexPassthrough({
      provider: "codex",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      endpointPath: "/v1/chat/completions",
    }),
    false
  );
});

test("CodexExecutor can apply per-connection fast service tier defaults", () => {
  const executor = new CodexExecutor();
  const transformed = executor.transformRequest(
    "gpt-5.1-codex",
    { model: "gpt-5.1-codex", input: [] },
    true,
    {
      providerSpecificData: {
        requestDefaults: { serviceTier: "priority" },
      },
    }
  );
  assert.equal(transformed.service_tier, "priority");
});

test("CodexExecutor always requests SSE accept header", () => {
  const executor = new CodexExecutor();
  const headers = executor.buildHeaders({ accessToken: "test-token" }, false);
  assert.equal(headers.Accept, "text/event-stream");
});

test("CodexExecutor does not request SSE accept header for compact requests", () => {
  const executor = new CodexExecutor();
  const headers = executor.buildHeaders(
    {
      accessToken: "test-token",
      requestEndpointPath: "/v1/responses/compact",
    },
    false
  );
  assert.equal(headers.Accept, "application/json");
});

test("CodexExecutor preserves native responses payloads for Codex passthrough", () => {
  const executor = new CodexExecutor();
  const transformed = executor.transformRequest(
    "gpt-5.1-codex",
    {
      model: "gpt-5.1-codex",
      input: "ship it",
      instructions: "custom system prompt",
      store: true,
      metadata: { source: "codex-client" },
      reasoning_effort: "high",
      service_tier: "fast",
      _nativeCodexPassthrough: true,
      stream: false,
    },
    false,
    {}
  );

  assert.equal(transformed.stream, true);
  assert.equal(transformed.service_tier, "priority");
  assert.equal(transformed.instructions, "custom system prompt");
  assert.equal(transformed.store, false);
  assert.deepEqual(transformed.metadata, { source: "codex-client" });
  assert.equal(transformed.reasoning.effort, "high");
  assert.equal(transformed.reasoning_effort, undefined);
  assert.ok(!("_nativeCodexPassthrough" in transformed));
});

test("CodexExecutor strips streaming fields for compact passthrough", () => {
  const executor = new CodexExecutor();
  const transformed = executor.transformRequest(
    "gpt-5.1-codex",
    {
      model: "gpt-5.1-codex",
      input: "compact this session",
      stream: false,
      stream_options: { include_usage: true },
      _nativeCodexPassthrough: true,
    },
    false,
    {
      requestEndpointPath: "/v1/responses/compact",
    }
  );

  assert.equal("stream" in transformed, false);
  assert.equal("stream_options" in transformed, false);
  assert.ok(!("_nativeCodexPassthrough" in transformed));
});

test("CodexExecutor routes responses subpaths to matching upstream paths", () => {
  const executor = new CodexExecutor();
  const compactUrl = executor.buildUrl("gpt-5.1-codex", true, 0, {
    requestEndpointPath: "/v1/responses/compact",
  });
  assert.match(compactUrl, /\/responses\/compact$/);

  const genericSubpathUrl = executor.buildUrl("gpt-5.1-codex", true, 0, {
    requestEndpointPath: "/v1/responses/items/history",
  });
  assert.match(genericSubpathUrl, /\/responses\/items\/history$/);
});

test("translateNonStreamingResponse converts Responses API payload to OpenAI chat.completion", () => {
  const responseBody = {
    id: "resp_123",
    object: "response",
    created_at: 1739370000,
    model: "gpt-5.1-codex",
    output: [
      {
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "Hello from responses API." }],
      },
      {
        type: "function_call",
        id: "fc_1",
        call_id: "call_1",
        name: "sum",
        arguments: '{"a":1,"b":2}',
      },
    ],
    usage: {
      input_tokens: 11,
      output_tokens: 7,
    },
  };

  const translated = translateNonStreamingResponse(
    responseBody,
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI
  );

  assert.equal((translated as any).object, "chat.completion");
  assert.equal((translated as any).model, "gpt-5.1-codex");
  (assert as any).equal((translated as any).choices[0].message.role, "assistant");
  (assert as any).equal(
    (translated as any).choices[0].message.content,
    "Hello from responses API."
  );
  assert.equal((translated as any).choices[0].finish_reason, "tool_calls");
  assert.equal(((translated as any).choices[0].message.tool_calls as any).length, 1);
  assert.equal(((translated as any).usage as any).prompt_tokens, 11);
  assert.equal((translated as any).usage.completion_tokens, 7);
  assert.equal((translated as any).usage.total_tokens, 18);
});

test("extractUsageFromResponse reads usage from Responses API payload", () => {
  const responseBody = {
    object: "response",
    usage: {
      input_tokens: 20,
      output_tokens: 9,
      cache_read_input_tokens: 4,
      reasoning_tokens: 3,
    },
  };

  const usage = extractUsageFromResponse(responseBody, "github");
  assert.equal(usage.prompt_tokens, 20);
  assert.equal(usage.completion_tokens, 9);
  assert.equal(usage.cached_tokens, 4);
  assert.equal(usage.reasoning_tokens, 3);
});

test("detectFormat identifies OpenAI Responses when input is string", () => {
  const format = detectFormat({
    model: "gpt-5.1-codex",
    input: "hello world",
    stream: true,
  });
  assert.equal(format, FORMATS.OPENAI_RESPONSES);
});

test("detectFormat identifies OpenAI Responses by max_output_tokens without input array", () => {
  const format = detectFormat({
    model: "gpt-5.1-codex",
    max_output_tokens: 256,
    stream: false,
  });
  assert.equal(format, FORMATS.OPENAI_RESPONSES);
});

test("detectFormatFromEndpoint uses chat completions endpoint for OpenAI chat protocol", () => {
  const format = detectFormatFromEndpoint(
    {
      model: "test-model",
      messages: [{ role: "user", content: "hi" }],
      input: "ignored for endpoint protocol detection",
      max_output_tokens: 16,
      stream: false,
    },
    "/v1/chat/completions"
  );
  assert.equal(format, FORMATS.OPENAI);
});

test("detectFormatFromEndpoint forces Claude for /v1/messages", () => {
  const format = detectFormatFromEndpoint(
    {
      model: "claude-opus-4-6",
      messages: [{ role: "user", content: "hi" }],
      max_tokens: 16,
      stream: false,
    },
    "/v1/messages"
  );
  assert.equal(format, FORMATS.CLAUDE);
});

test("translateRequest normalizes openai-responses input string into list payload", () => {
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.1-codex",
    {
      model: "gpt-5.1-codex",
      input: "hello from responses",
      stream: false,
    },
    false
  );

  assert.ok(Array.isArray(translated.input));
  assert.equal(translated.input.length, 1);
  assert.equal(translated.input[0].type, "message");
  assert.equal(translated.input[0].role, "user");
  assert.equal(translated.input[0].content[0].type, "input_text");
  assert.equal(translated.input[0].content[0].text, "hello from responses");
});

test("translateRequest preserves service_tier when converting openai to openai-responses", () => {
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.1-codex",
    {
      model: "gpt-5.1-codex",
      messages: [{ role: "user", content: "hello from chat completions" }],
      service_tier: "fast",
      stream: false,
    },
    false
  );

  assert.equal(translated.service_tier, "fast");
  assert.ok(Array.isArray(translated.input));
});

test("parseSSEToResponsesOutput parses completed response from SSE payload", () => {
  const rawSSE = [
    "event: response.created",
    'data: {"type":"response.created","response":{"id":"resp_1","object":"response","model":"gpt-5.1-codex","status":"in_progress","output":[]}}',
    "",
    "event: response.completed",
    'data: {"type":"response.completed","response":{"id":"resp_1","object":"response","model":"gpt-5.1-codex","status":"completed","output":[{"type":"message","role":"assistant","content":[{"type":"output_text","text":"ok"}]}],"usage":{"input_tokens":5,"output_tokens":3}}}',
    "",
    "data: [DONE]",
    "",
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");
  assert.equal(parsed.object, "response");
  assert.equal(parsed.id, "resp_1");
  assert.equal(parsed.model, "gpt-5.1-codex");
  assert.equal(parsed.status, "completed");
  assert.equal(parsed.output[0].type, "message");
  assert.equal(parsed.usage.input_tokens, 5);
  assert.equal(parsed.usage.output_tokens, 3);
});

test("parseSSEToResponsesOutput returns null for invalid payload", () => {
  const parsed = parseSSEToResponsesOutput("data: not-json\n\ndata: [DONE]\n", "fallback-model");
  assert.equal(parsed, null);
});

test("parseSSEToOpenAIResponse merges split tool call chunks by id without duplication", () => {
  const rawSSE = [
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                id: "call_abc",
                index: 0,
                type: "function",
                function: { name: "sum", arguments: '{"a":' },
              },
            ],
          },
        },
      ],
    })}`,
    `data: ${JSON.stringify({
      id: "chatcmpl_1",
      object: "chat.completion.chunk",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                id: "call_abc",
                index: 0,
                type: "function",
                function: { arguments: "1}" },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    })}`,
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "gpt-5.1-codex");
  assert.ok(parsed);
  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
  assert.equal(parsed.choices[0].message.tool_calls.length, 1);
  assert.equal(parsed.choices[0].message.tool_calls[0].id, "call_abc");
  assert.equal(parsed.choices[0].message.tool_calls[0].function.name, "sum");
  assert.equal(parsed.choices[0].message.tool_calls[0].function.arguments, '{"a":1}');
});

test("parseSSEToOpenAIResponse normalizes delta.reasoning alias to reasoning_content", () => {
  const rawSSE = [
    `data: ${JSON.stringify({
      id: "chatcmpl_2",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { reasoning: "Let me think..." } }],
    })}`,
    `data: ${JSON.stringify({
      id: "chatcmpl_2",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { reasoning: " The answer is 4." } }],
    })}`,
    `data: ${JSON.stringify({
      id: "chatcmpl_2",
      object: "chat.completion.chunk",
      choices: [{ index: 0, delta: { content: "2+2=4" }, finish_reason: "stop" }],
    })}`,
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "moonshotai/kimi-k2.5");
  assert.ok(parsed);
  assert.equal(parsed.choices[0].message.reasoning_content, "Let me think... The answer is 4.");
  assert.equal(parsed.choices[0].message.content, "2+2=4");
});
