/**
 * HyperAgent billing usage → UsageQuota for Limits page.
 *
 * Live capture (hyperagent/get_balance.txt):
 *   GET https://hyperagent.com/api/settings/billing/usage
 *   credentials: include (session Cookie)
 *
 *   creditData.creditBlocks[]:
 *     initialUsd   → total ($500)
 *     remainingUsd → remaining ($499.56)
 *     usedUsd      → used
 *     expiryDate   → optional resetAt
 *
 *   plan.name → "Pay As You Go" etc.
 */
import { type UsageQuota } from "./quota.ts";
import { toNumber } from "@/shared/utils/numeric";

const USAGE_URL =
  process.env.HYPERAGENT_USAGE_URL || "https://hyperagent.com/api/settings/billing/usage";

function readStr(v: unknown): string {
  if (typeof v !== "string") return "";
  const t = v.trim();
  return t.length ? t : "";
}

function readPs(data: unknown, keys: string[]): string {
  if (!data || typeof data !== "object" || Array.isArray(data)) return "";
  const rec = data as Record<string, unknown>;
  for (const k of keys) {
    const v = readStr(rec[k]);
    if (v) return v;
  }
  return "";
}

/** Round money to 2 decimals for UI. */
export function roundUsd(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n * 100) / 100;
}

export function buildHyperAgentCreditsQuota(block: {
  initialUsd?: number | null;
  remainingUsd?: number | null;
  usedUsd?: number | null;
  expiryDate?: string | null;
}): UsageQuota {
  const total = roundUsd(toNumber(block.initialUsd));
  const remaining = roundUsd(toNumber(block.remainingUsd));
  let used = roundUsd(toNumber(block.usedUsd));
  if (used <= 0 && total > 0) used = roundUsd(Math.max(0, total - remaining));
  const rem = remaining > 0 || total <= 0 ? remaining : Math.max(0, total - used);
  const remainingPercentage = total > 0 ? Math.round((rem / total) * 1000) / 10 : rem > 0 ? 100 : 0;
  const expiry = readStr(block.expiryDate) || null;
  return {
    used,
    total: total > 0 ? total : used + rem,
    remaining: rem,
    remainingPercentage,
    resetAt: expiry,
    unlimited: false,
    currency: "USD",
    displayName: "Credits (USD)",
  };
}

function normalizeCookie(raw: string): string {
  const t = (raw || "").trim();
  if (!t) return "";
  // Accept bare session value — pass through; full Cookie header preferred.
  return t;
}

export function resolveHyperAgentCookie(
  apiKey?: string,
  providerSpecificData?: Record<string, unknown> | null
): string {
  const direct = normalizeCookie(apiKey || "");
  if (direct) return direct;
  return normalizeCookie(
    readPs(providerSpecificData, ["cookie", "sessionCookie", "authCookie", "Cookie"])
  );
}

export async function getHyperAgentUsage(
  apiKey?: string,
  providerSpecificData?: Record<string, unknown> | null
) {
  const cookie = resolveHyperAgentCookie(apiKey, providerSpecificData);
  if (!cookie) {
    return {
      message:
        "HyperAgent session cookie not available. Paste the full Cookie header from hyperagent.com (DevTools → Network → any request → Cookie).",
    };
  }

  try {
    const res = await fetch(USAGE_URL, {
      method: "GET",
      headers: {
        accept: "application/json",
        cookie,
        origin: "https://hyperagent.com",
        referer: "https://hyperagent.com/settings/billing",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
      },
    });
    if (!res.ok) {
      const bodyText = await res.text().catch(() => "");
      return {
        message: `HyperAgent usage HTTP ${res.status}${bodyText ? `: ${bodyText.slice(0, 200)}` : ""}`,
        plan: "HyperAgent",
      };
    }
    const json = (await res.json()) as {
      plan?: { id?: string; name?: string; monthlyPriceUsd?: number; includedUsageUsd?: number };
      orbCostsAndUsage?: { totalCost?: string | number; subtotalCost?: string | number };
      creditData?: {
        subscriptionCredits?: unknown;
        creditBlocks?: Array<{
          id?: string;
          initialUsd?: number;
          remainingUsd?: number;
          usedUsd?: number;
          expiryDate?: string | null;
          status?: string;
        }>;
      };
      openInvoiceTotalUsd?: number;
      bonusCreditsUsedThisPeriodUsd?: number;
    };

    const blocks = json.creditData?.creditBlocks || [];
    const active = blocks.find((b) => (b.status || "").toLowerCase() === "active") || blocks[0];
    if (!active) {
      return {
        message: "No active HyperAgent credit block (creditData.creditBlocks empty).",
        plan: json.plan?.name || "HyperAgent",
      };
    }

    const credits = buildHyperAgentCreditsQuota(active);
    const planName = readStr(json.plan?.name) || "HyperAgent";
    return {
      plan: planName,
      quotas: {
        credits,
      },
      remainingUsd: credits.remaining,
      drawnUsd: credits.used,
      availableUsd: credits.total,
      totalCost: toNumber(json.orbCostsAndUsage?.totalCost),
    };
  } catch (err) {
    return {
      message: `HyperAgent usage failed: ${err instanceof Error ? err.message : String(err)}`,
      plan: "HyperAgent",
    };
  }
}
