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

  assert.equal((result as any).id, "chatcmpl-msg_123");
  (assert as any).equal((result as any).model, "claude-3-7-sonnet");
  (assert as any).equal((result as any).choices[0].message.content, "Final answer");
  assert.equal((result as any).choices[0].message.reasoning_content, "Plan first.");
  assert.equal((result as any).choices[0].message.tool_calls[0].id, "tool_1");
  assert.equal((result as any).choices[0].message.tool_calls[0].function.name, "read_file");
  (assert as any).equal(
    (result as any).choices[0].message.tool_calls[0].function.arguments,
    JSON.stringify({ path: "/tmp/a" })
  );
  assert.equal((result as any).choices[0].finish_reason, "tool_calls");
  assert.deepEqual((result as any).usage, {
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
    (FORMATS as any).OPENAI
  );

  assert.equal(((result as any).choices[0] as any).message.content, "");
  assert.equal((result as any).choices[0].finish_reason, "stop");
  assert.equal((result as any).model, "claude-3-5-haiku");
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

test("Claude stream: message_delta maps stop reason and usage including cache tokens (#1426, #2215)", () => {
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
  // #2215: prompt_tokens = input + cache_read (excludes cache_creation overhead)
  assert.equal(result[0].usage.prompt_tokens, 12);
  assert.equal(result[0].usage.completion_tokens, 4);
  assert.equal(result[0].usage.total_tokens, 16);
  // cache_read continues to be visible in prompt_tokens_details (preserves #1426 intent)
  assert.equal(result[0].usage.prompt_tokens_details.cached_tokens, 2);
  // cache_creation is exposed for auditing but does NOT inflate prompt_tokens
  assert.equal(result[0].usage.prompt_tokens_details.cache_creation_tokens, 1);
});

test("Claude stream: #2215 — short prompt with large cache_creation does not inflate prompt_tokens", () => {
  const state = createState();
  claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg1", model: "claude-sonnet-4-6" } },
    state
  );

  // Reproduces the scenario in the bug report: user sends "hi" with a long
  // system prompt that triggers cache_control. Anthropic returns:
  //   input_tokens: 8 (just "hi")
  //   cache_creation_input_tokens: 2000 (system prompt being cached)
  //   cache_read_input_tokens: 0 (first turn, no cache hit yet)
  // Before the fix: prompt_tokens = 2008 (8 + 0 + 2000). Now: prompt_tokens = 8.
  const result = claudeToOpenAIResponse(
    {
      type: "message_delta",
      delta: { stop_reason: "end_turn" },
      usage: {
        input_tokens: 8,
        output_tokens: 11,
        cache_read_input_tokens: 0,
        cache_creation_input_tokens: 2000,
      },
    },
    state
  );

  assert.equal(result[0].usage.prompt_tokens, 8);
  assert.equal(result[0].usage.completion_tokens, 11);
  assert.equal(result[0].usage.total_tokens, 19);
  // cache_creation is auditable but not in prompt_tokens
  assert.equal(result[0].usage.prompt_tokens_details.cache_creation_tokens, 2000);
  // No cache_read so cached_tokens should not be set
  assert.equal(result[0].usage.prompt_tokens_details.cached_tokens, undefined);
});

test("Claude stream: #2215 — cache_read alone is billable input (cache hit path)", () => {
  const state = createState();
  claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg1", model: "claude-sonnet-4-6" } },
    state
  );

  // Second turn: user sends another "hi". This time the system prompt is in
  // cache (cache_read=2000), and only "hi" is fresh input (input=8).
  // prompt_tokens should reflect everything the user effectively paid for: 8 + 2000 = 2008.
  // cached_tokens reports how many were a hit.
  const result = claudeToOpenAIResponse(
    {
      type: "message_delta",
      delta: { stop_reason: "end_turn" },
      usage: {
        input_tokens: 8,
        output_tokens: 5,
        cache_read_input_tokens: 2000,
        cache_creation_input_tokens: 0,
      },
    },
    state
  );

  assert.equal(result[0].usage.prompt_tokens, 2008);
  assert.equal(result[0].usage.prompt_tokens_details.cached_tokens, 2000);
  assert.equal(result[0].usage.prompt_tokens_details.cache_creation_tokens, undefined);
});

test("Claude stream: #2215 — no cache fields means no prompt_tokens_details", () => {
  const state = createState();
  claudeToOpenAIResponse(
    { type: "message_start", message: { id: "msg1", model: "claude-sonnet-4-6" } },
    state
  );

  const result = claudeToOpenAIResponse(
    {
      type: "message_delta",
      delta: { stop_reason: "end_turn" },
      usage: {
        input_tokens: 50,
        output_tokens: 20,
      },
    },
    state
  );

  assert.equal(result[0].usage.prompt_tokens, 50);
  assert.equal(result[0].usage.completion_tokens, 20);
  assert.equal(result[0].usage.total_tokens, 70);
  assert.equal(result[0].usage.prompt_tokens_details, undefined);
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

test("Claude stream: unsupported events return null", () => {
  assert.equal(claudeToOpenAIResponse({ type: "error" }, createState()), null);
});
