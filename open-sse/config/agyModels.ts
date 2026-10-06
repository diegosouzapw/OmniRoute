// Antigravity CLI (`agy`) model catalog.
//
// Models are derived from the shared Antigravity catalog (antigravitySharedModels.ts)
// which is the single source of truth for both agy and antigravity surfaces.
// The `agy` provider reuses the `antigravity` executor/translator (identical backend).
//
// To add a model to both surfaces: edit antigravitySharedModels.ts.
// To add a model to CLI only: add an entry to `add` below.
// To hide a model from CLI only: add its id to `remove` below.

import {
  ANTIGRAVITY_SHARED_MODELS,
  buildSurfaceCatalog,
} from "./antigravitySharedModels.ts";

export const AGY_PUBLIC_MODELS = buildSurfaceCatalog(ANTIGRAVITY_SHARED_MODELS, {
  add: [], // CLI-only models (currently none)
  remove: [], // Models hidden from CLI (currently none)
});

const AGY_PUBLIC_MODEL_IDS = new Set(AGY_PUBLIC_MODELS.map((model) => model.id));
const AGY_NON_CHAT_MODEL_IDS = new Set(["tab_flash_lite_preview", "tab_jump_flash_lite_preview"]);
const AGY_RETIRED_MODEL_IDS = new Set([
  "gemini-3.6-flash-high",
  "gemini-3.6-flash-medium",
  "gemini-3.6-flash-low",
  "gemini-3-flash-agent",
  "gemini-3.5-flash",
  "gemini-3.5-flash-extra-low",
  "gemini-3.5-flash-low",
  "gemini-3.5-flash-high",
  "gemini-3.5-flash-medium",
  "gemini-3.5-flash-preview",
  "gemini-2.5-pro",
  "gemini-2.5-flash-thinking",
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
]);

const AGY_CLIENT_VISIBLE_MODEL_NAMES = Object.freeze(
  AGY_PUBLIC_MODELS.reduce<Record<string, string>>((acc, model) => {
    acc[model.id] = model.name;
    return acc;
  }, {})
);

export function getClientVisibleAgyModelName(modelId: string, fallbackName?: string): string {
  return AGY_CLIENT_VISIBLE_MODEL_NAMES[modelId] || fallbackName || modelId;
}

export function isUserCallableAgyModelId(modelId: string): boolean {
  return !!modelId && AGY_PUBLIC_MODEL_IDS.has(modelId);
}

export function isDiscoverableAgyModelId(modelId: string): boolean {
  return !!modelId && !AGY_NON_CHAT_MODEL_IDS.has(modelId) && !AGY_RETIRED_MODEL_IDS.has(modelId);
}
