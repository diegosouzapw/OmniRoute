#!/usr/bin/env node
// scripts/quality/validate-release-green.mjs
//
// "Release-green" pre-flight validator (Solution C).
//
// WHY: the full gate (ci.yml — unit shards, vitest, ratchets, package-artifact)
// runs ONLY on the release PR (PR → main). PRs into release/** only get the
// fast-gates (quality.yml: TIA-impacted tests + typecheck + lint checks). So
// reds accumulate silently on the release branch and explode — in layers — at
// release time. This script reproduces the release-equivalent validation against
// the CURRENT working tree so the maintainer (or the nightly, Solution D) can see
// the real state of the release branch at any time.
//
// DESIGN — never blocking to contributors:
//   • HARD checks (typecheck, lint errors, db-rules, public-creds, docs-all,
//     unit, vitest, integration, optionally package-artifact) → a failure here is
//     a real defect; exit 1.
//   • DRIFT checks (eslint WARNINGS, cognitive-complexity, file-size, cyclomatic
//     complexity, dead-code, type-coverage, compression-budget, openapi-coverage,
//     workflow-lint/zizmor, codeql-ratchet) → ratchet drift accrued across the
//     cycle is NOT a contributor's fault; it is reported and rebaselined by the
//     maintainer at release. Drift NEVER changes the exit code, so wiring this as
//     a check can never block anyone on drift.
//
// COMPLETENESS: this mirrors the FULL release-PR gate set (quality-gate +
// quality-extended + docs-sync-strict + integration), not a subset — and reports
// EVERY red in one pass (the report is collected, not fail-fast), so the release
// PR is green on its first CI run instead of revealing reds in ~40-min layers. The
// only release-PR gates it cannot reproduce locally are GitHub-side CodeQL semantic
// analysis and SonarQube/SonarCloud (external services).
//
// This script DIAGNOSES + REPORTS only (no auto-fix). The fix-to-green
// orchestration lives in the /green-prs + review-prs flows that call it.
//
// Usage:
//   node scripts/quality/validate-release-green.mjs [--json] [--with-build] [--quick] [--hermetic]
//     --json        emit machine-readable JSON to stdout (report goes to stderr)
//     --with-build  also run check:pack-artifact (needs a dist/ build — slow)
//     --quick       skip the slow unit + vitest + integration suites (drift + fast
//                   gates only)
//     --hermetic    scrub OMNIROUTE_API_KEY/OMNIROUTE_URL from gate env so live
//                   tests self-skip exactly like CI (dev machines otherwise run
//                   them against localhost and produce false-positive reds)
//
// Per-gate output is saved to _artifacts/release-green/<gate>.log (gitignored) —
// diagnose a red from the file instead of re-running the gate.

import { execFile, execFileSync } from "node:child_process";
import { promisify } from "node:util";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

// Per-gate captured output. execFileSync buffers everything and the report only
// shows a one-line summary, so without these files every red requires RE-RUNNING
// the gate just to see the detail (the dominant cost of the 2026-07-05 pre-flight).
const LOG_DIR = join(ROOT, "_artifacts", "release-green");
function saveGateLog(id, out) {
  try {
    mkdirSync(LOG_DIR, { recursive: true });
    writeFileSync(join(LOG_DIR, `${id}.log`), String(out ?? ""));
  } catch {
    /* log persistence is best-effort — never fails a gate */
  }
}

// ─── Pure helpers (exported for tests) ──────────────────────────────────────

/** Read the committed ratchet baseline value for a metric (null if unknown). */
export function baselineValue(metric, root = ROOT) {
  try {
    const raw = JSON.parse(
      readFileSync(join(root, "config/quality/quality-baseline.json"), "utf8")
    );
    const metrics = raw.metrics || raw;
    const v = metrics?.[metric]?.value;
    return typeof v === "number" ? v : null;
  } catch {
    return null;
  }
}

/** Best-effort "first meaningful failure line" from captured command output. */
export function firstFailureLine(out) {
  const lines = String(out || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const hit = lines.find((l) => /✖|not ok|AssertionError|error TS|FAIL|Error:|REGRESS/i.test(l));
  return (hit || lines[lines.length - 1] || "failed").slice(0, 200);
}

/** Sum {errorCount,warningCount} across an eslint --format json result array. */
export function eslintCounts(parsed) {
  let errors = 0;
  let warnings = 0;
  for (const f of parsed || []) {
    errors += f.errorCount || 0;
    warnings += f.warningCount || 0;
  }
  return { errors, warnings };
}

/** Parse the eslint JSON array out of mixed stdout (tolerates a leading banner). */
export function parseEslintJson(out) {
  const start = String(out || "").indexOf("[");
  if (start < 0) return null;
  try {
    return JSON.parse(String(out).slice(start));
  } catch {
    return null;
  }
}

/** Pull the cognitive-complexity violation count from the gate's output. */
export function parseCognitiveCount(out) {
  const m = String(out || "").match(/(\d+)\s+(?:function\(s\) exceed|violações|violations)/i);
  return m ? Number(m[1]) : null;
}

/**
 * Drift verdict for a ratchet: a metric that grew past its committed baseline is
 * "drift" (reported, never blocking). `direction:"down"` metrics (warnings,
 * complexity, file-size counts) regress when current > baseline.
 */
export function isDrift(current, baseline) {
  if (typeof current !== "number" || typeof baseline !== "number") return false;
  return current > baseline;
}

/** releaseGreen iff there are zero failing HARD checks (drift never blocks). */
export function computeVerdict(results) {
  const hardFailures = results.filter((r) => r.kind === "hard" && !r.ok);
  const drift = results.filter((r) => r.kind === "drift" && !r.ok);
  return { releaseGreen: hardFailures.length === 0, hardFailures, drift };
}

// ─── Orchestration (only when run directly) ─────────────────────────────────

/**
 * Map a thrown `execFileSync` error to a {code, out} gate result. Exported as a pure helper
 * so the timeout/hang path has a regression test: a gate that exceeds its ceiling (e.g. the unit
 * suite wedged on an unreleased SQLite handle — see CLAUDE.md "Database Handles in Tests") is
 * killed by `execFileSync` (`err.killed === true`) and MUST surface as a visible non-zero gate,
 * never an infinite block that the release captain mistakes for a hang and kills the pre-flight.
 */
export function classifyRunError(err, timeoutMs) {
  if (err && err.killed && timeoutMs) {
    return {
      code: 124,
      out: `gate exceeded its ${Math.round(timeoutMs / 1000)}s ceiling and was killed — treat as a hung/failed gate (e.g. an unreleased DB handle in the unit suite); does NOT pass`,
    };
  }
  return {
    code: typeof err?.status === "number" ? err.status : 1,
    out: `${err?.stdout || ""}${err?.stderr || ""}`,
  };
}

// --hermetic: scrub the live-test trigger vars so the pre-flight behaves like CI
// (a dev machine with OMNIROUTE_API_KEY set runs 17+ live tests that CI skips —
// every one a false-positive red against the release branch).
const HERMETIC_SCRUB = ["OMNIROUTE_API_KEY", "OMNIROUTE_URL"];
let hermetic = false;
function buildGateEnv(extra) {
  const env = { ...process.env, FORCE_COLOR: "0", ...(extra || {}) };
  if (hermetic) for (const k of HERMETIC_SCRUB) delete env[k];
  return env;
}

function run(cmd, cmdArgs, opts = {}) {
  try {
    const out = execFileSync(cmd, cmdArgs, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 256 * 1024 * 1024,
      env: buildGateEnv(opts.env),
      // A hard ceiling for the long, silent test suites (execFileSync buffers all output until
      // exit, so they show no progress while running). undefined = no timeout for fast gates.
      ...(opts.timeout ? { timeout: opts.timeout } : {}),
    });
    return { code: 0, out };
  } catch (err) {
    return classifyRunError(err, opts.timeout);
  }
}

const execFileAsync = promisify(execFile);

// Async twin of run() — same {code, out} contract, so the slow suites (unit /
// vitest / integration / pack-artifact) can run CONCURRENTLY instead of in
// series. Sequentially they dominate the pre-flight wall time (~2h in the
// v3.8.45 run); they are independent processes with per-process DATA_DIR
// isolation, so overlapping them cuts the pre-flight to ~the slowest single one.
async function runAsync(cmd, cmdArgs, opts = {}) {
  try {
    const { stdout, stderr } = await execFileAsync(cmd, cmdArgs, {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 256 * 1024 * 1024,
      env: buildGateEnv(opts.env),
      ...(opts.timeout ? { timeout: opts.timeout } : {}),
    });
    return { code: 0, out: `${stdout || ""}${stderr || ""}` };
  } catch (err) {
    return classifyRunError(err, opts.timeout);
  }
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const JSON_OUT = args.has("--json");
  const WITH_BUILD = args.has("--with-build");
  const QUICK = args.has("--quick");
  hermetic = args.has("--hermetic");

  const results = [];
  const record = (r) => {
    results.push(r);
    const icon = r.ok ? "✅" : r.kind === "drift" ? "🟡" : "❌";
    process.stderr.write(`${icon} [${r.kind}] ${r.label}${r.detail ? ` — ${r.detail}` : ""}\n`);
  };

  // Announce a gate BEFORE running it. The long suites (unit/vitest/integration) run silently
  // for many minutes (execFileSync buffers their output until exit), which previously looked like
  // a hang and got the pre-flight killed before it surfaced the unit reds (the v3.8.42 miss).
  const announce = (label) => process.stderr.write(`▶ ${label}…\n`);

  const hardCmd = (id, label, cmd, cmdArgs, opts) => {
    announce(label);
    const { code, out } = run(cmd, cmdArgs, opts);
    saveGateLog(id, out);
    record({
      id,
      label,
      kind: "hard",
      ok: code === 0,
      detail: code === 0 ? "pass" : firstFailureLine(out),
    });
  };

  // A ratchet command (check:complexity, check:dead-code, …) exits 1 ONLY on a
  // measured regression and self-skips (exit 0) when its tooling is absent — so a
  // non-zero exit here is drift to rebaseline at release, never a contributor block.
  // ALL checks run regardless of earlier failures (the report is collected, not
  // fail-fast) so one pass surfaces every red instead of revealing them in layers.
  const driftCmd = (id, label, cmd, cmdArgs, okDetail = "within baseline", opts) => {
    announce(label);
    const { code, out } = run(cmd, cmdArgs, opts);
    saveGateLog(id, out);
    record({
      id,
      label,
      kind: "drift",
      ok: code === 0,
      detail: code === 0 ? okDetail : firstFailureLine(out),
    });
  };

  process.stderr.write("🔎 Release-green validation (current working tree)\n\n");

  hardCmd("typecheck", "Typecheck (core)", npmCmd, ["run", "typecheck:core"]);

  // ESLint: ONE pass → errors (hard) + warnings (drift)
  {
    announce("ESLint (errors + warnings — ~5-15min)");
    // Suppressions-aware, matching `npm run lint` (Pacote 4 no-new-warnings): the frozen
    // pre-existing debt in config/quality/eslint-suppressions.json must not count as
    // errors here — only NET-NEW violations are release reds. Timeout raised: a full
    // repo pass takes ~14min alone and this pre-flight often runs alongside test suites.
    const { out } = run(
      "npx",
      [
        "eslint",
        ".",
        "--format",
        "json",
        "--suppressions-location",
        "config/quality/eslint-suppressions.json",
      ],
      { timeout: 30 * 60 * 1000 }
    );
    saveGateLog("lint", out);
    const parsed = parseEslintJson(out);
    if (!parsed) {
      record({
        id: "lint",
        label: "ESLint",
        kind: "hard",
        ok: false,
        detail: "could not parse eslint json",
      });
    } else {
      const { errors, warnings } = eslintCounts(parsed);
      record({
        id: "lint-errors",
        label: "ESLint errors",
        kind: "hard",
        ok: errors === 0,
        detail: `${errors} error(s)`,
      });
      const base = baselineValue("eslintWarnings");
      const over = isDrift(warnings, base);
      record({
        id: "eslint-warnings",
        label: "ESLint warnings (ratchet)",
        kind: "drift",
        ok: !over,
        detail:
          base == null
            ? `${warnings} (no baseline)`
            : `${warnings} vs baseline ${base}${over ? ` (+${warnings - base} drift → rebaseline at release)` : ""}`,
      });
    }
  }

  hardCmd("db-rules", "DB rules", npmCmd, ["run", "check:db-rules"]);
  hardCmd("public-creds", "Public creds", npmCmd, ["run", "check:public-creds"]);

  // Cognitive-complexity (drift)
  {
    announce("Cognitive complexity (ratchet)");
    const { out } = run(npmCmd, ["run", "check:cognitive-complexity"]);
    saveGateLog("cognitive", out);
    const current = parseCognitiveCount(out);
    const base = baselineValue("cognitiveComplexity");
    const over = isDrift(current, base);
    record({
      id: "cognitive-complexity",
      label: "Cognitive complexity (ratchet)",
      kind: "drift",
      ok: !over,
      detail:
        current == null
          ? "could not parse count"
          : `${current} vs baseline ${base}${over ? ` (+${current - base} drift → rebaseline at release)` : ""}`,
    });
  }

  // file-size (drift)
  {
    const { code, out } = run(npmCmd, ["run", "check:file-size"]);
    record({
      id: "file-size",
      label: "File-size ratchet",
      kind: "drift",
      ok: code === 0,
      detail: code === 0 ? "within frozen caps" : firstFailureLine(out),
    });
  }

  // test-masking (hard) — a PR-context gate: it only runs on the release PR (PR→main) in CI, so
  // net-assert reductions accrue unseen on release/** and explode on the release PR. Reproduce it
  // here against origin/main so a non-allowlisted reduction surfaces in the pre-flight, not in a
  // ~40-min CI layer (v3.8.43 cost 3 such round-trips). Legitimate reductions get allowlisted in
  // config/quality/test-masking-allowlist.json; tautology/skip/deletion signals are never allowlistable.
  if (!QUICK) {
    announce("Test-masking (weakened-assert guard vs main)");
    // best-effort fetch so the merge-base diff is accurate; ignore fetch failure (offline pre-flight)
    run("git", ["fetch", "--no-tags", "origin", "main", "--depth=200"], { timeout: 60 * 1000 });
    const { code, out } = run(npmCmd, ["run", "check:test-masking"], {
      env: { GITHUB_BASE_REF: "main" },
    });
    saveGateLog("test-masking", out);
    record({
      id: "test-masking",
      label: "Test-masking (weakened-assert guard)",
      kind: "hard",
      ok: code === 0,
      detail: code === 0 ? "no weakening" : firstFailureLine(out),
    });
  }

  // Remaining quality-gate / quality-extended ratchets that the PR→release
  // fast-gates skip and that historically surfaced — one at a time, because the
  // CI Quality Ratchet job is fail-fast — only on the release PR. Running them all
  // here (drift, never blocking) means a single rebaseline pass at release.
  driftCmd("complexity", "Cyclomatic complexity (ratchet)", npmCmd, ["run", "check:complexity"]);
  driftCmd("dead-code", "Dead-code (ratchet)", npmCmd, ["run", "check:dead-code"]);
  driftCmd("type-coverage", "Type coverage (ratchet)", npmCmd, ["run", "check:type-coverage"]);
  driftCmd("compression-budget", "Compression budget (ratchet)", npmCmd, [
    "run",
    "check:compression-budget",
  ]);
  driftCmd("openapi-coverage", "OpenAPI route coverage (ratchet)", npmCmd, [
    "run",
    "check:openapi-coverage",
  ]);
  driftCmd("workflow-lint", "Workflow lint (zizmor ratchet)", npmCmd, [
    "run",
    "check:workflows",
    "--",
    "--ratchet",
  ]);
  driftCmd("codeql-ratchet", "CodeQL alerts (ratchet)", npmCmd, ["run", "check:codeql-ratchet"]);

  // Docs sync + fabricated-docs (strict) is a real-defect gate (invented env vars /
  // routes, i18n mirror drift) — HARD.
  hardCmd("docs-all", "Docs sync + fabricated-docs (strict)", npmCmd, ["run", "check:docs-all"]);

  if (!QUICK) {
    // These are the gates that catch inherited base-red tests from cycle PRs (the fast-path
    // PR→release does NOT run unit/vitest/integration per-PR — the v3.8.42 release PR exploded
    // with 15 such reds). They run SILENTLY for many minutes; the announce line above + these
    // hard ceilings keep a long-but-healthy run from being mistaken for a hang (the ceiling also
    // converts a genuine DB-handle hang into a visible failure instead of an infinite block).
    // The slow suites are INDEPENDENT processes (each self-isolates DATA_DIR) with
    // no shared state, so they run CONCURRENTLY — the pre-flight wall time becomes
    // ~the slowest single suite instead of their sum (unit ~25-35min + vitest
    // ~3-8min + integration ~3-10min + pack-artifact ~15min was ~1h serial in the
    // v3.8.45 run). pack-artifact (--with-build) joins the same wave. Integration
    // runs ONLY on the release PR full CI, so a regression here is invisible until
    // release — that is why it is a HARD pre-flight gate.
    const slow = [
      {
        id: "unit",
        label: "Unit tests (full suite, CI concurrency — runs ~20-35min silently)",
        args: ["run", "test:unit:ci"],
        timeout: 45 * 60 * 1000,
      },
      {
        id: "vitest",
        label: "Vitest (MCP / autoCombo / cache — ~3-8min)",
        args: ["run", "test:vitest"],
        timeout: 15 * 60 * 1000,
      },
      {
        id: "integration",
        label: "Integration tests (~3-10min)",
        args: ["run", "test:integration"],
        timeout: 20 * 60 * 1000,
      },
    ];
    if (WITH_BUILD) {
      slow.push({
        id: "pack-artifact",
        label: "Package artifact (npm pack policy)",
        args: ["run", "check:pack-artifact"],
        timeout: 20 * 60 * 1000,
      });
    }
    slow.forEach((g) => announce(`${g.label} [parallel]`));
    const slowResults = await Promise.all(
      slow.map((g) => runAsync(npmCmd, g.args, { timeout: g.timeout }))
    );
    slow.forEach((g, i) => {
      const { code, out } = slowResults[i];
      saveGateLog(g.id, out);
      record({
        id: g.id,
        label: g.label,
        kind: "hard",
        ok: code === 0,
        detail: code === 0 ? "pass" : firstFailureLine(out),
      });
    });
  } else if (WITH_BUILD) {
    // --with-build without the suites (--quick): still verify the package artifact.
    const { code, out } = await runAsync(npmCmd, ["run", "check:pack-artifact"], {
      timeout: 20 * 60 * 1000,
    });
    saveGateLog("pack-artifact", out);
    record({
      id: "pack-artifact",
      label: "Package artifact (npm pack policy)",
      kind: "hard",
      ok: code === 0,
      detail: code === 0 ? "pass" : firstFailureLine(out),
    });
  }

  const { releaseGreen, hardFailures, drift } = computeVerdict(results);

  process.stderr.write("\n──────── verdict ────────\n");
  process.stderr.write(`HARD failures (block — real defects): ${hardFailures.length}\n`);
  hardFailures.forEach((r) => process.stderr.write(`  ❌ ${r.label}: ${r.detail}\n`));
  process.stderr.write(`Ratchet drift (non-blocking — rebaseline at release): ${drift.length}\n`);
  drift.forEach((r) => process.stderr.write(`  🟡 ${r.label}: ${r.detail}\n`));
  process.stderr.write(
    releaseGreen
      ? "\n✅ RELEASE-GREEN (no hard failures). Any drift above is rebaselined at release, not a contributor concern.\n"
      : "\n❌ NOT release-green — hard failures must be fixed (in the originating PR branch, via co-authorship).\n"
  );

  if (JSON_OUT) {
    process.stdout.write(
      JSON.stringify(
        {
          releaseGreen,
          hardFailures: hardFailures.map((r) => ({ id: r.id, label: r.label, detail: r.detail })),
          drift: drift.map((r) => ({ id: r.id, label: r.label, detail: r.detail })),
          checks: results.map((r) => ({ id: r.id, kind: r.kind, ok: r.ok, detail: r.detail })),
        },
        null,
        2
      ) + "\n"
    );
  }

  process.exit(releaseGreen ? 0 : 1);
}

// Run only when invoked directly (so tests can import the pure helpers).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main();
}
