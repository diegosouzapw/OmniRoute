import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

function translateArguments(args: unknown) {
  return openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [
        { role: "user", content: "List my teams" },
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_list_teams",
              type: "function",
              function: { name: "list_teams", arguments: args },
            },
          ],
        },
      ],
    },
    false
  ).messages[1].content[0];
}

for (const [label, args] of [
  ["empty string", ""],
  ["JSON null", "null"],
  ["missing arguments", undefined],
  ["JSON array", "[]"],
  ["JSON number", "5"],
  ["JSON boolean", "true"],
  ["JSON string", '"text"'],
] as const) {
  test(`normalizes ${label} tool arguments to an empty object`, () => {
    assert.deepEqual(translateArguments(args).input, {});
  });
}

test("preserves empty and valid object tool arguments", () => {
  assert.deepEqual(translateArguments("{}").input, {});
  assert.deepEqual(translateArguments('{"limit":5}').input, { limit: 5 });
});
