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

function mockUpstream() {
  calls.length = 0;
  globalThis.fetch = (async (input: unknown, init?: RequestInit) => {
    const url = String(input);
    calls.push(`${init?.method ?? "GET"} ${url}`);
    if (url === BASE_USAGE_URL) {
      return Response.json({
        five_hour: { utilization: 100, resets_at: "2099-09-10T14:00:00Z" },
        seven_day: { utilization: 40, resets_at: "2099-09-16T13:00:00Z" },
        cedar_ember: null,
        juniper_tide: null,
      });
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
