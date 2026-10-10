#!/usr/bin/env node
/**
 * Dry-run (and fork-only rehearsal) of the 3.9.0 LTS cut — rail 3.8.58.
 *
 * The cut (ROADMAP Phase 3, docs/ops/RELEASE_STRATEGY.md): after v3.8.59 the
 * next version is 3.9.0; its tip becomes `stable/v3` (the LTS line, npm
 * `latest`) and `develop` opens v4 with a 4.0.0 bump (npm `nightly`).
 *
 * Default `--dry-run` prints and VALIDATES the whole sequence and executes
 * nothing (read-only git/gh queries only):
 *
 *   0. preconditions — source resolves, previous tag (v3.8.59) exists,
 *      package.json at the source is the target version (3.9.0), the
 *      release-freeze of the cut is open, the release branch is green (no open
 *      "Release branch not green: <branch>" issue), stable/v3 + develop absent
 *   1. stable/v3 from the source tip
 *   2. develop = source tip + a 4.0.0 version bump commit
 *   3. dormant workflows — which `on:`/`if:` conditions turn true after the cut
 *   4. expected npm dist-tags (latest → 3.9.0, next/nightly empty)
 *   5. rollback (delete both branches, restore `latest`)
 *
 * `--execute --remote <name>` runs steps 1–2 (or `--rollback`) against a FORK
 * remote only: never `origin`, never a remote whose URL is the canonical
 * repository, and every step asks for confirmation on the terminal. npm
 * dist-tags are never changed by this script (printed for the captain).
 *
 * Every external command goes through execFile with an argv array — no shell.
 *
 * Usage:
 *   npm run release:dry-run-lts-cut
 *   npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
 *     --advisory freeze,base-green          # 3.8.58 rehearsal on the current tip
 *   node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal
 *   node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { load as yamlLoad } from "js-yaml";

export const CANONICAL_REPO = "diegosouzapw/OmniRoute";
const PACKAGE_NAME = "omniroute";

export const DEFAULTS = Object.freeze({
  targetVersion: "3.9.0",
  previousTag: "v3.8.59",
  developVersion: "4.0.0",
  stableBranch: "stable/v3",
  developBranch: "develop",
});

const PRECONDITION_IDS = [
  "source",
  "tag",
  "version",
  "freeze",
  "base-green",
  "merge-queue",
  "release-ruleset",
  "branches-absent",
];

/** Files bumped on `develop` — the same set the cycle-open commit bumps. */
const BUMP_FILES = Object.freeze([
  "package.json",
  "open-sse/package.json",
  "electron/package.json",
  "package-lock.json",
  "docs/openapi.yaml",
]);

/** Workflows that are dormant until the cut (they land with the dormant-workflows PR, #16172). */
const DORMANT_WORKFLOWS = Object.freeze([
  "forward-port.yml",
  "validate-stable-pr.yml",
  "nightly-v4-build.yml",
]);

class UsageError extends Error {}

// ── arguments ───────────────────────────────────────────────────────────────

const VALUE_FLAGS = new Set([
  "--remote",
  "--from",
  "--repo",
  "--target-version",
  "--previous-tag",
  "--develop-version",
  "--source-branch",
  "--advisory",
]);
const BOOL_FLAGS = new Set(["--dry-run", "--execute", "--rollback"]);

export function parseCutArgs(argv) {
  const values = {};
  const bools = new Set();
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    if (BOOL_FLAGS.has(flag)) {
      bools.add(flag);
      continue;
    }
    if (!VALUE_FLAGS.has(flag)) throw new UsageError(`Unknown flag ${JSON.stringify(flag)}`);
    const value = argv[i + 1];
    if (value === undefined || value.startsWith("--")) {
      throw new UsageError(`${flag} needs a value`);
    }
    values[flag.slice(2)] = value;
    i += 1;
  }
  if (bools.has("--execute") && bools.has("--dry-run")) {
    throw new UsageError("--dry-run and --execute are mutually exclusive");
  }
  const mode = bools.has("--execute") ? "execute" : "dry-run";
  if (bools.has("--rollback") && mode !== "execute") {
    throw new UsageError("--rollback requires --execute (the dry-run always prints the rollback)");
  }
  if (mode === "execute") {
    if (!values.remote) {
      throw new UsageError(
        "--execute requires --remote <fork-remote> (the rehearsal runs on a fork)"
      );
    }
    if (values.remote === "origin") {
      throw new UsageError("--execute targets a fork remote, never origin");
    }
  }
  const advisory = new Set(
    (values.advisory ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );
  for (const id of advisory) {
    if (!PRECONDITION_IDS.includes(id)) {
      throw new UsageError(
        `Unknown precondition ${JSON.stringify(id)} (known: ${PRECONDITION_IDS.join(", ")})`
      );
    }
  }
  const targetVersion = values["target-version"] ?? DEFAULTS.targetVersion;
  return {
    mode,
    rollback: bools.has("--rollback"),
    remote: values.remote ?? "origin",
    from: values.from ?? "HEAD",
    repo: values.repo ?? CANONICAL_REPO,
    targetVersion,
    previousTag: values["previous-tag"] ?? DEFAULTS.previousTag,
    developVersion: values["develop-version"] ?? DEFAULTS.developVersion,
    sourceBranch: values["source-branch"] ?? `release/v${targetVersion}`,
    stableBranch: DEFAULTS.stableBranch,
    developBranch: DEFAULTS.developBranch,
    advisory,
  };
}

/** True when a git remote URL (https / ssh / scp-like, with or without .git) is `repo`. */
export function isCanonicalRemoteUrl(url, repo = CANONICAL_REPO) {
  const match = /github\.com[:/]([^/\s]+)\/([^/\s]+?)(?:\.git)?\/?$/i.exec(String(url ?? ""));
  if (!match) return false;
  return `${match[1]}/${match[2]}`.toLowerCase() === repo.toLowerCase();
}

// ── preconditions ───────────────────────────────────────────────────────────

/**
 * Pure: is the Mergify `release` queue (rail gate G11) configured? GitHub's native
 * merge queue was rejected in v3.8.49 (no branch wildcards on a personal-account
 * repo — see the .mergify.yml header), so G11 is the Mergify queue: a
 * `queue_rules` entry named `release` covering `release/vX.Y.Z`, entered through
 * the `queue` label, with a `checks_timeout` so a hung check cannot park the queue.
 */
export function evaluateMergifyQueue(yamlText) {
  if (yamlText == null) return { ok: false, problems: [".mergify.yml missing at the source"] };
  let doc;
  try {
    doc = yamlLoad(yamlText) ?? {};
  } catch {
    return { ok: false, problems: [".mergify.yml is not valid YAML"] };
  }
  const rules = Array.isArray(doc.queue_rules) ? doc.queue_rules : [];
  const release = rules.find((rule) => rule?.name === "release");
  if (!release) return { ok: false, problems: ["no queue_rules entry named `release`"] };
  const problems = [];
  const conditions = (release.queue_conditions ?? []).map((c) => String(c).replace(/\s+/g, ""));
  if (!conditions.some((c) => c.startsWith("base~=") && c.includes("release/"))) {
    problems.push("queue `release` does not target release/* branches");
  }
  const autoMerge = (doc.merge_protections_settings?.auto_merge_conditions ?? []).map((c) =>
    String(c).replace(/\s+/g, "")
  );
  if (!conditions.includes("label=queue") && !autoMerge.includes("label=queue")) {
    problems.push("queue `release` is not entered through the `queue` label");
  }
  if (release.checks_timeout == null || String(release.checks_timeout).trim() === "") {
    problems.push("queue `release` has no checks_timeout");
  }
  return { ok: problems.length === 0, problems };
}

function issueList(issues) {
  return issues.map((i) => `#${i.number}`).join(", ");
}

/**
 * Pure. `facts` come from gatherFacts(); null means "could not be determined",
 * which fails the check (fail closed).
 */
export function evaluatePreconditions(facts, opts) {
  const check = (id, label, expected, ok, actual) => ({
    id,
    label,
    expected,
    actual,
    ok,
    blocking: !opts.advisory.has(id),
  });
  const freeze = facts.freezeIssues;
  const red = facts.baseRedIssues;
  const queue = evaluateMergifyQueue(facts.mergifyConfig ?? null);
  const rulesetRules = facts.releaseRulesetRules;
  const missingRules = Array.isArray(rulesetRules)
    ? ["deletion", "non_fast_forward"].filter((r) => !rulesetRules.includes(r))
    : null;
  // No open base-red issue is only evidence of green when the branch exists: the
  // nightly observer never files an issue for a branch it cannot see.
  const branchMissing = facts.sourceBranchExists === false;
  const existing = Object.entries(facts.remoteBranches ?? {})
    .filter(([, sha]) => sha)
    .map(([name]) => name);
  return [
    check(
      "source",
      `cut source ${opts.from} resolves to a commit`,
      "a commit SHA",
      Boolean(facts.sourceSha),
      facts.sourceSha ?? `${opts.from} does not resolve to a commit`
    ),
    check(
      "tag",
      `previous release tag ${opts.previousTag} exists`,
      `${opts.previousTag} present`,
      facts.previousTagExists === true,
      facts.previousTagExists === null
        ? "unknown (tag lookup failed)"
        : facts.previousTagExists
          ? "present"
          : "missing"
    ),
    check(
      "version",
      `package.json at the source is ${opts.targetVersion}`,
      opts.targetVersion,
      facts.sourceVersion === opts.targetVersion,
      facts.sourceVersion ?? "unknown (package.json unreadable at the source)"
    ),
    check(
      "freeze",
      "the cut's release-freeze is open (captain owns the branch while it is cut)",
      "≥ 1 open `release-freeze` issue",
      Array.isArray(freeze) && freeze.length > 0,
      freeze === null
        ? "unknown (gh query failed)"
        : freeze.length
          ? issueList(freeze)
          : "none open"
    ),
    {
      ...check(
        "base-green",
        `${opts.sourceBranch} is green (no open "Release branch not green" issue)`,
        "no open base-red issue on an existing branch",
        !branchMissing && facts.sourceBranchExists !== null && Array.isArray(red) && !red.length,
        branchMissing
          ? `unknown — ${opts.sourceBranch} does not exist on origin (not verifiable)`
          : facts.sourceBranchExists === null
            ? "unknown (ls-remote failed)"
            : red === null
              ? "unknown (gh query failed)"
              : red.length
                ? `red: ${issueList(red)}`
                : "green"
      ),
      verifiable: !branchMissing && facts.sourceBranchExists !== null && red !== null,
    },
    check(
      "merge-queue",
      "G11: Mergify queue `release` active (queue_rules, checks_timeout, `queue` label)",
      "queue_rules[release] with checks_timeout + label `queue` exists",
      queue.ok && facts.queueLabelExists === true,
      [
        ...queue.problems,
        facts.queueLabelExists === null
          ? "label lookup failed"
          : facts.queueLabelExists
            ? null
            : "label `queue` missing",
      ]
        .filter(Boolean)
        .join("; ") || "configured"
    ),
    check(
      "release-ruleset",
      "release/* ruleset blocks deletion and force-push",
      "rules deletion + non_fast_forward",
      Array.isArray(missingRules) && missingRules.length === 0,
      missingRules === null
        ? "unknown (ruleset lookup failed)"
        : missingRules.length
          ? `missing: ${missingRules.join(", ")}`
          : "deletion + non_fast_forward"
    ),
    check(
      "branches-absent",
      `${opts.stableBranch} and ${opts.developBranch} do not exist yet on ${opts.remote}`,
      "both absent",
      facts.remoteBranches !== null && existing.length === 0,
      facts.remoteBranches === null
        ? "unknown (ls-remote failed)"
        : existing.length
          ? `already exist: ${existing.join(", ")}`
          : "both absent"
    ),
  ];
}

// ── develop bump (pure text edits, verified by parsing) ─────────────────────

/** Bump the top-level `"version"` of a package.json, touching that one line only. */
export function bumpManifest(text, version) {
  const re = /^( {2}"version":\s*")[^"]*(")/m;
  if (!re.test(text)) throw new Error("no top-level version field to bump");
  const out = text.replace(re, `$1${version}$2`);
  if (JSON.parse(out).version !== version) throw new Error("version bump did not land");
  return out;
}

/** Bump the lockfile root, packages[""] and the open-sse workspace entry. */
export function bumpLockfile(text, version) {
  let out = text.replace(/^( {2}"version":\s*")[^"]*(")/m, `$1${version}$2`);
  out = out.replace(/^( {4}"": \{\n(?: {6}.*\n)*? {6}"version":\s*")[^"]*(")/m, `$1${version}$2`);
  out = out.replace(
    /^( {4}"open-sse": \{\n {6}"name": "@omniroute\/open-sse",\n {6}"version":\s*")[^"]*(")/m,
    `$1${version}$2`
  );
  const lock = JSON.parse(out);
  if (
    lock.version !== version ||
    lock.packages?.[""]?.version !== version ||
    lock.packages?.["open-sse"]?.version !== version
  ) {
    throw new Error('lockfile bump did not land on root, packages[""] and open-sse');
  }
  return out;
}

/** Bump `info.version` of the OpenAPI document. */
export function bumpOpenApi(text, version) {
  const re = /^(info:\n(?:[ ].*\n)*? {2}version: )([^\n]+)/m;
  if (!re.test(text)) throw new Error("no info.version to bump in openapi.yaml");
  return text.replace(re, `$1${version}`);
}

const BUMPERS = Object.freeze({
  "package.json": bumpManifest,
  "open-sse/package.json": bumpManifest,
  "electron/package.json": bumpManifest,
  "package-lock.json": bumpLockfile,
  "docs/openapi.yaml": bumpOpenApi,
});

// ── plan ────────────────────────────────────────────────────────────────────

export function buildCutPlan(opts, facts) {
  const sha = facts.sourceSha ?? "<source-sha>";
  const remote = opts.remote;
  const stableRef = `refs/heads/${opts.stableBranch}`;
  const developRef = `refs/heads/${opts.developBranch}`;
  const previousVersion = opts.previousTag.replace(/^v/, "");
  return {
    remote,
    executes: opts.mode === "execute",
    sourceSha: sha,
    bumpFiles: [...BUMP_FILES],
    steps: [
      {
        id: "create-stable",
        title: `Create ${opts.stableBranch} from the cut tip`,
        preview: [["git", "push", remote, `${sha}:${stableRef}`]],
      },
      {
        id: "create-develop",
        title: `Create ${opts.developBranch} with the ${opts.developVersion} bump`,
        preview: [
          [
            "git",
            "commit-tree",
            "<tree with the bump>",
            "-p",
            sha,
            "-m",
            developCommitMessage(opts),
          ],
          ["git", "push", remote, `<bump-commit>:${developRef}`],
        ],
      },
    ],
    rollback: [
      ["git", "push", remote, "--delete", stableRef, developRef],
      ["npm", "dist-tag", "add", `${PACKAGE_NAME}@${previousVersion}`, "latest"],
    ],
  };
}

function developCommitMessage(opts) {
  return `chore(release): open the v4 development line (${opts.developVersion})`;
}

// ── dormant workflows ───────────────────────────────────────────────────────

function triggerSummary(on) {
  if (!on || typeof on !== "object") return [];
  return Object.entries(on).map(([event, cfg]) => {
    const branches = cfg && typeof cfg === "object" ? cfg.branches : undefined;
    return Array.isArray(branches) ? `${event} → ${branches.join(", ")}` : event;
  });
}

/** Pure: classify what a dormant workflow does once stable/v3 + develop exist. */
export function analyzeDormantWorkflow(file, yamlText) {
  if (yamlText == null) {
    return {
      file,
      present: false,
      triggers: [],
      activates: [],
      stillGated: [],
      forkCaveats: [],
      note: "absent on this base — expected from the dormant-workflows PR (#16172)",
    };
  }
  const doc = yamlLoad(yamlText) ?? {};
  const triggers = triggerSummary(doc.on);
  const activates = [];
  const stillGated = [];
  const forkCaveats = [];
  for (const trigger of triggers) {
    if (/stable\/v3|develop/.test(trigger)) activates.push(`trigger ${trigger} starts firing`);
  }
  for (const [jobId, job] of Object.entries(doc.jobs ?? {})) {
    const cond = typeof job?.if === "string" ? job.if : "";
    if (/stable\/v3|develop/.test(cond)) activates.push(`job ${jobId}: \`${cond}\` → true`);
    for (const m of cond.matchAll(/vars\.([A-Z0-9_]+)/g)) {
      stillGated.push(`job ${jobId}: needs repository variable vars.${m[1]} (owner flips it)`);
    }
    const repoGuard = /github\.repository\s*==\s*'([^']+)'/.exec(cond);
    if (repoGuard && /github\.event_name\s*!=\s*'schedule'\s*\|\|/.test(cond)) {
      forkCaveats.push(
        `job ${jobId}: scheduled runs only on ${repoGuard[1]} — dispatch it by hand in a fork rehearsal`
      );
    } else if (repoGuard) {
      forkCaveats.push(`job ${jobId}: pinned to ${repoGuard[1]} — false in a fork rehearsal`);
    }
    for (const step of job?.steps ?? []) {
      if (typeof step?.run === "string" && /ls-remote[^\n]*--heads[^\n]*develop/.test(step.run)) {
        activates.push(`job ${jobId}: runtime "develop exists" check → true`);
      }
    }
  }
  return { file, present: true, triggers, activates, stillGated, forkCaveats };
}

// ── dist-tags ───────────────────────────────────────────────────────────────

/**
 * Minimal stand-in for scripts/release/dist-tag.mjs#resolveDistTag, used only
 * while that script (dormant-workflows PR #16172) is not on the base.
 */
export function fallbackResolveDistTag(version, { latestMajor } = {}) {
  const m = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(String(version));
  if (!m) throw new Error(`Not a semver version: ${JSON.stringify(version)}`);
  if (m[4]) return /^nightly(\.|$)/.test(m[4]) ? "nightly" : "next";
  if (Number.isInteger(latestMajor) && Number(m[1]) < latestMajor) return "lts";
  return "latest";
}

/** Expected post-cut dist-tags, cross-checked against the channel resolver. */
export function expectedDistTags(opts, resolver) {
  const major = Number(opts.targetVersion.split(".")[0]);
  const probes = [
    [opts.targetVersion, "latest"],
    [`${opts.developVersion}-nightly.20261010.abcdef0`, "nightly"],
    [`${opts.developVersion}-rc.1`, "next"],
  ];
  const checks = probes.map(([version, want]) => {
    let got;
    try {
      got = resolver.resolveDistTag(version, { latestMajor: major });
    } catch (error) {
      got = `error: ${error instanceof Error ? error.message : String(error)}`;
    }
    return { version, expected: want, actual: got, ok: got === want };
  });
  return {
    source: resolver.source,
    expected: { latest: opts.targetVersion, next: null, nightly: null },
    checks,
  };
}

// ── report ──────────────────────────────────────────────────────────────────

const fmt = (argv) => argv.map((a) => (/[\s"'()]/.test(a) ? JSON.stringify(a) : a)).join(" ");

export function renderReport({ opts, checks, plan, workflows, distTags }) {
  const lines = [];
  const header =
    opts.mode === "execute"
      ? `LTS cut — EXECUTE on fork remote "${opts.remote}"${opts.rollback ? " (ROLLBACK)" : ""}`
      : "LTS cut — DRY-RUN — nothing was executed";
  lines.push(header, "");
  lines.push(
    `Cut: ${opts.targetVersion} from ${opts.from} (${plan.sourceSha}) · previous ${opts.previousTag} · develop ${opts.developVersion}`,
    ""
  );
  lines.push("Preconditions");
  for (const c of checks) {
    const mark = c.ok ? "✓" : c.verifiable === false ? "?" : c.blocking ? "✗" : "!";
    lines.push(
      `  ${mark} ${c.id} — ${c.label}: ${c.actual}${c.ok ? "" : ` (expected ${c.expected})`}`
    );
  }
  lines.push("");
  lines.push(`1. Create ${opts.stableBranch}`);
  for (const cmd of plan.steps[0].preview) lines.push(`   $ ${fmt(cmd)}`);
  lines.push(
    `2. Create ${opts.developBranch} (${opts.developVersion} bump, built with git plumbing)`
  );
  lines.push(`   bumps: ${plan.bumpFiles.join(", ")}`);
  for (const cmd of plan.steps[1].preview) lines.push(`   $ ${fmt(cmd)}`);
  lines.push(
    "   then: open the [4.0.0] CHANGELOG section + i18n mirrors on develop (cycle-open flow) before its first PR"
  );
  lines.push("3. Dormant workflows after the cut");
  for (const wf of workflows) {
    if (!wf.present) {
      lines.push(`   - ${wf.file}: ${wf.note}`);
      continue;
    }
    lines.push(`   - ${wf.file} (triggers: ${wf.triggers.join("; ") || "none"})`);
    for (const l of wf.activates) lines.push(`       on:    ${l}`);
    for (const l of wf.stillGated) lines.push(`       gated: ${l}`);
    for (const l of wf.forkCaveats) lines.push(`       fork:  ${l}`);
  }
  lines.push(`4. npm dist-tags (resolver: ${distTags.source})`);
  const e = distTags.expected;
  lines.push(`   expected: latest → ${e.latest} · next → (empty) · nightly → (empty)`);
  for (const c of distTags.checks) {
    lines.push(
      `   ${c.ok ? "✓" : "✗"} ${c.version} resolves to ${c.actual} (expected ${c.expected})`
    );
  }
  lines.push(
    `   verify: $ npm view ${PACKAGE_NAME} dist-tags --json   (never changed by this script)`
  );
  lines.push("5. Rollback");
  for (const cmd of plan.rollback) lines.push(`   $ ${fmt(cmd)}`);
  return lines.join("\n");
}

// ── execution (fork only) ───────────────────────────────────────────────────

/**
 * Run the mutating steps against the fork remote. `io.git(args)` runs git with
 * an argv array; `confirm(question)` must resolve true for each step.
 */
export async function executeCut(plan, opts, io, confirm) {
  if (opts.mode !== "execute" || opts.remote === "origin") {
    throw new Error("executeCut only runs in --execute mode against a fork remote");
  }
  const url = io.remoteUrl(opts.remote);
  if (!url) throw new Error(`git remote ${JSON.stringify(opts.remote)} does not exist`);
  if (isCanonicalRemoteUrl(url, opts.repo)) {
    throw new Error(
      `remote ${opts.remote} points at the canonical repository (${url}) — rehearse on a fork`
    );
  }

  if (opts.rollback) {
    const [deleteCmd] = plan.rollback;
    if (
      !(await confirm(`Delete ${opts.stableBranch} and ${opts.developBranch} on ${opts.remote}?`))
    ) {
      return { aborted: true };
    }
    io.git(deleteCmd.slice(1));
    return { aborted: false };
  }

  if (!(await confirm(`Push ${plan.sourceSha} as ${opts.stableBranch} to ${opts.remote}?`))) {
    return { aborted: true };
  }
  io.git(["push", opts.remote, `${plan.sourceSha}:refs/heads/${opts.stableBranch}`]);

  if (
    !(await confirm(
      `Create the ${opts.developVersion} bump commit and push it as ${opts.developBranch} to ${opts.remote}?`
    ))
  ) {
    return { aborted: true };
  }
  const commit = io.createDevelopCommit(
    plan.sourceSha,
    opts.developVersion,
    plan.bumpFiles,
    developCommitMessage(opts)
  );
  io.git(["push", opts.remote, `${commit}:refs/heads/${opts.developBranch}`]);
  return { aborted: false, developCommit: commit };
}

// ── real IO ─────────────────────────────────────────────────────────────────

function tryExec(cmd, args, options = {}) {
  try {
    return execFileSync(cmd, args, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
      maxBuffer: 64 * 1024 * 1024,
      ...options,
    }).trim();
  } catch {
    return null;
  }
}

function ghIssues(repo, args) {
  const out = tryExec("gh", [
    "issue",
    "list",
    "--repo",
    repo,
    "--state",
    "open",
    ...args,
    "--json",
    "number,title",
  ]);
  if (out === null) return null;
  try {
    return JSON.parse(out);
  } catch {
    return null;
  }
}

function ghJson(args) {
  const out = tryExec("gh", args);
  if (out === null) return null;
  try {
    return JSON.parse(out);
  } catch {
    return null;
  }
}

function labelExists(repo, name) {
  const labels = ghJson([
    "label",
    "list",
    "--repo",
    repo,
    "--search",
    name,
    "--limit",
    "100",
    "--json",
    "name",
  ]);
  return Array.isArray(labels) ? labels.some((l) => l.name === name) : null;
}

/** Rule types of the ruleset whose include covers `refs/heads/release/*`. */
function releaseRulesetRules(repo) {
  const list = ghJson(["api", `repos/${repo}/rulesets`]);
  if (!Array.isArray(list)) return null;
  for (const { id } of list) {
    const ruleset = ghJson(["api", `repos/${repo}/rulesets/${id}`]);
    const include = ruleset?.conditions?.ref_name?.include ?? [];
    if (include.includes("refs/heads/release/*")) {
      return (ruleset.rules ?? []).map((r) => r.type);
    }
  }
  return [];
}

export function createRealIo(cwd) {
  const gitRaw = (args, options = {}) =>
    execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      ...options,
    });
  const git = (args, options = {}) => gitRaw(args, options).trim();
  return {
    git,
    remoteUrl: (name) => tryExec("git", ["remote", "get-url", name], { cwd }),
    async gatherFacts(opts) {
      const sourceSha = tryExec("git", ["rev-parse", "--verify", `${opts.from}^{commit}`], { cwd });
      let sourceVersion = null;
      if (sourceSha) {
        const pkg = tryExec("git", ["show", `${sourceSha}:package.json`], { cwd });
        try {
          sourceVersion = pkg ? JSON.parse(pkg).version : null;
        } catch {
          sourceVersion = null;
        }
      }
      const branchExists = (branch) => {
        const out = tryExec("git", ["ls-remote", "--heads", "origin", branch], { cwd });
        return out === null ? null : out.length > 0;
      };
      // Tags are canonical facts: read them from origin (read-only).
      const tagOut = tryExec(
        "git",
        ["ls-remote", "--tags", "origin", `refs/tags/${opts.previousTag}`],
        { cwd }
      );
      const previousTagExists = tagOut === null ? null : tagOut.length > 0;
      const headsOut = tryExec(
        "git",
        ["ls-remote", "--heads", opts.remote, opts.stableBranch, opts.developBranch],
        { cwd }
      );
      let remoteBranches = null;
      if (headsOut !== null) {
        remoteBranches = { [opts.stableBranch]: null, [opts.developBranch]: null };
        for (const line of headsOut.split("\n").filter(Boolean)) {
          const [sha, ref] = line.split(/\s+/);
          const name = ref.replace(/^refs\/heads\//, "");
          if (name in remoteBranches) remoteBranches[name] = sha;
        }
      }
      return {
        sourceSha,
        sourceVersion,
        previousTagExists,
        sourceBranchExists: branchExists(opts.sourceBranch),
        mergifyConfig: sourceSha
          ? tryExec("git", ["show", `${sourceSha}:.mergify.yml`], { cwd })
          : null,
        queueLabelExists: labelExists(opts.repo, "queue"),
        releaseRulesetRules: releaseRulesetRules(opts.repo),
        freezeIssues: ghIssues(opts.repo, ["--label", "release-freeze"]),
        baseRedIssues: ghIssues(opts.repo, [
          "--search",
          `"Release branch not green: ${opts.sourceBranch}" in:title`,
        ]),
        remoteBranches,
      };
    },
    readWorkflowAt(sha, file) {
      if (!sha) return null;
      return tryExec("git", ["show", `${sha}:.github/workflows/${file}`], { cwd });
    },
    async loadDistTagResolver() {
      const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist-tag.mjs");
      if (existsSync(file)) {
        const mod = await import(pathToFileURL(file).href);
        if (typeof mod.resolveDistTag === "function") {
          return { source: "scripts/release/dist-tag.mjs", resolveDistTag: mod.resolveDistTag };
        }
      }
      return {
        source: "built-in fallback (scripts/release/dist-tag.mjs not on this base)",
        resolveDistTag: fallbackResolveDistTag,
      };
    },
    createDevelopCommit(sourceSha, version, files, message) {
      const tmp = mkdtempSync(path.join(os.tmpdir(), "lts-cut-index-"));
      const env = { ...process.env, GIT_INDEX_FILE: path.join(tmp, "index") };
      try {
        git(["read-tree", sourceSha], { env });
        for (const file of files) {
          const bumped = BUMPERS[file](gitRaw(["show", `${sourceSha}:${file}`]), version);
          const blob = git(["hash-object", "-w", "--stdin"], { input: bumped });
          git(["update-index", "--cacheinfo", `100644,${blob},${file}`], { env });
        }
        const tree = git(["write-tree"], { env });
        return git(["commit-tree", tree, "-p", sourceSha, "-m", message]);
      } finally {
        rmSync(tmp, { recursive: true, force: true });
      }
    },
    async confirm(question) {
      if (!process.stdin.isTTY) {
        throw new Error("--execute needs an interactive terminal to confirm each step");
      }
      const rl = createInterface({ input: process.stdin, output: process.stdout });
      try {
        const answer = await rl.question(`${question} [y/N] `);
        return /^y(es)?$/i.test(answer.trim());
      } finally {
        rl.close();
      }
    },
  };
}

/** Orchestration with injected IO. Returns the process exit code. */
export async function runCut(opts, io, log = (line) => process.stdout.write(`${line}\n`)) {
  const facts = await io.gatherFacts(opts);
  const checks = evaluatePreconditions(facts, opts);
  const plan = buildCutPlan(opts, facts);
  const readWorkflow = io.readWorkflow ?? ((file) => io.readWorkflowAt(facts.sourceSha, file));
  const workflows = DORMANT_WORKFLOWS.map((file) =>
    analyzeDormantWorkflow(file, readWorkflow(file))
  );
  const distTags = expectedDistTags(opts, await io.loadDistTagResolver());
  log(renderReport({ opts, checks, plan, workflows, distTags }));

  const blockingFailed = checks.some((c) => c.blocking && !c.ok);
  const distTagFailed = distTags.checks.some((c) => !c.ok);
  if (opts.mode === "dry-run") {
    log("");
    log(blockingFailed || distTagFailed ? "RESULT: NOT READY" : "RESULT: READY");
    return blockingFailed || distTagFailed ? 1 : 0;
  }
  if (!opts.rollback && (blockingFailed || distTagFailed)) {
    log("");
    log("Refusing to execute: a blocking precondition failed (see ✗ above).");
    return 1;
  }
  const result = await executeCut(plan, opts, io, (q) => io.confirm(q));
  log("");
  if (result.developCommit) {
    log(`stable/v3 → ${plan.sourceSha}`);
    log(`develop   → ${result.developCommit} (bump commit; reusable for the real cut)`);
  }
  log(result.aborted ? "ABORTED at a declined step — nothing after it ran." : "DONE.");
  return result.aborted ? 1 : 0;
}

async function main(argv) {
  let opts;
  try {
    opts = parseCutArgs(argv);
  } catch (error) {
    process.stderr.write(`dry-run-lts-cut: ${error.message}\n`);
    return 2;
  }
  const root = tryExec("git", ["rev-parse", "--show-toplevel"]) ?? process.cwd();
  return runCut(opts, createRealIo(root));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  main(process.argv.slice(2)).then(
    (code) => process.exit(code),
    (error) => {
      process.stderr.write(
        `dry-run-lts-cut: ${error instanceof Error ? error.message : String(error)}\n`
      );
      process.exit(1);
    }
  );
}
