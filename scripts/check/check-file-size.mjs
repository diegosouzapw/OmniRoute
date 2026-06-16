#!/usr/bin/env node
// scripts/check/check-file-size.mjs
// Catraca de tamanho de arquivo (mata o god-component). Modelado no
// check-t11-any-budget.mjs: um baseline congelado por arquivo (file-size-baseline.json).
//  - arquivo congelado: só pode ENCOLHER (nunca crescer);
//  - arquivo NOVO (fora do baseline): não pode passar do CAP.
// Assim o próximo arquivo de 12.760 linhas é impossível, e os 91 atuais só melhoram.
// --update ratcheta o baseline para baixo (encolhimentos + remove quem caiu < cap).
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
function getArg(name, fallback) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const BASELINE_PATH = path.resolve(
  getArg("--baseline", path.join(ROOT, "config/quality/file-size-baseline.json"))
);
const UPDATE = process.argv.includes("--update");
const SCAN_DIRS = ["src", "open-sse", "electron", "bin"];
// Directories to skip when walking — build artifacts and installed packages.
const SKIP_DIRS = new Set(["node_modules", "dist-electron", ".next", ".build", "dist", "coverage"]);

/**
 * Avalia LOC atuais contra o baseline congelado.
 * @returns {{violations: string[], improvements: [string, number][]}}
 */
export function evaluateFileSizes(currentLocByFile, frozen, cap) {
  const violations = [];
  const improvements = [];
  for (const [file, loc] of Object.entries(currentLocByFile)) {
    if (file in frozen) {
      if (loc > frozen[file])
        violations.push(`${file}: ${loc} > congelado ${frozen[file]} (não pode crescer)`);
      else if (loc < frozen[file]) improvements.push([file, loc]);
    } else if (loc > cap) {
      violations.push(`${file}: ${loc} > cap ${cap} (arquivo novo acima do limite)`);
    }
  }
  return { violations, improvements };
}

function countLines(file) {
  return fs.readFileSync(file, "utf8").split("\n").length;
}

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(p, acc);
    } else if (
      /\.(ts|tsx)$/.test(e.name) &&
      !/\.test\.tsx?$/.test(e.name) &&
      !/\.d\.ts$/.test(e.name)
    ) {
      acc.push(p);
    }
  }
  return acc;
}

function collectLoc() {
  const out = {};
  for (const d of SCAN_DIRS)
    for (const f of walk(path.join(ROOT, d)))
      out[path.relative(ROOT, f).replace(/\\/g, "/")] = countLines(f);
  return out;
}

function main() {
  if (!fs.existsSync(BASELINE_PATH)) {
    console.error(`[file-size] FAIL — ${path.basename(BASELINE_PATH)} ausente.`);
    process.exit(2);
  }
  const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
  const cap = baseline.cap;
  const frozen = baseline.frozen || {};
  const current = collectLoc();
  const { violations, improvements } = evaluateFileSizes(current, frozen, cap);

  if (UPDATE && violations.length === 0 && improvements.length) {
    for (const [file, loc] of improvements) {
      if (loc <= cap)
        delete frozen[file]; // caiu para dentro do cap → sai do baseline
      else frozen[file] = loc; // continua grande mas encolheu → trava no novo valor
    }
    baseline.frozen = Object.fromEntries(Object.entries(frozen).sort());
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + "\n");
    console.log(`[file-size] baseline ratcheado: ${improvements.length} arquivo(s) encolheram`);
  }

  if (violations.length) {
    console.error(
      `[file-size] ${violations.length} violação(ões):\n` +
        violations.map((v) => "  ✗ " + v).join("\n") +
        `\n  → modularize/extraia (DRY) para encolher, ou (último caso) ajuste file-size-baseline.json com justificativa.`
    );
    process.exit(1);
  }
  console.log(
    `[file-size] OK — ${Object.keys(frozen).length} arquivos congelados, cap ${cap} para novos (${Object.keys(current).length} arquivos verificados)`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
