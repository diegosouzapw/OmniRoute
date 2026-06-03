/**
 * API Key Policy Enforcement — Shared middleware for all /v1/* endpoints.
 *
 * Enforces API key policies: model restrictions and budget limits.
 * Should be called after API key authentication in every endpoint that
 * accepts a model parameter.
 *
 * @module shared/utils/apiKeyPolicy
 */

import { extractApiKey } from "@/sse/services/auth";
import { getApiKeyMetadata, getComboByName, isModelAllowedForKey } from "@/lib/localDb";
import { resolveComboForModel } from "@/lib/db/modelComboMappings";
import { checkBudget } from "@/domain/costRules";
import { checkTokenLimits } from "@omniroute/open-sse/services/tokenLimitCounter.ts";
import { errorResponse, buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { checkRateLimit, RateLimitRule } from "./rateLimiter";
import { resolveEndpointCategory } from "@/shared/constants/endpointCategories";
import { resolveQuotaKeyScope } from "@/lib/quota/quotaKey";
import { isQuotaModelName, parseQuotaModelName } from "@/lib/quota/quotaModelNaming";

// Default to no per-key request cap. API keys can still opt into explicit
// limits via Settings/API Manager, while provider/account quota controls remain
// responsible for upstream 429 handling and fallback.
// Exported so tests can lock in the "no implicit caps" contract from #2289.
export const DEFAULT_RATE_LIMITS: RateLimitRule[] = [];

const LEGACY_DEFAULT_RATE_LIMIT_PER_DAY = 1000;

export function buildDefaultRateLimits(rawValue?: string): RateLimitRule[] {
  const normalized = rawValue?.trim();
  if (normalized === undefined || normalized === "") return [];

  const limitPerDay = /^\d+$/.test(normalized)
    ? Number(normalized)
    : LEGACY_DEFAULT_RATE_LIMIT_PER_DAY;

  if (limitPerDay === 0) return [];

  return [
    { limit: limitPerDay, window: 86400 },
    { limit: limitPerDay * 5, window: 604800 },
    { limit: limitPerDay * 20, window: 2592000 },
  ];
}

const ENV_DEFAULT_RATE_LIMITS: RateLimitRule[] = buildDefaultRateLimits(
  process.env.DEFAULT_RATE_LIMIT_PER_DAY
);

interface AccessSchedule {
  enabled: boolean;
  from: string;
  until: string;
  days: number[];
  tz: string;
}

/** Metadata stored for an API key in the local database. */
export interface ApiKeyMetadata {
  id: string;
  name?: string;
  allowedModels?: string[];
  allowedCombos?: string[];
  allowedConnections?: string[];
  allowedQuotas?: string[];
  noLog?: boolean;
  autoResolve?: boolean;
  budget?: number;
  usedBudget?: number;
  isActive?: boolean;
  isBanned?: boolean;
  expiresAt?: string | null;
  accessSchedule?: AccessSchedule | null;
  maxRequestsPerDay?: number | null;
  maxRequestsPerMinute?: number | null;
  throttleDelayMs?: number | null;
  maxSessions?: number | null;
  rateLimits?: RateLimitRule[] | null;
  allowedEndpoints?: string[];
  disableNonPublicModels?: boolean;
}

/**
 * Returns true if the current time (in the schedule's timezone) is within
 * the configured window.
 * Supports overnight ranges (e.g. 22:00 until 06:00).
 */
function isWithinSchedule(schedule: AccessSchedule): boolean {
  if (!schedule.enabled) return true;

  const now = new Date();

  // Convert current UTC time to the configured timezone
  let localTimeStr: string;
  try {
    localTimeStr = new Intl.DateTimeFormat("en-US", {
      timeZone: schedule.tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
  } catch {
    // Invalid timezone — fail open (don't block)
    return true;
  }

  // Intl may return "24:xx" instead of "00:xx" — normalize
  const normalizedTime = localTimeStr.replace(/^24:/, "00:");
  const [localHour, localMin] = normalizedTime.split(":").map(Number);
  const localMinutes = localHour * 60 + localMin;

  // Determine current weekday in the configured timezone
  let localDayStr: string;
  try {
    localDayStr = new Intl.DateTimeFormat("en-US", {
      timeZone: schedule.tz,
      weekday: "short",
    }).format(now);
  } catch {
    return true;
  }

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const localDay = dayMap[localDayStr] ?? now.getDay();

  if (!schedule.days.includes(localDay)) return false;

  const [fromHour, fromMin] = schedule.from.split(":").map(Number);
  const [untilHour, untilMin] = schedule.until.split(":").map(Number);
  const fromMinutes = fromHour * 60 + fromMin;
  const untilMinutes = untilHour * 60 + untilMin;

  // Overnight window (e.g. 22:00 → 06:00)
  if (untilMinutes < fromMinutes) {
    return localMinutes >= fromMinutes || localMinutes < untilMinutes;
  }

  return localMinutes >= fromMinutes && localMinutes < untilMinutes;
}

// Legacy in-memory request counter has been replaced by Redis-backed multi-window rate limiter

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeComboAccessName(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.startsWith("combo/") ? trimmed.slice(6).trim() || trimmed : trimmed;
}

function matchesComboAccessRule(comboName: string, requestedModel: string, rule: string): boolean {
  const normalizedRule = normalizeComboAccessName(rule);
  if (!normalizedRule) return false;
  return (
    normalizedRule === comboName ||
    rule === requestedModel ||
    `combo/${normalizedRule}` === requestedModel
  );
}

async function resolveRequestedComboName(modelStr: string): Promise<string | null> {
  const exact = await getComboByName(modelStr);
  if (exact && typeof exact.name === "string") return exact.name;

  if (modelStr.startsWith("combo/")) {
    const withoutPrefix = modelStr.slice(6);
    const prefixed = await getComboByName(withoutPrefix);
    if (prefixed && typeof prefixed.name === "string") return prefixed.name;
  }

  const mapped = await resolveComboForModel(modelStr);
  const mappedName = normalizeComboAccessName(mapped?.name);
  return mappedName;
}

async function isComboAllowedForKey(
  allowedCombos: string[],
  modelStr: string
): Promise<{ allowed: boolean; comboName: string | null }> {
  const comboName = await resolveRequestedComboName(modelStr);
  if (!comboName) return { allowed: true, comboName: null };

  const allowed = allowedCombos.some((rule) => matchesComboAccessRule(comboName, modelStr, rule));
  return { allowed, comboName };
}

export interface ApiKeyPolicyResult {
  /** API key string (null if no key provided) */
  apiKey: string | null;
  /** Metadata from DB (null if no key or key not found) */
  apiKeyInfo: ApiKeyMetadata | null;
  /** If set, the request should be rejected with this Response */
  rejection: Response | null;
}

/**
 * Enforce API key policies for a request.
 *
 * Checks:
 * 1. Model restriction — if the key has `allowedModels`, verify the requested model is permitted
 * 2. Budget limit — if the key has a budget configured, verify it hasn't been exceeded
 *
 * @param request - The incoming HTTP request
 * @param modelStr - The model ID from the request body
 * @returns ApiKeyPolicyResult with apiKey, metadata, and optional rejection response
 *
 * @example
 * ```ts
 * const policy = await enforceApiKeyPolicy(request, body.model);
 * if (policy.rejection) return policy.rejection;
 * // proceed with request, optionally use policy.apiKeyInfo
 * ```
 */
export async function enforceApiKeyPolicy(
  request: Request,
  modelStr: string | null
): Promise<ApiKeyPolicyResult> {
  const apiKey = extractApiKey(request);

  // No API key = local mode, skip policy checks
  if (!apiKey) {
    return { apiKey: null, apiKeyInfo: null, rejection: null };
  }

  // Fetch key metadata (includes allowedModels)
  let apiKeyInfo: ApiKeyMetadata | null = null;
  try {
    apiKeyInfo = await getApiKeyMetadata(apiKey);
  } catch (error) {
    // Fail-closed: if policy backend fails, reject the request
    log.error("API_POLICY", "Failed to fetch API key metadata. Request blocked.", { error });
    return {
      apiKey,
      apiKeyInfo: null,
      rejection: errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key policy unavailable"),
    };
  }

  // Key not found in DB — skip policy (auth layer handles validation)
  if (!apiKeyInfo) {
    return { apiKey, apiKeyInfo: null, rejection: null };
  }

  // ── Check 1: is_active / is_banned ──
  if (apiKeyInfo.isActive === false) {
    return {
      apiKey,
      apiKeyInfo,
      rejection: errorResponse(HTTP_STATUS.FORBIDDEN, "This API key is disabled"),
    };
  }
  if (apiKeyInfo.isBanned === true) {
    return {
      apiKey,
      apiKeyInfo,
      rejection: errorResponse(
        HTTP_STATUS.FORBIDDEN,
        "This API key is banned due to policy violations"
      ),
    };
  }

  // ── Check 1.5: expires_at ──
  if (apiKeyInfo.expiresAt) {
    const expiry = new Date(apiKeyInfo.expiresAt).getTime();
    if (Date.now() > expiry) {
      return {
        apiKey,
        apiKeyInfo,
        rejection: errorResponse(HTTP_STATUS.FORBIDDEN, "This API key has expired"),
      };
    }
  }

  // ── Check 2: access_schedule — time-based access window ──
  if (apiKeyInfo.accessSchedule && apiKeyInfo.accessSchedule.enabled) {
    if (!isWithinSchedule(apiKeyInfo.accessSchedule)) {
      const { from, until, tz } = apiKeyInfo.accessSchedule;
      return {
        apiKey,
        apiKeyInfo,
        rejection: errorResponse(
          HTTP_STATUS.FORBIDDEN,
          `Access denied outside allowed hours (${from}–${until} ${tz})`
        ),
      };
    }
  }

  // ── Check 2.5: Endpoint restriction ──
  if (apiKeyInfo.allowedEndpoints && apiKeyInfo.allowedEndpoints.length > 0) {
    try {
      const url = new URL(request.url);
      const category = resolveEndpointCategory(url.pathname);
      if (category && !apiKeyInfo.allowedEndpoints.includes(category)) {
        return {
          apiKey,
          apiKeyInfo,
          rejection: errorResponse(
            HTTP_STATUS.FORBIDDEN,
            `Endpoint category "${category}" is not allowed for this API key`
          ),
        };
      }
    } catch {
      // URL parse failure — fail open, let other checks decide
    }
  }

  // ── Check 2.9: qtSd models require a quota-pool allocation ──
  //
  // quotaShared-* (qtSd/<group>/<provider>/<model>) virtual models are pool-gated:
  // a key that is NOT allocated to any quota pool (empty allowedQuotas) must not be
  // able to call them — otherwise an ordinary key could route through someone
  // else's shared quota. Only allocated keys (allowedQuotas non-empty, further
  // validated against their pool scope in Check 3 below) may use qtSd models.
  if (
    modelStr &&
    isQuotaModelName(modelStr) &&
    !(Array.isArray(apiKeyInfo.allowedQuotas) && apiKeyInfo.allowedQuotas.length > 0)
  ) {
    const notAllocatedBody = buildErrorBody(
      HTTP_STATUS.FORBIDDEN,
      `Model "${modelStr}" requires a quota-pool allocation; this API key is not allocated to any quota pool`
    );
    notAllocatedBody.error.code = "QUOTA_NOT_ALLOCATED";
    return {
      apiKey,
      apiKeyInfo,
      rejection: new Response(JSON.stringify(notAllocatedBody), {
        status: HTTP_STATUS.FORBIDDEN,
        headers: { "Content-Type": "application/json" },
      }),
    };
  }

  // ── Check 3: Quota-exclusive enforcement (Phase B4) ──
  //
  // When a key has allowedQuotas its access is governed exclusively by the
  // quotaShared-* virtual models of its pools — raw model names are rejected,
  // and quotaShared-* names belonging to OTHER pools are also rejected.
  // Normal allowedModels/allowedCombos checks are skipped for these keys.
  if (modelStr && apiKeyInfo.allowedQuotas && apiKeyInfo.allowedQuotas.length > 0) {
    try {
      const scope = await resolveQuotaKeyScope(apiKeyInfo.allowedQuotas);
      let quotaRejectionMsg: string | null = null;

      if (isQuotaModelName(modelStr)) {
        // Virtual quota model — must belong to one of this key's pools AND its provider must be in scope.
        const parsed = parseQuotaModelName(modelStr);
        const allowed =
          parsed !== null &&
          scope.poolSlugs.length > 0 &&
          scope.poolSlugs.includes(parsed.groupSlug) &&
          scope.providers.includes(parsed.provider);
        if (!allowed) {
          quotaRejectionMsg = `Model "${modelStr}" is not in this key's quota pools`;
        }
      } else {
        // Raw (non-quotaShared) model name — always rejected for quota-exclusive keys.
        quotaRejectionMsg = `This quota-exclusive API key may only use quotaShared-* models`;
      }

      if (quotaRejectionMsg !== null) {
        const quotaBody = buildErrorBody(HTTP_STATUS.FORBIDDEN, quotaRejectionMsg);
        quotaBody.error.code = "QUOTA_ONLY";
        return {
          apiKey,
          apiKeyInfo,
          rejection: new Response(JSON.stringify(quotaBody), {
            status: HTTP_STATUS.FORBIDDEN,
            headers: { "Content-Type": "application/json" },
          }),
        };
      }
      // Model is an in-scope quotaShared-* name — skip allowedModels/allowedCombos.
      // Continue to budget / rate-limit checks below.
    } catch (error) {
      log.error("API_POLICY", "Quota scope check failed. Request blocked.", { error });
      return {
        apiKey,
        apiKeyInfo,
        rejection: errorResponse(
          HTTP_STATUS.SERVICE_UNAVAILABLE,
          "API key quota policy unavailable"
        ),
      };
    }
  }

  // ── Check 4: Model restriction (skipped when allowedQuotas governs access) ──
  let requestedComboName: string | null = null;
  const isQuotaExclusive =
    Boolean(apiKeyInfo.allowedQuotas) && (apiKeyInfo.allowedQuotas as string[]).length > 0;
  if (!isQuotaExclusive && modelStr && apiKeyInfo.allowedCombos && apiKeyInfo.allowedCombos.length > 0) {
    try {
      const comboAccess = await isComboAllowedForKey(apiKeyInfo.allowedCombos, modelStr);
      requestedComboName = comboAccess.comboName;
      if (!comboAccess.allowed) {
        return {
          apiKey,
          apiKeyInfo,
          rejection: errorResponse(
            HTTP_STATUS.FORBIDDEN,
            `Combo "${comboAccess.comboName || modelStr}" is not allowed for this API key`
          ),
        };
      }
    } catch (error) {
      log.error("API_POLICY", "Combo access check failed. Request blocked.", { error });
      return {
        apiKey,
        apiKeyInfo,
        rejection: errorResponse(
          HTTP_STATUS.SERVICE_UNAVAILABLE,
          "API key combo policy unavailable"
        ),
      };
    }
  }

  const hasModelRestrictions =
    !isQuotaExclusive &&
    ((apiKeyInfo.allowedModels && apiKeyInfo.allowedModels.length > 0) ||
      (apiKeyInfo as { disableNonPublicModels?: boolean }).disableNonPublicModels === true);

  if (!requestedComboName && modelStr && hasModelRestrictions) {
    // Short-circuit: auto/* and qtSd/* are combo-routed (not catalog models).
    // They must never be evaluated by the published-model gate.
    if (modelStr.startsWith("auto/") || modelStr.startsWith("qtSd/")) {
      requestedComboName = modelStr; // non-null sentinel — skips the published-model check
    } else {
      try {
        requestedComboName = await resolveRequestedComboName(modelStr);
      } catch {
        requestedComboName = null;
      }
    }
  }

  if (modelStr && !requestedComboName && hasModelRestrictions) {
    const allowed = await isModelAllowedForKey(apiKey, modelStr);
    if (!allowed) {
      return {
        apiKey,
        apiKeyInfo,
        rejection: errorResponse(
          HTTP_STATUS.FORBIDDEN,
          `Model "${modelStr}" is not allowed for this API key`
        ),
      };
    }
  }

  // ── Check 4: Budget limit ──
  if (apiKeyInfo.id) {
    try {
      const budgetOk = checkBudget(apiKeyInfo.id);
      if (!budgetOk.allowed) {
        return {
          apiKey,
          apiKeyInfo,
          rejection: errorResponse(
            HTTP_STATUS.RATE_LIMITED,
            budgetOk.reason || "Budget limit exceeded"
          ),
        };
      }
    } catch (error) {
      // Fail-closed: budget backend error should block request
      log.error("API_POLICY", "Budget check failed. Request blocked.", { error });
      return {
        apiKey,
        apiKeyInfo,
        rejection: errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "Budget policy unavailable"),
      };
    }
  }

  // ── Check 4.5: Per-model / per-provider token limits (Tier 1) ──
  if (apiKeyInfo.id) {
    try {
      const breach = checkTokenLimits(apiKeyInfo.id, undefined, modelStr ?? undefined);
      if (breach) {
        const scopeLabel =
          breach.scopeType === "global"
            ? "account"
            : `${breach.scopeType} "${breach.scopeValue}"`;
        return {
          apiKey,
          apiKeyInfo,
          rejection: errorResponse(
            HTTP_STATUS.RATE_LIMITED,
            `Token limit exceeded for ${scopeLabel}: ${breach.tokensUsed}/${breach.limitValue} tokens used in the current window. Please try again later.`
          ),
        };
      }
    } catch (error) {
      // Fail-closed: token-limit backend error should block the request,
      // consistent with the budget check above.
      log.error("API_POLICY", "Token limit check failed. Request blocked.", { error });
      return {
        apiKey,
        apiKeyInfo,
        rejection: errorResponse(
          HTTP_STATUS.SERVICE_UNAVAILABLE,
          "Token limit policy unavailable"
        ),
      };
    }
  }

  // ── Check 5: Generic Multi-Window Rate Limits ──
  if (apiKeyInfo.id) {
    const hasCustomRateLimits = Boolean(apiKeyInfo.rateLimits && apiKeyInfo.rateLimits.length > 0);
    const rulesToApply = hasCustomRateLimits
      ? [...(apiKeyInfo.rateLimits as RateLimitRule[])]
      : [...DEFAULT_RATE_LIMITS, ...ENV_DEFAULT_RATE_LIMITS];

    // Combine with legacy limits if they exist and custom rate limits aren't set
    if (!hasCustomRateLimits) {
      if (apiKeyInfo.maxRequestsPerDay) {
        rulesToApply.push({ limit: apiKeyInfo.maxRequestsPerDay, window: 86400 });
      }
      if (apiKeyInfo.maxRequestsPerMinute) {
        rulesToApply.push({ limit: apiKeyInfo.maxRequestsPerMinute, window: 60 });
      }
    }

    if (rulesToApply.length > 0) {
      const rateLimitResult = await checkRateLimit(apiKeyInfo.id, rulesToApply);
      if (!rateLimitResult.allowed) {
        const failedWindowStr = rateLimitResult.failedWindow
          ? ` (${rateLimitResult.failedWindow}s window)`
          : "";
        return {
          apiKey,
          apiKeyInfo,
          rejection: errorResponse(
            HTTP_STATUS.RATE_LIMITED,
            `Request limit exceeded${failedWindowStr}. Please try again later.`
          ),
        };
      }
    }
  }

  // ── Check 6: Soft throttle / slowdown ──
  if (apiKeyInfo.throttleDelayMs && apiKeyInfo.throttleDelayMs > 0) {
    await delay(Math.min(apiKeyInfo.throttleDelayMs, 300_000));
  }

  return { apiKey, apiKeyInfo, rejection: null };
}
