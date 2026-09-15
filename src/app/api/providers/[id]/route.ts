import { NextResponse } from "next/server";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getProviderAuditTarget,
  summarizeProviderConnectionForAudit,
} from "@/lib/compliance/providerAudit";
import { getCachedProviderConnectionById } from "@/lib/db/readCache";
import { updateProviderConnection } from "@/lib/db/providers";
import { clearRequestRejectedStreak } from "@omniroute/open-sse/services/requestRejectedStreak.ts";
import { deleteProviderConnection } from "@/lib/db/providers/deletion";
import { isCloudEnabled } from "@/lib/db/settings";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import { updateProviderConnectionSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  normalizeProviderSpecificData,
  sanitizeProviderSpecificDataForResponse,
} from "@/lib/providers/requestDefaults";
import {
  buildClaudeExtraUsageStateClearUpdate,
  isClaudeExtraUsageBlockEnabled,
} from "@/lib/providers/claudeExtraUsage";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isApiKeyRevealEnabled, maskStoredApiKey } from "@/lib/apiKeyExposure";
import { cleanupProviderModelsAfterConnectionDelete } from "@/lib/db/models";
import { canUpdateProviderApiKey } from "@/shared/providers/webSessionCredentials";
import {
  refreshConnectionRateLimits,
  enableRateLimitProtection,
  disableRateLimitProtection,
} from "@/../open-sse/services/rateLimitManager";
import {
  finalizeValidatedChatGptWebCodexSecrets,
  decodeChatGptWebCodexSecrets,
  encodeChatGptWebCodexSecrets,
} from "@omniroute/open-sse/services/chatgptWebCodexAdmin.ts";
import { rejectRetiredCommonChatGptWebProvider } from "@/lib/providers/chatgptWebRetirementResponse";

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
    const connection = await getCachedProviderConnectionById(id);

    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    const revealKeys = isApiKeyRevealEnabled();

    // Hide or mask sensitive fields
    const result: Record<string, any> = { ...connection };
    if (!revealKeys) {
      result.apiKey = result.apiKey ? maskStoredApiKey(result.apiKey) : undefined;
    }
    delete result.accessToken;
    delete result.refreshToken;
    delete result.idToken;
    if (result.providerSpecificData) {
      result.providerSpecificData = sanitizeProviderSpecificDataForResponse(
        result.providerSpecificData
      );
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
      // never drop an operator's intent silently. Surface the rejected
      // keys (field paths and unrecognized-key names) alongside the existing
      // error envelope so clients and the UI can tell exactly what was refused.
      const rejected = [
        ...validation.error.details.map((d) => d.field).filter(Boolean),
        ...validation.error.details.flatMap((d) => d.keys ?? []),
      ];
      return NextResponse.json({ error: { ...validation.error, rejected } }, { status: 400 });
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
      group,
      maxConcurrent,
      quotaWindowThresholds: incomingWindowThresholds,
      proxyEnabled,
      perKeyProxyEnabled,
      quotaVisible,
      projectId,
      providerSpecificData: incomingPsd,
      rateLimitOverrides,
    } = body;

    const existing = (await getCachedProviderConnectionById(id)) as Record<string, any> | null;
    if (!existing) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }
    const retirementResponse = rejectRetiredCommonChatGptWebProvider(existing.provider);
    if (retirementResponse) return retirementResponse;

    const updateData: Record<string, any> = {};
    if (name !== undefined) updateData.name = name;
    if (priority !== undefined) updateData.priority = priority;
    if (globalPriority !== undefined) updateData.globalPriority = globalPriority;
    if (defaultModel !== undefined) updateData.defaultModel = defaultModel;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (apiKey && canUpdateProviderApiKey(existing.authType, existing.provider)) {
      if (existing.provider === "chatgpt-web-codex") {
        const validationId =
          incomingPsd && typeof incomingPsd.validationId === "string"
            ? incomingPsd.validationId
            : "";
        try {
          const incomingSecrets = decodeChatGptWebCodexSecrets(apiKey);
          const existingSecrets = decodeChatGptWebCodexSecrets(existing.apiKey || "");
          const encoded = encodeChatGptWebCodexSecrets({
            cookie: incomingSecrets.cookie,
            runtimeKey: incomingSecrets.runtimeKey || existingSecrets.runtimeKey,
          });
          updateData.apiKey = finalizeValidatedChatGptWebCodexSecrets(
            encoded,
            validationId
          ).encodedCredential;
        } catch (error) {
          return NextResponse.json(
            {
              error:
                error instanceof Error
                  ? error.message
                  : "Die ChatGPT-Browserprüfung konnte nicht abgeschlossen werden.",
            },
            { status: 400 }
          );
        }
      } else {
        updateData.apiKey = apiKey;
      }
    }
    if (testStatus !== undefined) updateData.testStatus = testStatus;
    if (lastError !== undefined) updateData.lastError = lastError;
    if (lastErrorAt !== undefined) updateData.lastErrorAt = lastErrorAt;
    if (lastErrorType !== undefined) updateData.lastErrorType = lastErrorType;
    if (lastErrorSource !== undefined) updateData.lastErrorSource = lastErrorSource;
    if (errorCode !== undefined) updateData.errorCode = errorCode;
    if (rateLimitedUntil !== undefined) updateData.rateLimitedUntil = rateLimitedUntil;
    // Clearing the cooldown by hand also forgets the refusal streak (#12859).
    if (rateLimitedUntil === null || testStatus === "active") clearRequestRejectedStreak(id);
    if (lastTested !== undefined) updateData.lastTested = lastTested;
    // healthCheckInterval PATCH semantics: undefined = leave as-is; null = clear
    // the override (connection follows the global default); 0-1440 = explicit
    // per-connection minutes (0 opts this connection out of the sweep).
    if (healthCheckInterval === null) updateData.healthCheckInterval = null;
    else if (healthCheckInterval !== undefined)
      updateData.healthCheckInterval = healthCheckInterval;
    if (group !== undefined) updateData.group = group;
    if (maxConcurrent !== undefined) updateData.maxConcurrent = maxConcurrent;
    if (incomingWindowThresholds !== undefined) {
      // PATCH semantics:
      //   • null            → clear every per-window override on this connection
      //   • {} (empty map)  → no-op (no keys to merge); existing overrides preserved
      //   • partial map     → merge into the existing map; a `null` value at any
      //                        key clears just that window's override
      if (incomingWindowThresholds === null) {
        updateData.quotaWindowThresholds = null;
      } else {
        const existingMap =
          existing.quotaWindowThresholds && typeof existing.quotaWindowThresholds === "object"
            ? { ...(existing.quotaWindowThresholds as Record<string, number>) }
            : {};
        for (const [window, value] of Object.entries(incomingWindowThresholds)) {
          if (value === null) {
            delete existingMap[window];
          } else if (typeof value === "number") {
            existingMap[window] = value;
          }
        }
        updateData.quotaWindowThresholds =
          Object.keys(existingMap).length === 0 ? null : existingMap;
      }
    }
    if (projectId !== undefined) updateData.projectId = projectId;
    if (rateLimitOverrides !== undefined) updateData.rateLimitOverrides = rateLimitOverrides;
    if (proxyEnabled !== undefined) updateData.proxyEnabled = proxyEnabled;
    if (perKeyProxyEnabled !== undefined) updateData.perKeyProxyEnabled = perKeyProxyEnabled;
    if (quotaVisible !== undefined) updateData.quotaVisible = quotaVisible;

    // Merge providerSpecificData (partial update — preserve existing keys not sent by caller)
    if (incomingPsd !== undefined && incomingPsd !== null && typeof incomingPsd === "object") {
      const existingPsd =
        existing.providerSpecificData && typeof existing.providerSpecificData === "object"
          ? existing.providerSpecificData
          : {};
      const mergedPsd = { ...existingPsd, ...incomingPsd };
      delete mergedPsd.validationId;
      delete mergedPsd.runtimeKey;

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

      const psd = updateData.providerSpecificData as Record<string, any>;
      if (psd.apiKeyHealth) {
        const health = psd.apiKeyHealth as Record<string, any>;

        // If the primary API key was explicitly replaced in this request,
        // clear stale health.primary — it no longer corresponds to the
        // current key. The next health check will regenerate it.
        if (updateData.apiKey !== undefined && updateData.apiKey !== existing.apiKey) {
          delete health.primary;
        }

        // Stale primary guard: no valid primary key → no primary health.
        const currentApiKey = updateData.apiKey ?? existing.apiKey ?? null;
        if (typeof currentApiKey !== "string" || currentApiKey.length === 0) {
          delete health.primary;
        }

        // Detect whether the extras list was explicitly changed by the caller.
        // The index-based mapping (extra_0, extra_1, …) drifts when a key is
        // inserted or removed mid-list, so we clear ALL extra health entries
        // when the list actually changes and let the next health check regen.
        const existingExtras = existingPsd.extraApiKeys;
        const incomingExtras = incomingPsd?.extraApiKeys;
        const extrasChanged =
          Array.isArray(incomingExtras) &&
          (!Array.isArray(existingExtras) ||
            existingExtras.length !== incomingExtras.length ||
            existingExtras.some((v: string, i: number) => v !== incomingExtras[i]));

        const extras = psd.extraApiKeys;
        const maxExtraIdx = Array.isArray(extras) ? extras.length : 0;
        for (const key of Object.keys(health)) {
          if (key.startsWith("extra_")) {
            if (extrasChanged) {
              // Extras modified — index drift possible. Clear all to be safe.
              delete health[key];
            } else {
              // Extras unchanged: only clean out-of-range indices.
              const idx = parseInt(key.slice(6), 10);
              if (isNaN(idx) || idx >= maxExtraIdx) {
                delete health[key];
              }
            }
          }
        }

        if (Object.keys(health).length === 0) {
          delete psd.apiKeyHealth;
        }
      }

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

    // If rateLimitOverrides was included in the request, refresh the in-memory
    // rate limiter state so the change takes effect without a server restart.
    // Only (re)enable enforcement when rate limit protection is actually
    // persisted for this connection — this route never lets a caller flip
    // `rateLimitProtection` itself, so any drift here would silently start
    // queuing requests through Bottleneck for a connection whose DB row (and
    // the dashboard toggle reading it) both still say "off" (#11278).
    if (rateLimitOverrides !== undefined) {
      refreshConnectionRateLimits(id, updated?.rateLimitOverrides ?? null);
      if (updated?.rateLimitProtection === true) {
        enableRateLimitProtection(id);
      } else {
        disableRateLimitProtection(id);
      }
    }

    // Hide sensitive fields
    const result: Record<string, any> = { ...updated };
    delete result.apiKey;
    delete result.accessToken;
    delete result.refreshToken;
    delete result.idToken;
    if (result.providerSpecificData) {
      result.providerSpecificData = sanitizeProviderSpecificDataForResponse(
        result.providerSpecificData
      );
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

// PATCH /api/providers/[id] - Update connection (partial)
// The OpenAPI spec and the CLI (`omniroute providers rotate`, generated
// api-commands) both use PATCH, but only PUT was implemented — PATCH requests
// 405'd. PATCH and PUT share the same update semantics here (the schema only
// applies provided fields), so delegate to the PUT handler.
export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
  return PUT(request, ctx);
}

// DELETE /api/providers/[id] - Delete connection
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);

  try {
    const { id } = await params;

    // Fetch connection before deleting to check provider type
    const connection = (await getCachedProviderConnectionById(id)) as Record<string, any> | null;
    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    const deleted = await deleteProviderConnection(id);
    if (!deleted) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    // Remove this connection's synced models. Provider-level imported models
    // are removed only when this was the provider's final connection.
    try {
      await cleanupProviderModelsAfterConnectionDelete(connection.provider, id);
    } catch (e) {
      console.error(`Failed to clean up models for deleted ${connection.provider} connection:`, e);
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
