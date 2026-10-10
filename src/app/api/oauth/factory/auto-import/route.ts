import path from "node:path";
import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCliConfigHome, ensureCliConfigWriteAllowed } from "@/shared/services/cliRuntime";
import { getProviderConnectionById } from "@/lib/db/providers";
import { persistOAuthConnection } from "@/lib/oauth/connectionPersistence";
import {
  loadFactoryCliCredentials,
  buildFactoryLocalSyncMarker,
  syncFactoryCliCredentials,
  type FactoryCliSession,
} from "@omniroute/open-sse/services/factory/localCredentials.ts";
import {
  organizationIdFromAccessToken,
  expiresFromAccessToken,
  emailFromAccessToken,
  decodeJwtPayload,
} from "@/lib/oauth/factoryPendingLogin";
import {
  resolveWhoami,
  requireOrgScopedCredential,
  requireMatchingWhoamiOrganization,
  type FactoryWhoamiIdentity,
} from "@/lib/oauth/providers/factory";
import { refreshFactoryToken } from "@omniroute/open-sse/services/tokenRefresh/providers/factory.ts";
import { resolveProxyForCredentials } from "@/sse/services/tokenRefresh";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";

export const dynamic = "force-dynamic";

/**
 * GET /api/oauth/factory/auto-import
 * Probes the fixed local Factory CLI store and returns non-credential metadata.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request, {
    alwaysRequireAuth: true,
    invalidApiKeyStatus: 401,
  });
  if (authError) return authError;

  try {
    const factoryDir = path.join(getCliConfigHome(), ".factory");
    let session: FactoryCliSession | null = null;
    try {
      session = await loadFactoryCliCredentials(factoryDir);
    } catch {
      return NextResponse.json({ found: false });
    }

    if (!session || !session.accessToken) {
      return NextResponse.json({ found: false });
    }

    const tokenOrg = organizationIdFromAccessToken(session.accessToken);
    const targetOrg = session.activeOrganizationId || tokenOrg;
    if (!targetOrg) {
      return NextResponse.json({ found: false });
    }

    if (session.activeOrganizationId && tokenOrg && session.activeOrganizationId !== tokenOrg) {
      try {
        requireOrgScopedCredential(session.accessToken, session.activeOrganizationId);
      } catch {
        return NextResponse.json({ found: false });
      }
    }

    const exp = expiresFromAccessToken(session.accessToken);
    const isExpired = typeof exp === "number" && exp <= Date.now();
    const hasRefreshToken = Boolean(session.refreshToken && session.refreshToken.trim().length > 0);

    if (isExpired && !hasRefreshToken) {
      return NextResponse.json({ found: false });
    }

    let region: string | undefined;
    let orgId: string = targetOrg;

    if (!isExpired) {
      try {
        const effectiveOrgId = requireOrgScopedCredential(session.accessToken, targetOrg);
        const proxy = await resolveProxyForCredentials("factory", {});
        const identity = await runWithProxyContext(proxy, () =>
          resolveWhoami(session.accessToken, effectiveOrgId)
        );
        requireMatchingWhoamiOrganization(identity.accountId, effectiveOrgId);
        orgId = identity.accountId ?? effectiveOrgId;
        region = identity.region;
      } catch {
        return NextResponse.json({ found: false });
      }
    }

    const email = emailFromAccessToken(session.accessToken);
    const displayName = email || (orgId ? `Factory (${orgId})` : "Factory AI");

    return NextResponse.json({
      found: true,
      displayName,
      email: email || undefined,
      orgId,
      region: region || undefined,
      hasRefreshToken,
    });
  } catch {
    return NextResponse.json({ found: false });
  }
}

/**
 * POST /api/oauth/factory/auto-import
 * Imports local Factory CLI credentials into OmniRoute provider connections.
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request, {
    alwaysRequireAuth: true,
    invalidApiKeyStatus: 401,
  });
  if (authError) return authError;

  let body: Record<string, unknown> = {};
  try {
    const text = await request.text();
    if (text.trim().length > 0) {
      const parsed = JSON.parse(text);
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
      }
      body = parsed as Record<string, unknown>;
    }
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Strict validation: only optional connectionId is permitted
  for (const key of Object.keys(body)) {
    if (key !== "connectionId") {
      return NextResponse.json(
        { error: `Unexpected field in request body: ${key}` },
        { status: 400 }
      );
    }
  }

  const rawConnectionId = body.connectionId;
  let connectionId: string | undefined;
  if (rawConnectionId !== undefined) {
    if (typeof rawConnectionId !== "string" || rawConnectionId.trim().length === 0) {
      return NextResponse.json(
        { error: "connectionId must be a non-empty string if provided" },
        { status: 400 }
      );
    }
    connectionId = rawConnectionId.trim();
  }

  let existingConn: Record<string, unknown> | null = null;
  if (connectionId) {
    try {
      existingConn = (await getProviderConnectionById(connectionId)) as Record<
        string,
        unknown
      > | null;
    } catch {
      return NextResponse.json({ error: "Failed to query provider connection" }, { status: 500 });
    }

    if (!existingConn) {
      return NextResponse.json({ error: "Provider connection not found" }, { status: 400 });
    }
    if (existingConn.provider !== "factory") {
      return NextResponse.json(
        { error: "Specified connectionId is not a Factory provider connection" },
        { status: 400 }
      );
    }
  }

  const factoryDir = path.join(getCliConfigHome(), ".factory");
  let session: FactoryCliSession | null = null;
  try {
    session = await loadFactoryCliCredentials(factoryDir);
  } catch {
    return NextResponse.json({ error: "Failed to read Factory CLI storage" }, { status: 404 });
  }

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "No Factory credentials found" }, { status: 404 });
  }

  const tokenOrg = organizationIdFromAccessToken(session.accessToken);
  const targetOrg = session.activeOrganizationId || tokenOrg;
  if (!targetOrg) {
    return NextResponse.json(
      { error: "No organization identifier found in Factory CLI session" },
      { status: 400 }
    );
  }

  if (session.activeOrganizationId && tokenOrg && session.activeOrganizationId !== tokenOrg) {
    try {
      requireOrgScopedCredential(session.accessToken, session.activeOrganizationId);
    } catch {
      return NextResponse.json(
        { error: "Mismatched organization identity in Factory CLI session" },
        { status: 400 }
      );
    }
  }

  let proxy: unknown;
  try {
    proxy = await resolveProxyForCredentials("factory", connectionId ? { connectionId } : {});
  } catch {
    return NextResponse.json({ error: "Factory proxy is unavailable" }, { status: 503 });
  }

  const exp = expiresFromAccessToken(session.accessToken);
  const isExpired = typeof exp === "number" && exp <= Date.now();

  let accessToken = session.accessToken;
  let refreshToken = session.refreshToken;
  let expiresIn: number;
  let expiresAt: string;
  let effectiveOrgId: string;
  let identity: FactoryWhoamiIdentity;

  if (isExpired) {
    if (!refreshToken || refreshToken.trim().length === 0) {
      return NextResponse.json(
        { error: "Factory access token is expired and cannot be refreshed" },
        { status: 400 }
      );
    }

    try {
      const localClaims = decodeJwtPayload(accessToken);
      const workosOrgId = typeof localClaims?.org_id === "string" ? localClaims.org_id : targetOrg;
      const refreshed = await refreshFactoryToken(
        refreshToken,
        {
          accessToken,
          refreshToken,
          providerSpecificData: {
            orgId: tokenOrg || targetOrg,
            workosOrgId,
          },
        },
        undefined,
        proxy
      );

      if (!refreshed || "error" in refreshed) {
        return NextResponse.json(
          { error: "Failed to refresh expired Factory credentials" },
          { status: 400 }
        );
      }

      accessToken = refreshed.accessToken;
      refreshToken = refreshed.refreshToken;
      expiresIn = refreshed.expiresIn;
      expiresAt = refreshed.expiresAt;

      effectiveOrgId = requireOrgScopedCredential(accessToken, targetOrg);
      identity = await runWithProxyContext(proxy, () => resolveWhoami(accessToken, effectiveOrgId));
      requireMatchingWhoamiOrganization(identity.accountId, effectiveOrgId);
    } catch {
      return NextResponse.json(
        { error: "Failed to validate identity for refreshed Factory session" },
        { status: 400 }
      );
    }
  } else {
    try {
      effectiveOrgId = requireOrgScopedCredential(accessToken, targetOrg);
      identity = await runWithProxyContext(proxy, () => resolveWhoami(accessToken, effectiveOrgId));
      requireMatchingWhoamiOrganization(identity.accountId, effectiveOrgId);
    } catch {
      return NextResponse.json(
        { error: "Failed to validate identity for Factory session" },
        { status: 400 }
      );
    }

    const computedExpMs = exp ?? Date.now() + 5 * 60 * 1000;
    expiresIn = Math.max(1, Math.floor((computedExpMs - Date.now()) / 1000));
    expiresAt = new Date(computedExpMs).toISOString();
  }

  // Preserve same-org identity when updating an explicit existing connection
  if (existingConn) {
    const existingPsd = (existingConn.providerSpecificData || {}) as Record<string, unknown>;
    const existingOrgId =
      typeof existingPsd.orgId === "string" ? existingPsd.orgId.trim() : undefined;
    if (existingOrgId && existingOrgId !== effectiveOrgId && existingOrgId !== identity.accountId) {
      return NextResponse.json(
        { error: "Cannot update existing connection with a different Factory organization" },
        { status: 400 }
      );
    }
  }

  const payload = decodeJwtPayload(accessToken);
  const workosFromPayload = typeof payload?.org_id === "string" ? payload.org_id : undefined;
  const workosOrgId =
    workosFromPayload ??
    (effectiveOrgId.startsWith("org_") || effectiveOrgId.startsWith("org-")
      ? effectiveOrgId
      : targetOrg);

  const email = emailFromAccessToken(accessToken);
  const displayName = email || (effectiveOrgId ? `Factory (${effectiveOrgId})` : "Factory AI");

  const syncMarker = buildFactoryLocalSyncMarker(
    session.backend,
    session.fileName,
    accessToken,
    refreshToken
  );

  const tokenData = {
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
      orgId: effectiveOrgId,
      workosOrgId,
      region: identity.region,
      apiEndpoint: identity.apiEndpoint,
      userId: identity.userId,
      isLocalCli: true,
      factoryLocalSync: isExpired ? null : syncMarker,
    },
  };

  let connection: {
    id?: string;
    email?: string | null;
    displayName?: string | null;
    name?: string | null;
  };
  try {
    connection = await persistOAuthConnection("factory", tokenData, connectionId);
  } catch {
    return NextResponse.json({ error: "Failed to persist Factory connection" }, { status: 500 });
  }

  // Synchronize rotated tokens back to local CLI store when refreshed
  let warning: string | undefined;
  if (isExpired && (accessToken !== session.accessToken || refreshToken !== session.refreshToken)) {
    try {
      const targetPath = path.join(factoryDir, session.fileName);
      const writeGuard = ensureCliConfigWriteAllowed(targetPath, {
        toolLabel: "Factory CLI",
      });
      if (writeGuard) {
        warning =
          typeof writeGuard === "string" ? writeGuard : "Local CLI configuration write not allowed";
      } else {
        const syncStatus = await syncFactoryCliCredentials(
          factoryDir,
          {
            backend: session.backend,
            fileName: session.fileName,
            preRefreshAccessToken: session.accessToken,
            preRefreshRefreshToken: session.refreshToken,
            activeOrganizationId: targetOrg,
          },
          {
            accessToken,
            refreshToken,
            activeOrganizationId: targetOrg,
            backend: session.backend,
            fileName: session.fileName,
          }
        );
        if (syncStatus === "updated" || syncStatus === "unchanged") {
          if (connection.id) {
            await updateProviderConnection(
              connection.id,
              {
                providerSpecificData: {
                  ...tokenData.providerSpecificData,
                  factoryLocalSync: syncMarker,
                },
              },
              { mergeProviderSpecificData: true }
            ).catch(() => {});
          }
        } else {
          warning = `Local CLI store could not be synchronized (${syncStatus})`;
        }
      }
    } catch {
      warning = "Failed to synchronize rotated tokens to local CLI store";
    }
  }

  return NextResponse.json({
    success: true,
    ...(warning ? { warning } : {}),
    connection: {
      id: connection.id,
      provider: "factory",
      email: connection.email || undefined,
      displayName: connection.displayName || connection.name || displayName,
      orgId: effectiveOrgId,
      region: identity.region,
    },
  });
}
