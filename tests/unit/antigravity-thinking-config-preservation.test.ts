import test from "node:test";
import assert from "node:assert/strict";
import {
  getResolvedModelCapabilities,
  supportsReasoning,
} from "../../src/lib/modelCapabilities.ts";
import { applyThinkingBudget } from "../../open-sse/services/thinkingBudget.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("antigravity reasoning capabilities: Gemini and Claude models support reasoning", () => {
  const geminiModels = [
    "antigravity/gemini-3.8-flash-high",
    "antigravity/gemini-pro-agent",
    "antigravity/gemini-3.1-pro-low",
    "antigravity/claude-sonnet-4-6",
    "antigravity/claude-opus-4-6-thinking",
  ];

  for (const modelId of geminiModels) {
    const isReasoning = supportsReasoning(modelId);
    assert.equal(isReasoning, true, `supportsReasoning should be true for ${modelId}`);

    const caps = getResolvedModelCapabilities(modelId);
    assert.equal(caps.reasoning, true, `caps.reasoning should be true for ${modelId}`);
    assert.equal(
      caps.supportsThinking,
      true,
      `caps.supportsThinking should be true for ${modelId}`
    );
  }

  // Passthrough / unlisted Gemini model should still heuristically resolve reasoning
  assert.equal(supportsReasoning("antigravity/gemini-2.5-pro"), true);
  const gemini25Caps = getResolvedModelCapabilities("antigravity/gemini-2.5-pro");
  assert.equal(gemini25Caps.reasoning, true);

  // Non-reasoning models like tab completion should return false
  assert.equal(supportsReasoning("antigravity/tab_flash_lite"), false);
  const tabCaps = getResolvedModelCapabilities("antigravity/tab_flash_lite");
  assert.equal(tabCaps.reasoning, false);
});

test("antigravity request pipeline: applyThinkingBudget preserves reasoning params", () => {
  const req: Record<string, unknown> = {
    model: "antigravity/gemini-pro-agent",
    messages: [{ role: "user", content: "Solve math problem" }],
    reasoning_effort: "max",
  };

  const processed = applyThinkingBudget(req);
  assert.equal(
    (processed as Record<string, unknown>).reasoning_effort,
    "max",
    "reasoning_effort must not be stripped"
  );
});

test("antigravity translator: translates reasoning_effort into Gemini thinkingConfig", () => {
  const inputReq = {
    model: "antigravity/gemini-pro-agent",
    messages: [{ role: "user", content: "Solve math problem" }],
    reasoning_effort: "max",
  };

  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.ANTIGRAVITY,
    "antigravity/gemini-pro-agent",
    inputReq,
    true,
    null,
    "antigravity"
  );

  const generationConfig = (
    translated as { request?: { generationConfig?: Record<string, unknown> } }
  )?.request?.generationConfig;

  assert.ok(generationConfig, "generationConfig must exist in Cloud Code envelope");
  assert.ok(
    generationConfig.thinkingConfig,
    "thinkingConfig must exist in generationConfig for Gemini reasoning models"
  );
  assert.equal(
    (generationConfig.thinkingConfig as { includeThoughts?: boolean }).includeThoughts,
    true
  );
  assert.equal(
    typeof (generationConfig.thinkingConfig as { thinkingBudget?: number }).thinkingBudget,
    "number"
  );
  assert.ok(
    (generationConfig.thinkingConfig as { thinkingBudget: number }).thinkingBudget > 0,
    "thinkingBudget should be positive"
  );
});

test("antigravity translator: Claude models bump maxOutputTokens and strip raw thinkingConfig", () => {
  const inputReq = {
    model: "antigravity/claude-sonnet-4-6",
    messages: [{ role: "user", content: "Explain quantum mechanics" }],
    reasoning_effort: "high",
  };

  const translated = translateRequest(
    FORMATS.OPENAI,
    FORMATS.ANTIGRAVITY,
    "antigravity/claude-sonnet-4-6",
    inputReq,
    true,
    null,
    "antigravity"
  );

  const generationConfig = (
    translated as { request?: { generationConfig?: Record<string, unknown> } }
  )?.request?.generationConfig;

  assert.ok(generationConfig, "generationConfig must exist in Cloud Code envelope");
  assert.equal(
    generationConfig.thinkingConfig,
    undefined,
    "raw thinkingConfig must be stripped for Claude models on Antigravity"
  );
  assert.ok(
    (generationConfig.maxOutputTokens as number) >= 16384,
    "maxOutputTokens should be preserved/bumped for Claude reasoning"
  );
});
