import test from "node:test";
import assert from "node:assert/strict";

const { shouldAbortEmptyClaudeStream } =
  await import("../../open-sse/utils/streamClaudeEmptyBody.ts");

const complete = {
  hasError: false,
  hasContentBlock: false,
  hasMessageStart: true,
  hasMessageDelta: true,
  hasMessageStop: true,
};

test("a finished Claude stream with end_turn and no content block is a real empty answer", () => {
  assert.equal(shouldAbortEmptyClaudeStream({ ...complete, stopReason: "end_turn" }, true), false);
});

test("a finished Claude stream with stop_sequence and no content block is a real empty answer", () => {
  assert.equal(
    shouldAbortEmptyClaudeStream({ ...complete, stopReason: "stop_sequence" }, true),
    false
  );
});

test("content_filter with no content block still aborts", () => {
  assert.equal(
    shouldAbortEmptyClaudeStream({ ...complete, stopReason: "content_filter" }, true),
    true
  );
});

test("a complete lifecycle with no stop_reason still aborts", () => {
  assert.equal(shouldAbortEmptyClaudeStream({ ...complete, stopReason: null }, true), true);
});

test("a lifecycle that never reached message_stop still aborts", () => {
  assert.equal(
    shouldAbortEmptyClaudeStream(
      { ...complete, hasMessageStop: false, stopReason: "end_turn" },
      true
    ),
    true
  );
});

test("a zero-byte Claude stream still aborts even if a stop reason was guessed", () => {
  assert.equal(shouldAbortEmptyClaudeStream({ ...complete, stopReason: "end_turn" }, false), true);
});

test("message_delta stores stop_reason for the empty-stream decision", async () => {
  const { createClaudeEmptyResponseLifecycle, updateClaudeEmptyResponseLifecycle } =
    await import("../../open-sse/utils/stream.ts");
  const lifecycle = createClaudeEmptyResponseLifecycle();
  updateClaudeEmptyResponseLifecycle(lifecycle, {
    type: "message_delta",
    delta: { stop_reason: "end_turn" },
  });
  updateClaudeEmptyResponseLifecycle(lifecycle, { type: "message_stop" });
  assert.equal(lifecycle.stopReason, "end_turn");
  assert.equal(lifecycle.hasMessageStop, true);
  assert.equal(shouldAbortEmptyClaudeStream(lifecycle, true), false);
});
