import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const searchScript = "scripts/router-eval/search.ts";
const checkScript = "scripts/check/check-router-eval-regression.ts";

function writeObservation(file: string, configId: string, latencyMs: number, costUsd: number) {
  writeFileSync(
    file,
    `${JSON.stringify({
      sampleId: `${configId}-sample`,
      configId,
      selectedModel: "gpt-4.1",
      expectedModel: "gpt-4.1",
      latencyMs,
      costUsd,
      success: true,
    })}\n`
  );
}

function runSearch(
  baseline: string,
  candidateName: string,
  candidate: string,
  artifactDir: string,
  runId: string
): string {
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      searchScript,
      "--baseline",
      baseline,
      "--candidate",
      `${candidateName}=${candidate}`,
      "--artifact-dir",
      artifactDir,
      "--run-id",
      runId,
      "--objective",
      "quality",
    ],
    { encoding: "utf8" }
  );
  assert.equal(result.status, 0);
  const patch = join(artifactDir, runId, "router-config.patch.json");
  assert.ok(readFileSync(patch, "utf8").includes("router-config-patch"));
  return patch;
}

test("router eval retained chain runs search patches through the check wrapper gate", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-e2e-chain-"));
  const baseline = join(dir, "baseline.ndjson");
  const oldCandidate = join(dir, "old.ndjson");
  const newCandidate = join(dir, "new.ndjson");
  const searchArtifacts = join(dir, "search-artifacts");
  const gateArtifacts = join(dir, "gate-artifacts");
  const runId = "chain-001";

  writeObservation(baseline, "baseline", 150, 0.004);
  writeObservation(oldCandidate, "old-router", 130, 0.004);
  writeObservation(newCandidate, "new-router", 100, 0.003);

  try {
    const baselinePatch = runSearch(
      baseline,
      "old-router",
      oldCandidate,
      searchArtifacts,
      "old-search"
    );
    const candidatePatch = runSearch(
      baseline,
      "new-router",
      newCandidate,
      searchArtifacts,
      "new-search"
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
        newCandidate,
        "--baseline-patch",
        baselinePatch,
        "--candidate-patch",
        candidatePatch,
        "--artifact-dir",
        gateArtifacts,
        "--run-id",
        runId,
      ],
      { encoding: "utf8" }
    );

    assert.equal(result.status, 0);
    const runDir = join(gateArtifacts, runId);
    assert.ok(
      readFileSync(join(runDir, "router-eval.json"), "utf8").includes("router-eval-comparison")
    );
    assert.ok(
      readFileSync(join(runDir, "patch-comparison.json"), "utf8").includes(
        "router-config-patch-comparison"
      )
    );
    assert.ok(
      readFileSync(join(runDir, "inputs", "baseline.patch.json"), "utf8").includes("old-router")
    );
    assert.ok(
      readFileSync(join(runDir, "inputs", "candidate.patch.json"), "utf8").includes("new-router")
    );
    const manifest = JSON.parse(readFileSync(join(runDir, "manifest.json"), "utf8")) as {
      kind?: string;
      result?: { status?: number };
      outputs?: { patchJson?: string };
    };
    assert.equal(manifest.kind, "router-eval-gate-run");
    assert.equal(manifest.result?.status, 0);
    assert.equal(manifest.outputs?.patchJson, "patch-comparison.json");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
