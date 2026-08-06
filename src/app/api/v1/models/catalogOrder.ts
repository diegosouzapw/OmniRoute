/**
 * catalogOrder.ts — canonical provider-grouped ordering for GET /v1/models.
 *
 * The catalog is assembled by many independent push loops (auto-combos, named
 * combos, static registry, codex-native, synced, OpenRouter, specialty registries,
 * custom, alias-backed, connection-fallback). The same provider appears in several
 * loops with other providers interleaved, so its models land in multiple separated
 * blocks. This module applies ONE stable, provider-grouped sort at serialization.
 *
 * Group key = owned_by (the public owner identity), NOT the model-id prefix.
 * Built-in providers use their canonical id as owned_by; compatible nodes use the
 * configured node prefix. A single routable public prefix can differ from its owner:
 * no-auth OpenCode publishes `oc/<model>` while retaining owned_by "opencode".
 * Grouping by the prefix would split one provider's models; grouping by owned_by
 * keeps them contiguous.
 *
 * Order: combo block (owned_by === "combo") pinned first, preserving #4164; then
 * providers in registry precedence (OAUTH -> NOAUTH -> APIKEY canonical keys); then
 * unknown providers by locale-independent code-unit order. Within a group the input
 * order is preserved (stable), keeping combo sort_order, connection priority, custom
 * append-order, and equal-id audio twins.
 *
 * Reorders rows only. Identity, alias mapping, Combo/bare compatibility (#6940/#8530),
 * effort-variant scoping, and Claude-mirror gating are untouched. Pure; no DB/IO.
 */

import { OAUTH_PROVIDERS, NOAUTH_PROVIDERS, APIKEY_PROVIDERS } from "@/shared/constants/providers";

/** Canonical provider precedence, keyed by provider id (not alias). Built once. */
const CANONICAL_PROVIDER_ORDER: readonly string[] = [
  ...Object.keys(OAUTH_PROVIDERS),
  ...Object.keys(NOAUTH_PROVIDERS),
  ...Object.keys(APIKEY_PROVIDERS),
];

/**
 * Locale-independent code-unit comparator. UTF-16 code units put uppercase A-Z
 * (0x41-0x5A) before lowercase a-z (0x61-0x7A); byte-deterministic, no ICU.
 */
function codeUnitCompare(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/** Combo bucket key, distinct from any real provider id. */
const COMBO_GROUP = " combo";

/**
 * Grouping key for a catalog row: "combo" for combo-owned rows, else owned_by
 * (canonical identity). Rows with no usable owned_by fall back to the id-prefix;
 * that path is defensive only — every published row carries owned_by.
 */
function modelGroupKey(model: Record<string, unknown>): string {
  const ownedBy = typeof model.owned_by === "string" ? model.owned_by : "";
  if (ownedBy === "combo") return COMBO_GROUP;
  if (ownedBy) return ownedBy;

  const id = typeof model.id === "string" ? model.id : "";
  const slash = id.indexOf("/");
  return slash > 0 ? id.slice(0, slash) : id;
}

/**
 * Sort priority for a group key: combo first, then registry precedence, then
 * unknown groups (rank Infinity, ordered among themselves by code unit).
 */
function groupSortPriority(groupKey: string): number {
  if (groupKey === COMBO_GROUP) return -1;
  const idx = CANONICAL_PROVIDER_ORDER.indexOf(groupKey);
  return idx >= 0 ? idx : Infinity;
}

/**
 * Stable provider-grouped sort. Does not mutate the input. Deterministic for a
 * given input array.
 */
export function sortCatalogModelsProviderGrouped<T extends Record<string, unknown>>(
  models: T[]
): T[] {
  if (!Array.isArray(models) || models.length < 2) return models;

  const annotated = models.map((model, index) => {
    const groupKey = modelGroupKey(model);
    return { model, groupKey, priority: groupSortPriority(groupKey), index };
  });

  annotated.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    // Unknown groups (both Infinity): code-unit order by key.
    if (a.priority === Infinity && b.priority === Infinity) {
      const cmp = codeUnitCompare(a.groupKey, b.groupKey);
      if (cmp !== 0) return cmp;
    }
    // Stable: preserve input order within a group.
    return a.index - b.index;
  });

  return annotated.map((entry) => entry.model);
}
