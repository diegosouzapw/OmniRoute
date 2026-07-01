/**
 * T01 (Onda 5, item 5.1) — Context Editing `applied_edits` telemetry on the STREAMING path.
 *
 * Anthropic surfaces `context_management.applied_edits[]` on the final `message_delta`
 * snapshot of an SSE stream (spec `2026-06-16-anthropic-context-editing-spec.md` §3). Before
 * this change the streaming reconstruction (`buildStreamSummaryFromEvents` → Claude branch)
 * dropped `context_management` entirely, so streaming context-clear savings never reached
 * `recordContextEditingTelemetry` — only the non-streaming JSON path was covered.
 *
 * These tests pin the two pure units the fix touches:
 *   1. the collector must preserve `context_management` from the message_delta snapshot;
 *   2. the existing `extractContextEditingTelemetry` must then read it end-to-end.
 */
import test from "node:test";
import assert from "node:assert/strict";

const collector = await import("../../open-sse/utils/streamPayloadCollector.ts");
const { extractContextEditingTelemetry } = await import("../../open-sse/config/contextEditing.ts");

type SSEEvent = { event?: string; data: unknown };
type AppliedEdit = { cleared_input_tokens?: number; cleared_tool_uses?: number };
type ClaudeSummary = {
  type?: string;
  stop_reason?: string;
  content?: unknown[];
  context_management?: { applied_edits?: AppliedEdit[] };
};

function claudeStreamWithAppliedEdits(): SSEEvent[] {
  return [
    {
      data: {
        type: "message_start",
        message: {
          id: "msg_ce_stream_1",
          model: "claude-sonnet-4-6",
          role: "assistant",
          usage: { input_tokens: 120, output_tokens: 0 },
        },
      },
    },
    { data: { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } } },
    {
      data: { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "Done." } },
    },
    {
      data: {
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        context_management: {
          applied_edits: [
            {
              type: "clear_tool_uses_20250919",
              cleared_input_tokens: 30000,
              cleared_tool_uses: 5,
            },
          ],
        },
        usage: { output_tokens: 42 },
      },
    },
    { data: { type: "message_stop" } },
  ];
}

function claudeStreamWithoutContextManagement(): SSEEvent[] {
  return [
    {
      data: {
        type: "message_start",
        message: { id: "msg_plain", model: "claude-sonnet-4-6", role: "assistant", usage: {} },
      },
    },
    { data: { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } } },
    { data: { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "Hi" } } },
    {
      data: {
        type: "message_delta",
        delta: { stop_reason: "end_turn" },
        usage: { output_tokens: 3 },
      },
    },
    { data: { type: "message_stop" } },
  ];
}

test("streaming collector preserves context_management from the final message_delta snapshot", () => {
  const summary = collector.buildStreamSummaryFromEvents(
    claudeStreamWithAppliedEdits()
  ) as ClaudeSummary;

  assert.ok(summary && typeof summary === "object", "summary should be an object");
  assert.ok(summary.context_management, "context_management must survive reconstruction");
  const edits = summary.context_management?.applied_edits;
  assert.ok(Array.isArray(edits) && edits.length === 1, "applied_edits[] must be preserved");
  assert.equal(edits[0].cleared_input_tokens, 30000);
  assert.equal(edits[0].cleared_tool_uses, 5);
  // The rest of the Claude summary must remain intact.
  assert.equal(summary.type, "message");
  assert.equal(summary.stop_reason, "end_turn");
  assert.ok(Array.isArray(summary.content));
});

test("extractContextEditingTelemetry reads applied_edits from the reconstructed streaming body", () => {
  const summary = collector.buildStreamSummaryFromEvents(claudeStreamWithAppliedEdits());
  const tele = extractContextEditingTelemetry(summary);

  assert.ok(tele, "telemetry must be extracted from the streaming summary");
  assert.equal(tele.editCount, 1);
  assert.equal(tele.clearedInputTokens, 30000);
  assert.equal(tele.clearedToolUses, 5);
});

test("streaming collector adds no context_management key when the stream carries none", () => {
  const summary = collector.buildStreamSummaryFromEvents(
    claudeStreamWithoutContextManagement()
  ) as ClaudeSummary;

  assert.ok(summary && typeof summary === "object");
  assert.equal(
    summary.context_management,
    undefined,
    "must not fabricate an empty context_management key"
  );
  assert.equal(extractContextEditingTelemetry(summary), null, "no edits → no telemetry");
});
