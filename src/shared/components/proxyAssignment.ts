/**
 * Proxy-assignment scope helpers, extracted from ProxyConfigModal so the pure
 * selection logic can be unit-tested without rendering the React component.
 */

export type ProxyAssignmentItem = {
  proxyId?: string | null;
  scope?: string | null;
  scopeId?: string | null;
};

export function normalizeScopeId(scopeId?: string | null) {
  return !scopeId || scopeId === "__global__" ? null : scopeId;
}

export function isSameScopeAssignment(
  assignment: ProxyAssignmentItem,
  scope: string,
  scopeId: string | null
) {
  return (
    assignment.scope === scope && normalizeScopeId(assignment.scopeId) === normalizeScopeId(scopeId)
  );
}

/**
 * Pick the proxy assignment that belongs to *this* scope, or `null` when none does.
 *
 * Must NOT fall back to `items[0]`: the assignments list is global, so the first
 * entry belongs to some other scope (e.g. another account's proxy). Returning it
 * for a scope with no assignment of its own made a freshly created provider/key
 * appear pre-filled with an unrelated proxy the user never configured. (escalated bug)
 */
export function selectScopeAssignment(
  items: ProxyAssignmentItem[],
  scope: string,
  scopeId: string | null
): ProxyAssignmentItem | null {
  return items.find((item) => isSameScopeAssignment(item, scope, scopeId)) ?? null;
}
