import { NextResponse } from "next/server";
import { CursorService } from "@/lib/oauth/services/cursor";
import { createProviderConnection, isCloudEnabled } from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";

/**
 * POST /api/oauth/cursor/import
 * Import and validate access token from Cursor IDE's local SQLite database
 *
 * Request body:
 * - accessToken: string - Access token from cursorAuth/accessToken
 * - machineId: string - Machine ID from storage.serviceMachineId
 */
export async function POST(request: any) {
  try {
    const { accessToken, machineId } = await request.json();

    if (!accessToken || typeof accessToken !== "string") {
      return NextResponse.json({ error: "Access token is required" }, { status: 400 });
    }

    if (!machineId || typeof machineId !== "string") {
      return NextResponse.json({ error: "Machine ID is required" }, { status: 400 });
    }

    const cursorService = new CursorService();

    // Validate token by making API call
    const tokenData = await cursorService.validateImportToken(accessToken.trim(), machineId.trim());

    // Try to extract user info from token
    const userInfo = cursorService.extractUserInfo(tokenData.accessToken);

    // Save to database
    const connection: any = await createProviderConnection({
      provider: "cursor",
      authType: "oauth",
      accessToken: tokenData.accessToken,
      refreshToken: null, // Cursor doesn't have public refresh endpoint
      expiresAt: new Date(Date.now() + tokenData.expiresIn * 1000).toISOString(),
      email: userInfo?.email || null,
      providerSpecificData: {
        machineId: tokenData.machineId,
        authMethod: "imported",
        provider: "Imported",
        userId: userInfo?.userId,
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
    console.log("Cursor import token error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * GET /api/oauth/cursor/import
 * Get instructions for importing Cursor token
 */
export async function GET() {
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
        name: "machineId",
        label: "Machine ID",
        description: "From storage.serviceMachineId in state.vscdb",
        type: "text",
      },
    ],
  });
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
    console.log("Error syncing to cloud after Cursor import:", error);
  }
}
