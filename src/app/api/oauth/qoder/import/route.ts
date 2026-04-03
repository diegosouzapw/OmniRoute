import { NextResponse } from "next/server";
import { createProviderConnection, isCloudEnabled } from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";

/**
 * POST /api/oauth/qoder/import
 * Import Qoder Personal Access Token (PAT)
 */
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
    const { apiKey } = rawBody;

    if (!apiKey || typeof apiKey !== "string" || apiKey.trim().length === 0) {
      return NextResponse.json(
        {
          error: {
            message: "apiKey is required",
            details: [{ field: "apiKey", message: "Must provide a valid Qoder PAT" }],
          },
        },
        { status: 400 }
      );
    }

    // Save to database (PATs last up to 1 year)
    const connection: any = await createProviderConnection({
      provider: "qoder",
      authType: "apikey",
      apiKey: apiKey.trim(),
      accessToken: null,
      refreshToken: null,
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year
      email: null,
      providerSpecificData: {
        authMethod: "imported",
        provider: "PAT",
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
      },
    });
  } catch (error: any) {
    console.log("Qoder import token error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * GET /api/oauth/qoder/import
 * Return instructions for importing Qoder PAT
 */
export async function GET() {
  return NextResponse.json({
    provider: "qoder",
    method: "import_token",
    instructions: `To get your Qoder Personal Access Token (PAT):

1. Go to https://qoder.com/settings
2. Navigate to Developer → API Keys
3. Generate a new PAT (valid for up to 1 year)
4. Copy the token and paste it below`,
    requiredFields: [
      {
        name: "apiKey",
        label: "Personal Access Token",
        description: "From qoder.com/settings → API Keys",
        type: "textarea",
        placeholder: "qoder_pat_...",
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
    console.log("Error syncing to cloud after Qoder import:", error);
  }
}
