import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIResponse } =
  await import("../../open-sse/translator/response/claude-to-openai.ts");
const { shouldSuppressThinkCloseMarker } = await import("../../open-sse/utils/thinkCloseMarker.ts");

// #5245: when translating a Claude-native stream to OpenAI shape,
// claude-to-openai.ts emits a textual `</think>` close marker (by design, for
// Claude Code / Cursor — #4633). Clients that render it verbatim (OpenCode)
// want it suppressed. `state.suppressThinkClose` gates the emission; default
// (unset/false) preserves the #4633 behaviour.

function newState(extra: Record<string, unknown> = {}) {
  return { toolCalls: new Map(), toolNameMap: new Map(), ...extra } as Record<string, unknown>;
}

// Drive a thinking-then-text stream and collect every emitted chunk.
function runThinkThenText(state: Record<string, unknown>) {
  const out: unknown[] = [];
  const push = (r: unknown) => {
    if (Array.isArray(r)) out.push(...r);
    else if (r) out.push(r);
  };
  push(claudeToOpenAIResponse({ type: "message_start", message: { id: "m1" } }, state));
  push(
    claudeToOpenAIResponse(
      { type: "content_block_start", index: 0, content_block: { type: "thinking" } },
      state
    )
  );
  push(
    claudeToOpenAIResponse(
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "thinking_delta", thinking: "plan" },
      },
      state
    )
  );
  push(claudeToOpenAIResponse({ type: "content_block_stop", index: 0 }, state));
  push(
    claudeToOpenAIResponse(
      { type: "content_block_start", index: 1, content_block: { type: "text" } },
      state
    )
  );
  push(
    claudeToOpenAIResponse(
      { type: "content_block_delta", index: 1, delta: { type: "text_delta", text: "169" } },
      state
    )
  );
  return out;
}

function contentChunks(chunks: unknown[]): string[] {
  return chunks
    .map(
      (c) =>
        (c as { choices?: Array<{ delta?: { content?: unknown } }> })?.choices?.[0]?.delta?.content
    )
    .filter((v): v is string => typeof v === "string");
}

// ── shouldSuppressThinkCloseMarker ───────────────────────────────────────────

test("shouldSuppressThinkCloseMarker: suppresses for OpenCode, preserves CC/Cursor/unknown", () => {
  assert.equal(shouldSuppressThinkCloseMarker("opencode/1.17.11"), true);
  assert.equal(shouldSuppressThinkCloseMarker("OpenCode/2.0"), true);
  assert.equal(shouldSuppressThinkCloseMarker("claude-code/1.0"), false);
  assert.equal(shouldSuppressThinkCloseMarker("cursor-agent/0.5"), false);
  assert.equal(shouldSuppressThinkCloseMarker("some-other-client/1.0"), false);
  assert.equal(shouldSuppressThinkCloseMarker(""), false);
  assert.equal(shouldSuppressThinkCloseMarker(null), false);
  assert.equal(shouldSuppressThinkCloseMarker(undefined), false);
});

// ── translator gating ────────────────────────────────────────────────────────

test("claude-to-openai: default emits the </think> marker before the first text (#4633 preserved)", () => {
  const contents = contentChunks(runThinkThenText(newState()));
  assert.ok(contents.includes("</think>"), "marker must be emitted by default");
  assert.ok(contents.includes("169"), "real text still emitted");
  // marker comes before the real text
  assert.ok(contents.indexOf("</think>") < contents.indexOf("169"));
});

test("claude-to-openai: suppressThinkClose drops the </think> marker but keeps the text (#5245)", () => {
  const contents = contentChunks(runThinkThenText(newState({ suppressThinkClose: true })));
  assert.ok(!contents.includes("</think>"), "marker must be suppressed");
  assert.ok(contents.includes("169"), "real text still emitted");
});
