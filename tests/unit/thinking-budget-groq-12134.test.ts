import test from "node:test";
import assert from "node:assert/strict";

const { applyThinkingBudget, setThinkingBudgetConfig, ThinkingMode, DEFAULT_THINKING_CONFIG } =
  await import("../../open-sse/services/thinkingBudget.ts");

// Regression coverage for #12134 (same class as #3258): Claude Code → Groq failed with
// `reasoning_effort` HTTP 400 for `groq/compound` and `allam-2-7b`. Neither model was in the
// curated Groq registry, so the capability heuristic defaulted them to reasoning-capable and
// `reasoning_effort` (derived from Claude Code's `output_config.effort`) was forwarded verbatim.
// Both must now be declared `supportsReasoning: false` so the field is stripped, while reasoning
// models (gpt-oss) keep it.

test("#12134 groq/groq/compound strips reasoning_effort", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const out = applyThinkingBudget({
    model: "groq/groq/compound",
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "medium",
  }) as Record<string, unknown>;
  assert.equal(out.reasoning_effort, undefined, "reasoning_effort must be stripped for compound");
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("#12134 groq/groq/compound strips output_config.effort and thinking", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const out = applyThinkingBudget({
    model: "groq/groq/compound",
    messages: [{ role: "user", content: "hi" }],
    output_config: { effort: "high" },
    thinking: { type: "enabled", budget_tokens: 10240 },
  }) as Record<string, { effort?: unknown } | undefined>;
  assert.equal(out.thinking, undefined, "thinking must be stripped");
  assert.ok(
    !out.output_config || out.output_config.effort === undefined,
    "output_config.effort must be stripped (else claude→openai re-injects reasoning_effort)"
  );
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("#12134 groq/allam-2-7b strips reasoning_effort", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const out = applyThinkingBudget({
    model: "groq/allam-2-7b",
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "low",
  }) as Record<string, unknown>;
  assert.equal(out.reasoning_effort, undefined, "reasoning_effort must be stripped for allam");
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("#12134 groq/openai/gpt-oss-20b KEEPS reasoning_effort (reasoning model — no regression)", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const out = applyThinkingBudget({
    model: "groq/openai/gpt-oss-20b",
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "high",
  }) as Record<string, unknown>;
  assert.equal(out.reasoning_effort, "high", "gpt-oss is a reasoning model — must keep the field");
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});
