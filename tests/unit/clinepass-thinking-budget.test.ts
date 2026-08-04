import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// DefaultExecutor.ensureThinkingBudget — max_tokens floor for
// reasoning models (prevents empty content when the budget is undersized).
// Previously gated to clinepass only; now applies to all providers (#6912).

test("bumps undersized max_tokens to 4096 for a clinepass reasoning model", () => {
  const executor = new DefaultExecutor("clinepass");
  const body = {
    model: "cline-pass/deepseek-v4-pro",
    reasoning_effort: "high",
    max_tokens: 512,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "cline-pass/deepseek-v4-pro");
  assert.equal(body.max_tokens, 4096);
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

test("applies the floor to GLM-5.2 now that the official catalog marks it reasoning-capable", () => {
  const executor = new DefaultExecutor("clinepass");
  const body = {
    model: "cline-pass/glm-5.2",
    reasoning_effort: "high",
    max_tokens: 100,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "cline-pass/glm-5.2");
  assert.equal(body.max_tokens, 4096);
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

test("bumps undersized max_tokens for a non-clinepass reasoning provider (gate removed, #6912)", () => {
  // Issue #6912: ensureThinkingBudget was gated to clinepass only.
  // Now it applies to all providers. Use nvidia (non-clinepass) which has
  // deepseek-ai/deepseek-v4-pro with supportsReasoning in the registry.
  const executor = new DefaultExecutor("nvidia");
  const body = {
    model: "deepseek-ai/deepseek-v4-pro",
    reasoning_effort: "high",
    max_tokens: 100,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "deepseek-ai/deepseek-v4-pro");
  assert.equal(body.max_tokens, 4096);
});
