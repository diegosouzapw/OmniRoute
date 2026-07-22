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

test("gives high-reasoning Codex GPT-5.x extra readiness budget even for SMALL requests (#3825)", () => {
  // Regression for #3825: a small-prompt high-reasoning codex target has ~78s TTFB
  // (cold high-reasoning start). Before the fix it only received the 80s base and 504'd
  // at the readiness window. The reasoning-aware bump must fire UNCONDITIONALLY for
  // high-effort codex, regardless of request size.
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "codex",
    model: "gpt-5.5-high",
    body: { messages: items(3), tools: tools(2) },
  });

  assert.ok(
    result.timeoutMs >= 110_000,
    `expected >= 110000ms for small high-reasoning codex, got ${result.timeoutMs}`
  );
  assert.ok(result.reasons.includes("codex_gpt_5_5_high_reasoning"));
});

test("does NOT bump small NON-high codex requests (#3825 scope guard)", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "codex",
    model: "gpt-5.5",
    body: { messages: items(3), tools: tools(2) },
  });

  assert.equal(result.timeoutMs, 80_000);
  assert.deepEqual(result.reasons, ["base"]);
});

test("does NOT bump small high-reasoning NON-codex requests (#3825 scope guard)", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "openai",
    model: "gpt-5.5-high",
    body: { messages: items(3), tools: tools(2) },
  });

  assert.equal(result.timeoutMs, 80_000);
  assert.deepEqual(result.reasons, ["base"]);
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

test("uses a 180s adaptive cap by default for very large agent requests", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "codex",
    model: "gpt-5.5",
    body: { input: items(500), tools: tools(20), instructions: "x".repeat(800_000) },
  });

  assert.equal(result.timeoutMs, 180_000);
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

test("bumps small requests to third-party Claude-format replicas (Minimax M3, ZAI, bailian, agentrouter) — guards against #3825-class false 504s on long reasoning warm-ups", () => {
  // Provider registry lists Minimax with `format: "claude"` — the readiness budget
  // must fire UNCONDITIONALLY for those replicas, like the codex_gpt_5_5_high
  // bump, because their reasoning warm-ups routinely exceed the default 80s window.
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "minimax",
    model: "MiniMax-M3",
    body: { messages: items(3), tools: tools(2) },
  });

  assert.equal(result.timeoutMs, 110_000);
  assert.ok(
    result.reasons.includes("claude_format_heavy_reasoning"),
    `expected claude_format_heavy_reasoning in reasons, got ${JSON.stringify(result.reasons)}`
  );
});

test("bumps ZAI (claude-format replica) readiness budget the same way", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "zai",
    model: "GLM-5",
    body: { messages: items(3), tools: tools(2) },
  });

  assert.equal(result.timeoutMs, 110_000);
  assert.ok(result.reasons.includes("claude_format_heavy_reasoning"));
});

test("does NOT bump official Anthropic first-party providers (claude/anthropic) — they have stable cold starts", () => {
  const claudeResult = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "claude",
    model: "claude-opus-4.5",
    body: { messages: items(3), tools: tools(2) },
  });

  const anthropicResult = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "anthropic",
    model: "claude-sonnet-4.5",
    body: { messages: items(3), tools: tools(2) },
  });

  assert.equal(claudeResult.timeoutMs, 80_000);
  assert.equal(anthropicResult.timeoutMs, 80_000);
  assert.ok(!claudeResult.reasons.includes("claude_format_heavy_reasoning"));
  assert.ok(!anthropicResult.reasons.includes("claude_format_heavy_reasoning"));
});

test("does NOT bump OpenAI / non-Claude providers", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "openai",
    model: "gpt-5",
    body: { messages: items(3), tools: tools(2) },
  });

  assert.equal(result.timeoutMs, 80_000);
  assert.ok(!result.reasons.includes("claude_format_heavy_reasoning"));
});

test("does NOT double-bump when codex-high reasoning and Claude-format replica both match", () => {
  // Belt-and-braces guard: even if someone extends the codex detection to
  // Claude-format providers later, the readiness bump must not stack.
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "minimax",
    model: "MiniMax-M3-high",
    body: { messages: items(3), tools: tools(2), reasoning_effort: "high" },
  });

  // Should be bumped by exactly one reason — claude_format_heavy_reasoning —
  // because minimax is not a codex provider, the codex_* path never fires.
  assert.equal(result.timeoutMs, 110_000);
  assert.ok(result.reasons.includes("claude_format_heavy_reasoning"));
  assert.ok(!result.reasons.includes("codex_gpt_5_5_high_reasoning"));
});

test("caps Claude-format replica bump at the configured maxTimeoutMs", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    maxTimeoutMs: 100_000,
    provider: "minimax",
    model: "MiniMax-M3",
    body: { messages: items(500), tools: tools(20), instructions: "x".repeat(800_000) },
  });

  assert.equal(result.timeoutMs, 100_000);
  assert.ok(result.reasons.includes("claude_format_heavy_reasoning"));
});

test("treats unknown provider names as non-Claude-format (no false positives)", () => {
  const result = resolveStreamReadinessTimeout({
    baseTimeoutMs: 80_000,
    provider: "not-a-real-provider",
    model: "anything",
    body: { messages: items(3) },
  });

  assert.equal(result.timeoutMs, 80_000);
  assert.ok(!result.reasons.includes("claude_format_heavy_reasoning"));
});
