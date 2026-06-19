#!/usr/bin/env node
// scripts/check/check-mutation-ratchet.mjs
// Catraca de mutationScore (Quality Gate v2 / Fase 9 T5 — Onda 2, Task 3).
//
// Mirrors check-bundle-size.mjs: ADVISORY by default (always exit 0), BLOCKING only
// with --ratchet — and even then exits 1 SE — E SOMENTE SE — um módulo medido REGREDIU
// vs o baseline (direction: UP, o score só pode subir). Skip gracioso (exit 0) quando
// não há mutation.json (ex.: o nightly não rodou) ou não há baseline para o módulo —
// falta de dados NUNCA bloqueia, só uma regressão medida bloqueia.
//
// Score por módulo = COVERED score = detected / (detected + survived), onde
// detected = Killed + Timeout. NoCoverage é EXCLUÍDO do denominador (é uma lacuna de
// cobertura, não um sinal de qualidade-de-teste) — mesmo denominador que a radiografia
// (scripts/quality/mutation-radiography.mjs).
//
// O nightly divide o `mutate` em batches paralelos (um reports/mutation/mutation.json
// por job). Este script roda DENTRO de cada job sobre o report daquele batch e compara
// só os módulos presentes nele. Aceita vários paths para uso local/agregado.
//
// Uso:
//   node scripts/check/check-mutation-ratchet.mjs                 (advisory; report default)
//   node scripts/check/check-mutation-ratchet.mjs reports/mutation/mutation.json
//   node scripts/check/check-mutation-ratchet.mjs <a.json> <b.json> ... --ratchet
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = process.cwd();
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");
const DEFAULT_REPORT = path.join(ROOT, "reports/mutation/mutation.json");
const BASELINE_PREFIX = "mutationScore.";
const RATCHET = process.argv.includes("--ratchet");

const DETECTED = new Set(["Killed", "Timeout"]);
const SURVIVED = new Set(["Survived"]);

/**
 * Avalia o score MEDIDO de um módulo contra o baseline. Direction: UP (o score só
 * pode subir — menor = regressão).
 * @param {number} current
 * @param {number} baseline
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateMutationRatchet(current, baseline) {
  return {
    regressed: current < baseline,
    improved: current > baseline,
  };
}

/**
 * Covered mutation score de um arquivo: detected/(detected+survived)*100.
 * NoCoverage/Ignored/RuntimeError/CompileError ficam fora do denominador.
 * @param {{mutants?: Array<{status: string}>}} fileData
 * @returns {number|null} score em %, ou null se não houver mutantes cobertos
 */
export function mutationScoreForFile(fileData) {
  let detected = 0;
  let survived = 0;
  for (const m of fileData?.mutants || []) {
    if (DETECTED.has(m.status)) detected += 1;
    else if (SURVIVED.has(m.status)) survived += 1;
  }
  const denom = detected + survived;
  return denom === 0 ? null : (detected / denom) * 100;
}

/**
 * Score por arquivo a partir de um ou mais reports (batches). Arquivos sem mutante
 * coberto (score null) são omitidos.
 * @param {object|object[]} reportOrReports parsed mutation.json (ou array)
 * @returns {Record<string, number>}
 */
export function measureMutationScores(reportOrReports) {
  const reports = Array.isArray(reportOrReports) ? reportOrReports : [reportOrReports];
  const out = {};
  for (const report of reports) {
    for (const [file, data] of Object.entries(report?.files || {})) {
      const score = mutationScoreForFile(data);
      if (score !== null) out[file] = score;
    }
  }
  return out;
}

/**
 * Lê metrics["mutationScore.<path>"].value do quality-baseline.json.
 * Retorna {} se o arquivo ou as chaves estiverem ausentes (sem baseline não há
 * ratchet possível — o caller trata como SKIP gracioso, exit 0).
 * @param {string} baselinePath
 * @returns {Record<string, number>}
 */
export function readBaselineMutationScores(baselinePath = BASELINE_PATH) {
  if (!fs.existsSync(baselinePath)) return {};
  let baselineJson;
  try {
    baselineJson = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  } catch {
    return {};
  }
  const metrics = baselineJson?.metrics || {};
  const out = {};
  for (const [key, val] of Object.entries(metrics)) {
    if (key.startsWith(BASELINE_PREFIX) && val && typeof val.value === "number") {
      out[key.slice(BASELINE_PREFIX.length)] = val.value;
    }
  }
  return out;
}

function loadReport(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function main(argv) {
  const paths = argv.slice(2).filter((a) => !a.startsWith("--"));
  const reportPaths = paths.length > 0 ? paths : [DEFAULT_REPORT];
  const existing = reportPaths.filter((p) => fs.existsSync(p));
  if (existing.length === 0) {
    process.stdout.write("mutationScore=SKIP reason=no-report\n");
    process.exit(0);
  }

  const measured = measureMutationScores(existing.map(loadReport));
  const baseline = readBaselineMutationScores();

  const regressions = [];
  const modules = Object.keys(measured).sort();
  for (const mod of modules) {
    const current = measured[mod];
    if (!(mod in baseline)) {
      process.stdout.write(`mutationScore.${mod}=${current.toFixed(2)} (no baseline — advisory)\n`);
      continue;
    }
    const { regressed } = evaluateMutationRatchet(current, baseline[mod]);
    const tag = regressed ? "REGRESSED" : "ok";
    process.stdout.write(
      `mutationScore.${mod}=${current.toFixed(2)} baseline=${baseline[mod].toFixed(2)} ${tag}\n`
    );
    if (regressed) regressions.push({ mod, current, baseline: baseline[mod] });
  }

  if (regressions.length > 0 && RATCHET) {
    process.stderr.write(
      `\nMutation ratchet FAILED — ${regressions.length} module(s) dropped below baseline:\n`
    );
    for (const r of regressions) {
      process.stderr.write(`  ${r.mod}: ${r.current.toFixed(2)} < ${r.baseline.toFixed(2)}\n`);
    }
    process.exit(1);
  }
  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv);
}
