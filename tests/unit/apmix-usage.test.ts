// Apmix (apmix.ai) usage fetcher locks — pins the export surface, the no-key /
// 401 fail-open messages, and the quota mapping of GET /v1/usage (live-verified
// 2026-09-25): monthly weighted-token allowance + self-set daily/weekly caps +
// top-up credits.
import { test } from "node:test";
import assert from "node:assert/strict";

const A = await import("../../open-sse/services/usage/apmix.ts");

test("module exposes getApmixUsage", () => {
  assert.equal(typeof A.getApmixUsage, "function");
});

test("getApmixUsage returns a friendly message when the api key is missing", async () => {
  const r = (await A.getApmixUsage("")) as { message?: string };
  assert.match(r.message ?? "", /Apmix API key not available/);
});

test("getApmixUsage surfaces invalid-key message on 401", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 401 });
  try {
    const r = (await A.getApmixUsage("k")) as { message?: string };
    assert.match(r.message ?? "", /Invalid Apmix API key/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getApmixUsage maps the live /v1/usage payload (monthly + caps + topup)", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        object: "usage",
        plan: "free",
        allowance: 4_000_000,
        used: 1_000_000,
        remaining: 3_000_000,
        topup_remaining: 500_000,
        resets_at: "2026-10-01T00:00:00Z",
        limits: { daily: 200_000, daily_used: 50_000, weekly: 1_000_000, weekly_used: 400_000 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  try {
    const r = (await A.getApmixUsage("k")) as {
      plan?: string | null;
      quotas?: Record<
        string,
        {
          used: number;
          total: number;
          remaining: number;
          remainingPercentage?: number;
          resetAt: string | null;
        }
      >;
    };
    assert.equal(r.plan, "free");
    const monthly = r.quotas?.monthly;
    assert.ok(monthly, "monthly quota must exist");
    assert.equal(monthly.used, 1_000_000);
    assert.equal(monthly.total, 4_000_000);
    assert.equal(monthly.remaining, 3_000_000);
    assert.equal(monthly.remainingPercentage, 75);
    assert.equal(monthly.resetAt, "2026-10-01T00:00:00.000Z");

    const daily = r.quotas?.daily;
    assert.ok(daily, "self-set daily cap must surface as a window");
    assert.equal(daily.total, 200_000);
    assert.equal(daily.used, 50_000);
    assert.ok(daily.resetAt, "daily cap reset must be synthesized");

    const weekly = r.quotas?.weekly;
    assert.ok(weekly, "self-set weekly cap must surface as a window");
    assert.equal(weekly.total, 1_000_000);
    assert.equal(weekly.used, 400_000);
    assert.ok(weekly.resetAt, "weekly cap reset must be synthesized");

    const topup = r.quotas?.topup;
    assert.ok(topup, "top-up balance must surface");
    assert.equal(topup.total, 500_000);
    assert.equal(topup.remaining, 500_000);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("getApmixUsage omits absent caps and reports the bare monthly allowance", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        object: "usage",
        plan: "free",
        allowance: 4_000_000,
        used: 0,
        remaining: 4_000_000,
        topup_remaining: 0,
        resets_at: null,
        limits: { daily: null, daily_used: 0, weekly: null, weekly_used: 0 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  try {
    const r = (await A.getApmixUsage("k")) as {
      quotas?: Record<string, { total: number; resetAt: string | null }>;
    };
    assert.deepEqual(Object.keys(r.quotas ?? {}), ["monthly"]);
    assert.equal(r.quotas!.monthly.total, 4_000_000);
    assert.equal(r.quotas!.monthly.resetAt, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
