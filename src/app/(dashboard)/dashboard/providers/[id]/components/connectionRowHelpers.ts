/**
 * Decide whether a connection row should render its `lastError` text.
 *
 * A disabled connection (`isActive === false`) is still counted by the provider
 * card's error badge (`getEffectiveStatus` → error/expired/unavailable, which does
 * not look at `isActive`). Hiding its error text left the operator unable to see
 * *what* failed on a row the dashboard flags as errored. So the error text is shown
 * whenever there is a `lastError`, regardless of the active toggle. (#1447)
 */
export function shouldShowConnectionLastError(connection: {
  lastError?: string;
  isActive?: boolean;
}): boolean {
  return Boolean(connection.lastError);
}

/**
 * Availability-sort input shape — the two resilience-runtime fields that
 * decide whether a connection is currently usable. Deliberately narrow: this
 * mirrors the two fields `ConnectionRow`'s own `effectiveStatus` computation
 * reads (`rateLimitedUntil` = connection cooldown, `testStatus` = last test
 * result), so the "Reorder" button and the row badges never disagree about
 * what "available" means.
 */
export interface AvailabilitySortableConnection {
  testStatus?: string;
  rateLimitedUntil?: string;
}

/**
 * Effective status for a connection, factoring in connection cooldown.
 *
 * A connection can be recorded as `testStatus: "unavailable"` (see the
 * "Connection Cooldown" resilience layer in CLAUDE.md) yet the cooldown
 * itself is lazy — once `rateLimitedUntil` is in the past, the connection is
 * eligible again even though nothing has re-tested it yet. Treat that case
 * as "active" so the reorder button (and the row's own badge, which this
 * mirrors) reflect the lazy-recovery model instead of stale state.
 */
export function getConnectionEffectiveStatus(
  connection: AvailabilitySortableConnection
): string | undefined {
  const isCooldown = Boolean(
    connection.rateLimitedUntil && new Date(connection.rateLimitedUntil).getTime() > Date.now()
  );
  return connection.testStatus === "unavailable" && !isCooldown ? "active" : connection.testStatus;
}

/** A connection is "available" for reorder purposes when its effective status is active/success. */
export function isConnectionAvailable(connection: AvailabilitySortableConnection): boolean {
  const status = getConnectionEffectiveStatus(connection);
  return status === "active" || status === "success";
}

/**
 * Sort connections with available ones first, unavailable ones last.
 *
 * Stable sort: connections within the same availability group keep their
 * relative (existing priority) order, so reordering only moves groups
 * relative to each other, never scrambles ties. `Array.prototype.sort` has
 * been a stable sort in V8/Node since ES2019, so no manual tie-break index
 * is needed here (unlike `handleSwapPriority`'s two-item swap, which reads
 * ordering intent directly instead).
 */
export function sortConnectionsByAvailability<T extends AvailabilitySortableConnection>(
  connections: T[]
): T[] {
  return [...connections].sort((a, b) => {
    const availableA = isConnectionAvailable(a);
    const availableB = isConnectionAvailable(b);
    if (availableA && !availableB) return -1;
    if (!availableA && availableB) return 1;
    return 0;
  });
}
