#!/usr/bin/env node
/**
 * Single ESLint pass that always writes a JSON report for quality:collect.
 *
 * Existence reason: one inventory of net-new issues (vs suppressions) should
 * feed both the blocking lint gate and the eslintWarnings ratchet — not two
 * cold full-tree walks on different runners.
 *
 * Exit code: ESLint's own (0 = clean, 1 = errors). Warnings do not fail by
 * default (same as `npm run lint`); pass --max-warnings=0 for lint-guard.
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const outFile = path.resolve(
  root,
  process.env.ESLINT_RESULTS_JSON || path.join(".artifacts", "eslint-results.json")
);

fs.mkdirSync(path.dirname(outFile), { recursive: true });

const extra = process.argv.slice(2);
const eslintBin = path.join(
  root,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "eslint.cmd" : "eslint"
);
const args = [
  ".",
  "--cache",
  "--cache-location",
  ".eslintcache",
  "--suppressions-location",
  "config/quality/eslint-suppressions.json",
  "--format",
  "json",
  "--output-file",
  outFile,
  ...extra,
];

const result = spawnSync(eslintBin, args, {
  cwd: root,
  encoding: "utf8",
  shell: process.platform === "win32",
  maxBuffer: 256 * 1024 * 1024,
});

if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);

if (!fs.existsSync(outFile)) {
  // ESLint may crash before writing; leave an empty array so collectors don't explode.
  fs.writeFileSync(outFile, "[]\n");
}

process.exit(result.status === null ? 1 : result.status);
