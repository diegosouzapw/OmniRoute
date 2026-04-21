import { NextResponse } from "next/server";
import { getZedChatUrl, ZedService } from "@/lib/oauth/services/zed";
import { createProviderConnection, isCloudEnabled, resolveProxyForProvider } from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { zedImportSchema } from "@/shared/validation/schemas";
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
    const validation = validateBody(zedImportSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { accessToken, userId, baseUrl, cloudBaseUrl } = validation.data;
    const proxy = await resolveProxyForProvider("zed");
    const zedService = new ZedService();

    const tokenData = await runWithProxyContext(proxy, () =>
      zedService.validateImportToken(accessToken, userId, cloudBaseUrl?.trim())
    );

    const connection: any = await createProviderConnection({
      provider: "zed",
      authType: "oauth",
      accessToken: tokenData.accessToken,
      refreshToken: null,
      email: tokenData.email || null,
      displayName: tokenData.displayName || tokenData.githubLogin || null,
      providerSpecificData: {
        userId: tokenData.userId,
        githubLogin: tokenData.githubLogin || null,
        avatarUrl: tokenData.avatarUrl || null,
        cloudBaseUrl: tokenData.cloudBaseUrl,
        baseUrl: getZedChatUrl(baseUrl?.trim() ? { baseUrl: baseUrl.trim() } : undefined),
        zedQuota: tokenData.quota || null,
        planRaw: tokenData.quota?.planRaw || null,
        billingPortalUrl: tokenData.quota?.billingPortalUrl || null,
        isAccountTooYoung: tokenData.quota?.isAccountTooYoung ?? null,
        authMethod: "imported",
        userRaw: tokenData.userRaw || null,
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
  const zedService = new ZedService();
  const instructions = zedService.getImportInstructions();

  return NextResponse.json({
    provider: "zed",
    method: "import_token",
    instructions,
    requiredFields: [
      {
        name: "accessToken",
        label: "Access Token",
        description: "Current Zed desktop access token",
        type: "textarea",
        required: true,
      },
      {
        name: "userId",
        label: "User ID",
        description: "Zed cloud user ID paired with the token",
        type: "text",
        required: true,
      },
      {
        name: "baseUrl",
        label: "AI Base URL",
        description: "Optional override for the completions endpoint",
        type: "text",
        required: false,
        placeholder: "https://ai.zed.dev/completion",
      },
      {
        name: "cloudBaseUrl",
        label: "Cloud Base URL",
        description: "Optional override for account validation",
        type: "text",
        required: false,
        placeholder: "https://cloud.zed.dev",
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
    console.log("Error syncing to cloud after Zed import:", error);
  }
}
