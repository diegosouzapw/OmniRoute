import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function createState() {
  return {
    toolCalls: new Map(),
  };
}

function flatten(items) {
  return items.flatMap((item) => item || []);
}

test("OpenAI stream: text delta starts Claude message and closes cleanly on stop", () => {
  const state = createState();
  const first = openaiToClaudeResponse(
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "Hello" }, finish_reason: null }],
    },
    state
  );
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-1",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
    },
    state
  );
  const result = flatten([first, final]);

  assert.equal(result[0].type, "message_start");
  assert.equal(result[1].type, "content_block_start");
  assert.equal(result[2].delta.text, "Hello");
  assert.equal(result[3].type, "content_block_stop");
  assert.equal(result[4].type, "message_delta");
  assert.equal(result[4].delta.stop_reason, "end_turn");
  assert.equal(result[4].usage.input_tokens, 3);
  assert.equal(result[4].usage.output_tokens, 2);
  assert.equal(result[5].type, "message_stop");
});

test("OpenAI stream: reasoning_content closes before text content starts", () => {
  const state = createState();
  const reasoning = openaiToClaudeResponse(
    {
      id: "chatcmpl-2",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { reasoning_content: "Plan" }, finish_reason: null }],
    },
    state
  );
  const text = openaiToClaudeResponse(
    {
      id: "chatcmpl-2",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "Answer" }, finish_reason: null }],
    },
    state
  );
  const result = flatten([reasoning, text]);

  assert.equal(result[1].content_block.type, "thinking");
  assert.equal(result[2].delta.thinking, "Plan");
  assert.equal(result[3].type, "content_block_stop");
  assert.equal(result[4].content_block.type, "text");
  assert.equal(result[5].delta.text, "Answer");
});

test("OpenAI stream: tool calls strip Claude OAuth prefix and keep cache usage", () => {
  const state = createState();
  const started = openaiToClaudeResponse(
    {
      id: "chatcmpl-3",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: {
                  name: "proxy_read_file",
                  arguments: '{"path":',
                },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const finished = openaiToClaudeResponse(
    {
      id: "chatcmpl-3",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                function: {
                  arguments: '"/tmp/a"}',
                },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: {
        prompt_tokens: 10,
        completion_tokens: 4,
        total_tokens: 14,
        prompt_tokens_details: {
          cached_tokens: 2,
          cache_creation_tokens: 1,
        },
      },
    },
    state
  );
  const result = flatten([started, finished]);

  assert.equal(result[1].content_block.name, "read_file");
  assert.equal(result[2].delta.partial_json, '{"path":');
  assert.equal(result[3].delta.partial_json, '"/tmp/a"}');
  assert.equal(result[5].delta.stop_reason, "tool_use");
  assert.equal(result[5].usage.input_tokens, 7);
  assert.equal(result[5].usage.output_tokens, 4);
  assert.equal(result[5].usage.cache_read_input_tokens, 2);
  assert.equal(result[5].usage.cache_creation_input_tokens, 1);
});

test("OpenAI non-stream: chat completion becomes Claude message with thinking and tool_use", () => {
  const result = translateNonStreamingResponse(
    {
      id: "chatcmpl-ns",
      object: "chat.completion",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            reasoning_content: "Think first",
            content: "Final answer",
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: {
                  name: "read_file",
                  arguments: JSON.stringify({ path: "/tmp/a" }),
                },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: {
        prompt_tokens: 5,
        completion_tokens: 3,
      },
    },
    FORMATS.OPENAI,
    FORMATS.CLAUDE
  );

  assert.equal((result as any).type, "message");
  (assert as any).equal((result as any).model, "gpt-4.1");
  (assert as any).equal((result as any).content[0].type, "thinking");
  assert.equal((result as any).content[0].thinking, "Think first");
  assert.equal((result as any).content[1].type, "text");
  assert.equal((result as any).content[1].text, "Final answer");
  assert.equal((result as any).content[2].type, "tool_use");
  assert.equal((result as any).content[2].name, "read_file");
  (assert as any).deepEqual((result as any).content[2].input, { path: "/tmp/a" });
  assert.equal((result as any).stop_reason, "tool_use");
  assert.deepEqual((result as any).usage, {
    input_tokens: 5,
    output_tokens: 3,
  });
});

test("OpenAI stream: null chunk is ignored", () => {
  assert.equal(openaiToClaudeResponse(null, createState()), null);
});
