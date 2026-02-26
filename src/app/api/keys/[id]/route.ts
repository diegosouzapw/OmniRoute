import { NextResponse } from "next/server";
import {
  deleteApiKey,
  getApiKeyById,
  updateApiKeyPermissions,
  isCloudEnabled,
} from "@/lib/localDb";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";

// GET /api/keys/[id] - Get single API key
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const key = await getApiKeyById(id);

    if (!key) {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    // Mask the key value
    return NextResponse.json({
      ...key,
      key: key.key ? key.key.slice(0, 8) + "****" + key.key.slice(-4) : null,
    });
  } catch (error) {
    console.log("Error fetching key:", error);
    return NextResponse.json({ error: "Failed to fetch key" }, { status: 500 });
  }
}

// PATCH /api/keys/[id] - Update API key permissions
export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { allowedModels } = body;

    // Validate allowedModels is an array
    if (!Array.isArray(allowedModels)) {
      return NextResponse.json({ error: "allowedModels must be an array" }, { status: 400 });
    }

    // Validate each model ID is a string
    for (const model of allowedModels) {
      if (typeof model !== "string") {
        return NextResponse.json({ error: "Each model ID must be a string" }, { status: 400 });
      }
    }

    const updated = await updateApiKeyPermissions(id, allowedModels);
    if (!updated) {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    // Auto sync to Cloud if enabled
    await syncKeysToCloudIfEnabled();

    return NextResponse.json({
      message: "Permissions updated successfully",
      allowedModels,
    });
  } catch (error) {
    console.log("Error updating key permissions:", error);
    return NextResponse.json({ error: "Failed to update permissions" }, { status: 500 });
  }
}

// DELETE /api/keys/[id] - Delete API key
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const deleted = await deleteApiKey(id);
    if (!deleted) {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    // Auto sync to Cloud if enabled
    await syncKeysToCloudIfEnabled();

    return NextResponse.json({ message: "Key deleted successfully" });
  } catch (error) {
    console.log("Error deleting key:", error);
    return NextResponse.json({ error: "Failed to delete key" }, { status: 500 });
  }
}

/**
 * Sync API keys to Cloud if enabled
 */
async function syncKeysToCloudIfEnabled() {
  try {
    const cloudEnabled = await isCloudEnabled();
    if (!cloudEnabled) return;

    const machineId = await getConsistentMachineId();
    await syncToCloud(machineId);
  } catch (error) {
    console.log("Error syncing keys to cloud:", error);
  }
}
