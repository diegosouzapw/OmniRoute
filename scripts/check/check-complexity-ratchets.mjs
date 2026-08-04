#!/usr/bin/env node
/**
 * One ESLint walk → both complexity ratchets.
 *
 * Existence reasons (unchanged):
 * - cyclomatic + max-lines vs complexity-baseline.json
 * - cognitive-complexity vs quality-baseline metrics.cognitiveComplexity
 *
 * CI should call this instead of sequential check:complexity + check:cognitive
 * so PR→release / quality-gate pay for one tree walk, not two.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { evaluateComplexity } from "./check-complexity.mjs";
import { evaluateCognitiveComplexity } from "./check-cognitive-complexity.mjs";
import {
  countCognitiveViolations,
  countComplexityViolations,
  getComplexityEslintReport,
} from "./complexityEslintReport.mjs";

const ROOT = process.cwd();
const UPDATE = process.argv.includes("--update");

const COMPLEXITY_BASELINE = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "config/quality/complexity-baseline.json")
);
const QUALITY_BASELINE = path.join(ROOT, "config/quality/quality-baseline.json");

function main() {
  if (!fs.existsSync(COMPLEXITY_BASELINE)) {
    console.error(`[complexity-ratchets] FAIL — complexity-baseline.json ausente.`);
    process.exit(2);
  }
  if (!fs.existsSync(QUALITY_BASELINE)) {
    console.error(`[complexity-ratchets] FAIL — quality-baseline.json ausente.`);
    process.exit(2);
  }

  const report = getComplexityEslintReport();
  const complexityCount = countComplexityViolations(report);
  const cognitiveCount = countCognitiveViolations(report);

  // Machine-readable lines for collect-metrics / scripts
  console.log(`complexity=${complexityCount}`);
  console.log(`cognitiveComplexity=${cognitiveCount}`);

  const complexityBaseline = JSON.parse(fs.readFileSync(COMPLEXITY_BASELINE, "utf8"));
  const qualityBaseline = JSON.parse(fs.readFileSync(QUALITY_BASELINE, "utf8"));
  const cognitiveMetric = qualityBaseline.metrics?.cognitiveComplexity;
  if (!cognitiveMetric || typeof cognitiveMetric.value !== "number") {
    console.error(
      "[complexity-ratchets] FAIL — metrics.cognitiveComplexity ausente em quality-baseline.json."
    );
    process.exit(2);
  }

  const cyc = evaluateComplexity(complexityCount, complexityBaseline.count);
  const cog = evaluateCognitiveComplexity(cognitiveCount, cognitiveMetric.value);

  if (UPDATE && cyc.improved) {
    console.log(
      `[complexity] baseline ratcheado: ${complexityCount} (era ${complexityBaseline.count})`
    );
    complexityBaseline.count = complexityCount;
    fs.writeFileSync(COMPLEXITY_BASELINE, JSON.stringify(complexityBaseline, null, 2) + "\n");
  }
  if (UPDATE && cog.improved) {
    console.log(
      `[cognitive-complexity] baseline ratcheado: ${cognitiveCount} (era ${cognitiveMetric.value})`
    );
    qualityBaseline.metrics.cognitiveComplexity.value = cognitiveCount;
    fs.writeFileSync(QUALITY_BASELINE, JSON.stringify(qualityBaseline, null, 2) + "\n");
  }

  let failed = false;
  if (cyc.regressed) {
    console.error(
      `[complexity] REGRESSÃO — ${complexityCount} violações > baseline ${complexityBaseline.count}`
    );
    failed = true;
  } else {
    console.log(
      `[complexity] OK — ${complexityCount} violações (baseline ${complexityBaseline.count})`
    );
  }

  if (cog.regressed) {
    console.error(
      `[cognitive-complexity] REGRESSÃO — ${cognitiveCount} violações > baseline ${cognitiveMetric.value}`
    );
    failed = true;
  } else {
    console.log(
      `[cognitive-complexity] OK — ${cognitiveCount} violações (baseline ${cognitiveMetric.value})`
    );
  }

  process.exit(failed ? 1 : 0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
