import { test } from "node:test";
import assert from "node:assert/strict";
import { topQuotas } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils";
import {
  parseQuotaData,
  hasFixedQuotaOrder,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing";
import { resolveQuotaDisplayOrder } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded";

const quotaName = (quota: { name: string }) => quota.name;

test("#7764 sanity: codex has a fixed quota order (session, weekly)", () => {
  assert.equal(hasFixedQuotaOrder("codex"), true);
});

test("#7764: topQuotas() (collapsed card order) respects hasFixedQuotaOrder instead of re-sorting by remaining %", () => {
  const rawA = {
    quotas: {
      session: { used: 91, total: 100, remainingPercentage: 91, resetAt: null },
      weekly: { used: 97, total: 100, remainingPercentage: 3, resetAt: null },
    },
  };
  const rawB = {
    quotas: {
      session: { used: 99, total: 100, remainingPercentage: 1, resetAt: null },
      weekly: { used: 43, total: 100, remainingPercentage: 57, resetAt: null },
    },
  };
  const parsedA = parseQuotaData("codex", rawA);
  const parsedB = parseQuotaData("codex", rawB);
  assert.deepEqual(parsedA.map(quotaName), ["session", "weekly"]);
  assert.deepEqual(parsedB.map(quotaName), ["session", "weekly"]);
  const renderedA = topQuotas(parsedA, 3, "codex").map(quotaName);
  const renderedB = topQuotas(parsedB, 3, "codex").map(quotaName);
  assert.deepEqual(renderedA, ["session", "weekly"]);
  assert.deepEqual(renderedB, ["session", "weekly"]);
});

test("Kimi Coding collapsed quota order stays Code 5h then Code 7d across refreshes", () => {
  const parsedA = parseQuotaData("kimi-coding", {
    quotas: {
      code_7d: { used: 10, total: 100, remainingPercentage: 90 },
      code_5h: { used: 95, total: 100, remainingPercentage: 5 },
    },
  });
  const parsedB = parseQuotaData("kimi-coding", {
    quotas: {
      code_7d: { used: 99, total: 100, remainingPercentage: 1 },
      code_5h: { used: 20, total: 100, remainingPercentage: 80 },
    },
  });

  assert.deepEqual(topQuotas(parsedA, 3, "kimi-coding").map(quotaName), ["code_5h", "code_7d"]);
  assert.deepEqual(topQuotas(parsedB, 3, "kimi-coding").map(quotaName), ["code_5h", "code_7d"]);
});

test("#7764: providers WITHOUT a fixed order still sort worst-status-first (no regression)", () => {
  const quotas = [
    { name: "alpha", used: 10, total: 100, remainingPercentage: 90 },
    { name: "beta", used: 95, total: 100, remainingPercentage: 5 },
    { name: "gamma", used: 50, total: 100, remainingPercentage: 50 },
  ];
  const rendered = topQuotas(quotas, 3, "some-other-provider").map(quotaName);
  assert.deepEqual(rendered, ["beta", "gamma", "alpha"]);
});

// ---------------------------------------------------------------------------
// #7764 residual: the original fix only whitelisted codex / GLM family / Kimi
// Coding in `hasFixedQuotaOrder`. Every OTHER provider that reports the same
// session + weekly rolling windows still gets re-sorted by remaining %, so two
// accounts of the SAME provider render the two bars in opposite positions
// depending on which window happens to be more depleted — the exact symptom in
// the report ("the indicators are not located in the same position per card").
//
// Quota names below are the real upstream keys, not simplified ones:
//   claude        → open-sse/services/usage/claude.ts:107,112   "session (5h)" / "weekly (7d)"
//   minimax       → open-sse/services/usage/minimax.ts:312,325  "session (5h)" / "weekly (7d)"
//   zai           → routed to getGlmUsage (open-sse/services/usage.ts:191-194)
//                   so it emits "5 Hours Quota" / "Weekly Quota" (glm.ts:33-34)
//   command-code  → open-sse/services/usage/command-code.ts:193,196  "five_hour" / "weekly"
// ---------------------------------------------------------------------------

/** Two refreshes of the same account family: in A the weekly window is the
 *  depleted one, in B it is the session window. A remaining-% sort flips the
 *  row order between the two; a canonical window order does not. */
function windowPair(sessionKey: string, weeklyKey: string) {
  return {
    depletedWeekly: {
      quotas: {
        [sessionKey]: { used: 9, total: 100, remainingPercentage: 91, resetAt: null },
        [weeklyKey]: { used: 97, total: 100, remainingPercentage: 3, resetAt: null },
      },
    },
    depletedSession: {
      quotas: {
        [sessionKey]: { used: 99, total: 100, remainingPercentage: 1, resetAt: null },
        [weeklyKey]: { used: 43, total: 100, remainingPercentage: 57, resetAt: null },
      },
    },
  };
}

const WINDOW_PROVIDERS: Array<{ provider: string; session: string; weekly: string }> = [
  { provider: "claude", session: "session (5h)", weekly: "weekly (7d)" },
  { provider: "minimax", session: "session (5h)", weekly: "weekly (7d)" },
  { provider: "minimax-cn", session: "session (5h)", weekly: "weekly (7d)" },
  { provider: "zai", session: "5 Hours Quota", weekly: "Weekly Quota" },
  { provider: "command-code", session: "five_hour", weekly: "weekly" },
];

for (const { provider, session, weekly } of WINDOW_PROVIDERS) {
  test(`#7764 residual: ${provider} keeps session before weekly in the collapsed card across refreshes`, () => {
    const { depletedWeekly, depletedSession } = windowPair(session, weekly);
    const parsedA = parseQuotaData(provider, depletedWeekly);
    const parsedB = parseQuotaData(provider, depletedSession);

    // parseQuotaData already yields the canonical upstream order for both.
    assert.deepEqual(parsedA.map(quotaName), [session, weekly]);
    assert.deepEqual(parsedB.map(quotaName), [session, weekly]);

    assert.deepEqual(
      topQuotas(parsedA, 3, provider).map(quotaName),
      [session, weekly],
      `${provider}: collapsed card must not reorder rolling windows by remaining %`
    );
    assert.deepEqual(
      topQuotas(parsedB, 3, provider).map(quotaName),
      [session, weekly],
      `${provider}: window order must be identical on the sibling account`
    );
  });

  test(`#7764 residual: ${provider} expanded card window order matches the collapsed card`, () => {
    const { depletedWeekly, depletedSession } = windowPair(session, weekly);
    const parsedA = parseQuotaData(provider, depletedWeekly);
    const parsedB = parseQuotaData(provider, depletedSession);

    assert.deepEqual(resolveQuotaDisplayOrder(provider, parsedA).map(quotaName), [session, weekly]);
    assert.deepEqual(resolveQuotaDisplayOrder(provider, parsedB).map(quotaName), [session, weekly]);
  });
}

test("#7764 residual: a card whose quotas are NOT rolling windows still sorts worst-first", () => {
  // Antigravity-style per-model buckets: no canonical chronological order
  // exists, so the worst-status-first sort remains the useful one.
  const parsed = parseQuotaData("antigravity", {
    quotas: {
      "gemini-3-pro": { used: 10, total: 100, remainingPercentage: 90 },
      "gemini-3-flash": { used: 95, total: 100, remainingPercentage: 5 },
    },
  });
  assert.deepEqual(topQuotas(parsed, 3, "antigravity").map(quotaName), [
    "gemini-3-flash",
    "gemini-3-pro",
  ]);
});

test("#7764 residual: a single rolling window plus credits is left to the remaining-% sort", () => {
  // Only ONE window → no two windows to keep in a stable relative order, so
  // nothing is claimed and the pre-existing behaviour is preserved.
  const quotas = [
    { name: "credits", used: 0, total: 0, remainingPercentage: 90, isCredits: true },
    { name: "session (5h)", used: 95, total: 100, remainingPercentage: 5 },
  ];
  assert.deepEqual(topQuotas(quotas, 3, "some-credit-provider").map(quotaName), [
    "session (5h)",
    "credits",
  ]);
});

test("#7764 residual: Claude per-model weekly windows keep upstream order and credits sink last", () => {
  // Anthropic reports extra `weekly <model> (7d)` buckets plus an extra_usage
  // credits row. The window sort must be STABLE: same-rank siblings keep the
  // order parseQuotaData produced, and the credits row is not promoted.
  const parsed = parseQuotaData("claude", {
    quotas: {
      "session (5h)": { used: 9, total: 100, remainingPercentage: 91 },
      "weekly (7d)": { used: 97, total: 100, remainingPercentage: 3 },
      "weekly designer (7d)": { used: 50, total: 100, remainingPercentage: 50 },
    },
    extraUsage: { is_enabled: true, monthly_limit: 100, used_credits: 10, utilization: 10 },
  });

  assert.deepEqual(topQuotas(parsed, 4, "claude").map(quotaName), [
    "session (5h)",
    "weekly (7d)",
    "weekly designer (7d)",
    "extra_usage",
  ]);
});
