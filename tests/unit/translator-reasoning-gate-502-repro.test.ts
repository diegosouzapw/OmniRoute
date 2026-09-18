import test from "node:test";
import assert from "node:assert/strict";

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

// Regression for the autocompact 502 empty_response. The no-502 guard must keep
// holding after the requestedThinking gate is restored on the thinking block
// emission.
//
// History: f6eb328ba/e28d02066 gated reasoning_content relay on
// state.requestedThinking === true. A reasoning-only upstream response
// (GLM-5.2 on a huge autocompact context returns ONLY reasoning_content, empty
// content) with requestedThinking===false produced ZERO content blocks — the
// stream reached flush with no content_block_start, and
// stream.ts::emitClaudeEmptyStreamErrorAndAbort raised a 502 "no content block".
//
// fix A (14534ee95) removed the gate so reasoning_content was ALWAYS relayed as
// a thinking block (content_block_start stays alive => no 502). But that leaked
// reasoning as a thinking block to thinking-opt-out clients (the operator
// reported "reasoning is exposed").
//
// RESOLUTION (this fix): restore the requestedThinking gate on the thinking
// block EMISSION only, so requestedThinking=false emits NO thinking block (no
// reasoning leak). The _reasoningAccum accumulation stays OUTSIDE the gate and
// always runs, so fix B (translator/response/openai-to-claude.ts finish
// handler) synthesizes a TEXT block from the accumulated reasoning for
// reasoning-only responses — keeping a content_block_start alive so flush does
// NOT 502. This guard verifies the no-502 invariant holds via fix B (not via a
// leaked thinking block).

test("REGRESSION guard: reasoning-only response with requestedThinking=false does NOT 502 (fix B synthesizes a text block; gate suppresses the thinking block)", () => {
  const state = createState(); // requestedThinking absent => false

  // GLM-5.2 autocompact: ONLY reasoning_content, no content delta.
  const reasoning = openaiToClaudeResponse(
    {
      id: "chatcmpl-ec8832",
      model: "glm-5.2",
      choices: [
        {
          index: 0,
          delta: { reasoning_content: "Compacting 154k-token context..." },
          finish_reason: null,
        },
      ],
    },
    state
  );
  const final = openaiToClaudeResponse(
    {
      id: "chatcmpl-ec8832",
      model: "glm-5.2",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 154172, completion_tokens: 0, total_tokens: 154172 },
    },
    state
  );
  const result = flatten([reasoning, final]);

  const contentBlockStarts = result.filter(
    (e) => (e as { type?: string })?.type === "content_block_start"
  );
  const thinkingBlocks = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "thinking"
  );
  const textBlocks = result.filter(
    (e) => (e as { content_block?: { type?: string } })?.content_block?.type === "text"
  );
  const thinkingDeltas = result.filter(
    (e) => (e as { delta?: { type?: string } })?.delta?.type === "thinking_delta"
  );

  console.log(
    `  content_block_start count=${contentBlockStarts.length} thinking=${thinkingBlocks.length} text=${textBlocks.length} thinkingDelta=${thinkingDeltas.length}`
  );

  // No 502: fix B synthesizes a text block so flush has >= 1 content block.
  assert.ok(
    contentBlockStarts.length >= 1,
    "FIX A/B: requestedThinking=false + reasoning-only must emit >= 1 content block (fix B text block => no 502 at flush)"
  );
  // Gate: requestedThinking=false => NO thinking block (no reasoning leak).
  assert.equal(
    thinkingBlocks.length,
    0,
    "requestedThinking=false => NO thinking block (gate stops reasoning leak)"
  );
  assert.equal(
    thinkingDeltas.length,
    0,
    "requestedThinking=false => NO thinking_delta (gate stops reasoning leak)"
  );
  // Fix B: a text block is synthesized from the accumulated reasoning.
  assert.ok(
    textBlocks.length >= 1,
    "fix B: reasoning-only synthesizes a text block (keeps content_block_start alive => no 502)"
  );
});
