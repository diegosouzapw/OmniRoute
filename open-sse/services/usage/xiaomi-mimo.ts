/**
 * usage/xiaomi-mimo.ts — Xiaomi MiMo Token Plan quota fetcher (issue #15753).
 *
 * Two layers:
 *
 * 1. Live console fetch (preferred): when the connection carries a MiMo console
 *    session cookie (providerSpecificData.xiaomiMimoConsoleCookie / `cookie`, or
 *    XIAOMI_MIMO_CONSOLE_COOKIE), GET the console Token Plan API —
 *    `/api/v1/tokenPlan/usage` (monthUsage items: used/limit in Credits) and
 *    `/api/v1/tokenPlan/detail` (planName + currentPeriodEnd) — and report the
 *    real plan window. The `tp-`/`mk-` inference key cannot read this: the
 *    token-plan hosts only serve `/v1/*`, and the console endpoints answer
 *    401 + Xiaomi SSO `loginUrl` without the session cookie.
 *
 * 2. Self-tracked fallback (keeps working without a cookie): count the tokens
 *    OmniRoute routed to the connection in the current UTC month
 *    (usage_history) and compare them to a configurable monthly budget —
 *    providerSpecificData.monthlyTokenLimit, then XIAOMI_MIMO_MONTHLY_TOKEN_LIMIT,
 *    then 4.1B (the Lite plan's Credits). When the console session is missing
 *    or expired, the fallback result carries a hint message so the dashboard
 *    tells the operator how to enable live quota instead of failing hard.
 *
 * Depends only on the sibling scalar/quota leaves + the quotaFetchThrottle gate
 * + the usageStats dynamic import — no host coupling. usage.ts imports
 * getXiaomiMimoUsage (dispatcher + __testing).
 */

import { createQuotaFromUsage, parseResetTime, type UsageQuota } from "./quota.ts";
import { toRecord, toNumber, toTitleCase } from "./scalars.ts";
import { throttleQuotaFetch } from "../quotaFetchThrottle.ts";

type JsonRecord = Record<string, unknown>;

// Xiaomi MiMo Token Plan monthly limit (tokens) for the Lite tier. Keep in sync
// with the "xiaomi-mimo" preset in src/lib/quota/planRegistry.ts.
const DEFAULT_MONTHLY_TOKEN_LIMIT = 4_100_000_000;

const MIMO_CONSOLE_BASE_URL = "https://platform.xiaomimimo.com/api/v1";
const CONSOLE_FETCH_TIMEOUT_MS = 8_000;

/** providerSpecificData keys scanned for the console `Cookie:` value (first hit wins). */
const CONSOLE_COOKIE_KEYS = ["xiaomiMimoConsoleCookie", "cookie"] as const;

const PLAN_LABEL_TRACKED = "Xiaomi MiMo Token Plan (OmniRoute-tracked)";
const PLAN_LABEL_LIVE = "Xiaomi MiMo Token Plan";

const CONSOLE_COOKIE_HINT =
  "MiMo Token Plan quota needs a console session cookie — the tp-/mk- inference key " +
  "cannot read it. Get it at platform.xiaomimimo.com (logged in): F12 › Network, reload, " +
  "filter by api.json/tokenPlan, open a request to platform.xiaomimimo.com and copy the " +
  "whole Cookie value from Request Headers (it contains api-platform_serviceToken and " +
  "userId). Paste it into the connection's 'Xiaomi MiMo console cookie' field, or set " +
  "XIAOMI_MIMO_CONSOLE_COOKIE. The cookie expires with the browser session — re-paste it " +
  "when this message returns.";

// ─── Config helpers ─────────────────────────────────────────────────────────

function getConsoleCookie(providerSpecificData?: JsonRecord): string {
  for (const key of CONSOLE_COOKIE_KEYS) {
    const value = providerSpecificData?.[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return process.env.XIAOMI_MIMO_CONSOLE_COOKIE?.trim() || "";
}

/**
 * Monthly budget for the self-tracked fallback: the connection override, then
 * the env override, then the historical 4.1B Lite-tier default.
 */
export function resolveMonthlyTokenLimit(providerSpecificData?: JsonRecord): number {
  const configured = toNumber(providerSpecificData?.monthlyTokenLimit, 0);
  if (configured > 0) return configured;
  const envLimit = Number(process.env.XIAOMI_MIMO_MONTHLY_TOKEN_LIMIT?.trim());
  if (Number.isFinite(envLimit) && envLimit > 0) return envLimit;
  return DEFAULT_MONTHLY_TOKEN_LIMIT;
}

function nextMonthStartUtc(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)).toISOString();
}

/**
 * The console reports `currentPeriodEnd` as a naive "YYYY-MM-DD HH:mm:ss" wall
 * time with no zone info — parse it deterministically as UTC. Anything else
 * falls through to the shared reset-time parser (epoch, ISO, Date, …).
 */
export function parseConsoleTime(value: unknown): string | null {
  if (typeof value !== "string") return parseResetTime(value);
  const match = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/.exec(value.trim());
  if (!match) return parseResetTime(value);
  const [, year, month, day, hour, minute, second] = match;
  return new Date(
    Date.UTC(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    )
  ).toISOString();
}

// ─── Console transport ──────────────────────────────────────────────────────

interface ConsoleFetch {
  status: number;
  body: JsonRecord;
}

async function fetchConsoleJson(path: string, cookie: string): Promise<ConsoleFetch> {
  // #6911: space concurrent upstream quota fetches (mirrors qwenTokenPlanQuotaFetcher).
  await throttleQuotaFetch();
  const response = await fetch(`${MIMO_CONSOLE_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Cookie: cookie,
    },
    signal: AbortSignal.timeout(CONSOLE_FETCH_TIMEOUT_MS),
  });
  let body: JsonRecord = {};
  try {
    body = toRecord(await response.json());
  } catch {
    // Non-JSON body (SSO login redirect page) — treated as a rejected session.
  }
  return { status: response.status, body };
}

/** 401/403, `code !== 0`, an embedded SSO `loginUrl`, or a non-JSON body ⇒ session rejected. */
function isSessionRejected(status: number, body: JsonRecord): boolean {
  if (status === 401 || status === 403) return true;
  if (Object.keys(body).length === 0) return true;
  const code = body["code"];
  if (code !== undefined && code !== 0 && code !== "0") return true;
  const data = toRecord(body["data"]);
  return typeof body["loginUrl"] === "string" || typeof data["loginUrl"] === "string";
}

// ─── Console payload parsers ────────────────────────────────────────────────

/** `tokenPlan/usage` → the `month_total_token` item (used/limit in Credits). */
export function parseMonthUsage(body: JsonRecord): { used: number; total: number } | null {
  const monthUsage = toRecord(toRecord(body["data"])["monthUsage"]);
  const items = Array.isArray(monthUsage["items"]) ? monthUsage["items"] : [];
  for (const raw of items) {
    const item = toRecord(raw);
    if (item["name"] !== "month_total_token") continue;
    const used = toNumber(item["used"], Number.NaN);
    const total = toNumber(item["limit"], Number.NaN);
    if (!Number.isFinite(used) || !Number.isFinite(total) || total <= 0) return null;
    return { used: Math.max(0, used), total };
  }
  return null;
}

/** `tokenPlan/detail` → display plan name + the real window end. */
export function parsePlanDetail(body: JsonRecord): {
  planName: string | null;
  resetAt: string | null;
} {
  const data = toRecord(body["data"]);
  const planName = typeof data["planName"] === "string" ? data["planName"].trim() : "";
  return { planName: planName || null, resetAt: parseConsoleTime(data["currentPeriodEnd"]) };
}

function livePlanLabel(planName: string | null): string {
  if (!planName) return PLAN_LABEL_LIVE;
  return `${PLAN_LABEL_LIVE} · ${toTitleCase(planName)}`;
}

// ─── Live fetch ─────────────────────────────────────────────────────────────

type LiveQuotaResult = { plan: string; quotas: Record<string, UsageQuota> } | { message: string };

async function fetchLiveTokenPlanUsage(cookie: string): Promise<LiveQuotaResult> {
  const [usageFetch, detailFetch] = await Promise.all([
    fetchConsoleJson("/tokenPlan/usage", cookie),
    fetchConsoleJson("/tokenPlan/detail", cookie),
  ]);

  if (isSessionRejected(usageFetch.status, usageFetch.body)) {
    return { message: CONSOLE_COOKIE_HINT };
  }

  const month = parseMonthUsage(usageFetch.body);
  if (!month) {
    return {
      message: `${PLAN_LABEL_LIVE}: console usage payload unrecognized — cannot map the Token Plan window.`,
    };
  }

  // The detail call only supplies the label + the real window end; when it is
  // unavailable the monthly window falls back to the calendar-month reset.
  const detail = isSessionRejected(detailFetch.status, detailFetch.body)
    ? { planName: null, resetAt: null }
    : parsePlanDetail(detailFetch.body);

  return {
    plan: livePlanLabel(detail.planName),
    quotas: {
      monthly: createQuotaFromUsage(month.used, month.total, detail.resetAt ?? nextMonthStartUtc()),
    },
  };
}

// ─── Entry point ────────────────────────────────────────────────────────────

export async function getXiaomiMimoUsage(
  connectionId: string,
  provider = "xiaomi-mimo",
  providerSpecificData?: JsonRecord
) {
  if (!connectionId) {
    return { message: "Xiaomi MiMo: connection id unavailable for self-tracked quota." };
  }

  let hint = CONSOLE_COOKIE_HINT;
  const cookie = getConsoleCookie(providerSpecificData);
  if (cookie) {
    try {
      const live = await fetchLiveTokenPlanUsage(cookie);
      if (!("message" in live)) return live;
      hint = live.message;
    } catch (error) {
      hint = `Xiaomi MiMo console usage unavailable: ${(error as Error).message}`;
    }
  }

  // Fallback: self-tracked monthly counter against the configured budget.
  try {
    const { getMonthlyProviderTokensForConnection } = await import("@/lib/usage/usageStats");
    const used = getMonthlyProviderTokensForConnection(provider, connectionId);
    const total = resolveMonthlyTokenLimit(providerSpecificData);
    return {
      plan: PLAN_LABEL_TRACKED,
      quotas: {
        monthly: createQuotaFromUsage(used, total, nextMonthStartUtc()),
      },
      message: hint,
    };
  } catch (error) {
    return { message: `Xiaomi MiMo self-tracked usage error: ${(error as Error).message}` };
  }
}

export const __testing = {
  parseConsoleTime,
  parseMonthUsage,
  parsePlanDetail,
  resolveMonthlyTokenLimit,
};
