import {
  fetchAssignmentForScope,
  fetchRegistryProxy,
  fetchProxyUsage,
} from "./proxyConfigPersistence";
import { isSameScopeAssignment } from "./proxyAssignment";

/** Reuse a managed identity only when replacing its one existing assignment. */
export async function saveManagedSource(
  core: string,
  sourceLink: string,
  name: string,
  scope: string,
  scopeId: string | null
): Promise<Response> {
  const assignment = await fetchAssignmentForScope(scope, scopeId);
  let id: string | undefined;
  if (assignment?.proxyId) {
    const proxy = await fetchRegistryProxy(assignment.proxyId, []);
    try {
      const notes = JSON.parse(proxy?.notes || "{}");
      if (notes.managedCore === core && typeof notes.managedProxyId === "string") {
        const usage = await fetchProxyUsage(assignment.proxyId);
        if (usage.length === 1 && isSameScopeAssignment(usage[0], scope, scopeId))
          id = notes.managedProxyId;
      }
    } catch {
      /* Non-managed proxy notes are free text. */
    }
  }
  return fetch("/api/services/managed-proxy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, core, sourceLink, id, assignment: { scope, scopeId } }),
  });
}
