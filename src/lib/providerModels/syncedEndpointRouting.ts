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

  const providerPrefix = modelStr.slice(0, slashIndex);
  const provider = resolveProviderId(providerPrefix);
  if (!isSelfHostedChatProvider(provider)) return null;

  const rawSuffix = modelStr.slice(slashIndex + 1);
  // Some self-hosted servers (llama.cpp included) report models by absolute
  // filesystem path, so the raw id itself already starts with "/" --
  // "<prefix>/<rawId>" then reads as "<prefix>//models/foo.gguf" (a double
  // slash). That IS the byte-for-byte round-trip-safe id the catalog
  // displays, but an operator who naturally collapses it to a single slash
  // ("<prefix>/models/foo.gguf") should still resolve -- try the raw model
  // id both as given and with a leading "/" restored.
  const modelCandidates = rawSuffix.startsWith("/") ? [rawSuffix] : [rawSuffix, `/${rawSuffix}`];

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
  const byConnection = await getSyncedAvailableModelsByConnection(provider);

  for (const model of modelCandidates) {
    const overrideEndpoints = Array.isArray(customModelsForProvider)
      ? (
          customModelsForProvider as Array<{ id?: unknown; supportedEndpoints?: unknown }>
        ).find((entry) => entry.id === modelStr || entry.id === `${providerPrefix}/${model}`)
          ?.supportedEndpoints
      : undefined;
    const hasOverride = Array.isArray(overrideEndpoints) && overrideEndpoints.includes(endpoint);

    const connectionIds = Object.entries(byConnection)
      .filter(([, models]) =>
        models.some(
          (candidate) =>
            candidate.id === model && (hasOverride || candidate.supportedEndpoints?.includes(endpoint))
        )
      )
      .map(([connectionId]) => connectionId);

    if (connectionIds.length > 0) return { provider, model, connectionIds };
  }

  return null;
}
