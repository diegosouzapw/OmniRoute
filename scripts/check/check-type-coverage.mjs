#!/usr/bin/env node
// scripts/check/check-type-coverage.mjs
// Type-coverage ratchet (Task 6 of Fase 7).
//
// Measures the % of typed symbols across the codebase using the `type-coverage`
// tool and prints `typeCoveragePct=<N>`. This is advisory in Phase-INT (exits 0)
// — it complements the per-file explicit-any budget in check-t11-any-budget.mjs
// with a project-wide %-typed view.
//
// tsconfig used: open-sse/tsconfig.json
//   - Rationale: the only tsconfig that covers the full open-sse workspace
//     (src+open-sse together). `tsconfig.json` excludes open-sse; the
//     `tsconfig.typecheck-core.json` only lists 26 explicit files (partial).
//     open-sse/tsconfig.json sets `baseUrl: ".."` and path aliases so it
//     resolves both workspaces correctly and yields a representative global %.
//
// Direction: up (% can only improve; ratchet blocks drops once wired into INT).
//
// Run:
//   node scripts/check/check-type-coverage.mjs
//   node scripts/check/check-type-coverage.mjs --update   # ratchet baseline up
//
// Exit codes: 0 = advisory pass (current version), 1 = ratchet regression.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const TSCONFIG = path.join(ROOT, "open-sse", "tsconfig.json");

/**
 * Parse the JSON output produced by `type-coverage --json-output`.
 * Returns the coverage percentage as a number (e.g. 91.66).
 * Throws if the output cannot be parsed or has unexpected shape.
 *
 * Exported for unit-testing against synthetic output.
 */
export function parseTypeCoverageOutput(jsonText) {
  let parsed;
  try {
    parsed = JSON.parse(jsonText);
  } catch (err) {
    throw new Error(`[type-coverage] Failed to parse JSON output: ${err.message}`);
  }

  if (typeof parsed.percent !== "number") {
    throw new Error(
      `[type-coverage] Unexpected output shape — missing numeric 'percent' field. Got: ${JSON.stringify(parsed)}`
    );
  }

  return parsed.percent;
}

function runTypeCoverage() {
  const typeCoverageBin = path.join(ROOT, "node_modules", ".bin", "type-coverage");

  if (!fs.existsSync(typeCoverageBin)) {
    throw new Error(`[type-coverage] Binary not found at ${typeCoverageBin}`);
  }
  if (!fs.existsSync(TSCONFIG)) {
    throw new Error(`[type-coverage] tsconfig not found at ${TSCONFIG}`);
  }

  let stdout;
  try {
    stdout = execFileSync(typeCoverageBin, ["--json-output", "-p", TSCONFIG], {
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      cwd: ROOT,
    });
  } catch (err) {
    // type-coverage exits non-zero when --at-least check fails, but we don't use that.
    // If there is stdout, try to parse it anyway.
    stdout = err.stdout ? String(err.stdout) : "";
    if (!stdout.trim()) throw err;
  }

  return parseTypeCoverageOutput(stdout.trim());
}

function main() {
  console.log("[type-coverage] Running type-coverage (this may take ~30-60 s)…");
  console.log(`[type-coverage] tsconfig: ${path.relative(ROOT, TSCONFIG)}`);

  let pct;
  try {
    pct = runTypeCoverage();
  } catch (err) {
    console.error(`[type-coverage] FAIL — ${err.message}`);
    // Advisory: exit 0 so CI is not blocked until INT wiring.
    process.exit(0);
  }

  // Canonical output line consumed by collect-metrics.mjs and shell scripts.
  console.log(`typeCoveragePct=${pct}`);
  console.log(`[type-coverage] Advisory OK — ${pct}% symbols typed (direction: up)`);

  // Advisory: always exit 0 in this version.
  // Once wired into quality-baseline.json (INT), exit 1 on regression here.
  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main();
}
