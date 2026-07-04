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
  const refs = changelogRefWindow(changelog, version);
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
