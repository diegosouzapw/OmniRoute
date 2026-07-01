import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry";
import {
  isModelContextLimitExplicitlyUnset,
  isModelMaxOutputTokensExplicitlyUnset,
} from "@/lib/modelCapabilities";

type CatalogModel = Record<string, any>;
type AliasMap = Record<string, string>;

function getCatalogModelRef(model: CatalogModel, aliasToProviderId: AliasMap) {
  if (model.owned_by === "combo") return null;
  const provider = typeof model.owned_by === "string" ? model.owned_by : null;
  if (!provider) return null;
  const resolvedProvider = aliasToProviderId[provider] || provider;
  let modelId = typeof model.root === "string" && model.root.trim() ? model.root.trim() : null;
  if (!modelId && typeof model.id === "string") {
    modelId = model.id;
    for (const prefix of [provider, resolvedProvider]) {
      const scopedPrefix = `${prefix}/`;
      if (modelId.startsWith(scopedPrefix)) {
        modelId = modelId.slice(scopedPrefix.length);
        break;
      }
    }
  }
  return modelId ? { provider: resolvedProvider, modelId } : null;
}

export function getDefaultContextFallback(
  model: CatalogModel,
  aliasToProviderId: AliasMap
): number | undefined {
  if (
    typeof model.context_length === "number" ||
    model.owned_by === "combo" ||
    (model.type && model.type !== "chat")
  ) {
    return undefined;
  }
  const ref = getCatalogModelRef(model, aliasToProviderId);
  if (!ref || isModelContextLimitExplicitlyUnset(ref.provider, ref.modelId)) return undefined;
  const registryEntry = REGISTRY[ref.provider];
  const registryFallback = registryEntry?.defaultContextLength;
  if (registryFallback) return registryFallback;

  return undefined;
}

export function applyExplicitUnknownLimitMasks<T extends CatalogModel>(
  model: T,
  aliasToProviderId: AliasMap
): T {
  const ref = getCatalogModelRef(model, aliasToProviderId);
  if (!ref) return model;

  let next = model;
  if (isModelContextLimitExplicitlyUnset(ref.provider, ref.modelId)) {
    next = next === model ? ({ ...model } as T) : next;
    delete next.context_length;
    delete next.max_input_tokens;
  }
  if (isModelMaxOutputTokensExplicitlyUnset(ref.provider, ref.modelId)) {
    next = next === model ? ({ ...model } as T) : next;
    delete next.max_output_tokens;
  }
  return next;
}
