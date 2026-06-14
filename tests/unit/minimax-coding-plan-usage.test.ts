/**
 * tests/unit/minimax-coding-plan-usage.test.ts
 *
 * MiniMax Coding Plan keys (`sk-cp-…`) expose quota as a remaining-PERCENT on a
 * model named "general" with zero request counts — both `token_plan/remains`
 * and `coding_plan/remains` return identical Coding-Plan payloads. The fetcher
 * previously (a) filtered "general" out and (b) computed only count-based
 * quotas, so the Coding Plan showed no quota at all. These tests lock in the
 * percent fallback and that Token Plan (count-based) behavior is unchanged.
 *
 * Response shape captured live from a real Coding Plan key (2026-06-02).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { __testing } from "../../open-sse/services/usage.ts";

const {
  getMiniMaxUsage,
  isMiniMaxTextQuotaModel,
  getMiniMaxRemainingPercent,
  createMiniMaxQuotaFromPercent,
} = __testing;

type Quotas = Record<
  string,
  { used: number; total: number; remaining?: number; remainingPercentage?: number }
>;

function mockFetchOnce(payload: unknown) {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    })) as typeof fetch;
  return () => {
    globalThis.fetch = original;
  };
}

const CODING_PLAN_PAYLOAD = {
  base_resp: { status_code: 0, status_msg: "success" },
  model_remains: [
    {
      model_name: "general",
      current_interval_total_count: 0,
      current_interval_usage_count: 0,
      current_weekly_total_count: 0,
      current_weekly_usage_count: 0,
      current_interval_remaining_percent: 99,
      current_weekly_remaining_percent: 99,
      remains_time: 13815408,
      weekly_remains_time: 427670466,
      current_interval_status: 1,
      current_weekly_status: 1,
    },
    {
      model_name: "video",
      current_interval_total_count: 0,
      current_weekly_total_count: 0,
      current_interval_remaining_percent: 100,
      current_weekly_remaining_percent: 100,
      current_interval_status: 3,
      current_weekly_status: 3,
    },
  ],
};

test("getMiniMaxUsage: Coding Plan 'general' surfaces percent-based windows", async () => {
  const restore = mockFetchOnce(CODING_PLAN_PAYLOAD);
  try {
    const result = (await getMiniMaxUsage("sk-cp-test", "minimax")) as { quotas?: Quotas; message?: string };
    assert.ok(result.quotas, `expected quotas, got message: ${result.message}`);
    const session = result.quotas["session (5h)"];
    const weekly = result.quotas["weekly (7d)"];
    assert.ok(session, "session window must be present");
    assert.ok(weekly, "weekly window must be present");
    assert.equal(session.remainingPercentage, 99, "session = 99% remaining");
    assert.equal(weekly.remainingPercentage, 99, "weekly = 99% remaining");
    assert.equal(session.total, 100);
    assert.equal(session.remaining, 99);
  } finally {
    restore();
  }
});

test("getMiniMaxUsage: Token Plan stays count-based (regression guard)", async () => {
  const restore = mockFetchOnce({
    base_resp: { status_code: 0, status_msg: "success" },
    model_remains: [
      {
        model_name: "minimax-m1",
        current_interval_total_count: 1500,
        current_interval_usage_count: 300,
        current_weekly_total_count: 0,
        current_weekly_usage_count: 0,
        remains_time: 1000,
      },
    ],
  });
  try {
    const result = (await getMiniMaxUsage("sk-test", "minimax")) as { quotas?: Quotas; message?: string };
    assert.ok(result.quotas, `expected quotas, got message: ${result.message}`);
    const session = result.quotas["session (5h)"];
    assert.ok(session, "session window present");
    // token_plan/remains → countMeansRemaining=false → used = usage_count (300/1500 = 80% left)
    assert.equal(session.total, 1500);
    assert.equal(session.used, 300);
    assert.equal(session.remainingPercentage, 80);
  } finally {
    restore();
  }
});

test("isMiniMaxTextQuotaModel: accepts general + minimax-m, rejects media", () => {
  assert.equal(isMiniMaxTextQuotaModel("general"), true);
  assert.equal(isMiniMaxTextQuotaModel("General"), true);
  assert.equal(isMiniMaxTextQuotaModel("minimax-m1"), true);
  assert.equal(isMiniMaxTextQuotaModel("coding-plan-pro"), true);
  assert.equal(isMiniMaxTextQuotaModel("video"), false);
  assert.equal(isMiniMaxTextQuotaModel("image"), false);
  assert.equal(isMiniMaxTextQuotaModel("music"), false);
});

test("getMiniMaxRemainingPercent: reads + clamps + handles missing/string", () => {
  assert.equal(getMiniMaxRemainingPercent({ current_interval_remaining_percent: 99 }, "current_interval_remaining_percent", "x"), 99);
  assert.equal(getMiniMaxRemainingPercent({ x: "42" }, "x", "y"), 42);
  assert.equal(getMiniMaxRemainingPercent({ x: 150 }, "x", "y"), 100, "clamps above 100");
  assert.equal(getMiniMaxRemainingPercent({ x: -5 }, "x", "y"), 0, "clamps below 0");
  assert.equal(getMiniMaxRemainingPercent({}, "x", "y"), null, "missing → null");
  assert.equal(getMiniMaxRemainingPercent({ x: "" }, "x", "y"), null, "empty string → null");
});

test("createMiniMaxQuotaFromPercent: 0–100 percent window", () => {
  const q = createMiniMaxQuotaFromPercent(99, null);
  assert.equal(q.total, 100);
  assert.equal(q.used, 1);
  assert.equal(q.remaining, 99);
  assert.equal(q.remainingPercentage, 99);
  assert.equal(q.unlimited, false);
});
