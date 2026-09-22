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
// Execution contract:
//   Both scanners must complete and produce valid output. Missing tools, tool
//   failures, invalid reports or missing ratchet baselines are INCOMPLETE and
//   exit non-zero. They are not measured regressions or zero findings.
//
// Output (stdout, one line each):
//   workflowFindings=<n>   — total findings from both tools combined
//   actionlintFindings=<n> — findings from actionlint alone
//   zizmorFindings=<n>     — findings from zizmor alone
//
// Exit codes:
//   0  — completed measurement; no blocking finding / no ratchet regression
//   1  — gate failure: --strict + any finding, OR --ratchet + zizmorFindings
//        regression (measured > baseline), or incomplete execution
//
// Ratchet mode (--ratchet): reads metrics.zizmorFindings.value from
// config/quality/quality-baseline.json and rejects a MEASURED zizmor count that
// is GREATER than the baseline (real regression, direction:down).
// ONLY zizmorFindings is ratcheted; actionlint findings are REPORTED but NOT
// ratcheted (use the separate --strict all-or-nothing flag for those). Missing
// measurement blocks acceptance without being attributed to contributor code.
//
// Usage:
//   node scripts/check/check-workflows.mjs               # findings advisory; execution required
//   node scripts/check/check-workflows.mjs --strict      # fail on any finding
//   node scripts/check/check-workflows.mjs --ratchet     # fail on zizmor regression
//   node scripts/check/check-workflows.mjs --quiet       # suppress progress logs

import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { findProvenanceOnSelfHosted, formatProvenanceFinding } from "./lib/provenanceRunner.mjs";

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
  const result = spawnSync("sh", ["-c", 'command -v "$1"', "check-workflows", name], {
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
  if (lines.some((line) => !/^.+:\d+:\d+: .+\[[^\]]+\]$/.test(line))) {
    throw new Error("invalid actionlint one-line report");
  }
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
 * The command requests JSON. Empty, malformed or unknown output is not a report.
 *
 * @param {string} stdout - Raw stdout from zizmor --format json (or text)
 * @returns {{ count: number, diagnostics: unknown[] }}
 */
export function parseZizmorOutput(stdout) {
  let parsed;
  try {
    parsed = JSON.parse(stdout);
  } catch {
    throw new Error("invalid zizmor JSON report");
  }
  const diagnostics = Array.isArray(parsed) ? parsed : parsed?.diagnostics;
  if (
    !Array.isArray(diagnostics) ||
    diagnostics.some(
      (entry) =>
        !entry || typeof entry !== "object" || typeof (entry.ident ?? entry.id) !== "string"
    )
  )
    throw new Error("unknown zizmor report schema");
  return { count: diagnostics.length, diagnostics };
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
 * possible; the caller must block acceptance).
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
  if (!metric || !Number.isInteger(metric.value) || metric.value < 0) return null;
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
 * Exit 1 with findings is actionlint's documented lint result. Other execution
 * errors, or exit 1 without findings, cannot establish a measurement.
 *
 * @param {string[]} files - Absolute paths to workflow YAMLs
 * @returns {{ count: number, lines: string[], skipped: boolean }}
 */
export function runActionlint(files) {
  if (files.length === 0) {
    throw new Error("no workflow files to audit");
  }
  try {
    const stdout = execFileSync("actionlint", ["-oneline", ...files], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 120_000,
      // actionlint exits non-zero when it finds issues; capture output anyway
      // by catching the thrown error.
    });
    return { ...parseActionlintOutput(stdout), skipped: false };
  } catch (err) {
    const result = parseActionlintOutput(String(err?.stdout || ""));
    if (err?.status !== 1 || err?.signal || result.count === 0) {
      throw new Error("actionlint execution failed; no complete measurement");
    }
    return { ...result, skipped: false };
  }
}

/**
 * Runs zizmor over the workflows directory.
 * Tool failure remains distinct from security findings.
 *
 * @param {string} workflowsDir - Path to .github/workflows
 * @returns {{ count: number, diagnostics: unknown[], skipped: boolean }}
 */
/**
 * The zizmor version actually doing the auditing, or "unknown".
 *
 * Emitted next to the count because the two must be read together. The GitHub runner measured
 * 1 finding MORE than the devbox on the identical commit (190 vs 189) during the v3.8.49 cycle,
 * which cost a second rebaseline push: CI installed whatever PyPI served that day while the
 * devbox had an older build. A count without the version that produced it is not a
 * reproducible number, and rebaselining against it just moves the disagreement.
 */
export function zizmorVersion() {
  try {
    const version = execFileSync("zizmor", ["--version"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 5_000,
    }).trim();
    if (!/^zizmor \d+\.\d+\.\d+/.test(version)) throw new Error("unknown version");
    return version;
  } catch {
    throw new Error("cannot identify zizmor version");
  }
}

export function runZizmor(workflowsDir) {
  // Findings use exit 0; operational failures still use non-zero. The ratchet
  // below evaluates the parsed finding count, not the scanner's severity code.
  const args = ["--format", "json", "--no-exit-codes"];
  if (fs.existsSync(ZIZMOR_CONFIG)) {
    args.push("--config", ZIZMOR_CONFIG);
  }
  args.push(workflowsDir);

  let stdout;
  try {
    stdout = execFileSync("zizmor", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 120_000,
      maxBuffer: 4 * 1024 * 1024,
    });
  } catch {
    throw new Error("zizmor execution failed; no complete measurement");
  }
  return { ...parseZizmorOutput(stdout), skipped: false };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

/**
 * Hard rule (not a lint count): `--provenance` inside a job that runs on a
 * self-hosted runner. npm answers 422 at the registry, and in v3.8.50 that
 * answer only came after the tag, the GitHub Release and the Docker images were
 * already out. Blocks under --strict AND --ratchet (the CI mode); plain mode
 * reports it like everything else.
 * @param {string[]} files absolute workflow paths
 */
export function runProvenanceRunnerCheck(files) {
  const findings = [];
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    findings.push(...findProvenanceOnSelfHosted(text, path.relative(ROOT, file)));
  }
  return findings;
}

function main() {
  const hasActionlint = isBinaryAvailable("actionlint");
  const hasZizmor = isBinaryAvailable("zizmor");

  if (!hasActionlint || !hasZizmor) {
    throw new Error("both actionlint and zizmor must be installed before auditing workflows");
  }

  const baselineValue = RATCHET ? readBaselineZizmorValue(BASELINE_PATH) : null;
  if (RATCHET && baselineValue === null) throw new Error("ratchet baseline absent or invalid");
  const scannerVersion = zizmorVersion();

  const workflowFiles = collectWorkflowFiles(WORKFLOWS_DIR);

  if (workflowFiles.length === 0) {
    throw new Error("no workflow files discovered; measurement incomplete");
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

  const provenanceFindings = runProvenanceRunnerCheck(workflowFiles);
  if (provenanceFindings.length > 0) {
    console.error(
      `[check-workflows] provenance×self-hosted: ${provenanceFindings.length} finding(s) — HARD RULE:`
    );
    provenanceFindings.forEach((f) => console.error(`  ${formatProvenanceFinding(f)}`));
  } else if (!QUIET) {
    console.log("[check-workflows] provenance×self-hosted: OK (0 findings)");
  }

  const total = actionlintCount + zizmorCount;
  process.stdout.write("workflowAuditState=MEASURED\n");
  process.stdout.write(`workflowFindings=${total}\n`);
  process.stdout.write(`actionlintFindings=${actionlintCount}\n`);
  process.stdout.write(`zizmorFindings=${zizmorCount}\n`);
  // Read this line with the count above: a finding total is only reproducible against the
  // version that produced it. See zizmorVersion().
  process.stdout.write(`zizmorVersion=${scannerVersion}\n`);
  process.stdout.write(`provenanceRunnerFindings=${provenanceFindings.length}\n`);
  if ((STRICT || RATCHET) && provenanceFindings.length > 0) {
    console.error(
      `\n[check-workflows] FAIL — ${provenanceFindings.length} job(s) publish with --provenance from a self-hosted runner.\n` +
        "  npm rejects that with 422 at the registry. Move the upload step to a github-hosted job\n" +
        "  (see .github/workflows/npm-publish.yml `stage-npm` for the pattern)."
    );
    process.exit(1);
  }

  if (STRICT && total > 0) {
    console.error(`\n[check-workflows] FAIL — ${total} workflow finding(s) total (--strict mode).`);
    process.exit(1);
  }

  // ── ratchet (zizmorFindings only, direction:down) ──────────────────────────
  // Prerequisites and report validity were verified before emitting metrics.
  if (RATCHET) {
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

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    main();
  } catch (error) {
    console.error(`[check-workflows] INCOMPLETE — ${error.message}`);
    process.stdout.write("workflowAuditState=INCOMPLETE\nworkflowFindings=INCOMPLETE\n");
    process.exitCode = 1;
  }
}
