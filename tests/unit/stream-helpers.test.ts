import test from "node:test";
import assert from "node:assert/strict";

const { toStreamingToolCallDelta, toResponsesFunctionCallItem } =
  await import("../../open-sse/utils/stream.ts");

type StreamingToolCallInput = Parameters<typeof toStreamingToolCallDelta>[0];
type ResponsesToolCallInput = Parameters<typeof toResponsesFunctionCallItem>[0];

function streamingToolCall(id: unknown): StreamingToolCallInput {
  return {
    id,
    index: 0,
    type: "function",
    function: { name: "foo", arguments: "{}" },
  } as unknown as StreamingToolCallInput;
}

function responsesToolCall(id: unknown, index = 0): ResponsesToolCallInput {
  return {
    id,
    index,
    type: "function",
    function: { name: "bar", arguments: "{}" },
  } as unknown as ResponsesToolCallInput;
}

test("toStreamingToolCallDelta coerces numeric id to string", () => {
  const result = toStreamingToolCallDelta(streamingToolCall(42));

  assert.equal(typeof result.id, "string");
  assert.equal(result.id, "42");
});

test("toStreamingToolCallDelta passes null id as null", () => {
  const result = toStreamingToolCallDelta(streamingToolCall(null));

  assert.equal(result.id, null);
});

test("toStreamingToolCallDelta passes string id unchanged", () => {
  const result = toStreamingToolCallDelta(streamingToolCall("call_abc"));

  assert.equal(result.id, "call_abc");
});

test("toResponsesFunctionCallItem coerces numeric id to string", () => {
  const result = toResponsesFunctionCallItem(responsesToolCall(99));

  assert.equal(typeof result.id, "string");
  assert.equal(result.id, "99");
  assert.equal(typeof result.call_id, "string");
  assert.equal(result.call_id, "99");
});

test("toResponsesFunctionCallItem falls back to fc_ pattern for null id", () => {
  const result = toResponsesFunctionCallItem(responsesToolCall(null, 5));

  assert.equal(result.id, "fc_5");
  assert.equal(result.call_id, "call_5");
});

test("toResponsesFunctionCallItem passes string id unchanged", () => {
  const result = toResponsesFunctionCallItem(responsesToolCall("call_xyz"));

  assert.equal(result.id, "call_xyz");
  assert.equal(result.call_id, "call_xyz");
});
