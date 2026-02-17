import { NextResponse } from "next/server";
import {
  getProviderConnectionById,
  updateProviderConnection,
  deleteProviderConnection,
  isCloudEnabled,
} from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";

// GET /api/providers/[id] - Get single connection
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const connection = await getProviderConnectionById(id);

    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    // Hide sensitive fields
    const result: Record<string, any> = { ...connection };
    delete result.apiKey;
    delete result.accessToken;
    delete result.refreshToken;
    delete result.idToken;

    return NextResponse.json({ connection: result });
  } catch (error) {
    console.log("Error fetching connection:", error);
    return NextResponse.json({ error: "Failed to fetch connection" }, { status: 500 });
  }
}

// PUT /api/providers/[id] - Update connection
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      name,
      priority,
      globalPriority,
      defaultModel,
      isActive,
      apiKey,
      testStatus,
      lastError,
      lastErrorAt,
      lastErrorType,
      lastErrorSource,
      errorCode,
      rateLimitedUntil,
      lastTested,
      healthCheckInterval,
    } = body;

    const existing = await getProviderConnectionById(id);
    if (!existing) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    const updateData: Record<string, any> = {};
    if (name !== undefined) updateData.name = name;
    if (priority !== undefined) updateData.priority = priority;
    if (globalPriority !== undefined) updateData.globalPriority = globalPriority;
    if (defaultModel !== undefined) updateData.defaultModel = defaultModel;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (apiKey && existing.authType === "apikey") updateData.apiKey = apiKey;
    if (testStatus !== undefined) updateData.testStatus = testStatus;
    if (lastError !== undefined) updateData.lastError = lastError;
    if (lastErrorAt !== undefined) updateData.lastErrorAt = lastErrorAt;
    if (lastErrorType !== undefined) updateData.lastErrorType = lastErrorType;
    if (lastErrorSource !== undefined) updateData.lastErrorSource = lastErrorSource;
    if (errorCode !== undefined) updateData.errorCode = errorCode;
    if (rateLimitedUntil !== undefined) updateData.rateLimitedUntil = rateLimitedUntil;
    if (lastTested !== undefined) updateData.lastTested = lastTested;
    if (healthCheckInterval !== undefined) updateData.healthCheckInterval = healthCheckInterval;

    const updated = await updateProviderConnection(id, updateData);

    // Hide sensitive fields
    const result: Record<string, any> = { ...updated };
    delete result.apiKey;
    delete result.accessToken;
    delete result.refreshToken;
    delete result.idToken;

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    return NextResponse.json({ connection: result });
  } catch (error) {
    console.log("Error updating connection:", error);
    return NextResponse.json({ error: "Failed to update connection" }, { status: 500 });
  }
}

// DELETE /api/providers/[id] - Delete connection
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const deleted = await deleteProviderConnection(id);
    if (!deleted) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    return NextResponse.json({ message: "Connection deleted successfully" });
  } catch (error) {
    console.log("Error deleting connection:", error);
    return NextResponse.json({ error: "Failed to delete connection" }, { status: 500 });
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
    console.log("Error syncing providers to cloud:", error);
  }
}
