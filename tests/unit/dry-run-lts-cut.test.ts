/**
 * scripts/release/dry-run-lts-cut.mjs — the 3.9.0 LTS cut, rehearsed in 3.8.58.
 *
 * Default mode prints and VALIDATES the cut without executing anything:
 * preconditions → stable/v3 from the tip → develop with the 4.0.0 bump → which
 * dormant-workflow conditions turn true → expected dist-tags → rollback.
 * `--execute` only ever targets a fork remote (never `origin`, never a remote
 * whose URL is the canonical repository) and confirms every step.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CANONICAL_REPO,
  DEFAULTS,
  analyzeDormantWorkflow,
  buildCutPlan,
  bumpLockfile,
  bumpManifest,
  bumpOpenApi,
  evaluateMergifyQueue,
  evaluatePreconditions,
  executeCut,
  expectedDistTags,
  isCanonicalRemoteUrl,
  parseCutArgs,
  renderReport,
  runCut,
} from "../../scripts/release/dry-run-lts-cut.mjs";
import { resolveDistTag } from "../../scripts/release/dist-tag.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SCRIPT = path.join(repoRoot, "scripts/release/dry-run-lts-cut.mjs");
const SHA = "1".repeat(40);
// The real .mergify.yml of this checkout (G11: queue `release` with checks_timeout, #16066).
const MERGIFY = fs.readFileSync(path.join(repoRoot, ".mergify.yml"), "utf8");

type Facts = Parameters<typeof evaluatePreconditions>[0];

function goodFacts(overrides: Partial<Facts> = {}): Facts {
  return {
    sourceSha: SHA,
    sourceVersion: "3.9.0",
    previousTagExists: true,
    freezeIssues: [{ number: 900, title: "🧊 Release freeze: release/v3.9.0" }],
    baseRedIssues: [],
    sourceBranchExists: true,
    mergifyConfig: MERGIFY,
    queueLabelExists: true,
    releaseRulesetRules: ["deletion", "non_fast_forward"],
    remoteBranches: { "stable/v3": null, develop: null },
    ...overrides,
  };
}

// ── argument parsing ──────────────────────────────────────────────────────

test("defaults to --dry-run against the real 3.9.0 cut parameters", () => {
  const opts = parseCutArgs([]);
  assert.equal(opts.mode, "dry-run");
  assert.equal(opts.rollback, false);
  assert.equal(opts.targetVersion, "3.9.0");
  assert.equal(opts.previousTag, "v3.8.59");
  assert.equal(opts.developVersion, "4.0.0");
  assert.equal(opts.from, "HEAD");
  assert.equal(opts.repo, CANONICAL_REPO);
  assert.equal(opts.sourceBranch, "release/v3.9.0");
  assert.equal(DEFAULTS.stableBranch, "stable/v3");
  assert.equal(DEFAULTS.developBranch, "develop");
});

test("--execute requires --remote and refuses origin", () => {
  assert.throws(() => parseCutArgs(["--execute"]), /--execute requires --remote/);
  assert.throws(() => parseCutArgs(["--execute", "--remote", "origin"]), /never origin/);
  const opts = parseCutArgs(["--execute", "--remote", "rehearsal"]);
  assert.equal(opts.mode, "execute");
  assert.equal(opts.remote, "rehearsal");
});

test("flag validation: exclusive modes, rollback only with execute, known advisory ids", () => {
  assert.throws(() => parseCutArgs(["--execute", "--dry-run", "--remote", "x"]), /exclusive/);
  assert.throws(() => parseCutArgs(["--rollback"]), /--rollback requires --execute/);
  assert.throws(() => parseCutArgs(["--advisory", "nope"]), /Unknown precondition/);
  assert.throws(() => parseCutArgs(["--remote"]), /--remote needs a value/);
  assert.throws(() => parseCutArgs(["--bogus"]), /Unknown flag/);
  const rehearsal = parseCutArgs([
    "--target-version",
    "3.8.58",
    "--previous-tag",
    "v3.8.57",
    "--advisory",
    "freeze,base-green",
  ]);
  assert.equal(rehearsal.targetVersion, "3.8.58");
  assert.equal(rehearsal.sourceBranch, "release/v3.8.58");
  assert.deepEqual([...rehearsal.advisory].sort(), ["base-green", "freeze"]);
});

test("isCanonicalRemoteUrl catches every URL form of the canonical repository", () => {
  for (const url of [
    "https://github.com/diegosouzapw/OmniRoute.git",
    "https://github.com/diegosouzapw/omniroute",
    "git@github.com:diegosouzapw/OmniRoute.git",
    "ssh://git@github.com/diegosouzapw/OmniRoute.git",
    "https://x-access-token:abc@github.com/diegosouzapw/OmniRoute.git",
  ]) {
    assert.equal(isCanonicalRemoteUrl(url, CANONICAL_REPO), true, url);
  }
  for (const url of [
    "https://github.com/someone/OmniRoute.git",
    "git@github.com:diegosouzapw/OmniRoute-rehearsal.git",
    "",
  ]) {
    assert.equal(isCanonicalRemoteUrl(url, CANONICAL_REPO), false, url);
  }
});

// ── preconditions ─────────────────────────────────────────────────────────

test("all preconditions pass on a ready cut", () => {
  const checks = evaluatePreconditions(goodFacts(), parseCutArgs([]));
  assert.deepEqual(
    checks.map((c) => c.id),
    [
      "source",
      "tag",
      "version",
      "freeze",
      "base-green",
      "merge-queue",
      "release-ruleset",
      "branches-absent",
    ]
  );
  assert.ok(checks.every((c) => c.ok && c.blocking));
});

test("each failing precondition is reported with expected vs actual", () => {
  const opts = parseCutArgs([]);
  const cases: [Partial<Facts>, string, RegExp][] = [
    [{ sourceSha: null }, "source", /does not resolve/],
    [{ previousTagExists: false }, "tag", /missing/],
    [{ sourceVersion: "3.8.59" }, "version", /3\.8\.59/],
    [{ freezeIssues: [] }, "freeze", /none open/],
    [
      { baseRedIssues: [{ number: 15306, title: "🔴 Release branch not green: release/v3.9.0" }] },
      "base-green",
      /#15306/,
    ],
    [{ remoteBranches: { "stable/v3": SHA, develop: null } }, "branches-absent", /stable\/v3/],
    [{ freezeIssues: null }, "freeze", /unknown/],
    [{ queueLabelExists: false }, "merge-queue", /label `queue` missing/],
    [{ mergifyConfig: null }, "merge-queue", /\.mergify\.yml missing/],
    [{ releaseRulesetRules: ["deletion"] }, "release-ruleset", /missing: non_fast_forward/],
    [{ releaseRulesetRules: null }, "release-ruleset", /unknown/],
  ];
  for (const [override, id, actual] of cases) {
    const check = evaluatePreconditions(goodFacts(override), opts).find((c) => c.id === id);
    assert.equal(check?.ok, false, `${id} must fail`);
    assert.match(String(check?.actual), actual);
    assert.ok(check?.expected, `${id} states what it expected`);
  }
});

test("base-green is unknown (never green) when the release branch does not exist", () => {
  const opts = parseCutArgs([]);
  const missing = evaluatePreconditions(goodFacts({ sourceBranchExists: false }), opts).find(
    (c) => c.id === "base-green"
  );
  assert.equal(missing?.ok, false, "no issue for a branch that does not exist is not evidence");
  assert.equal(missing?.verifiable, false);
  assert.match(String(missing?.actual), /unknown .*does not exist.*not verifiable/);
  const lookupFailed = evaluatePreconditions(goodFacts({ sourceBranchExists: null }), opts).find(
    (c) => c.id === "base-green"
  );
  assert.equal(lookupFailed?.ok, false);
  assert.doesNotMatch(String(lookupFailed?.actual), /green$/);
  const existing = evaluatePreconditions(goodFacts(), opts).find((c) => c.id === "base-green");
  assert.equal(existing?.ok, true);
  assert.equal(existing?.verifiable, true);
});

test("G11 is the Mergify `release` queue, not GitHub's native merge queue", () => {
  assert.deepEqual(
    evaluateMergifyQueue(MERGIFY),
    { ok: true, problems: [] },
    "G11 GO on this base"
  );
  const noTimeout = MERGIFY.replace(/^ {4}checks_timeout:.*\n/m, "");
  assert.notEqual(noTimeout, MERGIFY, "fixture removed checks_timeout");
  assert.deepEqual(evaluateMergifyQueue(noTimeout).problems, [
    "queue `release` has no checks_timeout",
  ]);
  assert.match(
    evaluateMergifyQueue("queue_rules:\n  - name: other\n").problems.join(),
    /no queue_rules entry named `release`/
  );
  const noLabel = MERGIFY.replace(/label ?= ?queue/g, "label=other");
  assert.match(evaluateMergifyQueue(noLabel).problems.join(), /`queue` label/);
  assert.equal(evaluateMergifyQueue(null).ok, false);
  assert.equal(evaluateMergifyQueue(": : :\n  - [").ok, false);
});

test("--advisory downgrades a check to a warning without hiding it", () => {
  const opts = parseCutArgs(["--advisory", "freeze"]);
  const freeze = evaluatePreconditions(goodFacts({ freezeIssues: [] }), opts).find(
    (c) => c.id === "freeze"
  );
  assert.equal(freeze?.ok, false);
  assert.equal(freeze?.blocking, false);
});

// ── develop bump (pure, applied to the real files of this checkout) ───────

test("bumpManifest changes only the top-level version of the real package.json files", () => {
  for (const file of ["package.json", "open-sse/package.json", "electron/package.json"]) {
    const before = fs.readFileSync(path.join(repoRoot, file), "utf8");
    const after = bumpManifest(before, "4.0.0");
    assert.equal(JSON.parse(after).version, "4.0.0", file);
    const changed = before.split("\n").filter((line, i) => line !== after.split("\n")[i]);
    assert.equal(changed.length, 1, `${file}: exactly one line changes`);
  }
  assert.throws(() => bumpManifest('{"name":"x"}', "4.0.0"), /version/);
});

test("bumpLockfile moves the root and the open-sse workspace entries only", () => {
  const before = fs.readFileSync(path.join(repoRoot, "package-lock.json"), "utf8");
  const after = bumpLockfile(before, "4.0.0");
  const lock = JSON.parse(after);
  assert.equal(lock.version, "4.0.0");
  assert.equal(lock.packages[""].version, "4.0.0");
  assert.equal(lock.packages["open-sse"].version, "4.0.0");
  const beforeLines = before.split("\n");
  const changed = after.split("\n").filter((line, i) => line !== beforeLines[i]);
  assert.equal(changed.length, 3);
});

test("bumpOpenApi changes info.version only", () => {
  const before = fs.readFileSync(path.join(repoRoot, "docs/openapi.yaml"), "utf8");
  const after = bumpOpenApi(before, "4.0.0");
  assert.match(after, /^info:\n(?:[ ].*\n)*? {2}version: 4\.0\.0$/m);
  const beforeLines = before.split("\n");
  assert.equal(after.split("\n").filter((line, i) => line !== beforeLines[i]).length, 1);
  assert.throws(() => bumpOpenApi("openapi: 3.1.0\n", "4.0.0"), /info\.version/);
});

// ── plan ──────────────────────────────────────────────────────────────────

test("the plan orders the cut and only ever pushes to the selected remote", () => {
  const opts = parseCutArgs(["--execute", "--remote", "rehearsal"]);
  const plan = buildCutPlan(opts, goodFacts());
  assert.deepEqual(
    plan.steps.map((s) => s.id),
    ["create-stable", "create-develop"]
  );
  for (const step of plan.steps) {
    for (const cmd of step.preview) {
      assert.ok(Array.isArray(cmd), "commands are argv arrays, never shell strings");
      if (cmd[0] === "git" && cmd[1] === "push") assert.equal(cmd[2], "rehearsal");
    }
  }
  assert.deepEqual(plan.steps[0].preview[0], [
    "git",
    "push",
    "rehearsal",
    `${SHA}:refs/heads/stable/v3`,
  ]);
  assert.deepEqual(plan.rollback[0], [
    "git",
    "push",
    "rehearsal",
    "--delete",
    "refs/heads/stable/v3",
    "refs/heads/develop",
  ]);
  assert.deepEqual(plan.rollback[1], ["npm", "dist-tag", "add", "omniroute@3.8.59", "latest"]);
  assert.deepEqual(plan.bumpFiles, [
    "package.json",
    "open-sse/package.json",
    "electron/package.json",
    "package-lock.json",
    "docs/openapi.yaml",
  ]);
});

test("dry-run plans against origin by name but marks every step as not executed", () => {
  const plan = buildCutPlan(parseCutArgs([]), goodFacts());
  assert.equal(plan.remote, "origin");
  assert.equal(plan.executes, false);
});

// ── dormant workflows ─────────────────────────────────────────────────────

const FORWARD_PORT = `
name: Forward-port
on:
  push:
    branches: [stable/v3]
  workflow_dispatch:
jobs:
  forward-port:
    if: github.ref == 'refs/heads/stable/v3' && github.repository == 'diegosouzapw/OmniRoute'
    runs-on: ubuntu-latest
    steps:
      - name: Check that develop exists
        run: git ls-remote --exit-code --heads origin develop
`;
const NIGHTLY = `
name: Nightly
on:
  schedule:
    - cron: "23 4 * * *"
jobs:
  detect:
    runs-on: ubuntu-latest
    steps:
      - run: git ls-remote --heads origin develop
  publish:
    needs: detect
    if: (github.event_name != 'schedule' || github.repository == 'diegosouzapw/OmniRoute') && vars.NIGHTLY_PUBLISH == 'true'
    runs-on: ubuntu-latest
    steps:
      - run: echo publish
`;

test("analyzeDormantWorkflow reports what turns on, what stays gated, and fork caveats", () => {
  const fp = analyzeDormantWorkflow("forward-port.yml", FORWARD_PORT);
  assert.equal(fp.present, true);
  assert.ok(fp.triggers.includes("push → stable/v3"));
  assert.ok(fp.activates.some((l) => /forward-port.*stable\/v3/.test(l)));
  assert.ok(fp.activates.some((l) => /develop exists/.test(l)));
  assert.ok(fp.forkCaveats.some((l) => /diegosouzapw\/OmniRoute/.test(l)));

  const nightly = analyzeDormantWorkflow("nightly-v4-build.yml", NIGHTLY);
  assert.ok(nightly.stillGated.some((l) => /vars\.NIGHTLY_PUBLISH/.test(l)));
  assert.ok(nightly.activates.some((l) => /develop exists/.test(l)));
  assert.ok(
    nightly.forkCaveats.some((l) => /scheduled runs only on .*dispatch it by hand/.test(l)),
    "a schedule-only repo guard is not reported as 'always false' in a fork"
  );

  const missing = analyzeDormantWorkflow("validate-stable-pr.yml", null);
  assert.equal(missing.present, false);
});

// ── dist-tags ─────────────────────────────────────────────────────────────

test("the real dist-tag resolver keeps nightly/rc off latest and 3.9.x on lts after 4.0 GA", () => {
  assert.equal(resolveDistTag("3.9.0", { latestMajor: 3 }), "latest");
  assert.equal(resolveDistTag("4.0.0-nightly.20261010.abcdef0", {}), "nightly");
  assert.equal(resolveDistTag("4.0.0-rc.1", {}), "next");
  assert.equal(resolveDistTag("3.9.1", { latestMajor: 4 }), "lts");
});

test("expectedDistTags: latest → 3.9.0, next/nightly empty, resolver agrees", () => {
  const tags = expectedDistTags(parseCutArgs([]), {
    source: "test",
    resolveDistTag: resolveDistTag,
  });
  assert.deepEqual(tags.expected, { latest: "3.9.0", next: null, nightly: null });
  assert.ok(
    tags.checks.every((c) => c.ok),
    JSON.stringify(tags.checks)
  );
  const broken = expectedDistTags(parseCutArgs([]), {
    source: "broken",
    resolveDistTag: () => "latest",
  });
  assert.ok(
    broken.checks.some((c) => !c.ok),
    "a resolver that leaks nightly to latest is caught"
  );
});

// ── execution guard rails ─────────────────────────────────────────────────

function fakeIo(remoteUrl = "https://github.com/rehearsal-bot/OmniRoute.git") {
  const calls: string[][] = [];
  return {
    calls,
    remoteUrl: (name: string) => (name === "rehearsal" ? remoteUrl : null),
    git: (args: string[]) => {
      calls.push(["git", ...args]);
      return "f".repeat(40);
    },
    createDevelopCommit: () => "d".repeat(40),
  };
}

test("executeCut refuses a remote whose URL is the canonical repository", async () => {
  const io = fakeIo("git@github.com:diegosouzapw/OmniRoute.git");
  const opts = parseCutArgs(["--execute", "--remote", "rehearsal"]);
  await assert.rejects(
    executeCut(buildCutPlan(opts, goodFacts()), opts, io, async () => true),
    /canonical repository/
  );
  assert.deepEqual(io.calls, []);
});

test("executeCut stops at the first declined step and runs nothing after it", async () => {
  const io = fakeIo();
  const opts = parseCutArgs(["--execute", "--remote", "rehearsal"]);
  const result = await executeCut(buildCutPlan(opts, goodFacts()), opts, io, async () => false);
  assert.equal(result.aborted, true);
  assert.deepEqual(io.calls, []);
});

test("executeCut pushes stable/v3 and the bumped develop commit to the fork only", async () => {
  const io = fakeIo();
  const opts = parseCutArgs(["--execute", "--remote", "rehearsal"]);
  const result = await executeCut(buildCutPlan(opts, goodFacts()), opts, io, async () => true);
  assert.equal(result.aborted, false);
  assert.deepEqual(io.calls, [
    ["git", "push", "rehearsal", `${SHA}:refs/heads/stable/v3`],
    ["git", "push", "rehearsal", `${"d".repeat(40)}:refs/heads/develop`],
  ]);
});

test("executeCut --rollback deletes both branches on the fork after confirmation", async () => {
  const io = fakeIo();
  const opts = parseCutArgs(["--execute", "--rollback", "--remote", "rehearsal"]);
  await executeCut(buildCutPlan(opts, goodFacts()), opts, io, async () => true);
  assert.deepEqual(io.calls, [
    ["git", "push", "rehearsal", "--delete", "refs/heads/stable/v3", "refs/heads/develop"],
  ]);
});

// ── report + CLI ──────────────────────────────────────────────────────────

test("runCut in dry-run renders the whole sequence and exits 1 on a failed blocking check", async () => {
  const lines: string[] = [];
  const io = {
    ...fakeIo(),
    gatherFacts: async () => goodFacts({ previousTagExists: false }),
    readWorkflow: (file: string) => (file === "forward-port.yml" ? FORWARD_PORT : null),
    loadDistTagResolver: async () => ({
      source: "fallback",
      resolveDistTag: resolveDistTag,
    }),
  };
  const code = await runCut(parseCutArgs([]), io, (l: string) => lines.push(l));
  const out = lines.join("\n");
  assert.equal(code, 1);
  for (const section of [
    "Preconditions",
    "1. Create stable/v3",
    "2. Create develop",
    "3. Dormant workflows",
    "4. npm dist-tags",
    "5. Rollback",
  ]) {
    assert.ok(out.includes(section), `report has "${section}"`);
  }
  assert.match(out, /DRY-RUN — nothing was executed/);
  assert.match(out, /✗ tag/);
  assert.equal(io.calls.length, 0, "dry-run never runs git mutations");
  assert.equal(typeof renderReport, "function");
});

test("runCut is READY only when every dormant workflow exists at the source", async () => {
  const real = (file: string) =>
    fs.readFileSync(path.join(repoRoot, ".github/workflows", file), "utf8");
  const run = async (readWorkflow: (file: string) => string | null) => {
    const lines: string[] = [];
    const io = {
      ...fakeIo(),
      gatherFacts: async () => goodFacts(),
      readWorkflow,
      loadDistTagResolver: async () => ({ source: "dist-tag.mjs", resolveDistTag }),
    };
    const code = await runCut(parseCutArgs([]), io, (l: string) => lines.push(l));
    return { code, out: lines.join("\n") };
  };
  const ready = await run(real);
  assert.equal(ready.code, 0, ready.out);
  assert.match(ready.out, /RESULT: READY/);
  const missing = await run((file) => (file === "nightly-v4-build.yml" ? null : real(file)));
  assert.equal(missing.code, 1);
  assert.match(missing.out, /nightly-v4-build\.yml: MISSING at the cut source/);
});

test("the real dormant workflows on this base activate as RELEASE_STRATEGY.md promises", () => {
  const read = (file: string) =>
    fs.readFileSync(path.join(repoRoot, ".github/workflows", file), "utf8");
  const fp = analyzeDormantWorkflow("forward-port.yml", read("forward-port.yml"));
  assert.ok(fp.triggers.includes("push → stable/v3"));
  assert.ok(fp.forkCaveats.length > 0, "forward-port is pinned to the canonical repository");
  const stable = analyzeDormantWorkflow("validate-stable-pr.yml", read("validate-stable-pr.yml"));
  assert.ok(stable.triggers.includes("pull_request → stable/v3"));
  const nightly = analyzeDormantWorkflow("nightly-v4-build.yml", read("nightly-v4-build.yml"));
  assert.ok(nightly.activates.some((l) => /develop exists/.test(l)));
  assert.ok(nightly.stillGated.some((l) => /vars\.NIGHTLY_PUBLISH/.test(l)));
});

test("CLI usage errors exit 2 without touching anything", () => {
  for (const args of [["--execute"], ["--execute", "--remote", "origin"], ["--bogus"]]) {
    const res = spawnSync(process.execPath, [SCRIPT, ...args], { encoding: "utf8" });
    assert.equal(res.status, 2, args.join(" "));
    assert.match(res.stderr, /dry-run-lts-cut:/);
  }
});
