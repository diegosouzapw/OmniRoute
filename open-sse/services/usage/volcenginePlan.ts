/**
 * usage/volcenginePlan.ts — Volcano Ark Plan usage fetcher.
 *
 * Volcano Engine Ark serves the two subscription plans on DISTINCT chat base URLs:
 *   - Agent Plan  → https://ark.cn-beijing.volces.com/api/plan/v3
 *   - Coding Plan → https://ark.cn-beijing.volces.com/api/coding/v3
 * (both differ from the standard pay-per-use API at /api/v3).
 *
 * The data-plane API exposes NO quota/usage endpoint. Real subscription usage
 * lives behind the Ark console's authenticated "top" API, which is keyed by the
 * browser session cookie (+ CSRF token), NOT the ark- API key:
 *   - Coding Plan → POST /api/top/ark/cn-beijing/2024-01-01/GetCodingPlanUsage
 *   - Agent Plan  → POST /api/top/ark/cn-beijing/2024-01-01/GetAgentPlanAFPUsage
 *
 * When the connection carries a console cookie in providerSpecificData
 * (`volcConsoleCookie` + `volcCsrfToken`), we fetch the real quota windows and
 * map them into OmniRoute's UsageQuota shape. Without a cookie we fall back to a
 * data-plane connectivity probe (validates the key, no quota numbers).
 */

import { toRecord, toNumber } from "./scalars.ts";
import { type UsageQuota } from "./quota.ts";

type JsonRecord = Record<string, unknown>;

const AGENT_PLAN_BASE_URL = "https://ark.cn-beijing.volces.com/api/plan/v3";
const CODING_PLAN_BASE_URL = "https://ark.cn-beijing.volces.com/api/coding/v3";

const CONSOLE_TOP_BASE = "https://console.volcengine.com/api/top/ark/cn-beijing/2024-01-01";

// First model probed for the Agent Plan chat-based validation (no /models endpoint).
const AGENT_PLAN_PROBE_MODEL = "doubao-seed-2-0-pro-260215";

const CONSOLE_HINT_AGENT = "console.volcengine.com/ark → 订阅 Agent Plan";
const CONSOLE_HINT_CODING = "console.volcengine.com/ark → 订阅 Coding Plan";

function getPlanName(provider: string): string {
  if (provider === "volcengine-agent-plan") return "Volcano Ark Agent Plan";
  if (provider === "volcengine-coding-plan") return "Volcano Ark Coding Plan";
  return "Volcano Ark Plan";
}

function getBaseUrl(provider: string, providerSpecificData?: JsonRecord): string {
  const override = providerSpecificData?.arkPlanBaseUrl;
  if (typeof override === "string" && override.trim()) return override.trim().replace(/\/+$/, "");
  if (provider === "volcengine-coding-plan") return CODING_PLAN_BASE_URL;
  return AGENT_PLAN_BASE_URL;
}

// ── Console cookie helpers ──────────────────────────────────────────────────

function getConsoleCookie(providerSpecificData?: JsonRecord): string {
  const cookie = providerSpecificData?.volcConsoleCookie;
  return typeof cookie === "string" ? cookie.trim() : "";
}

function getConsoleCsrf(providerSpecificData?: JsonRecord, cookie = ""): string {
  const explicit = providerSpecificData?.volcCsrfToken;
  if (typeof explicit === "string" && explicit.trim()) return explicit.trim();
  // Fall back to the csrfToken embedded in the cookie string.
  const match = cookie.match(/csrfToken=([^;]+)/);
  return match ? match[1].trim() : "";
}

async function callConsoleApi(
  action: string,
  cookie: string,
  csrf: string,
  referer: string
): Promise<{ ok: boolean; status: number; json: JsonRecord; error?: string }> {
  const response = await fetch(`${CONSOLE_TOP_BASE}/${action}?`, {
    method: "POST",
    headers: {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json",
      cookie,
      origin: "https://console.volcengine.com",
      referer,
      "x-csrf-token": csrf,
    },
    body: "{}",
  });
  const text = await response.text();
  let json: JsonRecord = {};
  try {
    json = toRecord(JSON.parse(text));
  } catch {
    /* non-JSON */
  }
  const err = toRecord(toRecord(json.ResponseMetadata).Error);
  const errMsg = typeof err.Message === "string" ? err.Message : "";
  return { ok: response.ok && !errMsg, status: response.status, json, error: errMsg };
}

// ── Console usage → UsageQuota mapping ───────────────────────────────────────

function tsToIso(seconds: number): string | null {
  if (!seconds || seconds <= 0) return null;
  const ms = seconds < 1e12 ? seconds * 1000 : seconds;
  const d = new Date(ms);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

const CODING_LEVEL_TO_CANONICAL: Record<string, string> = {
  session: "session (5h)",
  weekly: "weekly (7d)",
  daily: "daily",
  monthly: "monthly",
};

const CODING_WINDOW_LABEL: Record<string, string> = {
  "session (5h)": "Session (5h)",
  "weekly (7d)": "Weekly",
  monthly: "Monthly",
  daily: "Daily",
};

/**
 * Map GetCodingPlanUsage → quotas. Coding Plan reports each window as a used
 * `Percent` (0-100) against `Cap` (100), so remaining = Cap - Percent.
 */
function mapCodingPlanUsage(result: JsonRecord): Record<string, UsageQuota> {
  const quotas: Record<string, UsageQuota> = {};
  const windows = Array.isArray(result.QuotaUsage) ? result.QuotaUsage : [];
  for (const raw of windows) {
    const w = toRecord(raw);
    const level = String(w.Level || "").toLowerCase();
    if (!level) continue;
    const canonicalKey = CODING_LEVEL_TO_CANONICAL[level] || level;
    const rawCap = toNumber(w.Cap, 100);
    const cap = rawCap > 0 ? rawCap : 100;
    const usedPercent = toNumber(w.Percent, 0);
    const remainingPercentage = Math.max(0, Math.min(100, cap - usedPercent));
    quotas[canonicalKey] = {
      used: usedPercent,
      total: cap,
      remaining: Math.max(0, cap - usedPercent),
      remainingPercentage,
      resetAt: tsToIso(toNumber(w.ResetTimestamp, 0)),
      unlimited: false,
      displayName: CODING_WINDOW_LABEL[canonicalKey] || level,
    };
  }
  return quotas;
}

const AGENT_WINDOW_MAPPING: Array<[string, string, string]> = [
  ["AFPFiveHour", "session (5h)", "Session (5h)"],
  ["AFPDaily", "daily", "Daily"],
  ["AFPWeekly", "weekly (7d)", "Weekly"],
  ["AFPMonthly", "monthly", "Monthly"],
];

/**
 * Map GetAgentPlanAFPUsage → quotas. Agent Plan reports absolute `Quota`/`Used`
 * (AFP credits) per window with a millisecond `ResetTime`.
 */
function mapAgentPlanUsage(result: JsonRecord): Record<string, UsageQuota> {
  const quotas: Record<string, UsageQuota> = {};
  for (const [sourceKey, canonicalKey, label] of AGENT_WINDOW_MAPPING) {
    const w = toRecord(result[sourceKey]);
    if (Object.keys(w).length === 0) continue;
    const total = toNumber(w.Quota, 0);
    const used = toNumber(w.Used, 0);
    const remaining = Math.max(0, total - used);
    const remainingPercentage =
      total > 0 ? Math.max(0, Math.min(100, (remaining / total) * 100)) : 0;
    const resetMs = toNumber(w.ResetTime, 0);
    quotas[canonicalKey] = {
      used,
      total,
      remaining,
      remainingPercentage,
      // Agent Plan ResetTime is in milliseconds already.
      resetAt: tsToIso(resetMs >= 1e12 ? resetMs / 1000 : resetMs),
      unlimited: false,
      displayName: label,
    };
  }
  return quotas;
}

// ── Data-plane connectivity probes (fallback, no cookie) ─────────────────────

function parseArkError(json: unknown): { code: string; message: string } | null {
  const data = toRecord(json);
  const error = toRecord(data.error);
  if (!error.code && !error.message && !data.message) return null;
  return {
    code: String(error.code || ""),
    message: String(error.message || data.message || ""),
  };
}

function authErrorMessage(planName: string, status: number, errorMsg: string): string {
  if (status === 401) {
    const isFormatError = /format.*incorrect|incorrect.*format/i.test(errorMsg);
    return isFormatError
      ? `Invalid API key format. ${planName} keys start with 'ark-'. Check your subscription key.`
      : `Invalid API key or the key does not belong to a ${planName} subscription.`;
  }
  if (status === 403) {
    return `Access denied. Ensure your key has an active ${planName} subscription.`;
  }
  return `${planName} API error (${status}): ${errorMsg}`;
}

async function reportError(response: Response, responseText: string, planName: string) {
  let data: unknown = null;
  try {
    data = JSON.parse(responseText);
  } catch {
    /* non-JSON error body */
  }
  const arkError = parseArkError(data);
  return {
    plan: planName,
    message: authErrorMessage(
      planName,
      response.status,
      arkError?.message || responseText.slice(0, 200)
    ),
  };
}

/** Coding Plan: validate via the working /models listing endpoint. */
async function probeCodingPlan(baseUrl: string, apiKey: string, planName: string) {
  const response = await fetch(`${baseUrl}/models`, {
    method: "GET",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
  });
  const responseText = await response.text();
  if (!response.ok) return reportError(response, responseText, planName);
  return {
    plan: planName,
    message: `${planName} connected. Add your console cookie (volcConsoleCookie) to view live quota, or check ${CONSOLE_HINT_CODING}.`,
  };
}

/** Agent Plan: no /models endpoint — validate via a minimal chat probe. */
async function probeAgentPlan(baseUrl: string, apiKey: string, planName: string) {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: AGENT_PLAN_PROBE_MODEL,
      messages: [{ role: "user", content: "hi" }],
      max_tokens: 1,
      stream: false,
    }),
  });
  const responseText = await response.text();
  if (!response.ok) return reportError(response, responseText, planName);
  return {
    plan: planName,
    message: `${planName} connected. Add your console cookie (volcConsoleCookie) to view live quota, or check ${CONSOLE_HINT_AGENT}.`,
  };
}

// ── Entry point ──────────────────────────────────────────────────────────────

export async function getVolcenginePlanUsage(
  apiKey: string,
  provider: string,
  providerSpecificData?: JsonRecord
) {
  const planName = getPlanName(provider);
  const isCoding = provider === "volcengine-coding-plan";

  // Preferred path: real usage via the authenticated console "top" API.
  const cookie = getConsoleCookie(providerSpecificData);
  if (cookie) {
    const csrf = getConsoleCsrf(providerSpecificData, cookie);
    const action = isCoding ? "GetCodingPlanUsage" : "GetAgentPlanAFPUsage";
    const referer = isCoding
      ? "https://console.volcengine.com/ark/region:cn-beijing/subscription/coding-plan"
      : "https://console.volcengine.com/ark/region:cn-beijing/subscription/agent-plan";
    try {
      const { ok, status, json, error } = await callConsoleApi(action, cookie, csrf, referer);
      if (ok) {
        const result = toRecord(json.Result);
        const quotas = isCoding ? mapCodingPlanUsage(result) : mapAgentPlanUsage(result);
        if (Object.keys(quotas).length > 0) {
          const planType = typeof result.PlanType === "string" ? ` (${result.PlanType})` : "";
          return { plan: `${planName}${planType}`, quotas };
        }
        return {
          plan: planName,
          message: `${planName} connected. No active quota windows reported.`,
        };
      }
      // Cookie present but console call failed (expired session / no subscription).
      if (status === 401 || status === 403 || /login|unauthor|登录|鉴权/i.test(error || "")) {
        return {
          plan: planName,
          message: `Console session expired. Refresh volcConsoleCookie to view live quota.`,
        };
      }
      return {
        plan: planName,
        message: `${planName}: console usage unavailable${error ? ` (${error})` : ""}.`,
      };
    } catch (err) {
      return {
        plan: planName,
        message: `${planName} — unable to reach the Ark console: ${(err as Error).message}`,
      };
    }
  }

  // Fallback: data-plane connectivity probe (needs the ark- API key).
  if (!apiKey) {
    return { message: "API key not available. Add an Ark Plan API key to view usage." };
  }
  const baseUrl = getBaseUrl(provider, providerSpecificData);
  try {
    return isCoding
      ? await probeCodingPlan(baseUrl, apiKey, planName)
      : await probeAgentPlan(baseUrl, apiKey, planName);
  } catch (error) {
    return {
      plan: planName,
      message: `${planName} — unable to reach the Ark API: ${(error as Error).message}`,
    };
  }
}

export const __testing = {
  mapCodingPlanUsage,
  mapAgentPlanUsage,
};
