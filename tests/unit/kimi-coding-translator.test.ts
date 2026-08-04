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
