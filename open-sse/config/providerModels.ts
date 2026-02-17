import { generateModels, generateAliasMap } from "./providerRegistry.ts";

// Provider models - Generated from providerRegistry.js (single source of truth)
export const PROVIDER_MODELS = generateModels();

// Provider ID to alias mapping - Generated from providerRegistry.js
export const PROVIDER_ID_TO_ALIAS = generateAliasMap();

// Helper functions
export function getProviderModels(aliasOrId) {
  return PROVIDER_MODELS[aliasOrId] || [];
}

export function getDefaultModel(aliasOrId) {
  const models = PROVIDER_MODELS[aliasOrId];
  return models?.[0]?.id || null;
}

export function isValidModel(aliasOrId, modelId, passthroughProviders = new Set()) {
  if (passthroughProviders.has(aliasOrId)) return true;
  const models = PROVIDER_MODELS[aliasOrId];
  if (!models) return false;
  return models.some((m) => m.id === modelId);
}

export function findModelName(aliasOrId, modelId) {
  const models = PROVIDER_MODELS[aliasOrId];
  if (!models) return modelId;
  const found = models.find((m) => m.id === modelId);
  return found?.name || modelId;
}

export function getModelTargetFormat(aliasOrId, modelId) {
  const models = PROVIDER_MODELS[aliasOrId];
  if (!models) return null;
  const found = models.find((m) => m.id === modelId);
  return found?.targetFormat || null;
}

export function getModelsByProviderId(providerId) {
  const alias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
  return PROVIDER_MODELS[alias] || [];
}
