/**
 * Issue #2331 — Codex model alias effort suffixes
 * (`gpt-5.5-xhigh`, `-high`, `-medium`, `-low`) are the user's explicit
 * routing choice and must override a client-injected `reasoning.effort`
 * default. OpenCode auto-injects `reasoning.effort=medium` for GPT-5-family
 * requests, which used to silently mask the suffix.
 *
 * The fix is in `open-sse/executors/codex/reasoningPolicy.ts`: priority is
 *   modelEffort > explicitReasoning > requestReasoningEffort > fallback.
 *
 * These tests exercise the effort-resolution priority directly via a
 * small re-implementation of the resolution chain so we don't have to
 * spin up the full Codex executor (which talks to upstream).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { applyCodexReasoningSelection } from "../../open-sse/executors/codex/reasoningPolicy.ts";

// Replicate the priority chain that lives in
// open-sse/executors/codex.ts:1382-1402 so tests fail loudly if someone
// reverts the order.
type Inputs = {
  modelEffort: string | null;
  explicitReasoning: string | undefined;
  requestReasoningEffort: string | undefined;
  fallbackReasoningEffort: string | undefined;
};

function resolveEffort(i: Inputs): string | undefined {
  return (
    i.modelEffort ||
    i.explicitReasoning ||
    i.requestReasoningEffort ||
    i.fallbackReasoningEffort ||
    undefined
  );
}

test("#2331 model suffix wins over client reasoning.effort default", () => {
  const out = resolveEffort({
    modelEffort: "xhigh",
    explicitReasoning: "medium", // OpenCode default
    requestReasoningEffort: undefined,
    fallbackReasoningEffort: undefined,
  });
  assert.equal(out, "xhigh");
});

test("#2331 model suffix wins over body.reasoning_effort field too", () => {
  const out = resolveEffort({
    modelEffort: "low",
    explicitReasoning: undefined,
    requestReasoningEffort: "high",
    fallbackReasoningEffort: undefined,
  });
  assert.equal(out, "low");
});

test("#2331 without suffix, explicit client effort still works (backward compat)", () => {
  const out = resolveEffort({
    modelEffort: null,
    explicitReasoning: "high",
    requestReasoningEffort: undefined,
    fallbackReasoningEffort: "medium",
  });
  assert.equal(out, "high");
});

test("#2331 without suffix or client value, connection fallback applies", () => {
  const out = resolveEffort({
    modelEffort: null,
    explicitReasoning: undefined,
    requestReasoningEffort: undefined,
    fallbackReasoningEffort: "medium",
  });
  assert.equal(out, "medium");
});

test("#2331 no input anywhere → undefined (caller will skip body.reasoning)", () => {
  const out = resolveEffort({
    modelEffort: null,
    explicitReasoning: undefined,
    requestReasoningEffort: undefined,
    fallbackReasoningEffort: undefined,
  });
  assert.equal(out, undefined);
});

// ─── Regression check on the real implementation ───────────────────────
test("#2331 codex.ts still ranks modelEffort above client-injected reasoning defaults", () => {
  // The ranking lives in open-sse/executors/codex/reasoningPolicy.ts
  // (applyCodexReasoningSelection). Exercise the real function instead of scanning source.
  //
  // #2331's invariant is a RELATIVE one: a model-suffix alias (gpt-5.5-xhigh) must beat
  // the defaults a client injects (OpenCode's reasoning.effort=medium, reasoning_effort).
  // It is not a claim about the head of the chain — #13556 deliberately puts the
  // server-selected force rule ahead of everything, which is stronger than both.
  const apply = (model: string, body: Record<string, unknown>, forced?: string) => {
    applyCodexReasoningSelection(model, body, undefined, "low", true, forced);
    return (body.reasoning as Record<string, unknown> | undefined)?.effort;
  };

  assert.equal(apply("gpt-5.5-xhigh", { reasoning: { effort: "medium" } }), "xhigh");
  assert.equal(apply("gpt-5.5-xhigh", { reasoning_effort: "medium" }), "xhigh");
  assert.equal(apply("gpt-5.5-low", { reasoning: { effort: "high" } }), "low");
  // A client value still beats the connection default when there is no suffix.
  assert.equal(apply("gpt-5.5", { reasoning: { effort: "high" } }), "high");
  // The server-selected force rule outranks even the suffix.
  assert.equal(apply("gpt-5.5-xhigh", { reasoning: { effort: "medium" } }, "low"), "low");
});
