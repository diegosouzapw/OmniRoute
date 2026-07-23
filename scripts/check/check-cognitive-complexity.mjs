#!/usr/bin/env node
// scripts/check/check-cognitive-complexity.mjs
// Ratchet bloqueante para complexidade cognitiva (sonarjs/cognitive-complexity).
// Shares ESLint walk with check-complexity via complexityEslintReport.mjs.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  countCognitiveViolations,
  getComplexityEslintReport,
} from "./complexityEslintReport.mjs";

// Re-export for existing unit tests.
export { countCognitiveViolations };

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const UPDATE = process.argv.includes("--update");

const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "config/quality/quality-baseline.json")
);

/**
 * Avalia a contagem atual de violações cognitivas contra o baseline.
 * @param {number} current
 * @param {number} baseline
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateCognitiveComplexity(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

function main() {
  if (!fs.existsSync(BASELINE_PATH)) {
    process.stderr.write(
      `[cognitive-complexity] FAIL — ${path.basename(BASELINE_PATH)} ausente.\n`
    );
    process.exit(2);
  }

  const baselineJson = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  const baselineMetric = baselineJson.metrics && baselineJson.metrics.cognitiveComplexity;
  if (!baselineMetric || typeof baselineMetric.value !== "number") {
    process.stderr.write(
      "[cognitive-complexity] FAIL — metrics.cognitiveComplexity ausente em quality-baseline.json.\n"
    );
    process.exit(2);
  }
  const baselineValue = baselineMetric.value;

  const report = getComplexityEslintReport();
  const count = countCognitiveViolations(report);

  console.log(`cognitiveComplexity=${count}`);

  if (!QUIET) {
    console.log(
      `[cognitive-complexity] ${count} function(s) exceed the cognitive-complexity threshold (15).`
    );
  }

  const { regressed, improved } = evaluateCognitiveComplexity(count, baselineValue);

  if (UPDATE && improved) {
    baselineJson.metrics.cognitiveComplexity.value = count;
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baselineJson, null, 2) + "\n");
    console.log(`[cognitive-complexity] baseline ratcheado: ${count} (era ${baselineValue})`);
  }

  if (regressed) {
    process.stderr.write(
      `[cognitive-complexity] REGRESSÃO — ${count} violações > baseline ${baselineValue}\n` +
        `  → Quebre as funções complexas em helpers menores, ou rode\n` +
        `    'node scripts/check/check-cognitive-complexity.mjs --update' se a contagem caiu legitimamente.\n`
    );
    process.exit(1);
  }

  if (!QUIET) {
    console.log(`[cognitive-complexity] OK — ${count} violações (baseline ${baselineValue})`);
  }

  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
