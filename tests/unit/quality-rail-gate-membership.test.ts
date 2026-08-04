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
  for (const needle of [
    "npm run check:cycles",
    "npm run check:lockfile",
    "npm run check:duplication",
    "npm run check:dead-code",
    "npm run check:type-coverage",
    "npm run check:compression-budget",
    "npm run check:secrets -- --ratchet",
    "npm run check:vuln-ratchet -- --ratchet",
    "npm run check:workflows -- --ratchet",
    "npm run check:openapi-breaking -- --ratchet",
  ]) {
    assert.ok(block.includes(needle), `fast-gates must run "${needle}"`);
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
    jobBlock("fast-gates").includes("npm run check:complexity-ratchets"),
    "a complexity regression in a PR→release/** must be blocked by fast-gates"
  );
});

test("the new gates run on jobs that stay pinned to hosted runners", () => {
  // Complements tests/unit/vps-runner-variable-scope.test.ts: neither gate job
  // may pick up a USE_VPS_RUNNER switch (setup-node measured 20m06s on .113 vs 16s hosted).
  for (const job of ["lint-guard", "fast-gates"]) {
    const runsOn = /^ {4}runs-on:\s*(.+)$/m.exec(jobBlock(job));
    assert.ok(runsOn, `${job} must declare runs-on`);
    assert.equal(runsOn[1].trim(), "ubuntu-latest", `${job} must stay pinned to ubuntu-latest`);
  }
});
