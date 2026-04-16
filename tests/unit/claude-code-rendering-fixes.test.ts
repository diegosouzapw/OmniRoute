import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { createSSETransformStreamWithLogger } = await import("../../open-sse/utils/stream.ts");

test("Responses->Chat: output_item.done emits arguments when no delta chunks were sent", () => {
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallId: "call_abc",
    currentToolCallArgsBuffer: "",
  };

  const chunk = {
    type: "response.output_item.done",
    item: {
      type: "function_call",
      call_id: "call_abc",
      name: "search_tasks",
      status: "completed",
      arguments: '{"query":"select:TaskCreate,TaskUpdate","max_results":10}',
    },
  };

  const result = openaiResponsesToOpenAIResponse(chunk, state);

  assert.ok(result);
  assert.equal(
    result.choices[0].delta.tool_calls[0].function.arguments,
    '{"query":"select:TaskCreate,TaskUpdate","max_results":10}'
  );
  assert.equal(state.toolCallIndex, 1);
});

test("Responses->Chat: output_item.done does not re-emit arguments already streamed via deltas", () => {
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallId: "call_abc",
    currentToolCallArgsBuffer: '{"query":"search"}',
  };

  const chunk = {
    type: "response.output_item.done",
    item: {
      type: "function_call",
      call_id: "call_abc",
      name: "search",
      status: "completed",
      arguments: '{"query":"search"}',
    },
  };

  const result = openaiResponsesToOpenAIResponse(chunk, state);

  assert.equal(result, null);
  assert.equal(state.toolCallIndex, 1);
});

test("Responses->Chat: empty-name tool call is deferred until done provides a valid name", () => {
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallArgsBuffer: "",
    currentToolCallDeferred: false,
  };

  const added = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_deferred", name: "   " },
    },
    state
  );
  assert.equal(added, null);

  const delta = openaiResponsesToOpenAIResponse(
    {
      type: "response.function_call_arguments.delta",
      delta: '{"query":"deferred"}',
    },
    state
  );
  assert.equal(delta, null);

  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_deferred",
        name: "search_tasks",
        arguments: '{"query":"deferred"}',
      },
    },
    state
  );

  assert.ok(done);
  assert.equal(done.choices[0].delta.tool_calls[0].function.name, "search_tasks");
  assert.equal(done.choices[0].delta.tool_calls[0].function.arguments, '{"query":"deferred"}');
});

test("Responses->Chat: empty-name tool call is dropped when done still has no valid name", () => {
  const state = {
    started: true,
    chatId: "chatcmpl-test",
    created: 1234567890,
    toolCallIndex: 0,
    finishReasonSent: false,
    currentToolCallArgsBuffer: "",
    currentToolCallDeferred: false,
  };

  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_empty", name: "" },
    },
    state
  );

  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_empty",
        name: " ",
        arguments: '{"ignored":true}',
      },
    },
    state
  );

  assert.equal(done, null);
  assert.equal(state.toolCallIndex, 0);
});

test("Claude->Responses: {event,data} items bypass sanitization in translate mode", async () => {
  // Regression test: when translating Claude-format (GLM) to Responses API for Codex CLI,
  // the sanitizer was stripping {event,data} items to {"object":"chat.completion.chunk"},
  // losing all content and the critical response.completed event.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  // Create stream translating claude → openai-responses (same path as GLM via Codex CLI)
  const stream = createSSETransformStreamWithLogger(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "glm",
    null,
    null,
    "glm-5.1",
    "conn-test",
    { messages: [{ role: "user", content: "hi" }] },
    null,
    null
  );

  const writer = stream.writable.getWriter();
  // Simulate Claude-format SSE from GLM
  await writer.write(
    encoder.encode(
      'event: message_start\ndata: {"type":"message_start","message":{"id":"msg_test","type":"message","role":"assistant","model":"glm-5.1","content":[],"stop_reason":null,"usage":{"input_tokens":10,"output_tokens":0}}}\n\n'
    )
  );
  await writer.write(
    encoder.encode(
      'event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}\n\n'
    )
  );
  await writer.write(
    encoder.encode(
      'event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"hello"}}\n\n'
    )
  );
  await writer.write(
    encoder.encode(
      'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"},"usage":{"output_tokens":5}}\n\n'
    )
  );
  await writer.write(encoder.encode('event: message_stop\ndata: {"type":"message_stop"}\n\n'));
  await writer.close();

  const reader = stream.readable.getReader();
  let output = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    output += decoder.decode(value, { stream: true });
  }
  output += decoder.decode();

  // Must emit Responses API events (not sanitized chat.completion.chunk objects)
  assert.match(output, /event: response\.created/);
  assert.match(output, /event: response\.output_text\.delta/);
  assert.match(output, /event: response\.completed/);
  assert.match(output, /"delta":"hello"/);
  assert.match(output, /"status":"completed"/);

  // Must NOT contain sanitized empty chunks
  assert.doesNotMatch(output, /data: \{"object":"chat\.completion\.chunk"\}\n\n/);
});

test("Responses->Claude: translated Claude SSE is not sanitized into empty OpenAI chunks", async () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const stream = createSSETransformStreamWithLogger(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "codex",
    null,
    null,
    "gpt-5.4",
    "conn-test",
    { messages: [{ role: "user", content: "hi" }] },
    null,
    null
  );

  const writer = stream.writable.getWriter();
  await writer.write(
    encoder.encode('data: {"type":"response.output_text.delta","delta":"hello"}\n\n')
  );
  await writer.write(
    encoder.encode(
      'data: {"type":"response.completed","response":{"usage":{"input_tokens":12,"output_tokens":3}}}\n\n'
    )
  );
  await writer.close();

  const reader = stream.readable.getReader();
  let output = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    output += decoder.decode(value, { stream: true });
  }
  output += decoder.decode();

  assert.match(output, /event: message_start/);
  assert.match(output, /event: content_block_start/);
  assert.match(output, /event: content_block_delta/);
  assert.match(output, /event: message_delta/);
  assert.match(output, /event: message_stop/);
  assert.doesNotMatch(output, /data: \{"object":"chat\.completion\.chunk"\}\n\n/);
});
