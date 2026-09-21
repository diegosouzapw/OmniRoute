import {
  getDeprecationNotice,
  isDeprecatedProvider,
} from "@omniroute/open-sse/services/tokenRefresh.ts";

export function isOrphanDeprecatedConnection(conn: { provider?: string | null }): boolean {
  return isDeprecatedProvider(String(conn.provider || ""));
}

export type DeprecatedProviderLeftoverGroup = {
  provider: string;
  migrateTo: string;
  reason: string;
  connectionIds: string[];
  names: string[];
};

export function listDeprecatedProviderLeftovers(
  connections: Array<{
    id: string;
    provider?: string | null;
    name?: string | null;
  }>
): DeprecatedProviderLeftoverGroup[] {
  const groups = new Map<string, DeprecatedProviderLeftoverGroup>();

  for (const conn of connections) {
    if (!isOrphanDeprecatedConnection(conn)) continue;
    const provider = String(conn.provider || "");
    const notice = getDeprecationNotice(provider);
    if (!notice) continue;

    let group = groups.get(provider);
    if (!group) {
      group = {
        provider,
        migrateTo: notice.migrateTo,
        reason: notice.reason,
        connectionIds: [],
        names: [],
      };
      groups.set(provider, group);
    }
    group.connectionIds.push(conn.id);
    group.names.push(typeof conn.name === "string" ? conn.name : "");
  }

  return [...groups.values()].filter((group) => group.connectionIds.length > 0);
}
