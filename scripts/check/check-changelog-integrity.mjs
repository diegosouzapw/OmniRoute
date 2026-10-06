#!/usr/bin/env node
// scripts/check/check-changelog-integrity.mjs
//
// Anti "CHANGELOG-eat" gate: no bullet-line occurrence that exists in the BASE
// branch's CHANGELOG.md may disappear in the merge result. The chronic failure mode is
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
// this gate. There is no runtime escape hatch: every unexplained removal fails.
// Intentional rewrites require a reviewed record in
// config/release/changelog-reconciliations.json. Each record binds the complete base
// and result files by SHA-256 and lists the exact removed/added bullet-line multiset;
// repeated strings encode repeated occurrences. The gate deliberately protects
// bullet lines, not standalone headings, dates, or prose outside a bullet.
//
// Usage:
//   node scripts/check/check-changelog-integrity.mjs
//     env GITHUB_BASE_REF   PR base branch (CI); local fallback: current release/*
//     env CHANGELOG_BASE_REF  explicit ref override (e.g. origin/release/v3.8.45)

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const CHANGELOG = "CHANGELOG.md";
const RECONCILIATIONS = "config/release/changelog-reconciliations.json";
const FRAGMENTS_DIR = "changelog.d";
const FRAGMENT_SECTIONS = ["features", "fixes", "maintenance"];
const FRAGMENT_SKIP = new Set(["README.md", ".gitkeep"]);
const SHA256_PATTERN = /^[0-9a-f]{64}$/;
const RECONCILIATION_KEYS = new Set([
  "id",
  "reason",
  "baseChangelogSha256",
  "resultChangelogSha256",
  "removedBullets",
  "addedBullets",
]);

/** Extract the set of bullet lines (trimmed) from a CHANGELOG text. */
export function extractBullets(text) {
  return new Set(extractBulletOccurrences(text));
}

/** Extract every bullet-line occurrence, preserving order and duplicates. */
export function extractBulletOccurrences(text) {
  const bullets = [];
  for (const raw of String(text || "").split("\n")) {
    const line = raw.trim();
    if (line.startsWith("- ") && line.length > 4) bullets.push(line);
  }
  return bullets;
}

function findMissingOccurrences(sourceText, targetText) {
  const available = new Map();
  for (const bullet of extractBulletOccurrences(targetText)) {
    available.set(bullet, (available.get(bullet) || 0) + 1);
  }
  const missing = [];
  for (const bullet of extractBulletOccurrences(sourceText)) {
    const count = available.get(bullet) || 0;
    if (count > 0) available.set(bullet, count - 1);
    else missing.push(bullet);
  }
  return missing;
}

/**
 * Bullet-line occurrences present in the base CHANGELOG but absent from the head
 * CHANGELOG — including one lost copy of a repeated line. Pure so it has a unit test.
 */
export function findLostBullets(baseText, headText) {
  return findMissingOccurrences(baseText, headText);
}

/** Bullet-line occurrences present only in the result CHANGELOG. */
export function findAddedBullets(baseText, headText) {
  return findMissingOccurrences(headText, baseText);
}

/** Stable digest tying a reconciliation record to the complete file, not just its bullets. */
export function changelogSha256(text) {
  return createHash("sha256")
    .update(String(text || ""), "utf8")
    .digest("hex");
}

function validateBulletList(value, path, { allowEmpty }) {
  if (!Array.isArray(value)) return [`${path} must be an array`];
  const errors = [];
  if (!allowEmpty && value.length === 0) errors.push(`${path} must not be empty`);
  for (let index = 0; index < value.length; index++) {
    const bullet = value[index];
    if (
      typeof bullet !== "string" ||
      bullet !== bullet.trim() ||
      !bullet.startsWith("- ") ||
      bullet.length <= 4
    ) {
      errors.push(`${path}[${index}] must be one exact, trimmed markdown bullet`);
    }
  }
  return errors;
}

/** Validate the durable reconciliation ledger without trusting any of its claims. */
export function validateReconciliationLedger(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return ["ledger must be a JSON object"];
  }
  const errors = [];
  const topLevelKeys = Object.keys(value);
  for (const key of topLevelKeys) {
    if (key !== "schemaVersion" && key !== "reconciliations") {
      errors.push(`unknown top-level field: ${key}`);
    }
  }
  if (value.schemaVersion !== 1) errors.push("schemaVersion must be 1");
  if (!Array.isArray(value.reconciliations)) {
    errors.push("reconciliations must be an array");
    return errors;
  }

  const ids = new Set();
  const filePairs = new Set();
  for (let index = 0; index < value.reconciliations.length; index++) {
    const record = value.reconciliations[index];
    const path = `reconciliations[${index}]`;
    if (!record || typeof record !== "object" || Array.isArray(record)) {
      errors.push(`${path} must be an object`);
      continue;
    }
    for (const key of Object.keys(record)) {
      if (!RECONCILIATION_KEYS.has(key)) errors.push(`${path} has unknown field: ${key}`);
    }
    if (typeof record.id !== "string" || !/^[a-z0-9][a-z0-9._-]{2,79}$/.test(record.id)) {
      errors.push(`${path}.id must be a 3-80 character lowercase slug`);
    } else if (ids.has(record.id)) {
      errors.push(`${path}.id duplicates "${record.id}"`);
    } else {
      ids.add(record.id);
    }
    if (typeof record.reason !== "string" || record.reason.trim().length < 20) {
      errors.push(`${path}.reason must explain the reconciliation in at least 20 characters`);
    }
    if (!SHA256_PATTERN.test(record.baseChangelogSha256 || "")) {
      errors.push(`${path}.baseChangelogSha256 must be a lowercase SHA-256 digest`);
    }
    if (!SHA256_PATTERN.test(record.resultChangelogSha256 || "")) {
      errors.push(`${path}.resultChangelogSha256 must be a lowercase SHA-256 digest`);
    }
    if (
      SHA256_PATTERN.test(record.baseChangelogSha256 || "") &&
      record.baseChangelogSha256 === record.resultChangelogSha256
    ) {
      errors.push(`${path} must describe a changed CHANGELOG.md`);
    }
    errors.push(
      ...validateBulletList(record.removedBullets, `${path}.removedBullets`, {
        allowEmpty: false,
      }),
      ...validateBulletList(record.addedBullets, `${path}.addedBullets`, { allowEmpty: true })
    );
    if (Array.isArray(record.removedBullets) && Array.isArray(record.addedBullets)) {
      const removed = new Set(record.removedBullets);
      for (const bullet of record.addedBullets) {
        if (removed.has(bullet)) errors.push(`${path} lists the same bullet as removed and added`);
      }
    }

    const pair = `${record.baseChangelogSha256}:${record.resultChangelogSha256}`;
    if (filePairs.has(pair)) errors.push(`${path} duplicates an earlier base/result digest pair`);
    filePairs.add(pair);
  }
  return errors;
}

function sameStringMultiset(left, right) {
  if (left.length !== right.length) return false;
  const remaining = new Map();
  for (const item of right) remaining.set(item, (remaining.get(item) || 0) + 1);
  for (const item of left) {
    const count = remaining.get(item) || 0;
    if (count === 0) return false;
    remaining.set(item, count - 1);
  }
  return true;
}

/** Find the single record that exactly explains this complete base → result transition. */
export function findLedgeredReconciliation(baseText, headText, ledger) {
  const baseChangelogSha256 = changelogSha256(baseText);
  const resultChangelogSha256 = changelogSha256(headText);
  const removedBullets = findLostBullets(baseText, headText);
  const addedBullets = findAddedBullets(baseText, headText);
  return ledger.reconciliations.find(
    (record) =>
      record.baseChangelogSha256 === baseChangelogSha256 &&
      record.resultChangelogSha256 === resultChangelogSha256 &&
      sameStringMultiset(record.removedBullets, removedBullets) &&
      sameStringMultiset(record.addedBullets, addedBullets)
  );
}

function readReconciliationLedger(root = ROOT) {
  const path = join(root, RECONCILIATIONS);
  if (!existsSync(path)) {
    return { ledger: null, errors: [`${RECONCILIATIONS} is missing`] };
  }
  let ledger;
  try {
    ledger = JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    return {
      ledger: null,
      errors: [`${RECONCILIATIONS} is not valid JSON: ${error.message}`],
    };
  }
  return { ledger, errors: validateReconciliationLedger(ledger) };
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
    const branches = git([
      "branch",
      "-r",
      "--list",
      "origin/release/v*",
      "--format=%(refname:short)",
    ])
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
  if (Object.hasOwn(process.env, "ALLOW_CHANGELOG_REMOVALS")) {
    console.error(
      "[changelog-integrity] ALLOW_CHANGELOG_REMOVALS was removed; delete it from the environment and record intentional transformations in config/release/changelog-reconciliations.json."
    );
    return 1;
  }

  // Fragment well-formedness first (changelog.d/ — the fragments pattern makes the
  // eat-guard below structurally unnecessary for PRs that stop editing CHANGELOG.md).
  const invalidFragments = findInvalidFragments();
  if (invalidFragments.length > 0) {
    console.error(
      `[changelog-integrity] ${invalidFragments.length} invalid changelog fragment(s):`
    );
    for (const { file, error } of invalidFragments) console.error(`  ✗ ${file}: ${error}`);
    console.error("\nSee changelog.d/README.md for the fragment convention.");
    return 1;
  }

  const { ledger, errors: ledgerErrors } = readReconciliationLedger();
  if (ledgerErrors.length > 0) {
    console.error(`[changelog-integrity] invalid reconciliation ledger (${ledgerErrors.length}):`);
    for (const error of ledgerErrors) console.error(`  ✗ ${error}`);
    return 1;
  }

  const hasExplicitBaseRef = Boolean(process.env.CHANGELOG_BASE_REF || process.env.GITHUB_BASE_REF);
  const baseRef = resolveBaseRef();
  if (!baseRef) {
    console.log("[changelog-integrity] SKIP — could not resolve a base ref (offline/fresh clone).");
    return 0;
  }

  let baseText;
  try {
    baseText = git(["show", `${baseRef}:${CHANGELOG}`]);
  } catch {
    if (hasExplicitBaseRef) {
      console.error(
        `[changelog-integrity] FAIL — ${CHANGELOG} not readable at explicit base ${baseRef}.`
      );
      return 1;
    }
    console.log(`[changelog-integrity] SKIP — ${CHANGELOG} not readable at ${baseRef}.`);
    return 0;
  }
  const headText = readFileSync(join(ROOT, CHANGELOG), "utf8");

  const lost = findLostBullets(baseText, headText);
  if (lost.length === 0) {
    console.log(`[changelog-integrity] OK — no base bullets lost vs ${baseRef}.`);
    return 0;
  }

  const reconciliation = findLedgeredReconciliation(baseText, headText, ledger);
  if (reconciliation) {
    console.log(
      `[changelog-integrity] OK — ${lost.length} removed base bullet(s) covered by ledgered reconciliation "${reconciliation.id}" vs ${baseRef}.`
    );
    return 0;
  }

  console.error(
    `[changelog-integrity] ${lost.length} bullet(s) present in ${baseRef} are MISSING from this tree's ${CHANGELOG}:`
  );
  for (const b of lost.slice(0, 15)) console.error(`  ✗ ${b.slice(0, 160)}`);
  if (lost.length > 15) console.error(`  … and ${lost.length - 15} more`);
  const added = findAddedBullets(baseText, headText);
  console.error(
    "\nThis is the CHANGELOG-eat pattern (merge auto-resolve dropping sibling bullets)." +
      "\nFix: restore the base CHANGELOG (`git checkout <base> -- CHANGELOG.md`), re-insert ONLY" +
      "\nyour own bullet, and prove the net diff is additive." +
      `\nIntentional reconciliation: add one exact, reviewed record to ${RECONCILIATIONS}.` +
      `\n  baseChangelogSha256:   ${changelogSha256(baseText)}` +
      `\n  resultChangelogSha256: ${changelogSha256(headText)}` +
      `\n  removedBullets: ${lost.length}; addedBullets: ${added.length}` +
      "\nThere is no environment-variable bypass."
  );
  return 1;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.exit(main());
}
