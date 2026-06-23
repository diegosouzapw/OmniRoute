import { test } from "node:test";
import assert from "node:assert/strict";

import {
  NO_THINKING_PREFIX,
  isNoThinkingAlias,
  stripNoThinkingAlias,
  toNoThinkingAlias,
  shouldExposeNoThinkingAlias,
  appendNoThinkingVariants,
  applyNoThinkingAlias,
} from "../../open-sse/utils/noThinkingAlias.ts";

// ── prefix predicates ────────────────────────────────────────────────────────

test("NO_THINKING_PREFIX is the documented gateway prefix", () => {
  assert.equal(NO_THINKING_PREFIX, "no-think/");
});

test("isNoThinkingAlias detects the prefix only", () => {
  assert.equal(isNoThinkingAlias("no-think/anthropic/claude-opus-4-5"), true);
  assert.equal(isNoThinkingAlias("anthropic/claude-opus-4-5"), false);
  assert.equal(isNoThinkingAlias("claude-opus-4-5"), false);
  // non-strings never match
  assert.equal(isNoThinkingAlias(undefined as unknown as string), false);
  assert.equal(isNoThinkingAlias(123 as unknown as string), false);
});

test("stripNoThinkingAlias unwraps the prefix and passes plain ids through", () => {
  assert.equal(
    stripNoThinkingAlias("no-think/anthropic/claude-opus-4-5"),
    "anthropic/claude-opus-4-5"
  );
  assert.equal(stripNoThinkingAlias("claude-opus-4-5"), "claude-opus-4-5");
});

test("toNoThinkingAlias round-trips with stripNoThinkingAlias", () => {
  const real = "anthropic/claude-sonnet-4-6";
  const alias = toNoThinkingAlias(real);
  assert.equal(alias, "no-think/anthropic/claude-sonnet-4-6");
  assert.equal(isNoThinkingAlias(alias), true);
  assert.equal(stripNoThinkingAlias(alias), real);
});

// ── request-side suppression ─────────────────────────────────────────────────

test("applyNoThinkingAlias rewrites the model and disables thinking (Claude format)", () => {
  const body: Record<string, unknown> = {
    model: "no-think/anthropic/claude-opus-4-5",
    thinking: { type: "enabled", budget_tokens: 8000 },
    reasoning_effort: "high",
    messages: [],
  };
  const res = applyNoThinkingAlias(body, { claudeFormat: true });
  assert.equal(res.applied, true);
  assert.equal(res.realModel, "anthropic/claude-opus-4-5");
  assert.equal(body.model, "anthropic/claude-opus-4-5");
  assert.deepEqual(body.thinking, { type: "disabled" });
  assert.ok(!("reasoning_effort" in body), "reasoning_effort must be stripped");
});

test("applyNoThinkingAlias strips reasoning fields without a thinking block (OpenAI format)", () => {
  const body: Record<string, unknown> = {
    model: "no-think/openai/gpt-5.4",
    reasoning_effort: "high",
    reasoning: { effort: "high" },
    messages: [],
  };
  const res = applyNoThinkingAlias(body, { claudeFormat: false });
  assert.equal(res.applied, true);
  assert.equal(body.model, "openai/gpt-5.4");
  assert.ok(!("thinking" in body), "no Claude thinking block on an OpenAI body");
  assert.ok(!("reasoning_effort" in body), "reasoning_effort must be stripped");
  assert.ok(!("reasoning" in body), "reasoning must be stripped");
});

test("applyNoThinkingAlias is a no-op for plain models", () => {
  const body: Record<string, unknown> = {
    model: "anthropic/claude-opus-4-5",
    thinking: { type: "enabled" },
  };
  const res = applyNoThinkingAlias(body, { claudeFormat: true });
  assert.equal(res.applied, false);
  assert.equal(body.model, "anthropic/claude-opus-4-5");
  assert.deepEqual(
    body.thinking,
    { type: "enabled" },
    "thinking is left untouched when not an alias"
  );
});

test("applyNoThinkingAlias ignores a malformed prefix-only model", () => {
  const body: Record<string, unknown> = { model: "no-think/" };
  const res = applyNoThinkingAlias(body, { claudeFormat: true });
  assert.equal(res.applied, false);
  assert.equal(
    body.model,
    "no-think/",
    "left untouched when nothing follows the prefix"
  );
});

// ── catalog gating ───────────────────────────────────────────────────────────

const entry = (id: string, owned_by = "anthropic") => ({ id, object: "model", owned_by });

test("shouldExposeNoThinkingAlias accepts a Claude reasoning model that honors disabled", () => {
  assert.equal(shouldExposeNoThinkingAlias(entry("claude-opus-4-5")), true);
  assert.equal(shouldExposeNoThinkingAlias(entry("anthropic/claude-sonnet-4-6")), true);
});

test("shouldExposeNoThinkingAlias rejects models where suppression is meaningless", () => {
  // gpt-4o does not support thinking
  assert.equal(shouldExposeNoThinkingAlias(entry("gpt-4o", "openai")), false);
  // fable-5 rejects thinking.type:disabled — a no-thinking variant would be a lie
  assert.equal(shouldExposeNoThinkingAlias(entry("claude-fable-5")), false);
  // combos are virtual, never aliased
  assert.equal(shouldExposeNoThinkingAlias(entry("my-combo", "combo")), false);
  // never double-alias
  assert.equal(
    shouldExposeNoThinkingAlias(entry("no-think/anthropic/claude-opus-4-5")),
    false
  );
});

test("appendNoThinkingVariants adds one variant per eligible model and preserves the rest", () => {
  const models = [entry("claude-opus-4-5"), entry("gpt-4o", "openai"), entry("claude-fable-5")];
  const out = appendNoThinkingVariants(models);
  const ids = out.map((m) => m.id);
  assert.ok(
    ids.includes("no-think/claude-opus-4-5"),
    "eligible model gets a variant"
  );
  assert.ok(
    !ids.includes("no-think/gpt-4o"),
    "non-thinking model has no variant"
  );
  assert.ok(
    !ids.includes("no-think/claude-fable-5"),
    "reject-disabled model has no variant"
  );
  assert.equal(out.length, models.length + 1, "exactly one variant appended");
  // originals preserved up front
  assert.deepEqual(out.slice(0, 3), models);
});

test("appendNoThinkingVariants returns the same array reference when nothing is eligible", () => {
  const models = [entry("gpt-4o", "openai")];
  assert.equal(appendNoThinkingVariants(models), models);
});

test("appendNoThinkingVariants normalizes alias prefix to canonical when aliasToCanonical map is provided", () => {
  const models = [entry("cc/claude-opus-4-5")];
  const aliasToCanonical = { cc: "claude" };
  const out = appendNoThinkingVariants(models, aliasToCanonical);
  const ids = out.map((m) => m.id);
  assert.ok(
    ids.includes("no-think/claude/claude-opus-4-5"),
    "uses canonical prefix"
  );
  assert.ok(
    !ids.includes("no-think/cc/claude-opus-4-5"),
    "alias prefix not used"
  );
});

test("appendNoThinkingVariants keeps alias prefix when no map is provided", () => {
  const models = [entry("cc/claude-opus-4-5")];
  const out = appendNoThinkingVariants(models);
  const ids = out.map((m) => m.id);
  assert.ok(
    ids.includes("no-think/cc/claude-opus-4-5"),
    "alias prefix preserved"
  );
});
