#!/usr/bin/env node
// scripts/check/check-cognitive-complexity.mjs
// Ratchet bloqueante para complexidade cognitiva (sonarjs/cognitive-complexity).
// Fase 7 INT: promovido de ADVISORY para RATCHET.
//
// Roda o ESLint sobre src+open-sse usando um config flat STANDALONE
// (eslint.sonarjs.config.mjs) que liga APENAS `sonarjs/cognitive-complexity` —
// mantendo a contagem ISOLADA do orçamento de warnings do lint principal.
//
// Lê o baseline de quality-baseline.json (metrics.cognitiveComplexity).
// Falha com exit 1 se a contagem SUBIR. Suporta --update.
//
// Saída canônica: cognitiveComplexity=N  (parseable por collect-metrics.mjs)
//
// Uso:
//   node scripts/check/check-cognitive-complexity.mjs
//   node scripts/check/check-cognitive-complexity.mjs --quiet   # só a linha canônica
//   node scripts/check/check-cognitive-complexity.mjs --update  # ratcheta baseline se melhorou
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const UPDATE = process.argv.includes("--update");
const CONFIG_PATH = path.join(ROOT, "eslint.sonarjs.config.mjs");

const ESLINT_BIN = path.join(ROOT, "node_modules", ".bin", "eslint");

const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "config/quality/quality-baseline.json")
);

const ESLINT_ARGS = [
  "--no-config-lookup",
  "--config",
  CONFIG_PATH,
  "--format",
  "json",
  "src",
  "open-sse",
];

/**
 * Parses the ESLint JSON output (array of file results) and counts total
 * `sonarjs/cognitive-complexity` violations.
 *
 * Exported so unit tests can call it directly with synthetic data.
 *
 * @param {Array<{messages: Array<{ruleId: string}>}>} report
 * @returns {number}
 */
export function countCognitiveViolations(report) {
  let count = 0;
  for (const file of report) {
    for (const msg of file.messages) {
      if (msg.ruleId === "sonarjs/cognitive-complexity") {
        count++;
      }
    }
  }
  return count;
}

/**
 * Avalia a contagem atual de violações cognitivas contra o baseline.
 * Direction: down (contagem só pode CAIR).
 *
 * Exported for unit testing.
 *
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

function runEslint() {
  let stdout;
  try {
    stdout = execFileSync(ESLINT_BIN, ESLINT_ARGS, {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (err) {
    // ESLint exits non-zero when there are lint errors; the JSON report is still
    // in stdout. Re-throw only if there is no parseable output.
    stdout = err.stdout ? String(err.stdout) : "";
    if (!stdout.trim()) throw err;
  }
  return JSON.parse(stdout);
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

  const report = runEslint();
  const count = countCognitiveViolations(report);

  // Canonical machine-readable output consumed by collect-metrics.mjs and shell scripts.
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
