/**
 * Pure provider-node selection helper (#4421).
 *
 * Kept dependency-free (no DB import) so it can be unit-tested without opening a
 * SQLite connection.
 */

export interface SelectableNode {
  id?: unknown;
  [key: string]: unknown;
}

const TRAILING_UUID = /-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Recover the derived TYPE of a provider node from its id. Node ids are
 * "<type>-<uuid>" (e.g. "openai-compatible-responses-1715ed0f-..."), so stripping a
 * trailing UUID yields the type ("openai-compatible-responses"). Ids without a UUID
 * suffix are returned unchanged.
 */
export function nodeTypeFromId(id: unknown): string {
  const s = String(id ?? "");
  return TRAILING_UUID.test(s) ? s.replace(TRAILING_UUID, "") : s;
}

/**
 * Resolve the provider node a new connection should bind to, given either:
 *  - the concrete node id ("<type>-<uuid>", what the dashboard sends), or
 *  - the bare derived type ("openai-compatible-responses", what callers using the
 *    /api/providers API directly often pass instead — #4421).
 *
 * When the exact id is not present, fall back to the SOLE node whose derived type
 * equals `idOrType` — but only when exactly one such node exists, so an ambiguous type
 * never silently picks the wrong node (returns null instead, preserving the 404). The
 * type is matched precisely (UUID-stripped), so "openai-compatible" never matches an
 * "openai-compatible-responses" node.
 */
export function selectProviderNodeForConnection<T extends SelectableNode>(
  idOrType: string,
  nodes: T[]
): T | null {
  if (!idOrType) return null;
  const exact = nodes.find((n) => n.id === idOrType);
  if (exact) return exact;
  const ofType = nodes.filter((n) => typeof n.id === "string" && nodeTypeFromId(n.id) === idOrType);
  return ofType.length === 1 ? ofType[0] : null;
}
