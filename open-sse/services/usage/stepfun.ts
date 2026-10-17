/**
 * usage/stepfun.ts — StepFun usage fetcher.
 *
 * StepFun Open Platform provides an account-info API:
 *   GET {base}/v1/accounts
 *   Authorization: Bearer <api-key>
 *
 * Response format:
 *   {
 *     "object": "account",
 *     "type": "prepaid" | "postpaid",
 *     "balance": 5.00,
 *     "total_cash_balance": 0.00,
 *     "total_voucher_balance": 5.00
 *   }
 *
 * StepFun splits platforms (#5462): api.stepfun.com serves China-platform keys
 * (billed in CNY) and api.stepfun.ai serves international keys (billed in
 * USD). The accounts API itself does not return a currency, so the currency is
 * inferred from the effective base URL host. International connections carry
 * their base URL in `providerSpecificData.baseUrl` (honored by the chat path
 * via resolveBaseUrl) — the same override selects the matching accounts
 * endpoint here, so a key is always queried against its own platform.
 *
 * The balance is surfaced as a credits-style quota entry (same convention as
 * the DeepSeek leaf), which the Provider Limits UI renders as
 * "🪙 Balance (USD) $5.00".
 */

import { toNumber, toRecord } from "./scalars.ts";
import { type UsageQuota } from "./quota.ts";

const STEPFUN_DEFAULT_BASE_URL = "https://api.stepfun.com/v1";

/**
 * Resolve the accounts endpoint from the connection's base-URL override.
 * Accepts both the chat base (`…/v1`, `…/v1/chat/completions`) and a bare
 * host, mirroring how `providerSpecificData.baseUrl` is used at request time.
 */
export function resolveStepfunAccountsUrl(providerSpecificData: unknown): string {
  const psd = toRecord(providerSpecificData);
  let base = typeof psd.baseUrl === "string" ? psd.baseUrl.trim() : "";
  if (!base) base = STEPFUN_DEFAULT_BASE_URL;
  base = base.replace(/\/+$/, "").replace(/\/chat\/completions$/, "");
  if (!/\/v1$/.test(base)) base += "/v1";
  return `${base}/accounts`;
}

/** The accounts API carries no currency field — infer it from the platform host. */
export function inferStepfunCurrency(accountsUrl: string): "USD" | "CNY" {
  try {
    return new URL(accountsUrl).hostname === "api.stepfun.ai" ? "USD" : "CNY";
  } catch {
    return "CNY";
  }
}

/**
 * StepFun Usage
 * Fetches the prepaid/postpaid account balance and returns it as a
 * credits-style quota entry for credits-style UI display.
 */
export async function getStepfunUsage(
  apiKey: string,
  providerSpecificData?: unknown
): Promise<unknown> {
  if (!apiKey) {
    return { message: "StepFun API key not available. Add a key to view usage." };
  }

  try {
    const accountsUrl = resolveStepfunAccountsUrl(providerSpecificData);
    const res = await fetch(accountsUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!res.ok) {
      if (res.status === 401) return { message: "Invalid StepFun API key." };
      return { message: `StepFun quota API error (${res.status})` };
    }

    const data = toRecord(await res.json());
    if (data.object !== "account" || data.balance === undefined) {
      return { message: "StepFun connected. Unexpected account API response." };
    }

    const balance = toNumber(data.balance, 0);
    const grantedBalance = toNumber(data.total_voucher_balance, 0);
    const toppedUpBalance = toNumber(data.total_cash_balance, 0);
    const limitReached = balance <= 0;
    const currency = inferStepfunCurrency(accountsUrl);

    const quotas: Record<string, UsageQuota> = {
      [`credits_${currency.toLowerCase()}`]: {
        used: 0,
        total: 0,
        remaining: balance,
        remainingPercentage: 100,
        resetAt: null,
        unlimited: true,
        currency,
        grantedBalance,
        toppedUpBalance,
      },
    };

    return {
      plan: limitReached ? "StepFun (Insufficient Balance)" : "StepFun",
      quotas,
      isAvailable: !limitReached,
      limitReached,
    };
  } catch (error) {
    return { message: `StepFun connected. Unable to fetch usage: ${(error as Error).message}` };
  }
}
