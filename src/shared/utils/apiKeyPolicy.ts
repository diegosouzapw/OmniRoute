/**
 * API Key Policy Enforcement — Shared middleware for all /v1/* endpoints.
 *
 * Enforces API key policies: model restrictions and budget limits.
 * Should be called after API key authentication in every endpoint that
 * accepts a model parameter.
 *
 * @module shared/utils/apiKeyPolicy
 */

import { z } from "zod";
import { extractApiKey } from "@/sse/services/auth";
import { getApiKeyMetadata, isModelAllowedForKey } from "@/lib/localDb";
import { checkBudget } from "@/domain/costRules";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { checkRateLimit, RateLimitRule } from "./rateLimiter";

/**
 * Legacy default applied to API keys whose `rate_limits` column is null.
 * Kept as the secure-by-default fallback when DEFAULT_RATE_LIMIT_PER_DAY is
 * unset or malformed — going unlimited silently on an upgrade would expose
 * existing deployments to runaway cost / abuse from old, unconfigured keys.
 */
const LEGACY_DEFAULT_PER_DAY = 1000;

/**
 * Per Repository Style Guide rule 8, env input is validated through Zod
 * rather than `parseInt`. `parseInt("1000 requests", 10)` returns `1000`,
 * silently turning a config typo into a partial value — Zod rejects it.
 */
const DEFAULT_RATE_LIMIT_PER_DAY_SCHEMA = z.coerce.number().int().min(0);

/**
 * Build the fallback rate-limit rules applied to API keys whose
 * `rate_limits` column is null. Configurable via DEFAULT_RATE_LIMIT_PER_DAY:
 *
 * - unset / empty / malformed → 1000/day, 5000/week, 20000/month
 *   (the legacy default; preserves existing behavior on upgrade).
 * - `0` (explicit opt-out) → empty rule set; `checkRateLimit()` short-
 *   circuits empty input as allowed, so keys without an explicit limit
 *   become effectively unlimited.
 * - any positive integer N → N/day, 5N/week, 20N/month.
 *
 * Exported for unit testing; production code should reference the
 * `DEFAULT_RATE_LIMITS` constant below.
 */
export function buildDefaultRateLimits(
  envValue = process.env.DEFAULT_RATE_LIMIT_PER_DAY
): RateLimitRule[] {
  const trimmed = (envValue ?? "").trim();
  let perDay: number;
  if (trimmed === "") {
    perDay = LEGACY_DEFAULT_PER_DAY;
  } else {
    const parsed = DEFAULT_RATE_LIMIT_PER_DAY_SCHEMA.safeParse(trimmed);
    if (!parsed.success) {
      // Malformed value — fall back to the legacy default rather than
      // silently going unlimited from a typo. The runtime cost of the
      // warning is paid once at module load.
      log.warn(
        "API_POLICY",
        `Invalid DEFAULT_RATE_LIMIT_PER_DAY=${JSON.stringify(envValue)}; ` +
          `falling back to ${LEGACY_DEFAULT_PER_DAY}/day. ` +
          `Set to "0" to explicitly disable the fallback.`
      );
      perDay = LEGACY_DEFAULT_PER_DAY;
    } else {
      perDay = parsed.data;
    }
  }
  if (perDay === 0) return [];
  return [
    { limit: perDay, window: 86400 },
    { limit: perDay * 5, window: 604800 },
    { limit: perDay * 20, window: 2592000 },
  ];
}

const DEFAULT_RATE_LIMITS: RateLimitRule[] = buildDefaultRateLimits();

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
  allowedConnections?: string[];
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
  maxSessions?: number | null;
  rateLimits?: RateLimitRule[] | null;
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

  // ── Check 3: Model restriction ──
  if (modelStr && apiKeyInfo.allowedModels && apiKeyInfo.allowedModels.length > 0) {
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

  // ── Check 5: Generic Multi-Window Rate Limits ──
  if (apiKeyInfo.id) {
    const rulesToApply =
      apiKeyInfo.rateLimits && apiKeyInfo.rateLimits.length > 0
        ? [...apiKeyInfo.rateLimits]
        : [...DEFAULT_RATE_LIMITS];

    // Combine with legacy limits if they exist and custom rate limits aren't set
    if (!apiKeyInfo.rateLimits || apiKeyInfo.rateLimits.length === 0) {
      if (apiKeyInfo.maxRequestsPerDay) {
        rulesToApply.push({ limit: apiKeyInfo.maxRequestsPerDay, window: 86400 });
      }
      if (apiKeyInfo.maxRequestsPerMinute) {
        rulesToApply.push({ limit: apiKeyInfo.maxRequestsPerMinute, window: 60 });
      }
    }

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

  return { apiKey, apiKeyInfo, rejection: null };
}
