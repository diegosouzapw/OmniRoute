#!/usr/bin/env node
/**
 * Shared ESLint runner for complexity + cognitive-complexity ratchets.
 * One tree walk → JSON report; consumers count by ruleId (not errorCount).
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CONFIG_PATH = path.join(ROOT, "eslint.complexity-ratchets.config.mjs");

/** Positional dirs — must match config `files` scopes (see check-complexity tests). */
export const ESLINT_SCAN_DIRS = ["src", "open-sse", "electron", "bin"];

const ESLINT_BIN = path.join(
  ROOT,
  "node_modules",
  ".bin",
  process.platform === "win32" ? "eslint.cmd" : "eslint"
);

/** Args after the eslint binary (tests lock scan dirs on this array). */
export const ESLINT_ARGS = [
  "--no-config-lookup",
  "--config",
  CONFIG_PATH,
  "--format",
  "json",
  "--cache",
  "--cache-location",
  ".eslintcache-complexity",
  ...ESLINT_SCAN_DIRS,
];

const COMPLEXITY_RULES = new Set(["complexity", "max-lines-per-function"]);

/**
 * @param {Array<{messages?: Array<{ruleId?: string}>}>} report
 * @returns {number}
 */
export function countComplexityViolations(report) {
  let count = 0;
  for (const file of report) {
    for (const msg of file.messages || []) {
      if (COMPLEXITY_RULES.has(msg.ruleId)) count++;
    }
  }
  return count;
}

/**
 * @param {Array<{messages?: Array<{ruleId?: string}>}>} report
 * @returns {number}
 */
export function countCognitiveViolations(report) {
  let count = 0;
  for (const file of report) {
    for (const msg of file.messages || []) {
      if (msg.ruleId === "sonarjs/cognitive-complexity") count++;
    }
  }
  return count;
}

/**
 * Run ESLint once (or reuse COMPLEXITY_ESLINT_REPORT / in-process cache).
 * @returns {Array<object>}
 */
export function getComplexityEslintReport() {
  const fromEnv = process.env.COMPLEXITY_ESLINT_REPORT;
  if (fromEnv && fs.existsSync(fromEnv)) {
    return JSON.parse(fs.readFileSync(fromEnv, "utf8"));
  }
  if (getComplexityEslintReport._cache) return getComplexityEslintReport._cache;

  let stdout;
  try {
    // Prefer local bin (Windows-safe); shell only needed for .cmd shims.
    stdout = execFileSync(ESLINT_BIN, ESLINT_ARGS, {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      shell: process.platform === "win32",
    });
  } catch (err) {
    stdout = err.stdout ? String(err.stdout) : "";
    if (!stdout.trim()) throw err;
  }
  const report = JSON.parse(stdout);
  getComplexityEslintReport._cache = report;

  const outDir = path.join(ROOT, ".artifacts");
  try {
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "complexity-eslint.json"), stdout);
  } catch {
    // best-effort cache for sibling steps / local inspection
  }
  return report;
}

getComplexityEslintReport._cache = null;
