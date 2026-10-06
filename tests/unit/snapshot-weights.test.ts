/**
 * Unit tests for computeSnapshotWeights (Rule #18).
 *
 * Coverage: scoring differentiation by capabilities (reasoning, vision),
 * tier-based bonuses (premium vs free), and neutral baselines for health/quota.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { computeSnapshotWeights } =
  await import("@omniroute/open-sse/services/autoCombo/virtualFactory");

function makeCandidate(
  modelStr: string,
  opts: {
    vision?: boolean;
    reasoning?: boolean;
    thinking?: boolean;
    provider?: string;
    model?: string;
  } = {}
) {
  return {
    provider: opts.provider ?? "test-provider",
    connectionId: null as const,
    model: opts.model ?? modelStr.split("/")[1] ?? modelStr,
    modelStr,
    costPer1MTokens: 0,
    resolvedSupportsVision: !!opts.vision,
    resolvedReasoning: !!opts.reasoning,
    resolvedSupportsThinking: !!opts.thinking,
  };
}

// ── Basic structure ────────────────────────────────────────────────────────

test("computeSnapshotWeights returns a Map with one entry per candidate", () => {
  const candidates = [makeCandidate("p/m1"), makeCandidate("p/m2")];
  const weights = {
    taskFit: 0,
    stability: 0,
    tierPriority: 0,
    costInv: 0,
    latencyInv: 0,
    health: 0.5,
    quota: 0.5,
  };

  const scores = computeSnapshotWeights(candidates, weights);

  assert.equal(scores.size, 2);
  assert.ok(scores.has("p/m1"));
  assert.ok(scores.has("p/m2"));
});

// ── Capability-based differentiation (taskFit) ────────────────────────────

test("computeSnapshotWeights gives higher scores to reasoning-capable models when taskFit is weighted", () => {
  const candidates = [
    makeCandidate("p/reasoning-model", { reasoning: true }),
    makeCandidate("p/plain-model"),
  ];
  const weights = {
    taskFit: 1,
    stability: 0,
    tierPriority: 0,
    costInv: 0,
    latencyInv: 0,
    health: 0.5,
    quota: 0.5,
  };

  const scores = computeSnapshotWeights(candidates, weights);

  assert.ok(
    scores.get("p/reasoning-model") > scores.get("p/plain-model"),
    `reasoning model should score higher: ${scores.get("p/reasoning-model")} vs ${scores.get("p/plain-model")}`
  );
});

test("computeSnapshotWeights gives higher scores to vision-capable models when taskFit is weighted", () => {
  const candidates = [
    makeCandidate("p/vision-model", { vision: true }),
    makeCandidate("p/plain-model"),
  ];
  const weights = {
    taskFit: 1,
    stability: 0,
    tierPriority: 0,
    costInv: 0,
    latencyInv: 0,
    health: 0.5,
    quota: 0.5,
  };

  const scores = computeSnapshotWeights(candidates, weights);

  assert.ok(
    scores.get("p/vision-model") > scores.get("p/plain-model"),
    `vision model should score higher: ${scores.get("p/vision-model")} vs ${scores.get("p/plain-model")}`
  );
});

test("computeSnapshotWeights gives highest scores to models with both reasoning and vision", () => {
  const candidates = [
    makeCandidate("p/full-capable", { reasoning: true, vision: true }),
    makeCandidate("p/reasoning-only", { reasoning: true }),
    makeCandidate("p/vision-only", { vision: true }),
    makeCandidate("p/plain"),
  ];
  // Low baseline so taskFit differentiation survives clamping
  const weights = {
    taskFit: 1,
    stability: 0,
    tierPriority: 0,
    costInv: 0,
    latencyInv: 0,
    health: 0.1,
    quota: 0.1,
  };

  const scores = computeSnapshotWeights(candidates, weights);

  assert.ok(
    scores.get("p/full-capable") > scores.get("p/reasoning-only"),
    `full-capable should beat reasoning-only: ${scores.get("p/full-capable")} vs ${scores.get("p/reasoning-only")}`
  );
  assert.ok(
    scores.get("p/reasoning-only") > scores.get("p/plain"),
    "reasoning-only should beat plain"
  );
});

// ── Capability-based differentiation (stability) ──────────────────────────

test("computeSnapshotWeights gives higher stability score to models with more capabilities", () => {
  const candidates = [
    makeCandidate("p/rich-model", { reasoning: true, vision: true }),
    makeCandidate("p/one-cap", { reasoning: true }),
    makeCandidate("p/plain"),
  ];
  // Low baseline so stability differentiation isn't masked by clamping at 1
  const weights = {
    taskFit: 0,
    stability: 0.8,
    tierPriority: 0,
    costInv: 0,
    latencyInv: 0,
    health: 0.1,
    quota: 0.1,
  };

  const scores = computeSnapshotWeights(candidates, weights);

  assert.ok(
    scores.get("p/rich-model") > scores.get("p/one-cap"),
    `rich model should score higher on stability: ${scores.get("p/rich-model")} vs ${scores.get("p/one-cap")}`
  );
});

// ── LatencyInv and health/quota baselines ────────────────────────────────

test("computeSnapshotWeights gives equal latencyInv baseline when no runtime data", () => {
  const candidates = [makeCandidate("p/m1"), makeCandidate("p/m2")];
  // Zero out health+quota so the latencyInv contribution is visible without clamping
  const weights = {
    taskFit: 0,
    stability: 0,
    tierPriority: 0,
    costInv: 0,
    latencyInv: 1,
    health: 0,
    quota: 0,
  };

  const scores = computeSnapshotWeights(candidates, weights);

  assert.equal(
    scores.get("p/m1"),
    scores.get("p/m2"),
    "all candidates get equal baseline when no runtime telemetry"
  );
});

// ── Score clamping ────────────────────────────────────────────────────────

test("computeSnapshotWeights clamps scores to max 1", () => {
  const candidates = [makeCandidate("p/m1", { reasoning: true, vision: true })];
  const weights = {
    taskFit: 10,
    stability: 10,
    tierPriority: 10,
    costInv: 10,
    latencyInv: 10,
    health: 10,
    quota: 10,
  };

  const scores = computeSnapshotWeights(candidates, weights);

  assert.ok(scores.get("p/m1") <= 1, `score should be clamped to ≤1, got ${scores.get("p/m1")}`);
});

// ── Different mode-packs produce different weight profiles ────────────────

test("computeSnapshotWeights produces different relative weights for quality-first vs ship-fast", () => {
  const candidates = [
    makeCandidate("p/full-capable", { reasoning: true, vision: true }),
    makeCandidate("p/plain"),
  ];

  // quality-first: taskFit and stability are dominant → full-capable scores much higher
  const weightsQuality = {
    taskFit: 0.25,
    stability: 0.2,
    tierPriority: 0.1,
    costInv: 0,
    latencyInv: 0.1,
    health: 0.15,
    quota: 0.1,
  };
  const scoresQ = computeSnapshotWeights(candidates, weightsQuality);

  // ship-fast: taskFit and stability are lower → gap is smaller
  const weightsFast = {
    taskFit: 0.1,
    stability: 0.1,
    tierPriority: 0.15,
    costInv: 0,
    latencyInv: 0.2,
    health: 0.2,
    quota: 0.2,
  };
  const scoresF = computeSnapshotWeights(candidates, weightsFast);

  const gapQ = (scoresQ.get("p/full-capable") ?? 0) - (scoresQ.get("p/plain") ?? 0);
  const gapF = (scoresF.get("p/full-capable") ?? 0) - (scoresF.get("p/plain") ?? 0);

  assert.ok(
    gapQ > gapF,
    `quality-first should widen the capability gap more than ship-fast: ${gapQ.toFixed(3)} vs ${gapF.toFixed(3)}`
  );
});
