// Characterization of the services/usage.ts vertex split (god-file decomposition): the Vertex AI
// self-tracked spend fetcher (getVertexUsage) moved into services/usage/vertex.ts so usage.ts
// stays a thin dispatcher. Behavior-preserving move — this locks the export surface and the
// missing-connection-id fail-open; the spend aggregation + message shape is covered via
// __testing.getVertexUsage in vertex-spend-usage.test.ts.
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// DATA_DIR must be set before any module that opens the DB is imported.
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "omni-vertex-split-"));
process.env.DATA_DIR = TMP;

const core = await import("../../src/lib/db/core.ts");
const V = await import("../../open-sse/services/usage/vertex.ts");

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

describe("vertex leaf self-tracked spend", () => {
  before(() => {
    core.getDbInstance(); // trigger migrations
    insertUsage("conn-leaf", "vertex", "gemini-2.5-flash", 1_000_000, 500_000, 1);
  });

  after(() => {
    core.resetDbInstance();
    try {
      fs.rmSync(TMP, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // best-effort temp cleanup
    }
  });

  it("module exposes getVertexUsage", () => {
    assert.equal(typeof V.getVertexUsage, "function");
  });

  it("returns a message when connection id is missing", async () => {
    const r = (await V.getVertexUsage("", "vertex")) as { message?: string; quotas?: unknown };
    assert.ok(r.message && !r.quotas, "no spend quota without a connection id");
  });

  it("returns a spend quota + $ message for a used connection", async () => {
    const r = (await V.getVertexUsage("conn-leaf", "vertex")) as {
      plan?: string;
      message?: string;
      quotas?: Record<string, { used: number; quotaSource?: string; displayName?: string }>;
    };
    assert.ok(r.quotas?.spend, "spend quota present");
    assert.equal(r.quotas!.spend.quotaSource, "localUsageHistory");
    assert.ok(r.message && r.message.includes("$"));
    assert.ok(r.message!.includes("1 request"));
  });

  it("reports no-usage cleanly when nothing was routed", async () => {
    const r = (await V.getVertexUsage("conn-empty", "vertex")) as {
      message?: string;
      quotas?: Record<string, { used: number }>;
    };
    assert.ok(r.message && /no usage/i.test(r.message));
    assert.equal(r.quotas?.spend.used, 0);
  });
});
