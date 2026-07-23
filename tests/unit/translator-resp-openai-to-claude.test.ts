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
    _pendingXmlToolCalls: [],
    _xmlInvokeBuffer: "",
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

test("OpenAI stream: internal reasoning replay placeholder stays hidden from Claude thinking block", () => {
  const state = createState();
  const placeholder = openaiToClaudeResponse(
    {
      id: "chatcmpl-2b",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: { reasoning_content: "(prior reasoning summary unavailable)" },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const text = openaiToClaudeResponse(
    {
      id: "chatcmpl-2b",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "Answer" }, finish_reason: null }],
    },
    state
  );
  const result = flatten([placeholder, text]);

  assert.equal(
    result.some((event) => event.type === "content_block_start" && event.content_block?.type === "thinking"),
    false
  );
  assert.equal(result[0].type, "message_start");
  assert.equal(result[1].content_block.type, "text");
  assert.equal(result[2].delta.text, "Answer");
});

test("OpenAI stream: placeholder-only content bundled with finish_reason still emits the stop event (#8081 regression)", () => {
  const state = createState();
  // Start a real message with some text first.
  const first = openaiToClaudeResponse(
    {
      id: "chatcmpl-2c",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "Answer" }, finish_reason: null }],
    },
    state
  );
  // Final chunk carries the internal reasoning placeholder as ordinary content
  // AND the finish_reason in the SAME chunk. The placeholder content must be
  // suppressed, but the stop event must still fire (the pre-fix bare `return`
  // dropped the finish entirely — this is the regression guard).
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-2c",
      model: "gpt-4.1",
      choices: [
        {
          index: 0,
          delta: { content: "(prior reasoning summary unavailable)" },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 4, completion_tokens: 1, total_tokens: 5 },
    },
    state
  );
  const result = flatten([first, final]);

  // The placeholder text is never emitted as a visible text delta.
  assert.equal(
    result.some(
      (event) =>
        event.type === "content_block_delta" &&
        event.delta?.type === "text_delta" &&
        typeof event.delta.text === "string" &&
        event.delta.text.includes("prior reasoning summary unavailable")
    ),
    false
  );
  // The stop event still fires despite the placeholder-only final content.
  const stop = result.find((event) => event.type === "message_delta");
  assert.ok(stop, "expected a message_delta stop event even with placeholder-only final content");
  assert.equal(stop.delta.stop_reason, "end_turn");
  assert.ok(
    result.some((event) => event.type === "message_stop"),
    "expected a message_stop event"
  );
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

test("OpenAI stream: two finish_reason chunks emit finish events exactly once", () => {
  // #2279: some OpenAI-compatible upstreams resend a terminal chunk that still
  // carries finish_reason (e.g. an empty-delta echo of the finish chunk). Without
  // a guard, the whole finish block (content_block_stop / message_delta /
  // message_stop) re-runs and duplicates those events downstream.
  const state = createState();
  const first = openaiToClaudeResponse(
    {
      id: "chatcmpl-4",
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
                function: { name: "read_file", arguments: '{"path":"/tmp/a"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
      usage: { prompt_tokens: 5, completion_tokens: 2, total_tokens: 7 },
    },
    state
  );
  // Duplicate terminal chunk: empty delta, same finish_reason.
  const second = openaiToClaudeResponse(
    {
      id: "chatcmpl-4",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
      usage: { prompt_tokens: 5, completion_tokens: 2, total_tokens: 7 },
    },
    state
  );
  const result = flatten([first, second]);

  assert.equal(result.filter((e) => e.type === "content_block_stop").length, 1);
  assert.equal(result.filter((e) => e.type === "message_delta").length, 1);
  assert.equal(result.filter((e) => e.type === "message_stop").length, 1);
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

test("OpenAI stream: XML <invoke> block in content becomes tool_use at finish", () => {
  const state = createState();
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-xml1",
      model: "dracarys",
      choices: [
        {
          index: 0,
          delta: {
            content:
              '<invoke name="Bash"><parameter name="command" string="true">ls -la</parameter></invoke>',
          },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-xml1",
      model: "dracarys",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 3, completion_tokens: 5, total_tokens: 8 },
    },
    state
  );
  const result = flatten([chunk1, chunk2]);

  // message_start → (no text block since all content was XML)
  assert.equal(result[0].type, "message_start");
  // At finish: tool_use content_block_start
  const toolStart = result.find((e) => e.type === "content_block_start" && e.content_block?.type === "tool_use");
  assert.ok(toolStart, "expected tool_use content_block_start");
  assert.equal(toolStart.content_block.name, "bash"); // normalized via REVERSE_MAP
  assert.deepEqual(toolStart.content_block.input, { command: "ls -la" });
  // tool_use content_block_stop
  const toolStop = result.find((e) => e.type === "content_block_stop");
  assert.ok(toolStop, "expected content_block_stop after tool_use");
  // message_delta with tool_use stop_reason
  const delta = result.find((e) => e.type === "message_delta");
  assert.ok(delta, "expected message_delta");
  assert.equal(delta.delta.stop_reason, "tool_use");
});

test("OpenAI stream: XML invoke block across two streaming chunks", () => {
  const state = createState();
  // Chunk 1: partial XML
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-xml2",
      model: "dracarys",
      choices: [
        {
          index: 0,
          delta: { content: '<invoke name="Read"><parameter name="file_path" string="true">/etc/' },
          finish_reason: null,
        },
      ],
    },
    state
  );
  // Chunk 2: completes the XML
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-xml2",
      model: "dracarys",
      choices: [
        {
          index: 0,
          delta: { content: 'hosts</parameter></invoke>' },
          finish_reason: null,
        },
      ],
    },
    state
  );
  // Chunk 3: finish
  const chunk3 = openaiToClaudeResponse(
    {
      id: "chatcmpl-xml2",
      model: "dracarys",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 3, completion_tokens: 5, total_tokens: 8 },
    },
    state
  );
  const result = flatten([chunk1, chunk2, chunk3]);

  // Buffer should be cleared after chunk2
  assert.equal(state._xmlInvokeBuffer, "", "buffer cleared after complete block");

  const toolStart = result.find((e) => e.type === "content_block_start" && e.content_block?.type === "tool_use");
  assert.ok(toolStart, "expected tool_use content_block_start");
  assert.equal(toolStart.content_block.name, "read");
  assert.deepEqual(toolStart.content_block.input, { file_path: "/etc/hosts" });
});

test("OpenAI stream: text before XML block is emitted as text content", () => {
  const state = createState();
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-xml3",
      model: "dracarys",
      choices: [
        {
          index: 0,
          delta: {
            content:
              'Checking...<invoke name="Bash"><parameter name="command">date</parameter></invoke>',
          },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-xml3",
      model: "dracarys",
      choices: [
        {
          index: 0,
          delta: { content: " Done." },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const chunk3 = openaiToClaudeResponse(
    {
      id: "chatcmpl-xml3",
      model: "dracarys",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 3, completion_tokens: 8, total_tokens: 11 },
    },
    state
  );
  const result = flatten([chunk1, chunk2, chunk3]);

  // "Checking..." should be emitted as text
  const textDeltas = result.filter((e) => e.type === "content_block_delta" && e.delta?.type === "text_delta");
  assert.ok(textDeltas.length > 0, "expected at least one text delta");
  assert.ok(textDeltas.some((d) => d.delta.text.includes("Checking...")), "text before XML preserved");
  assert.ok(textDeltas.some((d) => d.delta.text.includes("Done.")), "text after XML preserved");

  // Tool call should still be emitted
  const toolStart = result.find((e) => e.type === "content_block_start" && e.content_block?.type === "tool_use");
  assert.ok(toolStart, "expected tool_use content_block_start");
  assert.equal(toolStart.content_block.name, "bash");
  assert.deepEqual(toolStart.content_block.input, { command: "date" });
});

test("OpenAI stream: no XML in content behaves normally", () => {
  const state = createState();
  const chunk1 = openaiToClaudeResponse(
    {
      id: "chatcmpl-normal",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { content: "Hello world" }, finish_reason: null }],
    },
    state
  );
  const chunk2 = openaiToClaudeResponse(
    {
      id: "chatcmpl-normal",
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
    },
    state
  );
  const result = flatten([chunk1, chunk2]);

  assert.equal(result[1].type, "content_block_start");
  assert.equal(result[2].delta.text, "Hello world");
  assert.equal(result[3].type, "content_block_stop");
  assert.equal(result[4].type, "message_delta");
  assert.equal(result[4].delta.stop_reason, "end_turn");
});

test("OpenAI stream: null chunk is ignored", () => {
  assert.equal(openaiToClaudeResponse(null, createState()), null);
});
