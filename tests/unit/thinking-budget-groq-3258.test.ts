import test from "node:test";
import assert from "node:assert/strict";

const { applyThinkingBudget, setThinkingBudgetConfig, ThinkingMode, DEFAULT_THINKING_CONFIG } =
  await import("../../open-sse/services/thinkingBudget.ts");

// Regression coverage for #3258 (regression of #764): Claude Code → Groq failed with
// `reasoning_effort` HTTP 400 because non-reasoning Groq models (llama-3.3-70b-versatile,
// llama-4-scout) were treated as reasoning-capable, so reasoning_effort / output_config.effort
// / thinking survived and Groq rejected them. Reasoning models (gpt-oss) must keep the field.

test("#3258 groq/llama-3.3-70b-versatile strips reasoning_effort", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const out = applyThinkingBudget({
    model: "groq/llama-3.3-70b-versatile",
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "medium",
  }) as Record<string, unknown>;
  assert.equal(out.reasoning_effort, undefined, "reasoning_effort must be stripped for groq llama");
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("#3258 groq/llama-3.3-70b-versatile strips output_config.effort and thinking", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const out = applyThinkingBudget({
    model: "groq/llama-3.3-70b-versatile",
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

test("#3258 groq/meta-llama/llama-4-scout strips reasoning_effort", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const out = applyThinkingBudget({
    model: "groq/meta-llama/llama-4-scout-17b-16e-instruct",
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "low",
  }) as Record<string, unknown>;
  assert.equal(out.reasoning_effort, undefined);
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("#3258 groq/openai/gpt-oss-120b KEEPS reasoning_effort (reasoning model — no regression)", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const out = applyThinkingBudget({
    model: "groq/openai/gpt-oss-120b",
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "high",
  }) as Record<string, unknown>;
  assert.equal(out.reasoning_effort, "high", "gpt-oss is a reasoning model — must keep the field");
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});
