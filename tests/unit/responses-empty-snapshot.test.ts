import test from "node:test";
import assert from "node:assert/strict";
import { parseSSEToResponsesOutput } from "../../open-sse/handlers/sseParser.ts";

const message = (text: string, id = "m") => ({
  id,
  type: "message",
  role: "assistant",
  status: "completed",
  content: [{ type: "output_text", text }],
});
const delta = {
  type: "response.output_text.delta",
  output_index: 0,
  item_id: "m",
  content_index: 0,
  delta: "Synthetic answer",
};
const added = { type: "response.output_item.added", output_index: 0, item: message("") };
function parse(output: unknown[], intermediate: unknown[] = []) {
  const events = [
    added,
    delta,
    ...intermediate,
    { type: "response.completed", response: { object: "response", status: "completed", output } },
  ];
  return parseSSEToResponsesOutput(
    events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join(""),
    "synthetic"
  );
}

test("empty terminal message cannot erase received text", () => {
  const result = parse([message("")]);
  assert.equal(result.output[0].content[0].text, "Synthetic answer");
  assert.equal(result.output[0].status, "completed");
});

test("empty item.done followed by empty completion cannot erase text", () => {
  const result = parse(
    [message("")],
    [{ type: "response.output_item.done", output_index: 0, item: message("") }]
  );
  assert.equal(result.output[0].content[0].text, "Synthetic answer");
});

test("a nonempty terminal snapshot remains authoritative", () => {
  assert.equal(parse([message("Final answer")]).output[0].content[0].text, "Final answer");
});

test("never replace a terminal refusal with earlier text", () => {
  const refusal = { ...message(""), content: [{ type: "refusal", refusal: "Cannot assist" }] };
  assert.deepEqual(parse([refusal]).output[0].content, refusal.content);
});

test("recovery preserves terminal tools and does not cross explicit message identities", () => {
  const tool = { type: "function_call", id: "f", call_id: "c", name: "synthetic", arguments: "{}" };
  const result = parse([message(""), tool]);
  assert.equal(result.output[0].content[0].text, "Synthetic answer");
  assert.deepEqual(result.output[1], tool);
  assert.equal(parse([message("", "other")]).output[0].content[0].text, "");
});

test("invalid sparse content indices cannot inflate reconstructed message arrays", () => {
  for (const content_index of [-1, 10000]) {
    const result = parse([message("")], [{ ...delta, content_index, delta: "must be ignored" }]);
    assert.equal(result.output[0].content.length, 1);
    assert.equal(result.output[0].content[0].text, "Synthetic answer");
  }
});
