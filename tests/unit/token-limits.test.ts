import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-token-limits-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const tokenLimits = await import("../../src/lib/db/tokenLimits.ts");
const counter = await import("../../open-sse/services/tokenLimitCounter.ts");

const flush = () => new Promise((r) => setImmediate(r));

// Window pivots (UTC).
const NOW_JAN = Date.UTC(2026, 0, 15, 12, 0, 0);
const NOW_FEB = Date.UTC(2026, 1, 15, 12, 0, 0);
const D1 = Date.UTC(2026, 0, 10, 12);
const D2 = Date.UTC(2026, 0, 11, 12);
const W1 = Date.UTC(2026, 0, 6, 12); // Tue
const W2 = Date.UTC(2026, 0, 13, 12); // next Tue
const M1 = Date.UTC(2026, 0, 8, 6); // same daily window as D1? no -> Jan 8; use for "same window" daily checks separately

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function insertUsage(
  apiKeyId: string,
  provider: string,
  model: string,
  tokensInput: number,
  tokensOutput: number,
  ts: string,
  extra: { cacheRead?: number; cacheCreation?: number; reasoning?: number } = {}
) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO usage_history
       (provider, model, api_key_id, tokens_input, tokens_output,
        tokens_cache_read, tokens_cache_creation, tokens_reasoning, success, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`
  ).run(
    provider,
    model,
    apiKeyId,
    tokensInput,
    tokensOutput,
    extra.cacheRead ?? 0,
    extra.cacheCreation ?? 0,
    extra.reasoning ?? 0,
    ts
  );
}

test.beforeEach(async () => {
  await resetStorage();
  counter.clearTokenLimitCache();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("window rollover: daily/weekly/monthly produce distinct windowStart", async () => {
  const daily = tokenLimits.upsertTokenLimit({
    apiKeyId: "k-daily",
    scopeType: "global",
    tokenLimit: 1000,
    resetInterval: "daily",
  });
  const weekly = tokenLimits.upsertTokenLimit({
    apiKeyId: "k-week",
    scopeType: "global",
    tokenLimit: 1000,
    resetInterval: "weekly",
  });
  const monthly = tokenLimits.upsertTokenLimit({
    apiKeyId: "k-month",
    scopeType: "global",
    tokenLimit: 1000,
    resetInterval: "monthly",
  });

  // Distinct windows across a boundary.
  assert.notEqual(
    tokenLimits.resetWindowIfElapsed(daily, D1).windowStart,
    tokenLimits.resetWindowIfElapsed(daily, D2).windowStart
  );
  assert.notEqual(
    tokenLimits.resetWindowIfElapsed(weekly, W1).windowStart,
    tokenLimits.resetWindowIfElapsed(weekly, W2).windowStart
  );
  assert.notEqual(
    tokenLimits.resetWindowIfElapsed(monthly, NOW_JAN).windowStart,
    tokenLimits.resetWindowIfElapsed(monthly, NOW_FEB).windowStart
  );

  // Same window: two distinct `now`s inside the same period give same windowStart.
  const dailySameA = Date.UTC(2026, 0, 10, 1);
  const dailySameB = Date.UTC(2026, 0, 10, 23);
  assert.equal(
    tokenLimits.resetWindowIfElapsed(daily, dailySameA).windowStart,
    tokenLimits.resetWindowIfElapsed(daily, dailySameB).windowStart
  );
  // weekly same window: Mon and Sun of same week.
  const weekMon = Date.UTC(2026, 0, 5, 3); // Monday
  const weekSun = Date.UTC(2026, 0, 11, 20); // Sunday same week
  assert.equal(
    tokenLimits.resetWindowIfElapsed(weekly, weekMon).windowStart,
    tokenLimits.resetWindowIfElapsed(weekly, weekSun).windowStart
  );
  // monthly same window: two days in January.
  assert.equal(
    tokenLimits.resetWindowIfElapsed(monthly, NOW_JAN).windowStart,
    tokenLimits.resetWindowIfElapsed(monthly, Date.UTC(2026, 0, 28, 4)).windowStart
  );
});

test("seed-on-miss equals usage_history SUM for the active window", async () => {
  const limit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k2",
    scopeType: "model",
    scopeValue: "gpt-4o",
    tokenLimit: 100000,
    resetInterval: "monthly",
  });

  // In-window, same-model rows (counted).
  insertUsage("k2", "openai", "gpt-4o", 100, 50, new Date(Date.UTC(2026, 0, 12)).toISOString());
  insertUsage("k2", "openai", "gpt-4o", 30, 20, new Date(Date.UTC(2026, 0, 14)).toISOString());
  // Different month (excluded).
  insertUsage("k2", "openai", "gpt-4o", 999, 999, new Date(Date.UTC(2025, 11, 31)).toISOString());
  // Different model (excluded).
  insertUsage("k2", "openai", "gpt-4o-mini", 777, 777, new Date(Date.UTC(2026, 0, 13)).toISOString());

  const expected = 100 + 50 + 30 + 20;
  assert.equal(counter.seedWindowUsageFromHistory(limit, NOW_JAN), expected);
});

test("getCurrentWindowUsage seeds from history and PERSISTS the seed (FIX 3)", async () => {
  const limit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k2b",
    scopeType: "model",
    scopeValue: "gpt-4o",
    tokenLimit: 100000,
    resetInterval: "monthly",
  });

  insertUsage("k2b", "openai", "gpt-4o", 200, 100, new Date(Date.UTC(2026, 0, 12)).toISOString());
  const seeded = 300;
  assert.equal(counter.seedWindowUsageFromHistory(limit, NOW_JAN), seeded);

  // FIX 3: a force-fresh read on a cold window now PERSISTS the seed to the
  // counter row (previously the seed was read-only and DB usage stayed 0).
  assert.equal(counter.getCurrentWindowUsage(limit, NOW_JAN, true), seeded);
  assert.equal(tokenLimits.getWindowUsage(limit, NOW_JAN), seeded);

  // A subsequent increment accumulates ON TOP of the persisted seed — the prior
  // historical usage is NOT forgotten.
  const { windowStart } = tokenLimits.resetWindowIfElapsed(limit, NOW_JAN);
  tokenLimits.incrementWindowTokens(limit.id, windowStart, 25);
  assert.equal(tokenLimits.getWindowUsage(limit, NOW_JAN), seeded + 25);
  assert.equal(counter.getCurrentWindowUsage(limit, NOW_JAN, true), seeded + 25);
});

test("seed total excludes cache tokens (no double-count) (FIX 2)", async () => {
  const limit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k2c",
    scopeType: "model",
    scopeValue: "claude-sonnet",
    tokenLimit: 100000,
    resetInterval: "monthly",
  });

  // tokens_input ALREADY INCLUDES cache_read + cache_creation (these columns are a
  // breakdown, per migration 012). Billable = input + output + reasoning ONLY.
  insertUsage("k2c", "anthropic", "claude-sonnet", 500, 200, new Date(Date.UTC(2026, 0, 12)).toISOString(), {
    cacheRead: 300,
    cacheCreation: 100,
    reasoning: 40,
  });

  // 500 + 200 + 40 = 740. Must NOT add cacheRead/cacheCreation again (would be 1140).
  assert.equal(counter.seedWindowUsageFromHistory(limit, NOW_JAN), 740);
});

test("cold-window recordTokenUsage seeds from history before increment (FIX 4)", async () => {
  // recordTokenUsage uses Date.now() internally; insert history in the current window.
  const limit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k2d",
    scopeType: "model",
    scopeValue: "gpt-4o",
    tokenLimit: 1000000,
    resetInterval: "monthly",
  });

  // Prior historical usage in this window, but NO counter row yet (cold window).
  insertUsage("k2d", "openai", "gpt-4o", 400, 100, new Date().toISOString());
  assert.equal(tokenLimits.getWindowUsage(limit, Date.now()), 0); // no counter row yet

  // First record on the cold window must seed (500) then add the delta (50) = 550,
  // NOT restart from 0 (which would yield 50).
  counter.recordTokenUsage("k2d", "openai", "gpt-4o", 50);
  await flush();
  await flush();

  assert.equal(tokenLimits.getWindowUsage(limit, Date.now()), 550);
});

test("most-restrictive breach wins when model and provider both match", async () => {
  // Case A: both breach; provider has smaller limitValue (tie on remaining=0).
  const modelLimit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k3",
    scopeType: "model",
    scopeValue: "gpt-4o",
    tokenLimit: 100,
    resetInterval: "monthly",
  });
  const providerLimit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k3",
    scopeType: "provider",
    scopeValue: "openai",
    tokenLimit: 50,
    resetInterval: "monthly",
  });

  const mWs = tokenLimits.resetWindowIfElapsed(modelLimit, NOW_JAN).windowStart;
  const pWs = tokenLimits.resetWindowIfElapsed(providerLimit, NOW_JAN).windowStart;
  tokenLimits.incrementWindowTokens(modelLimit.id, mWs, 100); // remaining 0
  tokenLimits.incrementWindowTokens(providerLimit.id, pWs, 55); // remaining 0, smaller limitValue

  const breachA = counter.checkTokenLimits("k3", "openai", "gpt-4o", NOW_JAN);
  assert.ok(breachA);
  assert.equal(breachA!.scopeType, "provider");
  assert.equal(breachA!.limitValue, 50);

  // Case B: only the model limit breaches → it is returned.
  const modelLimit2 = tokenLimits.upsertTokenLimit({
    apiKeyId: "k3b",
    scopeType: "model",
    scopeValue: "gpt-4o",
    tokenLimit: 100,
    resetInterval: "monthly",
  });
  const providerLimit2 = tokenLimits.upsertTokenLimit({
    apiKeyId: "k3b",
    scopeType: "provider",
    scopeValue: "openai",
    tokenLimit: 200,
    resetInterval: "monthly",
  });
  const mWs2 = tokenLimits.resetWindowIfElapsed(modelLimit2, NOW_JAN).windowStart;
  const pWs2 = tokenLimits.resetWindowIfElapsed(providerLimit2, NOW_JAN).windowStart;
  tokenLimits.incrementWindowTokens(modelLimit2.id, mWs2, 100); // breach (>=100)
  tokenLimits.incrementWindowTokens(providerLimit2.id, pWs2, 150); // 150 < 200 → no breach

  const breachB = counter.checkTokenLimits("k3b", "openai", "gpt-4o", NOW_JAN);
  assert.ok(breachB);
  assert.equal(breachB!.scopeType, "model");
  assert.equal(breachB!.limitValue, 100);
});

test("disabled limit is ignored by checkTokenLimits", async () => {
  const limit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k4",
    scopeType: "model",
    scopeValue: "gpt-4o",
    tokenLimit: 10,
    resetInterval: "monthly",
    enabled: false,
  });
  const ws = tokenLimits.resetWindowIfElapsed(limit, NOW_JAN).windowStart;
  tokenLimits.incrementWindowTokens(limit.id, ws, 999);
  assert.equal(counter.checkTokenLimits("k4", "openai", "gpt-4o", NOW_JAN), null);
});

test("global fallback applies when no model/provider limit", async () => {
  const limit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k5",
    scopeType: "global",
    tokenLimit: 10,
    resetInterval: "monthly",
  });
  const ws = tokenLimits.resetWindowIfElapsed(limit, NOW_JAN).windowStart;
  tokenLimits.incrementWindowTokens(limit.id, ws, 20);
  const breach = counter.checkTokenLimits("k5", "openai", "gpt-4o", NOW_JAN);
  assert.ok(breach);
  assert.equal(breach!.scopeType, "global");
  assert.equal(breach!.limitValue, 10);
});

test("atomic increment under repeated calls has no lost updates", async () => {
  const limit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k6",
    scopeType: "global",
    tokenLimit: 1000000,
    resetInterval: "monthly",
  });
  const { windowStart } = tokenLimits.resetWindowIfElapsed(limit, NOW_JAN);
  for (let i = 0; i < 100; i++) {
    tokenLimits.incrementWindowTokens(limit.id, windowStart, 7);
  }
  assert.equal(tokenLimits.getWindowUsage(limit, NOW_JAN), 700);
});

test("getCurrentWindowUsage cache hit / miss / forceFresh", async () => {
  const limit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k7",
    scopeType: "global",
    tokenLimit: 1000,
    resetInterval: "monthly",
  });

  // Prime cache via write-through.
  counter.addWindowTokens(limit, 50, NOW_JAN); // cache + DB = 50
  const { windowStart: ws } = tokenLimits.resetWindowIfElapsed(limit, NOW_JAN);

  // Mutate DB directly behind the cache → DB=80, cache stale at 50.
  tokenLimits.incrementWindowTokens(limit.id, ws, 30);

  // Cache HIT (within TTL) returns stale 50.
  assert.equal(counter.getCurrentWindowUsage(limit, NOW_JAN, false), 50);

  // forceFresh returns authoritative 80 and refreshes cache.
  assert.equal(counter.getCurrentWindowUsage(limit, NOW_JAN, true), 80);

  // Subsequent normal read returns refreshed 80.
  assert.equal(counter.getCurrentWindowUsage(limit, NOW_JAN, false), 80);
});

test("recordTokenUsage is fire-and-forget and records after microtask flush", async () => {
  // recordTokenUsage uses Date.now() internally — create + read with default now.
  const modelLimit = tokenLimits.upsertTokenLimit({
    apiKeyId: "k8",
    scopeType: "model",
    scopeValue: "gpt-4o",
    tokenLimit: 100000,
    resetInterval: "monthly",
  });

  // Returns synchronously (void) and does not throw before the microtask runs.
  assert.equal(counter.recordTokenUsage("k8", "openai", "gpt-4o", 42), undefined);

  await flush();
  await flush();

  assert.ok(tokenLimits.getWindowUsage(modelLimit, Date.now()) >= 42);

  // No-op cases: tokens <= 0 and empty apiKey.
  const before = tokenLimits.getWindowUsage(modelLimit, Date.now());
  counter.recordTokenUsage("k8", "openai", "gpt-4o", 0);
  counter.recordTokenUsage("k8", "openai", "gpt-4o", -5);
  counter.recordTokenUsage("", "openai", "gpt-4o", 99);
  await flush();
  await flush();
  assert.equal(tokenLimits.getWindowUsage(modelLimit, Date.now()), before);
});
