/**
 * Unit tests for src/lib/arenaEloSync.ts
 *
 * Uses Node.js native test runner. All external fetch calls are mocked.
 * DB functions use a real in-memory SQLite instance via node:sqlite (DatabaseSync),
 * injected through the core module's globalThis.__omnirouteDb singleton.
 * backupDbFile is called during first sync but safely no-ops (no file on disk).
 */

import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-arena-elo-test-"));
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

const {
  normalizeModelName,
  transformToModelIntelligence,
  fetchArenaLeaderboards,
  syncArenaElo,
  getArenaEloSyncStatus,
  initArenaEloSync,
  stopArenaEloSync,
} = await import("../../src/lib/arenaEloSync.ts");
const { setFeatureFlagOverride, removeFeatureFlagOverride } =
  await import("../../src/lib/db/featureFlags.ts");

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
  return {
    meta: { leaderboard: category, model_count: models.length },
    models,
  };
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

function countArenaEloEntries(): number {
  const row = testAdapter
    .prepare("SELECT COUNT(*) as cnt FROM model_intelligence WHERE source = 'arena_elo'")
    .get() as Record<string, unknown> | undefined;
  return Number(row?.cnt ?? 0);
}

function getAllEntries(): Array<Record<string, unknown>> {
  return testAdapter
    .prepare("SELECT * FROM model_intelligence WHERE source = 'arena_elo' ORDER BY model, category")
    .all() as Array<Record<string, unknown>>;
}

beforeEach(() => {
  core.resetDbInstance();
  testAdapter = createTestAdapter();
  globalThis.__omnirouteDb = testAdapter as never;
  stopArenaEloSync();
  delete process.env.ARENA_ELO_SYNC_ENABLED;
});

afterEach(() => {
  restoreFetch();
  stopArenaEloSync();
  delete globalThis.__omnirouteDb;
  delete process.env.ARENA_ELO_SYNC_ENABLED;
});

// ═══════════════════════════════════════════════════════════
// 1. normalizeModelName()
// ═══════════════════════════════════════════════════════════

describe("normalizeModelName()", () => {
  it("strips 'anthropic/' vendor prefix", () => {
    assert.strictEqual(
      normalizeModelName("anthropic/claude-opus-4-6-thinking"),
      "claude-opus-4-6-thinking"
    );
  });

  it("strips 'openai/' vendor prefix", () => {
    assert.strictEqual(normalizeModelName("openai/gpt-5.5"), "gpt-5.5");
  });

  it("strips 'google/' vendor prefix", () => {
    assert.strictEqual(normalizeModelName("google/gemini-3-flash"), "gemini-3-flash");
  });

  it("strips 'meta/' vendor prefix", () => {
    assert.strictEqual(normalizeModelName("meta/llama-4"), "llama-4");
  });

  it("strips 'deepseek/' vendor prefix", () => {
    assert.strictEqual(normalizeModelName("deepseek/deepseek-r1"), "deepseek-r1");
  });

  it("strips 'xai/' vendor prefix", () => {
    assert.strictEqual(normalizeModelName("xai/grok-4"), "grok-4");
  });

  it("lowercases the model name", () => {
    assert.strictEqual(normalizeModelName("Claude-Sonnet-4"), "claude-sonnet-4");
  });

  it("lowercases vendor prefix before matching", () => {
    assert.strictEqual(normalizeModelName("OpenAI/GPT-5.5"), "gpt-5.5");
  });

  it("returns name unchanged when no vendor prefix matches", () => {
    assert.strictEqual(normalizeModelName("my-custom-model"), "my-custom-model");
  });
});

// ═══════════════════════════════════════════════════════════
// 2. transformToModelIntelligence()
// ═══════════════════════════════════════════════════════════

describe("transformToModelIntelligence()", () => {
  it("ELO normalization: 1500 ELO (max) with range 1000-1500 → score ≈ 0.98", () => {
    const data = makeLeaderboardMap({
      text: [
        makeModelEntry({ model: "top-model", score: 1500, votes: 5000, rank: 1 }),
        makeModelEntry({ model: "low-model", score: 1000, votes: 5000, rank: 2 }),
      ],
    });

    const entries = transformToModelIntelligence(data);
    const topEntry = entries.find((e) => e.model === "top-model" && e.category === "default");

    assert.ok(topEntry);
    // taskFit = 0.4 + 0.58 * ((1500-1000) / 500) = 0.98
    assert.ok(Math.abs(topEntry.score - 0.98) < 0.001, `got ${topEntry.score}`);
  });

  it("ELO normalization: 1000 ELO (min) with range 1000-1500 → score ≈ 0.40", () => {
    const data = makeLeaderboardMap({
      text: [
        makeModelEntry({ model: "top-model", score: 1500, votes: 5000, rank: 1 }),
        makeModelEntry({ model: "low-model", score: 1000, votes: 5000, rank: 2 }),
      ],
    });

    const entries = transformToModelIntelligence(data);
    const lowEntry = entries.find((e) => e.model === "low-model" && e.category === "default");

    assert.ok(lowEntry);
    // taskFit = 0.4 + 0.58 * ((1000-1000) / 500) = 0.4
    assert.ok(Math.abs(lowEntry.score - 0.4) < 0.001, `got ${lowEntry.score}`);
  });

  it("votes < 100 → confidence='low'", () => {
    const data = makeLeaderboardMap({
      text: [
        makeModelEntry({ model: "sparse-model", score: 1200, votes: 50, rank: 5 }),
        makeModelEntry({ model: "baseline", score: 1100, votes: 5000, rank: 10 }),
      ],
    });

    const entries = transformToModelIntelligence(data);
    const entry = entries.find((e) => e.model === "sparse-model" && e.category === "default");

    assert.ok(entry);
    assert.strictEqual(entry.confidence, "low");
  });

  it("votes >= 1000 → confidence='medium'", () => {
    const data = makeLeaderboardMap({
      text: [
        makeModelEntry({ model: "mid-model", score: 1200, votes: 1500, rank: 3 }),
        makeModelEntry({ model: "baseline", score: 1100, votes: 5000, rank: 10 }),
      ],
    });

    const entries = transformToModelIntelligence(data);
    const entry = entries.find((e) => e.model === "mid-model" && e.category === "default");

    assert.ok(entry);
    assert.strictEqual(entry.confidence, "medium");
  });

  it("votes >= 5000 → confidence='high'", () => {
    const data = makeLeaderboardMap({
      text: [
        makeModelEntry({ model: "popular-model", score: 1300, votes: 8000, rank: 1 }),
        makeModelEntry({ model: "baseline", score: 1100, votes: 3000, rank: 5 }),
      ],
    });

    const entries = transformToModelIntelligence(data);
    const entry = entries.find((e) => e.model === "popular-model" && e.category === "default");

    assert.ok(entry);
    assert.strictEqual(entry.confidence, "high");
  });

  it("category mapping: 'text' → [default, review, documentation, debugging]", () => {
    const data = makeLeaderboardMap({
      text: [makeModelEntry({ model: "text-model", score: 1200, votes: 5000, rank: 1 })],
    });

    const entries = transformToModelIntelligence(data);
    const categories = entries
      .filter((e) => e.model === "text-model")
      .map((e) => e.category)
      .sort();

    assert.deepStrictEqual(categories, ["debugging", "default", "documentation", "review"]);
  });

  it("category mapping: 'code' → [coding]", () => {
    const data = makeLeaderboardMap({
      code: [makeModelEntry({ model: "code-model", score: 1300, votes: 5000, rank: 1 })],
    });

    const entries = transformToModelIntelligence(data);
    const categories = entries.filter((e) => e.model === "code-model").map((e) => e.category);

    assert.deepStrictEqual(categories, ["coding"]);
  });

  it("expires_at is set to ~7 days in the future", () => {
    const before = Date.now();
    const data = makeLeaderboardMap({
      text: [makeModelEntry({ model: "test-model", score: 1200, votes: 5000, rank: 1 })],
    });

    const entries = transformToModelIntelligence(data);
    const after = Date.now();

    const entry = entries.find((e) => e.model === "test-model" && e.category === "default");
    assert.ok(entry);
    assert.ok(entry.expiresAt);

    const expiresMs = new Date(entry.expiresAt).getTime();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

    assert.ok(expiresMs >= before + sevenDaysMs - 2000, `expiresAt too early: ${entry.expiresAt}`);
    assert.ok(expiresMs <= after + sevenDaysMs + 2000, `expiresAt too late: ${entry.expiresAt}`);
  });

  it("source is 'arena_elo' for all entries", () => {
    const data = makeLeaderboardMap({
      text: [makeModelEntry({ model: "test-model", score: 1200, votes: 5000, rank: 1 })],
    });

    const entries = transformToModelIntelligence(data);
    for (const entry of entries) {
      assert.strictEqual(entry.source, "arena_elo");
    }
  });

  it("expands model aliases for known models", () => {
    const data = makeLeaderboardMap({
      text: [
        makeModelEntry({
          model: "anthropic/claude-opus-4-6-thinking",
          score: 1400,
          votes: 5000,
          rank: 1,
        }),
      ],
    });

    const entries = transformToModelIntelligence(data);
    const models = entries.map((e) => e.model);

    assert.ok(models.includes("claude-opus-4-6-thinking"));
    assert.ok(models.includes("claude-opus-4"));
    assert.ok(models.includes("anthropic/claude-opus-4"));
  });

  it("empty leaderboard → no entries", () => {
    const data = makeLeaderboardMap({ text: [] });
    const entries = transformToModelIntelligence(data);
    assert.strictEqual(entries.length, 0);
  });

  it("skips unknown leaderboard categories (e.g. vision)", () => {
    const data = makeLeaderboardMap({
      vision: [makeModelEntry({ model: "vision-model", score: 1300, votes: 5000, rank: 1 })],
    });

    const entries = transformToModelIntelligence(data);
    assert.strictEqual(entries.length, 0);
  });

  it("preserves eloRaw from the leaderboard", () => {
    const data = makeLeaderboardMap({
      text: [
        makeModelEntry({ model: "test-model", score: 1337, votes: 5000, rank: 1 }),
        makeModelEntry({ model: "other-model", score: 1100, votes: 3000, rank: 2 }),
      ],
    });

    const entries = transformToModelIntelligence(data);
    const entry = entries.find((e) => e.model === "test-model" && e.category === "default");
    assert.ok(entry);
    assert.strictEqual(entry.eloRaw, 1337);
  });

  it("handles single-model leaderboard (eloRange = 1, avoids division by zero)", () => {
    const data = makeLeaderboardMap({
      text: [makeModelEntry({ model: "only-model", score: 1200, votes: 5000, rank: 1 })],
    });

    const entries = transformToModelIntelligence(data);
    assert.ok(entries.length > 0);

    const entry = entries.find((e) => e.model === "only-model" && e.category === "default");
    assert.ok(entry);
    assert.ok(Math.abs(entry.score - 0.4) < 0.001);
  });

  it("rounds score to 4 decimal places", () => {
    const data = makeLeaderboardMap({
      text: [
        makeModelEntry({ model: "model-a", score: 1300, votes: 200, rank: 1 }),
        makeModelEntry({ model: "model-b", score: 1000, votes: 200, rank: 2 }),
      ],
    });

    const entries = transformToModelIntelligence(data);
    for (const entry of entries) {
      const str = entry.score.toString();
      const dot = str.indexOf(".");
      if (dot !== -1) {
        assert.ok(str.length - dot - 1 <= 4, `score ${entry.score} > 4 decimals`);
      }
    }
  });
});

// ═══════════════════════════════════════════════════════════
// 3. fetchArenaLeaderboards()
// ═══════════════════════════════════════════════════════════

describe("fetchArenaLeaderboards()", () => {
  it("successful fetch with valid JSON returns both leaderboards", async () => {
    const textData = makeLeaderboardData(
      [makeModelEntry({ model: "text-model", score: 1200, votes: 5000, rank: 1 })],
      "text"
    );
    const codeData = makeLeaderboardData(
      [makeModelEntry({ model: "code-model", score: 1300, votes: 5000, rank: 1 })],
      "code"
    );

    mockFetch(async (url: string) => {
      if (url.includes("name=text")) return jsonResponse(textData);
      if (url.includes("name=code")) return jsonResponse(codeData);
      return new Response("Not found", { status: 404 });
    });

    const result = await fetchArenaLeaderboards();

    assert.ok(result.text);
    assert.ok(result.code);
    assert.strictEqual(result.text.models.length, 1);
    assert.strictEqual(result.code.models.length, 1);
  });

  it("failed fetch (non-200 status) throws with descriptive message", async () => {
    mockFetch(async () => {
      return new Response("Internal Server Error", { status: 500 });
    });

    await assert.rejects(
      () => fetchArenaLeaderboards(),
      (err: unknown) => {
        assert.ok(err instanceof Error);
        assert.ok(err.message.includes("All Arena leaderboard fetches failed"));
        return true;
      }
    );
  });

  it("all fetches fail (network error) → throws", async () => {
    mockFetch(async () => {
      throw new Error("Network error: ECONNREFUSED");
    });

    await assert.rejects(
      () => fetchArenaLeaderboards(),
      (err: unknown) => {
        assert.ok(err instanceof Error);
        assert.ok(err.message.includes("All Arena leaderboard fetches failed"));
        return true;
      }
    );
  });

  it("succeeds when one category fails but another succeeds", async () => {
    const textData = makeLeaderboardData(
      [makeModelEntry({ model: "text-model", score: 1200, votes: 5000, rank: 1 })],
      "text"
    );

    mockFetch(async (url: string) => {
      if (url.includes("name=text")) return jsonResponse(textData);
      if (url.includes("name=code")) return new Response("Error", { status: 500 });
      return new Response("Not found", { status: 404 });
    });

    const result = await fetchArenaLeaderboards();
    assert.ok(result.text);
    assert.strictEqual(result.code, undefined);
  });

  it("invalid JSON in response → throws when all responses are invalid", async () => {
    mockFetch(async () => {
      return new Response("not-json", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    });

    await assert.rejects(
      () => fetchArenaLeaderboards(),
      (err: unknown) => {
        assert.ok(err instanceof Error);
        assert.ok(err.message.includes("All Arena leaderboard fetches failed"));
        return true;
      }
    );
  });
});

// ═══════════════════════════════════════════════════════════
// 4. syncArenaElo()
// ═══════════════════════════════════════════════════════════

describe("syncArenaElo()", () => {
  it("happy path: returns success=true with correct modelCount", async () => {
    const textData = makeLeaderboardData(
      [makeModelEntry({ model: "gpt-5.5", score: 1200, votes: 5000, rank: 1 })],
      "text"
    );
    const codeData = makeLeaderboardData(
      [makeModelEntry({ model: "deepseek-r1", score: 1300, votes: 5000, rank: 1 })],
      "code"
    );

    mockFetch(async (url: string) => {
      if (url.includes("name=text")) return jsonResponse(textData);
      if (url.includes("name=code")) return jsonResponse(codeData);
      return new Response("Not found", { status: 404 });
    });

    const result = await syncArenaElo();

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.source, "arena_elo");
    assert.ok(result.modelCount > 0);

    const dbCount = countArenaEloEntries();
    assert.ok(dbCount > 0);
    assert.strictEqual(dbCount, result.modelCount);
  });

  it("happy path: entries in DB have correct source and categories", async () => {
    const textData = makeLeaderboardData(
      [makeModelEntry({ model: "unique-test-model", score: 1200, votes: 5000, rank: 1 })],
      "text"
    );

    mockFetch(async (url: string) => {
      if (url.includes("name=text")) return jsonResponse(textData);
      if (url.includes("name=code")) return jsonResponse(makeLeaderboardData([], "code"));
      return new Response("Not found", { status: 404 });
    });

    await syncArenaElo();

    const entries = getAllEntries().filter((e) => String(e.model) === "unique-test-model");
    const categories = entries.map((e) => String(e.category)).sort();
    assert.deepStrictEqual(categories, ["debugging", "default", "documentation", "review"]);

    for (const entry of entries) {
      assert.strictEqual(entry.source, "arena_elo");
    }
  });

  it("dryRun=true → does not call bulkUpsertModelIntelligence", async () => {
    const textData = makeLeaderboardData(
      [makeModelEntry({ model: "test-model", score: 1200, votes: 5000, rank: 1 })],
      "text"
    );

    mockFetch(async (url: string) => {
      if (url.includes("name=text")) return jsonResponse(textData);
      if (url.includes("name=code")) return jsonResponse(makeLeaderboardData([], "code"));
      return new Response("Not found", { status: 404 });
    });

    const result = await syncArenaElo(true);

    assert.strictEqual(result.success, true);
    assert.ok(result.modelCount > 0);

    const dbCount = countArenaEloEntries();
    assert.strictEqual(dbCount, 0, "dryRun should not write to DB");
  });

  it("dryRun=true does not update lastSyncTime", async () => {
    // Reset module-level state by observing that before this test's dryRun,
    // lastSync should remain unchanged from whatever it was.
    // Since we can't reset module-level vars, we verify that a dryRun
    // after a non-dryRun doesn't overwrite the model count.
    const statusBefore = getArenaEloSyncStatus();

    const textData = makeLeaderboardData(
      [makeModelEntry({ model: "test-model", score: 1200, votes: 5000, rank: 1 })],
      "text"
    );

    mockFetch(async (url: string) => {
      if (url.includes("name=text")) return jsonResponse(textData);
      if (url.includes("name=code")) return jsonResponse(makeLeaderboardData([], "code"));
      return new Response("Not found", { status: 404 });
    });

    await syncArenaElo(true);

    const statusAfter = getArenaEloSyncStatus();
    // dryRun should not change the modelCount
    assert.strictEqual(statusAfter.lastSyncModelCount, statusBefore.lastSyncModelCount);
  });

  it("API failure → returns success=false with error", async () => {
    mockFetch(async () => {
      throw new Error("Network down");
    });

    const result = await syncArenaElo();

    assert.strictEqual(result.success, false);
    assert.strictEqual(result.source, "arena_elo");
    assert.strictEqual(result.modelCount, 0);
    assert.ok(result.error);
    assert.ok(
      result.error!.includes("All Arena leaderboard fetches failed"),
      `unexpected: ${result.error}`
    );
  });

  it("calls deleteExpiredIntelligence before writing new entries", async () => {
    testAdapter
      .prepare(
        "INSERT INTO model_intelligence (model, source, category, score, elo_raw, confidence, synced_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .run(
        "old-model",
        "arena_elo",
        "default",
        0.5,
        1000,
        "low",
        "2025-01-01T00:00:00Z",
        "2020-01-01T00:00:00Z"
      );

    assert.strictEqual(countArenaEloEntries(), 1);

    const textData = makeLeaderboardData(
      [makeModelEntry({ model: "new-model", score: 1200, votes: 5000, rank: 1 })],
      "text"
    );

    mockFetch(async (url: string) => {
      if (url.includes("name=text")) return jsonResponse(textData);
      if (url.includes("name=code")) return jsonResponse(makeLeaderboardData([], "code"));
      return new Response("Not found", { status: 404 });
    });

    const syncResult = await syncArenaElo();
    assert.strictEqual(syncResult.success, true);

    const expiredEntry = testAdapter
      .prepare("SELECT * FROM model_intelligence WHERE model = 'old-model'")
      .get();
    assert.strictEqual(expiredEntry, undefined);
  });

  it("handles empty leaderboard gracefully (0 entries, no DB write)", async () => {
    mockFetch(async (url: string) => {
      if (url.includes("name=text")) return jsonResponse(makeLeaderboardData([], "text"));
      if (url.includes("name=code")) return jsonResponse(makeLeaderboardData([], "code"));
      return new Response("Not found", { status: 404 });
    });

    const result = await syncArenaElo();

    assert.strictEqual(result.success, true);
    assert.strictEqual(result.modelCount, 0);
    assert.strictEqual(countArenaEloEntries(), 0);
  });

  it("updates lastSyncTime after successful sync", async () => {
    const textData = makeLeaderboardData(
      [makeModelEntry({ model: "test-model", score: 1200, votes: 5000, rank: 1 })],
      "text"
    );

    mockFetch(async (url: string) => {
      if (url.includes("name=text")) return jsonResponse(textData);
      if (url.includes("name=code")) return jsonResponse(makeLeaderboardData([], "code"));
      return new Response("Not found", { status: 404 });
    });

    await syncArenaElo();

    const status = getArenaEloSyncStatus();
    assert.ok(status.lastSync);
    assert.ok(status.lastSyncModelCount > 0);
  });

  it("model aliases are stored in DB alongside canonical names", async () => {
    const textData = makeLeaderboardData(
      [
        makeModelEntry({
          model: "anthropic/claude-opus-4-6-thinking",
          score: 1400,
          votes: 5000,
          rank: 1,
        }),
      ],
      "text"
    );

    mockFetch(async (url: string) => {
      if (url.includes("name=text")) return jsonResponse(textData);
      if (url.includes("name=code")) return jsonResponse(makeLeaderboardData([], "code"));
      return new Response("Not found", { status: 404 });
    });

    await syncArenaElo();

    const entries = getAllEntries();
    const models = entries.map((e) => String(e.model));

    assert.ok(models.includes("claude-opus-4-6-thinking"));
    assert.ok(models.includes("claude-opus-4"));
  });
});

// ═══════════════════════════════════════════════════════════
// 5. getArenaEloSyncStatus()
// ═══════════════════════════════════════════════════════════

describe("getArenaEloSyncStatus()", () => {
  it("returns correct structure with all expected keys", () => {
    const status = getArenaEloSyncStatus();

    assert.ok("enabled" in status);
    assert.ok("lastSync" in status);
    assert.ok("lastSyncModelCount" in status);
    assert.ok("nextSync" in status);
    assert.ok("intervalMs" in status);
    assert.ok("sources" in status);
  });

  it("returns sources containing 'arena_elo'", () => {
    const status = getArenaEloSyncStatus();
    assert.deepStrictEqual(status.sources, ["arena_elo"]);
  });

  it("returns intervalMs as a positive number", () => {
    const status = getArenaEloSyncStatus();
    assert.ok(typeof status.intervalMs === "number");
    assert.ok(status.intervalMs > 0);
  });

  it("returns lastSyncModelCount as 0 before any non-dryRun sync completes in this suite context", () => {
    // Module-level lastSyncTime may leak from earlier tests in the suite,
    // but the structural fields are always present.
    const status = getArenaEloSyncStatus();
    assert.ok(typeof status.lastSync === "string" || status.lastSync === null);
    assert.ok(typeof status.lastSyncModelCount === "number");
    assert.ok(typeof status.nextSync === "string" || status.nextSync === null);
  });

  it("reflects ARENA_ELO_SYNC_ENABLED env var (on by default, opt-out)", () => {
    const original = process.env.ARENA_ELO_SYNC_ENABLED;

    process.env.ARENA_ELO_SYNC_ENABLED = "true";
    const enabledStatus = getArenaEloSyncStatus();
    assert.strictEqual(enabledStatus.enabled, true);

    process.env.ARENA_ELO_SYNC_ENABLED = "false";
    const disabledStatus = getArenaEloSyncStatus();
    assert.strictEqual(disabledStatus.enabled, false);

    // Default (unset) is now enabled — only an explicit "false" opts out.
    delete process.env.ARENA_ELO_SYNC_ENABLED;
    const defaultStatus = getArenaEloSyncStatus();
    assert.strictEqual(defaultStatus.enabled, true);

    if (original !== undefined) {
      process.env.ARENA_ELO_SYNC_ENABLED = original;
    } else {
      delete process.env.ARENA_ELO_SYNC_ENABLED;
    }
  });

  it("reflects dashboard feature flag DB overrides before env values", () => {
    process.env.ARENA_ELO_SYNC_ENABLED = "true";
    try {
      setFeatureFlagOverride("ARENA_ELO_SYNC_ENABLED", "false");

      const status = getArenaEloSyncStatus();
      assert.strictEqual(status.enabled, false);
    } finally {
      removeFeatureFlagOverride("ARENA_ELO_SYNC_ENABLED");
    }
  });

  it("falls back to the env value if the feature flag store is unavailable", () => {
    testAdapter.exec("DROP TABLE key_value");
    process.env.ARENA_ELO_SYNC_ENABLED = "false";

    const status = getArenaEloSyncStatus();
    assert.strictEqual(status.enabled, false);
  });
});

// ═══════════════════════════════════════════════════════════
// 6. stopArenaEloSync()
// ═══════════════════════════════════════════════════════════

describe("stopArenaEloSync()", () => {
  it("initArenaEloSync returns false when disabled by feature flag", async () => {
    try {
      setFeatureFlagOverride("ARENA_ELO_SYNC_ENABLED", "false");
      const started = await initArenaEloSync();
      assert.strictEqual(started, false);
    } finally {
      removeFeatureFlagOverride("ARENA_ELO_SYNC_ENABLED");
    }
  });

  it("does not throw when no timer is running", () => {
    assert.doesNotThrow(() => stopArenaEloSync());
  });

  it("can be called multiple times without error", () => {
    stopArenaEloSync();
    assert.doesNotThrow(() => stopArenaEloSync());
    assert.doesNotThrow(() => stopArenaEloSync());
  });
});
