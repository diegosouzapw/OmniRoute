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
import {
  getApiKeyMetadata,
  getComboByName,
  deactivateSaasCustomerApiKeys,
  getSaasPolicyForApiKeyId,
  isAllowedBySaasPattern,
  isModelAllowedForKey,
} from "@/lib/localDb";
import { checkBudget } from "@/domain/costRules";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";

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
  accessSchedule?: AccessSchedule | null;
  maxRequestsPerDay?: number | null;
  maxRequestsPerMinute?: number | null;
  maxSessions?: number | null;
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

// ── In-memory request counter for per-key rate limits (#452) ──

/** Sliding-window request timestamps per API key */
const _requestTimestamps = new Map<string, number[]>();
const REQUEST_COUNTER_MAX_KEYS = 5000;
const REQUEST_DAY_MS = 24 * 60 * 60 * 1000;
const REQUEST_MINUTE_MS = 60 * 1000;
const SUPPORT_SITE = "ramelseg.com.br";

/** Record a request and check per-key limits. Returns null if OK, or an error message. */
function checkRequestCountLimits(
  apiKeyId: string,
  maxPerDay: number | null | undefined,
  maxPerMinute: number | null | undefined
): string | null {
  if (!maxPerDay && !maxPerMinute) return null;

  const now = Date.now();

  // Get or create timestamp array for this key
  let timestamps = _requestTimestamps.get(apiKeyId);
  if (!timestamps) {
    timestamps = [];
    _requestTimestamps.set(apiKeyId, timestamps);
    // Prevent unbounded growth
    if (_requestTimestamps.size > REQUEST_COUNTER_MAX_KEYS) {
      const firstKey = _requestTimestamps.keys().next().value;
      if (firstKey) _requestTimestamps.delete(firstKey);
    }
  }

  // Prune timestamps older than 24h
  const dayAgo = now - REQUEST_DAY_MS;
  while (timestamps.length > 0 && timestamps[0] < dayAgo) {
    timestamps.shift();
  }

  // Check per-minute limit (before recording this request)
  if (maxPerMinute && maxPerMinute > 0) {
    const minuteAgo = now - REQUEST_MINUTE_MS;
    const recentCount = timestamps.filter((t) => t >= minuteAgo).length;
    if (recentCount >= maxPerMinute) {
      return `Per-minute request limit exceeded (${maxPerMinute} RPM). Try again in a few seconds.`;
    }
  }

  // Check per-day limit
  if (maxPerDay && maxPerDay > 0) {
    if (timestamps.length >= maxPerDay) {
      return `Daily request limit exceeded (${maxPerDay} RPD). Resets in ${Math.ceil(
        (timestamps[0] + REQUEST_DAY_MS - now) / 60000
      )} minutes.`;
    }
  }

  // All checks passed — record this request
  timestamps.push(now);
  return null;
}

function getFriendlySaasBlockMessage(reason: string | null | undefined): {
  status: number;
  message: string;
} {
  if (reason === "billing") {
    return {
      status: HTTP_STATUS.PAYMENT_REQUIRED,
      message: `Sua conta esta com uma pendencia financeira. Para continuar usando a API, regularize a mensalidade ou fale com o suporte. Acesse: ${SUPPORT_SITE}`,
    };
  }

  if (reason === "limit") {
    return {
      status: HTTP_STATUS.RATE_LIMITED,
      message: `Seu limite de tokens deste ciclo foi atingido. Para continuar usando a API, aguarde a renovacao do ciclo ou solicite tokens adicionais. Acesse: ${SUPPORT_SITE}`,
    };
  }

  return {
    status: HTTP_STATUS.FORBIDDEN,
    message: `Esta API key esta temporariamente desativada. Entre em contato com o suporte para entender o motivo e reativar o acesso. Acesse: ${SUPPORT_SITE}`,
  };
}

function getFriendlyCustomerStatusMessage(status: string): string {
  if (status === "blocked") {
    return `Sua conta esta bloqueada no momento. Entre em contato com o suporte para verificar a situacao e reativar o acesso. Acesse: ${SUPPORT_SITE}`;
  }

  if (status === "inactive") {
    return `Sua conta esta inativa no momento. Entre em contato com o suporte para ativar seu acesso novamente. Acesse: ${SUPPORT_SITE}`;
  }

  return `Sua conta nao esta liberada para uso da API no momento. Entre em contato com o suporte para verificar a situacao. Acesse: ${SUPPORT_SITE}`;
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

  let saasPolicyApplied = false;
  let saasPolicy: ReturnType<typeof getSaasPolicyForApiKeyId> | null = null;
  if (apiKeyInfo.id) {
    try {
      saasPolicy = getSaasPolicyForApiKeyId(apiKeyInfo.id);
      saasPolicyApplied = Boolean(saasPolicy);
    } catch (error) {
      log.error("API_POLICY", "SaaS customer policy failed. Request blocked.", { error });
      return {
        apiKey,
        apiKeyInfo,
        rejection: errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "Customer policy unavailable"),
      };
    }
  }

  if (saasPolicy?.usage.blocked) {
    if (saasPolicy.usage.blockReason === "limit" || saasPolicy.usage.blockReason === "billing") {
      deactivateSaasCustomerApiKeys(saasPolicy.customer.id, saasPolicy.usage.blockReason);
    }
    const friendlyBlock = getFriendlySaasBlockMessage(saasPolicy.usage.blockReason);
    return {
      apiKey,
      apiKeyInfo,
      rejection: errorResponse(friendlyBlock.status, friendlyBlock.message),
    };
  }

  if (saasPolicy && !saasPolicy.apiKey.isActive) {
    const friendlyBlock = getFriendlySaasBlockMessage(null);
    return {
      apiKey,
      apiKeyInfo,
      rejection: errorResponse(friendlyBlock.status, friendlyBlock.message),
    };
  }

  // ── Check 1: is_active — hard block regardless of schedule ──
  if (apiKeyInfo.isActive === false) {
    return {
      apiKey,
      apiKeyInfo,
      rejection: errorResponse(
        HTTP_STATUS.FORBIDDEN,
        "Esta API key esta desativada. Verifique se ela ainda esta ativa no painel ou fale com o suporte para reativar o acesso."
      ),
    };
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
  if (apiKeyInfo.id) {
    try {
      if (saasPolicy) {
        if (saasPolicy.customer.status !== "active") {
          return {
            apiKey,
            apiKeyInfo,
            rejection: errorResponse(
              HTTP_STATUS.FORBIDDEN,
              getFriendlyCustomerStatusMessage(saasPolicy.customer.status)
            ),
          };
        }
        if (!saasPolicy.plan || !saasPolicy.plan.isActive) {
          return {
            apiKey,
            apiKeyInfo,
            rejection: errorResponse(
              HTTP_STATUS.FORBIDDEN,
              `O plano vinculado a sua conta esta inativo. Entre em contato com o suporte para atualizar o plano e liberar o acesso. Acesse: ${SUPPORT_SITE}`
            ),
          };
        }

        if (modelStr) {
          const combo = await getComboByName(modelStr).catch(() => null);
          if (combo) {
            const comboAllowed =
              saasPolicy.plan.allowAllCombos ||
              isAllowedBySaasPattern(modelStr, saasPolicy.allowedCombos);
            if (!comboAllowed) {
              return {
                apiKey,
                apiKeyInfo,
                rejection: errorResponse(
                  HTTP_STATUS.FORBIDDEN,
                  `Combo "${modelStr}" is not enabled for this customer`
                ),
              };
            }
          } else {
            const modelAllowed =
              saasPolicy.plan.allowAllModels ||
              isAllowedBySaasPattern(modelStr, saasPolicy.allowedModels);
            if (!modelAllowed) {
              return {
                apiKey,
                apiKeyInfo,
                rejection: errorResponse(
                  HTTP_STATUS.FORBIDDEN,
                  `Model "${modelStr}" is not enabled for this customer`
                ),
              };
            }
          }
        }
      }
    } catch (error) {
      log.error("API_POLICY", "SaaS customer policy failed. Request blocked.", { error });
      return {
        apiKey,
        apiKeyInfo,
        rejection: errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "Customer policy unavailable"),
      };
    }
  }

  if (
    !saasPolicyApplied &&
    modelStr &&
    apiKeyInfo.allowedModels &&
    apiKeyInfo.allowedModels.length > 0
  ) {
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

  // ── Check 5: Request-count limits (#452) ──
  if (apiKeyInfo.id && (apiKeyInfo.maxRequestsPerDay || apiKeyInfo.maxRequestsPerMinute)) {
    const limitError = checkRequestCountLimits(
      apiKeyInfo.id,
      apiKeyInfo.maxRequestsPerDay,
      apiKeyInfo.maxRequestsPerMinute
    );
    if (limitError) {
      return {
        apiKey,
        apiKeyInfo,
        rejection: errorResponse(HTTP_STATUS.RATE_LIMITED, limitError),
      };
    }
  }

  return { apiKey, apiKeyInfo, rejection: null };
}
