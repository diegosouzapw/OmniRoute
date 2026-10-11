/**
 * Contract test for .github/workflows/preview-artifact.yml — the PR preview
 * artifact / build-once lane of #8084 slice (a), rehearsed in 3.8.58.
 *
 * What must hold (and what a "small cleanup" of the YAML must not break):
 *   - triggers: workflow_dispatch(pr_number) or the `preview-artifact` label only;
 *   - fork PRs never build (label path guarded in the job `if:`, dispatch path
 *     re-checked from the API before checkout);
 *   - one build, validated by check:pack-artifact + check:pack-boot with fake
 *     secrets, then identity + upload of THOSE bytes (re-pack digest check);
 *   - OIDC/attestation permissions only in the `attest` job, which never checks
 *     out or runs repository code, and runs on a GitHub-hosted runner;
 *   - nothing publishes; every external action is pinned to a full SHA.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const FILE = path.join(repoRoot, ".github/workflows/preview-artifact.yml");

type Step = {
  name?: string;
  uses?: string;
  run?: string;
  with?: Record<string, unknown>;
  env?: Record<string, string>;
};
type Job = {
  if?: string;
  needs?: string | string[];
  "runs-on"?: unknown;
  permissions?: Record<string, string>;
  steps?: Step[];
  env?: Record<string, string>;
};
type Workflow = {
  on: {
    workflow_dispatch?: { inputs: { pr_number: { required: boolean } } };
    pull_request?: { types: string[] };
    [trigger: string]: unknown;
  };
  permissions?: Record<string, string>;
  jobs: Record<string, Job>;
};

const raw = fs.readFileSync(FILE, "utf8");
const wf = yaml.load(raw) as Workflow;

function stepIndex(job: Job, predicate: (s: Step) => boolean, label: string): number {
  const idx = (job.steps ?? []).findIndex(predicate);
  assert.ok(idx >= 0, `step ${label} must exist`);
  return idx;
}
const runs = (cmd: string) => (s: Step) => typeof s.run === "string" && s.run.includes(cmd);
const uses = (action: string) => (s: Step) =>
  typeof s.uses === "string" && s.uses.startsWith(`${action}@`);

test("triggers: manual dispatch with pr_number, or the preview-artifact label", () => {
  assert.deepEqual(Object.keys(wf.on).sort(), ["pull_request", "workflow_dispatch"]);
  assert.equal(wf.on.workflow_dispatch?.inputs.pr_number.required, true);
  assert.deepEqual(wf.on.pull_request?.types, ["labeled"]);
  assert.ok(!("pull_request_target" in wf.on), "never pull_request_target");
  assert.match(wf.jobs.resolve.if ?? "", /github\.event\.label\.name == 'preview-artifact'/);
});

test("fork PRs never build: job guard + API re-check before checkout", () => {
  assert.match(
    wf.jobs.resolve.if ?? "",
    /github\.event\.pull_request\.head\.repo\.full_name == github\.repository/
  );
  const resolveScript = (wf.jobs.resolve.steps ?? []).map((s) => s.run ?? "").join("\n");
  assert.match(resolveScript, /\.head\.repo\.full_name/);
  assert.match(resolveScript, /"\$HEAD_REPO" != "\$REPO"/);
  assert.match(resolveScript, /\^\[0-9\]\+\$/, "pr_number validated as an integer");
  const needs = ([] as string[]).concat(wf.jobs.build.needs ?? []);
  assert.ok(needs.includes("resolve"), "build must depend on the fork check");
});

test("build runs the full validation chain once, in order", () => {
  const job = wf.jobs.build;
  const checkout = stepIndex(job, uses("actions/checkout"), "checkout");
  const install = stepIndex(job, (s) => s.uses === "./.github/actions/npm-ci-retry", "npm ci");
  const build = stepIndex(job, runs("npm run build:release"), "build:release");
  const packArtifact = stepIndex(job, runs("npm run check:pack-artifact"), "check:pack-artifact");
  const pack = stepIndex(job, runs("npm pack --json"), "npm pack");
  const boot = stepIndex(job, runs("npm run check:pack-boot"), "check:pack-boot");
  const repack = stepIndex(job, runs("re-pack"), "re-pack digest check");
  const identity = stepIndex(job, runs("scripts/release/artifact-identity.mjs"), "identity");
  const upload = stepIndex(job, uses("actions/upload-artifact"), "upload");
  const order = [checkout, install, build, packArtifact, pack, boot, repack, identity, upload];
  assert.deepEqual(
    [...order].sort((a, b) => a - b),
    order,
    "checkout → npm ci → build → pack-artifact → pack → pack-boot → re-pack → identity → upload"
  );
  assert.equal(
    (job.steps ?? []).filter(runs("npm run build")).length,
    1,
    "exactly one build: promotion consumes the uploaded bytes, never a rebuild"
  );
  assert.equal(job.steps?.[checkout].with?.ref, "${{ needs.resolve.outputs.head_sha }}");
  assert.equal(job.steps?.[checkout].with?.["persist-credentials"], false);
  assert.equal(String(job.steps?.[install].with?.cache), "false");
});

test("boot-smoke uses fake secrets and an ephemeral DATA_DIR", () => {
  const job = wf.jobs.build;
  assert.match(job.env?.JWT_SECRET ?? "", /fake/);
  assert.match(job.env?.API_KEY_SECRET ?? "", /fake/);
  assert.ok(!/secrets\./.test(JSON.stringify(job)), "the build job reads no repository secret");
  const boot = job.steps?.find(runs("npm run check:pack-boot"));
  assert.match(boot?.env?.DATA_DIR ?? "", /runner\.temp/);
});

test("identity records head + base SHA from resolve and hashes the uploaded tarball", () => {
  const step = wf.jobs.build.steps?.find(runs("scripts/release/artifact-identity.mjs"));
  assert.equal(step?.env?.HEAD_SHA, "${{ needs.resolve.outputs.head_sha }}");
  assert.equal(step?.env?.BASE_SHA, "${{ needs.resolve.outputs.base_sha }}");
  for (const flag of ["--head", "--base", "--lockfile", "--tarball", "--out"]) {
    assert.ok(step?.run?.includes(flag), `identity step passes ${flag}`);
  }
  assert.match(step?.run ?? "", /SHA256SUMS/);
});

test("OIDC + attestation permissions live ONLY in the attest job", () => {
  assert.deepEqual(Object.keys(wf.permissions ?? {}), ["contents"]);
  assert.equal(wf.permissions?.contents, "read");
  for (const [id, job] of Object.entries(wf.jobs)) {
    assert.ok(job.permissions, `job ${id} declares explicit permissions`);
    const writes = Object.entries(job.permissions ?? {})
      .filter(([, v]) => v === "write")
      .map(([k]) => k)
      .sort();
    if (id === "attest") {
      assert.deepEqual(writes, ["attestations", "id-token"]);
    } else {
      assert.deepEqual(writes, [], `job ${id} must not hold write permissions`);
    }
  }
});

test("attest never runs repository code and runs on a GitHub-hosted runner", () => {
  const job = wf.jobs.attest;
  assert.equal(job["runs-on"], "ubuntu-latest");
  for (const step of job.steps ?? []) {
    assert.ok(!step.uses?.startsWith("actions/checkout"), "attest must not check out the PR");
    assert.ok(!step.uses?.startsWith("./"), "attest must not use a repository-local action");
    assert.ok(!/\bnpm\b|\bnode\b/.test(step.run ?? ""), "attest must not execute repo scripts");
  }
  const attest = job.steps?.find(uses("actions/attest-build-provenance"));
  assert.ok(attest, "attest-build-provenance step");
  assert.match(String(attest?.with?.["subject-path"]), /\.tgz$/);
  const verify = stepIndex(job, runs("sha256sum -c SHA256SUMS"), "checksum verify");
  const sign = stepIndex(job, uses("actions/attest-build-provenance"), "attest");
  assert.ok(verify < sign, "checksums are verified before signing");
});

test("every external action is pinned to a full commit SHA", () => {
  for (const job of Object.values(wf.jobs)) {
    for (const step of job.steps ?? []) {
      if (!step.uses || step.uses.startsWith("./")) continue;
      assert.match(step.uses, /^[\w.-]+\/[\w.-]+@[0-9a-f]{40}$/, `unpinned action: ${step.uses}`);
    }
  }
});

test("nothing publishes", () => {
  assert.doesNotMatch(
    raw,
    /npm (stage )?publish|npm dist-tag|docker push|gh release (create|upload)/
  );
  assert.doesNotMatch(raw, /NPM_TOKEN|NODE_AUTH_TOKEN/);
});
