/**
 * tests/unit/xiaomi-mimo-selftrack-usage.test.ts
 *
 * Xiaomi MiMo exposes plan usage only behind a console session cookie (the API
 * key cannot reach the upstream usage endpoint), so OmniRoute SELF-TRACKS it:
 * it sums the tokens it routed to the connection in the current UTC month
 * (usage_history) and compares them to the known Token Plan monthly limit
 * (4.1B). These tests cover the aggregation helper + the fetcher shape, with a
 * real temp DB.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// DATA_DIR must be set before any module that opens the DB is imported.
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "omni-xiaomi-"));
process.env.DATA_DIR = TMP;

const core = await import("../../src/lib/db/core.ts");
const { getMonthlyProviderTokensForConnection } = await import(
  "../../src/lib/usage/usageStats.ts"
);
const { __testing } = await import("../../open-sse/services/usage.ts");
const { getXiaomiMimoUsage } = __testing;

const XIAOMI_LIMIT = 4_100_000_000;

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

describe("xiaomi-mimo self-tracked quota", () => {
  before(() => {
    core.getDbInstance(); // trigger migrations
    const now = new Date();
    const thisMonth = now.toISOString();
    const lastMonth = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 15)
    ).toISOString();
    // current month for conn-x: 1.0M + 0.5M (+ another 0.1M)
    insertUsage("conn-x", "xiaomi-mimo", 1_000_000, 500_000, thisMonth);
    insertUsage("conn-x", "xiaomi-mimo", 100_000, 0, thisMonth);
    // last month must NOT count toward the current window
    insertUsage("conn-x", "xiaomi-mimo", 9_000_000, 9_000_000, lastMonth);
    // a different connection must not bleed in
    insertUsage("conn-y", "xiaomi-mimo", 7_000_000, 0, thisMonth);
    // a different provider on the same connection must not bleed in
    insertUsage("conn-x", "minimax", 8_000_000, 0, thisMonth);
  });

  after(() => {
    core.resetDbInstance();
    try {
      fs.rmSync(TMP, { recursive: true, force: true });
    } catch {
      // best-effort temp cleanup
    }
  });

  it("aggregates only current-month tokens for the given provider+connection", () => {
    // 1.0M + 0.5M + 0.1M = 1.6M; excludes last-month, conn-y, and minimax rows.
    assert.equal(getMonthlyProviderTokensForConnection("xiaomi-mimo", "conn-x"), 1_600_000);
  });

  it("returns 0 for an unknown connection (fail-open, no bleed)", () => {
    assert.equal(getMonthlyProviderTokensForConnection("xiaomi-mimo", "conn-none"), 0);
  });

  it("getXiaomiMimoUsage returns a monthly quota against the 4.1B limit", async () => {
    const r = (await getXiaomiMimoUsage("conn-x")) as {
      plan?: string;
      quotas?: Record<string, { used: number; total: number; remaining?: number; remainingPercentage?: number; resetAt: string | null }>;
      message?: string;
    };
    assert.ok(r.quotas, `expected quotas, got message: ${r.message}`);
    const m = r.quotas.monthly;
    assert.ok(m, "monthly window present");
    assert.equal(m.total, XIAOMI_LIMIT);
    assert.equal(m.used, 1_600_000);
    assert.equal(m.remaining, XIAOMI_LIMIT - 1_600_000);
    assert.ok((m.remainingPercentage ?? 0) > 99.9, "barely used → ~100% remaining");
    assert.ok(m.resetAt && m.resetAt.endsWith("T00:00:00.000Z"), "reset = first of next month UTC");
  });

  it("getXiaomiMimoUsage returns a message when connection id is missing", async () => {
    const r = (await getXiaomiMimoUsage("")) as { message?: string; quotas?: unknown };
    assert.ok(r.message && !r.quotas, "no quota without a connection id");
  });
});
