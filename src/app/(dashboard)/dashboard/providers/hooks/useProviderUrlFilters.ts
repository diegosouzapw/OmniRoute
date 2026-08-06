"use client";

import { useEffect, useState } from "react";
import type { ReadonlyURLSearchParams } from "next/navigation";
import {
  readProviderFiltersFromUrl,
  syncProviderFiltersToUrl,
} from "../providerPageUtils";
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
  const [displayModePreferenceReady, setDisplayModePreferenceReady] = useState(false);
  const [filtersHydrated, setFiltersHydrated] = useState(false);

  useEffect(() => {
    const urlMode = readProviderFiltersFromUrl(searchParams).displayMode;
    setProviderDisplayMode(urlMode ?? readProviderDisplayModePreference());
    setDisplayModePreferenceReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    const urlFilters = readProviderFiltersFromUrl(searchParams);
    setSearchQuery(urlFilters.searchQuery ?? "");
    setModelSearchQuery(urlFilters.modelSearchQuery ?? "");
    setActiveCategory(urlFilters.category ?? null);
    setShowFreeOnly(urlFilters.showFreeOnly ?? false);
    setActiveServiceKind(urlFilters.mediaKind ?? null);
    setFiltersHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
