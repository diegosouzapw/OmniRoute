import test from "node:test";
import assert from "node:assert/strict";

import {
  compareRouterEvalRuns,
  createRouterEvalArtifact,
  runRouterEval,
  toRouterObservation,
} from "@/lib/routerEval/index.ts";

function obs(overrides: Record<string, unknown>) {
  return toRouterObservation({
    sampleId: "sample-1",
    configId: "config",
    selectedModel: "gpt-4.1",
    expectedModel: "gpt-4.1",
    latencyMs: 120,
    costUsd: 0.05,
    success: true,
    timestamp: "2026-01-01T00:00:00.000Z",
    ...overrides,
  })!;
}

test("toRouterObservation normalizes token cost and booleans", () => {
  const observation = toRouterObservation({
    sampleId: "s-1",
    configId: "combo-a",
    selectedModel: "gpt-4.1",
    requestedModel: "gpt-4.1",
    durationMs: 240,
    tokens: { input: 100, output: 50 },
    status: 200,
  });

  assert.ok(observation);
  assert.equal(observation!.sampleId, "s-1");
  assert.equal(observation!.configId, "combo-a");
  assert.equal(observation!.latencyMs, 240);
  assert.equal(observation!.costUsd, 0.00015);
  assert.equal(observation!.success, true);
  assert.equal(observation!.expectedModel, "gpt-4.1");
});

test("runRouterEval computes summary and frontiers", () => {
  const report = runRouterEval([
    obs({ sampleId: "s1", configId: "a", latencyMs: 100, costUsd: 0.01, success: true }),
    obs({ sampleId: "s2", configId: "a", latencyMs: 100, costUsd: 0.01, success: true }),
    obs({ sampleId: "s3", configId: "b", latencyMs: 80, costUsd: 0.02, success: true }),
    obs({ sampleId: "s4", configId: "b", latencyMs: 120, costUsd: 0.02, success: false }),
  ]);

  assert.equal(report.summary.totalSamples, 4);
  assert.equal(report.summary.validSamples, 4);
  assert.equal(report.summary.uniqueConfigs, 2);
  assert.equal(report.configurations.length, 2);
  assert.equal(report.top[0]?.configId, "a");
  assert.ok(report.frontier.length >= 1);
});

test("compareRouterEvalRuns captures AIQ and cost regressions", () => {
  const baseline = runRouterEval([
    obs({ sampleId: "b1", configId: "a", latencyMs: 100, costUsd: 0.01, success: true }),
    obs({ sampleId: "b2", configId: "a", latencyMs: 100, costUsd: 0.01, success: true }),
  ]);
  const candidate = runRouterEval([
    obs({ sampleId: "c1", configId: "a", latencyMs: 300, costUsd: 0.03, success: true }),
    obs({ sampleId: "c2", configId: "a", latencyMs: 300, costUsd: 0.03, success: true }),
  ]);

  const comparison = compareRouterEvalRuns(baseline, candidate, {
    aiqDrop: 5,
    relativeCostIncrease: 1.2,
  });

  assert.ok(
    comparison.regressions.some((reason) => reason.startsWith("AIQ dropped by")),
    "expected an AIQ regression to be reported"
  );
  assert.ok(
    comparison.regressions.some((reason) => reason.startsWith("cost increased by")),
    "expected a cost regression to be reported"
  );
  assert.equal(comparison.delta.aiq <= 0, true);
  assert.equal(comparison.delta.costUsd > 0, true);
});

test("createRouterEvalArtifact wraps reports with a stable schema", () => {
  const report = runRouterEval([
    obs({ sampleId: "s1", configId: "a", latencyMs: 100, costUsd: 0.01, success: true }),
  ]);

  const artifact = createRouterEvalArtifact(report);

  assert.equal(artifact.schemaVersion, 1);
  assert.equal(artifact.kind, "router-eval-report");
  assert.equal(artifact.generatedAt, report.evaluatedAt);
  assert.equal(artifact.report?.summary.totalSamples, 1);
});
