/**
 * xiaomi-mimo-live-quota-15753.test.ts — TDD regression for #15753.
 *
 * The xiaomi-mimo quota fetcher used to self-track routed tokens against a
 * hardcoded 4.1B (the Lite tier's Credits) forever, so a plan upgrade kept the
 * connection `Exhausted` until the calendar-month reset. Fix (two layers):
 *
 *  1. Live console fetch — with a MiMo console session cookie on the connection
 *     (`xiaomiMimoConsoleCookie`) the fetcher reads `tokenPlan/usage` +
 *     `tokenPlan/detail` and reports the real window: used/limit Credits and
 *     `resetAt` from `currentPeriodEnd` (NOT the 1st of the month).
 *  2. Configurable self-tracked fallback — without a working console session
 *     the monthly budget comes from `providerSpecificData.monthlyTokenLimit`,
 *     then `XIAOMI_MIMO_MONTHLY_TOKEN_LIMIT`, then the historical 4.1B default,
 *     and the response carries a hint message instead of failing hard.
 */
import { describe, it, before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// DATA_DIR must be set before any module that opens the DB is imported.
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "omni-xiaomi-live-"));
process.env.DATA_DIR = TMP;
// Disable the shared quota-fetch throttle — tests must not wait on the gate.
process.env.OMNIROUTE_QUOTA_FETCH_MIN_INTERVAL_MS = "0";

const core = await import("../../src/lib/db/core.ts");
const { resetQuotaFetchThrottle } = await import("../../open-sse/services/quotaFetchThrottle.ts");
const { getUsageForProvider } = await import("../../open-sse/services/usage.ts");
const X = await import("../../open-sse/services/usage/xiaomi-mimo.ts");

const XIAOMI_LIMIT = 4_100_000_000;

// Real console payloads captured from the MiMo console (issue #15753).
const USAGE_PAYLOAD = {
  code: 0,
  data: {
    monthUsage: {
      percent: 0.3935,
      items: [
        { name: "month_total_token", used: 14954038035, limit: 38000000000, percent: 0.3935 },
      ],
    },
    usage: {
      items: [
        { name: "plan_total_token", used: 14954038035, limit: 38000000000, percent: 0.39 },
        { name: "compensation_total_token", used: 0, limit: 0, percent: 0 },
      ],
    },
  },
};

const DETAIL_PAYLOAD = {
  code: 0,
  data: {
    planCode: "pro",
    planName: "Pro",
    currentPeriodEnd: "2026-11-05 23:59:59",
    expired: false,
    enableAutoRenew: true,
  },
};

interface UsageResult {
  plan?: string;
  quotas?: Record<
    string,
    {
      used: number;
      total: number;
      remaining?: number;
      remainingPercentage?: number;
      resetAt: string | null;
      unlimited?: boolean;
    }
  >;
  message?: string;
}

function insertUsage(connectionId: string, provider: string, tokens: number, timestamp: string) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO usage_history (provider, connection_id, tokens_input, tokens_output, timestamp)
     VALUES (?, ?, ?, ?, ?)`
  ).run(provider, connectionId, tokens, 0, timestamp);
}

const originalFetch = globalThis.fetch;

describe("xiaomi-mimo live Token Plan quota (#15753)", () => {
  before(() => {
    core.getDbInstance(); // trigger migrations
    resetQuotaFetchThrottle();
    const now = new Date().toISOString();
    insertUsage("conn-live", "xiaomi-mimo", 1_000_000, now);
    insertUsage("conn-live", "xiaomi-mimo", 600_000, now);
    insertUsage("conn-fallback", "xiaomi-mimo", 1_600_000, now);
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

  afterEach(() => {
    globalThis.fetch = originalFetch;
    delete process.env.XIAOMI_MIMO_MONTHLY_TOKEN_LIMIT;
    delete process.env.XIAOMI_MIMO_CONSOLE_COOKIE;
  });

  it("console cookie → real plan quota from tokenPlan/usage + tokenPlan/detail", async () => {
    let sentCookie = "";
    globalThis.fetch = (async (url: unknown, init?: { headers?: Record<string, string> }) => {
      const u = String(url);
      if (u.endsWith("/api/v1/tokenPlan/usage")) {
        sentCookie = init?.headers?.Cookie ?? "";
        return Response.json(USAGE_PAYLOAD);
      }
      if (u.endsWith("/api/v1/tokenPlan/detail")) return Response.json(DETAIL_PAYLOAD);
      return new Response("not found", { status: 404 });
    }) as typeof fetch;

    const r = (await X.getXiaomiMimoUsage("conn-live", "xiaomi-mimo", {
      xiaomiMimoConsoleCookie: "  api-platform_serviceToken=tok; userId=42  ",
    })) as UsageResult;

    assert.ok(r.quotas, `expected quotas, got message: ${r.message}`);
    assert.equal(r.plan, "Xiaomi MiMo Token Plan · Pro");
    assert.equal(sentCookie, "api-platform_serviceToken=tok; userId=42", "cookie is forwarded");
    const m = r.quotas.monthly;
    assert.equal(m.used, 14954038035);
    assert.equal(m.total, 38000000000);
    assert.equal(m.remaining, 23045961965);
    assert.ok(
      Math.abs((m.remainingPercentage ?? 0) - 60.6) < 0.2,
      `remainingPercentage ~60.6, got ${m.remainingPercentage}`
    );
    assert.equal(m.resetAt, "2026-11-05T23:59:59.000Z", "resetAt comes from currentPeriodEnd");
    assert.equal(m.unlimited, false);
  });

  it("getUsageForProvider dispatches the console cookie through to the live fetch", async () => {
    globalThis.fetch = (async (url: unknown) => {
      const u = String(url);
      if (u.endsWith("/api/v1/tokenPlan/usage")) return Response.json(USAGE_PAYLOAD);
      if (u.endsWith("/api/v1/tokenPlan/detail")) return Response.json(DETAIL_PAYLOAD);
      return new Response("not found", { status: 404 });
    }) as typeof fetch;

    const r = (await getUsageForProvider({
      id: "conn-live",
      provider: "xiaomi-mimo",
      providerSpecificData: { xiaomiMimoConsoleCookie: "api-platform_serviceToken=tok" },
    })) as UsageResult;

    assert.ok(r.quotas, `expected quotas, got message: ${r.message}`);
    assert.equal(r.quotas.monthly.total, 38000000000);
  });

  it("expired console session (401 + loginUrl) → hint message + self-tracked fallback", async () => {
    globalThis.fetch = (async () =>
      Response.json(
        { code: 401, loginUrl: "https://account.xiaomi.com/pass/serviceLogin" },
        { status: 401 }
      )) as typeof fetch;

    const r = (await X.getXiaomiMimoUsage("conn-fallback", "xiaomi-mimo", {
      xiaomiMimoConsoleCookie: "api-platform_serviceToken=expired",
    })) as UsageResult;

    assert.match(r.message ?? "", /console cookie/i, "hint must point at the cookie field");
    assert.ok(r.quotas, "self-tracked numbers stay usable");
    assert.equal(r.plan, "Xiaomi MiMo Token Plan (OmniRoute-tracked)");
    assert.equal(r.quotas.monthly.total, XIAOMI_LIMIT);
    assert.equal(r.quotas.monthly.used, 1_600_000);
  });

  it("missing cookie → hint message + self-tracked fallback on the 4.1B default", async () => {
    const r = (await X.getXiaomiMimoUsage("conn-fallback", "xiaomi-mimo")) as UsageResult;

    assert.match(r.message ?? "", /console cookie/i, "hint must point at the cookie field");
    assert.ok(r.quotas, "self-tracked numbers stay usable");
    assert.equal(r.quotas.monthly.total, XIAOMI_LIMIT, "default limit = 4.1B Lite Credits");
  });

  it("providerSpecificData.monthlyTokenLimit overrides the fallback budget", async () => {
    const r = (await X.getXiaomiMimoUsage("conn-fallback", "xiaomi-mimo", {
      monthlyTokenLimit: 8_000_000_000,
    })) as UsageResult;

    assert.ok(r.quotas, `expected quotas, got message: ${r.message}`);
    assert.equal(r.quotas.monthly.total, 8_000_000_000);
  });

  it("XIAOMI_MIMO_MONTHLY_TOKEN_LIMIT overrides the default (and loses to the connection field)", async () => {
    process.env.XIAOMI_MIMO_MONTHLY_TOKEN_LIMIT = "11000000000";
    const envResult = (await X.getXiaomiMimoUsage("conn-fallback", "xiaomi-mimo")) as UsageResult;
    assert.ok(envResult.quotas, `expected quotas, got message: ${envResult.message}`);
    assert.equal(envResult.quotas.monthly.total, 11_000_000_000, "Standard tier = 11B Credits");

    const psdResult = (await X.getXiaomiMimoUsage("conn-fallback", "xiaomi-mimo", {
      monthlyTokenLimit: 38_000_000_000,
    })) as UsageResult;
    assert.ok(psdResult.quotas);
    assert.equal(
      psdResult.quotas.monthly.total,
      38_000_000_000,
      "the connection field wins over the env var"
    );
  });

  it("XIAOMI_MIMO_CONSOLE_COOKIE is accepted as a global fallback", async () => {
    process.env.XIAOMI_MIMO_CONSOLE_COOKIE = "api-platform_serviceToken=env-tok; userId=7";
    globalThis.fetch = (async (url: unknown) => {
      const u = String(url);
      if (u.endsWith("/api/v1/tokenPlan/usage")) return Response.json(USAGE_PAYLOAD);
      if (u.endsWith("/api/v1/tokenPlan/detail")) return Response.json(DETAIL_PAYLOAD);
      return new Response("not found", { status: 404 });
    }) as typeof fetch;

    const r = (await X.getXiaomiMimoUsage("conn-live", "xiaomi-mimo")) as UsageResult;
    assert.ok(r.quotas, `expected quotas, got message: ${r.message}`);
    assert.equal(r.quotas.monthly.total, 38000000000, "live quota, not the fallback budget");
  });
});
