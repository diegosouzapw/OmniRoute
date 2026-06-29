import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  formatCompressionAnnotation,
  formatCompressionMeta,
} from "../../../open-sse/services/compression/planResolution.ts";
import type { CompressionStats } from "../../../open-sse/services/compression/types.ts";

function makeStats(overrides: Partial<CompressionStats> = {}): CompressionStats {
  return {
    originalTokens: 847,
    compressedTokens: 312,
    savingsPercent: 63.16,
    techniquesUsed: ["caveman"],
    mode: "standard",
    timestamp: 0,
    ...overrides,
  };
}

describe("formatCompressionAnnotation", () => {
  it("returns empty string when no rulesApplied and no techniquesUsed", () => {
    const stats = makeStats({ rulesApplied: [], techniquesUsed: [] });
    assert.equal(formatCompressionAnnotation(stats), "");
  });

  it("returns empty string when rulesApplied is absent", () => {
    const stats = makeStats({ rulesApplied: undefined, techniquesUsed: [] });
    assert.equal(formatCompressionAnnotation(stats), "");
  });

  it("aggregates rulesApplied counts deterministically", () => {
    const stats = makeStats({
      rulesApplied: ["filler", "filler", "filler", "filler", "filler", "filler", "filler", "filler", "dedup", "dedup"],
      techniquesUsed: ["caveman"],
    });
    const result = formatCompressionAnnotation(stats);
    assert.ok(result.includes("tokens=847→312"), `missing token range in: ${result}`);
    assert.ok(result.includes("filler×8"), `missing filler×8 in: ${result}`);
    assert.ok(result.includes("dedup×2"), `missing dedup×2 in: ${result}`);
  });

  it("orders rule counts descending by count", () => {
    const stats = makeStats({
      rulesApplied: ["dedup", "filler", "filler", "filler"],
      techniquesUsed: [],
    });
    const result = formatCompressionAnnotation(stats);
    const fillerIdx = result.indexOf("filler×3");
    const dedupIdx = result.indexOf("dedup×1");
    assert.ok(fillerIdx < dedupIdx, `filler (count=3) should appear before dedup (count=1): ${result}`);
  });

  it("is deterministic (same input → same output)", () => {
    const stats = makeStats({
      rulesApplied: ["filler", "dedup", "filler"],
      techniquesUsed: [],
    });
    assert.equal(formatCompressionAnnotation(stats), formatCompressionAnnotation(stats));
  });

  it("prefix mode; source=X is never mutated by appending the annotation", () => {
    const plan = { mode: "standard" as const, stackedPipeline: [], source: "auto" as const };
    const prefix = formatCompressionMeta(plan);
    assert.equal(prefix, "standard; source=auto");

    const stats = makeStats({ rulesApplied: ["filler", "dedup"], techniquesUsed: [] });
    const annotation = formatCompressionAnnotation(stats);
    const combined = `${prefix}; ${annotation}`;
    assert.ok(combined.startsWith("standard; source=auto"), `prefix mutated: ${combined}`);
  });
});
