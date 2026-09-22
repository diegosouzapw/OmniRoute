import test from "node:test";
import assert from "node:assert/strict";

const { resolveLocalToolCallIndex } =
  await import("../../open-sse/translator/response/openai-responses/toolCallLocalIndex.ts");

// Pins the remap contract that fixed the 2026-09-02 output_index-gap incident: raw
// upstream tool_call indices (which need not start at 0 or be contiguous) map onto a
// local, contiguous, 0-based, first-seen sequence, idempotently.
test("resolveLocalToolCallIndex: contiguous 0-based in first-seen order, idempotent", () => {
  const state: Record<string, unknown> = {};
  assert.equal(resolveLocalToolCallIndex(state, 1), 0, "first seen -> 0 even if raw index is 1");
  assert.equal(resolveLocalToolCallIndex(state, 2), 1, "second seen -> 1");
  assert.equal(resolveLocalToolCallIndex(state, 1), 0, "same raw index is idempotent");
  assert.equal(resolveLocalToolCallIndex(state, 5), 2, "third distinct raw -> next local 2");
});

test("resolveLocalToolCallIndex: honours a seeded next and coerces numeric/string keys", () => {
  const state: Record<string, unknown> = { toolCallLocalIndexNext: 5 };
  assert.equal(resolveLocalToolCallIndex(state, "7"), 5, "seeded next is honoured");
  assert.equal(resolveLocalToolCallIndex(state, 7), 5, "'7' and 7 resolve to the same local");
});
