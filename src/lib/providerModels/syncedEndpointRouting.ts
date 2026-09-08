import { getAllCustomModels, getSyncedAvailableModelsByConnection } from "@/lib/db/models";
import { isSelfHostedChatProvider, resolveProviderId } from "@/shared/constants/providers";

export type LocalSyncedEndpointRoute = {
  provider: string;
  model: string;
  connectionIds: string[];
};

export async function resolveLocalSyncedEndpointRoute(
  modelStr: string,
  endpoint: "embeddings" | "images"
): Promise<LocalSyncedEndpointRoute | null> {
  const slashIndex = modelStr.indexOf("/");
  if (slashIndex <= 0 || slashIndex === modelStr.length - 1) return null;

  const provider = resolveProviderId(modelStr.slice(0, slashIndex));
  const model = modelStr.slice(slashIndex + 1);
  if (!isSelfHostedChatProvider(provider)) return null;

  // Most local servers' own /v1/models response carries no capability data at
  // all (llama.cpp included -- unlike Ollama's /api/show, there is nothing to
  // probe), so a discovered model's synced cache entry below often has no
  // supportedEndpoints of its own. An operator-set override (PUT
  // /api/provider-models, keyed by the exact catalog id the client used) is
  // the explicit "this model does support embeddings" declaration for
  // exactly that case -- honor it here the same way the /v1/models catalog
  // already merges customModels on top of synced entries, instead of only
  // trusting the un-annotated raw sync cache.
  const customModelsForProvider = (await getAllCustomModels())[provider];
  const overrideEndpoints = Array.isArray(customModelsForProvider)
    ? (
        customModelsForProvider as Array<{ id?: unknown; supportedEndpoints?: unknown }>
      ).find((entry) => entry.id === modelStr)?.supportedEndpoints
    : undefined;
  const hasOverride = Array.isArray(overrideEndpoints) && overrideEndpoints.includes(endpoint);

  const byConnection = await getSyncedAvailableModelsByConnection(provider);
  const connectionIds = Object.entries(byConnection)
    .filter(([, models]) =>
      models.some(
        (candidate) =>
          candidate.id === model && (hasOverride || candidate.supportedEndpoints?.includes(endpoint))
      )
    )
    .map(([connectionId]) => connectionId);

  return connectionIds.length > 0 ? { provider, model, connectionIds } : null;
}
