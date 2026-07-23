#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import type { RouterConfigAggregate, RouterEvalArtifact } from "@/lib/routerEval/index.ts";

type Candidate = {
  name: string;
  path: string;
};

type SearchResult = {
  candidateName: string;
  configId: string;
  runId: string;
  aiq: number;
  avgCostUsd: number;
  avgLatencyMs: number;
  regressions: number;
  artifactPath: string;
};

type SearchObjective = "balanced" | "quality" | "cost" | "latency";

type SearchRecommendation = SearchResult & {
  objective: SearchObjective;
  rank: number;
  rationale: string;
};

type RouterConfigSuggestion = {
  schemaVersion: 1;
  kind: "router-config-suggestion";
  generatedAt: string;
  objective: SearchObjective;
  recommendedConfigId: string;
  sourceRunId: string;
  sourceArtifactPath: string;
  evidence: {
    aiq: number;
    avgCostUsd: number;
    avgLatencyMs: number;
    regressions: number;
  };
  applyPolicy: "manual-review";
  rationale: string;
};

type RouterConfigPatchArtifact = {
  schemaVersion: 1;
  kind: "router-config-patch";
  generatedAt: string;
  applyPolicy: "manual-review";
  source: {
    objective: SearchObjective;
    runId: string;
    artifactPath: string;
  };
  operations: Array<{
    op: "recommend-router-config";
    path: "/router/recommendedConfigId";
    value: string;
    evidence: RouterConfigSuggestion["evidence"];
    rationale: string;
  }>;
};

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const isBunRuntime = "Bun" in globalThis;

function runTypeScriptScript(args: string[]) {
  return spawnSync(process.execPath, isBunRuntime ? args : ["--import", "tsx", ...args], {
    cwd: repoRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function getArgValue(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  if (index < 0) return undefined;
  const value = process.argv[index + 1];
  return value && !value.startsWith("--") ? value : undefined;
}

function getArgValues(name: string): string[] {
  const values: string[] = [];
  for (let index = 0; index < process.argv.length; index += 1) {
    if (process.argv[index] !== `--${name}`) continue;
    const value = process.argv[index + 1];
    if (value && !value.startsWith("--")) values.push(value);
  }
  return values;
}

function usage(): string {
  return [
    "Usage:",
    "  npm run eval:router:search -- --baseline <baseline.ndjson>",
    "       --candidate <name=path.ndjson> [--candidate <name=path.ndjson> ...]",
    "       [--objective balanced|quality|cost|latency]",
    "       [--artifact-dir <dir>] [--run-id <id>] [--max-aiq-drop <n>] [--max-cost-increase <n>]",
    "",
    "Ranks candidate corpora by router-eval AIQ while retaining comparison artifacts.",
  ].join("\n");
}

function requireArg(name: string): string {
  const value = getArgValue(name);
  if (!value) {
    console.error(`Missing required --${name}`);
    process.exit(2);
  }
  return value;
}

function parseCandidate(raw: string): Candidate {
  const splitAt = raw.indexOf("=");
  if (splitAt <= 0 || splitAt === raw.length - 1) {
    console.error(`Invalid --candidate value: ${raw}. Expected name=path.ndjson`);
    process.exit(2);
  }
  return {
    name: raw.slice(0, splitAt),
    path: raw.slice(splitAt + 1),
  };
}

function ensureReadable(filePath: string, label: string): void {
  if (!fs.existsSync(filePath)) {
    console.error(`[router-eval:search] ${label} missing: ${filePath}`);
    process.exit(2);
  }
}

function readArtifact(filePath: string): RouterEvalArtifact {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as RouterEvalArtifact;
}

function parseObjective(value: string | undefined): SearchObjective {
  if (!value) return "balanced";
  if (value === "balanced" || value === "quality" || value === "cost" || value === "latency") {
    return value;
  }
  console.error(
    `Invalid --objective value: ${value}. Expected balanced, quality, cost, or latency.`
  );
  process.exit(2);
}

function compareConfigsByObjective(
  objective: SearchObjective,
  a: RouterConfigAggregate,
  b: RouterConfigAggregate
): number {
  if (objective === "cost") {
    return a.avgCostUsd - b.avgCostUsd || b.aiq - a.aiq || a.avgLatencyMs - b.avgLatencyMs;
  }
  if (objective === "latency") {
    return a.avgLatencyMs - b.avgLatencyMs || b.aiq - a.aiq || a.avgCostUsd - b.avgCostUsd;
  }
  return b.aiq - a.aiq || a.avgCostUsd - b.avgCostUsd || a.avgLatencyMs - b.avgLatencyMs;
}

function selectBestConfig(
  artifact: RouterEvalArtifact,
  objective: SearchObjective
): RouterConfigAggregate | undefined {
  const configs =
    artifact.comparison?.candidate.configurations ??
    artifact.report?.configurations ??
    artifact.report?.top ??
    [];
  return [...configs].sort((a, b) => compareConfigsByObjective(objective, a, b))[0];
}

function resultFromArtifact(
  candidateName: string,
  runId: string,
  artifactPath: string,
  objective: SearchObjective
): SearchResult {
  const artifact = readArtifact(artifactPath);
  const best = selectBestConfig(artifact, objective);
  if (!best) {
    throw new Error(`No best candidate found in ${artifactPath}`);
  }
  return {
    candidateName,
    configId: best.configId,
    runId,
    aiq: best.aiq,
    avgCostUsd: best.avgCostUsd,
    avgLatencyMs: best.avgLatencyMs,
    regressions: artifact.comparison?.regressions.length ?? 0,
    artifactPath,
  };
}

function formatSearch(results: SearchResult[]): string {
  const lines = [
    "# Router Eval Search",
    "",
    "| Rank | Candidate | AIQ | Avg Cost | Avg Latency | Regressions | Run |",
    "| ---: | --- | ---: | ---: | ---: | ---: | --- |",
  ];
  results.forEach((result, index) => {
    lines.push(
      `| ${index + 1} | ${result.candidateName} | ${result.aiq.toFixed(3)} | $${result.avgCostUsd.toFixed(6)} | ${result.avgLatencyMs.toFixed(2)}ms | ${result.regressions} | ${result.runId} |`
    );
  });
  return `${lines.join("\n")}\n`;
}

function compareByObjective(objective: SearchObjective, a: SearchResult, b: SearchResult): number {
  if (objective === "cost") {
    return (
      a.regressions - b.regressions ||
      a.avgCostUsd - b.avgCostUsd ||
      b.aiq - a.aiq ||
      a.avgLatencyMs - b.avgLatencyMs
    );
  }
  if (objective === "latency") {
    return (
      a.regressions - b.regressions ||
      a.avgLatencyMs - b.avgLatencyMs ||
      b.aiq - a.aiq ||
      a.avgCostUsd - b.avgCostUsd
    );
  }
  if (objective === "quality") {
    return (
      b.aiq - a.aiq ||
      a.regressions - b.regressions ||
      a.avgCostUsd - b.avgCostUsd ||
      a.avgLatencyMs - b.avgLatencyMs
    );
  }
  return (
    b.aiq - a.aiq ||
    a.regressions - b.regressions ||
    a.avgCostUsd - b.avgCostUsd ||
    a.avgLatencyMs - b.avgLatencyMs
  );
}

function recommendationRationale(objective: SearchObjective, result: SearchResult): string {
  if (objective === "cost") {
    return `${result.candidateName} has the best cost-first rank with ${result.regressions} regressions and $${result.avgCostUsd.toFixed(6)} average cost.`;
  }
  if (objective === "latency") {
    return `${result.candidateName} has the best latency-first rank with ${result.regressions} regressions and ${result.avgLatencyMs.toFixed(2)}ms average latency.`;
  }
  if (objective === "quality") {
    return `${result.candidateName} has the best quality-first rank with ${result.aiq.toFixed(3)} AIQ.`;
  }
  return `${result.candidateName} has the best balanced rank with ${result.aiq.toFixed(3)} AIQ, ${result.regressions} regressions, $${result.avgCostUsd.toFixed(6)} average cost, and ${result.avgLatencyMs.toFixed(2)}ms average latency.`;
}

function createRecommendation(
  objective: SearchObjective,
  results: SearchResult[]
): SearchRecommendation {
  const winner = results[0];
  if (!winner) {
    throw new Error("Cannot create a recommendation without search results");
  }
  return {
    ...winner,
    objective,
    rank: 1,
    rationale: recommendationRationale(objective, winner),
  };
}

function createConfigSuggestion(
  generatedAt: string,
  recommendation: SearchRecommendation
): RouterConfigSuggestion {
  return {
    schemaVersion: 1,
    kind: "router-config-suggestion",
    generatedAt,
    objective: recommendation.objective,
    recommendedConfigId: recommendation.configId,
    sourceRunId: recommendation.runId,
    sourceArtifactPath: recommendation.artifactPath,
    evidence: {
      aiq: recommendation.aiq,
      avgCostUsd: recommendation.avgCostUsd,
      avgLatencyMs: recommendation.avgLatencyMs,
      regressions: recommendation.regressions,
    },
    applyPolicy: "manual-review",
    rationale: recommendation.rationale,
  };
}

function createConfigPatch(suggestion: RouterConfigSuggestion): RouterConfigPatchArtifact {
  return {
    schemaVersion: 1,
    kind: "router-config-patch",
    generatedAt: suggestion.generatedAt,
    applyPolicy: "manual-review",
    source: {
      objective: suggestion.objective,
      runId: suggestion.sourceRunId,
      artifactPath: suggestion.sourceArtifactPath,
    },
    operations: [
      {
        op: "recommend-router-config",
        path: "/router/recommendedConfigId",
        value: suggestion.recommendedConfigId,
        evidence: suggestion.evidence,
        rationale: suggestion.rationale,
      },
    ],
  };
}

function formatPatchOperations(patch: RouterConfigPatchArtifact): string {
  const lines = [
    "## Patch Operations",
    "",
    "| Op | Path | Value | AIQ | Avg Cost | Avg Latency | Regressions | Apply Policy |",
    "| --- | --- | --- | ---: | ---: | ---: | ---: | --- |",
  ];
  for (const operation of patch.operations) {
    lines.push(
      `| ${operation.op} | ${operation.path} | ${operation.value} | ${operation.evidence.aiq.toFixed(3)} | $${operation.evidence.avgCostUsd.toFixed(6)} | ${operation.evidence.avgLatencyMs.toFixed(2)}ms | ${operation.evidence.regressions} | ${patch.applyPolicy} |`
    );
  }
  return `${lines.join("\n")}\n`;
}

function main(): void {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(usage());
    return;
  }

  const baseline = requireArg("baseline");
  ensureReadable(baseline, "baseline corpus");
  const candidates = getArgValues("candidate").map(parseCandidate);
  if (candidates.length === 0) {
    console.error("At least one --candidate <name=path> is required");
    process.exit(2);
  }

  const artifactDir = getArgValue("artifact-dir") ?? "artifacts/router-eval/search";
  const searchId = getArgValue("run-id") ?? new Date().toISOString().replace(/[:.]/g, "-");
  const objective = parseObjective(getArgValue("objective"));
  const maxAiqDrop = getArgValue("max-aiq-drop") ?? "1";
  const maxCostIncrease = getArgValue("max-cost-increase") ?? "0.05";
  const searchDir = path.resolve(artifactDir, searchId);
  fs.mkdirSync(searchDir, { recursive: true });

  const results: SearchResult[] = [];
  for (const candidate of candidates) {
    ensureReadable(candidate.path, `${candidate.name} corpus`);
    const runId = `${searchId}-${candidate.name}`;
    const result = runTypeScriptScript([
      "scripts/router-eval/compare.ts",
      "--baseline",
      baseline,
      "--candidate",
      candidate.path,
      "--baseline-name",
      "baseline",
      "--candidate-name",
      candidate.name,
      "--artifact-dir",
      searchDir,
      "--run-id",
      runId,
      "--max-aiq-drop",
      maxAiqDrop,
      "--max-cost-increase",
      maxCostIncrease,
    ]);
    if (result.stdout) process.stdout.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    if (result.error) {
      console.error(
        `[router-eval:search] failed to launch ${candidate.name}: ${result.error.message}`
      );
      process.exit(1);
    }
    if (result.status !== 0) {
      console.error(
        `[router-eval:search] comparison failed for ${candidate.name} with exit code ${result.status ?? 1}`
      );
      process.exit(result.status ?? 1);
    }
    const artifactPath = path.join(searchDir, runId, "router-eval.json");
    results.push(resultFromArtifact(candidate.name, runId, artifactPath, objective));
  }

  results.sort((a, b) => compareByObjective(objective, a, b));

  const recommendation = createRecommendation(objective, results);
  const generatedAt = new Date().toISOString();
  const suggestion = createConfigSuggestion(generatedAt, recommendation);
  const patch = createConfigPatch(suggestion);
  const markdown = `${formatSearch(results)}## Recommendation\n\n${recommendation.rationale}\n\n${formatPatchOperations(patch)}`;
  const summary = {
    schemaVersion: 1,
    kind: "router-eval-search",
    generatedAt,
    baseline: path.resolve(baseline),
    objective,
    recommendation,
    suggestion,
    patch,
    results,
  };
  fs.writeFileSync(path.join(searchDir, "search.md"), markdown);
  fs.writeFileSync(path.join(searchDir, "search.json"), `${JSON.stringify(summary, null, 2)}\n`);
  fs.writeFileSync(
    path.join(searchDir, "recommendation.json"),
    `${JSON.stringify(recommendation, null, 2)}\n`
  );
  fs.writeFileSync(
    path.join(searchDir, "suggestion.json"),
    `${JSON.stringify(suggestion, null, 2)}\n`
  );
  fs.writeFileSync(
    path.join(searchDir, "router-config.patch.json"),
    `${JSON.stringify(patch, null, 2)}\n`
  );
  console.log(markdown);
  console.log(`[router-eval:search] artifacts: ${searchDir}`);
}

main();
