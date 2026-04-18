import test from "node:test";
import assert from "node:assert/strict";

import {
  downgradeEffort,
  getModelSpec,
  isAdaptiveOnlyModel,
  isEffortSupported,
  rejectsSamplingParams,
} from "@/shared/constants/modelSpecs";

const { applyThinkingBudget, DEFAULT_THINKING_CONFIG, ensureThinkingConfig } =
  await import("../../open-sse/services/thinkingBudget.ts");
const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");
const { hasThinkingConfig } = await import("../../open-sse/services/provider.ts");

function buildMessages() {
  return [{ role: "user", content: "hello" }];
}

function buildClaudeBody(overrides = {}) {
  return {
    model: "claude-opus-4-7",
    messages: buildMessages(),
    max_tokens: 200000,
    ...overrides,
  };
}

test("modelSpecs — Opus 4.7", async (t) => {
  await t.test("getModelSpec returns the Opus 4.7 compatibility spec", () => {
    const spec = getModelSpec("claude-opus-4-7");

    assert.equal(spec?.maxOutputTokens, 128000);
    assert.equal(spec?.contextWindow, 1048576);
    assert.equal(spec?.supportsThinking, true);
  });

  await t.test("getModelSpec keeps Opus 4.6 on the expanded context window", () => {
    const spec = getModelSpec("claude-opus-4-6");

    assert.equal(spec?.maxOutputTokens, 128000);
    assert.equal(spec?.contextWindow, 1048576);
    assert.equal(spec?.supportsThinking, true);
  });

  await t.test("adaptive-only detection distinguishes Opus 4.7 from older models", () => {
    assert.equal(isAdaptiveOnlyModel("claude-opus-4-7"), true);
    assert.equal(isAdaptiveOnlyModel("claude-opus-4-6"), false);
    assert.equal(isAdaptiveOnlyModel("gemini-3-flash"), false);
  });

  await t.test("sampling param rejection only applies to Opus 4.7", () => {
    assert.equal(rejectsSamplingParams("claude-opus-4-7"), true);
    assert.equal(rejectsSamplingParams("claude-opus-4-6"), false);
  });

  await t.test("effort support and downgrade preserve 4.7 while downgrading 4.6", () => {
    assert.equal(downgradeEffort("claude-opus-4-7", "xhigh"), "xhigh");
    assert.equal(downgradeEffort("claude-opus-4-6", "xhigh"), "max");
    assert.equal(isEffortSupported("claude-opus-4-7", "xhigh"), true);
    assert.equal(isEffortSupported("claude-opus-4-6", "xhigh"), false);
  });
});

test("thinkingBudget — Opus 4.7 coercion", async (t) => {
  await t.test("Opus 4.6 reasoning_effort max still promotes to adaptive thinking", () => {
    const result = applyThinkingBudget(
      {
        model: "claude-opus-4-6",
        messages: buildMessages(),
        reasoning_effort: "max",
      },
      DEFAULT_THINKING_CONFIG
    );

    assert.deepEqual(result.thinking, { type: "adaptive" });
    assert.deepEqual(result.output_config, { effort: "max" });
  });

  await t.test("Opus 4.7 reasoning_effort max uses adaptive thinking with output_config", () => {
    const result = applyThinkingBudget(
      {
        model: "claude-opus-4-7",
        messages: buildMessages(),
        reasoning_effort: "max",
      },
      DEFAULT_THINKING_CONFIG
    );

    assert.deepEqual(result.thinking, { type: "adaptive" });
    assert.deepEqual(result.output_config, { effort: "max" });
  });

  await t.test(
    "Opus 4.7 explicit enabled thinking is coerced to adaptive without budget tokens",
    () => {
      const result = applyThinkingBudget(
        {
          model: "claude-opus-4-7",
          messages: buildMessages(),
          thinking: { type: "enabled", budget_tokens: 10000 },
        },
        DEFAULT_THINKING_CONFIG
      );

      assert.deepEqual(result.thinking, { type: "adaptive" });
      assert.deepEqual(result.output_config, { effort: "high" });
      assert.equal("budget_tokens" in result.thinking, false);
    }
  );

  await t.test("Opus 4.6 explicit enabled thinking is preserved", () => {
    const result = applyThinkingBudget(
      {
        model: "claude-opus-4-6",
        messages: buildMessages(),
        thinking: { type: "enabled", budget_tokens: 10000 },
      },
      DEFAULT_THINKING_CONFIG
    );

    assert.deepEqual(result.thinking, { type: "enabled", budget_tokens: 10000 });
    assert.equal(result.output_config, undefined);
  });

  await t.test(
    "ensureThinkingConfig injects adaptive thinking for Opus 4.7 -thinking models",
    () => {
      const result = ensureThinkingConfig({
        model: "claude-opus-4-7-thinking",
        messages: buildMessages(),
      });

      assert.deepEqual(result.thinking, { type: "adaptive" });
    }
  );

  await t.test("Opus 4.7 keeps xhigh effort in adaptive output config", () => {
    const result = applyThinkingBudget(
      {
        model: "claude-opus-4-7",
        messages: buildMessages(),
        reasoning_effort: "xhigh",
      },
      DEFAULT_THINKING_CONFIG
    );

    assert.deepEqual(result.thinking, { type: "adaptive" });
    assert.deepEqual(result.output_config, { effort: "xhigh" });
  });

  await t.test("downgradeEffort still converts xhigh to max for Opus 4.6", () => {
    assert.equal(downgradeEffort("claude-opus-4-6", "xhigh"), "max");
  });
});

test("openaiToClaudeRequest — Opus 4.7 constraints", async (t) => {
  await t.test("Opus 4.7 strips sampling params before sending to Anthropic", () => {
    const result = openaiToClaudeRequest(
      "claude-opus-4-7",
      buildClaudeBody({ temperature: 0.7, top_p: 0.9 }),
      false
    );

    assert.equal("temperature" in result, false);
    assert.equal("top_p" in result, false);
    assert.equal("top_k" in result, false);
  });

  await t.test("Opus 4.6 preserves sampling params", () => {
    const result = openaiToClaudeRequest(
      "claude-opus-4-6",
      buildClaudeBody({ model: "claude-opus-4-6", temperature: 0.7 }),
      false
    );

    assert.equal(result.temperature, 0.7);
  });

  await t.test("Opus 4.7 injects thinking.display for adaptive thinking", () => {
    const result = openaiToClaudeRequest(
      "claude-opus-4-7",
      buildClaudeBody({
        thinking: { type: "adaptive" },
        output_config: { effort: "max" },
      }),
      false
    );

    assert.deepEqual(result.thinking, { type: "adaptive", display: "summarized" });
    assert.deepEqual(result.output_config, { effort: "max" });
  });

  await t.test("Opus 4.6 does not inject thinking.display by default", () => {
    const result = openaiToClaudeRequest(
      "claude-opus-4-6",
      buildClaudeBody({ model: "claude-opus-4-6", reasoning_effort: "high" }),
      false
    );

    assert.deepEqual(result.thinking, { type: "enabled", budget_tokens: 128000 });
    assert.equal("display" in result.thinking, false);
  });

  await t.test(
    "Opus 4.7 reasoning_effort fallback uses adaptive thinking instead of enabled",
    () => {
      const result = openaiToClaudeRequest(
        "claude-opus-4-7",
        buildClaudeBody({ reasoning_effort: "high" }),
        false
      );

      assert.deepEqual(result.thinking, { type: "adaptive", display: "summarized" });
      assert.deepEqual(result.output_config, { effort: "high" });
    }
  );

  await t.test("Opus 4.6 reasoning_effort fallback preserves enabled-thinking behavior", () => {
    const result = openaiToClaudeRequest(
      "claude-opus-4-6",
      buildClaudeBody({ model: "claude-opus-4-6", reasoning_effort: "high" }),
      false
    );

    assert.deepEqual(result.thinking, { type: "enabled", budget_tokens: 128000 });
    assert.equal(result.output_config, undefined);
  });
});

test("hasThinkingConfig — adaptive support", async (t) => {
  await t.test("adaptive thinking config is detected", () => {
    assert.equal(hasThinkingConfig({ thinking: { type: "adaptive" } }), true);
  });

  await t.test("enabled thinking config is still detected", () => {
    assert.equal(hasThinkingConfig({ thinking: { type: "enabled" } }), true);
  });

  await t.test("reasoning_effort is still treated as thinking config", () => {
    assert.equal(hasThinkingConfig({ reasoning_effort: "high" }), true);
  });

  await t.test("empty requests do not report thinking config", () => {
    assert.equal(hasThinkingConfig({}), false);
  });
});
