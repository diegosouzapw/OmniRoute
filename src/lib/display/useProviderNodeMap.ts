/**
 * Shared resolver for custom provider display names.
 *
 * Provides:
 *   - `resolveProviderName(id, nodeMap)` — pure function for tests and SSR
 *   - `useProviderNodeMap()` — React hook that fetches /api/provider-nodes once
 *     and returns a Map<id, {name?, prefix?}>
 *
 * Usage in components:
 *   const nodeMap = useProviderNodeMap();
 *   const label = resolveProviderName(providerId, nodeMap);
 *
 * @module lib/display/useProviderNodeMap
 */

"use client";

import { useEffect, useState } from "react";
import { getProviderDisplayName, type ProviderNodeLike } from "./names";

export type ProviderNodeEntry = { name?: string | null; prefix?: string | null };

/**
 * Pure resolver — usable in tests without React.
 *
 * Delegates to the canonical `getProviderDisplayName` helper, supplying the
 * node entry from the map as the second argument so custom names take priority.
 */
export function resolveProviderName(
  id: string | null | undefined,
  nodeMap: Map<string, ProviderNodeEntry> | null | undefined
): string {
  const node = id ? (nodeMap?.get(id) ?? null) : null;
  return getProviderDisplayName(id, node as ProviderNodeLike | null);
}

/**
 * Fetches /api/provider-nodes once per mount and returns a stable Map.
 * Returns an empty Map while loading or on error — callers degrade gracefully
 * because `resolveProviderName` falls back to the de-UUIDed id.
 */
export function useProviderNodeMap(): Map<string, ProviderNodeEntry> {
  const [nodeMap, setNodeMap] = useState<Map<string, ProviderNodeEntry>>(new Map());

  useEffect(() => {
    let cancelled = false;
    fetch("/api/provider-nodes")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.nodes) return;
        const map = new Map<string, ProviderNodeEntry>();
        for (const node of data.nodes) {
          if (typeof node.id === "string") {
            map.set(node.id, { name: node.name ?? null, prefix: node.prefix ?? null });
          }
        }
        setNodeMap(map);
      })
      .catch(() => {
        // Silently degrade — custom providers will show de-UUIDed fallback label
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return nodeMap;
}
