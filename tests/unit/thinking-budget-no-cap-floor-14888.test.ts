import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// #14888 (part 2, after #14912): with no client cap and a reasoning model whose
// registry entry has no maxOutputTokens, ensureThinkingBudget must not invent a
// 4096 ceiling (reasoning consumed it all, finish_reason "length").

test("does not inject a 4096 ceiling for kimi-coding k3 (no maxOutputTokens registered) (#14888)", () => {
  const executor = new DefaultExecutor("kimi-coding-apikey");
  const body = { model: "k3", reasoning_effort: "max" } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "k3");

  assert.equal(body.max_tokens, undefined);
  assert.equal(body.max_completion_tokens, undefined);
});

test("still applies the 4096 floor when a validated maxOutputTokens is registered (#14888)", () => {
  const executor = new DefaultExecutor("moonshot");
  const body = { model: "kimi-k3", reasoning_effort: "max" } as Record<string, unknown>;

  executor.ensureThinkingBudget(body, "kimi-k3");

  assert.equal(body.max_tokens, 4096);
});
