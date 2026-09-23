import { getAllSystemOneModels } from "@omniroute/open-sse/config/systemoneRegistry";
import { getAllRerankModels } from "@omniroute/open-sse/config/rerankRegistry";

type CatalogSystemOneOptions = {
  timestamp: number;
  isProviderActive: (providerId: string) => boolean;
  providerSupportsModel: (providerId: string, modelId: string) => boolean;
  isModelHidden: (providerId: string, modelId: string, modality: string) => boolean;
  hasEquivalentModel: (
    providerId: string,
    modelId: string,
    type: string,
    scopedModelId: string
  ) => boolean;
};

function relativeModelId(modelId: string, providerId: string): string {
  return modelId.startsWith(`${providerId}/`) ? modelId.slice(providerId.length + 1) : modelId;
}

/** Build evaluation-model rows that are advertised outside the chat endpoint. */
export function buildEvaluationCatalogModels(options: CatalogSystemOneOptions) {
  const rerankModels = getAllRerankModels().flatMap((model) => {
    const rawModelId = relativeModelId(model.id, model.provider);
    if (!options.isProviderActive(model.provider)) return [];
    if (!options.providerSupportsModel(model.provider, rawModelId)) return [];
    if (options.isModelHidden(model.provider, rawModelId, "rerank")) return [];
    if (options.hasEquivalentModel(model.provider, rawModelId, "rerank", model.id)) return [];
    return [
      {
        id: model.id,
        object: "model",
        created: options.timestamp,
        owned_by: model.provider,
        root: rawModelId,
        type: "rerank",
      },
    ];
  });

  const systemOneModels = getAllSystemOneModels().flatMap((model) => {
    const rawModelId = relativeModelId(model.id, model.provider);
    if (!options.isProviderActive(model.provider)) return [];
    if (!options.providerSupportsModel(model.provider, rawModelId)) return [];
    if (options.isModelHidden(model.provider, rawModelId, "systemone")) return [];
    if (options.hasEquivalentModel(model.provider, rawModelId, "systemone", model.id)) return [];

    return [
      {
        id: model.id,
        object: "model",
        created: options.timestamp,
        owned_by: model.provider,
        root: rawModelId,
        type: "systemone",
        api_format: "systemone",
        supported_endpoints: ["systemone"],
        input_modalities: ["text"],
        output_modalities: ["structured"],
      },
    ];
  });

  return [...rerankModels, ...systemOneModels];
}
