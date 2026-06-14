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
    const { refreshToken, region } = validation.data;

    const kiroService = new KiroService();

    // Resolve proxy for this provider (provider-level → global → direct)
    const proxy = await resolveProxyForProvider(targetProvider);

    // Validate and refresh token (through proxy if configured).
    // validateImportToken also calls registerClient() to obtain a per-connection OIDC
    // client pair so multiple Kiro accounts do not share a single backend session (#2328).
    const tokenData = await runWithProxyContext(proxy, () =>
      kiroService.validateImportToken(refreshToken.trim(), region)
    );

    // Extract email from JWT if available
    const email = kiroService.extractEmailFromJWT(tokenData.accessToken);

    // Save to database
    const connection: any = await createProviderConnection({
      provider: targetProvider,
      authType: "oauth",
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken,
      expiresAt: new Date(Date.now() + tokenData.expiresIn * 1000).toISOString(),
      email: email || null,
      providerSpecificData: {
        profileArn: tokenData.profileArn,
        authMethod: tokenData.authMethod || "imported",
        provider: "Imported",
        ...(tokenData.clientId
          ? {
              clientId: tokenData.clientId,
              clientSecret: tokenData.clientSecret,
              region,
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
