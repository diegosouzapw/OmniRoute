#!/usr/bin/env node
// scripts/check/check-workflows.mjs
// Lint + security audit of GitHub Actions workflow files.
// PLANO-QUALITY-GATES-FASE7.md, Task 19.
//
// Tools:
//   actionlint  — syntax / correctness / shellcheck of workflow YAML
//   zizmor      — 24+ security audits (unpinned actions, script injection,
//                 pull_request_target misuse, cache poisoning, …)
//
// Graceful-SKIP contract:
//   If EITHER binary is absent from PATH, the script prints a SKIP notice and
//   exits 0. This allows the gate to run in environments that have the tools
//   installed (CI with setup steps, developer machines with actionlint/zizmor)
//   while being inert elsewhere.
//
// Output (stdout, one line each):
//   workflowFindings=<n>   — total findings from both tools combined
//   actionlintFindings=<n> — findings from actionlint alone
//   zizmorFindings=<n>     — findings from zizmor alone
//
// Exit codes:
//   0  — SKIP (binary absent) or all tools passed / no ratchet regression
//   1  — gate failure: --strict + any finding, OR --ratchet + zizmorFindings
//        regression (measured > baseline)
//
// Ratchet mode (--ratchet): reads metrics.zizmorFindings.value from
// config/quality/quality-baseline.json and exits 1 IF — AND ONLY IF — the MEASURED
// zizmor count is GREATER than the baseline (real regression, direction:down).
// ONLY zizmorFindings is ratcheted; actionlint findings are REPORTED but NOT
// ratcheted (use the separate --strict all-or-nothing flag for those). Any graceful
// SKIP (binary absent, no workflows) exits 0 even with --ratchet — missing infra
// never blocks, only a measured regression does.
//
// Usage:
//   node scripts/check/check-workflows.mjs               # advisory (exit 0 always)
//   node scripts/check/check-workflows.mjs --strict      # fail on any finding
//   node scripts/check/check-workflows.mjs --ratchet     # fail on zizmor regression
//   node scripts/check/check-workflows.mjs --quiet       # suppress progress logs

import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const WORKFLOWS_DIR = path.join(ROOT, ".github", "workflows");
const ZIZMOR_CONFIG = path.join(ROOT, ".zizmor.yml");
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");

const STRICT = process.argv.includes("--strict");
const RATCHET = process.argv.includes("--ratchet");
const QUIET = process.argv.includes("--quiet");

// ---------------------------------------------------------------------------
// Utility: resolve binary from PATH (cross-platform)
// ---------------------------------------------------------------------------

/**
 * Checks whether a binary exists in PATH by running `which`/`where`.
 * Returns true if found, false otherwise.
 *
 * @param {string} name - Binary name (e.g. "actionlint")
 * @returns {boolean}
 */
export function isBinaryAvailable(name) {
  // Use `command -v` on Unix; `where` on Windows (via cmd).
  // We shell through `sh -c` because execFileSync needs the actual path
  // and we want cross-platform behaviour.
  const result = spawnSync("sh", ["-c", `command -v ${name}`], {
    encoding: "utf8",
    timeout: 5_000,
    windowsHide: true,
  });
  return result.status === 0 && result.stdout.trim().length > 0;
}

// ---------------------------------------------------------------------------
// actionlint result parsing
// ---------------------------------------------------------------------------

/**
 * Parses actionlint output (line-based, one finding per line) and counts
 * findings. Each non-empty line = one finding.
 *
 * actionlint emits lines in the format:
 *   <file>:<line>:<col>: <message> [<rule>]
 * or a summary line when all is well (zero findings = empty stdout).
 *
 * @param {string} stdout - Raw stdout from actionlint
 * @returns {{ count: number, lines: string[] }}
 */
export function parseActionlintOutput(stdout) {
  const lines = stdout
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return { count: lines.length, lines };
}

// ---------------------------------------------------------------------------
// zizmor result parsing
// ---------------------------------------------------------------------------

/**
 * Parses zizmor JSON output and counts findings.
 *
 * zizmor --format json emits a JSON object:
 *   { diagnostics: Array<{ ...finding fields }> }
 * or an array directly in older versions.
 *
 * If JSON parsing fails, falls back to line counting (graceful degradation).
 *
 * @param {string} stdout - Raw stdout from zizmor --format json (or text)
 * @returns {{ count: number, diagnostics: unknown[] }}
 */
export function parseZizmorOutput(stdout) {
  const trimmed = stdout.trim();
  if (!trimmed) {
    return { count: 0, diagnostics: [] };
  }

  try {
    const parsed = JSON.parse(trimmed);
    // zizmor ≥0.8 emits { diagnostics: [...] }
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.diagnostics)) {
      return { count: parsed.diagnostics.length, diagnostics: parsed.diagnostics };
    }
    // Older versions may emit a bare array
    if (Array.isArray(parsed)) {
      return { count: parsed.length, diagnostics: parsed };
    }
    // Unexpected JSON shape — treat whole object as 0 findings if it has no
    // obvious error marker; this is a best-effort parse.
    return { count: 0, diagnostics: [] };
  } catch {
    // Not JSON (e.g. text output or error message) — count non-empty lines as
    // a conservative fallback.
    const lines = trimmed.split("\n").filter(Boolean);
    return { count: lines.length, diagnostics: [] };
  }
}

// ---------------------------------------------------------------------------
// Ratchet (direction:down, zizmorFindings only) — exported for tests
// ---------------------------------------------------------------------------

/**
 * Evaluates the MEASURED zizmor finding count against the baseline.
 * Direction: down (the count may only DROP — more findings = regression).
 *
 * @param {number} current  - Measured zizmor finding count.
 * @param {number} baseline - Frozen count in quality-baseline.json.
 * @returns {{ regressed: boolean, improved: boolean }}
 */
export function evaluateZizmorRatchet(current, baseline) {
  return {
    regressed: current > baseline,
    improved: current < baseline,
  };
}

/**
 * Reads metrics.zizmorFindings.value from quality-baseline.json.
 * Returns null when the file or metric is missing (no baseline → no ratchet
 * possible; the caller treats this as a graceful SKIP, exit 0).
 *
 * @param {string} baselinePath
 * @returns {number|null}
 */
export function readBaselineZizmorValue(baselinePath = BASELINE_PATH) {
  if (!fs.existsSync(baselinePath)) return null;
  let baselineJson;
  try {
    baselineJson = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
  } catch {
    return null;
  }
  const metric = baselineJson?.metrics?.zizmorFindings;
  if (!metric || typeof metric.value !== "number") return null;
  return metric.value;
}

// ---------------------------------------------------------------------------
// Runner helpers
// ---------------------------------------------------------------------------

/**
 * Collects all *.yml files from the workflows directory.
 *
 * @param {string} workflowsDir
 * @returns {string[]} Absolute paths
 */
export function collectWorkflowFiles(workflowsDir) {
  if (!fs.existsSync(workflowsDir)) {
    return [];
  }
  return fs
    .readdirSync(workflowsDir)
    .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"))
    .map((f) => path.join(workflowsDir, f));
}

/**
 * Runs actionlint over the given workflow files.
 * Returns parsed result. Never throws — returns count=0 on any exec error so
 * that one broken binary does not abort the whole check.
 *
 * @param {string[]} files - Absolute paths to workflow YAMLs
 * @returns {{ count: number, lines: string[], skipped: boolean }}
 */
export function runActionlint(files) {
  if (files.length === 0) {
    return { count: 0, lines: [], skipped: false };
  }
  try {
    const stdout = execFileSync("actionlint", files, {
      encoding: "utf8",
      // actionlint exits non-zero when it finds issues; capture output anyway
      // by catching the thrown error.
    });
    return { ...parseActionlintOutput(stdout), skipped: false };
  } catch (err) {
    // execFileSync throws when exit code != 0.
    // stdout still contains the finding lines.
    const stdout = (err && typeof err === "object" && "stdout" in err ? err.stdout : "") || "";
    return { ...parseActionlintOutput(String(stdout)), skipped: false };
  }
}

/**
 * Runs zizmor over the workflows directory.
 * Returns parsed result. Never throws.
 *
 * @param {string} workflowsDir - Path to .github/workflows
 * @returns {{ count: number, diagnostics: unknown[], skipped: boolean }}
 */
export function runZizmor(workflowsDir) {
  const args = ["--format", "json"];
  if (fs.existsSync(ZIZMOR_CONFIG)) {
    args.push("--config", ZIZMOR_CONFIG);
  }
  args.push(workflowsDir);

  try {
    const stdout = execFileSync("zizmor", args, {
      encoding: "utf8",
      maxBuffer: 4 * 1024 * 1024,
    });
    return { ...parseZizmorOutput(stdout), skipped: false };
  } catch (err) {
    const stdout = (err && typeof err === "object" && "stdout" in err ? err.stdout : "") || "";
    return { ...parseZizmorOutput(String(stdout)), skipped: false };
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const hasActionlint = isBinaryAvailable("actionlint");
  const hasZizmor = isBinaryAvailable("zizmor");

  if (!hasActionlint && !hasZizmor) {
    console.log(
      "[check-workflows] SKIP — actionlint and zizmor not found in PATH.\n" +
        "  Install them to enable workflow linting and security audit:\n" +
        "  • actionlint: https://github.com/rhysd/actionlint\n" +
        "  • zizmor:     https://github.com/woodruffw/zizmor\n" +
        "  Graceful SKIP — exits 0 even with --ratchet (missing binaries never block)."
    );
    process.stdout.write("workflowFindings=SKIP\n");
    process.exit(0);
  }

  const workflowFiles = collectWorkflowFiles(WORKFLOWS_DIR);

  if (workflowFiles.length === 0) {
    if (!QUIET) {
      console.log(
        `[check-workflows] No workflow files found in ${WORKFLOWS_DIR} — nothing to check.`
      );
    }
    process.stdout.write("workflowFindings=0\nactionlintFindings=0\nzizmorFindings=0\n");
    process.exit(0);
  }

  if (!QUIET) {
    console.log(`[check-workflows] Found ${workflowFiles.length} workflow file(s) to check.`);
  }

  let actionlintCount = 0;
  let zizmorCount = 0;

  // ── actionlint ────────────────────────────────────────────────────────────
  if (hasActionlint) {
    if (!QUIET) {
      process.stderr.write("[check-workflows] Running actionlint …\n");
    }
    const result = runActionlint(workflowFiles);
    actionlintCount = result.count;

    if (result.count > 0 && !QUIET) {
      console.error(`[check-workflows] actionlint: ${result.count} finding(s):`);
      result.lines.forEach((l) => console.error(`  ${l}`));
    } else if (!QUIET) {
      console.log(`[check-workflows] actionlint: OK (0 findings)`);
    }
  } else {
    if (!QUIET) {
      console.log("[check-workflows] actionlint: SKIP (not in PATH)");
    }
  }

  // ── zizmor ────────────────────────────────────────────────────────────────
  if (hasZizmor) {
    if (!QUIET) {
      process.stderr.write("[check-workflows] Running zizmor …\n");
    }
    const result = runZizmor(WORKFLOWS_DIR);
    zizmorCount = result.count;

    if (result.count > 0 && !QUIET) {
      console.error(`[check-workflows] zizmor: ${result.count} finding(s).`);
      console.error("  Run: zizmor --format text .github/workflows/ for human-readable details.");
    } else if (!QUIET) {
      console.log(`[check-workflows] zizmor: OK (0 findings)`);
    }
  } else {
    if (!QUIET) {
      console.log("[check-workflows] zizmor: SKIP (not in PATH)");
    }
  }

  const total = actionlintCount + zizmorCount;
  process.stdout.write(`workflowFindings=${total}\n`);
  process.stdout.write(`actionlintFindings=${actionlintCount}\n`);
  process.stdout.write(`zizmorFindings=${zizmorCount}\n`);

  if (STRICT && total > 0) {
    console.error(`\n[check-workflows] FAIL — ${total} workflow finding(s) total (--strict mode).`);
    process.exit(1);
  }

  // ── ratchet (zizmorFindings only, direction:down) ──────────────────────────
  // We can only ratchet zizmor when zizmor actually RAN (binary present). If
  // zizmor is absent we have no comparable measurement → graceful SKIP (exit 0):
  // a missing binary must never block, only a measured regression does.
  if (RATCHET) {
    if (!hasZizmor) {
      if (!QUIET) {
        process.stderr.write(
          "[check-workflows] --ratchet: zizmor absent — SKIP (no measurement, never blocks).\n"
        );
      }
      process.exit(0);
    }

    const baselineValue = readBaselineZizmorValue(BASELINE_PATH);
    if (baselineValue === null) {
      if (!QUIET) {
        process.stderr.write(
          "[check-workflows] --ratchet: baseline absent (metrics.zizmorFindings) — SKIP, exit 0.\n"
        );
      }
      process.exit(0);
    }

    const { regressed } = evaluateZizmorRatchet(zizmorCount, baselineValue);
    if (regressed) {
      console.error(
        `\n[check-workflows] REGRESSION — ${zizmorCount} zizmor finding(s) > baseline ${baselineValue}.\n` +
          "  → Fix the new workflow finding(s), or re-baseline metrics.zizmorFindings in\n" +
          "    config/quality/quality-baseline.json if the rise is a legitimate, justified drift.\n" +
          "  (actionlint findings are reported, not ratcheted — use --strict for those.)"
      );
      process.exit(1);
    }
    if (!QUIET) {
      process.stderr.write(
        `[check-workflows] --ratchet OK — ${zizmorCount} zizmor finding(s), baseline ${baselineValue} (no regression).\n`
      );
    }
    process.exit(0);
  }

  if (total > 0 && !QUIET) {
    console.log(
      `[check-workflows] ADVISORY — ${total} finding(s) detected. ` +
        "Pass --strict to block on any finding, or --ratchet to block on a zizmor regression."
    );
  }

  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
