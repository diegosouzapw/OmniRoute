#!/usr/bin/env node
/**
 * OmniRoute — Vitest exclusion gate (CI gate, blocking).
 *
 * Every file parked in `vitest.config.ts`'s `exclude` list is a test that does not run.
 * A skipped test is indistinguishable from a test that does not exist, with the added
 * hazard of LOOKING like coverage to whoever reads the file tree.
 *
 * Why this gate exists (the incident it encodes): 62 files accumulated behind the comment
 * `// #8618 — pre-existing failure; remove this exclusion when fixed`. Issue #8618 was
 * CLOSED on 2026-08-11 while the list it tracked kept growing — from 45 entries to 62 —
 * each new exclusion inheriting a comment that pointed at a dead issue. When the list was
 * finally measured file by file (#13204), **51 of the 62 passed against the current tree
 * with no source change**: the exclusions had outlived the failures that justified them by
 * months, and nothing in CI could say so.
 *
 * The gate enforces the two properties that would have caught it:
 *
 *   1. Every excluded path that resolves to a real file carries an issue reference
 *      (`#<number>`) in a trailing comment. An exclusion without a tracker is invisible
 *      debt.
 *   2. The set of excluded files matches the checked-in inventory
 *      (`config/quality/vitest-exclusions.json`). Adding an exclusion becomes a visible,
 *      reviewable diff in a dedicated file instead of one more line lost in a 60-entry
 *      array.
 *
 * Owner, measured result and bounded expiry are mandatory. The separate quarantine
 * workflow re-runs the inventory and verifies tracking issues against live GitHub.
 *
 * Standard tooling exclusions (`node_modules/**`, the live-server E2E specs
 * that have their own runner) are exempt — they are configuration, not debt.
 *
 * Usage:
 *   node scripts/check/check-vitest-exclusions.mjs           # strict, exit 1 on violation
 *   node scripts/check/check-vitest-exclusions.mjs --json    # machine-readable
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { validateQuarantine } from "../quality/quarantine-contract.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const CONFIG = path.join(ROOT, "vitest.config.ts");
const INVENTORY = path.join(ROOT, "config/quality/vitest-exclusions.json");

/** Exclusions that are tooling configuration rather than parked debt. */
const EXEMPT = new Set([
  "node_modules/**",
  "dist/**",
  "cypress/**",
  ".idea/**",
  ".git/**",
  ".cache/**",
  // Live-server E2E: their own runner + vitest.e2e-live.config.ts, never this jsdom job.
  "tests/e2e/ecosystem.test.ts",
  "tests/e2e/protocol-clients.test.ts",
]);

/**
 * Parse the `exclude` array out of vitest.config.ts, keeping each entry's trailing comment.
 *
 * @returns {Array<{ pattern: string, comment: string }>}
 */
export function parseExclusions(source) {
  const block = source.match(/exclude:\s*\[([\s\S]*?)\n {4}\]/);
  if (!block) return [];
  const out = [];
  for (const line of block[1].split("\n")) {
    const pattern = line.match(/"([^"]+)"/);
    if (!pattern) continue;
    const comment = line.slice(line.indexOf(pattern[0]) + pattern[0].length);
    out.push({ pattern: pattern[1], comment: comment.trim() });
  }
  return out;
}

/**
 * Pure core: which exclusions violate the gate?
 *
 * @param {Array<{pattern: string, comment: string}>} entries
 * @param {(p: string) => boolean} exists
 * @param {string[]} inventory  paths recorded in the checked-in inventory
 */
export function findViolations(entries, exists, inventory) {
  const tracked = new Set(inventory);
  const untracked = [];
  const unreferenced = [];
  const seen = new Set();

  for (const { pattern, comment } of entries) {
    if (EXEMPT.has(pattern)) continue;
    // An arbitrary glob could hide hundreds of tests without an inventory entry.
    if (/[*?\[\]{}]/.test(pattern)) {
      untracked.push(pattern);
      continue;
    }
    if (!exists(pattern)) continue; // a stale path excludes nothing
    seen.add(pattern);
    if (!/#\d+/.test(comment)) unreferenced.push(pattern);
    if (!tracked.has(pattern)) untracked.push(pattern);
  }

  const orphaned = inventory.filter((p) => !seen.has(p));
  return { unreferenced, untracked, orphaned };
}

function main() {
  const json = process.argv.includes("--json");
  const entries = parseExclusions(fs.readFileSync(CONFIG, "utf8"));
  const recorded = fs.existsSync(INVENTORY)
    ? JSON.parse(fs.readFileSync(INVENTORY, "utf8")).excluded
    : undefined;
  const inventory = (recorded ?? []).map((e) => e.file);
  const issueArg = process.argv.indexOf("--issue-states");
  const issueStates =
    issueArg === -1 ? undefined : JSON.parse(fs.readFileSync(process.argv[issueArg + 1], "utf8"));
  const metadataErrors = validateQuarantine(recorded, { issueStates });

  const { unreferenced, untracked, orphaned } = findViolations(
    entries,
    (p) => fs.existsSync(path.join(ROOT, p)),
    inventory
  );

  if (json) {
    console.log(JSON.stringify({ unreferenced, untracked, orphaned, metadataErrors }, null, 2));
    process.exitCode =
      unreferenced.length + untracked.length + orphaned.length + metadataErrors.length ? 1 : 0;
    return;
  }

  const failed = unreferenced.length + untracked.length + orphaned.length + metadataErrors.length;
  if (!failed) {
    console.log(
      `[vitest-exclusions] OK — ${inventory.length} excluded file(s), owned, tracked and unexpired; live issue state ${issueStates ? "verified" : "not checked (periodic workflow)"}.`
    );
    return;
  }

  if (unreferenced.length) {
    console.error(
      `\n[vitest-exclusions] FAIL — ${unreferenced.length} exclusion(s) carry no issue reference:`
    );
    for (const p of unreferenced) console.error(`  ✗ ${p}`);
    console.error(
      "  Add a trailing comment naming an OPEN tracking issue, e.g. // #13204 — reason"
    );
  }
  if (untracked.length) {
    console.error(
      `\n[vitest-exclusions] FAIL — ${untracked.length} exclusion(s) missing from ${path.relative(ROOT, INVENTORY)}:`
    );
    for (const p of untracked) console.error(`  ✗ ${p}`);
    console.error("  Record it there with its measured status, so the debt is reviewable.");
  }
  if (orphaned.length) {
    console.error(
      `\n[vitest-exclusions] FAIL — ${orphaned.length} inventory entr(ies) no longer excluded:`
    );
    for (const p of orphaned) console.error(`  ✗ ${p}`);
    console.error("  The test runs again — drop it from the inventory.");
  }
  for (const error of metadataErrors) console.error(`[vitest-exclusions] FAIL — ${error}`);
  process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
