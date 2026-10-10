import test from "node:test";
import assert from "node:assert/strict";

import { getModelPricing } from "../../open-sse/services/providerCostData.ts";
import { CLAUDE_HAIKU_5_PRICING } from "../../src/shared/constants/pricing/shared-tiers.ts";
import {
  getModelsByProviderId,
  supportsClaudeMaxEffort,
} from "../../open-sse/config/providerModels.ts";
import { getNextFamilyFallback } from "../../open-sse/services/modelFamilyFallback.ts";
import { getDefaultPricing } from "../../src/shared/constants/pricing.ts";
import { getModelSpec } from "../../src/shared/constants/modelSpecs.ts";
import { normalizeClaudeHaikuConstraints } from "../../open-sse/services/claudeHaikuConstraints.ts";
import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";

const MODEL_ID = "claude-haiku-5-5";

test("Claude Haiku 5.5 is adaptive-only and preserves adaptive thinking", () => {
  const spec = getModelSpec(MODEL_ID);
  assert.equal(spec?.contextWindow, 1_000_000);
  assert.equal(spec?.maxOutputTokens, 128_000);
  assert.equal(spec?.adaptiveThinkingOnly, true);

  const input = {
    model: MODEL_ID,
    thinking: { type: "adaptive" },
    output_config: { effort: "high" },
  };
  const out = normalizeClaudeHaikuConstraints(input, input.model);
  assert.strictEqual(out, input);
  assert.deepEqual(out.thinking, { type: "adaptive" });
  assert.deepEqual(out.output_config, { effort: "high" });
});

test("Claude Haiku 5.5 does not support max effort", () => {
  assert.equal(supportsClaudeMaxEffort(MODEL_ID), false);
  assert.equal(supportsClaudeMaxEffort(`claude/${MODEL_ID}`), false);
});

test("Claude Haiku 5.5 is priced at the eco rate", () => {
  const pricing = getModelPricing("claude", MODEL_ID);
  assert.equal(pricing?.inputCostPer1M, 1);
  assert.equal(pricing?.outputCostPer1M, 5);
  assert.equal(CLAUDE_HAIKU_5_PRICING.input, 1);
  assert.equal(CLAUDE_HAIKU_5_PRICING.output, 5);
  assert.equal(CLAUDE_HAIKU_5_PRICING.cached, 0.1);
  assert.equal(CLAUDE_HAIKU_5_PRICING.cache_creation, 1.25);

  const anthropic = (getDefaultPricing() as Record<string, Record<string, { input: number }>>)
    .anthropic[MODEL_ID];
  assert.equal(anthropic.input, 1);
});

test("Claude Haiku 5.5 is registered on first-party and cloud providers", () => {
  for (const providerId of [
    "claude",
    "claude-web",
    "anthropic",
    "vertex",
    "vertex-partner",
    "bedrock",
  ]) {
    const ids = new Set(getModelsByProviderId(providerId).map((entry) => entry.id));
    const targetId = providerId === "bedrock" ? "anthropic.claude-haiku-5-5" : MODEL_ID;
    assert.ok(ids.has(targetId), `${providerId} must expose ${targetId}`);
  }

  const claude = getModelsByProviderId("claude").find((entry) => entry.id === MODEL_ID);
  assert.deepEqual(claude?.supportedThinkingEfforts, ["low", "medium", "high", "xhigh"]);
  assert.equal(
    getNextFamilyFallback(`claude/${MODEL_ID}`, new Set()),
    "claude/claude-haiku-4-5-20251001"
  );
  assert.equal(
    getNextFamilyFallback(`anthropic/${MODEL_ID}`, new Set()),
    "anthropic/claude-haiku-4.5"
  );
});

test("Claude Haiku 5.5 is exposed in static provider models", () => {
  const staticClaude = getStaticModelsForProvider("claude");
  assert.ok(staticClaude.some((entry) => entry.id === MODEL_ID));
});
