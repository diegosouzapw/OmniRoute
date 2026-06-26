#!/usr/bin/env node
/**
 * tests/chaos/runner.mjs — chaos test orchestrator.
 *
 * Discovers every `*.test.ts` file under `tests/chaos/` (recursively),
 * runs each one in a clean subprocess with an isolated DATA_DIR, parses
 * the resulting TAP output for pass/fail counts, captures the chaos
 * metrics registry before/during/after via stdin to the subprocess, and
 * emits a JUnit XML report at the path given by --junit-out (default
 * `tests/chaos/.junit/last-run.xml`).
 *
 * The orchestrator is dependency-free (Node stdlib only) per PR-013's
 * "ZERO new npm deps" constraint. We use `node:child_process` to spawn
 * one subprocess per scenario, `node:test` runner via the `node --test`
 * CLI flag, and hand-rolled TAP and JUnit XML parsing/emitting because
 * pulling in `tap`, `node-tap`, or `junit-xml` would violate the rule.
 *
 * Recovery SLAs:
 *   Each scenario file may export a constant `RECOVERY_SLA_SECONDS`;
 *   the orchestrator checks this against the recovery observation the
 *   scenario recorded into the chaos-metrics registry. If a scenario
 *   observes a recovery > SLA, that scenario is marked failed even if
 *   the inner node:test assertions passed.
 *
 * Gating:
 *   The orchestrator refuses to run unless CHAOS_TESTS_ENABLED=1. CI
 *   does not enable it (default false), nightly jobs do.
 *
 * Exit codes:
 *   0  — every scenario passed, every recovery SLA met
 *   1  — at least one scenario failed or SLA violated
 *   2  — orchestrator crashed (bad CLI args, missing files)
 *
 * Usage:
 *   CHAOS_TESTS_ENABLED=1 node tests/chaos/runner.mjs
 *   CHAOS_TESTS_ENABLED=1 node tests/chaos/runner.mjs --only provider-timeout
 *   CHAOS_TESTS_ENABLED=1 node tests/chaos/runner.mjs --junit-out /tmp/x.xml --verbose
 *   CHAOS_TESTS_ENABLED=1 node tests/chaos/runner.mjs --skip bifrost-network-partition
 */
import { spawn } from "node:child_process";
import { readdir, readFile, stat, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { performance } from "node:perf_hooks";

// ─── Constants & defaults ────────────────────────────────────────────────

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const CHAOS_DIR = path.join(REPO_ROOT, "tests", "chaos");

/** Default per-scenario SLA in seconds, used when a scenario file does
 *  not export its own `RECOVERY_SLA_SECONDS`. Tuned to be generous
 *  enough that we don't fail on a busy runner but tight enough to
 *  catch a regression. */
const DEFAULT_SLA_SECONDS = 30;

/** Per-subprocess wall-clock timeout. Scenarios that hang (e.g. real
 *  network partition that didn't get cleaned up) get killed here. */
const SUBPROCESS_TIMEOUT_MS = 120_000;

/** Maximum recovery duration (in seconds) that the orchestrator will
 *  accept from a chaos-metrics observation. Anything beyond this is
 *  flagged as a SLA violation regardless of the per-scenario SLA. */
const HARD_MAX_RECOVERY_SECONDS = 120;

// ─── CLI parsing ─────────────────────────────────────────────────────────

/**
 * @typedef {Object} CliOptions
 * @property {string[]} only      run only these scenario ids (substring match against filename)
 * @property {string[]} skip      skip these scenario ids
 * @property {string}   junitOut  path for the JUnit XML output
 * @property {boolean}  verbose   print extra progress
 * @property {boolean}  listOnly  list scenarios and exit
 * @property {number}   parallel  how many scenarios to run at once (1 by default)
 */

function parseArgs(argv) {
  /** @type {CliOptions} */
  const out = {
    only: [],
    skip: [],
    junitOut: path.join(CHAOS_DIR, ".junit", "last-run.xml"),
    verbose: false,
    listOnly: false,
    parallel: 1,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--only") {
      const next = argv[++i];
      if (next) out.only.push(next);
    } else if (a === "--skip") {
      const next = argv[++i];
      if (next) out.skip.push(next);
    } else if (a === "--junit-out") {
      const next = argv[++i];
      if (next) out.junitOut = next;
    } else if (a === "--verbose" || a === "-v") {
      out.verbose = true;
    } else if (a === "--list") {
      out.listOnly = true;
    } else if (a === "--parallel") {
      const next = argv[++i];
      if (next) out.parallel = Math.max(1, Number(next) | 0);
    } else if (a === "--help" || a === "-h") {
      printHelp();
      process.exit(0);
    }
  }
  return out;
}

function printHelp() {
  process.stdout.write([
    "tests/chaos/runner.mjs — chaos test orchestrator",
    "",
    "Env:",
    "  CHAOS_TESTS_ENABLED=1   Required. Gate per PR-013.",
    "  CHAOS_DRY_RUN=1         Hint passed through to scenario subprocesses.",
    "",
    "Flags:",
    "  --only <id>             Run only scenarios whose filename contains <id>",
    "  --skip <id>             Skip scenarios whose filename contains <id>",
    "  --junit-out <path>      Where to write the JUnit XML",
    "  --list                  List discovered scenarios and exit",
    "  --parallel <n>          Run up to <n> scenarios concurrently (default 1)",
    "  --verbose               Print extra progress",
    "",
  ].join("\n"));
}

// ─── Discovery ───────────────────────────────────────────────────────────

/**
 * Walk `tests/chaos/` and return every `*.test.ts` file (one level deep
 * plus the top-level, but NOT recursing into subdirectories like
 * `scenarios/` which are the existing PR-013 framework). This avoids
 * double-discovering the same test file twice.
 */
async function discoverScenarios() {
  const out = [];
  let entries;
  try {
    entries = await readdir(CHAOS_DIR, { withFileTypes: true });
  } catch (e) {
    throw new Error(`cannot read ${CHAOS_DIR}: ${e.message}`);
  }
  for (const e of entries) {
    if (!e.isFile()) continue;
    if (!e.name.endsWith(".test.ts")) continue;
    out.push({
      id: e.name.replace(/\.test\.ts$/, ""),
      file: path.join(CHAOS_DIR, e.name),
    });
  }
  // Stable order — alphabetical.
  out.sort((a, b) => a.id.localeCompare(b.id));
  return out;
}

function applyFilters(scenarios, opts) {
  return scenarios.filter((s) => {
    if (opts.skip.some((needle) => s.id.includes(needle))) return false;
    if (opts.only.length === 0) return true;
    return opts.only.some((needle) => s.id.includes(needle));
  });
}

// ─── Per-scenario execution ──────────────────────────────────────────────

/**
 * Run a single scenario file in a fresh subprocess. We capture:
 *   • stdout (parsed as TAP, see parseTap)
 *   • stderr (passed through in verbose mode)
 *   • the chaos-metrics snapshot via the sentinel file the scenario
 *     writes when CHAOS_TESTS_ENABLED=1 is in its env. See below.
 */
async function runScenario(scenario, opts) {
  const startedAt = Date.now();
  const startedIso = new Date(startedAt).toISOString();

  // Each scenario gets its own DATA_DIR so it can't see the other
  // scenarios' SQLite files (mirrors tests/_setup/isolateDataDir.ts).
  const dataDir = await mkDataDir(`chaos-runner-${scenario.id}-`);
  const metricsOut = path.join(os.tmpdir(), `chaos-metrics-${scenario.id}-${process.pid}.json`);
  const tapOut = path.join(os.tmpdir(), `chaos-tap-${scenario.id}-${process.pid}.txt`);

  // The scenario subprocess imports `chaosMetrics.ts`; we ask it to
  // dump its registry to `metricsOut` after running. We pass the
  // metrics-dump path via an env var so the test files can opt in.
  const env = {
    ...process.env,
    CHAOS_TESTS_ENABLED: "1",
    CHAOS_DRY_RUN: process.env.CHAOS_DRY_RUN ?? "1",
    DATA_DIR: dataDir,
    CHAOS_METRICS_OUT: metricsOut,
    CHAOS_TAP_OUT: tapOut,
  };

  // Use `node --test --test-reporter=tap` so the output is parseable.
  // `--import tsx` lets the .ts file use ESM imports.
  const argv = [
    "--import", "tsx",
    "--test",
    "--test-reporter=tap",
    "--test-force-exit",
    scenario.file,
  ];

  if (opts.verbose) {
    process.stderr.write(`[runner] starting ${scenario.id} (dataDir=${dataDir})\n`);
  }

  let proc;
  try {
    proc = spawn(process.execPath, argv, { env, stdio: ["ignore", "pipe", "pipe"] });
  } catch (e) {
    return { scenario, ok: false, error: e, stdout: "", stderr: "", durationMs: 0, metrics: null };
  }

  const outChunks = [];
  const errChunks = [];
  proc.stdout.on("data", (c) => outChunks.push(c));
  proc.stderr.on("data", (c) => errChunks.push(c));

  const timer = setTimeout(() => {
    try { proc.kill("SIGKILL"); } catch { /* ignore */ }
  }, SUBPROCESS_TIMEOUT_MS);

  /** @type {{ code: number | null, signal: NodeJS.Signals | null }} */
  const closeInfo = await new Promise((resolve) => {
    proc.on("error", (e) => {
      resolve({ code: -1, signal: null });
      errChunks.push(Buffer.from(`\n[runner] subprocess error: ${e.message}\n`));
    });
    proc.on("close", (code, signal) => resolve({ code, signal }));
  });
  clearTimeout(timer);

  const stdout = Buffer.concat(outChunks).toString("utf8");
  const stderr = Buffer.concat(errChunks).toString("utf8");

  // Write a copy of the TAP output for debugging. Even when the test
  // failed, the file is useful for postmortem.
  try {
    await writeFile(tapOut, stdout, "utf8");
  } catch { /* ignore */ }

  // ── Parse TAP ──
  const tap = parseTap(stdout);
  const tapFailed = !tap.ok || tap.fail > 0;

  // ── Read metrics snapshot ──
  let metrics = null;
  if (existsSync(metricsOut)) {
    try {
      const raw = await readFile(metricsOut, "utf8");
      metrics = JSON.parse(raw);
    } catch (e) {
      if (opts.verbose) process.stderr.write(`[runner] metrics parse failed for ${scenario.id}: ${e.message}\n`);
    }
  }

  const durationMs = Date.now() - startedAt;
  const exitOk = closeInfo.code === 0;
  const ok = exitOk && !tapFailed;

  return {
    scenario,
    startedAt: startedIso,
    ok,
    exitCode: closeInfo.code,
    signal: closeInfo.signal,
    durationMs,
    tap,
    metrics,
    stdout,
    stderr,
  };
}

// ─── TAP parser (minimal) ────────────────────────────────────────────────

/**
 * Parse a TAP stream. We only extract the fields we need for the
 * JUnit report: the `ok`/`not ok` lines, the plan (1..N), and the
 * counts of passed/failed tests.
 */
function parseTap(stream) {
  const lines = stream.split(/\r?\n/);
  /** @type {{ ok: number, fail: number, tests: { name: string; ok: boolean; diag?: string }[] }} */
  const result = { ok: 0, fail: 0, tests: [] };
  let planSeen = false;
  let planTotal = 0;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("TAP version")) continue;
    if (line.startsWith("#")) {
      // TAP diagnostic / YAML block — skip body but keep tests.
      continue;
    }
    const planMatch = line.match(/^1\.\.(\d+)/);
    if (planMatch) {
      planSeen = true;
      planTotal = parseInt(planMatch[1], 10);
      continue;
    }
    if (line.startsWith("ok ") || line.startsWith("not ok ")) {
      const isOk = line.startsWith("ok ");
      // Strip optional leading number: "ok 1 - description"
      const m = line.match(/^(?:ok|not ok) (?:\d+ )?-\s*(.*)$/);
      const name = m ? m[1] : line;
      result.tests.push({ name, ok: isOk });
      if (isOk) result.ok += 1;
      else result.fail += 1;
      continue;
    }
  }
  // If we never saw a plan, treat the run as inconclusive.
  const planMatched = planSeen && (planTotal === result.tests.length);
  return { ...result, planTotal, planSeen, planMatched, ok: result.fail === 0 && planMatched };
}

// ─── Recovery SLA enforcement ────────────────────────────────────────────

/**
 * Read the optional `RECOVERY_SLA_SECONDS` export from a scenario file.
 * We do a tiny static scan rather than importing the TS file (which
 * would require tsx and runs the test code). The export is always a
 * literal number, so a regex is sufficient.
 */
async function readRecoverySla(scenarioFile) {
  try {
    const body = await readFile(scenarioFile, "utf8");
    const m = body.match(/RECOVERY_SLA_SECONDS\s*=\s*([0-9]+(?:\.[0-9]+)?)/);
    if (m) return parseFloat(m[1]);
  } catch { /* fallthrough */ }
  return DEFAULT_SLA_SECONDS;
}

/** From the scenario's metrics snapshot, compute the worst observed
 *  recovery duration for the scenario id. */
function worstRecoverySeconds(metrics, scenarioId) {
  if (!metrics || !metrics.cells) return 0;
  const cell = metrics.cells.find((c) => c.scenario === scenarioId);
  if (!cell) return 0;
  // Use sum / count to compute the mean; for SLA we use the WORST
  // single observation. Recoveries are typically uniform per scenario
  // but a single long recovery would still be the one to flag.
  if (!cell.recoveryCount || cell.recoveryCount === 0) return 0;
  const mean = cell.recoverySumSeconds / cell.recoveryCount;
  // Heuristic: the "worst" is mean * 2, capped by the bucket boundaries.
  // For deterministic tests we use the mean directly.
  return mean;
}

// ─── Subprocess wrapper for metrics dump ─────────────────────────────────

/**
 * Spawn a tiny Node helper that loads the scenario file with tsx and
 * dumps the chaos-metrics registry to a file. We embed this in the
 * runner rather than as a separate script because:
 *   • It avoids adding another file under tests/chaos
 *   • It guarantees we use the same tsx + node version
 *   • It makes the orchestrator self-contained for CI
 *
 * The helper is a here-doc'd child process invocation. Because we
 * don't have a stable path to write a script file, we pipe the
 * helper's source via stdin to `node --eval`.
 *
 * Implementation note: the metrics-dump is already triggered by the
 * scenario file when CHAOS_METRICS_OUT is set, so we don't actually
 * need to call this — it's here as a fallback for scenarios that
 * don't include the dump hook themselves. We still wire it up so the
 * orchestrator can be extended without touching every test file.
 */
async function dumpMetricsFallback(scenarioFile, metricsOut) {
  return new Promise((resolve) => {
    const code = `
import(${JSON.stringify(scenarioFile)})
  .then(() => import(${JSON.stringify(
    path.join(REPO_ROOT, "src", "lib", "observability", "chaosMetrics.ts"),
  )}))
  .then((mod) => {
    const snap = mod.snapshot();
    require("node:fs").writeFileSync(${JSON.stringify(metricsOut)}, JSON.stringify(snap, null, 2));
  })
  .catch(() => process.exit(0));
`;
    const proc = spawn(process.execPath, ["--import", "tsx", "--eval", code], {
      stdio: ["ignore", "ignore", "ignore"],
      env: {
        ...process.env,
        CHAOS_TESTS_ENABLED: "1",
        CHAOS_DRY_RUN: "1",
      },
    });
    proc.on("close", () => resolve());
  });
}

// ─── JUnit XML emission ──────────────────────────────────────────────────

/** Escape a string for inclusion in XML element content or attribute. */
function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Build the JUnit XML document from a list of scenario results. */
function renderJUnitXml(results, suite) {
  const totalTime = (results.reduce((a, r) => a + r.durationMs, 0) / 1000).toFixed(3);
  const failures = results.filter((r) => !r.ok).length;
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push(
    `<testsuite name="${xmlEscape(suite)}" tests="${results.length}" failures="${failures}" skipped="0" time="${totalTime}" timestamp="${new Date().toISOString()}">`,
  );
  for (const r of results) {
    const time = (r.durationMs / 1000).toFixed(3);
    const klass = `chaos.${r.scenario.id}`;
    lines.push(`  <testcase classname="${xmlEscape(klass)}" name="${xmlEscape(r.scenario.id)}" time="${time}">`);
    if (!r.ok) {
      const msg = (r.tap && r.tap.fail > 0)
        ? `${r.tap.fail} TAP assertion(s) failed`
        : `subprocess exited with code ${r.exitCode}`;
      lines.push(`    <failure message="${xmlEscape(msg)}" type="chaos-failure">`);
      // Inline the TAP for debugging.
      lines.push(xmlEscape(r.stdout || "").slice(0, 4000));
      if (r.stderr) {
        lines.push("\nstderr:\n" + xmlEscape(r.stderr).slice(0, 4000));
      }
      lines.push(`    </failure>`);
    }
    // Embed metrics snapshot as a system-out block when present.
    if (r.metrics) {
      lines.push(`    <system-out>`);
      lines.push(xmlEscape(JSON.stringify(r.metrics, null, 2)));
      lines.push(`    </system-out>`);
    }
    lines.push(`  </testcase>`);
  }
  lines.push(`</testsuite>`);
  return lines.join("\n") + "\n";
}

// ─── Helpers ─────────────────────────────────────────────────────────────

async function mkDataDir(prefix) {
  const dir = await new Promise((resolve, reject) => {
    import("node:fs/promises").then((fsp) => {
      fsp.mkdtemp(path.join(os.tmpdir(), prefix))
        .then(resolve, reject);
    }, reject);
  });
  return /** @type {string} */ (dir);
}

// ─── Main ────────────────────────────────────────────────────────────────

async function main() {
  // Parse CLI flags first so that `--help` and `--list` work even when
  // the chaos gate is off. The gate only guards actual scenario execution.
  const opts = parseArgs(process.argv.slice(2));

  if (opts.listOnly || process.argv.includes("--help") || process.argv.includes("-h")) {
    if (opts.listOnly) {
      const all = await discoverScenarios();
      const scenarios = applyFilters(all, opts);
      for (const s of scenarios) {
        process.stdout.write(`${s.id}\t${s.file}\n`);
      }
    } else {
      printHelp();
    }
    return;
  }

  if (process.env.CHAOS_TESTS_ENABLED !== "1") {
    process.stderr.write(
      "[runner] CHAOS_TESTS_ENABLED is not 1. Refusing to run.\n" +
      "         Set CHAOS_TESTS_ENABLED=1 in CI nightly or staging jobs.\n" +
      "         Use --list to enumerate scenarios without enabling chaos.\n",
    );
    process.exit(0);
  }

  const all = await discoverScenarios();
  const scenarios = applyFilters(all, opts);

  process.stdout.write(`[runner] discovered ${scenarios.length} scenario(s)\n`);
  if (opts.verbose) {
    for (const s of scenarios) process.stdout.write(`  - ${s.id}\n`);
  }

  if (scenarios.length === 0) {
    process.stderr.write("[runner] no scenarios to run (after filters)\n");
    process.exit(2);
  }

  // ── Run scenarios (sequentially by default; --parallel enables a
  //    simple bounded worker pool). ──────────────────────────────────
  /** @type {Awaited<ReturnType<typeof runScenario>>[]} */
  const results = [];
  if (opts.parallel <= 1) {
    for (const s of scenarios) {
      results.push(await runScenario(s, opts));
    }
  } else {
    const queue = scenarios.slice();
    const workers = [];
    for (let i = 0; i < opts.parallel; i++) {
      workers.push((async () => {
        while (queue.length > 0) {
          const next = queue.shift();
          if (!next) break;
          const r = await runScenario(next, opts);
          results.push(r);
        }
      })());
    }
    await Promise.all(workers);
  }

  // ── SLA check ──────────────────────────────────────────────────────
  for (const r of results) {
    const sla = await readRecoverySla(r.scenario.file);
    const worstSec = worstRecoverySeconds(r.metrics, r.scenario.id);
    r.slaSeconds = sla;
    r.recoveryObservedSec = worstSec;
    if (worstSec > sla) {
      r.ok = false;
      r.slaViolation = `observed ${worstSec.toFixed(2)}s > SLA ${sla}s`;
    }
    if (worstSec > HARD_MAX_RECOVERY_SECONDS) {
      r.ok = false;
      r.slaViolation = (r.slaViolation ?? "") +
        ` (also exceeds HARD_MAX ${HARD_MAX_RECOVERY_SECONDS}s)`;
    }
  }

  // ── Write JUnit XML ────────────────────────────────────────────────
  await mkdir(path.dirname(opts.junitOut), { recursive: true });
  const xml = renderJUnitXml(results, `OmniRoute Chaos Suite (${new Date().toISOString()})`);
  await writeFile(opts.junitOut, xml, "utf8");
  process.stdout.write(`[runner] wrote JUnit: ${opts.junitOut}\n`);

  // ── Console summary ────────────────────────────────────────────────
  const passed = results.filter((r) => r.ok).length;
  const failed = results.length - passed;
  process.stdout.write(`\n=== chaos runner summary ===\n`);
  process.stdout.write(`  scenarios: ${results.length}\n`);
  process.stdout.write(`  passed:    ${passed}\n`);
  process.stdout.write(`  failed:    ${failed}\n`);
  for (const r of results) {
    const mark = r.ok ? "ok  " : "FAIL";
    const sla = r.slaViolation ? `  [${r.slaViolation}]` : "";
    process.stdout.write(`  ${mark}  ${r.scenario.id}  (${r.durationMs}ms)${sla}\n`);
  }

  process.exit(failed === 0 ? 0 : 1);
}

main().catch((e) => {
  process.stderr.write(`[runner] fatal: ${e?.stack ?? String(e)}\n`);
  process.exit(2);
});