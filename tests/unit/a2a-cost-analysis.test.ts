/**
 * Tests for the cost-analysis A2A skill.
 *
 * Verifies:
 *  - Missing metadata returns a structured error artifact.
 *  - Real provider/model pricing is resolved and a non-zero cost is computed.
 *  - Budget cap flips recommendation to "switch_model" when a fallback is supplied.
 *  - Budget cap falls back to "estimate_only" when no fallback is supplied.
 *  - Token-counts estimate heuristic runs when `tokens` is omitted.
 *  - Unknown provider/model returns a warning and cost = 0.
 */

import { describe, expect, it } from "vitest";
import { executeCostAnalysis } from "@/lib/a2a/skills/costAnalysis";
import { getPricingForModel } from "@/shared/constants/pricing";
import type { A2ATask } from "@/lib/a2a/taskManager";

function makeTask(metadata: Record<string, unknown> | undefined, messages: A2ATask["messages"] = []): A2ATask {
  return {
    id: "test-task",
    skill: "cost-analysis",
    messages,
    metadata,
    state: "working",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}

function parseArtifact(result: Awaited<ReturnType<typeof executeCostAnalysis>>) {
  expect(result.artifacts).toHaveLength(1);
  expect(result.artifacts[0].type).toBe("text");
  return JSON.parse(result.artifacts[0].content);
}

describe("costAnalysis A2A skill", () => {
  it("returns a structured error when provider/model are missing", async () => {
    const result = await executeCostAnalysis(makeTask(undefined));
    const payload = parseArtifact(result);
    expect(payload.error).toBe("missing_metadata");
    expect(payload.message).toMatch(/provider.*model/);
  });

  it("computes a non-zero cost for a known provider/model with explicit tokens", async () => {
    const sanity = getPricingForModel("anthropic", "claude-opus-4");
    expect(sanity).not.toBeNull();

    const result = await executeCostAnalysis(
      makeTask({
        provider: "anthropic",
        model: "claude-opus-4",
        tokens: {
          prompt_tokens: 1000,
          completion_tokens: 500,
        },
      }),
    );
    const payload = parseArtifact(result);

    expect(payload.provider).toBe("anthropic");
    expect(payload.model).toBe("claude-opus-4");
    expect(payload.tokens.input).toBe(1000);
    expect(payload.tokens.output).toBe(500);
    expect(payload.cost_usd).toBeGreaterThan(0);
    expect(payload.over_budget).toBe(false);
    expect(payload.recommendation).toBe("proceed");
    expect(payload.warnings).toEqual([]);
    expect(result.metadata?.cost_usd).toBeCloseTo(payload.cost_usd);
  });

  it("flips recommendation to switch_model when over budget and a fallback is supplied", async () => {
    const result = await executeCostAnalysis(
      makeTask({
        provider: "anthropic",
        model: "claude-opus-4",
        tokens: {
          prompt_tokens: 1_000_000,
          completion_tokens: 500_000,
        },
        // way too low for 1.5M tokens on Opus 4
        budget_usd: 0.001,
        fallback_models: ["claude-sonnet-4", "claude-haiku-3"],
      }),
    );
    const payload = parseArtifact(result);

    expect(payload.cost_usd).toBeGreaterThan(payload.budget_usd);
    expect(payload.over_budget).toBe(true);
    expect(payload.recommendation.action).toBe("switch_model");
    expect(payload.recommendation.suggested).toBe("claude-sonnet-4");
    expect(payload.recommendation.reason).toMatch(/exceeds budget/);
  });

  it("flips recommendation to estimate_only when over budget with no fallbacks", async () => {
    const result = await executeCostAnalysis(
      makeTask({
        provider: "anthropic",
        model: "claude-opus-4",
        tokens: {
          prompt_tokens: 1_000_000,
          completion_tokens: 500_000,
        },
        budget_usd: 0.001,
      }),
    );
    const payload = parseArtifact(result);

    expect(payload.over_budget).toBe(true);
    expect(payload.recommendation.action).toBe("estimate_only");
  });

  it("estimates tokens from messages when tokens is omitted", async () => {
    const messages: A2ATask["messages"] = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "a".repeat(4000) }, // 4000 chars => ~1000 tokens
    ];
    const result = await executeCostAnalysis(
      makeTask({ provider: "anthropic", model: "claude-opus-4" }, messages),
    );
    const payload = parseArtifact(result);

    expect(payload.tokens.input).toBe(1000);
    expect(payload.tokens.output).toBe(500);
    expect(payload.warnings.some((w: string) => w.includes("4 chars/token"))).toBe(true);
    expect(payload.cost_usd).toBeGreaterThan(0);
  });

  it("returns cost 0 with a warning when the provider/model is unknown", async () => {
    const result = await executeCostAnalysis(
      makeTask({
        provider: "fictional-vendor",
        model: "mystery-1",
        tokens: { prompt_tokens: 100, completion_tokens: 100 },
      }),
    );
    const payload = parseArtifact(result);

    expect(payload.cost_usd).toBe(0);
    expect(payload.pricing).toBeNull();
    expect(payload.warnings.some((w: string) => w.includes("No pricing entry"))).toBe(true);
  });

  it("accepts legacy token field names (input_tokens/output_tokens)", async () => {
    const result = await executeCostAnalysis(
      makeTask({
        provider: "anthropic",
        model: "claude-opus-4",
        tokens: { input_tokens: 1000, output_tokens: 500 },
      }),
    );
    const payload = parseArtifact(result);

    expect(payload.tokens.input).toBe(1000);
    expect(payload.tokens.output).toBe(500);
    expect(payload.cost_usd).toBeGreaterThan(0);
  });

  it("includes cached and reasoning tokens in the cost computation", async () => {
    const plain = await executeCostAnalysis(
      makeTask({
        provider: "anthropic",
        model: "claude-opus-4",
        tokens: { prompt_tokens: 1000, completion_tokens: 500 },
      }),
    );
    const cached = await executeCostAnalysis(
      makeTask({
        provider: "anthropic",
        model: "claude-opus-4",
        tokens: {
          prompt_tokens: 1000,
          completion_tokens: 500,
          cached_tokens: 800, // most input is cached → much cheaper
        },
      }),
    );
    const plainCost = parseArtifact(plain).cost_usd;
    const cachedCost = parseArtifact(cached).cost_usd;

    expect(cachedCost).toBeLessThan(plainCost);
  });
});