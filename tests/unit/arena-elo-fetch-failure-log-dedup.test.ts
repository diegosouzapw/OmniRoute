/**
 * Unit tests for the fetchArenaLeaderboards() consecutive-failure log-dedup
 * added in src/lib/arenaEloSync.ts (#11500 sub-issue 3).
 *
 * Split out of arena-elo-sync.test.ts (#11500) — that file needs a full
 * SQLite/DB fixture the sync path requires, which this fetch-only surface
 * does not; keeping these two tests self-contained keeps the split honest
 * and avoids pushing arena-elo-sync.test.ts's own (pre-existing) size past
 * the file-size gate's new-test-file cap.
 */

import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const { fetchArenaLeaderboards, resetArenaEloFetchFailureStreaksForTests } = await import(
  "../../src/lib/arenaEloSync.ts"
);
import type { ArenaLeaderboardData, ArenaModelEntry } from "../../src/lib/arenaEloSync.ts";

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

afterEach(() => {
  restoreFetch();
  resetArenaEloFetchFailureStreaksForTests();
});

describe("fetchArenaLeaderboards() — consecutive-failure log dedup (#11500)", () => {
  it("rate-limits the per-category fetch-failure warning across many consecutive timeouts", async () => {
    resetArenaEloFetchFailureStreaksForTests();
    const originalWarn = console.warn;
    const warnCalls: string[] = [];
    console.warn = ((...args: unknown[]) => {
      warnCalls.push(args.map(String).join(" "));
    }) as typeof console.warn;

    try {
      mockFetch(async () => {
        throw new Error("The operation was aborted due to timeout");
      });

      const ATTEMPTS = 25;
      for (let i = 0; i < ATTEMPTS; i++) {
        await assert.rejects(() => fetchArenaLeaderboards());
      }

      const fetchFailureWarnings = warnCalls.filter((line) =>
        line.includes('Failed to fetch "text" leaderboard')
      );

      // One category × 25 consecutive-failure attempts would be 25 raw warns —
      // the rate limiter must keep the emitted count far below that.
      assert.ok(
        fetchFailureWarnings.length < ATTEMPTS,
        `expected fewer than ${ATTEMPTS} warnings, got ${fetchFailureWarnings.length}`
      );
      assert.ok(
        fetchFailureWarnings.length <= 5,
        `expected the streak-gated warning to stay tightly bounded, got ${fetchFailureWarnings.length}`
      );
      assert.ok(fetchFailureWarnings.length >= 1, "the first failure must still be logged");
    } finally {
      console.warn = originalWarn;
      resetArenaEloFetchFailureStreaksForTests();
    }
  });

  it("resets the fetch-failure streak after a successful fetch so the next outage warns again", async () => {
    resetArenaEloFetchFailureStreaksForTests();
    const originalWarn = console.warn;
    const warnCalls: string[] = [];
    console.warn = ((...args: unknown[]) => {
      warnCalls.push(args.map(String).join(" "));
    }) as typeof console.warn;

    try {
      mockFetch(async () => {
        throw new Error("timeout");
      });
      await assert.rejects(() => fetchArenaLeaderboards());
      await assert.rejects(() => fetchArenaLeaderboards());

      const textData = makeLeaderboardData(
        [makeModelEntry({ model: "recovered-model", score: 1200, votes: 5000, rank: 1 })],
        "text"
      );
      const codeData = makeLeaderboardData(
        [makeModelEntry({ model: "recovered-code", score: 1200, votes: 5000, rank: 1 })],
        "code"
      );
      mockFetch(async (url: string) => {
        if (url.includes("name=text")) return jsonResponse(textData);
        if (url.includes("name=code")) return jsonResponse(codeData);
        return new Response("Not found", { status: 404 });
      });
      await fetchArenaLeaderboards();

      mockFetch(async () => {
        throw new Error("timeout again");
      });
      warnCalls.length = 0;
      await assert.rejects(() => fetchArenaLeaderboards());

      const fetchFailureWarnings = warnCalls.filter((line) =>
        line.includes('Failed to fetch "text" leaderboard')
      );
      assert.strictEqual(
        fetchFailureWarnings.length,
        1,
        "streak reset by the success must re-arm the first-failure warning"
      );
    } finally {
      console.warn = originalWarn;
      resetArenaEloFetchFailureStreaksForTests();
    }
  });
});
