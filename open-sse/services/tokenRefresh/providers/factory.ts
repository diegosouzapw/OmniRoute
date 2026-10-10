import { createHash } from "node:crypto";
import {
  FACTORY_API,
  FACTORY_CLIENT_VERSION,
  WORKOS_TOKEN,
  factoryApiForRegion,
} from "../../../config/factory.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { resolvePublicCred } from "../../../utils/publicCreds.ts";
import type { RefreshLogger } from "../shared.ts";
import { boundedMap } from "@/lib/quota/boundedMap";
import {
  computeExpiresAtMs,
  computeExpiresInSeconds,
  decodeJwtPayload,
  organizationIdFromAccessToken,
} from "@/lib/oauth/factoryPendingLogin";

const MAX_OAUTH_RESPONSE_BYTES = 64 * 1024;
const AUTH_REQUEST_TIMEOUT_MS = 30_000;
const REFRESH_TOKEN_GRANT = "refresh_token";
const WORKOS_ORG_SELECTOR = /^org[-_][a-zA-Z0-9_-]+$/;
const SAFE_ERROR_CODE = /^[a-z0-9_.:-]{1,80}$/i;

interface FactoryPendingGrant {
  accessToken: string;
  refreshToken: string;
  expiresIn?: number;
  expiresAtMs: number;
}

const pendingGrants = boundedMap<FactoryPendingGrant>(
  "factory-pending-grants",
  4096,
  "ttl",
  5 * 60 * 1000
);

async function readBoundedResponseText(response: Response, label: string): Promise<string> {
  if (!response.body) return "";
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let receivedBytes = 0;
  let text = "";

  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    receivedBytes += chunk.value.byteLength;
    if (receivedBytes > MAX_OAUTH_RESPONSE_BYTES) {
      await reader.cancel();
      throw new Error(`Factory OAuth ${label} response exceeded ${MAX_OAUTH_RESPONSE_BYTES} bytes`);
    }
    text += decoder.decode(chunk.value, { stream: true });
  }

  return text + decoder.decode();
}

function oauthErrorCodeFromResponse(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  const obj = value as Record<string, unknown>;
  const raw = obj.error || obj.code || obj.type;
  if (typeof raw === "string" && SAFE_ERROR_CODE.test(raw)) {
    return raw;
  }
  return undefined;
}

async function readJsonResponseBody(response: Response, label: string): Promise<unknown> {
  const text = await readBoundedResponseText(response, label);
  try {
    return JSON.parse(text);
  } catch {
    if (!response.ok) {
      throw new Error(`Factory OAuth ${label} request failed. status=${response.status}`);
    }
    throw new Error(`Factory OAuth ${label} returned invalid JSON`);
  }
}

function isTransientError(error: unknown, status?: number): boolean {
  if (typeof status === "number") {
    return status === 429 || status >= 500;
  }
  if (error instanceof Error) {
    if (error.name === "AbortError") return false;
    const msg = error.message.toLowerCase();
    return (
      msg.includes("fetch failed") ||
      msg.includes("network") ||
      msg.includes("econnreset") ||
      msg.includes("timeout") ||
      msg.includes("etimedout")
    );
  }
  return false;
}

export type RefreshFactoryTokenResult =
  | {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
      expiresAt: string;
      providerSpecificData: Record<string, unknown>;
    }
  | {
      error: "unrecoverable_refresh_error";
      code?: string;
    }
  | null;

/**
 * Specialized refresh for Factory AI OAuth tokens.
 *
 * Implements single-use rotating refresh with pending grant cache to prevent
 * token loss on transient verification failures.
 */
export async function refreshFactoryToken(
  refreshToken: string,
  credentials: Record<string, unknown>,
  log?: RefreshLogger,
  proxyConfig: unknown = null
): Promise<RefreshFactoryTokenResult> {
  if (!refreshToken || typeof refreshToken !== "string" || refreshToken.trim().length === 0) {
    log?.warn?.("TOKEN_REFRESH", "No valid refresh token provided for Factory refresh");
    return { error: "unrecoverable_refresh_error", code: "missing_refresh_token" };
  }

  const clientId = resolvePublicCred("factory_id", "FACTORY_OAUTH_CLIENT_ID");
  const psd = ((credentials?.providerSpecificData as Record<string, unknown>) || {}) as Record<
    string,
    unknown
  >;

  const orgId = typeof psd.orgId === "string" ? psd.orgId.trim() : undefined;
  const workosOrgId = typeof psd.workosOrgId === "string" ? psd.workosOrgId.trim() : undefined;
  const candidateWorkosOrg =
    workosOrgId && WORKOS_ORG_SELECTOR.test(workosOrgId)
      ? workosOrgId
      : orgId && WORKOS_ORG_SELECTOR.test(orgId)
        ? orgId
        : undefined;

  const pendingKey = createHash("sha256")
    .update(refreshToken + "\0" + (candidateWorkosOrg || orgId || ""))
    .digest("hex");

  let candidateGrant = pendingGrants.get(pendingKey);

  if (!candidateGrant) {
    const timeoutSignal = AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS);
    const bodyParams = new URLSearchParams({
      grant_type: REFRESH_TOKEN_GRANT,
      refresh_token: refreshToken,
      client_id: clientId,
    });
    if (candidateWorkosOrg) {
      bodyParams.set("organization_id", candidateWorkosOrg);
    }

    let response: Response;
    try {
      response = await runWithProxyContext(proxyConfig, () =>
        fetch(WORKOS_TOKEN, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: bodyParams,
          redirect: "error",
          signal: timeoutSignal,
        })
      );
    } catch (networkErr) {
      log?.warn?.("TOKEN_REFRESH", "Transient network error calling WorkOS token refresh", {
        error: networkErr instanceof Error ? networkErr.message : String(networkErr),
      });
      return null;
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = (await readJsonResponseBody(response, "refresh token")) as Record<string, unknown>;
    } catch {
      if (isTransientError(undefined, response.status)) return null;
      pendingGrants.delete(pendingKey);
      return { error: "unrecoverable_refresh_error", code: "invalid_response" };
    }

    if (!response.ok) {
      const code = oauthErrorCodeFromResponse(parsed);
      log?.error?.("TOKEN_REFRESH", "Failed to refresh Factory OAuth token via WorkOS", {
        status: response.status,
        code: code || "unknown",
      });

      if (code === "invalid_grant" || code === "invalid_request" || response.status === 400) {
        pendingGrants.delete(pendingKey);
        return { error: "unrecoverable_refresh_error", code: code || "invalid_grant" };
      }

      if (isTransientError(undefined, response.status)) {
        return null;
      }

      return null;
    }

    const newAccessToken = typeof parsed.access_token === "string" ? parsed.access_token : "";
    const newRefreshToken =
      typeof parsed.refresh_token === "string" && parsed.refresh_token.trim().length > 0
        ? parsed.refresh_token
        : refreshToken;

    if (!newAccessToken) {
      log?.error?.("TOKEN_REFRESH", "WorkOS refresh response missing access_token");
      pendingGrants.delete(pendingKey);
      return { error: "unrecoverable_refresh_error", code: "invalid_response" };
    }

    const rawExpiresIn = typeof parsed.expires_in === "number" ? parsed.expires_in : undefined;
    const expiresAtMs = computeExpiresAtMs(rawExpiresIn, newAccessToken);

    candidateGrant = {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      expiresIn: rawExpiresIn,
      expiresAtMs,
    };

    pendingGrants.set(pendingKey, candidateGrant);
  }

  // ── Validate organization scoping ──────────────────────────────────────────
  let tokenOrganizationId = organizationIdFromAccessToken(candidateGrant.accessToken);

  let effectiveWorkosOrgId = candidateWorkosOrg ?? tokenOrganizationId;

  if (!tokenOrganizationId) {
    if (!effectiveWorkosOrgId) {
      try {
        const orgTimeoutSignal = AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS);
        const orgResponse = await runWithProxyContext(proxyConfig, () =>
          fetch(`${FACTORY_API}/api/cli/org`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${candidateGrant!.accessToken}`,
              "Content-Type": "application/json",
              "X-Factory-Client": "cli",
              "X-Client-Version": FACTORY_CLIENT_VERSION,
              "User-Agent": `factory-cli/${FACTORY_CLIENT_VERSION}`,
            },
            redirect: "error",
            signal: orgTimeoutSignal,
          })
        );
        const orgParsed = (await readJsonResponseBody(orgResponse, "org membership")) as Record<
          string,
          unknown
        >;
        const rawOrgs = Array.isArray(orgParsed.workosOrgIds) ? orgParsed.workosOrgIds : [];
        const uniqueOrgs = Array.from(
          new Set(
            rawOrgs.filter((id): id is string => typeof id === "string" && id.trim().length > 0)
          )
        );

        if (uniqueOrgs.length === 1) {
          effectiveWorkosOrgId = uniqueOrgs[0];
        } else {
          log?.error?.(
            "TOKEN_REFRESH",
            "Multiple or missing Factory organizations without stored workosOrgId; re-auth required"
          );
          pendingGrants.delete(pendingKey);
          return { error: "unrecoverable_refresh_error", code: "organization_selection_required" };
        }
      } catch (orgErr) {
        if (isTransientError(orgErr)) {
          return null;
        }
        pendingGrants.delete(pendingKey);
        return { error: "unrecoverable_refresh_error", code: "organization_resolution_failed" };
      }
    }

    try {
      const reRefreshTimeoutSignal = AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS);
      const reRefreshBody = new URLSearchParams({
        grant_type: REFRESH_TOKEN_GRANT,
        refresh_token: candidateGrant.refreshToken,
        client_id: clientId,
      });
      if (effectiveWorkosOrgId && WORKOS_ORG_SELECTOR.test(effectiveWorkosOrgId)) {
        reRefreshBody.set("organization_id", effectiveWorkosOrgId);
      }

      const reRefreshResponse = await runWithProxyContext(proxyConfig, () =>
        fetch(WORKOS_TOKEN, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: reRefreshBody,
          redirect: "error",
          signal: reRefreshTimeoutSignal,
        })
      );

      const reRefreshParsed = (await readJsonResponseBody(
        reRefreshResponse,
        "re-refresh token"
      )) as Record<string, unknown>;

      if (!reRefreshResponse.ok) {
        const code = oauthErrorCodeFromResponse(reRefreshParsed);
        if (code === "invalid_grant" || reRefreshResponse.status === 400) {
          pendingGrants.delete(pendingKey);
          return { error: "unrecoverable_refresh_error", code: code || "invalid_grant" };
        }
        return null;
      }

      const scopedAccess =
        typeof reRefreshParsed.access_token === "string" ? reRefreshParsed.access_token : "";
      const scopedRefresh =
        typeof reRefreshParsed.refresh_token === "string"
          ? reRefreshParsed.refresh_token
          : candidateGrant.refreshToken;
      const rawExp =
        typeof reRefreshParsed.expires_in === "number" ? reRefreshParsed.expires_in : undefined;

      candidateGrant = {
        accessToken: scopedAccess,
        refreshToken: scopedRefresh,
        expiresIn: rawExp,
        expiresAtMs: computeExpiresAtMs(rawExp, scopedAccess),
      };
      pendingGrants.set(pendingKey, candidateGrant);
      tokenOrganizationId = organizationIdFromAccessToken(scopedAccess);
    } catch (reErr) {
      if (isTransientError(reErr)) {
        return null;
      }
      pendingGrants.delete(pendingKey);
      return { error: "unrecoverable_refresh_error", code: "re_refresh_failed" };
    }
  }

  const scopedPayload = decodeJwtPayload(candidateGrant.accessToken);
  if (
    !orgId ||
    (tokenOrganizationId && tokenOrganizationId !== orgId) ||
    (candidateWorkosOrg &&
      typeof scopedPayload?.org_id === "string" &&
      scopedPayload.org_id !== candidateWorkosOrg)
  ) {
    log?.error?.("TOKEN_REFRESH", "Factory rotated token does not match the stored organization");
    pendingGrants.delete(pendingKey);
    return { error: "unrecoverable_refresh_error", code: "organization_mismatch" };
  }
  // ── Confirm identity with whoami ───────────────────────────────────────────
  const targetOrgHeader = orgId;
  const whoamiHeaders: Record<string, string> = {
    Authorization: `Bearer ${candidateGrant.accessToken}`,
    "Content-Type": "application/json",
    "X-Factory-Client": "cli",
    "X-Client-Version": FACTORY_CLIENT_VERSION,
    "User-Agent": `factory-cli/${FACTORY_CLIENT_VERSION}`,
  };
  if (targetOrgHeader) {
    whoamiHeaders["X-Factory-Org-Id"] = targetOrgHeader;
  }

  const whoamiTimeoutSignal = AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS);
  let whoamiResponse: Response;
  try {
    whoamiResponse = await runWithProxyContext(proxyConfig, () =>
      fetch(`${FACTORY_API}/api/cli/whoami`, {
        method: "GET",
        headers: whoamiHeaders,
        redirect: "error",
        signal: whoamiTimeoutSignal,
      })
    );
  } catch (whoamiNetErr) {
    log?.warn?.(
      "TOKEN_REFRESH",
      "Transient network error confirming Factory whoami; retaining candidate",
      {
        error: whoamiNetErr instanceof Error ? whoamiNetErr.message : String(whoamiNetErr),
      }
    );
    return null;
  }

  if (!whoamiResponse.ok) {
    if (whoamiResponse.status === 401 || whoamiResponse.status === 403) {
      pendingGrants.delete(pendingKey);
      return { error: "unrecoverable_refresh_error", code: "whoami_unauthorized" };
    }
    if (isTransientError(undefined, whoamiResponse.status)) return null;
    pendingGrants.delete(pendingKey);
    return { error: "unrecoverable_refresh_error", code: "whoami_failed" };
  }

  let whoamiParsed: Record<string, unknown>;
  try {
    whoamiParsed = (await readJsonResponseBody(whoamiResponse, "whoami")) as Record<
      string,
      unknown
    >;
  } catch {
    // Keep the rotated single-use token for verification on the next attempt.
    return null;
  }

  const confirmedAccountId = (whoamiParsed.orgId ||
    whoamiParsed.org_id ||
    whoamiParsed.organization_id ||
    whoamiParsed.organizationId) as string | undefined;

  if (!confirmedAccountId || typeof confirmedAccountId !== "string") {
    log?.error?.("TOKEN_REFRESH", "Factory whoami response did not include an organization ID");
    pendingGrants.delete(pendingKey);
    return { error: "unrecoverable_refresh_error", code: "missing_org_in_whoami" };
  }

  if (targetOrgHeader && confirmedAccountId.trim() !== targetOrgHeader.trim()) {
    log?.error?.("TOKEN_REFRESH", "Factory whoami returned different organization than requested", {
      expected: targetOrgHeader,
      actual: confirmedAccountId,
    });
    pendingGrants.delete(pendingKey);
    return { error: "unrecoverable_refresh_error", code: "organization_mismatch" };
  }

  const region = typeof whoamiParsed.region === "string" ? whoamiParsed.region.trim() : undefined;
  let apiEndpoint: string;
  try {
    apiEndpoint = factoryApiForRegion(region);
  } catch {
    // A malformed upstream region must not discard a consumed refresh generation.
    return null;
  }
  pendingGrants.delete(pendingKey);
  const expiresIn = computeExpiresInSeconds(candidateGrant.expiresAtMs);
  const expiresAt = new Date(candidateGrant.expiresAtMs).toISOString();

  log?.info?.("TOKEN_REFRESH", "Successfully refreshed Factory OAuth token", {
    orgId: confirmedAccountId,
    expiresIn,
  });

  return {
    accessToken: candidateGrant.accessToken,
    refreshToken: candidateGrant.refreshToken,
    expiresIn,
    expiresAt,
    providerSpecificData: {
      ...psd,
      orgId: confirmedAccountId,
      workosOrgId: effectiveWorkosOrgId ?? confirmedAccountId,
      region: region ?? (psd.region as string | undefined),
      apiEndpoint: apiEndpoint ?? (psd.apiEndpoint as string | undefined),
    },
  };
}
