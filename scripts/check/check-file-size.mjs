#!/usr/bin/env node
// scripts/check/check-file-size.mjs
// Catraca de tamanho de arquivo (mata o god-component). Modelado no
// check-t11-any-budget.mjs: um baseline congelado por arquivo (file-size-baseline.json).
//  - arquivo congelado: só pode ENCOLHER (nunca crescer);
//  - arquivo NOVO (fora do baseline): não pode passar do CAP.
// Assim o próximo arquivo de 12.760 linhas é impossível, e os 91 atuais só melhoram.
// --update ratcheta o baseline para baixo: encolhimentos + remove toda entrada que
// já cabe no cap, inclusive quem NÃO encolheu nesta rodada (loc === frozen[file]).
// Antes a remoção só acontecia dentro do ramo de encolhimento, então uma entrada
// igual ao próprio teto ficava presa no baseline para sempre — ver #8584.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
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
const BASE_REF = getArg("--base-ref"); // SHA for PR base-relative mode (#8522)
const SCAN_DIRS = ["src", "open-sse", "electron", "bin"];
// Test files live under tests/ plus co-located *.test.ts(x) inside the source dirs.
const TEST_SCAN_DIRS = ["tests", ...SCAN_DIRS];
// Directories to skip when walking — build artifacts and installed packages.
const SKIP_DIRS = new Set(["node_modules", "dist-electron", ".next", ".build", "dist", "coverage"]);

/**
 * Avalia LOC atuais contra o baseline congelado.
 *
 * `redundant` (#8584): entrada que NAO precisa mais existir — o arquivo esta
 * exatamente no valor congelado E ja cabe no cap de arquivo novo. Antes, a
 * remocao do baseline so acontecia dentro do ramo de `improvements`
 * (loc < frozen), entao uma entrada igual ao proprio teto nunca saia da lista,
 * por mais abaixo do cap que estivesse (3 casos reais no v3.8.49).
 *
 * Quando `baseLocByFile` e fornecido (modo PR), a violacao e computada contra
 * o MAIOR entre o valor congelado e o valor na base -- assim um PR inocente
 * (head === base no arquivo) nao e penalizado por drift herdado (#8522).
 *
 * @param {Object} currentLocByFile — LOC atuais (head)
 * @param {Object} frozen — baseline congelado
 * @param {number} cap — teto para arquivos novos
 * @param {Object} [baseLocByFile] — LOC na branch base (opcional, modo PR)
 * @returns {{violations: string[], improvements: [string, number][], redundant: string[]}}
 */
export function evaluateFileSizes(currentLocByFile, frozen, cap, baseLocByFile) {
  const violations = [];
  const improvements = [];
  const redundant = [];
  for (const [file, loc] of Object.entries(currentLocByFile)) {
    if (file in frozen) {
      const threshold = baseLocByFile
        ? Math.max(frozen[file], baseLocByFile[file] ?? frozen[file])
        : frozen[file];
      if (loc > threshold)
        violations.push(`${file}: ${loc} > congelado ${frozen[file]} (não pode crescer)`);
      else if (loc < frozen[file]) improvements.push([file, loc]);
      else if (loc <= cap) redundant.push(file);
    } else if (loc > cap) {
      if (!baseLocByFile) {
        violations.push(`${file}: ${loc} > cap ${cap} (arquivo novo acima do limite)`);
      } else {
        // Modo PR: so viola se cresceu alem do que ja estava na base
        const baseLoc = baseLocByFile[file] ?? 0;
        const prThreshold = Math.max(cap, baseLoc);
        if (loc > prThreshold)
          violations.push(`${file}: ${loc} > cap ${cap} (arquivo novo acima do limite)`);
      }
    }
  }
  return { violations, improvements, redundant };
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

// Walk for TEST files: collects *.test.ts / *.test.tsx (the inverse of walk(),
// which deliberately excludes them). Skips .d.ts and the same SKIP_DIRS.
function walkTests(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walkTests(p, acc);
    } else if (/\.test\.tsx?$/.test(e.name) && !/\.d\.ts$/.test(e.name)) {
      acc.push(p);
    }
  }
  return acc;
}

function collectTestLoc() {
  const out = {};
  for (const d of TEST_SCAN_DIRS)
    for (const f of walkTests(path.join(ROOT, d)))
      out[path.relative(ROOT, f).replace(/\\/g, "/")] = countLines(f);
  return out;
}

/**
 * Computa LOC por arquivo a partir de um ref git (branch, SHA, tag).
 * Usado pelo modo --base-ref para obter a contagem na base do PR (#8522).
 * @param {string} ref — git ref (e.g. SHA da branch base)
 * @param {string[]} files — lista de paths relativos ao ROOT
 * @returns {Object} mapa file → line count
 */
function getBaseLoc(ref, files) {
  const out = {};
  for (const file of files) {
    try {
      const buf = execFileSync("git", ["show", `${ref}:${file}`], {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
        timeout: 5000,
      });
      out[file] = buf.split("\n").length;
    } catch {
      // Arquivo nao existe na base (novo no PR) — tratado como 0
    }
  }
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

  // Modo PR: computa LOC na branch base para comparacao relativa (#8522)
  const baseLoc = BASE_REF ? getBaseLoc(BASE_REF, Object.keys(current)) : undefined;
  if (BASE_REF) {
    const baseKeys = Object.keys(baseLoc).length;
    console.log(
      `[file-size] modo PR (--base-ref ${BASE_REF.slice(0, 12)}): ${baseKeys} arquivos da base computados`
    );
  }

  const { violations, improvements, redundant } = evaluateFileSizes(current, frozen, cap, baseLoc);

  // Test-file gate (Layer 1 anti-reinflation): same shrink-only + new-≤cap semantics,
  // reusing evaluateFileSizes against the testFrozen baseline + testCap.
  const testCap = baseline.testCap;
  const testFrozen = baseline.testFrozen || {};
  const currentTests = collectTestLoc();
  const {
    violations: testViolations,
    improvements: testImprovements,
    redundant: testRedundant,
  } = typeof testCap === "number"
    ? evaluateFileSizes(currentTests, testFrozen, testCap, BASE_REF ? baseLoc : undefined)
    : { violations: [], improvements: [], redundant: [] };

  if (UPDATE) {
    let changed = false;
    if (violations.length === 0 && (improvements.length || redundant.length)) {
      for (const [file, loc] of improvements) {
        if (loc <= cap)
          delete frozen[file]; // caiu para dentro do cap → sai do baseline
        else frozen[file] = loc; // continua grande mas encolheu → trava no novo valor
      }
      // #8584: entradas que já cabem no cap sem terem encolhido nesta rodada
      // (loc === frozen[file]) também saem — antes ficavam presas para sempre.
      for (const file of redundant) delete frozen[file];
      baseline.frozen = Object.fromEntries(Object.entries(frozen).sort());
      changed = true;
      console.log(
        `[file-size] baseline ratcheado: ${improvements.length} arquivo(s) encolheram` +
          (redundant.length ? `, ${redundant.length} entrada(s) redundante(s) removida(s)` : "")
      );
    }
    if (
      typeof testCap === "number" &&
      testViolations.length === 0 &&
      (testImprovements.length || testRedundant.length)
    ) {
      for (const [file, loc] of testImprovements) {
        if (loc <= testCap)
          delete testFrozen[file]; // caiu para dentro do testCap → sai do baseline
        else testFrozen[file] = loc; // continua grande mas encolheu → trava no novo valor
      }
      for (const file of testRedundant) delete testFrozen[file];
      baseline.testFrozen = Object.fromEntries(Object.entries(testFrozen).sort());
      changed = true;
      console.log(
        `[test-file-size] baseline ratcheado: ${testImprovements.length} arquivo(s) de teste encolheram` +
          (testRedundant.length
            ? `, ${testRedundant.length} entrada(s) redundante(s) removida(s)`
            : "")
      );
    }
    if (changed) fs.writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + "\n");
  }

  let failed = false;
  if (violations.length) {
    console.error(
      `[file-size] ${violations.length} violação(ões):\n` +
        violations.map((v) => "  ✗ " + v).join("\n") +
        `\n  → modularize/extraia (DRY) para encolher, ou (último caso) ajuste file-size-baseline.json com justificativa.`
    );
    failed = true;
  } else {
    console.log(
      `[file-size] OK — ${Object.keys(frozen).length} arquivos congelados, cap ${cap} para novos (${Object.keys(current).length} arquivos verificados)`
    );
  }

  if (typeof testCap === "number") {
    if (testViolations.length) {
      console.error(
        `[test-file-size] ${testViolations.length} test file violation(s) (testCap ${testCap}):\n` +
          testViolations.map((v) => "  ✗ " + v).join("\n") +
          `\n  → split the test file (extract helpers/sub-suites) to shrink it, or (last resort) adjust testFrozen in file-size-baseline.json with justification.`
      );
      failed = true;
    } else {
      console.log(
        `[test-file-size] OK — ${Object.keys(testFrozen).length} test files congelados, testCap ${testCap} para novos (${Object.keys(currentTests).length} test files verificados)`
      );
    }
  }

  if (failed) process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
