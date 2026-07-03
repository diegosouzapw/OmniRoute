#!/usr/bin/env bun
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

type Args = {
  baseline: string;
  candidate: string;
  output: string;
  jsonOutput: string;
  artifactDir?: string;
  runId: string;
};

type GateManifest = {
  schemaVersion: 1;
  kind: "router-eval-gate-run";
  runId: string;
  generatedAt: string;
  command: string[];
  inputs: {
    baseline: string;
    candidate: string;
  };
  outputs: {
    markdown: string;
    json: string;
  };
  environment: {
    runtime: "bun";
    platform: NodeJS.Platform;
  };
  result: {
    status: number;
  };
};

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
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
    output: getArgValue("output") ?? path.join(retainedDir ?? defaultArtifactDir, "router-eval.md"),
    jsonOutput: getArgValue("json-output") ?? path.join(retainedDir ?? defaultArtifactDir, "router-eval.json"),
    artifactDir,
    runId,
  };
}

function ensureReadable(filePath: string, label: string): void {
  if (!filePath || !fs.existsSync(filePath)) {
    console.error(`[router-eval] ${label} missing: ${filePath || "(not provided)"}`);
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

  const manifest: GateManifest = {
    schemaVersion: 1,
    kind: "router-eval-gate-run",
    runId: args.runId,
    generatedAt: new Date().toISOString(),
    command: process.argv.slice(1),
    inputs: {
      baseline: path.relative(runDir, baselineCopy),
      candidate: path.relative(runDir, candidateCopy),
    },
    outputs: {
      markdown: path.relative(runDir, args.output),
      json: path.relative(runDir, args.jsonOutput),
    },
    environment: {
      runtime: "bun",
      platform: process.platform,
    },
    result: {
      status,
    },
  };

  fs.writeFileSync(path.join(runDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
}

function main(): void {
  const args = readArgs();
  ensureReadable(args.baseline, "baseline corpus");
  ensureReadable(args.candidate, "candidate corpus");
  fs.mkdirSync(path.dirname(args.output), { recursive: true });
  fs.mkdirSync(path.dirname(args.jsonOutput), { recursive: true });

  const markdownResult = spawnSync(
    "bun",
    [
      "scripts/router-eval/index.ts",
      "--input",
      args.candidate,
      "--baseline-input",
      args.baseline,
      "--output",
      args.output,
    ],
    {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  if (markdownResult.error) {
    console.error(`[router-eval] failed to launch bun: ${markdownResult.error.message}`);
    process.exit(1);
  }
  if (markdownResult.stderr) process.stderr.write(markdownResult.stderr);

  const result = spawnSync(
    "bun",
    [
      "scripts/router-eval/index.ts",
      "--input",
      args.candidate,
      "--baseline-input",
      args.baseline,
      "--json",
      "--out",
      args.jsonOutput,
      "--fail-on-regression",
    ],
    {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }
  );

  if (result.error) {
    console.error(`[router-eval] failed to launch bun: ${result.error.message}`);
    process.exit(1);
  }

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  const status = result.status ?? 1;
  writeRetainedRun(args, status);
  if (status === 0) {
    const retention = args.artifactDir ? ` retained run ${args.runId}` : " temp run";
    console.log(`[router-eval] OK -${retention}; artifacts: ${args.output}, ${args.jsonOutput}`);
    return;
  }

  console.error(`[router-eval] regression gate failed with exit code ${status}`);
  process.exit(status);
}

main();
