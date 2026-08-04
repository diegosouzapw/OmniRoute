// Characterization of the services/usage.ts xiaomi-mimo split (god-file decomposition): the
// Xiaomi MiMo self-tracked monthly quota fetcher (getXiaomiMimoUsage) moved into
// services/usage/xiaomi-mimo.ts so usage.ts stays a thin dispatcher. Behavior-preserving move —
// this locks the export surface and the missing-connection-id fail-open; the monthly aggregation
// + 4.1B limit comparison is covered via __testing.getXiaomiMimoUsage in
// xiaomi-mimo-selftrack-usage.test.ts.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// DATA_DIR must be set before any module that opens the DB is imported.
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "omni-xiaomi-split-"));
process.env.DATA_DIR = TMP;

const core = await import("../../src/lib/db/core.ts");
const X = await import("../../open-sse/services/usage/xiaomi-mimo.ts");

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

describe("xiaomi-mimo leaf self-tracked quota", () => {
  before(() => {
    core.getDbInstance(); // trigger migrations
    insertUsage("conn-leaf", "xiaomi-mimo", 1_000_000, 500_000, new Date().toISOString());
  });

  after(() => {
    core.resetDbInstance();
    try {
      fs.rmSync(TMP, { recursive: true, force: true });
    } catch {
      // best-effort temp cleanup
    }
  });

  it("module exposes getXiaomiMimoUsage", () => {
    assert.equal(typeof X.getXiaomiMimoUsage, "function");
  });

  it("returns a message when connection id is missing", async () => {
    const r = (await X.getXiaomiMimoUsage("")) as { message?: string; quotas?: unknown };
    assert.ok(r.message && !r.quotas, "no quota without a connection id");
  });

  it("returns a monthly quota against the 4.1B limit", async () => {
    const r = (await X.getXiaomiMimoUsage("conn-leaf")) as {
      plan?: string;
      quotas?: Record<
        string,
        {
          used: number;
          total: number;
          remaining?: number;
          remainingPercentage?: number;
          resetAt: string | null;
        }
      >;
      message?: string;
    };
    assert.ok(r.quotas, `expected quotas, got message: ${r.message}`);
    const m = r.quotas!.monthly;
    assert.equal(m.total, 4_100_000_000);
    assert.equal(m.used, 1_500_000);
    assert.ok(m.resetAt && m.resetAt.endsWith("T00:00:00.000Z"), "reset = first of next month UTC");
  });
});
