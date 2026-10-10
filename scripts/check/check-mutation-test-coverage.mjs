#!/usr/bin/env node
// check-mutation-test-coverage — guards against tap.testFiles drift.
//
// WHY: Stryker (nightly-mutation) only runs the test files listed in
// stryker.conf.json `tap.testFiles` against each mutant. When a NEW unit test
// that covers a mutated module is added (or an existing one is split/renamed)
// but NOT added to tap.testFiles, that test's kills stop counting. The mutants
// it would kill then go COVERED-but-unkilled = SURVIVED on a cold run, so the
// module's COVERED mutation score collapses and the blocking mutationScore
// ratchet (nightly-mutation.yml) false-fails — but only on cold-cache nights,
// because the warm incremental run reuses the older (passing) verdicts. The
// pass/fail then tracks GitHub cache state, not code quality. Root cause:
// tap.testFiles is a hand-maintained list with no drift guard. This is it.
//
// INVARIANT: every UNIT test (tests/unit/**) that imports a mutated module
// (stryker.conf.json `mutate`) MUST be in `tap.testFiles`. Integration/e2e
// tests are intentionally excluded (the tap-runner runs node:test units only).
//
// MODE: advisory by default (prints drift, exit 0). `--strict` exits 1 on drift
// so CI can block. Skip-graceful (exit 0) if stryker.conf.json is absent.
//
// USAGE:
//   node scripts/check/check-mutation-test-coverage.mjs            # advisory
//   node scripts/check/check-mutation-test-coverage.mjs --strict   # blocking

import fs from "node:fs";
import { execFileSync } from "node:child_process";
import ts from "typescript";

/** 3-segment path suffix without extension (unique enough; matches relative + alias imports). */
export function moduleFragment(modulePath) {
  return modulePath.replace(/\.ts$/, "").split("/").slice(-3).join("/");
}

/** Syntactic runtime imports only: fixture strings/comments/types cannot kill mutants. */
function runtimeImports(content) {
  const file = ts.createSourceFile(
    "unit.test.ts",
    content,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  );
  const specifiers = new Set();
  const add = (node) => {
    if (node && ts.isStringLiteralLike(node)) specifiers.add(node.text);
  };
  const hasRuntimeBinding = (bindings) =>
    !bindings ||
    !ts.isNamedImports(bindings) ||
    bindings.elements.some((element) => !element.isTypeOnly);
  const visit = (node) => {
    if (ts.isImportDeclaration(node)) {
      const clause = node.importClause;
      if (
        !clause ||
        (!clause.isTypeOnly && (clause.name || hasRuntimeBinding(clause.namedBindings)))
      )
        add(node.moduleSpecifier);
    } else if (ts.isExportDeclaration(node)) {
      const clause = node.exportClause;
      if (
        !node.isTypeOnly &&
        (!clause ||
          !ts.isNamedExports(clause) ||
          clause.elements.some((element) => !element.isTypeOnly))
      )
        add(node.moduleSpecifier);
    } else if (
      ts.isCallExpression(node) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
        (ts.isIdentifier(node.expression) && node.expression.text === "require"))
    ) {
      add(node.arguments[0]);
    } else if (
      ts.isImportEqualsDeclaration(node) &&
      !node.isTypeOnly &&
      ts.isExternalModuleReference(node.moduleReference)
    ) {
      add(node.moduleReference.expression);
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  return [...specifiers];
}

function matchesModule(specifier, fragment) {
  const withoutExtension = specifier.replace(/\.[cm]?[jt]sx?$/, "");
  return withoutExtension === fragment || withoutExtension.endsWith(`/${fragment}`);
}

/** Match actual runtime import syntax, not embedded source text or a module-name prefix. */
export function testImportsModule(content, fragment) {
  return runtimeImports(content).some((specifier) => matchesModule(specifier, fragment));
}

/**
 * @param {{mutate: string[], tapTestFiles: string[], unitTests: {path:string, content:string}[]}} input
 * @returns {Record<string,string[]>} module -> covering unit tests NOT in tap.testFiles (drift)
 */
export function findCoverageDrift({ mutate, tapTestFiles, unitTests }) {
  const tap = new Set(tapTestFiles);
  const drift = {};
  const imports = new Map();
  for (const mod of mutate) {
    if (mod.startsWith("_") || !mod.endsWith(".ts")) continue; // skip comment/non-ts entries
    const frag = moduleFragment(mod);
    const missing = unitTests
      .filter((t) => {
        if (tap.has(t.path) || !t.content.includes(frag)) return false;
        if (!imports.has(t)) imports.set(t, runtimeImports(t.content));
        return imports.get(t).some((specifier) => matchesModule(specifier, frag));
      })
      .map((t) => t.path)
      .sort();
    if (missing.length > 0) drift[mod] = missing;
  }
  return drift;
}

function listUnitTests() {
  // Static argv — no shell, no interpolation.
  const out = execFileSync("git", ["ls-files", "tests/unit"], { encoding: "utf8" });
  return out
    .split("\n")
    .filter((f) => /\.test\.ts$/.test(f))
    .map((path) => ({ path, content: fs.readFileSync(path, "utf8") }));
}

function main() {
  const STRICT = process.argv.includes("--strict");
  let conf;
  try {
    conf = JSON.parse(fs.readFileSync("stryker.conf.json", "utf8"));
  } catch {
    console.warn("[mutation-test-coverage] stryker.conf.json not found — skipping (advisory).");
    process.exit(0);
  }
  const mutate = (conf.mutate || []).filter((m) => typeof m === "string");
  const tapTestFiles = conf.tap?.testFiles || [];
  const unitTests = listUnitTests();

  const drift = findCoverageDrift({ mutate, tapTestFiles, unitTests });
  const modules = Object.keys(drift);
  const total = modules.reduce((n, m) => n + drift[m].length, 0);

  console.log("Mutation test-coverage gate — tap.testFiles drift detection");
  console.log("===========================================================");
  console.log(
    `Scanned ${unitTests.length} unit test file(s) against ${mutate.filter((m) => m.endsWith(".ts")).length} mutated module(s).`
  );

  if (total === 0) {
    console.log("✓ No drift — every covering unit test is listed in tap.testFiles.");
    process.exit(0);
  }

  for (const m of modules) {
    console.log(`\n  ${m}`);
    for (const t of drift[m]) console.log(`    + ${t}`);
  }
  const msg = `${total} covering unit test(s) across ${modules.length} module(s) are missing from stryker.conf.json tap.testFiles.`;
  if (STRICT) {
    console.error(`\n✗ ${msg} Add them so their mutant kills count (--strict).`);
    process.exit(1);
  }
  console.warn(`\n⚠ ${msg} Re-run with --strict to fail. Add them to tap.testFiles.`);
  process.exit(0);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
