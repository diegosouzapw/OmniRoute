import { getProviderConnectionById, updateProviderConnection } from "@/lib/localDb";
import { getMachineId } from "@/shared/utils/machine";
import { getUsageForProvider } from "@omniroute/open-sse/services/usage.js";
import { getExecutor } from "@omniroute/open-sse/executors/index.js";
import { syncToCloud } from "@/lib/cloudSync";

/**
 * Sync to cloud if enabled
 */
async function syncToCloudIfEnabled() {
  try {
    const machineId = await getMachineId();
    if (!machineId) return;
    await syncToCloud(machineId);
  } catch (error) {
    console.error("[Usage API] Error syncing to cloud:", error);
  }
}

/**
 * Refresh credentials using executor and update database
 * @returns {{ connection, refreshed: boolean }}
 */
async function refreshAndUpdateCredentials(connection: any) {
  const executor = getExecutor(connection.provider);

  // Build credentials object from connection
  const credentials = {
    accessToken: connection.accessToken,
    refreshToken: connection.refreshToken,
    expiresAt: connection.tokenExpiresAt,
    providerSpecificData: connection.providerSpecificData,
    // For GitHub
    copilotToken: connection.providerSpecificData?.copilotToken,
    copilotTokenExpiresAt: connection.providerSpecificData?.copilotTokenExpiresAt,
  };

  // Check if refresh is needed
  const needsRefresh = executor.needsRefresh(credentials);

  if (!needsRefresh) {
    return { connection, refreshed: false };
  }

  // Use executor's refreshCredentials method
  const refreshResult = await executor.refreshCredentials(credentials, console);

  if (!refreshResult) {
    // For GitHub, if refreshCredentials fails but we still have accessToken, try to use it directly
    if (connection.provider === "github" && connection.accessToken) {
      return { connection, refreshed: false };
    }
    throw new Error("Failed to refresh credentials. Please re-authorize the connection.");
  }

  // Build update object
  const now = new Date().toISOString();
  const updateData: Record<string, any> = {
    updatedAt: now,
  };

  // Update accessToken if present
  if (refreshResult.accessToken) {
    updateData.accessToken = refreshResult.accessToken;
  }

  // Update refreshToken if present
  if (refreshResult.refreshToken) {
    updateData.refreshToken = refreshResult.refreshToken;
  }

  // Update token expiry
  if (refreshResult.expiresIn) {
    updateData.tokenExpiresAt = new Date(Date.now() + refreshResult.expiresIn * 1000).toISOString();
  } else if (refreshResult.expiresAt) {
    updateData.tokenExpiresAt = refreshResult.expiresAt;
  }

  // Handle provider-specific data (copilotToken for GitHub, etc.)
  if (refreshResult.copilotToken || refreshResult.copilotTokenExpiresAt) {
    updateData.providerSpecificData = {
      ...connection.providerSpecificData,
      copilotToken: refreshResult.copilotToken,
      copilotTokenExpiresAt: refreshResult.copilotTokenExpiresAt,
    };
  }

  // Update database
  await updateProviderConnection(connection.id, updateData);

  // Return updated connection
  const updatedConnection = {
    ...connection,
    ...updateData,
  };

  return {
    connection: updatedConnection,
    refreshed: true,
  };
}

/**
 * GET /api/usage/[connectionId] - Get usage data for a specific connection
 */
export async function GET(request: Request, { params }: { params: Promise<{ connectionId: string }> }) {
  try {
    const { connectionId } = await params;

    // Get connection from database
    let connection = await getProviderConnectionById(connectionId);
    if (!connection) {
      return Response.json({ error: "Connection not found" }, { status: 404 });
    }

    // Only OAuth connections have usage APIs
    if (connection.authType !== "oauth") {
      return Response.json({ message: "Usage not available for API key connections" });
    }

    // Refresh credentials if needed using executor
    let refreshed = false;
    try {
      const result = await refreshAndUpdateCredentials(connection);
      connection = result.connection;
      refreshed = result.refreshed;

      // Sync to cloud only if token was refreshed
      if (refreshed) {
        await syncToCloudIfEnabled();
      }
    } catch (refreshError) {
      console.error("[Usage API] Credential refresh failed:", refreshError);
      return Response.json(
        {
          error: `Credential refresh failed: ${(refreshError as any).message}`,
        },
        { status: 401 }
      );
    }

    // Fetch usage from provider API
    const usage = await getUsageForProvider(connection);
    return Response.json(usage);
  } catch (error) {
    console.error("[Usage API] Error fetching usage:", error);
    console.error("[Usage API] Error stack:", (error as any).stack);
    return Response.json({ error: (error as any).message }, { status: 500 });
  }
}
