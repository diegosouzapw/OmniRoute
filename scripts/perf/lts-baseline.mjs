#!/usr/bin/env node
/**
 * perf:lts-baseline — reproducible performance baseline for the 3.9.0 LTS rail (3.8.56).
 *
 * Orchestrates the existing perf probes and writes ONE JSON document so two runs on the
 * SAME host can be diffed:
 *
 *   heapGrowth     npm run test:heap              SSE pipeline heap growth over 500 streams
 *   heapBody       npm run bench:heap-body --json retained heap per request (#7847 shape)
 *   routingEvents  npm run bench:routing-events   routing scoring + event-sink cost (µs/op)
 *   buildSeconds   npm run build:release          wall time of the release build (--with-build)
 *   serverBoot     spawn → first /api/health/ping 200 (only when a server is booted here)
 *   ttft           time-to-first-byte (response headers) per endpoint: median + p95 of
 *                  --runs requests after 3 discarded warmup requests
 *
 * Every measurement is `{ status: ok|skipped|failed, durationMs, summary, raw? }`. A failed
 * or skipped measurement is DATA, not a crash: the script still writes the report and
 * exits 0. Only a usage error (bad flag) exits non-zero.
 *
 * The full build is OFF by default (`--skip-build` is the default; `--with-build` opts in):
 * a shared/loaded dev box must not run `npm run build:release`. On an idle VPS / runner box,
 * run with `--with-build` so the build time is measured AND `dist/server.js` exists for TTFB.
 *
 * TTFB server: `--url <base>` benches an already-running server; otherwise, when
 * `dist/server.js` exists, `node bin/omniroute.mjs serve` boots that standalone bundle with
 * NODE_ENV=production on an ephemeral port; otherwise TTFB is `skipped` with the reason
 * (`serve` cannot run without a built bundle).
 *
 * Isolation: every child gets its own DATA_DIR under --data-dir (default: a fresh temp dir,
 * never the inherited DATA_DIR / ~/.omniroute), fake JWT/API-key secrets,
 * DISABLE_SQLITE_AUTO_BACKUP=true and no inherited OMNIROUTE_API_KEY. Children are spawned
 * with argument arrays (no shell) in their own process group, and are always killed.
 *
 * Usage:
 *   npm run perf:lts-baseline -- --runs 20 --out baseline.json --md > baseline.md
 *   npm run perf:lts-baseline -- --with-build --runs 50 --out baseline.json
 *   npm run perf:lts-baseline -- --url http://127.0.0.1:20128 --runs 50
 *
 * Docs: docs/ops/PERF_BASELINE.md. Linux/macOS (spawns `npm` without a shell).
 */
import { execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

export const DEFAULT_TTFB_ENDPOINTS = Object.freeze([
  "/api/health",
  "/v1/models",
  "/api/monitoring/health",
]);
export const WARMUP_REQUESTS = 3;
const DEFAULT_RUNS = 20;
const DEFAULT_HEAP_TIMEOUT_MS = 15 * 60_000;
const BENCH_TIMEOUT_MS = 10 * 60_000;
const BUILD_TIMEOUT_MS = 60 * 60_000;
const BOOT_DEADLINE_MS = 240_000;
const POLL_INTERVAL_MS = 1_000;
const MAX_CAPTURE_CHARS = 2_000_000;
const OUTPUT_TAIL_CHARS = 2_000;
const MIB = 1024 * 1024;
/** 1-minute load above this fraction of the CPU count marks the host as busy. */
const BUSY_LOAD_RATIO = 0.25;

const USAGE = `Usage: node scripts/perf/lts-baseline.mjs [flags]

  --skip-build            do not run build:release (DEFAULT — required on shared dev boxes)
  --with-build            run build:release and record its wall time (idle VPS/.113 only)
  --runs <n>              timed TTFB requests per endpoint, after ${WARMUP_REQUESTS} warmups (default ${DEFAULT_RUNS})
  --url <base>            bench an already-running server instead of booting one
  --out <path>            write the JSON report to <path>
  --md                    print a Markdown table to stdout (progress goes to stderr)
  --data-dir <path>       parent dir for the isolated per-measurement DATA_DIRs
  --heap-timeout-min <n>  abort test:heap after n minutes and mark it skipped (default 15)
  -h, --help              show this help`;

// ── statistics ───────────────────────────────────────────────────────────────

function sortedCopy(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("cannot summarize an empty sample set");
  }
  return [...values].sort((a, b) => a - b);
}

export function median(values) {
  const s = sortedCopy(values);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid];
}

/** Nearest-rank percentile: the smallest sample with at least p% of samples ≤ it. */
export function percentile(values, p) {
  const s = sortedCopy(values);
  const rank = Math.max(1, Math.ceil((p / 100) * s.length - 1e-9));
  return s[Math.min(rank, s.length) - 1];
}

const round2 = (n) => Math.round(n * 100) / 100;

export function summarizeSamples(samplesMs) {
  const s = sortedCopy(samplesMs);
  return {
    n: s.length,
    medianMs: round2(median(s)),
    p95Ms: round2(percentile(s, 95)),
    minMs: round2(s[0]),
    maxMs: round2(s[s.length - 1]),
  };
}

// ── flags ────────────────────────────────────────────────────────────────────

function requireValue(argv, i, flag) {
  const v = argv[i + 1];
  if (v === undefined || v.startsWith("--")) throw new Error(`${flag} requires a value`);
  return v;
}

function positiveInt(raw, flag) {
  const n = Number(raw);
  if (!Number.isInteger(n) || n <= 0) throw new Error(`${flag} must be a positive integer`);
  return n;
}

export function parseArgs(argv) {
  const out = {
    withBuild: false,
    runs: DEFAULT_RUNS,
    out: null,
    md: false,
    url: null,
    dataDir: null,
    heapTimeoutMs: DEFAULT_HEAP_TIMEOUT_MS,
    help: false,
  };
  let sawSkip = false;
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    switch (flag) {
      case "--skip-build":
        sawSkip = true;
        break;
      case "--with-build":
        out.withBuild = true;
        break;
      case "--runs":
        out.runs = positiveInt(requireValue(argv, i++, flag), flag);
        break;
      case "--out":
        out.out = requireValue(argv, i++, flag);
        break;
      case "--md":
        out.md = true;
        break;
      case "--url": {
        const raw = requireValue(argv, i++, flag);
        if (!/^https?:\/\/[^\s/]+/.test(raw)) throw new Error("--url must be an http(s) URL");
        out.url = raw.replace(/\/+$/, "");
        break;
      }
      case "--data-dir":
        out.dataDir = requireValue(argv, i++, flag);
        break;
      case "--heap-timeout-min":
        out.heapTimeoutMs = positiveInt(requireValue(argv, i++, flag), flag) * 60_000;
        break;
      case "-h":
      case "--help":
        out.help = true;
        break;
      default:
        throw new Error(`unknown flag: ${flag}`);
    }
  }
  if (sawSkip && out.withBuild) {
    throw new Error("--skip-build and --with-build are mutually exclusive");
  }
  return out;
}

// ── classification / report ──────────────────────────────────────────────────

/** A skip reason or a timeout is `skipped`; anything but a clean, parsed exit 0 is `failed`. */
export function classifyOutcome({ skippedReason, timedOut, exitCode, signal, error } = {}) {
  if (skippedReason) return "skipped";
  if (timedOut) return "skipped";
  if (error) return "failed";
  if (signal) return "failed";
  return exitCode === 0 ? "ok" : "failed";
}

function measurement(status, durationMs, summary, raw) {
  const m = { status, durationMs: Math.round(durationMs), summary };
  if (raw !== undefined) m.raw = raw;
  return m;
}

/** Host fingerprint for comparability — deliberately WITHOUT the hostname. */
export function hostInfo(osModule = os, nodeVersion = process.version) {
  return {
    cpuCount: osModule.cpus().length,
    totalMemMB: Math.round(osModule.totalmem() / MIB),
    loadAvg: osModule.loadavg().map(round2),
    nodeVersion,
  };
}

export function loadWarning(host) {
  const load1 = host?.loadAvg?.[0] ?? 0;
  const cpus = host?.cpuCount || 1;
  if (load1 <= cpus * BUSY_LOAD_RATIO) return null;
  return (
    `host busy: 1-min load ${load1} on ${cpus} CPUs (> ${BUSY_LOAD_RATIO * 100}%) — ` +
    "numbers are inflated; compare only with runs from the same host under similar load"
  );
}

export function buildReport({ generatedAt, host, gitSha, options, measurements }) {
  return { generatedAt, host, gitSha, options, measurements };
}

// ── output parsers ───────────────────────────────────────────────────────────

export function parseHeapGrowth(output) {
  const m = /\[heap\] growth=(-?\d+(?:\.\d+)?)MB/.exec(output ?? "");
  return m ? { growthMB: Number(m[1]) } : null;
}

export function parseHeapBody(output) {
  const text = output ?? "";
  const end = text.lastIndexOf("}");
  for (let i = text.indexOf("{"); i !== -1 && i < end; i = text.indexOf("{", i + 1)) {
    if (i > 0 && text[i - 1] !== "\n") continue; // the bench prints the document at line start
    try {
      const doc = JSON.parse(text.slice(i, end + 1));
      if (typeof doc?.wireBytes !== "number" || typeof doc?.perRequestBytes !== "number") {
        continue;
      }
      return {
        wireMiB: round2(doc.wireBytes / MIB),
        perRequestMiB: round2(doc.perRequestBytes / MIB),
        amplification: round2(doc.perRequestBytes / doc.wireBytes),
        concurrentEntryCloneMiB:
          typeof doc.concurrentEntryCloneBytes === "number"
            ? round2(doc.concurrentEntryCloneBytes / MIB)
            : null,
      };
    } catch {
      // not the JSON document — keep scanning
    }
  }
  return null;
}

const ROUTING_LINE =
  /^(.+?)\s+[\d,]+ ops in [\d.]+ms(?: \| ([\d.eE+-]+)µs\/op \| ([\d,]+) ops\/s| \(([\d.eE+-]+)µs\/op aggregate\))/;

export function parseRoutingEvents(output) {
  const scenarios = [];
  for (const line of (output ?? "").split("\n")) {
    const m = ROUTING_LINE.exec(line.trim());
    if (!m) continue;
    const us = Number(m[2] ?? m[4]);
    scenarios.push({
      name: m[1].trim(),
      usPerOp: Math.round(us * 1000) / 1000,
      opsPerSec: m[3] ? Number(m[3].replace(/,/g, "")) : null,
    });
  }
  return scenarios.length ? { scenarios } : null;
}

// ── server plan / env ────────────────────────────────────────────────────────

export function resolveServerPlan({ root, url, exists = fs.existsSync }) {
  if (url) return { mode: "external", baseUrl: url };
  const serverJs = path.join(root, "dist", "server.js");
  if (exists(serverJs)) return { mode: "tree", serverJs };
  return {
    mode: "unavailable",
    reason:
      "no dist/server.js — `omniroute serve` needs the built standalone bundle; " +
      "rerun with --with-build on an idle host, or pass --url <running server>",
  };
}

/** Child env: isolated DATA_DIR, fake secrets, no leaked API key from the operator shell. */
export function buildChildEnv(baseEnv, dataDir) {
  const env = { ...baseEnv };
  delete env.OMNIROUTE_API_KEY;
  return {
    ...env,
    DATA_DIR: dataDir,
    DISABLE_SQLITE_AUTO_BACKUP: "true",
    APP_LOG_TO_FILE: "false",
    JWT_SECRET: "lts-baseline-fake-jwt-secret-not-for-production-000",
    API_KEY_SECRET: "lts-baseline-fake-api-key-secret-not-for-prod-000",
    INITIAL_PASSWORD: "lts-baseline-fake-initial-password",
    REQUIRE_API_KEY: "false",
    OMNIROUTE_SKIP_SYSTEM_TRUST: "1",
  };
}

// ── command measurement ──────────────────────────────────────────────────────

function errorMessage(e) {
  return e instanceof Error ? e.message : String(e);
}

/**
 * Run one command through the injected runner and turn the result into a measurement.
 * `parse(output)` returns null when the output is unusable — that is `failed`, never `ok`.
 */
export async function measureCommand({ spec, runner, parse, summarize, skippedReason }) {
  if (skippedReason) return measurement("skipped", 0, skippedReason);
  let result;
  try {
    result = await runner(spec);
  } catch (e) {
    return measurement("failed", 0, `could not start: ${errorMessage(e)}`);
  }
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;
  const tail = output.slice(-OUTPUT_TAIL_CHARS);
  if (result.timedOut) {
    const minutes = round2((spec.timeoutMs ?? 0) / 60_000);
    return measurement("skipped", result.durationMs, `timed out after ${minutes} min (aborted)`, {
      outputTail: tail,
    });
  }
  const parsed = parse(output);
  const status = classifyOutcome({
    exitCode: result.exitCode,
    signal: result.signal,
    error: parsed === null ? new Error("unparseable output") : undefined,
  });
  if (status === "ok") {
    return measurement("ok", result.durationMs, summarize(parsed, result), parsed);
  }
  const why = result.signal
    ? `killed by ${result.signal}`
    : result.exitCode !== 0
      ? `exit ${result.exitCode}`
      : "could not parse output";
  const partial = parsed ? ` — ${summarize(parsed, result)}` : "";
  return measurement("failed", result.durationMs, `${why}${partial}`, {
    exitCode: result.exitCode,
    signal: result.signal,
    outputTail: tail,
  });
}

// ── TTFB ─────────────────────────────────────────────────────────────────────

/**
 * Sequential requests per endpoint. The sample is the time until `fetch` resolves, i.e.
 * until the response status line + headers arrive (≈ first byte); the body is then drained
 * so the keep-alive connection is reusable. Warmup requests are not timed.
 */
export async function measureTtfb({ baseUrl, endpoints, runs, warmup, fetchImpl, now }) {
  const results = {};
  for (const endpoint of endpoints) {
    const url = `${baseUrl}${endpoint}`;
    const samples = [];
    const statuses = new Set();
    let failure = null;
    for (let i = 0; i < warmup + runs && !failure; i++) {
      const timed = i >= warmup;
      const t0 = timed ? now() : 0;
      let res;
      try {
        res = await fetchImpl(url, { headers: { accept: "application/json" } });
      } catch (e) {
        failure = `request failed: ${errorMessage(e)}`;
        break;
      }
      const t1 = timed ? now() : 0;
      await res.arrayBuffer().catch(() => undefined);
      statuses.add(res.status);
      if (res.status < 200 || res.status >= 300) {
        failure = `HTTP ${res.status} (expected 2xx)`;
        break;
      }
      if (timed) samples.push(t1 - t0);
    }
    if (failure) {
      results[endpoint] = measurement("failed", 0, failure, { httpStatuses: [...statuses] });
      continue;
    }
    const s = summarizeSamples(samples);
    results[endpoint] = measurement(
      "ok",
      samples.reduce((a, b) => a + b, 0),
      `median ${s.medianMs} ms · p95 ${s.p95Ms} ms (n=${s.n})`,
      { ...s, httpStatuses: [...statuses] }
    );
  }
  return results;
}

// ── orchestration ────────────────────────────────────────────────────────────

const npmRun = (script, extra = []) => [
  "run",
  "--silent",
  script,
  ...(extra.length ? ["--", ...extra] : []),
];

function fmtMs(ms) {
  return ms >= 1000 ? `${round2(ms / 1000)} s` : `${round2(ms)} ms`;
}

/**
 * Runs every measurement in a fixed order and returns the report. All side effects come
 * from `deps` (runner, startServer, fetchImpl, clock, host, git sha) so the unit tests can
 * drive it with fakes.
 */
export async function runBaseline(options, deps) {
  const { root, dataDir, runner, exists, startServer, fetchImpl, now, log } = deps;
  const childEnv = (name) => buildChildEnv(deps.baseEnv ?? {}, path.join(dataDir, name));
  const measurements = {};

  log("buildSeconds: " + (options.withBuild ? "npm run build:release" : "skipped"));
  measurements.buildSeconds = await measureCommand({
    spec: {
      command: "npm",
      args: npmRun("build:release"),
      cwd: root,
      env: childEnv("build"),
      timeoutMs: BUILD_TIMEOUT_MS,
    },
    runner,
    parse: () => ({}),
    summarize: (_p, r) => `${(r.durationMs / 1000).toFixed(2)} s wall`,
    skippedReason: options.withBuild
      ? undefined
      : "build skipped (--skip-build default; run --with-build on an idle VPS/.113)",
  });

  log("heapGrowth: npm run test:heap");
  measurements.heapGrowth = await measureCommand({
    spec: {
      command: "npm",
      args: npmRun("test:heap"),
      cwd: root,
      env: childEnv("heap-growth"),
      timeoutMs: options.heapTimeoutMs,
    },
    runner,
    parse: parseHeapGrowth,
    summarize: (p) => `heap growth ${p.growthMB} MB after 500 SSE streams (ceiling 20 MB)`,
  });

  log("heapBody: npm run bench:heap-body -- --json");
  measurements.heapBody = await measureCommand({
    spec: {
      command: "npm",
      args: npmRun("bench:heap-body", ["--json"]),
      cwd: root,
      env: childEnv("heap-body"),
      timeoutMs: BENCH_TIMEOUT_MS,
    },
    runner,
    parse: parseHeapBody,
    summarize: (p) =>
      `${p.perRequestMiB} MiB retained per request for a ${p.wireMiB} MiB body ` +
      `(${p.amplification}x wire)`,
  });

  log("routingEvents: npm run bench:routing-events");
  measurements.routingEvents = await measureCommand({
    spec: {
      command: "npm",
      args: npmRun("bench:routing-events"),
      cwd: root,
      env: childEnv("routing-events"),
      timeoutMs: BENCH_TIMEOUT_MS,
    },
    runner,
    parse: parseRoutingEvents,
    summarize: (p) => p.scenarios.map((s) => `${s.name}: ${s.usPerOp} µs/op`).join("; "),
  });

  const plan = resolveServerPlan({ root, url: options.url, exists });
  const endpoints = DEFAULT_TTFB_ENDPOINTS;
  const allEndpoints = (status, summary) =>
    Object.fromEntries(endpoints.map((ep) => [ep, measurement(status, 0, summary)]));

  if (plan.mode === "unavailable") {
    log(`ttft: skipped — ${plan.reason}`);
    measurements.serverBoot = measurement("skipped", 0, plan.reason);
    measurements.ttft = allEndpoints("skipped", plan.reason);
  } else if (plan.mode === "external") {
    log(`ttft: benching ${plan.baseUrl}`);
    measurements.serverBoot = measurement("skipped", 0, "external server (--url): boot not timed");
    measurements.ttft = await measureTtfb({
      baseUrl: plan.baseUrl,
      endpoints,
      runs: options.runs,
      warmup: WARMUP_REQUESTS,
      fetchImpl,
      now,
    });
  } else {
    log("ttft: booting dist/server.js via `omniroute serve` (NODE_ENV=production)");
    let server = null;
    try {
      try {
        server = await startServer({ root, env: childEnv("server") });
      } catch (e) {
        const why = `server boot failed: ${errorMessage(e)}`;
        measurements.serverBoot = measurement("failed", 0, why);
        measurements.ttft = allEndpoints("failed", why);
      }
      if (server) {
        measurements.serverBoot = measurement(
          "ok",
          server.bootMs,
          `spawn → first /api/health/ping 200 in ${fmtMs(server.bootMs)}`
        );
        measurements.ttft = await measureTtfb({
          baseUrl: server.baseUrl,
          endpoints,
          runs: options.runs,
          warmup: WARMUP_REQUESTS,
          fetchImpl,
          now,
        });
      }
    } finally {
      if (server) await server.stop();
    }
  }

  return buildReport({
    generatedAt: deps.generatedAt,
    host: deps.host,
    gitSha: deps.gitSha,
    options: { runs: options.runs, withBuild: options.withBuild, url: options.url },
    measurements,
  });
}

// ── markdown ─────────────────────────────────────────────────────────────────

const cell = (s) =>
  String(s ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\n/g, " ");

export function renderMarkdown(report) {
  const { host } = report;
  const lines = [
    "# OmniRoute performance baseline",
    "",
    `- generated: ${report.generatedAt}`,
    `- git: \`${report.gitSha}\``,
    `- host: ${host.cpuCount} CPUs · ${host.totalMemMB} MB RAM · load ${host.loadAvg.join(" / ")} · node ${host.nodeVersion}`,
    `- options: runs=${report.options?.runs ?? "?"} · build=${report.options?.withBuild ? "yes" : "skipped"}`,
  ];
  const warning = loadWarning(host);
  if (warning) lines.push("", `> ⚠️ ${warning}`);
  lines.push("", "| measurement | status | duration | summary |", "| --- | --- | ---: | --- |");
  const { ttft, ...rest } = report.measurements ?? {};
  for (const [name, m] of Object.entries(rest)) {
    lines.push(`| ${name} | ${m.status} | ${fmtMs(m.durationMs)} | ${cell(m.summary)} |`);
  }
  for (const [endpoint, m] of Object.entries(ttft ?? {})) {
    lines.push(
      `| TTFB \`${endpoint}\` | ${m.status} | ${fmtMs(m.durationMs)} | ${cell(m.summary)} |`
    );
  }
  return lines.join("\n") + "\n";
}

// ── real side effects (not unit-tested; exercised by the real run) ───────────

function killGroup(child, signal) {
  try {
    process.kill(-child.pid, signal);
  } catch {
    /* group already gone */
  }
}

/** Default runner: spawn without a shell in its own process group, capture, time out. */
export function runCommand(spec) {
  return new Promise((resolve, reject) => {
    if (spec.env?.DATA_DIR) fs.mkdirSync(spec.env.DATA_DIR, { recursive: true });
    const started = performance.now();
    const child = spawn(spec.command, spec.args, {
      cwd: spec.cwd,
      env: spec.env,
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
    });
    let stdout = "";
    let stderr = "";
    const cap = (s) => (s.length > MAX_CAPTURE_CHARS ? s.slice(-MAX_CAPTURE_CHARS) : s);
    child.stdout.on("data", (d) => (stdout = cap(stdout + d)));
    child.stderr.on("data", (d) => (stderr = cap(stderr + d)));
    let timedOut = false;
    let hardKill = null;
    const timer = spec.timeoutMs
      ? setTimeout(() => {
          timedOut = true;
          killGroup(child, "SIGTERM");
          hardKill = setTimeout(() => killGroup(child, "SIGKILL"), 5_000);
        }, spec.timeoutMs)
      : null;
    child.once("error", (e) => {
      clearTimeout(timer);
      clearTimeout(hardKill);
      reject(e);
    });
    child.once("close", (exitCode, signal) => {
      clearTimeout(timer);
      clearTimeout(hardKill);
      // Reap any grandchild the npm wrapper left behind.
      killGroup(child, "SIGKILL");
      resolve({
        exitCode,
        signal,
        timedOut,
        stdout,
        stderr,
        durationMs: performance.now() - started,
      });
    });
  });
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.unref();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

const hasExited = (child) => child.exitCode !== null || child.signalCode !== null;

async function stopServerChild(child, graceMs = 30_000) {
  if (!child?.pid || hasExited(child)) return;
  const exited = new Promise((resolve) => child.once("exit", resolve));
  const wait = (ms) =>
    Promise.race([exited, new Promise((r) => setTimeout(r, ms).unref())]).then(() =>
      hasExited(child)
    );
  killGroup(child, "SIGTERM");
  if (await wait(graceMs)) return;
  killGroup(child, "SIGKILL");
  await wait(5_000);
}

/** Boot `omniroute serve` over the built bundle on an ephemeral port; poll until ready. */
export async function startTreeServer({ root, env }) {
  fs.mkdirSync(env.DATA_DIR, { recursive: true });
  const port = await getFreePort();
  const started = performance.now();
  const child = spawn(
    process.execPath,
    [path.join(root, "bin", "omniroute.mjs"), "serve", "--port", String(port), "--no-open"],
    {
      cwd: root,
      env: { ...env, NODE_ENV: "production", PORT: String(port) },
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
    }
  );
  let spawnError = null;
  child.once("error", (e) => (spawnError = e)); // e.g. ENOENT — never an unhandled crash
  let tail = "";
  const keep = (d) => (tail = (tail + d).slice(-OUTPUT_TAIL_CHARS));
  child.stdout.on("data", keep);
  child.stderr.on("data", keep);
  const baseUrl = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + BOOT_DEADLINE_MS;
  try {
    while (Date.now() < deadline) {
      if (spawnError) throw new Error(`could not spawn server: ${errorMessage(spawnError)}`);
      if (hasExited(child)) {
        throw new Error(`server exited (code ${child.exitCode}) before serving: ${tail.trim()}`);
      }
      try {
        const res = await fetch(`${baseUrl}/api/health/ping`);
        await res.arrayBuffer().catch(() => undefined);
        if (res.status === 200) {
          const bootMs = performance.now() - started;
          return { baseUrl, bootMs, stop: () => stopServerChild(child) };
        }
      } catch {
        // not listening yet
      }
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    }
    throw new Error(`no /api/health/ping 200 within ${BOOT_DEADLINE_MS / 1000}s`);
  } catch (e) {
    await stopServerChild(child);
    throw e;
  }
}

function readGitSha(root) {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (e) {
    console.error(`[lts-baseline] ${errorMessage(e)}\n\n${USAGE}`);
    process.exit(2);
  }
  if (options.help) {
    console.log(USAGE);
    return;
  }
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
  const ownsDataDir = !options.dataDir;
  const dataDir = options.dataDir
    ? path.resolve(options.dataDir)
    : fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lts-baseline-"));
  const log = (msg) => console.error(`[lts-baseline] ${msg}`);
  log(`root=${root} dataDir=${dataDir}`);
  const host = hostInfo();
  try {
    const report = await runBaseline(options, {
      root,
      dataDir,
      baseEnv: process.env,
      runner: runCommand,
      exists: fs.existsSync,
      startServer: startTreeServer,
      fetchImpl: fetch,
      now: () => performance.now(),
      host,
      gitSha: readGitSha(root),
      generatedAt: new Date().toISOString(),
      log,
    });
    const json = JSON.stringify(report, null, 2) + "\n";
    if (options.out) {
      fs.mkdirSync(path.dirname(path.resolve(options.out)), { recursive: true });
      fs.writeFileSync(options.out, json);
      log(`wrote ${options.out}`);
    }
    if (options.md) process.stdout.write(renderMarkdown(report));
    else if (!options.out) process.stdout.write(json);
  } finally {
    if (ownsDataDir) fs.rmSync(dataDir, { recursive: true, force: true });
  }
}

const isDirectRun =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  main().catch((e) => {
    console.error(`[lts-baseline] fatal: ${errorMessage(e)}`);
    process.exit(1);
  });
}
