import test from "node:test";
import assert from "node:assert/strict";

type OpenAIToolCallChunk = {
  choices: Array<{
    delta: {
      tool_calls?: Array<{
        id: string;
        type: string;
        function: { name: string; arguments: string };
      }>;
    };
    finish_reason: string | null;
  }>;
};

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

const { geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");
const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");
const { geminiToClaudeResponse } =
  await import("../../open-sse/translator/response/gemini-to-claude.ts");

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

// ─── OpenAI hub follow-up (live incident, dashboard log id 1784489701456-d8c0e9) ──
//
// The tests above only assert the raw "malformed_function_call" string doesn't get
// misread by the DOWNSTREAM Claude translation step. But passing that raw,
// non-standard string through as finish_reason to a real OpenAI-format client is
// itself the bug: it's not one of OpenAI's 5 documented finish_reason values (stop,
// length, tool_calls, content_filter, function_call), so a client like OpenClaw has
// no handling for it at all and silently never notices the turn failed — worse than
// "honest but unrecognized," it's invisible. These tests assert the OpenAI hub now
// synthesizes a real tool_calls entry and finish_reason: "tool_calls" instead, so the
// failure routes into the ordinary "tool call arguments didn't parse" path every
// OpenAI-compatible agent loop already has to handle.

function runGeminiToOpenAI(geminiChunk: unknown) {
  const state: Record<string, unknown> = {
    functionIndex: 0,
    toolCalls: new Map(),
    messageId: "test-msg",
    model: "gemini-test",
  };
  return geminiToOpenAIResponse(geminiChunk, state) || [];
}

test("Gemini MALFORMED_FUNCTION_CALL synthesizes a tool_calls entry with finish_reason tool_calls", () => {
  const events = runGeminiToOpenAI({
    responseId: "resp-malformed",
    modelVersion: "gemini-2.5-pro",
    candidates: [
      {
        content: { parts: [{ text: "" }] },
        finishReason: "MALFORMED_FUNCTION_CALL",
        finishMessage: "Malformed function call: call:default_api:exec{command: ...}",
        index: 0,
      },
    ],
  }) as OpenAIToolCallChunk[];

  const toolCallChunk = events.find((e) => e.choices?.[0]?.delta?.tool_calls);
  assert.ok(toolCallChunk, "expected a chunk carrying a synthesized tool_calls delta");
  const toolCall = toolCallChunk.choices[0].delta.tool_calls[0];
  assert.equal(toolCall.type, "function");
  assert.ok(toolCall.function?.name, "synthesized tool call must have a name");
  // Arguments must be valid, parseable JSON (that's the whole point — it routes into
  // the client's normal "tool args didn't parse *cleanly*" error path, not a crash).
  const parsedArgs = JSON.parse(toolCall.function.arguments);
  assert.equal(parsedArgs.error, "MALFORMED_FUNCTION_CALL");
  assert.match(parsedArgs.message, /Malformed function call/);

  const finalChunk = events.at(-1);
  assert.equal(
    finalChunk?.choices?.[0]?.finish_reason,
    "tool_calls",
    "finish_reason must be the standard OpenAI value, not the raw Gemini string"
  );
});

test("Gemini UNEXPECTED_TOOL_CALL also synthesizes a tool_calls entry", () => {
  const events = runGeminiToOpenAI({
    responseId: "resp-unexpected",
    modelVersion: "gemini-2.5-pro",
    candidates: [
      {
        content: { parts: [{ text: "" }] },
        finishReason: "UNEXPECTED_TOOL_CALL",
        index: 0,
      },
    ],
  }) as OpenAIToolCallChunk[];

  const finalChunk = events.at(-1);
  assert.equal(finalChunk?.choices?.[0]?.finish_reason, "tool_calls");
});

// Follow-up live incident (log id 1784589106014-2a42f8): Gemini can emit a REAL,
// valid functionCall AND finish the SAME candidate with MALFORMED_FUNCTION_CALL —
// the model attempted multiple tool calls in one turn (here: a real "openclaw" call
// plus a malformed "exec"+"cron" multi-call attempt), one parsed cleanly and the
// other didn't. An earlier version of this fix skipped synthesis whenever a real
// tool call already existed, on the assumption that meant a LATER, separate retry —
// but that's indistinguishable from this same-turn case, and skipping silently
// discarded the "exec"/"cron" failure entirely: the client saw "openclaw" succeed
// and never learned the other calls were attempted and rejected.
test("a REAL tool call alongside MALFORMED_FUNCTION_CALL in the same turn keeps BOTH — the failure is never silently dropped", () => {
  const state: Record<string, unknown> = {
    functionIndex: 0,
    toolCalls: new Map(),
    messageId: "test-msg-2",
    model: "gemini-test",
  };

  geminiToOpenAIResponse(
    {
      responseId: "resp-real-then-malformed",
      modelVersion: "gemini-2.5-pro",
      candidates: [
        {
          content: { parts: [{ functionCall: { name: "read_file", args: { path: "a.txt" } } }] },
          index: 0,
        },
      ],
    },
    state
  );

  const finalEvents = geminiToOpenAIResponse(
    {
      responseId: "resp-real-then-malformed",
      modelVersion: "gemini-2.5-pro",
      candidates: [
        {
          content: { parts: [{ text: "" }] },
          finishReason: "MALFORMED_FUNCTION_CALL",
          finishMessage: "Malformed function call: call:default_api:exec{command: df -h}",
          index: 0,
        },
      ],
    },
    state
  ) as OpenAIToolCallChunk[];

  const synthesizedChunk = finalEvents.find((e) => e.choices?.[0]?.delta?.tool_calls);
  assert.ok(synthesizedChunk, "expected a second, synthesized tool_calls delta");
  const synthesizedCall = synthesizedChunk!.choices[0].delta.tool_calls![0];
  assert.equal(synthesizedCall.function.name, "malformed_tool_call");
  assert.match(JSON.parse(synthesizedCall.function.arguments).message, /exec/);

  const finalChunk = finalEvents.at(-1)!;
  assert.equal(finalChunk.choices[0].finish_reason, "tool_calls");
  assert.equal(
    (state.toolCalls as Map<number, unknown>).size,
    2,
    "both the real read_file call AND the synthesized malformed-call entry must be present"
  );
});

test("Gemini clean STOP with no tool calls is unaffected (no regression)", () => {
  const events = runGeminiToOpenAI({
    responseId: "resp-clean",
    modelVersion: "gemini-2.5-pro",
    candidates: [{ content: { parts: [{ text: "All done." }] }, finishReason: "STOP", index: 0 }],
  }) as OpenAIToolCallChunk[];

  const finalChunk = events.at(-1);
  assert.equal(finalChunk?.choices?.[0]?.finish_reason, "stop");
  assert.equal(finalChunk?.choices?.[0]?.delta?.tool_calls, undefined);
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
