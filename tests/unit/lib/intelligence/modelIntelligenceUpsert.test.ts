/**
 * Unit tests for modelIntelligence upsert round-trip
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-miupsert-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const mi = await import("../../../../src/lib/db/modelIntelligence.ts");

function resetStorage(): void {
  core.resetDbInstance();
  try {
    if (fs.existsSync(TEST_DATA_DIR)) {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  } catch {
    /* EBUSY */
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

describe("modelIntelligence upsert round-trip", () => {
  beforeEach(() => {
    resetStorage();
  });

  it("upserts with canonical_id/source_id/match_confidence", () => {
    mi.upsertModelIntelligence({
      model: "claude-3.5-sonnet",
      source: "modelgrep_intel",
      category: "coding",
      score: 0.85,
      eloRaw: null,
      confidence: "med",
      expiresAt: null,
      canonicalId: "claude-3.5-sonnet",
      sourceId: "claude-3.5-sonnet",
      matchConfidence: 0.9,
    });

    const entry = mi.getModelIntelligenceBySource("claude-3.5-sonnet", "modelgrep_intel", "coding");
    assert.ok(entry);
    assert.strictEqual(entry.model, "claude-3.5-sonnet");
    assert.strictEqual(entry.source, "modelgrep_intel");
    assert.strictEqual(entry.category, "coding");
    assert.strictEqual(entry.score, 0.85);
    assert.strictEqual(entry.canonicalId, "claude-3.5-sonnet");
    assert.strictEqual(entry.sourceId, "claude-3.5-sonnet");
    assert.strictEqual(entry.matchConfidence, 0.9);
  });

  it("round-trips for all 7 categories", () => {
    const categories = ["coding", "review", "planning", "analysis", "debugging", "documentation", "default"];
    for (const cat of categories) {
      mi.upsertModelIntelligence({
        model: "gpt-4",
        source: "publicai_index",
        category: cat,
        score: 0.75,
        eloRaw: null,
        confidence: null,
        expiresAt: null,
        canonicalId: "gpt-4",
        sourceId: "gpt-4",
        matchConfidence: 0.9,
      });
      const entry = mi.getModelIntelligenceBySource("gpt-4", "publicai_index", cat);
      assert.ok(entry);
      assert.strictEqual(entry.category, cat);
      assert.strictEqual(entry.score, 0.75);
    }
  });

  it("bulk upsert via individual upserts preserves all fields", () => {
    const rows = [
      { model: "model1", source: "arena_elo_external", category: "coding", score: 0.8, canonicalId: "model1", sourceId: "model1", matchConfidence: 0.95, eloRaw: 1300 },
      { model: "model1", source: "arena_elo_external", category: "analysis", score: 0.82, canonicalId: "model1", sourceId: "model1", matchConfidence: 0.95, eloRaw: 1300 },
    ];
    for (const r of rows) {
      mi.upsertModelIntelligence({ ...r, confidence: null, expiresAt: null } as any);
    }
    const coding = mi.getModelIntelligenceBySource("model1", "arena_elo_external", "coding");
    const analysis = mi.getModelIntelligenceBySource("model1", "arena_elo_external", "analysis");
    assert.ok(coding && analysis);
    assert.strictEqual(coding.score, 0.8);
    assert.strictEqual(analysis.score, 0.82);
  });
});
