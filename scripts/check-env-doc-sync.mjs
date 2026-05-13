#!/usr/bin/env node
// Validates that env vars referenced in code appear in .env.example AND in docs/ENVIRONMENT.md.
// Exits 0 on success, 1 on missing entries. Designed for use in pre-commit / CI.
//
// Run: node scripts/check-env-doc-sync.mjs
// Strict mode: node scripts/check-env-doc-sync.mjs --strict
//   In strict mode, missing entries cause failure. In default mode, only summary is printed.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ENV_EXAMPLE = path.join(ROOT, ".env.example");
const ENV_DOC = path.join(ROOT, "docs", "ENVIRONMENT.md");

const STRICT = process.argv.includes("--strict");

// Vars that are intentionally not documented or detected in code via dynamic patterns.
const IGNORE = new Set([
  "NODE_ENV",
  "PATH",
  "HOME",
  "USER",
  "PWD",
  "SHELL",
  "TERM",
  "TZ",
  "LANG",
  "LC_ALL",
  "CI",
  "GITHUB_ACTIONS",
  "RUNNER_OS",
  // Add false positives here as discovered.
]);

function readEnvExampleVars() {
  if (!fs.existsSync(ENV_EXAMPLE)) {
    console.error(`✗ ${ENV_EXAMPLE} not found`);
    process.exit(2);
  }
  const txt = fs.readFileSync(ENV_EXAMPLE, "utf8");
  const vars = new Set();
  for (const line of txt.split("\n")) {
    // Match both "VAR=value" and "# VAR=value" (commented-out examples are still documented)
    const m = line.match(/^#?\s*([A-Z][A-Z0-9_]+)\s*=/);
    if (m) vars.add(m[1]);
  }
  return vars;
}

function readEnvDocVars() {
  if (!fs.existsSync(ENV_DOC)) {
    console.error(`✗ ${ENV_DOC} not found`);
    process.exit(2);
  }
  const txt = fs.readFileSync(ENV_DOC, "utf8");
  const vars = new Set();
  // Match `VAR_NAME` in inline code or table cells.
  for (const m of txt.matchAll(/`([A-Z][A-Z0-9_]{2,})`/g)) {
    vars.add(m[1]);
  }
  return vars;
}

function readCodeVars() {
  const vars = new Set();
  let stdout;
  try {
    stdout = execSync(
      "grep -rhoE 'process\\.env\\.[A-Z][A-Z0-9_]+' src/ open-sse/ bin/ scripts/ 2>/dev/null || true",
      { cwd: ROOT, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
    );
  } catch (e) {
    console.error(`✗ grep failed: ${e.message}`);
    process.exit(2);
  }
  for (const line of stdout.split("\n")) {
    const m = line.match(/^process\.env\.([A-Z][A-Z0-9_]+)$/);
    if (m && !IGNORE.has(m[1])) vars.add(m[1]);
  }
  return vars;
}

function diff(set, against) {
  return [...set].filter((v) => !against.has(v)).sort();
}

function main() {
  const codeVars = readCodeVars();
  const exampleVars = readEnvExampleVars();
  const docVars = readEnvDocVars();

  const inCodeMissingExample = diff(codeVars, exampleVars);
  const inCodeMissingDoc = diff(codeVars, docVars);
  const inExampleMissingDoc = diff(exampleVars, docVars);
  const inExampleMissingCode = diff(exampleVars, codeVars);

  console.log("Env var sync report");
  console.log("===================");
  console.log(`Code references:          ${codeVars.size} unique vars`);
  console.log(`In .env.example:          ${exampleVars.size} unique vars`);
  console.log(`In docs/ENVIRONMENT.md:   ${docVars.size} unique vars (heuristic)`);
  console.log();

  function printList(label, list) {
    if (list.length === 0) {
      console.log(`  ✓ ${label}: none`);
    } else {
      console.log(`  ⚠ ${label}: ${list.length}`);
      for (const v of list.slice(0, 30)) console.log(`     - ${v}`);
      if (list.length > 30) console.log(`     ... and ${list.length - 30} more`);
    }
  }

  printList("In code but missing from .env.example", inCodeMissingExample);
  printList("In code but missing from ENVIRONMENT.md", inCodeMissingDoc);
  printList("In .env.example but missing from ENVIRONMENT.md", inExampleMissingDoc);
  printList("In .env.example but not referenced in code (dead?)", inExampleMissingCode);

  const errors = inCodeMissingExample.length + inExampleMissingDoc.length;
  if (STRICT && errors > 0) {
    console.error(`\n✗ ${errors} drift(s) detected (strict mode)`);
    process.exit(1);
  }
  console.log(`\n${errors === 0 ? "✓" : "⚠"} Done.`);
}

main();
