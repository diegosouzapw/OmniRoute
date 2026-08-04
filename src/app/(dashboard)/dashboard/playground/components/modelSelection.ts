// Playground model-selection helpers (#3731 / #3009).
//
// Two defects made the Playground model selector unusable for custom
// OpenAI-compatible providers:
//   A. The model list was filtered by the selected provider's catalog prefix, falling
//      back to the raw connection id when no prefix resolved. A custom connection id
//      (e.g. "openai-compatible-<uuid>") matches nothing in the catalog, so the selector
//      went empty ("NONE shown").
//   B. Selecting a provider reset the model to "" and nothing ever picked a default, so
//      even when the dropdown had options the active model stayed empty and the chat
//      failed with "Set a model in the config pane".
//
// These pure helpers encode the fix and are unit-tested directly.

import { matchesSearch } from "@/shared/utils/turkishText";

/**
 * Resolve the catalog-namespace key used to filter the model list for a provider.
 * - Built-in providers ("openai", "anthropic", …) filter by their id.
 * - Compatible providers emit catalog models under a node prefix; when that prefix is
 *   known we filter by it.
 * - A compatible provider WITHOUT a resolved prefix must NOT be filtered by its raw
 *   connection id (that matches nothing and empties the selector) — return `undefined`
 *   so the full catalog is shown and a model can still be picked.
 */
export function resolveModelFilterKey(
  provider: string,
  modelPrefix: string | undefined,
  isCompatibleConnectionId: boolean
): string | undefined {
  if (modelPrefix) return modelPrefix;
  if (isCompatibleConnectionId) return undefined;
  return provider || undefined;
}

/**
 * Pick the model that should be auto-selected once the available-model list resolves.
 * Returns the model id to set, or `null` when the current selection is already valid
 * (or there is nothing to select) so callers can skip a redundant state update.
 */
export function pickDefaultModel(
  currentModel: string | undefined,
  availableModels: string[]
): string | null {
  if (availableModels.length === 0) return null;
  if (currentModel && availableModels.includes(currentModel)) return null;
  return availableModels[0];
}

/**
 * Filter the model dropdown list by a free-text search query (#4086 — the raw Playground
 * model `<select>` had no way to narrow a long list, e.g. 50+ OpenRouter models).
 * Accent/case-insensitive, Turkish-safe substring match against the model id (see
 * `matchesSearch` — raw `toLowerCase().includes()` mangles İ/ı). An empty/whitespace query
 * returns the full list unchanged.
 */
export function filterModelsByQuery(models: string[], query: string): string[] {
  if (!query.trim()) return models;
  return models.filter((m) => matchesSearch(m, query));
}
