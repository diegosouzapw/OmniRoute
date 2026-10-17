import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";

import {
  buildPromotionManifestDigest,
  validatePromotionEvidence,
} from "../../../src/lib/guardrails/videoBridgePromotionEvidence.ts";
import {
  VIDEO_BRIDGE_PROMOTION_CASE_KINDS,
  VIDEO_BRIDGE_PROMOTION_METRIC_NAMES,
  videoBridgePromotionManifestSchema,
} from "../../../src/lib/guardrails/videoBridgePromotionManifest.ts";

test("repeating one observation is not three independently measured repetitions", () => {
  const manifest = videoBridgePromotionManifestSchema.parse({
    id: "complete-corpus",
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
  const evidence = {
    manifestId: manifest.id,
    execution: {
      runId: randomUUID(),
      candidateSha: "a".repeat(40),
      manifestDigest: buildPromotionManifestDigest(manifest),
      realModel: true as const,
      startedAt: "2026-10-09T10:00:00.000Z",
      finishedAt: "2026-10-09T11:00:00.000Z",
      orderPolicy: "randomized-ab" as const,
      orderSeed: "frozen-run-seed",
    },
    cases: manifest.cases.map((currentCase) => ({
      caseId: currentCase.id,
      isSecurityCase: currentCase.isSecurityCase,
      runs: Array.from({ length: 3 }, () =>
        (["baseline", "candidate"] as const).map((role) => ({
          caseId: currentCase.id,
          role,
          model: "same-model",
          observationId: "duplicated-id",
          repetition: 0,
          metrics: {
            latencyMs: 1000,
            totalTokens: 1000,
            modelCalls: 4,
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
  assert.ok(validatePromotionEvidence(manifest, evidence).includes("OBSERVATION_IDENTITY_INVALID"));
  assert.ok(validatePromotionEvidence(manifest, evidence).includes("REPETITION_BINDING_INVALID"));
});
