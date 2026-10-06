/**
 * Regression test for a tool call landing on the same `output_index` as a
 * preceding reasoning item in the Responses API stream.
 *
 * `emitToolCallAdded`/`closeToolCall` in responsesTransformer.ts used the
 * provider's raw Chat Completions `tool_calls[].index` directly as the
 * Responses API `output_index`. That index is scoped only to the tool_calls
 * array and legitimately restarts at 0 for the first tool call — but by the
 * time a tool call arrives, a reasoning item (and/or a text message) may
 * already have claimed output_index 0 (and 1). A client that tracks response
 * items by output_index (as the Responses API spec expects) then sees the
 * tool call's added/delta/done events land on an index it already marked
 * complete, and silently drops the tool call — producing an "incomplete
 * turn" that never dispatches the tool.
 *
 * Reported live: OpenClaw on combo `default` -> opencode-zen/big-pickle,
 * a reasoning block immediately followed by a function call in the same
 * turn (no text message in between).
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

test("tool call immediately after reasoning must not collide on output_index", async () => {
  const output = await runTransformStream([
    // Reasoning content — claims output_index 0.
    `data: {"id":"chatcmpl-collide","choices":[{"index":0,"delta":{"reasoning_content":"thinking..."}}]}\n\n`,
    // A tool call starts. The provider scopes tool_calls[].index to 0 for the
    // first (and only) call here, same as reasoning's own output_index.
    `data: {"id":"chatcmpl-collide","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"id":"call_1","function":{"name":"run","arguments":""}}]}}]}\n\n`,
    `data: {"id":"chatcmpl-collide","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"function":{"arguments":"{\\"cmd\\":\\"ls\\"}"}}]}}]}\n\n`,
    `data: {"id":"chatcmpl-collide","choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}]}\n\n`,
  ]);

  const events = parseSseOutput(output);

  const reasoningAdded = events.find(
    (e) => e.event === "response.output_item.added" && JSON.parse(e.data).item.type === "reasoning"
  );
  const toolCallAdded = events.find(
    (e) =>
      e.event === "response.output_item.added" && JSON.parse(e.data).item.type === "function_call"
  );

  assert.ok(reasoningAdded, "reasoning output_item.added must be emitted");
  assert.ok(toolCallAdded, "function_call output_item.added must be emitted");

  const reasoningIndex = JSON.parse(reasoningAdded.data).output_index;
  const toolCallIndex = JSON.parse(toolCallAdded.data).output_index;

  assert.notEqual(
    toolCallIndex,
    reasoningIndex,
    `function_call output_index (${toolCallIndex}) must not collide with reasoning's output_index (${reasoningIndex})`
  );

  // All function_call-related events for this call must share one consistent
  // output_index across added/delta/done — a client tracking by output_index
  // must be able to follow the whole lifecycle at a single index.
  const funcCallEvents = events.filter((e) => {
    if (
      e.event !== "response.function_call_arguments.delta" &&
      e.event !== "response.function_call_arguments.done" &&
      e.event !== "response.output_item.done"
    ) {
      return false;
    }
    if (!e.data) return false;
    const parsed = JSON.parse(e.data);
    return e.event !== "response.output_item.done" || parsed.item?.type === "function_call";
  });
  assert.ok(funcCallEvents.length > 0, "expected function_call lifecycle events");
  for (const e of funcCallEvents) {
    assert.equal(
      JSON.parse(e.data).output_index,
      toolCallIndex,
      `event ${e.event} must use the same output_index as the tool call's added event`
    );
  }

  // response.completed output must contain both items at distinct indices.
  const completed = JSON.parse(events.find((e) => e.event === "response.completed").data).response;
  const reasoningItem = completed.output.find((item) => item.type === "reasoning");
  const funcItem = completed.output.find((item) => item.type === "function_call");
  assert.ok(reasoningItem, "completed output must include the reasoning item");
  assert.ok(funcItem, "completed output must include the function_call item");
  assert.equal(funcItem.call_id, "call_1");
  assert.equal(funcItem.arguments, '{"cmd":"ls"}');
});

test("multiple tool calls after reasoning use sequential output_index values, none colliding with reasoning", async () => {
  const output = await runTransformStream([
    `data: {"id":"chatcmpl-multi","choices":[{"index":0,"delta":{"reasoning_content":"planning"}}]}\n\n`,
    `data: {"id":"chatcmpl-multi","choices":[{"index":0,"delta":{"tool_calls":[{"index":0,"id":"call_a","function":{"name":"first","arguments":"{}"}}]}}]}\n\n`,
    `data: {"id":"chatcmpl-multi","choices":[{"index":0,"delta":{"tool_calls":[{"index":1,"id":"call_b","function":{"name":"second","arguments":"{}"}}]}}]}\n\n`,
    `data: {"id":"chatcmpl-multi","choices":[{"index":0,"delta":{},"finish_reason":"tool_calls"}]}\n\n`,
  ]);

  const events = parseSseOutput(output);
  const addedEvents = events.filter((e) => e.event === "response.output_item.added");
  const indexByType = addedEvents.map((e) => {
    const parsed = JSON.parse(e.data);
    return { type: parsed.item.type, output_index: parsed.output_index };
  });

  const reasoningIdx = indexByType.find((i) => i.type === "reasoning").output_index;
  const funcIndices = indexByType.filter((i) => i.type === "function_call").map((i) => i.output_index);

  assert.equal(funcIndices.length, 2);
  assert.ok(new Set(funcIndices).size === 2, "the two tool calls must not share an output_index");
  for (const fi of funcIndices) {
    assert.notEqual(fi, reasoningIdx, "no tool call may collide with the reasoning output_index");
  }
});
