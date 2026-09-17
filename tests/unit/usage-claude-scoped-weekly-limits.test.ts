/**
 * tests/unit/usage-claude-scoped-weekly-limits.test.ts
 *
 * Anthropic's GET /api/oauth/usage now reports per-model weekly caps in a
 * `limits[]` array (`kind: "weekly_scoped"` with a model scope) while every
 * legacy `seven_day_<codename>` key is null. getClaudeUsage only read the
 * legacy keys, so a scoped cap that is the active limit on the account (Fable
 * at 69% while the shared weekly window sits at 39%) never reached the quota
 * map, the dashboard, or the Provider Limits cache. These tests pin the mapping
 * of `limits[]` into the display-only `modelQuotas["weekly <model> (7d)"]` and
 * keep the account-wide routing `quotas` map free of per-model ceilings.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { getClaudeUsage } = await import("../../open-sse/services/usage/claude.ts");

const OAUTH_USAGE_URL = "https://api.anthropic.com/api/oauth/usage";

type QuotaMap = Record<
  string,
  {
    used: number;
    total: number;
    remaining: number;
    remainingPercentage: number;
    resetAt: string | null;
  }
>;

function quotasOf(usage: unknown): QuotaMap {
  const quotas = (usage as { quotas?: QuotaMap }).quotas;
  return quotas ?? {};
}

function modelQuotasOf(usage: unknown): QuotaMap {
  const modelQuotas = (usage as { modelQuotas?: QuotaMap }).modelQuotas;
  return modelQuotas ?? {};
}

function oauthUsagePayload(overrides: Record<string, unknown> = {}) {
  return {
    five_hour: { utilization: 37.0, resets_at: "2026-09-17T10:30:00.674190+00:00" },
    seven_day: { utilization: 39.0, resets_at: "2026-09-21T19:59:59.674212+00:00" },
    seven_day_opus: null,
    seven_day_sonnet: null,
    limits: [
      {
        kind: "session",
        group: "session",
        percent: 37,
        resets_at: "2026-09-17T10:30:00.674190+00:00",
        scope: null,
      },
      {
        kind: "weekly_all",
        group: "weekly",
        percent: 39,
        resets_at: "2026-09-21T19:59:59.674212+00:00",
        scope: null,
      },
      {
        kind: "weekly_scoped",
        group: "weekly",
        percent: 69,
        severity: "normal",
        resets_at: "2026-09-21T19:59:59.674396+00:00",
        scope: { model: { id: null, display_name: "Fable" }, surface: null },
        is_active: true,
      },
    ],
    ...overrides,
  };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function withUsageResponse<T>(payload: unknown, run: () => Promise<T>): Promise<T> {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    if (url === OAUTH_USAGE_URL) return jsonResponse(payload);
    return jsonResponse({ error: "not stubbed" }, 500);
  }) as typeof fetch;
  try {
    return await run();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("getClaudeUsage maps a weekly_scoped model limit into modelQuotas['weekly <model> (7d)']", async () => {
  const usage = await withUsageResponse(oauthUsagePayload(), () => getClaudeUsage("tok-scoped"));

  assert.deepEqual(Object.keys(quotasOf(usage)).sort(), ["session (5h)", "weekly (7d)"]);
  assert.deepEqual(Object.keys(modelQuotasOf(usage)), ["weekly fable (7d)"]);
  assert.equal(modelQuotasOf(usage)["weekly fable (7d)"].used, 69);
  assert.equal(modelQuotasOf(usage)["weekly fable (7d)"].remaining, 31);
  assert.equal(modelQuotasOf(usage)["weekly fable (7d)"].remainingPercentage, 31);
  assert.equal(modelQuotasOf(usage)["weekly fable (7d)"].total, 100);
  assert.equal(
    modelQuotasOf(usage)["weekly fable (7d)"].resetAt,
    new Date("2026-09-21T19:59:59.674396+00:00").toISOString()
  );
  assert.equal(quotasOf(usage)["weekly (7d)"].used, 39);
});

test("getClaudeUsage keeps every scoped model out of the routing quotas map", async () => {
  const [session, weekly, fable] = oauthUsagePayload().limits;
  const payload = oauthUsagePayload({
    limits: [
      session,
      weekly,
      fable,
      { ...fable, percent: 100, scope: { model: { id: "claude-opus-5-5" }, surface: null } },
    ],
  });

  const usage = await withUsageResponse(payload, () => getClaudeUsage("tok-many"));

  assert.deepEqual(Object.keys(quotasOf(usage)).sort(), ["session (5h)", "weekly (7d)"]);
  assert.deepEqual(Object.keys(modelQuotasOf(usage)).sort(), [
    "weekly claude-opus-5-5 (7d)",
    "weekly fable (7d)",
  ]);
  assert.equal(modelQuotasOf(usage)["weekly claude-opus-5-5 (7d)"].used, 100);
});

test("getClaudeUsage ignores session and weekly_all rows in limits[] (already covered by five_hour/seven_day)", async () => {
  const payload = oauthUsagePayload({ limits: oauthUsagePayload().limits.slice(0, 2) });

  const usage = await withUsageResponse(payload, () => getClaudeUsage("tok-no-scoped"));

  assert.deepEqual(Object.keys(quotasOf(usage)).sort(), ["session (5h)", "weekly (7d)"]);
  assert.deepEqual(modelQuotasOf(usage), {});
});

test("getClaudeUsage keeps the legacy seven_day_<codename> value when both shapes name the same model", async () => {
  const payload = oauthUsagePayload({
    seven_day_fable: { utilization: 70, resets_at: "2026-09-21T19:59:59.674396+00:00" },
  });

  const usage = await withUsageResponse(payload, () => getClaudeUsage("tok-both"));

  assert.equal(quotasOf(usage)["weekly fable (7d)"].used, 70);
  assert.deepEqual(modelQuotasOf(usage), {});
});

test("getClaudeUsage skips weekly_scoped rows without a usable name or percent", async () => {
  const payload = oauthUsagePayload({
    limits: [
      { kind: "weekly_scoped", percent: 12, scope: { model: null, surface: null } },
      { kind: "weekly_scoped", percent: "n/a", scope: { model: { display_name: "Opus" } } },
      { kind: "weekly_scoped", percent: 5, scope: { model: null, surface: "cowork" } },
      "garbage",
      null,
    ],
  });

  const usage = await withUsageResponse(payload, () => getClaudeUsage("tok-malformed"));

  assert.deepEqual(Object.keys(quotasOf(usage)).sort(), ["session (5h)", "weekly (7d)"]);
  assert.deepEqual(Object.keys(modelQuotasOf(usage)), ["weekly cowork (7d)"]);
  assert.equal(modelQuotasOf(usage)["weekly cowork (7d)"].used, 5);
});

test("getClaudeUsage tolerates a payload without limits[]", async () => {
  const payload = oauthUsagePayload({ limits: undefined });

  const usage = await withUsageResponse(payload, () => getClaudeUsage("tok-legacy"));

  assert.deepEqual(Object.keys(quotasOf(usage)).sort(), ["session (5h)", "weekly (7d)"]);
  assert.deepEqual(modelQuotasOf(usage), {});
});
