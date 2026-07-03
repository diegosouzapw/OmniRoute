import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import test from "node:test";

const trendsScript = "scripts/router-eval/trends.ts";
const subprocessTestOptions = { timeout: 20000 };

function withTempDir<T>(prefix: string, handler: (workspace: string) => T): T {
  const tempRoot = path.join(process.cwd(), ".tmp");
  fs.mkdirSync(tempRoot, { recursive: true });
  const workspace = fs.mkdtempSync(path.join(tempRoot, prefix));
  try {
    return handler(workspace);
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
}

function artifact(generatedAt: string, configId: string, aiq: number) {
  return {
    kind: "router-eval-report",
    source: "fixture",
    report: {
      generatedAt,
      totalObservations: 1,
      bestConfigId: configId,
      bestAiq: aiq,
      configs: [
        {
          configId,
          totalObservations: 1,
          matchObservations: 1,
          successfulObservations: 1,
          avgLatencyMs: 100,
          avgCostUsd: 0.004,
          accuracyRate: 1,
          successRate: 1,
          aiqScore: aiq,
        },
      ],
      paretoFrontier: [],
      medianAccuracyRate: 1,
    },
  };
}

test("router eval trends reads retained and flat artifacts with limit", subprocessTestOptions, () => {
  withTempDir("router-eval-trends-", (workspace) => {
    const runA = path.join(workspace, "run-a");
    const runB = path.join(workspace, "run-b");
    fs.mkdirSync(runA);
    fs.mkdirSync(runB);
    fs.writeFileSync(path.join(runA, "router-eval.json"), JSON.stringify(artifact("2026-01-01T00:00:00.000Z", "old", 80)));
    fs.writeFileSync(path.join(runB, "router-eval.json"), JSON.stringify(artifact("2026-01-02T00:00:00.000Z", "new", 90)));
    fs.writeFileSync(path.join(workspace, "flat.json"), JSON.stringify(artifact("2026-01-03T00:00:00.000Z", "flat", 95)));
    fs.writeFileSync(path.join(workspace, "bad.json"), "{not json");

    const result = spawnSync(
      "bun",
      [trendsScript, "--artifact-dir", workspace, "--limit", "2"],
      { encoding: "utf8" }
    );

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout ?? "", /Router Eval Trends/);
    assert.doesNotMatch(result.stdout ?? "", /run-a/);
    assert.match(result.stdout ?? "", /run-b/);
    assert.match(result.stdout ?? "", /flat/);
  });
});

test("router eval trends can print dashboard summaries", subprocessTestOptions, () => {
  withTempDir("router-eval-dashboard-", (workspace) => {
    const runA = path.join(workspace, "run-a");
    const runB = path.join(workspace, "run-b");
    fs.mkdirSync(runA);
    fs.mkdirSync(runB);
    fs.writeFileSync(path.join(runA, "router-eval.json"), JSON.stringify(artifact("2026-01-01T00:00:00.000Z", "old", 80)));
    fs.writeFileSync(path.join(runB, "router-eval.json"), JSON.stringify(artifact("2026-01-02T00:00:00.000Z", "new", 90)));

    const result = spawnSync(
      "bun",
      [trendsScript, "--artifact-dir", workspace, "--dashboard"],
      { encoding: "utf8" }
    );

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout ?? "", /Router Eval Dashboard/);
    assert.match(result.stdout ?? "", /Latest: run-b/);
    assert.match(result.stdout ?? "", /AIQ: 90\.0000 \(\+10\.0000\)/);
    assert.match(result.stdout ?? "", /Rolling Averages/);
  });
});

test("router eval trends tolerates sparse report artifacts", subprocessTestOptions, () => {
  withTempDir("router-eval-sparse-", (workspace) => {
    fs.writeFileSync(
      path.join(workspace, "sparse.json"),
      JSON.stringify({
        kind: "router-eval-report",
        source: "legacy",
        report: {
          generatedAt: "2026-01-01T00:00:00.000Z",
          bestConfigId: "legacy-best",
          bestAiq: 72,
          totalObservations: 3,
        },
      })
    );

    const result = spawnSync(
      "bun",
      [trendsScript, "--artifact-dir", workspace],
      { encoding: "utf8" }
    );

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout ?? "", /legacy-best/);
    assert.match(result.stdout ?? "", /72\.0000/);
  });
});

test("router eval trends tolerates sparse comparison artifacts", subprocessTestOptions, () => {
  withTempDir("router-eval-sparse-comparison-", (workspace) => {
    const runDir = path.join(workspace, "run-sparse");
    fs.mkdirSync(runDir);
    fs.writeFileSync(
      path.join(runDir, "router-eval.json"),
      JSON.stringify({
        kind: "router-eval-comparison",
        candidateSource: "legacy-candidate",
        comparison: {
          regressed: false,
          candidateAiq: 81,
          candidate: {
            generatedAt: "2026-01-02T00:00:00.000Z",
            bestConfigId: "candidate-best",
            totalObservations: 4,
          },
        },
      })
    );

    const result = spawnSync(
      "bun",
      [trendsScript, "--artifact-dir", workspace],
      { encoding: "utf8" }
    );

    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout ?? "", /candidate-best/);
    assert.match(result.stdout ?? "", /81\.0000/);
  });
});

test("router eval trends exits clearly for empty artifact dirs", subprocessTestOptions, () => {
  withTempDir("router-eval-empty-", (workspace) => {
    const result = spawnSync(
      "bun",
      [trendsScript, "--artifact-dir", workspace],
      { encoding: "utf8" }
    );

    assert.equal(result.status, 2);
    assert.match(result.stderr ?? "", /No router-eval artifacts found/);
  });
});
