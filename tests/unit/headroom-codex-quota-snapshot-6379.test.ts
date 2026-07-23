/**
 * tests/unit/headroom-codex-quota-snapshot-6379.test.ts
 *
 * Regression guard for #6379: headroom combo routing did not always select
 * the Codex account with the most free quota.
 *
 * Root cause: `orderTargetsByHeadroom` (open-sse/services/combo/quotaStrategies.ts)
 * expands targets into per-connection candidates via
 * `expandTargetsByQuotaAwareConnections` — which ALSO builds a `connectionById`
 * map of the loaded DB connection snapshots (decrypted credentials included) —
 * but discarded that map and called `getSaturation(connectionId, provider, dim)`
 * with no connection. For Codex, `fetchCodexSaturation` forwards straight to
 * `fetchCodexQuota(connectionId, connection)`, which needs `connection` (or a
 * prior `registerCodexConnection()` call) to read `accessToken`. Headroom
 * ranking runs BEFORE any request is dispatched for a candidate, so no prior
 * registration exists — `fetchCodexQuota` returned null for EVERY Codex
 * candidate, saturation failed open to 0 across the board, and headroom could
 * not tell accounts apart: the original combo order won regardless of which
 * account actually had more free quota.
 *
 * This test seeds two real Codex connections in a throwaway SQLite DB (one
 * heavily used, one nearly untouched) and a fake upstream `fetch` that reports
 * different usage per access token. It runs the REAL `orderTargetsByHeadroom`
 * end-to-end (through the real `expandTargetsByQuotaAwareConnections` +
 * `getSaturation` + `fetchCodexQuota`, no stub of the headroom fetcher seam)
 * with the busier account listed FIRST in the combo. Only the fix (threading
 * `connectionById` into `getSaturation`) lets the freer account rank first.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-headroom-codex-6379-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
// Register the real "codex" quota fetcher (normally done once at server
// startup by src/sse/handlers/chat.ts) so getQuotaFetcher("codex") is truthy
// and expandTargetsByQuotaAwareConnections actually loads connections from
// the DB instead of short-circuiting to [].
const codexFetcher = await import("../../open-sse/services/codexQuotaFetcher.ts");
codexFetcher.registerCodexQuotaFetcher();
const { orderTargetsByHeadroom } = await import(
  "../../open-sse/services/combo/quotaStrategies.ts"
);
const { _clearSaturationCache } = await import("../../src/lib/quota/saturationSignals.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  _clearSaturationCache();
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const silentLog = { warn: () => {} };

function target(connectionId: string) {
  return {
    kind: "model" as const,
    stepId: connectionId,
    executionKey: `key-${connectionId}`,
    modelStr: "codex/gpt-5-codex",
    provider: "codex",
    providerId: "codex",
    connectionId,
    weight: 1,
    label: null,
  };
}

/** Codex /wham/usage response with a given primary/secondary used_percent. */
function usageResponse(primaryUsedPercent: number, secondaryUsedPercent: number) {
  return {
    rate_limit: {
      primary_window: { used_percent: primaryUsedPercent },
      secondary_window: { used_percent: secondaryUsedPercent },
    },
  };
}

test("orderTargetsByHeadroom (codex): ranks the account with more free quota first, even when it is second in the combo", async () => {
  // "busy" is listed FIRST in the combo but is 90% saturated (5h).
  // "free" is listed SECOND but is only 5% saturated (5h).
  const busyConn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "busy@example.com",
    accessToken: "tok-busy",
  });
  const freeConn = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "free@example.com",
    accessToken: "tok-free",
  });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url: string, init?: RequestInit) => {
    const headers = init?.headers as Record<string, string> | undefined;
    const auth = headers?.["Authorization"] ?? "";
    const body =
      auth === "Bearer tok-busy" ? usageResponse(90, 10) : usageResponse(5, 5);
    return new Response(JSON.stringify(body), { status: 200 });
  }) as typeof fetch;

  try {
    const ordered = await orderTargetsByHeadroom(
      [target(busyConn.id), target(freeConn.id)],
      "combo-codex-headroom",
      silentLog
    );

    assert.deepEqual(
      ordered.map((t) => t.connectionId),
      [freeConn.id, busyConn.id],
      "the account with more free quota (freeConn) must be ranked first, " +
        "even though busyConn is first in the combo definition — this only " +
        "holds when the connection snapshot (with accessToken) reaches " +
        "fetchCodexQuota via getSaturation"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
