import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const compareScript = "scripts/router-eval/compare.ts";

test("router eval compare retains named comparison artifacts", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-compare-"));
  const baseline = join(dir, "baseline.ndjson");
  const candidate = join(dir, "candidate.ndjson");
  const artifactDir = join(dir, "artifacts");
  const runId = "policy-a-vs-policy-b";

  writeFileSync(
    baseline,
    JSON.stringify({
      sampleId: "b1",
      configId: "policy-a",
      selectedModel: "gpt-4.1",
      expectedModel: "gpt-4.1",
      latencyMs: 140,
      costUsd: 0.004,
      success: true,
    })
  );
  writeFileSync(
    candidate,
    JSON.stringify({
      sampleId: "c1",
      configId: "policy-b",
      selectedModel: "gpt-4.1",
      expectedModel: "gpt-4.1",
      latencyMs: 130,
      costUsd: 0.004,
      success: true,
    })
  );

  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      compareScript,
      "--baseline",
      baseline,
      "--candidate",
      candidate,
      "--baseline-name",
      "policy-a",
      "--candidate-name",
      "policy-b",
      "--artifact-dir",
      artifactDir,
      "--run-id",
      runId,
    ],
    { encoding: "utf8" }
  );

  try {
    assert.equal(result.status, 0);
    assert.ok((result.stdout ?? "").includes("Router Eval Comparison"));
    const runDir = join(artifactDir, runId);
    assert.ok(
      readFileSync(join(runDir, "router-eval.md"), "utf8").includes("Router Eval Comparison")
    );
    assert.ok(
      readFileSync(join(runDir, "router-eval.json"), "utf8").includes("router-eval-comparison")
    );
    const comparison = JSON.parse(readFileSync(join(runDir, "comparison.json"), "utf8")) as Record<
      string,
      unknown
    >;
    assert.equal(comparison.baselineName, "policy-a");
    assert.equal(comparison.candidateName, "policy-b");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
