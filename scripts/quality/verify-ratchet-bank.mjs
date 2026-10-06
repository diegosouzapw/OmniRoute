#!/usr/bin/env node
/**
 * Safety verifier for the automated ratchet-banking lane (#8584 proposal 2).
 *
 * WHY THIS EXISTS: the ratchet is asymmetric. Raising a cap is a ten-second manual
 * JSON edit made under merge pressure; lowering one requires someone to run
 * `--update` and commit, which no workflow does. The result is a high-water mark,
 * not a ratchet — caps outlive the shrinks that earned them (#8584 measured 18 of
 * them, up to 132x the file's actual size).
 *
 * The automation that fixes that has to write to the baselines, so it needs a hard
 * guarantee it can only ever write in the shrink direction. This script is that
 * guarantee: it diffs the post-`--update` working tree against HEAD and FAILS if
 * anything moved the wrong way. A bot that could raise a cap would be strictly worse
 * than the status quo, so the workflow aborts (opens no PR) on any problem here.
 *
 * Allowed, and nothing else:
 *   file-size-baseline.json  — a frozen/testFrozen numeric entry LOWERED or REMOVED
 *   complexity-baseline.json — `count` LOWERED
 *   quality-baseline.json    — `metrics.cognitiveComplexity.value` LOWERED
 *
 * Explicitly rejected: raising any number, adding any entry, changing cap/testCap,
 * and deleting or rewriting a `_rebaseline_*` / `_comment` note (the notes are the
 * audit trail for why each ceiling exists — see the 37 of them in complexity-baseline).
 *
 * Usage:  node scripts/quality/verify-ratchet-bank.mjs [--ref HEAD]
 *   stdout — markdown summary of what would be banked (for the PR body)
 *   stderr — human log
 *   exit 0 — safe (see summary for whether anything changed at all)
 *   exit 1 — UNSAFE, the caller must not commit
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();

export const BANKED_BASELINES = {
  fileSize: "config/quality/file-size-baseline.json",
  complexity: "config/quality/complexity-baseline.json",
  quality: "config/quality/quality-baseline.json",
};

/** Deep structural equality over JSON-shaped values. */
function jsonEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Verifies one frozen map (`frozen` / `testFrozen`). Numeric entries may only be
 * lowered or removed; string entries are `_rebaseline_*` notes stored inside the
 * same object and must survive verbatim.
 * @returns {{problems: string[], removed: string[], lowered: [string, number, number][]}}
 */
export function verifyFrozenMap(before = {}, after = {}, label = "frozen") {
  const problems = [];
  const removed = [];
  const lowered = [];

  for (const [key, prev] of Object.entries(before)) {
    const has = Object.prototype.hasOwnProperty.call(after, key);
    if (typeof prev !== "number") {
      // note key
      if (!has) problems.push(`${label}: note "${key}" was deleted — notes must be preserved`);
      // Structural, not referential. A note whose value is an OBJECT — the
      // 2026-08-11 merge-storm entry folded four file→LOC pairs under a single
      // note key — is a fresh object on every JSON.parse, so `!==` reported it
      // rewritten on an UNMODIFIED tree. That made this verifier exit 1
      // unconditionally, and the nightly bank-ratchet-shrinks job (#8612) aborts
      // on non-zero: every shrink since has gone unbanked.
      else if (!jsonEqual(after[key], prev))
        problems.push(`${label}: note "${key}" was rewritten — notes must be preserved verbatim`);
      continue;
    }
    if (!has) {
      removed.push(key); // banked: dropped below the cap and left the baseline
      continue;
    }
    const next = after[key];
    if (typeof next !== "number") problems.push(`${label}: ${key} is no longer a number`);
    else if (next > prev) problems.push(`${label}: ${key} RAISED ${prev} → ${next}`);
    else if (next < prev) lowered.push([key, prev, next]);
  }

  for (const key of Object.keys(after)) {
    if (!Object.prototype.hasOwnProperty.call(before, key))
      problems.push(`${label}: ${key} was ADDED — banking may not introduce entries`);
  }

  return { problems, removed, lowered };
}

/** Every top-level key except `except` must be byte-identical. */
function verifyRestUntouched(before, after, except, file) {
  const problems = [];
  const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
  for (const key of keys) {
    if (except.has(key)) continue;
    if (!jsonEqual(before[key], after[key]))
      problems.push(`${file}: "${key}" changed — only the ratcheted values may move`);
  }
  return problems;
}

/** @returns {{problems: string[], removed: string[], lowered: [string, number, number][]}} */
export function verifyFileSizeBaseline(before, after) {
  const src = verifyFrozenMap(before.frozen, after.frozen, "frozen");
  const tst = verifyFrozenMap(before.testFrozen, after.testFrozen, "testFrozen");
  return {
    problems: [
      ...verifyRestUntouched(before, after, new Set(["frozen", "testFrozen"]), "file-size"),
      ...src.problems,
      ...tst.problems,
    ],
    removed: [...src.removed, ...tst.removed],
    lowered: [...src.lowered, ...tst.lowered],
  };
}

/** Lowers a single numeric field, everything else frozen. */
function verifyScalar(before, after, prev, next, label, file, except) {
  const problems = verifyRestUntouched(before, after, except, file);
  const lowered = [];
  if (typeof next !== "number") problems.push(`${file}: ${label} is missing or not a number`);
  else if (next > prev) problems.push(`${file}: ${label} RAISED ${prev} → ${next}`);
  else if (next < prev) lowered.push([label, prev, next]);
  return { problems, removed: [], lowered };
}

export function verifyComplexityBaseline(before, after) {
  return verifyScalar(
    before,
    after,
    before.count,
    after.count,
    "count",
    "complexity",
    new Set(["count"])
  );
}

export function verifyQualityBaseline(before, after) {
  const prev = before.metrics?.cognitiveComplexity?.value;
  const next = after.metrics?.cognitiveComplexity?.value;
  // Only metrics.cognitiveComplexity.value may move; compare the rest of `metrics`
  // by swapping in the old value and requiring a byte-identical result.
  const patched = JSON.parse(JSON.stringify(after));
  if (patched.metrics?.cognitiveComplexity) patched.metrics.cognitiveComplexity.value = prev;
  const problems = jsonEqual(before, patched)
    ? []
    : ["quality: something other than metrics.cognitiveComplexity.value changed"];
  const lowered = [];
  if (typeof next !== "number") problems.push("quality: cognitiveComplexity.value is not a number");
  else if (next > prev) problems.push(`quality: cognitiveComplexity RAISED ${prev} → ${next}`);
  else if (next < prev) lowered.push(["cognitiveComplexity", prev, next]);
  return { problems, removed: [], lowered };
}

/**
 * @param {{fileSize?: {before: object, after: object}, complexity?: ..., quality?: ...}} pairs
 * @returns {{ok: boolean, changed: boolean, problems: string[], removed: string[], lowered: [string, number, number][]}}
 */
export function verifyRatchetBank(pairs) {
  const verifiers = {
    fileSize: verifyFileSizeBaseline,
    complexity: verifyComplexityBaseline,
    quality: verifyQualityBaseline,
  };
  const problems = [];
  const removed = [];
  const lowered = [];
  for (const [kind, verify] of Object.entries(verifiers)) {
    const pair = pairs[kind];
    if (!pair) continue;
    const r = verify(pair.before, pair.after);
    problems.push(...r.problems);
    removed.push(...r.removed);
    lowered.push(...r.lowered);
  }
  return {
    ok: problems.length === 0,
    changed: removed.length > 0 || lowered.length > 0,
    problems,
    removed,
    lowered,
  };
}

export function formatBankSummary(result) {
  if (!result.changed) return "Nothing to bank — every baseline already matches the code.\n";
  const lines = [];
  if (result.lowered.length) {
    lines.push(
      `### Lowered (${result.lowered.length})`,
      "",
      "| entry | was | now |",
      "| --- | --- | --- |"
    );
    for (const [key, prev, next] of result.lowered)
      lines.push(`| \`${key}\` | ${prev} | ${next} |`);
    lines.push("");
  }
  if (result.removed.length) {
    lines.push(
      `### Removed — now at or under the cap (${result.removed.length})`,
      "",
      ...result.removed.map((f) => `- \`${f}\``),
      ""
    );
  }
  return lines.join("\n");
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, file), "utf8"));
}

function readJsonAtRef(ref, file) {
  // execFileSync (no shell) — `ref`/`file` are never interpolated into a command string.
  return JSON.parse(execFileSync("git", ["show", `${ref}:${file}`], { encoding: "utf8" }));
}

function main() {
  const i = process.argv.indexOf("--ref");
  const ref = i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : "HEAD";

  const pairs = {};
  for (const [kind, file] of Object.entries(BANKED_BASELINES)) {
    pairs[kind] = { before: readJsonAtRef(ref, file), after: readJson(file) };
  }

  const result = verifyRatchetBank(pairs);
  process.stdout.write(formatBankSummary(result));

  if (!result.ok) {
    console.error(
      `[verify-ratchet-bank] UNSAFE — ${result.problems.length} problem(s); refusing to bank:\n` +
        result.problems.map((p) => "  ✗ " + p).join("\n") +
        "\n  → the banking lane may only lower or remove. Investigate before committing."
    );
    process.exit(1);
  }
  console.error(
    result.changed
      ? `[verify-ratchet-bank] OK — ${result.lowered.length} lowered, ${result.removed.length} removed, nothing raised.`
      : "[verify-ratchet-bank] OK — no baseline movement."
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
