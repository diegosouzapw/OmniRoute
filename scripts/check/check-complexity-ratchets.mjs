#!/usr/bin/env node
/**
 * One ESLint walk → both complexity ratchets.
 *
 * Existence reasons (unchanged):
 * - cyclomatic + max-lines vs complexity-baseline.json
 * - cognitive-complexity vs quality-baseline metrics.cognitiveComplexity
 *
 * CI should call this instead of sequential check:complexity + check:cognitive
 * so PR→release / quality-gate pay for one tree walk, not two.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { evaluateComplexity } from "./check-complexity.mjs";
import { evaluateCognitiveComplexity } from "./check-cognitive-complexity.mjs";
import {
  countCognitiveViolations,
  countComplexityViolations,
  getComplexityEslintReport,
} from "./complexityEslintReport.mjs";
import {
  baseRefArg,
  diffNewCode,
  listChangedFiles,
  perFileRuleCounts,
  resolveMergeBase,
  withBaseWorktree,
} from "./newCodeMode.mjs";
import { runComplexityEslintOn } from "./complexityEslintReport.mjs";

const BASE_REF = baseRefArg();
const NEW_CODE_SCOPE = {
  dirs: ["src", "open-sse", "electron", "bin"],
  exts: [".ts", ".tsx", ".js", ".mjs"],
  // Authorship ratchets must not force local rewrites of byte-faithful third-party source.
  // The release-wide full walk still measures vendor complexity against the frozen baseline.
  excludePrefixes: ["open-sse/vendor/"],
};
const CYCLOMATIC_RULES = new Set(["complexity", "max-lines-per-function"]);
const COGNITIVE_RULES = new Set(["sonarjs/cognitive-complexity"]);

/**
 * New-code mode (PR events, `--base-ref <sha>`): blocking only on violations the PR added in
 * the files it touched; the global totals are NOT measured here (the release reconciliation
 * and the nightly headroom job run the full walk). See newCodeMode.mjs.
 */
function mainNewCode() {
  const mergeBase = resolveMergeBase(BASE_REF);
  const changed = listChangedFiles(mergeBase, NEW_CODE_SCOPE);
  console.log(
    `[complexity-ratchets] new-code mode: merge-base ${mergeBase.slice(0, 12)}, ${changed.length} changed file(s) in scope`
  );
  if (changed.length === 0) {
    console.log("[complexity-ratchets] OK — no source files changed; nothing to compare.");
    return;
  }
  const headReport = runComplexityEslintOn(changed, ROOT);
  const headCounts = {
    complexity: perFileRuleCounts(headReport, CYCLOMATIC_RULES, ROOT),
    cognitive: perFileRuleCounts(headReport, COGNITIVE_RULES, ROOT),
  };
  // Base paths are absolute inside the throwaway worktree → relativize while it exists.
  const baseCounts = withBaseWorktree(mergeBase, (dir) => {
    const report = runComplexityEslintOn(changed, dir);
    return {
      complexity: perFileRuleCounts(report, CYCLOMATIC_RULES, dir),
      cognitive: perFileRuleCounts(report, COGNITIVE_RULES, dir),
    };
  });
  let failed = false;
  for (const [label, key, metric] of [
    ["complexity", "complexity", "complexityNewCode"],
    ["cognitive-complexity", "cognitive", "cognitiveComplexityNewCode"],
  ]) {
    const { regressions, head, base, delta } = diffNewCode(
      headCounts[key],
      baseCounts[key],
      changed
    );
    console.log(`${metric}=${delta}`);
    if (regressions.length) {
      console.error(
        `[${label}] REGRESSÃO (código novo) — ${head} violações nos arquivos tocados vs ${base} na base (+${delta}):\n` +
          regressions.map((r) => `  ✗ ${r.file}: ${r.base} → ${r.head}`).join("\n") +
          "\n  → quebre a função em helpers menores; o total global do repo NÃO conta aqui, só o que esta PR adicionou."
      );
      failed = true;
    } else {
      console.log(
        `[${label}] OK (código novo) — ${head} violações nos arquivos tocados (base ${base})`
      );
    }
  }
  if (failed) process.exit(1);
}

const ROOT = process.cwd();
const UPDATE = process.argv.includes("--update");

const COMPLEXITY_BASELINE = path.resolve(
  process.argv.includes("--baseline")
    ? process.argv[process.argv.indexOf("--baseline") + 1]
    : path.join(ROOT, "config/quality/complexity-baseline.json")
);
const QUALITY_BASELINE = path.join(ROOT, "config/quality/quality-baseline.json");

function main() {
  if (BASE_REF) return mainNewCode();
  if (!fs.existsSync(COMPLEXITY_BASELINE)) {
    console.error(`[complexity-ratchets] FAIL — complexity-baseline.json ausente.`);
    process.exit(2);
  }
  if (!fs.existsSync(QUALITY_BASELINE)) {
    console.error(`[complexity-ratchets] FAIL — quality-baseline.json ausente.`);
    process.exit(2);
  }

  const report = getComplexityEslintReport();
  const complexityCount = countComplexityViolations(report);
  const cognitiveCount = countCognitiveViolations(report);

  // Machine-readable lines for collect-metrics / scripts
  console.log(`complexity=${complexityCount}`);
  console.log(`cognitiveComplexity=${cognitiveCount}`);

  const complexityBaseline = JSON.parse(fs.readFileSync(COMPLEXITY_BASELINE, "utf8"));
  const qualityBaseline = JSON.parse(fs.readFileSync(QUALITY_BASELINE, "utf8"));
  const cognitiveMetric = qualityBaseline.metrics?.cognitiveComplexity;
  if (!cognitiveMetric || typeof cognitiveMetric.value !== "number") {
    console.error(
      "[complexity-ratchets] FAIL — metrics.cognitiveComplexity ausente em quality-baseline.json."
    );
    process.exit(2);
  }

  const cyc = evaluateComplexity(complexityCount, complexityBaseline.count);
  const cog = evaluateCognitiveComplexity(cognitiveCount, cognitiveMetric.value);

  if (UPDATE && cyc.improved) {
    console.log(
      `[complexity] baseline ratcheado: ${complexityCount} (era ${complexityBaseline.count})`
    );
    complexityBaseline.count = complexityCount;
    fs.writeFileSync(COMPLEXITY_BASELINE, JSON.stringify(complexityBaseline, null, 2) + "\n");
  }
  if (UPDATE && cog.improved) {
    console.log(
      `[cognitive-complexity] baseline ratcheado: ${cognitiveCount} (era ${cognitiveMetric.value})`
    );
    qualityBaseline.metrics.cognitiveComplexity.value = cognitiveCount;
    fs.writeFileSync(QUALITY_BASELINE, JSON.stringify(qualityBaseline, null, 2) + "\n");
  }

  let failed = false;
  if (cyc.regressed) {
    console.error(
      `[complexity] REGRESSÃO — ${complexityCount} violações > baseline ${complexityBaseline.count}`
    );
    failed = true;
  } else {
    console.log(
      `[complexity] OK — ${complexityCount} violações (baseline ${complexityBaseline.count})`
    );
  }

  if (cog.regressed) {
    console.error(
      `[cognitive-complexity] REGRESSÃO — ${cognitiveCount} violações > baseline ${cognitiveMetric.value}`
    );
    failed = true;
  } else {
    console.log(
      `[cognitive-complexity] OK — ${cognitiveCount} violações (baseline ${cognitiveMetric.value})`
    );
  }

  process.exit(failed ? 1 : 0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
