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
  const lastTag = git(["describe", "--tags", "--abbrev=0"]);
  const version = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
  const log = git(["log", "--no-merges", `${lastTag}..HEAD`, "--pretty=format:%h%x09%s"]);
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
      JSON.stringify({ version, lastTag, total: commits.length, covered, uncovered }, null, 2) +
        "\n"
    );
    return;
  }
  const bulletsWorthy = uncovered.filter((c) => !c.rollup);
  const rollupCandidates = uncovered.filter((c) => c.rollup);
  process.stdout.write(`# Uncovered-commit reconciliation — v${version} (${lastTag}..HEAD)\n\n`);
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
