import test from "node:test";
import assert from "node:assert/strict";

const { enforceToolResultAdjacency } =
  await import("../../open-sse/translator/request/openai-to-claude/toolResultAdjacency.ts");

// Pins the ordering-repair contract: a tool_result that arrives in a later user turn
// (after intervening user text, as OpenAI-compatible clients send it) is moved to sit
// immediately after the assistant turn holding the matching tool_use.
test("enforceToolResultAdjacency: moves a tool_result adjacent to its tool_use turn", () => {
  const out = enforceToolResultAdjacency([
    { role: "assistant", content: [{ type: "tool_use", id: "A", name: "f", input: {} }] },
    { role: "user", content: [{ type: "text", text: "wait" }] },
    { role: "user", content: [{ type: "tool_result", tool_use_id: "A", content: "ok" }] },
  ]);
  assert.equal(out.length, 3);
  assert.equal(out[0].role, "assistant");
  assert.equal(out[1].content[0].type, "tool_result");
  assert.equal(out[1].content[0].tool_use_id, "A");
  assert.equal(out[2].content[0].text, "wait");
});

// An unmatched tool_result (no assistant tool_use with that id) is preserved as text,
// never silently dropped, so the Claude-format pass still sees the content.
test("enforceToolResultAdjacency: converts an unmatched tool_result to unpaired text", () => {
  const out = enforceToolResultAdjacency([
    { role: "user", content: [{ type: "tool_result", tool_use_id: "ghost", content: "x" }] },
  ]);
  assert.equal(out.length, 1);
  assert.equal(out[0].content[0].type, "text");
  assert.ok(String(out[0].content[0].text).includes("[Unpaired tool result ghost]"));
});
