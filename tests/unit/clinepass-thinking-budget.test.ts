import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// DefaultExecutor.ensureThinkingBudget — max_tokens floor for
// reasoning models (prevents empty content when the budget is undersized).
// Previously gated to clinepass only; now applies to all providers (#6912).

test("keeps a client-supplied budget instead of raising it to 4096 (#14888)", () => {
  const executor = new DefaultExecutor("clinepass");
  const body = {
    model: "cline-pass/deepseek-v4-pro",
    reasoning_effort: "high",
    max_tokens: 512,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "cline-pass/deepseek-v4-pro");
  assert.equal(body.max_tokens, 512);
});

test("sets max_tokens floor when absent for a reasoning model", () => {
  const executor = new DefaultExecutor("clinepass");
  const body = {
    model: "cline-pass/deepseek-v4-flash",
    reasoning_effort: "medium",
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "cline-pass/deepseek-v4-flash");
  assert.equal(body.max_tokens, 4096);
});

test("leaves an already-sufficient budget untouched", () => {
  const executor = new DefaultExecutor("clinepass");
  const body = {
    model: "cline-pass/deepseek-v4-pro",
    reasoning_effort: "high",
    max_tokens: 8000,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "cline-pass/deepseek-v4-pro");
  assert.equal(body.max_tokens, 8000);
});

test("no-op when reasoning is disabled", () => {
  const executor = new DefaultExecutor("clinepass");
  const body = {
    model: "cline-pass/deepseek-v4-pro",
    max_tokens: 100,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "cline-pass/deepseek-v4-pro");
  assert.equal(body.max_tokens, 100);
});

test("keeps a client-supplied budget on GLM-5.2 even though the catalog marks it reasoning-capable", () => {
  const executor = new DefaultExecutor("clinepass");
  const body = {
    model: "cline-pass/glm-5.2",
    reasoning_effort: "high",
    max_tokens: 100,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "cline-pass/glm-5.2");
  assert.equal(body.max_tokens, 100);
});

test("no-op for an unknown model without reasoning metadata", () => {
  const executor = new DefaultExecutor("clinepass");
  const body = {
    model: "cline-pass/unknown-model",
    reasoning_effort: "high",
    max_tokens: 100,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "cline-pass/unknown-model");
  assert.equal(body.max_tokens, 100);
});

test("keeps a client-supplied budget for a non-clinepass reasoning provider (#14888)", () => {
  // Issue #6912 removed the clinepass-only gate, so the floor applies to every
  // provider. #14888 then stopped the floor from overriding a budget the client
  // already set. nvidia has Nemotron Nano marked supportsReasoning.
  const executor = new DefaultExecutor("nvidia");
  const body = {
    model: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    reasoning_effort: "high",
    max_tokens: 100,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning");
  assert.equal(body.max_tokens, 100);
});
