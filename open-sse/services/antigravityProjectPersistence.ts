/**
 * Re-export from `antigravityProjectPersist.ts` plus a connection-preference helper.
 */
import { persistDiscoveredAntigravityProjectId } from "./antigravityProjectPersist.ts";
export { persistDiscoveredAntigravityProjectId };

export function preferAntigravityConnectionsWithStoredProject(
  connections: Array<Record<string, unknown>>
): Array<Record<string, unknown>> {
  return connections.filter(
    (conn) => conn != null && typeof conn.projectId === "string" && conn.projectId.trim().length > 0
  );
}
