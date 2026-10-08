import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

function openaiBody(message: Record<string, unknown>, finish = "stop") {
  return {
    id: "chatcmpl-1",
    object: "chat.completion",
    model: "mistral:latest",
    choices: [{ index: 0, message, finish_reason: finish }],
    usage: { prompt_tokens: 5, completion_tokens: 3 },
  };
}

const toolCall = {
  id: "call_1",
  type: "function",
  function: { name: "Read", arguments: '{"file_path":"/etc/hostname"}' },
};

type ClaudeOut = { content: Array<{ type: string; text?: string }> };

function types(out: unknown): string[] {
  return (out as ClaudeOut).content.map((b) => b.type);
}

describe("#15764 non-streaming OpenAI -> Claude placeholder text block", () => {
  it("emits only tool_use when content is empty and tool_calls exist", () => {
    const out = translateNonStreamingResponse(
      openaiBody({ role: "assistant", content: "", tool_calls: [toolCall] }, "tool_calls"),
      FORMATS.OPENAI,
      FORMATS.CLAUDE
    );
    assert.deepEqual(types(out), ["tool_use"]);
  });

  it("keeps the placeholder when there is neither text nor tool calls", () => {
    const out = translateNonStreamingResponse(
      openaiBody({ role: "assistant", content: "" }),
      FORMATS.OPENAI,
      FORMATS.CLAUDE
    );
    assert.deepEqual(types(out), ["text"]);
    assert.equal((out as ClaudeOut).content[0].text, "(empty response)");
  });

  it("keeps non-empty text next to tool_use", () => {
    const out = translateNonStreamingResponse(
      openaiBody({ role: "assistant", content: "hi", tool_calls: [toolCall] }, "tool_calls"),
      FORMATS.OPENAI,
      FORMATS.CLAUDE
    );
    assert.deepEqual(types(out), ["text", "tool_use"]);
    assert.equal((out as ClaudeOut).content[0].text, "hi");
  });
});
