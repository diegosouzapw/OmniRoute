import test from "node:test";
import assert from "node:assert/strict";

const {
  extractThinkingFromContent,
  sanitizeOpenAIResponse,
  sanitizeResponsesApiResponse,
  sanitizeStreamingChunk,
} = await import("../../open-sse/handlers/responseSanitizer.ts");

test("extractThinkingFromContent separates think blocks from visible content", () => {
  const parsed = extractThinkingFromContent(
    "Before<think>reasoning 1</think>middle<thinking>reasoning 2</thinking>after"
  );

  assert.equal(parsed.content, "Beforemiddleafter");
  assert.equal(parsed.thinking, "reasoning 1\n\nreasoning 2");
});

test("sanitizeOpenAIResponse strips non-standard fields and preserves required top-level fields", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl_existing",
    object: "chat.completion",
    created: 123,
    model: "gpt-4.1",
    choices: [],
    x_groq: { ignored: true },
    service_tier: "premium",
  });

  assert.deepEqual(sanitized, {
    id: "chatcmpl_existing",
    object: "chat.completion",
    created: 123,
    model: "gpt-4.1",
    choices: [],
  });
});

test("sanitizeOpenAIResponse extracts thinking, collapses newlines, strips final reasoning_content, and preserves tool calls", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl_test",
    model: "gpt-4.1",
    choices: [
      {
        index: 2,
        finish_reason: "tool_calls",
        message: {
          role: "assistant",
          content: "Hello\n\n\n<think>internal chain</think>\n\nworld",
          tool_calls: [{ id: "call_1" }],
          function_call: { name: "legacy" },
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].index, 2);
  assert.equal((sanitized as any).choices[0].finish_reason, "tool_calls");
  (assert as any).equal((sanitized as any).choices[0].message.content, "Hello\n\nworld");
  assert.equal((sanitized as any).choices[0].message.reasoning_content, undefined);
  (assert as any).deepEqual((sanitized as any).choices[0].message.tool_calls, [{ id: "call_1" }]);
  assert.deepEqual((sanitized as any).choices[0].message.function_call, { name: "legacy" });
});

test("sanitizeOpenAIResponse preserves native reasoning_content when no visible content remains", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "gpt-4.1",
    choices: [
      {
        message: {
          role: "assistant",
          content: "<think>discard me</think>",
          reasoning_content: "provider reasoning",
        },
      },
    ],
  });

  assert.equal(((sanitized as any).choices[0].message as any).content, "");
  assert.equal((sanitized as any).choices[0].message.reasoning_content, "provider reasoning");
});

test("sanitizeOpenAIResponse maps Claude-style usage fields and strips extras", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "claude-3-7-sonnet",
    choices: [],
    usage: {
      input_tokens: 11,
      output_tokens: 7,
      service_tier: "ignored",
      usage_breakdown: { ignored: true },
    },
  });

  assert.deepEqual((sanitized as any).usage, {
    prompt_tokens: 11,
    completion_tokens: 7,
    total_tokens: 18,
  });
});

test("sanitizeOpenAIResponse strips reasoning_details-derived reasoning_content when visible text exists", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "openrouter/model",
    choices: [
      {
        message: {
          role: "assistant",
          content: "Visible",
          reasoning_details: [
            { type: "reasoning.text", text: "first " },
            { type: "thinking", content: "second" },
            { type: "other", text: "ignored" },
          ],
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].message.reasoning_content, undefined);
});

test("sanitizeOpenAIResponse keeps reasoning_details-derived reasoning_content for reasoning-only messages", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "openrouter/model",
    choices: [
      {
        message: {
          role: "assistant",
          content: "",
          reasoning_details: [
            { type: "reasoning.text", text: "first " },
            { type: "thinking", content: "second" },
          ],
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].message.reasoning_content, "first second");
});

test("sanitizeResponsesApiResponse converts chat completions tool calls into Responses output items", () => {
  const sanitized = sanitizeResponsesApiResponse({
    id: "chatcmpl_tool",
    object: "chat.completion",
    created: 123,
    model: "gpt-4.1",
    choices: [
      {
        index: 0,
        finish_reason: "tool_calls",
        message: {
          role: "assistant",
          content: "",
          reasoning_content: "Check web results first.",
          tool_calls: [
            {
              id: "call_web_search",
              type: "function",
              function: {
                name: "omniroute_web_search",
                arguments: '{"query":"omniroute"}',
              },
            },
          ],
        },
      },
    ],
    usage: {
      prompt_tokens: 12,
      completion_tokens: 5,
      prompt_tokens_details: { cached_tokens: 3 },
      completion_tokens_details: { reasoning_tokens: 2 },
    },
  });

  assert.equal((sanitized as any).object, "response");
  assert.equal((sanitized as any).id, "resp_chatcmpl_tool");
  assert.equal((sanitized as any).output[0].type, "reasoning");
  (assert as any).equal((sanitized as any).output[1].type, "function_call");
  (assert as any).equal((sanitized as any).output[1].call_id, "call_web_search");
  (assert as any).equal((sanitized as any).output[1].name, "omniroute_web_search");
  assert.equal((sanitized as any).usage.input_tokens, 12);
  assert.equal(((sanitized as any).usage as any).output_tokens, 5);
  assert.equal((sanitized as any).usage.input_tokens_details.cached_tokens, 3);
  assert.equal((sanitized as any).usage.output_tokens_details.reasoning_tokens, 2);
});

test("sanitizeResponsesApiResponse preserves native Responses payloads and usage details", () => {
  const sanitized = sanitizeResponsesApiResponse({
    id: "resp_native",
    object: "response",
    created_at: 456,
    model: "gpt-5.1-codex",
    status: "completed",
    output: [
      {
        id: "msg_1",
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "Hello\n\n\nworld", annotations: [] }],
      },
      {
        id: "fc_1",
        type: "function_call",
        call_id: "call_1",
        name: "lookup",
        arguments: { path: "/tmp/a" },
      },
    ],
    usage: {
      input_tokens: 20,
      output_tokens: 7,
      prompt_tokens_details: { cached_tokens: 4 },
      cache_creation_input_tokens: 1,
      completion_tokens_details: { reasoning_tokens: 3 },
    },
  });

  assert.equal((sanitized as any).object, "response");
  assert.equal(((sanitized as any).output[0] as any).content[0].text, "Hello\n\nworld");
  assert.equal((sanitized as any).output[1].arguments, '{"path":"/tmp/a"}');
  assert.equal((sanitized as any).output_text, "Hello\n\nworld");
  assert.equal((sanitized as any).usage.input_tokens, 20);
  (assert as any).equal((sanitized as any).usage.output_tokens, 7);
  assert.equal((sanitized as any).usage.input_tokens_details.cached_tokens, 4);
  assert.equal((sanitized as any).usage.input_tokens_details.cache_creation_tokens, 1);
  assert.equal((sanitized as any).usage.output_tokens_details.reasoning_tokens, 3);
});

test("sanitizeStreamingChunk keeps only safe chunk fields and maps reasoning aliases", () => {
  const sanitized = sanitizeStreamingChunk({
    id: "chunk_1",
    object: "chat.completion.chunk",
    created: 456,
    model: "gpt-4.1",
    choices: [
      {
        index: 3,
        delta: {
          role: "assistant",
          content: "Line 1\n\n\nLine 2",
          reasoning: "stream reasoning",
          tool_calls: [{ id: "call_1" }],
        },
        finish_reason: "stop",
        logprobs: { mock: true },
      },
    ],
    usage: { input_tokens: 2, output_tokens: 1, secret: true },
    system_fingerprint: "fp_123",
    provider_debug: "drop-me",
  });

  assert.deepEqual(sanitized, {
    id: "chunk_1",
    object: "chat.completion.chunk",
    created: 456,
    model: "gpt-4.1",
    choices: [
      {
        index: 3,
        delta: {
          role: "assistant",
          content: "Line 1\n\nLine 2",
          reasoning_content: "stream reasoning",
          tool_calls: [{ id: "call_1" }],
        },
        finish_reason: "stop",
        logprobs: { mock: true },
      },
    ],
    usage: {
      prompt_tokens: 2,
      completion_tokens: 1,
      total_tokens: 3,
    },
    system_fingerprint: "fp_123",
  });
});

test("sanitizeStreamingChunk converts reasoning_details arrays in deltas", () => {
  const sanitized = sanitizeStreamingChunk({
    choices: [
      {
        delta: {
          reasoning_details: [{ type: "reasoning.text", text: "alpha" }, { content: "beta" }],
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].delta.reasoning_content, "alphabeta");
});

test("sanitize functions return non-object inputs unchanged", () => {
  assert.equal(sanitizeOpenAIResponse(null), null);
  assert.equal(sanitizeStreamingChunk("raw text"), "raw text");
});
