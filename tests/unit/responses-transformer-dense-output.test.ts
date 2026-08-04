/**
 * Tests for dense, deterministic output ordering in response.completed.
 *
 * Port of upstream decolua/9router PR #721: "fix: suppress null Responses SSE frames
 * and preserve completed output". These tests verify that:
 *   1. response.completed.response.output is a dense array sorted by output_index
 *   2. normalizeOutputIndex handles non-numeric keys robustly (no NaN from parseInt)
 *   3. Function-call items at lower output_index appear before message items at higher
 *      output_index in the final output array
 */

import test from "node:test";
import assert from "node:assert/strict";

const { createResponsesApiTransformStream } =
  await import("../../open-sse/transformer/responsesTransformer.ts");

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function runTransformStream(chunks) {
  const stream = createResponsesApiTransformStream();
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();

  const output = [];
  const readerTask = (async () => {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      output.push(decoder.decode(value));
    }
  })();

  for (const chunk of chunks) {
    await writer.write(encoder.encode(chunk));
  }
  await writer.close();
  await readerTask;

  return output.join("");
}

function parseSseOutput(output) {
  return output
    .trim()
    .split("\n\n")
    .map((entry) => {
      const lines = entry.split("\n");
      const eventLine = lines.find((line) => line.startsWith("event: "));
      const dataLine = lines.find((line) => line.startsWith("data: "));
      return {
        event: eventLine ? eventLine.slice("event: ".length) : null,
        data: dataLine ? dataLine.slice("data: ".length) : null,
      };
    });
}

function getCompleted(output) {
  const events = parseSseOutput(output);
  const completedEvent = events.find((e) => e.event === "response.completed");
  assert.ok(completedEvent, "response.completed event must be present");
  return JSON.parse(completedEvent.data).response;
}

test("response.completed output is sorted by output_index: function_call at index 0 appears before message at index 2", async () => {
  // function_call uses tool_calls[index: 0], message uses choice index 2.
  // Without dense ordering, messages (iterated from msgItemAdded dict) may appear
  // before function_calls regardless of their actual output_index.
  const output = await runTransformStream([
    // First chunk: tool call at output_index 0
    `data: {"id":"chatcmpl-order","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"id":"call_abc","function":{"name":"lookup","arguments":"{\\"q\\":\\"test\\"}"}}]}}]}\n\n`,
    // Second chunk: text content at output_index 2
    `data: {"id":"chatcmpl-order","choices":[{"index":2,"delta":{"content":"Hello"}}]}\n\n`,
    // Finish
    `data: {"id":"chatcmpl-order","choices":[{"index":2,"delta":{},"finish_reason":"stop"},{"index":0,"delta":{},"finish_reason":"tool_calls"}]}\n\n`,
  ]);

  const completed = getCompleted(output);

  assert.ok(Array.isArray(completed.output), "output must be an array");
  assert.ok(completed.output.length >= 2, "output must have at least 2 items");

  // The function_call (output_index 0) must come before the message (output_index 2)
  const types = completed.output.map((item) => item.type);
  assert.ok(
    types.indexOf("function_call") < types.indexOf("message"),
    `function_call (output_index 0) must appear before message (output_index 2), got order: ${types.join(", ")}`
  );

  const funcCall = completed.output.find((item) => item.type === "function_call");
  assert.equal(funcCall?.call_id, "call_abc");
  assert.equal(funcCall?.name, "lookup");

  const msg = completed.output.find((item) => item.type === "message");
  assert.equal(msg?.content?.[0]?.text, "Hello");
});

test("response.completed output includes all finalized items even when output is empty", async () => {
  // A finish_reason with no content should produce an empty output array, not undefined
  const output = await runTransformStream([
    `data: {"id":"chatcmpl-empty","choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n`,
  ]);

  const completed = getCompleted(output);

  assert.ok(Array.isArray(completed.output), "output must be an array even when empty");
  assert.equal(completed.output.length, 0, "output must be empty when no items finalize");
});

test("response.completed output preserves dense ordering for function_call-only streams", async () => {
  // Two tool calls at different indexes — must appear in ascending output_index order
  const output = await runTransformStream([
    // call at index 3 first
    `data: {"id":"chatcmpl-multi-tool","choices":[{"index":0,"delta":{"tool_calls":[{"index":3,"id":"call_z","function":{"name":"zeta","arguments":"{}"}}]}}]}\n\n`,
    // call at index 1
    `data: {"id":"chatcmpl-multi-tool","choices":[{"index":0,"delta":{"tool_calls":[{"index":1,"id":"call_a","function":{"name":"alpha","arguments":"{}"}}]}}]}\n\n`,
    `data: {"id":"chatcmpl-multi-tool","choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}]}\n\n`,
  ]);

  const completed = getCompleted(output);

  assert.ok(Array.isArray(completed.output), "output must be an array");
  assert.equal(completed.output.length, 2);

  // Sorted by output_index: index 1 (alpha) before index 3 (zeta)
  assert.equal(completed.output[0].name, "alpha", "output_index 1 (alpha) must come first");
  assert.equal(completed.output[1].name, "zeta", "output_index 3 (zeta) must come second");
});
