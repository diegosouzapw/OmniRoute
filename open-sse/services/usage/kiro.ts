/**
 * usage/kiro.ts — Kiro / Amazon Q (AWS CodeWhisperer) usage fetcher + quota helpers.
 *
 * Extracted from services/usage.ts (god-file decomposition): the Kiro family — overage
 * detection, per-resource quota assembly (buildKiroQuota / buildKiroUsageResult), region-aware
 * profile-ARN discovery, the social-auth account marker, and the getKiroUsage fetcher that
 * calls GetUsageLimits on the region-matched CodeWhisperer endpoint. Depends only on the
 * sibling scalar/quota leaves — no host coupling — so it lives as a co-located provider leaf.
 * usage.ts imports getKiroUsage (dispatcher) + re-exports buildKiroUsageResult /
 * discoverKiroProfileArn (external kiro tests import them from services/usage) and pulls
 * getKiroUsage into __testing. Behavior-preserving move.
 */

import { toRecord, toNumber } from "./scalars.ts";
import { type UsageQuota, parseResetTime } from "./quota.ts";
import {
  discoverKiroProfileArnAcrossRegions,
  kiroRuntimeHost,
  resolveKiroRuntimeRegion,
} from "../kiroRegion.ts";
import {
  isExternalIdpAuthMethod,
  KIRO_EXTERNAL_IDP_TOKEN_TYPE_HEADER,
  KIRO_EXTERNAL_IDP_TOKEN_TYPE_VALUE,
} from "../kiroExternalIdp.ts";

type JsonRecord = Record<string, unknown>;

const CODEWHISPERER_BASE_URL =
  process.env.OMNIROUTE_CODEWHISPERER_BASE_URL ?? "https://codewhisperer.us-east-1.amazonaws.com";

function isKiroOverageEnabled(data: JsonRecord): boolean {
  const overageConfiguration = toRecord(data.overageConfiguration);
  const overageStatus = String(overageConfiguration.overageStatus || "")
    .trim()
    .toUpperCase();

  return (
    overageStatus === "ENABLED" ||
    data.overageEnabled === true ||
    overageConfiguration.overageEnabled === true
  );
}

function buildKiroQuota(
  used: number,
  total: number,
  resetAt: string | null,
  overageEnabled: boolean
): UsageQuota {
  const remaining = total - used;

  if (!overageEnabled) {
    return { used, total, remaining, resetAt, unlimited: false };
  }

  return {
    used,
    total,
    remaining,
    remainingPercentage: 100,
    resetAt,
    unlimited: true,
  };
}

/**
 * Build the Kiro usage result from a GetUsageLimits response. When the account returns no
 * usage breakdown (some AWS IAM / Builder ID accounts don't expose per-resource quota via
 * GetUsageLimits), return an informative message instead of empty `quotas:{}` — otherwise the
 * dashboard renders a blank quota card with no explanation (#3506). Exported for testing.
 */
export function buildKiroUsageResult(
  data: JsonRecord
): { plan: string; quotas: Record<string, UsageQuota> } | { message: string } {
  const usageList = Array.isArray(data.usageBreakdownList) ? data.usageBreakdownList : [];
  const quotaInfo: Record<string, UsageQuota> = {};
  const resetAt = parseResetTime(data.nextDateReset || data.resetDate);
  const overageEnabled = isKiroOverageEnabled(data);

  usageList.forEach((breakdownValue: unknown) => {
    const breakdown = toRecord(breakdownValue);
    const resourceType =
      typeof breakdown.resourceType === "string" ? breakdown.resourceType.toLowerCase() : "unknown";
    const used = toNumber(breakdown.currentUsageWithPrecision, 0);
    const total = toNumber(breakdown.usageLimitWithPrecision, 0);

    quotaInfo[resourceType] = buildKiroQuota(used, total, resetAt, overageEnabled);

    const freeTrialInfo = toRecord(breakdown.freeTrialInfo);
    if (Object.keys(freeTrialInfo).length > 0) {
      const freeUsed = toNumber(freeTrialInfo.currentUsageWithPrecision, 0);
      const freeTotal = toNumber(freeTrialInfo.usageLimitWithPrecision, 0);
      quotaInfo[`${resourceType}_freetrial`] = buildKiroQuota(
        freeUsed,
        freeTotal,
        resetAt,
        overageEnabled
      );
    }
  });

  if (Object.keys(quotaInfo).length === 0) {
    return {
      message:
        "Kiro connected, but the account returned no usage breakdown. Some AWS IAM / Builder ID accounts don't expose per-resource quota via GetUsageLimits.",
    };
  }

  return {
    plan: String(toRecord(data.subscriptionInfo).subscriptionTitle || "").trim() || "Kiro",
    quotas: quotaInfo,
  };
}

/**
 * Discover a Kiro/CodeWhisperer profile ARN for an account that didn't persist one (common for
 * AWS IAM Identity Center logins and kiro-cli imports). Calls ListAvailableProfiles on the
 * region-matched endpoint and prefers a profile whose ARN is in the same region. Returns
 * undefined when no profile is available (e.g. the org/token has no Kiro entitlement).
 * Exported for testing.
 */
export async function discoverKiroProfileArn(
  accessToken: string,
  usageBaseUrl: string,
  region: string,
  authMethod?: string
): Promise<string | undefined> {
  try {
    const isApiKey = authMethod === "api_key";
    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-amz-json-1.0",
      "x-amz-target": "AmazonCodeWhispererService.ListAvailableProfiles",
      Accept: "application/json",
    };
    if (isApiKey) {
      headers.tokentype = "API_KEY";
    }

    const response = await fetch(usageBaseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ maxResults: 10 }),
      // Don't let a hung profile lookup block the usage/quota refresh indefinitely.
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return undefined;

    const data = toRecord(await response.json());
    const profiles = Array.isArray(data.profiles) ? data.profiles : [];
    const normalizedRegion = region.toLowerCase();
    const matched =
      profiles.find((profile: unknown) => {
        const arn = toRecord(profile).arn;
        return typeof arn === "string" && arn.toLowerCase().includes(`:${normalizedRegion}:`);
      }) || profiles[0];
    const arn = toRecord(matched).arn;
    return typeof arn === "string" && arn.length > 0 ? arn : undefined;
  } catch {
    return undefined;
  }
}

/**
 * The three GetUsageLimits attempts (CodeWhisperer POST, regional GET, Q GET) tried in
 * order by getKiroUsage — extracted so the auth-method header variants (api_key
 * `tokentype`, external_idp `TokenType`) stay in one authHeaders object and the parent
 * function stays under the function-length gate.
 *
 * The POST variant (x-amz-json-1.0 + `x-amz-target: ...GetUsageLimits`) is tried FIRST: it
 * is the canonical AWS JSON-RPC shape used everywhere else in the Kiro integration
 * (discoverKiroProfileArn's ListAvailableProfiles call, kiroModels.ts fingerprinting) and,
 * critically, it is the only variant whose URL is built from the RUNTIME-region-resolved
 * `usageBaseUrl` (see resolveKiroRuntimeRegion in getKiroUsage) with the profileArn in the
 * payload — required for cross-region IAM Identity Center accounts (#6099) where the profile
 * lives in a different region than the IdC/token region. The two GET variants are
 * best-effort fallbacks (added for #6587 API-key auth) for accounts/regions where the POST
 * shape is rejected.
 */
function buildKiroUsageAttempts(opts: {
  authHeaders: Record<string, string>;
  usageParams: URLSearchParams;
  qParams: URLSearchParams;
  payload: Record<string, unknown>;
  usageBaseUrl: string;
  qBaseUrl: string;
}): Array<{ name: string; run: () => Promise<Response> }> {
  const { authHeaders, usageParams, qParams, payload, usageBaseUrl, qBaseUrl } = opts;
  return [
    {
      name: "codewhisperer-post",
      run: () =>
        fetch(usageBaseUrl, {
          method: "POST",
          headers: {
            ...authHeaders,
            "Content-Type": "application/x-amz-json-1.0",
            "x-amz-target": "AmazonCodeWhispererService.GetUsageLimits",
          },
          body: JSON.stringify(payload),
        }),
    },
    {
      name: "codewhisperer-get",
      run: () =>
        fetch(`${CODEWHISPERER_BASE_URL}/getUsageLimits?${usageParams.toString()}`, {
          method: "GET",
          headers: {
            ...authHeaders,
            "x-amz-user-agent": "aws-sdk-js/1.0.0 KiroIDE",
            "user-agent": "aws-sdk-js/1.0.0 KiroIDE",
          },
        }),
    },
    {
      name: "q-get",
      run: () =>
        fetch(`${qBaseUrl}/getUsageLimits?${qParams.toString()}`, {
          method: "GET",
          headers: authHeaders,
        }),
    },
  ];
}

/**
 * Base auth headers for the usage endpoints, per auth method: long-lived API keys add
 * `tokentype: API_KEY`; enterprise / Microsoft Entra (external_idp) org accounts require
 * `TokenType: EXTERNAL_IDP` for CodeWhisperer to bind the bearer to the profile (without
 * it GetUsageLimits returns `ValidationException: Invalid ARN`).
 */
function buildKiroAuthHeaders(
  accessToken: string | undefined,
  isApiKey: boolean,
  providerSpecificData?: JsonRecord
): Record<string, string> {
  const authHeaders: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
  };
  if (isApiKey) {
    authHeaders.tokentype = "API_KEY";
  }
  if (isExternalIdpAuthMethod(providerSpecificData?.authMethod)) {
    authHeaders[KIRO_EXTERNAL_IDP_TOKEN_TYPE_HEADER] = KIRO_EXTERNAL_IDP_TOKEN_TYPE_VALUE;
  }
  return authHeaders;
}

/**
 * Runs the GetUsageLimits attempts in order until one succeeds. Collects per-attempt
 * errors and whether any endpoint rejected the token (401/403) so getKiroUsage can
 * pick the right user-facing message — extracted for the function-length gate.
 */
async function runKiroUsageAttempts(
  attempts: Array<{ name: string; run: () => Promise<Response> }>
): Promise<{
  data?: JsonRecord;
  sawAuthError: boolean;
  errors: string[];
  lastHttpFailure?: string;
}> {
  let sawAuthError = false;
  let lastHttpFailure: string | undefined;
  const errors: string[] = [];
  for (const attempt of attempts) {
    let response: Response;
    try {
      response = await attempt.run();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${attempt.name}:${message}`);
      continue;
    }
    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      if (response.status === 401 || response.status === 403) {
        sawAuthError = true;
      }
      lastHttpFailure = `Kiro API error (${response.status}): ${errorText}`;
      errors.push(`${attempt.name}:${response.status}${errorText ? `:${errorText}` : ""}`);
      continue;
    }
    return { data: toRecord(await response.json()), sawAuthError, errors, lastHttpFailure };
  }
  return { sawAuthError, errors, lastHttpFailure };
}

/**
 * Kiro (AWS CodeWhisperer) Usage
 */
export async function getKiroUsage(accessToken?: string, providerSpecificData?: JsonRecord) {
  try {
    const authMethod =
      typeof providerSpecificData?.authMethod === "string"
        ? providerSpecificData.authMethod
        : undefined;
    const isApiKey = authMethod === "api_key";
    let profileArn =
      typeof providerSpecificData?.profileArn === "string"
        ? providerSpecificData.profileArn
        : undefined;

    const storedRegion =
      typeof providerSpecificData?.region === "string"
        ? providerSpecificData.region.trim().toLowerCase()
        : undefined;

    // Enterprise IAM Identity Center logins and kiro-cli imports frequently don't persist a
    // profileArn. Discover it by probing the Q Developer PROFILE regions (us-east-1 / eu-central-1)
    // — NOT the IdC/token region. An IdC in eu-north-1 has no Q runtime host (q.eu-north-1 does not
    // exist); its profile lives in eu-central-1 (or us-east-1) and the SSO token works cross-region
    // against it. Without this, the quota card previously showed nothing ("no limits") for such
    // accounts because the single-region lookup at q.{idcRegion} always failed.
    if (!profileArn && accessToken) {
      profileArn = await discoverKiroProfileArnAcrossRegions(accessToken, storedRegion);
    }

    if (!profileArn && !isApiKey) {
      return { message: "Kiro connected. Profile ARN not available for quota tracking." };
    }

    // The RUNTIME region is the profileArn region (us-east-1 / eu-central-1), never the IdC token
    // region. Route GetUsageLimits to that region's host so quota resolves for cross-region IdC.
    const region = resolveKiroRuntimeRegion({ region: storedRegion, profileArn });
    const usageBaseUrl = region === "us-east-1" ? CODEWHISPERER_BASE_URL : kiroRuntimeHost(region);
    const qBaseUrl = `https://q.${region}.amazonaws.com`;

    const authHeaders = buildKiroAuthHeaders(accessToken, isApiKey, providerSpecificData);

    const usageParams = new URLSearchParams({
      isEmailRequired: "true",
      origin: "AI_EDITOR",
      resourceType: "AGENTIC_REQUEST",
    });
    const qParams = new URLSearchParams({
      origin: "AI_EDITOR",
      ...(profileArn ? { profileArn } : {}),
      resourceType: "AGENTIC_REQUEST",
    });
    const payload = {
      origin: "AI_EDITOR",
      ...(profileArn ? { profileArn } : {}),
      resourceType: "AGENTIC_REQUEST",
    };

    const attempts = buildKiroUsageAttempts({
      authHeaders,
      usageParams,
      qParams,
      payload,
      usageBaseUrl,
      qBaseUrl,
    });

    const outcome = await runKiroUsageAttempts(attempts);
    if (outcome.data) {
      return buildKiroUsageResult(outcome.data);
    }
    const { sawAuthError, errors } = outcome;

    if (sawAuthError) {
      // Social-auth Kiro accounts (added via /api/oauth/kiro/social-exchange with provider
      // Google or GitHub) use a different token format that AWS CodeWhisperer's GetUsageLimits
      // routinely rejects with 401/403, even when /messages still works. Surface a clear
      // "auth expired, chat may still work" message instead of a generic upstream-error blob
      // so the quota card matches what users with legacy social-auth accounts already see.
      // Inspired by https://github.com/decolua/9router/pull/620.
      if (isSocialAuthKiroAccount(providerSpecificData)) {
        return {
          message: "Kiro quota API authentication expired. Chat may still work.",
          quotas: {},
        };
      }
      return {
        message: "Kiro quota API rejected the current token. Chat may still work.",
        quotas: {},
      };
    }

    // Hard (non-auth) failure keeps the pre-#6587 reject semantics — callers and
    // tests/unit/usage-service-hardening.test.ts rely on the rejection; prefer the last
    // HTTP-status failure (most informative) over a network-level error.
    throw new Error(
      outcome.lastHttpFailure ||
        (errors.length > 0
          ? errors[errors.length - 1]
          : "no usage endpoint responded")
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to fetch Kiro usage: ${message}`);
  }
}

/**
 * Was this Kiro connection added via the Google/GitHub social-auth device flow
 * (POST /api/oauth/kiro/social-exchange)? That route persists
 * `{ authMethod: "imported", provider: "Google" | "Github" }` on the connection.
 * Builder-ID / IDC / kiro-cli imports use different markers and should keep the
 * existing throw-on-failure behavior.
 */
function isSocialAuthKiroAccount(providerSpecificData?: JsonRecord): boolean {
  if (!providerSpecificData || providerSpecificData.authMethod !== "imported") return false;
  const provider =
    typeof providerSpecificData.provider === "string"
      ? providerSpecificData.provider.toLowerCase()
      : "";
  return provider === "google" || provider === "github";
}
