import test from "node:test";
import assert from "node:assert/strict";

import { getModelPricing } from "../../open-sse/services/providerCostData.ts";
import { CLAUDE_SONNET_5_PRICING } from "../../src/shared/constants/pricing/shared-tiers.ts";
import {
  getModelsByProviderId,
  supportsClaudeMaxEffort,
} from "../../open-sse/config/providerModels.ts";
import { modelSupportsContext1mBeta } from "../../open-sse/config/context1m.ts";
import { getNextFamilyFallback } from "../../open-sse/services/modelFamilyFallback.ts";
import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";
import {
  getModelSpec,
  normalizeForcedToolChoiceForModel,
  normalizeThinkingForModel,
} from "../../src/shared/constants/modelSpecs.ts";

const MODEL_ID = "claude-sonnet-5-5";

test("Claude Sonnet 5.5 rejects disabled thinking and forced tool choice", () => {
  const spec = getModelSpec(MODEL_ID);
  assert.equal(spec?.contextWindow, 1_000_000);
  assert.equal(spec?.maxOutputTokens, 128_000);
  assert.equal(spec?.adaptiveThinkingOnly, true);
  assert.equal(spec?.rejectsThinkingDisabled, true);
  assert.equal(spec?.rejectsForcedToolChoice, true);

  const withoutDisabled = normalizeThinkingForModel(
    { model: MODEL_ID, thinking: { type: "disabled" }, marker: true },
    MODEL_ID
  );
  assert.equal("thinking" in withoutDisabled, false);
  assert.equal(withoutDisabled.marker, true);

  for (const toolChoice of [
    "required",
    "any",
    { type: "any" },
    { type: "tool", name: "read_file" },
  ]) {
    const tools = [{ name: "read_file" }];
    const relaxed = normalizeForcedToolChoiceForModel(
      { model: MODEL_ID, tools, tool_choice: toolChoice },
      MODEL_ID
    );
    assert.equal("tool_choice" in relaxed, false, JSON.stringify(toolChoice));
    assert.deepEqual(relaxed.tools, tools);
  }

  const kept = normalizeForcedToolChoiceForModel(
    { model: MODEL_ID, tool_choice: { type: "auto" } },
    MODEL_ID
  );
  assert.deepEqual(kept.tool_choice, { type: "auto" });
});

test("Claude Sonnet 5 still accepts disabled thinking", () => {
  const spec = getModelSpec("claude-sonnet-5");
  assert.notEqual(spec?.rejectsThinkingDisabled, true);

  const kept = normalizeThinkingForModel(
    { model: "claude-sonnet-5", thinking: { type: "disabled" } },
    "claude-sonnet-5"
  );
  assert.deepEqual(kept.thinking, { type: "disabled" });
});

test("Claude Sonnet 5.5 caps effort at xhigh", () => {
  assert.equal(supportsClaudeMaxEffort(MODEL_ID), false);
  assert.equal(supportsClaudeMaxEffort("claude/claude-sonnet-5-5"), false);
  assert.equal(supportsClaudeMaxEffort("claude-sonnet-5"), true);
});

test("Claude Sonnet 5.5 is priced at the published rate", () => {
  const pricing = getModelPricing("claude", MODEL_ID);
  assert.equal(pricing?.inputCostPer1M, 2);
  assert.equal(pricing?.outputCostPer1M, 10);
  assert.equal(CLAUDE_SONNET_5_PRICING.input, 2);
  assert.equal(CLAUDE_SONNET_5_PRICING.output, 10);
  assert.equal(CLAUDE_SONNET_5_PRICING.cached, 0.2);
  assert.equal(CLAUDE_SONNET_5_PRICING.cache_creation, 2.5);

  const anthropic = (getDefaultPricing() as Record<string, Record<string, { input: number }>>)
    .anthropic[MODEL_ID];
  assert.equal(anthropic.input, 2);
});

test("Claude Sonnet 5.5 is registered on the first-party providers", () => {
  for (const providerId of ["claude", "anthropic", "vertex", "vertex-partner", "github"]) {
    const ids = new Set(getModelsByProviderId(providerId).map((entry) => entry.id));
    assert.ok(ids.has(MODEL_ID), `${providerId} must expose ${MODEL_ID}`);
  }
  const claude = getModelsByProviderId("claude").find((entry) => entry.id === MODEL_ID);
  assert.deepEqual(claude?.supportedThinkingEfforts, ["low", "medium", "high", "xhigh"]);
  assert.equal(modelSupportsContext1mBeta(MODEL_ID), true);
  assert.equal(getNextFamilyFallback(`claude/${MODEL_ID}`, new Set()), "claude/claude-sonnet-5");
});
