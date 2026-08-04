/**
 * Regression tests for #3355: two bugs in the textual tool-call detection path
 * triggered by Gemini/agy models in Claude Code.
 *
 * Bug 1 — Non-streaming response sanitizer false positive
 * ---------------------------------------------------------
 * `containsTextualToolCallContent()` in responseSanitizer.ts used
 * `.includes("[Tool call:")` to check for textual tool calls. When the model's
 * response contained the literal text "[Tool call:" as prose (e.g. quoting
 * terminal output, explaining its own output, or generating code examples),
 * the sanitizer set `sanitized.content = null`, silently erasing the response.
 *
 * Fix: `containsTextualToolCallContent` now requires the FULL header format
 * `/\[Tool call:[^\]\n]+\]\s*\nArguments:/` — the same format that
 * `parseTextualToolCallContent` requires — so quoting "[Tool call:" as prose
 * is no longer classified as a tool call.
 *
 * Bug 2 — Streaming guard buffer swallow on stream end
 * -----------------------------------------------------
 * `applyTextualToolCallStreamingGuard` in stream.ts accumulated incoming
 * content in `passthroughBufferedTextualToolCallContent` when it looked like
 * a textual tool call was starting. At stream flush, the buffered content was
 * only emitted when it did NOT include "Arguments:" (line 2060). If the
 * stream ended mid-parse (buffer contained "Arguments:" but incomplete JSON),
 * the buffer was silently dropped — the user received an empty response.
 *
 * Fix: flush always emits whatever is in the buffer, regardless of whether
 * it includes "Arguments:". A partial/incomplete tool-call header is emitted
 * as plain text rather than swallowed.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeOpenAIResponse } from "../../open-sse/handlers/responseSanitizer.ts";

// ─── Bug 1: Non-streaming false positive ───────────────────────────────────

const makeMsg = (content: string) => ({
  id: "chatcmpl-test",
  object: "chat.completion",
  created: 0,
  model: "test-model",
  choices: [
    {
      index: 0,
      message: { role: "assistant", content },
      finish_reason: "stop",
    },
  ],
});

describe("Bug #1 — containsTextualToolCallContent false positives (#3355)", () => {
  it("does NOT null out content that mentions [Tool call: x] as prose without Arguments line", () => {
    const prose =
      "Here is how a tool call looks: [Tool call: get_weather] — you would see this in the output.";
    const result = sanitizeOpenAIResponse(makeMsg(prose));
    const content = (result.choices as { message: { content: unknown } }[])[0]?.message?.content;
    assert.notStrictEqual(content, null, "content should NOT be nulled out for prose mentions");
    assert.ok(typeof content === "string" && content.length > 0, "content should be preserved");
  });

  it("does NOT null out content containing [Tool call: x] mid-sentence without Arguments line", () => {
    const midSentence =
      "The response contained [Tool call: search_web] in the output but no arguments were shown.";
    const result = sanitizeOpenAIResponse(makeMsg(midSentence));
    const content = (result.choices as { message: { content: unknown } }[])[0]?.message?.content;
    assert.notStrictEqual(
      content,
      null,
      "mid-sentence mention of [Tool call:] without Arguments: should not be stripped"
    );
  });

  it("DOES null out content that is a real textual tool call (header + Arguments + JSON)", () => {
    const realToolCall = "[Tool call: terminal]\nArguments: {\"command\":\"echo hi\"}";
    const result = sanitizeOpenAIResponse(makeMsg(realToolCall));
    const choices = result.choices as { message: { content: unknown; tool_calls?: unknown[] } }[];
    const msg = choices[0]?.message;
    // Parsed into tool_calls, so content is nulled and tool_calls populated
    assert.strictEqual(msg?.content, null, "real tool call content should be nulled");
    assert.ok(Array.isArray(msg?.tool_calls) && msg.tool_calls.length > 0, "tool_calls populated");
  });
});
