import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  collectShadowReceipts,
  readReceiptArtifacts,
  createShadowReceipt,
} from "../../../scripts/quality/shadow-policy-receipt.mjs";

const identity = {
  runId: "123",
  runAttempt: "1",
  candidateSha: "a".repeat(40),
  workflowSourceSha: "b".repeat(40),
};
const plan = {
  schemaVersion: 1,
  kind: "shadow-pilot-plan",
  identity,
  planSha256: "c".repeat(64),
  selection: {
    gates: [
      { id: "ci:changes", selected: true, disposition: "required" },
      { id: "quality:changes", selected: true, disposition: "required" },
      { id: "ci:docs-lint", selected: true, disposition: "advisory" },
      { id: "ci:docs-sync-strict", selected: true, disposition: "required" },
      { id: "ci:build", selected: true, disposition: "required" },
      { id: "ci:i18n", selected: false, disposition: "advisory" },
    ],
  },
  execution: {
    "ci:docs-lint": { eligible: true },
    "ci:docs-sync-strict": { eligible: true },
    "ci:build": { eligible: true },
  },
};
// Independent literal IDs of the remainder of the 31-group policy, not generated
// from the reducer under test. These controls are deliberately not selected.
for (const id of [
  "ci:lint",
  "ci:quality-gate",
  "ci:quality-extended",
  "ci:i18n-ui-coverage",
  "ci:i18n-glossary-zhcn",
  "ci:pr-test-policy",
  "ci:package-artifact",
  "ci:electron-package-smoke",
  "ci:test-unit",
  "ci:test-bun-sqlite",
  "ci:test-vitest",
  "ci:test-coverage",
  "ci:test-e2e",
  "ci:test-integration",
  "ci:test-security",
  "ci:test-ecosystem",
  "ci:test-protocols-e2e",
  "ci:sonarqube",
  "ci:coverage-pr-comment",
  "quality:docs-gates",
  "quality:fast-gates",
  "quality:fast-vitest",
  "quality:fast-unit",
  "quality:lint-guard",
  "quality:merge-integrity",
])
  plan.selection.gates.push({ id, selected: false, disposition: "required" });

function receipt(groupId: string, outcome = "success") {
  return {
    schemaVersion: 1,
    kind: "shadow-pilot-receipt",
    identity,
    planSha256: plan.planSha256,
    groupId,
    instanceId: "single",
    outcome,
    conclusion: outcome,
    steps: Object.fromEntries(
      Array.from({ length: groupId === "ci:docs-lint" ? 2 : 6 }, (_, index) => [
        `gate_${index}`,
        { outcome, conclusion: outcome },
      ])
    ),
  };
}

test("a pilot with successful implemented groups still exposes selected unimplemented required work", () => {
  const report = collectShadowReceipts(plan, [
    receipt("ci:docs-lint"),
    receipt("ci:docs-sync-strict"),
  ]);
  assert.equal(report.status, "SHADOW_INCOMPLETE");
  assert.equal(report.exitCode, 2);
  assert.equal(report.gates.find((gate) => gate.id === "ci:build").state, "not_implemented");
  assert.equal(report.gates.find((gate) => gate.id === "ci:i18n").state, "not_selected");
  assert.equal(report.gates.filter((gate) => gate.physicalExecution === "bootstrap").length, 2);
  assert.equal(Object.hasOwn(report, "admit"), false);
});

test("an advisory failure is retained independently of a masked job conclusion", () => {
  const failed = { ...receipt("ci:docs-lint", "failure"), conclusion: "success" };
  const report = collectShadowReceipts(plan, [failed, receipt("ci:docs-sync-strict")]);
  const row = report.gates.find((gate) => gate.id === "ci:docs-lint");
  assert.equal(row.state, "failed");
  assert.equal(row.disposition, "advisory");
  assert.equal(row.receipt.conclusion, "success");
});

test("missing required artifact is visible and cannot become success", () => {
  const report = collectShadowReceipts(plan, []);
  assert.equal(report.gates.find((gate) => gate.id === "ci:docs-sync-strict").state, "missing");
  assert.equal(report.exitCode, 2);
});

for (const [label, patch] of [
  ["foreign candidate", { identity: { ...identity, candidateSha: "d".repeat(40) } }],
  ["old attempt", { identity: { ...identity, runAttempt: "2" } }],
  ["another plan", { planSha256: "e".repeat(64) }],
  ["unknown group", { groupId: "ci:unknown" }],
  ["wrong instance", { instanceId: "../../other" }],
  ["unknown outcome", { outcome: "neutral" }],
  ["extra executable field", { command: "echo forbidden" }],
] as const) {
  test(`receipt rejects ${label}`, () => {
    assert.throws(
      () => collectShadowReceipts(plan, [{ ...receipt("ci:docs-sync-strict"), ...patch }]),
      /receipt|identity/i
    );
  });
}

test("duplicate receipts are not allowed to overwrite the first failure", () => {
  assert.throws(
    () =>
      collectShadowReceipts(plan, [
        receipt("ci:docs-sync-strict", "failure"),
        receipt("ci:docs-sync-strict"),
      ]),
    /duplicate/i
  );
});

test("an artifact for an unselected group is inconsistent instead of extra credit", () => {
  assert.throws(() => collectShadowReceipts(plan, [receipt("ci:i18n")]), /selected|receipt/i);
});

test("a success receipt cannot contradict its failed step", () => {
  const contradictory = {
    ...receipt("ci:docs-sync-strict"),
    steps: { gate: { outcome: "failure", conclusion: "failure" } },
  };
  assert.throws(() => collectShadowReceipts(plan, [contradictory]), /outcome|receipt/i);
});

test("cancelled and missing remain distinguishable from a skipped dependency", () => {
  const report = collectShadowReceipts(plan, [
    receipt("ci:docs-sync-strict", "cancelled"),
    receipt("ci:docs-lint", "skipped"),
  ]);
  assert.equal(report.gates.find((gate) => gate.id === "ci:docs-sync-strict").state, "cancelled");
  assert.equal(report.gates.find((gate) => gate.id === "ci:docs-lint").state, "blocked");
});

for (const [label, replacement] of [
  ["empty gate map", []],
  ["duplicate group", [plan.selection.gates[0], plan.selection.gates[0]]],
  ["unknown disposition", [{ id: "ci:build", selected: true, disposition: "optional" }]],
  ["unknown group", [{ id: "ci:unknown", selected: true, disposition: "required" }]],
  ["non-boolean selection", [{ id: "ci:build", selected: "false", disposition: "required" }]],
] as const) {
  test(`invalid plan metadata rejects ${label}`, () => {
    assert.throws(
      () => collectShadowReceipts({ ...plan, selection: { gates: replacement } }, []),
      /plan|metadata/i
    );
  });
}

for (const [label, extra] of [
  ["secret-bearing observation", { observed: { token: "forbidden" } }],
  [
    "string exit code",
    { steps: { gate: { outcome: "failure", conclusion: "failure", exitCode: "1" } } },
  ],
  [
    "invalid raw state",
    { steps: { gate: { outcome: "failure", conclusion: "failure", rawResult: "pass" } } },
  ],
] as const) {
  test(`receipt rejects ${label}`, () => {
    assert.throws(
      () =>
        collectShadowReceipts(plan, [{ ...receipt("ci:docs-sync-strict", "failure"), ...extra }]),
      /receipt|step/i
    );
  });
}

test("dropping a declared group cannot produce a seemingly complete report", () => {
  assert.throws(
    () =>
      collectShadowReceipts({ ...plan, selection: { gates: plan.selection.gates.slice(1) } }, []),
    /plan|metadata/i
  );
});

test("the artifact root cannot be a symlink to another directory", (t) => {
  const root = mkdtempSync(join(tmpdir(), "shadow-artifacts-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const outside = join(root, "other");
  const folder = join(outside, `shadow-receipt-123-1-${identity.candidateSha}-ci_docs_sync_strict`);
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, "receipt.json"), JSON.stringify(receipt("ci:docs-sync-strict")));
  assert.equal(readReceiptArtifacts(outside, plan).length, 1);
  const link = join(root, "receipts");
  symlinkSync(outside, link);
  assert.throws(() => readReceiptArtifacts(link, plan), /artifact|directory/i);
});

test("an incomplete step list cannot forge a successful implemented group", () => {
  const incomplete = receipt("ci:docs-sync-strict");
  delete incomplete.steps.gate_5;
  assert.throws(() => collectShadowReceipts(plan, [incomplete]), /step|receipt/i);
});

test("masked markdown exit and unobservable Vale findings remain distinct from a clean result", () => {
  const result = createShadowReceipt(plan, {
    groupId: "ci:docs-lint",
    jobStatus: "success",
    steps: {
      gate_0: {
        outcome: "success",
        conclusion: "success",
        outputs: { raw_exit: "7", secret: "never-retain" },
      },
      gate_1: { outcome: "success", conclusion: "success" },
    },
  });
  assert.equal(result.outcome, "failure");
  assert.equal(result.steps.gate_0.exitCode, 7);
  assert.equal(result.steps.gate_1.rawResult, "unobservable");
  assert.equal(JSON.stringify(result).includes("never-retain"), false);
  const report = collectShadowReceipts(plan, [result], { ci_docs_lint: { result: "success" } });
  assert.equal(report.gates.find((gate) => gate.id === "ci:docs-lint").state, "failed");
});

test("a final job failure remains failure even if the recorded gate steps had succeeded", () => {
  const report = collectShadowReceipts(plan, [receipt("ci:docs-sync-strict")], {
    ci_docs_sync_strict: { result: "failure" },
  });
  assert.equal(report.gates.find((gate) => gate.id === "ci:docs-sync-strict").state, "failed");
});

test("a bootstrap job failure after planning cannot be reported as two successful aliases", () => {
  const report = collectShadowReceipts(plan, [], { bootstrap: { result: "failure" } });
  assert.deepEqual(
    report.gates.filter((gate) => gate.physicalExecution === "bootstrap").map((gate) => gate.state),
    ["failed", "failed"]
  );
});

test("receipt time is an observed instant, not an invented execution duration", () => {
  const before = Date.now();
  const result = createShadowReceipt(plan, {
    groupId: "ci:docs-lint",
    jobStatus: "success",
    steps: {
      gate_0: { outcome: "success", conclusion: "success" },
      gate_1: { outcome: "success", conclusion: "success" },
    },
  });
  assert.ok(Date.parse(result.observed.recordedAt) >= before);
  assert.ok(Date.parse(result.observed.recordedAt) <= Date.now());
  assert.equal(Object.hasOwn(result.observed, "durationMs"), false);
});

test("missing final bootstrap conclusion is missing for both aliases, never successful", () => {
  const report = collectShadowReceipts(plan, [], {});
  assert.deepEqual(
    report.gates.filter((gate) => gate.physicalExecution === "bootstrap").map((gate) => gate.state),
    ["missing", "missing"]
  );
  const observed = collectShadowReceipts(plan, [], { bootstrap: { result: "success" } });
  assert.deepEqual(
    observed.gates
      .filter((gate) => gate.physicalExecution === "bootstrap")
      .map((gate) => gate.state),
    ["succeeded", "succeeded"]
  );
});

test("a successful receipt without a final worker conclusion cannot stand in for job success", () => {
  const saved = receipt("ci:docs-sync-strict");
  const missing = collectShadowReceipts(plan, [saved], { bootstrap: { result: "success" } });
  const missingRow = missing.gates.find((gate) => gate.id === "ci:docs-sync-strict");
  assert.equal(missingRow.state, "missing");
  assert.equal(missingRow.jobConclusion, null);
  assert.equal(
    missingRow.receipt.outcome,
    "success",
    "keep the observed step result distinct from job state"
  );
  const observed = collectShadowReceipts(plan, [saved], {
    bootstrap: { result: "success" },
    ci_docs_sync_strict: { result: "success" },
  });
  assert.equal(observed.gates.find((gate) => gate.id === "ci:docs-sync-strict").state, "succeeded");
});

test("observed Node components have inclusive defensive metadata bounds", () => {
  const saved = receipt("ci:docs-sync-strict");
  const observed = {
    nodeVersion: "v9999999999.9999999999.9999999999",
    recordedAt: "2026-10-10T00:00:00.000Z",
    jobStatusAtReceipt: "success",
    finalJobConclusion: "not-yet-available",
  };
  assert.doesNotThrow(() => collectShadowReceipts(plan, [{ ...saved, observed }]));
  for (const nodeVersion of ["v99999999999.1.1", "v1.99999999999.1", "v1.1.99999999999"]) {
    assert.throws(
      () => collectShadowReceipts(plan, [{ ...saved, observed: { ...observed, nodeVersion } }]),
      /observation/i
    );
  }
});
