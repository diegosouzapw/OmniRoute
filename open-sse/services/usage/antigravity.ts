/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import {
  getAntigravityFetchAvailableModelsUrls,
  ANTIGRAVITY_BASE_URLS,
} from "../../config/antigravityUpstream.ts";

import {
  isUserCallableAntigravityModelId,
  toClientAntigravityModelId,
} from "../../config/antigravityModelAliases.ts";

import { isUserCallableAgyModelId } from "../../config/agyModels.ts";

import { getDbInstance } from "@/lib/db/core";

import {
  applyAntigravityClientProfileHeaders,
  getAntigravityBootstrapHeaders,
  getAntigravityClientProfile,
} from "../antigravityClientProfile.ts";

import {
  antigravityUserAgent,
  getAntigravityHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "../antigravityHeaders.ts";

import {
  getAntigravityRemainingCredits,
  updateAntigravityRemainingCredits,
} from "../../executors/antigravity.ts";

import { getCreditsMode } from "../antigravityCredits.ts";

import { generateAntigravityRequestId, getAntigravitySessionId } from "../antigravityIdentity.ts";

import {
  extractCodeAssistOnboardTierId,
  extractCodeAssistSubscriptionTier,
} from "../codeAssistSubscription.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { SubscriptionCacheEntry, UsageQuota, AntigravityUsageOptions, JsonRecord } from "./types.ts";
import { _geminiCliSubCache, GEMINI_CLI_CACHE_TTL_MS } from "./gemini.ts";
import { ANTIGRAVITY_CONFIG } from "./constants.ts";
import { toRecord, getFieldValue, toNumber, parseResetTime } from "./utils.ts";



// ── Antigravity subscription info cache ──────────────────────────────────────
// Prevents duplicate loadCodeAssist calls within the same quota cycle.
// Key: truncated accessToken → { data, fetchedAt }
const _antigravitySubCache = new Map<string, SubscriptionCacheEntry>();


const ANTIGRAVITY_CACHE_TTL_MS = 5 * 60 * 1000;

 // 5 minutes
const ANTIGRAVITY_MODELS_CACHE_TTL_MS = 60 * 1000;


const ANTIGRAVITY_CREDIT_PROBE_TTL_MS = 5 * 60 * 1000;


const _antigravityAvailableModelsCache = new Map<string, { data: unknown; fetchedAt: number }>();


const _antigravityAvailableModelsInflight = new Map<string, Promise<unknown>>();


const _antigravityUserQuotaCache = new Map<string, { data: unknown; fetchedAt: number }>();


const _antigravityUserQuotaInflight = new Map<string, Promise<unknown>>();


const _antigravityCreditProbeCache = new Map<string, { data: number | null; fetchedAt: number }>();


const _antigravityCreditProbeInflight = new Map<string, Promise<number | null>>();



// ── Proactive TTL purging for module-level caches ──────────────────────────
// All 4 data caches only evict on read (passive TTL). This interval proactively
// purges stale entries so keys accessed once and never again don't leak memory.
// The 2 inflight Maps (availableModelsInflight, creditProbeInflight) self-clean
// when the Promise resolves/rejects, so they are NOT touched here.
const _usageCacheCleanupTimer = setInterval(
  () => {
    const now = Date.now();
    for (const [key, entry] of _geminiCliSubCache) {
      if (now - entry.fetchedAt > GEMINI_CLI_CACHE_TTL_MS) _geminiCliSubCache.delete(key);
    }
    for (const [key, entry] of _antigravitySubCache) {
      if (now - entry.fetchedAt > ANTIGRAVITY_CACHE_TTL_MS) _antigravitySubCache.delete(key);
    }
    for (const [key, entry] of _antigravityAvailableModelsCache) {
      if (now - entry.fetchedAt > ANTIGRAVITY_MODELS_CACHE_TTL_MS)
        _antigravityAvailableModelsCache.delete(key);
    }
    for (const [key, entry] of _antigravityUserQuotaCache) {
      if (now - entry.fetchedAt > ANTIGRAVITY_MODELS_CACHE_TTL_MS)
        _antigravityUserQuotaCache.delete(key);
    }
    for (const [key, entry] of _antigravityCreditProbeCache) {
      if (now - entry.fetchedAt > ANTIGRAVITY_CREDIT_PROBE_TTL_MS)
        _antigravityCreditProbeCache.delete(key);
    }
  },
  5 * 60 * 1000
);

 // every 5 minutes
_usageCacheCleanupTimer.unref?.();



const ANTIGRAVITY_LOCAL_USAGE_WINDOW_MS = 5 * 60 * 60 * 1000;


const ANTIGRAVITY_LOCAL_USAGE_TOKENS_PER_UNIT = 1000;



const ANTIGRAVITY_QUOTA_MODEL_ALIASES: Record<string, string | null> = {
  "gemini-3.5-flash-preview": null,
  "gemini-3-flash-preview": null,
};



function normalizeAntigravityQuotaModelId(modelId: string): string | null {
  if (!modelId) return null;
  return Object.prototype.hasOwnProperty.call(ANTIGRAVITY_QUOTA_MODEL_ALIASES, modelId)
    ? ANTIGRAVITY_QUOTA_MODEL_ALIASES[modelId]
    : modelId;
}



function toClientAntigravityQuotaModelId(modelId: string): string | null {
  if (!modelId) return null;
  if (normalizeAntigravityQuotaModelId(modelId) === null) return null;
  if (modelId === "gemini-3.5-flash-extra-low") return "gemini-3.5-flash-low";
  if (modelId === "gemini-3.5-flash-low") return "gemini-3.5-flash-medium";
  if (modelId === "gemini-3-flash-agent") return "gemini-3.5-flash-high";
  return toClientAntigravityModelId(modelId);
}



function getAntigravityLocalUsageUnits(
  provider: "antigravity" | "agy",
  connectionId: string | undefined,
  modelId: string,
  resetAt: string | null
): number {
  if (!connectionId || !modelId || !resetAt) return 0;

  const resetMs = Date.parse(resetAt);
  if (!Number.isFinite(resetMs)) return 0;

  const windowStart = new Date(resetMs - ANTIGRAVITY_LOCAL_USAGE_WINDOW_MS).toISOString();
  const windowEnd = new Date(resetMs).toISOString();

  try {
    const db = getDbInstance() as unknown as {
      prepare: (sql: string) => { get: (...params: unknown[]) => unknown };
    };
    const row = db
      .prepare(
        `SELECT COALESCE(SUM(
           COALESCE(tokens_input, 0) + COALESCE(tokens_output, 0) + COALESCE(tokens_reasoning, 0)
         ), 0) AS tokens
         FROM usage_history
         WHERE provider = ?
           AND connection_id = ?
           AND model = ?
           AND success = 1
           AND timestamp >= ?
           AND timestamp < ?`
      )
      .get(provider, connectionId, modelId, windowStart, windowEnd) as
      | { tokens?: unknown }
      | undefined;

    const tokens = Number(row?.tokens || 0);
    if (!Number.isFinite(tokens) || tokens <= 0) return 0;
    return Math.max(1, Math.ceil(tokens / ANTIGRAVITY_LOCAL_USAGE_TOKENS_PER_UNIT));
  } catch {
    return 0;
  }
}



function applyLocalUsageFallback(
  quota: UsageQuota,
  provider: "antigravity" | "agy",
  connectionId: string | undefined,
  modelId: string
): UsageQuota {
  if (quota.quotaSource !== "fetchAvailableModels" || quota.used > 0 || quota.unlimited) {
    return quota;
  }

  const localUsed = getAntigravityLocalUsageUnits(provider, connectionId, modelId, quota.resetAt);
  if (localUsed <= 0 || quota.total <= 0) return quota;

  const used = Math.min(quota.total, localUsed);
  return {
    ...quota,
    used,
    remainingPercentage: Math.max(0, ((quota.total - used) / quota.total) * 100),
    quotaSource: "localUsageHistory",
  };
}



function buildAntigravityUsageCacheKey(accessToken: string, projectId?: string | null): string {
  return `${accessToken.substring(0, 16)}:${projectId || "default"}`;
}



async function fetchAntigravityAvailableModelsCached(
  accessToken: string,
  projectId?: string | null,
  options: AntigravityUsageOptions = {}
): Promise<unknown> {
  if (!accessToken) throw new Error("Access token is required");

  const cacheKey = buildAntigravityUsageCacheKey(accessToken, projectId);
  const cached = _antigravityAvailableModelsCache.get(cacheKey);
  if (
    !options.forceRefresh &&
    cached &&
    Date.now() - cached.fetchedAt < ANTIGRAVITY_MODELS_CACHE_TTL_MS
  ) {
    return cached.data;
  }

  const inflight = _antigravityAvailableModelsInflight.get(cacheKey);
  if (inflight) return inflight;

  const promise = (async () => {
    let response: Response | null = null;
    let lastError: Error | null = null;

    for (const quotaApiUrl of ANTIGRAVITY_CONFIG.quotaApiUrls) {
      try {
        response = await fetch(quotaApiUrl, {
          method: "POST",
          headers: getAntigravityHeaders("fetchAvailableModels", accessToken),
          body: JSON.stringify(projectId ? { project: projectId } : {}),
          signal: AbortSignal.timeout(10000),
        });

        if (response.ok || response.status === 401 || response.status === 403) {
          break;
        }
      } catch (error) {
        lastError = error as Error;
      }
    }

    if (!response) {
      throw lastError || new Error("Antigravity API unavailable");
    }

    if (response.status === 403) {
      return { __antigravityForbidden: true };
    }

    if (!response.ok) {
      throw new Error(`Antigravity API error: ${response.status}`);
    }

    const data = await response.json();
    _antigravityAvailableModelsCache.set(cacheKey, { data, fetchedAt: Date.now() });
    return data;
  })().finally(() => {
    _antigravityAvailableModelsInflight.delete(cacheKey);
  });

  _antigravityAvailableModelsInflight.set(cacheKey, promise);
  return promise;
}



async function fetchAntigravityUserQuotaCached(
  accessToken: string,
  projectId?: string | null,
  options: AntigravityUsageOptions = {}
): Promise<unknown | null> {
  if (!accessToken || !projectId) return null;

  const cacheKey = buildAntigravityUsageCacheKey(accessToken, projectId);
  const cached = _antigravityUserQuotaCache.get(cacheKey);
  if (
    !options.forceRefresh &&
    cached &&
    Date.now() - cached.fetchedAt < ANTIGRAVITY_MODELS_CACHE_TTL_MS
  ) {
    return cached.data;
  }

  const inflight = _antigravityUserQuotaInflight.get(cacheKey);
  if (inflight) return inflight;

  const promise = (async () => {
    try {
      const response = await fetch(
        "https://cloudcode-pa.googleapis.com/v1internal:retrieveUserQuota",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ project: projectId }),
          signal: AbortSignal.timeout(10000),
        }
      );

      if (!response.ok) return null;

      const data = await response.json();
      _antigravityUserQuotaCache.set(cacheKey, { data, fetchedAt: Date.now() });
      return data;
    } catch {
      return null;
    }
  })().finally(() => {
    _antigravityUserQuotaInflight.delete(cacheKey);
  });

  _antigravityUserQuotaInflight.set(cacheKey, promise);
  return promise;
}



function extractCodeAssistTierId(subscription: JsonRecord): string {
  const tierId = extractCodeAssistOnboardTierId(subscription);
  if (tierId === "legacy-tier") return "";
  const upper = tierId.toUpperCase();
  return mapCodeAssistTierIdToLabel(upper) ? upper : "";
}



export function mapCodeAssistTierIdToLabel(tierId: string): string | null {
  const upper = tierId.toUpperCase();
  if (upper.includes("ULTRA")) return "Ultra";
  if (
    upper.includes("PRO") ||
    upper.includes("PREMIUM") ||
    upper.includes("GOOGLE_ONE") ||
    upper.includes("ONE_AI")
  )
    return "Pro";
  if (upper.includes("ENTERPRISE")) return "Enterprise";
  if (upper.includes("BUSINESS") || upper.includes("STANDARD")) return "Business";
  if (upper.includes("PLUS")) return "Plus";
  if (upper.includes("LITE") || upper.includes("LIGHT")) return "Lite";
  if (upper.includes("FREE") || upper.includes("INDIVIDUAL") || upper.includes("LEGACY"))
    return "Free";
  return null;
}



export function mapSubscriptionTierStringToPlanLabel(tierText: string): string | null {
  const upper = tierText.toUpperCase();
  if (upper.includes("ULTRA")) return "Ultra";
  if (upper.includes("PRO") || upper.includes("PREMIUM") || upper.includes("GOOGLE ONE"))
    return "Pro";
  if (upper.includes("ENTERPRISE")) return "Enterprise";
  if (upper.includes("STANDARD") || upper.includes("BUSINESS")) return "Business";
  if (upper.includes("PLUS")) return "Plus";
  if (upper.includes("LITE")) return "Lite";
  if (upper.includes("INDIVIDUAL") || upper.includes("FREE")) return "Free";
  // Strip a trailing "(RESTRICTED)" marker. Match the fixed literal anywhere then
  // trim, instead of /\s*\(RESTRICTED\)\s*$/ whose overlapping \s* runs backtrack
  // polynomially on whitespace-heavy upstream input (js/polynomial-redos).
  const normalizedId = upper.replace(/\(RESTRICTED\)/i, "").trim();
  if (normalizedId) {
    const mapped = mapCodeAssistTierIdToLabel(normalizedId);
    if (mapped) return mapped;
  }
  return null;
}



export function mapCodeAssistSubscriptionToPlanLabel(subscriptionInfo: unknown): string {
  const subscription = toRecord(subscriptionInfo);
  if (Object.keys(subscription).length === 0) return "Free";

  const subscriptionTier = extractCodeAssistSubscriptionTier(subscriptionInfo);
  if (subscriptionTier) {
    const mapped = mapSubscriptionTierStringToPlanLabel(subscriptionTier);
    if (mapped) return mapped;
    if (subscriptionTier.toLowerCase() !== "free") {
      return subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1).toLowerCase();
    }
  }

  const currentTier = toRecord(subscription.currentTier);
  const tierName = String(
    getFieldValue(currentTier, "name", "displayName") ||
      subscription.subscriptionType ||
      subscription.tier ||
      ""
  );
  const mappedName = tierName ? mapSubscriptionTierStringToPlanLabel(tierName) : null;
  if (mappedName) return mappedName;

  const tierId = extractCodeAssistTierId(subscription);
  if (tierId) {
    const mapped = mapCodeAssistTierIdToLabel(tierId);
    if (mapped) return mapped;
  }
  if (currentTier.upgradeSubscriptionType) return "Free";
  if (tierName) return tierName.charAt(0).toUpperCase() + tierName.slice(1).toLowerCase();
  return "Free";
}



const KNOWN_ANTIGRAVITY_PLAN_LABELS = new Set([
  "Ultra",
  "Pro",
  "Enterprise",
  "Business",
  "Plus",
  "Lite",
]);



/**
 * Map raw loadCodeAssist tier data to short display labels (Antigravity Manager parity).
 */
export function getAntigravityPlanLabel(subscriptionInfo: unknown, fallbackInfo?: unknown): string {
  const livePlan = mapCodeAssistSubscriptionToPlanLabel(subscriptionInfo);
  const fallbackPlan = mapCodeAssistSubscriptionToPlanLabel(fallbackInfo);

  if (KNOWN_ANTIGRAVITY_PLAN_LABELS.has(livePlan)) return livePlan;
  if (KNOWN_ANTIGRAVITY_PLAN_LABELS.has(fallbackPlan)) return fallbackPlan;
  if (livePlan !== "Free") return livePlan;
  return fallbackPlan !== "Free" ? fallbackPlan : livePlan;
}



/**
 * Proactive credit balance probe for Antigravity.
 *
 * Fires a minimal streamGenerateContent request with GOOGLE_ONE_AI credits enabled
 * and maxOutputTokens=1 to extract the `remainingCredits` field from the SSE stream.
 * This uses ~1 credit but lets us show the balance on the dashboard without waiting
 * for a real user request.
 *
 * Returns the credit balance, or null if the probe failed.
 */
async function probeAntigravityCreditBalance(
  accessToken: string,
  accountId: string,
  projectId?: string | null,
  options: AntigravityUsageOptions = {},
  providerSpecificData: JsonRecord = {}
): Promise<number | null> {
  if (!accessToken) return null;

  const cacheKey = buildAntigravityUsageCacheKey(accessToken, projectId || accountId);
  const cached = _antigravityCreditProbeCache.get(cacheKey);
  if (
    !options.forceRefresh &&
    cached &&
    Date.now() - cached.fetchedAt < ANTIGRAVITY_CREDIT_PROBE_TTL_MS
  ) {
    return cached.data;
  }

  const inflight = _antigravityCreditProbeInflight.get(cacheKey);
  if (inflight) return inflight;

  const promise = probeAntigravityCreditBalanceUncached(
    accessToken,
    accountId,
    projectId,
    providerSpecificData
  )
    .then(
      (data) => {
        _antigravityCreditProbeCache.set(cacheKey, { data, fetchedAt: Date.now() });
        return data;
      },
      (error) => {
        _antigravityCreditProbeCache.set(cacheKey, { data: null, fetchedAt: Date.now() });
        throw error;
      }
    )
    .finally(() => {
      _antigravityCreditProbeInflight.delete(cacheKey);
    });

  _antigravityCreditProbeInflight.set(cacheKey, promise);
  return promise;
}



async function probeAntigravityCreditBalanceUncached(
  accessToken: string,
  accountId: string,
  projectId?: string | null,
  providerSpecificData: JsonRecord = {}
): Promise<number | null> {
  try {
    if (!projectId) return null;

    // Try all base URLs (some accounts only work with specific endpoints)
    for (const baseUrl of ANTIGRAVITY_BASE_URLS) {
      const url = `${baseUrl}/v1internal:streamGenerateContent?alt=sse`;

      const sessionId = getAntigravitySessionId({ connectionId: accountId, projectId });
      const body = {
        project: projectId,
        model: "gemini-2-flash",
        userAgent: "antigravity",
        requestType: "agent",
        requestId: generateAntigravityRequestId(),
        enabledCreditTypes: ["GOOGLE_ONE_AI"],
        request: {
          model: "gemini-2-flash",
          contents: [{ role: "user", parts: [{ text: "hi" }] }],
          generationConfig: { maxOutputTokens: 1 },
          sessionId,
        },
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        Accept: "text/event-stream",
      };
      applyAntigravityClientProfileHeaders(
        headers,
        { connectionId: accountId, projectId, providerSpecificData },
        body
      );

      try {
        const res = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(10_000),
        });

        if (!res.ok) continue;

        // Read the full SSE response and scan for remainingCredits
        const rawSSE = await res.text();
        const lines = rawSSE.split("\n");

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") break;
          try {
            const parsed = JSON.parse(payload);
            if (Array.isArray(parsed?.remainingCredits)) {
              const googleCredit = parsed.remainingCredits.find(
                (c: { creditType?: string }) => c?.creditType === "GOOGLE_ONE_AI"
              );
              if (googleCredit) {
                const balance = parseInt(googleCredit.creditAmount, 10);
                if (!isNaN(balance)) {
                  updateAntigravityRemainingCredits(accountId, balance);
                  return balance;
                }
              }
            }
          } catch {
            // Skip malformed SSE lines
          }
        }
      } catch {
        // Individual endpoint failure; try next
      }
    }

    return null;
  } catch {
    // Probe is best-effort — don't let it break the usage fetch
    return null;
  }
}



/**
 * Antigravity Usage - Fetch quota from Google Cloud Code API.
 * fetchAvailableModels is catalog/eligibility data and may keep reporting full buckets
 * after real usage. retrieveUserQuota is the consumption signal for Gemini-family
 * buckets, so prefer it when present and fall back to fetchAvailableModels only for
 * models that have no retrieveUserQuota entry (for example Claude/GPT OSS buckets).
 */
export async function getAntigravityUsage(
  provider: "antigravity" | "agy",
  accessToken?: string,
  providerSpecificData?: JsonRecord,
  connectionProjectId?: string,
  connectionId?: string,
  options: AntigravityUsageOptions = {}
) {
  if (!accessToken) {
    return { plan: "Free", message: "Antigravity access token not available." };
  }

  let subscriptionInfo: unknown = null;
  try {
    subscriptionInfo = await getAntigravitySubscriptionInfoCached(
      accessToken,
      providerSpecificData,
      options
    );
    const savedProjectId =
      typeof providerSpecificData?.projectId === "string" && providerSpecificData.projectId.trim()
        ? providerSpecificData.projectId.trim()
        : null;
    const subscriptionProject = toRecord(subscriptionInfo).cloudaicompanionProject;
    const projectId =
      savedProjectId ||
      connectionProjectId ||
      (typeof subscriptionProject === "string"
        ? subscriptionProject
        : typeof toRecord(subscriptionProject).id === "string"
          ? (toRecord(subscriptionProject).id as string)
          : null);

    // Derive accountId for credit balance cache.
    // Must match executor key: credentials.connectionId
    const accountId: string = connectionId || "unknown";

    // Read cached credit balance (hydrated from DB on first access)
    let creditBalance = getAntigravityRemainingCredits(accountId);

    // If no cached balance and credits mode is enabled, fire a minimal probe
    const creditsMode = getCreditsMode();
    if ((options.forceRefresh || creditBalance === null) && creditsMode !== "off") {
      creditBalance = await probeAntigravityCreditBalance(
        accessToken,
        accountId,
        projectId,
        options,
        providerSpecificData || {}
      );
    }

    const [data, userQuotaData] = await Promise.all([
      fetchAntigravityAvailableModelsCached(accessToken, projectId, options),
      fetchAntigravityUserQuotaCached(accessToken, projectId, options),
    ]);
    const dataObj = toRecord(data);
    if (dataObj.__antigravityForbidden === true) {
      return { message: "Antigravity access forbidden. Check subscription." };
    }
    const modelEntries = toRecord(dataObj.models);
    const userQuotaEntries = new Map<string, JsonRecord>();
    const userQuotaObj = toRecord(userQuotaData);
    if (Array.isArray(userQuotaObj.buckets)) {
      for (const bucketValue of userQuotaObj.buckets) {
        const bucket = toRecord(bucketValue);
        const modelId = toClientAntigravityQuotaModelId(String(bucket.modelId || "").trim());
        if (!modelId) continue;
        userQuotaEntries.set(modelId, bucket);
      }
    }
    const quotas: Record<string, UsageQuota> = {};

    // Parse per-model quota info from fetchAvailableModels response.
    for (const [rawModelKey, infoValue] of Object.entries(modelEntries)) {
      const info = toRecord(infoValue);
      const quotaInfo = toRecord(info.quotaInfo);
      const modelKey = toClientAntigravityQuotaModelId(rawModelKey);

      // Skip internal, excluded, and models without quota info
      if (
        !modelKey ||
        info.isInternal === true ||
        !(provider === "agy"
          ? isUserCallableAgyModelId(modelKey)
          : isUserCallableAntigravityModelId(modelKey)) ||
        Object.keys(quotaInfo).length === 0
      ) {
        continue;
      }

      const liveQuota = userQuotaEntries.get(modelKey);
      const quotaSource = liveQuota || quotaInfo;
      const rawFraction = toNumber(quotaSource.remainingFraction, -1);
      const resetAt = parseResetTime(quotaSource.resetTime);
      // Distinguish "upstream did not report remainingFraction" from "remaining is 0%".
      // fetchAvailableModels is a catalog view and can be stale/full; retrieveUserQuota is
      // the source of truth for actual Gemini consumption when it includes the model.
      const fractionReported = rawFraction >= 0;
      if (!fractionReported) {
        console.warn(
          `[Antigravity] model ${modelKey} returned no remainingFraction — quota unknown`
        );
      }
      const remainingFraction = fractionReported ? Math.max(0, Math.min(1, rawFraction)) : 0;
      // Models with no resetTime AND a reported full fraction are unlimited
      // (e.g. tab-completion models). Unreported fraction is NEVER unlimited.
      const isUnlimited = fractionReported && !resetAt && remainingFraction >= 1;
      const remainingPercentage = remainingFraction * 100;
      const QUOTA_NORMALIZED_BASE = 1000;
      const total = QUOTA_NORMALIZED_BASE;
      const remaining = Math.round(total * remainingFraction);
      const used = isUnlimited ? 0 : Math.max(0, total - remaining);

      quotas[modelKey] = applyLocalUsageFallback(
        {
          used,
          total: isUnlimited ? 0 : total,
          resetAt,
          remainingPercentage: isUnlimited ? 100 : remainingPercentage,
          unlimited: isUnlimited,
          fractionReported,
          quotaSource: liveQuota ? "retrieveUserQuota" : "fetchAvailableModels",
        },
        provider,
        connectionId,
        modelKey
      );
    }

    // Include retrieveUserQuota buckets not listed in the static/public Antigravity catalog yet.
    // This keeps Provider Limits honest when Google adds a new Gemini tier before our catalog is
    // updated. Hidden/internal catalog entries above are still filtered by the public pass.
    for (const [modelKey, bucket] of userQuotaEntries) {
      if (
        quotas[modelKey] ||
        !(provider === "agy"
          ? isUserCallableAgyModelId(modelKey)
          : isUserCallableAntigravityModelId(modelKey))
      ) {
        continue;
      }
      const rawFraction = toNumber(bucket.remainingFraction, -1);
      if (rawFraction < 0) continue;
      const remainingFraction = Math.max(0, Math.min(1, rawFraction));
      const resetAt = parseResetTime(bucket.resetTime);
      const isUnlimited = !resetAt && remainingFraction >= 1;
      const QUOTA_NORMALIZED_BASE = 1000;
      const total = QUOTA_NORMALIZED_BASE;
      const remaining = Math.round(total * remainingFraction);
      quotas[modelKey] = {
        used: isUnlimited ? 0 : Math.max(0, total - remaining),
        total: isUnlimited ? 0 : total,
        resetAt,
        remainingPercentage: isUnlimited ? 100 : remainingFraction * 100,
        unlimited: isUnlimited,
        fractionReported: true,
        quotaSource: "retrieveUserQuota",
      };
    }

    return {
      plan: getAntigravityPlanLabel(subscriptionInfo, providerSpecificData),
      quotas: {
        ...quotas,
        ...(creditBalance !== null && {
          credits: {
            used: 0,
            total: 0,
            remaining: creditBalance,
            unlimited: false,
            resetAt: null,
          },
        }),
      },
      subscriptionInfo,
    };
  } catch (error) {
    return {
      plan: getAntigravityPlanLabel(subscriptionInfo, providerSpecificData),
      subscriptionInfo,
      message: `Antigravity error: ${(error as Error).message}`,
    };
  }
}



/**
 * Get Antigravity subscription info (cached, 5 min TTL)
 * Prevents duplicate loadCodeAssist calls within the same quota cycle.
 */
async function getAntigravitySubscriptionInfoCached(
  accessToken: string,
  providerSpecificData?: JsonRecord,
  options: AntigravityUsageOptions = {}
): Promise<unknown> {
  const profile = getAntigravityClientProfile({ providerSpecificData });
  const cacheKey = `${accessToken.substring(0, 16)}:${profile}`;

  if (options.forceRefresh) {
    _antigravitySubCache.delete(cacheKey);
  } else {
    const cached = _antigravitySubCache.get(cacheKey);
    if (cached && Date.now() - cached.fetchedAt < ANTIGRAVITY_CACHE_TTL_MS) {
      return cached.data;
    }
  }

  const data = await getAntigravitySubscriptionInfo(accessToken, providerSpecificData);
  if (data != null) {
    _antigravitySubCache.set(cacheKey, { data, fetchedAt: Date.now() });
  }
  return data;
}



/**
 * Get Antigravity subscription info using correct Antigravity headers.
 * Must match the headers used in providers.js postExchange (not CLI headers).
 */
async function getAntigravitySubscriptionInfo(
  accessToken: string,
  providerSpecificData?: JsonRecord
): Promise<unknown | null> {
  try {
    const profile = getAntigravityClientProfile({ providerSpecificData });
    const response = await fetch(ANTIGRAVITY_CONFIG.loadProjectApiUrl, {
      method: "POST",
      headers:
        profile === "harness"
          ? getAntigravityBootstrapHeaders(profile, accessToken)
          : getAntigravityHeaders("loadCodeAssist", accessToken),
      body: JSON.stringify({ metadata: getAntigravityLoadCodeAssistMetadata() }),
    });

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
}

