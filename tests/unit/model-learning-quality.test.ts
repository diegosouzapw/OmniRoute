/**
 * tests/unit/model-learning-quality.test.ts
 *
 * PR1 adaptive learning — quality signals routed through recordComboAdaptationOutcome:
 *   - health (502/timeout) never pollutes the quality axis
 *   - quality failures never trigger the infra cooldown ladder
 *   - tool-call success boosts learned_score above a plain success
 *   - first-pass vs retry counting (fallbackCount 0 vs 2)
 *   - model_learning is keyed per (model, taskType); infra rows are not created
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-learning-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../src/lib/db/core.ts");
const { recordComboAdaptationOutcome, getComboAdaptationState } =
  await import("../../src/lib/db/comboAdaptation.ts");
const { getModelLearning, sampleCountToConfidence } =
  await import("../../src/lib/db/modelLearning.ts");

test.after(() => {
  try {
    core.resetDbInstance();
  } catch {}
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {}
});

test("health failure increments infra failures, leaves quality unchanged", () => {
  recordComboAdaptationOutcome("combo-q1", "ollama-local/m1", {
    success: false,
    latencyMs: 30000,
  });
  const state = getComboAdaptationState("combo-q1", "ollama-local/m1");
  assert.equal(state?.failures, 1, "infra failure counts toward health failures");
  assert.equal(state?.qualityFailures, 0, "quality counter untouched");
  assert.ok(state?.cooldownUntil, "cooldown ladder armed");
  // Infra failures must NOT create a quality-learning row.
  assert.equal(getModelLearning("ollama-local/m1", "default"), null);
});

test("quality failure bumps quality_failures but never triggers cooldown", () => {
  recordComboAdaptationOutcome("combo-q2", "ollama-local/m2", {
    success: false,
    latencyMs: 1500,
    qualityFailure: true,
    isEmptyResponse: true,
    taskType: "coding",
  });
  const state = getComboAdaptationState("combo-q2", "ollama-local/m2");
  assert.equal(state?.qualityFailures, 1);
  assert.equal(state?.emptyResponses, 1);
  assert.equal(state?.consecutiveFailures, 0, "quality failure does not extend cooldown chain");
  assert.equal(state?.cooldownUntil, null, "no cooldown armed by a quality failure");
  const learning = getModelLearning("ollama-local/m2", "coding");
  assert.ok(learning, "quality failure is a quality sample");
  assert.equal(learning.qualityFailures, 1);
  assert.equal(learning.emptyResponses, 1);
  assert.ok(learning.learnedScore < 0.5, "empty response drags learned_score down");
});

test("tool-call success scores higher than a plain success", () => {
  recordComboAdaptationOutcome("combo-q3", "ollama-local/with-tools", {
    success: true,
    latencyMs: 2000,
    taskType: "coding",
    hasTools: true,
    toolCallSucceeded: true,
    firstPass: true,
  });
  recordComboAdaptationOutcome("combo-q3", "ollama-local/plain", {
    success: true,
    latencyMs: 2000,
    taskType: "coding",
    firstPass: true,
  });
  const withTools = getModelLearning("ollama-local/with-tools", "coding");
  const plain = getModelLearning("ollama-local/plain", "coding");
  assert.ok(withTools && plain, "both rows created");
  assert.ok(
    withTools.learnedScore > plain.learnedScore,
    `tool-call bonus: ${withTools.learnedScore} > ${plain.learnedScore}`
  );
  assert.equal(withTools.toolCalls, 1);
  assert.equal(withTools.toolCallSuccesses, 1);
});

test("first-pass counts only the first attempt; retries add to total only", () => {
  recordComboAdaptationOutcome("combo-q4", "ollama-local/m4", {
    success: true,
    latencyMs: 1000,
    taskType: "coding",
    firstPass: true,
  });
  recordComboAdaptationOutcome("combo-q4", "ollama-local/m4", {
    success: true,
    latencyMs: 2500,
    taskType: "coding",
    firstPass: false,
  });
  const state = getComboAdaptationState("combo-q4", "ollama-local/m4");
  assert.equal(state?.firstPassSuccesses, 1, "only the first-pass success counted");
  assert.equal(state?.firstPassTotal, 2, "total counts every successful request");
  const learning = getModelLearning("ollama-local/m4", "coding");
  assert.equal(learning?.firstPassSuccesses, 1);
  assert.equal(learning?.firstPassTotal, 2);
});

test("model_learning is keyed per (model, taskType), confidence ladder applies", () => {
  recordComboAdaptationOutcome("combo-q5", "ollama-local/m5", {
    success: true,
    latencyMs: 500,
    taskType: "coding",
  });
  recordComboAdaptationOutcome("combo-q5", "ollama-local/m5", {
    success: true,
    latencyMs: 500,
    taskType: "documentation",
  });
  const coding = getModelLearning("ollama-local/m5", "coding");
  const docs = getModelLearning("ollama-local/m5", "documentation");
  assert.ok(coding && docs, "one row per task type");
  assert.equal(coding.taskType, "coding");
  assert.equal(docs.taskType, "documentation");

  assert.equal(sampleCountToConfidence(19), 0);
  assert.equal(sampleCountToConfidence(20), 0.5);
  assert.equal(sampleCountToConfidence(50), 0.8);
  assert.equal(sampleCountToConfidence(100), 1.0);
});
