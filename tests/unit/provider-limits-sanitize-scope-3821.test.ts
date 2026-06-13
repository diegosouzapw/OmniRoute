/**
 * LEDGER-2 (#3821-review) — getSanitizedCachedProviderLimitsMap is polled by the
 * ProviderLimits dashboard on an auto-refresh interval. It used to run an
 * unconditional `SELECT * FROM provider_connections` (decrypting every active
 * connection's credentials) on every poll, even though quota-key sanitization only
 * ever rewrites Antigravity/agy entries. The fix scopes the connection scan to
 * antigravity/agy (and skips it entirely for an empty cache).
 *
 * These tests pin the BEHAVIOR the optimization must preserve:
 *   1. empty cache  → {} (no scan needed)
 *   2. non-Antigravity entry → returned verbatim (a junk quota key survives), proving
 *      entries whose connection is no longer fetched are still passed through unchanged
 *   3. Antigravity entry → still sanitized (a non-user-callable quota key is dropped),
 *      proving the scoped query still feeds the sanitizer
 *
 * (2) is the load-bearing case: with the old code the openai connection was fetched and
 * present in the lookup; with the new code it is NOT fetched at all, yet the output must
 * be identical — which it is, because sanitizeProviderLimitsCacheForConnection returns
 * the entry unchanged when no matching connection is supplied.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plimits-scope-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-plimits-scope-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerLimitsDb = await import("../../src/lib/db/providerLimits.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function cacheEntry(quotas: Record<string, unknown>) {
  return {
    quotas,
    plan: null,
    message: null,
    fetchedAt: new Date(0).toISOString(),
    source: null,
  };
}

test("empty provider-limits cache returns {} without any connection scan", async () => {
  const out = await providerLimits.getSanitizedCachedProviderLimitsMap();
  assert.deepEqual(out, {});
});

test("non-Antigravity cache entry is returned verbatim (junk quota key survives)", async () => {
  // An active openai connection whose credentials would be decrypted by the old
  // unconditional scan. Under the fix it is never fetched — the entry must still pass
  // through unchanged.
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "api_key",
    name: "OpenAI key",
    apiKey: "sk-test-openai",
  });
  const quotas = { "definitely-not-a-real-model": { used: 1, limit: 10 } };
  providerLimitsDb.setProviderLimitsCache((conn as { id: string }).id, cacheEntry(quotas));

  const out = await providerLimits.getSanitizedCachedProviderLimitsMap();
  const entry = out[(conn as { id: string }).id];
  assert.ok(entry, "openai cache entry should be present");
  // Sanitization is antigravity/agy-only → the junk key is NOT dropped for openai.
  assert.deepEqual(entry.quotas, quotas);
});

test("Antigravity cache entry is still sanitized (non-user-callable quota key dropped)", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "antigravity",
    authType: "oauth",
    name: "Antigravity acct",
    email: "antigravity@example.test",
    accessToken: "ag-access",
    refreshToken: "ag-refresh",
    expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
  });
  // `credits` is always allowed; the junk model id is not user-callable → dropped.
  const quotas = {
    credits: { used: 5, limit: 100 },
    "definitely-not-a-real-model": { used: 1, limit: 10 },
  };
  providerLimitsDb.setProviderLimitsCache((conn as { id: string }).id, cacheEntry(quotas));

  const out = await providerLimits.getSanitizedCachedProviderLimitsMap();
  const entry = out[(conn as { id: string }).id];
  assert.ok(entry?.quotas, "antigravity cache entry should be present");
  assert.ok("credits" in (entry.quotas as Record<string, unknown>), "credits is kept");
  assert.ok(
    !("definitely-not-a-real-model" in (entry.quotas as Record<string, unknown>)),
    "non-user-callable quota key is dropped for antigravity"
  );
});
