// #12808: request-scoped Auto evaluation trace invariants.
import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-eval-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "auto-evaluation-trace-test-secret";

const {
  getComboTrace,
  resetComboTraceStore,
  setAutoEvaluationWriteFailureForTests,
  startAutoEvaluationTrace,
  startComboTrace,
} = await import("../../../open-sse/services/combo/decisionTrace.ts");
const { recordAutoCandidatePool } = await import(
  "../../../open-sse/services/autoCombo/autoEvaluationTrace.ts"
);
const virtualFactory = await import(
  "../../../open-sse/services/autoCombo/virtualFactory.ts"
);
const { filterResilienceBlockedCandidates } = await import(
  "../../../open-sse/services/autoCombo/resilienceCandidateFilter.ts"
);

beforeEach(() => resetComboTraceStore());

test.after(() => {
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

function preparedCandidate() {
  return {
    provider: "openai",
    connectionId: null,
    allowedConnectionIds: ["prepared-connection"],
    model: "gpt-5.4",
    modelStr: "openai/gpt-5.4",
    costPer1MTokens: 0,
    resolvedContextLength: 400000,
    resolvedMaxOutputTokens: 64000,
    resolvedSupportsVision: false,
    resolvedReasoning: false,
    resolvedSupportsThinking: false,
  };
}

function preparedInputs() {
  const candidate = preparedCandidate();
  return { regularCandidates: [candidate], familyCandidates: [candidate] };
}

async function materialize(traceInvocationId?: string) {
  return virtualFactory.createVirtualAutoComboFromPrepared(
    preparedInputs(),
    undefined,
    { category: "reasoning" },
    undefined,
    undefined,
    traceInvocationId
  );
}

function startTrace(id: string) {
  startComboTrace(id, { strategy: "auto", comboName: "auto/reasoning" });
  startAutoEvaluationTrace(id);
}

test("Auto materialization is identical with evaluation tracing off vs on", async () => {
  const withoutTrace = await materialize();

  const invocationId = "combo-auto-eval-equivalence";
  startTrace(invocationId);
  const withTrace = await materialize(invocationId);

  assert.deepEqual(withTrace, withoutTrace);

  const evaluation = getComboTrace(invocationId)?.autoEvaluation;
  assert.ok(evaluation);
  assert.equal(evaluation.schemaVersion, 1);
  assert.deepEqual(evaluation.stages, ["category_tier"]);
  assert.deepEqual(
    evaluation.transitions.map(({ target, stage, outcome, reason }) => ({
      target,
      stage,
      outcome,
      reason,
    })),
    [
      {
        target: "openai/gpt-5.4",
        stage: "category_tier",
        outcome: "excluded",
        reason: "auto_candidate_filter",
      },
    ]
  );
});

test("forced Auto trace-write failure cannot alter or reject materialization", async () => {
  const baseline = await materialize();

  const invocationId = "combo-auto-eval-fault";
  startTrace(invocationId);
  setAutoEvaluationWriteFailureForTests(true);

  const result = await materialize(invocationId);
  assert.deepEqual(result, baseline);
});

test("resilience exclusions use the same trace without recording account ids", () => {
  const invocationId = "combo-auto-eval-resilience";
  startTrace(invocationId);

  const pool = [
    {
      provider: "example",
      model: "model-a",
      modelStr: "example/model-a",
      connectionId: "secret-account-id",
    },
  ];
  const connections = new Map([
    ["secret-account-id", { id: "secret-account-id", testStatus: "unavailable" }],
  ]);

  assert.deepEqual(
    filterResilienceBlockedCandidates(pool, connections, false, invocationId),
    []
  );

  const evaluation = getComboTrace(invocationId)?.autoEvaluation;
  assert.ok(evaluation);
  assert.deepEqual(evaluation.stages, ["resilience"]);
  assert.equal(evaluation.transitions[0]?.reason, "auto_resilience_filter");
  assert.equal(JSON.stringify(evaluation).includes("secret-account-id"), false);
});

test("candidate records keep routing identity but omit connection/account metadata", () => {
  const invocationId = "combo-auto-eval-privacy";
  startTrace(invocationId);
  recordAutoCandidatePool(invocationId, [
    {
      provider: "example",
      model: "model-a",
      modelStr: "example/model-a",
      connectionId: "secret-account-id",
      allowedConnectionIds: ["secret-account-id"],
    } as {
      provider: string;
      model: string;
      modelStr: string;
    },
  ]);

  assert.deepEqual(getComboTrace(invocationId)?.autoEvaluation?.candidates, [
    { target: "example/model-a", provider: "example", model: "model-a" },
  ]);
  assert.equal(
    JSON.stringify(getComboTrace(invocationId)?.autoEvaluation).includes("secret-account-id"),
    false
  );
});
