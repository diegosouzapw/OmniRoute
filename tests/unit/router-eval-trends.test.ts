import test from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const trendsScript = "scripts/router-eval/trends.ts";

function artifact(generatedAt: string, configId: string, aiq: number) {
  return {
    schemaVersion: 1,
    kind: "router-eval-report",
    generatedAt,
    report: {
      evaluatedAt: generatedAt,
      summary: {
        totalSamples: 1,
        validSamples: 1,
        droppedSamples: 0,
        uniqueConfigs: 1,
      },
      configurations: [],
      frontier: [],
      top: [
        {
          configId,
          samples: 1,
          successRate: 1,
          avgLatencyMs: 100,
          p50LatencyMs: 100,
          p95LatencyMs: 100,
          avgCostUsd: 0.004,
          aiq,
        },
      ],
    },
  };
}

test("router eval trends reads retained and flat artifacts with limit", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-trends-"));
  const runA = join(dir, "run-a");
  const runB = join(dir, "run-b");
  mkdirSync(runA);
  mkdirSync(runB);
  writeFileSync(
    join(runA, "router-eval.json"),
    JSON.stringify(artifact("2026-01-01T00:00:00.000Z", "old", 80))
  );
  writeFileSync(
    join(runB, "router-eval.json"),
    JSON.stringify(artifact("2026-01-02T00:00:00.000Z", "new", 90))
  );
  writeFileSync(
    join(dir, "flat.json"),
    JSON.stringify(artifact("2026-01-03T00:00:00.000Z", "flat", 95))
  );
  writeFileSync(join(dir, "bad.json"), "{not json");

  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", trendsScript, "--artifact-dir", dir, "--limit", "2"],
    {
      encoding: "utf8",
    }
  );

  try {
    assert.equal(result.status, 0);
    assert.ok((result.stdout ?? "").includes("Router Eval Trends"));
    assert.ok(!(result.stdout ?? "").includes("run-a"));
    assert.ok((result.stdout ?? "").includes("run-b"));
    assert.ok((result.stdout ?? "").includes("flat"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router eval trends can print dashboard summaries", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-dashboard-"));
  const runA = join(dir, "run-a");
  const runB = join(dir, "run-b");
  mkdirSync(runA);
  mkdirSync(runB);
  writeFileSync(
    join(runA, "router-eval.json"),
    JSON.stringify(artifact("2026-01-01T00:00:00.000Z", "old", 80))
  );
  writeFileSync(
    join(runB, "router-eval.json"),
    JSON.stringify(artifact("2026-01-02T00:00:00.000Z", "new", 90))
  );

  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", trendsScript, "--artifact-dir", dir, "--dashboard"],
    {
      encoding: "utf8",
    }
  );

  try {
    assert.equal(result.status, 0);
    assert.ok((result.stdout ?? "").includes("Router Eval Dashboard"));
    assert.ok((result.stdout ?? "").includes("Latest: run-b"));
    assert.ok((result.stdout ?? "").includes("AIQ: 90.000 (+10.000)"));
    assert.ok((result.stdout ?? "").includes("Rolling Averages"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router eval trends exits clearly for empty artifact dirs", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-trends-empty-"));
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", trendsScript, "--artifact-dir", dir],
    { encoding: "utf8" }
  );

  try {
    assert.equal(result.status, 2);
    assert.ok((result.stderr ?? "").includes("No router-eval artifacts found"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
