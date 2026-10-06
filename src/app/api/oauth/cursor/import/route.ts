import { NextResponse } from "next/server";
import { CursorService } from "@/lib/oauth/services/cursor";
import { credentialsFromCursorTokens } from "@/lib/oauth/services/cursorLogin";
import { persistCursorConnection } from "@/lib/oauth/services/persistCursorConnection";
import { isCloudEnabled } from "@/models";
import { syncToCloud } from "@/lib/cloudSync";
import { cursorImportSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";
import { resolveProxyForProvider } from "@/models";

async function requireOAuthImportAuth(request: Request) {
  // GHSA-mg76: importing a provider connection is a state-mutating admin action;
  // require management scope (or a dashboard session), not any valid client key.
  return requireManagementAuth(request, { invalidApiKeyStatus: 401 });
}

/**
 * POST /api/oauth/cursor/import
 * Import access token (and optional refresh token) from Cursor IDE / paste.
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
    const validation = validateBody(cursorImportSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { accessToken, machineId, refreshToken } = validation.data;

    const cursorService = new CursorService();
    const proxy = await resolveProxyForProvider("cursor");

    const tokenData = await runWithProxyContext(proxy, () =>
      cursorService.validateImportToken(accessToken.trim(), machineId?.trim())
    );

    const jwtInfo = cursorService.extractUserInfo(tokenData.accessToken);
    const profile = jwtInfo?.userId
      ? await runWithProxyContext(proxy, () =>
          cursorService.fetchUserInfo(tokenData.accessToken, jwtInfo.userId)
        )
      : null;

    const email = profile?.email || jwtInfo?.email || null;
    const trimmedRefresh =
      typeof refreshToken === "string" && refreshToken.trim().length > 0
        ? refreshToken.trim()
        : null;

    let connection;
    if (trimmedRefresh) {
      const creds = credentialsFromCursorTokens(tokenData.accessToken, trimmedRefresh);
      connection = await persistCursorConnection({
        ...creds,
        email: email || creds.email,
        machineId: tokenData.machineId,
        authMethod: "imported",
      });
    } else {
      // Access-only import — no refresh; user must re-import when expired.
      const { createProviderConnection } = await import("@/models");
      connection = await createProviderConnection({
        provider: "cursor",
        authType: "oauth",
        accessToken: tokenData.accessToken,
        refreshToken: null,
        expiresAt: new Date(Date.now() + tokenData.expiresIn * 1000).toISOString(),
        email,
        providerSpecificData: {
          machineId: tokenData.machineId,
          authMethod: "imported",
          provider: "Imported",
          userId: jwtInfo?.userId,
          accountId: jwtInfo?.userId || null,
        },
        testStatus: "active",
      });
    }

    await syncToCloudIfEnabled();

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        provider: connection.provider,
        email: connection.email,
      },
    });
  } catch (error: unknown) {
    console.error("Cursor import token error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * GET /api/oauth/cursor/import
 * Get instructions for importing Cursor token
 */
export async function GET(request: Request) {
  const authResponse = await requireOAuthImportAuth(request);
  if (authResponse) return authResponse;

  const cursorService = new CursorService();
  const instructions = cursorService.getTokenStorageInstructions();

  return NextResponse.json({
    provider: "cursor",
    method: "import_token",
    instructions,
    requiredFields: [
      {
        name: "accessToken",
        label: "Access Token",
        description: "From cursorAuth/accessToken in state.vscdb",
        type: "textarea",
      },
      {
        name: "refreshToken",
        label: "Refresh Token (optional)",
        description: "From cursorAuth/refreshToken — enables automatic refresh",
        type: "textarea",
      },
      {
        name: "machineId",
        label: "Machine ID",
        description: "From storage.serviceMachineId in state.vscdb",
        type: "text",
      },
    ],
  });
}

async function syncToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;

    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log("Error syncing to cloud after Cursor import:", error);
  }
}
