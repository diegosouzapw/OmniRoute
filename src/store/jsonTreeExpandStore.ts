"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// The level a JSON tree node is rendered at (react18-json-view's own
// `collapsed` numeric-depth prop) is 0-indexed, so this store's level uses
// the same convention: level 0 means nothing is expanded ("collapse all"),
// and a node at depth N is expanded when N < level.
const MIN_LEVEL = 0;
const MAX_LEVEL = 64; // deep enough for any real request/response payload
export const DEFAULT_JSON_TREE_EXPAND_LEVEL = 2;

// Level is tracked per section (keyed by a stable, locale-independent
// sectionId -- e.g. "openaiRequest", "providerEventStream" -- not the
// translated title), because different payload/stream boxes carry
// "interesting" data at different nesting depths. The same sectionId across
// different log entries shares one level, so it still carries over between
// requests, just scoped per box instead of one setting for the whole page.
interface JsonTreeExpandState {
  levels: Record<string, number>;
  collapseAll: (sectionId: string) => void;
  collapseOneLevel: (sectionId: string) => void;
  expandOneLevel: (sectionId: string) => void;
  expandAll: (sectionId: string) => void;
}

function clamp(level: number): number {
  return Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, level));
}

const useJsonTreeExpandStore = create<JsonTreeExpandState>()(
  persist(
    (set) => ({
      levels: {},
      collapseAll: (sectionId) => set((s) => ({ levels: { ...s.levels, [sectionId]: MIN_LEVEL } })),
      collapseOneLevel: (sectionId) =>
        set((s) => ({
          levels: {
            ...s.levels,
            [sectionId]: clamp((s.levels[sectionId] ?? DEFAULT_JSON_TREE_EXPAND_LEVEL) - 1),
          },
        })),
      expandOneLevel: (sectionId) =>
        set((s) => ({
          levels: {
            ...s.levels,
            [sectionId]: clamp((s.levels[sectionId] ?? DEFAULT_JSON_TREE_EXPAND_LEVEL) + 1),
          },
        })),
      expandAll: (sectionId) => set((s) => ({ levels: { ...s.levels, [sectionId]: MAX_LEVEL } })),
    }),
    {
      name: "omniroute-json-tree-expand-levels",
    }
  )
);

export function useJsonTreeExpandLevel(sectionId: string): number {
  return useJsonTreeExpandStore((s) => s.levels[sectionId] ?? DEFAULT_JSON_TREE_EXPAND_LEVEL);
}

export default useJsonTreeExpandStore;
