import test from "node:test";
import assert from "node:assert/strict";

// Regression for the reasoning-leak + compact-loop resolution.
//
// History (systematic-debugging, confirmed 2026-08-31):
//   e28d02066 (2026-08-24) gated reasoning_content relay on
//   state.requestedThinking === true. With Claude Code autocompact (thinking
//   disabled) + GLM-5.2/DeepSeek-V4-Flash returning ONLY reasoning_content on
//   huge contexts, the gate produced zero content blocks => 502 "no content
//   block", or (ba0bd3af8) reasoning flushed as text that the compact parser
//   rejected => compact loop.
//   fix A (14534ee95) removed the gate entirely so reasoning_content is ALWAYS
//   relayed as a thinking block. That stopped the 502 and (with fix B's text
//   synthesis) the compact loop, but leaked reasoning as a thinking block to
//   thinking-opt-out clients (requestedThinking=false) — the operator reported
//   "reasoning is exposed".
//
// RESOLUTION (this fix): restore the requestedThinking gate on the thinking
//   block EMISSION only (content_block_start type:thinking + thinking_delta),
//   so requestedThinking=false emits NO thinking block (no reasoning leak).
//   The _reasoningAccum accumulation stays OUTSIDE the gate and always runs, so
//   fix B still synthesizes a text block for reasoning-only responses (no 502,
//   compact applies). This avoids the e28d02066 regression (which gated the
//   whole block including accumulation, breaking fix B => 502/compact loop).

const { openaiToClaudeResponse } =
  await import("../../open-sse/translator/response/openai-to-claude.ts");

function createState() {
  return {
    toolCalls: new Map(),
    _pendingXmlToolCalls: [],
    _xmlInvokeBuffer: "",
  };
}

function flatten(items: unknown[]) {
  return items.flatMap((item) => (item as unknown[]) || []);
}

// RED: requestedThinking=false (default, autocompact) + reasoning-only. The gate
// must suppress the thinking block (no reasoning leak), while fix B synthesizes
// a text block from the accumulated reasoning so flush has a content block (no
// 502) and Claude Code's autocompact parser has a real summary to apply.
test("REGRESSION: requestedThinking=false + reasoning-only MUST NOT emit a thinking block (gate) but MUST synthesize a text block (fix B) => no 502, compact applies", () => {
  const state = createState(); // requestedThinking absent => false (autocompact)

  // GLM-5.2 autocompact: ONLY reasoning_content, no content delta.
  const reasoning = openaiToClaudeResponse(
    {
      id: "chatcmpl-gate-fix",
      model: "glm-5.2",
      choices: [
        {
          index: 0,
          delta: { reasoning_content: "Compacting 145k-token context..." },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-gate-fix",
      model: "glm-5.2",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 145376, completion_tokens: 5, total_tokens: 145381 },
    },
    state
  );
  const result = flatten([reasoning, final]);

  const thinkingStarts = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "thinking"
  );
  const textStarts = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "text"
  );
  const contentBlockStarts = result.filter(
    (e) => (e as { type?: string })?.type === "content_block_start"
  );

  // Gate: requestedThinking=false => NO thinking block (stops reasoning leak).
  assert.equal(
    thinkingStarts.length,
    0,
    "requestedThinking=false + reasoning-only MUST NOT emit a thinking block (gate stops reasoning leak)"
  );
  // Fix B: reasoning-only synthesizes a text block so flush has a content block.
  assert.ok(
    contentBlockStarts.length >= 1,
    "reasoning-only must keep >= 1 content_block_start (fix B text block, no 502 at flush)"
  );
  assert.ok(
    textStarts.length >= 1,
    "fix B: reasoning-only MUST synthesize a text block (autocompact summary)"
  );
  // The message must finish normally (end_turn), not as an error.
  const messageDeltas = result.filter((e) => e?.type === "message_delta");
  assert.equal(messageDeltas[0].delta.stop_reason, "end_turn");
});

// RED: requestedThinking=false + reasoning THEN content. The gate suppresses
// the thinking block (no reasoning leak); the ordinary content still starts its
// own text block. e28d02066 suppressed the thinking block too but ALSO blocked
// accumulation; this fix keeps accumulation so fix B never false-fires (real
// content sets textBlockStarted, so the finish gate is skipped).
test("REGRESSION: requestedThinking=false + reasoning THEN content emits NO thinking block (gate) but a text block (content)", () => {
  const state = createState(); // requestedThinking absent => false

  const reasoning = openaiToClaudeResponse(
    {
      id: "chatcmpl-gate-fix-2",
      model: "glm-5.2",
      choices: [{ index: 0, delta: { reasoning_content: "Planning..." }, finish_reason: null }],
    },
    state
  );
  const text = openaiToClaudeResponse(
    {
      id: "chatcmpl-gate-fix-2",
      model: "glm-5.2",
      choices: [{ index: 0, delta: { content: "Answer" }, finish_reason: null }],
    },
    state
  );
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-gate-fix-2",
      model: "glm-5.2",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    },
    state
  );
  const result = flatten([reasoning, text, final]);

  const thinkingStarts = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "thinking"
  );
  const textStarts = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "text"
  );

  // Gate: no thinking block (requestedThinking=false, no reasoning leak).
  assert.equal(
    thinkingStarts.length,
    0,
    "requestedThinking=false => no thinking block (gate, no reasoning leak)"
  );
  // Ordinary content still emits a text block.
  assert.ok(textStarts.length >= 1, "ordinary content still emits a text block");
});

// RED (fix B guard): requestedThinking=false + reasoning-ONLY (no content). The
// gate suppresses the thinking block; fix B synthesizes a text block from the
// accumulated reasoning so Claude Code's autocompact parser has a real summary.
// The accumulation MUST stay outside the gate (e28d02066 gated it too => fix B
// never fired => 502/compact loop regression).
test("REGRESSION (fix B): requestedThinking=false + reasoning-ONLY MUST synthesize a text block (NOT a thinking block) so autocompact can use it as the summary", () => {
  const state = createState(); // requestedThinking absent => false (autocompact)

  const reasoning = openaiToClaudeResponse(
    {
      id: "chatcmpl-fix-b",
      model: "glm-5.2",
      choices: [
        {
          index: 0,
          delta: { reasoning_content: "Summary of the 153k-token context..." },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-fix-b",
      model: "glm-5.2",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 153225, completion_tokens: 8772, total_tokens: 161997 },
    },
    state
  );
  const result = flatten([reasoning, final]);

  const thinkingStarts = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "thinking"
  );
  const textStarts = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "text"
  );
  const textDeltas = result.filter(
    (e) => (e as { delta?: { type?: string } })?.delta?.type === "text_delta"
  );

  // Gate: NO thinking block (requestedThinking=false, no reasoning leak).
  assert.equal(
    thinkingStarts.length,
    0,
    "requestedThinking=false => no thinking block (gate, no reasoning leak)"
  );
  // Fix B: a text block is synthesized from the reasoning so the autocompact
  // parser has a real text summary to apply.
  assert.ok(textStarts.length >= 1, "fix B: reasoning-only MUST synthesize a text block");
  assert.ok(textDeltas.length >= 1, "fix B: reasoning text carried as text_delta");
  // The synthesized text block carries the reasoning content.
  const synthesizedText = (textDeltas[0] as { delta?: { text?: string } }).delta?.text;
  assert.equal(synthesizedText, "Summary of the 153k-token context...");
});

// GREEN guard: requestedThinking=true + reasoning MUST still emit a thinking
// block — the gate passes when the client explicitly opted into thinking. This
// guards against the gate over-suppressing (e.g. inverted condition) and
// regressing the thinking-opted-in path.
test("REGRESSION: requestedThinking=true + reasoning MUST emit a thinking block (gate passes)", () => {
  const state = createState();
  state.requestedThinking = true; // client explicitly opted into thinking

  const reasoning = openaiToClaudeResponse(
    {
      id: "chatcmpl-gate-true",
      model: "glm-5.2",
      choices: [
        {
          index: 0,
          delta: { reasoning_content: "Reasoning through the request..." },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-gate-true",
      model: "glm-5.2",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    },
    state
  );
  const result = flatten([reasoning, final]);

  const thinkingStarts = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "thinking"
  );
  const thinkingDeltas = result.filter(
    (e) => (e as { delta?: { type?: string } })?.delta?.type === "thinking_delta"
  );
  const textStarts = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "text"
  );
  const textDeltas = result.filter(
    (e) => (e as { delta?: { type?: string } })?.delta?.type === "text_delta"
  );
  const contentBlockStarts = result.filter(
    (e) => (e as { type?: string })?.type === "content_block_start"
  );

  assert.ok(
    thinkingStarts.length >= 1,
    "requestedThinking=true => thinking block MUST be emitted (gate passes)"
  );
  assert.ok(
    thinkingDeltas.length >= 1,
    "requestedThinking=true => reasoning content carried as thinking_delta"
  );
  // FIX-B double-exposure guard (2026-09-01): when the client opted into
  // thinking (requestedThinking===true) AND the response is reasoning-only (no
  // content), the thinking block above already provides a content_block_start
  // (no 502 at flush). fix B's text-block synthesis MUST NOT fire here — it would
  // double-expose the reasoning as BOTH a thinking block AND a text block, showing
  // reasoning and response as indistinguishable plain text (the operator reported
  // "구별이 전혀 안가고 지저분하다").
  assert.equal(
    textStarts.length,
    0,
    "requestedThinking=true + reasoning-only => NO fix-B text block (no double exposure)"
  );
  assert.equal(
    textDeltas.length,
    0,
    "requestedThinking=true + reasoning-only => NO text_delta (fix B skipped)"
  );
  assert.equal(
    contentBlockStarts.length,
    1,
    "requestedThinking=true + reasoning-only => exactly 1 content_block_start (the thinking block; no 502)"
  );
});

// RED (double-exposure fix, 2026-09-01): requestedThinking=true + reasoning-ONLY.
// The emission gate passes (thinking block emitted) and fix B MUST be skipped
// (requestedThinking===true) so the reasoning is carried ONLY by the thinking
// block — no redundant text block synthesised. Before the fix, fix B fired
// unconditionally and the reasoning appeared as BOTH a thinking block AND a text
// block (double exposure).
test("REGRESSION (double-exposure): requestedThinking=true + reasoning-ONLY MUST emit a thinking block AND MUST NOT synthesize a fix-B text block (no double exposure)", () => {
  const state = createState();
  state.requestedThinking = true; // client explicitly opted into thinking

  const reasoning = openaiToClaudeResponse(
    {
      id: "chatcmpl-double-expose",
      model: "glm-5.2",
      choices: [
        {
          index: 0,
          delta: { reasoning_content: "Reasoning through the huge context..." },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-double-expose",
      model: "glm-5.2",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 150000, completion_tokens: 12, total_tokens: 150012 },
    },
    state
  );
  const result = flatten([reasoning, final]);

  const thinkingStarts = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "thinking"
  );
  const thinkingDeltas = result.filter(
    (e) => (e as { delta?: { type?: string } })?.delta?.type === "thinking_delta"
  );
  const textStarts = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "text"
  );
  const textDeltas = result.filter(
    (e) => (e as { delta?: { type?: string } })?.delta?.type === "text_delta"
  );
  const contentBlockStarts = result.filter(
    (e) => (e as { type?: string })?.type === "content_block_start"
  );
  const messageDeltas = result.filter((e) => (e as { type?: string })?.type === "message_delta");

  assert.equal(
    thinkingStarts.length,
    1,
    "requestedThinking=true + reasoning-only => exactly 1 thinking block (gate passes)"
  );
  assert.ok(
    thinkingDeltas.length >= 1,
    "requestedThinking=true + reasoning-only => reasoning carried as thinking_delta"
  );
  assert.equal(
    textStarts.length,
    0,
    "requestedThinking=true + reasoning-only => NO text block (fix B skipped, no double exposure)"
  );
  assert.equal(
    textDeltas.length,
    0,
    "requestedThinking=true + reasoning-only => NO text_delta (fix B skipped)"
  );
  assert.equal(
    contentBlockStarts.length,
    1,
    "requestedThinking=true + reasoning-only => exactly 1 content_block_start (the thinking block; no 502)"
  );
  assert.equal(
    messageDeltas[0].delta.stop_reason,
    "end_turn",
    "requestedThinking=true + reasoning-only => message finishes end_turn"
  );
});
