#!/usr/bin/env node
// scripts/quality/check-quality-ratchet.mjs
// Catraca genérica multi-métrica. Clona o espírito de check-t11-any-budget.mjs:
// um baseline congelado por métrica; falha em qualquer regressão; só anda num sentido.
import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
function getArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const BASELINE = path.resolve(getArg("--baseline", path.join(cwd, "quality-baseline.json")));
const METRICS = path.resolve(getArg("--metrics", path.join(cwd, "quality-metrics.json")));
const SUMMARY = getArg("--summary", null);
const UPDATE = process.argv.includes("--update");
// --allow-missing: pula métricas do baseline ausentes do metrics (em vez de falhar).
// Uso local: cobertura só existe no CI; localmente quality:gate roda com este flag.
// No CI o job quality-gate roda SEM o flag (estrito — baixa o coverage mergeado antes).
const ALLOW_MISSING = process.argv.includes("--allow-missing");
const EPS = 0.01;

function load(p) {
  if (!fs.existsSync(p)) {
    console.error(`[quality-ratchet] arquivo ausente: ${p}`);
    process.exit(2);
  }
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const baseline = load(BASELINE);
const metrics = load(METRICS);
const failures = [];
const improvements = [];
const rows = [];

for (const [key, spec] of Object.entries(baseline.metrics)) {
  const current = metrics[key];
  const base = spec.value;
  const dir = spec.direction; // "down" = menor-é-melhor | "up" = maior-é-melhor
  if (current === undefined) {
    if (ALLOW_MISSING) {
      rows.push([key, base, "—", "SKIP (ausente)"]);
    } else {
      failures.push(`métrica "${key}" ausente em ${path.basename(METRICS)}`);
      rows.push([key, base, "—", "MISSING"]);
    }
    continue;
  }
  let status = "ok";
  if (dir === "down") {
    if (current > base + EPS) {
      failures.push(`${key}: ${current} > baseline ${base} (não pode aumentar)`);
      status = "REGRESSÃO";
    } else if (current < base - EPS) {
      improvements.push([key, current]);
      status = "↑ melhorou";
    }
  } else {
    if (current < base - EPS) {
      failures.push(`${key}: ${current} < baseline ${base} (não pode cair)`);
      status = "REGRESSÃO";
    } else if (current > base + EPS) {
      improvements.push([key, current]);
      status = "↑ melhorou";
    }
  }
  rows.push([key, base, current, status]);
}

if (SUMMARY) {
  const md = [
    "# Quality Ratchet",
    "",
    "| Métrica | Baseline | Atual | Status |",
    "|---|---|---|---|",
    ...rows.map(([k, b, c, s]) => `| ${k} | ${b} | ${c} | ${s} |`),
    "",
    failures.length
      ? `**${failures.length} regressão(ões) — gate BLOQUEADO.**`
      : "**Sem regressões — gate OK.**",
  ].join("\n");
  fs.mkdirSync(path.dirname(SUMMARY), { recursive: true });
  fs.writeFileSync(SUMMARY, md + "\n");
}

if (UPDATE && failures.length === 0 && improvements.length) {
  for (const [key, val] of improvements) baseline.metrics[key].value = val;
  fs.writeFileSync(BASELINE, JSON.stringify(baseline, null, 2) + "\n");
  console.log(`[quality-ratchet] baseline ratcheado: ${improvements.length} métrica(s) melhoraram`);
}

if (failures.length) {
  console.error("[quality-ratchet] FALHOU:\n" + failures.map((f) => "  ✗ " + f).join("\n"));
  process.exit(1);
}
console.log(`[quality-ratchet] OK (${rows.length} métricas, ${improvements.length} melhoraram)`);
