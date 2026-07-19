import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const compareScript = "scripts/router-eval/patch-compare.ts";

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

test("router config patch compare reports recommendation and metric deltas", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-patch-compare-"));
  const baseline = join(dir, "baseline.patch.json");
  const candidate = join(dir, "candidate.patch.json");
  const jsonOutput = join(dir, "comparison.json");
  const artifactDir = join(dir, "artifacts");

  writePatch(baseline, "balanced-v1", 91, 0.006, 180);
  writePatch(candidate, "balanced-v2", 94, 0.004, 120);

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
      "current",
      "--candidate-name",
      "proposal",
      "--json-output",
      jsonOutput,
      "--artifact-dir",
      artifactDir,
      "--run-id",
      "compare-001",
    ],
    { encoding: "utf8" }
  );

  try {
    assert.equal(result.status, 0);
    assert.ok((result.stdout ?? "").includes("Router Config Patch Comparison"));
    assert.ok((result.stdout ?? "").includes("Changed recommendation: yes"));
    const comparison = JSON.parse(readFileSync(jsonOutput, "utf8")) as {
      kind?: string;
      changedRecommendation?: boolean;
      delta?: { aiq?: number; avgCostUsd?: number; avgLatencyMs?: number };
      candidate?: { recommendedConfigId?: string };
    };
    assert.equal(comparison.kind, "router-config-patch-comparison");
    assert.equal(comparison.changedRecommendation, true);
    assert.equal(comparison.result?.passed, true);
    assert.equal(comparison.candidate?.recommendedConfigId, "balanced-v2");
    assert.equal(comparison.delta?.aiq, 3);
    assert.equal(comparison.delta?.avgCostUsd, -0.002);
    assert.equal(comparison.delta?.avgLatencyMs, -60);
    assert.ok(
      readFileSync(join(artifactDir, "compare-001", "patch-comparison.md"), "utf8").includes(
        "balanced-v2"
      )
    );
    assert.ok(
      readFileSync(join(artifactDir, "compare-001", "patch-comparison.json"), "utf8").includes(
        "router-config-patch-comparison"
      )
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router config patch compare only fails threshold regressions when requested", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-patch-compare-gate-"));
  const baseline = join(dir, "baseline.patch.json");
  const candidate = join(dir, "candidate.patch.json");
  const jsonOutput = join(dir, "comparison.json");

  writePatch(baseline, "balanced-v1", 95, 0.004, 120);
  writePatch(candidate, "balanced-v2", 90, 0.008, 200);

  const warning = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      compareScript,
      "--baseline",
      baseline,
      "--candidate",
      candidate,
      "--max-aiq-drop",
      "1",
      "--max-cost-increase",
      "0.1",
      "--max-latency-increase",
      "0.1",
      "--json-output",
      jsonOutput,
    ],
    { encoding: "utf8" }
  );
  const failing = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      compareScript,
      "--baseline",
      baseline,
      "--candidate",
      candidate,
      "--max-aiq-drop",
      "1",
      "--max-cost-increase",
      "0.1",
      "--max-latency-increase",
      "0.1",
      "--fail-on-regression",
    ],
    { encoding: "utf8" }
  );

  try {
    assert.equal(warning.status, 0);
    assert.ok((warning.stdout ?? "").includes("Passed: no"));
    const comparison = JSON.parse(readFileSync(jsonOutput, "utf8")) as {
      regressions?: string[];
      result?: { passed?: boolean; status?: number };
    };
    assert.equal(comparison.result?.passed, false);
    assert.equal(comparison.result?.status, 0);
    assert.ok((comparison.regressions?.length ?? 0) >= 2);
    assert.equal(failing.status, 1);
    assert.ok((failing.stdout ?? "").includes("Passed: no"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router config patch compare reports unchanged recommendations without failing", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-patch-compare-no-change-"));
  const baseline = join(dir, "baseline.patch.json");
  const candidate = join(dir, "candidate.patch.json");
  const jsonOutput = join(dir, "comparison.json");

  writePatch(baseline, "balanced-v1", 94, 0.004, 120);
  writePatch(candidate, "balanced-v1", 95, 0.003, 110);

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
      "--json-output",
      jsonOutput,
      "--fail-on-regression",
    ],
    { encoding: "utf8" }
  );

  try {
    assert.equal(result.status, 0);
    assert.ok((result.stdout ?? "").includes("Changed recommendation: no"));
    const comparison = JSON.parse(readFileSync(jsonOutput, "utf8")) as {
      changedRecommendation?: boolean;
      delta?: { aiq?: number; avgCostUsd?: number; avgLatencyMs?: number };
      result?: { passed?: boolean; status?: number };
    };
    assert.equal(comparison.changedRecommendation, false);
    assert.equal(comparison.delta?.aiq, 1);
    assert.equal(comparison.delta?.avgCostUsd, -0.001);
    assert.equal(comparison.delta?.avgLatencyMs, -10);
    assert.equal(comparison.result?.passed, true);
    assert.equal(comparison.result?.status, 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router config patch compare rejects invalid patch inputs", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-patch-compare-invalid-"));
  const baseline = join(dir, "baseline.patch.json");
  const candidate = join(dir, "candidate.patch.json");

  writePatch(baseline, "balanced-v1", 94, 0.004, 120);
  writeFileSync(
    candidate,
    `${JSON.stringify(
      {
        schemaVersion: 1,
        kind: "router-config-suggestion",
      },
      null,
      2
    )}\n`
  );

  const result = spawnSync(
    process.execPath,
    ["--import", "tsx", compareScript, "--baseline", baseline, "--candidate", candidate],
    { encoding: "utf8" }
  );

  try {
    assert.equal(result.status, 2);
    assert.match(result.stderr ?? "", /invalid patch kind/);
    assert.match(result.stderr ?? "", /router-config-suggestion/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router config patch compare rejects malformed JSON and invalid evidence", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-patch-compare-malformed-"));
  const baseline = join(dir, "baseline.patch.json");
  const malformed = join(dir, "malformed.patch.json");
  const invalidEvidence = join(dir, "invalid-evidence.patch.json");

  writePatch(baseline, "balanced-v1", 94, 0.004, 120);
  writeFileSync(malformed, "{not-json");
  writeFileSync(
    invalidEvidence,
    `${JSON.stringify({
      schemaVersion: 1,
      kind: "router-config-patch",
      applyPolicy: "manual-review",
      operations: [
        {
          op: "recommend-router-config",
          path: "/router/recommendedConfigId",
          value: "balanced-v2",
          evidence: {
            aiq: "94",
            avgCostUsd: 0.004,
            avgLatencyMs: 120,
            regressions: 0,
          },
        },
      ],
    })}\n`
  );

  const malformedResult = spawnSync(
    process.execPath,
    ["--import", "tsx", compareScript, "--baseline", baseline, "--candidate", malformed],
    { encoding: "utf8" }
  );
  const invalidEvidenceResult = spawnSync(
    process.execPath,
    ["--import", "tsx", compareScript, "--baseline", baseline, "--candidate", invalidEvidence],
    { encoding: "utf8" }
  );

  try {
    assert.equal(malformedResult.status, 2);
    assert.match(malformedResult.stderr ?? "", /invalid JSON/);
    assert.equal(invalidEvidenceResult.status, 2);
    assert.match(invalidEvidenceResult.stderr ?? "", /invalid numeric evidence field aiq/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
