import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

test("Responses -> Chat preserves role-based assistant tool_calls and tool results", () => {
  const result = openaiResponsesToOpenAIRequest(
    "deepseek-v4-flash",
    {
      model: "deepseek-v4-flash",
      input: [
        { role: "user", content: "Run pwd" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "exec_command", arguments: '{"cmd":"pwd"}' },
            },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "/tmp" },
      ],
    },
    false,
    { provider: "deepseek" }
  ) as { messages: Array<Record<string, unknown>> };

  assert.deepEqual(result.messages[1].tool_calls, [
    {
      id: "call_1",
      type: "function",
      function: { name: "exec_command", arguments: '{"cmd":"pwd"}' },
    },
  ]);
  assert.deepEqual(result.messages[2], {
    role: "tool",
    tool_call_id: "call_1",
    content: "/tmp",
  });
});

test("Responses -> Chat drops role-based tool_calls with empty name or id", () => {
  const result = openaiResponsesToOpenAIRequest(
    "deepseek-v4-flash",
    {
      model: "deepseek-v4-flash",
      input: [
        { role: "user", content: "Run" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_nameless", type: "function", function: { name: "", arguments: "{}" } },
            { id: "", type: "function", function: { name: "exec_command", arguments: "{}" } },
          ],
        },
      ],
    },
    false,
    { provider: "deepseek" }
  ) as { messages: Array<Record<string, unknown>> };

  assert.equal(result.messages[1].tool_calls, undefined);
});
