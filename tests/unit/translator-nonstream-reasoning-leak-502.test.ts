import test from "node:test";
import assert from "node:assert/strict";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";

// Regression for the non-stream reasoning leak (call log 1787645055806-4256f2,
// 2026-08-25T08:06:52Z). The streaming translator (openai-to-claude.ts) gained a
// `requestedThinking` gate + reasoning-as-text fallback in ba0bd3af8 so a
// reasoning-only upstream response with thinking NOT requested still yields a
// content block (no 502) without leaking a thinking block. The NON-streaming
// translator (responseTranslator.ts::convertOpenAINonStreamingToClaude) is a
// separate, duplicated code path that never received `requestedThinking`, so it
// unconditionally pushes reasoning_content as a `type:"thinking"` block — leaking
// reasoning to a thinking-opt-out client (Claude Code sends `thinking:{type:"disabled"}`).
//
// This reproduces the requestedThinking===false path that the existing tests
// (issue-7856, issue-6623) do NOT cover — those call translateNonStreamingResponse
// WITHOUT a requestedThinking argument, so they keep the legacy "always thinking
// block" behaviour. The fix must only change behaviour when requestedThinking is
// EXPLICITLY false (opt-out), preserving the un-passed default for back-compat.

// OpenAI-shape response that carries ONLY reasoning_content, empty content — the
// exact GLM-5.2 autocompact pattern (reasoning-only, no ordinary content).
const reasoningOnlyResponse = {
  id: "chatcmpl-test",
  object: "chat.completion",
  model: "GLM-5.2",
  choices: [
    {
      index: 0,
      message: { role: "assistant", content: null, reasoning_content: 'The user just said "hi"' },
      finish_reason: "length",
    },
  ],
  usage: { prompt_tokens: 117, completion_tokens: 5 },
} as const;

// OpenAI-shape response with BOTH reasoning_content and ordinary content.
const reasoningAndContentResponse = {
  id: "chatcmpl-test2",
  object: "chat.completion",
  model: "GLM-5.2",
  choices: [
    {
      index: 0,
      message: { role: "assistant", content: "Answer", reasoning_content: "Plan" },
      finish_reason: "stop",
    },
  ],
  usage: { prompt_tokens: 10, completion_tokens: 20 },
} as const;

const typesOf = (r: unknown): string[] => {
  const content = (r as { content?: Array<{ type?: string }> })?.content;
  return Array.isArray(content) ? content.map((b) => b?.type ?? "?") : [];
};

test("REGRESSION guard: non-stream reasoning-only with requestedThinking=false relays reasoning as a TEXT block (no thinking leak, no 502)", () => {
  // requestedThinking EXPLICITLY false — client opted out of thinking.
  const translated = translateNonStreamingResponse(
    reasoningOnlyResponse,
    "openai",
    "claude",
    null,
    null,
    false
  ) as { content?: Array<{ type?: string }> };

  const ts = typesOf(translated);
  console.log("  reasoning-only requestedThinking=false -> content types:", ts);

  // FIX: reasoning must NOT surface as a thinking block when the client opted out.
  assert.ok(!ts.includes("thinking"), "no thinking block leaked to a thinking-opt-out client");
  // FIX: a content block must still be produced (reasoning relayed as text) so the
  // response is not empty — mirrors the streaming 502 fix.
  assert.ok(
    ts.includes("text"),
    "reasoning relayed as an ordinary text block (not dropped, not 502)"
  );
});

test("REGRESSION guard: non-stream reasoning+content with requestedThinking=false drops reasoning, keeps only the text block", () => {
  // When ordinary content IS present, reasoning is suppressed (thinking not requested)
  // and content is the sole block — matching the streaming translator's
  // "content supersedes buffered reasoning" behaviour.
  const translated = translateNonStreamingResponse(
    reasoningAndContentResponse,
    "openai",
    "claude",
    null,
    null,
    false
  ) as { content?: Array<{ type?: string }> };

  const ts = typesOf(translated);
  console.log("  reasoning+content requestedThinking=false -> content types:", ts);

  assert.ok(!ts.includes("thinking"), "no thinking block leaked when content is present");
  assert.ok(ts.includes("text"), "ordinary content relayed as text");
  // Only one text block — reasoning suppressed, not concatenated into the text block.
  const textCount = ts.filter((t) => t === "text").length;
  assert.equal(textCount, 1, "exactly one text block (reasoning suppressed, not merged)");
});

test("BACKCOMPAT: non-stream reasoning-only WITHOUT requestedThinking arg keeps the legacy thinking block (existing callers unchanged)", () => {
  // No 6th argument — legacy callers (issue-7856, issue-6623) keep thinking-block relay.
  const translated = translateNonStreamingResponse(
    reasoningOnlyResponse,
    "openai",
    "claude",
    null
  ) as { content?: Array<{ type?: string }> };

  const ts = typesOf(translated);
  console.log("  reasoning-only no requestedThinking arg -> content types:", ts);

  assert.ok(ts.includes("thinking"), "legacy callers still get a thinking block (back-compat)");
});

test("BACKCOMPAT: non-stream reasoning-only with requestedThinking=true keeps the thinking block (opted in)", () => {
  const translated = translateNonStreamingResponse(
    reasoningOnlyResponse,
    "openai",
    "claude",
    null,
    null,
    true
  ) as { content?: Array<{ type?: string }> };

  const ts = typesOf(translated);
  console.log("  reasoning-only requestedThinking=true -> content types:", ts);

  assert.ok(ts.includes("thinking"), "thinking block relayed when client opted in");
});
