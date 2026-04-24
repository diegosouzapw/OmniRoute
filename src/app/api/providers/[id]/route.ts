import { NextResponse } from "next/server";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getProviderAuditTarget,
  summarizeProviderConnectionForAudit,
} from "@/lib/compliance/providerAudit";
import {
  getProviderConnectionById,
  updateProviderConnection,
  deleteProviderConnection,
  isCloudEnabled,
} from "@/models";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { updateProviderConnectionSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { normalizeProviderSpecificData } from "@/lib/providers/requestDefaults";
import {
  buildClaudeExtraUsageStateClearUpdate,
  isClaudeExtraUsageBlockEnabled,
} from "@/lib/providers/claudeExtraUsage";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

function normalizeCodexLimitPolicy(
  incoming: unknown,
  existing: unknown
): { use5h: boolean; useWeekly: boolean } {
  const incomingRecord =
    incoming && typeof incoming === "object" && !Array.isArray(incoming)
      ? (incoming as Record<string, unknown>)
      : {};
  const existingRecord =
    existing && typeof existing === "object" && !Array.isArray(existing)
      ? (existing as Record<string, unknown>)
      : {};

  const existingUse5h = typeof existingRecord.use5h === "boolean" ? existingRecord.use5h : true;
  const existingUseWeekly =
    typeof existingRecord.useWeekly === "boolean" ? existingRecord.useWeekly : true;

  return {
    use5h: typeof incomingRecord.use5h === "boolean" ? incomingRecord.use5h : existingUse5h,
    useWeekly:
      typeof incomingRecord.useWeekly === "boolean" ? incomingRecord.useWeekly : existingUseWeekly,
  };
}

// GET /api/providers/[id] - Get single connection
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

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
    if (result.providerSpecificData) {
      delete result.providerSpecificData.consoleApiKey;
    }

    return NextResponse.json({ connection: result });
  } catch (error) {
    console.log("Error fetching connection:", error);
    return NextResponse.json({ error: "Failed to fetch connection" }, { status: 500 });
  }
}

// PUT /api/providers/[id] - Update connection
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);
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
    const validation = validateBody(updateProviderConnectionSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const body = validation.data;
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
      providerSpecificData: incomingPsd,
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

    // Merge providerSpecificData (partial update — preserve existing keys not sent by caller)
    if (incomingPsd !== undefined && incomingPsd !== null && typeof incomingPsd === "object") {
      const existingPsd =
        existing.providerSpecificData && typeof existing.providerSpecificData === "object"
          ? existing.providerSpecificData
          : {};
      const mergedPsd = { ...existingPsd, ...incomingPsd };

      // Deep-merge and normalize Codex limit policy defaults.
      if (existing.provider === "codex") {
        const incomingRecord = incomingPsd as Record<string, unknown>;
        if ("codexLimitPolicy" in incomingRecord || "codexLimitPolicy" in existingPsd) {
          mergedPsd.codexLimitPolicy = normalizeCodexLimitPolicy(
            incomingRecord.codexLimitPolicy,
            (existingPsd as Record<string, unknown>).codexLimitPolicy
          );
        }
      }

      updateData.providerSpecificData =
        normalizeProviderSpecificData(existing.provider, mergedPsd) || {};

      if (!isClaudeExtraUsageBlockEnabled(existing.provider, updateData.providerSpecificData)) {
        const clearExtraUsageUpdate = buildClaudeExtraUsageStateClearUpdate({
          provider: existing.provider,
          testStatus: existing.testStatus,
          lastError: existing.lastError,
          lastErrorAt: existing.lastErrorAt,
          lastErrorType: existing.lastErrorType,
          lastErrorSource: existing.lastErrorSource,
          errorCode: existing.errorCode,
          rateLimitedUntil: existing.rateLimitedUntil,
          backoffLevel: existing.backoffLevel,
        });
        if (clearExtraUsageUpdate) {
          Object.assign(updateData, clearExtraUsageUpdate);
        }
      }
    }

    const updated = await updateProviderConnection(id, updateData);

    // Hide sensitive fields
    const result: Record<string, any> = { ...updated };
    delete result.apiKey;
    delete result.accessToken;
    delete result.refreshToken;
    delete result.idToken;
    if (result.providerSpecificData) {
      delete result.providerSpecificData.consoleApiKey;
    }

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    logAuditEvent({
      action: "provider.credentials.updated",
      actor: "admin",
      target: getProviderAuditTarget(updated || existing),
      resourceType: "provider_credentials",
      status: "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: {
        provider: existing.provider,
        changedFields: Object.keys(updateData),
        before: summarizeProviderConnectionForAudit(existing),
        after: summarizeProviderConnectionForAudit(updated),
      },
    });

    return NextResponse.json({ connection: result });
  } catch (error) {
    console.log("Error updating connection:", error);
    return NextResponse.json({ error: "Failed to update connection" }, { status: 500 });
  }
}

// DELETE /api/providers/[id] - Delete connection
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);

  try {
    const { id } = await params;

    // Fetch connection before deleting to check provider type
    const connection = await getProviderConnectionById(id);
    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    const deleted = await deleteProviderConnection(id);
    if (!deleted) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    // Clean up synced available models for this connection
    try {
      const { deleteSyncedAvailableModelsForConnection } = await import("@/lib/db/models");
      await deleteSyncedAvailableModelsForConnection(connection.provider, id);
    } catch (e) {
      console.error(
        `Failed to clean up synced models for deleted ${connection.provider} connection:`,
        e
      );
    }

    // Auto sync to Cloud if enabled
    await syncToCloudIfEnabled();

    logAuditEvent({
      action: "provider.credentials.revoked",
      actor: "admin",
      target: getProviderAuditTarget(connection),
      resourceType: "provider_credentials",
      status: "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: {
        provider: connection.provider,
        connection: summarizeProviderConnectionForAudit(connection),
      },
    });

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
