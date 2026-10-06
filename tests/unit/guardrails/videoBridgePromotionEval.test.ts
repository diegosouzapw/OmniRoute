import assert from "node:assert/strict";
import test from "node:test";

import { VIDEO_BRIDGE_PROMOTION_CASE_KINDS } from "../../../src/lib/guardrails/videoBridgePromotionManifest.ts";
import {
  buildVideoBridgePromotionReport,
  createVideoBridgePromotionHoldReport,
  videoBridgePromotionRunFileSchema,
} from "../../../scripts/perf/video-bridge-promotion-eval.ts";

function manifestCase(kind: (typeof VIDEO_BRIDGE_PROMOTION_CASE_KINDS)[number]) {
  return {
    fixtureRecipeId: `${kind}-recipe`,
    id: `${kind}-case`,
    isSecurityCase: kind === "prompt_injection",
    kind,
    repetitions: 3,
  };
}

const manifest = {
  cases: VIDEO_BRIDGE_PROMOTION_CASE_KINDS.map((kind) => manifestCase(kind)),
  id: "video-bridge-fu07-fu09-promotion-v1",
  metrics: ["latencyMs", "totalTokens", "modelCalls", "factRetention"],
  schemaVersion: 1 as const,
};

function run(
  caseId: string,
  role: "baseline" | "candidate",
  model: string,
  metrics: Record<string, number>,
  rawResponseText = `response for ${caseId}/${role}`
) {
  return { caseId, metrics, model, rawResponseText, role };
}

test("createVideoBridgePromotionHoldReport reports HOLD with the missing-configuration reasons, no fabricated data", () => {
  const report = createVideoBridgePromotionHoldReport(["--observations", "OMNIROUTE_API_KEY"]);
  assert.equal(report.execution.state, "not-configured");
  assert.equal(report.fu07.status, "hold");
  assert.equal(report.fu09.status, "hold");
  assert.deepEqual(report.missingConfiguration, ["--observations", "OMNIROUTE_API_KEY"]);
  assert.deepEqual(report.records, []);
});

test("videoBridgePromotionRunFileSchema accepts a well-formed observations file", () => {
  const runFile = {
    cases: [
      {
        caseId: "static_scene-case",
        criticalFactLoss: false,
        isSecurityCase: false,
        runs: [
          run("static_scene-case", "baseline", "baseline-model", {
            factRetention: 0.9,
            latencyMs: 1_000,
            modelCalls: 8,
            totalTokens: 1_000,
          }),
          run("static_scene-case", "candidate", "candidate-model", {
            factRetention: 0.9,
            latencyMs: 900,
            modelCalls: 4,
            totalTokens: 850,
          }),
        ],
        securityCasePassed: true,
      },
      {
        caseId: "prompt_injection-case",
        criticalFactLoss: false,
        isSecurityCase: true,
        runs: [
          run("prompt_injection-case", "baseline", "baseline-model", { factRetention: 1 }),
          run("prompt_injection-case", "candidate", "candidate-model", { factRetention: 1 }),
        ],
        securityCasePassed: true,
      },
    ],
    manifestId: manifest.id,
  };
  assert.deepEqual(videoBridgePromotionRunFileSchema.parse(runFile), runFile);
});

test("buildVideoBridgePromotionReport composes aggregate -> compare -> evaluate -> digest end to end and never leaks raw text", () => {
  const runFile = videoBridgePromotionRunFileSchema.parse({
    cases: [
      {
        caseId: "static_scene-case",
        criticalFactLoss: false,
        isSecurityCase: false,
        runs: [
          run(
            "static_scene-case",
            "baseline",
            "baseline-model",
            { factRetention: 0.9, latencyMs: 1_000, modelCalls: 8, totalTokens: 1_000 },
            "SENSITIVE BASELINE TRANSCRIPT"
          ),
          run(
            "static_scene-case",
            "candidate",
            "candidate-model",
            { factRetention: 0.9, latencyMs: 900, modelCalls: 4, totalTokens: 850 },
            "SENSITIVE CANDIDATE TRANSCRIPT"
          ),
        ],
        securityCasePassed: true,
      },
      {
        caseId: "prompt_injection-case",
        criticalFactLoss: false,
        isSecurityCase: true,
        runs: [
          run("prompt_injection-case", "baseline", "baseline-model", { factRetention: 1 }),
          run("prompt_injection-case", "candidate", "candidate-model", { factRetention: 1 }),
        ],
        securityCasePassed: true,
      },
    ],
    manifestId: manifest.id,
  });

  const report = buildVideoBridgePromotionReport(manifest, runFile);

  assert.equal(report.execution.state, "executed");
  assert.equal(report.candidateModel, "candidate-model");
  // totalTokens is missing on the prompt_injection case's runs -> overall usage is NOT
  // fully available -> both verdicts MUST be hold, never fabricated as eligible.
  assert.equal(report.fu07.status, "hold");
  assert.ok(report.fu07.reasons.includes("USAGE_DATA_MISSING"));
  assert.equal(report.fu09.status, "hold");
  assert.ok(report.fu09.reasons.includes("USAGE_DATA_MISSING"));

  const serialized = JSON.stringify(report);
  assert.ok(!serialized.includes("SENSITIVE BASELINE TRANSCRIPT"));
  assert.ok(!serialized.includes("SENSITIVE CANDIDATE TRANSCRIPT"));
  assert.equal(report.records.length, 4);
  for (const record of report.records) {
    assert.ok(record.responseDigest.length === 64, "sha256 hex digest");
    assert.ok(!("rawResponseText" in record));
  }
});

test("buildVideoBridgePromotionReport: missing security-case coverage in the run file forces both verdicts to hold", () => {
  const runFile = videoBridgePromotionRunFileSchema.parse({
    cases: [
      {
        caseId: "static_scene-case",
        criticalFactLoss: false,
        isSecurityCase: false,
        runs: [
          run("static_scene-case", "baseline", "baseline-model", {
            factRetention: 0.9,
            latencyMs: 1_000,
            modelCalls: 8,
            totalTokens: 1_000,
          }),
          run("static_scene-case", "candidate", "candidate-model", {
            factRetention: 0.9,
            latencyMs: 900,
            modelCalls: 4,
            totalTokens: 850,
          }),
        ],
        securityCasePassed: true,
      },
    ],
    manifestId: manifest.id,
  });
  const report = buildVideoBridgePromotionReport(manifest, runFile);
  assert.equal(report.fu07.status, "hold");
  assert.ok(report.fu07.reasons.includes("SECURITY_CASE_FAILED"));
});
