// tests/unit/chatcore-claude-effort-variant.test.ts
// Characterization of applyClaudeEffortVariant — the Claude effort-suffix normalization extracted
// from handleChatCore (chatCore god-file decomposition, #3501). The VS Code "Effort" slider
// advertises claude-...-{low,medium,high,xhigh,max}; Anthropic has no such model, so the suffix is
// stripped to the base id and surfaced as reasoning_effort. Locks: the provider gate (claude /
// claude-code-compatible only), the in-place body mutation (model + reasoning_effort), the
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
