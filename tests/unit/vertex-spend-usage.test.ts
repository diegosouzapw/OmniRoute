/**
 * tests/unit/vertex-spend-usage.test.ts
 *
 * Vertex AI exposes no native usage/quota API for an API key or Service Account, so OmniRoute
 * SELF-TRACKS spend: it sums the tokens it routed to the connection (usage_history) and prices
 * them via the backend pricing table, surfacing a "$X used since this account was added" figure.
 * These tests cover the aggregation helper + the fetcher response shape with a real temp DB.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// DATA_DIR must be set before any module that opens the DB is imported.
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "omni-vertex-"));
process.env.DATA_DIR = TMP;

const core = await import("../../src/lib/db/core.ts");
const { getConnectionSpendUsdSinceAdded } = await import("../../src/lib/usage/usageStats.ts");
const { __testing } = await import("../../open-sse/services/usage.ts");
const { getVertexUsage } = __testing;

function insertUsage(
  connectionId: string,
  provider: string,
  model: string,
  tokensIn: number,
  tokensOut: number,
  success = 1
) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO usage_history (provider, model, connection_id, tokens_input, tokens_output, success, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(provider, model, connectionId, tokensIn, tokensOut, success, new Date().toISOString());
}

describe("vertex self-tracked spend", () => {
  before(() => {
    core.getDbInstance(); // trigger migrations
    // conn-v: two SUCCESSFUL priced requests across two models.
    insertUsage("conn-v", "vertex", "gemini-2.5-flash", 1_000_000, 500_000, 1);
    insertUsage("conn-v", "vertex", "gemini-3-pro-image-preview", 200_000, 100_000, 1);
    // a FAILED request on the same connection must NOT count toward spend.
    insertUsage("conn-v", "vertex", "gemini-2.5-flash", 5_000_000, 5_000_000, 0);
    // a row with a different provider on the same connection id must NOT bleed in.
    insertUsage("conn-v", "vertex-partner", "claude-opus-4-7", 9_000_000, 9_000_000, 1);
    // a different connection must not bleed in
    insertUsage("conn-other", "vertex", "gemini-2.5-flash", 9_000_000, 9_000_000, 1);
  });

  after(() => {
    core.resetDbInstance();
    try {
      fs.rmSync(TMP, { recursive: true, force: true });
    } catch {
      // best-effort temp cleanup
    }
  });

  it("counts only the connection's successful, same-provider requests", async () => {
    const { costUsd, requests } = await getConnectionSpendUsdSinceAdded("vertex", "conn-v");
    assert.equal(
      requests,
      2,
      "only the two successful vertex rows count (failed + vertex-partner + other-conn excluded)"
    );
    assert.ok(Number.isFinite(costUsd) && costUsd >= 0, "cost is a finite, non-negative number");
  });

  it("returns 0/0 for an unknown connection (no bleed)", async () => {
    const { costUsd, requests } = await getConnectionSpendUsdSinceAdded("vertex", "conn-none");
    assert.equal(requests, 0);
    assert.equal(costUsd, 0);
  });

  it("getVertexUsage returns a spend quota + $ message for a used connection", async () => {
    const r = (await getVertexUsage("conn-v", "vertex")) as {
      plan?: string;
      message?: string;
      quotas?: Record<string, { used: number; quotaSource?: string; displayName?: string }>;
    };
    assert.ok(r.quotas?.spend, "spend quota present (so the limits cache persists it)");
    assert.equal(r.quotas!.spend.quotaSource, "localUsageHistory");
    assert.ok(typeof r.quotas!.spend.used === "number" && r.quotas!.spend.used >= 0);
    assert.ok(r.message && r.message.includes("$"), "message carries the dollar figure");
    assert.ok(r.message!.includes("2 requests"), "message reports the request count");
  });

  it("getVertexUsage reports no-usage cleanly when nothing was routed", async () => {
    const r = (await getVertexUsage("conn-empty", "vertex")) as {
      message?: string;
      quotas?: Record<string, { used: number }>;
    };
    assert.ok(r.message && /no usage/i.test(r.message), "informative no-usage message");
    assert.equal(r.quotas?.spend.used, 0);
  });

  it("getVertexUsage returns a message when connection id is missing", async () => {
    const r = (await getVertexUsage("", "vertex")) as { message?: string; quotas?: unknown };
    assert.ok(r.message && !r.quotas, "no spend quota without a connection id");
  });
});
