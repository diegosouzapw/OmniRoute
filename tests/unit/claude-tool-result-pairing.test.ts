import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { prepareClaudeRequest } from "../../open-sse/translator/helpers/claudeHelper.ts";

function translate(body: Record<string, unknown>) {
  return translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    "claude-fable-5",
    body,
    true,
    null,
    "github"
  ) as { messages: Array<{ role: string; content: Array<Record<string, unknown>> }> };
}

describe("Claude tool result pairing", () => {
  test("salvages orphaned results and fills missing parallel results", () => {
    const out = translate({
      messages: [
        { role: "user", content: "run" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call-valid",
              type: "function",
              function: { name: "exec", arguments: "{}" },
            },
            {
              id: "call-missing",
              type: "function",
              function: { name: "read", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "call-valid", content: "valid output" },
        { role: "tool", tool_call_id: "call-orphan", content: "orphan output" },
        { role: "user", content: "continue" },
      ],
    });

    const assistantIndex = out.messages.findIndex(
      (message) =>
        message.role === "assistant" &&
        message.content.some((block) => block.type === "tool_use" && block.id === "call-valid")
    );
    const resultMessage = out.messages[assistantIndex + 1];
    assert.ok(resultMessage, "expected a user result message after the tool-use turn");
    const structuredResults = resultMessage.content.filter((block) => block.type === "tool_result");

    assert.deepEqual(
      structuredResults.map((block) => block.tool_use_id),
      ["call-valid", "call-missing"]
    );
    assert.equal(structuredResults[1].content, "");
    assert.match(JSON.stringify(resultMessage.content), /valid output/);
    assert.match(JSON.stringify(resultMessage.content), /orphan output/);
  });

  test("salvages an orphaned result when it is the only message", () => {
    const out = prepareClaudeRequest(
      {
        model: "claude-fable-5",
        messages: [
          {
            role: "user",
            content: [{ type: "tool_result", tool_use_id: "call-orphan", content: "only output" }],
          },
        ],
      },
      "github"
    );

    assert.equal(
      out.messages?.[0]?.content instanceof Array &&
        out.messages[0].content.some((block) => block.type === "tool_result"),
      false
    );
    assert.match(JSON.stringify(out.messages?.[0]?.content), /only output/);
  });
});
