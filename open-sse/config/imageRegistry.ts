/**
 * Image Generation Provider Registry
 *
 * Defines providers that support the /v1/images/generations endpoint.
 * Each provider has its own request format and endpoint.
 */

import { resolveRegisteredFeatureFlag } from "@/shared/utils/featureFlagResolverBridge.ts";
import { hasUnsafeModelIdSyntax } from "../utils/modelIdSafety.ts";
import {
  type ImageModelEntry,
  type ImageProviderConfig,
  type ImageModelAliasEntry,
  type ImageCatalogModelEntry,
  XAI_IMAGE_CONFIG,
  XAI_API_KEY_IMAGE_PROVIDER,
  XAI_SUBSCRIPTION_IMAGE_PROVIDERS,
  IMAGE_MODEL_ALIASES,
  IMAGE_PROVIDERS,
} from "./imageRegistryData.ts";

export {
  type ImageModelEntry,
  type ImageProviderConfig,
  type ImageModelAliasEntry,
  type ImageCatalogModelEntry,
  XAI_IMAGE_CONFIG,
  XAI_API_KEY_IMAGE_PROVIDER,
  XAI_SUBSCRIPTION_IMAGE_PROVIDERS,
  IMAGE_PROVIDERS,
};

export function isGrokSubscriptionImagesEnabled(): boolean {
  try {
    return resolveRegisteredFeatureFlag("GROK_SUBSCRIPTION_IMAGES_ENABLED");
  } catch (error) {
    console.error(
      "[imageRegistry] Failed to resolve GROK_SUBSCRIPTION_IMAGES_ENABLED, defaulting to disabled:",
      error instanceof Error ? error.message : error
    );
    const envValue = process.env.GROK_SUBSCRIPTION_IMAGES_ENABLED;
    return envValue === "true" || envValue === "1" || envValue === "yes";
  }
}

function visibleImageProviders(): Record<string, ImageProviderConfig> {
  if (!isGrokSubscriptionImagesEnabled()) return IMAGE_PROVIDERS;
  return { ...IMAGE_PROVIDERS, ...XAI_SUBSCRIPTION_IMAGE_PROVIDERS };
}

function resolveImageModelAlias(modelStr) {
  const alias = IMAGE_MODEL_ALIASES[modelStr];
  return alias ? { provider: alias.provider, model: alias.model } : null;
}

// A bare alias may only rewrite a provider-prefixed model when it stays on the
// SAME provider (e.g. `antigravity/gemini-3.1-flash-image-preview` →
// antigravity's callable `gemini-3.1-flash-image`). A cross-provider bare alias
// must NOT override an explicit prefix — #9982 removed the unconditional bare
// fallback because `fal-ai/flux-2-max` was being hijacked to black-forest-labs
// by the bare `flux-2-max` alias.
function resolveSameProviderBareAlias(providerId, model) {
  const aliased = resolveImageModelAlias(model);
  return aliased && aliased.provider === providerId ? aliased : null;
}

function findImageModelConfig(providerId, modelId) {
  const provider = visibleImageProviders()[providerId];
  if (!provider) return null;
  return (
    provider.models.find((model) => model.id === modelId || model.catalogId === modelId) || null
  );
}

function resolveImageProviderModelId(providerId, modelId) {
  return findImageModelConfig(providerId, modelId)?.id || modelId;
}

// Kept out of getImageModelEntry() (which sits at the complexity-ratchet cap) — an
// alias can override imageRequired directly, else it falls back to its target
// model's own flag. Consumers coerce the result with Boolean(), so no `?? false`.
function resolveAliasImageRequired(alias, modelConfig) {
  return alias.imageRequired ?? modelConfig?.imageRequired;
}

/**
 * Get image provider config by ID
 */
export function getImageProvider(providerId) {
  const providers = visibleImageProviders();
  if (providers[providerId]) return providers[providerId];
  if (!providerId) return null;
  for (const config of Object.values(providers)) {
    if (config.alias === providerId) return config;
  }
  return null;
}

/**
 * Parse image model string (format: "provider/model")
 * Returns { provider, model }
 */
export function parseImageModel(modelStr) {
  if (!modelStr || hasUnsafeModelIdSyntax(modelStr)) return { provider: null, model: null };

  const directAlias = resolveImageModelAlias(modelStr);
  if (directAlias) {
    return directAlias;
  }

  // Try each provider prefix
  for (const [providerId, config] of Object.entries(visibleImageProviders())) {
    if (modelStr.startsWith(providerId + "/")) {
      const model = modelStr.slice(providerId.length + 1);
      const aliased =
        resolveImageModelAlias(`${providerId}/${model}`) ||
        resolveSameProviderBareAlias(providerId, model);
      return (
        aliased || { provider: providerId, model: resolveImageProviderModelId(providerId, model) }
      );
    }
    // Check alias if available
    if (config.alias && modelStr.startsWith(config.alias + "/")) {
      const model = modelStr.slice(config.alias.length + 1);
      const aliased =
        resolveImageModelAlias(`${providerId}/${model}`) ||
        resolveSameProviderBareAlias(providerId, model);
      return (
        aliased || { provider: providerId, model: resolveImageProviderModelId(providerId, model) }
      );
    }
  }

  // No provider prefix — try to find the model in every provider, excluding cookie-auth (web) bridges
  for (const [providerId, config] of Object.entries(visibleImageProviders())) {
    const modelConfig = config.models.find(
      (model) => model.id === modelStr || model.catalogId === modelStr
    );
    if (
      config.authHeader !== "cookie" &&
      (config.routingAliases?.includes(modelStr) || modelConfig)
    ) {
      return { provider: providerId, model: modelConfig?.id || modelStr };
    }
  }

  return { provider: null, model: modelStr };
}

/**
 * Get all image models as a flat list
 */
function imageProviderCatalogEntries(
  providerId: string,
  config: ImageProviderConfig
): ImageCatalogModelEntry[] {
  return config.models.map((model) => ({
    id: `${providerId}/${model.catalogId || model.id}`,
    name: model.name,
    provider: providerId,
    supportedSizes: model.supportedSizes || config.supportedSizes,
    inputModalities: model.inputModalities || ["text"],
    description: model.description || undefined,
    mediaCapabilities: model.mediaCapabilities,
  }));
}

function imageAliasCatalogEntry(
  alias: string,
  target: ImageModelAliasEntry
): ImageCatalogModelEntry | null {
  if (!target.listInCatalog) return null;

  const providerConfig = visibleImageProviders()[target.provider];
  const modelConfig = findImageModelConfig(target.provider, target.model);
  return {
    id: alias,
    name: target.name || modelConfig?.name || alias,
    provider: target.provider,
    supportedSizes: providerConfig?.supportedSizes || [],
    inputModalities: target.inputModalities || modelConfig?.inputModalities || ["text"],
    description: target.description || modelConfig?.description || undefined,
  };
}

export function getAllImageModels(): ImageCatalogModelEntry[] {
  const providerModels = Object.entries(visibleImageProviders()).flatMap(([providerId, config]) =>
    imageProviderCatalogEntries(providerId, config)
  );
  const aliasModels = Object.entries(IMAGE_MODEL_ALIASES).flatMap(([alias, target]) => {
    const entry = imageAliasCatalogEntry(alias, target);
    return entry ? [entry] : [];
  });
  return [...providerModels, ...aliasModels];
}

export function getImageModelAliases() {
  return IMAGE_MODEL_ALIASES;
}

/**
 * #6457 — precise provider+modelId membership check against the image registry.
 * Unlike getImageModelEntry() (which also resolves bare aliases and unprefixed
 * ids by scanning every provider), this only answers "is `modelId` registered
 * as an image model under this exact `providerId`?" — used by the chat catalog
 * builder to keep upstream-discovered models (e.g. HuggingFace's live
 * `/v1/models`, which returns image/diffusion models with no modality field)
 * out of the chat listing when they are already known image-only models.
 */
export function isRegisteredImageModel(providerId, modelId) {
  return Boolean(findImageModelConfig(providerId, modelId));
}

export function getImageModelEntry(modelStr) {
  if (!modelStr) return null;

  const alias = IMAGE_MODEL_ALIASES[modelStr];
  if (alias) {
    const modelConfig = findImageModelConfig(alias.provider, alias.model);
    return {
      provider: alias.provider,
      model: alias.model,
      inputModalities: alias.inputModalities || modelConfig?.inputModalities || ["text"],
      imageRequired: resolveAliasImageRequired(alias, modelConfig),
      description: alias.description || modelConfig?.description || undefined,
    };
  }

  const { provider, model } = parseImageModel(modelStr);
  if (!provider || !model) return null;

  const modelConfig = findImageModelConfig(provider, model);
  if (!modelConfig) return null;

  return {
    provider,
    model,
    inputModalities: modelConfig.inputModalities || ["text"],
    imageRequired: modelConfig.imageRequired,
    description: modelConfig.description || undefined,
  };
}

/** Image input is mandatory only for edit-only models (`["image"]`, no `"text"`). Dual-modality models also accept pure t2i. */
export function modalitiesRequireImageInput(inputModalities) {
  const list = Array.isArray(inputModalities) ? inputModalities : ["text"];
  return list.includes("image") && !list.includes("text");
}
