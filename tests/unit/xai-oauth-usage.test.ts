/**
 * tests/unit/xai-oauth-usage.test.ts
 *
 * xAI OAuth (Grok) usage.ts dispatch: live weekly billing first, then the same
 * self-tracked fallback pattern as the plain `xai` provider when billing is
 * unavailable. Mirrors tests/unit/xai-usage.test.ts for the usage.ts surface;
 * fetcher-only coverage lives in xai-oauth-quota-fetcher.test.ts.
 */

import { describe, it, before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// DATA_DIR must be set before any module that opens the DB is imported.
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "omni-xai-oauth-usage-"));
process.env.DATA_DIR = TMP;

const core = await import("../../src/lib/db/core.ts");
const { getMonthlyProviderTokensForConnection } = await import("../../src/lib/usage/usageStats.ts");
const { __testing, USAGE_FETCHER_PROVIDERS, getUsageForProvider } =
  await import("../../open-sse/services/usage.ts");
const { invalidateXaiOauthQuotaCache } =
  await import("../../open-sse/services/xaiOauthQuotaFetcher.ts");
const { getXaiOauthUsage } = __testing;

const originalFetch = globalThis.fetch;

function billingResponse(creditUsagePercent: number, endIso?: string) {
  return new Response(
    JSON.stringify({
      config: {
        creditUsagePercent,
        currentPeriod: {
          type: "WEEKLY",
          start: "2026-07-17T06:34:33.775Z",
          end: endIso || "2026-07-28T01:47:00.000Z",
        },
        productUsage: [{ product: "Api", usagePercent: creditUsagePercent }],
        isUnifiedBillingUser: true,
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

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

describe("xAI OAuth usage dispatch", () => {
  before(async () => {
    // Async boot (chatcore / sql.js path) so wrong-arch better-sqlite3 still works.
    await core.ensureDbInitialized();
    const now = new Date();
    const inWindow = now.toISOString();
    const outOfWindow = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 15)
    ).toISOString();
    // in-window usage for conn-oauth: 1.2M + 0.3M
    insertUsage("conn-oauth", "xai-oauth", 1_200_000, 0, inWindow);
    insertUsage("conn-oauth", "xai-oauth", 0, 300_000, inWindow);
    // alias-stored rows (fallback also probes "xao")
    insertUsage("conn-alias", "xao", 4_000_000, 500_000, inWindow);
    // out-of-window usage must NOT count toward the current aggregate
    insertUsage("conn-oauth", "xai-oauth", 9_000_000, 9_000_000, outOfWindow);
    // a different connection must not bleed in
    insertUsage("conn-other", "xai-oauth", 7_000_000, 0, inWindow);
    // a different provider on the same connection must not bleed in
    insertUsage("conn-oauth", "xai", 8_000_000, 0, inWindow);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    invalidateXaiOauthQuotaCache("conn-oauth");
    invalidateXaiOauthQuotaCache("conn-alias");
    invalidateXaiOauthQuotaCache("conn-live");
  });

  after(() => {
    globalThis.fetch = originalFetch;
    core.resetDbInstance();
    try {
      fs.rmSync(TMP, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // best-effort temp cleanup
    }
  });

  it("registers 'xai-oauth' and 'xao' as usage-fetcher providers", () => {
    assert.ok(
      (USAGE_FETCHER_PROVIDERS as readonly string[]).includes("xai-oauth"),
      "xai-oauth must be listed in USAGE_FETCHER_PROVIDERS"
    );
    assert.ok(
      (USAGE_FETCHER_PROVIDERS as readonly string[]).includes("xao"),
      "xao must be listed in USAGE_FETCHER_PROVIDERS"
    );
  });

  it("aggregates only in-window tokens for the given provider+connection", () => {
    // 1.2M + 0.3M = 1.5M; excludes out-of-window, conn-other, and xai rows.
    assert.equal(getMonthlyProviderTokensForConnection("xai-oauth", "conn-oauth"), 1_500_000);
    assert.equal(getMonthlyProviderTokensForConnection("xao", "conn-alias"), 4_500_000);
  });

  it("returns 0 for an unknown connection (fail-open, no bleed)", () => {
    assert.equal(getMonthlyProviderTokensForConnection("xai-oauth", "conn-none"), 0);
  });

  it("getXaiOauthUsage live path returns weekly quota from billing percent", async () => {
    globalThis.fetch = async (url) => {
      const urlStr = typeof url === "string" ? url : String(url);
      if (urlStr.includes("billing")) return billingResponse(3.0);
      return new Response("not found", { status: 404 });
    };

    const r = (await getXaiOauthUsage("conn-live", "live-token")) as {
      plan?: string;
      message?: string;
      quotas?: Record<
        string,
        {
          used: number;
          total: number;
          remaining?: number;
          unlimited?: boolean;
          resetAt: string | null;
        }
      >;
    };
    assert.ok(r.quotas, `expected quotas, got message: ${r.message}`);
    assert.match(r.plan || "", /Weekly/i);
    const w = r.quotas!.weekly;
    assert.ok(w, "weekly window present");
    assert.equal(w.used, 3, "3% used → used=3 of 100");
    assert.equal(w.total, 100);
    assert.equal(w.remaining, 97);
    assert.ok(w.resetAt?.includes("2026-07-28"), "resetAt from billing period end");
  });

  it("getXaiOauthUsage falls back to self-track when live quota is unavailable", async () => {
    globalThis.fetch = async () => new Response("Unauthorized", { status: 401 });

    const r = (await getXaiOauthUsage("conn-oauth", "dead-token")) as {
      plan?: string;
      message?: string;
      quotas?: {
        monthly?: { used: number; unlimited: boolean };
        weekly?: unknown;
      };
    };
    assert.ok(r.quotas?.monthly, `expected fallback quotas, got: ${JSON.stringify(r)}`);
    assert.match(r.plan || "", /OmniRoute-tracked/i);
    assert.match(r.message || "", /Live weekly quota unavailable/i);
    assert.equal(r.quotas!.monthly!.used, 1_500_000);
    assert.equal(r.quotas!.monthly!.unlimited, true, "fallback is uncapped self-track");
    assert.equal(r.quotas!.weekly, undefined, "fallback must not invent a weekly window");
  });

  it("getXaiOauthUsage fallback reads xao-stored usage rows", async () => {
    // no token → fetcher returns null → self-track probes xai-oauth then xao
    const r = (await getXaiOauthUsage("conn-alias")) as {
      quotas?: { monthly?: { used: number } };
    };
    assert.equal(r.quotas?.monthly?.used, 4_500_000);
  });

  it("getXaiOauthUsage does not bleed a different connection's usage", async () => {
    globalThis.fetch = async () => new Response("Unauthorized", { status: 401 });

    const r = (await getXaiOauthUsage("conn-other", "dead-token")) as {
      quotas?: { monthly?: { used: number } };
    };
    assert.equal(r.quotas?.monthly?.used, 7_000_000);
  });

  it("getXaiOauthUsage returns a message when connection id is missing", async () => {
    const r = (await getXaiOauthUsage("")) as { message?: string; quotas?: unknown };
    assert.ok(r.message && !r.quotas, "no quota without a connection id");
  });

  it("getUsageForProvider('xai-oauth', ...) delegates to getXaiOauthUsage", async () => {
    globalThis.fetch = async (url) => {
      const urlStr = typeof url === "string" ? url : String(url);
      if (urlStr.includes("billing")) return billingResponse(15.5);
      return new Response("not found", { status: 404 });
    };

    const r = (await getUsageForProvider({
      id: "conn-live",
      provider: "xai-oauth",
      accessToken: "dispatch-token",
    } as Parameters<typeof getUsageForProvider>[0])) as {
      quotas?: { weekly?: { used: number; total: number; remaining?: number } };
    };
    assert.equal(r.quotas?.weekly?.used, 16); // round(15.5)
    assert.equal(r.quotas?.weekly?.total, 100);
    assert.equal(r.quotas?.weekly?.remaining, 84);
  });

  it("getUsageForProvider('xao', ...) uses the same dispatch + fallback", async () => {
    globalThis.fetch = async () => new Response("boom", { status: 500 });

    const r = (await getUsageForProvider({
      id: "conn-alias",
      provider: "xao",
      accessToken: "bad",
    } as Parameters<typeof getUsageForProvider>[0])) as {
      quotas?: { monthly?: { used: number; unlimited: boolean } };
      message?: string;
    };
    assert.equal(r.quotas?.monthly?.used, 4_500_000);
    assert.equal(r.quotas?.monthly?.unlimited, true);
    assert.match(r.message || "", /Live weekly quota unavailable/i);
  });
});
