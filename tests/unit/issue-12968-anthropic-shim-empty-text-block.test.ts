import test from "node:test";
import assert from "node:assert/strict";
import { detectMalformedNonStream } from "../../open-sse/utils/diagnostics.ts";

// Exact upstream body captured in the issue (freeaiapikey.com probe response).
const upstreamBody = {
  content: [{ text: "", type: "text" }],
  id: "msg_4d5e123dda0d4eda8055cd21",
  model: "anthropic/claude-sonnet-5",
  role: "assistant",
  stop_reason: "max_tokens",
  stop_sequence: null,
  type: "message",
  usage: {
    cache_creation_input_tokens: 2623,
    cache_read_input_tokens: 0,
    input_tokens: 2234,
    output_tokens: 1,
  },
};

test("#12968 max_tokens probe with content:[{text:''}] must NOT be flagged empty_choices", () => {
  const reason = detectMalformedNonStream(upstreamBody);
  assert.equal(
    reason,
    null,
    `expected legitimate truncated-probe response to pass through, got reason=${reason}`
  );
});

test("#12968 control — content:[] + max_tokens already exempted (#9971)", () => {
  const reason = detectMalformedNonStream({ ...upstreamBody, content: [] });
  assert.equal(reason, null);
});

test("#12968 control — empty text block with end_turn stop_reason stays flagged", () => {
  const reason = detectMalformedNonStream({ ...upstreamBody, stop_reason: "end_turn" });
  assert.equal(reason, "empty_choices");
});
