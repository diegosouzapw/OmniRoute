#!/usr/bin/env node
// scripts/check/check-duplication.mjs
// Catraca de duplicação de código. Roda jscpd@4 (PINADO — o v5 é um rewrite Rust com
// CLI/JSON incompatíveis) sobre src+open-sse e compara a % atual contra um baseline
// congelado (duplication-baseline.json). Falha se a duplicação SUBIR. Ataca a assinatura
// nº1 de slop de IA (GitClear 2026: duplicação 4-8x na era IA) — no nosso caso, o
// copy-paste dos executors (48/50 sobrescrevem execute() inteiro). --update ratcheta.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const BASELINE_PATH = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "duplication-baseline.json")
);
const UPDATE = process.argv.includes("--update");
const EPS = 0.05; // tolerância de ruído de float (jscpd é determinístico; isto é margem)
// Use local binary (pinned in package.json devDependencies — no registry download at CI time)
const JSCPD_BIN = path.join(ROOT, "node_modules", ".bin", "jscpd");
const JSCPD_FIXED_ARGS = ["src", "open-sse", "--reporters", "json", "--silent", "--min-tokens", "50", "--ignore", "**/*.test.ts,**/*.test.tsx,**/__tests__/**"];

/** Avalia a % atual contra o baseline. */
export function evaluateDuplication(current, baseline, eps = EPS) {
  return {
    regressed: current > baseline + eps,
    improved: current < baseline - eps,
  };
}

function measureDuplicationPct() {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), "jscpd-"));
  execFileSync(JSCPD_BIN, [...JSCPD_FIXED_ARGS, "--output", out], { stdio: "ignore" });
  const report = JSON.parse(fs.readFileSync(path.join(out, "jscpd-report.json"), "utf8"));
  return report.statistics.total.percentage;
}

function main() {
  if (!fs.existsSync(BASELINE_PATH)) {
    console.error(`[duplication] FAIL — ${path.basename(BASELINE_PATH)} ausente.`);
    process.exit(2);
  }
  const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  const current = measureDuplicationPct();
  const { regressed, improved } = evaluateDuplication(current, baseline.percentage, EPS);

  if (UPDATE && improved) {
    baseline.percentage = current;
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + "\n");
    console.log(`[duplication] baseline ratcheado: ${current}% (era ${baseline.percentage}%)`);
  }
  if (regressed) {
    console.error(
      `[duplication] REGRESSÃO — ${current}% > baseline ${baseline.percentage}% (+${EPS} tolerância)\n` +
        `  → extraia o trecho duplicado (helper compartilhado) ou ajuste duplication-baseline.json com justificativa.`
    );
    process.exit(1);
  }
  console.log(`[duplication] OK — ${current}% (baseline ${baseline.percentage}%)`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
