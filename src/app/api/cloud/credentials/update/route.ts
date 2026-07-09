import { NextResponse } from "next/server";
import { getProviderConnections, updateProviderConnection } from "@/models";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { cloudCredentialUpdateSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

// Update provider credentials (for cloud token refresh)
export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request, {
    alwaysRequireAuth: true,
    invalidApiKeyStatus: 401,
  });
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid request", details: [{ field: "body", message: "Invalid JSON body" }] } },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(cloudCredentialUpdateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { provider, credentials } = validation.data;

    // Find active connection for provider
    const connections = await getProviderConnections({ provider, isActive: true });
    const connection = connections[0];

    if (!connection) {
      return NextResponse.json(
        { error: `No active connection found for provider: ${provider}` },
        { status: 404 }
      );
    }

    // Update credentials
    const updateData: Record<string, unknown> = {};
    if (credentials.accessToken) {
      updateData.accessToken = credentials.accessToken;
    }
    if (credentials.refreshToken) {
      updateData.refreshToken = credentials.refreshToken;
    }
    if (credentials.expiresIn) {
      updateData.expiresAt = new Date(Date.now() + credentials.expiresIn * 1000).toISOString();
    }

    const connectionId = typeof connection.id === "string" ? connection.id : null;
    if (!connectionId) {
      return NextResponse.json({ error: "Invalid provider connection ID" }, { status: 500 });
    }
    await updateProviderConnection(connectionId, updateData);

    return NextResponse.json({
      success: true,
      message: `Credentials updated for provider: ${provider}`,
    });
  } catch (error) {
    console.log("Update credentials error:", error);
    return NextResponse.json({ error: "Failed to update credentials" }, { status: 500 });
  }
}
