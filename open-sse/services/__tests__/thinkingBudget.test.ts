import { describe, it, expect, beforeEach } from "vitest";
import {
  ThinkingMode,
  EFFORT_BUDGETS,
  THINKING_LEVEL_MAP,
  setThinkingBudgetConfig,
  getThinkingBudgetConfig,
  normalizeThinkingLevel,
  ensureThinkingConfig,
  applyThinkingBudget,
  hasThinkingCapableModel,
  DEFAULT_THINKING_CONFIG,
} from "../thinkingBudget.ts";

beforeEach(() => {
  // Reset to defaults before each test
  setThinkingBudgetConfig({});
});

describe("ThinkingMode", () => {
  it("defines all 4 modes", () => {
    expect(ThinkingMode.AUTO).toBe("auto");
    expect(ThinkingMode.PASSTHROUGH).toBe("passthrough");
    expect(ThinkingMode.CUSTOM).toBe("custom");
    expect(ThinkingMode.ADAPTIVE).toBe("adaptive");
  });
});

describe("EFFORT_BUDGETS", () => {
  it("has expected levels", () => {
    expect(EFFORT_BUDGETS.none).toBe(0);
    expect(EFFORT_BUDGETS.low).toBe(1024);
    expect(EFFORT_BUDGETS.medium).toBe(10240);
    expect(EFFORT_BUDGETS.high).toBe(131072);
    expect(EFFORT_BUDGETS.max).toBe(131072);
    expect(EFFORT_BUDGETS.xhigh).toBe(131072);
  });
});

describe("THINKING_LEVEL_MAP", () => {
  it("maps all levels", () => {
    expect(THINKING_LEVEL_MAP.none).toBe(0);
    expect(THINKING_LEVEL_MAP.low).toBe(4096);
    expect(THINKING_LEVEL_MAP.medium).toBe(8192);
    expect(THINKING_LEVEL_MAP.high).toBe(24576);
    expect(THINKING_LEVEL_MAP.max).toBe(131072);
    expect(THINKING_LEVEL_MAP.xhigh).toBe(131072);
  });
});

describe("setThinkingBudgetConfig / getThinkingBudgetConfig", () => {
  it("defaults match DEFAULT_THINKING_CONFIG", () => {
    expect(getThinkingBudgetConfig()).toEqual(DEFAULT_THINKING_CONFIG);
  });

  it("partially updates config", () => {
    setThinkingBudgetConfig({ mode: ThinkingMode.CUSTOM, customBudget: 5000 });
    const cfg = getThinkingBudgetConfig();
    expect(cfg.mode).toBe("custom");
    expect(cfg.customBudget).toBe(5000);
    expect(cfg.effortLevel).toBe("medium"); // unchanged
  });

  it("set returns a copy, not a reference", () => {
    const cfg = getThinkingBudgetConfig();
    cfg.mode = ThinkingMode.AUTO;
    expect(getThinkingBudgetConfig().mode).toBe(ThinkingMode.PASSTHROUGH);
  });
});

describe("normalizeThinkingLevel", () => {
  it("returns non-object as-is", () => {
    expect(normalizeThinkingLevel(null)).toBeNull();
    expect(normalizeThinkingLevel("string")).toBe("string");
    expect(normalizeThinkingLevel(42)).toBe(42);
  });

  it("converts top-level thinkingLevel string to Claude thinking object", () => {
    const result = normalizeThinkingLevel({ model: "claude-3-5-sonnet", thinkingLevel: "high" });
    expect(result.thinking).toBeDefined();
    expect(result.thinking.type).toBe("enabled");
    expect(result.thinking.budget_tokens).toBeGreaterThan(0);
    expect(result.thinkingLevel).toBeUndefined();
  });

  it("converts top-level thinking_level string", () => {
    const result = normalizeThinkingLevel({ model: "claude-3-5-sonnet", thinking_level: "medium" });
    expect(result.thinking).toBeDefined();
    expect(result.thinking_level).toBeUndefined();
  });

  it("converts low thinkingLevel to disabled thinking", () => {
    const result = normalizeThinkingLevel({ model: "claude-3-5-sonnet", thinkingLevel: "none" });
    expect(result.thinking.type).toBe("disabled");
    expect(result.thinking.budget_tokens).toBe(0);
  });

  it("handles unknown thinkingLevel as no-op", () => {
    const result = normalizeThinkingLevel({ model: "claude-3-5-sonnet", thinkingLevel: "unknown_level" });
    expect(result.thinking).toBeUndefined();
    expect(result.thinkingLevel).toBe("unknown_level");
  });

  it("handles Gemini generationConfig.thinkingConfig.thinkingLevel", () => {
    const result = normalizeThinkingLevel({
      model: "gemini-2.0-flash",
      generationConfig: { thinkingConfig: { thinkingLevel: "high" } },
    });
    expect(result.generationConfig).toBeDefined();
    expect(result.generationConfig.thinkingConfig).toBeDefined();
    expect(result.generationConfig.thinkingConfig.thinkingBudget).toBeGreaterThan(0);
    expect(result.generationConfig.thinkingConfig.thinkingLevel).toBeUndefined();
  });

  it("handles Gemini generationConfig.thinking_config.thinkingLevel", () => {
    const result = normalizeThinkingLevel({
      model: "gemini-2.0-flash",
      generationConfig: { thinking_config: { thinkingLevel: "low" } },
    });
    expect(result.generationConfig).toBeDefined();
    expect((result.generationConfig as Record<string, unknown>).thinking_config).toBeUndefined();
    expect(result.generationConfig?.thinkingConfig?.thinkingBudget).toBeGreaterThan(0);
  });

  it("preserves other fields when normalizing", () => {
    const result = normalizeThinkingLevel({
      model: "claude-3-5-sonnet",
      messages: [{ role: "user", content: "hello" }],
      thinkingLevel: "medium",
    });
    expect(result.messages).toHaveLength(1);
    expect(result.model).toBe("claude-3-5-sonnet");
  });
});

describe("ensureThinkingConfig", () => {
  it("injects thinking config for -thinking suffix models", () => {
    const result = ensureThinkingConfig({ model: "claude-3-5-sonnet-thinking" });
    expect(result.thinking).toBeDefined();
    expect(result.thinking.type).toBe("enabled");
    expect(result.thinking.budget_tokens).toBeGreaterThan(0);
  });

  it("does not override existing thinking config", () => {
    const result = ensureThinkingConfig({
      model: "claude-3-5-sonnet-thinking",
      thinking: { type: "disabled", budget_tokens: 0 },
    });
    expect(result.thinking.type).toBe("disabled");
    expect(result.thinking.budget_tokens).toBe(0);
  });

  it("does not inject for non-thinking models", () => {
    const result = ensureThinkingConfig({ model: "claude-3-5-sonnet" });
    expect(result.thinking).toBeUndefined();
  });

  it("returns non-object as-is", () => {
    expect(ensureThinkingConfig(null)).toBeNull();
  });
});

describe("hasThinkingCapableModel", () => {
  it("detects claude models", () => {
    expect(hasThinkingCapableModel({ model: "claude-3-5-sonnet" })).toBe(true);
  });

  it("detects o-series models", () => {
    expect(hasThinkingCapableModel({ model: "o1-mini" })).toBe(true);
    expect(hasThinkingCapableModel({ model: "o3-2024-12-17" })).toBe(true);
    expect(hasThinkingCapableModel({ model: "o4-mini" })).toBe(true);
  });

  it("detects gemini models", () => {
    expect(hasThinkingCapableModel({ model: "gemini-2.0-flash" })).toBe(true);
  });

  it("detects -thinking suffix", () => {
    expect(hasThinkingCapableModel({ model: "claude-sonnet-thinking" })).toBe(true);
  });

  it("rejects non-thinking models", () => {
    expect(hasThinkingCapableModel({ model: "gpt-4o" })).toBe(false);
    expect(hasThinkingCapableModel({ model: "llama-3-70b" })).toBe(false);
  });

  it("handles empty model", () => {
    expect(hasThinkingCapableModel({})).toBe(false);
    expect(hasThinkingCapableModel({ model: "" })).toBe(false);
  });
});

describe("applyThinkingBudget — PASSTHROUGH mode", () => {
  it("returns body unchanged", () => {
    const body = { model: "claude-3-5-sonnet", messages: [{ role: "user", content: "hi" }] };
    const result = applyThinkingBudget(body, { mode: ThinkingMode.PASSTHROUGH });
    expect(result.thinking).toBeUndefined();
    expect(result).toEqual(body);
  });
});

describe("applyThinkingBudget — AUTO mode", () => {
  it("strips all thinking configuration", () => {
    const body = {
      model: "claude-3-5-sonnet",
      messages: [{ role: "user", content: "hi" }],
      thinking: { type: "enabled", budget_tokens: 10240 },
      reasoning_effort: "high",
    };
    const result = applyThinkingBudget(body, { mode: ThinkingMode.AUTO });
    expect(result.thinking).toBeUndefined();
    expect(result.reasoning_effort).toBeUndefined();
  });

  it("strips output_config.effort for Claude Code", () => {
    const result = applyThinkingBudget(
      { model: "claude-3-5-sonnet", messages: [{ role: "user", content: "hi" }], output_config: { effort: "high" } },
      { mode: ThinkingMode.AUTO }
    );
    expect(result.output_config).toBeUndefined();
  });

  it("strips Gemini thinking_config via AUTO mode", () => {
    const result = applyThinkingBudget(
      { model: "gemini-2.0-flash", generationConfig: { thinking_config: { thinking_budget: 10240 } } },
      { mode: ThinkingMode.AUTO }
    );
    expect((result.generationConfig as Record<string, unknown>)?.thinking_config).toBeUndefined();
  });
});

describe("applyThinkingBudget — CUSTOM mode", () => {
  it("sets exact budget for Claude models", () => {
    const result = applyThinkingBudget({ model: "claude-3-5-sonnet", messages: [{ role: "user", content: "hi" }] }, {
      mode: ThinkingMode.CUSTOM,
      customBudget: 5000,
    });
    expect(result.thinking).toBeDefined();
    expect(result.thinking.type).toBe("enabled");
    expect(result.thinking.budget_tokens).toBe(5000);
  });

  it("sets disabled thinking when budget is 0", () => {
    const result = applyThinkingBudget({ model: "claude-3-5-sonnet", messages: [{ role: "user", content: "hi" }] }, {
      mode: ThinkingMode.CUSTOM,
      customBudget: 0,
    });
    expect(result.thinking.type).toBe("disabled");
    expect(result.thinking.budget_tokens).toBe(0);
  });

  it("maps budget to reasoning_effort for OpenAI models", () => {
    const result = applyThinkingBudget({ model: "o3-2024-12-17", messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" }, {
      mode: ThinkingMode.CUSTOM,
      customBudget: 500,
    });
    expect(result.reasoning_effort).toBe("low");
  });

  it("maps full budget to xhigh reasoning_effort", () => {
    const result = applyThinkingBudget({ model: "o3-2024-12-17", messages: [{ role: "user", content: "hi" }], reasoning_effort: "high" }, {
      mode: ThinkingMode.CUSTOM,
      customBudget: 131072,
    });
    expect(result.reasoning_effort).toBe("xhigh");
  });

  it("handles Gemini thinking_config in CUSTOM mode", () => {
    const result = applyThinkingBudget(
      { model: "gemini-2.0-flash", generationConfig: { thinking_config: { thinking_budget: 10240 } } },
      { mode: ThinkingMode.CUSTOM, customBudget: 8000 }
    );
    expect(result.generationConfig).toBeDefined();
    expect((result.generationConfig as Record<string, unknown>).thinking_config).toBeDefined();
    expect(
      ((result.generationConfig as Record<string, unknown>).thinking_config as Record<string, unknown>).thinking_budget
    ).toBe(8000);
  });
});

describe("applyThinkingBudget — ADAPTIVE mode", () => {
  it("scales budget with message count", () => {
    const messages = Array(15).fill({ role: "user", content: "hello" });
    const result = applyThinkingBudget({ model: "claude-3-5-sonnet", messages }, {
      mode: ThinkingMode.ADAPTIVE,
      effortLevel: "medium",
    });
    expect(result.thinking).toBeDefined();
    expect(result.thinking.type).toBe("enabled");
    expect(result.thinking.budget_tokens).toBeGreaterThan(EFFORT_BUDGETS.medium);
  });

  it("scales budget with tool count", () => {
    const result = applyThinkingBudget(
      { model: "claude-3-5-sonnet", messages: [{ role: "user", content: "hello" }], tools: [{}, {}, {}, {}] },
      { mode: ThinkingMode.ADAPTIVE, effortLevel: "medium" }
    );
    expect(result.thinking.budget_tokens).toBeGreaterThan(EFFORT_BUDGETS.medium);
  });

  it("scales budget with long last message", () => {
    const result = applyThinkingBudget(
      { model: "claude-3-5-sonnet", messages: [{ role: "user", content: "x".repeat(3000) }] },
      { mode: ThinkingMode.ADAPTIVE, effortLevel: "medium" }
    );
    expect(result.thinking.budget_tokens).toBeGreaterThan(EFFORT_BUDGETS.medium);
  });

  it("uses min budget for simple requests", () => {
    const result = applyThinkingBudget(
      { model: "claude-3-5-sonnet", messages: [{ role: "user", content: "hi" }] },
      { mode: ThinkingMode.ADAPTIVE, effortLevel: "low" }
    );
    expect(result.thinking.budget_tokens).toBe(EFFORT_BUDGETS.low);
  });
});

describe("applyThinkingBudget — non-thinking models", () => {
  it("strips thinking for models that don't support reasoning", () => {
    const body = {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hi" }],
      thinking: { type: "enabled", budget_tokens: 10240 },
      reasoning_effort: "high",
    };
    const result = applyThinkingBudget(body, { mode: ThinkingMode.CUSTOM, customBudget: 8000 });
    expect(result.thinking).toBeUndefined();
    expect(result.reasoning_effort).toBeUndefined();
  });

  it("strips thinking for non-reasoning models regardless of mode", () => {
    const body = {
      model: "gpt-4o",
      thinking: { type: "enabled", budget_tokens: 10240 },
    };
    const result = applyThinkingBudget(body, { mode: ThinkingMode.PASSTHROUGH });
    expect(result.thinking).toBeUndefined();
  });
});

describe("edge cases", () => {
  it("returns non-object body as-is", () => {
    expect(applyThinkingBudget(null)).toBeNull();
    expect(applyThinkingBudget("string")).toBe("string");
    expect(applyThinkingBudget(42)).toBe(42);
  });

  it("handles missing messages array gracefully", () => {
    const result = applyThinkingBudget({ model: "claude-3-5-sonnet" }, {
      mode: ThinkingMode.ADAPTIVE,
      effortLevel: "medium",
    });
    expect(result).toBeDefined();
  });

  it("handles input field (non-messages format)", () => {
    const result = applyThinkingBudget({ model: "claude-3-5-sonnet", input: [{ role: "user", content: "hi" }] }, {
      mode: ThinkingMode.ADAPTIVE,
      effortLevel: "medium",
    });
    expect(result.thinking.budget_tokens).toBeDefined();
  });
});
