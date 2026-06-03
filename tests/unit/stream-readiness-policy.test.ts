import test from "node:test";
import assert from "node:assert/strict";
import { resolveStreamReadinessTimeout } from "../../open-sse/utils/streamReadinessPolicy.ts";

function items(count: number): Array<{ role: string; content: string }> {
  return Array.from({ length: count }, (_, index) => ({
    role: "user",
    content: `message ${index}`,
  }));
}

function tools(count: number): Array<{ type: string; name: string }> {
  return Array.from({ length: count }, (_, index) => ({ type: "function", name: `tool_${index}` }));
}

test("keeps the base timeout for small requests", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 30_000,
    provider: "codex",
    model: "gpt-5.5",
    body: { input: items(3), tools: tools(2) },
  });

  assert.equal(result.timeoutMs, 30_000);
  assert.deepEqual(result.reasons, ["base"]);
});

test("increases timeout for large conversation history", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 30_000,
    provider: "openai",
    model: "gpt-4.1",
    body: { input: items(181) },
  });

  assert.equal(result.timeoutMs, 50_000);
  assert.ok(result.reasons.includes("large_history"));
});

test("increases timeout for tool-heavy requests", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 30_000,
    provider: "openai",
    model: "gpt-4.1",
    body: { input: items(10), tools: tools(20) },
  });

  assert.equal(result.timeoutMs, 45_000);
  assert.ok(result.reasons.includes("tool_heavy"));
});

test("gives Codex GPT-5.5 large Responses requests extra readiness budget", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 30_000,
    provider: "codex",
    model: "gpt-5.5",
    body: { input: items(181), tools: tools(20) },
  });

  assert.equal(result.timeoutMs, 95_000);
  assert.ok(result.reasons.includes("large_history"));
  assert.ok(result.reasons.includes("tool_heavy"));
  assert.ok(result.reasons.includes("codex_gpt_5_5_large_responses"));
});

test("caps adaptive timeout at maxTimeoutMs", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 30_000,
    maxTimeoutMs: 120_000,
    provider: "codex",
    model: "gpt-5.5",
    body: { input: items(500), tools: tools(20), instructions: "x".repeat(800_000) },
  });

  assert.equal(result.timeoutMs, 120_000);
  assert.ok(result.reasons.includes("very_large_history"));
  assert.ok(result.reasons.includes("very_large_payload"));
});

test("preserves zero timeout so readiness checks can be disabled", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 0,
    provider: "codex",
    model: "gpt-5.5",
    body: { input: items(500), tools: tools(20) },
  });

  assert.equal(result.timeoutMs, 0);
  assert.deepEqual(result.reasons, ["disabled"]);
});
