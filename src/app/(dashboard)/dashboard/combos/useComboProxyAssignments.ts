import { useCallback, useEffect, useState } from "react";

// #7149: the Combo "Set Proxy" modal writes through the modern proxy_assignments
// registry (scope="combo"), not the legacy /api/settings/proxy `combos` map — the
// dashboard's "has a proxy" indicator must read from the same registry the modal
// actually writes to, or it stays stale/gray even after a successful save.
export function parseComboProxyAssignmentIds(data: unknown): string[] {
  const items = (data as { items?: unknown })?.items;
  if (!Array.isArray(items)) return [];
  return items
    .filter(
      (entry): entry is { scopeId: string; proxyId: string } =>
        !!(entry as { scopeId?: unknown })?.scopeId && !!(entry as { proxyId?: unknown })?.proxyId
    )
    .map((entry) => entry.scopeId);
}

export function useComboProxyAssignments() {
  const [comboProxyAssignedIds, setComboProxyAssignedIds] = useState<Set<string>>(new Set());

  const fetchComboProxyAssignments = useCallback(() => {
    fetch("/api/settings/proxies/assignments?scope=combo")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setComboProxyAssignedIds(new Set(parseComboProxyAssignmentIds(data))))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchComboProxyAssignments();
  }, [fetchComboProxyAssignments]);

  return { comboProxyAssignedIds, fetchComboProxyAssignments };
}
