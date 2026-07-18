import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import Database from "better-sqlite3";

const scriptPath = "scripts/router-eval/index.ts";

function runCli(args: string[]) {
  return spawnSync(process.execPath, ["--import", "tsx", scriptPath, ...args], {
    encoding: "utf8",
  });
}

test("router-eval CLI prints a markdown report for JSONL input", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-cli-"));
  const inputPath = join(dir, "input.ndjson");
  writeFileSync(
    inputPath,
    [
      JSON.stringify({
        sampleId: "s1",
        configId: "combo-a",
        selectedModel: "gpt-4.1",
        requestedModel: "gpt-4.1",
        latencyMs: 120,
        costUsd: 0.005,
        success: true,
      }),
      JSON.stringify({
        sampleId: "s2",
        configId: "combo-b",
        selectedModel: "gpt-4o",
        requestedModel: "gpt-4o",
        latencyMs: 200,
        costUsd: 0.003,
        success: true,
      }),
    ].join("\n")
  );

  const result = runCli(["--input", inputPath]);
  try {
    assert.equal(result.status, 0);
    assert.ok((result.stderr ?? "").length === 0);
    assert.ok((result.stdout ?? "").includes("Frontier"));
    assert.ok((result.stdout ?? "").includes("AIQ"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router-eval CLI exits non-zero when regression threshold is exceeded", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-cli-reg-"));
  const baselinePath = join(dir, "baseline.ndjson");
  const candidatePath = join(dir, "candidate.ndjson");

  writeFileSync(
    baselinePath,
    [
      JSON.stringify({
        sampleId: "b1",
        configId: "combo-a",
        selectedModel: "gpt-4.1",
        requestedModel: "gpt-4.1",
        latencyMs: 100,
        costUsd: 0.005,
        success: true,
      }),
    ].join("\n")
  );

  writeFileSync(
    candidatePath,
    [
      JSON.stringify({
        sampleId: "c1",
        configId: "combo-a",
        selectedModel: "gpt-4.1",
        requestedModel: "gpt-4.1",
        latencyMs: 400,
        costUsd: 0.05,
        success: true,
      }),
    ].join("\n")
  );

  const result = runCli([
    "--input",
    candidatePath,
    "--baseline-input",
    baselinePath,
    "--max-aiq-drop",
    "1",
    "--max-cost-increase",
    "0.2",
    "--fail-on-regression",
  ]);
  try {
    assert.equal(result.status, 1);
    assert.ok((result.stdout ?? "").includes("Router Eval Comparison"));
    assert.ok((result.stdout ?? "").includes("Regressions"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router-eval CLI writes machine-readable JSON artifacts", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-cli-json-"));
  const inputPath = join(dir, "input.ndjson");
  const outputPath = join(dir, "router-eval.json");
  writeFileSync(
    inputPath,
    JSON.stringify({
      sampleId: "s1",
      configId: "combo-a",
      selectedModel: "gpt-4.1",
      requestedModel: "gpt-4.1",
      latencyMs: 120,
      costUsd: 0.005,
      success: true,
    })
  );

  const result = runCli(["--input", inputPath, "--json-output", outputPath]);
  try {
    assert.equal(result.status, 0);
    const artifact = JSON.parse(readFileSync(outputPath, "utf8")) as Record<string, unknown>;
    assert.equal(artifact.schemaVersion, 1);
    assert.equal(artifact.kind, "router-eval-report");
    assert.ok("report" in artifact);
    assert.deepEqual((artifact.metadata as Record<string, unknown>)?.candidate, {
      source: "jsonl",
      path: inputPath,
    });
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router-eval CLI reads usage_history DB source", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-cli-usage-"));
  const dbPath = join(dir, "storage.sqlite");
  const corpusPath = join(dir, "corpus.ndjson");
  const artifactPath = join(dir, "artifact.json");
  const db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS usage_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      provider TEXT,
      model TEXT,
      connection_id TEXT,
      api_key_id TEXT,
      api_key_name TEXT,
      tokens_input INTEGER DEFAULT 0,
      tokens_output INTEGER DEFAULT 0,
      tokens_cache_read INTEGER DEFAULT 0,
      tokens_cache_creation INTEGER DEFAULT 0,
      tokens_reasoning INTEGER DEFAULT 0,
      service_tier TEXT DEFAULT 'standard',
      status TEXT,
      success INTEGER DEFAULT 1,
      latency_ms INTEGER DEFAULT 0,
      ttft_ms INTEGER DEFAULT 0,
      error_code TEXT,
      combo_strategy TEXT,
      endpoint TEXT,
      timestamp TEXT NOT NULL
    )
  `);

  db.prepare(
    `
    INSERT INTO usage_history
      (provider, model, tokens_input, tokens_output, service_tier, success, latency_ms, status, error_code, combo_strategy, timestamp)
    VALUES
      ('openrouter', 'gpt-4.1', 120, 80, 'standard', 1, 150, '200', NULL, 'priority', '2026-01-01T00:00:00.000Z')
  `
  ).run();
  db.close();

  try {
    const result = runCli([
      "--db",
      dbPath,
      "--db-source",
      "usage-history",
      "--export-corpus",
      corpusPath,
      "--json-output",
      artifactPath,
    ]);
    assert.equal(result.status, 0);
    assert.ok((result.stderr ?? "").length === 0);
    assert.ok((result.stdout ?? "").includes("Router Eval Report"));
    assert.ok((result.stdout ?? "").includes("priority"));
    const corpus = readFileSync(corpusPath, "utf8")
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as Record<string, unknown>);
    assert.equal(corpus.length, 1);
    assert.equal(corpus[0].configId, "priority");
    assert.equal(corpus[0].selectedModel, "gpt-4.1");
    assert.equal(corpus[0].latencyMs, 150);
    assert.deepEqual(corpus[0].metadata, {
      provider: "openrouter",
      serviceTier: "standard",
      errorCode: null,
    });
    const artifact = JSON.parse(readFileSync(artifactPath, "utf8")) as Record<string, unknown>;
    assert.deepEqual((artifact.metadata as Record<string, unknown>)?.candidate, {
      source: "sqlite",
      path: dbPath,
      dbSource: "usage-history",
    });
    assert.equal(
      typeof ((artifact.metadata as Record<string, unknown>)?.outputs as Record<string, unknown>)
        ?.corpus,
      "string"
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("router-eval CLI defaults --db to call_logs when available", () => {
  const dir = mkdtempSync(join(tmpdir(), "router-eval-cli-default-"));
  const dbPath = join(dir, "storage.sqlite");
  const db = new Database(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS call_logs (
      id TEXT PRIMARY KEY,
      duration INTEGER,
      tokens_in INTEGER,
      tokens_out INTEGER,
      status INTEGER,
      combo_name TEXT,
      requested_model TEXT,
      model TEXT,
      provider TEXT,
      error_summary TEXT,
      timestamp TEXT NOT NULL,
      correlation_id TEXT
    )
  `);

  db.prepare(
    `
    INSERT INTO call_logs
      (id, provider, model, requested_model, tokens_in, tokens_out, status, combo_name, timestamp)
    VALUES
      ('c1', 'openrouter', 'gpt-4.1', 'gpt-4.1', 120, 80, 200, 'priority', '2026-01-01T00:00:00.000Z')
  `
  ).run();
  db.close();

  try {
    const result = runCli(["--db", dbPath]);
    assert.equal(result.status, 0);
    assert.equal((result.stderr ?? "").length, 0);
    assert.ok((result.stdout ?? "").includes("Router Eval Report"));
    assert.ok((result.stdout ?? "").includes("priority"));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
