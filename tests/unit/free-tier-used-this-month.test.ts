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
