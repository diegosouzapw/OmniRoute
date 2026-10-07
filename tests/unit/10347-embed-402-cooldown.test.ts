/**
 * TDD regression (#10347): the embed path reads a connection's cooldown at
 * selection time but NEVER writes one on a terminal upstream failure. A Mistral
 * (or any) connection returning HTTP 402 "payment required — Check your
 * subscription" on embeds is re-selected and re-hit upstream on every request —
 * the repeated EMBED/ERROR/ProxyEgress storm on 3.8.49. Chat wires the cooldown
 * write (`markAccountUnavailable`) on hard failures; embed never does.
 *
 * Repro: create a real mistral apikey connection, mock `globalThis.fetch` to
 * return HTTP 402 with a payment-required JSON body, call `handleEmbedding`
 * with that connectionId, then assert the connection's `rate_limited_until`
 * becomes a future timestamp. Today it stays `undefined` (RED); with the fix
 * `markAccountUnavailable` persists a 1h QUOTA_EXHAUSTED cooldown (GREEN).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-402-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function readConnectionRow(connId: string) {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => {
      get: (id: string) =>
        | {
            test_status: unknown;
            rate_limited_until: unknown;
            last_error_type: unknown;
          }
        | undefined;
    };
  };
  return db
    .prepare(
      "SELECT test_status, rate_limited_until, last_error_type FROM provider_connections WHERE id = ?"
    )
    .get(connId);
}

test("embed 402 marks the connection terminal credits_exhausted (stops re-selection)", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "mistral",
    authType: "apikey",
    name: "embed 402 cooldown",
  });
  const connId = (conn as { id: string }).id;

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        code: "subscription_inactive",
        message: "Check your subscription",
      }),
      {
        status: 402,
        headers: { "content-type": "application/json" },
      }
    );

  try {
    const result = await handleEmbedding({
      body: { model: "mistral/mistral-embed", input: "ping" },
      credentials: { apiKey: "mistral-key" },
      connectionId: connId,
      log: null,
    });

    // The upstream was hit and surfaced a 402 — the bug scope.
    assert.equal(result.success, false);
    assert.equal(result.status, 402);

    const row = readConnectionRow(connId);
    // markAccountUnavailable classifies a payment-required 402 as the TERMINAL state
    // credits_exhausted (last_error_type quota_exhausted) with no transient numeric
    // cooldown — the terminal marker is what excludes the account from the embed
    // selection path on the next request, stopping the repeat re-hit storm.
    assert.equal(
      row?.test_status,
      "credits_exhausted",
      `expected the 402 to mark the connection terminal (test_status=credits_exhausted) on ${connId}, got ${String(
        row?.test_status
      )}`
    );
    assert.equal(
      row?.last_error_type,
      "quota_exhausted",
      `expected last_error_type=quota_exhausted on ${connId}, got ${String(row?.last_error_type)}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
