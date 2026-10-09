import assert from "node:assert/strict";
import test from "node:test";

import { buildVideoBridgePromotionReport } from "../../../scripts/perf/video-bridge-promotion-eval.ts";
import {
  VIDEO_BRIDGE_PROMOTION_CASE_KINDS,
  VIDEO_BRIDGE_PROMOTION_METRIC_NAMES,
} from "../../../src/lib/guardrails/videoBridgePromotionManifest.ts";

function evidence() {
  const manifest = {
    cases: VIDEO_BRIDGE_PROMOTION_CASE_KINDS.map((kind) => ({
      fixtureRecipeId: `${kind}-recipe`,
      id: kind,
      isSecurityCase: kind === "prompt_injection",
      kind,
      repetitions: 3,
    })),
    id: "frozen-corpus",
    metrics: [...VIDEO_BRIDGE_PROMOTION_METRIC_NAMES],
    schemaVersion: 1 as const,
  };
  const runFile = {
    manifestId: manifest.id,
    cases: manifest.cases.map((currentCase) => ({
      caseId: currentCase.id,
      criticalFactLoss: false,
      isSecurityCase: currentCase.isSecurityCase,
      securityCasePassed: true,
      runs: Array.from({ length: 3 }, () =>
        (["baseline", "candidate"] as const).map((role) => ({
          caseId: currentCase.id,
          model: "same-real-model",
          role,
          rawResponseText: "private response",
          metrics: {
            latencyMs: role === "baseline" ? 1000 : 700,
            totalTokens: role === "baseline" ? 1000 : 800,
            modelCalls: role === "baseline" ? 8 : 4,
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

test("promotion observations must match the frozen manifest and observed coverage", () => {
  const mutations = [
    (data: ReturnType<typeof evidence>) => {
      data.runFile.manifestId = "different-corpus";
    },
    (data: ReturnType<typeof evidence>) => {
      data.runFile.cases.pop();
    },
    (data: ReturnType<typeof evidence>) => {
      data.runFile.cases[0].runs.splice(2);
    },
    (data: ReturnType<typeof evidence>) => {
      data.runFile.cases[0].runs[0].model = "another-model";
    },
    (data: ReturnType<typeof evidence>) => {
      data.runFile.cases[0].runs[0].caseId = "foreign-case";
    },
    (data: ReturnType<typeof evidence>) => {
      delete data.runFile.cases[0].runs[0].metrics.cpuMs;
    },
    (data: ReturnType<typeof evidence>) => {
      data.runFile.cases[0].isSecurityCase = true;
    },
  ];
  const expectedReasons = [
    "MANIFEST_BINDING_MISMATCH",
    "CASE_COVERAGE_MISSING",
    "OBSERVED_REPETITIONS_MISSING",
    "MODEL_SEPARATION_REQUIRED",
    "RUN_CASE_BINDING_MISMATCH",
    "REQUIRED_METRIC_MISSING_OR_INVALID",
    "SECURITY_CLASSIFICATION_MISMATCH",
  ];
  for (const [index, mutate] of mutations.entries()) {
    const data = evidence();
    mutate(data);
    const report = buildVideoBridgePromotionReport(data.manifest, data.runFile);
    assert.equal(report.fu07.status, "hold");
    assert.equal(report.fu09.status, "hold");
    assert.ok(report.fu07.reasons.includes(expectedReasons[index]));
    assert.ok(report.fu09.reasons.includes(expectedReasons[index]));
    assert.ok(!JSON.stringify(report).includes("private response"));
  }
});

test("unbound legacy observations cannot establish a real independent execution", () => {
  const data = evidence();
  const report = buildVideoBridgePromotionReport(data.manifest, data.runFile);
  assert.equal(report.fu07.status, "hold");
  assert.ok(report.fu07.reasons.includes("EXECUTION_RECEIPT_MISSING"));
  assert.ok(report.fu09.reasons.includes("EXECUTION_RECEIPT_MISSING"));
});
