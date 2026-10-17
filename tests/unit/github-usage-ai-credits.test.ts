// GitHub Copilot AI Credits tracking.
//
// Token-billed Copilot plans report the consumed AI Credits in
// `copilot_internal/user → quota_snapshots.premium_interactions.credits_used`.
// The usage parser used to drop that figure, so the dashboard could not show it
// and nothing downstream could compare it against a local per-connection limit.
import test from "node:test";
import assert from "node:assert/strict";

const usageService = await import("../../open-sse/services/usage.ts");
const providerLimitUtils =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");

type JsonRecord = Record<string, unknown>;

async function withCopilotPayload<T>(payload: JsonRecord, run: () => Promise<T>): Promise<T> {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  try {
    return await run();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

function getUsage(providerSpecificData: JsonRecord = {}) {
  return usageService.getUsageForProvider({
    provider: "github",
    accessToken: "gho_test",
    providerSpecificData,
  }) as Promise<JsonRecord & { quotas: Record<string, JsonRecord> }>;
}

const futureReset = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

function tokenBilledPayload(creditsUsed: unknown): JsonRecord {
  return {
    copilot_plan: "business",
    token_based_billing: true,
    quota_reset_date: futureReset(),
    quota_snapshots: {
      chat: { unlimited: true },
      completions: { unlimited: true },
      premium_interactions: { unlimited: true, credits_used: creditsUsed },
    },
  };
}

test("token-billed plan exposes credits_used as an ai_credits quota", async () => {
  const usage = await withCopilotPayload(tokenBilledPayload(42.5), () => getUsage());

  assert.equal(usage.tokenBasedBilling, true);
  const aiCredits = usage.quotas.ai_credits;
  assert.ok(aiCredits, "ai_credits quota must be present when credits_used is reported");
  assert.equal(aiCredits.used, 42.5);
  assert.equal(aiCredits.creditsUsed, 42.5);
  // No local limit configured → informational, unbounded row.
  assert.equal(aiCredits.unlimited, true);
  assert.equal(aiCredits.total, 0);
  // Telemetry, not an upstream-reported quota fraction: it must never exhaust the account.
  assert.equal(aiCredits.fractionReported, false);
  // Unlimited chat/completions are still hidden.
  assert.equal(usage.quotas.chat, undefined);
  assert.equal(usage.quotas.completions, undefined);
});

test("credits_used reported as a numeric string is parsed", async () => {
  const usage = await withCopilotPayload(tokenBilledPayload("12.25"), () => getUsage());
  assert.equal(usage.quotas.ai_credits.creditsUsed, 12.25);
});

test("garbage or negative credits_used is ignored (no ai_credits quota)", async () => {
  for (const bad of ["abc", -3, "", null]) {
    const usage = await withCopilotPayload(tokenBilledPayload(bad), () => getUsage());
    assert.equal(usage.quotas.ai_credits, undefined, `credits_used=${JSON.stringify(bad)}`);
  }
});

test("a local githubCreditLimit turns ai_credits into a bounded row", async () => {
  const over = await withCopilotPayload(tokenBilledPayload(42.5), () =>
    getUsage({ githubCreditLimit: 40 })
  );
  assert.equal(over.quotas.ai_credits.total, 40);
  assert.equal(over.quotas.ai_credits.unlimited, false);
  assert.equal(over.quotas.ai_credits.remainingPercentage, 0);
  assert.equal(over.quotas.ai_credits.remaining, 0);
  assert.match(String(over.quotas.ai_credits.displayName), /local limit/i);

  const under = await withCopilotPayload(tokenBilledPayload(25), () =>
    getUsage({ githubCreditLimit: 100 })
  );
  assert.equal(under.quotas.ai_credits.remainingPercentage, 75);
  assert.equal(under.quotas.ai_credits.remaining, 75);
});

test("legacy paid payload without credits_used keeps its previous quota set", async () => {
  const usage = await withCopilotPayload(
    {
      copilot_plan: "individual",
      quota_reset_date: futureReset(),
      quota_snapshots: {
        premium_interactions: { entitlement: 300, remaining: 120, unlimited: false },
      },
    },
    () => getUsage({ githubCreditLimit: 10 })
  );
  assert.deepEqual(Object.keys(usage.quotas), ["premium_interactions"]);
  assert.equal(usage.tokenBasedBilling, false);
});

test("an unallocated premium quota (zero allowance, no usage) is hidden, an exhausted one is not", async () => {
  const unallocated = await withCopilotPayload(
    {
      copilot_plan: "business",
      quota_reset_date: futureReset(),
      quota_snapshots: {
        premium_interactions: {
          entitlement: 0,
          remaining: 0,
          percent_remaining: 0,
          unlimited: false,
        },
      },
    },
    () => getUsage()
  );
  assert.equal(unallocated.quotas.premium_interactions, undefined);

  const exhausted = await withCopilotPayload(
    {
      copilot_plan: "business",
      quota_reset_date: futureReset(),
      quota_snapshots: {
        premium_interactions: { entitlement: 300, remaining: 0, unlimited: false },
      },
    },
    () => getUsage()
  );
  assert.equal(exhausted.quotas.premium_interactions.remainingPercentage, 0);
});

test("dashboard parser keeps the ai_credits row and carries creditsUsed", async () => {
  const usage = await withCopilotPayload(tokenBilledPayload(42.5), () => getUsage());
  const parsed = providerLimitUtils.parseQuotaData("github", usage) as JsonRecord[];
  const row = parsed.find((quota) => quota.name === "ai_credits");
  assert.ok(row, "unlimited ai_credits row must survive the unlimited-empty filter");
  assert.equal(row.creditsUsed, 42.5);
  assert.equal(row.unlimited, true);
});
