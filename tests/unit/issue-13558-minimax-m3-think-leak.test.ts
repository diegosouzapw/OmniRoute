import { test } from "node:test";
import assert from "node:assert/strict";

import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { claudeToOpenAIResponse } from "../../open-sse/translator/response/claude-to-openai.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("non-streaming: Claude text block with inline <think> leaks into OpenAI message.content (reasoning not separated)", () => {
  const claudeResponseFromM3 = {
    id: "msg_m3_1",
    type: "message",
    role: "assistant",
    model: "MiniMax-M3",
    content: [
      {
        type: "text",
        text: "<think>The user said hi, I should respond in a friendly way.</think>你好呀！",
      },
    ],
    stop_reason: "end_turn",
    usage: { input_tokens: 10, output_tokens: 20 },
  };

  const openai = translateNonStreamingResponse(
    claudeResponseFromM3,
    FORMATS.CLAUDE, // targetFormat = upstream/provider wire format (minimax-cn speaks Claude Messages)
    FORMATS.OPENAI // sourceFormat = what the client (OmniRoute caller) wants back
  ) as { choices: Array<{ message: { content?: string; reasoning_content?: string } }> };

  const message = openai.choices[0].message;

  assert.equal(
    message.content?.includes("<think>"),
    false,
    `expected <think> markup to be stripped from message.content, got: ${JSON.stringify(message.content)}`
  );
  assert.equal(
    typeof message.reasoning_content === "string" && message.reasoning_content.length > 0,
    true,
    "expected the <think> block text to be surfaced as reasoning_content"
  );
  assert.equal(message.content, "你好呀！", "expected the visible reply to survive unchanged");
});

test("streaming: Claude text_delta with inline <think> leaks into OpenAI delta.content chunk-by-chunk", () => {
  const state: Record<string, unknown> = { toolCalls: new Map() };

  const events = [
    { type: "message_start", message: { id: "msg_m3_2", model: "MiniMax-M3", usage: {} } },
    { type: "content_block_start", index: 0, content_block: { type: "text" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "<think>" } },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "The user said hi." },
    },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "</think>" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "你好呀！" } },
    { type: "content_block_stop", index: 0 },
  ];

  let sawLiteralThinkOpenInContent = false;
  let sawReasoningContent = false;
  let assembledContent = "";
  let assembledReasoning = "";

  for (const event of events) {
    const results = claudeToOpenAIResponse(event, state);
    for (const chunk of results || []) {
      const delta = (chunk as { choices: Array<{ delta: Record<string, unknown> }> }).choices[0]
        .delta;
      if (typeof delta.content === "string") {
        assembledContent += delta.content;
        if (delta.content.includes("<think>")) {
          sawLiteralThinkOpenInContent = true;
        }
      }
      if (typeof delta.reasoning_content === "string" && delta.reasoning_content.length > 0) {
        sawReasoningContent = true;
        assembledReasoning += delta.reasoning_content;
      }
    }
  }

  assert.equal(
    sawLiteralThinkOpenInContent,
    false,
    "expected no literal <think> tag in delta.content"
  );
  assert.equal(
    sawReasoningContent,
    true,
    "expected delta.reasoning_content to carry the M3 reasoning text"
  );
  assert.equal(assembledContent, "你好呀！", "expected the visible reply to survive unchanged");
  assert.equal(
    assembledReasoning,
    "The user said hi.",
    "expected the reasoning text to be assembled without markup"
  );
});

test("streaming: <think> open tag split across two deltas is buffered, not leaked", () => {
  const state: Record<string, unknown> = { toolCalls: new Map() };

  const events = [
    { type: "message_start", message: { id: "msg_m3_3", model: "minimax-m3", usage: {} } },
    { type: "content_block_start", index: 0, content_block: { type: "text" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "<th" } },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "ink>reasoning here" },
    },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "</th" } },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "text_delta", text: "ink>final answer" },
    },
    { type: "content_block_stop", index: 0 },
  ];

  let sawLiteralThinkMarkupInContent = false;
  let assembledContent = "";
  let assembledReasoning = "";

  for (const event of events) {
    const results = claudeToOpenAIResponse(event, state);
    for (const chunk of results || []) {
      const delta = (chunk as { choices: Array<{ delta: Record<string, unknown> }> }).choices[0]
        .delta;
      if (typeof delta.content === "string") {
        assembledContent += delta.content;
        if (delta.content.includes("<th") || delta.content.includes("think>")) {
          sawLiteralThinkMarkupInContent = true;
        }
      }
      if (typeof delta.reasoning_content === "string") {
        assembledReasoning += delta.reasoning_content;
      }
    }
  }

  assert.equal(
    sawLiteralThinkMarkupInContent,
    false,
    `expected no <think>/</think> markup fragments in delta.content, got: ${JSON.stringify(assembledContent)}`
  );
  assert.equal(
    assembledContent,
    "final answer",
    "expected the split open/close tags to still be parsed"
  );
  assert.equal(
    assembledReasoning,
    "reasoning here",
    "expected the reasoning text to be assembled across the split chunks"
  );
});
