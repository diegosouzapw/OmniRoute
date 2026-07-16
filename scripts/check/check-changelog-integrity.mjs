#!/usr/bin/env node
// scripts/check/check-changelog-integrity.mjs
//
// Anti "CHANGELOG-eat" gate: no bullet line that exists in the BASE branch's
// CHANGELOG.md may disappear in the merge result. The chronic failure mode is
// git's merge auto-resolve silently dropping sibling bullets (or whole version
// sections) when two branches touch adjacent CHANGELOG lines — incident
// 2026-07-05: PR #6193's merge ate 212 lines (the entire [3.8.45] + [3.8.44]
// sections, 130 bullets), only recovered by hand from the pre-merge ref.
//
// On pull_request CI the checkout is refs/pull/N/merge — the auto-resolved
// merge result — so comparing it against origin/<base> catches the eat BEFORE
// the merge lands, in the PR that would cause it.
//
// Policy (Princípio Zero): this only ever ADDS work for the maintainer side —
// quality.yml runs it blocking for own-origin PRs and report-only for forks.
// The release captain's reconciliation rewrites the CHANGELOG legitimately,
// but that happens on the release PR (PR → main, ci.yml), which does not run
// this gate. Escape hatch for intentional removals (e.g. reverting a reverted
// feature's bullet): ALLOW_CHANGELOG_REMOVALS=1 turns failures into a report.
//
// Usage:
//   node scripts/check/check-changelog-integrity.mjs
//     env GITHUB_BASE_REF   PR base branch (CI); local fallback: current release/*
//     env CHANGELOG_BASE_REF  explicit ref override (e.g. origin/release/v3.8.45)
//     env ALLOW_CHANGELOG_REMOVALS=1  report-only (never fails)

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const CHANGELOG = "CHANGELOG.md";
const FRAGMENTS_DIR = "changelog.d";
const FRAGMENT_SECTIONS = ["features", "fixes", "maintenance"];
const FRAGMENT_SKIP = new Set(["README.md", ".gitkeep"]);

/** Extract the set of bullet lines (trimmed) from a CHANGELOG text. */
export function extractBullets(text) {
  const bullets = new Set();
  for (const raw of String(text || "").split("\n")) {
    const line = raw.trim();
    if (line.startsWith("- ") && line.length > 4) bullets.add(line);
  }
  return bullets;
}

/**
 * Bullet lines present in the base CHANGELOG but absent from the head
 * CHANGELOG — the "eaten" set. Pure so it has a unit test.
 */
export function findLostBullets(baseText, headText) {
  const headBullets = extractBullets(headText);
  const lost = [];
  for (const b of extractBullets(baseText)) {
    if (!headBullets.has(b)) lost.push(b);
  }
  return lost;
}

/**
 * Validate changelog FRAGMENTS (changelog.d/<section>/*.md — see changelog.d/README.md).
 * A fragment must be a well-formed markdown bullet ("- ...") with no merge-conflict
 * markers, and must live in a known section dir. Returns [{file, error}]. Pure over
 * the filesystem — unit-tested via a tmp root.
 */
export function findInvalidFragments(root = ROOT) {
  const invalid = [];
  const base = join(root, FRAGMENTS_DIR);
  if (!existsSync(base)) return invalid;
  const entries = readdirSync(base, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile()) {
      if (!FRAGMENT_SKIP.has(entry.name)) {
        invalid.push({
          file: `${FRAGMENTS_DIR}/${entry.name}`,
          error: `fragments live in a section dir (${FRAGMENT_SECTIONS.join("|")}), not at changelog.d root`,
        });
      }
      continue;
    }
    if (!FRAGMENT_SECTIONS.includes(entry.name)) {
      invalid.push({
        file: `${FRAGMENTS_DIR}/${entry.name}/`,
        error: `unknown section dir (expected ${FRAGMENT_SECTIONS.join("|")})`,
      });
      continue;
    }
    for (const f of readdirSync(join(base, entry.name))) {
      if (FRAGMENT_SKIP.has(f) || !f.endsWith(".md")) continue;
      const file = `${FRAGMENTS_DIR}/${entry.name}/${f}`;
      const text = readFileSync(join(base, entry.name, f), "utf8");
      const firstContent = text.split("\n").find((l) => l.trim().length > 0);
      if (!firstContent) invalid.push({ file, error: "empty fragment" });
      else if (!firstContent.trimStart().startsWith("- "))
        invalid.push({ file, error: 'fragment must start with a markdown bullet ("- ")' });
      else if (/^(<{7}|={7}|>{7})/m.test(text))
        invalid.push({ file, error: "fragment contains merge-conflict markers" });
    }
  }
  return invalid;
}

function git(args) {
  return execFileSync("git", args, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function resolveBaseRef() {
  if (process.env.CHANGELOG_BASE_REF) return process.env.CHANGELOG_BASE_REF;
  if (process.env.GITHUB_BASE_REF) return `origin/${process.env.GITHUB_BASE_REF}`;
  // Local fallback: the highest release/v* on origin (the active development base).
  try {
    const branches = git(["branch", "-r", "--list", "origin/release/v*", "--format=%(refname:short)"])
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    return branches[branches.length - 1] || null;
  } catch {
    return null;
  }
}

function main() {
  // Fragment well-formedness first (changelog.d/ — the fragments pattern makes the
  // eat-guard below structurally unnecessary for PRs that stop editing CHANGELOG.md).
  const invalidFragments = findInvalidFragments();
  if (invalidFragments.length > 0) {
    console.error(`[changelog-integrity] ${invalidFragments.length} invalid changelog fragment(s):`);
    for (const { file, error } of invalidFragments) console.error(`  ✗ ${file}: ${error}`);
    console.error("\nSee changelog.d/README.md for the fragment convention.");
    return 1;
  }

  const baseRef = resolveBaseRef();
  if (!baseRef) {
    console.log("[changelog-integrity] SKIP — could not resolve a base ref (offline/fresh clone).");
    return 0;
  }

  let baseText;
  try {
    baseText = git(["show", `${baseRef}:${CHANGELOG}`]);
  } catch {
    console.log(`[changelog-integrity] SKIP — ${CHANGELOG} not readable at ${baseRef}.`);
    return 0;
  }
  const headText = readFileSync(join(ROOT, CHANGELOG), "utf8");

  const lost = findLostBullets(baseText, headText);
  if (lost.length === 0) {
    console.log(`[changelog-integrity] OK — no base bullets lost vs ${baseRef}.`);
    return 0;
  }

  console.error(
    `[changelog-integrity] ${lost.length} bullet(s) present in ${baseRef} are MISSING from this tree's ${CHANGELOG}:`
  );
  for (const b of lost.slice(0, 15)) console.error(`  ✗ ${b.slice(0, 160)}`);
  if (lost.length > 15) console.error(`  … and ${lost.length - 15} more`);
  console.error(
    "\nThis is the CHANGELOG-eat pattern (merge auto-resolve dropping sibling bullets)." +
      "\nFix: restore the base CHANGELOG (`git checkout <base> -- CHANGELOG.md`), re-insert ONLY" +
      "\nyour own bullet, and prove the net diff is additive. Intentional removals (rare):" +
      "\nre-run with ALLOW_CHANGELOG_REMOVALS=1 and justify in the PR body."
  );
  if (process.env.ALLOW_CHANGELOG_REMOVALS === "1") {
    console.error("[changelog-integrity] ALLOW_CHANGELOG_REMOVALS=1 — reporting only, not failing.");
    return 0;
  }
  return 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.exit(main());
}
