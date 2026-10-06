/**
 * usage/kilocode.ts — Kilo Code balance + Kilo Pass usage fetcher (Provider Limits).
 *
 * Two independent upstream requests per usage fetch, both authenticated with the
 * existing kilocode OAuth access token (personal scope; no organization support):
 * - GET {KILO_API_URL|https://api.kilo.ai}/api/profile/balance → personal USD balance
 * - GET {KILO_API_URL|https://api.kilo.ai}/api/trpc/kiloPass.getState?batch=1&input={"0":null}
 *   → Kilo Pass subscription state (official tRPC endpoint, Kilo-Org/kilocode contract)
 *
 * The two requests fail independently: a Kilo Pass error never hides the personal
 * balance and vice versa. Only when both are unavailable does the dashboard fall
 * back to the existing { message } convention.
 */
import type { UsageQuota } from "./quota.ts";
import { parseResetTime } from "./quota.ts";
import { toRecord, toNumber, roundCurrency } from "./scalars.ts";

/** Upstream API base. Environment override mirrors sibling fetchers. */
const KILO_API_BASE: string = process.env.KILO_API_URL || "https://api.kilo.ai";
const BALANCE_PATH = "/api/profile/balance";
const BALANCE_URL = `${KILO_API_BASE}${BALANCE_PATH}`;
const PASS_PATH = "/api/trpc/kiloPass.getState";

const KILO_EDITOR_NAME = "OmniRoute";
const FETCH_TIMEOUT_MS = 8_000;

/** Fallback token for Kilo's anonymous freetier (registry anonymousApiKey).
 * Balance/pass endpoints require authenticated accounts, value rejected
 * before any request made. */
const KILO_ANONYMOUS_TOKEN = "anonymous";

/** Live subscription statuses that represent an active Kilo Pass, per the
 * official Kilo-Org/kilocode parseKiloPassState contract. The cloud returns
 * full records after cancellation too; only these statuses consume credits. */
const KILO_PASS_LIVE_STATUSES = new Set(["active", "past_due", "trialing"]);

/** Kilo Pass subscription state (mirrors official Kilo-Org/kilocode KiloPassState). */
export interface KiloPassState {
  currentPeriodBaseCreditsUsd: number;
  currentPeriodUsageUsd: number;
  currentPeriodBonusCreditsUsd: number;
  nextBillingAt: string | null;
}

function readAccessToken(connection: Record<string, unknown>): string | null {
  const value = connection["accessToken"];
  if (typeof value === "string" && value.trim().length > 0) return value;
  return null;
}

function isAnonymousToken(token: string): boolean {
  return token.trim() === KILO_ANONYMOUS_TOKEN;
}

function kiloHeaders(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
    "X-KILOCODE-EDITORNAME": KILO_EDITOR_NAME,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

/** Extract non-negative USD balance from upstream JSON body. Returns null
 * when value missing, null, negative, not numeric. */
export function parseKilocodeBalance(data: unknown): number | null {
  const obj = toRecord(data);
  if (obj.balance === undefined || obj.balance === null) return null;
  const balance = toNumber(obj.balance, Number.NaN);
  if (!Number.isFinite(balance) || balance < 0) return null;
  return roundCurrency(balance);
}

/** Coerce a USD credit amount the way the official client does: finite
 * non-negative numbers pass through, everything else becomes 0. */
function passUsd(value: unknown): number {
  const num = toNumber(value, 0);
  return Number.isFinite(num) && num >= 0 ? num : 0;
}

/**
 * Parse Kilo Pass state from the tRPC response, mirroring the official
 * Kilo-Org/kilocode parseKiloPassState semantics exactly:
 * - batched tRPC shape: [{ result: { data: { json: { subscription } } } }]
 * - unbatched result.data.json: { result: { data: { json: { subscription } } } }
 * - plain result.data (no superjson json wrapper): { result: { data: { subscription } } }
 * - plain fallback: { subscription }
 * - requires at least one period amount present (base or usage)
 * - status, when present as string, must be a live status
 * - negative/non-finite amounts clamp to 0; invalid dates become null
 *
 * Returns null when no live pass data is present (no pass, canceled, expired,
 * missing fields, malformed tRPC envelope).
 */
export function parseKiloPassState(value: unknown): KiloPassState | null {
  const item = Array.isArray(value) ? value[0] : value;
  const data = toRecord(toRecord(toRecord(item)?.result)?.data);
  // Official Kilo-Org/kilocode fallback chain: data.json envelope first,
  // then the tRPC data object itself (plain-JSON responses carry the
  // subscription there without a superjson json wrapper), then raw payload.
  const jsonValue = data?.json;
  const root =
    jsonValue !== null && typeof jsonValue === "object" && !Array.isArray(jsonValue)
      ? toRecord(jsonValue)
      : Object.keys(data).length > 0
        ? data
        : toRecord(value);
  const sub = toRecord(root?.subscription);

  if (!sub || (sub.currentPeriodBaseCreditsUsd == null && sub.currentPeriodUsageUsd == null)) {
    return null;
  }
  if (typeof sub.status === "string" && !KILO_PASS_LIVE_STATUSES.has(sub.status)) {
    return null;
  }

  const next = sub.nextBillingAt ?? sub.nextRenewalAt;

  return {
    currentPeriodBaseCreditsUsd: passUsd(sub.currentPeriodBaseCreditsUsd),
    currentPeriodUsageUsd: passUsd(sub.currentPeriodUsageUsd),
    currentPeriodBonusCreditsUsd: passUsd(sub.currentPeriodBonusCreditsUsd),
    // Normalize to the ISO format OmniRoute expects; invalid dates must not
    // break the whole fetch (parseResetTime returns null instead).
    nextBillingAt: parseResetTime(typeof next === "string" ? next : null),
  };
}

/**
 * Fetch Kilo Pass state. Returns null on any failure (HTTP error, network,
 * timeout, malformed body, no live pass) — matches the official client's
 * silent-degradation contract. Never throws, never logs tokens/bodies.
 */
export async function fetchKiloPassState(token: string): Promise<KiloPassState | null> {
  try {
    const params = new URLSearchParams({
      batch: "1",
      input: JSON.stringify({ "0": null }),
    });
    const response = await fetch(`${KILO_API_BASE}${PASS_PATH}?${params}`, {
      method: "GET",
      headers: kiloHeaders(token),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return parseKiloPassState(await response.json());
  } catch {
    return null;
  }
}

/** Build normalized usage response from successful balance fetch. */
export function buildKilocodeUsageResult(balance: number): {
  plan: string;
  quotas: Record<string, UsageQuota>;
} {
  const balanceQuota: UsageQuota = {
    used: 0,
    total: 0,
    remaining: balance,
    remainingPercentage: balance > 0 ? 100 : 0,
    resetAt: null,
    unlimited: true,
    currency: "USD",
    displayName: "Balance (USD)",
  };

  return {
    plan: "Kilo Code",
    quotas: { balance: balanceQuota },
  };
}

/**
 * Build Kilo Pass quota entries. Remaining pass credits follow the official
 * Kilo Pass meter semantics (total pool = base + bonus, used consumed from it):
 * remaining = max(0, base + bonus - usage). resetAt carries nextBillingAt on
 * the period-defining Base Credits row.
 */
export function buildKiloPassUsageResult(pass: KiloPassState): {
  plan: string;
  quotas: Record<string, UsageQuota>;
} {
  const base = pass.currentPeriodBaseCreditsUsd;
  const bonus = pass.currentPeriodBonusCreditsUsd;
  const usage = pass.currentPeriodUsageUsd;
  const remaining = Math.max(0, roundCurrency(base + bonus - usage));

  const quotas: Record<string, UsageQuota> = {
    kiloPassBase: {
      used: 0,
      total: base,
      remaining: base,
      remainingPercentage: base > 0 ? 100 : 0,
      resetAt: pass.nextBillingAt,
      unlimited: false,
      currency: "USD",
      displayName: "Base Credits",
    },
    kiloPassBonus: {
      used: 0,
      total: bonus,
      remaining: bonus,
      remainingPercentage: bonus > 0 ? 100 : 0,
      resetAt: null,
      unlimited: false,
      currency: "USD",
      displayName: "Bonus Credits",
    },
    kiloPassUsage: {
      used: usage,
      total: base + bonus,
      remaining,
      remainingPercentage: base + bonus > 0 ? Math.max(0, (remaining / (base + bonus)) * 100) : 0,
      resetAt: pass.nextBillingAt,
      unlimited: false,
      currency: "USD",
      displayName: "Kilo Pass Usage",
    },
    kiloPassRemaining: {
      used: 0,
      total: 0,
      remaining,
      remainingPercentage: remaining > 0 ? 100 : 0,
      resetAt: pass.nextBillingAt,
      unlimited: false,
      currency: "USD",
      displayName: "Pass Remaining",
    },
  };

  return {
    plan: "Kilo Code",
    quotas,
  };
}

/**
 * Fetch balance from upstream API. Throws with the historical per-status
 * messages so getKilocodeUsage can surface the same diagnostics as before
 * when the pass request fails alongside it.
 */
async function fetchBalance(token: string): Promise<number> {
  let response: Response;
  try {
    response = await fetch(BALANCE_URL, {
      method: "GET",
      headers: kiloHeaders(token),
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
    });
  } catch (error) {
    throw new Error(`Kilo Code balance error: ${(error as Error).message}`);
  }

  if (response.status === 401 || response.status === 403) {
    throw new Error("Kilo Code token expired access denied. Please re-authenticate connection.");
  }
  if (response.status === 429) {
    throw new Error("Kilo Code balance request rate limited. Try again later.");
  }
  if (!response.ok) {
    throw new Error(`Kilo Code balance request failed with HTTP ${response.status}.`);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(`Kilo Code balance error: ${(error as Error).message}`);
  }

  const balance = parseKilocodeBalance(data);
  if (balance === null) {
    throw new Error("Kilo Code balance response invalid missing balance value.");
  }
  return balance;
}

/** Fetch and normalize Kilo Code balance + Kilo Pass usage for connection. */
export async function getKilocodeUsage(
  _connectionId: string | undefined,
  connection?: Record<string, unknown>
): Promise<
  { plan: string; quotas: Record<string, UsageQuota> } | { plan: string; message: string }
> {
  const token = connection ? readAccessToken(connection) : null;
  if (connection?.["apiKey"] !== undefined && !token) {
    return {
      plan: "Kilo Code",
      message: "Kilo Code balance uses Kilo Code OAuth account; separate API key not supported.",
    };
  }
  if (!token) {
    return {
      plan: "Kilo Code",
      message: "Kilo Code balance not available. Add Kilo Code account view usage.",
    };
  }
  if (isAnonymousToken(token)) {
    return {
      plan: "Kilo Code",
      message:
        "Kilo Code balance only available authenticated accounts. Free anonymous usage balance.",
    };
  }

  // Both requests share one usage fetch but fail independently.
  const [balanceSettled, passSettled] = await Promise.allSettled([
    fetchBalance(token),
    fetchKiloPassState(token),
  ]);

  const balance = balanceSettled.status === "fulfilled" ? balanceSettled.value : null;
  const pass = passSettled.status === "fulfilled" ? passSettled.value : null;

  if (balance !== null && pass !== null) {
    return {
      plan: "Kilo Code",
      quotas: {
        ...buildKilocodeUsageResult(balance).quotas,
        ...buildKiloPassUsageResult(pass).quotas,
      },
    };
  }
  if (balance !== null) return buildKilocodeUsageResult(balance);
  if (pass !== null) return buildKiloPassUsageResult(pass);

  const balanceError =
    balanceSettled.status === "rejected" ? (balanceSettled.reason as Error).message : null;
  return {
    plan: "Kilo Code",
    message: balanceError ?? "Kilo Code usage unavailable. Try again later.",
  };
}
