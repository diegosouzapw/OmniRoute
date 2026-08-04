/**
 * tests/unit/xai-usage.test.ts
 *
 * xAI (Grok) has no public per-account quota API (the billing console at
 * console.x.ai requires a session cookie, not an API key), so — exactly like
 * the Xiaomi MiMo self-track pattern — OmniRoute self-tracks it: it sums the
 * tokens it routed to the connection from `usage_history` and surfaces them
 * as a cumulative, uncapped ("unlimited") usage figure on the quota
 * dashboard. These tests cover the aggregation helper + the fetcher shape,
 * with a real temp DB, and assert provider + connection scoping (no bleed).
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// DATA_DIR must be set before any module that opens the DB is imported.
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "omni-xai-usage-"));
process.env.DATA_DIR = TMP;

const core = await import("../../src/lib/db/core.ts");
const { getMonthlyProviderTokensForConnection } = await import(
  "../../src/lib/usage/usageStats.ts"
);
const { __testing, USAGE_FETCHER_PROVIDERS, getUsageForProvider } = await import(
  "../../open-sse/services/usage.ts"
);
const { getXaiUsage } = __testing;

function insertUsage(
  connectionId: string,
  provider: string,
  tokensIn: number,
  tokensOut: number,
  timestamp: string
) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO usage_history (provider, connection_id, tokens_input, tokens_output, timestamp)
     VALUES (?, ?, ?, ?, ?)`
  ).run(provider, connectionId, tokensIn, tokensOut, timestamp);
}

describe("xAI self-tracked usage", () => {
  before(() => {
    core.getDbInstance(); // trigger migrations
    const now = new Date();
    const inWindow = now.toISOString();
    const outOfWindow = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 15)
    ).toISOString();
    // in-window usage for conn-x: 2.0M + 0.3M
    insertUsage("conn-x", "xai", 2_000_000, 0, inWindow);
    insertUsage("conn-x", "xai", 0, 300_000, inWindow);
    // out-of-window usage must NOT count toward the current aggregate
    insertUsage("conn-x", "xai", 9_000_000, 9_000_000, outOfWindow);
    // a different connection must not bleed in
    insertUsage("conn-y", "xai", 5_000_000, 0, inWindow);
    // a different provider on the same connection must not bleed in
    insertUsage("conn-x", "minimax", 8_000_000, 0, inWindow);
  });

  after(() => {
    core.resetDbInstance();
    try {
      fs.rmSync(TMP, { recursive: true, force: true });
    } catch {
      // best-effort temp cleanup
    }
  });

  it("registers 'xai' as a usage-fetcher provider", () => {
    assert.ok(
      (USAGE_FETCHER_PROVIDERS as readonly string[]).includes("xai"),
      "xai must be listed in USAGE_FETCHER_PROVIDERS"
    );
  });

  it("aggregates only in-window tokens for the given provider+connection", () => {
    // 2.0M + 0.3M = 2.3M; excludes out-of-window, conn-y, and minimax rows.
    assert.equal(getMonthlyProviderTokensForConnection("xai", "conn-x"), 2_300_000);
  });

  it("returns 0 for an unknown connection (fail-open, no bleed)", () => {
    assert.equal(getMonthlyProviderTokensForConnection("xai", "conn-none"), 0);
  });

  it("getXaiUsage returns a cumulative unlimited quota scoped to the connection", async () => {
    const r = (await getXaiUsage("conn-x")) as {
      plan?: string;
      quotas?: Record<
        string,
        {
          used: number;
          total: number;
          remaining?: number;
          remainingPercentage?: number;
          unlimited: boolean;
          resetAt: string | null;
        }
      >;
      message?: string;
    };
    assert.ok(r.quotas, `expected quotas, got message: ${r.message}`);
    const m = r.quotas!.monthly;
    assert.ok(m, "cumulative window present");
    assert.equal(m.used, 2_300_000);
    assert.equal(m.unlimited, true, "xAI has no fixed monthly cap");
    assert.equal(m.remaining, 100, "unlimited rows report remaining: 100 (matches upstream UX)");
  });

  it("getXaiUsage does not bleed a different connection's usage", async () => {
    const r = (await getXaiUsage("conn-y")) as {
      quotas?: { monthly?: { used: number } };
    };
    assert.equal(r.quotas?.monthly?.used, 5_000_000);
  });

  it("getXaiUsage returns a message when connection id is missing", async () => {
    const r = (await getXaiUsage("")) as { message?: string; quotas?: unknown };
    assert.ok(r.message && !r.quotas, "no quota without a connection id");
  });

  it("getUsageForProvider('xai', ...) delegates to getXaiUsage", async () => {
    const r = (await getUsageForProvider({
      id: "conn-x",
      provider: "xai",
    } as Parameters<typeof getUsageForProvider>[0])) as {
      quotas?: { monthly?: { used: number; unlimited: boolean } };
    };
    assert.equal(r.quotas?.monthly?.used, 2_300_000);
    assert.equal(r.quotas?.monthly?.unlimited, true);
  });
});
