import test from "node:test";
import assert from "node:assert/strict";
import {
  newStreamCtx,
  processFrame,
  isComposerModel,
  visibleComposerContentFromThinking,
  composerReasoningRemainder,
  type StreamCtx,
} from "../../open-sse/executors/cursor";

// ─── Wire-format helpers (mirror cursor-streaming.test.ts) ────────────────────

function v(n: number): Buffer {
  const out: number[] = [];
  while (n > 0x7f) {
    out.push((n & 0x7f) | 0x80);
    n >>>= 7;
  }
  out.push(n);
  return Buffer.from(out);
}
function tag(field: number, wireType: number): Buffer {
  return v((field << 3) | wireType);
}
function lenPrefixed(field: number, payload: Buffer): Buffer {
  return Buffer.concat([tag(field, 2), v(payload.length), payload]);
}

// AgentServerMessage { interaction_update (1): { thinking_delta (4): { text (1): str } } }
function buildThinkingDeltaPayload(text: string): Buffer {
  const tdu = lenPrefixed(1, Buffer.from(text, "utf8"));
  const iu = lenPrefixed(4, tdu);
  return lenPrefixed(1, iu);
}

function parseSSE(text: string): Array<Record<string, unknown>> {
  return text
    .split("\n\n")
    .filter((c) => c.startsWith("data: "))
    .map((c) => c.slice("data: ".length))
    .filter((d) => d !== "[DONE]")
    .map((d) => JSON.parse(d));
}

// ─── Pure helpers ────────────────────────────────────────────────────────────

test("isComposerModel matches composer + composer-* (case-insensitive, vendor prefix tolerated)", () => {
  assert.equal(isComposerModel("composer"), true);
  assert.equal(isComposerModel("composer-2.5"), true);
  assert.equal(isComposerModel("composer-2.5-fast"), true);
  assert.equal(isComposerModel("cu/composer-2.5"), true);
  assert.equal(isComposerModel("CURSOR/Composer-2.5"), true);
  assert.equal(isComposerModel("gpt-5.3-codex"), false);
  assert.equal(isComposerModel("claude-4-sonnet"), false);
  assert.equal(isComposerModel("composer2"), false);
  assert.equal(isComposerModel(""), false);
});

test("visibleComposerContentFromThinking returns suffix after last </think> (trim-start)", () => {
  assert.equal(visibleComposerContentFromThinking("private reasoning</think>OK"), "OK");
  assert.equal(visibleComposerContentFromThinking("a</think>b</think>  final"), "final");
  assert.equal(visibleComposerContentFromThinking("no marker yet"), "");
  assert.equal(visibleComposerContentFromThinking(""), "");
  assert.equal(visibleComposerContentFromThinking("ends with</think>"), "");
});

test("composerReasoningRemainder returns only the hidden portion before last </think>", () => {
  assert.equal(composerReasoningRemainder("private reasoning</think>OK"), "private reasoning");
  assert.equal(composerReasoningRemainder("just hidden, no marker"), "just hidden, no marker");
  assert.equal(composerReasoningRemainder(""), "");
});

// ─── Composer thinking handling via processFrame ─────────────────────────────

test("Composer streaming: emits visible suffix after </think> as content deltas; hidden never leaks as content", () => {
  const chunks: string[] = [];
  const ctx: StreamCtx = newStreamCtx("composer-2.5-fast", (c) => chunks.push(c));
  processFrame(buildThinkingDeltaPayload("private reasoning"), ctx, new Set());
  processFrame(buildThinkingDeltaPayload(" that must not leak</think>O"), ctx, new Set());
  processFrame(buildThinkingDeltaPayload("K"), ctx, new Set());

  const sseText = chunks.join("");
  const events = parseSSE(sseText);
  const content = events
    .map((e) => {
      const choices = (e as { choices?: Array<{ delta?: { content?: string } }> }).choices;
      return choices?.[0]?.delta?.content ?? "";
    })
    .join("");
  assert.equal(content, "OK");
  // Aggregated ctx.totalText must mirror the visible content so the
  // non-streaming aggregator surfaces it as message.content unchanged.
  assert.equal(ctx.totalText, "OK");
  // Composer must NOT emit reasoning_content for the visible suffix portion
  // — the hidden reasoning may still appear as reasoning_content deltas, but
  // the literal post-</think> text must never appear as reasoning_content.
  const reasoningStream = events
    .map((e) => {
      const choices = (e as { choices?: Array<{ delta?: { reasoning_content?: string } }> })
        .choices;
      return choices?.[0]?.delta?.reasoning_content ?? "";
    })
    .join("");
  assert.ok(
    !reasoningStream.includes("OK"),
    "visible suffix must not be duplicated into reasoning_content"
  );
});

test("Composer non-streaming aggregation: thinking with </think> populates totalText with visible suffix", () => {
  const chunks: string[] = [];
  const ctx: StreamCtx = newStreamCtx("cu/composer-2.5", (c) => chunks.push(c));
  processFrame(
    buildThinkingDeltaPayload("private reasoning that must not leak</think>OK"),
    ctx,
    new Set()
  );
  assert.equal(ctx.totalText, "OK");
});

test("Non-Composer model: thinking field stays in reasoning_content (unchanged contract)", () => {
  const chunks: string[] = [];
  const ctx: StreamCtx = newStreamCtx("gpt-5.3-codex", (c) => chunks.push(c));
  processFrame(buildThinkingDeltaPayload("hidden</think>SHOULD_NOT_APPEAR"), ctx, new Set());

  const sseText = chunks.join("");
  assert.ok(sseText.includes("reasoning_content"), "reasoning_content delta missing");
  const events = parseSSE(sseText);
  const content = events
    .map((e) => {
      const choices = (e as { choices?: Array<{ delta?: { content?: string } }> }).choices;
      return choices?.[0]?.delta?.content ?? "";
    })
    .join("");
  assert.equal(content, "", "non-Composer must not surface thinking as content");
  assert.equal(ctx.totalText, "", "non-Composer must not populate totalText from thinking");
});
