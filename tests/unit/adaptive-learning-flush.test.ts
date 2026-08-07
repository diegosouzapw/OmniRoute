/**
 * tests/unit/adaptive-learning-flush.test.ts
 *
 * PR1 adaptive learning — flush of model_learning into model_intelligence:
 *   - publishes rows that crossed MIN_SAMPLES (>= 20) with source=adaptive_learning
 *   - skips rows below the threshold
 *   - stamps expires_at = now + 7d
 *   - purges expired adaptive_learning rows
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-flush-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { recordComboAdaptationOutcome } = await import("../../src/lib/db/comboAdaptation.ts");
const { flushAdaptiveLearning, ADAPTIVE_LEARNING_SOURCE, DEFAULT_TTL_DAYS } =
  await import("../../src/lib/db/adaptiveLearning.ts");
const { getModelIntelligenceBySource, upsertModelIntelligence, listModelIntelligence } =
  await import("../../src/lib/db/modelIntelligence.ts");

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {}
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {}
});

function recordN(n: number, model: string, taskType: string): void {
  for (let i = 0; i < n; i++) {
    recordComboAdaptationOutcome("combo-f1", model, {
      success: true,
      latencyMs: 1000,
      taskType,
      firstPass: true,
    });
  }
}

test("publishes at sample_count=20 with source=adaptive_learning and TTL", () => {
  recordN(20, "ollama-local/qwen2.5-coder:7b", "coding");
  const published = flushAdaptiveLearning();
  assert.equal(published, 1, "one row crossed the MIN_SAMPLES threshold");

  const entry = getModelIntelligenceBySource(
    "ollama-local/qwen2.5-coder:7b",
    ADAPTIVE_LEARNING_SOURCE,
    "coding"
  );
  assert.ok(entry, "adaptive_learning entry published");
  assert.equal(entry.category, "coding");
  assert.equal(entry.source, ADAPTIVE_LEARNING_SOURCE);
  assert.ok(entry.score > 0.5, "learned_score reflects accumulated successes");

  assert.ok(entry.expiresAt, "expires_at set");
  const expiresMs = Date.parse(entry.expiresAt!);
  const now = Date.now();
  const ttlMs = DEFAULT_TTL_DAYS * 24 * 60 * 60 * 1000;
  const slackMs = 60 * 1000;
  assert.ok(
    Math.abs(expiresMs - (now + ttlMs)) <= slackMs,
    `expires_at ~ now + ${DEFAULT_TTL_DAYS}d (got ${(expiresMs - now) / 60000}min out)`
  );
});

test("does not publish below the threshold", () => {
  recordN(19, "ollama-local/too-early:8b", "analysis");
  flushAdaptiveLearning();
  const entry = getModelIntelligenceBySource(
    "ollama-local/too-early:8b",
    ADAPTIVE_LEARNING_SOURCE,
    "analysis"
  );
  assert.equal(entry, null, "no intelligence row for a 19-sample model");
});

test("flush purges expired adaptive_learning rows", () => {
  upsertModelIntelligence({
    model: "ollama-local/expired:latest",
    source: ADAPTIVE_LEARNING_SOURCE,
    category: "coding",
    score: 0.5,
    eloRaw: null,
    confidence: null,
    expiresAt: new Date(Date.now() - 60_000).toISOString(),
  });
  const present = listModelIntelligence({
    source: ADAPTIVE_LEARNING_SOURCE,
  }).some((entry) => entry.model === "ollama-local/expired:latest");
  assert.ok(present, "expired row present in the raw table before flush");
  flushAdaptiveLearning();
  const after = listModelIntelligence({
    source: ADAPTIVE_LEARNING_SOURCE,
  }).some((entry) => entry.model === "ollama-local/expired:latest");
  assert.equal(after, false, "expired adaptive_learning row purged");
});
