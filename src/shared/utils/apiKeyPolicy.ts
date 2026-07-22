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
  isModelAllowedForKey,
  getApiKeyById,
} from "@/lib/localDb";
import { isDashboardSessionAuthenticated } from "./apiAuth";
import { resolveComboForModel } from "@/lib/db/modelComboMappings";
import { checkBudget } from "@/domain/costRules";
import { checkTokenLimits } from "@omniroute/open-sse/services/tokenLimitCounter.ts";
import {
  errorResponse,
  buildErrorBody,
  sanitizeErrorMessage,
} from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";
import { checkRateLimit, RateLimitRule } from "./rateLimiter";
import { resolveEndpointCategory } from "@/shared/constants/endpointCategories";
import { resolveQuotaKeyScope } from "@/lib/quota/quotaKey";
import { isQuotaModelName, parseQuotaModelName } from "@/lib/quota/quotaModelNaming";
import { buildApiKeyUsageLimitPolicyRejection } from "@/lib/usage/apiKeyUsageLimits";

// Default to no per-key request cap. API keys can still opt into explicit
// limits via Settings/API Keys, while provider/account quota controls remain
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
  scopes?: string[];
  allowedEndpoints?: string[];
  disableNonPublicModels?: boolean;
  allowUsageCommand?: boolean;
  usageLimitEnabled?: boolean;
  dailyUsageLimitUsd?: number | null;
  weeklyUsageLimitUsd?: number | null;
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

function isAnthropicMessagesRequest(request: Request): boolean {
  if (request.headers.has("anthropic-version")) return true;

  try {
    const url = new URL(request.url);
    return url.pathname.endsWith("/v1/messages");
  } catch {
    return false;
  }
}

function policyErrorResponse(
  request: Request,
  statusCode: number,
  message: string,
  anthropicMessage = message,
  anthropicErrorType = "permission_error",
  anthropicStatusCode = statusCode
): Response {
  if (!isAnthropicMessagesRequest(request)) {
    return errorResponse(statusCode, message);
  }

  const safeMessage = sanitizeErrorMessage(anthropicMessage);
  return new Response(
    JSON.stringify({
      type: "error",
      error: {
        type: anthropicErrorType,
        message: safeMessage,
      },
    }),
    {
      status: anthropicStatusCode,
      headers: { "Content-Type": "application/json" },
    }
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

function quotaPolicyResponse(message: string, code: string): Response {
  const body = buildErrorBody(HTTP_STATUS.FORBIDDEN, message);
  body.error.code = code;
  return new Response(JSON.stringify(body), {
    status: HTTP_STATUS.FORBIDDEN,
    headers: { "Content-Type": "application/json" },
  });
}

async function validateQuotaRoutingTarget(
  modelStr: string,
  allowedQuotas: string[]
): Promise<Response | null> {
  if (isQuotaModelName(modelStr) && allowedQuotas.length === 0) {
    return quotaPolicyResponse(
      `Model "${modelStr}" requires a quota-pool allocation; this API key is not allocated to any quota pool`,
      "QUOTA_NOT_ALLOCATED"
    );
  }
  if (allowedQuotas.length === 0) return null;

  try {
    const scope = await resolveQuotaKeyScope(allowedQuotas);
    const parsed = isQuotaModelName(modelStr) ? parseQuotaModelName(modelStr) : null;
    const allowed =
      parsed !== null &&
      scope.poolSlugs.includes(parsed.groupSlug) &&
      scope.providers.includes(parsed.provider);
    if (allowed) return null;
    return quotaPolicyResponse(
      isQuotaModelName(modelStr)
        ? `Model "${modelStr}" is not in this key's quota pools`
        : "This quota-exclusive API key may only use quotaShared-* models",
      "QUOTA_ONLY"
    );
  } catch (error) {
    log.error("API_POLICY", "Routing target quota check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key quota policy unavailable");
  }
}

async function validateStandardRoutingTarget(
  request: Request,
  apiKey: string,
  apiKeyInfo: ApiKeyMetadata,
  modelStr: string
): Promise<Response | null> {
  let requestedComboName: string | null = null;
  if (apiKeyInfo.allowedCombos && apiKeyInfo.allowedCombos.length > 0) {
    try {
      const comboAccess = await isComboAllowedForKey(apiKeyInfo.allowedCombos, modelStr);
      requestedComboName = comboAccess.comboName;
      if (!comboAccess.allowed) {
        return errorResponse(
          HTTP_STATUS.FORBIDDEN,
          `Combo "${comboAccess.comboName || modelStr}" is not allowed for this API key`
        );
      }
    } catch (error) {
      log.error("API_POLICY", "Routing target combo check failed. Request blocked.", { error });
      return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key combo policy unavailable");
    }
  }

  const hasModelRestrictions =
    (apiKeyInfo.allowedModels && apiKeyInfo.allowedModels.length > 0) ||
    apiKeyInfo.disableNonPublicModels === true;
  if (!requestedComboName && hasModelRestrictions && modelStr.startsWith("auto/")) {
    requestedComboName = modelStr;
  }
  if (!requestedComboName && hasModelRestrictions) {
    try {
      requestedComboName = await resolveRequestedComboName(modelStr);
    } catch {
      requestedComboName = null;
    }
  }
  if (
    !requestedComboName &&
    hasModelRestrictions &&
    !(await isModelAllowedForKey(apiKey, modelStr))
  ) {
    return policyErrorResponse(
      request,
      HTTP_STATUS.FORBIDDEN,
      `Model "${modelStr}" is not allowed for this API key`,
      `Model "${modelStr}" is not enabled or quota is insufficient. Choose another allowed model.`,
      "invalid_request_error",
      HTTP_STATUS.BAD_REQUEST
    );
  }
  return null;
}

/**
 * Validate only the model/combo authorization of a routing target.
 *
 * The full request policy has already run before routing. Calling it again for a
 * policy-generated target would charge request limits twice and apply throttling
 * twice. This narrower check proves that routing did not widen the key's access
 * without consuming any budget, token-limit, or rate-limit state.
 */
export async function validateApiKeyRoutingTarget(
  request: Request,
  apiKey: string | null,
  apiKeyInfo: ApiKeyMetadata | null,
  modelStr: string | null
): Promise<Response | null> {
  if (!apiKey || !apiKeyInfo || !modelStr) return null;

  const allowedQuotas = Array.isArray(apiKeyInfo.allowedQuotas) ? apiKeyInfo.allowedQuotas : [];
  const quotaRejection = await validateQuotaRoutingTarget(modelStr, allowedQuotas);
  if (quotaRejection || allowedQuotas.length > 0) return quotaRejection;
  return validateStandardRoutingTarget(request, apiKey, apiKeyInfo, modelStr);
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
/** Header carrying the id of the API key a dashboard playground request wants to
 *  test the policy for (never the key secret). */
const PLAYGROUND_KEY_ID_HEADER = "x-omniroute-playground-key-id";

/**
 * Dashboard playground support. An authenticated admin session may test a
 * specific API key's policy (allowed_models, budget, …) WITHOUT putting the key
 * secret on the wire: the browser sends only the key id via
 * `x-omniroute-playground-key-id` and we resolve the secret server-side.
 *
 * Security: honored ONLY for authenticated dashboard sessions, and only as a
 * fallback when no bearer key was presented — so it can never bypass auth or
 * escalate privileges, it only applies (narrows to) the selected key's policy.
 */
export async function resolvePlaygroundTestKey(request: Request): Promise<string | null> {
  const keyId = request.headers.get(PLAYGROUND_KEY_ID_HEADER);
  if (!keyId) return null;
  if (!(await isDashboardSessionAuthenticated(request))) return null;
  try {
    const row = await getApiKeyById(keyId);
    return typeof row?.key === "string" ? row.key : null;
  } catch {
    return null;
  }
}

type PolicyContext = {
  request: Request;
  apiKey: string;
  apiKeyInfo: ApiKeyMetadata;
  modelStr: string | null;
};

function validateKeyStatus(context: PolicyContext): Response | null {
  const { apiKeyInfo } = context;
  if (apiKeyInfo.isActive === false) {
    return errorResponse(HTTP_STATUS.FORBIDDEN, "This API key is disabled");
  }
  if (apiKeyInfo.isBanned === true) {
    return errorResponse(HTTP_STATUS.FORBIDDEN, "This API key is banned due to policy violations");
  }
  if (apiKeyInfo.expiresAt && Date.now() > new Date(apiKeyInfo.expiresAt).getTime()) {
    return errorResponse(HTTP_STATUS.FORBIDDEN, "This API key has expired");
  }
  return null;
}

async function validateKeyScheduleAndUsage(context: PolicyContext): Promise<Response | null> {
  const { request, apiKey, apiKeyInfo } = context;
  if (apiKeyInfo.accessSchedule?.enabled && !isWithinSchedule(apiKeyInfo.accessSchedule)) {
    const { from, until, tz } = apiKeyInfo.accessSchedule;
    return errorResponse(
      HTTP_STATUS.FORBIDDEN,
      `Access denied outside allowed hours (${from}–${until} ${tz})`
    );
  }
  if (apiKeyInfo.usageLimitEnabled !== true) return null;

  try {
    const rejection = await buildApiKeyUsageLimitPolicyRejection(request, {
      id: apiKeyInfo.id,
      usageLimitEnabled: apiKeyInfo.usageLimitEnabled,
      dailyUsageLimitUsd: apiKeyInfo.dailyUsageLimitUsd,
      weeklyUsageLimitUsd: apiKeyInfo.weeklyUsageLimitUsd,
    });
    return rejection;
  } catch (error) {
    log.error("API_POLICY", "API key USD usage limit check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key usage limit unavailable");
  }
}

function validateEndpointAccess(context: PolicyContext): Response | null {
  const { request, apiKeyInfo } = context;
  if (!apiKeyInfo.allowedEndpoints?.length) return null;
  try {
    const category = resolveEndpointCategory(new URL(request.url).pathname);
    if (category && !apiKeyInfo.allowedEndpoints.includes(category)) {
      return errorResponse(
        HTTP_STATUS.FORBIDDEN,
        `Endpoint category "${category}" is not allowed for this API key`
      );
    }
  } catch {
    // URL parse failure — fail open, let other checks decide.
  }
  return null;
}

async function validateQuotaAccess(context: PolicyContext): Promise<Response | null> {
  const { apiKey, apiKeyInfo, modelStr } = context;
  if (!modelStr) return null;
  const allowedQuotas = Array.isArray(apiKeyInfo.allowedQuotas) ? apiKeyInfo.allowedQuotas : [];
  if (isQuotaModelName(modelStr) && allowedQuotas.length === 0) {
    return quotaPolicyResponse(
      `Model "${modelStr}" requires a quota-pool allocation; this API key is not allocated to any quota pool`,
      "QUOTA_NOT_ALLOCATED"
    );
  }
  if (!allowedQuotas.length) return null;

  try {
    const scope = await resolveQuotaKeyScope(allowedQuotas);
    const parsed = isQuotaModelName(modelStr) ? parseQuotaModelName(modelStr) : null;
    const allowed =
      parsed !== null &&
      scope.poolSlugs.length > 0 &&
      scope.poolSlugs.includes(parsed.groupSlug) &&
      scope.providers.includes(parsed.provider);
    if (allowed) return null;
    const message = isQuotaModelName(modelStr)
      ? `Model "${modelStr}" is not in this key's quota pools`
      : "This quota-exclusive API key may only use quotaShared-* models";
    return quotaPolicyResponse(message, "QUOTA_ONLY");
  } catch (error) {
    log.error("API_POLICY", "Quota scope check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key quota policy unavailable");
  }
}

async function validateModelAccess(context: PolicyContext): Promise<Response | null> {
  const { request, apiKey, apiKeyInfo, modelStr } = context;
  if (!modelStr || apiKeyInfo.allowedQuotas?.length) return null;
  const comboAccess = await validateComboAccess(apiKeyInfo.allowedCombos, modelStr);
  if (comboAccess.rejection) return comboAccess.rejection;
  let requestedComboName = comboAccess.comboName;

  const hasModelRestrictions =
    Boolean(apiKeyInfo.allowedModels?.length) || apiKeyInfo.disableNonPublicModels === true;
  if (!requestedComboName && hasModelRestrictions) {
    if (modelStr.startsWith("auto/") || modelStr.startsWith("qtSd/")) {
      requestedComboName = modelStr;
    } else {
      try {
        requestedComboName = await resolveRequestedComboName(modelStr);
      } catch {
        requestedComboName = null;
      }
    }
  }
  if (requestedComboName || !hasModelRestrictions) return null;
  if (await isModelAllowedForKey(apiKey, modelStr)) return null;
  return policyErrorResponse(
    request,
    HTTP_STATUS.FORBIDDEN,
    `Model "${modelStr}" is not allowed for this API key`,
    `Model "${modelStr}" is not enabled or quota is insufficient. Choose another allowed model.`,
    "invalid_request_error",
    HTTP_STATUS.BAD_REQUEST
  );
}

async function validateComboAccess(
  allowedCombos: string[] | undefined,
  modelStr: string
): Promise<{ comboName: string | null; rejection: Response | null }> {
  if (!allowedCombos?.length) return { comboName: null, rejection: null };
  try {
    const comboAccess = await isComboAllowedForKey(allowedCombos, modelStr);
    if (comboAccess.allowed) return { comboName: comboAccess.comboName, rejection: null };
    return {
      comboName: comboAccess.comboName,
      rejection: errorResponse(
        HTTP_STATUS.FORBIDDEN,
        `Combo "${comboAccess.comboName || modelStr}" is not allowed for this API key`
      ),
    };
  } catch (error) {
    log.error("API_POLICY", "Combo access check failed. Request blocked.", { error });
    return {
      comboName: null,
      rejection: errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "API key combo policy unavailable"),
    };
  }
}

function validateBudget(context: PolicyContext): Response | null {
  const { apiKeyInfo } = context;
  if (!apiKeyInfo.id) return null;
  try {
    const budgetOk = checkBudget(apiKeyInfo.id);
    return budgetOk.allowed
      ? null
      : errorResponse(HTTP_STATUS.RATE_LIMITED, budgetOk.reason || "Budget limit exceeded");
  } catch (error) {
    log.error("API_POLICY", "Budget check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "Budget policy unavailable");
  }
}

function validateTokenLimit(context: PolicyContext): Response | null {
  const { apiKeyInfo, modelStr } = context;
  if (!apiKeyInfo.id) return null;
  try {
    const breach = checkTokenLimits(apiKeyInfo.id, undefined, modelStr ?? undefined);
    if (!breach) return null;
    const scopeLabel =
      breach.scopeType === "global" ? "account" : `${breach.scopeType} "${breach.scopeValue}"`;
    return errorResponse(
      HTTP_STATUS.RATE_LIMITED,
      `Token limit exceeded for ${scopeLabel}: ${breach.tokensUsed}/${breach.limitValue} tokens used in the current window. Please try again later.`
    );
  } catch (error) {
    log.error("API_POLICY", "Token limit check failed. Request blocked.", { error });
    return errorResponse(HTTP_STATUS.SERVICE_UNAVAILABLE, "Token limit policy unavailable");
  }
}

function buildRateLimitRules(apiKeyInfo: ApiKeyMetadata): RateLimitRule[] {
  const custom = apiKeyInfo.rateLimits?.length;
  const rules = custom
    ? [...(apiKeyInfo.rateLimits as RateLimitRule[])]
    : [...DEFAULT_RATE_LIMITS, ...ENV_DEFAULT_RATE_LIMITS];
  if (!custom) {
    if (apiKeyInfo.maxRequestsPerDay)
      rules.push({ limit: apiKeyInfo.maxRequestsPerDay, window: 86400 });
    if (apiKeyInfo.maxRequestsPerMinute)
      rules.push({ limit: apiKeyInfo.maxRequestsPerMinute, window: 60 });
  }
  return rules;
}

async function validateRateLimitAndThrottle(context: PolicyContext): Promise<Response | null> {
  const { apiKeyInfo } = context;
  if (!apiKeyInfo.id) return null;
  const rules = buildRateLimitRules(apiKeyInfo);
  if (rules.length) {
    const result = await checkRateLimit(apiKeyInfo.id, rules);
    if (!result.allowed) {
      const window = result.failedWindow ? ` (${result.failedWindow}s window)` : "";
      return errorResponse(
        HTTP_STATUS.RATE_LIMITED,
        `Request limit exceeded${window}. Please try again later.`
      );
    }
  }
  if (apiKeyInfo.throttleDelayMs && apiKeyInfo.throttleDelayMs > 0) {
    await delay(Math.min(apiKeyInfo.throttleDelayMs, 300_000));
  }
  return null;
}

export async function enforceApiKeyPolicy(
  request: Request,
  modelStr: string | null
): Promise<ApiKeyPolicyResult> {
  // A real bearer key wins; otherwise an authenticated dashboard playground may
  // test a specific key's policy by id (resolved server-side, secret never sent).
  const apiKey = extractApiKey(request) || (await resolvePlaygroundTestKey(request));

  // No API key = local/session mode, skip policy checks
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

  const context = { request, apiKey, apiKeyInfo, modelStr };
  const statusRejection = validateKeyStatus(context);
  if (statusRejection) return { apiKey, apiKeyInfo, rejection: statusRejection };
  const scheduleRejection = await validateKeyScheduleAndUsage(context);
  if (scheduleRejection) return { apiKey, apiKeyInfo, rejection: scheduleRejection };
  const endpointRejection = validateEndpointAccess(context);
  if (endpointRejection) return { apiKey, apiKeyInfo, rejection: endpointRejection };

  const quotaRejection = await validateQuotaAccess(context);
  if (quotaRejection) return { apiKey, apiKeyInfo, rejection: quotaRejection };
  const modelRejection = await validateModelAccess(context);
  if (modelRejection) return { apiKey, apiKeyInfo, rejection: modelRejection };

  const budgetRejection = validateBudget(context);
  if (budgetRejection) return { apiKey, apiKeyInfo, rejection: budgetRejection };
  const tokenRejection = validateTokenLimit(context);
  if (tokenRejection) return { apiKey, apiKeyInfo, rejection: tokenRejection };
  const rateRejection = await validateRateLimitAndThrottle(context);
  if (rateRejection) return { apiKey, apiKeyInfo, rejection: rateRejection };

  return { apiKey, apiKeyInfo, rejection: null };
}
