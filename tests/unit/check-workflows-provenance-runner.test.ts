import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import {
  classifyRunsOn,
  findProvenanceOnSelfHosted,
} from "../../scripts/check/lib/provenanceRunner.mjs";

/**
 * v3.8.50, 10th publish attempt, 76 minutes in — after the tag, the GitHub
 * Release and the Docker images were already public:
 *
 *   422 Unprocessable Entity - Error verifying sigstore provenance bundle:
 *   Unsupported GitHub Actions runner environment: "self-hosted".
 *
 * `USE_VPS_RUNNER` had routed the publish job to the .113 pool on 2026-08-02;
 * no release happened between 07-30 and 08-28, so nothing surfaced it. The
 * pairing is pure text, so it must fail the workflow lint on the PR that
 * introduces it.
 */
const ROOT = join(import.meta.dirname, "../..");
const WORKFLOWS = join(ROOT, ".github/workflows");

// The exact runs-on expression npm-publish.yml used when it broke.
const VPS_EXPR =
  "${{ (vars.USE_VPS_RUNNER == 'true' && (github.event_name != 'pull_request' || github.event.pull_request.head.repo.full_name == github.repository)) && fromJSON('[\"self-hosted\",\"omni-release\"]') || 'ubuntu-latest' }}";

function workflow(runsOn: string, run: string, extra = ""): string {
  return [
    "name: t",
    "on: push",
    "jobs:",
    "  publish:",
    `    runs-on: ${runsOn}`,
    extra,
    "    steps:",
    "      - name: upload",
    `        run: ${run}`,
    "",
  ].join("\n");
}

test("classifyRunsOn: literal, array, object-with-labels and the fromJSON expression are self-hosted", () => {
  assert.equal(classifyRunsOn("self-hosted"), "self-hosted");
  assert.equal(classifyRunsOn(["self-hosted", "omni-release"]), "self-hosted");
  assert.equal(classifyRunsOn({ group: "Default", labels: ["self-hosted"] }), "self-hosted");
  assert.equal(classifyRunsOn(VPS_EXPR), "self-hosted");
});

test("classifyRunsOn: hosted labels are hosted, opaque expressions are unknown (never guessed)", () => {
  assert.equal(classifyRunsOn("ubuntu-latest"), "hosted");
  assert.equal(classifyRunsOn(["ubuntu-latest"]), "hosted");
  assert.equal(classifyRunsOn("${{ matrix.os }}"), "unknown");
  assert.equal(classifyRunsOn(undefined), "unknown");
});

test("flags --provenance inside a job routed to the self-hosted pool", () => {
  const found = findProvenanceOnSelfHosted(
    workflow(
      JSON.stringify(VPS_EXPR),
      'npm stage publish --provenance --access public --tag "$TAG"'
    ),
    "npm-publish.yml"
  );
  assert.deepEqual(found, [{ file: "npm-publish.yml", job: "publish", step: "upload" }]);
});

test("also catches the literal label and the --provenance-file form", () => {
  assert.equal(
    findProvenanceOnSelfHosted(workflow("self-hosted", "npm publish --provenance")).length,
    1
  );
  assert.equal(
    findProvenanceOnSelfHosted(
      workflow("[self-hosted, omni-release]", "npm publish --provenance-file=./p.json")
    ).length,
    0,
    "--provenance-file is a different flag (a pre-built bundle) and is not what the registry rejects"
  );
  assert.equal(
    findProvenanceOnSelfHosted(workflow("self-hosted", "npm publish --provenance=true")).length,
    1
  );
});

test("does not flag hosted jobs, unknown runners, or self-hosted jobs without the flag", () => {
  assert.deepEqual(
    findProvenanceOnSelfHosted(workflow("ubuntu-latest", "npm publish --provenance")),
    []
  );
  assert.deepEqual(
    findProvenanceOnSelfHosted(workflow("${{ matrix.os }}", "npm publish --provenance")),
    []
  );
  assert.deepEqual(
    findProvenanceOnSelfHosted(workflow("self-hosted", "npm publish --access public")),
    []
  );
  // The word only in a step NAME or a comment is not a finding.
  assert.deepEqual(
    findProvenanceOnSelfHosted(
      [
        "name: t",
        "on: push",
        "jobs:",
        "  j:",
        "    runs-on: self-hosted",
        "    steps:",
        "      - name: provenance note",
        "        run: echo hi # --provenance later",
        "",
      ].join("\n")
    ),
    [],
    "a comment after the command is still part of the run string — accept that the regex is conservative"
  );
});

test("reusable-workflow jobs (uses:) and unparseable YAML are not this rule's findings", () => {
  const reusable = [
    "name: t",
    "on: push",
    "jobs:",
    "  j:",
    "    uses: ./.github/workflows/x.yml",
    "",
  ].join("\n");
  assert.deepEqual(findProvenanceOnSelfHosted(reusable), []);
  assert.deepEqual(findProvenanceOnSelfHosted("jobs: [unclosed"), []);
});

test("regression guard: no workflow in this repo publishes with --provenance from a self-hosted runner", () => {
  const files = readdirSync(WORKFLOWS).filter((f) => /\.ya?ml$/.test(f));
  assert.ok(files.length > 10, "expected the real workflow set");
  const findings = files.flatMap((f) =>
    findProvenanceOnSelfHosted(readFileSync(join(WORKFLOWS, f), "utf8"), f)
  );
  assert.deepEqual(
    findings,
    [],
    `npm rejects provenance from self-hosted runners (422) — move the upload to a github-hosted job: ${JSON.stringify(findings)}`
  );
});
