/**
 * Re-export from `antigravityProjectPersist.ts` plus a connection-preference helper.
 *
 * The persistence layer for a runtime-discovered Antigravity projectId lives in
 * the sibling file `antigravityProjectPersist.ts` (named by its core function).
 * This module adds `preferAntigravityConnectionsWithStoredProject()`, used by the
 * quota-strategy engine to give priority to connections whose projectId has
 * already been discovered and persisted.
 */

import { persistDiscoveredAntigravityProjectId } from "./antigravityProjectPersist.ts";

export { persistDiscoveredAntigravityProjectId };

/**
 * Return only the Antigravity connections that already have a stored projectId.
 *
 * A connection whose projectId has been discovered and persisted can be used
 * immediately; a connection without one would need to go through the Code Assist
 * bootstrap first, which is handled by the calling strategy's fallback path.
 */
export function preferAntigravityConnectionsWithStoredProject(
  connections: Array<Record<string, unknown>>
): Array<Record<string, unknown>> {
  return connections.filter(
    (conn) => conn != null && typeof conn.projectId === "string" && conn.projectId.trim().length > 0
  );
}
