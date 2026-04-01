import { NextResponse } from "next/server";
import { getProviderConnectionById } from "@/models";
import { getCustomModels, replaceCustomModels } from "@/lib/db/models";
import {
  syncManagedAvailableModelAliases,
  usesManagedAvailableModels,
} from "@/lib/providerModels/managedAvailableModels";
import { saveCallLog } from "@/lib/usage/callLogs";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  buildModelSyncInternalHeaders,
  isModelSyncInternalRequest,
} from "@/shared/services/modelSyncScheduler";
import { getModelsByProviderId } from "@/shared/constants/models";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function normalizeModelForComparison(model: unknown) {
  const record = asRecord(model);
  const id = toNonEmptyString(record.id) || "";
  const name = toNonEmptyString(record.name) || id;
  const source = toNonEmptyString(record.source) || "auto-sync";
  const apiFormat = toNonEmptyString(record.apiFormat) || "chat-completions";
  const supportedEndpoints = Array.isArray(record.supportedEndpoints)
    ? Array.from(
        new Set(
          record.supportedEndpoints
            .map((endpoint) => toNonEmptyString(endpoint))
            .filter((endpoint): endpoint is string => Boolean(endpoint))
        )
      ).sort()
    : ["chat"];

  return {
    id,
    name,
    source,
    apiFormat,
    supportedEndpoints,
  };
}

function summarizeModelChanges(previousModels: unknown, nextModels: unknown) {
  const previousList = Array.isArray(previousModels) ? previousModels : [];
  const nextList = Array.isArray(nextModels) ? nextModels : [];

  const previousMap = new Map(
    previousList
      .map((model) => normalizeModelForComparison(model))
      .filter((model) => model.id)
      .map((model) => [model.id, JSON.stringify(model)])
  );
  const nextMap = new Map(
    nextList
      .map((model) => normalizeModelForComparison(model))
      .filter((model) => model.id)
      .map((model) => [model.id, JSON.stringify(model)])
  );

  let added = 0;
  let removed = 0;
  let updated = 0;

  for (const [id, nextValue] of nextMap.entries()) {
    const previousValue = previousMap.get(id);
    if (!previousValue) {
      added += 1;
      continue;
    }
    if (previousValue !== nextValue) {
      updated += 1;
    }
  }

  for (const id of previousMap.keys()) {
    if (!nextMap.has(id)) {
      removed += 1;
    }
  }

  return {
    added,
    removed,
    updated,
    total: added + removed + updated,
  };
}

function getModelSyncChannelLabel(connection: unknown) {
  const record = asRecord(connection);
  const providerSpecificData = asRecord(record.providerSpecificData);

  return (
    toNonEmptyString(record.displayName) ||
    toNonEmptyString(record.email) ||
    toNonEmptyString(providerSpecificData.tag) ||
    toNonEmptyString(record.name) ||
    toNonEmptyString(record.provider) ||
    (toNonEmptyString(record.id) ? `connection:${String(record.id).slice(0, 8)}` : null) ||
    "unknown"
  );
}

/**
 * POST /api/providers/[id]/sync-models
 *
 * Fetches the model list from a provider's /models endpoint and replaces the
 * full custom models list for that provider. Successful syncs only write a
 * call log when the fetched channel actually changes the stored model list.
 *
 * Used by:
 * - modelSyncScheduler (auto-sync on interval)
 * - Manual trigger from UI
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const start = Date.now();
  const { id } = await params;
  let logProvider = "unknown";
  let channelLabel: string | null = null;

  try {
    if (!(await isAuthenticated(request)) && !isModelSyncInternalRequest(request)) {
      return NextResponse.json(
        { error: { message: "Authentication required", type: "invalid_api_key" } },
        { status: 401 }
      );
    }

    const connection = await getProviderConnectionById(id);
    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    logProvider = toNonEmptyString(connection.provider) || "unknown";
    channelLabel = getModelSyncChannelLabel(connection);

    // Fetch models from the existing /api/providers/[id]/models endpoint
    const origin = new URL(request.url).origin;
    const modelsUrl = `${origin}/api/providers/${id}/models`;
    const modelsRes = await fetch(modelsUrl, {
      method: "GET",
      headers: {
        cookie: request.headers.get("cookie") || "",
        ...buildModelSyncInternalHeaders(),
      },
    });

    const duration = Date.now() - start;
    const modelsData = await modelsRes.json();

    if (!modelsRes.ok) {
      // Log the failed attempt
      await saveCallLog({
        method: "GET",
        path: `/api/providers/${id}/models`,
        status: modelsRes.status,
        model: "model-sync",
        provider: logProvider,
        sourceFormat: "-",
        connectionId: id,
        duration,
        error: modelsData.error || `HTTP ${modelsRes.status}`,
        requestType: "model-sync",
      });

      return NextResponse.json(
        { error: modelsData.error || "Failed to fetch models" },
        { status: modelsRes.status }
      );
    }

    const fetchedModels = modelsData.models || [];

    // Filter out models already in the built-in registry
    const registryIds = new Set(getModelsByProviderId(logProvider).map((m: any) => m.id));

    // Replace the full model list
    const models = fetchedModels
      .map((m: any) => ({
        id: m.id || m.name || m.model,
        name: m.name || m.displayName || m.id || m.model,
        source: "auto-sync",
      }))
      .filter((m: any) => m.id && !registryIds.has(m.id));

    const previousModels = await getCustomModels(logProvider);
    const replaced = await replaceCustomModels(logProvider, models);
    const modelChanges = summarizeModelChanges(previousModels, replaced);

    let syncedAliases = 0;
    if (usesManagedAvailableModels(logProvider)) {
      const aliasSync = await syncManagedAvailableModelAliases(
        logProvider,
        models.map((model: any) => model.id)
      );
      syncedAliases = aliasSync.assignedAliases.length;
    }

    if (modelChanges.total > 0) {
      await saveCallLog({
        method: "GET",
        path: `/api/providers/${id}/models`,
        status: 200,
        model: "model-sync",
        provider: logProvider,
        sourceFormat: "-",
        connectionId: id,
        duration: Date.now() - start,
        requestType: "model-sync",
        responseBody: {
          syncedModels: models.length,
          syncedAliases,
          provider: logProvider,
          channel: channelLabel,
          modelChanges,
        },
      });
    }

    return NextResponse.json({
      ok: true,
      provider: logProvider,
      syncedModels: replaced.length,
      syncedAliases,
      modelChanges,
      logged: modelChanges.total > 0,
      models: replaced,
    });
  } catch (error: any) {
    // Log error
    await saveCallLog({
      method: "POST",
      path: `/api/providers/${id}/sync-models`,
      status: 500,
      model: "model-sync",
      provider: logProvider,
      sourceFormat: "-",
      connectionId: id,
      duration: Date.now() - start,
      error: error.message || "Sync failed",
      requestType: "model-sync",
      ...(channelLabel
        ? {
            responseBody: {
              channel: channelLabel,
            },
          }
        : {}),
    }).catch(() => {});

    return NextResponse.json({ error: error.message || "Failed to sync models" }, { status: 500 });
  }
}
