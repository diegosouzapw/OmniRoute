// tests/unit/virtualFactory-snapshot-breaker.test.ts
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  computeSnapshotWeights,
  type VirtualAutoComboCandidate,
} from "../../open-sse/services/autoCombo/virtualFactory.ts";
import type { ScoringWeights } from "../../open-sse/services/autoCombo/scoring.ts";

describe("computeSnapshotWeights breaker and quality", () => {
  const weights: ScoringWeights = {
    quota: 0.1, health: 0.3, costInv: 0.05, latencyInv: 0.05, taskFit: 0.05, stability: 0.05,
    tierPriority: 0.05, tierAffinity: 0, specificityMatch: 0, contextAffinity: 0,
    sessionAvailability: 0.05, resetWindowAffinity: 0, connectionDensity: 0.05,
    quality: 0.1, reliability: 0,
  } as ScoringWeights;
  type BreakerMap = ReadonlyMap<string, "CLOSED" | "HALF_OPEN" | "OPEN">;
  it("OPEN scores lower than CLOSED (same quality)", () => {
    const c: VirtualAutoComboCandidate = { provider: "openai", model: "gpt-4o", modelStr: "openai/gpt-4o", connectionId: null, costPer1MTokens: 5, quality: 0.8 };
    const open: BreakerMap = new Map([["openai", "OPEN"]]);
    const closed: BreakerMap = new Map([["openai", "CLOSED"]]);
    const sOpen = computeSnapshotWeights([c], weights, open).get("openai/gpt-4o")!;
    const sClosed = computeSnapshotWeights([c], weights, closed).get("openai/gpt-4o")!;
    assert.ok(sClosed > sOpen, `closed ${sClosed} should > open ${sOpen}`);
  });
  it("HALF_OPEN is midpoint, absent breaker → neutral 0.5", () => {
    const c: VirtualAutoComboCandidate = { provider: "openai", model: "gpt-4o", modelStr: "openai/gpt-4o", connectionId: null, costPer1MTokens: 5 };
    const half: BreakerMap = new Map([["openai", "HALF_OPEN"]]);
    const sHalf = computeSnapshotWeights([c], weights, half).get("openai/gpt-4o")!;
    const sNone = computeSnapshotWeights([c], weights).get("openai/gpt-4o")!;
    const sOpen = computeSnapshotWeights([c], weights, new Map([["openai", "OPEN"]]) as BreakerMap).get("openai/gpt-4o")!;
    const sClosed = computeSnapshotWeights([c], weights, new Map([["openai", "CLOSED"]]) as BreakerMap).get("openai/gpt-4o")!;
    assert.ok(sHalf > sOpen && sHalf < sClosed);
    // absent → existing 0.5* health — between open and closed
    assert.ok(sNone > sOpen && sNone < sClosed);
  });
  it("quality cold 0.5 vs hot 0.9 discriminant when weights.quality>0", () => {
    const cold: VirtualAutoComboCandidate = { provider: "openai", model: "gpt-4o", modelStr: "openai/gpt-4o", connectionId: null, costPer1MTokens: 5, quality: undefined };
    const hot: VirtualAutoComboCandidate = { provider: "openai", model: "gpt-4o", modelStr: "openai/gpt-4o", connectionId: null, costPer1MTokens: 5, quality: 0.9 };
    const sCold = computeSnapshotWeights([cold], weights).get("openai/gpt-4o")!;
    const sHot = computeSnapshotWeights([hot], weights).get("openai/gpt-4o")!;
    assert.ok(sHot > sCold);
  });
});
