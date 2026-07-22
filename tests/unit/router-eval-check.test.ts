import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const checkScript = "scripts/check/check-router-eval-regression.ts";

function writePatch(
  file: string,
  configId: string,
  aiq: number,
  costUsd: number,
  latencyMs: number
) {
  writeFileSync(
    file,
    `${JSON.stringify(
      {
        schemaVersion: 1,
        kind: "router-config-patch",
        generatedAt: "2026-07-03T00:00:00.000Z",
        applyPolicy: "manual-review",
        source: {
          objective: "balanced",
          runId: `${configId}-run`,
          artifactPath: `/tmp/${configId}/router-eval.json`,
        },
        operations: [
          {
            op: "recommend-router-config",
            path: "/router/recommendedConfigId",
            value: configId,
            evidence: {
              aiq,
              avgCostUsd: costUsd,
              avgLatencyMs: latencyMs,
              regressions: 0,
            },
            rationale: `${configId} wins`,
          },
        ],
      },
      null,
      2
    )}\n`
  );
}

test("router eval check writes artifacts and passes non-regressing corpora", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-check-"));
  const baseline = join(dir, "baseline.ndjson");
  const candidate = join(dir, "candidate.ndjson");
  const markdown = join(dir, "router-eval.md");
  const json = join(dir, "router-eval.json");

  writeFileSync(
    baseline,
    JSON.stringify({
      sampleId: "b1",
      configId: "priority",
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
      configId: "priority",
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
      checkScript,
      "--baseline",
      baseline,
      "--candidate",
      candidate,
      "--output",
      markdown,
      "--json-output",
      json,
    ],
    { encoding: "utf8" }
  );

  try {
    assert.equal(result.status, 0);
    assert.ok(readFileSync(markdown, "utf8").includes("Router Eval Comparison"));
    const artifact = JSON.parse(readFileSync(json, "utf8")) as Record<string, unknown>;
    assert.equal(artifact.kind, "router-eval-comparison");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router eval check can include patch compare as a retained gate", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-patch-gate-"));
  const baseline = join(dir, "baseline.ndjson");
  const candidate = join(dir, "candidate.ndjson");
  const baselinePatch = join(dir, "baseline.patch.json");
  const candidatePatch = join(dir, "candidate.patch.json");
  const artifactDir = join(dir, "artifacts");
  const runId = "patch-gate-001";

  writeFileSync(
    baseline,
    JSON.stringify({
      sampleId: "b1",
      configId: "priority",
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
      configId: "priority",
      selectedModel: "gpt-4.1",
      expectedModel: "gpt-4.1",
      latencyMs: 130,
      costUsd: 0.004,
      success: true,
    })
  );
  writePatch(baselinePatch, "balanced-v1", 92, 0.005, 150);
  writePatch(candidatePatch, "balanced-v2", 94, 0.004, 120);

  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      checkScript,
      "--baseline",
      baseline,
      "--candidate",
      candidate,
      "--baseline-patch",
      baselinePatch,
      "--candidate-patch",
      candidatePatch,
      "--artifact-dir",
      artifactDir,
      "--run-id",
      runId,
    ],
    { encoding: "utf8" }
  );

  try {
    assert.equal(result.status, 0);
    assert.ok(
      readFileSync(join(artifactDir, runId, "patch-comparison.md"), "utf8").includes(
        "Router Config Patch Comparison"
      )
    );
    assert.ok(
      readFileSync(join(artifactDir, runId, "patch-comparison.json"), "utf8").includes(
        "router-config-patch-comparison"
      )
    );
    assert.ok(
      readFileSync(join(artifactDir, runId, "inputs", "baseline.patch.json"), "utf8").includes(
        "router-config-patch"
      )
    );
    assert.ok(
      readFileSync(join(artifactDir, runId, "inputs", "candidate.patch.json"), "utf8").includes(
        "router-config-patch"
      )
    );
    const manifest = JSON.parse(
      readFileSync(join(artifactDir, runId, "manifest.json"), "utf8")
    ) as {
      inputs?: { baselinePatch?: string; candidatePatch?: string };
      outputs?: { patchMarkdown?: string; patchJson?: string };
      thresholds?: { patch?: { maxLatencyIncrease?: number } };
    };
    assert.equal(manifest.inputs?.baselinePatch, "inputs/baseline.patch.json");
    assert.equal(manifest.inputs?.candidatePatch, "inputs/candidate.patch.json");
    assert.equal(manifest.outputs?.patchMarkdown, "patch-comparison.md");
    assert.equal(manifest.outputs?.patchJson, "patch-comparison.json");
    assert.equal(manifest.thresholds?.patch?.maxLatencyIncrease, 0.05);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router eval check fails when patch gate regresses beyond thresholds", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-patch-gate-fail-"));
  const baseline = join(dir, "baseline.ndjson");
  const candidate = join(dir, "candidate.ndjson");
  const baselinePatch = join(dir, "baseline.patch.json");
  const candidatePatch = join(dir, "candidate.patch.json");
  const artifactDir = join(dir, "artifacts");
  const runId = "patch-gate-fail-001";

  writeFileSync(
    baseline,
    JSON.stringify({
      sampleId: "b1",
      configId: "priority",
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
      configId: "priority",
      selectedModel: "gpt-4.1",
      expectedModel: "gpt-4.1",
      latencyMs: 130,
      costUsd: 0.004,
      success: true,
    })
  );
  writePatch(baselinePatch, "balanced-v1", 95, 0.004, 120);
  writePatch(candidatePatch, "balanced-v2", 90, 0.008, 200);

  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      checkScript,
      "--baseline",
      baseline,
      "--candidate",
      candidate,
      "--baseline-patch",
      baselinePatch,
      "--candidate-patch",
      candidatePatch,
      "--artifact-dir",
      artifactDir,
      "--run-id",
      runId,
      "--max-patch-aiq-drop",
      "1",
      "--max-patch-cost-increase",
      "0.1",
      "--max-patch-latency-increase",
      "0.1",
    ],
    { encoding: "utf8" }
  );

  try {
    assert.equal(result.status, 1);
    assert.match(result.stderr ?? "", /patch gate failed/);
    const comparison = JSON.parse(
      readFileSync(join(artifactDir, runId, "patch-comparison.json"), "utf8")
    ) as {
      result?: { passed?: boolean; status?: number };
      regressions?: string[];
    };
    assert.equal(comparison.result?.passed, false);
    assert.equal(comparison.result?.status, 1);
    assert.ok((comparison.regressions?.length ?? 0) >= 2);
    const manifest = JSON.parse(
      readFileSync(join(artifactDir, runId, "manifest.json"), "utf8")
    ) as {
      result?: { status?: number };
    };
    assert.equal(manifest.result?.status, 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router eval check rejects unpaired patch inputs", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-patch-unpaired-"));
  const baseline = join(dir, "baseline.ndjson");
  const candidate = join(dir, "candidate.ndjson");
  const baselinePatch = join(dir, "baseline.patch.json");
  const candidatePatch = join(dir, "candidate.patch.json");
  const artifactDir = join(dir, "artifacts");
  const runId = "unpaired-001";

  writeFileSync(
    baseline,
    JSON.stringify({
      sampleId: "b1",
      configId: "priority",
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
      configId: "priority",
      selectedModel: "gpt-4.1",
      expectedModel: "gpt-4.1",
      latencyMs: 130,
      costUsd: 0.004,
      success: true,
    })
  );
  writePatch(baselinePatch, "balanced-v1", 95, 0.004, 120);
  writePatch(candidatePatch, "balanced-v2", 96, 0.003, 110);

  const baselineOnly = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      checkScript,
      "--baseline",
      baseline,
      "--candidate",
      candidate,
      "--baseline-patch",
      baselinePatch,
      "--artifact-dir",
      artifactDir,
      "--run-id",
      runId,
    ],
    { encoding: "utf8" }
  );
  const candidateOnly = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      checkScript,
      "--baseline",
      baseline,
      "--candidate",
      candidate,
      "--candidate-patch",
      candidatePatch,
    ],
    { encoding: "utf8" }
  );

  try {
    assert.equal(baselineOnly.status, 2);
    assert.match(baselineOnly.stderr ?? "", /baseline-patch and --candidate-patch/);
    const manifest = JSON.parse(
      readFileSync(join(artifactDir, runId, "manifest.json"), "utf8")
    ) as {
      result?: { status?: number };
      inputs?: { baselinePatch?: string; candidatePatch?: string };
    };
    assert.equal(manifest.result?.status, 2);
    assert.equal(manifest.inputs?.baselinePatch, undefined);
    assert.equal(manifest.inputs?.candidatePatch, undefined);
    assert.equal(candidateOnly.status, 2);
    assert.match(candidateOnly.stderr ?? "", /baseline-patch and --candidate-patch/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router eval check can retain artifacts for trend summaries", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-retained-"));
  const baseline = join(dir, "baseline.ndjson");
  const candidate = join(dir, "candidate.ndjson");
  const artifactDir = join(dir, "artifacts");
  const runId = "run-001";

  writeFileSync(
    baseline,
    JSON.stringify({
      sampleId: "b1",
      configId: "priority",
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
      configId: "priority",
      selectedModel: "gpt-4.1",
      expectedModel: "gpt-4.1",
      latencyMs: 130,
      costUsd: 0.004,
      success: true,
    })
  );

  const checkResult = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      checkScript,
      "--baseline",
      baseline,
      "--candidate",
      candidate,
      "--artifact-dir",
      artifactDir,
      "--run-id",
      runId,
    ],
    { encoding: "utf8" }
  );

  const trendResult = spawnSync(
    process.execPath,
    ["--import", "tsx", "scripts/router-eval/trends.ts", "--artifact-dir", artifactDir],
    { encoding: "utf8" }
  );

  try {
    assert.equal(checkResult.status, 0);
    assert.ok(
      readFileSync(join(artifactDir, runId, "router-eval.md"), "utf8").includes(
        "Router Eval Comparison"
      )
    );
    assert.ok(
      readFileSync(join(artifactDir, runId, "router-eval.json"), "utf8").includes(
        "router-eval-comparison"
      )
    );
    assert.ok(
      readFileSync(join(artifactDir, runId, "inputs", "baseline.ndjson"), "utf8").includes(
        "sampleId"
      )
    );
    assert.ok(
      readFileSync(join(artifactDir, runId, "inputs", "candidate.ndjson"), "utf8").includes(
        "sampleId"
      )
    );
    const manifest = JSON.parse(
      readFileSync(join(artifactDir, runId, "manifest.json"), "utf8")
    ) as Record<string, unknown>;
    assert.equal(manifest.schemaVersion, 1);
    assert.equal(manifest.kind, "router-eval-gate-run");
    assert.equal(manifest.runId, runId);
    assert.deepEqual(manifest.inputs, {
      baseline: "inputs/baseline.ndjson",
      candidate: "inputs/candidate.ndjson",
    });
    assert.deepEqual(manifest.outputs, {
      markdown: "router-eval.md",
      json: "router-eval.json",
    });
    assert.equal(trendResult.status, 0);
    assert.ok((trendResult.stdout ?? "").includes("Router Eval Trends"));
    assert.ok((trendResult.stdout ?? "").includes(runId));
    assert.ok((trendResult.stdout ?? "").includes("| jsonl | all |"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
