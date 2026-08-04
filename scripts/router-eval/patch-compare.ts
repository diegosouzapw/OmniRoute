#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

type PatchOperation = {
  op?: string;
  path?: string;
  value?: string;
  evidence?: {
    aiq?: number;
    avgCostUsd?: number;
    avgLatencyMs?: number;
    regressions?: number;
  };
  rationale?: string;
};

type RouterConfigPatchArtifact = {
  schemaVersion?: number;
  kind?: string;
  generatedAt?: string;
  applyPolicy?: string;
  source?: {
    objective?: string;
    runId?: string;
    artifactPath?: string;
  };
  operations?: PatchOperation[];
};

type PatchComparison = {
  schemaVersion: 1;
  kind: "router-config-patch-comparison";
  generatedAt: string;
  runId: string;
  thresholds: PatchThresholds;
  baseline: PatchSummary;
  candidate: PatchSummary;
  delta: {
    aiq: number;
    avgCostUsd: number;
    costIncreaseRatio: number;
    avgLatencyMs: number;
    latencyIncreaseRatio: number;
    regressions: number;
  };
  changedRecommendation: boolean;
  regressions: string[];
  result: {
    passed: boolean;
    status: 0 | 1;
  };
};

type PatchThresholds = {
  maxAiqDrop: number;
  maxCostIncrease: number;
  maxLatencyIncrease: number;
  maxRegressionIncrease: number;
};

type PatchSummary = {
  name: string;
  file: string;
  objective: string;
  runId: string;
  recommendedConfigId: string;
  aiq: number;
  avgCostUsd: number;
  avgLatencyMs: number;
  regressions: number;
  applyPolicy: string;
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
    "  npm run eval:router:patch-compare -- --baseline <router-config.patch.json> --candidate <router-config.patch.json>",
    "       [--baseline-name <name>] [--candidate-name <name>] [--artifact-dir <dir>] [--run-id <id>]",
    "       [--output <file>] [--json-output <file>] [--fail-on-regression]",
    "       [--max-aiq-drop <n>] [--max-cost-increase <ratio>] [--max-latency-increase <ratio>]",
    "       [--max-regression-increase <n>]",
    "",
    "Compares two retained router config patch proposals without applying them.",
  ].join("\n");
}

function getNumberArg(name: string, fallback: number): number {
  const value = getArgValue(name);
  if (value === undefined) return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    console.error(`Invalid --${name} value: ${value}`);
    process.exit(2);
  }
  return parsed;
}

function requireArg(name: string): string {
  const value = getArgValue(name);
  if (!value) {
    console.error(`Missing required --${name}`);
    process.exit(2);
  }
  return value;
}

function readPatch(file: string): RouterConfigPatchArtifact {
  if (!fs.existsSync(file)) {
    console.error(`[router-eval:patch-compare] patch file missing: ${file}`);
    process.exit(2);
  }
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as RouterConfigPatchArtifact;
  } catch (error) {
    console.error(
      `[router-eval:patch-compare] invalid JSON in ${file}: ${(error as Error).message}`
    );
    process.exit(2);
  }
}

function requireNumber(value: unknown, field: string, file: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    console.error(`[router-eval:patch-compare] invalid numeric evidence field ${field} in ${file}`);
    process.exit(2);
  }
  return value;
}

function summarizePatch(
  name: string,
  file: string,
  patch: RouterConfigPatchArtifact
): PatchSummary {
  if (patch.kind !== "router-config-patch") {
    console.error(
      `[router-eval:patch-compare] invalid patch kind in ${file}: ${patch.kind ?? "missing"}`
    );
    process.exit(2);
  }
  const operation = patch.operations?.[0];
  if (operation?.op !== "recommend-router-config") {
    console.error(
      `[router-eval:patch-compare] missing recommend-router-config operation in ${file}`
    );
    process.exit(2);
  }
  if (typeof operation.value !== "string" || operation.value.length === 0) {
    console.error(`[router-eval:patch-compare] invalid recommended config value in ${file}`);
    process.exit(2);
  }
  return {
    name,
    file: path.resolve(file),
    objective: patch.source?.objective ?? "unknown",
    runId: patch.source?.runId ?? "unknown",
    recommendedConfigId: operation.value,
    aiq: requireNumber(operation.evidence?.aiq, "aiq", file),
    avgCostUsd: requireNumber(operation.evidence?.avgCostUsd, "avgCostUsd", file),
    avgLatencyMs: requireNumber(operation.evidence?.avgLatencyMs, "avgLatencyMs", file),
    regressions: requireNumber(operation.evidence?.regressions, "regressions", file),
    applyPolicy: patch.applyPolicy ?? "unknown",
  };
}

function increaseRatio(delta: number, baseline: number): number {
  if (baseline === 0) return delta > 0 ? Number.POSITIVE_INFINITY : 0;
  return delta / baseline;
}

function findRegressions(
  baseline: PatchSummary,
  candidate: PatchSummary,
  thresholds: PatchThresholds
): string[] {
  const aiqDrop = baseline.aiq - candidate.aiq;
  const costDelta = candidate.avgCostUsd - baseline.avgCostUsd;
  const latencyDelta = candidate.avgLatencyMs - baseline.avgLatencyMs;
  const regressionDelta = candidate.regressions - baseline.regressions;
  const regressions: string[] = [];
  if (aiqDrop > thresholds.maxAiqDrop) regressions.push(`AIQ dropped by ${aiqDrop.toFixed(3)}`);
  if (increaseRatio(costDelta, baseline.avgCostUsd) > thresholds.maxCostIncrease) {
    regressions.push(
      `average cost increased by ${increaseRatio(costDelta, baseline.avgCostUsd).toFixed(3)}`
    );
  }
  if (increaseRatio(latencyDelta, baseline.avgLatencyMs) > thresholds.maxLatencyIncrease) {
    regressions.push(
      `average latency increased by ${increaseRatio(latencyDelta, baseline.avgLatencyMs).toFixed(3)}`
    );
  }
  if (regressionDelta > thresholds.maxRegressionIncrease) {
    regressions.push(`regression count increased by ${regressionDelta}`);
  }
  return regressions;
}

function comparePatches(
  runId: string,
  thresholds: PatchThresholds,
  failOnRegression: boolean,
  baseline: PatchSummary,
  candidate: PatchSummary
): PatchComparison {
  const regressions = findRegressions(baseline, candidate, thresholds);
  const status = failOnRegression && regressions.length > 0 ? 1 : 0;
  const costDelta = candidate.avgCostUsd - baseline.avgCostUsd;
  const latencyDelta = candidate.avgLatencyMs - baseline.avgLatencyMs;
  return {
    schemaVersion: 1,
    kind: "router-config-patch-comparison",
    generatedAt: new Date().toISOString(),
    runId,
    thresholds,
    baseline,
    candidate,
    delta: {
      aiq: candidate.aiq - baseline.aiq,
      avgCostUsd: costDelta,
      costIncreaseRatio: increaseRatio(costDelta, baseline.avgCostUsd),
      avgLatencyMs: latencyDelta,
      latencyIncreaseRatio: increaseRatio(latencyDelta, baseline.avgLatencyMs),
      regressions: candidate.regressions - baseline.regressions,
    },
    changedRecommendation: baseline.recommendedConfigId !== candidate.recommendedConfigId,
    regressions,
    result: {
      passed: regressions.length === 0,
      status,
    },
  };
}

function formatComparison(comparison: PatchComparison): string {
  return [
    "# Router Config Patch Comparison",
    "",
    `Passed: ${comparison.result.passed ? "yes" : "no"}`,
    `Changed recommendation: ${comparison.changedRecommendation ? "yes" : "no"}`,
    ...(comparison.regressions.length > 0
      ? ["", "## Regressions", "", ...comparison.regressions.map((item) => `- ${item}`)]
      : []),
    "",
    "| Side | Name | Objective | Recommended Config | AIQ | Avg Cost | Avg Latency | Regressions | Apply Policy |",
    "| --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- |",
    formatSummaryRow("Baseline", comparison.baseline),
    formatSummaryRow("Candidate", comparison.candidate),
    "",
    "| Delta | AIQ | Avg Cost | Avg Latency | Regressions |",
    "| --- | ---: | ---: | ---: | ---: |",
    `| Candidate - Baseline | ${comparison.delta.aiq.toFixed(3)} | $${comparison.delta.avgCostUsd.toFixed(6)} | ${comparison.delta.avgLatencyMs.toFixed(2)}ms | ${comparison.delta.regressions} |`,
    "",
  ].join("\n");
}

function formatSummaryRow(side: string, summary: PatchSummary): string {
  return `| ${side} | ${summary.name} | ${summary.objective} | ${summary.recommendedConfigId} | ${summary.aiq.toFixed(3)} | $${summary.avgCostUsd.toFixed(6)} | ${summary.avgLatencyMs.toFixed(2)}ms | ${summary.regressions} | ${summary.applyPolicy} |`;
}

function main(): void {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(usage());
    return;
  }

  const baselineFile = requireArg("baseline");
  const candidateFile = requireArg("candidate");
  const baselineName = getArgValue("baseline-name") ?? "baseline";
  const candidateName = getArgValue("candidate-name") ?? "candidate";
  const runId = getArgValue("run-id") ?? new Date().toISOString().replace(/[:.]/g, "-");
  const thresholds: PatchThresholds = {
    maxAiqDrop: getNumberArg("max-aiq-drop", Number.POSITIVE_INFINITY),
    maxCostIncrease: getNumberArg("max-cost-increase", Number.POSITIVE_INFINITY),
    maxLatencyIncrease: getNumberArg("max-latency-increase", Number.POSITIVE_INFINITY),
    maxRegressionIncrease: getNumberArg("max-regression-increase", Number.POSITIVE_INFINITY),
  };
  const failOnRegression = process.argv.includes("--fail-on-regression");
  const baseline = summarizePatch(baselineName, baselineFile, readPatch(baselineFile));
  const candidate = summarizePatch(candidateName, candidateFile, readPatch(candidateFile));
  const comparison = comparePatches(runId, thresholds, failOnRegression, baseline, candidate);
  const markdown = formatComparison(comparison);
  const artifactDir = getArgValue("artifact-dir");
  const output = getArgValue("output");
  const jsonOutput = getArgValue("json-output");

  if (artifactDir) {
    const runDir = path.resolve(artifactDir, runId);
    fs.mkdirSync(runDir, { recursive: true });
    fs.writeFileSync(path.join(runDir, "patch-comparison.md"), markdown);
    fs.writeFileSync(
      path.join(runDir, "patch-comparison.json"),
      `${JSON.stringify(comparison, null, 2)}\n`
    );
  }
  if (output) {
    fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
    fs.writeFileSync(output, markdown);
  }
  if (jsonOutput) {
    fs.mkdirSync(path.dirname(path.resolve(jsonOutput)), { recursive: true });
    fs.writeFileSync(jsonOutput, `${JSON.stringify(comparison, null, 2)}\n`);
  }
  console.log(markdown);
  process.exit(comparison.result.status);
}

main();
