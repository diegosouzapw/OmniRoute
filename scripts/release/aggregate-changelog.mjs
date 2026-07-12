#!/usr/bin/env node
// scripts/release/aggregate-changelog.mjs
//
// Changelog FRAGMENTS aggregator (towncrier/changesets pattern, adopted 2026-07-09).
//
// Why: during a release cycle every PR used to edit the same few lines at the top of
// CHANGELOG.md (its bullet). In a merge-storm each merge conflicted every sibling
// (CHANGELOG-eat / DIRTY cascade), forcing a re-sync push + full CI re-run per PR per
// merge — O(N²) CI runs for N queued PRs. With fragments, a PR adds ONE NEW FILE under
// changelog.d/<section>/ instead, so two PRs never touch the same file: no conflicts,
// no eat, no re-sync. This script is the single place fragments become CHANGELOG.md
// bullets — run by the release captain (or /generate-release) at reconciliation, and
// safe to run mid-cycle whenever a consolidated view is wanted.
//
// Convention:
//   changelog.d/features/<PR>-<slug>.md     → appended to "### ✨ New Features"
//   changelog.d/fixes/<PR>-<slug>.md        → appended to "### 🐛 Bug Fixes"
//   changelog.d/maintenance/<PR>-<slug>.md  → appended to "### 📝 Maintenance"
//   File content = the exact bullet line(s), starting with "- " (continuation lines
//   allowed). Credit format stays the repo norm: "(#PR — thanks @user)".
//
// Usage:
//   node scripts/release/aggregate-changelog.mjs [--dry-run]
//     --dry-run  print the would-be CHANGELOG.md to stdout and list fragments;
//                touch nothing.
//
// On a real run, aggregated fragment files are DELETED (leaving README.md and the
// .gitkeep placeholders) — the caller commits both the CHANGELOG.md update and the
// deletions in one commit.

import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const FRAGMENTS_DIR = "changelog.d";

/** Section subdir → the CHANGELOG heading its bullets are appended under. */
export const SECTIONS = Object.freeze({
  features: "### ✨ New Features",
  fixes: "### 🐛 Bug Fixes",
  maintenance: "### 📝 Maintenance",
});

const SKIP_FILES = new Set(["README.md", ".gitkeep"]);

/**
 * Validate one fragment's text. Returns null when OK, or a human-readable error.
 * Pure — unit-tested.
 */
export function validateFragmentText(text) {
  const body = String(text || "").replace(/^﻿/, "");
  const lines = body.split("\n");
  const firstContent = lines.find((l) => l.trim().length > 0);
  if (!firstContent) return "empty fragment";
  if (!firstContent.trimStart().startsWith("- ")) {
    return 'fragment must start with a markdown bullet ("- ")';
  }
  if (/^(<{7}|={7}|>{7})/m.test(body)) return "fragment contains merge-conflict markers";
  return null;
}

/**
 * Collect fragments from <root>/changelog.d, sorted by filename per section for a
 * deterministic output order. Returns { features: [...], fixes: [...],
 * maintenance: [...], invalid: [{file, error}] } where each valid entry is
 * { file, text } (text trimmed of trailing whitespace).
 */
export function collectFragments(root) {
  const out = { features: [], fixes: [], maintenance: [], invalid: [] };
  const base = join(root, FRAGMENTS_DIR);
  if (!existsSync(base)) return out;
  for (const section of Object.keys(SECTIONS)) {
    const dir = join(base, section);
    if (!existsSync(dir)) continue;
    const files = readdirSync(dir)
      .filter((f) => f.endsWith(".md") && !SKIP_FILES.has(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    for (const f of files) {
      const file = join(dir, f);
      const text = readFileSync(file, "utf8").replace(/\s+$/, "");
      const error = validateFragmentText(text);
      if (error) out.invalid.push({ file: relative(root, file), error });
      else out[section].push({ file: relative(root, file), text });
    }
  }
  return out;
}

/**
 * Append bullets at the END of a living-section heading's bullet block (before the
 * next "##"/"###" heading). Operates on the FIRST occurrence of the heading — in this
 * repo's CHANGELOG the living cycle section always appears first. Pure — unit-tested.
 * Throws when a needed heading is missing (the release captain adds the heading; the
 * script never invents structure).
 */
export function insertBullets(changelogText, bulletsBySection) {
  let lines = changelogText.split("\n");
  for (const [section, heading] of Object.entries(SECTIONS)) {
    const bullets = (bulletsBySection[section] || []).map((b) => b.text ?? b);
    if (bullets.length === 0) continue;
    const headIdx = lines.findIndex((l) => l.trim() === heading);
    if (headIdx === -1) {
      throw new Error(
        `heading "${heading}" not found in CHANGELOG.md — add it to the living section before aggregating ${section} fragments`
      );
    }
    // End of this section's block: last non-empty line before the next heading.
    let nextHead = lines.length;
    for (let i = headIdx + 1; i < lines.length; i++) {
      if (/^##/.test(lines[i])) {
        nextHead = i;
        break;
      }
    }
    let insertAt = nextHead;
    while (insertAt > headIdx + 1 && lines[insertAt - 1].trim() === "") insertAt--;
    const block = bullets.flatMap((b) => b.split("\n"));
    lines = [...lines.slice(0, insertAt), ...block, ...lines.slice(insertAt)];
  }
  return lines.join("\n");
}

/**
 * Aggregate fragments into CHANGELOG.md. Returns a summary object. When dryRun is
 * true nothing is written or deleted.
 */
export function aggregate({ root = ROOT, dryRun = false } = {}) {
  const collected = collectFragments(root);
  if (collected.invalid.length > 0) {
    const detail = collected.invalid.map((i) => `  ✗ ${i.file}: ${i.error}`).join("\n");
    throw new Error(`invalid changelog fragments:\n${detail}`);
  }
  const total = collected.features.length + collected.fixes.length + collected.maintenance.length;
  const changelogPath = join(root, "CHANGELOG.md");
  const before = readFileSync(changelogPath, "utf8");
  const after = total === 0 ? before : insertBullets(before, collected);
  if (!dryRun && total > 0) {
    writeFileSync(changelogPath, after);
    for (const section of Object.keys(SECTIONS)) {
      for (const { file } of collected[section]) unlinkSync(join(root, file));
    }
  }
  return { total, collected, changed: total > 0, after };
}

function main() {
  const dryRun = process.argv.includes("--dry-run");
  const result = aggregate({ dryRun });
  if (result.total === 0) {
    console.log("[aggregate-changelog] no fragments to aggregate — nothing to do.");
    return 0;
  }
  for (const section of Object.keys(SECTIONS)) {
    for (const { file } of result.collected[section]) {
      console.log(`[aggregate-changelog] ${dryRun ? "would aggregate" : "aggregated"} ${file}`);
    }
  }
  console.log(
    `[aggregate-changelog] ${result.total} fragment(s) → CHANGELOG.md${dryRun ? " (dry-run, nothing written)" : " (fragments deleted — commit CHANGELOG.md + deletions together)"}`
  );
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.exit(main());
}
