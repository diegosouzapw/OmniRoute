/**
 * grokQuotaFetcher.ts — Grok Web Weekly Quota Fetcher
 *
 * Implements QuotaFetcher for the grok-web provider (grok.com SSO/cookie
 * connections). Since grok-web uses cookie auth rather than an accessToken
 * stored in the provider connection, this fetcher reads the account-level
 * OIDC tokens from the local Grok CLI (~/.grok/auth.json) and calls the
 * same billing API that powers the grok CLI /usage command and third-party
 * quota widgets (pi-grok-usage, hermes-grok-usage).
 *
 * The billing endpoint returns a single weekly credit-usage percentage
 * that covers all Grok products (Chat, Build, Imagine, API) under the
 * SuperGrok / X Premium+ unified weekly pool.
 *
 * Registration: call registerGrokWebQuotaFetcher() once at server startup,
 * before registerGenericQuotaFetchers() — because the generic path doesn't
 * know how to resolve grok OIDC auth from a cookie-based connection.
 */

import { registerQuotaFetcher, registerQuotaWindows, type QuotaInfo } from "./quotaPreflight.ts";
import { registerMonitorFetcher } from "./quotaMonitor.ts";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

// ─── Constants ───────────────────────────────────────────────────────────────

const BILLING_URL = "https://cli-chat-proxy.grok.com/v1/billing?format=credits";
const DEFAULT_ISSUER = "https://auth.x.ai";
const FETCH_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes — matches grok-web rate limit cooldown
const REQUEST_TIMEOUT_MS = 10_000;
const EXPIRY_SKEW_MS = 60_000; // refresh a bit before actual expiry
/**
 * Resolve the Grok auth.json path.
 * Controlled by the GROK_AUTH_PATH env var for testing; defaults to ~/.grok/auth.json.
 */
function getAuthPath(): string {
  const override = (process.env.GROK_AUTH_PATH || "").trim();
  return override || join(homedir(), ".grok", "auth.json");
}

/**
 * Stable window identifier for the grok-web weekly quota.
 * Surfaced in the dashboard as "Weekly" under provider limits.
 */
export const GROK_WINDOW_WEEKLY = "weekly";

// ─── Types ───────────────────────────────────────────────────────────────────

interface GrokAuthEntry {
  key?: string;
  refresh_token?: string;
  expires_at?: string;
  email?: string;
  auth_mode?: string;
  oidc_issuer?: string;
  oidc_client_id?: string;
}

interface ResolvedAuth {
  entryId: string;
  token: string;
  refreshToken?: string;
  email?: string;
  expiresAtMs?: number;
  issuer: string;
  clientId?: string;
}

interface BillingConfig {
  currentPeriod?: {
    type?: string;
    start?: string;
    end?: string;
  };
  creditUsagePercent?: number;
  onDemandCap?: { val?: number };
  onDemandUsed?: { val?: number };
  prepaidBalance?: { val?: number };
  productUsage?: Array<{ product?: string; usagePercent?: number }>;
  isUnifiedBillingUser?: boolean;
  billingPeriodStart?: string;
  billingPeriodEnd?: string;
}

interface BillingResponse {
  config?: BillingConfig;
}

interface UsageSnapshot {
  percent: number;
  periodLabel: string;
  resetLabel: string;
  endIso?: string;
  email?: string;
  products: Array<{ product: string; usagePercent?: number }>;
  onDemandUsed: number;
  onDemandCap: number;
  prepaidBalance: number;
  fetchedAt: number;
}

// ─── In-memory cache (per-connection, keyed by connectionId) ─────────────────

interface CacheEntry {
  quota: QuotaInfo | null;
  error: string | null;
  fetchedAt: number;
}

const quotaCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 60_000; // 60 seconds — matches codexQuotaFetcher

const _cacheCleanup = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of quotaCache) {
    if (now - entry.fetchedAt > CACHE_TTL_MS * 5) {
      quotaCache.delete(key);
    }
  }
}, 5 * 60_000);

if (typeof _cacheCleanup === "object" && "unref" in _cacheCleanup) {
  (_cacheCleanup as { unref?: () => void }).unref?.();
}

// ─── Auth helpers (mirrors pi-grok-usage / hermes-grok-usage patterns) ────────

function isAllowedXaiUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && (url.hostname === "x.ai" || url.hostname.endsWith(".x.ai"));
  } catch {
    return false;
  }
}

function readAuthFile(): Record<string, GrokAuthEntry> | null {
  if (!existsSync(getAuthPath())) return null;
  try {
    const raw = JSON.parse(readFileSync(getAuthPath(), "utf8")) as Record<string, GrokAuthEntry>;
    if (!raw || typeof raw !== "object") return null;
    return raw;
  } catch {
    return null;
  }
}

function pickAuthEntry(file: Record<string, GrokAuthEntry>): ResolvedAuth | null {
  const now = Date.now();
  const scored = Object.entries(file)
    .map(([entryId, e]) => {
      const token = typeof e?.key === "string" ? e.key.trim() : "";
      const exp = e?.expires_at ? Date.parse(e.expires_at) : Number.POSITIVE_INFINITY;
      const expired = Number.isFinite(exp) ? exp <= now + EXPIRY_SKEW_MS : false;
      const hasRefresh = typeof e?.refresh_token === "string" && e.refresh_token.length > 0;
      return { entryId, e, token, exp, expired, hasRefresh };
    })
    .filter((x) => x.token.length > 0 || x.hasRefresh);

  if (scored.length === 0) return null;

  scored.sort((a, b) => {
    if (a.expired !== b.expired) return a.expired ? 1 : -1;
    if (a.hasRefresh !== b.hasRefresh) return a.hasRefresh ? -1 : 1;
    return b.exp - a.exp;
  });

  const best = scored[0];
  const issuer = (best.e.oidc_issuer || DEFAULT_ISSUER).replace(/\/$/, "");
  return {
    entryId: best.entryId,
    token: best.token,
    refreshToken: best.e.refresh_token?.trim() || undefined,
    email: best.e.email,
    expiresAtMs: Number.isFinite(best.exp) ? best.exp : undefined,
    issuer,
    clientId: best.e.oidc_client_id?.trim() || undefined,
  };
}

function writeRefreshedTokens(
  entryId: string,
  update: { access: string; refresh?: string; expiresAtIso: string },
): void {
  const file = readAuthFile();
  if (!file || !file[entryId]) return;
  file[entryId] = {
    ...file[entryId],
    key: update.access,
    ...(update.refresh ? { refresh_token: update.refresh } : {}),
    expires_at: update.expiresAtIso,
  };
  try {
    writeFileSync(getAuthPath(), `${JSON.stringify(file, null, 2)}\n`, { encoding: "utf8" });
  } catch {
    // Non-fatal: token is still valid in-memory this session
  }
}

async function discoverTokenEndpoint(issuer: string, signal: AbortSignal): Promise<string> {
  const discoveryUrl = `${issuer.replace(/\/$/, "")}/.well-known/openid-configuration`;
  if (!isAllowedXaiUrl(discoveryUrl)) {
    throw new Error("invalid oidc issuer");
  }
  const res = await fetch(discoveryUrl, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!res.ok) throw new Error(`token refresh failed (discovery HTTP ${res.status})`);
  const json = (await res.json()) as { token_endpoint?: string };
  const endpoint = String(json.token_endpoint || "");
  if (!isAllowedXaiUrl(endpoint)) throw new Error("invalid token endpoint");
  return endpoint;
}

async function refreshAccessToken(auth: ResolvedAuth, signal: AbortSignal): Promise<ResolvedAuth> {
  if (!auth.refreshToken) {
    throw new Error("auth expired — run `grok login`");
  }
  if (!auth.clientId) {
    throw new Error("auth missing client id — run `grok login`");
  }

  const tokenEndpoint = await discoverTokenEndpoint(auth.issuer, signal);
  const res = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "User-Agent": "omniroute-grok-usage/1.0",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      client_id: auth.clientId,
      refresh_token: auth.refreshToken,
    }).toString(),
    signal,
  });

  if (!res.ok) {
    throw new Error(`token refresh failed (HTTP ${res.status})`);
  }

  const payload = (await res.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  };

  const access = String(payload.access_token || "").trim();
  if (!access) throw new Error("token refresh failed (empty access token)");

  const expiresInSec = Number(payload.expires_in || 3600);
  const expiresAtMs = Date.now() + Math.max(60, expiresInSec) * 1000;
  const expiresAtIso = new Date(expiresAtMs).toISOString();
  const refresh = String(payload.refresh_token || auth.refreshToken).trim();

  try {
    writeRefreshedTokens(auth.entryId, {
      access,
      refresh,
      expiresAtIso,
    });
  } catch {
    // Non-fatal
  }

  return {
    ...auth,
    token: access,
    refreshToken: refresh,
    expiresAtMs,
  };
}

function needsRefresh(auth: ResolvedAuth): boolean {
  if (!auth.token) return true;
  if (auth.expiresAtMs == null) return false;
  return auth.expiresAtMs <= Date.now() + EXPIRY_SKEW_MS;
}

async function resolveAuth(signal: AbortSignal): Promise<ResolvedAuth> {
  const file = readAuthFile();
  if (!file) throw new Error("no grok auth — run `grok login`");
  const auth = pickAuthEntry(file);
  if (!auth) throw new Error("no usable Grok credentials — run `grok login`");
  if (needsRefresh(auth)) {
    return refreshAccessToken(auth, signal);
  }
  return auth;
}

// ─── Billing fetch ───────────────────────────────────────────────────────────

function periodShort(type?: string): string {
  if (!type) return "";
  if (type.includes("WEEKLY")) return "weekly";
  if (type.includes("MONTHLY")) return "monthly";
  if (type.includes("DAILY")) return "daily";
  return "period";
}

function resetLocalLabel(endIso?: string): string {
  if (!endIso) return "";
  const end = new Date(endIso);
  if (Number.isNaN(end.getTime())) return "";
  const weekday = end.toLocaleDateString(undefined, { weekday: "short" });
  const hour = end.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${weekday} ${hour.replace(/^24:/, "00:")}`;
}

async function fetchBilling(token: string, signal: AbortSignal): Promise<UsageSnapshot> {
  const res = await fetch(BILLING_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "User-Agent": "omniroute-grok-usage/1.0",
      "x-grok-client-mode": "cli",
    },
    signal,
  });

  if (res.status === 401 || res.status === 403) {
    throw new Error(`auth ${res.status}`);
  }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = (await res.json()) as BillingResponse;
  const cfg = data.config ?? {};
  const percent = Number(cfg.creditUsagePercent ?? 0);
  const endIso = cfg.currentPeriod?.end ?? cfg.billingPeriodEnd;
  const products = (cfg.productUsage ?? [])
    .filter((p) => p.product)
    .map((p) => ({ product: String(p.product), usagePercent: p.usagePercent }));

  return {
    percent: Number.isFinite(percent) ? percent : 0,
    periodLabel: periodShort(cfg.currentPeriod?.type),
    resetLabel: resetLocalLabel(endIso),
    endIso,
    products,
    onDemandUsed: Number(cfg.onDemandUsed?.val ?? 0),
    onDemandCap: Number(cfg.onDemandCap?.val ?? 0),
    prepaidBalance: Number(cfg.prepaidBalance?.val ?? 0),
    fetchedAt: Date.now(),
  };
}

// ─── Core Fetcher ────────────────────────────────────────────────────────────

/**
 * Convert a UsageSnapshot into the preflight QuotaInfo contract.
 * Grok has a single weekly window; percentUsed = creditUsagePercent / 100.
 * The resetAt comes from currentPeriod.end.
 */
function snapshotToQuotaInfo(snap: UsageSnapshot): QuotaInfo {
  const percentUsed = Math.max(0, Math.min(1, snap.percent / 100));
  return {
    used: Math.round(snap.percent),
    total: 100,
    percentUsed,
    resetAt: snap.endIso ?? null,
    windows: {
      [GROK_WINDOW_WEEKLY]: {
        percentUsed,
        resetAt: snap.endIso ?? null,
      },
    },
  };
}

/**
 * Fetch current weekly quota for a grok-web connection.
 *
 * Unlike most provider fetchers, this does NOT use the connection's stored
 * accessToken/cookie — instead it reads the local Grok CLI OIDC tokens
 * (~/.grok/auth.json) which represent the same xAI account. This is because
 * grok-web uses cookie auth (SSO) but the billing endpoint requires a Bearer
 * token, and both auth paths share the same underlying account.
 *
 * If no local Grok CLI auth is found, returns null (fail-open — don't block
 * grok-web requests on missing quota data).
 *
 * @param connectionId - Connection ID from the DB (used as cache key)
 * @param _connection - Ignored for grok-web; auth is resolved from local CLI
 * @returns QuotaInfo with a single "weekly" window, or null
 */
export async function fetchGrokWebQuota(
  connectionId: string,
  _connection?: Record<string, unknown>,
): Promise<QuotaInfo | null> {
  // Check cache first
  const cached = quotaCache.get(connectionId);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached.quota;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      let auth: ResolvedAuth;
      try {
        auth = await resolveAuth(controller.signal);
      } catch {
        // No local grok auth — fail open
        quotaCache.set(connectionId, { quota: null, error: null, fetchedAt: Date.now() });
        return null;
      }

      try {
        const snap = await fetchBilling(auth.token, controller.signal);
        const quota = snapshotToQuotaInfo(snap);
        quotaCache.set(connectionId, { quota, error: null, fetchedAt: Date.now() });
        return quota;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "";
        // One retry with token refresh on auth errors
        if (msg.startsWith("auth ") && auth.refreshToken) {
          auth = await refreshAccessToken(auth, controller.signal);
          const snap = await fetchBilling(auth.token, controller.signal);
          const quota = snapshotToQuotaInfo(snap);
          quotaCache.set(connectionId, { quota, error: null, fetchedAt: Date.now() });
          return quota;
        }
        // Non-auth error — fail open
        quotaCache.set(connectionId, { quota: null, error: msg, fetchedAt: Date.now() });
        return null;
      }
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    quotaCache.set(connectionId, { quota: null, error: null, fetchedAt: Date.now() });
    return null;
  }
}

// ─── Invalidation ────────────────────────────────────────────────────────────

/**
 * Force-invalidate the cache for a connection.
 */
export function invalidateGrokWebQuotaCache(connectionId: string): void {
  quotaCache.delete(connectionId);
}

// ─── Registration ────────────────────────────────────────────────────────────

/**
 * Register the grok-web quota fetcher with the preflight and monitor systems.
 * Call this once at server startup (in chat.ts), before registerGenericQuotaFetchers()
 * so the generic path doesn't try to override this bespoke fetcher.
 */
export function registerGrokWebQuotaFetcher(): void {
  registerQuotaFetcher("grok-web", fetchGrokWebQuota);
  registerMonitorFetcher("grok-web", fetchGrokWebQuota);
  registerQuotaWindows("grok-web", [GROK_WINDOW_WEEKLY]);
}
