import { test } from "node:test";
import assert from "node:assert/strict";

import {
  translateNonStreamingClientResponse,
  type NonStreamingClientTranslateInput,
} from "../../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts";
import { FORMATS } from "../../../open-sse/translator/formats.ts";
import {
  buildAssistantMessageCacheKey,
  clearReasoningCacheAll,
  lookupReasoning,
} from "../../../open-sse/services/reasoningCache.ts";
import { invalidateBufferTokensCache } from "../../../open-sse/utils/usageTracking.ts";

/* ── helpers ─────────────────────────────────────────────────────────────── */

function baseInput(
  overrides: Partial<NonStreamingClientTranslateInput> = {}
): NonStreamingClientTranslateInput {
  return {
    responseBody: {
      id: "chatcmpl-test",
      object: "chat.completion",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "Hello!" },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    },
    responsePayloadFormat: "openai",
    clientResponseFormat: "openai",
    sourceFormat: "openai",
    provider: "openai",
    model: "gpt-4o",
    requestBody: { messages: [{ role: "user", content: "hi" }] },
    responseToolNameMap: null,
    requestToolIdentityMap: null,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "final",
    ...overrides,
  };
}

/* ── characterization tests ──────────────────────────────────────────────── */

test("basic translate: same-format passthrough returns responseBody", () => {
  const input = baseInput();
  const result = translateNonStreamingClientResponse(input);
  assert.equal(result.response.choices[0].message.content, "Hello!");
  assert.ok(result.responseForMemoryExtraction);
});

test("translate from claude to openai format", () => {
  const input = baseInput({
    responseBody: {
      id: "msg-123",
      content: [{ type: "text", text: "Hi there" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 10, output_tokens: 5 },
    },
    responsePayloadFormat: "claude",
    clientResponseFormat: "openai",
    sourceFormat: "claude",
    provider: "anthropic",
    model: "claude-sonnet-4-20250514",
  });
  const result = translateNonStreamingClientResponse(input);
  const msg = result.response.choices?.[0]?.message;
  assert.ok(msg, "should have choices[0].message");
  assert.equal((msg as { content: string }).content, "Hi there");
});

test("claude source strips markdown code fence", () => {
  const input = baseInput({
    responseBody: {
      id: "msg-123",
      content: [
        {
          type: "text",
          text: '```json\n{"key": "value"}\n```',
        },
      ],
      stop_reason: "end_turn",
      usage: { input_tokens: 10, output_tokens: 5 },
    },
    responsePayloadFormat: "claude",
    clientResponseFormat: "openai",
    sourceFormat: "claude",
    provider: "anthropic",
    model: "claude-sonnet-4-20250514",
  });
  const result = translateNonStreamingClientResponse(input);
  const content = result.response.choices?.[0]?.message?.content;
  assert.ok(typeof content === "string");
  // After stripping, the content should not have the markdown fence wrapper
  assert.ok(!content.startsWith("```json"), "markdown fence should be stripped");
});

test("normalizeOpenAIToolFinishReasons: tool_calls present → finish_reason tool_calls", () => {
  const input = baseInput({
    responseBody: {
      id: "chatcmpl-test",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "get_weather", arguments: "{}" },
              },
            ],
          },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    },
  });
  const result = translateNonStreamingClientResponse(input);
  assert.equal(result.response.choices[0].finish_reason, "tool_calls");
});

test("reasoning replay: no-tool history comes from historyMessages, not requestBody.input", () => {
  clearReasoningCacheAll();
  const scope = "api-key:test:s...6a";
  const historyMessages = [{ role: "user", content: "hi from translatedBody" }];
  const assistantMessage = {
    role: "assistant",
    content: "thinking result",
    reasoning_content: "let me think...",
  };
  const input = baseInput({
    responseBody: {
      id: "chatcmpl-test",
      choices: [
        {
          index: 0,
          message: assistantMessage,
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
    },
    // Responses-shaped finalBody: input, no messages. Parent used translatedBody.messages.
    requestBody: { input: [{ role: "user", content: "wrong body" }] },
    historyMessages,
    provider: "deepseek",
    model: "deepseek-v4-pro",
    reasoningCacheScope: scope,
    phase: "intermediate",
  });
  const result = translateNonStreamingClientResponse(input);
  assert.ok(result.response);
  const cacheKey = buildAssistantMessageCacheKey(
    scope,
    [...historyMessages, assistantMessage],
    historyMessages.length
  );
  assert.equal(
    lookupReasoning(cacheKey),
    "let me think...",
    "must cache against translatedBody.messages, not finalBody.input"
  );
});

test("phase=final applies client usage buffer", () => {
  // Gemini format skips OpenAI/Responses sanitize, so extra usage fields
  // only disappear if applyClientUsageBuffer → filterUsageForFormat runs.
  const input = baseInput({
    phase: "final",
    clientResponseFormat: FORMATS.GEMINI,
    responsePayloadFormat: FORMATS.GEMINI,
    sourceFormat: FORMATS.GEMINI,
    responseBody: {
      id: "chatcmpl-test",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "Hello!" },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 5,
        total_tokens: 15,
        x_provider_extra: 99,
      },
    },
  });
  const result = translateNonStreamingClientResponse(input);
  const usage = (result.response as { usage: Record<string, unknown> }).usage;
  assert.equal(usage.x_provider_extra, undefined, "final phase must filter extra usage fields");
  assert.equal(
    usage.prompt_tokens,
    undefined,
    "final Gemini filter must drop OpenAI-shaped prompt_tokens"
  );
});

test("phase=intermediate skips applyClientUsageBuffer", () => {
  const input = baseInput({
    phase: "intermediate",
    clientResponseFormat: FORMATS.GEMINI,
    responsePayloadFormat: FORMATS.GEMINI,
    sourceFormat: FORMATS.GEMINI,
    responseBody: {
      id: "chatcmpl-test",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "partial" },
          finish_reason: null,
        },
      ],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 5,
        total_tokens: 15,
        x_provider_extra: 99,
      },
    },
  });
  const result = translateNonStreamingClientResponse(input);
  const usage = (result.response as { usage: Record<string, unknown> }).usage;
  assert.equal(
    usage.x_provider_extra,
    99,
    "intermediate must keep raw extra usage fields (buffer not applied)"
  );
  assert.equal(usage.prompt_tokens, 10);
});

test("Responses API format: sanitizeResponsesApiResponse is applied", () => {
  const input = baseInput({
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    responseBody: {
      id: "resp_123",
      object: "response",
      output: [
        {
          type: "function_call",
          name: "ns__get_weather",
          arguments: "{}",
        },
      ],
      usage: { input_tokens: 10, output_tokens: 5 },
      illegal_top_level: "drop-me",
    },
    requestToolIdentityMap: new Map([
      ["ns__get_weather", { namespace: "ns", name: "get_weather" }],
    ]),
  });
  const result = translateNonStreamingClientResponse(input);
  assert.equal(result.response.object, "response");
  assert.equal(result.response.illegal_top_level, undefined, "sanitizer must drop illegal fields");
  const output = result.response.output as Array<Record<string, unknown>>;
  assert.equal(output[0]?.type, "function_call");
  assert.equal(output[0]?.namespace, "ns", "#7936 restore namespace");
  assert.equal(output[0]?.name, "get_weather", "#7936 restore original name");
});

test("empty content response: passthrough without crash", () => {
  const input = baseInput({
    responseBody: {},
  });
  const result = translateNonStreamingClientResponse(input);
  assert.ok(result.response);
  assert.ok(result.responseForMemoryExtraction);
});

test("isClaudeCodeCompatible preserves context budget usage", () => {
  const saved = process.env.USAGE_TOKEN_BUFFER;
  process.env.USAGE_TOKEN_BUFFER = "2000";
  invalidateBufferTokensCache();
  try {
    const input = baseInput({
      isClaudeCodeCompatible: true,
      clientResponseFormat: FORMATS.OPENAI,
      phase: "final",
      responseBody: {
        id: "chatcmpl-test",
        object: "chat.completion",
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "test" },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: 100,
          completion_tokens: 50,
          total_tokens: 150,
        },
      },
    });
    const result = translateNonStreamingClientResponse(input);
    const usage = (result.response as { usage: Record<string, unknown> }).usage;
    assert.equal(
      usage.prompt_tokens,
      2100,
      "Claude Code path must fold context_budget_prompt_tokens (100+2000) into visible prompt_tokens"
    );
    assert.equal(usage.total_tokens, 2150);
    assert.equal("context_budget_prompt_tokens" in usage, false);
  } finally {
    if (saved === undefined) delete process.env.USAGE_TOKEN_BUFFER;
    else process.env.USAGE_TOKEN_BUFFER = saved;
    invalidateBufferTokensCache();
  }
});
