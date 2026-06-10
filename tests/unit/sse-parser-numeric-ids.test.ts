import test from "node:test";
import assert from "node:assert/strict";

const { parseSSEToOpenAIResponse, parseSSEToResponsesOutput } =
  await import("../../open-sse/handlers/sseParser.ts");

test("parseSSEToOpenAIResponse coerces numeric top-level id to string", () => {
  const rawSSE = [
    'data: {"id":123,"model":"gpt-4o-mini","choices":[{"index":0,"delta":{"content":"hello"},"finish_reason":"stop"}]}',
    "",
    "data: [DONE]",
    "",
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "fallback-model");

  assert.equal(typeof parsed.id, "string");
  assert.equal(parsed.id, "123");
});

test("parseSSEToOpenAIResponse coerces numeric tool_call id to string", () => {
  const rawSSE = [
    'data: {"id":"chatcmpl_tc1","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"id":123,"function":{"name":"foo","arguments":"{}"}}]},"finish_reason":"tool_calls"}]}',
    "",
    "data: [DONE]",
    "",
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "fallback-model");

  assert.equal(typeof parsed.choices[0].message.tool_calls[0].id, "string");
  assert.equal(parsed.choices[0].message.tool_calls[0].id, "123");
});

test("parseSSEToResponsesOutput coerces numeric output item id to string", () => {
  const rawSSE = [
    'data: {"type":"response.completed","response":{"id":"resp_num","model":"gpt-4.1","status":"completed","output":[{"id":456,"type":"message","role":"assistant","content":[{"type":"output_text","text":"hi"}]}]}}',
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");

  assert.equal(typeof parsed.id, "string");
  assert.equal(parsed.id, "resp_num");
  assert.equal(typeof parsed.output[0].id, "string");
  assert.equal(parsed.output[0].id, "456");
});

test("parseSSEToResponsesOutput coerces numeric function call item id from incremental events", () => {
  const rawSSE = [
    'data: {"type":"response.created","response":{"id":"resp_fc","model":"gpt-4.1","status":"in_progress","output":[]}}',
    'data: {"type":"response.output_item.added","output_index":0,"item":{"id":789,"type":"function_call","status":"in_progress","name":"foo","arguments":""}}',
    'data: {"type":"response.function_call_arguments.delta","output_index":0,"delta":"{\\"key\\":\\"val\\"}"}',
    'data: {"type":"response.function_call_arguments.done","output_index":0,"arguments":"{\\"key\\":\\"val\\"}","status":"completed"}',
    'data: {"type":"response.completed","response":{"id":"resp_fc","model":"gpt-4.1","status":"completed","output":null}}',
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");

  assert.equal(typeof parsed.output[0].id, "string");
  assert.equal(parsed.output[0].id, "789");
});

test("parseSSEToResponsesOutput coerces numeric reasoning item id from incremental events", () => {
  const rawSSE = [
    'data: {"type":"response.created","response":{"id":"resp_rs","model":"gpt-4.1","status":"in_progress","output":[]}}',
    'data: {"type":"response.output_item.added","output_index":0,"item":{"id":101,"type":"reasoning","status":"in_progress","summary":[]}}',
    'data: {"type":"response.reasoning_summary_text.delta","output_index":0,"delta":"thinking step 1"}',
    'data: {"type":"response.reasoning_summary_text.done","output_index":0,"text":"thinking step 1"}',
    'data: {"type":"response.completed","response":{"id":"resp_rs","model":"gpt-4.1","status":"completed","output":null}}',
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");

  assert.equal(typeof parsed.output[0].id, "string");
  assert.equal(parsed.output[0].id, "101");
});

test("parseSSEToResponsesOutput coerces numeric function call call_id to string", () => {
  const rawSSE = [
    'data: {"type":"response.completed","response":{"id":"resp_call","model":"gpt-4.1","status":"completed","output":[{"id":789,"call_id":456,"type":"function_call","name":"foo","arguments":"{}"}]}}',
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");

  assert.equal(typeof parsed.output[0].id, "string");
  assert.equal(parsed.output[0].id, "789");
  assert.equal(typeof parsed.output[0].call_id, "string");
  assert.equal(parsed.output[0].call_id, "456");
});

test("parseSSEToResponsesOutput preserves numeric item_id from function call deltas", () => {
  const rawSSE = [
    'data: {"type":"response.created","response":{"id":"resp_item","model":"gpt-4.1","status":"in_progress","output":[]}}',
    'data: {"type":"response.function_call_arguments.delta","output_index":0,"item_id":321,"delta":"{\\"a\\":"}',
    'data: {"type":"response.function_call_arguments.done","output_index":0,"item_id":321,"arguments":"{\\"a\\":1}","status":"completed"}',
    'data: {"type":"response.completed","response":{"id":"resp_item","model":"gpt-4.1","status":"completed","output":null}}',
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");

  assert.equal(typeof parsed.output[0].id, "string");
  assert.equal(parsed.output[0].id, "321");
});

test("parseSSEToOpenAIResponse merges tool_call with id 0 and no index", () => {
  const rawSSE = [
    'data: {"id":"chatcmpl_zero","choices":[{"index":0,"delta":{"tool_calls":[{"id":0,"function":{"name":"foo","arguments":"{\\"a\\":"}}]},"finish_reason":null}]}',
    'data: {"id":"chatcmpl_zero","choices":[{"index":0,"delta":{"tool_calls":[{"id":0,"function":{"arguments":"1}"}}]},"finish_reason":"tool_calls"}]}',
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "fallback-model");

  assert.equal(parsed.choices[0].message.tool_calls.length, 1);
  assert.equal(typeof parsed.choices[0].message.tool_calls[0].id, "string");
  assert.equal(parsed.choices[0].message.tool_calls[0].id, "0");
  assert.equal(parsed.choices[0].message.tool_calls[0].function.name, "foo");
  assert.equal(parsed.choices[0].message.tool_calls[0].function.arguments, '{"a":1}');
});

test("parseSSEToOpenAIResponse handles tool_call with negative numeric id", () => {
  const rawSSE = [
    'data: {"id":"chatcmpl_neg","choices":[{"index":0,"delta":{"tool_calls":[{"id":-1,"index":0,"function":{"name":"bar","arguments":"{}"}}]},"finish_reason":"tool_calls"}]}',
    "",
    "data: [DONE]",
    "",
  ].join("\n");

  const parsed = parseSSEToOpenAIResponse(rawSSE, "fallback-model");

  assert.equal(typeof parsed.choices[0].message.tool_calls[0].id, "string");
  assert.equal(parsed.choices[0].message.tool_calls[0].id, "-1");
});

test("parseSSEToResponsesOutput coerces numeric call_id and item_id together", () => {
  const rawSSE = [
    'data: {"type":"response.created","response":{"id":"resp_comb","model":"gpt-4.1","status":"in_progress","output":[]}}',
    'data: {"type":"response.output_item.added","output_index":0,"item":{"id":111,"call_id":222,"type":"function_call","status":"in_progress","name":"both","arguments":""}}',
    'data: {"type":"response.function_call_arguments.delta","output_index":0,"item_id":111,"delta":"{\\"x\\":"}',
    'data: {"type":"response.function_call_arguments.done","output_index":0,"item_id":111,"arguments":"{\\"x\\":1}","status":"completed"}',
    'data: {"type":"response.completed","response":{"id":"resp_comb","model":"gpt-4.1","status":"completed","output":null}}',
    "data: [DONE]",
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");

  assert.equal(typeof parsed.output[0].id, "string");
  assert.equal(parsed.output[0].id, "111");
  assert.equal(typeof parsed.output[0].call_id, "string");
  assert.equal(parsed.output[0].call_id, "222");
});
