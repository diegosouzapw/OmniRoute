import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import {
  assessVideoContactSheetPromotion,
  createVideoContactSheetEvalHoldReport,
  runVideoContactSheetEval,
} from "../../../scripts/perf/video-bridge-contact-sheet-eval.ts";

async function evalFrame(color: string, timestampSeconds: number) {
  const bytes = await sharp({
    create: { background: color, channels: 3, height: 32, width: 32 },
  })
    .jpeg()
    .toBuffer();
  return {
    dataUri: `data:image/jpeg;base64,${bytes.toString("base64")}`,
    timestampSeconds,
  };
}

test("contact-sheet A/B eval remains HOLD when real-model configuration is missing", () => {
  const report = createVideoContactSheetEvalHoldReport({
    caseCount: 0,
    configurationState: "not-configured",
    missingConfiguration: ["OMNIROUTE_API_KEY", "--model"],
  });

  assert.equal(report.schemaVersion, 1);
  assert.equal(report.kind, "video-contact-sheet-ab-eval");
  assert.deepEqual(report.execution, {
    realModel: false,
    state: "not-configured",
  });
  assert.deepEqual(report.promotion, {
    reasons: ["REAL_MODEL_CONFIGURATION_MISSING"],
    status: "HOLD",
  });
  assert.deepEqual(report.missingConfiguration, ["OMNIROUTE_API_KEY", "--model"]);
  assert.deepEqual(report.results, []);
  assert.equal(report.summary, null);
});

test("contact-sheet A/B eval becomes eligible only with measured cost gains and retained quality", () => {
  const decision = assessVideoContactSheetPromotion({
    individual: { latencyMs: 1_000, qualityScore: 0.9, totalTokens: 1_000 },
    sheet: { latencyMs: 600, qualityScore: 0.9, totalTokens: 600 },
    thresholds: {
      minLatencyReductionRatio: 0.01,
      minQualityRetention: 1,
      minQualityScore: 0.8,
      minTokenReductionRatio: 0.01,
    },
  });

  assert.deepEqual(decision, {
    metrics: {
      latencyReductionRatio: 0.4,
      qualityRetention: 1,
      tokenReductionRatio: 0.4,
    },
    reasons: [],
    status: "ELIGIBLE",
  });
});

test("contact-sheet A/B promotion remains HOLD for quality loss or absent token evidence", () => {
  const decision = assessVideoContactSheetPromotion({
    individual: { latencyMs: 1_000, qualityScore: 1, totalTokens: 1_000 },
    sheet: { latencyMs: 500, qualityScore: 0.7, totalTokens: null },
    thresholds: {
      minLatencyReductionRatio: 0.01,
      minQualityRetention: 0.95,
      minQualityScore: 0.8,
      minTokenReductionRatio: 0.01,
    },
  });

  assert.equal(decision.status, "HOLD");
  assert.deepEqual(decision.reasons, [
    "QUALITY_SCORE_BELOW_THRESHOLD",
    "QUALITY_RETENTION_BELOW_THRESHOLD",
    "TOKEN_USAGE_UNAVAILABLE",
  ]);
  assert.equal(decision.metrics.tokenReductionRatio, null);
});

test("contact-sheet A/B promotion rejects zero cost gain even with permissive thresholds", () => {
  const decision = assessVideoContactSheetPromotion({
    individual: { latencyMs: 1_000, qualityScore: 1, totalTokens: 1_000 },
    sheet: { latencyMs: 1_000, qualityScore: 1, totalTokens: 1_000 },
    thresholds: {
      minLatencyReductionRatio: 0,
      minQualityRetention: 1,
      minQualityScore: 1,
      minTokenReductionRatio: 0,
    },
  });

  assert.equal(decision.status, "HOLD");
  assert.deepEqual(decision.reasons, [
    "LATENCY_REDUCTION_BELOW_THRESHOLD",
    "TOKEN_REDUCTION_BELOW_THRESHOLD",
  ]);
});

test("contact-sheet A/B harness measures real-model calls without storing raw responses", async () => {
  const responses = [
    "At 00:01.000 there is a red square.",
    "At 00:05.000 there is a blue circle.",
    "At 00:01.000 there is a red square; at 00:05.000 there is a blue circle.",
  ];
  let requestCount = 0;
  const report = await runVideoContactSheetEval({
    config: {
      apiKey: "test-only-key",
      endpoint: "https://eval.invalid/v1/chat/completions",
      model: "vision-eval-model",
    },
    fetchImpl: async () => {
      const content = responses[requestCount];
      requestCount += 1;
      return new Response(
        JSON.stringify({
          choices: [{ message: { content } }],
          usage: { completion_tokens: 20, prompt_tokens: 80, total_tokens: 100 },
        }),
        { headers: { "content-type": "application/json" }, status: 200 }
      );
    },
    manifest: {
      cases: [
        {
          expectedFacts: [
            {
              id: "red-square",
              requiredTerms: ["red", "square"],
              timestampSeconds: 1,
            },
            {
              id: "blue-circle",
              requiredTerms: ["blue", "circle"],
              timestampSeconds: 5,
            },
          ],
          frames: [await evalFrame("red", 1), await evalFrame("blue", 5)],
          id: "two-scenes",
          prompt: "Describe the visible shape and color at each timestamp.",
        },
      ],
      id: "contact-sheet-fixture-v1",
      schemaVersion: 1,
      thresholds: {
        minLatencyReductionRatio: 0.01,
        minQualityRetention: 1,
        minQualityScore: 1,
        minTokenReductionRatio: 0.01,
      },
    },
  });

  assert.equal(requestCount, 3);
  assert.deepEqual(report.execution, { realModel: true, state: "executed" });
  assert.equal(report.results[0].individual.modelCalls, 2);
  assert.equal(report.results[0].individual.totalTokens, 200);
  assert.equal(report.results[0].individual.qualityScore, 1);
  assert.equal(report.results[0].sheet.modelCalls, 1);
  assert.equal(report.results[0].sheet.totalTokens, 100);
  assert.equal(report.results[0].sheet.qualityScore, 1);
  assert.equal("response" in report.results[0].individual, false);
  assert.equal("response" in report.results[0].sheet, false);
  assert.match(report.manifestDigest, /^[a-f0-9]{64}$/);
  assert.match(report.results[0].individual.responseDigest, /^[a-f0-9]{64}$/);
  assert.match(report.results[0].sheet.responseDigest, /^[a-f0-9]{64}$/);
});
