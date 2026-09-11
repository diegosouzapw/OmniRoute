/**
 * Pick the first currently eligible connection from an API-key preference list.
 *
 * Security/health filtering happens before this helper: preferred IDs never grant
 * access and cannot resurrect a rate-limited, quota-blocked, terminal, excluded,
 * model-ineligible, or otherwise unavailable connection.
 */
export function pickPreferredConnection<T extends { id: string }>(
  eligibleConnections: readonly T[],
  preferredConnectionIds: readonly string[] | null | undefined
): T | undefined {
  if (!preferredConnectionIds?.length || eligibleConnections.length === 0) return undefined;

  const eligibleById = new Map(eligibleConnections.map((connection) => [connection.id, connection]));
  for (const id of preferredConnectionIds) {
    const connection = eligibleById.get(id);
    if (connection) return connection;
  }
  return undefined;
}
