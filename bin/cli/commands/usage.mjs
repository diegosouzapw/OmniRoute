import { setTimeout as sleep } from "node:timers/promises";
import { apiFetch } from "../api.mjs";
import { emit, maskSecret } from "../output.mjs";
import { t } from "../i18n.mjs";

const fmtTs = (v) => (v ? new Date(v).toISOString().replace("T", " ").slice(0, 19) : "-");
const maskKey = (v) => (typeof v === "string" ? maskSecret(v) : (v ?? "-"));
const fmtCost = (v) => (v ? `$${Number(v).toFixed(4)}` : "-");
const fmtTokens = (v) => {
  if (!v) return "0";
  if (v > 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v > 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return String(v);
};

const analyticsSchema = [
  { key: "provider", header: "Provider", width: 20 },
  { key: "requests", header: "Reqs", formatter: (v) => (v != null ? v.toLocaleString() : "0") },
  { key: "tokensIn", header: "Tokens In", formatter: fmtTokens },
  { key: "tokensOut", header: "Tokens Out", formatter: fmtTokens },
  { key: "costUsd", header: "Cost (USD)", formatter: fmtCost },
];

const budgetSchema = [
  { key: "scope", header: "Scope", width: 25 },
  { key: "period", header: "Period" },
  { key: "limit", header: "Limit (USD)", formatter: (v) => `$${Number(v).toFixed(2)}` },
  { key: "used", header: "Used (USD)", formatter: (v) => `$${Number(v).toFixed(2)}` },
  { key: "remaining", header: "Remaining", formatter: (v) => `$${Number(v).toFixed(2)}` },
  { key: "pct", header: "%", formatter: (v) => `${(Number(v) * 100).toFixed(1)}%` },
];

const quotaSchema = [
  { key: "provider", header: "Provider", width: 20 },
  { key: "limit", header: "Limit", formatter: fmtTokens },
  { key: "used", header: "Used", formatter: fmtTokens },
  { key: "remaining", header: "Remaining", formatter: fmtTokens },
  { key: "resetAt", header: "Reset At", formatter: fmtTs },
  { key: "state", header: "State" },
];

const logsSchema = [
  { key: "timestamp", header: "Time", width: 20, formatter: fmtTs },
  { key: "apiKey", header: "API Key", width: 16, formatter: maskKey },
  { key: "method", header: "Method", width: 8 },
  { key: "provider", header: "Provider", width: 14 },
  { key: "model", header: "Model", width: 25 },
  { key: "tokens", header: "Tokens", formatter: fmtTokens },
  { key: "costUsd", header: "Cost", formatter: fmtCost },
  { key: "latencyMs", header: "Latency", formatter: (v) => (v ? `${v}ms` : "-") },
  { key: "status", header: "Status" },
];

export function registerUsage(program) {
  const usage = program.command("usage").description(t("usage.description"));

  // analytics
  usage
    .command("analytics")
    .description(t("usage.analytics.description"))
    .option("--period <range>", t("usage.analytics.period"), "30d")
    .option("--provider <id>", t("usage.analytics.provider"))
    .action(runUsageAnalytics);

  // budget
  const budget = usage.command("budget").description(t("usage.budget.description"));
  budget.command("list").action(runBudgetList);
  budget.command("get [scope]").action(runBudgetGet);
  budget
    .command("set <amount>")
    .option("--scope <s>", t("usage.budget.set.scope"), "global")
    .option("--period <p>", t("usage.budget.set.period"), "monthly")
    .action(runBudgetSet);
  budget.command("reset [scope]").action(runBudgetReset);

  // quota
  usage
    .command("quota")
    .description(t("usage.quota.description"))
    .option("--provider <id>", t("usage.quota.provider"))
    .option("--check", t("usage.quota.check"))
    .action(runUsageQuota);

  // logs
  usage
    .command("logs")
    .description(t("usage.logs.description"))
    .option("--limit <n>", t("usage.logs.limit"), parseInt, 100)
    .option("--search <q>", t("usage.logs.search"))
    .option("--since <ts>", t("usage.logs.since"))
    .option("--follow", t("usage.logs.follow"))
    .option("--api-key <k>", t("usage.logs.api_key"))
    .action(runUsageLogs);

  // utilization
  usage
    .command("utilization")
    .description(t("usage.utilization.description"))
    .option("--api-key <k>", t("usage.utilization.api_key"))
    .action(runUsageUtilization);

  // history
  usage
    .command("history")
    .description(t("usage.history.description"))
    .option("--limit <n>", t("usage.history.limit"), parseInt, 100)
    .action(runUsageHistory);

  // proxy-logs
  usage
    .command("proxy-logs")
    .description(t("usage.proxy_logs.description"))
    .option("--limit <n>", t("usage.proxy_logs.limit"), parseInt, 100)
    .action(runUsageProxyLogs);
}

export async function runUsageAnalytics(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const p = new URLSearchParams({ range: opts.period ?? "30d" });
  if (opts.provider) p.set("provider", opts.provider);
  const res = await fetchOrExit(`/api/usage/analytics?${p}`, globalOpts);
  const data = await res.json();
  const rows = toArray(data.byProvider ?? data.providers ?? []).map((r) => ({
    provider: r.provider ?? r.providerId ?? "",
    requests: r.totalRequests ?? r.requests ?? 0,
    tokensIn: r.totalTokensIn ?? r.tokensIn ?? 0,
    tokensOut: r.totalTokensOut ?? r.tokensOut ?? 0,
    costUsd: r.totalCost ?? r.cost ?? r.costUsd ?? 0,
  }));
  emit(rows, globalOpts, analyticsSchema);
}

export async function runBudgetList(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const res = await fetchOrExit("/api/usage/budget", globalOpts);
  const data = await res.json();
  const rows = normalizeBudgetRows(data);
  emit(rows, globalOpts, budgetSchema);
}

export async function runBudgetGet(scope, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const p = new URLSearchParams();
  if (scope) p.set("scope", scope);
  const res = await fetchOrExit(`/api/usage/budget?${p}`, globalOpts);
  const data = await res.json();
  const rows = normalizeBudgetRows(data);
  emit(rows, globalOpts, budgetSchema);
}

export async function runBudgetSet(amount, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const res = await apiFetch("/api/usage/budget", {
    method: "POST",
    body: {
      amount: Number(amount),
      scope: opts.scope ?? "global",
      period: opts.period ?? "monthly",
    },
    timeout: globalOpts.timeout,
    acceptNotOk: true,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    process.stderr.write(`[error] HTTP ${res.status}: ${txt.slice(0, 200)}\n`);
    process.exit(res.exitCode ?? 1);
  }
  if (!globalOpts.quiet)
    process.stdout.write(
      `Budget set: $${Number(amount).toFixed(2)} / ${opts.scope ?? "global"} / ${opts.period ?? "monthly"}\n`
    );
}

export async function runBudgetReset(scope, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const res = await apiFetch("/api/usage/budget", {
    method: "DELETE",
    body: { scope: scope ?? "global" },
    timeout: globalOpts.timeout,
    acceptNotOk: true,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    process.stderr.write(`[error] HTTP ${res.status}: ${txt.slice(0, 200)}\n`);
    process.exit(res.exitCode ?? 1);
  }
  if (!globalOpts.quiet) process.stdout.write(`Budget reset: ${scope ?? "global"}\n`);
}

export async function runUsageQuota(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const p = new URLSearchParams();
  if (opts.provider) p.set("provider", opts.provider);
  if (opts.check) p.set("check", "true");
  const res = await fetchOrExit(`/api/usage/quota?${p}`, globalOpts);
  const data = await res.json();
  const rows = toArray(data.providers ?? data.data ?? (Array.isArray(data) ? data : [])).map(
    (r) => ({
      provider: r.provider ?? r.providerId ?? "",
      limit: r.limit ?? r.quota ?? r.maxTokens ?? null,
      used: r.used ?? r.tokensUsed ?? null,
      remaining: r.remaining ?? r.percentRemaining ?? null,
      resetAt: r.resetAt ?? r.nextReset ?? null,
      state: r.state ?? (r.percentRemaining > 0 ? "available" : "exhausted"),
    })
  );
  emit(rows, globalOpts, quotaSchema);
}

export async function runUsageLogs(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();

  if (opts.follow) {
    await followLogs(opts, globalOpts);
    return;
  }

  const p = buildLogParams(opts);
  const res = await fetchOrExit(`/api/usage/call-logs?${p}`, globalOpts);
  const data = await res.json();
  const rows = toLogRows(toArray(data.logs ?? data.items ?? data));
  emit(rows, globalOpts, logsSchema);
}

export async function runUsageUtilization(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const p = new URLSearchParams();
  if (opts.apiKey) p.set("apiKey", opts.apiKey);
  const res = await fetchOrExit(`/api/usage/utilization?${p}`, globalOpts);
  const data = await res.json();
  const rows = Array.isArray(data) ? data : toArray(data.data ?? data.items ?? [data]);
  emit(rows, globalOpts, null);
}

export async function runUsageHistory(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const p = new URLSearchParams({ limit: String(opts.limit ?? 100) });
  const res = await fetchOrExit(`/api/usage/history?${p}`, globalOpts);
  const data = await res.json();
  const rows = toArray(data.items ?? data.history ?? (Array.isArray(data) ? data : []));
  emit(rows, globalOpts, null);
}

export async function runUsageProxyLogs(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const p = new URLSearchParams({ limit: String(opts?.limit ?? 100) });
  const res = await fetchOrExit(`/api/usage/proxy-logs?${p}`, globalOpts);
  const data = await res.json();
  const rows = toArray(data.logs ?? data.items ?? (Array.isArray(data) ? data : []));
  emit(rows, globalOpts, null);
}

async function followLogs(opts, globalOpts) {
  let lastId = null;
  process.stderr.write("[following logs — press Ctrl+C to stop]\n");
  const sigint = () => process.exit(0);
  process.on("SIGINT", sigint);
  try {
    while (true) {
      const p = buildLogParams({ ...opts, limit: opts.limit ?? 20 });
      if (lastId) p.append("afterId", String(lastId));
      const res = await apiFetch(`/api/usage/call-logs?${p}`, {
        timeout: globalOpts.timeout,
        acceptNotOk: true,
      });
      if (res.ok) {
        const data = await res.json();
        const rows = toLogRows(toArray(data.logs ?? data.items ?? data));
        if (rows.length > 0) {
          emit(rows, { ...globalOpts, quiet: true }, logsSchema);
          lastId = rows[rows.length - 1]?.id ?? lastId;
        }
      }
      await sleep(2000);
    }
  } finally {
    process.off("SIGINT", sigint);
  }
}

function buildLogParams(opts) {
  const p = new URLSearchParams({ limit: String(opts.limit ?? 100) });
  if (opts.search) p.set("search", opts.search);
  if (opts.since) p.set("since", opts.since);
  if (opts.apiKey) p.set("apiKey", opts.apiKey);
  return p;
}

function toLogRows(items) {
  return items.map((r) => ({
    id: r.id,
    timestamp: r.createdAt ?? r.timestamp ?? r.ts,
    apiKey: r.apiKey ?? r.keyId ?? r.apiKeyId,
    method: r.method ?? "POST",
    provider: r.provider ?? r.providerId,
    model: r.model ?? r.modelId,
    tokens: (r.tokensIn ?? r.promptTokens ?? 0) + (r.tokensOut ?? r.completionTokens ?? 0),
    costUsd: r.cost ?? r.costUsd ?? r.totalCost,
    latencyMs: r.latencyMs ?? r.durationMs,
    status: r.status ?? r.statusCode,
  }));
}

function normalizeBudgetRows(data) {
  const items = toArray(data.budgets ?? data.items ?? (Array.isArray(data) ? data : [data]));
  return items.map((r) => ({
    scope: r.scope ?? r.scopeId ?? "global",
    period: r.period ?? "monthly",
    limit: r.limit ?? r.amount ?? 0,
    used: r.used ?? r.spent ?? 0,
    remaining: r.remaining ?? Math.max(0, (r.limit ?? 0) - (r.used ?? 0)),
    pct: r.pct ?? (r.limit > 0 ? (r.used ?? 0) / r.limit : 0),
  }));
}

async function fetchOrExit(path, globalOpts) {
  const res = await apiFetch(path, { timeout: globalOpts.timeout, acceptNotOk: true });
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      process.stderr.write(t("common.authRequired") + "\n");
    } else {
      process.stderr.write(t("common.serverOffline") + "\n");
    }
    process.exit(res.exitCode ?? 1);
  }
  return res;
}

function toArray(val) {
  return Array.isArray(val) ? val : [];
}
