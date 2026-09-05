// tests/unit/virtualFactory-snapshot-quality.test.ts
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  computeSnapshotWeights,
  type VirtualAutoComboCandidate,
} from "../../open-sse/services/autoCombo/virtualFactory.ts";
import type { ScoringWeights } from "../../open-sse/services/autoCombo/scoring.ts";
import { createModelCapabilityResolutionSnapshot } from "../../src/lib/modelCapabilities.ts";

describe("virtualFactory snapshot quality", () => {
  it("factory-built candidate carries finite quality (attach path, both pools)", async () => {
    // Exercises the REAL hydration path: push a raw candidate through
    // attachPreparedCapabilityValues:547-598 (covers regular + family pools —
    // both go through attach, so one call proves both).
    const { attachPreparedCapabilityValues } = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
    const raw: VirtualAutoComboCandidate[] = [{ provider: "openai", model: "gpt-4o", modelStr: "openai/gpt-4o", connectionId: null, costPer1MTokens: 5 }];
    const state = { byTarget: new Map(), resolvedSinceYield: 0, resolutionSnapshot: createModelCapabilityResolutionSnapshot() };
    const out = await attachPreparedCapabilityValues(raw, state);
    const q = out[0]?.quality;
    assert.ok(typeof q === "number" && Number.isFinite(q) && q >= 0 && q <= 1, `quality ${q} must be finite 0..1`);
  });
  it("hot quality outranks cold through computeSnapshotWeights", () => {
    const weights = { quota: 0.1, health: 0.1, quality: 0.3, taskFit: 0, stability: 0, tierPriority: 0, costInv: 0, latencyInv: 0 } as ScoringWeights;
    const cold: VirtualAutoComboCandidate = { provider: "openai", model: "gpt-4o", modelStr: "openai/gpt-4o", connectionId: null, costPer1MTokens: 5, quality: 0.5 };
    const hot: VirtualAutoComboCandidate = { provider: "openai", model: "gpt-4o", modelStr: "openai/gpt-4o", connectionId: null, costPer1MTokens: 5, quality: 0.9 };
    const sCold = computeSnapshotWeights([cold], weights).get("openai/gpt-4o")!;
    const sHot = computeSnapshotWeights([hot], weights).get("openai/gpt-4o")!;
    assert.ok(sHot > sCold, `hot ${sHot} should exceed cold ${sCold}`);
  });
  it("hydration stores a finite 0..1 quality (not NaN)", async () => {
    const { getQualityScore } = await import("../../open-sse/services/routing/quality.ts");
    const q = getQualityScore("openai", "gpt-4o");
    assert.ok(typeof q === "number" && Number.isFinite(q) && q >= 0 && q <= 1);
  });
});
