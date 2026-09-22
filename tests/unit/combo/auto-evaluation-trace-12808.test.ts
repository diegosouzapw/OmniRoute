// #12808: request-scoped Auto evaluation trace invariants.
import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-eval-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET ??= "auto-evaluation-trace-test-secret";

const trace = await import("../../../open-sse/services/combo/decisionTrace.ts");
const virtualFactory = await import("../../../open-sse/services/autoCombo/virtualFactory.ts");
const { filterResilienceBlockedCandidates } = await import(
  "../../../open-sse/services/autoCombo/resilienceCandidateFilter.ts"
);

beforeEach(() => trace.resetComboTraceStore());
test.after(() => fs.rmSync(dataDir, { recursive: true, force: true }));

const prepared = {
  regularCandidates: [{
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
  }],
  familyCandidates: [],
};

async function materialize(invocationId?: string) {
  return virtualFactory.createVirtualAutoComboFromPrepared(
    prepared,
    undefined,
    { category: "reasoning" },
    undefined,
    undefined,
    invocationId
  );
}

function start(id: string) {
  trace.startComboTrace(id, { strategy: "auto", comboName: "auto/reasoning" });
  trace.startAutoEvaluationTrace(id);
}

test("trace is behavior-neutral and usable through the existing combo identity", async () => {
  const baseline = await materialize();
  const id = trace.createInvocationId();
  assert.match(id, /^combo-/);
  start(id);

  const traced = await materialize(id);
  assert.deepEqual(traced, baseline);

  const evaluation = trace.getComboTrace(id)?.autoEvaluation;
  assert.equal(evaluation?.schemaVersion, 1);
  assert.deepEqual(evaluation?.stages, ["category_tier"]);
  assert.equal(evaluation?.transitions[0]?.reason, "auto_candidate_filter");
});

test("forced trace-write failure never changes routing", async () => {
  const baseline = await materialize();
  const id = trace.createInvocationId();
  start(id);
  trace.setAutoEvaluationWriteFailureForTests(true);
  assert.deepEqual(await materialize(id), baseline);
});

test("connection narrowing is useful without leaking account identifiers", () => {
  const id = trace.createInvocationId();
  start(id);
  trace.recordAutoCandidatePool(id, [{
    provider: "example",
    model: "model-a",
    modelStr: "example/model-a",
    connectionId: null,
    allowedConnectionIds: ["blocked-account-id", "healthy-account-id"],
  }]);

  const pool = [{
    provider: "example",
    model: "model-a",
    modelStr: "example/model-a",
    connectionId: null,
    allowedConnectionIds: ["blocked-account-id", "healthy-account-id"],
  }];
  const connections = new Map([
    ["blocked-account-id", { id: "blocked-account-id", testStatus: "unavailable" }],
    ["healthy-account-id", { id: "healthy-account-id", testStatus: "success" }],
  ]);

  const filtered = filterResilienceBlockedCandidates(pool, connections, false, id);
  assert.deepEqual(filtered[0]?.allowedConnectionIds, ["healthy-account-id"]);

  const evaluation = trace.getComboTrace(id)?.autoEvaluation;
  assert.equal(evaluation?.candidates[0]?.connectionScope, "multiple");
  assert.equal(evaluation?.transitions[0]?.outcome, "narrowed");
  assert.equal(evaluation?.transitions[0]?.detail, "connections-narrowed:2->1");
  const serialized = JSON.stringify(evaluation);
  assert.equal(serialized.includes("blocked-account-id"), false);
  assert.equal(serialized.includes("healthy-account-id"), false);
});
