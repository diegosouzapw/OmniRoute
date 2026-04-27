import test from "node:test";
import assert from "node:assert/strict";

const { parseSSEToOpenAIResponse, parseSSEToClaudeResponse, parseSSEToResponsesOutput } =
  await import("../../open-sse/handlers/sseParser.ts");

test("parseSSEToOpenAIResponse parses a single SSE event with a done marker", () => {
  const rawSSE = [
    'data: {"id":"chatcmpl_1","model":"gpt-4o-mini","choices":[{"index":0,"delta":{"content":"hello"},"finish_reason":"stop"}]}',
    "",
    "data: [DONE]",
    "",
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "fallback-model");

  assert.equal(parsed.id, "chatcmpl_1");
  assert.equal(parsed.model, "gpt-4o-mini");
  assert.equal(parsed.choices[0].message.content, "hello");
  assert.equal(parsed.choices[0].finish_reason, "stop");
});

test("parseSSEToOpenAIResponse concatenates content, reasoning, and usage from multiple events", () => {
  const rawSSE = [
    'data: {"id":"chatcmpl_2","choices":[{"index":0,"delta":{"reasoning_content":"think "}}]}',
    'data: {"id":"chatcmpl_2","choices":[{"index":0,"delta":{"content":"hel"}}]}',
    'data: {"id":"chatcmpl_2","choices":[{"index":0,"delta":{"content":"lo"},"finish_reason":"stop"}],"usage":{"prompt_tokens":5,"completion_tokens":2,"total_tokens":7}}',
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "fallback-model");

  assert.equal(parsed.choices[0].message.content, "hello");
  assert.equal(parsed.choices[0].message.reasoning_content, "think");
  assert.deepEqual(parsed.usage, {
    prompt_tokens: 5,
    completion_tokens: 2,
    total_tokens: 7,
  });
});

test("parseSSEToOpenAIResponse ignores malformed and non-data lines", () => {
  const rawSSE = [
    "event: message",
    "id: abc-1",
    "not-data: ignored",
    "data: not-json",
    'data: {"id":"chatcmpl_3","choices":[{"index":0,"delta":{"content":"ok"},"finish_reason":"stop"}]}',
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "fallback-model");

  assert.equal(parsed.id, "chatcmpl_3");
  assert.equal(parsed.choices[0].message.content, "ok");
});

test("parseSSEToOpenAIResponse preserves UTF-8 multibyte content", () => {
  const rawSSE = [
    'data: {"id":"chatcmpl_utf8","choices":[{"index":0,"delta":{"content":"Olá "}}]}',
    'data: {"id":"chatcmpl_utf8","choices":[{"index":0,"delta":{"content":"世界"},"finish_reason":"stop"}]}',
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "fallback-model");

  assert.equal(parsed.choices[0].message.content, "Olá 世界");
});

test("parseSSEToOpenAIResponse ignores Responses API SSE payloads", () => {
  const rawSSE = [
    'data: {"type":"response.created","response":{"id":"resp_1","model":"gpt-5.3-codex","status":"in_progress","output":[]}}',
    'data: {"type":"response.output_text.delta","output_index":0,"delta":"Brasilia"}',
    'data: {"type":"response.completed","response":{"id":"resp_1","object":"response","model":"gpt-5.3-codex","status":"completed","output":[{"type":"message","role":"assistant","content":[{"type":"output_text","text":"Brasilia"}]}]}}',
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "fallback-model");

  assert.equal(parsed, null);
});

test("parseSSEToClaudeResponse parses text, thinking, tool_use, and usage events", () => {
  const rawSSE = [
    "event: message_start",
    'data: {"type":"message_start","message":{"id":"msg_1","model":"claude-3-5-sonnet","role":"assistant","usage":{"input_tokens":10}}}',
    "",
    "event: content_block_start",
    'data: {"type":"content_block_start","index":0,"content_block":{"type":"thinking","thinking":"step 1","signature":"sig-1"}}',
    "",
    "event: content_block_delta",
    'data: {"type":"content_block_delta","index":1,"delta":{"text":"Hello"}}',
    "",
    "event: content_block_start",
    'data: {"type":"content_block_start","index":2,"content_block":{"type":"tool_use","id":"toolu_1","name":"lookup","input":{}}}',
    "",
    "event: content_block_delta",
    'data: {"type":"content_block_delta","index":2,"delta":{"type":"input_json_delta","partial_json":"{\\"q\\":\\"docs\\"}"}}',
    "",
    "event: message_delta",
    'data: {"type":"message_delta","delta":{"stop_reason":"tool_use","stop_sequence":"END"},"usage":{"output_tokens":4}}',
    "",
  ].join("\n");

  const parsed = parseSSEToClaudeResponse(rawSSE, "fallback-model");

  assert.equal(parsed.id, "msg_1");
  assert.equal(parsed.model, "claude-3-5-sonnet");
  assert.equal((parsed.content[0] as any).type, "thinking");
  assert.equal((parsed as any).content[0].thinking, "step 1");
  assert.equal((parsed as any).content[0].signature, "sig-1");
  (assert as any).equal((parsed.content[1] as any).text, "Hello");
  assert.equal((parsed.content[2] as any).type, "tool_use");
  (assert as any).deepEqual((parsed.content[2] as any).input, { q: "docs" });
  assert.equal(parsed.stop_reason, "tool_use");
  assert.equal(parsed.stop_sequence, "END");
  assert.deepEqual(parsed.usage, { input_tokens: 10, output_tokens: 4 });
});

test("parseSSEToClaudeResponse ignores malformed payloads and returns null when nothing valid remains", () => {
  const parsed = parseSSEToClaudeResponse(
    ["event: content_block_delta", "data: not-json", "", "data: [DONE]"].join("\n"),
    "fallback-model"
  );

  assert.equal(parsed, null);
});

test("parseSSEToClaudeResponse ignores Responses API SSE payloads", () => {
  const rawSSE = [
    "event: response.created",
    'data: {"type":"response.created","response":{"id":"resp_1","model":"gpt-5.3-codex","status":"in_progress","output":[]}}',
    "",
    "event: response.output_text.delta",
    'data: {"type":"response.output_text.delta","output_index":0,"delta":"Brasilia"}',
    "",
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToClaudeResponse(rawSSE, "fallback-model");

  assert.equal(parsed, null);
});

test("parseSSEToResponsesOutput prefers response.completed payloads when available", () => {
  const rawSSE = [
    'data: {"type":"response.created","response":{"id":"resp_1","model":"gpt-4.1","status":"in_progress","output":[]}}',
    'data: {"type":"response.completed","response":{"id":"resp_1","model":"gpt-4.1","status":"completed","output":[{"type":"message"}],"usage":{"input_tokens":3}}}',
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");

  assert.equal(parsed.id, "resp_1");
  assert.equal(parsed.status, "completed");
  assert.equal(parsed.output.length, 1);
  assert.deepEqual(parsed.usage, { input_tokens: 3 });
});

test("parseSSEToResponsesOutput falls back to the latest response object when completion is absent", () => {
  const rawSSE = [
    'data: {"type":"response.in_progress","response":{"id":"resp_2","model":"gpt-4.1","status":"in_progress","output":[],"metadata":{"source":"sse"}}}',
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");

  assert.equal(parsed.id, "resp_2");
  assert.equal(parsed.model, "gpt-4.1");
  assert.equal(parsed.status, "in_progress");
  assert.deepEqual(parsed.metadata, { source: "sse" });
});

test("parseSSEToResponsesOutput handles large payloads without truncation", () => {
  const largeText = "A".repeat(10_000);
  const rawSSE = `data: ${JSON.stringify({
    type: "response.completed",
    response: {
      id: "resp_big",
      object: "response",
      model: "gpt-4.1",
      status: "completed",
      output: [{ type: "message", content: [{ type: "output_text", text: largeText }] }],
    },
  })}`;

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");

  assert.equal(parsed.output[0].content[0].text.length, 10_000);
});

test("parseSSEToResponsesOutput treats response.cancelled as terminal and reconstructs output from deltas", () => {
  const rawSSE = [
    "event: response.created",
    'data: {"type":"response.created","response":{"id":"resp_cancelled","model":"gpt-5.3-codex","status":"in_progress","output":[]}}',
    "",
    "event: response.output_item.added",
    'data: {"type":"response.output_item.added","output_index":0,"item":{"id":"msg_1","type":"message","role":"assistant","content":[{"type":"output_text","text":""}]}}',
    "",
    "event: response.output_text.delta",
    'data: {"type":"response.output_text.delta","item_id":"msg_1","output_index":0,"content_index":0,"delta":"Hel"}',
    "",
    "event: response.output_text.delta",
    'data: {"type":"response.output_text.delta","item_id":"msg_1","output_index":0,"content_index":0,"delta":"lo"}',
    "",
    "event: response.cancelled",
    'data: {"type":"response.cancelled","response":{"id":"resp_cancelled","model":"gpt-5.3-codex","status":"cancelled","output":[],"usage":{"input_tokens":3}}}',
    "",
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");

  assert.equal(parsed.id, "resp_cancelled");
  assert.equal(parsed.status, "cancelled");
  assert.equal(parsed.output[0].type, "message");
  assert.equal(parsed.output[0].content[0].text, "Hello");
  assert.deepEqual(parsed.usage, { input_tokens: 3 });
});

test("parseSSEToResponsesOutput treats response.canceled as terminal and reconstructs message text without added item", () => {
  const rawSSE = [
    'data: {"type":"response.output_text.delta","output_index":0,"content_index":0,"delta":"Bye"}',
    'data: {"type":"response.canceled","response":{"id":"resp_canceled","model":"gpt-5.3-codex","output":[]}}',
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");

  assert.equal(parsed.id, "resp_canceled");
  assert.equal(parsed.status, "canceled");
  assert.equal(parsed.output[0].type, "message");
  assert.equal(parsed.output[0].content[0].text, "Bye");
});
