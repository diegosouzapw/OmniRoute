import test from "node:test";
import assert from "node:assert/strict";

// Upstream: decolua/9router#2462 sub-bug #2 (@anhdiepmmk).
//
// Gemini/Antigravity aborts a turn mid tool-call with finishReason
// MALFORMED_FUNCTION_CALL (or a sibling abort reason like UNEXPECTED_TOOL_CALL)
// instead of completing it cleanly. Before this fix:
//   - open-sse/utils/finishReason.ts had no notion of these reasons, so they
//     passed through the OpenAI hub unchanged (harmless on their own).
//   - open-sse/translator/response/openai-to-claude.ts's convertFinishReason()
//     collapsed ANY unrecognized OpenAI finish_reason to a clean "end_turn" in
//     its default case — presenting an aborted tool call to the Claude client
//     as a successful completion.
// This regression guard chains the real Gemini -> OpenAI -> Claude translator
// pipeline (mirroring translateResponse's hub-and-spoke Step 1 + Step 2) and
// asserts the Claude stop_reason is never a silent "end_turn" for these
// abort/error finish reasons, while a genuine clean STOP still maps to
// "end_turn" (no regression).

const { geminiToOpenAIResponse } = await import(
  "../../open-sse/translator/response/gemini-to-openai.ts"
);
const { openaiToClaudeResponse } = await import(
  "../../open-sse/translator/response/openai-to-claude.ts"
);
const { geminiToClaudeResponse } = await import(
  "../../open-sse/translator/response/gemini-to-claude.ts"
);

// Direct Gemini -> Claude translator (the path Claude Code hits through an
// antigravity/Gemini-routed model — sourceFormat=CLAUDE, targetFormat=GEMINI —
// which bypasses the OpenAI hub). Its finishReason classifier had the identical
// bug: any unrecognized reason (incl. MALFORMED_FUNCTION_CALL) fell through to
// a clean "end_turn".
function runDirectGeminiToClaude(finishReason: string) {
  const state: Record<string, unknown> = {};
  const events =
    geminiToClaudeResponse(
      {
        responseId: "resp-direct",
        modelVersion: "gemini-2.5-pro",
        candidates: [{ content: { parts: [{ text: "partial" }] }, finishReason, index: 0 }],
      },
      state
    ) || [];
  const messageDelta = (events as Array<Record<string, unknown>>).find(
    (event) => event.type === "message_delta"
  );
  return (messageDelta?.delta as { stop_reason?: string } | undefined)?.stop_reason;
}

function runGeminiToClaude(geminiChunk) {
  const geminiState: { toolCalls: Map<number, unknown> } = { toolCalls: new Map() };
  const openaiEvents = geminiToOpenAIResponse(geminiChunk, geminiState) || [];

  const claudeState: { toolCalls: Map<number, unknown> } = { toolCalls: new Map() };
  const claudeEvents: Array<Record<string, unknown>> = [];
  for (const chunk of openaiEvents) {
    const converted = openaiToClaudeResponse(chunk, claudeState);
    if (converted) claudeEvents.push(...converted);
  }
  return { openaiEvents, claudeEvents };
}

test("Gemini MALFORMED_FUNCTION_CALL does not surface as a clean Claude end_turn", () => {
  const { openaiEvents, claudeEvents } = runGeminiToClaude({
    responseId: "resp-malformed",
    modelVersion: "gemini-2.5-pro",
    candidates: [
      {
        content: { parts: [{ text: "partial text" }] },
        finishReason: "MALFORMED_FUNCTION_CALL",
        index: 0,
      },
    ],
  });

  // Sanity: the OpenAI hub must not silently rewrite it to a clean "stop" either.
  const openaiFinish = openaiEvents.at(-1)?.choices?.[0]?.finish_reason;
  assert.notEqual(openaiFinish, "stop");

  const messageDelta = claudeEvents.find((event) => event.type === "message_delta");
  assert.ok(messageDelta, "expected a Claude message_delta terminal event");
  const stopReason = (messageDelta.delta as { stop_reason?: string }).stop_reason;
  assert.notEqual(stopReason, "end_turn");
});

test("Gemini UNEXPECTED_TOOL_CALL does not surface as a clean Claude end_turn", () => {
  const { claudeEvents } = runGeminiToClaude({
    responseId: "resp-unexpected",
    modelVersion: "gemini-2.5-pro",
    candidates: [
      {
        content: { parts: [{ text: "partial text" }] },
        finishReason: "UNEXPECTED_TOOL_CALL",
        index: 0,
      },
    ],
  });

  const messageDelta = claudeEvents.find((event) => event.type === "message_delta");
  assert.ok(messageDelta, "expected a Claude message_delta terminal event");
  const stopReason = (messageDelta.delta as { stop_reason?: string }).stop_reason;
  assert.notEqual(stopReason, "end_turn");
});

test("Gemini clean STOP still maps to Claude end_turn (no regression)", () => {
  const { claudeEvents } = runGeminiToClaude({
    responseId: "resp-clean",
    modelVersion: "gemini-2.5-pro",
    candidates: [
      {
        content: { parts: [{ text: "All done." }] },
        finishReason: "STOP",
        index: 0,
      },
    ],
  });

  const messageDelta = claudeEvents.find((event) => event.type === "message_delta");
  assert.ok(messageDelta, "expected a Claude message_delta terminal event");
  const stopReason = (messageDelta.delta as { stop_reason?: string }).stop_reason;
  assert.equal(stopReason, "end_turn");
});

test("direct Gemini->Claude: MALFORMED_FUNCTION_CALL does not surface as a clean end_turn", () => {
  assert.notEqual(runDirectGeminiToClaude("MALFORMED_FUNCTION_CALL"), "end_turn");
});

test("direct Gemini->Claude: UNEXPECTED_TOOL_CALL does not surface as a clean end_turn", () => {
  assert.notEqual(runDirectGeminiToClaude("UNEXPECTED_TOOL_CALL"), "end_turn");
});

test("direct Gemini->Claude: clean STOP still maps to end_turn (no regression)", () => {
  assert.equal(runDirectGeminiToClaude("STOP"), "end_turn");
});

test("Gemini MAX_TOKENS still maps to Claude max_tokens (no regression)", () => {
  const { claudeEvents } = runGeminiToClaude({
    responseId: "resp-length",
    modelVersion: "gemini-2.5-pro",
    candidates: [
      {
        content: { parts: [{ text: "Truncated" }] },
        finishReason: "MAX_TOKENS",
        index: 0,
      },
    ],
  });

  const messageDelta = claudeEvents.find((event) => event.type === "message_delta");
  assert.ok(messageDelta, "expected a Claude message_delta terminal event");
  const stopReason = (messageDelta.delta as { stop_reason?: string }).stop_reason;
  assert.equal(stopReason, "max_tokens");
});
