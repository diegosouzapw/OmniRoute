import { NextResponse } from "next/server";
import {
  deleteApiKey,
  getApiKeyById,
  updateApiKeyPermissions,
  isCloudEnabled,
} from "@/lib/localDb";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { updateKeyPermissionsSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

// GET /api/keys/[id] - Get single API key
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const key = await getApiKeyById(id);

    if (!key) {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    // Mask the key value
    const keyValue = typeof key.key === "string" ? key.key : null;
    return NextResponse.json({
      ...key,
      key: keyValue ? keyValue.slice(0, 8) + "****" + keyValue.slice(-4) : null,
    });
  } catch (error) {
    console.log("Error fetching key:", error);
    return NextResponse.json({ error: "Failed to fetch key" }, { status: 500 });
  }
}

// PATCH /api/keys/[id] - Update API key permissions/privacy controls
export async function PATCH(request, { params }) {
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
    const { id } = await params;
    const validation = validateBody(updateKeyPermissionsSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const {
      name,
      allowedModels,
      allowedConnections,
      noLog,
      autoResolve,
      isActive,
      maxSessions,
      accessSchedule,
    } = validation.data;

    const payload: Parameters<typeof updateApiKeyPermissions>[1] = {};
    if (name !== undefined) payload.name = name;
    if (allowedModels !== undefined) payload.allowedModels = allowedModels;
    if (allowedConnections !== undefined) payload.allowedConnections = allowedConnections;
    if (noLog !== undefined) payload.noLog = noLog;
    if (autoResolve !== undefined) payload.autoResolve = autoResolve;
    if (isActive !== undefined) payload.isActive = isActive;
    if (maxSessions !== undefined) payload.maxSessions = maxSessions;
    if (accessSchedule !== undefined) payload.accessSchedule = accessSchedule;

    const updated = await updateApiKeyPermissions(id, payload);
    if (!updated) {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    // Auto sync to Cloud if enabled
    await syncKeysToCloudIfEnabled();

    return NextResponse.json({
      message: "API key settings updated successfully",
      ...(name !== undefined && { name }),
      ...(allowedModels !== undefined && { allowedModels }),
      ...(allowedConnections !== undefined && { allowedConnections }),
      ...(noLog !== undefined && { noLog }),
      ...(autoResolve !== undefined && { autoResolve }),
      ...(isActive !== undefined && { isActive }),
      ...(maxSessions !== undefined && { maxSessions }),
      ...(accessSchedule !== undefined && { accessSchedule }),
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
