import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIResponse } =
  await import("../../open-sse/translator/response/claude-to-openai.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function createState() {
  return {
    toolCalls: new Map(),
    toolNameMap: new Map([["proxy_read_file", "read_file"]]),
  };
}

test("Claude non-stream: text, thinking and tool_use become OpenAI assistant message", () => {
  const result = translateNonStreamingResponse(
    {
      id: "msg_123",
      model: "claude-3-7-sonnet",
      content: [
        { type: "thinking", thinking: "Plan first." },
        { type: "text", text: "Final answer" },
        {
          type: "tool_use",
          id: "tool_1",
          name: "proxy_read_file",
          input: { path: "/tmp/a" },
        },
      ],
      stop_reason: "tool_use",
      usage: {
        input_tokens: 10,
        output_tokens: 4,
      },
    },
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    new Map([["proxy_read_file", "read_file"]])
  );

  assert.equal(result.id, "chatcmpl-msg_123");
  assert.equal(result.model, "claude-3-7-sonnet");
  assert.equal(result.choices[0].message.content, "Final answer");
  assert.equal(result.choices[0].message.reasoning_content, "Plan first.");
  assert.equal(result.choices[0].message.tool_calls[0].id, "tool_1");
  assert.equal(result.choices[0].message.tool_calls[0].function.name, "read_file");
  assert.equal(
    result.choices[0].message.tool_calls[0].function.arguments,
    JSON.stringify({ path: "/tmp/a" })
  );
  assert.equal(result.choices[0].finish_reason, "tool_calls");
  assert.deepEqual(result.usage, {
    prompt_tokens: 10,
    completion_tokens: 4,
    total_tokens: 14,
  });
});

test("Claude non-stream: end_turn becomes stop and empty text is preserved", () => {
  const result = translateNonStreamingResponse(
    {
      id: "msg_empty",
      model: "claude-3-5-haiku",
      content: [{ type: "text", text: "" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 2, output_tokens: 1 },
    },
    FORMATS.CLAUDE,
    FORMATS.OPENAI
  );

  assert.equal(result.choices[0].message.content, "");
  assert.equal(result.choices[0].finish_reason, "stop");
  assert.equal(result.model, "claude-3-5-haiku");
});

test("Claude non-stream: usage.prompt_tokens includes cache read and cache creation tokens", () => {
  const result = translateNonStreamingResponse(
    {
      id: "msg_cached",
      model: "claude-3-7-sonnet",
      content: [{ type: "text", text: "cached reply" }],
      stop_reason: "end_turn",
      usage: {
        input_tokens: 384,
        output_tokens: 28,
        cache_read_input_tokens: 37248,
        cache_creation_input_tokens: 16,
      },
    },
    FORMATS.CLAUDE,
    FORMATS.OPENAI
  );

  assert.equal(result.usage.prompt_tokens, 37648);
  assert.equal(result.usage.completion_tokens, 28);
  assert.equal(result.usage.total_tokens, 37676);
  assert.equal(result.usage.prompt_tokens_details.cached_tokens, 37248);
  assert.equal(result.usage.prompt_tokens_details.cache_creation_tokens, 16);
});

test("Claude stream: message_start emits initial assistant role chunk", () => {
  const result = claudeToOpenAIResponse(
    {
      type: "message_start",
      message: { id: "msg1", model: "claude-3-7-sonnet" },
    },
    createState()
  );

  assert.equal(result.length, 1);
  assert.equal(result[0].id, "chatcmpl-msg1");
  assert.equal(result[0].choices[0].delta.role, "assistant");
});

test("Claude stream: text deltas stream as content", () => {
  const state = createState();
  claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg1", model: "claude-3-7-sonnet" } },
    state
  );
  claudeToOpenAIResponse(
    { type: "content_block_start", index: 0, content_block: { type: "text" } },
    state
  );

  const result = claudeToOpenAIResponse(
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "Hello" },
    },
    state
  );

  assert.equal(result[0].choices[0].delta.content, "Hello");
});

test("Claude stream: thinking blocks emit reasoning_content chunks", () => {
  const state = createState();
  claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg1", model: "claude-3-7-sonnet" } },
    state
  );

  const started = claudeToOpenAIResponse(
    {
      type: "content_block_start",
      index: 1,
      content_block: { type: "thinking" },
    },
    state
  );
  const delta = claudeToOpenAIResponse(
    {
      type: "content_block_delta",
      index: 1,
      delta: { type: "thinking_delta", thinking: "I should inspect the file." },
    },
    state
  );

  assert.equal(started[0].choices[0].delta.reasoning_content, "");
  assert.equal(delta[0].choices[0].delta.reasoning_content, "I should inspect the file.");
});

test("Claude stream: tool_use start reverses prefixed tool names and streams argument deltas", () => {
  const state = createState();
  claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg1", model: "claude-3-7-sonnet" } },
    state
  );

  const started = claudeToOpenAIResponse(
    {
      type: "content_block_start",
      index: 2,
      content_block: { type: "tool_use", id: "tool1", name: "proxy_read_file" },
    },
    state
  );
  const delta1 = claudeToOpenAIResponse(
    {
      type: "content_block_delta",
      index: 2,
      delta: { type: "input_json_delta", partial_json: '{"path":' },
    },
    state
  );
  const delta2 = claudeToOpenAIResponse(
    {
      type: "content_block_delta",
      index: 2,
      delta: { type: "input_json_delta", partial_json: '"/tmp/a"}' },
    },
    state
  );

  assert.equal(started[0].choices[0].delta.tool_calls[0].id, "tool1");
  assert.equal(started[0].choices[0].delta.tool_calls[0].function.name, "read_file");
  assert.equal(delta1[0].choices[0].delta.tool_calls[0].function.arguments, '{"path":');
  assert.equal(delta2[0].choices[0].delta.tool_calls[0].function.arguments, '"/tmp/a"}');
});

test("Claude stream: message_delta maps stop reason and usage including cache tokens", () => {
  const state = createState();
  claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg1", model: "claude-3-7-sonnet" } },
    state
  );

  const result = claudeToOpenAIResponse(
    {
      type: "message_delta",
      delta: { stop_reason: "tool_use" },
      usage: {
        input_tokens: 10,
        output_tokens: 4,
        cache_read_input_tokens: 2,
        cache_creation_input_tokens: 1,
      },
    },
    state
  );

  assert.equal(result[0].choices[0].finish_reason, "tool_calls");
  assert.equal(result[0].usage.prompt_tokens, 13);
  assert.equal(result[0].usage.completion_tokens, 4);
  assert.equal(result[0].usage.total_tokens, 17);
  assert.equal(result[0].usage.prompt_tokens_details.cached_tokens, 2);
  assert.equal(result[0].usage.prompt_tokens_details.cache_creation_tokens, 1);
});

test("Claude stream: message_stop falls back to tool_calls when tool use already happened", () => {
  const state = createState();
  claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg1", model: "claude-3-7-sonnet" } },
    state
  );
  claudeToOpenAIResponse(
    {
      type: "content_block_start",
      index: 2,
      content_block: { type: "tool_use", id: "tool1", name: "proxy_read_file" },
    },
    state
  );

  const result = claudeToOpenAIResponse({ type: "message_stop" }, state);

  assert.equal(result[0].choices[0].finish_reason, "tool_calls");
});

test("Claude stream: message_stop fallback preserves cached prompt tokens in usage", () => {
  const state = createState();
  claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg1", model: "claude-3-7-sonnet" } },
    state
  );
  claudeToOpenAIResponse(
    {
      type: "message_delta",
      usage: {
        input_tokens: 10,
        output_tokens: 4,
        cache_read_input_tokens: 2,
        cache_creation_input_tokens: 1,
      },
    },
    state
  );

  const result = claudeToOpenAIResponse({ type: "message_stop" }, state);

  assert.equal(result[0].choices[0].finish_reason, "stop");
  assert.equal(result[0].usage.prompt_tokens, 13);
  assert.equal(result[0].usage.completion_tokens, 4);
  assert.equal(result[0].usage.total_tokens, 17);
});

test("Claude stream: unsupported events return null", () => {
  assert.equal(claudeToOpenAIResponse({ type: "error" }, createState()), null);
});

test("Responses non-stream: OpenAI-compatible cached token details are read from nested detail objects", () => {
  const result = translateNonStreamingResponse(
    {
      id: "resp_123",
      object: "response",
      model: "gpt-4.1",
      output: [
        {
          id: "msg_1",
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: "Hello" }],
        },
      ],
      usage: {
        input_tokens: 20,
        output_tokens: 5,
        input_tokens_details: { cached_tokens: 7 },
        output_tokens_details: { reasoning_tokens: 2 },
      },
    },
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI
  );

  assert.equal(result.usage.prompt_tokens, 27);
  assert.equal(result.usage.completion_tokens, 5);
  assert.equal(result.usage.total_tokens, 32);
  assert.equal(result.usage.prompt_tokens_details.cached_tokens, 7);
  assert.equal(result.usage.completion_tokens_details.reasoning_tokens, 2);
});
