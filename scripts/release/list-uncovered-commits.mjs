#!/usr/bin/env node
// Reconciliation helper: list non-merge commits since the last tag whose PR/issue ref is NOT
// represented in the current version's CHANGELOG section (or [Unreleased]).
//
// WHY: during the cycle, PRs merge into release/** and some land WITHOUT a CHANGELOG bullet, so
// /generate-release reconciliation has to rediscover them by hand (v3.8.43: 123 of 176 commits had
// no bullet). This surfaces exactly that gap in seconds — maintainer-side, non-blocking, run it at
// reconciliation (Phase 0a) so the release CHANGELOG is complete before the PR opens.
//
// A commit is "covered" iff ANY `#N` in its subject appears anywhere in the CHANGELOG scan window
// (the version section + [Unreleased]) — matching on issue OR PR number, since a bullet may cite
// either. Internal commits (chore/ci/test/refactor) are listed under "rollup candidates" so the
// maintainer can consolidate rather than write one bullet each.
//
// Usage: node scripts/release/list-uncovered-commits.mjs [--json]
// Exit: 0 always (advisory). Prints a report to stdout.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const git = (args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();

const ROLLUP_TYPES = new Set(["chore", "ci", "test", "refactor", "build", "docs", "style"]);

/**
 * Pick the commit that OPENED the current development cycle, and use that as the range base.
 *
 * `git describe --tags` is wrong here, and wrong in a way that hides work rather than
 * announcing itself. Releases reach `main` by SQUASH, so no commit on a release branch is
 * ever an ancestor of the tag — `v3.8.49..HEAD` therefore re-lists the un-squashed history
 * of every prior cycle. Measured on release/v3.8.50 at 7eca04fd12:
 *
 *     v3.8.49..HEAD ............ 1361 commits
 *     cycle open..HEAD .........   22 commits
 *
 * 62× the real range. The report drowns in noise, which is exactly how a previous
 * reconciliation let ~200 PRs through with no CHANGELOG bullet.
 *
 * Resolved by CONTENT, not by commit message: the cycle opens when package.json first
 * carries this version, so `git log -S` on that exact string finds it regardless of how the
 * subject was worded. The wording has already changed once —
 * `chore(release): bump v3.8.49 (development cycle version)` became
 * `chore(release): open v3.8.50 development cycle` — and a message-matching resolver would
 * have silently fallen back to the broken tag base on the newer format.
 *
 * Falls back to the tag with an explicit stderr warning, so a shallow clone or a rewritten
 * history degrades loudly instead of quietly reproducing the original bug.
 */
export function resolveCycleBase(version, runGit = git) {
  let openCommit = "";
  try {
    // Oldest commit that introduced this version string = the cycle-open commit.
    const hits = runGit(["log", "--format=%H", "-S", `"version": "${version}"`, "--", "package.json"]);
    openCommit = hits ? hits.split("\n").filter(Boolean).pop() : "";
  } catch {
    openCommit = "";
  }
  if (openCommit) return { base: openCommit, source: "cycle-open" };

  let tag = "";
  try {
    tag = runGit(["describe", "--tags", "--abbrev=0"]);
  } catch {
    tag = "";
  }
  process.stderr.write(
    `[list-uncovered-commits] WARNING: could not find the commit that opened v${version} ` +
      `(searched package.json for the version string). Falling back to ` +
      `${tag || "the repository root"} — because releases squash-merge, that range re-lists ` +
      `previous cycles and the report below will contain noise.\n`
  );
  return { base: tag, source: "tag-fallback" };
}

export function refsOf(subject) {
  return [...subject.matchAll(/#(\d+)/g)].map((m) => Number(m[1]));
}

export function typeOf(subject) {
  const m = subject.match(/^([a-z]+)(\(|:|!)/);
  return m ? m[1] : "other";
}

/**
 * @param {{hash:string, subject:string}[]} commits
 * @param {Set<number>} changelogRefs  every #N present in the CHANGELOG scan window
 * @returns {{covered:number, uncovered:{hash,subject,refs,type,rollup}[]}}
 */
export function computeUncovered(commits, changelogRefs) {
  const uncovered = [];
  let covered = 0;
  for (const c of commits) {
    const refs = refsOf(c.subject);
    const isCovered = refs.length > 0 && refs.some((r) => changelogRefs.has(r));
    if (isCovered) {
      covered++;
    } else {
      const type = typeOf(c.subject);
      uncovered.push({ ...c, refs, type, rollup: ROLLUP_TYPES.has(type) });
    }
  }
  return { covered, uncovered };
}

// Subdirectories that hold changelog.d fragments (fragments-first, #6783).
const FRAGMENT_DIRS = ["features", "fixes", "maintenance"];

/**
 * Read the leading `<N>-` PR/issue number from a changelog.d fragment filename.
 * Some fragments (e.g. 6708, 6709) carry NO `#N` in their body, so the filename is the only
 * place the PR number appears — it must still count as covering that PR.
 * @param {string} filename  bare name or a path ending in the fragment file
 * @returns {number|null}
 */
export function fragmentFilenameRef(filename) {
  const base = String(filename).replace(/^.*[\\/]/, "");
  const m = base.match(/^(\d+)-/);
  return m ? Number(m[1]) : null;
}

/**
 * Collect every ref "covered" by changelog.d fragments: the leading `<N>-` of each fragment
 * filename PLUS every `#N` inside its body.
 * @param {{name:string, body:string}[]} fragments
 * @returns {Set<number>}
 */
export function fragmentRefs(fragments) {
  const refs = new Set();
  for (const f of fragments || []) {
    const fromName = fragmentFilenameRef(f.name);
    if (fromName != null) refs.add(fromName);
    for (const m of String(f.body || "").matchAll(/#(\d+)/g)) refs.add(Number(m[1]));
  }
  return refs;
}

/**
 * Union of the CHANGELOG scan window refs and the changelog.d fragment refs. Since fragments-first
 * (#6783) a merged PR's changelog entry usually lives in a fragment and is only folded into
 * CHANGELOG.md at release time, so scanning CHANGELOG.md alone reports fragment-covered commits as
 * uncovered (#6857).
 * @param {string} changelog
 * @param {string} version
 * @param {{name:string, body:string}[]} fragments
 * @returns {Set<number>}
 */
export function collectChangelogRefs(changelog, version, fragments) {
  const refs = changelogRefWindow(changelog, version);
  for (const r of fragmentRefs(fragments)) refs.add(r);
  return refs;
}

/** Read all changelog.d fragment files (name + body) from disk under `root`. */
export function readChangelogFragments(root) {
  const out = [];
  for (const sub of FRAGMENT_DIRS) {
    const dir = path.join(root, "changelog.d", sub);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith(".md") || name === "README.md") continue;
      out.push({ name, body: fs.readFileSync(path.join(dir, name), "utf8") });
    }
  }
  return out;
}

/** Read every #N in the version's CHANGELOG section + the [Unreleased] section. */
export function changelogRefWindow(changelog, version) {
  const esc = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // From [Unreleased] up to (but excluding) the version-after-this one.
  const startRe = /^## \[Unreleased\]/m;
  const s = changelog.match(startRe);
  const from = s ? s.index : 0;
  // find the header AFTER the target version
  const verRe = new RegExp(`^## \\[${esc}\\]`, "m");
  const vm = changelog.slice(from).match(verRe);
  const afterVersionStart = vm ? from + vm.index + vm[0].length : from;
  const rest = changelog.slice(afterVersionStart);
  const nextIdx = rest.search(/\n## \[/);
  const to = nextIdx === -1 ? changelog.length : afterVersionStart + nextIdx;
  const window = changelog.slice(from, to);
  return new Set([...window.matchAll(/#(\d+)/g)].map((m) => Number(m[1])));
}

function main(argv) {
  const jsonOut = argv.includes("--json");
  const version = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
  const { base, source } = resolveCycleBase(version);
  const lastTag = base ? git(["rev-parse", "--short", base]) : base;
  const log = git(["log", "--no-merges", `${base}..HEAD`, "--pretty=format:%h%x09%s"]);
  const commits = log
    ? log.split("\n").map((l) => {
        const [hash, subject] = l.split("\t");
        return { hash, subject };
      })
    : [];
  const changelog = fs.readFileSync(path.join(ROOT, "CHANGELOG.md"), "utf8");
  const fragments = readChangelogFragments(ROOT);
  const refs = collectChangelogRefs(changelog, version, fragments);
  const { covered, uncovered } = computeUncovered(commits, refs);

  if (jsonOut) {
    process.stdout.write(
      JSON.stringify(
        { version, base: lastTag, baseSource: source, total: commits.length, covered, uncovered },
        null,
        2
      ) + "\n"
    );
    return;
  }
  const bulletsWorthy = uncovered.filter((c) => !c.rollup);
  const rollupCandidates = uncovered.filter((c) => c.rollup);
  process.stdout.write(
    `# Uncovered-commit reconciliation — v${version} (${lastTag}..HEAD, base from ${source})\n\n`
  );
  process.stdout.write(
    `Commits: ${commits.length} · covered: ${covered} · uncovered: ${uncovered.length}\n\n`
  );
  process.stdout.write(
    `## Needs a bullet (feat/fix/other — user-facing) — ${bulletsWorthy.length}\n`
  );
  for (const c of bulletsWorthy) process.stdout.write(`- ${c.hash} ${c.subject}\n`);
  process.stdout.write(
    `\n## Rollup candidates (chore/ci/test/refactor/docs) — ${rollupCandidates.length}\n`
  );
  for (const c of rollupCandidates) process.stdout.write(`- ${c.hash} ${c.subject}\n`);
  process.stdout.write(
    `\n> Advisory. Add a bullet for each user-facing item; consolidate rollup candidates into a few Maintenance bullets (list their PR numbers).\n`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}
