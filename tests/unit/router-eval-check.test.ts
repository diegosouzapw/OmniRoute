import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import test from "node:test";

const checkScript = "scripts/check/check-router-eval-regression.ts";
const subprocessTestOptions = { timeout: 20000 };

function withTempDir<T>(handler: (workspace: string) => T): T {
  const tempRoot = path.join(process.cwd(), ".tmp");
  fs.mkdirSync(tempRoot, { recursive: true });
  const workspace = fs.mkdtempSync(path.join(tempRoot, "router-eval-check-"));
  try {
    return handler(workspace);
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
}

function writeJsonl(filePath: string, row: Record<string, unknown>): void {
  fs.writeFileSync(filePath, `${JSON.stringify(row)}\n`, "utf8");
}

test("router eval check writes markdown and JSON artifacts", subprocessTestOptions, () => {
  withTempDir((workspace) => {
    const baseline = path.join(workspace, "baseline.ndjson");
    const candidate = path.join(workspace, "candidate.ndjson");
    const markdown = path.join(workspace, "router-eval.md");
    const json = path.join(workspace, "router-eval.json");

    writeJsonl(baseline, {
      sample_id: "b1",
      config_id: "priority",
      selected_model: "gpt-4.1",
      expected_model: "gpt-4.1",
      latency_ms: 140,
      cost_usd: 0.004,
      status: 200,
    });
    writeJsonl(candidate, {
      sample_id: "c1",
      config_id: "priority",
      selected_model: "gpt-4.1",
      expected_model: "gpt-4.1",
      latency_ms: 130,
      cost_usd: 0.004,
      status: 200,
    });

    const result = spawnSync(
      "bun",
      [checkScript, "--baseline", baseline, "--candidate", candidate, "--output", markdown, "--json-output", json],
      { encoding: "utf8" }
    );

    assert.equal(result.status, 0, result.stderr);
    assert.match(fs.readFileSync(markdown, "utf8"), /Router Eval Regression Comparison/);
    const artifact = JSON.parse(fs.readFileSync(json, "utf8")) as Record<string, unknown>;
    assert.equal(artifact.kind, "router-eval-comparison");
  });
});

test("router eval check uses the checked-in fixture corpus by default", subprocessTestOptions, () => {
  withTempDir((workspace) => {
    const markdown = path.join(workspace, "router-eval.md");
    const json = path.join(workspace, "router-eval.json");

    const result = spawnSync(
      "bun",
      [checkScript, "--output", markdown, "--json-output", json],
      { encoding: "utf8" }
    );

    assert.equal(result.status, 0, result.stderr);
    assert.match(fs.readFileSync(markdown, "utf8"), /Router Eval Regression Comparison/);
    const artifact = JSON.parse(fs.readFileSync(json, "utf8")) as Record<string, unknown>;
    assert.equal(artifact.kind, "router-eval-comparison");
    assert.match(JSON.stringify(artifact), /tests\/fixtures\/router-eval\/candidate\.ndjson/);
  });
});

test("router eval check retains run inputs, outputs, and manifest", subprocessTestOptions, () => {
  withTempDir((workspace) => {
    const baseline = path.join(workspace, "baseline.ndjson");
    const candidate = path.join(workspace, "candidate.ndjson");
    const artifactDir = path.join(workspace, "artifacts");
    const runId = "run-001";

    writeJsonl(baseline, {
      sample_id: "b1",
      config_id: "priority",
      selected_model: "gpt-4.1",
      expected_model: "gpt-4.1",
      latency_ms: 140,
      cost_usd: 0.004,
      status: 200,
    });
    writeJsonl(candidate, {
      sample_id: "c1",
      config_id: "priority",
      selected_model: "gpt-4.1",
      expected_model: "gpt-4.1",
      latency_ms: 130,
      cost_usd: 0.004,
      status: 200,
    });

    const checkResult = spawnSync(
      "bun",
      [checkScript, "--baseline", baseline, "--candidate", candidate, "--artifact-dir", artifactDir, "--run-id", runId],
      { encoding: "utf8" }
    );
    const trendResult = spawnSync(
      "bun",
      ["scripts/router-eval/trends.ts", "--artifact-dir", artifactDir],
      { encoding: "utf8" }
    );

    assert.equal(checkResult.status, 0, checkResult.stderr);
    assert.match(fs.readFileSync(path.join(artifactDir, runId, "router-eval.md"), "utf8"), /Router Eval Regression Comparison/);
    assert.match(fs.readFileSync(path.join(artifactDir, runId, "router-eval.json"), "utf8"), /router-eval-comparison/);
    assert.match(fs.readFileSync(path.join(artifactDir, runId, "inputs", "baseline.ndjson"), "utf8"), /sample_id/);
    assert.match(fs.readFileSync(path.join(artifactDir, runId, "inputs", "candidate.ndjson"), "utf8"), /sample_id/);
    const manifest = JSON.parse(fs.readFileSync(path.join(artifactDir, runId, "manifest.json"), "utf8")) as Record<string, unknown>;
    assert.equal(manifest.schemaVersion, 1);
    assert.equal(manifest.kind, "router-eval-gate-run");
    assert.equal(manifest.runId, runId);
    assert.equal(trendResult.status, 0, trendResult.stderr);
    assert.match(trendResult.stdout ?? "", /Router Eval Trends/);
    assert.match(trendResult.stdout ?? "", /run-001/);
  });
});
