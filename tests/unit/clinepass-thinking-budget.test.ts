import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// DefaultExecutor.ensureThinkingBudget — clinepass-gated max_tokens floor for
// reasoning models (prevents empty content when the budget is undersized).

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

test("no-op for a non-reasoning clinepass model", () => {
  const executor = new DefaultExecutor("clinepass");
  const body = {
    model: "cline-pass/glm-5.2",
    reasoning_effort: "high",
    max_tokens: 100,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "cline-pass/glm-5.2");
  assert.equal(body.max_tokens, 100);
});

test("no-op for a non-clinepass provider (gate)", () => {
  const executor = new DefaultExecutor("openrouter");
  const body = {
    model: "cline-pass/deepseek-v4-pro",
    reasoning_effort: "high",
    max_tokens: 100,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "cline-pass/deepseek-v4-pro");
  assert.equal(body.max_tokens, 100);
});
