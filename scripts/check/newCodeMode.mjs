// scripts/check/newCodeMode.mjs
// "New code" mode for the ratchet gates (Sonar "Clean as You Code", applied 2026-08-30).
//
// A global ratchet ("total violations ≤ baseline") makes an innocent PR red whenever the
// base drifted — and it lets a PR that adds 10 violations pass as long as someone else
// removed 11. In new-code mode (`--base-ref <sha>`, PR events only) a gate compares the
// PR's HEAD against the merge-base **restricted to the files the PR touched**:
//
//   blocking  → the PR added violations / dead symbols in files it changed
//   advisory  → the global total vs. the frozen baseline (printed, never exit 1);
//               the release reconciliation re-measures and re-freezes it
//
// Shared by check-complexity-ratchets.mjs and check-dead-code.mjs. Everything git-related
// is here; the pure comparison helpers are unit-tested (tests/unit/build/new-code-mode.test.ts).

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/** CLI arg helper shared by the gates: `--base-ref <sha>` → sha | null. */
export function baseRefArg(argv = process.argv) {
  const i = argv.indexOf("--base-ref");
  return i >= 0 && argv[i + 1] ? argv[i + 1] : null;
}

function git(args, opts = {}) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    maxBuffer: 64 * 1024 * 1024,
    ...opts,
  }).trim();
}

/** Merge-base between the PR base ref and HEAD (falls back to the ref itself). */
export function resolveMergeBase(baseRef) {
  try {
    return git(["merge-base", baseRef, "HEAD"]);
  } catch {
    return git(["rev-parse", baseRef]);
  }
}

/**
 * Files added/copied/modified/renamed between `mergeBase` and HEAD, filtered to the gate's
 * scope. Deleted files are irrelevant (nothing to measure on HEAD).
 */
export function listChangedFiles(mergeBase, { dirs, exts, excludePrefixes = [] }) {
  const out = git(["diff", "--name-only", "--diff-filter=ACMR", `${mergeBase}...HEAD`]);
  return filterScope(out.split("\n"), { dirs, exts, excludePrefixes });
}

/** Pure: keep paths under one of `dirs` with one of `exts`. */
export function filterScope(paths, { dirs, exts, excludePrefixes = [] }) {
  return paths
    .map((p) => p.trim())
    .filter(Boolean)
    .filter((p) => dirs.some((d) => p === d || p.startsWith(`${d}/`)))
    .filter((p) => exts.some((e) => p.endsWith(e)))
    .filter((p) => !excludePrefixes.some((prefix) => p.startsWith(prefix)))
    .sort();
}

/**
 * Materialize `sha` in a throwaway worktree with node_modules linked from ROOT, run `fn(dir)`,
 * always tear it down. Never touches the caller's tree or index (no stash, no checkout).
 */
export function withBaseWorktree(sha, fn) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-newcode-base-"));
  fs.rmdirSync(dir); // git worktree add wants a non-existent path
  git(["worktree", "add", "--detach", "--quiet", dir, sha]);
  try {
    const nm = path.join(ROOT, "node_modules");
    if (fs.existsSync(nm)) fs.symlinkSync(nm, path.join(dir, "node_modules"), "dir");
    return fn(dir);
  } finally {
    try {
      git(["worktree", "remove", "--force", dir]);
    } catch {
      fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      try {
        git(["worktree", "prune"]);
      } catch {
        /* best effort */
      }
    }
  }
}

/**
 * Pure: per-file count of ESLint messages whose ruleId is in `rules`.
 * `filePath` is made relative to `cwd` so HEAD and base reports share keys.
 */
export function perFileRuleCounts(report, rules, cwd) {
  let realCwd = cwd;
  try {
    realCwd = fs.realpathSync(cwd);
  } catch {
    /* fallback to cwd */
  }
  const counts = new Map();
  for (const entry of report || []) {
    let filePath = entry.filePath;
    if (path.isAbsolute(filePath)) {
      try {
        filePath = fs.realpathSync(filePath);
      } catch {
        /* fallback */
      }
    }
    const rel = path.isAbsolute(filePath)
      ? path.relative(realCwd, filePath).split(path.sep).join("/")
      : filePath;
    let n = 0;
    for (const m of entry.messages || []) if (rules.has(m.ruleId)) n++;
    counts.set(rel, (counts.get(rel) || 0) + n);
  }
  return counts;
}

/**
 * Pure: which changed files gained violations. A file absent from the base map is new
 * (base = 0). Returns the per-file regressions and the net delta over the changed set.
 */
export function diffNewCode(headCounts, baseCounts, changedFiles) {
  const regressions = [];
  let head = 0;
  let base = 0;
  for (const file of changedFiles) {
    const h = headCounts.get(file) || 0;
    const b = baseCounts.get(file) || 0;
    head += h;
    base += b;
    if (h > b) regressions.push({ file, base: b, head: h });
  }
  return { regressions, head, base, delta: head - base };
}

/** Pure: `file:symbol` keys of every dead export/type in a knip JSON report. */
export function deadSymbolKeys(knipJson) {
  const keys = new Set();
  for (const entry of knipJson?.issues || []) {
    for (const field of ["exports", "types", "nsExports", "nsTypes"]) {
      for (const sym of entry[field] || []) keys.add(`${entry.file}:${sym.name}`);
    }
  }
  for (const entry of knipJson?.issues || []) {
    for (const f of entry.files || []) keys.add(`${f}:<file>`);
  }
  return keys;
}

/**
 * Pure: dead symbols present on HEAD but not on the base, in files the PR touched — the
 * only ones the PR is answerable for. A symbol that went dead in an UNTOUCHED file because
 * the PR deleted its last consumer is also flagged when `includeUntouched` is set.
 */
export function newDeadSymbols(
  headKnip,
  baseKnip,
  changedFiles,
  { includeUntouched = false } = {}
) {
  const changed = new Set(changedFiles);
  const base = deadSymbolKeys(baseKnip);
  const out = [];
  for (const key of deadSymbolKeys(headKnip)) {
    if (base.has(key)) continue;
    const file = key.slice(0, key.lastIndexOf(":"));
    if (changed.has(file) || includeUntouched) out.push(key);
  }
  return out.sort();
}
