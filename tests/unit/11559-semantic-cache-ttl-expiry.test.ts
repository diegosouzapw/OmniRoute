/**
 * #11559 — the semantic cache never expired an entry whose `expires_at` fell on the
 * current UTC calendar day.
 *
 * `expires_at` is written as an ISO-8601 string ("2026-08-26T14:00:00.000Z") but was read
 * back with `expires_at > datetime('now')`, and `datetime('now')` renders as
 * "2026-08-26 14:00:00". Both are TEXT, so SQLite compares them lexicographically and they
 * diverge at index 10, where the stored value has 'T' (0x54) and `datetime('now')` has
 * ' ' (0x20). 'T' sorts after ' ', so any row whose date part equalled today's date looked
 * unexpired no matter what its time-of-day TTL said — up to ~24h of staleness, and it
 * survived restarts because `getCachedResponse` promotes DB rows back into the LRU.
 */

import { describe, it, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  clearCache,
  clearMemoryCache,
  getCachedResponse,
  getCacheStats,
  setCachedResponse,
} from "../../src/lib/semanticCache.ts";
import { getDbInstance } from "../../src/lib/db/core.ts";

function ensureSemanticCacheTable(db) {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS semantic_cache (
      id TEXT PRIMARY KEY,
      signature TEXT NOT NULL UNIQUE,
      model TEXT NOT NULL,
      prompt_hash TEXT NOT NULL,
      response TEXT NOT NULL,
      tokens_saved INTEGER DEFAULT 0,
      hit_count INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    )`
  ).run();
}

/** Midnight of the UTC day SQLite itself considers "today" — always <= `datetime('now')`. */
function startOfSqliteToday(db): string {
  const row = db.prepare("SELECT datetime('now') AS now").get();
  return `${String(row.now).slice(0, 10)}T00:00:00.000Z`;
}

function insertRow(db, signature: string, expiresAt: string, response: unknown) {
  db.prepare(
    `INSERT OR REPLACE INTO semantic_cache
       (id, signature, model, prompt_hash, response, tokens_saved, hit_count, created_at, expires_at)
     VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)`
  ).run(
    `id-${signature}`,
    signature,
    "gpt-4o",
    signature.slice(0, 16),
    JSON.stringify(response),
    7,
    new Date(Date.now() - 60_000).toISOString(),
    expiresAt
  );
}

describe("#11559 semantic cache TTL expiry", () => {
  let db;

  before(() => {
    db = getDbInstance();
    ensureSemanticCacheTable(db);
  });

  beforeEach(() => {
    clearCache();
  });

  it("misses a row that expired earlier today (UTC)", () => {
    // Expired at 00:00 UTC today: same calendar date as `datetime('now')`, so the old
    // `expires_at > datetime('now')` predicate answered true on the 'T' vs ' ' byte alone.
    insertRow(db, "sig-expired-today", startOfSqliteToday(db), { choices: ["stale"] });
    clearMemoryCache();

    assert.equal(
      getCachedResponse("sig-expired-today"),
      null,
      "an entry whose TTL lapsed earlier today must not be served"
    );
  });

  it("does not count a row that expired earlier today in dbEntries", () => {
    insertRow(db, "sig-stats-expired", startOfSqliteToday(db), { choices: ["stale"] });
    clearMemoryCache();

    assert.equal(getCacheStats().dbEntries, 0);
  });

  it("still serves a row whose TTL has not lapsed", () => {
    const response = { choices: [{ message: { content: "fresh" } }] };
    insertRow(db, "sig-live", new Date(Date.now() + 3_600_000).toISOString(), response);
    clearMemoryCache();

    assert.deepEqual(getCachedResponse("sig-live"), response);
    assert.equal(getCacheStats().dbEntries, 1);
  });

  it("survives a memory eviction on a normally written entry", () => {
    const response = { choices: [{ message: { content: "written" } }] };
    setCachedResponse("sig-roundtrip", "gpt-4o", response, 12, 3_600_000);
    clearMemoryCache();

    assert.deepEqual(
      getCachedResponse("sig-roundtrip"),
      response,
      "the read predicate must still match the ISO format setCachedResponse writes"
    );
  });
});
