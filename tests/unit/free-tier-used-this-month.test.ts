import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-used-month-"));

const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { sumUsageTokensThisMonth } = await import("../../src/lib/db/usageSummary.ts");

test.after(() => resetDbInstance());

test("sumUsageTokensThisMonth sums only the current calendar month's rolled-up tokens", () => {
  const db = getDbInstance();
  // Ensure the table exists (migrations run on getDbInstance; if not present, create defensively).
  db.exec(`CREATE TABLE IF NOT EXISTS daily_usage_summary (id INTEGER PRIMARY KEY AUTOINCREMENT, provider TEXT NOT NULL, model TEXT NOT NULL, date TEXT NOT NULL, total_requests INTEGER NOT NULL DEFAULT 0, total_input_tokens INTEGER NOT NULL DEFAULT 0, total_output_tokens INTEGER NOT NULL DEFAULT 0, total_cost REAL NOT NULL DEFAULT 0.0, created_at TEXT NOT NULL DEFAULT (datetime('now')));`);
  const thisMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  const insert = db.prepare("INSERT INTO daily_usage_summary (provider, model, date, total_input_tokens, total_output_tokens) VALUES (?,?,?,?,?)");
  insert.run("groq", "llama", `${thisMonth}-05`, 100, 200);
  insert.run("cerebras", "qwen", `${thisMonth}-12`, 50, 50);
  insert.run("groq", "llama", "2000-01-01", 9999, 9999); // long ago — excluded
  assert.equal(sumUsageTokensThisMonth(), 400);
});

// #10381: the current month's LIVE usage lives in usage_history (per-request rows written
// by saveRequestUsage) and is never rolled into daily_usage_summary until retention cleanup
// (~365 days). sumUsageTokensThisMonth must count both legs without double-counting.
test("sumUsageTokensThisMonth includes the current month's raw usage_history rows (#10381)", () => {
  const db = getDbInstance();
  // Ensure both tables exist (defensive, same shape as the migrations).
  db.exec(`CREATE TABLE IF NOT EXISTS usage_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT, provider TEXT, model TEXT, connection_id TEXT,
    api_key_id TEXT, api_key_name TEXT, tokens_input INTEGER DEFAULT 0, tokens_output INTEGER DEFAULT 0,
    tokens_cache_read INTEGER DEFAULT 0, tokens_cache_creation INTEGER DEFAULT 0, tokens_reasoning INTEGER DEFAULT 0,
    service_tier TEXT DEFAULT 'standard', status TEXT, success INTEGER DEFAULT 1, latency_ms INTEGER DEFAULT 0,
    ttft_ms INTEGER DEFAULT 0, error_code TEXT, timestamp TEXT NOT NULL);`);
  db.exec(`CREATE TABLE IF NOT EXISTS daily_usage_summary (id INTEGER PRIMARY KEY AUTOINCREMENT, provider TEXT NOT NULL, model TEXT NOT NULL, date TEXT NOT NULL, total_requests INTEGER NOT NULL DEFAULT 0, total_input_tokens INTEGER NOT NULL DEFAULT 0, total_output_tokens INTEGER NOT NULL DEFAULT 0, total_cost REAL NOT NULL DEFAULT 0.0, created_at TEXT NOT NULL DEFAULT (datetime('now')));`);

  // Isolate from the shared DB (getDbInstance is a singleton across test cases): start empty.
  db.exec("DELETE FROM usage_history");
  db.exec("DELETE FROM daily_usage_summary");

  const now = new Date();
  const thisMonth = now.toISOString().slice(0, 7); // YYYY-MM
  const liveStamp = `${thisMonth}-15T12:00:00.000Z`;
  const pastStamp = "2000-01-15T12:00:00.000Z";

  const insHistory = db.prepare(
    "INSERT INTO usage_history (provider, model, tokens_input, tokens_output, timestamp) VALUES (?,?,?,?,?)"
  );
  insHistory.run("openai", "gpt-4.1", 150, 250, liveStamp); // 400 current-month live tokens
  insHistory.run("openai", "gpt-4.1", 9999, 9999, pastStamp); // very old — excluded

  // A rolled-up current-month row coexisting (no double-count — the source usage_history row
  // was already deleted by the retention rollup, so both legs are additive and disjoint).
  const insSummary = db.prepare(
    "INSERT INTO daily_usage_summary (provider, model, date, total_input_tokens, total_output_tokens) VALUES (?,?,?,?,?)"
  );
  insSummary.run("groq", "llama", `${thisMonth}-20`, 25, 25); // +50 rolled-up

  assert.equal(sumUsageTokensThisMonth(), 400 + 50);
});

// #10509 sweep: the `substr(timestamp, 1, 7) = strftime('%Y-%m', 'now')` predicate was
// fragile/non-indexable (SQLite cannot use a range index on a substr() expression, and a
// non-ISO-shaped timestamp string silently mismatches). Replaced with an indexable UTC
// month-range comparison (`timestamp >= <month start> AND timestamp < <next month start>`).
// This test pins the exact boundary: the first instant of the current month is INCLUDED,
// the last instant of the PREVIOUS month is EXCLUDED, and a NEXT-month row is EXCLUDED too
// (guards the upper-bound half of the range, which substr() could never express directly).
test("sumUsageTokensThisMonth uses an inclusive-start/exclusive-end UTC month range (#10509)", () => {
  const db = getDbInstance();
  db.exec(`CREATE TABLE IF NOT EXISTS usage_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT, provider TEXT, model TEXT, connection_id TEXT,
    api_key_id TEXT, api_key_name TEXT, tokens_input INTEGER DEFAULT 0, tokens_output INTEGER DEFAULT 0,
    tokens_cache_read INTEGER DEFAULT 0, tokens_cache_creation INTEGER DEFAULT 0, tokens_reasoning INTEGER DEFAULT 0,
    service_tier TEXT DEFAULT 'standard', status TEXT, success INTEGER DEFAULT 1, latency_ms INTEGER DEFAULT 0,
    ttft_ms INTEGER DEFAULT 0, error_code TEXT, timestamp TEXT NOT NULL);`);
  db.exec(`CREATE TABLE IF NOT EXISTS daily_usage_summary (id INTEGER PRIMARY KEY AUTOINCREMENT, provider TEXT NOT NULL, model TEXT NOT NULL, date TEXT NOT NULL, total_requests INTEGER NOT NULL DEFAULT 0, total_input_tokens INTEGER NOT NULL DEFAULT 0, total_output_tokens INTEGER NOT NULL DEFAULT 0, total_cost REAL NOT NULL DEFAULT 0.0, created_at TEXT NOT NULL DEFAULT (datetime('now')));`);
  db.exec("DELETE FROM usage_history");
  db.exec("DELETE FROM daily_usage_summary");

  const monthStart = db
    .prepare("SELECT strftime('%Y-%m-01T00:00:00.000Z','now') AS s")
    .get() as { s: string };
  const nextMonthStart = db
    .prepare("SELECT strftime('%Y-%m-01T00:00:00.000Z','now','+1 month') AS s")
    .get() as { s: string };
  const lastInstantOfPrevMonth = new Date(
    new Date(monthStart.s).getTime() - 1
  ).toISOString();

  const insHistory = db.prepare(
    "INSERT INTO usage_history (provider, model, tokens_input, tokens_output, timestamp) VALUES (?,?,?,?,?)"
  );
  insHistory.run("openai", "gpt-4.1", 10, 0, monthStart.s); // first instant of THIS month — included
  insHistory.run("openai", "gpt-4.1", 9999, 0, lastInstantOfPrevMonth); // last ms of PREV month — excluded
  insHistory.run("openai", "gpt-4.1", 9999, 0, nextMonthStart.s); // first instant of NEXT month — excluded

  assert.equal(sumUsageTokensThisMonth(), 10);
});
