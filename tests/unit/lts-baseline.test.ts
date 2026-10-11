import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_TTFB_ENDPOINTS,
  buildChildEnv,
  buildReport,
  classifyOutcome,
  hostInfo,
  loadWarning,
  measureCommand,
  measureTtfb,
  median,
  parseArgs,
  parseHeapBody,
  parseHeapGrowth,
  parseRoutingEvents,
  percentile,
  renderMarkdown,
  resolveServerPlan,
  runBaseline,
  summarizeSamples,
} from "../../scripts/perf/lts-baseline.mjs";

// ── statistics ──────────────────────────────────────────────────────────────

test("median handles odd, even and unsorted input", () => {
  assert.equal(median([3, 1, 2]), 2);
  assert.equal(median([4, 1, 3, 2]), 2.5);
  assert.equal(median([10]), 10);
});

test("median / percentile reject an empty sample set", () => {
  assert.throws(() => median([]), /empty/);
  assert.throws(() => percentile([], 95), /empty/);
});

test("percentile uses nearest-rank on the sorted samples", () => {
  const samples = Array.from({ length: 20 }, (_, i) => 20 - i); // 20..1, unsorted
  assert.equal(percentile(samples, 95), 19);
  assert.equal(percentile(samples, 50), 10);
  assert.equal(percentile(samples, 100), 20);
  assert.equal(percentile([7], 95), 7);
});

test("summarizeSamples reports n, median, p95, min, max rounded to 0.01 ms", () => {
  const s = summarizeSamples([1.111, 2.221, 3.331, 4.444]);
  assert.deepEqual(s, { n: 4, medianMs: 2.78, p95Ms: 4.44, minMs: 1.11, maxMs: 4.44 });
});

// ── flags ───────────────────────────────────────────────────────────────────

test("parseArgs defaults: build skipped, 20 runs, no out, no md", () => {
  const a = parseArgs([]);
  assert.equal(a.withBuild, false);
  assert.equal(a.runs, 20);
  assert.equal(a.out, null);
  assert.equal(a.md, false);
  assert.equal(a.url, null);
  assert.equal(a.dataDir, null);
});

test("parseArgs reads every supported flag", () => {
  const a = parseArgs([
    "--skip-build",
    "--runs",
    "50",
    "--out",
    "x.json",
    "--md",
    "--url",
    "http://127.0.0.1:20128/",
    "--data-dir",
    "d",
    "--heap-timeout-min",
    "5",
  ]);
  assert.equal(a.withBuild, false);
  assert.equal(a.runs, 50);
  assert.equal(a.out, "x.json");
  assert.equal(a.md, true);
  assert.equal(a.url, "http://127.0.0.1:20128");
  assert.equal(a.dataDir, "d");
  assert.equal(a.heapTimeoutMs, 5 * 60_000);
  assert.equal(parseArgs(["--with-build"]).withBuild, true);
});

test("parseArgs rejects bad input instead of guessing", () => {
  assert.throws(() => parseArgs(["--runs", "0"]), /--runs/);
  assert.throws(() => parseArgs(["--runs", "abc"]), /--runs/);
  assert.throws(() => parseArgs(["--runs"]), /--runs/);
  assert.throws(() => parseArgs(["--out"]), /--out/);
  assert.throws(() => parseArgs(["--skip-build", "--with-build"]), /mutually exclusive/);
  assert.throws(() => parseArgs(["--bogus"]), /unknown flag/);
  assert.throws(() => parseArgs(["--url", "ftp://x"]), /--url/);
});

// ── classification ──────────────────────────────────────────────────────────

test("classifyOutcome: skip reason wins, then timeout/signal/exit code", () => {
  assert.equal(classifyOutcome({ skippedReason: "no build" }), "skipped");
  assert.equal(classifyOutcome({ timedOut: true, exitCode: null }), "skipped");
  assert.equal(classifyOutcome({ exitCode: 0 }), "ok");
  assert.equal(classifyOutcome({ exitCode: 1 }), "failed");
  assert.equal(classifyOutcome({ exitCode: null, signal: "SIGKILL" }), "failed");
  assert.equal(classifyOutcome({ exitCode: 0, error: new Error("parse") }), "failed");
});

// ── host / report ───────────────────────────────────────────────────────────

test("hostInfo never includes the hostname", () => {
  const fakeOs = {
    cpus: () => new Array(8).fill({}),
    totalmem: () => 16 * 1024 * 1024 * 1024,
    loadavg: () => [1.234, 2.346, 3.456],
    hostname: () => "secret-box",
  };
  const h = hostInfo(fakeOs, "v24.0.0");
  assert.deepEqual(h, {
    cpuCount: 8,
    totalMemMB: 16384,
    loadAvg: [1.23, 2.35, 3.46],
    nodeVersion: "v24.0.0",
  });
  assert.ok(!JSON.stringify(h).includes("secret-box"));
});

test("loadWarning flags a busy host and stays quiet on an idle one", () => {
  assert.match(loadWarning({ cpuCount: 4, loadAvg: [3, 0, 0] }) ?? "", /load/i);
  assert.equal(loadWarning({ cpuCount: 4, loadAvg: [0.4, 0, 0] }), null);
});

test("buildReport has the documented top-level shape", () => {
  const r = buildReport({
    generatedAt: "2026-10-10T00:00:00.000Z",
    host: { cpuCount: 1, totalMemMB: 1, loadAvg: [0, 0, 0], nodeVersion: "v24" },
    gitSha: "abc",
    options: { runs: 20, withBuild: false },
    measurements: { heapGrowth: { status: "ok", durationMs: 1, summary: "x" } },
  });
  assert.deepEqual(Object.keys(r), ["generatedAt", "host", "gitSha", "options", "measurements"]);
  assert.equal(r.measurements.heapGrowth.status, "ok");
});

// ── output parsers ──────────────────────────────────────────────────────────

test("parseHeapGrowth extracts the growth line from node:test output", () => {
  assert.deepEqual(parseHeapGrowth("noise\n[heap] growth=3.21MB after 500 streams\nok 1"), {
    growthMB: 3.21,
  });
  assert.deepEqual(parseHeapGrowth("[heap] growth=-0.50MB after 500 streams"), {
    growthMB: -0.5,
  });
  assert.equal(parseHeapGrowth("nothing here"), null);
});

test("parseHeapBody reads the bench --json document even with leading noise", () => {
  const json = JSON.stringify({
    shape: { messages: 729, tools: 86, targets: 3, concurrency: 8 },
    wireBytes: 3 * 1024 * 1024,
    mechanisms: [],
    perRequestBytes: 12 * 1024 * 1024,
    concurrentEntryCloneBytes: 24 * 1024 * 1024,
  });
  const parsed = parseHeapBody(`some log line\n${json}\n`);
  assert.equal(parsed?.wireMiB, 3);
  assert.equal(parsed?.perRequestMiB, 12);
  assert.equal(parsed?.amplification, 4);
  assert.equal(parsed?.concurrentEntryCloneMiB, 24);
  assert.equal(parseHeapBody("not json"), null);
});

test("parseRoutingEvents extracts every scenario with µs/op", () => {
  const out = [
    "baseline: calculateFactors+Score               100,000 ops in 50.0ms | 0.500µs/op | 2,000,000 ops/s",
    "baseline + RoutingEvent (2 sinks)              100,000 ops in 80.5ms | 0.805µs/op | 1,242,236 ops/s",
    "concurrent: dispatch + quality + score         100,000 ops in 90.0ms (0.9µs/op aggregate)",
  ].join("\n");
  const r = parseRoutingEvents(out);
  assert.equal(r?.scenarios.length, 3);
  assert.deepEqual(r?.scenarios[0], {
    name: "baseline: calculateFactors+Score",
    usPerOp: 0.5,
    opsPerSec: 2_000_000,
  });
  assert.equal(r?.scenarios[2].usPerOp, 0.9);
  assert.equal(r?.scenarios[2].opsPerSec, null);
  assert.equal(parseRoutingEvents("nothing"), null);
});

// ── server plan / env ───────────────────────────────────────────────────────

test("resolveServerPlan: external URL, built tree, or skipped with a reason", () => {
  assert.deepEqual(resolveServerPlan({ root: "/r", url: "http://h:1", exists: () => false }), {
    mode: "external",
    baseUrl: "http://h:1",
  });
  const tree = resolveServerPlan({
    root: "/r",
    url: null,
    exists: (p: string) => p === "/r/dist/server.js",
  });
  assert.equal(tree.mode, "tree");
  const none = resolveServerPlan({ root: "/r", url: null, exists: () => false });
  assert.equal(none.mode, "unavailable");
  assert.match(none.reason, /dist\/server\.js/);
});

test("buildChildEnv isolates DATA_DIR, fakes secrets and drops leaked API keys", () => {
  const env = buildChildEnv(
    { PATH: "/bin", DATA_DIR: "/home/op/.omniroute", OMNIROUTE_API_KEY: "leak" },
    "/iso/data"
  );
  assert.equal(env.DATA_DIR, "/iso/data");
  assert.equal(env.DISABLE_SQLITE_AUTO_BACKUP, "true");
  assert.equal(env.PATH, "/bin");
  assert.equal(env.OMNIROUTE_API_KEY, undefined);
  assert.ok((env.JWT_SECRET ?? "").length >= 32);
  assert.ok((env.API_KEY_SECRET ?? "").length >= 32);
});

// ── command measurement (fake runner) ───────────────────────────────────────

test("measureCommand returns ok with a parsed summary", async () => {
  const m = await measureCommand({
    spec: { command: "npm", args: ["run", "x"] },
    runner: async () => ({
      exitCode: 0,
      signal: null,
      timedOut: false,
      stdout: "[heap] growth=1.00MB after 500 streams",
      stderr: "",
      durationMs: 42,
    }),
    parse: parseHeapGrowth,
    summarize: (p: { growthMB: number }) => `growth ${p.growthMB} MB`,
  });
  assert.equal(m.status, "ok");
  assert.equal(m.durationMs, 42);
  assert.equal(m.summary, "growth 1 MB");
  assert.deepEqual(m.raw, { growthMB: 1 });
});

test("measureCommand: unparseable output on exit 0 is failed, not ok", async () => {
  const m = await measureCommand({
    spec: { command: "npm", args: [] },
    runner: async () => ({
      exitCode: 0,
      signal: null,
      timedOut: false,
      stdout: "???",
      stderr: "",
      durationMs: 1,
    }),
    parse: parseHeapGrowth,
    summarize: () => "never",
  });
  assert.equal(m.status, "failed");
  assert.match(m.summary, /parse/);
});

test("measureCommand: timeout is skipped with the reason; skip short-circuits the runner", async () => {
  const timed = await measureCommand({
    spec: { command: "npm", args: [], timeoutMs: 900_000 },
    runner: async () => ({
      exitCode: null,
      signal: "SIGKILL",
      timedOut: true,
      stdout: "",
      stderr: "",
      durationMs: 900_000,
    }),
    parse: parseHeapGrowth,
    summarize: () => "",
  });
  assert.equal(timed.status, "skipped");
  assert.match(timed.summary, /timed out after 15 min/);

  let called = false;
  const skipped = await measureCommand({
    spec: { command: "npm", args: [] },
    runner: async () => {
      called = true;
      throw new Error("must not run");
    },
    parse: parseHeapGrowth,
    summarize: () => "",
    skippedReason: "build disabled",
  });
  assert.equal(called, false);
  assert.equal(skipped.status, "skipped");
  assert.equal(skipped.summary, "build disabled");
});

test("measureCommand: runner throwing (spawn ENOENT) is failed", async () => {
  const m = await measureCommand({
    spec: { command: "nope", args: [] },
    runner: async () => {
      throw new Error("spawn nope ENOENT");
    },
    parse: parseHeapGrowth,
    summarize: () => "",
  });
  assert.equal(m.status, "failed");
  assert.match(m.summary, /ENOENT/);
});

// ── TTFB (fake fetch + fake clock) ──────────────────────────────────────────

function fakeClock(stepMs: number) {
  let t = 0;
  return () => {
    t += stepMs;
    return t;
  };
}

test("measureTtfb discards warmup requests and summarizes the timed runs", async () => {
  const calls: string[] = [];
  const fetchImpl = async (url: string) => {
    calls.push(url);
    return { status: 200, arrayBuffer: async () => new ArrayBuffer(0) };
  };
  const r = await measureTtfb({
    baseUrl: "http://127.0.0.1:1",
    endpoints: ["/api/health"],
    runs: 5,
    warmup: 3,
    fetchImpl,
    now: fakeClock(2), // every request spans exactly one 2 ms tick
  });
  assert.equal(calls.length, 8);
  const m = r["/api/health"];
  assert.equal(m.status, "ok");
  assert.equal(m.raw.n, 5);
  assert.equal(m.raw.medianMs, 2);
  assert.equal(m.raw.p95Ms, 2);
  assert.match(m.summary, /median 2 ms/);
});

test("measureTtfb marks an endpoint failed on non-2xx or network error", async () => {
  const r = await measureTtfb({
    baseUrl: "http://127.0.0.1:1",
    endpoints: ["/v1/models", "/boom"],
    runs: 2,
    warmup: 0,
    fetchImpl: async (url: string) => {
      if (url.endsWith("/boom")) throw new Error("ECONNREFUSED");
      return { status: 401, arrayBuffer: async () => new ArrayBuffer(0) };
    },
    now: fakeClock(1),
  });
  assert.equal(r["/v1/models"].status, "failed");
  assert.match(r["/v1/models"].summary, /401/);
  assert.equal(r["/boom"].status, "failed");
  assert.match(r["/boom"].summary, /ECONNREFUSED/);
});

// ── orchestration with injected fakes ───────────────────────────────────────

const OK_OUTPUTS: Record<string, string> = {
  "test:heap": "[heap] growth=2.50MB after 500 streams",
  "bench:heap-body": JSON.stringify({
    wireBytes: 1048576,
    perRequestBytes: 4194304,
    concurrentEntryCloneBytes: 8388608,
  }),
  "bench:routing-events":
    "baseline: calculateFactors+Score  10 ops in 1.0ms | 0.100µs/op | 10,000,000 ops/s",
};

function fakeRunner(seen: string[]) {
  return async (spec: { command: string; args: string[] }) => {
    const script = spec.args.find((a) => a in OK_OUTPUTS || a === "build:release") ?? "";
    seen.push(script);
    return {
      exitCode: 0,
      signal: null,
      timedOut: false,
      stdout: OK_OUTPUTS[script] ?? "",
      stderr: "",
      durationMs: 10,
    };
  };
}

const fakeHost = { cpuCount: 2, totalMemMB: 1024, loadAvg: [0, 0, 0], nodeVersion: "v24" };

test("runBaseline without a built tree: benches run, build and TTFB are skipped", async () => {
  const seen: string[] = [];
  let started = false;
  const report = await runBaseline(parseArgs([]), {
    root: "/r",
    dataDir: "/iso",
    runner: fakeRunner(seen),
    exists: () => false,
    startServer: async () => {
      started = true;
      throw new Error("must not boot");
    },
    fetchImpl: async () => ({ status: 200, arrayBuffer: async () => new ArrayBuffer(0) }),
    now: fakeClock(1),
    host: fakeHost,
    gitSha: "deadbeef",
    generatedAt: "2026-10-10T00:00:00.000Z",
    log: () => {},
  });
  assert.equal(started, false);
  assert.deepEqual(seen, ["test:heap", "bench:heap-body", "bench:routing-events"]);
  assert.equal(report.measurements.heapGrowth.status, "ok");
  assert.equal(report.measurements.heapBody.status, "ok");
  assert.equal(report.measurements.routingEvents.status, "ok");
  assert.equal(report.measurements.buildSeconds.status, "skipped");
  for (const ep of DEFAULT_TTFB_ENDPOINTS) {
    assert.equal(report.measurements.ttft[ep].status, "skipped");
    assert.match(report.measurements.ttft[ep].summary, /dist\/server\.js/);
  }
  assert.equal(report.gitSha, "deadbeef");
});

test("runBaseline with a built tree boots the server once and always stops it", async () => {
  const seen: string[] = [];
  let stops = 0;
  const report = await runBaseline(parseArgs(["--runs", "4"]), {
    root: "/r",
    dataDir: "/iso",
    runner: fakeRunner(seen),
    exists: (p: string) => p === "/r/dist/server.js",
    startServer: async () => ({
      baseUrl: "http://127.0.0.1:9",
      bootMs: 1234,
      stop: async () => {
        stops += 1;
      },
    }),
    fetchImpl: async () => ({ status: 200, arrayBuffer: async () => new ArrayBuffer(0) }),
    now: fakeClock(3),
    host: fakeHost,
    gitSha: "x",
    generatedAt: "2026-10-10T00:00:00.000Z",
    log: () => {},
  });
  assert.equal(stops, 1);
  assert.equal(report.measurements.serverBoot.status, "ok");
  assert.equal(report.measurements.serverBoot.durationMs, 1234);
  for (const ep of DEFAULT_TTFB_ENDPOINTS) {
    assert.equal(report.measurements.ttft[ep].status, "ok");
    assert.equal(report.measurements.ttft[ep].raw.n, 4);
  }
});

test("runBaseline stops the server even when the TTFB phase throws", async () => {
  let stops = 0;
  await assert.rejects(
    runBaseline(parseArgs([]), {
      root: "/r",
      dataDir: "/iso",
      runner: fakeRunner([]),
      exists: () => true,
      startServer: async () => ({
        baseUrl: "http://127.0.0.1:9",
        bootMs: 1,
        stop: async () => {
          stops += 1;
        },
      }),
      fetchImpl: async () => ({ status: 200, arrayBuffer: async () => new ArrayBuffer(0) }),
      now: () => {
        throw new Error("clock exploded");
      },
      host: fakeHost,
      gitSha: "x",
      generatedAt: "2026-10-10T00:00:00.000Z",
      log: () => {},
    }),
    /clock exploded/
  );
  assert.equal(stops, 1);
});

test("runBaseline --with-build runs build:release before the benches", async () => {
  const seen: string[] = [];
  const report = await runBaseline(parseArgs(["--with-build"]), {
    root: "/r",
    dataDir: "/iso",
    runner: fakeRunner(seen),
    exists: () => false,
    startServer: async () => {
      throw new Error("unused");
    },
    fetchImpl: async () => ({ status: 200, arrayBuffer: async () => new ArrayBuffer(0) }),
    now: fakeClock(1),
    host: fakeHost,
    gitSha: "x",
    generatedAt: "2026-10-10T00:00:00.000Z",
    log: () => {},
  });
  assert.equal(seen[0], "build:release");
  assert.equal(report.measurements.buildSeconds.status, "ok");
  assert.match(report.measurements.buildSeconds.summary, /0\.01 s/);
});

// ── markdown ────────────────────────────────────────────────────────────────

test("renderMarkdown lists every measurement and every TTFB endpoint", () => {
  const md = renderMarkdown(
    buildReport({
      generatedAt: "2026-10-10T00:00:00.000Z",
      host: { cpuCount: 2, totalMemMB: 1024, loadAvg: [5, 4, 3], nodeVersion: "v24" },
      gitSha: "abc1234",
      options: { runs: 20, withBuild: false },
      measurements: {
        heapGrowth: { status: "ok", durationMs: 1000, summary: "growth 1 MB" },
        ttft: { "/api/health": { status: "skipped", durationMs: 0, summary: "no build" } },
      },
    })
  );
  assert.match(md, /\| heapGrowth \| ok \|/);
  assert.match(md, /\| TTFB `\/api\/health` \| skipped \|/);
  assert.match(md, /abc1234/);
  assert.match(md, /load/i); // busy-host warning rendered
  assert.ok(!md.includes("hostname"));
});

test("renderMarkdown escapes backslashes before pipes so a summary cannot split its row", () => {
  const md = renderMarkdown(
    buildReport({
      generatedAt: "2026-10-10T00:00:00.000Z",
      host: { cpuCount: 2, totalMemMB: 1024, loadAvg: [0, 0, 0], nodeVersion: "v24" },
      gitSha: "abc1234",
      options: { runs: 20, withBuild: false },
      measurements: {
        heapGrowth: { status: "error", durationMs: 1, summary: "C:\\tmp\\|x" },
      },
    })
  );
  const row = md.split("\n").find((line) => line.startsWith("| heapGrowth |"));
  assert.ok(row, "heapGrowth row rendered");
  assert.ok(row.includes("C:\\\\tmp\\\\\\|x"), row);
  // Unescaped pipes (not preceded by an odd run of backslashes) are column separators.
  const separators = row.match(/(?<!\\)(?:\\\\)*\|/g) ?? [];
  assert.equal(separators.length, 5, row);
});
