import path from "node:path";
import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";

import { runRouterEvalCli } from "../../scripts/router-eval/index.ts";

type FixtureDb = {
  exec(sql: string): unknown;
  prepare(sql: string): { run(...params: unknown[]): unknown };
  close(): unknown;
};

async function withTempFiles<T>(handler: (workspace: string) => Promise<T>): Promise<T> {
  const tempRoot = path.join(process.cwd(), ".tmp");
  fs.mkdirSync(tempRoot, { recursive: true });
  const workspace = fs.mkdtempSync(path.join(tempRoot, "router-eval-db-"));
  try {
    return await handler(workspace);
  } finally {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
}

async function openFixtureDb(filePath: string): Promise<FixtureDb> {
  if (process.versions.bun) {
    const { Database } = await import("bun:sqlite");
    return new Database(filePath) as FixtureDb;
  }
  const { default: Database } = await import("better-sqlite3");
  return new Database(filePath) as FixtureDb;
}

test("runRouterEvalCli replays SQLite call logs from a temp DATA_DIR", async () => {
  const result = await withTempFiles(async (workspace) => {
    const db = await openFixtureDb(path.join(workspace, "storage.sqlite"));
    db.exec(`
      CREATE TABLE call_logs (
        id TEXT,
        timestamp TEXT,
        provider TEXT,
        model TEXT,
        requested_model TEXT,
        combo_name TEXT,
        status INTEGER,
        duration INTEGER,
        tokens_in INTEGER,
        tokens_out INTEGER,
        error_summary TEXT
      )
    `);
    db.prepare(`
      INSERT INTO call_logs
        (id, timestamp, provider, model, requested_model, combo_name, status, duration, tokens_in, tokens_out, error_summary)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run("call-1", "2026-01-01T00:00:00.000Z", "openrouter", "gpt-4o", "gpt-4o", "balanced", 200, 144, 100, 50, null);
    db.close();

    return runRouterEvalCli(["--db", workspace, "--limit", "1"]);
  });

  assert.equal(result.code, 0);
  assert.match(result.output, /# Router Eval Report/);
  assert.match(result.output, /\| balanced \|/);
  assert.match(result.output, /Observations: 1/);
});

test("runRouterEvalCli filters call_logs by provider, model, since, and limit", async () => {
  const result = await withTempFiles(async (workspace) => {
    const db = await openFixtureDb(path.join(workspace, "storage.sqlite"));
    db.exec(`
      CREATE TABLE call_logs (
        id TEXT,
        timestamp TEXT,
        provider TEXT,
        model TEXT,
        requested_model TEXT,
        combo_name TEXT,
        status INTEGER,
        duration INTEGER,
        tokens_in INTEGER,
        tokens_out INTEGER,
        error_summary TEXT
      )
    `);
    const insert = db.prepare(`
      INSERT INTO call_logs
        (id, timestamp, provider, model, requested_model, combo_name, status, duration, tokens_in, tokens_out)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insert.run("old", "2025-12-31T00:00:00.000Z", "openrouter", "gpt-4o", "gpt-4o", "old", 200, 100, 1, 1);
    insert.run("match", "2026-01-02T00:00:00.000Z", "openrouter", "gpt-4o", "gpt-4o", "priority", 200, 100, 10, 5);
    insert.run("other-model", "2026-01-03T00:00:00.000Z", "openrouter", "claude-3", "claude-3", "backup", 200, 100, 10, 5);
    insert.run("other-provider", "2026-01-04T00:00:00.000Z", "anthropic", "gpt-4o", "gpt-4o", "external", 200, 100, 10, 5);
    db.close();

    return runRouterEvalCli([
      "--db",
      workspace,
      "--db-source",
      "call-logs",
      "--provider",
      "openrouter",
      "--model",
      "gpt-4o",
      "--since",
      "2026-01-01T00:00:00.000Z",
      "--limit",
      "1",
    ]);
  });

  assert.equal(result.code, 0);
  assert.match(result.output, /\| priority \|/);
  assert.doesNotMatch(result.output, /backup/);
  assert.doesNotMatch(result.output, /external/);
  assert.match(result.output, /Observations: 1/);
});

test("runRouterEvalCli reads usage_history when requested", async () => {
  const result = await withTempFiles(async (workspace) => {
    const db = await openFixtureDb(path.join(workspace, "storage.sqlite"));
    db.exec(`
      CREATE TABLE usage_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        provider TEXT,
        model TEXT,
        tokens_input INTEGER,
        tokens_output INTEGER,
        status TEXT,
        success INTEGER,
        latency_ms INTEGER,
        combo_strategy TEXT
      )
    `);
    const insert = db.prepare(`
      INSERT INTO usage_history
        (timestamp, provider, model, tokens_input, tokens_output, status, success, latency_ms, combo_strategy)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insert.run("2026-01-01T00:00:00.000Z", "openrouter", "gpt-4.1", 120, 80, "200", 1, 150, "priority");
    insert.run("2026-01-02T00:00:00.000Z", "anthropic", "claude-3", 120, 80, "200", 1, 150, "backup");
    db.close();

    return runRouterEvalCli([
      "--db",
      workspace,
      "--db-source",
      "usage-history",
      "--provider",
      "openrouter",
      "--model",
      "gpt-4.1",
    ]);
  });

  assert.equal(result.code, 0);
  assert.match(result.output, /\| priority \|/);
  assert.doesNotMatch(result.output, /backup/);
  assert.match(result.output, /Observations: 1/);
});

test("runRouterEvalCli auto-selects call_logs before usage_history", async () => {
  const result = await withTempFiles(async (workspace) => {
    const db = await openFixtureDb(path.join(workspace, "storage.sqlite"));
    db.exec(`
      CREATE TABLE usage_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        provider TEXT,
        model TEXT,
        tokens_input INTEGER,
        tokens_output INTEGER,
        status TEXT,
        success INTEGER,
        latency_ms INTEGER,
        combo_strategy TEXT
      );
      CREATE TABLE call_logs (
        id TEXT,
        timestamp TEXT,
        provider TEXT,
        model TEXT,
        requested_model TEXT,
        combo_name TEXT,
        status INTEGER,
        duration INTEGER,
        tokens_in INTEGER,
        tokens_out INTEGER,
        error_summary TEXT
      );
    `);
    db.prepare(`
      INSERT INTO usage_history
        (timestamp, provider, model, tokens_input, tokens_output, status, success, latency_ms, combo_strategy)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run("2026-01-01T00:00:00.000Z", "openrouter", "gpt-4.1", 1, 1, "200", 1, 150, "usage-only");
    db.prepare(`
      INSERT INTO call_logs
        (id, timestamp, provider, model, requested_model, combo_name, status, duration, tokens_in, tokens_out)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run("call-1", "2026-01-01T00:00:00.000Z", "openrouter", "gpt-4.1", "gpt-4.1", "call-preferred", 200, 150, 1, 1);
    db.close();

    return runRouterEvalCli(["--db", workspace]);
  });

  assert.equal(result.code, 0);
  assert.match(result.output, /call-preferred/);
  assert.doesNotMatch(result.output, /usage-only/);
});

test("runRouterEvalCli replays legacy call_logs without optional columns", async () => {
  const result = await withTempFiles(async (workspace) => {
    const db = await openFixtureDb(path.join(workspace, "storage.sqlite"));
    db.exec(`
      CREATE TABLE call_logs (
        id TEXT,
        timestamp TEXT,
        model TEXT,
        requested_model TEXT,
        combo_name TEXT,
        status INTEGER,
        duration INTEGER
      )
    `);
    db.prepare(`
      INSERT INTO call_logs
        (id, timestamp, model, requested_model, combo_name, status, duration)
      VALUES
        (?, ?, ?, ?, ?, ?, ?)
    `).run("legacy-call", "2026-01-01T00:00:00.000Z", "gpt-4o", "gpt-4o", "legacy-priority", 200, 120);
    db.close();

    return runRouterEvalCli(["--db", workspace, "--db-source", "call-logs"]);
  });

  assert.equal(result.code, 0);
  assert.match(result.output, /\| legacy-priority \|/);
  assert.match(result.output, /Observations: 1/);
});

test("runRouterEvalCli replays legacy usage_history without combo or token columns", async () => {
  const result = await withTempFiles(async (workspace) => {
    const db = await openFixtureDb(path.join(workspace, "storage.sqlite"));
    db.exec(`
      CREATE TABLE usage_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL,
        provider TEXT,
        model TEXT,
        status TEXT,
        success INTEGER,
        latency_ms INTEGER
      )
    `);
    db.prepare(`
      INSERT INTO usage_history
        (timestamp, provider, model, status, success, latency_ms)
      VALUES
        (?, ?, ?, ?, ?, ?)
    `).run("2026-01-01T00:00:00.000Z", "openrouter", "gpt-4.1", "200", 1, 150);
    db.close();

    return runRouterEvalCli(["--db", workspace, "--db-source", "usage-history"]);
  });

  assert.equal(result.code, 0);
  assert.match(result.output, /\| openrouter \|/);
  assert.match(result.output, /Observations: 1/);
});
