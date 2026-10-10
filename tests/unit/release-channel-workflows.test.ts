/**
 * Contract tests for the release-channel workflows of the 3.9.0 LTS / v4 rail
 * (docs/ops/RELEASE_STRATEGY.md):
 *
 *   - npm-publish.yml resolves `tag=auto` through scripts/release/dist-tag.mjs, so a
 *     `-nightly.*` build can never claim `latest` (Task 6 finding) and a 3.x patch
 *     after the 4.0 GA lands on `lts`. The step is EXECUTED here against a scratch
 *     git repository, not just grepped.
 *   - forward-port.yml / validate-stable-pr.yml / nightly-v4-build.yml stay DORMANT
 *     (only fire for `stable/v3` / `develop`), use explicit least-privilege
 *     permissions and SHA-pinned actions, and keep the behavior the strategy doc
 *     promises (cherry-pick -x + Co-authored-by, draft on conflict, LTS title scope,
 *     nightly publish gated on vars.NIGHTLY_PUBLISH).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as yaml from "js-yaml";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

type Step = {
  name?: string;
  uses?: string;
  run?: string;
  if?: string;
  env?: Record<string, string>;
};
type Job = {
  if?: string;
  needs?: string | string[];
  permissions?: Record<string, string> | string;
  steps?: Step[];
};
type Workflow = {
  on: Record<string, unknown>;
  permissions?: Record<string, string>;
  jobs: Record<string, Job>;
};

function loadWorkflow(file: string): { raw: string; wf: Workflow } {
  const raw = fs.readFileSync(path.join(repoRoot, ".github/workflows", file), "utf8");
  return { raw, wf: yaml.load(raw) as Workflow };
}

function findStep(job: Job, name: string): Step {
  const step = job.steps?.find((s) => s.name === name);
  assert.ok(step, `step "${name}" must exist`);
  return step;
}

const NEW_WORKFLOWS = ["forward-port.yml", "validate-stable-pr.yml", "nightly-v4-build.yml"];

// ── shared hardening of the new workflows ──────────────────────────────────

for (const file of NEW_WORKFLOWS) {
  test(`${file}: top-level permissions are read-only and every job declares its own`, () => {
    const { wf } = loadWorkflow(file);
    assert.deepEqual(wf.permissions, { contents: "read" });
    for (const [id, job] of Object.entries(wf.jobs)) {
      assert.ok(job.permissions !== undefined, `job ${id} must declare explicit permissions`);
    }
  });

  test(`${file}: every external action is pinned to a full commit SHA`, () => {
    const { wf } = loadWorkflow(file);
    for (const job of Object.values(wf.jobs)) {
      for (const step of job.steps ?? []) {
        if (!step.uses || step.uses.startsWith("./")) continue;
        assert.match(step.uses, /^[\w.-]+\/[\w.-]+@[0-9a-f]{40}$/, `unpinned action: ${step.uses}`);
      }
    }
  });

  test(`${file}: never triggers on the current branches (dormant)`, () => {
    const { wf } = loadWorkflow(file);
    const triggers = Object.keys(wf.on).sort();
    assert.ok(!triggers.includes("pull_request_target"), "pull_request_target is forbidden");
    for (const trigger of ["push", "pull_request"]) {
      const cfg = wf.on[trigger] as { branches?: string[] } | undefined;
      if (cfg)
        assert.deepEqual(cfg.branches, ["stable/v3"], `${trigger} must be pinned to stable/v3`);
    }
  });
}

// ── npm-publish.yml: dist-tag resolution ───────────────────────────────────

test("npm-publish: auto delegates to dist-tag.mjs instead of the old inline regex", () => {
  const { wf } = loadWorkflow("npm-publish.yml");
  const run = findStep(wf.jobs.publish, "Resolve version, dist-tag and skip flag").run ?? "";
  assert.match(run, /node scripts\/release\/dist-tag\.mjs/);
  assert.doesNotMatch(
    run,
    /grep -qE -- '-\(rc\|alpha\|beta\|pre\|next\)'/,
    "the inline pre-release regex that ignored -nightly must be gone"
  );
  assert.doesNotMatch(run, /\$\{\{/, "no expression may be interpolated into the script body");
});

test("npm-publish: dispatch offers the nightly and lts dist-tags", () => {
  const { wf } = loadWorkflow("npm-publish.yml");
  const dispatch = wf.on.workflow_dispatch as { inputs: { tag: { options: string[] } } };
  assert.deepEqual(dispatch.inputs.tag.options, [
    "auto",
    "latest",
    "next",
    "nightly",
    "lts",
    "historic",
  ]);
});

/** Executes the real resolve step in a scratch repo with the given tags and inputs. */
function runResolveStep(version: string, tags: string[], requested = "auto") {
  const { wf } = loadWorkflow("npm-publish.yml");
  const script = findStep(wf.jobs.publish, "Resolve version, dist-tag and skip flag").run ?? "";
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-npm-publish-resolve-"));
  try {
    const git = (...args: string[]) =>
      execFileSync("git", args, {
        cwd: dir,
        stdio: "pipe",
        env: { ...process.env, GIT_CONFIG_GLOBAL: "/dev/null" },
      });
    git("init", "-q");
    git("-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "--allow-empty", "-m", "init");
    for (const tag of tags) git("tag", tag);
    fs.mkdirSync(path.join(dir, "scripts/release"), { recursive: true });
    fs.copyFileSync(
      path.join(repoRoot, "scripts/release/dist-tag.mjs"),
      path.join(dir, "scripts/release/dist-tag.mjs")
    );
    // Fake `npm`: "not published yet" for the skip check.
    const bin = path.join(dir, "bin");
    fs.mkdirSync(bin);
    fs.writeFileSync(path.join(bin, "npm"), "#!/bin/sh\nexit 0\n", { mode: 0o755 });
    const output = path.join(dir, "github_output");
    fs.writeFileSync(output, "");
    const res = spawnSync("bash", ["-c", script], {
      cwd: dir,
      encoding: "utf8",
      env: {
        ...process.env,
        PATH: `${bin}${path.delimiter}${process.env.PATH}`,
        GITHUB_OUTPUT: output,
        EVENT_NAME: "workflow_dispatch",
        REF_NAME: "release/v3.8.52",
        INPUT_VERSION: version,
        INPUT_TAG: requested,
      },
    });
    assert.equal(res.status, 0, `resolve step failed: ${res.stderr}`);
    const out = Object.fromEntries(
      fs
        .readFileSync(output, "utf8")
        .split("\n")
        .filter(Boolean)
        .map((line) => line.split("=") as [string, string])
    );
    return out;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

const TAGS_V3 = ["v3.8.51", "v3.8.52", "v4.0.0-rc.1"];
const TAGS_GA = [...TAGS_V3, "v3.9.0", "v3.9.2", "v4.0.0"];

test("npm-publish step: stable 3.8.x keeps resolving to latest / historic", () => {
  assert.equal(runResolveStep("3.8.52", TAGS_V3).tag, "latest");
  assert.equal(runResolveStep("3.8.51", TAGS_V3).tag, "historic");
});

test("npm-publish step: a 4.0.0 nightly can never take latest", () => {
  const out = runResolveStep("4.0.0-nightly.20261009.f90e64a", TAGS_V3);
  assert.equal(out.tag, "nightly");
  assert.equal(out.version, "4.0.0-nightly.20261009.f90e64a");
});

test("npm-publish step: rc → next; 3.9.x after 4.0 GA → lts", () => {
  assert.equal(runResolveStep("4.0.0-rc.2", TAGS_V3).tag, "next");
  assert.equal(runResolveStep("3.9.2", TAGS_GA).tag, "lts");
  assert.equal(runResolveStep("3.9.0", TAGS_GA).tag, "historic");
  assert.equal(runResolveStep("4.0.0", TAGS_GA).tag, "latest");
});

test("npm-publish step: an explicit tag is honored", () => {
  assert.equal(runResolveStep("3.8.51", TAGS_V3, "latest").tag, "latest");
});

// ── forward-port.yml ───────────────────────────────────────────────────────

test("forward-port: guarded to stable/v3, cherry-picks with credit, drafts on conflict", () => {
  const { wf } = loadWorkflow("forward-port.yml");
  const job = wf.jobs["forward-port"];
  assert.match(job.if ?? "", /github\.ref == 'refs\/heads\/stable\/v3'/);
  assert.deepEqual(job.permissions, { contents: "write", "pull-requests": "write" });
  assert.match(
    findStep(job, "Check that develop exists").run ?? "",
    /git ls-remote --heads origin develop/
  );
  const run = findStep(job, "Cherry-pick and open PRs").run ?? "";
  assert.match(run, /git cherry-pick -x "\$SHA"/);
  assert.match(run, /Co-authored-by: \$\{AUTHOR\}/);
  assert.match(run, /BRANCH="forward-port\/\$\{SHORT\}"/);
  assert.match(run, /DRAFT="--draft"/);
  assert.match(run, /--base develop/);
  assert.match(run, /--label forward-port/);
});

// ── validate-stable-pr.yml (the run body is executed) ──────────────────────

function runStableCheck(title: string, labels: string[]) {
  const { wf } = loadWorkflow("validate-stable-pr.yml");
  const script = findStep(wf.jobs.validate, "Check title scope or lts label").run ?? "";
  return spawnSync("bash", ["-c", script], {
    encoding: "utf8",
    env: { ...process.env, PR_TITLE: title, PR_LABELS: labels.join(",") },
  });
}

test("validate-stable-pr: accepts LTS-scoped titles", () => {
  for (const title of [
    "fix(sse): keep siblings after 413",
    "fix: plain fix",
    "docs: clarify the LTS window",
    "docs(ops)!: rewrite strategy",
    "chore(i18n): sync pt-BR",
    "feat(providers): add GPT-6.1 Sol",
  ]) {
    assert.equal(runStableCheck(title, []).status, 0, title);
  }
});

test("validate-stable-pr: rejects other scopes unless labelled lts, pointing at the strategy", () => {
  for (const title of [
    "feat(api): new endpoint",
    "chore(deps): bump",
    "refactor: x",
    "fixes stuff",
  ]) {
    const res = runStableCheck(title, ["enhancement"]);
    assert.equal(res.status, 1, title);
    assert.match(res.stdout, /docs\/ops\/RELEASE_STRATEGY\.md/);
  }
  assert.equal(runStableCheck("feat(api): backport", ["bug", "lts"]).status, 0);
  assert.equal(runStableCheck("feat(api): backport", ["lts-candidate"]).status, 1);
});

test("validate-stable-pr: only fires for stable/v3 and receives the title through env", () => {
  const { raw, wf } = loadWorkflow("validate-stable-pr.yml");
  assert.match(wf.jobs.validate.if ?? "", /github\.base_ref == 'stable\/v3'/);
  const run = findStep(wf.jobs.validate, "Check title scope or lts label").run ?? "";
  assert.doesNotMatch(run, /\$\{\{/);
  assert.match(raw, /PR_TITLE: \$\{\{ github\.event\.pull_request\.title \}\}/);
});

// ── nightly-v4-build.yml ───────────────────────────────────────────────────

test("nightly-v4-build: schedule + dispatch only, gated on develop existing", () => {
  const { wf } = loadWorkflow("nightly-v4-build.yml");
  assert.deepEqual(Object.keys(wf.on).sort(), ["schedule", "workflow_dispatch"]);
  assert.match(
    findStep(wf.jobs.detect, "Check that develop exists").run ?? "",
    /git ls-remote --heads "\$REPO_URL" develop/
  );
  assert.match(wf.jobs.build.if ?? "", /&& needs\.detect\.outputs\.exists == 'true'$/);
  for (const [id, job] of Object.entries(wf.jobs)) {
    // Scheduled runs stay upstream (scripts/check/check-workflows.mjs scheduled-guard).
    assert.match(
      job.if ?? "",
      /github\.event_name != 'schedule' \|\| github\.repository == 'diegosouzapw\/OmniRoute'/,
      `job ${id} needs the upstream-only schedule guard`
    );
  }
});

test("nightly-v4-build: builds with the version script and validates the pack artifact", () => {
  const { wf } = loadWorkflow("nightly-v4-build.yml");
  const runs = (wf.jobs.build.steps ?? []).map((s) => s.run ?? "").join("\n");
  assert.match(runs, /node scripts\/release\/compute-nightly-version\.mjs/);
  assert.match(runs, /npm run build:release/);
  assert.match(runs, /npm run check:pack-artifact/);
  assert.deepEqual(wf.jobs.build.permissions, { contents: "read" });
});

test("nightly-v4-build: publishes --tag nightly --provenance ONLY behind vars.NIGHTLY_PUBLISH", () => {
  const { wf } = loadWorkflow("nightly-v4-build.yml");
  const publish = wf.jobs.publish;
  assert.match(publish.if ?? "", /&& vars\.NIGHTLY_PUBLISH == 'true'$/);
  assert.deepEqual(publish.permissions, { contents: "read", "id-token": "write" });
  const run = findStep(publish, "Publish with --tag nightly").run ?? "";
  assert.match(run, /npm publish "\$TARBALL" --provenance --access public --tag nightly/);
  // No other job may publish.
  for (const [id, job] of Object.entries(wf.jobs)) {
    if (id === "publish") continue;
    const runs = (job.steps ?? []).map((s) => s.run ?? "").join("\n");
    assert.doesNotMatch(runs, /npm publish/, `job ${id} must not publish`);
  }
});
