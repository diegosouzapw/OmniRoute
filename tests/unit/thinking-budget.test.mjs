import test from "node:test";
import assert from "node:assert/strict";

const {
  applyThinkingBudget,
  setThinkingBudgetConfig,
  getThinkingBudgetConfig,
  ThinkingMode,
  EFFORT_BUDGETS,
  DEFAULT_THINKING_CONFIG,
} = await import("../../open-sse/services/thinkingBudget.js");

// ─── Config Management ──────────────────────────────────────────────────────

test("default config is passthrough", () => {
  const config = getThinkingBudgetConfig();
  assert.equal(config.mode, ThinkingMode.PASSTHROUGH);
});

test("setThinkingBudgetConfig updates config", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.AUTO });
  assert.equal(getThinkingBudgetConfig().mode, ThinkingMode.AUTO);
  // Reset
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

// ─── PASSTHROUGH Mode ───────────────────────────────────────────────────────

test("PASSTHROUGH: body unchanged", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const body = {
    model: "claude-sonnet-4-20250514",
    messages: [{ role: "user", content: "hello" }],
    thinking: { type: "enabled", budget_tokens: 8192 },
  };
  const result = applyThinkingBudget(body);
  assert.deepEqual(result, body);
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

// ─── AUTO Mode ──────────────────────────────────────────────────────────────

test("AUTO: strips Claude thinking config", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.AUTO });
  const body = {
    model: "claude-sonnet-4-20250514",
    messages: [{ role: "user", content: "hello" }],
    thinking: { type: "enabled", budget_tokens: 8192 },
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.thinking, undefined);
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("AUTO: strips OpenAI reasoning_effort", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.AUTO });
  const body = {
    model: "o3-mini",
    messages: [{ role: "user", content: "hello" }],
    reasoning_effort: "high",
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.reasoning_effort, undefined);
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("AUTO: strips Gemini thinking_config", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.AUTO });
  const body = {
    model: "gemini-2.5-pro",
    generationConfig: { thinking_config: { thinking_budget: 8192 } },
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.generationConfig.thinking_config, undefined);
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

// ─── CUSTOM Mode ────────────────────────────────────────────────────────────

test("CUSTOM: sets Claude budget", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.CUSTOM, customBudget: 4096 });
  const body = {
    model: "claude-sonnet-4-20250514",
    messages: [{ role: "user", content: "hello" }],
    thinking: { type: "enabled", budget_tokens: 8192 },
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.thinking.budget_tokens, 4096);
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("CUSTOM: sets OpenAI reasoning_effort from budget", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.CUSTOM, customBudget: 131072 });
  const body = {
    model: "o3-mini",
    messages: [{ role: "user", content: "hello" }],
    reasoning_effort: "low",
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.reasoning_effort, "high");
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("CUSTOM: budget 0 disables Claude thinking", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.CUSTOM, customBudget: 0 });
  const body = {
    model: "claude-sonnet-4-20250514",
    messages: [{ role: "user", content: "hello" }],
    thinking: { type: "enabled", budget_tokens: 8192 },
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.thinking.type, "disabled");
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

// ─── ADAPTIVE Mode ──────────────────────────────────────────────────────────

test("ADAPTIVE: simple request gets base budget", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.ADAPTIVE, effortLevel: "medium" });
  const body = {
    model: "claude-sonnet-4-20250514",
    messages: [{ role: "user", content: "hello" }],
    thinking: { type: "enabled", budget_tokens: 8192 },
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.thinking.budget_tokens, EFFORT_BUDGETS.medium);
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("ADAPTIVE: complex request (many messages + tools) gets higher budget", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.ADAPTIVE, effortLevel: "medium" });
  const messages = Array.from({ length: 15 }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content: "x".repeat(3000),
  }));
  const tools = Array.from({ length: 5 }, (_, i) => ({ name: `tool${i}` }));
  const body = {
    model: "claude-sonnet-4-20250514",
    messages,
    tools,
    thinking: { type: "enabled", budget_tokens: 1000 },
  };
  const result = applyThinkingBudget(body);
  // multiplier = 1.0 + 0.5 (msgs>10) + 0.5 (tools>3) + 0.3 (lastMsg>2000) = 2.3
  assert.ok(result.thinking.budget_tokens > EFFORT_BUDGETS.medium);
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

// ─── Edge Cases ─────────────────────────────────────────────────────────────

test("null/undefined body returns as-is", () => {
  assert.equal(applyThinkingBudget(null), null);
  assert.equal(applyThinkingBudget(undefined), undefined);
});

test("EFFORT_BUDGETS has expected keys", () => {
  assert.ok(EFFORT_BUDGETS.none === 0);
  assert.ok(EFFORT_BUDGETS.low > 0);
  assert.ok(EFFORT_BUDGETS.medium > EFFORT_BUDGETS.low);
  assert.ok(EFFORT_BUDGETS.high > EFFORT_BUDGETS.medium);
});
