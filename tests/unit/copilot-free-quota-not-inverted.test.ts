/**
 * Regression for #2876 — GitHub Copilot Provider Quota rendered the other way around.
 *
 * Root cause: in the Free / limited plan path of `getGitHubUsage`, the closure
 * `addLimitedQuota` treats `data.limited_user_quotas[name]` as the *used* count.
 * Three independent upstream sources confirm it is the *remaining* count:
 *
 *   1. robinebers/openusage — docs/providers/copilot.md  (Free Tier example +
 *      "Displayed Lines" table — every row labelled "remaining")
 *   2. raycast/extensions — agent-usage/src/copilot/fetcher.ts:77
 *      ("`limited_user_quotas` behaves like the remaining amount for the month")
 *   3. looplj/axonhub — frontend/src/components/quota-badges.tsx:77-81
 *      (destructures the value as `remaining` and computes `remaining / total`)
 *
 * These assertions therefore encode the upstream-correct semantics and FAIL on
 * the unfixed code (the brand-new case shows 0% instead of 100%, exactly the
 * symptom the reporter @androw saw).
 */
import test from "node:test";
import assert from "node:assert/strict";

const usageService = await import("../../open-sse/services/usage.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function stubFetch(payload: unknown) {
  globalThis.fetch = async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
}

test("#2876 — Copilot Free brand-new account shows 100% remaining (not 0%)", async () => {
  // Reproduces the reporter's scenario: the account has never been used, so
  // every entry of limited_user_quotas equals its monthly_quotas counterpart
  // (full remaining = total). Before the fix this returns 0%.
  stubFetch({
    copilot_plan: "free",
    limited_user_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60_000).toISOString(),
    monthly_quotas: {
      chat: 50,
      completions: 2000,
    },
    limited_user_quotas: {
      chat: 50,
      completions: 2000,
    },
  });

  const result: any = await usageService.getUsageForProvider({
    provider: "github",
    accessToken: "gho-brand-new",
  });

  assert.equal(result.quotas.chat.total, 50);
  assert.equal(result.quotas.chat.remaining, 50);
  assert.equal(result.quotas.chat.used, 0);
  assert.equal(
    result.quotas.chat.remainingPercentage,
    100,
    "brand-new free account must show 100% remaining, not 0%"
  );

  assert.equal(result.quotas.completions.total, 2000);
  assert.equal(result.quotas.completions.remaining, 2000);
  assert.equal(result.quotas.completions.used, 0);
  assert.equal(result.quotas.completions.remainingPercentage, 100);
});

test("#2876 — Copilot Free realistic mid-month account computes correct remaining percentage", async () => {
  // Numbers taken directly from robinebers/openusage docs/providers/copilot.md
  // Free Tier example: chat 410/500 remaining, completions 4000/4000.
  stubFetch({
    copilot_plan: "free",
    limited_user_reset_date: new Date(Date.now() + 7 * 24 * 60 * 60_000).toISOString(),
    monthly_quotas: {
      chat: 500,
      completions: 4000,
    },
    limited_user_quotas: {
      chat: 410,
      completions: 4000,
    },
  });

  const result: any = await usageService.getUsageForProvider({
    provider: "github",
    accessToken: "gho-mid-month",
  });

  assert.equal(result.quotas.chat.total, 500);
  assert.equal(result.quotas.chat.remaining, 410);
  assert.equal(result.quotas.chat.used, 90);
  assert.equal(
    result.quotas.chat.remainingPercentage,
    82,
    "410 of 500 remaining must surface as 82%, not 18%"
  );

  assert.equal(result.quotas.completions.remainingPercentage, 100);
});

test("#2876 — Copilot Free fully-exhausted quota shows 0% remaining (not 100%)", async () => {
  // The other end of the inversion: the user has burned through everything.
  // limited_user_quotas counts down to 0; the dashboard must report 0%.
  stubFetch({
    copilot_plan: "free",
    limited_user_reset_date: new Date(Date.now() + 60_000).toISOString(),
    monthly_quotas: {
      chat: 50,
      completions: 2000,
    },
    limited_user_quotas: {
      chat: 0,
      completions: 0,
    },
  });

  const result: any = await usageService.getUsageForProvider({
    provider: "github",
    accessToken: "gho-exhausted",
  });

  assert.equal(result.quotas.chat.total, 50);
  assert.equal(result.quotas.chat.remaining, 0);
  assert.equal(result.quotas.chat.used, 50);
  assert.equal(
    result.quotas.chat.remainingPercentage,
    0,
    "fully-exhausted quota must show 0% remaining, not 100%"
  );

  assert.equal(result.quotas.completions.remainingPercentage, 0);
  assert.equal(result.quotas.completions.used, 2000);
});

test("#2876 — Copilot paid plan (quota_snapshots) is unaffected by the fix", async () => {
  // The paid path reads `remaining` / `percent_remaining` / `entitlement`
  // directly — those field names are correctly named upstream and require
  // no semantic translation. Asserting the paid path still works guards
  // against accidental scope creep.
  stubFetch({
    copilot_plan: "pro",
    quota_reset_date: new Date(Date.now() + 30 * 24 * 60 * 60_000).toISOString(),
    quota_snapshots: {
      premium_interactions: {
        entitlement: 300,
        remaining: 240,
        percent_remaining: 80,
        unlimited: false,
      },
      chat: {
        entitlement: 1000,
        remaining: 950,
        percent_remaining: 95,
        unlimited: false,
      },
    },
  });

  const result: any = await usageService.getUsageForProvider({
    provider: "github",
    accessToken: "gho-pro",
  });

  assert.equal(result.quotas.premium_interactions.total, 300);
  assert.equal(result.quotas.premium_interactions.remaining, 240);
  assert.equal(result.quotas.premium_interactions.used, 60);
  assert.equal(result.quotas.premium_interactions.remainingPercentage, 80);

  assert.equal(result.quotas.chat.remaining, 950);
  assert.equal(result.quotas.chat.remainingPercentage, 95);
});
