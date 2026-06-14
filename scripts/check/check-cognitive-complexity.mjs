#!/usr/bin/env node
// scripts/check/check-cognitive-complexity.mjs
// Advisory gate para complexidade cognitiva (sonarjs/cognitive-complexity).
//
// Roda o ESLint sobre src+open-sse usando um config flat STANDALONE
// (eslint.sonarjs.config.mjs) que liga APENAS `sonarjs/cognitive-complexity` —
// mantendo a contagem ISOLADA do orçamento de warnings do lint principal (3653).
//
// Modo advisory: sai com código 0 independente da contagem. Imprime o valor
// para anotação do baseline conceitual. O ratchet INT virá quando o baseline
// for congelado em quality-baseline.json.
//
// Saída canônica: cognitiveComplexity=N  (parseable por collect-metrics.mjs)
//
// Uso:
//   node scripts/check/check-cognitive-complexity.mjs
//   node scripts/check/check-cognitive-complexity.mjs --quiet   # só a linha canônica
import { execFileSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const CONFIG_PATH = path.join(ROOT, "eslint.sonarjs.config.mjs");

const ESLINT_BIN = path.join(ROOT, "node_modules", ".bin", "eslint");

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
  const report = runEslint();
  const count = countCognitiveViolations(report);

  if (!QUIET) {
    console.log(
      `[cognitive-complexity] advisory — ${count} function(s) exceed the cognitive-complexity threshold (15).`
    );
    console.log(
      `[cognitive-complexity] Annotate this value as the baseline in quality-baseline.json when the INT ratchet is wired.`
    );
  }

  // Canonical machine-readable output consumed by collect-metrics.mjs
  console.log(`cognitiveComplexity=${count}`);

  // Advisory: always exit 0
  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
