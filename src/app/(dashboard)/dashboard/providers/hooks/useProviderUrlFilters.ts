"use client";

import { useEffect, useState } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { readProviderFiltersFromUrl, syncProviderFiltersToUrl } from "../providerPageUtils";
import {
  readProviderDisplayModePreference,
  type ProviderDisplayMode,
} from "../providerPageStorage";

interface UseProviderUrlFiltersArgs {
  searchParams: ReadonlyURLSearchParams;
  providerDisplayMode: ProviderDisplayMode;
  setProviderDisplayMode: (mode: ProviderDisplayMode) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  modelSearchQuery: string;
  setModelSearchQuery: (value: string) => void;
  activeCategory: string | null;
  setActiveCategory: (value: string | null) => void;
  showFreeOnly: boolean;
  setShowFreeOnly: (value: boolean) => void;
  activeServiceKind: string | null;
  setActiveServiceKind: (value: string | null) => void;
}

/**
 * useProviderUrlFilters — two-way sync between the providers dashboard filter
 * state and the URL query string, so a filtered/searched view is bookmarkable
 * and shareable.
 *
 * Hydration guard: the filter→URL sync effect must not write the URL before
 * the initial URL→state read has applied, or a bookmarked view would be
 * transiently clobbered by the default state on the first paint.
 *
 * Returns `displayModePreferenceReady`, which the caller also gates other
 * display-mode-dependent effects on.
 */
export function useProviderUrlFilters({
  searchParams,
  providerDisplayMode,
  setProviderDisplayMode,
  searchQuery,
  setSearchQuery,
  modelSearchQuery,
  setModelSearchQuery,
  activeCategory,
  setActiveCategory,
  showFreeOnly,
  setShowFreeOnly,
  activeServiceKind,
  setActiveServiceKind,
}: UseProviderUrlFiltersArgs): { displayModePreferenceReady: boolean } {
  // Snapshot of the stored display-mode preference, read once via a lazy
  // initializer (localStorage must not be read during render). After the first
  // hydration the URL always carries the mode, so the fallback is mount-only.
  const [storedDisplayModePreference] = useState<ProviderDisplayMode>(() =>
    readProviderDisplayModePreference()
  );
  const [hydratedFromParams, setHydratedFromParams] = useState<ReadonlyURLSearchParams | null>(
    null
  );

  // URL → state hydration as a render-phase adjustment guarded by the
  // previously hydrated params object (react.dev "adjusting state when a prop
  // changes") — replaces the two synchronous setState effects keyed on
  // searchParams, and removes the transient default-state first paint.
  if (hydratedFromParams !== searchParams) {
    setHydratedFromParams(searchParams);
    const urlFilters = readProviderFiltersFromUrl(searchParams);
    setProviderDisplayMode(urlFilters.displayMode ?? storedDisplayModePreference);
    setSearchQuery(urlFilters.searchQuery ?? "");
    setModelSearchQuery(urlFilters.modelSearchQuery ?? "");
    setActiveCategory(urlFilters.category ?? null);
    setShowFreeOnly(urlFilters.showFreeOnly ?? false);
    setActiveServiceKind(urlFilters.mediaKind ?? null);
  }
  const displayModePreferenceReady = hydratedFromParams !== null;
  const filtersHydrated = displayModePreferenceReady;

  useEffect(() => {
    if (!filtersHydrated || !displayModePreferenceReady) return;
    syncProviderFiltersToUrl({
      searchQuery,
      modelSearchQuery,
      displayMode: providerDisplayMode,
      category: activeCategory,
      showFreeOnly,
      mediaKind: activeServiceKind,
    });
  }, [
    filtersHydrated,
    displayModePreferenceReady,
    searchQuery,
    modelSearchQuery,
    providerDisplayMode,
    activeCategory,
    showFreeOnly,
    activeServiceKind,
  ]);

  return { displayModePreferenceReady };
}
