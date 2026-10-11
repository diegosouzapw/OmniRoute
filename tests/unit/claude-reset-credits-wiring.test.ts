/**
 * Wiring for the Claude banked reset-credit count, through the public entry points:
 * the dashboard's provider-limits refresh, the reset-credit list and the redeem.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-reset-wiring-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "claude-reset-wiring-test-secret";

const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { getProviderLimitsCache } = await import("../../src/lib/db/providerLimits.ts");
const { acquireExclusiveConnectionLease } =
  await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const { fetchAndPersistProviderLimits } = await import("../../src/lib/usage/providerLimits.ts");
const { listClaudeResetCredits, consumeClaudeResetCredit } =
  await import("../../src/lib/usage/claudeResetCredits.ts");
const resetCreditMemo = await import("../../open-sse/services/claudeResetCreditCount.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const BASE_USAGE_URL = "https://api.anthropic.com/api/oauth/usage";
const RESET_CREDIT_LIST_URL =
  "https://api.anthropic.com/api/oauth/usage?at_wall=1&cedar_ember=1&skip_spend=1";
const CLAIM_URL = "https://api.anthropic.com/api/organizations/org-uuid-1/reset_rate_limits";

const originalFetch = globalThis.fetch;
const calls: string[] = [];

function mockUpstream(options: { usageStatus?: number; listStatus?: number } = {}) {
  calls.length = 0;
  globalThis.fetch = (async (input: unknown, init?: RequestInit) => {
    const url = String(input);
    calls.push(`${init?.method ?? "GET"} ${url}`);
    if (url === BASE_USAGE_URL && options.usageStatus) {
      return new Response(null, { status: options.usageStatus });
    }
    if (url === BASE_USAGE_URL) {
      return Response.json({
        five_hour: { utilization: 100, resets_at: "2099-09-10T14:00:00Z" },
        seven_day: { utilization: 40, resets_at: "2099-09-16T13:00:00Z" },
        cedar_ember: null,
        juniper_tide: null,
      });
    }
    if (url === RESET_CREDIT_LIST_URL && options.listStatus) {
      return new Response(null, { status: options.listStatus });
    }
    if (url === RESET_CREDIT_LIST_URL) {
      return Response.json({
        cedar_ember: { grants: [{ id: "grant-a", resets_left: 2, usable_now: true }] },
        juniper_tide: { eligible: true, arm: "reset", available: true },
      });
    }
    if (url === CLAIM_URL) return Response.json({ result: "reset" });
    return new Response(null, { status: 503 });
  }) as typeof fetch;
}

const count = (prefix: string) => calls.filter((c) => c.startsWith(prefix)).length;

test.beforeEach(() => {
  resetCreditMemo._resetClaudeResetCreditCountCache();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("reset-credit operations reject leased connections and missing tokens before upstream I/O", async () => {
  for (const leased of [false, true]) {
    const connection = await createProviderConnection({
      provider: "claude",
      authType: "oauth",
      name: leased ? "Leased credits" : "Missing credit token",
      ...(leased ? { accessToken: "leased-token" } : {}),
      expiresAt: "2099-01-01T00:00:00Z",
    });
    const id = String(connection.id);
    if (leased) {
      const lease = acquireExclusiveConnectionLease({
        leaseOwnerId: `vlo_${"c".repeat(43)}`,
        apiKeyId: "reset-credit-test-key",
        provider: "claude",
        connectionId: id,
      });
      assert.equal(lease.kind, "ACQUIRED");
    }
    mockUpstream();
    const expected = {
      status: leased ? 409 : 401,
      code: leased ? "exclusive_lease_active" : "claude_access_token_missing",
    };
    await assert.rejects(listClaudeResetCredits(id), expected);
    await assert.rejects(consumeClaudeResetCredit(id, "guard-idem", "grant:a"), expected);
    assert.deepEqual(calls, []);
  }
});

test("failed reset-credit lists preserve throttling and invalidate refused counts", async () => {
  const connection = await createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "List failures",
    accessToken: "list-failures-token",
    expiresAt: "2099-01-01T00:00:00Z",
  });
  const id = String(connection.id);
  for (const [upstreamStatus, expectedStatus, expectedCode, expectedCount] of [
    [429, 429, "rate_limited", 3],
    [503, 502, "claude_usage_failed", 3],
    [403, 502, "claude_usage_failed", null],
  ] as const) {
    mockUpstream();
    await listClaudeResetCredits(id);
    mockUpstream({ listStatus: upstreamStatus });
    await assert.rejects(listClaudeResetCredits(id), {
      name: "ClaudeResetCreditError",
      status: expectedStatus,
      code: expectedCode,
    });
    assert.equal(resetCreditMemo.peekClaudeResetCreditCount(id), expectedCount);
  }
});

test("dashboard quota refresh shows reset credits without opening the credits modal", async () => {
  const connection = await createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Dashboard credits",
    accessToken: "dashboard-credits-token",
    isActive: true,
    expiresAt: "2099-01-01T00:00:00Z",
  });
  mockUpstream();
  const refreshed = await fetchAndPersistProviderLimits(connection.id as string, "manual", {
    includeResetCredits: true,
  });
  assert.equal(refreshed.usage.bankedResetCredits, 3);
  assert.equal(getProviderLimitsCache(connection.id as string)?.bankedResetCredits, 3);
  assert.equal(count(`GET ${RESET_CREDIT_LIST_URL}`), 1);
});

test("listing seeds the dashboard count and a redeem invalidates it", async () => {
  const connection = await createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Reset wiring",
    email: "alice@example.com",
    accessToken: "wiring-token",
    isActive: true,
    expiresAt: "2099-01-01T00:00:00Z",
    providerSpecificData: { organizationUUID: "org-uuid-1" },
  });
  const id = connection.id as string;
  mockUpstream();

  const beforeList = await fetchAndPersistProviderLimits(id, "manual");
  assert.equal("bankedResetCredits" in beforeList.usage, false, "unknown before any list");
  assert.equal(count(`GET ${RESET_CREDIT_LIST_URL}`), 0, "the usage refresh never lists");

  const listed = await listClaudeResetCredits(id);
  assert.equal(listed.credits.length, 2);
  assert.equal(count(`GET ${RESET_CREDIT_LIST_URL}`), 1);

  const afterList = await fetchAndPersistProviderLimits(id, "manual");
  assert.equal(afterList.usage.bankedResetCredits, 3);
  assert.equal(getProviderLimitsCache(id)?.bankedResetCredits, 3);
  assert.equal(count(`GET ${RESET_CREDIT_LIST_URL}`), 1, "the refresh read the memo only");

  const redeemed = await consumeClaudeResetCredit(id, "idem-1", "grant:grant-a");
  assert.equal(redeemed.outcome, "reset");
  assert.equal(count(`POST ${CLAIM_URL}`), 1);
  assert.equal("bankedResetCredits" in redeemed.usage, false, "the redeem made the count unknown");
  assert.equal(count(`GET ${RESET_CREDIT_LIST_URL}`), 1);
});

test("a redeem whose follow-up refresh is throttled does not bring back the old count", async () => {
  const connection = await createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: "Reset wiring stale",
    email: "bob@example.com",
    accessToken: "wiring-stale-token",
    isActive: true,
    expiresAt: "2099-01-01T00:00:00Z",
    providerSpecificData: { organizationUUID: "org-uuid-1" },
  });
  const id = connection.id as string;
  mockUpstream();
  await listClaudeResetCredits(id);
  await fetchAndPersistProviderLimits(id, "manual");
  assert.equal(getProviderLimitsCache(id)?.bankedResetCredits, 3);

  // The usage refresh after the redeem gets a 429, so the stale cached entry is served.
  mockUpstream({ usageStatus: 429 });
  const redeemed = await consumeClaudeResetCredit(id, "idem-2", "grant:grant-a");
  assert.equal(redeemed.usage._stale, true);
  assert.equal("bankedResetCredits" in redeemed.usage, false, "no pre-redeem count");
  assert.equal(getProviderLimitsCache(id)?.bankedResetCredits, undefined);
});
