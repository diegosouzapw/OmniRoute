const DEFAULT_LEASE_MS = 10 * 60_000;

interface SessionLease {
  requests: number;
  expiresAt: number;
}

const occupancy = new Map<string, Map<string, SessionLease>>();

function prune(now = Date.now()): void {
  for (const [connectionId, sessions] of occupancy) {
    for (const [sessionKey, lease] of sessions) {
      if (lease.expiresAt <= now) sessions.delete(sessionKey);
    }
    if (sessions.size === 0) occupancy.delete(connectionId);
  }
}

export function getForeignOAuthSessionCount(
  connectionId: string | null | undefined,
  sessionKey: string | null | undefined,
  now = Date.now()
): number {
  if (!connectionId) return 0;
  prune(now);
  const sessions = occupancy.get(connectionId);
  if (!sessions) return 0;
  let count = 0;
  for (const key of sessions.keys()) {
    if (!sessionKey || key !== sessionKey) count++;
  }
  return count;
}

export function getOAuthSessionAvailability(
  connectionId: string | null | undefined,
  sessionKey: string | null | undefined,
  now = Date.now()
): number {
  return 1 / (1 + getForeignOAuthSessionCount(connectionId, sessionKey, now));
}

export function reserveOAuthSession(
  connectionId: string,
  sessionKey: string,
  leaseMs = DEFAULT_LEASE_MS,
  now = Date.now()
): () => void {
  if (!connectionId || !sessionKey) return () => {};
  prune(now);
  const sessions = occupancy.get(connectionId) ?? new Map<string, SessionLease>();
  const current = sessions.get(sessionKey);
  sessions.set(sessionKey, {
    requests: (current?.requests ?? 0) + 1,
    expiresAt: now + Math.max(1, leaseMs),
  });
  occupancy.set(connectionId, sessions);

  let released = false;
  return () => {
    if (released) return;
    released = true;
    const activeSessions = occupancy.get(connectionId);
    const active = activeSessions?.get(sessionKey);
    if (!activeSessions || !active) return;
    if (active.requests <= 1) activeSessions.delete(sessionKey);
    else activeSessions.set(sessionKey, { ...active, requests: active.requests - 1 });
    if (activeSessions.size === 0) occupancy.delete(connectionId);
  };
}

export function wrapResponseWithOAuthSessionRelease(
  response: Response,
  release: () => void
): Response {
  if (!response.body) {
    release();
    return response;
  }
  const reader = response.body.getReader();
  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          release();
          controller.close();
          return;
        }
        controller.enqueue(value);
      } catch (error) {
        release();
        controller.error(error);
      }
    },
    async cancel(reason) {
      release();
      try {
        await reader.cancel(reason);
      } catch {
        // The upstream stream is already closing; the lease has still been released.
      }
    },
  });
  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

export function _clearOAuthSessionOccupancyForTest(): void {
  occupancy.clear();
}
