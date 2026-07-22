import test from "node:test";
import assert from "node:assert/strict";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { detectMalformedNonStream } from "../../open-sse/utils/diagnostics.ts";

// GitHub Copilot (github/gemini-3.x models) returns reasoning in `message.reasoning_text`,
// with `content` left empty. Before the fix, resolveReasoningText() in responseTranslator.ts
// only checked reasoning_content / reasoning / reasoning_details[] and missed reasoning_text,
// so the Claude-format translation dropped the reasoning entirely and emitted a bare
// "(empty response)" text block, which detectMalformedNonStream() then rejects (-> 502).
const copilotStyleResponse = {
  id: "chatcmpl-copilot-7856",
  object: "chat.completion",
  created: 1783700000,
  model: "github/gemini-3-pro",
  choices: [
    {
      index: 0,
      finish_reason: "stop",
      message: {
        role: "assistant",
        content: "",
        reasoning_text: "Let me think about the user's request before answering.",
      },
    },
  ],
  usage: { prompt_tokens: 12, completion_tokens: 8, total_tokens: 20 },
};

test("#7856 /v1/messages non-stream translation surfaces Copilot reasoning_text as a thinking block", () => {
  const translated = translateNonStreamingResponse(copilotStyleResponse, "openai", "claude", null) as {
    content: Array<{ type: string; thinking?: string; text?: string }>;
  };

  const thinkingBlock = translated.content.find((block) => block.type === "thinking");
  assert.ok(thinkingBlock, "expected a thinking block carrying the Copilot reasoning_text");
  assert.equal(thinkingBlock?.thinking, "Let me think about the user's request before answering.");
});

test("#7856 /v1/messages non-stream translation of a Copilot reasoning_text turn is not flagged malformed", () => {
  const translated = translateNonStreamingResponse(copilotStyleResponse, "openai", "claude", null);
  const malformedReason = detectMalformedNonStream(translated);
  assert.equal(malformedReason, null);
});
