// Characterization of the services/usage.ts xai split (god-file decomposition): the xAI (Grok)
// self-tracked cumulative usage fetcher (getXaiUsage) moved into services/usage/xai.ts so
// usage.ts stays a thin dispatcher. Behavior-preserving move — this locks the export surface and
// the missing-connection-id fail-open; the cumulative unlimited shaping is covered via
// __testing.getXaiUsage in xai-usage.test.ts.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// DATA_DIR must be set before any module that opens the DB is imported.
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "omni-xai-split-"));
process.env.DATA_DIR = TMP;

const core = await import("../../src/lib/db/core.ts");
const X = await import("../../open-sse/services/usage/xai.ts");

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

describe("xai leaf self-tracked usage", () => {
  before(() => {
    core.getDbInstance(); // trigger migrations
    insertUsage("conn-leaf", "xai", 2_000_000, 300_000, new Date().toISOString());
  });

  after(() => {
    core.resetDbInstance();
    try {
      fs.rmSync(TMP, { recursive: true, force: true });
    } catch {
      // best-effort temp cleanup
    }
  });

  it("module exposes getXaiUsage", () => {
    assert.equal(typeof X.getXaiUsage, "function");
  });

  it("returns a message when connection id is missing", async () => {
    const r = (await X.getXaiUsage("")) as { message?: string; quotas?: unknown };
    assert.ok(r.message && !r.quotas, "no quota without a connection id");
  });

  it("returns a cumulative unlimited quota scoped to the connection", async () => {
    const r = (await X.getXaiUsage("conn-leaf")) as {
      plan?: string;
      quotas?: Record<
        string,
        { used: number; total: number; remaining: number; unlimited: boolean }
      >;
      message?: string;
    };
    assert.ok(r.quotas, `expected quotas, got message: ${r.message}`);
    const m = r.quotas!.monthly;
    assert.equal(m.used, 2_300_000);
    assert.equal(m.unlimited, true, "xAI has no fixed monthly cap");
    assert.equal(m.remaining, 100, "unlimited rows report remaining: 100");
  });
});
