/**
 * qwenTokenPlanQuotaFetcher.ts — Qwen Cloud / Alibaba Model Studio PERSONAL Token Plan
 * quota fetcher (issue #9603, "quota is missing").
 *
 * The personal Token Plan (5-hour / 7-day sliding windows) has NO official OpenAPI —
 * the console gateway is the only quota surface, and the inference API key does NOT
 * authenticate it. Both portals read the same backend:
 *   - home.qwencloud.com portal        → https://cs-data.qwencloud.com          (default)
 *   - Model Studio console (intl)      → https://bailian-singapore-cs.alibabacloud.com
 *
 * Transport (captured live 2026-08-13 from a logged-in session):
 *   POST {host}/data/api.json?product=sfm_bailian&action=IntlBroadScopeAspnGateway
 *        &api=zeldaHttp.apikeyMgr.%2Ftokenplan%2Fpersonal%2Fapi%2Fv2%2F<endpoint>
 *   form body: product, action, sec_token, region, params =
 *     {"Api":"zeldaHttp.apikeyMgr./tokenplan/personal/api/v2/<endpoint>","V":"1.0",
 *      "Data":{"commodityCode":"sfm_tokenplansolo_public_intl","cornerstoneParam":{...}}}
 *   Auth: browser session Cookie (providerSpecificData or QWEN_CLOUD_COOKIE env).
 *   sec_token: best-effort — resolved from the dashboard HTML (`SEC_TOKEN: "…"`) when
 *   not provided; some accounts reject requests without it
 *   (BailianGateway.Workspace.NotAuthorised).
 *
 * Windows: usage returns per<Window>Percentage (fraction used, 0..1) +
 * per<Window>ResetTime (epoch ms). Fields are OMITTED while a window is
 * "Temporarily Removed" (observed for 5-hour), so every window is optional.
 *
 * Cache: usage 60s per connection; subscription/quota-config (slow-moving tier data)
 * 1h per connection. Registration: registerQwenTokenPlanQuotaFetcher() at startup.
 */

import { registerQuotaFetcher, registerQuotaWindows, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { throttleQuotaFetch } from "./quotaFetchThrottle.ts";

const DEFAULT_GATEWAY_HOST = "https://cs-data.qwencloud.com";
const DEFAULT_DASHBOARD_URL = "https://home.qwencloud.com/";

/**
 * The same personal Token Plan is sold through two consoles that share one backend.
 * The gateway validates the browser session against the console identity sent in the
 * request, so an Alibaba cookie paired with the QwenCloud identity is rejected with
 * `BailianGateway.Login.NotLogined` (verified live 2026-08-14).
 */
export interface TokenPlanConsoleSite {
  consoleSite: "QWENCLOUD" | "ALIYUN";
  domain: string;
  gatewayHost: string;
  dashboardUrl: string;
  origin: string;
}

const CONSOLE_SITES: Record<"qwencloud" | "aliyun", TokenPlanConsoleSite> = {
  qwencloud: {
    consoleSite: "QWENCLOUD",
    domain: "home.qwencloud.com",
    gatewayHost: DEFAULT_GATEWAY_HOST,
    dashboardUrl: DEFAULT_DASHBOARD_URL,
    origin: "https://home.qwencloud.com",
  },
  aliyun: {
    consoleSite: "ALIYUN",
    domain: "modelstudio.console.alibabacloud.com",
    gatewayHost: "https://bailian-singapore-cs.alibabacloud.com",
    dashboardUrl: "https://modelstudio.console.alibabacloud.com/",
    origin: "https://modelstudio.console.alibabacloud.com",
  },
};

/** Providers served by the Alibaba (Model Studio) console rather than QwenCloud. */
const ALIYUN_CONSOLE_PROVIDERS = new Set(["bailian-coding-plan", "alibaba", "alibaba-cn"]);

/**
 * Pick the console identity for a cookie: the login ticket names its console
 * (`login_aliyunid_ticket` vs `login_qwencloud_ticket`). Unmarked cookies fall back to
 * the provider, then to QwenCloud.
 */
export function resolveConsoleSite(
  cookie: string,
  provider: string | undefined
): TokenPlanConsoleSite {
  if (/login_aliyunid_ticket=/.test(cookie)) return CONSOLE_SITES.aliyun;
  if (/login_qwencloud_ticket=/.test(cookie)) return CONSOLE_SITES.qwencloud;
  if (provider && ALIYUN_CONSOLE_PROVIDERS.has(provider)) return CONSOLE_SITES.aliyun;
  return CONSOLE_SITES.qwencloud;
}
const GATEWAY_REGION = "ap-southeast-1";
const GATEWAY_PRODUCT = "sfm_bailian";
const GATEWAY_ACTION = "IntlBroadScopeAspnGateway";
const COMMODITY_CODE = "sfm_tokenplansolo_public_intl";
const TOKEN_PLAN_API_PREFIX = "zeldaHttp.apikeyMgr./tokenplan/personal/api/v2/";

const USAGE_CACHE_TTL_MS = 60_000;
const TIER_CACHE_TTL_MS = 60 * 60_000;

// Window keys surfaced to the dashboard / quota-window registry
export const QWEN_TOKEN_PLAN_WINDOW_5H = "window_5h";
export const QWEN_TOKEN_PLAN_WINDOW_WEEKLY = "window_weekly";

// usage payload field prefix → window key (fields: per<prefix>Percentage / per<prefix>ResetTime)
const WINDOW_FIELD_MAP: Record<string, string> = {
  "5Hour": QWEN_TOKEN_PLAN_WINDOW_5H,
  "1Week": QWEN_TOKEN_PLAN_WINDOW_WEEKLY,
};

export interface QwenTokenPlanQuota extends QuotaInfo {
  windows: Record<string, { percentUsed: number; resetAt: string | null }>;
  /** Which console served the quota — drives the plan label shown in the dashboard. */
  consoleSite: TokenPlanConsoleSite["consoleSite"];
  /** Subscription tier (e.g. "pro") or null when the subscription call failed. */
  specCode: string | null;
  /** Credit limits of the active tier (from quota-config), when resolvable. */
  tierLimits: { fiveHour: number | null; weekly: number | null };
}

interface UsageCacheEntry {
  quota: QwenTokenPlanQuota;
  fetchedAt: number;
}

interface TierCacheEntry {
  specCode: string | null;
  tierLimits: { fiveHour: number | null; weekly: number | null };
  fetchedAt: number;
}

const usageCache = new Map<string, UsageCacheEntry>();
const tierCache = new Map<string, TierCacheEntry>();
const secTokenCache = new Map<string, { token: string; fetchedAt: number }>();

const _cacheCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of usageCache) {
    if (now - entry.fetchedAt > USAGE_CACHE_TTL_MS * 5) usageCache.delete(key);
  }
  for (const [key, entry] of tierCache) {
    if (now - entry.fetchedAt > TIER_CACHE_TTL_MS * 2) tierCache.delete(key);
  }
  for (const [key, entry] of secTokenCache) {
    if (now - entry.fetchedAt > TIER_CACHE_TTL_MS * 2) secTokenCache.delete(key);
  }
}, 5 * 60_000);

if (typeof _cacheCleanup === "object" && "unref" in _cacheCleanup) {
  (_cacheCleanup as { unref?: () => void }).unref?.();
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function toNumberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function toTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getCookie(providerSpecificData: Record<string, unknown> | undefined): string {
  for (const key of ["qwenCloudCookie", "alibabaConsoleCookie", "cookie"]) {
    const value = toTrimmedString(providerSpecificData?.[key]);
    if (value) return value;
  }
  return process.env.QWEN_CLOUD_COOKIE?.trim() || "";
}

function getConfiguredSecToken(providerSpecificData: Record<string, unknown> | undefined): string {
  for (const key of ["qwenCloudSecToken", "alibabaConsoleSecToken"]) {
    const value = toTrimmedString(providerSpecificData?.[key]);
    if (value) return value;
  }
  return process.env.QWEN_CLOUD_SEC_TOKEN?.trim() || "";
}

function getGatewayHost(site: TokenPlanConsoleSite): string {
  const configured = process.env.QWEN_TOKEN_PLAN_HOST?.trim();
  if (!configured) return site.gatewayHost;
  return /^https?:\/\//i.test(configured) ? configured : `https://${configured}`;
}

function getDashboardUrl(site: TokenPlanConsoleSite): string {
  return process.env.QWEN_TOKEN_PLAN_DASHBOARD_URL?.trim() || site.dashboardUrl;
}

/** Extract the console `SEC_TOKEN: "…"` embedded in the logged-in dashboard HTML. */
export function extractQwenSecToken(html: string): string | null {
  const match = /SEC_?TOKEN["']?\s*[:=]\s*["']([^"']+)["']/i.exec(html);
  return match ? match[1] : null;
}

async function resolveSecToken(
  connectionId: string,
  cookie: string,
  site: TokenPlanConsoleSite
): Promise<string> {
  const cached = secTokenCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < TIER_CACHE_TTL_MS) {
    return cached.token;
  }

  try {
    const response = await fetch(getDashboardUrl(site), {
      method: "GET",
      headers: {
        Cookie: cookie,
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        Accept: "text/html",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8_000),
    });
    const html = await response.text();
    const token = extractQwenSecToken(html);
    if (token) {
      secTokenCache.set(connectionId, { token, fetchedAt: Date.now() });
      return token;
    }
  } catch {
    // best-effort — some accounts work without sec_token
  }
  return "";
}

// ─── Gateway transport ───────────────────────────────────────────────────────

async function callGateway(
  endpoint: string,
  cookie: string,
  secToken: string,
  site: TokenPlanConsoleSite
): Promise<unknown | null> {
  const api = `${TOKEN_PLAN_API_PREFIX}${endpoint}`;
  const url = `${getGatewayHost(site)}/data/api.json?product=${GATEWAY_PRODUCT}&action=${GATEWAY_ACTION}&api=${encodeURIComponent(api)}`;

  const params = JSON.stringify({
    Api: api,
    V: "1.0",
    Data: {
      commodityCode: COMMODITY_CODE,
      cornerstoneParam: {
        console: "ONE_CONSOLE",
        consoleSite: site.consoleSite,
        domain: site.domain,
        productCode: "p_efm",
        protocol: "V2",
        xsp_lang: "en-US",
      },
    },
  });

  const body = new URLSearchParams({
    product: GATEWAY_PRODUCT,
    action: GATEWAY_ACTION,
    sec_token: secToken,
    region: GATEWAY_REGION,
    params,
  });

  try {
    // #6911: space concurrent upstream quota fetches (mirrors bailianQuotaFetcher.ts).
    await throttleQuotaFetch();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
        Origin: site.origin,
        Referer: `${site.origin}/`,
      },
      body: body.toString(),
      signal: AbortSignal.timeout(8_000),
    });

    const raw = await response.json();
    return parseGatewayEnvelope(raw);
  } catch {
    // Network error, timeout, non-JSON (login redirect page) — fail open
    return null;
  }
}

/** Unwrap {code:"200", data:{DataV2:{data:{code:"SUCCESS", data:<payload>}}}} → payload. */
function parseGatewayEnvelope(raw: unknown): unknown | null {
  const obj = toRecord(raw);
  if (obj["code"] !== "200" && obj["code"] !== 200) return null;
  const inner = toRecord(toRecord(toRecord(obj["data"])["DataV2"])["data"]);
  if (inner["code"] !== "SUCCESS" || inner["success"] !== true) return null;
  return inner["data"] ?? null;
}

// ─── Parsers ─────────────────────────────────────────────────────────────────

function parseUsageWindows(
  payload: unknown
): Record<string, { percentUsed: number; resetAt: string | null }> {
  const obj = toRecord(payload);
  const windows: Record<string, { percentUsed: number; resetAt: string | null }> = {};

  for (const [fieldPrefix, windowKey] of Object.entries(WINDOW_FIELD_MAP)) {
    const percent = toNumberOrNull(obj[`per${fieldPrefix}Percentage`]);
    if (percent === null) continue; // window omitted (e.g. 5-hour "Temporarily Removed")
    const resetMs = toNumberOrNull(obj[`per${fieldPrefix}ResetTime`]);
    windows[windowKey] = {
      percentUsed: percent,
      resetAt: resetMs && resetMs > 0 ? new Date(resetMs).toISOString() : null,
    };
  }

  return windows;
}

async function resolveTierInfo(
  connectionId: string,
  cookie: string,
  secToken: string,
  site: TokenPlanConsoleSite
): Promise<TierCacheEntry> {
  const cached = tierCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < TIER_CACHE_TTL_MS) {
    return cached;
  }

  const [quotaConfig, subscription] = await Promise.all([
    callGateway("quota-config", cookie, secToken, site),
    callGateway("subscription", cookie, secToken, site),
  ]);

  const specCode = toTrimmedString(toRecord(subscription)["specCode"]) || null;
  const tierRecord = specCode ? toRecord(toRecord(quotaConfig)[specCode]) : {};
  const entry: TierCacheEntry = {
    specCode,
    tierLimits: {
      fiveHour: toNumberOrNull(tierRecord["five_hour"]),
      weekly: toNumberOrNull(tierRecord["weekly"]),
    },
    fetchedAt: Date.now(),
  };

  tierCache.set(connectionId, entry);
  return entry;
}

// ─── Core fetcher ────────────────────────────────────────────────────────────

/**
 * Fetch the personal Token Plan quota for a qwen-cloud-token-plan connection.
 * Returns percentUsed = max across the windows present in the usage response,
 * or null when no cookie is configured / the console session expired.
 */
export async function fetchQwenTokenPlanQuota(
  connectionId: string,
  connection?: Record<string, unknown>
): Promise<QuotaInfo | null> {
  const cached = usageCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < USAGE_CACHE_TTL_MS) {
    return cached.quota;
  }

  const providerSpecificData =
    connection?.providerSpecificData &&
    typeof connection.providerSpecificData === "object" &&
    !Array.isArray(connection.providerSpecificData)
      ? (connection.providerSpecificData as Record<string, unknown>)
      : undefined;

  const cookie = getCookie(providerSpecificData);
  if (!cookie) return null;

  const site = resolveConsoleSite(
    cookie,
    typeof connection?.provider === "string" ? connection.provider : undefined
  );

  const secToken =
    getConfiguredSecToken(providerSpecificData) ||
    (await resolveSecToken(connectionId, cookie, site));

  const usagePayload = await callGateway("usage", cookie, secToken, site);
  if (usagePayload === null) return null;

  const windows = parseUsageWindows(usagePayload);
  const windowEntries = Object.values(windows);
  if (windowEntries.length === 0) return null;

  const worst = windowEntries.reduce((max, w) => (w.percentUsed > max.percentUsed ? w : max));

  const tier = await resolveTierInfo(connectionId, cookie, secToken, site);
  const total = tier.tierLimits.weekly ?? 100;

  const quota: QwenTokenPlanQuota = {
    used: Math.round(worst.percentUsed * total),
    total,
    percentUsed: worst.percentUsed,
    resetAt: worst.resetAt,
    windows,
    consoleSite: site.consoleSite,
    specCode: tier.specCode,
    tierLimits: tier.tierLimits,
    limitReached: worst.percentUsed >= 1,
  };

  usageCache.set(connectionId, { quota, fetchedAt: Date.now() });
  return quota;
}

// ─── Invalidation ────────────────────────────────────────────────────────────

export function invalidateQwenTokenPlanQuotaCache(connectionId: string): void {
  usageCache.delete(connectionId);
  tierCache.delete(connectionId);
  secTokenCache.delete(connectionId);
}

// ─── Registration ────────────────────────────────────────────────────────────

/**
 * Register the Qwen Token Plan quota fetcher with the preflight and monitor systems.
 * Call once at server startup (src/sse/handlers/chat.ts), BEFORE registerGenericQuotaFetchers().
 */
export function registerQwenTokenPlanQuotaFetcher(): void {
  registerQuotaFetcher("qwen-cloud-token-plan", fetchQwenTokenPlanQuota);
  registerMonitorFetcher("qwen-cloud-token-plan", fetchQwenTokenPlanQuota);
  registerQuotaWindows("qwen-cloud-token-plan", [
    QWEN_TOKEN_PLAN_WINDOW_5H,
    QWEN_TOKEN_PLAN_WINDOW_WEEKLY,
  ]);
}
