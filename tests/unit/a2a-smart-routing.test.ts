/**
 * a2a-smart-routing.test.ts
 *
 * Vitest coverage for the smartRouting A2A skill. Covers the four
 * canonical strategies (cost / speed / quality / balanced), the
 * constraint paths (max-cost-exceeded, excluded providers, preferred
 * providers, unavailable candidates), the input validation paths
 * (missing prompt / missing candidate list / empty candidate list),
 * the result shape contract, and the single-candidate edge case.
 *
 * The result payload is JSON in `result.artifacts[0].content`. The
 * implementation's envelope also exposes a compact `metadata` field
 * for the orchestrator (`strategy_hint`, `recommendation`, etc.).
 */

import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { executeSmartRouting } from "@/lib/a2a/skills/smartRouting";
import type { A2ATask } from "@/lib/a2a/taskManager";

function expect<T>(actual: T) {
  return {
    toBe(expected: unknown) {
      assert.equal(actual, expected);
    },
    toBeTruthy() {
      assert.ok(actual);
    },
    toBeNull() {
      assert.equal(actual, null);
    },
    toHaveLength(expected: number) {
      assert.equal((actual as { length: number }).length, expected);
    },
    toMatch(expected: RegExp) {
      assert.match(String(actual), expected);
    },
    toBeGreaterThan(expected: number) {
      assert.ok(Number(actual) > expected);
    },
    toBeGreaterThanOrEqual(expected: number) {
      assert.ok(Number(actual) >= expected);
    },
    toBeLessThanOrEqual(expected: number) {
      assert.ok(Number(actual) <= expected);
    },
    not: {
      toBe(expected: unknown) {
        assert.notEqual(actual, expected);
      },
      toBeNull() {
        assert.notEqual(actual, null);
      },
      toThrow() {
        assert.doesNotThrow(actual as () => unknown);
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Result types — what the smart-routing skill actually emits
// ---------------------------------------------------------------------------

interface RoutingChosen {
  providerId: string;
  modelId: string;
  vendor: string;
  estimatedCostUsd: number;
  estimatedLatencyMs: number;
  qualityScore: number;
  score: number;
}

interface RoutingRunnerUp {
  providerId: string;
  modelId: string;
  vendor: string;
  estimatedCostUsd: number;
  estimatedLatencyMs: number;
  qualityScore: number;
  score: number;
  reason: string;
}

interface RoutingRubric {
  weights: { cost: number; latency: number; quality: number; preference: number };
  candidatesEvaluated: number;
  candidatesDisqualified: number;
}

interface RoutingDecision {
  chosen: RoutingChosen | null;
  runnerUp: RoutingRunnerUp[];
  recommendation: "route" | "reject";
  reason: "ok" | "no_candidates" | "exceeds_max_cost" | "all_disqualified";
  rubric: RoutingRubric;
  warnings: string[];
}

interface RoutingMetadata {
  strategy_hint: "cost" | "speed" | "quality" | "balanced";
  tokens_estimated: number;
  candidates_evaluated: number;
  candidates_disqualified: number;
  recommendation: "route" | "reject";
  reason: string;
  chosen: { provider_id: string; model_id: string; score: number } | null;
  warnings: string[];
}

// ---------------------------------------------------------------------------
// Fixture helpers
// ---------------------------------------------------------------------------

function buildTask(input: Record<string, unknown>): A2ATask {
  const now = Date.now();
  return {
    id: "t-smart-routing-test",
    skill: "smart-routing",
    state: "working",
    messages: [],
    createdAt: now,
    updatedAt: now,
    metadata: input,
  };
}

function readDecision(result: { artifacts: Array<{ content: string }> }): RoutingDecision {
  return JSON.parse(result.artifacts[0].content) as RoutingDecision;
}

function readMetadata(result: { metadata?: unknown }): RoutingMetadata {
  if (!result.metadata) {
    throw new Error("expected result.metadata to be present");
  }
  return result.metadata as RoutingMetadata;
}

function buildRequest(overrides: Record<string, unknown> = {}): A2ATask {
  const base = {
    prompt: "Summarize the following 200-word article in 3 sentences.",
    candidates: [
      {
        providerId: "openai",
        modelId: "gpt-4o",
        vendor: "openai",
        costPer1kInput: 0.0025,
        costPer1kOutput: 0.01,
        avgLatencyMs: 1100,
        qualityScore: 0.92,
        capabilities: new Set<string>(["text"]),
        available: true,
      },
      {
        providerId: "anthropic",
        modelId: "claude-3-5-sonnet",
        vendor: "anthropic",
        costPer1kInput: 0.003,
        costPer1kOutput: 0.015,
        avgLatencyMs: 1300,
        qualityScore: 0.93,
        capabilities: new Set<string>(["text"]),
        available: true,
      },
      {
        providerId: "google",
        modelId: "gemini-2.0-flash",
        vendor: "google",
        costPer1kInput: 0.0001,
        costPer1kOutput: 0.0004,
        avgLatencyMs: 700,
        qualityScore: 0.78,
        capabilities: new Set<string>(["text"]),
        available: true,
      },
    ],
    strategy_hint: "balanced",
  };
  return buildTask({ ...base, ...overrides });
}

// ---------------------------------------------------------------------------
// Strategy tests
// ---------------------------------------------------------------------------

describe("smartRouting — strategy selection", () => {
  it("balanced strategy returns a chosen model with ok recommendation", async () => {
    const result = await executeSmartRouting(buildRequest());
    const decision = readDecision(result);
    const meta = readMetadata(result);
    expect(decision.chosen).not.toBeNull();
    expect(decision.chosen!.providerId).toBeTruthy();
    expect(decision.chosen!.modelId).toBeTruthy();
    expect(decision.recommendation).toBe("route");
    expect(decision.reason).toBe("ok");
    expect(meta.strategy_hint).toBe("balanced");
    expect(decision.rubric.candidatesEvaluated).toBe(3);
  });

  it("cost strategy prefers the cheapest candidate", async () => {
    const result = await executeSmartRouting(
      buildRequest({ strategy_hint: "cost" }),
    );
    const decision = readDecision(result);
    expect(decision.chosen!.modelId).toBe("gemini-2.0-flash");
    expect(decision.chosen!.providerId).toBe("google");
    // Cost should be the lowest among ranked.
    expect(decision.chosen!.estimatedCostUsd).toBeLessThanOrEqual(
      decision.runnerUp[0]?.estimatedCostUsd ?? decision.chosen!.estimatedCostUsd,
    );
  });

  it("speed strategy prefers the lowest-latency candidate", async () => {
    const result = await executeSmartRouting(
      buildRequest({ strategy_hint: "speed" }),
    );
    const decision = readDecision(result);
    expect(decision.chosen!.modelId).toBe("gemini-2.0-flash");
    expect(decision.chosen!.estimatedLatencyMs).toBe(700);
  });

  it("quality strategy prefers the highest-quality candidate", async () => {
    const result = await executeSmartRouting(
      buildRequest({
        strategy_hint: "quality",
        // Use large token counts so the cost axis does not dominate
        // the quality axis. With a 50K-token output budget the cost
        // ratio is comparable to the quality ratio and the
        // 0.85 quality weight wins clearly.
        tokens_in: 10000,
        tokens_out: 50000,
        // Re-rank quality scores so the "quality winner" is
        // unambiguous: claude dominates gpt-4o by 0.12 and gemini by
        // 0.19. The 0.85 weight on quality yields a 0.10+ score
        // advantage that cannot be overcome by the (cost + latency)
        // axes combined.
        candidates: [
          {
            providerId: "openai",
            modelId: "gpt-4o",
            vendor: "openai",
            costPer1kInput: 0.0025,
            costPer1kOutput: 0.01,
            avgLatencyMs: 1100,
            qualityScore: 0.85,
            capabilities: new Set<string>(["text"]),
            available: true,
          },
          {
            providerId: "anthropic",
            modelId: "claude-3-5-sonnet",
            vendor: "anthropic",
            costPer1kInput: 0.003,
            costPer1kOutput: 0.015,
            avgLatencyMs: 1300,
            qualityScore: 0.97,
            capabilities: new Set<string>(["text"]),
            available: true,
          },
          {
            providerId: "google",
            modelId: "gemini-2.0-flash",
            vendor: "google",
            costPer1kInput: 0.0001,
            costPer1kOutput: 0.0004,
            avgLatencyMs: 700,
            qualityScore: 0.78,
            capabilities: new Set<string>(["text"]),
            available: true,
          },
        ],
      }),
    );
    const decision = readDecision(result);
    // claude-3-5-sonnet (0.97) > gpt-4o (0.85) > gemini-2.0-flash (0.78)
    // even though claude is the most expensive, the quality weight
    // (0.85) under "quality" strategy dominates the cost axis.
    expect(decision.chosen!.modelId).toBe("claude-3-5-sonnet");
    expect(decision.chosen!.qualityScore).toBe(0.97);
  });
});

// ---------------------------------------------------------------------------
// Constraint tests
// ---------------------------------------------------------------------------

describe("smartRouting — constraints", () => {
  it("max_cost_usd exceeded by all candidates flips to reject", async () => {
    const result = await executeSmartRouting(
      buildRequest({
        strategy_hint: "cost",
        max_cost_usd: 0.0001,
      }),
    );
    const decision = readDecision(result);
    expect(decision.recommendation).toBe("reject");
    expect(decision.reason).toBe("exceeds_max_cost");
    expect(decision.chosen).toBeNull();
  });

  it("excluded providers are removed from the cohort", async () => {
    const result = await executeSmartRouting(
      buildRequest({
        strategy_hint: "cost",
        excluded_providers: ["google"],
      }),
    );
    const decision = readDecision(result);
    expect(decision.chosen!.providerId).not.toBe("google");
    // One candidate was disqualified (google), so disqualified count
    // is 1 and the rubric records the viable cohort size.
    expect(decision.rubric.candidatesDisqualified).toBe(1);
  });

  it("preferred providers influence the rubric weights", async () => {
    const result = await executeSmartRouting(
      buildRequest({
        strategy_hint: "balanced",
        preferred_providers: ["openai"],
      }),
    );
    const decision = readDecision(result);
    // rubric.weights.preference should be > 0 when preference is part of
    // the balanced strategy.
    expect(decision.rubric.weights.preference).toBeGreaterThanOrEqual(0.1);
  });

  it("unavailable candidates are filtered out", async () => {
    const result = await executeSmartRouting(
      buildRequest({
        candidates: [
          {
            providerId: "openai",
            modelId: "gpt-4o",
            vendor: "openai",
            costPer1kInput: 0.0025,
            costPer1kOutput: 0.01,
            avgLatencyMs: 1100,
            qualityScore: 0.92,
            capabilities: new Set<string>(["text"]),
            available: false,
          },
          {
            providerId: "anthropic",
            modelId: "claude-3-5-sonnet",
            vendor: "anthropic",
            costPer1kInput: 0.003,
            costPer1kOutput: 0.015,
            avgLatencyMs: 1300,
            qualityScore: 0.93,
            capabilities: new Set<string>(["text"]),
            available: true,
          },
        ],
      }),
    );
    const decision = readDecision(result);
    expect(decision.chosen!.modelId).toBe("claude-3-5-sonnet");
    expect(decision.rubric.candidatesDisqualified).toBe(1);
    expect(decision.rubric.candidatesEvaluated).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// Validation tests
// ---------------------------------------------------------------------------

describe("smartRouting — input validation", () => {
  it("rejects an empty prompt with a missing_metadata error envelope", async () => {
    const result = await executeSmartRouting(
      buildTask({
        prompt: "",
        candidates: [
          {
            providerId: "openai",
            modelId: "gpt-4o",
            vendor: "openai",
            costPer1kInput: 0.0025,
            costPer1kOutput: 0.01,
            avgLatencyMs: 1100,
            qualityScore: 0.92,
            capabilities: new Set<string>(["text"]),
            available: true,
          },
        ],
        strategy_hint: "balanced",
      }),
    );
    // The skill emits a JSON error envelope when the prompt is missing.
    expect(result.artifacts).toHaveLength(1);
    const envelope = JSON.parse(result.artifacts[0].content) as {
      error: string;
      message: string;
    };
    expect(envelope.error).toBe("missing_metadata");
    expect(envelope.message).toMatch(/prompt/i);
  });

  it("uses DEFAULT_CANDIDATES when no candidate list is supplied", async () => {
    // When candidates is omitted, the skill falls back to the
    // DEFAULT_CANDIDATES catalog — which has 6 SOTA entries and
    // produces a valid decision.
    const result = await executeSmartRouting(
      buildTask({
        prompt: "Hello world",
        strategy_hint: "balanced",
      }),
    );
    const decision = readDecision(result);
    expect(decision.chosen).not.toBeNull();
    expect(decision.rubric.candidatesEvaluated).toBeGreaterThanOrEqual(1);
  });

  it("rejects an empty candidate list", async () => {
    const result = await executeSmartRouting(
      buildTask({
        prompt: "Hello world",
        candidates: [],
        strategy_hint: "balanced",
      }),
    );
    const decision = readDecision(result);
    expect(decision.recommendation).toBe("reject");
    expect(decision.reason).toBe("no_candidates");
    expect(decision.chosen).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Result shape tests
// ---------------------------------------------------------------------------

describe("smartRouting — result shape", () => {
  it("result has a single text artifact with JSON content", async () => {
    const result = await executeSmartRouting(buildRequest());
    expect(result.artifacts).toHaveLength(1);
    expect(result.artifacts[0].type).toBe("text");
    expect(() => JSON.parse(result.artifacts[0].content)).not.toThrow();
  });

  it("runnerUp is provided when 2+ candidates are viable", async () => {
    const result = await executeSmartRouting(buildRequest());
    const decision = readDecision(result);
    expect(decision.runnerUp.length).toBeGreaterThanOrEqual(1);
    expect(decision.runnerUp[0].reason).toBeTruthy();
  });

  it("metadata envelope exposes strategy hint, tokens, recommendation", async () => {
    const result = await executeSmartRouting(
      buildRequest({ strategy_hint: "speed" }),
    );
    const meta = readMetadata(result);
    expect(meta.strategy_hint).toBe("speed");
    expect(meta.tokens_estimated).toBeGreaterThan(0);
    expect(meta.candidates_evaluated).toBe(3);
    expect(meta.recommendation).toBe("route");
    expect(meta.chosen).not.toBeNull();
    expect(meta.chosen!.provider_id).toBeTruthy();
    expect(meta.chosen!.model_id).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Single candidate edge case
// ---------------------------------------------------------------------------

describe("smartRouting — single candidate", () => {
  it("returns the single candidate with no runnerUp", async () => {
    const result = await executeSmartRouting(
      buildTask({
        prompt: "Just one option please.",
        candidates: [
          {
            providerId: "openai",
            modelId: "gpt-4o",
            vendor: "openai",
            costPer1kInput: 0.0025,
            costPer1kOutput: 0.01,
            avgLatencyMs: 1100,
            qualityScore: 0.92,
            capabilities: new Set<string>(["text"]),
            available: true,
          },
        ],
        strategy_hint: "balanced",
      }),
    );
    const decision = readDecision(result);
    expect(decision.chosen).not.toBeNull();
    expect(decision.chosen!.modelId).toBe("gpt-4o");
    expect(decision.chosen!.providerId).toBe("openai");
    expect(decision.runnerUp).toHaveLength(0);
    expect(decision.warnings).toHaveLength(0);
  });
});
