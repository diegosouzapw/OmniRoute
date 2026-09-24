import { getAllSyncedAvailableModels } from "@/lib/db/models";
import { getActiveSyncedCatalog } from "@/lib/db/models/activeSyncedCatalog";
import { isAuthenticated } from "@/shared/utils/apiAuth";

/**
 * GET /api/synced-available-models?provider=<id>
 * List synced available models for a provider (or all providers).
 */
export async function GET(request: Request) {
  try {
    if (!(await isAuthenticated(request))) {
      return Response.json(
        { error: { message: "Authentication required", type: "invalid_api_key" } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");

    if (provider) {
      // The dashboard merges operator-owned custom rows separately. Do not let
      // legacy imports act as evidence that a model still exists upstream.
      const catalog = await getActiveSyncedCatalog(provider, false);
      return Response.json(catalog);
    }

    const allModels = await getAllSyncedAvailableModels();
    return Response.json(allModels);
  } catch {
    return Response.json(
      { error: { message: "Failed to fetch synced available models", type: "server_error" } },
      { status: 500 }
    );
  }
}
