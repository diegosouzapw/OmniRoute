// tests/unit/chatcore-claude-effort-variant.test.ts
// Characterization of applyClaudeEffortVariant — the Claude effort-suffix normalization extracted
// from handleChatCore (chatCore god-file decomposition, #3501). The VS Code "Effort" slider
// advertises claude-...-{low,medium,high,xhigh,max}; Anthropic has no such model, so the suffix is
// stripped to the base id and surfaced as reasoning_effort. Locks: the direct-Claude-lane
// unconditional strip (claude / claude-code-compatible), the predicate-gated strip for any other
// provider serving a real Claude model, the in-place body mutation (model + reasoning_effort), the
// sourceFormat==="claude" skip, the explicit-effort-wins rule, and the returned effectiveModel/log.
import { test } from "node:test";
import assert from "node:assert/strict";
import { applyClaudeEffortVariant } from "../../open-sse/handlers/chatCore/claudeEffortVariant.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("claude provider + effort suffix → strips to base, mutates body model + reasoning_effort, returns log", () => {
  const body: Record<string, unknown> = { model: "claude-sonnet-4-high", messages: [] };
  const r = applyClaudeEffortVariant({
    provider: "claude",
    effectiveModel: "claude-sonnet-4-high",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "claude-sonnet-4");
  assert.equal(body.model, "claude-sonnet-4");
  assert.equal(body.reasoning_effort, "high");
  assert.match(String(r.log), /stripped "-high" → claude-sonnet-4 \(reasoning_effort=high\)/);
});

test("claude-code-compatible provider triggers the same stripping", () => {
  const body: Record<string, unknown> = { model: "claude-opus-4-xhigh", messages: [] };
  const r = applyClaudeEffortVariant({
    provider: "anthropic-compatible-cc-default",
    effectiveModel: "claude-opus-4-xhigh",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "claude-opus-4");
  assert.equal(body.model, "claude-opus-4");
  assert.equal(body.reasoning_effort, "xhigh");
});

test("sourceFormat 'claude' strips the model but does NOT inject reasoning_effort", () => {
  const body: Record<string, unknown> = { model: "claude-sonnet-4-medium", messages: [] };
  const r = applyClaudeEffortVariant({
    provider: "claude",
    effectiveModel: "claude-sonnet-4-medium",
    body,
    sourceFormat: FORMATS.CLAUDE,
  });
  assert.equal(r.effectiveModel, "claude-sonnet-4");
  assert.equal(body.model, "claude-sonnet-4");
  assert.equal(body.reasoning_effort, undefined);
});

test("an explicit client reasoning_effort wins (not overwritten)", () => {
  const body: Record<string, unknown> = {
    model: "claude-sonnet-4-low",
    reasoning_effort: "high",
    messages: [],
  };
  const r = applyClaudeEffortVariant({
    provider: "claude",
    effectiveModel: "claude-sonnet-4-low",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "claude-sonnet-4");
  assert.equal(body.reasoning_effort, "high"); // unchanged
});

test("explicit effort nested under reasoning.effort also wins", () => {
  const body: Record<string, unknown> = {
    model: "claude-sonnet-4-low",
    reasoning: { effort: "medium" },
    messages: [],
  };
  const r = applyClaudeEffortVariant({
    provider: "claude",
    effectiveModel: "claude-sonnet-4-low",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(body.reasoning_effort, undefined); // explicit reasoning.effort present → no injection
  assert.equal(r.effectiveModel, "claude-sonnet-4");
});

test("no effort suffix → no change, no log", () => {
  const body: Record<string, unknown> = { model: "claude-sonnet-4", messages: [] };
  const r = applyClaudeEffortVariant({
    provider: "claude",
    effectiveModel: "claude-sonnet-4",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "claude-sonnet-4");
  assert.equal(body.model, "claude-sonnet-4");
  assert.equal(body.reasoning_effort, undefined);
  assert.equal(r.log, null);
});

test("non-claude provider is a no-op even with an effort suffix", () => {
  const body: Record<string, unknown> = { model: "gpt-5-high", messages: [] };
  const r = applyClaudeEffortVariant({
    provider: "openai",
    effectiveModel: "gpt-5-high",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "gpt-5-high");
  assert.equal(body.model, "gpt-5-high");
  assert.equal(body.reasoning_effort, undefined);
  assert.equal(r.log, null);
});

test("non-claude provider serving a real Claude model strips the effort suffix", () => {
  const body: Record<string, unknown> = { model: "claude-sonnet-5-high", messages: [] };
  const r = applyClaudeEffortVariant({
    provider: "vertex",
    effectiveModel: "claude-sonnet-5-high",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "claude-sonnet-5");
  assert.equal(body.model, "claude-sonnet-5");
  assert.equal(body.reasoning_effort, "high");
});

test("safety guard: non-claude provider with a non-Claude model ending in a suffix word is left unchanged", () => {
  const body: Record<string, unknown> = { model: "custom-model-high", messages: [] };
  const r = applyClaudeEffortVariant({
    provider: "some-other-provider",
    effectiveModel: "custom-model-high",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "custom-model-high");
  assert.equal(body.model, "custom-model-high");
  assert.equal(body.reasoning_effort, undefined);
  assert.equal(r.log, null);
});

test("claude-code-compatible provider strips even an unregistered model id (direct lane short-circuits the predicate)", () => {
  // Proves the "unconditional strip, zero regression" claim: isDirectClaudeLane short-circuits
  // the `||`, so isKnownClaudeEffortBaseModel() is never consulted for claude/CC-compatible
  // providers — unlike the safety-guard case above, which requires the predicate to pass.
  const body: Record<string, unknown> = {
    model: "totally-unregistered-model-xyz-high",
    messages: [],
  };
  const r = applyClaudeEffortVariant({
    provider: "anthropic-compatible-cc-default",
    effectiveModel: "totally-unregistered-model-xyz-high",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "totally-unregistered-model-xyz");
  assert.equal(body.model, "totally-unregistered-model-xyz");
  assert.equal(body.reasoning_effort, "high");
});

test("no-think alias's explicit reasoning_effort:none is not overwritten by a stripped effort suffix", () => {
  const body: Record<string, unknown> = {
    model: "claude-sonnet-5-high",
    reasoning_effort: "none",
    messages: [],
  };
  const r = applyClaudeEffortVariant({
    provider: "vertex",
    effectiveModel: "claude-sonnet-5-high",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "claude-sonnet-5");
  assert.equal(body.model, "claude-sonnet-5");
  assert.equal(body.reasoning_effort, "none");
});

// ── Devin CLI providers: model ids embed the tier and must stay literal ─────────
// Regression for `dva/claude-opus-5-low` → stripped to `claude-opus-5` → executor
// rejected "Model is not present in the current Devin catalog" (400). The Devin
// catalog (devin/catalog.ts) has one id per tier; only the accidental
// double-suffixed ids (`claude-opus-5-max-low`) survived the old behavior.

test("devin-cli-agentic provider keeps a tier-embedded id literal (no strip, no body mutation)", () => {
  const body: Record<string, unknown> = { model: "claude-opus-5-low", messages: [] };
  const r = applyClaudeEffortVariant({
    provider: "devin-cli-agentic",
    effectiveModel: "claude-opus-5-low",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "claude-opus-5-low");
  assert.equal(body.model, "claude-opus-5-low");
  assert.equal(body.reasoning_effort, undefined);
  assert.equal(r.log, null);
});

test("devin provider alias (dva) is covered too", () => {
  const body: Record<string, unknown> = { model: "claude-opus-5-medium", messages: [] };
  const r = applyClaudeEffortVariant({
    provider: "dva",
    effectiveModel: "claude-opus-5-medium",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "claude-opus-5-medium");
  assert.equal(body.model, "claude-opus-5-medium");
  assert.equal(r.log, null);
});

test("devin-cli (text bridge) and devin-desktop keep literal ids as well", () => {
  for (const provider of ["devin-cli", "devin-desktop", "dv"]) {
    const body: Record<string, unknown> = { model: "claude-sonnet-5-low", messages: [] };
    const r = applyClaudeEffortVariant({
      provider,
      effectiveModel: "claude-sonnet-5-low",
      body,
      sourceFormat: FORMATS.OPENAI,
    });
    assert.equal(r.effectiveModel, "claude-sonnet-5-low", provider);
    assert.equal(body.reasoning_effort, undefined, provider);
  }
});

test("a claude-lane strip still happens for the same model name (control)", () => {
  const body: Record<string, unknown> = { model: "claude-opus-5-low", messages: [] };
  const r = applyClaudeEffortVariant({
    provider: "claude",
    effectiveModel: "claude-opus-5-low",
    body,
    sourceFormat: FORMATS.OPENAI,
  });
  assert.equal(r.effectiveModel, "claude-opus-5");
  assert.equal(body.reasoning_effort, "low");
});
