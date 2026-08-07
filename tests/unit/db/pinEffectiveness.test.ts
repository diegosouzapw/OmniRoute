import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pin-effectiveness-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { recordPinKept, recordPinInvalid, recordPinRepinned, getPinEffectiveness } =
  await import("../../../src/lib/db/pinEffectiveness.ts");
const { recordSessionModelUsage, getLastSessionModel } =
  await import("../../../src/lib/db/contextHandoffs.ts");

const COMBO = "pe-test";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("empty state returns zeros", () => {
  const stats = getPinEffectiveness(COMBO);
  assert.equal(stats.keptCount, 0);
  assert.equal(stats.invalidCount, 0);
  assert.equal(stats.repinnedCount, 0);
  assert.equal(stats.lastInvalidAt, null);
  assert.equal(stats.lastInvalidReason, null);
  assert.equal(stats.avgLifetimeMs, null);
});

test("kept/invalid/repinned counters accumulate and last invalid is recorded", () => {
  recordPinKept(COMBO);
  recordPinKept(COMBO);
  recordPinInvalid(COMBO, "no tool calls");
  recordPinRepinned(COMBO);

  const stats = getPinEffectiveness(COMBO);
  assert.equal(stats.keptCount, 2);
  assert.equal(stats.invalidCount, 1);
  assert.equal(stats.repinnedCount, 1);
  assert.equal(stats.lastInvalidReason, "no tool calls");
  assert.ok(stats.lastInvalidAt, "lastInvalidAt should be set");

  // A later invalid overwrites the last reason; counters still accumulate.
  recordPinInvalid(COMBO, "context window too small");
  const stats2 = getPinEffectiveness(COMBO);
  assert.equal(stats2.invalidCount, 2);
  assert.equal(stats2.lastInvalidReason, "context window too small");
});

test("kept/invalid/repinned are per-combo", () => {
  recordPinKept(COMBO);
  recordPinInvalid("other-combo", "reason");
  const stats = getPinEffectiveness(COMBO);
  assert.equal(stats.keptCount, 1);
  assert.equal(stats.invalidCount, 0);
});

test("recordSessionModelUsage counts a repin only when the model actually changes", () => {
  recordSessionModelUsage("s1", COMBO, "ollama-local/llama3.1:latest", "ollama-local");
  assert.equal(getLastSessionModel("s1", COMBO), "ollama-local/llama3.1:latest");
  assert.equal(getPinEffectiveness(COMBO).repinnedCount, 0);

  recordSessionModelUsage("s1", COMBO, "ollama-local/llama3.1:latest", "ollama-local");
  assert.equal(getPinEffectiveness(COMBO).repinnedCount, 0, "same model is not a repin");

  recordSessionModelUsage("s1", COMBO, "ollama-local/qwen2.5vl:7b", "ollama-local");
  assert.equal(getPinEffectiveness(COMBO).repinnedCount, 1, "model change is a repin");

  recordSessionModelUsage("s2", COMBO, "ollama-local/mistral-nemo:latest", "ollama-local");
  assert.equal(getPinEffectiveness(COMBO).repinnedCount, 1, "new session is not a repin");
});

test("avgLifetimeMs closes segments and averages them", () => {
  const db = core.getDbInstance();
  const t0 = Date.parse("2026-08-06T10:00:00.000Z");
  const insert = db.prepare(
    `INSERT INTO session_model_history (session_id, combo_name, model_str, provider, used_at)
     VALUES (?, ?, ?, ?, ?)`
  );
  // s1: model A from t0, model B from t0+10m, still on B at t0+30m.
  insert.run("s1", COMBO, "model-a", "p", new Date(t0).toISOString());
  insert.run("s1", COMBO, "model-b", "p", new Date(t0 + 10 * 60_000).toISOString());
  insert.run("s1", COMBO, "model-b", "p", new Date(t0 + 20 * 60_000).toISOString());
  // s2: model A from t0, still on A at t0+30m.
  insert.run("s2", COMBO, "model-a", "p", new Date(t0).toISOString());

  const now = t0 + 30 * 60_000;
  const stats = getPinEffectiveness(COMBO, now);
  // s1: 10m (A, closed) + 10m (open B segment); s2: 30m (open A segment).
  // total = 50m across 3 segments → avg = 16.67m = 1_000_000ms.
  assert.equal(stats.avgLifetimeMs, 1_000_000);
});

test("avgLifetimeMs for a single pin equals the still-open segment elapsed time", () => {
  const t0 = Date.parse("2026-08-06T10:00:00.000Z");
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO session_model_history (session_id, combo_name, model_str, provider, used_at)
     VALUES (?, ?, ?, ?, ?)`
  ).run("s1", COMBO, "model-a", "p", new Date(t0).toISOString());
  const now = t0 + 5 * 60_000;
  assert.equal(getPinEffectiveness(COMBO, now).avgLifetimeMs, 5 * 60_000);
});
