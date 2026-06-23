import { sanitizeErrorMessage } from "../utils/error.ts";

type JsonRecord = Record<string, unknown>;
type UsageQuota = {
  used: number;
  total: number;
  remaining?: number;
  remainingPercentage?: number;
  resetAt: string | null;
  unlimited: boolean;
  displayName?: string;
  details?: Array<{ name: string; used: number }>;
  currency?: string;
};

const OPENCODE_GO_QUOTA_URL =
  process.env.OMNIROUTE_OPENCODE_GO_QUOTA_URL ?? "https://api.z.ai/api/monitor/usage/quota/limit";
const OPENCODE_GO_DASHBOARD_BASE_URL =
  process.env.OMNIROUTE_OPENCODE_GO_DASHBOARD_URL ?? "https://opencode.ai/workspace";
const OPENCODE_GO_QUOTA_TOTALS = { session: 12, weekly: 30, mcp_monthly: 60 } as const;
const OPENCODE_GO_QUOTA_ORDER = ["session", "weekly", "mcp_monthly"] as const;
const OPENCODE_GO_SCRAPED_NUMBER = String.raw`(-?\d+(?:\.\d+)?)`;
const OLLAMA_CLOUD_USAGE_URL =
  process.env.OMNIROUTE_OLLAMA_CLOUD_USAGE_URL ?? "https://ollama.com/settings";
const OLLAMA_CLOUD_SESSION_COOKIE = "__Secure-session";

type OpenCodeGoQuotaName = (typeof OPENCODE_GO_QUOTA_ORDER)[number];
type DashboardWindow = { usagePercent: number; resetAt: string | null };
type OpenCodeGoDashboardUsage = Partial<Record<OpenCodeGoQuotaName, DashboardWindow>>;
type OpenCodeGoDashboardConfig =
  | { state: "configured"; workspaceId: string; authCookie: string }
  | { state: "incomplete"; missing: string }
  | { state: "none" };
type OllamaCloudUsage = {
  session?: DashboardWindow;
  weekly?: DashboardWindow;
  planTier?: string | null;
};
type OllamaCloudConfig =
  | { state: "configured"; cookie: string }
  | { state: "invalid"; error: string }
  | { state: "none" };

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNumber(value: unknown, fallback = 0): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string" && value.trim().length > 0
        ? Number(value)
        : Number.NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toPercentage(value: unknown): number {
  return Math.max(0, Math.min(100, toNumber(value, 0)));
}

function toTitleCase(value: string): string {
  return value
    .trim()
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}

function safeToIsoString(time: number): string | null {
  if (!Number.isFinite(time) || time < 0 || time > 8.64e15) return null;
  try {
    return new Date(time).toISOString();
  } catch {
    return null;
  }
}

function parseResetTime(resetValue: unknown): string | null {
  const numeric = toNumber(resetValue, Number.NaN);
  if (Number.isFinite(numeric) && numeric > 0) return safeToIsoString(numeric);
  if (typeof resetValue !== "string" || !resetValue.trim()) return null;
  const parsed = Date.parse(resetValue);
  return Number.isFinite(parsed) ? safeToIsoString(parsed) : null;
}

function getProviderSpecificString(data: JsonRecord | undefined, keys: string[]): string {
  const obj = toRecord(data);
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function resolveOpenCodeGoDashboardConfig(
  providerSpecificData?: JsonRecord
): OpenCodeGoDashboardConfig {
  const workspaceId =
    process.env.OMNIROUTE_OPENCODE_GO_WORKSPACE_ID?.trim() ||
    process.env.OPENCODE_GO_WORKSPACE_ID?.trim() ||
    getProviderSpecificString(providerSpecificData, [
      "openCodeGoWorkspaceId",
      "opencodeGoWorkspaceId",
      "workspaceId",
    ]);
  const authCookie =
    process.env.OMNIROUTE_OPENCODE_GO_AUTH_COOKIE?.trim() ||
    process.env.OPENCODE_GO_AUTH_COOKIE?.trim() ||
    getProviderSpecificString(providerSpecificData, [
      "openCodeGoAuthCookie",
      "opencodeGoAuthCookie",
      "authCookie",
    ]);

  if (!workspaceId && !authCookie) return { state: "none" };
  if (workspaceId && authCookie) return { state: "configured", workspaceId, authCookie };
  return {
    state: "incomplete",
    missing: workspaceId ? "OPENCODE_GO_AUTH_COOKIE" : "OPENCODE_GO_WORKSPACE_ID",
  };
}

function normalizeOpenCodeGoAuthCookie(value: string): string {
  return value
    .trim()
    .replace(/^auth=/i, "")
    .trim();
}

function buildBearerAuthorization(value: string): string {
  const token = value
    .trim()
    .replace(/^Bearer\s+/i, "")
    .trim();
  return token ? `Bearer ${token}` : "";
}

function getOpenCodeGoTokenQuotaName(
  limit: JsonRecord,
  existingQuotas: Record<string, UsageQuota>
): "session" | "weekly" {
  const unit = toNumber(limit.unit, 0);
  const number = toNumber(limit.number, 0);
  if (unit === 3 && number === 5) return "session";
  if (unit === 6 && number === 1) return "weekly";
  if ((unit === 4 && number === 7) || (unit === 3 && number >= 24 * 7)) return "weekly";
  return existingQuotas.session ? "weekly" : "session";
}

function buildOpenCodeGoDollarQuota(
  quotaName: OpenCodeGoQuotaName,
  percentage: unknown,
  resetAt: string | null,
  usedOverride?: unknown,
  details?: UsageQuota["details"]
): UsageQuota {
  const total = OPENCODE_GO_QUOTA_TOTALS[quotaName];
  const percentUsed = toPercentage(percentage);
  const rawUsed = toNumber(usedOverride, Number.NaN);
  const used = roundCurrency(
    Number.isFinite(rawUsed) ? Math.max(0, Math.min(total, rawUsed)) : (total * percentUsed) / 100
  );
  const remaining = roundCurrency(Math.max(0, total - used));
  return {
    used,
    total,
    remaining,
    remainingPercentage:
      total > 0 ? Math.max(0, Math.min(100, Math.round((remaining / total) * 100))) : 100,
    resetAt,
    unlimited: false,
    displayName:
      quotaName === "session" ? "5-hour rolling" : quotaName === "weekly" ? "Weekly" : "Monthly",
    currency: "USD",
    details,
  };
}

function orderOpenCodeGoQuotas(quotas: Record<string, UsageQuota>): Record<string, UsageQuota> {
  const ordered: Record<string, UsageQuota> = {};
  for (const key of OPENCODE_GO_QUOTA_ORDER) if (quotas[key]) ordered[key] = quotas[key];
  for (const [key, quota] of Object.entries(quotas)) if (!ordered[key]) ordered[key] = quota;
  return ordered;
}

function parseOpenCodeGoSsrWindow(html: string, field: string): DashboardWindow | null {
  for (const candidate of [
    {
      usageIndex: 1,
      resetIndex: 2,
      pattern: String.raw`${field}:\$R\[\d+\]=\{[^}]*usagePercent:${OPENCODE_GO_SCRAPED_NUMBER}[^}]*resetInSec:${OPENCODE_GO_SCRAPED_NUMBER}[^}]*\}`,
    },
    {
      usageIndex: 2,
      resetIndex: 1,
      pattern: String.raw`${field}:\$R\[\d+\]=\{[^}]*resetInSec:${OPENCODE_GO_SCRAPED_NUMBER}[^}]*usagePercent:${OPENCODE_GO_SCRAPED_NUMBER}[^}]*\}`,
    },
  ]) {
    const match = new RegExp(candidate.pattern).exec(html);
    if (!match) continue;
    const usagePercent = toNumber(match[candidate.usageIndex], Number.NaN);
    const resetInSec = toNumber(match[candidate.resetIndex], Number.NaN);
    if (Number.isFinite(usagePercent) && Number.isFinite(resetInSec)) {
      return {
        usagePercent,
        resetAt: safeToIsoString(Date.now() + Math.max(0, resetInSec) * 1000),
      };
    }
  }
  return null;
}

function parseOpenCodeGoHumanReset(value: string): number | null {
  const text = value.toLowerCase().replace(/\s+/g, " ").trim();
  if (["reset-now", "reset now", "now", "resets now"].includes(text)) return 0;
  const days = text.match(/(\d+(?:\.\d+)?)\s*days?/);
  const hours = text.match(/(\d+(?:\.\d+)?)\s*hours?/);
  const minutes = text.match(/(\d+(?:\.\d+)?)\s*minutes?/);
  const seconds = text.match(/(\d+(?:\.\d+)?)\s*seconds?/);
  if (!days && !hours && !minutes && !seconds) return null;
  return (
    toNumber(days?.[1], 0) * 86_400 +
    toNumber(hours?.[1], 0) * 3_600 +
    toNumber(minutes?.[1], 0) * 60 +
    toNumber(seconds?.[1], 0)
  );
}

function parseOpenCodeGoDashboardHtml(html: string): OpenCodeGoDashboardUsage | null {
  const usage: OpenCodeGoDashboardUsage = {
    session: parseOpenCodeGoSsrWindow(html, "rollingUsage") ?? undefined,
    weekly: parseOpenCodeGoSsrWindow(html, "weeklyUsage") ?? undefined,
    mcp_monthly: parseOpenCodeGoSsrWindow(html, "monthlyUsage") ?? undefined,
  };
  if (usage.session || usage.weekly || usage.mcp_monthly) return usage;

  for (const content of html.split(/data-slot="usage-item"/).slice(1)) {
    const label = content
      .match(/data-slot="usage-label">([^<]+)</)?.[1]
      ?.trim()
      .toLowerCase();
    const usagePercent = toNumber(
      content.match(/data-slot="usage-value">[^0-9]*(\d+(?:\.\d+)?)/)?.[1],
      Number.NaN
    );
    const resetMatch = content.match(/data-slot="(reset-time|reset-now)">([\s\S]*?)<\/span>/);
    if (!label || !Number.isFinite(usagePercent) || !resetMatch) continue;
    const resetInSec =
      resetMatch[1] === "reset-now"
        ? 0
        : parseOpenCodeGoHumanReset(
            // Strip any HTML comment, INCLUDING an unterminated one (React SSR emits
            // <!--$--> / <!--/--> hydration markers). The `(?:-->|$)` arm consumes a
            // trailing "<!--" with no closing "-->" too, so no partial "<!--" can survive
            // (js/incomplete-multi-character-sanitization).
            resetMatch[2].replace(/<!--[\s\S]*?(?:-->|$)/g, "").replace(/Resets?\s*in\s*/i, "")
          );
    if (resetInSec === null || !Number.isFinite(resetInSec)) continue;
    const window = {
      usagePercent,
      resetAt: safeToIsoString(Date.now() + Math.max(0, resetInSec) * 1000),
    };
    if (label.includes("rolling")) usage.session = window;
    else if (label.includes("weekly")) usage.weekly = window;
    else if (label.includes("monthly")) usage.mcp_monthly = window;
  }
  return usage.session || usage.weekly || usage.mcp_monthly ? usage : null;
}

async function fetchOpenCodeGoDashboardUsage(
  config: Extract<OpenCodeGoDashboardConfig, { state: "configured" }>
) {
  const url = `${OPENCODE_GO_DASHBOARD_BASE_URL.replace(/\/+$/, "")}/${encodeURIComponent(
    config.workspaceId
  )}/go`;
  const response = await fetch(url, {
    headers: {
      Accept: "text/html",
      Cookie: `auth=${normalizeOpenCodeGoAuthCookie(config.authCookie)}`,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Gecko/20100101 Firefox/148.0",
    },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok)
    return { usage: null, message: `OpenCode Go dashboard error (${response.status}).` };
  const usage = parseOpenCodeGoDashboardHtml(await response.text());
  return {
    usage,
    message: usage ? undefined : "OpenCode Go dashboard response did not contain quota windows.",
  };
}

export async function getOpenCodeGoUsage(apiKey: string, providerSpecificData?: JsonRecord) {
  const dashboardConfig = resolveOpenCodeGoDashboardConfig(providerSpecificData);
  if (dashboardConfig.state === "incomplete") {
    return {
      message: `OpenCode Go dashboard quota config is incomplete. Missing ${dashboardConfig.missing}.`,
    };
  }
  if (dashboardConfig.state === "configured") {
    try {
      const dashboard = await fetchOpenCodeGoDashboardUsage(dashboardConfig);
      if (!dashboard.usage) {
        return { message: dashboard.message || "OpenCode Go dashboard quota data unavailable." };
      }
      const quotas: Record<string, UsageQuota> = {};
      for (const quotaName of OPENCODE_GO_QUOTA_ORDER) {
        const usage = dashboard.usage[quotaName];
        if (usage) {
          quotas[quotaName] = buildOpenCodeGoDollarQuota(
            quotaName,
            usage.usagePercent,
            usage.resetAt
          );
        }
      }
      return { plan: "OpenCode Go", quotas: orderOpenCodeGoQuotas(quotas) };
    } catch (error) {
      return { message: `OpenCode Go dashboard quota error: ${sanitizeErrorMessage(error)}` };
    }
  }

  const token = apiKey.trim().replace(/^Bearer\s+/i, "");
  if (!token) {
    return {
      message:
        "OpenCode Go quota requires OPENCODE_GO_WORKSPACE_ID and OPENCODE_GO_AUTH_COOKIE. " +
        "The API key can be used for chat/models, but OpenCode Go does not expose quota via API key.",
    };
  }

  try {
    const res = await fetch(OPENCODE_GO_QUOTA_URL, {
      headers: {
        Authorization: buildBearerAuthorization(token),
        "Accept-Language": "en-US,en",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        return {
          message:
            "OpenCode Go API key is valid for chat/models but cannot read quota from the Z.AI quota API. " +
            "Set OPENCODE_GO_WORKSPACE_ID and OPENCODE_GO_AUTH_COOKIE to enable dashboard quota scraping.",
        };
      }
      return {
        message:
          `OpenCode Go quota API error (${res.status}). ` +
          "Set OMNIROUTE_OPENCODE_GO_QUOTA_URL to a working endpoint, or follow " +
          "https://github.com/anomalyco/opencode/issues/16017 for upstream status.",
      };
    }

    let json: unknown;
    try {
      json = await res.json();
    } catch {
      return { message: "OpenCode Go quota response parsing failed." };
    }
    const root = toRecord(json);
    if (
      toNumber(root.code, 200) === 401 ||
      toNumber(root.code, 200) === 403 ||
      root.success === false
    ) {
      return {
        message:
          "OpenCode Go API key is valid for chat/models but cannot read quota from the Z.AI quota API. " +
          "Set OPENCODE_GO_WORKSPACE_ID and OPENCODE_GO_AUTH_COOKIE to enable dashboard quota scraping.",
      };
    }

    const data = toRecord(root.data);
    const quotas: Record<string, UsageQuota> = {};
    for (const limit of Array.isArray(data.limits) ? data.limits : []) {
      const src = toRecord(limit);
      const type = String(src.type || "").toUpperCase();
      const resetAt = parseResetTime(src.nextResetTime);
      if (type === "TOKENS_LIMIT" || type === "TOKEN_LIMIT") {
        const quotaName = getOpenCodeGoTokenQuotaName(src, quotas);
        quotas[quotaName] = buildOpenCodeGoDollarQuota(
          quotaName,
          src.percentage,
          resetAt,
          undefined,
          Array.isArray(src.models)
            ? src.models.map((model) => {
                const modelInfo = toRecord(model);
                return {
                  name: String(modelInfo.model || modelInfo.modelCode || "usage"),
                  used: toNumber(modelInfo.percentage, 0),
                };
              })
            : undefined
        );
      } else if (type === "TIME_LIMIT" || type === "TIME_USAGE_LIMIT") {
        quotas.mcp_monthly = buildOpenCodeGoDollarQuota(
          "mcp_monthly",
          src.percentage,
          resetAt,
          src.currentValue,
          Array.isArray(src.usageDetails)
            ? src.usageDetails.map((item) => {
                const detail = toRecord(item);
                return {
                  name: String(detail.modelCode || detail.name || "usage"),
                  used: toNumber(detail.usage, 0),
                };
              })
            : undefined
        );
      }
    }

    const levelRaw =
      typeof data.planName === "string"
        ? data.planName
        : typeof data.level === "string"
          ? data.level
          : "";
    const planLabel = toTitleCase(levelRaw.replace(/\s*plan$/i, ""));
    return {
      plan: planLabel
        ? /^opencode\s+go\b/i.test(planLabel)
          ? planLabel
          : `OpenCode Go ${planLabel}`
        : null,
      quotas: orderOpenCodeGoQuotas(quotas),
    };
  } catch (error) {
    return { message: `OpenCode Go quota API error: ${sanitizeErrorMessage(error)}` };
  }
}

function resolveOllamaCloudConfig(providerSpecificData?: JsonRecord): OllamaCloudConfig {
  const cookie =
    process.env.OMNIROUTE_OLLAMA_USAGE_COOKIE?.trim() ||
    process.env.OLLAMA_USAGE_COOKIE?.trim() ||
    process.env.OLLAMA_CLOUD_USAGE_COOKIE?.trim() ||
    getProviderSpecificString(providerSpecificData, [
      "ollamaUsageCookie",
      "ollamaCloudUsageCookie",
      "ollamaCloudCookie",
      "usageCookie",
      "cookie",
    ]);
  if (!cookie) return { state: "none" };
  if (cookie.includes("\r") || cookie.includes("\n")) {
    return { state: "invalid", error: "Ollama Cloud cookie contains invalid CRLF characters." };
  }
  return { state: "configured", cookie };
}

function normalizeOllamaCloudCookie(value: string): string {
  const trimmed = value.trim();
  return trimmed.toLowerCase().startsWith(`${OLLAMA_CLOUD_SESSION_COOKIE.toLowerCase()}=`)
    ? trimmed.slice(OLLAMA_CLOUD_SESSION_COOKIE.length + 1).trim()
    : trimmed;
}

function extractOllamaUsagePercent(trackHtml: string): number | null {
  const tagHeader = trackHtml.match(/^[^>]*/)?.[0] ?? "";
  const ariaMatch = tagHeader.match(/(\d+(?:\.\d+)?)%\s*used/);
  if (ariaMatch) {
    const pct = toNumber(ariaMatch[1], Number.NaN);
    if (Number.isFinite(pct) && pct >= 0 && pct <= 100) return pct;
  }
  const style = tagHeader.match(/style="([^"]*)"/)?.[1] ?? "";
  const pct = toNumber(style.match(/(?:^|;)\s*width\s*:\s*([0-9.]+)%/)?.[1], Number.NaN);
  return Number.isFinite(pct) && pct >= 0 && pct <= 100 ? pct : null;
}

function parseOllamaCloudSettingsHtml(html: string): OllamaCloudUsage | null {
  const parts = html.split(/\bdata-usage-track\b/);
  if (parts.length < 2) return null;
  const extractTime = (text: string): string | null => {
    const match = text.match(/class="[^"]*local-time[^"]*"[^>]*data-time="([^"]*)"/);
    return match?.[1] || null;
  };
  const sessionPercent = extractOllamaUsagePercent(parts[1]);
  const weeklyPercent = parts[2] ? extractOllamaUsagePercent(parts[2]) : null;
  if (sessionPercent === null && weeklyPercent === null) return null;
  return {
    ...(sessionPercent !== null
      ? { session: { usagePercent: sessionPercent, resetAt: extractTime(parts[1]) } }
      : {}),
    ...(weeklyPercent !== null
      ? { weekly: { usagePercent: weeklyPercent, resetAt: extractTime(parts[2]) } }
      : {}),
    planTier: html.match(/class="[^"]*capitalize[^"]*"[^>]*>([^<]*)</)?.[1]?.trim() || null,
  };
}

async function fetchOllamaCloudUsageFromSettings(
  config: Extract<OllamaCloudConfig, { state: "configured" }>
) {
  const response = await fetch(OLLAMA_CLOUD_USAGE_URL, {
    redirect: "manual",
    headers: {
      Accept: "text/html",
      Cookie: `${OLLAMA_CLOUD_SESSION_COOKIE}=${normalizeOllamaCloudCookie(config.cookie)}`,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Gecko/20100101 Firefox/148.0",
    },
    signal: AbortSignal.timeout(10_000),
  });
  if (response.status >= 300 && response.status < 400) {
    return { usage: null, message: "Ollama Cloud authentication expired. Refresh the cookie." };
  }
  if (!response.ok)
    return { usage: null, message: `Ollama Cloud settings error (${response.status}).` };
  const usage = parseOllamaCloudSettingsHtml(await response.text());
  return {
    usage,
    message: usage ? undefined : "Ollama Cloud settings page did not contain usage quota tracks.",
  };
}

export async function getOllamaCloudUsage(providerSpecificData?: JsonRecord) {
  const config = resolveOllamaCloudConfig(providerSpecificData);
  if (config.state === "none") {
    return {
      message:
        "Ollama Cloud quota requires OLLAMA_USAGE_COOKIE. Copy the __Secure-session cookie from ollama.com/settings.",
    };
  }
  if (config.state === "invalid") return { message: config.error };

  try {
    const result = await fetchOllamaCloudUsageFromSettings(config);
    if (!result.usage) return { message: result.message || "Ollama Cloud quota data unavailable." };
    const quotas: Record<string, UsageQuota> = {};
    for (const key of ["session", "weekly"] as const) {
      const quota = result.usage[key];
      if (!quota) continue;
      const pct = toPercentage(quota.usagePercent);
      quotas[key] = {
        used: pct,
        total: 100,
        remaining: Math.max(0, 100 - pct),
        remainingPercentage: Math.max(0, 100 - pct),
        resetAt: quota.resetAt,
        unlimited: false,
        displayName: key === "session" ? "Session" : "Weekly",
      };
    }
    return {
      plan: result.usage.planTier ? `Ollama Cloud ${result.usage.planTier}` : "Ollama Cloud",
      quotas,
    };
  } catch (error) {
    return { message: `Ollama Cloud quota error: ${sanitizeErrorMessage(error)}` };
  }
}
