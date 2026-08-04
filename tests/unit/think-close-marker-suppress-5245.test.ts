import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIResponse } =
  await import("../../open-sse/translator/response/claude-to-openai.ts");
const {
  shouldSuppressThinkCloseMarker,
  thinkingMarkerHeaderSignal,
  resolveSuppressThinkClose,
  THINKING_MARKER_HEADER,
} = await import("../../open-sse/utils/thinkCloseMarker.ts");

// #5245 / #8245: when translating a Claude-native stream to OpenAI shape,
// claude-to-openai.ts can emit a textual `</think>` close marker. Production
// policy (#8245) suppresses it by default via resolveSuppressThinkClose;
// `state.suppressThinkClose` gates emission in the translator. unset/false
// still emits at the translator layer (opt-in path for header `on`).

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

// Drive a thinking-only stream that flushes the deferred </think> at the
// message_delta finish path (no text_delta ever arrives; toolCalls stays empty).
// Exercises the L197-207 finish-flush branch in claude-to-openai.ts.
function runThinkOnlyThenFinish(state: Record<string, unknown>) {
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
      { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 5 } },
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
  // #1061: Antigravity IDE client UA (vscode/<v> (Antigravity/<v>)) renders
  // the bare </think> verbatim and trips loop-detection → suppress.
  assert.equal(shouldSuppressThinkCloseMarker("vscode/1.100.0 (Antigravity/1.2.3)"), true);
  assert.equal(shouldSuppressThinkCloseMarker("claude-code/1.0"), false);
  assert.equal(shouldSuppressThinkCloseMarker("cursor-agent/0.5"), false);
  assert.equal(shouldSuppressThinkCloseMarker("some-other-client/1.0"), false);
  assert.equal(shouldSuppressThinkCloseMarker(""), false);
  assert.equal(shouldSuppressThinkCloseMarker(null), false);
  assert.equal(shouldSuppressThinkCloseMarker(undefined), false);
});

// ── translator gating ────────────────────────────────────────────────────────

test("claude-to-openai: suppressThinkClose (production default #8245) drops marker before text", () => {
  const contents = contentChunks(runThinkThenText(newState({ suppressThinkClose: true })));
  assert.ok(!contents.includes("</think>"), "marker must be suppressed");
  assert.ok(contents.includes("169"), "real text still emitted");
});

test("claude-to-openai: suppressThinkClose=false (header on) emits marker before text (#4633 opt-in)", () => {
  const contents = contentChunks(runThinkThenText(newState({ suppressThinkClose: false })));
  assert.ok(contents.includes("</think>"), "marker must be emitted when opted in");
  assert.ok(contents.includes("169"), "real text still emitted");
  assert.ok(contents.indexOf("</think>") < contents.indexOf("169"));
});

// ── finish-flush path (L197-207, toolCalls.size === 0) ───────────────────────

test("claude-to-openai: finish-flush suppressed under suppressThinkClose (#8245 default)", () => {
  const contents = contentChunks(runThinkOnlyThenFinish(newState({ suppressThinkClose: true })));
  assert.ok(!contents.includes("</think>"), "marker must be suppressed at finish");
});

test("claude-to-openai: finish-flush emits </think> when suppressThinkClose=false (#4633 opt-in)", () => {
  const contents = contentChunks(runThinkOnlyThenFinish(newState({ suppressThinkClose: false })));
  assert.ok(contents.includes("</think>"), "marker must be emitted at finish when opted in");
});

// ── header signal resolution (x-omniroute-thinking-marker — #5312) ───────────

test("thinkingMarkerHeaderSignal: off → suppress, on → keep, absent/unknown → null", () => {
  assert.equal(thinkingMarkerHeaderSignal("off"), true);
  assert.equal(thinkingMarkerHeaderSignal("OFF"), true);
  assert.equal(thinkingMarkerHeaderSignal(" off "), true);
  assert.equal(thinkingMarkerHeaderSignal("on"), false);
  assert.equal(thinkingMarkerHeaderSignal("keep"), false);
  assert.equal(thinkingMarkerHeaderSignal(""), null);
  assert.equal(thinkingMarkerHeaderSignal("weird"), null);
  assert.equal(thinkingMarkerHeaderSignal(null), null);
  assert.equal(thinkingMarkerHeaderSignal(undefined), null);
});

test("resolveSuppressThinkClose: default suppresses; header on opts into marker (#8245)", () => {
  // header constant is the documented wire name
  assert.equal(THINKING_MARKER_HEADER, "x-omniroute-thinking-marker");
  // #8245: Chat Completions default suppresses for every UA (incl. Cursor / Claude Code).
  assert.equal(resolveSuppressThinkClose({ userAgent: "cursor-agent/0.5" }), true);
  assert.equal(resolveSuppressThinkClose({ userAgent: "claude-code/1.0" }), true);
  assert.equal(resolveSuppressThinkClose({ userAgent: "opencode/1.0" }), true);
  assert.equal(resolveSuppressThinkClose({ userAgent: "OpenAI/JS 6.26.0" }), true);
  // Explicit `off` is also suppress.
  assert.equal(
    resolveSuppressThinkClose({ userAgent: "cursor-agent/0.5", thinkingMarkerHeader: "off" }),
    true
  );
  // `on` force-keeps for legacy content-scanning clients (#4633 opt-in).
  assert.equal(
    resolveSuppressThinkClose({ userAgent: "opencode/1.0", thinkingMarkerHeader: "on" }),
    false
  );
  assert.equal(
    resolveSuppressThinkClose({ userAgent: "claude-code/1.0", thinkingMarkerHeader: "on" }),
    false
  );
});
