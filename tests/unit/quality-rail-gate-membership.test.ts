/**
 * G0 guard — the PR→release/** rail (quality.yml) must keep the ratchet + security
 * gates that used to run only on the PR→main rail (ci.yml).
 *
 * Why: the god-file refactor (trilho 3.8.50→3.9.0) happens almost entirely in
 * PRs targeting release/**. Before G0, those PRs skipped the CodeQL ratchet, the
 * quality-ratchet engine, and every security scanner — exactly the net the
 * refactor needs. Five of the 13 root causes reconciled on 2026-07-24 were real
 * production regressions shipped through green per-PR CI; the gates below are the
 * part of that lesson that can be enforced by machine.
 *
 * This test pins MEMBERSHIP, not order: removing a gate from quality.yml (or
 * moving it to a job that does not run on code PRs) must be a conscious decision
 * that edits this file in the same PR, with the reason in the diff.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const workflow = fs.readFileSync(path.join(repoRoot, ".github/workflows/quality.yml"), "utf-8");

/** Extract one top-level job block from the workflow (2-space indented key). */
function jobBlock(job: string): string {
  const m = new RegExp(`^ {2}${job}:\\s*$`, "m").exec(workflow);
  assert.ok(m, `quality.yml must define job "${job}"`);
  const rest = workflow.slice(m.index + m[0].length);
  const next = /^ {2}[A-Za-z0-9_-]+:\s*$/m.exec(rest);
  return next ? rest.slice(0, next.index) : rest;
}

test("lint-guard carries the quality-ratchet engine (collect → ratchet → require-tighten → codeql)", () => {
  const block = jobBlock("lint-guard");
  for (const needle of [
    "npm run quality:collect",
    "check-quality-ratchet.mjs --allow-missing",
    "--require-tighten",
    "npm run check:codeql-ratchet",
  ]) {
    assert.ok(block.includes(needle), `lint-guard must run "${needle}"`);
  }
  // The CodeQL ratchet reads open code-scanning alerts; without this permission
  // the API call 403s and the gate silently self-skips forever.
  assert.match(block, /security-events:\s*read/, "lint-guard needs security-events: read");
});

test("fast-gates carries the deterministic ratchets and security scanners from the main rail", () => {
  const block = jobBlock("fast-gates");
  // #8542: all gates run inside a single aggregation step's bash loop.
  // Check that the gate names appear in the arrays or the loop body.
  for (const needle of [
    "cycles lockfile duplication dead-code type-coverage compression-budget",
    "secrets vuln-ratchet workflows openapi-breaking",
    "typecheck:core",
    "check:dashboard-typecheck",
    "check:ts7-diagnostics-ratchet",
  ]) {
    assert.ok(block.includes(needle), `fast-gates must contain "${needle}"`);
  }
  assert.ok(
    block.includes(
      "BASE_REF: ${{ github.base_ref && format('origin/{0}', github.base_ref) || '' }}"
    ),
    "oasdiff must receive the origin-prefixed base ref fetched by actions/checkout"
  );
  for (const version of [
    "GITLEAKS_VERSION=v",
    "OSV_SCANNER_VERSION=v",
    "ACTIONLINT_VERSION=v",
    "ZIZMOR_VERSION=",
    "OASDIFF_VERSION=v",
  ]) {
    assert.ok(block.includes(version), `fast-gates must pin ${version.split("=")[0]}`);
  }
  assert.doesNotMatch(
    block,
    /download-actionlint\.bash\) latest/,
    "actionlint must not use latest"
  );
});

test("the complexity ratchet stays on the release rail (G0's written validation criterion)", () => {
  assert.ok(
    jobBlock("fast-gates").includes("complexity-ratchets"),
    "a complexity regression in a PR→release/** must be blocked by fast-gates"
  );
});

test("the TS7 shadow and zero-new-diagnostics ratchet use one pinned compiler and core scope", () => {
  const block = jobBlock("fast-gates");
  assert.match(block, /typescript@7\.0\.2/, "TS7 diagnostics must use the reviewed compiler");
  // The ratchet is folded into the non-fail-fast aggregation step (#8542 — a
  // separate blocking step would let an earlier red gate mask it), so its base
  // ref arrives via that step's PR_BASE_SHA env binding.
  assert.match(
    block,
    /PR_BASE_SHA:\s*\$\{\{ github\.event\.pull_request\.base\.sha \}\}/,
    "the ratchet must compare against the exact pull-request base commit"
  );
  assert.match(
    block,
    /check:ts7-diagnostics-ratchet -- --base-ref "\$PR_BASE_SHA"/,
    "the ratchet invocation must consume the pull-request base sha"
  );
  assert.ok(
    block.includes("tsconfig.typecheck-core.json"),
    "the advisory shadow must use the same core scope as the blocking ratchet"
  );
});

test("the new gates run on jobs that stay pinned to hosted runners", () => {
  // Complements tests/unit/vps-runner-variable-scope.test.ts: the fast-gates job
  // may not pick up a USE_VPS_RUNNER switch (setup-node measured 20m06s on .113 vs 16s hosted).
  for (const job of ["fast-gates"]) {
    const runsOn = /^ {4}runs-on:\s*(.+)$/m.exec(jobBlock(job));
    assert.ok(runsOn, `${job} must declare runs-on`);
    assert.equal(runsOn[1].trim(), "ubuntu-latest", `${job} must stay pinned to ubuntu-latest`);
  }
  // Documented exception (2026-08-30): a cold full lint with the eslint-plugin-react-hooks 7
  // compiler rules is OOM-killed on the 7 GB hosted runner with no output (status null →
  // exit 1); lint-guard runs on the box's light pool with an explicit 8 GB heap instead.
  const lintRunsOn = /^ {4}runs-on:\s*(.+)$/m.exec(jobBlock("lint-guard"));
  assert.ok(lintRunsOn, "lint-guard must declare runs-on");
  assert.match(
    lintRunsOn[1],
    /omni-light/,
    "lint-guard runs on the box's light pool (OOM on hosted)"
  );
  assert.match(
    jobBlock("lint-guard"),
    /NODE_OPTIONS: --max-old-space-size=8192/,
    "lint-guard needs the explicit heap"
  );
});
