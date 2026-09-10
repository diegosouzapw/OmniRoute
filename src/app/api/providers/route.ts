import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import {
  getProviderAuditTarget,
  summarizeProviderConnectionForAudit,
} from "@/lib/compliance/providerAudit";
import {
  getProviderConnections,
  getProviderConnectionsCount,
  createProviderConnection,
  deleteProviderConnections,
  updateProviderConnection,
  resolveProviderNodeForConnection,
  isCloudEnabled,
} from "@/models";
import {
  isClaudeCodeCompatibleProvider,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
  resolveProviderId,
} from "@/shared/constants/providers";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { syncToCloud } from "@/lib/cloudSync";
import {
  createProviderSchema,
  batchUpdateProviderConnectionsSchema,
} from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { normalizeQoderPatProviderData } from "@omniroute/open-sse/services/qoderCli";
import { projectCodexAccountPool } from "@omniroute/open-sse/services/codexAccount/index.ts";
import {
  CODEX_SPARK_QUOTA_SESSION,
  CODEX_SPARK_QUOTA_WEEKLY,
} from "@omniroute/open-sse/config/codexQuotaScopes.ts";
import {
  normalizeProviderSpecificData,
  sanitizeProviderSpecificDataForResponse,
} from "@/lib/providers/requestDefaults";
import { getQuotaWindowObservation } from "@/domain/quotaCache";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isManagedProviderConnectionId } from "@/lib/providers/catalog";
import { isApiKeyRevealEnabled, maskStoredApiKey } from "@/lib/apiKeyExposure";
import { cleanupProviderModelsAfterConnectionDelete } from "@/lib/db/models";
import {
  buildModelSyncInternalHeaders,
  fetchModelSyncInternal,
  getModelSyncInternalBaseUrl,
} from "@/shared/services/modelSyncScheduler";
// Dynamically imported below, inside the one `provider === "chatgpt-web-codex"`
// branch that needs it: this module's transitive chain pulls in tiktoken's
// WASM tokenizer, which Turbopack dev mode fails to resolve for this graph
// even with `tiktoken` listed in serverExternalPackages (the standalone
// Node require works fine; only Turbopack's bundling of this import path
// doesn't). A static top-level import evaluates that whole chain on EVERY
// /api/providers request regardless of provider, turning an unrelated-
// provider bug into a route-wide 500. Loading it lazily, only when actually
// needed, avoids paying that cost (and that risk) on the common path.
import { isAutoFetchModelsEnabled } from "@/lib/providerModels/modelDiscovery";
import { testSingleConnection } from "./[id]/test/route";
import { rejectRetiredCommonChatGptWebProvider } from "@/lib/providers/chatgptWebRetirementResponse";

function projectCodexAccountPoolWithRoutingQuota(
  connection: Parameters<typeof projectCodexAccountPool>[0],
  now: number
) {
  const projection = projectCodexAccountPool(connection, now);
  const children = projection.children.map((child) => {
    const fiveHourWindow = child.key.scope === "spark" ? CODEX_SPARK_QUOTA_SESSION : "session";
    const weeklyWindow = child.key.scope === "spark" ? CODEX_SPARK_QUOTA_WEEKLY : "weekly";
    const fiveHour = getQuotaWindowObservation(connection.id, fiveHourWindow);
    const weekly = getQuotaWindowObservation(connection.id, weeklyWindow);
    if (!fiveHour && !weekly) return child;

    return {
      ...child,
      quota: {
        ...child.quota,
        observedAt: fiveHour?.observedAt ?? weekly?.observedAt ?? null,
        windows: {
          "5h": fiveHour
            ? {
                usage: null,
                limit: null,
                resetAt: fiveHour.resetAt,
                usedPercentage: fiveHour.usedPercentage,
              }
            : child.quota.windows["5h"],
          "7d": weekly
            ? {
                usage: null,
                limit: null,
                resetAt: weekly.resetAt,
                usedPercentage: weekly.usedPercentage,
              }
            : child.quota.windows["7d"],
        },
      },
    };
  }) as typeof projection.children;

  return { ...projection, children };
}

// GET /api/providers - List all connections
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const provider = url.searchParams.get("provider")?.trim();
    const limitValue = url.searchParams.get("limit");
    const offsetValue = url.searchParams.get("offset");
    const parsedLimit = limitValue ? Number.parseInt(limitValue, 10) : undefined;
    const parsedOffset = offsetValue ? Number.parseInt(offsetValue, 10) : undefined;
    const limit =
      Number.isInteger(parsedLimit) && parsedLimit && parsedLimit > 0 ? parsedLimit : undefined;
    const offset =
      Number.isInteger(parsedOffset) && parsedOffset && parsedOffset > 0 ? parsedOffset : 0;
    const filter = provider ? { provider } : {};

    const connections = await getProviderConnections(filter, limit, offset);
    const total = getProviderConnectionsCount(filter);
    const revealKeys = isApiKeyRevealEnabled();

    // Hide or mask sensitive fields
    const safeConnections = connections.map((c) => {
      const providerSpecificData = c.providerSpecificData
        ? sanitizeProviderSpecificDataForResponse(c.providerSpecificData)
        : undefined;
      return {
        ...c,
        apiKey: revealKeys ? c.apiKey : c.apiKey ? maskStoredApiKey(c.apiKey) : undefined,
        accessToken: undefined,
        refreshToken: undefined,
        idToken: undefined,
        providerSpecificData,
        ...(c.provider === "codex"
          ? {
              codexAccountPool: projectCodexAccountPoolWithRoutingQuota(
                {
                  id: c.id,
                  provider: c.provider,
                  providerSpecificData: c.providerSpecificData ?? {},
                },
                Date.now()
              ),
            }
          : {}),
      };
    });

    return NextResponse.json({ connections: safeConnections, total });
  } catch (error) {
    console.log("Error fetching providers:", error);
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 });
  }
}

// POST /api/providers - Create new connection (API Key only, OAuth via separate flow)
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);

  try {
    const body = await request.json();

    // Zod validation
    const validation = validateBody(createProviderSchema, body);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const {
      provider: requestedProvider,
      apiKey,
      name,
      priority,
      globalPriority,
      defaultModel,
      testStatus,
      providerSpecificData: incomingPsd,
    } = validation.data;
    const provider = resolveProviderId(requestedProvider);
    const retirementResponse =
      rejectRetiredCommonChatGptWebProvider(requestedProvider) ??
      rejectRetiredCommonChatGptWebProvider(provider);
    if (retirementResponse) return retirementResponse;

    // Business validation
    const isValidProvider =
      isManagedProviderConnectionId(provider) ||
      isOpenAICompatibleProvider(provider) ||
      isAnthropicCompatibleProvider(provider);

    if (!isValidProvider) {
      return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    let providerSpecificData = incomingPsd || null;
    let persistedApiKey = apiKey;

    if (provider === "qoder") {
      providerSpecificData = normalizeQoderPatProviderData(providerSpecificData || {});
    }

    if (provider === "chatgpt-web-codex") {
      const validationId =
        providerSpecificData && typeof providerSpecificData.validationId === "string"
          ? providerSpecificData.validationId
          : "";
      try {
        const { finalizeValidatedChatGptWebCodexSecrets } =
          await import("@omniroute/open-sse/services/chatgptWebCodexAdmin.ts");
        const finalized = finalizeValidatedChatGptWebCodexSecrets(apiKey || "", validationId);
        persistedApiKey = finalized.encodedCredential;
        providerSpecificData = { ...(providerSpecificData || {}) };
        delete providerSpecificData.validationId;
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
    }

    if (isOpenAICompatibleProvider(provider)) {
      const node: any = await resolveProviderNodeForConnection(provider);
      if (!node) {
        return NextResponse.json({ error: "OpenAI Compatible node not found" }, { status: 404 });
      }

      // Allow multiple connections for compatible nodes exactly like first-party providers

      providerSpecificData = {
        ...(providerSpecificData || {}),
        prefix: node.prefix,
        apiType: node.apiType,
        baseUrl: node.baseUrl,
        nodeName: node.name,
        ...(node.chatPath ? { chatPath: node.chatPath } : {}),
        ...(node.modelsPath ? { modelsPath: node.modelsPath } : {}),
        ...(node.customHeaders ? { customHeaders: node.customHeaders } : {}),
      };
    } else if (isAnthropicCompatibleProvider(provider)) {
      const node: any = await resolveProviderNodeForConnection(provider);
      if (!node) {
        return NextResponse.json(
          {
            error: isClaudeCodeCompatibleProvider(provider)
              ? "CC Compatible node not found"
              : "Anthropic Compatible node not found",
          },
          { status: 404 }
        );
      }

      // Allow multiple connections for compatible nodes exactly like first-party providers

      providerSpecificData = {
        ...(providerSpecificData || {}),
        prefix: node.prefix,
        baseUrl: node.baseUrl,
        nodeName: node.name,
        ...(node.chatPath ? { chatPath: node.chatPath } : {}),
        ...(node.modelsPath ? { modelsPath: node.modelsPath } : {}),
        ...(node.customHeaders ? { customHeaders: node.customHeaders } : {}),
      };
    }

    providerSpecificData = normalizeProviderSpecificData(provider, providerSpecificData) || null;

    const newConnection = await createProviderConnection({
      provider,
      authType: "apikey",
      name,
      apiKey: persistedApiKey,
      priority: priority || 1,
      globalPriority: globalPriority || null,
      defaultModel: defaultModel || null,
      providerSpecificData,
      // Start inactive: a connection is only advertised via /v1/models (which
      // filters on isActive) once a connection test has actually confirmed it
      // works. The auto-test fired below flips this to true on success (or on
      // an "unsupported" test, which cannot be verified either way and keeps
      // the historical trust-it default) — see testSingleConnection in
      // ./[id]/test/route.ts. A connection that fails its test, or is never
      // tested because auto-test itself errors, simply stays hidden until the
      // operator fixes the credential and re-tests it manually.
      isActive: false,
      testStatus: testStatus || "unknown",
    });

    // Auto-trigger model discovery only for an explicit autoFetchModels opt-in.
    // Fire-and-forget: model sync can take seconds and should NOT block the
    // POST response. If it fails, we log and move on — the connection itself
    // is already persisted and the user can manually trigger a sync later.
    // We use a self-fetch against our own /sync-models route, forwarding the
    // incoming cookies (preserves management auth) plus the internal sync
    // auth header (defense in depth) and an X-Internal-Auto-Sync marker for
    // log correlation. The dashboard skips this server-owned copy when it
    // performs the same sync itself so it can render progress.
    if (
      isAutoFetchModelsEnabled(providerSpecificData) &&
      request.headers.get("x-skip-model-sync") !== "true"
    ) {
      try {
        // SECURITY: use the trusted loopback/env-pinned origin, NOT
        // `new URL(request.url).origin` — the latter comes from the client-
        // controlled Host header, which would let a caller redirect this
        // credential-bearing internal self-fetch to an arbitrary host
        // (SSRF + internal-auth-header exfiltration; CodeQL js/request-forgery).
        const internalOrigin = getModelSyncInternalBaseUrl();
        const cookieHeader = request.headers.get("cookie") || "";
        const syncHeaders: Record<string, string> = {
          "Content-Type": "application/json",
          "X-Internal-Auto-Sync": "true",
          ...(cookieHeader ? { cookie: cookieHeader } : {}),
          ...buildModelSyncInternalHeaders(),
        };
        const syncUrl = `${internalOrigin}/api/providers/${encodeURIComponent(newConnection.id)}/sync-models?mode=import`;
        // Intentionally not awaited: this is async/non-blocking work.
        void fetchModelSyncInternal(syncUrl, {
          method: "POST",
          headers: syncHeaders,
          redirect: "error",
        })
          .then((syncRes) => {
            if (!syncRes.ok) {
              console.log(
                `[providers] Auto-sync failed for ${newConnection.id}: ${syncRes.status}`
              );
            }
          })
          .catch((err) => {
            console.log(
              `[providers] Auto-sync error for ${newConnection.id}:`,
              err?.message || err
            );
          });
      } catch (syncSetupError) {
        // Defensive: if URL parsing or header construction itself throws, do
        // not let it break the (already successful) POST response.
        console.log(
          `[providers] Auto-sync setup failed for ${newConnection.id}:`,
          syncSetupError?.message || syncSetupError
        );
      }
    }

    // Auto-test the newly created connection so `testStatus` reflects reality
    // shortly after creation instead of sitting at "unknown" until the
    // operator manually clicks "Test" in the dashboard. Fire-and-forget for
    // the same reason as the auto-sync above: the probe can take a few
    // seconds (OAuth refresh, upstream round-trip) and must not block the
    // 201 response. testSingleConnection() persists testStatus/lastError/etc.
    // itself, so nothing further is needed here beyond logging failures.
    void testSingleConnection(newConnection.id).catch((testError: unknown) => {
      console.log(
        `[providers] Auto-test failed for ${newConnection.id}:`,
        (testError as { message?: string })?.message || testError
      );
    });

    // Note: Gemini model sync is now triggered client-side with progress dialog

    // Hide sensitive fields
    const result: Record<string, any> = { ...newConnection };
    delete result.apiKey;
    if (result.providerSpecificData) {
      result.providerSpecificData = sanitizeProviderSpecificDataForResponse(
        result.providerSpecificData
      );
    }

    // Post-commit housekeeping: sync + audit must never fail the 201 response.
    // The connection is already persisted; these are non-critical side-effects.
    try {
      await syncToCloudIfEnabled();
    } catch (housekeepingError) {
      console.log(
        `[providers] syncToCloudIfEnabled failed after connection creation for ${newConnection.id}:`,
        housekeepingError
      );
    }

    try {
      logAuditEvent({
        action: "provider.credentials.created",
        actor: "admin",
        target: getProviderAuditTarget(newConnection),
        resourceType: "provider_credentials",
        status: "success",
        ipAddress: auditContext.ipAddress || undefined,
        requestId: auditContext.requestId,
        metadata: {
          provider: provider,
          connection: summarizeProviderConnectionForAudit(newConnection),
        },
      });
    } catch (auditError) {
      console.log(
        `[providers] logAuditEvent failed after connection creation for ${newConnection.id}:`,
        auditError
      );
    }

    return NextResponse.json({ connection: result }, { status: 201 });
  } catch (error) {
    console.log("Error creating provider:", error);
    return NextResponse.json({ error: "Failed to create provider" }, { status: 500 });
  }
}

// PATCH /api/providers - Bulk activate/deactivate connections
export async function PATCH(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(batchUpdateProviderConnectionsSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const { ids, isActive } = validation.data;

  try {
    if (isActive) {
      const requestedIds = new Set(ids);
      const requestedConnections = (
        await getProviderConnections({}, undefined, undefined, ["id", "provider"])
      ).filter((connection) => requestedIds.has(connection.id));
      for (const connection of requestedConnections) {
        const retirementResponse = rejectRetiredCommonChatGptWebProvider(connection.provider);
        if (retirementResponse) return retirementResponse;
      }
    }

    // Partial-failure semantics: report unknown IDs instead of failing the whole batch
    const updatedIds: string[] = [];
    const notFoundIds: string[] = [];
    for (const id of ids) {
      const updated = await updateProviderConnection(id, { isActive });
      if (updated) updatedIds.push(id);
      else notFoundIds.push(id);
    }

    await syncToCloudIfEnabled();

    // Partial failure (some ids no longer exist) is logged as "warn" so the
    // Activity feed reflects that not every requested id was applied.
    logAuditEvent({
      action: "provider.credentials.batch_updated",
      actor: "admin",
      resourceType: "provider_credentials",
      status: notFoundIds.length > 0 ? "warn" : "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: { isActive, updated: updatedIds.length, notFound: notFoundIds, ids },
    });

    return NextResponse.json(
      {
        message: `${isActive ? "Activated" : "Deactivated"} ${updatedIds.length} connection(s)`,
        updated: updatedIds.length,
        notFound: notFoundIds,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error batch updating connections:", error);
    return NextResponse.json({ error: "Failed to batch update connections" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);

  let body: { ids?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body.ids) || body.ids.length === 0) {
    return NextResponse.json(
      { error: "ids must be a non-empty array of connection IDs" },
      { status: 400 }
    );
  }

  if (body.ids.length > 100) {
    return NextResponse.json(
      { error: "Cannot delete more than 100 connections at once" },
      { status: 400 }
    );
  }

  try {
    const requestedIds = new Set(body.ids);
    const deletedConnections = (
      (await getProviderConnections({}, undefined, undefined, ["id", "provider"])) as Array<{
        id: string;
        provider: string;
      }>
    ).filter((connection) => requestedIds.has(connection.id));
    const deleted = await deleteProviderConnections(body.ids);

    for (const connection of deletedConnections) {
      try {
        await cleanupProviderModelsAfterConnectionDelete(connection.provider, connection.id);
      } catch (error) {
        console.error(
          `Failed to clean up models for deleted ${connection.provider} connection:`,
          error
        );
      }
    }

    await syncToCloudIfEnabled();

    logAuditEvent({
      action: "provider.credentials.batch_revoked",
      actor: "admin",
      resourceType: "provider_credentials",
      status: "success",
      ipAddress: auditContext.ipAddress || undefined,
      requestId: auditContext.requestId,
      metadata: { count: deleted, ids: body.ids },
    });

    return NextResponse.json(
      { message: `Deleted ${deleted} connection(s)`, deleted },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error batch deleting connections:", error);
    return NextResponse.json({ error: "Failed to batch delete connections" }, { status: 500 });
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
