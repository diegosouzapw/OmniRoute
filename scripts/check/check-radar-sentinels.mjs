#!/usr/bin/env node
/**
 * OmniRoute — Radar silent-cell structural gate.
 *
 * Asserts three structural invariants over the Radar catalog table —
 * every absent-data sentinel in that table must carry an explaining title.
 * (Rationale lives in the PR description; this header is self-contained on
 * purpose — no local doc paths here, they would leak into the upstream diff.
 * Sized to 3 known sites — extend with a 4th check if a new silent cell lands.):
 *   1. limits cell wraps {formatLimits(entry)} in <span title={t("limitsUnknownHelp")}> on the "—" branch
 *   2. context cell wraps the "—" branch in <span title={t("contextUnknownHelp")}>
 *   3. capabilityBadge's "?" span carries title={t("capabilityUnknownHelp")}
 *
 * Single purpose: structural invariant over one file. i18n coverage lives in
 * scripts/i18n/check-ui-keys-coverage.mjs — a red run here means a sentinel
 * without explanation, never a locale threshold.
 *
 * Usage: npm run check:radar-sentinels  (exit 1 on any broken invariant)
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const TABLE = path.join(
  ROOT,
  "src",
  "app",
  "(dashboard)",
  "dashboard",
  "radar",
  "RadarCatalogTable.tsx"
);

function fail(message) {
  console.error(`[radar-sentinels] FAIL ${message}`);
}

function main() {
  const raw = readFileSync(TABLE, "utf8");
  const src = raw.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, ""); // commented call sites must not count (no URLs in this file at pin)
  const failures = [];

  // Invariant 1 — limits cell: the "—" branch of formatLimits is wrapped with the help title.
  // Sized to the implementation shape (const limits + conditional span). Window {0,500}:
  // prettier rewraps must not false-red. If a 4th silent cell is added one day,
  // extend here with a 4th check — this gate is deliberately sized to known sites,
  // not generic (static-explicit beats magic-generic for a 1-file, 3-site gate).
  if (
    !/const limits = formatLimits\(entry\)[\s\S]{0,500}<span title=\{t\("limitsUnknownHelp"\)\}>\{limits\}<\/span>/.test(
      src
    )
  ) {
    failures.push(
      'limits cell: expected const limits + "—" branch wrapped in <span title={t("limitsUnknownHelp")}>{limits}</span>'
    );
  }

  // Invariant 2 — context cell: the "—" branch carries the context help title.
  if (!/<span title=\{t\("contextUnknownHelp"\)\}>—<\/span>/.test(src)) {
    failures.push('context cell: expected <span title={t("contextUnknownHelp")}>—</span>');
  }

  // Invariant 3 — capabilityBadge: the unknown-state span carries the capability help title.
  // Post-fix shape (param form): helper takes `unknownHelp: string`,
  // ALL THREE call sites (tools/vision/thinking) pass t("capabilityUnknownHelp") —
  // count, not exist (one dropped site must go red), and the span spreads
  // `{...(unknown ? { title: unknownHelp } : {})}` (unconditional title would spam ✓/✕ badges).
  const helpSites = src.match(/t\("capabilityUnknownHelp"\)/g) || [];
  if (helpSites.length < 3) {
    failures.push(
      `capability badge: expected t("capabilityUnknownHelp") at all 3 call sites, found ${helpSites.length}`
    );
  }
  if (!/title:\s*unknownHelp/.test(src)) {
    failures.push(
      "capability badge: expected conditional title from unknownHelp on the badge span"
    );
  }

  if (failures.length) {
    for (const f of failures) fail(f);
    console.error(
      `[radar-sentinels] ${failures.length} broken invariant(s) in RadarCatalogTable.tsx`
    );
    process.exit(1);
  }
  console.log("[radar-sentinels] all invariants hold");
}

main();
