import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  transformOpenAiTools,
  transformToClaude,
} from "../../open-sse/executors/claude-web/payload.ts";

const PARENT_UUID = "00000000-0000-4000-8000-000000000001";
const HUMAN_UUID = "00000000-0000-4000-8000-000000000002";
const ASSISTANT_UUID = "00000000-0000-4000-8000-000000000003";

describe("Claude Web runtime payloads", () => {
  it("builds a new conversation with creation parameters and both turn UUIDs", () => {
    const payload = transformToClaude(
      { messages: [{ role: "user", content: "start" }] },
      "claude-sonnet-5",
      {
        operation: "completion",
        prompt: "start",
        timezone: "Asia/Seoul",
        locale: "ko-KR",
        humanMessageUuid: HUMAN_UUID,
        assistantMessageUuid: ASSISTANT_UUID,
        isNewConversation: true,
      }
    );

    assert.equal(payload.prompt, "start");
    assert.equal(payload.timezone, "Asia/Seoul");
    assert.equal(payload.locale, "ko-KR");
    assert.deepEqual(payload.turn_message_uuids, {
      human_message_uuid: HUMAN_UUID,
      assistant_message_uuid: ASSISTANT_UUID,
    });
    assert.equal(payload.create_conversation_params?.model, "claude-sonnet-5");
    assert.equal("parent_message_uuid" in payload, false);
  });

  it("builds a follow-up with a parent and no conversation creation parameters", () => {
    const payload = transformToClaude(
      { messages: [{ role: "user", content: "next" }] },
      "claude-opus-4-8",
      {
        operation: "completion",
        prompt: "next",
        timezone: "Asia/Seoul",
        locale: "ko-KR",
        parentMessageUuid: PARENT_UUID,
        humanMessageUuid: HUMAN_UUID,
        assistantMessageUuid: ASSISTANT_UUID,
        isNewConversation: false,
        toolStates: [],
      }
    );

    assert.equal(payload.parent_message_uuid, PARENT_UUID);
    assert.equal("create_conversation_params" in payload, false);
    assert.equal(payload.timezone, "Asia/Seoul");
    assert.deepEqual(payload.tool_states, []);
  });

  it("builds a retry with an empty prompt, parent, and assistant UUID only", () => {
    const payload = transformToClaude(
      { messages: [{ role: "user", content: "ignored for retry" }] },
      "claude-opus-4-8",
      {
        operation: "retry_completion",
        prompt: "",
        timezone: "UTC",
        locale: "en-US",
        parentMessageUuid: PARENT_UUID,
        assistantMessageUuid: ASSISTANT_UUID,
        isNewConversation: false,
      }
    );

    assert.equal(payload.prompt, "");
    assert.equal(payload.parent_message_uuid, PARENT_UUID);
    assert.deepEqual(payload.turn_message_uuids, {
      assistant_message_uuid: ASSISTANT_UUID,
    });
    assert.equal("create_conversation_params" in payload, false);
  });

  it("converts only valid OpenAI function tools", () => {
    assert.deepEqual(
      transformOpenAiTools([
        {
          type: "function",
          function: {
            name: "get_weather",
            description: "Read the weather",
            parameters: {
              type: "object",
              properties: { city: { type: "string" } },
              required: ["city"],
            },
          },
        },
        { type: "function", function: { description: "missing name" } },
        { type: "web_search_preview" },
        null,
      ]),
      [
        {
          name: "get_weather",
          description: "Read the weather",
          input_schema: {
            type: "object",
            properties: { city: { type: "string" } },
            required: ["city"],
          },
        },
      ]
    );
  });

  it("does not invent Claude UI tools when the caller supplied none", () => {
    const payload = transformToClaude(
      { messages: [{ role: "user", content: "hello" }] },
      "claude-sonnet-5"
    );

    assert.deepEqual(payload.tools, []);
    assert.equal(
      payload.tools.some((tool) => tool.name === "show_widget" || tool.name === "web_search"),
      false
    );
  });

  it("preserves explicit reasoning effort for prepared turns", () => {
    const payload = transformToClaude(
      {
        messages: [{ role: "user", content: "think" }],
        reasoning_effort: "high",
      },
      "claude-opus-4-8",
      {
        operation: "completion",
        prompt: "think",
        timezone: "UTC",
        locale: "en-US",
        humanMessageUuid: HUMAN_UUID,
        assistantMessageUuid: ASSISTANT_UUID,
        isNewConversation: true,
      }
    );

    assert.equal(payload.effort, "high");
    assert.equal(payload.thinking_mode, "extended");
  });
});
