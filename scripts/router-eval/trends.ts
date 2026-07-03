#!/usr/bin/env bun
import fs from "node:fs";
import path from "node:path";

type RouterEvalReportArtifact = {
  kind: "router-eval-report";
  source?: string;
  report?: {
    generatedAt?: string;
    bestConfigId?: string | null;
    bestAiq?: number;
    totalObservations?: number;
    configs?: Array<{
      configId: string;
      avgCostUsd: number | null;
      avgLatencyMs: number | null;
      aiqScore: number;
    }>;
  };
};

type RouterEvalComparisonArtifact = {
  kind: "router-eval-comparison";
  candidateSource?: string;
  comparison?: {
    regressed?: boolean;
    candidateAiq?: number;
    aiqDelta?: number;
    candidate?: RouterEvalReportArtifact["report"];
  };
};

type RouterEvalArtifact = RouterEvalReportArtifact | RouterEvalComparisonArtifact;

type TrendRow = {
  runId: string;
  generatedAt: string;
  kind: string;
  source: string;
  bestConfig: string;
  aiq: number;
  avgCostUsd: number;
  avgLatencyMs: number;
  observations: number;
  regressions: number;
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
    "  bun scripts/router-eval/trends.ts --artifact-dir <dir> [--limit <n>] [--dashboard]",
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

function bestConfig(report: RouterEvalReportArtifact["report"]) {
  if (!report) return null;
  const explicitBest = report.configs?.find((config) => config.configId === report.bestConfigId);
  const listedBest = explicitBest ?? report.configs?.[0] ?? null;
  if (listedBest) return listedBest;
  if (report.bestConfigId) {
    return {
      configId: report.bestConfigId,
      avgCostUsd: 0,
      avgLatencyMs: 0,
      aiqScore: report.bestAiq ?? 0,
    };
  }
  return null;
}

function toTrendRow(runId: string, artifact: RouterEvalArtifact): TrendRow | null {
  const report = artifact.kind === "router-eval-comparison"
    ? artifact.comparison?.candidate
    : artifact.report;
  const best = bestConfig(report);
  if (!report || !best) return null;

  return {
    runId,
    generatedAt: report.generatedAt ?? "",
    kind: artifact.kind,
    source: artifact.kind === "router-eval-comparison" ? artifact.candidateSource ?? "unknown" : artifact.source ?? "unknown",
    bestConfig: best.configId,
    aiq: artifact.kind === "router-eval-comparison"
      ? artifact.comparison?.candidateAiq ?? best.aiqScore
      : report.bestAiq ?? best.aiqScore,
    avgCostUsd: best.avgCostUsd ?? 0,
    avgLatencyMs: best.avgLatencyMs ?? 0,
    observations: report.totalObservations ?? 0,
    regressions: artifact.kind === "router-eval-comparison" && artifact.comparison?.regressed ? 1 : 0,
  };
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
    if (!artifact || !("kind" in artifact)) continue;
    const row = toTrendRow(runId.replace(/\.json$/, ""), artifact);
    if (row) rows.push(row);
  }

  return rows.sort((left, right) => left.generatedAt.localeCompare(right.generatedAt));
}

function formatTrend(rows: TrendRow[], limit: number): string {
  const limited = rows.slice(-limit);
  const lines = [
    "# Router Eval Trends",
    "",
    "| Run | Kind | Source | Best Config | AIQ | Avg Cost | Avg Latency | Observations | Regressions |",
    "| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: |",
  ];

  for (const row of limited) {
    lines.push(
      `| ${row.runId} | ${row.kind} | ${row.source} | ${row.bestConfig} | ${row.aiq.toFixed(4)} | $${row.avgCostUsd.toFixed(4)} | ${row.avgLatencyMs.toFixed(2)}ms | ${row.observations} | ${row.regressions} |`
    );
  }

  return `${lines.join("\n")}\n`;
}

function formatDelta(value: number): string {
  return value > 0 ? `+${value.toFixed(4)}` : value.toFixed(4);
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
    `AIQ: ${latest ? latest.aiq.toFixed(4) : "0.0000"} (${formatDelta(aiqDelta)})`,
    `Avg latency: ${latest ? latest.avgLatencyMs.toFixed(2) : "0.00"}ms (${formatDelta(latencyDelta)}ms)`,
    `Avg cost: $${latest ? latest.avgCostUsd.toFixed(4) : "0.0000"} (${formatDelta(costDelta)})`,
    `Source: ${latest?.source ?? "unknown"}`,
    `Regression count: ${regressions}`,
    "",
    "## Rolling Averages",
    "",
    `AIQ: ${average(limited.map((row) => row.aiq)).toFixed(4)}`,
    `Latency: ${average(limited.map((row) => row.avgLatencyMs)).toFixed(2)}ms`,
    `Cost: $${average(limited.map((row) => row.avgCostUsd)).toFixed(4)}`,
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
  const boundedLimit = Number.isFinite(limit) && limit > 0 ? limit : 20;
  const rows = collectTrendRows(path.resolve(artifactDir));
  if (rows.length === 0) {
    console.error(`No router-eval artifacts found in ${artifactDir}`);
    process.exit(2);
  }

  if (process.argv.includes("--dashboard")) {
    console.log(formatDashboard(rows, boundedLimit));
    return;
  }

  console.log(formatTrend(rows, boundedLimit));
}

main();
