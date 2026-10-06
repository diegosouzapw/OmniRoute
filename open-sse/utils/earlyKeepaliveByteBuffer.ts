/**
 * @file earlyKeepaliveByteBuffer.ts
 * @description Bridges bytes withEarlyStreamKeepalive writes directly to the
 * client (outside the request handler's own reqLogger) back into that same
 * request's persisted call-log artifact.
 *
 * withEarlyStreamKeepalive wraps a route's handler Promise from OUTSIDE the
 * handler's own call tree — it has no reference to the reqLogger the handler
 * creates deep inside chatCore.ts, and by the time that reqLogger exists the
 * keepalive/startup frames may already be written. A shared correlationId
 * (threaded by the route as handleChat's 4th positional arg, and separately
 * into withEarlyStreamKeepalive's options) is the only thing both sides
 * share, so recordEarlyKeepaliveBytes/takeEarlyKeepaliveBytes key on that
 * instead of trying to pass a live object reference across the boundary.
 *
 * Entries are consumed once (chatCore/attemptLogging.ts calls
 * takeEarlyKeepaliveBytes exactly when it assembles the final call-log
 * payload) and swept on a TTL so a request that never reaches that point
 * (aborted, detailed logging disabled, a route that never wires this up)
 * cannot leak buffered bytes forever.
 */

const MAX_ITEMS_PER_CORRELATION = 200;
const ENTRY_TTL_MS = 10 * 60 * 1000;

type BufferEntry = { chunks: string[]; createdAt: number };

const buffers = new Map<string, BufferEntry>();

function sweepExpired(): void {
  const cutoff = Date.now() - ENTRY_TTL_MS;
  for (const [correlationId, entry] of buffers) {
    if (entry.createdAt < cutoff) {
      buffers.delete(correlationId);
    }
  }
}

export function recordEarlyKeepaliveBytes(correlationId: string, chunk: string): void {
  if (!correlationId || !chunk) return;
  sweepExpired();
  let entry = buffers.get(correlationId);
  if (!entry) {
    entry = { chunks: [], createdAt: Date.now() };
    buffers.set(correlationId, entry);
  }
  if (entry.chunks.length < MAX_ITEMS_PER_CORRELATION) {
    entry.chunks.push(chunk);
  }
}

export function takeEarlyKeepaliveBytes(correlationId: string): string[] {
  sweepExpired();
  const entry = buffers.get(correlationId);
  if (!entry) return [];
  buffers.delete(correlationId);
  return entry.chunks;
}
