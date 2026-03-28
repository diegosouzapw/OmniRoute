import { NextResponse } from "next/server";
import { getProviderConnectionById } from "@/models";
import { replaceCustomModels } from "@/lib/db/models";
import { saveCallLog } from "@/lib/usage/callLogs";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import {
  buildModelSyncInternalHeaders,
  isModelSyncInternalRequest,
} from "@/shared/services/modelSyncScheduler";

/**
 * POST /api/providers/[id]/sync-models
 *
 * Fetches the model list from a provider's /models endpoint and replaces the
 * full custom models list for that provider. Logs the operation to call_logs.
 *
 * Used by:
 * - modelSyncScheduler (auto-sync on interval)
 * - Manual trigger from UI
 */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const start = Date.now();
  const { id } = await params;

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

    // Use a human-readable provider name for logs
    const providerLabel = connection.name || connection.provider || "unknown";

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
        provider: providerLabel,
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

    // Replace the full model list
    const models = fetchedModels
      .map((m: any) => ({
        id: m.id || m.name || m.model,
        name: m.name || m.displayName || m.id || m.model,
        source: "auto-sync",
      }))
      .filter((m: any) => m.id);

    const replaced = await replaceCustomModels(connection.provider, models);

    // Log the successful sync
    await saveCallLog({
      method: "GET",
      path: `/api/providers/${id}/models`,
      status: 200,
      model: "model-sync",
      provider: providerLabel,
      sourceFormat: "-",
      connectionId: id,
      duration: Date.now() - start,
      requestType: "model-sync",
      responseBody: {
        syncedModels: models.length,
        provider: connection.provider,
      },
    });

    return NextResponse.json({
      ok: true,
      provider: connection.provider,
      syncedModels: replaced.length,
      models: replaced,
    });
  } catch (error: any) {
    // Log error
    await saveCallLog({
      method: "POST",
      path: `/api/providers/${id}/sync-models`,
      status: 500,
      model: "model-sync",
      provider: "unknown",
      sourceFormat: "-",
      connectionId: id,
      duration: Date.now() - start,
      error: error.message || "Sync failed",
      requestType: "model-sync",
    }).catch(() => {});

    return NextResponse.json({ error: error.message || "Failed to sync models" }, { status: 500 });
  }
}
