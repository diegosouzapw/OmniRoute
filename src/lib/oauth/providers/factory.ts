import {
  FACTORY_API,
  FACTORY_CLIENT_VERSION,
  factoryApiForRegion,
} from "@omniroute/open-sse/config/factory.ts";
import { FACTORY_CONFIG } from "../constants/oauth.ts";
import {
  claimPendingLogin,
  computeExpiresAtMs,
  computeExpiresInSeconds,
  createPendingLogin,
  decodeJwtPayload,
  deletePendingLogin,
  emailFromAccessToken,
  expiresFromAccessToken,
  organizationIdFromAccessToken,
  releasePendingLogin,
  type FactoryGrantData,
} from "../factoryPendingLogin.ts";

const MAX_OAUTH_RESPONSE_BYTES = 64 * 1024;
const AUTH_REQUEST_TIMEOUT_MS = 30_000;
const DEVICE_CODE_GRANT = "urn:ietf:params:oauth:grant-type:device_code";
const REFRESH_TOKEN_GRANT = "refresh_token";

const SAFE_ERROR_CODE = /^[a-z0-9_.:-]{1,80}$/i;
const WORKOS_ORG_SELECTOR = /^org[-_][a-zA-Z0-9_-]+$/;

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

async function readJsonResponse(response: Response, label: string): Promise<unknown> {
  const parsed = await readJsonResponseBody(response, label);
  if (!response.ok) {
    const code = oauthErrorCodeFromResponse(parsed);
    throw new Error(
      `Factory OAuth ${label} request failed. status=${response.status}${code ? `; code=${code}` : ""}`
    );
  }
  return parsed;
}

export function parseUniqueOrganizationIds(value: unknown): string[] {
  if (!value || typeof value !== "object") return [];
  const rawOrgs = (value as Record<string, unknown>).workosOrgIds;
  if (!Array.isArray(rawOrgs)) return [];

  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of rawOrgs) {
    if (typeof item === "string") {
      const trimmed = item.trim();
      if (trimmed.length > 0 && !seen.has(trimmed)) {
        seen.add(trimmed);
        result.push(trimmed);
      }
    }
  }
  return result;
}

export async function resolveOrganizationIds(
  accessToken: string,
  apiBase = FACTORY_API,
  signal?: AbortSignal
): Promise<string[]> {
  const timeoutSignal = AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS);
  const effectiveSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  const response = await fetch(`${apiBase}/api/cli/org`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Factory-Client": "cli",
      "X-Client-Version": FACTORY_CLIENT_VERSION,
      "User-Agent": `factory-cli/${FACTORY_CLIENT_VERSION}`,
    },
    redirect: "error",
    signal: effectiveSignal,
  });

  const parsed = await readJsonResponse(response, "organization membership");
  return parseUniqueOrganizationIds(parsed);
}

export interface FactoryWhoamiIdentity {
  accountId?: string;
  region?: string;
  apiEndpoint?: string;
  userId?: string;
}

export async function resolveWhoami(
  accessToken: string,
  organizationId?: string,
  apiBase = FACTORY_API,
  signal?: AbortSignal
): Promise<FactoryWhoamiIdentity> {
  const timeoutSignal = AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS);
  const effectiveSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "X-Factory-Client": "cli",
    "X-Client-Version": FACTORY_CLIENT_VERSION,
    "User-Agent": `factory-cli/${FACTORY_CLIENT_VERSION}`,
  };

  if (organizationId && organizationId.trim().length > 0) {
    headers["X-Factory-Org-Id"] = organizationId.trim();
  }

  const response = await fetch(`${apiBase}/api/cli/whoami`, {
    method: "GET",
    headers,
    redirect: "error",
    signal: effectiveSignal,
  });

  const parsed = (await readJsonResponse(response, "whoami")) as Record<string, unknown>;
  const accountId = (parsed.orgId ||
    parsed.org_id ||
    parsed.organization_id ||
    parsed.organizationId) as string | undefined;
  const region = typeof parsed.region === "string" ? parsed.region.trim() : undefined;
  const userId = typeof parsed.userId === "string" ? parsed.userId.trim() : undefined;
  const apiEndpoint = factoryApiForRegion(region);

  return {
    accountId: typeof accountId === "string" ? accountId.trim() : undefined,
    region,
    apiEndpoint,
    userId,
  };
}

export function requireOrgScopedCredential(
  accessToken: string,
  requestedOrganizationId: string
): string {
  const payload = decodeJwtPayload(accessToken);
  const externalOrgId =
    typeof payload?.external_org_id === "string" ? payload.external_org_id : undefined;
  const workosOrgId = typeof payload?.org_id === "string" ? payload.org_id : undefined;
  const effectiveOrgId = externalOrgId ?? workosOrgId ?? organizationIdFromAccessToken(accessToken);

  if (!effectiveOrgId) {
    throw new Error(
      "Factory OAuth did not return an organization-scoped access token; LLM calls would 403"
    );
  }

  const isMatch =
    requestedOrganizationId === effectiveOrgId ||
    requestedOrganizationId === workosOrgId ||
    requestedOrganizationId === externalOrgId;

  if (!isMatch) {
    throw new Error(
      "Factory OAuth returned a token for a different organization than the selected account"
    );
  }

  return effectiveOrgId;
}

export function requireMatchingWhoamiOrganization(
  accountId: string | undefined,
  expectedOrganizationId: string
): void {
  if (!accountId || accountId.trim().length === 0) {
    throw new Error("Factory whoami response did not include an organization ID");
  }
  if (accountId.trim() !== expectedOrganizationId.trim()) {
    throw new Error("Factory whoami returned a different organization than the selected account");
  }
}

export async function postRefreshToken(
  config: { tokenUrl: string; clientId: string },
  refreshToken: string,
  organizationId?: string,
  signal?: AbortSignal
): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  user?: { email?: string };
}> {
  const timeoutSignal = AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS);
  const effectiveSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  const isWorkosOrg = organizationId ? WORKOS_ORG_SELECTOR.test(organizationId) : false;
  const bodyParams = new URLSearchParams({
    grant_type: REFRESH_TOKEN_GRANT,
    refresh_token: refreshToken,
    client_id: config.clientId,
  });
  if (isWorkosOrg && organizationId) {
    bodyParams.set("organization_id", organizationId);
  }

  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyParams,
    redirect: "error",
    signal: effectiveSignal,
  });

  const parsed = (await readJsonResponse(response, "refresh token")) as Record<string, unknown>;
  const accessToken = typeof parsed.access_token === "string" ? parsed.access_token : undefined;
  const newRefreshToken =
    typeof parsed.refresh_token === "string" ? parsed.refresh_token : refreshToken;
  const expiresIn = typeof parsed.expires_in === "number" ? parsed.expires_in : undefined;

  if (!accessToken) {
    throw new Error("Factory OAuth refresh token response did not include access_token");
  }

  return {
    access_token: accessToken,
    refresh_token: newRefreshToken,
    expires_in: expiresIn,
    user: parsed.user as { email?: string } | undefined,
  };
}

export const factory = {
  config: FACTORY_CONFIG,
  flowType: "device_code" as const,

  requestDeviceCode: async (config: typeof FACTORY_CONFIG) => {
    const timeoutSignal = AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS);
    const response = await fetch(config.deviceCodeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
      }),
      redirect: "error",
      signal: timeoutSignal,
    });

    const parsed = (await readJsonResponse(response, "device authorization")) as Record<
      string,
      unknown
    >;
    const deviceCode = typeof parsed.device_code === "string" ? parsed.device_code.trim() : "";
    const userCode = typeof parsed.user_code === "string" ? parsed.user_code.trim() : "";
    const verificationUri =
      typeof parsed.verification_uri === "string" && parsed.verification_uri.trim().length > 0
        ? parsed.verification_uri.trim()
        : config.verificationUrl;
    const verificationUriComplete =
      typeof parsed.verification_uri_complete === "string"
        ? parsed.verification_uri_complete.trim()
        : "";
    const expiresIn =
      typeof parsed.expires_in === "number" &&
      Number.isFinite(parsed.expires_in) &&
      parsed.expires_in > 0
        ? parsed.expires_in
        : 300;
    const interval =
      typeof parsed.interval === "number" && Number.isFinite(parsed.interval) && parsed.interval > 0
        ? parsed.interval
        : 5;

    if (!deviceCode || !userCode) {
      throw new Error(
        "Factory device authorization response missing required device_code or user_code"
      );
    }

    return {
      device_code: deviceCode,
      user_code: userCode,
      verification_uri: verificationUri,
      verification_uri_complete: verificationUriComplete || verificationUri,
      expires_in: expiresIn,
      interval: interval,
    };
  },

  pollToken: async (
    config: typeof FACTORY_CONFIG,
    deviceCode: string,
    _codeVerifier?: string,
    extraData?: Record<string, unknown>
  ) => {
    // ── RESUME PATH: Multi-org selection resumption ──────────────────────────
    if (extraData?.organizationSession && typeof extraData.organizationSession === "string") {
      const organizationSession = extraData.organizationSession.trim();
      const organizationId =
        typeof extraData.organizationId === "string" ? extraData.organizationId.trim() : "";

      if (!organizationId) {
        return {
          ok: false,
          data: {
            error: "invalid_request",
            error_description: "Missing organizationId for organization claim",
          },
        };
      }

      const claimResult = claimPendingLogin({
        organizationSession,
        organizationId,
        deviceCode,
        connectionId:
          typeof extraData.connectionId === "string" ? extraData.connectionId : undefined,
        ownerBinding:
          typeof extraData.ownerBinding === "string" ? extraData.ownerBinding : undefined,
      });

      if ("error" in claimResult) {
        return {
          ok: false,
          data: {
            error: claimResult.error,
            error_description: claimResult.message,
          },
        };
      }

      const record = claimResult.record;
      let grant: FactoryGrantData;

      if (record.candidateGrant) {
        grant = record.candidateGrant;
      } else {
        try {
          const refreshed = await postRefreshToken(
            config,
            record.initialGrant.refreshToken,
            record.selectedOrganizationId
          );
          const expiresAtMs = computeExpiresAtMs(refreshed.expires_in, refreshed.access_token);
          grant = {
            accessToken: refreshed.access_token,
            refreshToken: refreshed.refresh_token,
            expiresAtMs,
          };
          record.candidateGrant = grant;
        } catch (refreshErr) {
          const msg = refreshErr instanceof Error ? refreshErr.message : String(refreshErr);
          const isInvalid = msg.includes("invalid_grant") || msg.includes("400");
          if (isInvalid) {
            deletePendingLogin(organizationSession);
            return {
              ok: false,
              data: {
                error: "invalid_grant",
                error_description: "Factory OAuth authorization failed or expired",
              },
            };
          }
          releasePendingLogin(organizationSession);
          return {
            ok: false,
            data: {
              error: "transient_error",
              error_description: "Temporary failure communicating with WorkOS; retry available",
            },
          };
        }
      }

      let effectiveOrgId: string;
      try {
        effectiveOrgId = requireOrgScopedCredential(
          grant.accessToken,
          record.selectedOrganizationId!
        );
      } catch (err) {
        deletePendingLogin(organizationSession);
        return {
          ok: false,
          data: {
            error: "invalid_organization",
            error_description: err instanceof Error ? err.message : String(err),
          },
        };
      }

      let identity: FactoryWhoamiIdentity;
      try {
        identity = await resolveWhoami(grant.accessToken, effectiveOrgId);
      } catch (whoamiErr) {
        const msg = whoamiErr instanceof Error ? whoamiErr.message : String(whoamiErr);
        const isAuthMismatch =
          msg.includes("401") ||
          msg.includes("403") ||
          msg.includes("invalid_organization") ||
          msg.includes("organization_mismatch");
        if (isAuthMismatch) {
          deletePendingLogin(organizationSession);
          return {
            ok: false,
            data: {
              error: "invalid_organization",
              error_description: "Failed to confirm organization identity with Factory",
            },
          };
        }
        releasePendingLogin(organizationSession, grant);
        return {
          ok: false,
          data: {
            error: "transient_error",
            error_description:
              "Temporary failure confirming identity with Factory; retry available",
          },
        };
      }

      try {
        requireMatchingWhoamiOrganization(identity.accountId, effectiveOrgId);
      } catch (mismatchErr) {
        deletePendingLogin(organizationSession);
        return {
          ok: false,
          data: {
            error: "organization_mismatch",
            error_description:
              mismatchErr instanceof Error ? mismatchErr.message : String(mismatchErr),
          },
        };
      }

      deletePendingLogin(organizationSession);

      const expiresIn = computeExpiresInSeconds(grant.expiresAtMs);
      const dataPayload = {
        access_token: grant.accessToken,
        refresh_token: grant.refreshToken,
        expires_in: expiresIn,
        _extra: {
          orgId: identity.accountId,
          workosOrgId: record.selectedOrganizationId,
          region: identity.region,
          apiEndpoint: identity.apiEndpoint,
          userId: identity.userId,
        },
      };

      return {
        ok: true,
        data: dataPayload,
      };
    }

    // ── INITIAL PATH: Poll WorkOS device token ───────────────────────────────
    const timeoutSignal = AbortSignal.timeout(AUTH_REQUEST_TIMEOUT_MS);
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        device_code: deviceCode,
        grant_type: DEVICE_CODE_GRANT,
      }),
      redirect: "error",
      signal: timeoutSignal,
    });

    const parsed = (await readJsonResponseBody(response, "device token")) as Record<
      string,
      unknown
    >;

    if (!response.ok) {
      const errorCode = oauthErrorCodeFromResponse(parsed) ?? "unknown";
      return {
        ok: false,
        data: {
          error: errorCode,
          error_description:
            typeof parsed.error_description === "string"
              ? parsed.error_description
              : typeof parsed.message === "string"
                ? parsed.message
                : `Device token request failed (${errorCode})`,
        },
      };
    }

    const accessToken = typeof parsed.access_token === "string" ? parsed.access_token : "";
    const refreshToken = typeof parsed.refresh_token === "string" ? parsed.refresh_token : "";

    if (!accessToken || !refreshToken) {
      return {
        ok: false,
        data: {
          error: "invalid_response",
          error_description: "Factory OAuth device token response did not include required tokens",
        },
      };
    }

    const rawExpiresIn = typeof parsed.expires_in === "number" ? parsed.expires_in : undefined;
    const expiresAtMs = computeExpiresAtMs(rawExpiresIn, accessToken);

    if (expiresAtMs <= Date.now()) {
      return {
        ok: false,
        data: {
          error: "expired_token",
          error_description: "Completed Factory OAuth grant is already expired",
        },
      };
    }

    // Check if token already contains an organization claim
    const initialFactoryOrgId = organizationIdFromAccessToken(accessToken);

    if (initialFactoryOrgId) {
      let identity: FactoryWhoamiIdentity;
      try {
        identity = await resolveWhoami(accessToken, initialFactoryOrgId);
        requireMatchingWhoamiOrganization(identity.accountId, initialFactoryOrgId);
      } catch (err) {
        return {
          ok: false,
          data: {
            error: "invalid_organization",
            error_description: err instanceof Error ? err.message : String(err),
          },
        };
      }

      return {
        ok: true,
        data: {
          ...parsed,
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: computeExpiresInSeconds(expiresAtMs),
          _extra: {
            orgId: identity.accountId,
            workosOrgId: initialFactoryOrgId,
            region: identity.region,
            apiEndpoint: identity.apiEndpoint,
            userId: identity.userId,
          },
        },
      };
    }

    // Unscoped grant: retrieve organizations
    let workosOrganizations: string[];
    try {
      workosOrganizations = await resolveOrganizationIds(accessToken);
    } catch (err) {
      return {
        ok: false,
        data: {
          error: "organization_resolution_failed",
          error_description: err instanceof Error ? err.message : String(err),
        },
      };
    }

    if (workosOrganizations.length === 0) {
      return {
        ok: false,
        data: {
          error: "no_organizations",
          error_description:
            "Factory OAuth login did not expose an organization id; LLM calls would 403",
        },
      };
    }

    if (workosOrganizations.length === 1) {
      const selectedOrg = workosOrganizations[0];
      try {
        const refreshed = await postRefreshToken(config, refreshToken, selectedOrg);
        const scopedExpiresAtMs = computeExpiresAtMs(refreshed.expires_in, refreshed.access_token);
        const effectiveOrgId = requireOrgScopedCredential(refreshed.access_token, selectedOrg);
        const identity = await resolveWhoami(refreshed.access_token, effectiveOrgId);
        requireMatchingWhoamiOrganization(identity.accountId, effectiveOrgId);

        return {
          ok: true,
          data: {
            access_token: refreshed.access_token,
            refresh_token: refreshed.refresh_token,
            expires_in: computeExpiresInSeconds(scopedExpiresAtMs),
            user: refreshed.user,
            _extra: {
              orgId: identity.accountId,
              workosOrgId: selectedOrg,
              region: identity.region,
              apiEndpoint: identity.apiEndpoint,
              userId: identity.userId,
            },
          },
        };
      } catch (err) {
        return {
          ok: false,
          data: {
            error: "organization_scoping_failed",
            error_description: err instanceof Error ? err.message : String(err),
          },
        };
      }
    }

    // Multiple organizations: Pause flow for user selection
    let organizationSession: string;
    try {
      organizationSession = createPendingLogin({
        initialGrant: {
          accessToken,
          refreshToken,
          expiresAtMs,
        },
        organizations: workosOrganizations,
        deviceCode,
        connectionId:
          typeof extraData?.connectionId === "string" ? extraData.connectionId : undefined,
        ownerBinding:
          typeof extraData?.ownerBinding === "string" ? extraData.ownerBinding : undefined,
      });
    } catch (err) {
      return {
        ok: false,
        data: {
          error: "pending_login_capacity",
          error_description: err instanceof Error ? err.message : String(err),
        },
      };
    }

    return {
      ok: false,
      data: {
        error: "organization_selection_required",
        organizationSession,
        organizations: workosOrganizations,
      },
      organizationSession,
      organizations: workosOrganizations,
    };
  },

  postExchange: async (tokens: Record<string, unknown>) => {
    return (tokens._extra as Record<string, unknown>) ?? null;
  },

  mapTokens: (tokens: Record<string, unknown>, extra?: Record<string, unknown>) => {
    const accessToken = typeof tokens.access_token === "string" ? tokens.access_token.trim() : "";
    const refreshToken =
      typeof tokens.refresh_token === "string" ? tokens.refresh_token.trim() : "";

    const effectiveExtra = (extra ?? tokens._extra ?? {}) as Record<string, unknown>;
    const orgId =
      (effectiveExtra.orgId as string | undefined) ?? organizationIdFromAccessToken(accessToken);
    const workosOrgId = (effectiveExtra.workosOrgId as string | undefined) ?? orgId;
    const region = effectiveExtra.region as string | undefined;
    const apiEndpoint = effectiveExtra.apiEndpoint as string | undefined;
    const userId = effectiveExtra.userId as string | undefined;

    let expiresAtMs: number;
    if (typeof tokens.expires_at === "string" && tokens.expires_at) {
      expiresAtMs = new Date(tokens.expires_at).getTime();
    } else if (
      typeof tokens.expires_in === "number" &&
      Number.isFinite(tokens.expires_in) &&
      tokens.expires_in > 0
    ) {
      expiresAtMs = Date.now() + tokens.expires_in * 1000;
    } else {
      const jwtExp = expiresFromAccessToken(accessToken);
      if (typeof jwtExp === "number" && Number.isFinite(jwtExp)) {
        expiresAtMs = jwtExp;
      } else {
        expiresAtMs = Date.now() + 5 * 60 * 1000;
      }
    }

    const now = Date.now();
    const expiresIn = Math.max(1, Math.floor((expiresAtMs - now) / 1000));
    const expiresAt = new Date(expiresAtMs).toISOString();

    const userObj = tokens.user as Record<string, unknown> | undefined;
    const email =
      (effectiveExtra.email as string | undefined) ??
      (userObj?.email as string | undefined) ??
      emailFromAccessToken(accessToken);
    const displayName = email || (orgId ? `Factory (${orgId})` : "Factory AI");

    return {
      accessToken,
      refreshToken,
      expiresIn,
      expiresAt,
      email: email || undefined,
      name: displayName,
      displayName,
      authType: "oauth" as const,
      apiKey: null,
      providerSpecificData: {
        orgId,
        workosOrgId,
        region,
        apiEndpoint,
        userId,
        isLocalCli: false,
        factoryLocalSync: null,
      },
    };
  },
};
