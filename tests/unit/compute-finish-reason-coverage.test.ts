import test from "node:test";
import assert from "node:assert/strict";

const { computeFinishReason } =
  await import("../../open-sse/translator/response/openai-responses/synthesizeCompletedToolCalls.ts");

// Pins the finish_reason contract: "tool_calls" iff the turn emitted at least one tool
// call (toolCallIndex > 0) OR a tool call is still open (currentToolCallId sticky),
// otherwise "stop". The currentToolCallId OR-branch is the one that keeps a mid-stream
// tool call from being reported as a plain stop.
test("computeFinishReason: stop when no tool calls", () => {
  assert.equal(computeFinishReason({}), "stop");
  assert.equal(computeFinishReason({ toolCallIndex: 0 }), "stop");
});

test("computeFinishReason: tool_calls on index > 0 or a sticky open call id", () => {
  assert.equal(computeFinishReason({ toolCallIndex: 1 }), "tool_calls");
  assert.equal(computeFinishReason({ currentToolCallId: "call_1" }), "tool_calls");
  assert.equal(
    computeFinishReason({ toolCallIndex: 0, currentToolCallId: "call_1" }),
    "tool_calls"
  );
});
