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

/** 3-segment path suffix without extension (unique enough; matches relative + alias imports). */
export function moduleFragment(modulePath) {
  return modulePath.replace(/\.ts$/, "").split("/").slice(-3).join("/");
}

/**
 * True if `content` imports the module identified by `fragment`, in any form:
 * static `... from "…fragment…"`, dynamic `import("…fragment…")` (incl. split
 * across lines), or `require("…fragment…")`. The fragment must appear INSIDE the
 * import string literal — a bare mention in a comment does not match.
 */
export function testImportsModule(content, fragment) {
  const esc = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    "(?:from\\s+|\\bimport\\s*\\(\\s*|\\brequire\\s*\\(\\s*)[\"'][^\"']*" + esc
  );
  return re.test(content);
}

/**
 * @param {{mutate: string[], tapTestFiles: string[], unitTests: {path:string, content:string}[]}} input
 * @returns {Record<string,string[]>} module -> covering unit tests NOT in tap.testFiles (drift)
 */
export function findCoverageDrift({ mutate, tapTestFiles, unitTests }) {
  const tap = new Set(tapTestFiles);
  const drift = {};
  for (const mod of mutate) {
    if (mod.startsWith("_") || !mod.endsWith(".ts")) continue; // skip comment/non-ts entries
    const frag = moduleFragment(mod);
    const missing = unitTests
      .filter((t) => testImportsModule(t.content, frag) && !tap.has(t.path))
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
    // Exclude tests/unit/build/: these test the build TOOLING (scripts/), not the
    // mutated runtime modules. They legitimately embed module paths as fixture
    // strings (e.g. this gate's own test), which would otherwise false-match.
    .filter((f) => !f.startsWith("tests/unit/build/"))
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
