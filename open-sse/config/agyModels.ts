import {
  GOOGLE_CLOUD_CODE_PUBLIC_MODELS,
  isDiscoverableGoogleCloudCodeModelId,
} from "./googleCloudCodeModelCatalog";

// Antigravity CLI (`agy`) model catalog.
//
// These models are pinned from the live `:fetchAvailableModels` endpoint
// (https://daily-cloudcode-pa.googleapis.com/v1internal:fetchAvailableModels) using a
// real `agy` consumer-OAuth token.
//
// The `agy` provider reuses the `antigravity` executor/translator (identical backend),
// and therefore shares the same current public catalog and discovery visibility policy.
// The provider-facing names below are direct aliases, not independently extensible copies.

export const AGY_PUBLIC_MODELS = GOOGLE_CLOUD_CODE_PUBLIC_MODELS;

const AGY_CLIENT_VISIBLE_MODEL_NAMES = Object.freeze(
  AGY_PUBLIC_MODELS.reduce<Record<string, string>>((acc, model) => {
    acc[model.id] = model.name;
    return acc;
  }, {})
);

export function getClientVisibleAgyModelName(modelId: string, fallbackName?: string): string {
  return AGY_CLIENT_VISIBLE_MODEL_NAMES[modelId] || fallbackName || modelId;
}

export const isUserCallableAgyModelId = isDiscoverableGoogleCloudCodeModelId;
export const isDiscoverableAgyModelId = isDiscoverableGoogleCloudCodeModelId;
