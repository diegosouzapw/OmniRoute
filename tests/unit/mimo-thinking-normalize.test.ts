/**
 * Xiaomi MiMo thinking normalization — `normalizeMimoThinking`.
 *
 * MiMo controls reasoning ONLY via `thinking:{type:"enabled"|"disabled"}` and rejects
 * extra/unknown request params with a strict "400 Param Incorrect". These tests pin the
 * normalization that maps OmniRoute's internal reasoning signals onto MiMo's native shape:
 * reduce any thinking object to `{type}`, and drop `reasoning_effort` / `reasoning`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { normalizeMimoThinking } from "../../open-sse/services/mimoThinking.ts";

test("thinking:{type:'disabled'} is preserved (lets a client turn thinking OFF)", () => {
  const body = { model: "mimo-v2.5-pro", messages: [], thinking: { type: "disabled" } };
  const result = normalizeMimoThinking(body);
  assert.deepEqual(result.thinking, { type: "disabled" });
});

test("Claude-shaped thinking:{type:'enabled', budget_tokens} → {type:'enabled'} (extras stripped)", () => {
  const body = {
    model: "mimo-v2.5-pro",
    messages: [],
    thinking: { type: "enabled", budget_tokens: 2048, keep: null },
  };
  const result = normalizeMimoThinking(body);
  // MiMo only accepts `type`; budget_tokens/keep would be rejected as extra params.
  assert.deepEqual(result.thinking, { type: "enabled" });
});

test("thinking:{type:'adaptive'} collapses to MiMo's binary 'enabled'", () => {
  const body = { model: "mimo-v2.5", messages: [], thinking: { type: "adaptive" } };
  const result = normalizeMimoThinking(body);
  assert.deepEqual(result.thinking, { type: "enabled" });
});

test("reasoning_effort is removed (MiMo does not understand it) and no thinking is synthesized", () => {
  const body = { model: "mimo-v2-flash", messages: [], reasoning_effort: "high" };
  const result = normalizeMimoThinking(body) as Record<string, unknown>;
  assert.equal(result.reasoning_effort, undefined, "reasoning_effort must be dropped");
  // Deliberately NOT synthesized — mimo-v2-omni is non-thinking; forcing it on could 400.
  assert.equal(result.thinking, undefined, "no thinking object is invented from a bare effort hint");
});

test("nested `reasoning` object is removed", () => {
  const body = { model: "mimo-v2.5", messages: [], reasoning: { effort: "high", summary: "auto" } };
  const result = normalizeMimoThinking(body) as Record<string, unknown>;
  assert.equal(result.reasoning, undefined, "reasoning must be dropped");
});

test("reasoning_effort alongside an explicit thinking:{type:'disabled'} → thinking wins, effort dropped", () => {
  const body = {
    model: "mimo-v2.5-pro",
    messages: [],
    reasoning_effort: "xhigh",
    thinking: { type: "disabled", budget_tokens: 1000 },
  };
  const result = normalizeMimoThinking(body) as Record<string, unknown>;
  assert.deepEqual(result.thinking, { type: "disabled" });
  assert.equal(result.reasoning_effort, undefined);
});

test("body with neither thinking nor reasoning is returned UNTOUCHED (same reference)", () => {
  const body = { model: "mimo-v2.5-pro", messages: [{ role: "user", content: "hi" }] };
  const result = normalizeMimoThinking(body);
  assert.equal(result, body, "no-op must not allocate a new object");
});

test("non-object body is returned unchanged", () => {
  const body = null as unknown as Record<string, unknown>;
  assert.equal(normalizeMimoThinking(body), body);
});

test("unrelated fields are preserved", () => {
  const body = {
    model: "mimo-v2.5-pro",
    messages: [{ role: "user", content: "hi" }],
    temperature: 0.7,
    max_tokens: 1024,
    thinking: { type: "enabled", budget_tokens: 4096 },
    reasoning_effort: "high",
  };
  const result = normalizeMimoThinking(body) as Record<string, unknown>;
  assert.equal(result.model, "mimo-v2.5-pro");
  assert.equal(result.temperature, 0.7);
  assert.equal(result.max_tokens, 1024);
  assert.deepEqual(result.messages, [{ role: "user", content: "hi" }]);
  assert.deepEqual(result.thinking, { type: "enabled" });
  assert.equal(result.reasoning_effort, undefined);
});
