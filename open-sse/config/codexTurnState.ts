/**
 * codexTurnState.ts — `x-codex-turn-state` relay bookkeeping and the
 * cross-account echo guard.
 *
 * The upstream mints the opaque turn-state blob under the outbound identity
 * (including the fingerprint-converged installation/session/thread ids), and
 * the real Codex client echoes it back on later requests of the same turn —
 * codex-rs captures it from the /responses SSE, the /responses/compact JSON,
 * and the WS handshake (codex-api/src/sse/responses.rs, endpoint/compact.rs).
 *
 * Replaying a blob to the SAME account is self-consistent. Replaying it to a
 * DIFFERENT account (failover rotated the connection while the client still
 * echoes the old account's blob) is a contradiction only a proxy chain can
 * produce — a real Codex client never emits it. The provenance table records
 * which connection minted the blob a downstream session last received, and
 * the outbound guard strips echoes known to come from another account.
 *
 * Mirrors sub2api v0.1.177 `openai_codex_turn_state.go` (commit 8219dcfc8).
 * OmniRoute keys the table by the client's original session id only — the
 * executor pipeline does not carry the API key id, and a real Codex session
 * id is a random UUID, so accidental cross-key collisions are not a
 * practical concern.
 */

const CODEX_TURN_STATE_HEADER = "x-codex-turn-state";

/**
 * How long a provenance record lives. The blob is echoed within one turn,
 * but clients may hold it across a whole session; 2h covers the standard
 * 5-hour quota window's early turns without letting the map grow stale
 * entries for days.
 */
const CODEX_TURN_STATE_TTL_MS = 2 * 60 * 60 * 1000;

/** Opportunistic full sweep every N writes (the read side also lazily expires). */
const CODEX_TURN_STATE_SWEEP_EVERY_WRITES = 256;

type CodexTurnStateOrigin = {
  accountKey: string;
  expiresAt: number;
};

const turnStateOrigins = new Map<string, CodexTurnStateOrigin>();
let turnStateWrites = 0;

function normalizeAccountKey(accountKey: unknown): string | null {
  if (typeof accountKey !== "string") return null;
  const trimmed = accountKey.trim();
  return trimmed || null;
}

/**
 * Read the turn-state blob from a headers bag (Headers instance or a plain
 * record with arbitrary casing). Returns null when absent/blank.
 */
export function readCodexTurnStateHeader(
  headers: Headers | Record<string, unknown> | null | undefined
): string | null {
  if (!headers) return null;
  if (headers instanceof Headers) {
    const value = headers.get(CODEX_TURN_STATE_HEADER);
    return typeof value === "string" && value.trim() ? value.trim() : null;
  }
  if (typeof headers === "object") {
    for (const [key, value] of Object.entries(headers)) {
      if (
        key.toLowerCase() === CODEX_TURN_STATE_HEADER &&
        typeof value === "string" &&
        value.trim()
      ) {
        return value.trim();
      }
    }
  }
  return null;
}

function sweepExpiredTurnStateOrigins(now: number): void {
  for (const [key, origin] of turnStateOrigins) {
    if (origin.expiresAt <= now) {
      turnStateOrigins.delete(key);
    }
  }
}

/**
 * Record that `accountKey` minted the turn-state blob this downstream session
 * just received. Must only be called at the response commit point — when the
 * header is actually written to the client. Recording earlier (e.g. for an
 * attempt later discarded by failover) would poison the table and make the
 * guard strip the NEXT account's legitimate echo.
 */
export function noteCodexTurnStateProvenance(
  clientSessionId: string | null | undefined,
  accountKey: unknown,
  nowMs?: number
): void {
  const sessionId = typeof clientSessionId === "string" ? clientSessionId.trim() : "";
  const account = normalizeAccountKey(accountKey);
  if (!sessionId || !account) return;

  const now = typeof nowMs === "number" ? nowMs : Date.now();
  turnStateOrigins.set(sessionId, {
    accountKey: account,
    expiresAt: now + CODEX_TURN_STATE_TTL_MS,
  });

  turnStateWrites += 1;
  if (turnStateWrites % CODEX_TURN_STATE_SWEEP_EVERY_WRITES === 0) {
    sweepExpiredTurnStateOrigins(now);
  }
}

/**
 * Outbound guard: true when the echoed blob is KNOWN to have been minted by a
 * different account and must be stripped before going upstream. Same-account
 * or unknown provenance passes through unchanged — stripping only, never
 * injection (clients that cannot echo are the Claude bridge's concern, not
 * this module's).
 */
export function isCrossAccountCodexTurnState(
  clientSessionId: string | null | undefined,
  accountKey: unknown,
  nowMs?: number
): boolean {
  const sessionId = typeof clientSessionId === "string" ? clientSessionId.trim() : "";
  const account = normalizeAccountKey(accountKey);
  if (!sessionId || !account) return false;

  const origin = turnStateOrigins.get(sessionId);
  if (!origin) return false;
  const now = typeof nowMs === "number" ? nowMs : Date.now();
  if (origin.expiresAt <= now) {
    turnStateOrigins.delete(sessionId);
    return false;
  }
  return origin.accountKey !== account;
}

/** Test hook: forget all provenance records and reset the sweep counter. */
export function __resetCodexTurnStateOriginsForTesting(): void {
  turnStateOrigins.clear();
  turnStateWrites = 0;
}
