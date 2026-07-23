import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";

type ClaudeBlock = { type: string; id?: string; tool_use_id?: string; [key: string]: unknown };
type ClaudeMessage = { role: string; content: ClaudeBlock[] | unknown };

describe("issue #7705 — tool_use id mismatch on Claude OAuth", () => {
  it("keeps tool_use.id and the follow-up tool_result.tool_use_id identical when the incoming id has non-alnum characters", () => {
    const rawToolCallId = "call.read_file:0";

    const body = {
      model: "claude-sonnet-4-5",
      messages: [
        { role: "user", content: "Read foo.txt" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: rawToolCallId, type: "function", function: { name: "read_file", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: rawToolCallId, content: "file contents" },
      ],
    };

    const claudeRequest = openaiToClaudeRequest("claude-sonnet-4-5", body, false);

    const messages = claudeRequest.messages as ClaudeMessage[];
    const assistantMsg = messages.find((m) => m.role === "assistant");
    const toolUseBlock = (assistantMsg?.content as ClaudeBlock[]).find(
      (b) => b.type === "tool_use"
    );
    assert.ok(toolUseBlock, "expected an assistant tool_use block to be emitted");

    const allToolResultBlocks = messages.flatMap((m) =>
      Array.isArray(m.content)
        ? (m.content as ClaudeBlock[]).filter((b) => b.type === "tool_result")
        : []
    );

    const matchingToolResult = allToolResultBlocks.find(
      (b) => b.tool_use_id === toolUseBlock!.id
    );

    assert.ok(
      matchingToolResult,
      `no tool_result with tool_use_id === "${toolUseBlock!.id}" was found in the translated ` +
        `request (found tool_result ids: ${JSON.stringify(allToolResultBlocks.map((b) => b.tool_use_id))}). ` +
        `The original raw id "${rawToolCallId}" was sanitized for the tool_use block but NOT for ` +
        `the tool_result block, so they diverged and the tool_result was dropped by ` +
        `enforceToolResultAdjacency() — reproducing the upstream 400 from #7705.`
    );
  });
});
