/**
 * Unit tests for INTEL_PRECEDENCE order
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-precedence-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
const mi = await import("../../../../src/lib/db/modelIntelligence.ts");
const { INTEL_PRECEDENCE } = mi;

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

function insertEntry(model: string, source: string, category: string, score: number): void {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT OR REPLACE INTO model_intelligence
     (model, source, category, score, elo_raw, confidence, synced_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, datetime('now'), ?)`
  ).run(model, source, category, score, null, null, null);
}

describe("INTEL_PRECEDENCE", () => {
  it("preserves expected order", () => {
    assert.deepStrictEqual(INTEL_PRECEDENCE, [
      "user_override",
      "arena_elo",
      "modelgrep_intel",
      "publicai_index",
      "arena_elo_external",
      "huggingface_meta",
      "models_dev_tier",
    ]);
  });
});

describe("INTEL_PRECEDENCE in SQL generation (via getModelIntelligence)", () => {
  beforeEach(() => {
    resetStorage();
  });

  it("selects highest precedence source when multiple exist", () => {
    insertEntry("claude-sonnet", "models_dev_tier", "coding", 0.1);
    insertEntry("claude-sonnet", "huggingface_meta", "coding", 0.2);
    insertEntry("claude-sonnet", "arena_elo_external", "coding", 0.3);
    insertEntry("claude-sonnet", "publicai_index", "coding", 0.4);
    insertEntry("claude-sonnet", "modelgrep_intel", "coding", 0.5);
    insertEntry("claude-sonnet", "arena_elo", "coding", 0.6);
    insertEntry("claude-sonnet", "user_override", "coding", 0.7);
    const entry = mi.getModelIntelligence("claude-sonnet", "coding");
    assert.ok(entry);
    assert.strictEqual(entry.source, "user_override");
    assert.strictEqual(entry.score, 0.7);
  });

  it("selects correct source with gaps", () => {
    insertEntry("gpt-4", "models_dev_tier", "coding", 0.1);
    insertEntry("gpt-4", "modelgrep_intel", "coding", 0.5);
    insertEntry("gpt-4", "arena_elo", "coding", 0.6);
    const entry = mi.getModelIntelligence("gpt-4", "coding");
    assert.ok(entry);
    assert.strictEqual(entry.source, "arena_elo");
  });

  it("falls to last in precedence when only it exists", () => {
    insertEntry("llama-3", "models_dev_tier", "coding", 0.3);
    const entry = mi.getModelIntelligence("llama-3", "coding");
    assert.ok(entry);
    assert.strictEqual(entry.source, "models_dev_tier");
  });
});
