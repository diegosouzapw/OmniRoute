export type RecentSessionForDashboard = {
  sessionId: string;
  ageMs: number;
  requestCount: number;
  connectionId: string | null;
};

export type PendingRequestsByAccount = Record<string, Record<string, number>>;

export type ExclusiveDashboardSession = {
  sessionId: string;
  ageMs: null;
  requestCount: number;
  connectionId: string;
  connectionName: string | null;
  leaseBacked: true;
  active: boolean;
};

export type DashboardSession = RecentSessionForDashboard | ExclusiveDashboardSession;

function positiveCount(value: unknown): number {
  const count = Number(value);
  return Number.isFinite(count) && count > 0 ? count : 0;
}

function countInFlightRequests(
  pendingByAccount: PendingRequestsByAccount,
  connectionId: string
): number {
  return Object.values(pendingByAccount[connectionId] ?? {}).reduce(
    (total, count) => total + positiveCount(count),
    0
  );
}

/**
 * Build the dashboard-only view of durable exclusive leases.
 *
 * The lease table remains the lifecycle authority. The request tracker is used
 * only to flag work currently in flight for an already-held lease; it never
 * creates, extends, or removes lease ownership.
 *
 * Deliberately does not expose the persisted owner hash, API-key id, or lease
 * generation. The dashboard needs occupancy, connection binding, and activity
 * state — not fencing material.
 */
export function buildExclusiveDashboardSessions(
  leasedConnectionIds: ReadonlySet<string>,
  pendingByAccount: PendingRequestsByAccount,
  recentSessions: readonly RecentSessionForDashboard[],
  connectionNames: ReadonlyMap<string, string> = new Map()
): ExclusiveDashboardSession[] {
  const recentRequestsByConnection = new Map<string, number>();
  for (const session of recentSessions) {
    if (!session.connectionId) continue;
    recentRequestsByConnection.set(
      session.connectionId,
      (recentRequestsByConnection.get(session.connectionId) ?? 0) +
        positiveCount(session.requestCount)
    );
  }

  return Array.from(leasedConnectionIds)
    .map((connectionId) => ({
      sessionId: `lease:${connectionId}`,
      ageMs: null,
      requestCount: recentRequestsByConnection.get(connectionId) ?? 0,
      connectionId,
      connectionName: connectionNames.get(connectionId) ?? null,
      leaseBacked: true as const,
      active: countInFlightRequests(pendingByAccount, connectionId) > 0,
    }))
    .sort((left, right) => {
      if (left.active !== right.active) return left.active ? -1 : 1;
      return left.connectionId.localeCompare(right.connectionId);
    });
}

/**
 * Lease-backed rows replace request-derived rows for the same connection.
 * Sessions without a connection binding remain untouched.
 */
export function mergeDashboardSessions(
  leaseSessions: readonly ExclusiveDashboardSession[],
  recentSessions: readonly RecentSessionForDashboard[]
): DashboardSession[] {
  const leasedConnectionIds = new Set(leaseSessions.map((session) => session.connectionId));
  const unleasedRecentSessions = recentSessions.filter(
    (session) => !session.connectionId || !leasedConnectionIds.has(session.connectionId)
  );
  return [...leaseSessions, ...unleasedRecentSessions];
}
