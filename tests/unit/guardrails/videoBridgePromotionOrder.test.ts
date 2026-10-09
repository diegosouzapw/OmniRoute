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
  videoBridgePromotionManifestSchema,
} from "../../../src/lib/guardrails/videoBridgePromotionManifest.ts";
import { buildVideoBridgePromotionReport } from "../../../scripts/perf/video-bridge-promotion-eval.ts";

function completeEvidence() {
  const manifest = videoBridgePromotionManifestSchema.parse({
    id: "unit-only-order-corpus",
    schemaVersion: 1,
    metrics: [...VIDEO_BRIDGE_PROMOTION_METRIC_NAMES],
    cases: [...VIDEO_BRIDGE_PROMOTION_CASE_KINDS, "real_sanitized"].map((kind) => ({
      kind,
      id: kind,
      fixtureRecipeId: kind,
      isSecurityCase: kind === "prompt_injection",
      repetitions: 3,
      mediaDigest: "a".repeat(64),
      expectedFactsDigest: "b".repeat(64),
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
  assert.equal(report.fu07.status, "eligible");
  assert.equal(report.fu09.status, "hold");
  assert.equal(report.promotion.fu07.status, "hold");
  assert.equal(report.promotion.fu09.status, "hold");
  assert.ok(!JSON.stringify(report).includes("private unit response"));
});
