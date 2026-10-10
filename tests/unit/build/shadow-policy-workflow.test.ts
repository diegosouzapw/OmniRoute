import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { parse } from "yaml";

const caller = parse(readFileSync(".github/workflows/pr-policy-shadow.yml", "utf8"));
const worker = parse(readFileSync(".github/workflows/pr-policy-shadow-reusable.yml", "utf8"));
const groups = [
  ["ci_docs_sync_strict", "ci:docs-sync-strict", "required", 6],
  ["ci_docs_lint", "ci:docs-lint", "advisory", 1],
  ["ci_i18n_ui_coverage", "ci:i18n-ui-coverage", "required", 7],
  ["ci_i18n_glossary_zhcn", "ci:i18n-glossary-zhcn", "required", 2],
  ["ci_i18n", "ci:i18n", "advisory", 1],
  ["ci_pr_test_policy", "ci:pr-test-policy", "required", 5],
  ["quality_docs_gates", "quality:docs-gates", "required", 2],
  ["quality_merge_integrity", "quality:merge-integrity", "required", 2],
] as const;

test("one caller targets both branch families and preserves the six PR event types", () => {
  assert.deepEqual(caller.on.pull_request.branches, ["main", "release/**"]);
  assert.deepEqual(caller.on.pull_request.types, [
    "opened",
    "synchronize",
    "reopened",
    "ready_for_review",
    "converted_to_draft",
    "edited",
  ]);
  assert.equal(caller.jobs.pilot.uses, "./.github/workflows/pr-policy-shadow-reusable.yml");
  assert.equal(Object.keys(caller.jobs).length, 1);
  assert.equal(caller.on.pull_request_target, undefined);
  assert.equal(caller.jobs.pilot.secrets, undefined);
});

test("reusable has eight explicit groups plus one bootstrap and diagnostic collector", () => {
  assert.deepEqual(
    Object.keys(worker.jobs).sort(),
    ["bootstrap", "collect", ...groups.map(([key]) => key)].sort()
  );
  assert.deepEqual(worker.on.workflow_call.inputs, {
    "run-all": { type: "boolean", required: false, default: false },
  });
  assert.deepEqual(worker.permissions, { contents: "read" });
});

for (const [key, groupId, disposition, runCount] of groups) {
  test(`shadow runs the real commands of ${groupId}`, () => {
    const job = worker.jobs[key];
    assert.ok(job, `missing explicit job ${key}`);
    assert.equal(job.env.SHADOW_GROUP, groupId);
    assert.equal(job["continue-on-error"] ?? false, disposition === "advisory");
    assert.equal(job["runs-on"], "ubuntu-latest");
    assert.equal(job.needs, "bootstrap");
    const source = parse(
      readFileSync(`.github/workflows/${groupId.startsWith("ci:") ? "ci" : "quality"}.yml`, "utf8")
    );
    const original = source.jobs[groupId.split(":")[1]];
    const gateSteps = job.steps.filter((step: { id?: string }) => step.id?.startsWith("gate_"));
    const runSteps = gateSteps.filter((step: { run?: string }) => step.run !== undefined);
    assert.equal(runSteps.length, runCount);
    // Except a bounded exit recorder around markdownlint and immutable base fetch,
    // each original run remains byte-identical; aliases are not approximations.
    const expected = original.steps
      .filter((step: { run?: string }) => step.run !== undefined)
      .map((step: { run: string }) => step.run);
    for (let index = 0; index < expected.length; index++) {
      if (groupId === "ci:docs-lint")
        assert.ok(runSteps[index].run.includes(expected[index].replace(" || true", "")));
      else if (groupId === "ci:pr-test-policy" && index === 0)
        assert.match(runSteps[index].run, /GITHUB_BASE_SHA/);
      else assert.equal(runSteps[index].run, expected[index]);
    }
  });
}

test("collector still produces an incomplete report after receipt download fails, but never after invalid plan verification", () => {
  const report = worker.jobs.collect.steps.find((step: { id?: string }) => step.id === "report");
  assert.equal(report.if, "${{ always() && steps.verify.outcome == 'success' }}");
  assert.equal(worker.jobs.collect.if, "always()");
});

test("every worker pins the candidate, preserves the five installer uses and isolates artifacts by attempt", () => {
  let installers = 0;
  for (const job of Object.values(worker.jobs) as Array<{
    steps: Array<Record<string, unknown>>;
  }>) {
    const checkout = job.steps.find((step) => String(step.uses).startsWith("actions/checkout@"));
    assert.deepEqual(checkout?.with, {
      ref: "${{ github.sha }}",
      "fetch-depth": 0,
      "persist-credentials": false,
    });
    installers += job.steps.filter((step) => step.uses === "./.github/actions/npm-ci-retry").length;
    for (const step of job.steps.filter((entry) =>
      String(entry.uses).startsWith("actions/upload-artifact@")
    )) {
      const config = step.with as Record<string, string>;
      assert.match(config.name, /github.run_id/);
      assert.match(config.name, /github.run_attempt/);
      assert.match(config.name, /github.sha/);
    }
  }
  assert.equal(installers, 5);
  const vale = worker.jobs.ci_docs_lint.steps.find((step: { uses?: string }) =>
    step.uses?.startsWith("errata-ai/vale-action@")
  );
  assert.equal(vale.with.fail_on_error, false);
  const python = worker.jobs.ci_i18n.steps.find((step: { uses?: string }) =>
    step.uses?.startsWith("actions/setup-python@")
  );
  assert.equal(python.with["python-version"], "3.12");
});

for (const key of ["ci_i18n", "ci_pr_test_policy"] as const) {
  test(`${key} preserves original details in a private attempt artifact even after gate failure`, () => {
    const steps = worker.jobs[key].steps;
    const preserve = steps.find((step: { id?: string }) => step.id === "details");
    assert.ok(preserve, "missing original-details preservation");
    assert.equal(preserve.if, "${{ always() && steps.verify.outcome == 'success' }}");
    assert.equal(
      preserve.run,
      'node "$SHADOW_CONTROL/scripts/quality/shadow-policy-receipt.mjs" preserve'
    );
    const upload = steps.find((step: { with?: { name?: string } }) =>
      step.with?.name?.startsWith("shadow-details-")
    );
    assert.ok(upload, "missing separate details artifact");
    assert.equal(upload.if, "${{ always() && steps.details.outcome == 'success' }}");
    assert.equal(
      upload.with.name,
      `shadow-details-\${{ github.run_id }}-\${{ github.run_attempt }}-\${{ github.sha }}-${key}`
    );
    assert.equal(upload.with.path, "${{ env.SHADOW_STATE_DIR }}/details");
    assert.equal(upload.with["if-no-files-found"], "error");
    const receipt = steps.find((step: { with?: { name?: string } }) =>
      step.with?.name?.startsWith("shadow-receipt-")
    );
    assert.equal(receipt.with.path, "${{ env.SHADOW_STATE_DIR }}/receipt.json");
    assert.ok(
      steps.indexOf(preserve) >
        steps.findLastIndex((step: { id?: string }) => step.id?.startsWith("gate_"))
    );
  });
}
