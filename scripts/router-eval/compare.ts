#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

type Args = {
  baseline: string;
  candidate: string;
  baselineName: string;
  candidateName: string;
  artifactDir: string;
  runId: string;
  maxAiqDrop: string;
  maxCostIncrease: string;
  failOnRegression: boolean;
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

function usage(): string {
  return [
    "Usage:",
    "  npm run eval:router:compare -- --baseline <baseline.ndjson> --candidate <candidate.ndjson>",
    "       [--baseline-name <name>] [--candidate-name <name>] [--artifact-dir <dir>]",
    "       [--run-id <id>] [--max-aiq-drop <n>] [--max-cost-increase <n>] [--fail-on-regression]",
    "",
    "Runs a named baseline-vs-candidate router-eval comparison and retains artifacts.",
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

function readArgs(): Args {
  const baselineName = getArgValue("baseline-name") ?? "baseline";
  const candidateName = getArgValue("candidate-name") ?? "candidate";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return {
    baseline: requireArg("baseline"),
    candidate: requireArg("candidate"),
    baselineName,
    candidateName,
    artifactDir: getArgValue("artifact-dir") ?? "artifacts/router-eval/comparisons",
    runId: getArgValue("run-id") ?? `${baselineName}-vs-${candidateName}-${timestamp}`,
    maxAiqDrop: getArgValue("max-aiq-drop") ?? "1",
    maxCostIncrease: getArgValue("max-cost-increase") ?? "0.05",
    failOnRegression: process.argv.includes("--fail-on-regression"),
  };
}

function ensureReadable(filePath: string, label: string): void {
  if (!fs.existsSync(filePath)) {
    console.error(`[router-eval:compare] ${label} missing: ${filePath}`);
    process.exit(2);
  }
}

function main(): void {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log(usage());
    return;
  }

  const args = readArgs();
  ensureReadable(args.baseline, "baseline corpus");
  ensureReadable(args.candidate, "candidate corpus");

  const checkArgs = [
    "scripts/check/check-router-eval-regression.ts",
    "--baseline",
    args.baseline,
    "--candidate",
    args.candidate,
    "--artifact-dir",
    args.artifactDir,
    "--run-id",
    args.runId,
    "--max-aiq-drop",
    args.maxAiqDrop,
    "--max-cost-increase",
    args.maxCostIncrease,
  ];

  const result = runTypeScriptScript(checkArgs);

  if (result.error) {
    console.error(`[router-eval:compare] failed to launch comparison: ${result.error.message}`);
    process.exit(1);
  }

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  const runDir = path.resolve(args.artifactDir, args.runId);
  const labels = {
    baselineName: args.baselineName,
    candidateName: args.candidateName,
    baseline: path.relative(runDir, path.resolve(args.baseline)),
    candidate: path.relative(runDir, path.resolve(args.candidate)),
  };
  fs.mkdirSync(runDir, { recursive: true });
  fs.writeFileSync(path.join(runDir, "comparison.json"), `${JSON.stringify(labels, null, 2)}\n`);

  if (result.status === 0 || !args.failOnRegression) {
    console.log(`[router-eval:compare] artifacts: ${runDir}`);
    return;
  }

  process.exit(result.status ?? 1);
}

main();
