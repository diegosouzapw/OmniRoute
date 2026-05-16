import { readFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

function truncate(v, len = 30) {
  if (v == null) return "-";
  const s = String(v);
  return s.length > len ? s.slice(0, len - 1) + "…" : s;
}

function fmtTs(v) {
  if (!v) return "-";
  try {
    return new Date(v).toLocaleString();
  } catch {
    return String(v);
  }
}

const suiteSchema = [
  { key: "id", header: "Suite ID", width: 22 },
  { key: "name", header: "Name", width: 30 },
  { key: "samples", header: "Samples" },
  { key: "rubric", header: "Rubric", width: 16 },
  { key: "updatedAt", header: "Updated", formatter: fmtTs },
];

const runSchema = [
  { key: "id", header: "Run ID", width: 22 },
  { key: "suiteId", header: "Suite", width: 18 },
  { key: "status", header: "Status", width: 12 },
  { key: "model", header: "Model", width: 25 },
  { key: "score", header: "Score", formatter: (v) => (v != null ? v.toFixed(3) : "-") },
  {
    key: "duration",
    header: "Duration",
    formatter: (v) => (v != null ? `${(v / 1000).toFixed(1)}s` : "-"),
  },
  { key: "startedAt", header: "Started", formatter: fmtTs },
];

const sampleSchema = [
  { key: "id", header: "Sample", width: 14 },
  { key: "score", header: "Score", formatter: (v) => (v != null ? v.toFixed(2) : "-") },
  { key: "passed", header: "✓", formatter: (v) => (v ? "✓" : "✗") },
  { key: "input", header: "Input", width: 30, formatter: truncate },
  { key: "output", header: "Output", width: 30, formatter: truncate },
];

async function confirm(q) {
  return new Promise((resolve) => {
    process.stdout.write(`${q} (yes/no) `);
    process.stdin.setEncoding("utf8");
    process.stdin.once("data", (c) => resolve(c.toString().trim().toLowerCase().startsWith("y")));
  });
}

async function watchRun(runId, globalOpts) {
  let lastStatus = "";
  while (true) {
    await sleep(3000);
    const res = await apiFetch(`/api/evals/${runId}`);
    if (!res.ok) continue;
    const r = await res.json();
    if (r.status !== lastStatus) {
      const done = r.progress?.completed ?? 0;
      const total = r.progress?.total ?? "?";
      process.stderr.write(`[${new Date().toISOString()}] ${r.status} — ${done}/${total}\n`);
      lastStatus = r.status;
    }
    if (["completed", "failed", "cancelled"].includes(r.status)) {
      emit(r, globalOpts, runSchema);
      return;
    }
  }
}

function renderScorecard(data) {
  const score = data.score ?? data.overallScore ?? null;
  const passed = data.passed ?? data.summary?.passed ?? null;
  const total = data.total ?? data.summary?.total ?? null;
  process.stdout.write("\n=== Scorecard ===\n");
  if (score != null) process.stdout.write(`Overall score: ${(score * 100).toFixed(1)}%\n`);
  if (passed != null && total != null) {
    process.stdout.write(`Passed: ${passed}/${total}\n`);
    const bar = "█".repeat(Math.round((passed / total) * 20)).padEnd(20, "░");
    process.stdout.write(`[${bar}] ${((passed / total) * 100).toFixed(0)}%\n`);
  }
  const metrics = data.metrics ?? data.breakdown ?? {};
  for (const [k, v] of Object.entries(metrics)) {
    process.stdout.write(`  ${k}: ${typeof v === "number" ? v.toFixed(3) : v}\n`);
  }
  process.stdout.write("\n");
}

export async function runEvalSuitesList(opts, cmd) {
  const res = await apiFetch("/api/evals/suites");
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, cmd.optsWithGlobals(), suiteSchema);
}

export async function runEvalSuitesGet(id, opts, cmd) {
  const res = await apiFetch(`/api/evals/suites/${id}`);
  if (!res.ok) {
    process.stderr.write(`Not found: ${id}\n`);
    process.exit(1);
  }
  emit(await res.json(), cmd.optsWithGlobals());
}

export async function runEvalSuitesCreate(opts, cmd) {
  if (!opts.file) {
    process.stderr.write("--file required\n");
    process.exit(2);
  }
  const body = JSON.parse(readFileSync(opts.file, "utf8"));
  const res = await apiFetch("/api/evals/suites", { method: "POST", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  emit(await res.json(), cmd.optsWithGlobals());
}

export async function runEvalRun(suiteId, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const body = {
    suiteId,
    model: opts.model ?? "auto",
    ...(opts.combo ? { combo: opts.combo } : {}),
    concurrency: opts.concurrency ?? 4,
    ...(opts.tag ? { tag: opts.tag } : {}),
  };
  const res = await apiFetch("/api/evals", { method: "POST", body });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const run = await res.json();
  emit(run, globalOpts, runSchema);
  if (opts.watch) {
    if (process.stdout.isTTY) {
      const { startEvalWatchTui } = await import("../tui/EvalWatch.jsx");
      await startEvalWatchTui({
        runId: run.id,
        suiteId: opts.suite,
        baseUrl: globalOpts.baseUrl ?? "http://localhost:20128",
        apiKey: globalOpts.apiKey ?? process.env.OMNIROUTE_API_KEY,
      });
    } else {
      process.stderr.write("\nWatching run... (Ctrl+C to detach)\n");
      await watchRun(run.id, globalOpts);
    }
  }
}

export async function runEvalList(opts, cmd) {
  const params = new URLSearchParams({ limit: String(opts.limit ?? 50) });
  if (opts.suite) params.set("suiteId", opts.suite);
  if (opts.status) params.set("status", opts.status);
  if (opts.since) params.set("since", opts.since);
  const res = await apiFetch(`/api/evals?${params}`);
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.items ?? data, cmd.optsWithGlobals(), runSchema);
}

export async function runEvalGet(id, opts, cmd) {
  const res = await apiFetch(`/api/evals/${id}`);
  if (!res.ok) {
    process.stderr.write(`Not found: ${id}\n`);
    process.exit(1);
  }
  emit(await res.json(), cmd.optsWithGlobals());
}

export async function runEvalResults(id, opts, cmd) {
  const params = new URLSearchParams();
  if (opts.failed) params.set("filter", "failed");
  const res = await apiFetch(`/api/evals/${id}?${params}`);
  if (!res.ok) {
    process.stderr.write(`Not found: ${id}\n`);
    process.exit(1);
  }
  const data = await res.json();
  emit(data.samples ?? data.results ?? [], cmd.optsWithGlobals(), sampleSchema);
}

export async function runEvalCancel(id, opts, cmd) {
  if (!opts.yes) {
    const ok = await confirm(`Cancel run ${id}?`);
    if (!ok) return;
  }
  const res = await apiFetch(`/api/evals/${id}`, { method: "POST", body: { op: "cancel" } });
  if (!res.ok) {
    process.stderr.write(`Error: ${res.status}\n`);
    process.exit(1);
  }
  process.stdout.write("Cancelled\n");
}

export async function runEvalScorecard(id, opts, cmd) {
  const res = await apiFetch(`/api/evals/${id}?scorecard=true`);
  if (!res.ok) {
    process.stderr.write(`Not found: ${id}\n`);
    process.exit(1);
  }
  const data = await res.json();
  const globalOpts = cmd.optsWithGlobals();
  if (globalOpts.output === "json") {
    emit(data, globalOpts);
  } else {
    renderScorecard(data);
  }
}

export function registerEval(program) {
  const evalCmd = program.command("eval").description(t("eval.description"));

  const suites = evalCmd.command("suites").description(t("eval.suites.description"));
  suites.command("list").description(t("eval.suites.list.description")).action(runEvalSuitesList);
  suites
    .command("get <suiteId>")
    .description(t("eval.suites.get.description"))
    .action(runEvalSuitesGet);
  suites
    .command("create")
    .description(t("eval.suites.create.description"))
    .option("--file <path>", t("eval.suites.create.file"))
    .action(runEvalSuitesCreate);

  evalCmd
    .command("run <suiteId>")
    .description(t("eval.run.description"))
    .option("-m, --model <id>", t("eval.run.model"), "auto")
    .option("--combo <name>", t("eval.run.combo"))
    .option("--concurrency <n>", t("eval.run.concurrency"), parseInt, 4)
    .option("--tag <tag>", t("eval.run.tag"))
    .option("--watch", t("eval.run.watch"))
    .action(runEvalRun);

  evalCmd
    .command("list")
    .description(t("eval.list.description"))
    .option("--suite <id>", t("eval.list.suite"))
    .option("--status <s>", t("eval.list.status"))
    .option("--since <ts>", t("eval.list.since"))
    .option("--limit <n>", t("eval.list.limit"), parseInt, 50)
    .action(runEvalList);

  evalCmd.command("get <runId>").description(t("eval.get.description")).action(runEvalGet);

  evalCmd
    .command("results <runId>")
    .description(t("eval.results.description"))
    .option("--failed", t("eval.results.failed"))
    .action(runEvalResults);

  evalCmd
    .command("cancel <runId>")
    .description(t("eval.cancel.description"))
    .option("--yes", t("eval.cancel.yes"))
    .action(runEvalCancel);

  evalCmd
    .command("scorecard <runId>")
    .description(t("eval.scorecard.description"))
    .action(runEvalScorecard);
}
