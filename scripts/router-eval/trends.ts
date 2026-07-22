#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

import type {
  RouterConfigAggregate,
  RouterEvalArtifact,
  RouterEvalArtifactMetadata,
  RouterEvalComparison,
  RouterEvalReport,
} from "@/lib/routerEval/index.ts";

type TrendRow = {
  runId: string;
  generatedAt: string;
  kind: RouterEvalArtifact["kind"];
  bestConfig: string;
  aiq: number;
  avgCostUsd: number;
  avgLatencyMs: number;
  regressions: number;
  source: string;
  window: string;
};

function getArgValue(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  if (index < 0) return undefined;
  const value = process.argv[index + 1];
  return value && !value.startsWith("--") ? value : undefined;
}

function usage(): string {
  return [
    "Usage:",
    "  npm run eval:router:trends -- --artifact-dir <dir> [--limit <n>] [--dashboard]",
    "",
    "Reads retained router-eval JSON artifacts and prints a markdown trend table or dashboard.",
  ].join("\n");
}

function readJson(filePath: string): RouterEvalArtifact | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as RouterEvalArtifact;
  } catch {
    return null;
  }
}

function bestFromReport(report: RouterEvalReport): RouterConfigAggregate | undefined {
  return report.top[0];
}

function bestFromComparison(comparison: RouterEvalComparison): RouterConfigAggregate | undefined {
  return comparison.candidate.top[0];
}

function toTrendRow(runId: string, artifact: RouterEvalArtifact): TrendRow | null {
  const best = artifact.comparison
    ? bestFromComparison(artifact.comparison)
    : artifact.report
      ? bestFromReport(artifact.report)
      : undefined;

  if (!best) return null;

  return {
    runId,
    generatedAt: artifact.generatedAt,
    kind: artifact.kind,
    bestConfig: best.configId,
    aiq: best.aiq,
    avgCostUsd: best.avgCostUsd,
    avgLatencyMs: best.avgLatencyMs,
    regressions: artifact.comparison?.regressions.length ?? 0,
    source: artifact.metadata?.candidate?.source ?? "unknown",
    window: formatWindow(artifact.metadata?.window),
  };
}

function formatWindow(window: RouterEvalArtifactMetadata["window"]): string {
  if (!window || typeof window !== "object") return "all";
  const parts: string[] = [];
  if ("since" in window && typeof window.since === "string") parts.push(`since ${window.since}`);
  if ("limit" in window && typeof window.limit === "number") parts.push(`limit ${window.limit}`);
  return parts.length > 0 ? parts.join(", ") : "all";
}

function collectTrendRows(artifactDir: string): TrendRow[] {
  if (!fs.existsSync(artifactDir)) return [];

  const rows: TrendRow[] = [];
  for (const entry of fs.readdirSync(artifactDir, { withFileTypes: true })) {
    const runId = entry.name;
    const jsonPath = entry.isDirectory()
      ? path.join(artifactDir, runId, "router-eval.json")
      : entry.isFile() && entry.name.endsWith(".json")
        ? path.join(artifactDir, entry.name)
        : "";
    if (!jsonPath) continue;

    const artifact = readJson(jsonPath);
    if (!artifact || artifact.schemaVersion !== 1) continue;
    const row = toTrendRow(runId.replace(/\.json$/, ""), artifact);
    if (row) rows.push(row);
  }

  return rows.sort((a, b) => a.generatedAt.localeCompare(b.generatedAt));
}

function formatTrend(rows: TrendRow[], limit: number): string {
  const limited = rows.slice(-limit);
  const lines = [
    "# Router Eval Trends",
    "",
    "| Run | Kind | Source | Window | Best Config | AIQ | Avg Cost | Avg Latency | Regressions |",
    "| --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: |",
  ];

  for (const row of limited) {
    lines.push(
      `| ${row.runId} | ${row.kind} | ${row.source} | ${row.window} | ${row.bestConfig} | ${row.aiq.toFixed(3)} | $${row.avgCostUsd.toFixed(6)} | ${row.avgLatencyMs.toFixed(2)}ms | ${row.regressions} |`
    );
  }

  return `${lines.join("\n")}\n`;
}

function formatDelta(value: number): string {
  if (value > 0) return `+${value.toFixed(3)}`;
  return value.toFixed(3);
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function formatDashboard(rows: TrendRow[], limit: number): string {
  const limited = rows.slice(-limit);
  const latest = limited[limited.length - 1];
  const previous = limited[limited.length - 2];
  const aiqDelta = latest && previous ? latest.aiq - previous.aiq : 0;
  const latencyDelta = latest && previous ? latest.avgLatencyMs - previous.avgLatencyMs : 0;
  const costDelta = latest && previous ? latest.avgCostUsd - previous.avgCostUsd : 0;
  const regressions = limited.reduce((sum, row) => sum + row.regressions, 0);
  const lines = [
    "# Router Eval Dashboard",
    "",
    `Runs: ${limited.length}`,
    `Latest: ${latest?.runId ?? "n/a"}`,
    `Best config: ${latest?.bestConfig ?? "n/a"}`,
    `AIQ: ${latest ? latest.aiq.toFixed(3) : "0.000"} (${formatDelta(aiqDelta)})`,
    `Avg latency: ${latest ? latest.avgLatencyMs.toFixed(2) : "0.00"}ms (${formatDelta(latencyDelta)}ms)`,
    `Avg cost: $${latest ? latest.avgCostUsd.toFixed(6) : "0.000000"} (${formatDelta(costDelta)})`,
    `Window: ${latest?.window ?? "all"}`,
    `Source: ${latest?.source ?? "unknown"}`,
    `Regression count: ${regressions}`,
    "",
    "## Rolling Averages",
    "",
    `AIQ: ${average(limited.map((row) => row.aiq)).toFixed(3)}`,
    `Latency: ${average(limited.map((row) => row.avgLatencyMs)).toFixed(2)}ms`,
    `Cost: $${average(limited.map((row) => row.avgCostUsd)).toFixed(6)}`,
  ];

  return `${lines.join("\n")}\n`;
}

function main(): void {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(usage());
    return;
  }

  const artifactDir = getArgValue("artifact-dir");
  if (!artifactDir) {
    console.error("Missing required --artifact-dir");
    process.exit(2);
  }

  const limit = Number.parseInt(getArgValue("limit") ?? "20", 10);
  const rows = collectTrendRows(path.resolve(artifactDir));
  if (rows.length === 0) {
    console.error(`No router-eval artifacts found in ${artifactDir}`);
    process.exit(2);
  }

  const boundedLimit = Number.isFinite(limit) && limit > 0 ? limit : 20;
  if (process.argv.includes("--dashboard")) {
    console.log(formatDashboard(rows, boundedLimit));
    return;
  }

  console.log(formatTrend(rows, boundedLimit));
}

main();
