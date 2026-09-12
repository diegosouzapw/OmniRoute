/**
 * Redesign tests for src/lib/arenaEloSync.ts (remediation plan 2026-09-12).
 *
 * New invariants:
 *  1. A failing fetch must NEVER delete existing entries (the old
 *     delete-before-fetch bug drained the table on every failed sync).
 *  2. A successful sync replaces the dataset atomically: upsert all +
 *     prune entries not in the refreshed set, in one transaction.
 *  3. Freshness guard: skip syncing when the table is non-empty and the
 *     latest synced_at is within the sync interval.
 *  4. Failure backoff: a failed sync persists arena_elo/lastFailedAt in
 *     key_value; subsequent syncs within the backoff window are skipped
 *     (prevents boot-loop retry storms against a rate-limited upstream).
 *  5. A successful sync clears any lastFailedAt stamp.
 *
 * Mirrors tests/unit/arena-elo-sync.test.ts patterns: node:test, real
 * in-memory SQLite via tryOpenSync + globalThis.__omnirouteDb, globalThis.fetch
 * mocks, patched migration 097 (no DEFAULT now on synced_at).
 */
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-arena-redesign-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const MIGRATION_SQL = fs.readFileSync(
  path.resolve(
    import.meta.dirname ?? __dirname,
    "../../src/lib/db/migrations/097_model_intelligence.sql"
  ),
  "utf8"
);

import { tryOpenSync } from "../../src/lib/db/adapters/driverFactory";
import type { SqliteAdapter } from "../../src/lib/db/adapters/types";
const core = await import("../../src/lib/db/core.ts");
const { syncArenaElo, getArenaEloSyncStatus, stopArenaEloSync } =
  await import("../../src/lib/arenaEloSync.ts");
import type {
  ArenaLeaderboardData,
  ArenaLeaderboardMap,
  ArenaModelEntry,
} from "../../src/lib/arenaEloSync.ts";

const originalFetch = globalThis.fetch;
function mockFetch(impl: (url: string, opts?: RequestInit) => Promise<Response>): void {
  globalThis.fetch = impl as typeof fetch;
}
function restoreFetch(): void {
  globalThis.fetch = originalFetch;
}
function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
function makeModelEntry(overrides: Partial<ArenaModelEntry> = {}): ArenaModelEntry {
  return {
    rank: 1,
    model: "anthropic/claude-sonnet",
    vendor: "Anthropic",
    score: 1350,
    ci: 10,
    votes: 5000,
    license: "proprietary",
    ...overrides,
  };
}
function makeLeaderboardData(
  models: ArenaModelEntry[] = [],
  category = "text"
): ArenaLeaderboardData {
  return { meta: { leaderboard: category, model_count: models.length }, models };
}
function makeLeaderboardMap(
  categories: Partial<Record<string, ArenaModelEntry[]>>
): ArenaLeaderboardMap {
  const map: ArenaLeaderboardMap = {};
  for (const [cat, models] of Object.entries(categories)) {
    map[cat] = makeLeaderboardData(models ?? [], cat);
  }
  return map;
}

let testAdapter: SqliteAdapter;
function createTestAdapter(): SqliteAdapter {
  const patchedSql = MIGRATION_SQL.replace(
    /\n\s*synced_at TEXT NOT NULL DEFAULT \(datetime\('now'\)\)/,
    "\n  synced_at TEXT NOT NULL"
  );
  const adapter = tryOpenSync(":memory:")!;
  adapter.exec(`
    CREATE TABLE IF NOT EXISTS key_value (
      namespace TEXT NOT NULL,
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      PRIMARY KEY (namespace, key)
    );
  `);
  adapter.exec(patchedSql);
  return adapter;
}

function seedEntry(
  model: string,
  opts: { syncedAt?: string; category?: string; expiresAt?: string | null } = {}
): void {
  const now = Date.now();
  testAdapter
    .prepare(
      `INSERT OR REPLACE INTO model_intelligence
       (model, source, category, score, elo_raw, confidence, synced_at, expires_at)
       VALUES (?, 'arena_elo', ?, ?, ?, ?, ?, ?)`
    )
    .run(
      model,
      opts.category ?? "default",
      0.5,
      1200,
      "high",
      // Default: synced 2 days ago (stale) so the freshness guard does NOT
      // skip and tests actually reach the fetch path. Tests that WANT the
      // guard to fire pass an explicit fresh syncedAt.
      opts.syncedAt ?? new Date(now - 2 * 86400_000).toISOString(),
      opts.expiresAt ?? new Date(now + 86400_000).toISOString()
    );
}

function countArenaEloEntries(): number {
  const row = testAdapter
    .prepare("SELECT COUNT(*) as cnt FROM model_intelligence WHERE source = 'arena_elo'")
    .get() as Record<string, unknown> | undefined;
  return Number(row?.cnt ?? 0);
}

function getLastFailedAt(): string | null {
  const row = testAdapter
    .prepare("SELECT value FROM key_value WHERE namespace = 'arena_elo' AND key = 'lastFailedAt'")
    .get() as { value: string } | undefined;
  return row?.value ?? null;
}

/** Fetch mock that answers all categories with the given model lists. */
function fetchServing(modelsByCategory: Record<string, ArenaModelEntry[]>) {
  return async (url: string): Promise<Response> => {
    for (const [cat, models] of Object.entries(modelsByCategory)) {
      if (url.includes(`name=${cat}`)) return jsonResponse(makeLeaderboardData(models, cat));
    }
    return new Response("", { status: 404 });
  };
}

beforeEach(() => {
  core.resetDbInstance();
  testAdapter = createTestAdapter();
  globalThis.__omnirouteDb = testAdapter as never;
  stopArenaEloSync();
  delete process.env.ARENA_ELO_SYNC_INTERVAL;
});

afterEach(() => {
  restoreFetch();
  stopArenaEloSync();
  delete globalThis.__omnirouteDb;
});

describe("arenaEloSync redesign", () => {
  it("a failing fetch never deletes existing entries", async () => {
    seedEntry("existing-model");
    assert.equal(countArenaEloEntries(), 1);

    mockFetch(async () => {
      throw new Error("network down");
    });
    const result = await syncArenaElo();

    assert.equal(result.success, false);
    assert.equal(countArenaEloEntries(), 1, "entries must survive a failed fetch");
    assert.ok(getLastFailedAt(), "failure must persist arena_elo/lastFailedAt");
  });

  it("a successful sync replaces the dataset atomically (upsert + prune)", async () => {
    seedEntry("stale-model"); // in DB, absent from the refreshed leaderboard

    mockFetch(
      fetchServing({
        text: [makeModelEntry({ model: "fresh-model" })],
        code: [],
      })
    );
    const result = await syncArenaElo();

    assert.equal(result.success, true);
    const models = getAllEntries().map((r) => r.model as string);
    assert.ok(!models.includes("stale-model"), "stale entry must be pruned");
    assert.ok(models.includes("fresh-model"), "fresh entry must be present");
    assert.equal(getLastFailedAt(), null, "success must clear lastFailedAt");
  });

  it("freshness guard: skips sync when table non-empty and synced_at within interval", async () => {
    seedEntry("recent-model", { syncedAt: new Date(Date.now() - 60_000).toISOString() }); // 1 min ago

    let fetchCalled = false;
    mockFetch(async () => {
      fetchCalled = true;
      return jsonResponse({});
    });
    const result = await syncArenaElo();

    assert.equal(fetchCalled, false, "fresh table must not trigger a fetch");
    assert.equal(result.success, true, "skip is a success (fast path)");
  });

  it("backoff wins even on an empty table: fresh lastFailedAt skips the fetch", async () => {
    // Empty table + fresh failure stamp = the exact boot-loop condition that
    // drained the live table (restart → sync → 429 → repeat). Backoff must
    // skip; the retry happens when the window (6h) elapses.
    testAdapter
      .prepare(
        "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('arena_elo','lastFailedAt',?)"
      )
      .run(new Date().toISOString());

    let fetchCalled = false;
    mockFetch(async () => {
      fetchCalled = true;
      return jsonResponse({});
    });
    const result = await syncArenaElo();

    assert.equal(fetchCalled, false, "backoff must skip the fetch even when the table is empty");
    assert.equal(result.success, false, "backoff skip reports not-success (no data change)");
    assert.equal(countArenaEloEntries(), 0, "table untouched during backoff");
  });

  it("failure backoff: skips sync within backoff window after a failure", async () => {
    seedEntry("existing-model");
    mockFetch(async () => {
      throw new Error("429 rate limited");
    });
    await syncArenaElo();
    assert.ok(getLastFailedAt(), "lastFailedAt persisted after failure");

    // Second attempt within the backoff window: fetch must NOT be called.
    let fetchCalled = false;
    mockFetch(async () => {
      fetchCalled = true;
      return jsonResponse({});
    });
    const result2 = await syncArenaElo();
    assert.equal(fetchCalled, false, "backoff must skip the fetch");
    assert.equal(result2.success, false, "backoff skip reports not-success (no data change)");
    assert.equal(countArenaEloEntries(), 1, "entries untouched during backoff");
  });
});

function getAllEntries(): Array<Record<string, unknown>> {
  return testAdapter
    .prepare("SELECT * FROM model_intelligence WHERE source = 'arena_elo' ORDER BY model, category")
    .all() as Array<Record<string, unknown>>;
}
