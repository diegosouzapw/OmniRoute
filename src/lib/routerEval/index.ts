type JsonRecord = Record<string, unknown>;

export type RouterObservation = {
  sampleId: string;
  routeInput: JsonRecord;
  configId: string;
  selectedModel: string | null;
  expectedModel: string | null;
  latencyMs: number;
  costUsd: number;
  success: boolean;
  timestamp: string;
  metadata: JsonRecord;
};

export type RouterObservationInput = {
  sampleId?: unknown;
  id?: unknown;
  routeInput?: unknown;
  configId?: unknown;
  selectedModel?: unknown;
  model?: unknown;
  expectedModel?: unknown;
  requestedModel?: unknown;
  latencyMs?: unknown;
  latency?: unknown;
  durationMs?: unknown;
  duration?: unknown;
  costUsd?: unknown;
  cost?: unknown;
  success?: unknown;
  status?: unknown;
  error?: unknown;
  timestamp?: unknown;
  tokens?: {
    input?: unknown;
    output?: unknown;
  };
  metadata?: unknown;
};

export type RouterConfigAggregate = {
  configId: string;
  samples: number;
  successRate: number;
  avgLatencyMs: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  avgCostUsd: number;
  aiq: number;
};

export type RouterEvalReport = {
  evaluatedAt: string;
  summary: {
    totalSamples: number;
    validSamples: number;
    droppedSamples: number;
    uniqueConfigs: number;
  };
  configurations: RouterConfigAggregate[];
  frontier: RouterConfigAggregate[];
  top: RouterConfigAggregate[];
};

export type RouterEvalComparison = {
  baseline: RouterEvalReport;
  candidate: RouterEvalReport;
  delta: {
    aiq: number;
    costUsd: number;
  };
  regressions: string[];
};

export type RouterEvalArtifact = {
  schemaVersion: 1;
  kind: "router-eval-report" | "router-eval-comparison";
  generatedAt: string;
  metadata?: RouterEvalArtifactMetadata;
  report?: RouterEvalReport;
  comparison?: RouterEvalComparison;
};

export type RouterEvalArtifactMetadata = {
  candidate?: {
    source: string;
    path?: string;
    dbSource?: string;
  };
  baseline?: {
    source: string;
    path?: string;
    dbSource?: string;
  };
  window?: {
    since?: string;
    limit?: number;
  };
  thresholds?: {
    maxAiqDrop: number;
    maxCostIncrease: number;
  };
  outputs?: {
    markdown?: string;
    json?: string;
    corpus?: string;
  };
};

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim().length > 0 ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  if (typeof value === "number") return value !== 0;
  return fallback;
}

function percentile(sortedValues: number[], p: number): number {
  if (sortedValues.length === 0) return 0;
  if (sortedValues.length === 1) return sortedValues[0];
  const bounded = Math.min(1, Math.max(0, p));
  const index = Math.floor((sortedValues.length - 1) * bounded);
  return sortedValues[index] ?? 0;
}

function computeAiq(successRate: number, avgLatencyMs: number, avgCostUsd: number): number {
  const latencyPenalty = avgLatencyMs / 1_000;
  const costPenalty = avgCostUsd * 1_000;
  return Number((successRate * 100 - latencyPenalty - costPenalty).toFixed(3));
}

function aggregateValues(values: number[]) {
  if (values.length === 0) return { avg: 0, p50: 0, p95: 0 };
  const sorted = [...values].sort((a, b) => a - b);
  const sum = sorted.reduce((acc, value) => acc + value, 0);
  return {
    avg: sum / sorted.length,
    p50: percentile(sorted, 0.5),
    p95: percentile(sorted, 0.95),
  };
}

function resolveObservationSampleId(value: RouterObservationInput): string {
  return asString(value.sampleId ?? value.id, "").trim();
}

function resolveObservationModelFields(value: RouterObservationInput): {
  selectedModel: string | null;
  expectedModel: string | null;
} {
  const selectedModel = asString(value.selectedModel ?? value.model);
  const expectedModel = asString(value.expectedModel ?? value.requestedModel, null);
  return { selectedModel: selectedModel || null, expectedModel };
}

function resolveObservationLatencyMs(value: RouterObservationInput): number {
  return asNumber(value.latencyMs ?? value.latency ?? value.durationMs ?? value.duration, 0);
}

function resolveObservationCostUsd(value: RouterObservationInput): number {
  const explicitCost = asNumber(value.costUsd ?? value.cost, NaN);
  if (!Number.isNaN(explicitCost)) return explicitCost;

  const promptTokens = asNumber(value.tokens?.input);
  const completionTokens = asNumber(value.tokens?.output);
  return Number(((promptTokens + completionTokens) * 0.000001).toFixed(6));
}

function resolveObservationSuccess(value: RouterObservationInput): boolean {
  const status = asNumber(value.status, 500);
  const statusIndicatesSuccess = status >= 200 && status < 400;
  return asBoolean(value.success, statusIndicatesSuccess && !value.error);
}

export function toRouterObservation(input: unknown): RouterObservation | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;

  const value = input as RouterObservationInput;
  const sampleId = resolveObservationSampleId(value);
  if (!sampleId) return null;

  const { selectedModel, expectedModel } = resolveObservationModelFields(value);

  return {
    sampleId,
    routeInput: asRecord(value.routeInput, {}),
    configId: asString(value.configId, "default"),
    selectedModel,
    expectedModel,
    latencyMs: resolveObservationLatencyMs(value),
    costUsd: resolveObservationCostUsd(value),
    success: resolveObservationSuccess(value),
    timestamp: asString(value.timestamp, new Date(0).toISOString()),
    metadata: asRecord(value.metadata),
  };
}

export function summarizeRouterObservations(observations: RouterObservation[]) {
  const byConfig = new Map<string, RouterObservation[]>();
  for (const obs of observations) {
    if (!byConfig.has(obs.configId)) byConfig.set(obs.configId, []);
    byConfig.get(obs.configId)?.push(obs);
  }

  const configurations: RouterConfigAggregate[] = [];
  for (const [configId, rows] of byConfig) {
    const latencies = rows.map((row) => Math.max(0, row.latencyMs));
    const costs = rows.map((row) => Math.max(0, row.costUsd));
    const latencyStats = aggregateValues(latencies);
    const costStats = aggregateValues(costs);
    const successCount = rows.filter((row) => row.success).length;
    const successRate = rows.length === 0 ? 0 : successCount / rows.length;
    configurations.push({
      configId,
      samples: rows.length,
      successRate,
      avgLatencyMs: latencyStats.avg,
      p50LatencyMs: latencyStats.p50,
      p95LatencyMs: latencyStats.p95,
      avgCostUsd: costStats.avg,
      aiq: computeAiq(successRate, latencyStats.avg, costStats.avg),
    });
  }

  const top = [...configurations].sort(
    (a, b) =>
      b.aiq - a.aiq ||
      b.successRate - a.successRate ||
      a.avgLatencyMs - b.avgLatencyMs ||
      a.avgCostUsd - b.avgCostUsd
  );
  const frontier = computeParetoFrontier(configurations);

  return {
    configurations: configurations.sort((a, b) => b.aiq - a.aiq),
    frontier,
    top,
  };
}

export function runRouterEval(observations: RouterObservation[]): RouterEvalReport {
  const valid = observations.filter((value) => Boolean(value.selectedModel));
  const droppedSamples = observations.length - valid.length;
  const { configurations, frontier, top } = summarizeRouterObservations(valid);

  return {
    evaluatedAt: new Date().toISOString(),
    summary: {
      totalSamples: observations.length,
      validSamples: valid.length,
      droppedSamples,
      uniqueConfigs: configurations.length,
    },
    configurations,
    frontier,
    top,
  };
}

export function computeParetoFrontier(configs: RouterConfigAggregate[]) {
  const ordered = [...configs].sort(
    (a, b) => a.avgCostUsd - b.avgCostUsd || a.avgLatencyMs - b.avgLatencyMs
  );
  const frontier: RouterConfigAggregate[] = [];

  for (const config of ordered) {
    const dominated = frontier.some(
      (candidate) =>
        candidate.aiq >= config.aiq &&
        candidate.avgCostUsd <= config.avgCostUsd &&
        candidate.avgLatencyMs <= config.avgLatencyMs
    );
    if (!dominated) frontier.push(config);
  }

  return frontier.sort((a, b) => b.aiq - a.aiq || a.avgCostUsd - b.avgCostUsd);
}

export function compareRouterEvalRuns(
  baseline: RouterEvalReport,
  candidate: RouterEvalReport,
  thresholds: {
    aiqDrop: number;
    relativeCostIncrease: number;
  } = { aiqDrop: 0, relativeCostIncrease: 0 }
) {
  const baselineBest = baseline.top[0];
  const candidateBest = candidate.top[0];
  const regressions: string[] = [];
  if (!baselineBest || !candidateBest) {
    return { baseline, candidate, delta: { aiq: 0, costUsd: 0 }, regressions };
  }

  const aiq = candidateBest.aiq - baselineBest.aiq;
  const baselineCost = baselineBest.avgCostUsd;
  const cost = candidateBest.avgCostUsd;
  const costIncrease =
    baselineCost === 0 ? (cost > 0 ? Infinity : 0) : (cost - baselineCost) / baselineCost;

  if (aiq < -Math.abs(thresholds.aiqDrop)) {
    regressions.push(`AIQ dropped by ${(-aiq).toFixed(3)} below threshold`);
  }

  if (costIncrease > thresholds.relativeCostIncrease) {
    regressions.push(`cost increased by ${(costIncrease * 100).toFixed(2)}% above threshold`);
  }

  return {
    baseline,
    candidate,
    delta: {
      aiq,
      costUsd: costIncrease * baselineCost,
    },
    regressions,
  };
}

export function formatRouterEvalReport(report: RouterEvalReport): string {
  const best = report.top[0];
  const lines = [
    "# Router Eval Report",
    `Generated: ${report.evaluatedAt}`,
    `Samples: ${report.summary.validSamples}/${report.summary.totalSamples} valid, ${report.summary.uniqueConfigs} config(s)`,
    "",
    "## Top Configurations",
    "",
    "| Config | Samples | AIQ | Success | Avg Latency | p50 | p95 | Avg Cost |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
  ];

  for (const config of report.top.slice(0, 10)) {
    lines.push(
      `| ${config.configId} | ${config.samples} | ${config.aiq.toFixed(3)} | ${(config.successRate * 100).toFixed(2)}% | ${config.avgLatencyMs.toFixed(2)}ms | ${config.p50LatencyMs.toFixed(2)}ms | ${config.p95LatencyMs.toFixed(2)}ms | $${config.avgCostUsd.toFixed(6)} |`
    );
  }

  if (best) {
    lines.push("");
    lines.push(`Best: **${best.configId}** (AIQ ${best.aiq.toFixed(3)})`);
  }

  if (report.frontier.length > 0) {
    lines.push("");
    lines.push("## Pareto Frontier");
    lines.push("");
    lines.push("| Config | AIQ | Cost | Latency |");
    lines.push("| --- | ---: | ---: | ---: |");
    for (const config of report.frontier) {
      lines.push(
        `| ${config.configId} | ${config.aiq.toFixed(3)} | $${config.avgCostUsd.toFixed(6)} | ${config.avgLatencyMs.toFixed(2)}ms |`
      );
    }
  }

  return `${lines.join("\n")}\n`;
}

export function formatRouterEvalComparison(comparison: RouterEvalComparison): string {
  const bestCandidate = comparison.candidate.top[0];
  const bestBaseline = comparison.baseline.top[0];
  const passes = comparison.regressions.length === 0;
  const lines = [
    "# Router Eval Comparison",
    `Passed: ${passes ? "✅" : "❌"}`,
    `AIQ delta: ${comparison.delta.aiq.toFixed(3)}`,
    `Cost delta: $${comparison.delta.costUsd.toFixed(6)}`,
    "",
  ];

  if (bestBaseline && bestCandidate) {
    lines.push(`Baseline best: ${bestBaseline.configId} (AIQ ${bestBaseline.aiq.toFixed(3)})`);
    lines.push(`Candidate best: ${bestCandidate.configId} (AIQ ${bestCandidate.aiq.toFixed(3)})`);
    lines.push("");
  }

  if (comparison.regressions.length > 0) {
    lines.push("## Regressions");
    for (const reason of comparison.regressions) {
      lines.push(`- ${reason}`);
    }
  }

  return `${lines.join("\n")}\n`;
}

export function createRouterEvalArtifact(
  value: RouterEvalReport | RouterEvalComparison,
  metadata?: RouterEvalArtifactMetadata
): RouterEvalArtifact {
  if ("candidate" in value && "baseline" in value) {
    return {
      schemaVersion: 1,
      kind: "router-eval-comparison",
      generatedAt: value.candidate.evaluatedAt,
      metadata,
      comparison: value,
    };
  }

  return {
    schemaVersion: 1,
    kind: "router-eval-report",
    generatedAt: value.evaluatedAt,
    metadata,
    report: value,
  };
}
