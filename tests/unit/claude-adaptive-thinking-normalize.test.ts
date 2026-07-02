/**
 * Claude adaptive-thinking normalization — `normalizeClaudeAdaptiveThinking`.
 *
 * Claude Opus 4.7+/Fable 5 removed manual extended thinking: `thinking.type:"enabled"` and
 * any `thinking.budget_tokens` return HTTP 400 (Anthropic migration guide, 2026-05-19).
 * These tests pin the final guard that collapses any manual thinking that reached the
 * dispatch point to `{type:"adaptive"}`, while leaving non-adaptive-only models and
 * already-adaptive bodies untouched.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { normalizeClaudeAdaptiveThinking } from "../../open-sse/services/claudeAdaptiveThinking.ts";

test("manual thinking:{type:'enabled', budget_tokens} → adaptive, budget dropped (Opus 4.8)", () => {
  const body = {
    model: "claude-opus-4-8",
    messages: [],
    thinking: { type: "enabled", budget_tokens: 131072 },
  };
  const result = normalizeClaudeAdaptiveThinking(body, "claude-opus-4-8");
  assert.deepEqual(result.thinking, { type: "adaptive" });
});

test("Claude-shaped thinking:{type:'enabled', max_tokens} → adaptive, max_tokens dropped", () => {
  const body = {
    model: "claude-opus-4-7",
    messages: [],
    thinking: { type: "enabled", budget_tokens: 4096, max_tokens: 8000 },
  };
  const result = normalizeClaudeAdaptiveThinking(body, "claude-opus-4-7");
  assert.deepEqual(result.thinking, { type: "adaptive" });
});

test("type:'enabled' with no budget still flips to adaptive (manual mode is gone)", () => {
  const body = { model: "claude-fable-5", messages: [], thinking: { type: "enabled" } };
  const result = normalizeClaudeAdaptiveThinking(body, "claude-fable-5");
  assert.deepEqual(result.thinking, { type: "adaptive" });
});

test("thinking:{type:'adaptive'} is returned UNTOUCHED (same reference)", () => {
  const body = { model: "claude-opus-4-8", messages: [], thinking: { type: "adaptive" } };
  const result = normalizeClaudeAdaptiveThinking(body, "claude-opus-4-8");
  assert.equal(result, body, "already-adaptive body must not be reallocated");
});

test("adaptive thinking carrying a stray budget_tokens has it stripped", () => {
  const body = {
    model: "claude-opus-4-8",
    messages: [],
    thinking: { type: "adaptive", budget_tokens: 5 },
  };
  const result = normalizeClaudeAdaptiveThinking(body, "claude-opus-4-8");
  assert.deepEqual(result.thinking, { type: "adaptive" });
});

test("thinking:{type:'disabled'} is left untouched (handled by normalizeThinkingForModel)", () => {
  const body = { model: "claude-opus-4-8", messages: [], thinking: { type: "disabled" } };
  const result = normalizeClaudeAdaptiveThinking(body, "claude-opus-4-8");
  assert.equal(result, body, "disabled is a separate concern; do not touch it here");
});

test("NON-adaptive-only model keeps its manual budget (regression guard for Opus 4.6)", () => {
  const body = {
    model: "claude-opus-4-6",
    messages: [],
    thinking: { type: "enabled", budget_tokens: 96000 },
  };
  const result = normalizeClaudeAdaptiveThinking(body, "claude-opus-4-6");
  assert.equal(result, body, "Opus 4.6 still supports manual extended thinking");
  assert.deepEqual(result.thinking, { type: "enabled", budget_tokens: 96000 });
});

test("body without a thinking object is returned UNTOUCHED (same reference)", () => {
  const body = { model: "claude-opus-4-8", messages: [{ role: "user", content: "hi" }] };
  const result = normalizeClaudeAdaptiveThinking(body, "claude-opus-4-8");
  assert.equal(result, body);
});

test("non-object body / empty model are returned unchanged", () => {
  const body = null as unknown as Record<string, unknown>;
  assert.equal(normalizeClaudeAdaptiveThinking(body, "claude-opus-4-8"), body);
  const ok = { model: "claude-opus-4-8", thinking: { type: "enabled" } };
  assert.equal(normalizeClaudeAdaptiveThinking(ok, ""), ok, "empty model → no-op");
});

test("Bedrock/dated alias still resolves the adaptive-only spec", () => {
  const body = { thinking: { type: "enabled", budget_tokens: 1000 } };
  // BEDROCK_CLAUDE_ALIASES generates `anthropic.claude-opus-4-8` etc.; getModelSpec resolves it.
  const result = normalizeClaudeAdaptiveThinking(body, "anthropic.claude-opus-4-8");
  assert.deepEqual(result.thinking, { type: "adaptive" });
});

test("unrelated fields are preserved when collapsing thinking", () => {
  const body = {
    model: "claude-opus-4-8",
    messages: [{ role: "user", content: "hi" }],
    output_config: { effort: "high" },
    thinking: { type: "enabled", budget_tokens: 32000 },
  };
  const result = normalizeClaudeAdaptiveThinking(body, "claude-opus-4-8") as Record<
    string,
    unknown
  >;
  assert.equal(result.model, "claude-opus-4-8");
  assert.deepEqual(result.messages, [{ role: "user", content: "hi" }]);
  assert.deepEqual(result.output_config, { effort: "high" });
  assert.deepEqual(result.thinking, { type: "adaptive" });
});
