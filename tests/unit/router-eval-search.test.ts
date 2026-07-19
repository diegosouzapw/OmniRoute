import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const searchScript = "scripts/router-eval/search.ts";

function writeCorpus(path: string, configId: string, latencyMs: number, costUsd: number) {
  writeFileSync(
    path,
    JSON.stringify({
      sampleId: configId,
      configId,
      selectedModel: "gpt-4.1",
      expectedModel: "gpt-4.1",
      latencyMs,
      costUsd,
      success: true,
    })
  );
}

function writeCorpusRows(
  path: string,
  rows: Array<{ configId: string; latencyMs: number; costUsd: number }>
) {
  writeFileSync(
    path,
    rows
      .map((row) =>
        JSON.stringify({
          sampleId: `${row.configId}-sample`,
          configId: row.configId,
          selectedModel: "gpt-4.1",
          expectedModel: "gpt-4.1",
          latencyMs: row.latencyMs,
          costUsd: row.costUsd,
          success: true,
        })
      )
      .join("\n")
  );
}

test("router eval search ranks candidates and writes retained summary artifacts", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-search-"));
  const baseline = join(dir, "baseline.ndjson");
  const slow = join(dir, "slow.ndjson");
  const fast = join(dir, "fast.ndjson");
  const artifactDir = join(dir, "artifacts");
  const runId = "search-001";

  writeCorpus(baseline, "baseline", 150, 0.004);
  writeCorpus(slow, "slow", 200, 0.006);
  writeCorpus(fast, "fast", 100, 0.003);

  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      searchScript,
      "--baseline",
      baseline,
      "--candidate",
      `slow=${slow}`,
      "--candidate",
      `fast=${fast}`,
      "--artifact-dir",
      artifactDir,
      "--run-id",
      runId,
    ],
    { encoding: "utf8" }
  );

  try {
    assert.equal(result.status, 0);
    assert.ok((result.stdout ?? "").includes("Router Eval Search"));
    const searchDir = join(artifactDir, runId);
    const markdown = readFileSync(join(searchDir, "search.md"), "utf8");
    assert.ok(markdown.indexOf("| 1 | fast |") < markdown.indexOf("| 2 | slow |"));
    assert.ok(markdown.includes("## Patch Operations"));
    assert.ok(
      markdown.includes("| recommend-router-config | /router/recommendedConfigId | fast |")
    );
    const summary = JSON.parse(readFileSync(join(searchDir, "search.json"), "utf8")) as {
      kind?: string;
      objective?: string;
      recommendation?: { candidateName: string; rationale: string };
      suggestion?: { recommendedConfigId: string; applyPolicy: string };
      patch?: { kind: string; operations: Array<{ value: string }> };
      results?: Array<{ candidateName: string }>;
    };
    assert.equal(summary.kind, "router-eval-search");
    assert.equal(summary.objective, "balanced");
    assert.equal(summary.results?.[0]?.candidateName, "fast");
    assert.equal(summary.recommendation?.candidateName, "fast");
    assert.match(summary.recommendation?.rationale ?? "", /best balanced rank/);
    assert.equal(summary.suggestion?.recommendedConfigId, "fast");
    assert.equal(summary.suggestion?.applyPolicy, "manual-review");
    assert.equal(summary.patch?.kind, "router-config-patch");
    assert.equal(summary.patch?.operations[0]?.value, "fast");
    const recommendation = JSON.parse(
      readFileSync(join(searchDir, "recommendation.json"), "utf8")
    ) as {
      candidateName?: string;
      objective?: string;
    };
    assert.equal(recommendation.candidateName, "fast");
    assert.equal(recommendation.objective, "balanced");
    const suggestion = JSON.parse(readFileSync(join(searchDir, "suggestion.json"), "utf8")) as {
      kind?: string;
      recommendedConfigId?: string;
      applyPolicy?: string;
    };
    assert.equal(suggestion.kind, "router-config-suggestion");
    assert.equal(suggestion.recommendedConfigId, "fast");
    assert.equal(suggestion.applyPolicy, "manual-review");
    const patch = JSON.parse(readFileSync(join(searchDir, "router-config.patch.json"), "utf8")) as {
      kind?: string;
      applyPolicy?: string;
      operations?: Array<{ op?: string; path?: string; value?: string }>;
    };
    assert.equal(patch.kind, "router-config-patch");
    assert.equal(patch.applyPolicy, "manual-review");
    assert.equal(patch.operations?.[0]?.op, "recommend-router-config");
    assert.equal(patch.operations?.[0]?.path, "/router/recommendedConfigId");
    assert.equal(patch.operations?.[0]?.value, "fast");
    assert.ok(
      readFileSync(join(searchDir, `${runId}-fast`, "router-eval.json"), "utf8").includes(
        "router-eval-comparison"
      )
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router eval search objective modes can choose different candidates", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-search-objective-"));
  const baseline = join(dir, "baseline.ndjson");
  const cheap = join(dir, "cheap.ndjson");
  const fast = join(dir, "fast.ndjson");
  const artifactDir = join(dir, "artifacts");

  writeCorpus(baseline, "baseline", 150, 0.004);
  writeCorpus(cheap, "cheap", 900, 0.001);
  writeCorpus(fast, "fast", 50, 0.009);

  function runSearch(
    objective: string,
    runId: string
  ): { recommendedConfigId?: string; objective?: string } {
    const result = spawnSync(
      process.execPath,
      [
        "--import",
        "tsx",
        searchScript,
        "--baseline",
        baseline,
        "--candidate",
        `cheap=${cheap}`,
        "--candidate",
        `fast=${fast}`,
        "--artifact-dir",
        artifactDir,
        "--run-id",
        runId,
        "--objective",
        objective,
        "--max-aiq-drop",
        "100",
        "--max-cost-increase",
        "100",
      ],
      { encoding: "utf8" }
    );
    assert.equal(result.status, 0);
    return JSON.parse(readFileSync(join(artifactDir, runId, "suggestion.json"), "utf8")) as {
      recommendedConfigId?: string;
      objective?: string;
    };
  }

  try {
    const costSuggestion = runSearch("cost", "cost-001");
    const latencySuggestion = runSearch("latency", "latency-001");
    const qualitySuggestion = runSearch("quality", "quality-001");
    assert.equal(costSuggestion.objective, "cost");
    assert.equal(costSuggestion.recommendedConfigId, "cheap");
    assert.equal(latencySuggestion.objective, "latency");
    assert.equal(latencySuggestion.recommendedConfigId, "fast");
    assert.equal(qualitySuggestion.objective, "quality");
    assert.equal(qualitySuggestion.recommendedConfigId, "cheap");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router eval search cost objective can select a non-AIQ-top config inside a candidate corpus", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-search-multi-config-"));
  const baseline = join(dir, "baseline.ndjson");
  const mixed = join(dir, "mixed.ndjson");
  const artifactDir = join(dir, "artifacts");
  const runId = "multi-config-001";

  writeCorpus(baseline, "baseline", 150, 0.004);
  writeCorpusRows(mixed, [
    { configId: "quality-top", latencyMs: 100, costUsd: 0.002 },
    { configId: "cost-top", latencyMs: 3_000, costUsd: 0.0001 },
  ]);

  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx",
      searchScript,
      "--baseline",
      baseline,
      "--candidate",
      `mixed=${mixed}`,
      "--artifact-dir",
      artifactDir,
      "--run-id",
      runId,
      "--objective",
      "cost",
      "--max-aiq-drop",
      "100",
      "--max-cost-increase",
      "100",
    ],
    { encoding: "utf8" }
  );

  try {
    assert.equal(result.status, 0);
    const suggestion = JSON.parse(
      readFileSync(join(artifactDir, runId, "suggestion.json"), "utf8")
    ) as {
      recommendedConfigId?: string;
    };
    const patch = JSON.parse(
      readFileSync(join(artifactDir, runId, "router-config.patch.json"), "utf8")
    ) as {
      operations?: Array<{ value?: string }>;
    };
    assert.equal(suggestion.recommendedConfigId, "cost-top");
    assert.equal(patch.operations?.[0]?.value, "cost-top");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
