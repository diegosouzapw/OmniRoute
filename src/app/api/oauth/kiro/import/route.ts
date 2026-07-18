import { NextResponse } from "next/server";
import { KiroService } from "@/lib/oauth/services/kiro";
import { createProviderConnection, isCloudEnabled, resolveProxyForProvider } from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { kiroImportSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  emailFromExternalIdpToken,
  isExternalIdpAuthMethod,
  normalizeScope,
} from "@omniroute/open-sse/services/kiroExternalIdp.ts";

/**
 * Build the user-facing error message for a failed Kiro/Amazon-Q token import.
 * The catch previously returned a bare `Internal server error`, which hid the
 * real cause — the failure happens while validating/refreshing the imported
 * refresh token against AWS (e.g. `invalid_grant`, an expired token, or a region
 * mismatch) — so the dashboard only ever showed a generic 500 (#3589). The cause
 * is now surfaced through `sanitizeErrorMessage()` (Rule #12 — no stack, no
 * secrets), falling back to the generic message only when there is nothing to
 * report. The `{ error: <string> }` shape is unchanged, so the import UI keeps
 * rendering it the same way.
 */
export function buildKiroImportError(error: unknown): string {
  const raw = error instanceof Error ? error.message : String(error ?? "");
  return sanitizeErrorMessage(raw) || "Internal server error";
}

async function requireOAuthImportAuth(request: Request) {
  if (!(await isAuthRequired(request))) return null;
  if (await isAuthenticated(request)) return null;
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/**
 * POST /api/oauth/kiro/import
 * Import and validate refresh token from Kiro IDE
 */
export async function POST(request: Request) {
  const authResponse = await requireOAuthImportAuth(request);
  if (authResponse) return authResponse;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const targetProvider = searchParams.get("targetProvider") === "amazon-q" ? "amazon-q" : "kiro";
    const validation = validateBody(kiroImportSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { refreshToken, region, clientId, clientSecret, authMethod, profileArn } =
      validation.data;
    const { tokenEndpoint, scopes } = validation.data;

    const kiroService = new KiroService();

    // Resolve proxy for this provider (provider-level → global → direct)
    const proxy = await resolveProxyForProvider(targetProvider);

    // Enterprise / Microsoft Entra "Your organization" (external_idp) import. These tokens are
    // NOT AWS SSO tokens (their refresh token does not start with `aorAAAAAG`), so the Builder
    // ID / IDC path (validateImportToken) rejects them. Refresh via the org IdP's tokenEndpoint,
    // persist the org profileArn (read from the Kiro IDE profile.json by the caller), and mark
    // the connection so the runtime executor sends `TokenType: EXTERNAL_IDP`.
    if (isExternalIdpAuthMethod(authMethod)) {
      const scope = normalizeScope(scopes);
      const externalIdpPsd = {
        authMethod: "external_idp",
        clientId,
        tokenEndpoint,
        scope,
        region: region || "us-east-1",
      };
      const refreshed = await runWithProxyContext(proxy, () =>
        kiroService.refreshToken(refreshToken.trim(), externalIdpPsd)
      );
      const email =
        emailFromExternalIdpToken(refreshed.accessToken) ||
        kiroService.extractEmailFromJWT(refreshed.accessToken);
      const connection: any = await createProviderConnection({
        provider: targetProvider,
        authType: "oauth",
        accessToken: refreshed.accessToken,
        refreshToken: refreshed.refreshToken || refreshToken.trim(),
        expiresAt: new Date(Date.now() + (refreshed.expiresIn || 3600) * 1000).toISOString(),
        email: email || null,
        providerSpecificData: {
          profileArn: profileArn || null,
          authMethod: "external_idp",
          provider: "ExternalIdp",
          clientId,
          tokenEndpoint,
          scope,
          region: region || "us-east-1",
        },
        testStatus: "active",
      } as any);
      await syncToCloudIfEnabled();
      return NextResponse.json({
        success: true,
        connection: { id: connection.id, provider: connection.provider, email: connection.email },
      });
    }

    // For IDC tokens the client already has OIDC client credentials extracted from the
    // SSO cache registration file by auto-import (#2059). Refresh directly via the
    // regional OIDC endpoint without calling registerClient() again. For social /
    // Builder-ID tokens (no clientId) use validateImportToken() which handles
    // registerClient() internally to obtain an isolated refresh session (#2328).
    const isIdc = !!(clientId && clientSecret);
    let tokenData: Awaited<ReturnType<typeof kiroService.validateImportToken>>;
    if (isIdc) {
      const providerSpecificData = {
        clientId,
        clientSecret,
        region: region || "us-east-1",
        authMethod: "idc",
      };
      const refreshed = await runWithProxyContext(proxy, () =>
        kiroService.refreshToken(refreshToken.trim(), providerSpecificData)
      );
      tokenData = {
        accessToken: refreshed.accessToken,
        refreshToken: refreshed.refreshToken || refreshToken.trim(),
        expiresIn: refreshed.expiresIn || 3600,
        profileArn: profileArn || null,
        authMethod: "idc",
        clientId,
        clientSecret,
      } as any;
    } else {
      // Validate and refresh token (through proxy if configured).
      // validateImportToken also calls registerClient() to obtain a per-connection OIDC
      // client pair so multiple Kiro accounts do not share a single backend session (#2328).
      // When only `clientId` is known (no matching secret was found by auto-import),
      // forward it as a hint so the AWS SSO cache lookup matches the token's own
      // registration instead of guessing via region/latest-expiry (#1253).
      tokenData = await runWithProxyContext(proxy, () =>
        kiroService.validateImportToken(refreshToken.trim(), region, clientId)
      );
    }

    // Extract email from JWT if available
    const email = kiroService.extractEmailFromJWT(tokenData.accessToken);

    const resolvedAuthMethod = isIdc ? "idc" : (tokenData as any).authMethod || "imported";
    const resolvedProfileArn = (tokenData as any).profileArn || null;

    // Save to database
    const connection: any = await createProviderConnection({
      provider: targetProvider,
      authType: "oauth",
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken || refreshToken.trim(),
      expiresAt: new Date(Date.now() + (tokenData.expiresIn || 3600) * 1000).toISOString(),
      email: email || null,
      providerSpecificData: {
        profileArn: resolvedProfileArn,
        authMethod: resolvedAuthMethod,
        provider: isIdc ? "Enterprise" : "Imported",
        ...(tokenData.clientId
          ? {
              clientId: tokenData.clientId,
              clientSecret: tokenData.clientSecret,
              region: region || "us-east-1",
              ...(tokenData.clientSecretExpiresAt
                ? { clientSecretExpiresAt: tokenData.clientSecretExpiresAt }
                : {}),
            }
          : {}),
      },
      testStatus: "active",
    });

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        provider: connection.provider,
        email: connection.email,
      },
    });
  } catch (error: any) {
    console.error("Kiro-compatible import token error:", error);
    return NextResponse.json({ error: buildKiroImportError(error) }, { status: 500 });
  }
}

/**
 * Sync to Cloud if enabled
 */
async function syncToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;

    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log("Error syncing to cloud after Kiro import:", error);
  }
}
