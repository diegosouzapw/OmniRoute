// Unit tests for stripUnsupportedParams: per-(provider,model) strip of params
// the upstream rejects (HTTP 400). Port from 9router#7ae9fff6 (fixes #1748).
//
// Rule coverage:
//   1. claude-opus-4 series: temperature deprecated → Anthropic 400.
//   2. github + gpt-5.4: temperature unsupported.
//   3. github + Claude (except opus/sonnet 4.6): thinking + reasoning_effort rejected.
//   4. nvidia + z-ai/glm-5.2: reasoning rejected → NVIDIA 400.

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  stripUnsupportedParams,
  __STRIP_RULES_FOR_TEST,
} from "../../open-sse/translator/paramSupport.ts";

test("stripUnsupportedParams: drops temperature for claude-opus-4 models (any provider)", () => {
  const body = { model: "claude-opus-4-20250514", temperature: 0.7, max_tokens: 100 };
  stripUnsupportedParams("anthropic", "claude-opus-4-20250514", body);
  assert.equal(body.temperature, undefined, "temperature must be stripped");
  assert.equal(body.max_tokens, 100, "other params must survive");
  assert.equal(body.model, "claude-opus-4-20250514", "model must not be touched");
});

test("stripUnsupportedParams: drops temperature for claude-opus-4-1 (case insensitive)", () => {
  const body: Record<string, unknown> = { temperature: 0.5 };
  stripUnsupportedParams("anthropic", "CLAUDE-OPUS-4-1-20250805", body);
  assert.equal(body.temperature, undefined);
});

test("stripUnsupportedParams: keeps temperature for claude-sonnet-4 (only opus-4 affected)", () => {
  const body: Record<string, unknown> = { temperature: 0.7 };
  stripUnsupportedParams("anthropic", "claude-sonnet-4-20250514", body);
  assert.equal(body.temperature, 0.7, "sonnet-4 still accepts temperature");
});

test("stripUnsupportedParams: keeps temperature for claude-opus-3 (regression guard)", () => {
  const body: Record<string, unknown> = { temperature: 0.7 };
  stripUnsupportedParams("anthropic", "claude-3-opus-20240229", body);
  assert.equal(body.temperature, 0.7);
});

test("stripUnsupportedParams: github + gpt-5.4 strips temperature", () => {
  const body: Record<string, unknown> = { temperature: 1, max_completion_tokens: 200 };
  stripUnsupportedParams("github", "gpt-5.4", body);
  assert.equal(body.temperature, undefined);
  assert.equal(body.max_completion_tokens, 200);
});

test("stripUnsupportedParams: github + gpt-5 (non-5.4) keeps temperature", () => {
  const body: Record<string, unknown> = { temperature: 1 };
  stripUnsupportedParams("github", "gpt-5", body);
  assert.equal(body.temperature, 1);
});

test("stripUnsupportedParams: github + Claude strips thinking + reasoning_effort", () => {
  const body: Record<string, unknown> = {
    thinking: { type: "enabled" },
    reasoning_effort: "high",
    temperature: 0.5,
  };
  stripUnsupportedParams("github", "claude-3-5-sonnet", body);
  assert.equal(body.thinking, undefined, "Copilot rejects Claude-style thinking");
  assert.equal(body.reasoning_effort, undefined);
  assert.equal(body.temperature, 0.5, "non-targeted params survive");
});

test("stripUnsupportedParams: github + claude opus 4.6 KEEPS thinking + reasoning_effort", () => {
  const body: Record<string, unknown> = {
    thinking: { type: "enabled" },
    reasoning_effort: "high",
  };
  stripUnsupportedParams("github", "claude-opus-4.6", body);
  assert.equal(body.reasoning_effort, "high", "opus-4.6 supports reasoning_effort");
  // Note: thinking survives too on opus-4.6 per upstream rule.
  assert.deepEqual(body.thinking, { type: "enabled" });
});

test("stripUnsupportedParams: github + claude sonnet 4.6 KEEPS reasoning_effort", () => {
  const body: Record<string, unknown> = { reasoning_effort: "low" };
  stripUnsupportedParams("github", "claude-sonnet-4.6", body);
  assert.equal(body.reasoning_effort, "low");
});

test("stripUnsupportedParams: non-github provider + Claude does NOT strip thinking", () => {
  // The github-Claude rule is provider-scoped.
  const body: Record<string, unknown> = { thinking: { type: "enabled" } };
  stripUnsupportedParams("anthropic", "claude-3-5-sonnet", body);
  assert.deepEqual(body.thinking, { type: "enabled" });
});

test("stripUnsupportedParams: only deletes when the key is present (never adds undefined)", () => {
  const body: Record<string, unknown> = { max_tokens: 50 };
  stripUnsupportedParams("anthropic", "claude-opus-4", body);
  // No `temperature` key should be introduced.
  assert.equal("temperature" in body, false);
});

test("stripUnsupportedParams: returns the same body reference (in-place mutation)", () => {
  const body: Record<string, unknown> = { temperature: 0.7 };
  const out = stripUnsupportedParams("anthropic", "claude-opus-4", body);
  assert.equal(out, body);
});

test("stripUnsupportedParams: null/undefined body is a no-op", () => {
  assert.equal(stripUnsupportedParams("anthropic", "claude-opus-4", null), null);
  assert.equal(stripUnsupportedParams("anthropic", "claude-opus-4", undefined), undefined);
});

test("stripUnsupportedParams: missing model is a no-op", () => {
  const body: Record<string, unknown> = { temperature: 0.7 };
  stripUnsupportedParams("anthropic", "", body);
  assert.equal(body.temperature, 0.7);
});

test("stripUnsupportedParams: drops reasoning for nvidia z-ai/glm-5.2", () => {
  const body: Record<string, unknown> = {
    model: "z-ai/glm-5.2",
    reasoning: { effort: "high" },
    temperature: 0.7,
  };
  stripUnsupportedParams("nvidia", "z-ai/glm-5.2", body);
  assert.equal(body.reasoning, undefined, "reasoning must be stripped");
  assert.equal(body.temperature, 0.7, "other params must survive");
  assert.equal(body.model, "z-ai/glm-5.2", "model must not be touched");
});

test("stripUnsupportedParams: nvidia z-ai/glm-5.1 keeps reasoning (rule is 5.2-only)", () => {
  const body: Record<string, unknown> = {
    model: "z-ai/glm-5.1",
    reasoning: { effort: "medium" },
    max_tokens: 100,
  };
  stripUnsupportedParams("nvidia", "z-ai/glm-5.1", body);
  assert.ok(body.reasoning !== undefined, "reasoning must survive for glm-5.1");
  assert.equal(body.max_tokens, 100, "other params must survive");
});

test("stripUnsupportedParams: nvidia glm-5 rule is provider-scoped (no-op for other providers)", () => {
  const body: Record<string, unknown> = {
    model: "z-ai/glm-5.2",
    reasoning: { effort: "high" },
  };
  stripUnsupportedParams("openai", "z-ai/glm-5.2", body);
  assert.ok(body.reasoning !== undefined, "reasoning must survive for non-nvidia provider");
});

test("stripUnsupportedParams: nvidia non-glm-5 model keeps reasoning", () => {
  const body: Record<string, unknown> = {
    model: "deepseek-ai/deepseek-v4-pro",
    reasoning: { effort: "high" },
  };
  stripUnsupportedParams("nvidia", "deepseek-ai/deepseek-v4-pro", body);
  assert.ok(body.reasoning !== undefined, "reasoning must survive for non-glm-5 nvidia model");
});

test("STRIP_RULES is non-empty and every rule has a drop list", () => {
  assert.ok(__STRIP_RULES_FOR_TEST.length > 0);
  for (const rule of __STRIP_RULES_FOR_TEST) {
    assert.ok(Array.isArray(rule.drop) && rule.drop.length > 0);
    assert.ok(typeof rule.match === "function" || rule.match instanceof RegExp);
  }
});
