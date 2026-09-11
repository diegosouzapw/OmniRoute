// Antigravity CLI (`agy`) model catalog.
//
// The `agy` provider reuses the `antigravity` executor/translator (identical
// backend). Its public catalog is a direct re-export of ANTIGRAVITY_PUBLIC_MODELS:
// both surfaces expose the same callable Claude/Gemini/GPT set and the lists
// were hand-maintained as two copies until they were byte-equal for months —
// a new model shipped on one side silently missed the other (#12724). Keeping
// one canonical array in antigravityModelAliases.ts makes drift impossible.
// Tab-completion models (`tab_flash_lite_preview`, `tab_jump_flash_lite_preview`)
// are intentionally excluded from the shared catalog — they are not chat-callable.
//
// The agy-specific helpers below (non-chat / retired id sets, client-visible
// names) stay here because they encode CLI-surface policy, not catalog content.

import { ANTIGRAVITY_PUBLIC_MODELS } from "./antigravityModelAliases.ts";

export const AGY_PUBLIC_MODELS = ANTIGRAVITY_PUBLIC_MODELS;

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
