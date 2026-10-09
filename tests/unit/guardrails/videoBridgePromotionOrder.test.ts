import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";

import {
  buildPromotionManifestDigest,
  validatePromotionEvidence,
  getPromotionPairRoles,
} from "../../../src/lib/guardrails/videoBridgePromotionEvidence.ts";
import {
  VIDEO_BRIDGE_PROMOTION_CASE_KINDS,
  VIDEO_BRIDGE_PROMOTION_METRIC_NAMES,
  VIDEO_BRIDGE_PROMOTION_RESOURCE_CAPS,
  videoBridgePromotionManifestSchema,
} from "../../../src/lib/guardrails/videoBridgePromotionManifest.ts";
import { buildVideoBridgePromotionReport } from "../../../scripts/perf/video-bridge-promotion-eval.ts";

function completeEvidence() {
  const manifest = videoBridgePromotionManifestSchema.parse({
    id: "unit-only-order-corpus",
    schemaVersion: 1,
    configurationDigest: "d".repeat(64),
    resourceCaps: { ...VIDEO_BRIDGE_PROMOTION_RESOURCE_CAPS },
    metrics: [...VIDEO_BRIDGE_PROMOTION_METRIC_NAMES],
    cases: [...VIDEO_BRIDGE_PROMOTION_CASE_KINDS, "real_sanitized"].map((kind) => ({
      kind,
      id: kind,
      fixtureRecipeId: kind,
      isSecurityCase: kind === "prompt_injection",
      repetitions: 3,
      mediaDigest: "a".repeat(64),
      expectedFactsDigest: "b".repeat(64),
      promptDigest: "c".repeat(64),
    })),
  });
  const runFile = {
    comparison: "fu07" as const,
    manifestId: manifest.id,
    execution: {
      runId: randomUUID(),
      candidateSha: "a".repeat(40),
      manifestDigest: buildPromotionManifestDigest(manifest),
      realModel: true as const,
      startedAt: "2026-10-09T10:00:00.000Z",
      finishedAt: "2026-10-09T11:00:00.000Z",
      orderPolicy: "randomized-ab" as const,
      orderSeed: "frozen-unit-order-seed",
    },
    cases: manifest.cases.map((currentCase) => ({
      caseId: currentCase.id,
      isSecurityCase: currentCase.isSecurityCase,
      criticalFactLoss: false,
      securityCasePassed: true,
      runs: Array.from({ length: 3 }, (_, repetition) =>
        (["baseline", "candidate"] as const).map((role) => ({
          caseId: currentCase.id,
          role,
          repetition,
          observationId: randomUUID(),
          model: "unit-only-model",
          rawResponseText: "private unit response",
          preAnalysisMs: 100,
          mediaDigest: currentCase.mediaDigest,
          promptDigest: currentCase.promptDigest,
          configurationDigest: manifest.configurationDigest,
          metrics: {
            latencyMs: role === "baseline" ? 1000 : 700,
            totalTokens: role === "baseline" ? 1000 : 800,
            modelCalls: role === "baseline" ? 4 : 2,
            cpuMs: 100,
            rssKiB: 1024,
            factRetention: 1,
            temporalAssociation: 1,
            ocrAccuracy: 1,
            hallucinationRate: 0,
            injectionCompliance: 0,
          },
        }))
      ).flat(),
    })),
  };
  return { manifest, runFile };
}

test("a randomized-order label does not prove observed A/B execution order", () => {
  const { manifest, runFile } = completeEvidence();
  assert.ok(validatePromotionEvidence(manifest, runFile).includes("AB_ORDER_MISMATCH"));
});

test("resource evidence without frozen CPU, RSS and pre-analysis caps cannot promote", () => {
  const { manifest, runFile } = completeEvidence();
  delete manifest.resourceCaps;
  runFile.execution.manifestDigest = buildPromotionManifestDigest(manifest);
  assert.ok(validatePromotionEvidence(manifest, runFile).includes("RESOURCE_CAPS_MISSING"));
});

test("over-cap or unmeasured pre-analysis cannot promote", () => {
  const { manifest, runFile } = completeEvidence();
  runFile.cases[0].runs[0].metrics.rssKiB = VIDEO_BRIDGE_PROMOTION_RESOURCE_CAPS.maxRssKiB + 1;
  assert.ok(validatePromotionEvidence(manifest, runFile).includes("RESOURCE_CAP_EXCEEDED"));
  runFile.cases[0].runs[0].preAnalysisMs = NaN;
  assert.ok(
    validatePromotionEvidence(manifest, runFile).includes("PRE_ANALYSIS_METRIC_MISSING_OR_INVALID")
  );
});

test("declared case IDs cannot substitute for identical media, prompt and settings", () => {
  const { manifest, runFile } = completeEvidence();
  Object.assign(runFile.cases[0].runs[0], { mediaDigest: "e".repeat(64) });
  assert.ok(validatePromotionEvidence(manifest, runFile).includes("RUN_INPUT_BINDING_MISMATCH"));
});

test("complete unit evidence can qualify only the measured lane, never promote a single execution", () => {
  const { manifest, runFile } = completeEvidence();
  for (const currentCase of runFile.cases) {
    currentCase.runs.sort((left, right) => {
      if (left.repetition !== right.repetition) return left.repetition - right.repetition;
      const roles = getPromotionPairRoles(
        runFile.execution.orderSeed,
        currentCase.caseId,
        left.repetition
      );
      return roles.indexOf(left.role) - roles.indexOf(right.role);
    });
  }
  assert.deepEqual(validatePromotionEvidence(manifest, runFile), []);
  const report = buildVideoBridgePromotionReport(manifest, runFile);
  assert.ok(
    report.records.every(
      (record) =>
        record.role &&
        record.observationId &&
        record.repetition !== undefined &&
        record.preAnalysisMs !== undefined
    )
  );
  assert.equal(report.fu07.status, "eligible");
  assert.equal(report.fu09.status, "hold");
  assert.equal(report.promotion.fu07.status, "hold");
  assert.equal(report.promotion.fu09.status, "hold");
  assert.ok(!JSON.stringify(report).includes("private unit response"));
});
