/**
 * usage/agentrouter.ts — AgentRouter (New-API) balance quota shapes the Provider
 * Limits dashboard expects.
 *
 * Reuses the already-registered preflight/monitor fetcher (OpenAI-style routing
 * apiKey vs console System Access Token + New-Api-User id) instead of re-implementing
 * the HTTP call, so the 60s in-memory cache in agentrouterQuotaFetcher.ts is shared.
 *
 * AgentRouter exposes a raw New-API credit balance, not a real grant to divide by —
 * so, following the DeepSeek boolean-availability precedent, `remainingPercentage` is
 * only a two-state signal (100 = has balance, 0 = exhausted) used for the quota-card
 * bar color. The human-meaningful number — the actual USD balance (rawQuota /
 * QUOTA_PER_UNIT) — MUST travel inside `quotas.balance.remaining` so the Dashboard
 * Quota UI's credits-row renderer (quotaParsing.ts::parseAgentrouterQuota, which reads
 * `quota.remaining`/`quota.currency`) can format it with a currency symbol instead of
 * dropping it: `getUsageForProvider()`'s top-level `remainingUsd`/`availableUsd`/
 * `balance` sibling fields exist for API/CLI consumers only — parseQuotaData() (the
 * Dashboard renderer) never reads them, only `data.quotas` (#10078 follow-up).
 */
import { fetchAgentrouterQuota, type AgentrouterQuota } from "../agentrouterQuotaFetcher.ts";
import { type UsageQuota } from "./quota.ts";

type JsonRecord = Record<string, unknown>;

/**
 * AgentRouter balance → dashboard usage shape.
 *
 * Returns `{ message }` when the fetch returns null (no console credentials, an
 * upstream error, or a rejected token), which the Provider Limits UI renders as a
 * graceful per-row status instead of crashing the whole page. Otherwise shapes the
 * balance into a single USD `quotas.balance` entry whose `remaining` field carries
 * the exact dollar amount (never negative, exactly 0 when the wallet is exhausted).
 */
export async function getAgentrouterUsage(
  connectionId: string | undefined,
  connection: JsonRecord
) {
  const quota = (await fetchAgentrouterQuota(
    connectionId || "",
    connection
  )) as AgentrouterQuota | null;

  if (!quota) {
    return {
      message:
        "AgentRouter balance not available. Add the Console API Key + New-API User ID to the connection to view usage.",
    };
  }

  // `dollarBalance` is already `rawQuota / QUOTA_PER_UNIT` (agentrouterQuotaFetcher.ts);
  // clamp defensively so an exhausted/mis-parsed wallet never surfaces as negative.
  const remainingUsd = Math.max(0, quota.dollarBalance);
  const remainingPercentage = quota.limitReached ? 0 : 100;

  const balance: UsageQuota = {
    used: 0,
    total: 0,
    remaining: remainingUsd,
    remainingPercentage,
    resetAt: quota.resetAt ?? null,
    unlimited: true,
    currency: "USD",
    displayName: "Wallet Balance (USD)",
  };

  return {
    plan: "AgentRouter",
    quotas: { balance },
    remainingUsd,
    availableUsd: remainingUsd,
    balance: remainingUsd,
  };
}