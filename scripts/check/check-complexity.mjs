#!/usr/bin/env node
// scripts/check/check-complexity.mjs
// Catraca de complexidade de código. Roda o ESLint sobre src+open-sse usando um config
// flat STANDALONE (eslint.complexity.config.mjs) que liga APENAS duas regras CORE do
// ESLint — `complexity` (ciclomática) e `max-lines-per-function` (tamanho de função) —
// e compara a contagem total de violações contra um baseline congelado
// (complexity-baseline.json). Falha se a contagem SUBIR. Completa a dimensão
// "complexity" do snapshot de qualidade, ao lado de duplicação/tamanho-de-arquivo.
//
// O config dedicado evita poluir a contagem de warnings do lint principal (ratcheada
// em exatamente 3482): este gate roda isolado, com seu próprio par de regras. --update
// ratcheta (a contagem só pode CAIR).
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "complexity-baseline.json")
);
const UPDATE = process.argv.includes("--update");
const CONFIG_PATH = path.join(ROOT, "eslint.complexity.config.mjs");
const ESLINT_ARGS = [
  "eslint",
  "--no-config-lookup",
  "--config",
  CONFIG_PATH,
  "--format",
  "json",
  "src",
  "open-sse",
];

/** Avalia a contagem atual de violações contra o baseline. */
export function evaluateComplexity(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

function measureComplexityCount() {
  let stdout;
  try {
    stdout = execFileSync("npx", ["--yes", ...ESLINT_ARGS], {
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
    });
  } catch (err) {
    // ESLint sai com código !=0 quando há erros (e nossas regras são "error"); o relatório
    // JSON ainda vai no stdout. Só relançamos se não houver stdout parseável.
    stdout = err.stdout ? String(err.stdout) : "";
    if (!stdout.trim()) throw err;
  }
  const report = JSON.parse(stdout);
  return report.reduce((sum, file) => sum + file.errorCount, 0);
}

function main() {
  if (!fs.existsSync(BASELINE_PATH)) {
    console.error(`[complexity] FAIL — ${path.basename(BASELINE_PATH)} ausente.`);
    process.exit(2);
  }
  const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  const current = measureComplexityCount();
  const { regressed, improved } = evaluateComplexity(current, baseline.count);

  if (UPDATE && improved) {
    console.log(`[complexity] baseline ratcheado: ${current} (era ${baseline.count})`);
    baseline.count = current;
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + "\n");
  }
  if (regressed) {
    console.error(
      `[complexity] REGRESSÃO — ${current} violações > baseline ${baseline.count}\n` +
        `  → quebre a função em helpers menores (reduza ramos/tamanho) ou rode\n` +
        `    'node scripts/check/check-complexity.mjs --update' se a contagem caiu legitimamente.`
    );
    process.exit(1);
  }
  console.log(`[complexity] OK — ${current} violações (baseline ${baseline.count})`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
