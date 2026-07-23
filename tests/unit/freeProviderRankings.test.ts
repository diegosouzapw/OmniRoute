/**
 * Unit tests for src/lib/freeProviderRankings.ts
 *
 * Tests exported pure functions (stripVersionSuffix, findMatchingIntelligence)
 * that don't require DB or module mocking.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { stripVersionSuffix, findMatchingIntelligence } =
  await import("../../src/lib/freeProviderRankings.ts");

type IntelEntry = {
  score: number;
  eloRaw: number | null;
  confidence: string | null;
  category: string;
};

function e(
  score: number,
  category = "default",
  eloRaw: number | null = null,
  confidence: string | null = "high"
): IntelEntry {
  return { score, eloRaw, confidence, category };
}

function buildMap(entries: Record<string, IntelEntry[]>): Map<string, IntelEntry[]> {
  const map = new Map<string, IntelEntry[]>();
  for (const [key, vals] of Object.entries(entries)) {
    map.set(key, vals);
  }
  return map;
}

describe("stripVersionSuffix", () => {
  it("strips trailing .N from kimi-k2.6", () => {
    assert.equal(stripVersionSuffix("kimi-k2.6"), "kimi-k2");
  });

  it("strips trailing .N from gpt-5.5", () => {
    assert.equal(stripVersionSuffix("gpt-5.5"), "gpt-5");
  });

  it("strips multi-segment .N.N from model-1.2.3", () => {
    assert.equal(stripVersionSuffix("model-1.2.3"), "model-1");
  });

  it("does not strip dash-separated names like claude-sonnet-4-5", () => {
    assert.equal(stripVersionSuffix("claude-sonnet-4-5"), "claude-sonnet-4-5");
  });

  it("returns unchanged for short names", () => {
    assert.equal(stripVersionSuffix("gpt"), "gpt");
  });
});

describe("findMatchingIntelligence", () => {
  it("exact match returns highest score entry", () => {
    const map = buildMap({ "gpt-5": [e(0.8), e(0.95)] });
    const result = findMatchingIntelligence("gpt-5", map);
    assert.ok(result);
    assert.equal(result.score, 0.95);
  });

  it("exact match is case-insensitive", () => {
    const map = buildMap({ "gpt-5": [e(0.9)] });
    const result = findMatchingIntelligence("GPT-5", map);
    assert.ok(result);
    assert.equal(result.score, 0.9);
  });

  it("version suffix fuzzy: kimi-k2.6 matches kimi-k2", () => {
    const map = buildMap({ "kimi-k2": [e(0.88)] });
    const result = findMatchingIntelligence("kimi-k2.6", map);
    assert.ok(result);
    assert.equal(result.score, 0.88);
  });

  it("version suffix fuzzy: gpt-5.5 matches gpt-5", () => {
    const map = buildMap({ "gpt-5": [e(0.92)] });
    const result = findMatchingIntelligence("gpt-5.5", map);
    assert.ok(result);
    assert.equal(result.score, 0.92);
  });

  it("prefix match: claude-sonnet-4-5 matches claude-sonnet-4", () => {
    const map = buildMap({ "claude-sonnet-4": [e(0.85)] });
    const result = findMatchingIntelligence("claude-sonnet-4-5", map);
    assert.ok(result);
    assert.equal(result.score, 0.85);
  });

  it("returns null when no match", () => {
    const map = buildMap({ "gpt-5": [e(0.9)] });
    assert.equal(findMatchingIntelligence("unknown-model", map), null);
  });

  it("returns null for empty map", () => {
    assert.equal(findMatchingIntelligence("gpt-5", new Map()), null);
  });

  it("prefers exact match over prefix match", () => {
    const map = buildMap({
      "claude-sonnet-4-5": [e(0.95)],
      "claude-sonnet-4": [e(0.7)],
    });
    const result = findMatchingIntelligence("claude-sonnet-4-5", map);
    assert.ok(result);
    assert.equal(result.score, 0.95);
  });

  it("version match wins over prefix match", () => {
    const map = buildMap({
      "kimi-k2": [e(0.9)],
      kimi: [e(0.5)],
    });
    const result = findMatchingIntelligence("kimi-k2.6", map);
    assert.ok(result);
    assert.equal(result.score, 0.9);
  });

  it("preserves category, eloRaw, confidence from matched entry", () => {
    const map = buildMap({ "gpt-5": [e(0.9, "coding", 1400, "high")] });
    const result = findMatchingIntelligence("gpt-5", map);
    assert.ok(result);
    assert.equal(result.category, "coding");
    assert.equal(result.eloRaw, 1400);
    assert.equal(result.confidence, "high");
  });

  it("prefix match picks highest-scoring candidate", () => {
    const map = buildMap({
      gpt: [e(0.6)],
      "gpt-4": [e(0.8)],
    });
    const result = findMatchingIntelligence("gpt-4.1", map);
    assert.ok(result);
    assert.equal(result.score, 0.8);
  });
});
