#!/usr/bin/env node
/**
 * Verifies golden equivalence between the JS implementation and the Rust
 * implementation.
 *
 * Rust side: runs `cargo test -p compression-tests` which asserts byte-level
 * equality against fixtures/expected/. This script:
 *   1. regenerates fixtures from the current JS implementation
 *   2. runs cargo tests
 *   3. reports pass/fail per fixture family
 *
 * Usage: node scripts/verify-golden.ts [--skip-generate]
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const CORE_DIR = join(HERE, "..");

const skipGenerate = process.argv.includes("--skip-generate");

if (!skipGenerate) {
  console.log("[verify-golden] regenerating fixtures from JS implementation...");
  const gen = spawnSync("node", ["--import", "tsx/esm", "scripts/generate-fixtures.ts"], {
    cwd: CORE_DIR,
    stdio: "inherit",
  });
  if (gen.status !== 0) {
    console.error("FAIL: fixture generation exited with", gen.status);
    process.exit(1);
  }
}

console.log("[verify-golden] running Rust golden tests...");
const run = spawnSync("cargo", ["test", "-p", "compression-tests"], {
  cwd: CORE_DIR,
  stdio: "inherit",
});
if (run.status !== 0) {
  console.error("FAIL: Rust golden tests exited with", run.status);
  process.exit(1);
}

console.log("[verify-golden] ALL GOLDEN TESTS PASSED ✅");
