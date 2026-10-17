import test from "node:test";
import assert from "node:assert/strict";

const {
  applyThinkingBudget,
  setThinkingBudgetConfig,
  getThinkingBudgetConfig,
  ThinkingMode,
  EFFORT_BUDGETS,
  DEFAULT_THINKING_CONFIG,
  THINKING_LEVEL_MAP,
  normalizeThinkingLevel,
  ensureThinkingConfig,
  hasThinkingCapableModel,
} = await import("../../open-sse/services/thinkingBudget.ts");

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

test("PASSTHROUGH: keeps reasoning_effort for OpenAI-compatible Gemini routes", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const body = {
    model: "openai-compatible-sp-google/gemini-3.1-pro-preview",
    messages: [{ role: "user", content: "hello" }],
    reasoning_effort: "high",
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.reasoning_effort, "high");
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
  assert.equal(result.reasoning_effort, "xhigh");
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

test("ADAPTIVE: a short request keeps the client's high effort", () => {
  // #16662: effortLevel high maps to 131072, and setCustomBudget writes xhigh
  // for any budget that is not strictly below that. Agnes accepts high and
  // rejects xhigh, so a request the client already marked high must stay high
  // when the adaptive multiplier does not raise the budget.
  setThinkingBudgetConfig({ mode: ThinkingMode.ADAPTIVE, effortLevel: "high" });
  const body = {
    model: "agnes/agnes-2.5-flash",
    messages: [{ role: "user", content: "say pong" }],
    reasoning_effort: "high",
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.reasoning_effort, "high");
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("ADAPTIVE: a complex request still raises a collapsed high ceiling", () => {
  // Counter-case: many messages and tools push the multiplier past 1, so the
  // scaled budget exceeds the selected effort's own budget and the ceiling
  // write to xhigh must stand. A guard that always pins the selected effort
  // would fail here.
  setThinkingBudgetConfig({ mode: ThinkingMode.ADAPTIVE, effortLevel: "high" });
  const messages = Array.from({ length: 13 }, () => ({ role: "user", content: "hi" }));
  const tools = Array.from({ length: 5 }, (_, i) => ({ name: `tool${i}` }));
  const body = {
    model: "agnes/agnes-2.5-flash",
    messages,
    tools,
    reasoning_effort: "high",
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.reasoning_effort, "xhigh");
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("ADAPTIVE: a long last message raises a collapsed high ceiling", () => {
  // The +0.3 branch (last user message over 2000 chars) alone takes the
  // multiplier to 1.3. 131072 × 1.3 exceeds the selected budget, so the
  // ceiling write to xhigh must stand. One message and no tools, so the
  // other two branches stay off.
  setThinkingBudgetConfig({ mode: ThinkingMode.ADAPTIVE, effortLevel: "high" });
  const body = {
    model: "agnes/agnes-2.5-flash",
    messages: [{ role: "user", content: "x".repeat(2001) }],
    reasoning_effort: "high",
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.reasoning_effort, "xhigh");
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("ADAPTIVE: Opus 4.7 budget capped within Anthropic-allowed range", () => {
  // Capy sends `output_config.effort=max` (baseline 65536) on a long
  // conversation (13 messages, 25 tools, recent tool_use). Multiplier
  // stacks to 2.3× — raw budget would be ~150K, exceeding Anthropic's
  // [1024, 128000] range for Opus 4.7 and triggering a 400.
  // capThinkingBudget MUST cap at the model's thinkingBudgetCap.
  setThinkingBudgetConfig({ mode: ThinkingMode.ADAPTIVE, effortLevel: "medium" });
  const messages = Array.from({ length: 13 }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content:
      i === 11
        ? [{ type: "tool_use", id: "t1", name: "x", input: {} }]
        : [{ type: "text", text: "hi" }],
  }));
  const tools = Array.from({ length: 25 }, (_, i) => ({ name: `tool${i}` }));
  const body = {
    model: "claude-opus-4-7",
    messages,
    tools,
    output_config: { effort: "max" },
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.thinking.type, "enabled");
  assert.ok(
    result.thinking.budget_tokens <= 128000,
    `budget ${result.thinking.budget_tokens} must be ≤ Anthropic limit 128000`
  );
  assert.ok(
    result.thinking.budget_tokens >= 1024,
    `budget ${result.thinking.budget_tokens} must be ≥ Anthropic minimum 1024`
  );
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

// ─── thinkingLevel String Conversion (Feature 4) ────────────────────────────

test("THINKING_LEVEL_MAP has all expected levels", () => {
  assert.equal(THINKING_LEVEL_MAP.none, 0);
  assert.equal(THINKING_LEVEL_MAP.low, 4096);
  assert.equal(THINKING_LEVEL_MAP.medium, 8192);
  assert.equal(THINKING_LEVEL_MAP.high, 24576);
});

test("normalizeThinkingLevel: converts thinkingLevel 'high' to budget", () => {
  const body = {
    model: "claude-sonnet-4",
    thinkingLevel: "high",
    messages: [{ role: "user", content: "hello" }],
  };
  const result = normalizeThinkingLevel(body);
  assert.equal(result.thinking.type, "enabled");
  assert.equal(result.thinking.budget_tokens, 24576);
  assert.equal(result.thinkingLevel, undefined);
});

test("normalizeThinkingLevel: converts thinking_level 'low' to budget", () => {
  const body = {
    model: "claude-sonnet-4",
    thinking_level: "low",
    messages: [{ role: "user", content: "hello" }],
  };
  const result = normalizeThinkingLevel(body);
  assert.equal(result.thinking.type, "enabled");
  assert.equal(result.thinking.budget_tokens, 4096);
  assert.equal(result.thinking_level, undefined);
});

test("normalizeThinkingLevel: converts 'none' to disabled", () => {
  const body = { model: "claude-sonnet-4", thinkingLevel: "none" };
  const result = normalizeThinkingLevel(body);
  assert.equal(result.thinking.type, "disabled");
  assert.equal(result.thinking.budget_tokens, 0);
});

test("normalizeThinkingLevel: converts Gemini thinkingConfig.thinkingLevel", () => {
  const body = {
    model: "gemini-2.5-pro",
    generationConfig: {
      thinkingConfig: { thinkingLevel: "high" },
    },
  };
  const result = normalizeThinkingLevel(body);
  assert.equal(result.generationConfig.thinkingConfig.thinkingBudget, 24576);
  assert.equal(result.generationConfig.thinking_config, undefined);
});

test("normalizeThinkingLevel: ignores unknown string values", () => {
  const body = { model: "claude-sonnet-4", thinkingLevel: "ultra" };
  const result = normalizeThinkingLevel(body);
  assert.equal(result.thinking, undefined); // not converted
  assert.equal(result.thinkingLevel, "ultra"); // preserved
});

// ─── -thinking Suffix Auto-Injection (Feature 5) ────────────────────────────

test("ensureThinkingConfig: auto-injects for -thinking suffix model", () => {
  const body = {
    model: "claude-opus-4-6-thinking",
    messages: [{ role: "user", content: "hello" }],
  };
  const result = ensureThinkingConfig(body);
  assert.equal(result.thinking.type, "enabled");
  // Either the model's defaultThinkingBudget (when modelSpecs defines one
  // for the base model) or the EFFORT_BUDGETS.medium fallback. Both are
  // valid auto-inject outcomes.
  assert.ok(
    result.thinking.budget_tokens > 0,
    "budget_tokens should be positive after auto-inject"
  );
});

test("ensureThinkingConfig: does NOT override existing thinking config", () => {
  const body = {
    model: "claude-opus-4-6-thinking",
    thinking: { type: "enabled", budget_tokens: 50000 },
    messages: [{ role: "user", content: "hello" }],
  };
  const result = ensureThinkingConfig(body);
  assert.equal(result.thinking.budget_tokens, 50000); // preserved
});

test("ensureThinkingConfig: does nothing for non-thinking models", () => {
  const body = {
    model: "claude-sonnet-4",
    messages: [{ role: "user", content: "hello" }],
  };
  const result = ensureThinkingConfig(body);
  assert.equal(result.thinking, undefined);
});

test("hasThinkingCapableModel: matches -thinking suffix", () => {
  assert.ok(hasThinkingCapableModel({ model: "claude-opus-4-6-thinking" }));
  assert.ok(hasThinkingCapableModel({ model: "kimi-k2-thinking" }));
  assert.ok(hasThinkingCapableModel({ model: "custom-model-thinking" }));
});

test("applyThinkingBudget: thinkingLevel 'high' + PASSTHROUGH = converts and passes through", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const body = {
    model: "claude-sonnet-4",
    thinkingLevel: "high",
    messages: [{ role: "user", content: "hello" }],
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.thinking.budget_tokens, 24576);
  assert.equal(result.thinkingLevel, undefined);
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});

test("applyThinkingBudget: -thinking model without config + PASSTHROUGH = auto-inject", () => {
  setThinkingBudgetConfig({ mode: ThinkingMode.PASSTHROUGH });
  const body = {
    model: "claude-opus-4-6-thinking",
    messages: [{ role: "user", content: "hello" }],
  };
  const result = applyThinkingBudget(body);
  assert.equal(result.thinking.type, "enabled");
  assert.ok(
    result.thinking.budget_tokens > 0,
    "budget_tokens should be positive after auto-inject"
  );
  setThinkingBudgetConfig(DEFAULT_THINKING_CONFIG);
});
