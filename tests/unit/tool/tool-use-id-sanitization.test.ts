import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { prepareClaudeRequest } from "../../../open-sse/translator/helpers/claudeHelper.ts";
import { openaiToClaudeResponse } from "../../../open-sse/translator/response/openai-to-claude.ts";
import { translateNonStreamingResponse } from "../../../open-sse/handlers/responseTranslator.ts";

describe("tool_use.id sanitization", () => {
  describe("prepareClaudeRequest (passthrough defense)", () => {
    it("sanitizes invalid characters in tool_use.id and tool_result.tool_use_id symmetrically", () => {
      const input = {
        messages: [
          {
            role: "assistant",
            content: [
              {
                type: "tool_use",
                id: "call:123.abc:xyz#456",
                name: "test_tool",
                input: {},
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "tool_result",
                tool_use_id: "call:123.abc:xyz#456",
                content: "ok",
              },
            ],
          },
        ],
      };

      const result = prepareClaudeRequest(input);
      const assistantMsg = result.messages?.[0];
      const userMsg = result.messages?.[1];

      const toolUseBlock = Array.isArray(assistantMsg?.content)
        ? assistantMsg.content.find((b) => b.type === "tool_use")
        : null;
      const toolResultBlock = Array.isArray(userMsg?.content)
        ? userMsg.content.find((b) => b.type === "tool_result")
        : null;

      assert.equal(toolUseBlock?.id, "call_123_abc_xyz_456");
      assert.equal(toolResultBlock?.tool_use_id, "call_123_abc_xyz_456");
    });
  });

  describe("openaiToClaudeResponse (streaming response translator)", () => {
    it("sanitizes tc.id when emitting content_block_start for tool_use", () => {
      const state = {
        toolCalls: new Map(),
        toolNameMap: new Map(),
        nextBlockIndex: 0,
        textBuffer: "",
        textEmitted: false,
        reasoningBuffer: "",
        reasoningEmitted: false,
        thinkingEmitted: false,
        usage: { input_tokens: 0, output_tokens: 0 },
        messageId: "msg_123",
        finishReason: null,
      };

      const chunk = {
        id: "chatcmpl-123",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call:999.invalid:id#1",
                  type: "function",
                  function: { name: "my_func", arguments: "{}" },
                },
              ],
            },
          },
        ],
      };

      const events = openaiToClaudeResponse(chunk, state) as Array<Record<string, unknown>>;
      const startBlock = events?.find((e) => e.type === "content_block_start") as
        { content_block: { id: string } } | undefined;

      assert.ok(startBlock, "should emit content_block_start");
      assert.equal(startBlock.content_block.id, "call_999_invalid_id_1");
    });
  });

  describe("translateNonStreamingResponse (non-streaming response translator)", () => {
    it("sanitizes tool_calls[].id when mapping to tool_use content blocks", () => {
      const response = {
        id: "chatcmpl-456",
        object: "chat.completion",
        created: 1234567890,
        model: "gpt-4o",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: null,
              tool_calls: [
                {
                  id: "call:invalid.id:777#test",
                  type: "function",
                  function: { name: "get_weather", arguments: "{}" },
                },
              ],
            },
            finish_reason: "tool_calls",
          },
        ],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      };

      const claudeResp = translateNonStreamingResponse(response, "openai", "claude") as {
        content?: Array<Record<string, unknown>>;
      };
      const toolUseBlock = claudeResp?.content?.find((b) => b.type === "tool_use");

      assert.ok(toolUseBlock, "should contain tool_use block");
      assert.equal(toolUseBlock?.id, "call_invalid_id_777_test");
    });
  });
});
