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
  // An "unpruned" suppression means a previously-frozen violation was legitimately
  // fixed — release-time housekeeping (same bucket as ratchet drift), never a
  // contributor-blocking defect. Without this flag ESLint 9.x exits 2 for that
  // reason alone, which would fail this script's own JSON pass on a clean tree
  // (same failure class already fixed in validate-release-green.mjs — #7837 / #11600).
  "--pass-on-unpruned-suppressions",
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

// 2026-08-30 (#12144): with --format json --output-file a red run printed NOTHING — three
// blind debugging rounds. On failure, summarize the problems from the report so the CI log
// says WHAT failed; status null means the process was killed (OOM), also silent before.
if (result.status !== 0) {
  if (result.status === null) {
    console.error(
      `[lint:json] eslint was killed (signal ${result.signal || "?"}) — likely OOM; no report written.`
    );
  }
  try {
    const report = JSON.parse(fs.readFileSync(outFile, "utf8"));
    const problems = [];
    for (const f of report) {
      for (const m of f.messages || []) {
        problems.push(
          `${path.relative(root, f.filePath)}:${m.line ?? 0} ${m.severity === 2 ? "error" : "warning"} ${m.ruleId ?? "(core)"} — ${String(m.message).split("\n")[0].slice(0, 120)}`
        );
      }
    }
    console.error(
      `[lint:json] exit ${result.status}: ${problems.length} problem(s) in the report:`
    );
    for (const line of problems.slice(0, 60)) console.error("  ✗ " + line);
    if (problems.length > 60) {
      console.error(
        `  … and ${problems.length - 60} more (full report: ${path.relative(root, outFile)})`
      );
    }
  } catch (err) {
    console.error(`[lint:json] could not summarize ${outFile}: ${err && err.message}`);
  }
}

process.exit(result.status === null ? 1 : result.status);
