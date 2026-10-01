import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// #14888: ensureThinkingBudget raised every undersized budget to a hard 4096
// floor, including a budget the client set on purpose. Kimi K3 at effort max
// spends that whole 4096 on thinking and returns empty content with
// finish_reason "length". A positive budget the caller supplied is a choice,
// not a missing value, and must survive the floor.

test("keeps a client-supplied budget below the floor (#14888)", () => {
  const executor = new DefaultExecutor("moonshot");
  const body = {
    model: "kimi-k3",
    reasoning_effort: "max",
    max_tokens: 1024,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "kimi-k3");
  assert.equal(body.max_tokens, 1024);
});

test("keeps a client-supplied max_completion_tokens below the floor", () => {
  const executor = new DefaultExecutor("moonshot");
  const body = {
    model: "kimi-k3",
    reasoning_effort: "max",
    max_completion_tokens: 2048,
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "kimi-k3");
  assert.equal(body.max_completion_tokens, 2048);
  assert.equal(body.max_tokens, undefined);
});

test("still fills the floor when the client omitted the budget", () => {
  const executor = new DefaultExecutor("moonshot");
  const body = {
    model: "kimi-k3",
    reasoning_effort: "max",
  } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "kimi-k3");
  assert.equal(body.max_tokens, 4096);
});
