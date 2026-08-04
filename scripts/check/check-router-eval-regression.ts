#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

type Args = {
  baseline: string;
  candidate: string;
  baselinePatch?: string;
  candidatePatch?: string;
  output: string;
  jsonOutput: string;
  patchOutput: string;
  patchJsonOutput: string;
  artifactDir?: string;
  runId: string;
  maxAiqDrop: string;
  maxCostIncrease: string;
  maxPatchAiqDrop: string;
  maxPatchCostIncrease: string;
  maxPatchLatencyIncrease: string;
  maxPatchRegressionIncrease: string;
};

type GateManifest = {
  schemaVersion: 1;
  kind: "router-eval-gate-run";
  runId: string;
  generatedAt: string;
  command: string[];
  thresholds: {
    maxAiqDrop: number;
    maxCostIncrease: number;
    patch?: {
      maxAiqDrop: number;
      maxCostIncrease: number;
      maxLatencyIncrease: number;
      maxRegressionIncrease: number;
    };
  };
  inputs: {
    baseline: string;
    candidate: string;
    baselinePatch?: string;
    candidatePatch?: string;
  };
  outputs: {
    markdown: string;
    json: string;
    patchMarkdown?: string;
    patchJson?: string;
  };
  environment: {
    runtime: "bun" | "node";
    platform: NodeJS.Platform;
  };
  result: {
    status: number;
  };
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
const defaultFixtureDir = path.join(repoRoot, "tests/fixtures/router-eval");
const defaultArtifactDir = path.join(os.tmpdir(), "omniroute-router-eval");

function getArgValue(name: string): string | undefined {
  const index = process.argv.indexOf(`--${name}`);
  if (index < 0) return undefined;
  const value = process.argv[index + 1];
  return value && !value.startsWith("--") ? value : undefined;
}

function readArgs(): Args {
  const artifactDir = getArgValue("artifact-dir");
  const runId = getArgValue("run-id") ?? new Date().toISOString().replace(/[:.]/g, "-");
  const retainedDir = artifactDir ? path.join(path.resolve(artifactDir), runId) : undefined;
  return {
    baseline: getArgValue("baseline") ?? path.join(defaultFixtureDir, "baseline.ndjson"),
    candidate: getArgValue("candidate") ?? path.join(defaultFixtureDir, "candidate.ndjson"),
    baselinePatch: getArgValue("baseline-patch"),
    candidatePatch: getArgValue("candidate-patch"),
    output: getArgValue("output") ?? path.join(retainedDir ?? defaultArtifactDir, "router-eval.md"),
    jsonOutput:
      getArgValue("json-output") ??
      path.join(retainedDir ?? defaultArtifactDir, "router-eval.json"),
    patchOutput:
      getArgValue("patch-output") ??
      path.join(retainedDir ?? defaultArtifactDir, "patch-comparison.md"),
    patchJsonOutput:
      getArgValue("patch-json-output") ??
      path.join(retainedDir ?? defaultArtifactDir, "patch-comparison.json"),
    artifactDir,
    runId,
    maxAiqDrop: getArgValue("max-aiq-drop") ?? "1",
    maxCostIncrease: getArgValue("max-cost-increase") ?? "0.05",
    maxPatchAiqDrop: getArgValue("max-patch-aiq-drop") ?? "1",
    maxPatchCostIncrease: getArgValue("max-patch-cost-increase") ?? "0.05",
    maxPatchLatencyIncrease: getArgValue("max-patch-latency-increase") ?? "0.05",
    maxPatchRegressionIncrease: getArgValue("max-patch-regression-increase") ?? "0",
  };
}

function ensureReadable(filePath: string, label: string): void {
  if (!fs.existsSync(filePath)) {
    console.error(`[router-eval] ${label} missing: ${filePath}`);
    process.exit(2);
  }
}

function writeRetainedRun(args: Args, status: number): void {
  if (!args.artifactDir) return;

  const runDir = path.join(path.resolve(args.artifactDir), args.runId);
  const inputDir = path.join(runDir, "inputs");
  fs.mkdirSync(inputDir, { recursive: true });

  const baselineCopy = path.join(inputDir, "baseline.ndjson");
  const candidateCopy = path.join(inputDir, "candidate.ndjson");
  fs.copyFileSync(args.baseline, baselineCopy);
  fs.copyFileSync(args.candidate, candidateCopy);
  const baselinePatchCopy = args.baselinePatch
    ? path.join(inputDir, "baseline.patch.json")
    : undefined;
  const candidatePatchCopy = args.candidatePatch
    ? path.join(inputDir, "candidate.patch.json")
    : undefined;
  if (args.baselinePatch && baselinePatchCopy)
    fs.copyFileSync(args.baselinePatch, baselinePatchCopy);
  if (args.candidatePatch && candidatePatchCopy)
    fs.copyFileSync(args.candidatePatch, candidatePatchCopy);

  const manifest: GateManifest = {
    schemaVersion: 1,
    kind: "router-eval-gate-run",
    runId: args.runId,
    generatedAt: new Date().toISOString(),
    command: process.argv.slice(1),
    thresholds: {
      maxAiqDrop: Number.parseFloat(args.maxAiqDrop),
      maxCostIncrease: Number.parseFloat(args.maxCostIncrease),
      ...(args.baselinePatch && args.candidatePatch
        ? {
            patch: {
              maxAiqDrop: Number.parseFloat(args.maxPatchAiqDrop),
              maxCostIncrease: Number.parseFloat(args.maxPatchCostIncrease),
              maxLatencyIncrease: Number.parseFloat(args.maxPatchLatencyIncrease),
              maxRegressionIncrease: Number.parseFloat(args.maxPatchRegressionIncrease),
            },
          }
        : {}),
    },
    inputs: {
      baseline: path.relative(runDir, baselineCopy),
      candidate: path.relative(runDir, candidateCopy),
      ...(baselinePatchCopy && candidatePatchCopy
        ? {
            baselinePatch: path.relative(runDir, baselinePatchCopy),
            candidatePatch: path.relative(runDir, candidatePatchCopy),
          }
        : {}),
    },
    outputs: {
      markdown: path.relative(runDir, args.output),
      json: path.relative(runDir, args.jsonOutput),
      ...(args.baselinePatch && args.candidatePatch
        ? {
            patchMarkdown: path.relative(runDir, args.patchOutput),
            patchJson: path.relative(runDir, args.patchJsonOutput),
          }
        : {}),
    },
    environment: {
      runtime: isBunRuntime ? "bun" : "node",
      platform: process.platform,
    },
    result: {
      status,
    },
  };

  fs.writeFileSync(path.join(runDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
}

function runPatchGate(args: Args): number {
  if (!args.baselinePatch && !args.candidatePatch) return 0;
  if (!args.baselinePatch || !args.candidatePatch) {
    console.error("[router-eval] --baseline-patch and --candidate-patch must be provided together");
    return 2;
  }
  ensureReadable(args.baselinePatch, "baseline patch");
  ensureReadable(args.candidatePatch, "candidate patch");
  fs.mkdirSync(path.dirname(args.patchOutput), { recursive: true });
  fs.mkdirSync(path.dirname(args.patchJsonOutput), { recursive: true });

  const result = runTypeScriptScript([
    "scripts/router-eval/patch-compare.ts",
    "--baseline",
    args.baselinePatch,
    "--candidate",
    args.candidatePatch,
    "--output",
    args.patchOutput,
    "--json-output",
    args.patchJsonOutput,
    "--run-id",
    args.runId,
    "--max-aiq-drop",
    args.maxPatchAiqDrop,
    "--max-cost-increase",
    args.maxPatchCostIncrease,
    "--max-latency-increase",
    args.maxPatchLatencyIncrease,
    "--max-regression-increase",
    args.maxPatchRegressionIncrease,
    "--fail-on-regression",
  ]);

  if (result.error) {
    console.error(`[router-eval] failed to launch patch compare: ${result.error.message}`);
    return 1;
  }
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  return result.status ?? 1;
}

function main(): void {
  const args = readArgs();
  ensureReadable(args.baseline, "baseline corpus");
  ensureReadable(args.candidate, "candidate corpus");
  fs.mkdirSync(path.dirname(args.output), { recursive: true });
  fs.mkdirSync(path.dirname(args.jsonOutput), { recursive: true });

  const result = runTypeScriptScript([
    "scripts/router-eval/index.ts",
    "--input",
    args.candidate,
    "--baseline-input",
    args.baseline,
    "--max-aiq-drop",
    args.maxAiqDrop,
    "--max-cost-increase",
    args.maxCostIncrease,
    "--output",
    args.output,
    "--json-output",
    args.jsonOutput,
    "--fail-on-regression",
  ]);

  if (result.error) {
    console.error(`[router-eval] failed to launch evaluator: ${result.error.message}`);
    process.exit(1);
  }

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  if (result.status === 0) {
    const patchStatus = runPatchGate(args);
    writeRetainedRun(args, patchStatus);
    if (patchStatus !== 0) {
      console.error(`[router-eval] patch gate failed with exit code ${patchStatus}`);
      process.exit(patchStatus);
    }
    const retention = args.artifactDir ? ` retained run ${args.runId}` : " temp run";
    console.log(`[router-eval] OK -${retention}; artifacts: ${args.output}, ${args.jsonOutput}`);
    return;
  }

  writeRetainedRun(args, result.status ?? 1);
  console.error(`[router-eval] regression gate failed with exit code ${result.status ?? 1}`);
  process.exit(result.status ?? 1);
}

main();
