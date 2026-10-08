// #12808: request-scoped Auto evaluation trace invariants.
import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";

const {
  getComboTrace,
  resetComboTraceStore,
  setAutoEvaluationWriteFailureForTests,
  startAutoEvaluationTrace,
  startComboTrace,
} = await import("../../../open-sse/services/combo/decisionTrace.ts");
const { filterResilienceBlockedCandidates } =
  await import("../../../open-sse/services/autoCombo/resilienceCandidateFilter.ts");

beforeEach(() => resetComboTraceStore());

function candidatePool() {
  return [
    {
      provider: "example",
      model: "model-a",
      connectionId: "conn-a",
      modelStr: "example/model-a",
    },
  ];
}

function blockedConnections() {
  return new Map([["conn-a", { id: "conn-a", testStatus: "unavailable" }]]);
}

test("Auto evaluation tracing does not change resilience filtering", () => {
  const withoutTrace = filterResilienceBlockedCandidates(candidatePool(), blockedConnections());

  startComboTrace("combo-auto-trace", { strategy: "auto", comboName: "auto" });
  startAutoEvaluationTrace("combo-auto-trace");
  const withTrace = filterResilienceBlockedCandidates(
    candidatePool(),
    blockedConnections(),
    false,
    "combo-auto-trace"
  );

  assert.deepEqual(withTrace, withoutTrace);
  const evaluation = getComboTrace("combo-auto-trace")?.autoEvaluation;
  assert.ok(evaluation);
  assert.equal(evaluation.schemaVersion, 1);
  assert.deepEqual(evaluation.stages.slice(0, 2), ["resilience", "paid_only"]);
  assert.deepEqual(
    evaluation.transitions.map(({ target, stage, outcome, reason }) => ({
      target,
      stage,
      outcome,
      reason,
    })),
    [
      {
        target: "example/model-a",
        stage: "resilience",
        outcome: "excluded",
        reason: "auto_resilience_filter",
      },
    ]
  );
});

test("forced Auto evaluation trace write failure never propagates into routing", () => {
  startComboTrace("combo-auto-fault", { strategy: "auto", comboName: "auto" });
  startAutoEvaluationTrace("combo-auto-fault");
  setAutoEvaluationWriteFailureForTests(true);

  assert.doesNotThrow(() => {
    const result = filterResilienceBlockedCandidates(
      candidatePool(),
      blockedConnections(),
      false,
      "combo-auto-fault"
    );
    assert.deepEqual(result, []);
  });
});

test("Auto candidate trace omits connection/account identifiers", async () => {
  const { recordAutoCandidatePool } =
    await import("../../../open-sse/services/autoCombo/autoEvaluationTrace.ts");
  startComboTrace("combo-auto-privacy", { strategy: "auto", comboName: "auto" });
  startAutoEvaluationTrace("combo-auto-privacy");
  const candidateWithAccountMetadata = {
    provider: "example",
    model: "model-a",
    modelStr: "example/model-a",
    connectionId: "secret-account-id",
    allowedConnectionIds: ["secret-account-id"],
  };
  recordAutoCandidatePool("combo-auto-privacy", [candidateWithAccountMetadata]);

  assert.deepEqual(getComboTrace("combo-auto-privacy")?.autoEvaluation?.candidates, [
    { target: "example/model-a", provider: "example", model: "model-a" },
  ]);
});
