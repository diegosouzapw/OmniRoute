#!/usr/bin/env node
// scripts/quality/check-quality-ratchet.mjs
// Catraca genérica multi-métrica. Clona o espírito de check-t11-any-budget.mjs:
// um baseline congelado por métrica; falha em qualquer regressão; só anda num sentido.
//
// v2 (6A.5): --require-tighten, eps por métrica, warning de métricas órfãs.
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
// --require-tighten: falha quando uma métrica melhorou além de tightenSlack sem que o
// baseline tenha sido apertado. Garante que melhorias permanentes sejam capturadas.
// Sem esta flag, melhorias são apenas registradas (comportamento v1 — retrocompat).
const REQUIRE_TIGHTEN = process.argv.includes("--require-tighten");

// Global fallback eps. Cada métrica pode sobrepor via `eps` no baseline.
const GLOBAL_EPS = 0.01;

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
const tightenFailures = [];
const improvements = [];
const rows = [];

for (const [key, spec] of Object.entries(baseline.metrics)) {
  const current = metrics[key];
  const base = spec.value;
  const dir = spec.direction; // "down" = menor-é-melhor | "up" = maior-é-melhor

  // Per-metric eps; falls back to global EPS if not specified in the spec.
  const eps = spec.eps !== undefined ? spec.eps : GLOBAL_EPS;

  // Per-metric tightenSlack; falls back to eps (same tolerance as regression check).
  const tightenSlack = spec.tightenSlack !== undefined ? spec.tightenSlack : eps;

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
    if (current > base + eps) {
      failures.push(`${key}: ${current} > baseline ${base} (não pode aumentar)`);
      status = "REGRESSÃO";
    } else if (current < base - eps) {
      improvements.push([key, current]);
      status = "↑ melhorou";
      if (REQUIRE_TIGHTEN && base - current > tightenSlack) {
        tightenFailures.push(
          `${key}: melhorou de ${base} para ${current} (delta ${(base - current).toFixed(4)} > slack ${tightenSlack}) — rode 'npm run quality:ratchet -- --update' e commite o baseline apertado neste PR`,
        );
      }
    }
  } else {
    if (current < base - eps) {
      failures.push(`${key}: ${current} < baseline ${base} (não pode cair)`);
      status = "REGRESSÃO";
    } else if (current > base + eps) {
      improvements.push([key, current]);
      status = "↑ melhorou";
      if (REQUIRE_TIGHTEN && current - base > tightenSlack) {
        tightenFailures.push(
          `${key}: melhorou de ${base} para ${current} (delta ${(current - base).toFixed(4)} > slack ${tightenSlack}) — rode 'npm run quality:ratchet -- --update' e commite o baseline apertado neste PR`,
        );
      }
    }
  }
  rows.push([key, base, current, status]);
}

// Behavior 3: warn about orphan metrics (present in collected metrics but absent in baseline).
const baselineKeys = new Set(Object.keys(baseline.metrics));
const orphans = Object.keys(metrics).filter((k) => !baselineKeys.has(k));
if (orphans.length > 0) {
  console.warn(
    `[quality-ratchet] WARN: ${orphans.length} métrica(s) órfã(s) — presente(s) em ${path.basename(METRICS)} mas sem entrada no baseline: ${orphans.join(", ")}`,
  );
  console.warn(
    `[quality-ratchet] WARN: adicione ${orphans.length === 1 ? "essa métrica" : "essas métricas"} ao baseline (com value/direction) para que sejam catraceadas.`,
  );
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

// Tighten check runs only when there are no regressions (regressions take priority).
// With --update, improvements are captured into the baseline, so tighten check
// is bypassed (the update itself is the required action).
if (UPDATE && failures.length === 0 && improvements.length) {
  for (const [key, val] of improvements) baseline.metrics[key].value = val;
  fs.writeFileSync(BASELINE, JSON.stringify(baseline, null, 2) + "\n");
  console.log(`[quality-ratchet] baseline ratcheado: ${improvements.length} métrica(s) melhoraram`);
}

if (failures.length) {
  console.error("[quality-ratchet] FALHOU:\n" + failures.map((f) => "  ✗ " + f).join("\n"));
  process.exit(1);
}

// Behavior 1: --require-tighten gate (only triggers when there are no regressions and no --update).
if (REQUIRE_TIGHTEN && !UPDATE && tightenFailures.length > 0) {
  console.error(
    "[quality-ratchet] FALHOU (--require-tighten): métrica(s) melhoraram mas o baseline não foi apertado:\n" +
      tightenFailures.map((f) => "  ✗ " + f).join("\n"),
  );
  process.exit(1);
}

console.log(`[quality-ratchet] OK (${rows.length} métricas, ${improvements.length} melhoraram)`);
