import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest, openaiToOpenAIResponsesRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

test("Responses -> Chat: local_shell does not throw", () => {
  assert.doesNotThrow(() =>
    openaiResponsesToOpenAIRequest(
      "gpt-4o",
      {
        input: [{ role: "user", content: [{ type: "input_text", text: "pwd" }] }],
        tools: [{ type: "local_shell" }],
      },
      false,
      null
    )
  );
});

test("Responses -> Chat: local_shell maps to a shell function tool", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "pwd" }] }],
      tools: [{ type: "local_shell" }],
    },
    false,
    null
  ) as Record<string, unknown>;

  const tools = result.tools as any[];
  assert.ok(Array.isArray(tools), "tools array must be present");
  assert.equal(tools.length, 1, "local_shell must be represented as one function tool");
  assert.equal(tools[0].type, "function");
  assert.equal(tools[0].function.name, "shell");
  assert.equal(tools[0].function.parameters.type, "object");
  assert.deepEqual(tools[0].function.parameters.required, ["command"]);
});

test("Responses -> Chat: local_shell tool_choice maps to shell function choice", () => {
  const result = openaiResponsesToOpenAIRequest(
    "gpt-4o",
    {
      input: [{ role: "user", content: [{ type: "input_text", text: "pwd" }] }],
      tools: [{ type: "local_shell" }],
      tool_choice: { type: "local_shell" },
    },
    false,
    null
  ) as Record<string, unknown>;

  assert.deepEqual(result.tool_choice, { type: "function", function: { name: "shell" } });
});

test("Chat -> Responses: shell function stays caller-side and does not leak local_shell", () => {
  const result = openaiToOpenAIResponsesRequest(
    "gpt-4o",
    {
      messages: [{ role: "user", content: "pwd" }],
      tools: [
        {
          type: "function",
          function: {
            name: "shell",
            description: "Run a shell command",
            parameters: { type: "object" },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "shell" } },
    },
    false,
    null
  ) as Record<string, unknown>;

  assert.equal((result.tools as any[])[0].type, "function");
  assert.equal((result.tools as any[])[0].name, "shell");
  assert.equal((result.tools as any[])[0].description, "Run a shell command");
  assert.deepEqual((result.tools as any[])[0].parameters, { type: "object" });
  assert.deepEqual(result.tool_choice, { type: "function", name: "shell" });
});
