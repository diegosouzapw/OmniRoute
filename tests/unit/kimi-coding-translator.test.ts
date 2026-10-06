import assert from "node:assert/strict";
import { test } from "node:test";

import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";

type KimiClaudeRequest = {
  thinking: { type: string; budget_tokens?: number };
  output_config?: { effort?: string };
  messages: Array<{ content: Array<Record<string, unknown>> }>;
};

test("OpenAI to Kimi Anthropic maps effort without inventing a token budget", () => {
  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    "kimi-for-coding",
    {
      model: "kimi-for-coding",
      max_tokens: 4096,
      reasoning_effort: "high",
      messages: [
        {
          role: "assistant",
          content: null,
          reasoning_content: "",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "search", arguments: "{}" },
            },
          ],
        },
        { role: "user", content: "continue" },
      ],
    },
    false,
    {},
    "kimi-coding"
  ) as KimiClaudeRequest;

  assert.deepEqual(translated.thinking, { type: "enabled" });
  assert.deepEqual(translated.output_config, { effort: "high" });
  assert.equal(translated.thinking.budget_tokens, undefined);
  assert.deepEqual(translated.messages[0].content[0], {
    type: "thinking",
    thinking: "",
  });
});

test("Kimi Anthropic preserves an explicit empty thinking block", () => {
  const translated = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.CLAUDE,
    "kimi-for-coding",
    {
      model: "kimi-for-coding",
      max_tokens: 4096,
      thinking: { type: "enabled" },
      messages: [
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "" },
            { type: "tool_use", id: "toolu_1", name: "search", input: {} },
          ],
        },
        { role: "user", content: [{ type: "text", text: "continue" }] },
      ],
    },
    false,
    {},
    "kimi-coding"
  ) as KimiClaudeRequest;

  assert.deepEqual(translated.messages[0].content[0], {
    type: "thinking",
    thinking: "",
  });
});

test("Responses history preserves Kimi reasoning before a tool call", () => {
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "k3-256k",
    {
      model: "k3-256k",
      max_output_tokens: 4096,
      reasoning: { effort: "high" },
      input: [
        {
          role: "user",
          content: [{ type: "input_text", text: "Call ping, then answer DONE." }],
        },
        {
          id: "rs_1",
          type: "reasoning",
          content: [{ type: "reasoning_text", text: "I should call ping first." }],
        },
        {
          id: "fc_1",
          type: "function_call",
          call_id: "call_1",
          name: "ping",
          arguments: "{}",
        },
        {
          type: "function_call_output",
          call_id: "call_1",
          output: "pong",
        },
      ],
    },
    false,
    {},
    "kimi-coding-apikey"
  ) as KimiClaudeRequest;

  assert.deepEqual(translated.messages[1].content[0], {
    type: "thinking",
    thinking: "I should call ping first.",
  });
  assert.deepEqual(translated.messages[1].content[1], {
    type: "tool_use",
    id: "call_1",
    name: "proxy_ping",
    input: {},
  });
});

test("Responses history preserves Kimi reasoning on completed assistant turns", () => {
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "k3-256k",
    {
      model: "k3-256k",
      max_output_tokens: 4096,
      reasoning: { effort: "high" },
      input: [
        {
          role: "user",
          content: [{ type: "input_text", text: "Remember cobalt-orchid." }],
        },
        {
          id: "rs_1",
          type: "reasoning",
          content: [{ type: "reasoning_text", text: "I should retain the nonce." }],
        },
        {
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text: "Noted." }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: "What was it?" }],
        },
      ],
    },
    false,
    {},
    "kimi-coding-apikey"
  ) as KimiClaudeRequest;

  assert.deepEqual(translated.messages[1].content, [
    { type: "thinking", thinking: "I should retain the nonce." },
    { type: "text", text: "Noted." },
  ]);
});

test("Responses history preserves Kimi reasoning before a custom tool call", () => {
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "k3-256k",
    {
      model: "k3-256k",
      reasoning: { effort: "high" },
      input: [
        {
          type: "reasoning",
          content: [{ type: "reasoning_text", text: "I should apply the patch." }],
        },
        {
          type: "custom_tool_call",
          call_id: "call_1",
          name: "apply_patch",
          input: "*** Begin Patch",
        },
        {
          type: "custom_tool_call_output",
          call_id: "call_1",
          output: "Done",
        },
      ],
    },
    false,
    {},
    "kimi-coding-apikey"
  ) as KimiClaudeRequest;

  assert.deepEqual(translated.messages[0].content[0], {
    type: "thinking",
    thinking: "I should apply the patch.",
  });
});

test("Responses history does not carry reasoning across a user boundary", () => {
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "k3-256k",
    {
      model: "k3-256k",
      reasoning: { effort: "high" },
      input: [
        {
          role: "user",
          content: [{ type: "input_text", text: "First turn" }],
        },
        {
          type: "reasoning",
          content: [{ type: "reasoning_text", text: "Prior turn reasoning." }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: "Next turn" }],
        },
      ],
    },
    false,
    {},
    "kimi-coding-apikey"
  ) as KimiClaudeRequest;

  assert.deepEqual(translated.messages[1].content, [
    { type: "thinking", thinking: "Prior turn reasoning." },
  ]);
  assert.deepEqual(translated.messages[2].content, [{ type: "text", text: "Next turn" }]);
});
