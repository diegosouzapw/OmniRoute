import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { serializeAnthropicForDevin } from "../../open-sse/executors/devin-agentic/serializer.ts";

/**
 * #12721 safety net: historical tool_use blocks whose name differs from the
 * declared tool only by case (a client echoing back a Claude Code canonical
 * "Bash" it received from a router layer while it declared "bash") must
 * serialize against the declared tool instead of hard-failing the whole turn
 * with undeclared_historical_tool. The declared casing is rendered into the
 * Devin execution-trace prompt.
 */
describe("devin-agentic serializer — case-insensitive historical tool_use (#12721)", () => {
  const tools = [
    {
      name: "bash",
      description: "run",
      input_schema: { type: "object", properties: { command: { type: "string" } } },
    },
    {
      name: "read",
      description: "read",
      input_schema: { type: "object", properties: { path: { type: "string" } } },
    },
  ];

  const historyMessages = (name: string) => [
    { role: "user", content: "run uname" },
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "toolu_01", name, input: { command: "uname -a" } }],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_01", content: "Linux host" }],
    },
    { role: "user", content: "thanks, run uptime too" },
  ];

  it("accepts a PascalCase echo of a lowercase-declared tool and renders the declared name", () => {
    const prompt = serializeAnthropicForDevin({
      model: "glm-5-2",
      tools,
      messages: historyMessages("Bash"),
    });
    assert.match(prompt.text, /name: bash/);
    assert.doesNotMatch(prompt.text, /name: Bash/);
  });

  it("still accepts exact-case history", () => {
    const prompt = serializeAnthropicForDevin({
      model: "glm-5-2",
      tools,
      messages: historyMessages("bash"),
    });
    assert.match(prompt.text, /name: bash/);
  });

  it("still rejects a genuinely undeclared tool", () => {
    assert.throws(
      () =>
        serializeAnthropicForDevin({
          model: "glm-5-2",
          tools,
          messages: historyMessages("not-a-tool"),
        }),
      /undeclared tool/
    );
  });
});
