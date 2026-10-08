/**
 * db/providers/nodePrefix.ts — sync lookup of a provider node's own routing prefix (#15563).
 */

import { getDbInstance } from "../core";

/**
 * Returns the routing prefix (e.g. `aegy`) of a custom provider node, or null
 * when the id is not a node or has no prefix. Never throws (capability
 * resolution must stay best-effort).
 */
export function getProviderNodePrefixSync(providerId: string): string | null {
  if (!providerId) return null;
  try {
    const db = getDbInstance() as unknown as {
      prepare: (sql: string) => { get: (id: string) => { prefix?: unknown } | undefined };
    };
    const row = db.prepare("SELECT prefix FROM provider_nodes WHERE id = ?").get(providerId);
    const prefix = typeof row?.prefix === "string" ? row.prefix.trim() : "";
    return prefix || null;
  } catch {
    return null;
  }
}
