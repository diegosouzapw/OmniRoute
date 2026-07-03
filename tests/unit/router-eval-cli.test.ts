import path from "node:path";
import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

import { runRouterEvalCli } from "../../scripts/router-eval/index.ts";

function writeJsonl(filePath: string, rows: Array<Record<string, unknown>>): string {
  const payload = rows.map((row) => JSON.stringify(row)).join("\n");
  fs.writeFileSync(filePath, `${payload}\n`, "utf8");
  return filePath;
}

async function withTempFiles<T>(handler: (workspace: string) => Promise<T>): Promise<T> {
  const tempRoot = path.join(process.cwd(), ".tmp");
  fs.mkdirSync(tempRoot, { recursive: true });
  const workspace = fs.mkdtempSync(path.join(tempRoot, "router-eval-"));
  try {
    return await handler(workspace);
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
}

test("runRouterEvalCli renders markdown from JSONL replay", async () => {
  const result = await withTempFiles(async (workspace) => {
    const file = path.join(workspace, "candidate.jsonl");
    writeJsonl(file, [
      {
        sample_id: "s1",
        config_id: "alpha",
        expected_model: "gpt-4o",
        selected_model: "gpt-4o",
        latency_ms: 120,
        cost_usd: 0.002,
        status: 200,
      },
      {
        sample_id: "s2",
        config_id: "beta",
        expected_model: "gpt-4o",
        selected_model: "claude-3",
        latency_ms: 80,
        cost_usd: 0.001,
        status: 200,
      },
    ]);
    return runRouterEvalCli(["--input", file]);
  });
  assert.equal(result.code, 0);
  assert.match(result.output, /# Router Eval Report/);
  assert.match(result.output, /\| alpha \|/);
});

test("runRouterEvalCli emits regression status and fail code", async () => {
  const result = await withTempFiles(async (workspace) => {
    const candidate = path.join(workspace, "candidate.jsonl");
    const baseline = path.join(workspace, "baseline.jsonl");

    writeJsonl(candidate, [
      {
        sample_id: "a",
        config_id: "cand",
        expected_model: "m1",
        selected_model: "m2",
        latency_ms: 300,
        cost_usd: 2,
        status: 200,
      },
    ]);
    writeJsonl(baseline, [
      {
        sample_id: "a",
        config_id: "base",
        expected_model: "m1",
        selected_model: "m1",
        latency_ms: 100,
        cost_usd: 1,
        status: 200,
      },
    ]);

    return runRouterEvalCli([
      "--input",
      candidate,
      "--baseline-input",
      baseline,
      "--fail-on-regression",
    ]);
  });
  assert.equal(result.code, 2);
  assert.match(result.output, /Router Eval Regression Comparison/);
  assert.match(result.output, /Result: regression detected\./);
});

test("runRouterEvalCli writes JSON report artifact", async () => {
  const result = await withTempFiles(async (workspace) => {
    const input = path.join(workspace, "candidate.jsonl");
    const output = path.join(workspace, "report.json");
    writeJsonl(input, [
      {
        sample_id: "s1",
        config_id: "alpha",
        expected_model: "gpt-4o",
        selected_model: "gpt-4o",
        latency_ms: 120,
        cost_usd: 0.002,
        status: 200,
      },
    ]);

    const cliResult = await runRouterEvalCli(["--input", input, "--json", "--out", output]);
    const artifact = JSON.parse(fs.readFileSync(output, "utf8"));
    return { cliResult, artifact };
  });

  assert.equal(result.cliResult.code, 0);
  assert.equal(result.artifact.kind, "router-eval-report");
  assert.equal(result.artifact.report.totalObservations, 1);
  assert.equal(result.artifact.report.bestConfigId, "alpha");
});

test("runRouterEvalCli emits JSON comparison artifact", async () => {
  const result = await withTempFiles(async (workspace) => {
    const candidate = path.join(workspace, "candidate.jsonl");
    const baseline = path.join(workspace, "baseline.jsonl");
    const output = path.join(workspace, "comparison.json");

    writeJsonl(candidate, [
      {
        sample_id: "a",
        config_id: "cand",
        expected_model: "m1",
        selected_model: "m2",
        latency_ms: 300,
        cost_usd: 2,
        status: 200,
      },
    ]);
    writeJsonl(baseline, [
      {
        sample_id: "a",
        config_id: "base",
        expected_model: "m1",
        selected_model: "m1",
        latency_ms: 100,
        cost_usd: 1,
        status: 200,
      },
    ]);

    const cliResult = await runRouterEvalCli([
      "--input",
      candidate,
      "--baseline-input",
      baseline,
      "--json",
      "--out",
      output,
      "--fail-on-regression",
    ]);
    const artifact = JSON.parse(fs.readFileSync(output, "utf8"));
    return { cliResult, artifact };
  });

  assert.equal(result.cliResult.code, 2);
  assert.equal(result.artifact.kind, "router-eval-comparison");
  assert.equal(result.artifact.comparison.regressed, true);
});

test("runRouterEvalCli returns help text with --help", async () => {
  const result = await runRouterEvalCli(["--help"]);
  assert.equal(result.code, 0);
  assert.match(result.output, /Usage:/);
  assert.match(result.output, /--baseline-input/);
});
