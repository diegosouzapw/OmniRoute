/**
 * GPT-5 sampling guard — `stripGpt5SamplingWhenReasoning`.
 *
 * GPT-5 reasoning models reject non-default `temperature`/`top_p` with HTTP 400 when a
 * reasoning effort is active, but GPT-5.1+ accept them again under `reasoning_effort:"none"`
 * (the default). These tests pin the conditional strip on the `openai` Chat Completions
 * surface: drop sampling only when reasoning is active, never for `none` / non-gpt-5 / other
 * providers. Refs: litellm#27351, Azure Foundry reasoning matrix, openai-python#2072.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { stripGpt5SamplingWhenReasoning } from "../../open-sse/services/gpt5SamplingGuard.ts";

test("strips temperature+top_p for openai gpt-5.x when reasoning_effort is active", () => {
  const body = {
    model: "gpt-5.4",
    temperature: 0.7,
    top_p: 0.9,
    reasoning_effort: "high",
    messages: [],
  };
  const result = stripGpt5SamplingWhenReasoning(body, "openai", "gpt-5.4");
  assert.equal(result.temperature, undefined);
  assert.equal(result.top_p, undefined);
  assert.equal(result.reasoning_effort, "high"); // effort itself is untouched
});

test("keeps temperature when reasoning_effort=none (gpt-5.1+ non-reasoning mode)", () => {
  const body = { model: "gpt-5.4", temperature: 0.7, reasoning_effort: "none", messages: [] };
  const result = stripGpt5SamplingWhenReasoning(body, "openai", "gpt-5.4");
  assert.equal(result.temperature, 0.7);
});

test("keeps sampling when there is no reasoning signal (default none for gpt-5.1+)", () => {
  const body = { model: "gpt-5.5", temperature: 0.5, top_p: 0.8, messages: [] };
  const result = stripGpt5SamplingWhenReasoning(body, "openai", "gpt-5.5");
  assert.equal(result.temperature, 0.5);
  assert.equal(result.top_p, 0.8);
});

test("nested reasoning.effort active also triggers the strip", () => {
  const body = { model: "gpt-5.4", top_p: 0.8, reasoning: { effort: "medium" }, messages: [] };
  const result = stripGpt5SamplingWhenReasoning(body, "openai", "gpt-5.4");
  assert.equal(result.top_p, undefined);
});

test("model suffix -high triggers strip; -none keeps sampling", () => {
  const high = stripGpt5SamplingWhenReasoning(
    { model: "gpt-5.4-high", temperature: 0.3 },
    "openai",
    "gpt-5.4-high"
  );
  assert.equal(high.temperature, undefined);

  const none = stripGpt5SamplingWhenReasoning(
    { model: "gpt-5.4-none", temperature: 0.3 },
    "openai",
    "gpt-5.4-none"
  );
  assert.equal(none.temperature, 0.3);
});

test("non-openai provider is untouched (codex is guarded by the executor allowlist)", () => {
  const body = { model: "gpt-5.6-sol", temperature: 0.7, reasoning_effort: "high" };
  const result = stripGpt5SamplingWhenReasoning(body, "codex", "gpt-5.6-sol");
  assert.equal(result.temperature, 0.7);
});

test("non-gpt-5 openai model is untouched (e.g. gpt-4o)", () => {
  const body = { model: "gpt-4o", temperature: 0.7, reasoning_effort: "high" };
  const result = stripGpt5SamplingWhenReasoning(body, "openai", "gpt-4o");
  assert.equal(result.temperature, 0.7);
});

test("returns the same reference when no sampling params are present", () => {
  const body = { model: "gpt-5.4", reasoning_effort: "high", messages: [] };
  const result = stripGpt5SamplingWhenReasoning(body, "openai", "gpt-5.4");
  assert.equal(result, body);
});

test("non-string model is a no-op", () => {
  const body = { temperature: 0.7, reasoning_effort: "high" };
  const result = stripGpt5SamplingWhenReasoning(body, "openai", null);
  assert.equal(result.temperature, 0.7);
});

test("logs the stripped params when a logger is provided", () => {
  const calls: Array<[string, string]> = [];
  const log = { warn: (tag: string, message: string) => calls.push([tag, message]) };
  stripGpt5SamplingWhenReasoning(
    { model: "gpt-5.4", temperature: 0.7, reasoning_effort: "high" },
    "openai",
    "gpt-5.4",
    log
  );
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], "PARAMS");
  assert.match(calls[0][1], /temperature/);
});
