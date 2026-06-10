#!/usr/bin/env node
// scripts/quality/collect-metrics.mjs — emite quality-metrics.json
// Coletores incrementais: Fase 1 traz ESLint warnings + cobertura.
// Fases 3/4 estendem com duplicação (jscpd), tamanho de arquivo e cobertura por módulo.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const cwd = process.cwd();
const out = {};

// 1) ESLint: contagem de warnings (errors devem ser 0; o lint já gata isso)
function eslintCounts() {
  let stdout;
  try {
    stdout = execFileSync("npx", ["eslint", ".", "--format", "json"], {
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
    });
  } catch (e) {
    // eslint sai com código != 0 quando há errors; o JSON ainda vem no stdout
    stdout = e.stdout?.toString() || "[]";
  }
  const results = JSON.parse(stdout);
  out.eslintWarnings = results.reduce((n, r) => n + (r.warningCount || 0), 0);
  out.eslintErrors = results.reduce((n, r) => n + (r.errorCount || 0), 0);
}

// 2) Cobertura: lê coverage/coverage-summary.json se existir (gerado por c8)
function coverage() {
  const p = path.join(cwd, "coverage", "coverage-summary.json");
  if (!fs.existsSync(p)) return;
  const t = JSON.parse(fs.readFileSync(p, "utf8")).total;
  out["coverage.statements"] = t.statements.pct;
  out["coverage.lines"] = t.lines.pct;
  out["coverage.functions"] = t.functions.pct;
  out["coverage.branches"] = t.branches.pct;
}

eslintCounts();
coverage();
fs.writeFileSync(path.join(cwd, "quality-metrics.json"), JSON.stringify(out, null, 2) + "\n");
console.log("[collect-metrics]", JSON.stringify(out));
