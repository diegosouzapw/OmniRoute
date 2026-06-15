#!/usr/bin/env node
// scripts/check/check-type-coverage.mjs
// Type-coverage ratchet (Task 6 of Fase 7).
// Fase 7 INT: promovido de ADVISORY para RATCHET bloqueante.
//
// Measures the % of typed symbols across the codebase using the `type-coverage`
// tool and prints `typeCoveragePct=<N>`. Lê o baseline de quality-baseline.json
// (metrics.typeCoveragePct) e falha com exit 1 se a % CAIR além do eps.
//
// tsconfig used: open-sse/tsconfig.json
//   - Rationale: the only tsconfig that covers the full open-sse workspace
//     (src+open-sse together). `tsconfig.json` excludes open-sse; the
//     `tsconfig.typecheck-core.json` only lists 26 explicit files (partial).
//     open-sse/tsconfig.json sets `baseUrl: ".."` and path aliases so it
//     resolves both workspaces correctly and yields a representative global %.
//
// Direction: up (% can only improve; ratchet blocks drops once wired into INT).
// Eps: 0.05 (float noise tolerance — type-coverage may vary by ~0.01% between runs).
//
// Run:
//   node scripts/check/check-type-coverage.mjs
//   node scripts/check/check-type-coverage.mjs --update   # ratchet baseline up

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const TSCONFIG = path.join(ROOT, "open-sse", "tsconfig.json");
const UPDATE = process.argv.includes("--update");

const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "quality-baseline.json")
);

// Small epsilon to absorb float noise between runs (type-coverage can vary ~0.01%).
const DEFAULT_EPS = 0.05;

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

/**
 * Avalia a % de type-coverage atual contra o baseline.
 * Direction: up (% só pode SUBIR; queda além de eps é regressão).
 *
 * Exported for unit testing.
 *
 * @param {number} current
 * @param {number} baseline
 * @param {number} [eps=0] - tolerance for float noise
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateTypeCoverage(current, baseline, eps = 0) {
  const regressed = current < baseline - eps;
  const improved = current > baseline + eps;
  return { regressed, improved };
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
  if (!fs.existsSync(BASELINE_PATH)) {
    process.stderr.write(`[type-coverage] FAIL — ${path.basename(BASELINE_PATH)} ausente.\n`);
    process.exit(2);
  }

  const baselineJson = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  const baselineMetric = baselineJson.metrics && baselineJson.metrics.typeCoveragePct;
  if (!baselineMetric || typeof baselineMetric.value !== "number") {
    process.stderr.write(
      "[type-coverage] FAIL — metrics.typeCoveragePct ausente em quality-baseline.json.\n"
    );
    process.exit(2);
  }
  const baselineValue = baselineMetric.value;
  const eps = typeof baselineMetric.eps === "number" ? baselineMetric.eps : DEFAULT_EPS;

  console.log("[type-coverage] Running type-coverage (this may take ~30-60 s)…");
  console.log(`[type-coverage] tsconfig: ${path.relative(ROOT, TSCONFIG)}`);

  let pct;
  try {
    pct = runTypeCoverage();
  } catch (err) {
    process.stderr.write(`[type-coverage] FAIL — ${err.message}\n`);
    process.exit(2);
  }

  // Canonical output line consumed by collect-metrics.mjs and shell scripts.
  console.log(`typeCoveragePct=${pct}`);

  const { regressed, improved } = evaluateTypeCoverage(pct, baselineValue, eps);

  if (UPDATE && improved) {
    baselineJson.metrics.typeCoveragePct.value = pct;
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baselineJson, null, 2) + "\n");
    console.log(`[type-coverage] baseline ratcheado: ${pct} (era ${baselineValue})`);
  }

  if (regressed) {
    process.stderr.write(
      `[type-coverage] REGRESSÃO — ${pct}% < baseline ${baselineValue}% (eps=${eps})\n` +
        `  → Adicione anotações de tipo ou rode\n` +
        `    'node scripts/check/check-type-coverage.mjs --update' se a % subiu legitimamente.\n`
    );
    process.exit(1);
  }

  console.log(
    `[type-coverage] OK — ${pct}% symbols typed (baseline ${baselineValue}%, eps=${eps})`
  );
  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main();
}
