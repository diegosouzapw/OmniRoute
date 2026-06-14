/**
 * OAuth provider-limits sync must be SEQUENTIAL + SPACED.
 *
 * `syncAllProviderLimits` historically fetched every connection in chunks of 5
 * CONCURRENT. For OAuth providers (Codex/Claude/Kimi-coding/…) that means up to
 * 5 simultaneous usage/refresh requests to the same upstream from one host —
 * which looks like burst/automated traffic and contributes to session
 * termination / anomaly flags. OAuth connections must instead be processed one
 * at a time with a spacing gap between them. Non-OAuth (stateless API-key)
 * connections keep the fast concurrent path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oauth-seq-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-oauth-seq-sync-secret";
process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "60";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");

const originalFetch = globalThis.fetch;

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function createClaudeOAuth(i: number) {
  return providersDb.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: `Claude Seq ${i}`,
    email: `claude-seq-${i}@example.test`,
    accessToken: `claude-access-${i}`,
    refreshToken: `claude-refresh-${i}`,
    // Future expiry → scheduled sync never mints; it only fetches usage.
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  });
}

function claudeUsageResponse() {
  return new Response(
    JSON.stringify({
      tier: "pro",
      five_hour: { utilization: 10, resets_at: new Date(Date.now() + 3600000).toISOString() },
      seven_day: { utilization: 20, resets_at: new Date(Date.now() + 86400000).toISOString() },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function claudeBootstrapResponse() {
  return new Response(
    JSON.stringify({
      oauth_account: {
        account_uuid: "acc-uuid",
        account_email: "claude@example.test",
        organization_uuid: "org-uuid",
        organization_name: "Org",
        organization_type: "pro",
        organization_rate_limit_tier: "pro",
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

test("syncAllProviderLimits processes OAuth connections sequentially with spacing", async () => {
  for (let i = 0; i < 3; i++) await createClaudeOAuth(i);

  // Track concurrency PER CONNECTION (by access token) — intra-connection
  // parallel fetches (usage + bootstrap) are fine; what must never happen is two
  // *different* OAuth connections being fetched at the same time.
  const inFlightConns = new Set<string>();
  let maxDistinctConns = 0;
  const connFirstStart: Record<string, number> = {};

  const tokenOf = (init: RequestInit | undefined): string => {
    const headers = new Headers((init?.headers as HeadersInit) || {});
    for (const [, v] of headers.entries()) {
      const m = /claude-access-(\d+)/.exec(String(v));
      if (m) return m[1];
    }
    return "unknown";
  };

  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(
      typeof input === "string" ? input : input instanceof URL ? input.href : (input as Request).url
    );
    const conn = tokenOf(init);
    if (connFirstStart[conn] === undefined) connFirstStart[conn] = Date.now();
    inFlightConns.add(conn);
    maxDistinctConns = Math.max(maxDistinctConns, inFlightConns.size);
    // Hold the request open so two concurrent connections would overlap.
    await new Promise((r) => setTimeout(r, 30));
    try {
      if (url.includes("/bootstrap") || url.includes("oauth_account")) {
        return claudeBootstrapResponse();
      }
      return claudeUsageResponse();
    } finally {
      // Only clear once this connection has no further in-flight fetch. Since
      // intra-connection fetches are sequential, clearing here is correct.
      inFlightConns.delete(conn);
    }
  }) as typeof fetch;

  await providerLimits.syncAllProviderLimits({ source: "scheduled" });

  assert.equal(
    maxDistinctConns,
    1,
    `Two different OAuth connections must never be fetched concurrently, observed ${maxDistinctConns}`
  );

  // The spacing gap must separate consecutive connections' first fetches.
  const starts = Object.values(connFirstStart).sort((a, b) => a - b);
  assert.ok(starts.length >= 2, "expected fetches from at least two connections");
  const gaps: number[] = [];
  for (let i = 1; i < starts.length; i++) gaps.push(starts[i] - starts[i - 1]);
  assert.ok(
    gaps.every((g) => g >= 50),
    `every inter-connection gap must be >= configured spacing (~60ms), gaps=${gaps.join(",")}`
  );
});
