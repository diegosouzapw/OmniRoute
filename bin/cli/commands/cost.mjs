import { apiFetch } from "../api.mjs";
import { emit } from "../output.mjs";
import { t } from "../i18n.mjs";

const costSchema = [
  { key: "group", header: "Group", width: 30 },
  { key: "requests", header: "Reqs", formatter: (v) => (v != null ? v.toLocaleString() : "0") },
  { key: "tokensIn", header: "Tokens In", formatter: fmtTokens },
  { key: "tokensOut", header: "Tokens Out", formatter: fmtTokens },
  { key: "costUsd", header: "Cost (USD)", formatter: (v) => (v ? `$${v.toFixed(4)}` : "$0.0000") },
  {
    key: "costPct",
    header: "% of Total",
    formatter: (v) => (v != null ? `${v.toFixed(1)}%` : "-"),
  },
];

function fmtTokens(v) {
  if (!v) return "0";
  if (v > 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v > 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return String(v);
}

export function registerCost(program) {
  program
    .command("cost")
    .description(t("cost.description"))
    .option("--period <range>", t("cost.period"), "30d")
    .option("--since <date>", t("cost.since"))
    .option("--until <date>", t("cost.until"))
    .option("--group-by <field>", t("cost.group_by"), "provider")
    .option("--api-key <key>", t("cost.api_key_filter"))
    .option("--limit <n>", t("cost.limit"), parseInt, 100)
    .action(runCostCommand);
}

export async function runCostCommand(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const params = buildParams(opts);

  const res = await apiFetch(`/api/usage/analytics?${params}`, {
    timeout: globalOpts.timeout,
    acceptNotOk: true,
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      process.stderr.write(t("common.authRequired") + "\n");
    } else if (res.status >= 500) {
      process.stderr.write(t("common.serverOffline") + "\n");
    } else {
      process.stderr.write(t("common.error", { message: `HTTP ${res.status}` }) + "\n");
    }
    process.exit(res.exitCode ?? 1);
  }

  const data = await res.json();
  const rows = aggregateByGroup(data, opts.groupBy ?? "provider", opts.limit ?? 100);

  emit(rows, globalOpts, costSchema);

  if (!globalOpts.quiet && globalOpts.output !== "json" && globalOpts.output !== "jsonl") {
    const total = rows.reduce((s, r) => s + (r.costUsd ?? 0), 0);
    process.stderr.write(
      `\nTotal: $${total.toFixed(4)} across ${rows.length} ${opts.groupBy ?? "provider"}(s)\n`
    );
  }
}

function buildParams(opts) {
  const p = new URLSearchParams();
  if (opts.since || opts.until) {
    if (opts.since) p.set("startDate", opts.since);
    if (opts.until) p.set("endDate", opts.until);
  } else {
    p.set("range", opts.period ?? "30d");
  }
  if (opts.apiKey) p.set("apiKeyIds", opts.apiKey);
  return p.toString();
}

function aggregateByGroup(data, groupBy, limit) {
  const source = pickSource(data, groupBy);
  if (!Array.isArray(source)) return [];

  const totalCost = source.reduce((s, r) => s + toNum(r.totalCost ?? r.cost ?? r.costUsd), 0);

  const rows = source.map((r) => {
    const costUsd = toNum(r.totalCost ?? r.cost ?? r.costUsd);
    return {
      group: groupLabel(r, groupBy),
      requests: toNum(r.totalRequests ?? r.requests ?? r.count),
      tokensIn: toNum(r.totalTokensIn ?? r.tokensIn ?? r.promptTokens),
      tokensOut: toNum(r.totalTokensOut ?? r.tokensOut ?? r.completionTokens),
      costUsd,
      costPct: totalCost > 0 ? (costUsd / totalCost) * 100 : 0,
    };
  });

  rows.sort((a, b) => b.costUsd - a.costUsd);
  return rows.slice(0, limit);
}

function pickSource(data, groupBy) {
  switch (groupBy) {
    case "model":
      return data.byModel ?? data.models ?? [];
    case "combo":
      return data.byCombo ?? data.combos ?? [];
    case "api-key":
    case "apiKey":
      return data.byApiKey ?? data.apiKeys ?? [];
    case "day":
      return data.byDay ?? data.daily ?? data.trend ?? [];
    default:
      return data.byProvider ?? data.providers ?? [];
  }
}

function groupLabel(row, groupBy) {
  switch (groupBy) {
    case "model":
      return row.model ?? row.modelId ?? String(row.group ?? "");
    case "combo":
      return row.comboName ?? row.combo ?? row.name ?? String(row.group ?? "");
    case "api-key":
    case "apiKey":
      return row.keyName ?? row.apiKey ?? row.label ?? String(row.group ?? "");
    case "day":
      return row.date ?? row.day ?? String(row.group ?? "");
    default:
      return row.provider ?? row.providerId ?? String(row.group ?? "");
  }
}

function toNum(v) {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}
