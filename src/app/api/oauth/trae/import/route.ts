import { NextResponse } from "next/server";
import { TraeService } from "@/lib/oauth/services/trae";
import { createProviderConnection, isCloudEnabled, resolveProxyForProvider } from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { traeImportSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";

export async function POST(request: any) {
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
    const validation = validateBody(traeImportSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { accessToken, refreshToken, loginHost, baseUrl } = validation.data;
    const proxy = await resolveProxyForProvider("trae");
    const traeService = new TraeService();

    const tokenData = await runWithProxyContext(proxy, () =>
      traeService.validateImportToken({
        accessToken: accessToken?.trim(),
        refreshToken: refreshToken?.trim(),
        loginHost: loginHost.trim(),
        baseUrl: baseUrl?.trim(),
      })
    );

    const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString();
    const connection: any = await createProviderConnection({
      provider: "trae",
      authType: "oauth",
      accessToken: tokenData.accessToken,
      refreshToken: tokenData.refreshToken,
      expiresAt,
      email: tokenData.email,
      displayName: tokenData.nickname,
      providerSpecificData: {
        userId: tokenData.userId,
        loginHost: tokenData.loginHost,
        status: tokenData.status,
        baseUrl: tokenData.baseUrl,
        tokenType: "Bearer",
        authMethod: "imported",
        traeProfileRaw: tokenData.profileRaw || null,
        traeAuthRaw: tokenData.exchangeRaw || null,
      },
      testStatus: "active",
    });

    await syncToCloudIfEnabled();

    return NextResponse.json({
      success: true,
      connection: {
        id: connection.id,
        provider: connection.provider,
        email: connection.email,
        displayName: connection.displayName,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  const traeService = new TraeService();
  const instructions = traeService.getImportInstructions();

  return NextResponse.json({
    provider: "trae",
    method: "import_token",
    instructions,
    requiredFields: [
      {
        name: "accessToken",
        label: "Access Token",
        description: "Current Trae cloudide token. Optional when a refresh token is available.",
        type: "textarea",
        required: false,
      },
      {
        name: "refreshToken",
        label: "Refresh Token",
        description: "Optional, enables automatic token refresh",
        type: "textarea",
        required: false,
      },
      {
        name: "loginHost",
        label: "Login Host",
        description: "Example: https://www.trae.ai or https://www.marscode.com",
        type: "text",
        required: true,
      },
      {
        name: "baseUrl",
        label: "Chat Base URL",
        description:
          "Required: paste the verified Trae chat endpoint. The known public guesses currently return 404/HTML.",
        type: "text",
        required: true,
        placeholder: "https://your-verified-trae-gateway.example/v1/chat/completions",
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
    console.log("Error syncing to cloud after Trae import:", error);
  }
}
