import test from "node:test";
import assert from "node:assert/strict";
import { routingFinishReason } from "../../open-sse/handlers/chatCore/routingFinishReason.ts";

test("routing finish reasons preserve chat and Responses shapes", () => {
  assert.equal(routingFinishReason({ choices: [{ finish_reason: "stop" }] }), "stop");
  assert.equal(routingFinishReason({ output: [null, {}, { finish_reason: "length" }] }), "length");
  assert.equal(
    routingFinishReason({
      choices: [{ finish_reason: "tool_calls" }],
      output: [{ finish_reason: "stop" }],
    }),
    "tool_calls"
  );
});

test("unknown routing response shapes remain null", () => {
  for (const body of [
    null,
    undefined,
    false,
    "stop",
    12,
    {},
    { choices: [] },
    { choices: [null] },
    { choices: [{ finish_reason: 42 }] },
    { output: [null, 3, { finish_reason: false }] },
  ]) {
    assert.equal(routingFinishReason(body), null);
  }
});

test("missing chat finish reason falls back to Responses output", () => {
  assert.equal(routingFinishReason({ choices: [{}], output: [{ finish_reason: "stop" }] }), "stop");
});
